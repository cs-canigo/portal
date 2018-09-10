+++
date = "2018-08-10"
title = "Transmissió de binaris en una REST API a Canigó 3.2"
description = "En aquest HowTo s'explica pas a pas com fer transferència de dades binàries en una REST API a Canigó 3.2 seguint les millors pràctiques definides pel CS Canigó"
section = "howtos"
categories = ["canigo"]
key = "SETEMBRE2018"
+++

### Audiència

Aquest how-to va dirigit a tots aquells desenvolupadors/arquitectes que desenvolupin una aplicació Canigó 3.2 i que necessitin transferir dades binàries en REST APIs.

#### Protocol Buffers

Abans de fer cap modificació, cal generar, compilar i executar l'aplicació per verificar que tot funciona bé.

**NOTA:** _La manera recomanada de generar l'aplicació és amb el plugin d'Eclipse de Caniǵo que ve integrat amb [l'entorn de desenvolupament de Canigó](https://canigo.ctti.gencat.cat/canigo/entorn-desenvolupament/)), i la compilació i desplegament amb els plugins d'Eclipse de Maven i Spring_

1. Generar projecte amb archetype: `mvn -B archetype:generate -DgroupId=cscanigo.howto.rest -DartifactId=protocolbuffers -Dversion=1.0-SNAPSHOT -DarchetypeGroupId=cat.gencat.ctti -DarchetypeArtifactId=plugin-canigo-archetype-rest -DarchetypeVersion=1.5.5`
2. Compilar amb `mvn -B -f protocolbuffers/pom.xml clean package`
3. Executar l'aplicació generada mitjançant `java -Dapplication.defaultLanguage=ca -jar protocolbuffers/target/protocolbuffers.war`
4. Provar d'accedir amb un navegador web a http://localhost:8080/index.html

Un cop s'han executat els pasos previs per disposar d'una aplicació Canigó 3.2 funcionant, s'ha d'afegir el suport específic pels *Protocol Buffers*, de la següent manera:

1. Modificar pom.xml per afegir les següents dependències al final:

```
		<!-- Dependències pròpies Protocol buffers -->
		<dependency>
			<groupId>com.google.protobuf</groupId>
			<artifactId>protobuf-java</artifactId>
			<version>3.2.0</version>
		</dependency>
		<dependency>
			<groupId>com.googlecode.protobuf-java-format</groupId>
			<artifactId>protobuf-java-format</artifactId>
			<version>1.4</version>
		</dependency>
```

2. Definir els missatges que s'enviaran mitajançant *Protocol Buffers*:
	1. Crear el directori on emmagatzemar les definicions en texte dels missatges: **src/main/protobuf**
	2. Crear el/s fitxer/s `.proto`. Un exemple de definició seria aquest:
	
```
// src/main/protobuf/EquipamentEspecial.proto
syntax = "proto2";

// pot ser qualsevol package, però per mantenir la coherència
option java_package = "cscanigo.howto.rest.proto";
option java_outer_classname = "EquipamentEspecialProto";

// Missatges pel model de dades

message EquipamentEspecial {
  required int64 id = 1;
  required string nom = 2;
  optional string municipi = 3;
  repeated DocumentacioEquipamentEspecial documents = 4;
}

message DocumentacioEquipamentEspecial {
  required int64 id = 1;
  required string nom = 2;
  optional string descripcio = 3;
  // pot no ser obligatori definir el contingut del document
  optional bytes contingut = 4;
}

// Missatges de cerca

message CercaRequest {
  optional int64 id = 1;
  optional string nom = 2;
  optional string municipi = 3;
}

message CercaPaginadaRequest {
  optional int64 id = 1;
  optional string nom = 2;
  optional string municipi = 3;
  optional int32 page = 4 [ default = 1 ];
  optional int32 rpp = 5 [ default = 10 ];
  optional string sort = 6;
  optional string filter = 7;
}

// Missatges de resposta

message CercaResponse {
  required int32 total = 1;
  repeated EquipamentEspecial equipaments = 2;
}

```

3. Afegir al Application.java : `@Bean public ProtobufHttpMessageConverter protobufHttpMessageConverter() { return new ProtobufHttpMessageConverter(); }`
4. Modificar pom.xml per afegir el plugin que compila els fitxers `.proto` a codi Java. Aquest plugin s'ha de posar abans de la definició del plugin `maven-compiler-plugin`:

```
			<!-- compile proto file into java files. -->
			<plugin>
				<groupId>com.github.os72</groupId>
				<artifactId>protoc-jar-maven-plugin</artifactId>
				<version>3.2.0.1</version>
				<executions>
					<execution>
						<phase>generate-sources</phase>
						<goals>
							<goal>run</goal>
						</goals>
						<configuration>
							<!-- <includeDirectories> <include>src/main/protobuf</include> </includeDirectories> -->
							<inputDirectories>
								<include>src/main/protobuf</include>
							</inputDirectories>
							<!-- Create java files. And put them in the directory. -->
							<outputTargets>
								<outputTarget>
									<type>java</type>
									<!-- <outputDirectory>src/main/java</outputDirectory> -->
									<outputDirectory>target/generated-sources/java-protobuf</outputDirectory>
								</outputTarget>
							</outputTargets>
						</configuration>
					</execution>
				</executions>
			</plugin>
```

**NOTA:** Per poder fer proves, es pot desactivar (de manera temporal) la protecció contra CSRF, afegint al final del mètode configure() de la classe WebSecurityConfig.java `http.csrf().disable();`.

Un cop acabat el suport específic per *Protocol Buffers*, Spring ho integra automàticament amb les annotacions REST. Un exemple d'endpoint REST pels missatges *Protocol Buffer* seria el següent:

```
package cscanigo.howto.rest.endpoints;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cscanigo.howto.rest.model.Equipament;
import cscanigo.howto.rest.proto.EquipamentEspecialProto.CercaRequest;
import cscanigo.howto.rest.proto.EquipamentEspecialProto.CercaResponse;
import cscanigo.howto.rest.proto.EquipamentEspecialProto.EquipamentEspecial;
import cscanigo.howto.rest.service.EquipamentService;

@RestController
@RequestMapping("/equipamentEspecial")
public class EquipamentEspecialServiceController {

	@Autowired
	EquipamentService equipamentService;

	@PostMapping(produces = { "application/x-protobuf", MediaType.APPLICATION_JSON_VALUE })
	public CercaResponse getEquipament(@RequestBody final CercaRequest request) {

		Equipament equipament = equipamentService.getEquipament(request.getId());

		EquipamentEspecial.Builder equipamentEspecial = EquipamentEspecial.newBuilder() //
				.setId(equipament.getId()) //
				.setNom(equipament.getNom()) //
				.setMunicipi(equipament.getMunicipi());

		for (Documents documents : equipament.getDocuments()) {

			equipamentEspecial.addDocumentsBuilder() //
					.setId(documents.getId()) //
					.setNom(documents.getNom()) //
					.setContingut(ByteString.copyFrom(documents.getContingut())) //
					.build();
		}

		return CercaResponse.newBuilder() //
				.setTotal(1) //
				.addEquipaments(equipamentEspecial.build()) //
				.build();
	}

}

```

**NOTA:** En aquest cas concret, les implementacions actuals per browser (Firefox, Chrome, MSIE, etc.) no són prou madures per considerar-ne l'utilització fora de l'àmbit M2M (màquina a màquina). Tot i així, com a prova de concepte_ es pot utilitzar el següent codi HTML per fer enviar i rebre informació amb *Protocol Buffers*:

```
<!DOCTYPE HTML>
<html lang="en-US">
<head>
<meta charset="UTF-8">
<title>Prova de concepte</title>
<script src="js/long.js"></script>
<script src="js/bytebuffer.js"></script>
<script src="js/protobuf.js"></script>
<script src="js/axios.min.js"></script>
</head>
<body>
	<script type="text/javascript">
	      "use strict";
	      var CercaRequest, CercaResponse;
	      let ProtoBuf = dcodeIO.ProtoBuf;

	      let EquipamentEspecial = ProtoBuf
	      .loadProtoFile('./EquipamentEspecial.proto', (err, builder)=>{
	    	  CercaRequest = builder.build('CercaRequest')
	    	  CercaResponse = builder.build('CercaResponse')
	    	  });

	      let sendCercaRequest = () =>{
	    	
	    	let vIdentificador = document.getElementById("identificador").value
	       	let msg = new CercaRequest({ 
	       		nom : "", 
	       		id: vIdentificador 
	       		});
	    	
	    	let axiosRequestHeaders = {'Accept':'application/x-protobuf', 'Content-Type': 'application/x-protobuf'};
	        axios.post('/api/equipamentEspecial', msg.toArrayBuffer(),
	            { responseType: 'arraybuffer', headers: axiosRequestHeaders }
	          ).then(function (response) {
		            console.log('Response from the server: ', response)
		            
		            let msg = CercaResponse.decode(response.data)
		            
		            console.log('Decoded message', msg)
		            document.getElementById('content').innerText = JSON.stringify(msg, null, 2)
	          })
	          .catch(function (response) {
	            console.log(response)
	          })
	      }
	</script>
	<h1>Prova amb Protocol Buffers</h1>
	<p>Prova de intercanvi de dades amb Protocol Buffers</p>
	<pre id="content"></pre>
	<label for="identificador">Identificador de l'equipament</label>
	<input type="text" id="identificador" name="identificador" value="2" />
	<br />
	<!--  -->
	<button onclick="sendCercaRequest()">send message to
		server</button>
</body>
</html>
```
Més info:
* https://webapplog.com/json-is-not-cool-anymore/
* https://github.com/azat-co/proto-buffer-api/tree/master/public
* https://www.baeldung.com/spring-rest-api-with-protocol-buffers
* https://dzone.com/articles/using-googles-protocol-buffers-with-java

#### Multipart

Abans de fer cap modificació cal generar, compilar i executar l'aplicació per verificar que tot funciona bé.

**NOTA:** La manera recomanada de generar l'aplicació és amb el plugin d'Eclipse de Caniǵo que ve integrat amb [l'entorn de desenvolupament de Canigó](https://canigo.ctti.gencat.cat/canigo/entorn-desenvolupament/)), i la compilació i desplegament amb els plugins d'Eclipse de Maven i Spring

1. Generar projecte amb archetype : `mvn -B archetype:generate -DgroupId=cscanigo.howto.rest -DartifactId=multipart -Dversion=1.0-SNAPSHOT -DarchetypeGroupId=cat.gencat.ctti -DarchetypeArtifactId=plugin-canigo-archetype-rest -DarchetypeVersion=1.5.5`
2. Compilar amb `mvn -B -f multipart/pom.xml clean package`
3. Executar l'aplicació generada mitjançant `java -Dapplication.defaultLanguage=ca -jar multipart/target/multipart.war`
4. Provar d'accedir amb Firefox a http://localhost:8080/index.html

Un cop s'han executat els pasos previs, s'ha d'afegir el suport específic pel tractament de dades *Multipart*, de la següent manera:

1. Modificar el mètode dispatcherServletRegistration() de la classe Application.java per afegir abans del retorn:

```
		MultipartConfigFactory mcf = new MultipartConfigFactory();
		mcf.setFileSizeThreshold("1MB");
		mcf.setLocation(System.getProperty("java.io.tmpdir"));
		mcf.setMaxFileSize("1MB");
		mcf.setMaxRequestSize("32MB");

		registration.setMultipartConfig(mcf.createMultipartConfig());
```

Un cop acabat el suport específic per *Multipart*, Spring ho integra automàticament amb les annotacions REST utilitzant la configuració prèvia. Un exemple d'endpoint REST per missatges *Multipart* seria el següent:

```
	@PostMapping(produces = { MediaType.APPLICATION_JSON_VALUE }, headers = "content-type=multipart/form-data")
	@ResponseStatus(HttpStatus.ACCEPTED)
	public void saveEquipamentMultipart(//
			@RequestParam("descripcio1") String descripcio1, //
			@RequestPart("fitxer1") MultipartFile file1, //
			@RequestPart(name = "fitxer2", required = false) MultipartFile file2 //
	) throws Exception {
		// TODO
	}
```

**NOTA:** _Com a prova de concepte_ es pot utilitzar el següent codi HTML com a referència per enviar un fitxer mitjançant *Multipart*:

```
<!DOCTYPE HTML>
<html lang="en-US">
<head>
<meta charset="UTF-8">
<title>Prova amb Multipart</title>
</head>
<body>
	<h1>Prova amb Multipart</h1>
	<p>Prova de pujar un formulari Multipart</p>
	<form name="miFormulario" action="/api/equipaments" method="post"
		enctype="multipart/form-data">
		<!--  -->
		<label for="descripcio1">Descripció fitxer 1</label><input type="text"
			name="descripcio1" value="descripcio001" /><br />
		<!--  -->
		<label for="fitxer1">Adjuntar fitxer 1</label><input type="file"
			name="fitxer1" /><br />
		<!--  -->
		<input type="submit" />
	</form>
</body>
</html>
```

#### XML:base64Binary

Abans de fer cap modificació, cal generar, compilar i executar l'aplicació per verificar que tot funciona bé.

**NOTA:** _La manera recomanada de generar l'aplicació és amb el plugin d'Eclipse de Caniǵo que ve integrat amb [l'entorn de desenvolupament de Canigó](https://canigo.ctti.gencat.cat/canigo/entorn-desenvolupament/)), i la compilació i desplegament amb els plugins d'Eclipse de Maven i Spring_

1. Generar projecte amb archetype: `mvn -B archetype:generate -DgroupId=cscanigo.howto.rest -DartifactId=xmlbase64binary -Dversion=1.0-SNAPSHOT -DarchetypeGroupId=cat.gencat.ctti -DarchetypeArtifactId=plugin-canigo-archetype-rest -DarchetypeVersion=1.5.5`
2. Compilar amb `mvn -B -f protocolbuffers/pom.xml clean package`
3. Executar l'aplicació generada mitjançant `java -Dapplication.defaultLanguage=ca -jar protocolbuffers/target/protocolbuffers.war`
4. Provar d'accedir amb un navegador web a http://localhost:8080/index.html

Un cop s'han executat els passos previs per disposar d'una aplicació Canigó 3.2 funcionant, s'ha de triar la implementació (JAXB, CXF, Axis, Xmlbeans, etc.) per treballar. Per simplicitat en aquest exemple farem ús de l'estàndard JAXB per generar el codi java:

1. Afegir el fitxer src/main/xsd/global.xjb
```
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<jaxb:bindings version="2.0"
  xmlns:jaxb="http://java.sun.com/xml/ns/jaxb"
  xmlns:xjc="http://java.sun.com/xml/ns/jaxb/xjc"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  jaxb:extensionBindingPrefixes="xjc">
  
 <jaxb:globalBindings>
    <xjc:simple />
    <xjc:serializable uid="-1" />
    <jaxb:javaType name="java.util.Calendar" xmlType="xs:dateTime"
      parseMethod="javax.xml.bind.DatatypeConverter.parseDateTime"
      printMethod="javax.xml.bind.DatatypeConverter.printDateTime" />
  </jaxb:globalBindings>
</jaxb:bindings>
```
2. Crear el següent fitxer d'exemple: src/main/xsd/Equip.xjb
```
<?xml version="1.0" encoding="UTF-8"?>
<schema xmlns="http://www.w3.org/2001/XMLSchema"
	targetNamespace="urn:cscanigo.howto.rest:xmlbase64binary:1.0-SNAPSHOT"
	xmlns:tns="urn:cscanigo.howto.rest:xmlbase64binary:1.0-SNAPSHOT"
	elementFormDefault="unqualified">

	<element name="Root">
		<complexType>
			<choice minOccurs="1">
				<element name="CercaRequest" type="tns:CercaRequest"></element>
				<element name="CercaPaginadaRequest" type="tns:CercaPaginadaRequest"></element>
				<element name="CercaResponse" type="tns:CercaResponse"></element>
			</choice>
		</complexType>
	</element>

	<complexType name="CercaRequest">
		<sequence>
			<element name="id" type="long" minOccurs="1" maxOccurs="1" />
			<element name="nom" type="string" minOccurs="0" maxOccurs="1" />
			<element name="municipi" type="string" minOccurs="0" maxOccurs="1" />
		</sequence>
	</complexType>

	<complexType name="CercaPaginadaRequest">
		<sequence>
			<element name="id" type="long" minOccurs="0" maxOccurs="1" />
			<element name="nom" type="string" minOccurs="0" maxOccurs="1" />
			<element name="municipi" type="string" minOccurs="0" maxOccurs="1" />
			<element name="page" type="int" minOccurs="0" maxOccurs="1" />
			<element name="rpp" type="int" minOccurs="0" maxOccurs="1" />
			<element name="sort" type="string" minOccurs="0" maxOccurs="1" />
			<element name="filter" type="string" minOccurs="0" maxOccurs="1" />
		</sequence>
	</complexType>

	<complexType name="CercaResponse">
		<sequence>
			<element name="total" type="int" minOccurs="1" maxOccurs="1" />
			<element name="equipaments" type="tns:EquipamentEspecial" minOccurs="0" maxOccurs="unbounded"></element>
		</sequence>
	</complexType>

	<complexType name="EquipamentEspecial">
		<sequence>
			<element name="id" type="long" minOccurs="1" maxOccurs="1" />
			<element name="nom" type="string" minOccurs="1" maxOccurs="1" />
			<element name="municipi" type="string" minOccurs="0" maxOccurs="1" />
			<element name="documents" type="tns:DocumentacioEquipamentEspecial" minOccurs="0" maxOccurs="unbounded"></element>
		</sequence>
	</complexType>

	<complexType name="DocumentacioEquipamentEspecial">
		<sequence>
			<element name="total" type="long" minOccurs="1" maxOccurs="1" />
			<element name="nom" type="string" minOccurs="1" maxOccurs="1" />
			<element name="descripcio" type="string" minOccurs="0" maxOccurs="1" />
			<element name="contingut" type="base64Binary" minOccurs="0" maxOccurs="1" />
		</sequence>
	</complexType>

</schema>
```
2. Modificar pom.xml per afegir el següent plugin:
```
			<plugin>
				<groupId>org.codehaus.mojo</groupId>
				<artifactId>jaxb2-maven-plugin</artifactId>
				<version>1.5</version>
				<executions>
					<execution>
						<goals>
							<goal>xjc</goal>
						</goals>
					</execution>
				</executions>
				<configuration>
					<nv>true</nv>
					<clearOutputDir>true</clearOutputDir>
					<failOnNoSchemas>true</failOnNoSchemas>
					<extension>true</extension>
					<packageName>${project.groupId}</packageName>
					<outputDirectory>${project.build.directory}/generated-sources/jaxb</outputDirectory>
					<schemaDirectory>src/main/xsd</schemaDirectory>
					<schemaFiles>*.xsd</schemaFiles>
					<verbose>true</verbose>
					<bindingDirectory>${project.basedir}/src/main/xsd</bindingDirectory>
					<bindingFiles>global.xjb</bindingFiles>
				</configuration>
			</plugin>
```

Un cop afegit el suport específic per _JAXB_, Maven en la fase de generació de codi font genera les classes Java. En l'exemple del EquipamentEspecial.xsd la referència a *XML:base64binary* es generaria automàticament a codi Java de la següent manera (veure el camp "contingut"):

```
/**
 * <p>Java class for DocumentacioEquipamentEspecial complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="DocumentacioEquipamentEspecial">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="total" type="{http://www.w3.org/2001/XMLSchema}long"/>
 *         &lt;element name="nom" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="descripcio" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="contingut" type="{http://www.w3.org/2001/XMLSchema}base64Binary" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "DocumentacioEquipamentEspecial", propOrder = {
    "total",
    "nom",
    "descripcio",
    "contingut"
})
public class DocumentacioEquipamentEspecial
    implements Serializable
{

    private final static long serialVersionUID = -1L;
    protected long total;
    @XmlElement(required = true)
    protected String nom;
    protected String descripcio;
    protected byte[] contingut;

// ... la resta de codi ...

```

Més info:
1. https://docs.oracle.com/javase/6/docs/technotes/tools/share/xjc.html
2. http://www.mojohaus.org/jaxb2-maven-plugin/Documentation/v2.2/
3. https://www.journaldev.com/1312/jaxb2-maven-plugin-xjc-example-generate-java-classes-xsd

