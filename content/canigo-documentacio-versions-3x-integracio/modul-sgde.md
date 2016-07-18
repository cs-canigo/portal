+++
date        = "2015-03-20T13:27:55+01:00"
title       = "SGDE"
description = "Servei de Gestió del Document Electrònic."
section     = "Canigó. Documentació versió 3.x"
weight      = 14
+++

## Introducció

L'SGDE o Servei de Gestió del Document Electrònic ofereix una sèrie de serveis relacionats amb la gestió de documents electrònics. Aquests serveis els ofereixen les plataformes que integren l'SGDE. Actualment existeixen dues:

* Plataforma Adobe
* STD

Podeu trobar mes informació sobre els serveis i funcionalitats del SGDE [aquí](/sgde/about/).

### Propòsit

El propòsit del connector és proporcionar una API que pugui ser utilitzada de forma fàcil pels integradors d'aquest connector per consumir els diferents serveis del SGDE.

### Context i Escenaris d'ús

El connector SGDE es troba dins els connectors funcionals de la Generalitat.

### A qui va dirigit

Aquest document va dirigit als següents perfils:

* Programador. Per conèixer l'ús del connector.
* Arquitecte. Per conèixer quins són els components i la configuració del connector.

## Descripció Detallada

Aquest connector ofereix els següents serveis:

**Serveis Plataforma Adobe**

* **renderitzarFormulari:** Fusiona un formulari amb la plantilla pdf.
* **renderitzarSignarPDF:** Fusiona un formulari amb la plantilla pdf i posteriorment el signa.
* **renderitzarFormulariPDFadjunts:** Fusiona un formulari amb la plantilla pdf i afegeix els annexos indicats
* **renderitzarFormulariPDFaplanatForms:** Fusiona un formulari amb la plantilla pdf donant com a resultat un PDF aplanat. Realitzat amb el mòdul Forms de LC.
* **renderitzarFormulariPDFAplanat:** Fusiona un formulari amb la plantilla pdf donant com a resultat un PDF aplanat. Realitzat amb el mòdul d'Output de LC.
* **renderitzarFormulariPDFA:** Fusiona un formulari amb la plantilla pdf donant com a resultat un PDF/A, que garanteix la compatibilitat d’aquest document al llarg del temps.
* **renderitzarFormulariPDFaplanatSignat:** Fusiona un formulari amb la plantilla pdf, després l'aplana i el signa.
* **extreureDadesFormulari:** Servei per extreure dades d'un formulari.
* **extreureDadesXML:** Servei que extreu les dades introduïdes en un formulari dinàmic.
* **extreureComentaris:** Servei que extreu els comentaris d'un document PDF.
* **extreureComplexAnnexos:** Servei que extreu els annexos d'un document PDF.
* **extreureAnnexos:** Servei que extreu els annexos d'un document PDF.
* **convertirPdfaImatge:** Servei per convertir un pdf a imatge.
* **convertirPdfaPdfA:** Servei per convertir un PDF a PDF/A.
* **aplanarPDF:** Servei per aplanar un pdf.
* **signarPDF:** Servei per a signar un pdf pla.
* **aplanarSignarPDF:** Servei per aplanar i signar un pdf.

**Serveis STD**

* **generarCSV:** Servei per la generació d'un Codi Segur a partir d'un arxiu i una clau.
* **composarPDFStream:** Servei que composa un PDF a partir d'una plantilla i d'un document PDF enviat en Stream en la mateixa petició.
* **composarPDFRemot:** Servei que composa un PDF a partir d'una plantilla i d'un document PDF previament pujat al filesystem del STD.
* **convertirPDF:** Servei que converteix un document Ofimàtic (Word, Excel, PowerPoint, Imatges, OpenOffice,...) en PDF.
* **convertirPDFCercable:** Servei que converteix un document Ofimàtic (Word, Excel, PowerPoint, Imatges, OpenOffice,...) en PDF Cercable.
* **convertirComposarPDF:** Servei que converteix i posteriorment composa un arxiu ofimàtic.
* **convertirComposarPDFCercable:** Servei que converteix i posteriorment composa un arxiu ofimàtic cercable.
* **ferOCR:** Servei que extrau el text inclòs a una imatge i el retorna.


### Alta Servei

Per poder utilitzar l'SGDE s'ha d'estar donat d'alta en el servei. Per poder fer-ho s'han d'enviar un mail a oficina-tecnica.canigo.ctti@gencat.cat sol.licitant l'alta a qualsevol de les plataformes que integren el SGDE:

* Plataforma Adobe: El mail a de contenir la sol·licitud d'alta a l'aplicació d'AutoServei disponible [aqui](/related/SGDE/formulari-alta-plataforma-adobe.xls "Formulari d'alta plataforma Adobe del SGDE").
* STD: El mail ha de redactar-se tal qual es descriu en el manual d'usuari del servei. Aquest mail ha de contenir una plantilla degudament complimentada que es pot trobar aquí.
    1. El Centre de Frameworks i Solucions d'Arquitectura respondrà a aquest mail una vegada doni d'alta l'aplicació amb un mail tipus,
    2. L'alta a qualsevol de les dues plataformes s'han de realitzar primer sobre l'entorn de PRE i posteriorment a l'entorn de PRO.

### Arquitectura i Components

#### Interfícies i Components Genèrics

Es pot trobar el codi font referent a aquest components a la següent url:

