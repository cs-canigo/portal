+++
date        = "2015-03-20T12:29:56+01:00"
title       = "ICC"
description = "Serveis de normalització d'adreces de l'Institut Cartogràfic de Catalunya."
sections    = "Canigó. Documentació versió 3.x"
weight      = 8
+++

## Introducció

L'objectiu d'aquest connector, és el de proporcionar un punt d'accés als serveis de normalització d'adreces del ICC - Institut Cartogràfic de Catalunya.

### Propòsit

El propòsit del connector és proporcionar una interfície funcional al connector de l'ICC del servei de normalització d'adreces. El servei de geocodificació de l'Institut Cartogràfic de Catalunya permet obtenir una localització geogràfica (coordenades) a partir de la descripció d'un municipi, carrer, adreça , cruïlla (textos), topònim o punt quilomètric d'una carretera.

### Context i Escenaris d'ús

El connector icc es troba dins els connectors de serveis funcionals de la Generalitat.

### A qui va dirigit

Aquest document va dirigit als següents perfils:

* Programador. Per conèixer l'ús del connector.
* Arquitecte. Per conèixer quins són els components i la configuració del connector.

### Documents i Fonts de Referència

| Referència
| ---------------
| [Guia d'ús de l'API del Connector ICC](/related/canigo/documentacio/modul-icc/Geocodificador_Manual_Integrador_v1.12.pdf "Guia d'us de l'API del Connector ICC").
| [Institut Cartogràfic de Catalunya - ICC](http://www.icc.cat/).

## Descripció Detallada

Aquest connector permet realitzar les següents funcionalitats referents a les següents operacions:

Funcionalitats

* **Localitza adreça:** Funcionalitat que permet obtenir una localització geogràfica (coordenades) a partir de la adreça. ex: C.Balmes,5 (Barcelona).
* **Localitza cruilla:** Funcionalitat que permet obtenir una localització geogràfica a partir d'una cruïlla. ex: Av. Diagonal amb Av.Meridiana (Barcelona)
* **Localitza toponim:** Funcionalitat que permet obtenir una localització geogràfica a partir d'un topònim. ex: platja de la barceloneta.
* **Localitza pk:** Funcionalitat que permet obtenir una localització geogràfica a partir del punt quilomètric d'una carretera. ex: carretera B-100 KM 3.
* **Obtenir informació d'un punt:** Funcionalitat que permet obtenir una informació d'un punt. ex: x-> 430477.74 y ->4582122.725.

### Arquitectura i Components

#### Interfícies i Components Genèrics

Es pot trobar el codi font referent a aquest component a la següent url:

Codi Font:  https://sic.ctti.extranet.gencat.cat/nexus/content/groups/canigo-group-maven2/cat/gencat/ctti/canigo.integration.icc/

#### Requeriments

El connector ICC és compatible amb les versions 1.5 o superior de Java. Per versions inferiors no es garantit el seu correcte funcionament.

### Instal.lació i Configuració

#### Instal.lació

Per tal d'instal-lar el connector ICC es pot incloure automàticament a través de l'eina de suport al desenvolupament o bé afegir manualment en el pom.xml de l'aplicació la següent dependència:

```
<canigo.integration.icc.version>[1.2.0,1.3.0)</canigo.integration.icc.version>
<dependency>
    <groupId>cat.gencat.ctti</groupId>
    <artifactId>canigo.integration.icc</artifactId>
    <version>${canigo.integration.icc.version}</version>
</dependency>
```

#### Configuració

La configuració es realitza automàticament a partir de la eina de suport al desenvolupament.

L'eina de desenvolupament genera automàticament el fitxer de propietats necessari per a la configuració del servei.

Ubicació proposada: <PROJECT_ROOT>/src/main/resources/config/props/icc.properties

Propietat                     | Requerit | Descripció
----------------------------- | -------- | ----------
*.iccService.webServiceServer | Sí       | Endpoint del servei ICC.
*.iccService.contrasenya      | Sí       | contrasenya d'access al servei.
*.iccService.usuari           | Sí       | usuari d'acces al servei.


Cada aplicació que vulgui utilitzar les funcionalitats del ICC, haurà de seguir el següent procediment:

1. Emplenar el Document d'Alta que es pot trobar aquí. No s'ha d'emplenar l'apartat d'organisme sol?licitant i persona de contacte. Aquest organisme i persona sempre ha de ser de l'administració. Si una empresa privada desenvolupa l'aplicació, la petició ha de ser feta per algú de l'administració.
2. Emplenar el document d'enquesta que es pot descàrrega d'aquí.
3. Enviar aquests dos documents a la direcció de correu armand.guell@icc.cat demanant l'accés al servei ICC.

L'usuari i password seran subministrats en aproximadament una setmana després de la petició.

Els arxius de configuració que contenen els beans del mòdul i que seran carregats per Spring, són automàticament registrats pel core de Canigó, per el que el desenvolupador no ha de definir cap arxiu XML per aixecar el servei.

### Utilització del servei

Per accedir al servei ICC, el desenvolupador pot realitzar una crida de forma externa mitjançant el patró 'Dependency Injection'.

Podem diferenciar dues formes d'injectar-ho:

* Per XML:

```
<bean id="iccWebServiceClient" class="cat.gencat.ctti.canigo.arch.integration.icc.IccWebServiceClientImpl">
		<property name="webServiceTemplate" ref="webServiceTemplate"/>
		<property name="defaultUri" value="http://www.icc.cat/geocodificador/ws/wss_1.0" />		
	</bean>

	<bean id="webServiceTemplate" class="org.springframework.ws.client.core.WebServiceTemplate">
		<constructor-arg ref="messageFactory" />
		<property name="interceptors">
			<bean class="cat.gencat.ctti.canigo.arch.integration.icc.IccSecurity">
				<constructor-arg value="USUARI" />
				<constructor-arg value="CONTRASENYA" />
			</bean>
		</property>
	    <property name="messageSender">
	        <bean class="org.springframework.ws.transport.http.CommonsHttpMessageSender" />
	    </property>
		<property name="marshaller" ref="marshaller" />
		<property name="unmarshaller" ref="marshaller" />
		<property name="defaultUri" value="http://www.icc.cat/geocodificador/ws/wss_1.0" />
	</bean>

	<bean id="messageFactory" class="org.springframework.ws.soap.saaj.SaajSoapMessageFactory">
		<property name="soapVersion">
			<util:constant static-field="org.springframework.ws.soap.SoapVersion.SOAP_12" />
		</property>
	</bean>
	
	<!-- serializador con JAXB -->
	<bean id="marshaller" class="org.springframework.oxm.jaxb.Jaxb2Marshaller">
		<property name="classesToBeBound">
			<list>
					<value>cat.icc.ws.geocodificador.Adreca</value>
					<value>cat.icc.ws.geocodificador.ArrayOfPuntGeografic</value>
					<value>cat.icc.ws.geocodificador.Cruilla</value>
					<value>cat.icc.ws.geocodificador.IdNom</value>
					<value>cat.icc.ws.geocodificador.Incidencia</value>
					<value>cat.icc.ws.geocodificador.InfoAdministrativa</value>
					<value>cat.icc.ws.geocodificador.Localitzacio</value>
					<value>cat.icc.ws.geocodificador.LocalitzacioCruilla</value>
					<value>cat.icc.ws.geocodificador.Localitzacions</value>
					<value>cat.icc.ws.geocodificador.LocalitzacionsCruilla</value>
					<value>cat.icc.ws.geocodificador.ObtenirInfoPuntInput</value>
					<value>cat.icc.ws.geocodificador.PK2</value>
					<value>cat.icc.ws.geocodificador.Pks</value>
					<value>cat.icc.ws.geocodificador.Punt</value>
					<value>cat.icc.ws.geocodificador.PuntGeografic</value>
					<value>cat.icc.ws.geocodificador.Toponim</value>
					<value>cat.icc.ws.geocodificador.Toponims</value>
					<value>cat.icc.ws.geocodificador.Via</value>
			</list>
		</property>
	</bean>
```

* Per anotacions:

```
@Autowired
@Qualifier("iccWebServiceClient")
IccWebServiceClient client;
```

#### Excepcions del servei ICC

El servei ICC pot generar excepcions IccModuleException. Aquest tipus d'excepcions les genera el servei ICC en els casos de:

Les excepccions es poden donar degut a:

* TimeOut a la petició del servei
* Error en el format de les dades d'entrada i/o sortida
* Error en el binding automàtic amb les dades.

En el cas de produir-se un error el servei ICC registra en el fitxer de logs de l'aplicació l'error produit, i llença una excepció IccModuleException a la aplicació amb l'informcació de l'excepció.

#### Exemple d'utilització del servei ICC

##### Localitza Adreça

```java
import cat.gencat.ctti.canigo.arch.integration.icc.exceptions.IccModuleException;
import cat.icc.ws.geocodificador.*;

public class IccServiceReleaseTest {

	@Autowired
	@Qualifier("iccWebServiceClient")
	IccWebServiceClient client;

	public void testLocalitzaAdreca() {
		try {
			Adreca adreca = getAdreca();
			Localitzacions response;
			response = client.localitzaAdreca(adreca);
			Assert.assertTrue(response.getItem().size() > 0);
		} catch (IccModuleException e) {
			Assert.assertTrue(false);
		}
	}

	private Via getVia() {
		Via via = new Via();
		via.setNom("Mas Massonet");
		return via;

	}

	private Adreca getAdreca() {
		Adreca adreca = new Adreca();
		adreca.setPoblacio("Blanes");
		adreca.setVia(getVia());
		adreca.setPortal(18);
		adreca.setCodiPostal("no");
		adreca.setLlogaret(new IdNom());
		return adreca;
	}
}
```

##### Localitza Cruïlla

```java
import cat.gencat.ctti.canigo.arch.integration.icc.exceptions.IccModuleException;
import cat.icc.ws.geocodificador.*;

public class IccServiceReleaseTest {

	@Autowired
	@Qualifier("iccWebServiceClient")
	IccWebServiceClient client;

	public void testLocalitzaCruilla() {
		try {
			Cruilla cruilla = getCruilla();
			LocalitzacionsCruilla response = client.localitzaCruilla(cruilla);
			Assert.assertTrue(response.getItem().size() > 0);
		} catch (IccModuleException e) {
			Assert.assertTrue(false);
		}
	}

	private Cruilla getCruilla() {
		Via via1 = new Via();
		via1.setTipus("c.");
		via1.setNom("Balmes");
		Via via2 = new Via();
		via2.setNom("*");
		Cruilla cruilla = new Cruilla();
		cruilla.setPoblacio("Barcelona");
		cruilla.getVies().add(via1);
		cruilla.getVies().add(via2);
		cruilla.setComarca(new IdNom());
		return cruilla;
	}
}
```

##### Localitza Punt Quilomètric

```java
import cat.gencat.ctti.canigo.arch.integration.icc.exceptions.IccModuleException;
import cat.icc.ws.geocodificador.*;

public class IccServiceReleaseTest {

	@Autowired
	@Qualifier("iccWebServiceClient")
	IccWebServiceClient client;

	public void testLocalitzaPK() {
		try {
			PK2 pk = getPk();
			Pks response = client.localitzaPK(pk);
			Assert.assertTrue(response.getItem().size() > 0);
		} catch (IccModuleException e) {
			Assert.assertTrue(false);
		}
	}

	private PK2 getPk() {
		PK2 pk = new PK2();
		pk.setNomCarretera("AP-7");
		pk.setKM("56");
		pk.setCoordenadesGeografiques(false);
		return pk;
	}
}
```

##### Localitza Toponim

```java
import cat.gencat.ctti.canigo.arch.integration.icc.exceptions.IccModuleException;
import cat.icc.ws.geocodificador.*;

public class IccServiceReleaseTest {

	@Autowired
	@Qualifier("iccWebServiceClient")
	IccWebServiceClient client;

	public void testLocalitzaToponim() {
		try {
			Toponim toponim = getToponim();
			Toponims response = client.localitzaToponim(toponim);
			Assert.assertTrue(response.getItem().size() > 0);
		} catch (IccModuleException e) {
			Assert.assertTrue(false);
		}
	}

	private Toponim getToponim() {
		Toponim topo = new Toponim();
		topo.setNom("Can Clota");
		topo.setCoordenadesGeografiques(false);
		return topo;
	}
}
```

##### Obtenir informació d'un punt

El punt pot estar en el datum ED50 o en el datum ETRS89 i les coordenades han d'estar en format UTM.

```java
import cat.gencat.ctti.canigo.arch.integration.icc.exceptions.IccModuleException;
import cat.icc.ws.geocodificador.*;

public class IccServiceReleaseTest {

	@Autowired
	@Qualifier("iccWebServiceClient")
	IccWebServiceClient client;

	public void testObtenirInfoPuntEd50() {
		try {
			ObtenirInfoPuntInput obtenirInfoPuntInput = getObtenirInfoPuntInputUTMED50();
			InfoAdministrativa response = client.obtenirInfoPunt(obtenirInfoPuntInput);
			Assert.assertTrue(response != null);
		} catch (IccModuleException e) {
			Assert.assertTrue(false);
		}
	}

	public void testObtenirInfoPuntEtrs89() {
		try {
			ObtenirInfoPuntInput obtenirInfoPuntInput = getObtenirInfoPuntInputETRS89();
			InfoAdministrativa response = client.obtenirInfoPunt(obtenirInfoPuntInput);
			Assert.assertTrue(response != null);
		} catch (IccModuleException e) {
			Assert.assertTrue(false);
		}
	}

	private PuntGeografic getPuntGeograficUTMED50() {
		PuntGeografic punt = new PuntGeografic();
		punt.setX(428263.75);
		punt.setY(4582861.0);
		return punt;
	}

	private PuntGeografic getPuntGeograficETRS89() {
		PuntGeografic punt = new PuntGeografic();
		punt.setX(484937.352);
		punt.setY(4652370.915);
		return punt;
	}

	private PuntGeografic getPuntGeograficBuit() {
		PuntGeografic punt = new PuntGeografic();
		return punt;
	}

	private ObtenirInfoPuntInput getObtenirInfoPuntInputUTMED50() {
		ObtenirInfoPuntInput obtenirInfoPuntInput = new ObtenirInfoPuntInput();
		obtenirInfoPuntInput.setPuntUTMED50(getPuntGeograficUTMED50());
		obtenirInfoPuntInput.setPuntUTMETRS89(getPuntGeograficBuit());
		return obtenirInfoPuntInput;
	}

	private ObtenirInfoPuntInput getObtenirInfoPuntInputETRS89() {
		ObtenirInfoPuntInput obtenirInfoPuntInput = new ObtenirInfoPuntInput();
		obtenirInfoPuntInput.setPuntUTMED50(getPuntGeograficBuit());
		obtenirInfoPuntInput.setPuntUTMETRS89(getPuntGeograficETRS89());
		return obtenirInfoPuntInput;
	}

}
```
