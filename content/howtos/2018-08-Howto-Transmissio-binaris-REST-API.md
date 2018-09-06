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

**NOTA:** La manera recomanada de generar l'aplicació és amb el plugin d'Eclipse de Caniǵo que ve integrat amb [l'entorn de desenvolupament de Canigó](https://canigo.ctti.gencat.cat/canigo/entorn-desenvolupament/)), i la compilació i desplegament amb els plugins d'Eclipse de Maven i Spring

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

		EquipamentEspecial equipamentEspecial = EquipamentEspecial.newBuilder() //
				.setId(equipament.getId()) //
				.setNom(equipament.getNom()) //
				.setMunicipi(equipament.getMunicipi()) //
				.build();

		return CercaResponse.newBuilder() //
				.setTotal(1) //
				.addEquipaments(equipamentEspecial) //
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