Codi Font:  http://repos.canigo.ctti.gencat.cat/repository/maven2/cat/gencat/ctti/canigo.integration.sgde/1.2.0/

#### Requeriments

El connector SGDE és compatible amb les versions 1.5 o superior de Java. Per versions inferiors no es garantit el seu correcte funcionament.

El seu ús esta certificat per funcionar correctament en servidors d'aplicacions WL11g i Tomcat6.x.

### Instal.lació i Configuració

#### Instal.lació

La instal.lació del connector requereix de la utilització de la llibreria 'canigo.integration.sgde' i les dependències indicades a l'apartat 'Introducció-Versions i Dependències'.

Per afegir aquesta dependència s'ha de modificar el pom.xml de l'aplicació per incloure les llibreries del Connector.

```
<dependency>
	<groupId>cat.gencat.ctti</groupId>
	<artifactId>canigo.integration.sgde</artifactId>
	<version>1.2.0</version>
</dependency>

```

IMPORTANT

En el cas de que es vulgui integrar aquest connector en una aplicació que disposi del connector de la PICA, és farà necessari afegir les següents exclusions en aquests últim, per exemple el connector PADRÒ.

```
<dependency>
	<groupId>cat.gencat.ctti</groupId>
    <artifactId>canigo.integration.padro.pica</artifactId>
    <version>1.2.0</version>
    <exclusions>
		<exclusion>
			<groupId>org.apache.axis2</groupId>
			<artifactId>axis2-jaxws</artifactId>
		</exclusion>
		<exclusion>
			<groupId>org.apache.woden</groupId>
			<artifactId>woden</artifactId>
		</exclusion>
		<exclusion>
			<groupId>org.apache.ws.commons.schema</groupId>
			<artifactId>XmlSchema</artifactId>
		/exclusion>
    </exclusions>
</dependency>
```

El no afegir aquestes exclusions pot provocar que el connector SGDE no funcioni correctament.

#### Configuració


1.- Per poder configurar el connector SGDE és necessari crear un arxiu anomenat app-integration-sgde.xml situat en src/main/resources/spring/ amb el següent contingut:

```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:aop="http://www.springframework.org/schema/aop"
	xsi:schemaLocation="http://www.springframework.org/schema/beans 
           http://www.springframework.org/schema/beans/spring-beans-4.1.xsd">
	<!-- BEAN SGDE -->
	<bean id="sgdeService" class="cat.gencat.ctti.canigo.arch.integration.sgde.impl.SGDEServiceImpl" init-method="setupService" scope="prototype">
    	<description>
			SGDE implementation:
				- formsWSDLUrl: Url de l'wsdl del servei de formularis per les operacions de: renderitzar, extracció de dades, aplanat, ...
				- stdWSDLUrl: Url de l'wsdl del servei de Transformació de Documents(STD)
		</description>
    	<property name="formsWSDLUrl" value="${sgde.forms.wsdl.url:http://eformularis.pre.intranet.gencat.cat/ServeisInvocacio/serveis/ServeisInvocacioV2?wsdl}" />
		<property name="stdWSDLUrl" value="${sgde.std.wsdl.url:http://sgde.pre.intranet.gencat.cat/ServeisInvocacioSTD/services/ServeisSTDV2?wsdl}" />
    </bean>
</beans>
```

on les variables **sgde.forms.wsdl.url** i **sgde.std.wsdl.url** són recuperades de l'arxiu **sgde.properties** que s'ha de crear en src/main/resources/config/props/sgde.properties

2.- Configuració dels arxius de properties.

Només es necessita un arxiu de properties a configurar el sgde.properties.

El primer conté només dos paràmetres,

**sgde.forms.wsdl.url:** Url del WSDL del servei de formularis Adobe.

* PRE: http://eformularis.pre.intranet.gencat.cat/ServeisInvocacio/serveis/ServeisInvocacioV2?wsdl
* PRO: http://eformularis.intranet.gencat.cat/ServeisInvocacio/serveis/ServeisInvocacioV2?wsdl

**sgde.std.wsdl.url:** Url del WSDL del STD.

* PRE: http://sgde.pre.intranet.gencat.cat/ServeisInvocacioSTD/services/ServeisSTDV2?wsdl
* PRO: http://sgde.intranet.gencat.cat/ServeisInvocacioSTD/services/ServeisSTDV2?wsdl

### Utilització del Connector


1.- En el bean on es vulgui disposar dels serveis del connector declarar el servei.

```java
@Autowired
private ISGDEService sgdeService;
```

2.- Escollir un dels serveis del SGDE, per exemple el de CSV.

```java
ResultSTD res = null;
byte[] STD_ARXIU_PDF_TEST1 = null;
try {
    STD_ARXIU_PDF_TEST1 = IOUtils.toByteArray(Thread.currentThread().getContextClassLoader().getResourceAsStream("data_sgde/prueba_composar.pdf"));
    res = sgdeService.generarCSV("ctti", "cscanigo", STD_ARXIU_PDF_TEST1, "cscanigo");
    log.info("[SGDEConnectorService][sgdeGeneracioCSVTest][estat: " + res.getStatus().intValue() + "]");
} catch (Exception e) {
    e.printStackTrace();
}
```

Per més informació sobre els diferents serveis que ofereix el SGDE consultar la documentació disponible [aquí](/sgde/documentacio/).