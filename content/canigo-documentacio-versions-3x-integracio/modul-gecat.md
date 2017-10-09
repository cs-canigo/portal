+++
date        = "2015-03-13T13:40:42+01:00"
title       = "GECAT"
description = "Utilització del connector al sistema SAP del Gecat."
sections    = "Canigó. Documentació versió 3.x"
weight      = 7
+++

## Propòsit

L'objectiu del present document és descriure la metodologia a seguir en la utilització del connector al sistema SAP del Gecat des de qualsevol aplicació Java del Framework J2EE.

L'abast d'aquest connector es basa en la utilització de les funcions d'alta de factures, consultes i reserves online del SAP de Gecat, així com totes les funcions batch.

El connector permet l'accés al SAP mitjançant objectes de consulta. El connector transforma aquests objectes en una cadena de caràcters vàlida per al SAP. La cadena de retorn és transformada novament en un objecte que conté els registres de retorn.

## Instal.lació i Configuració

### Instal.lació

Per poder utilitzar el connector haurem de configurar el projecte perque inclogui dues llibreries dll i diferents jars:

Les llibreries són sapjcorfc.dll i librfc32.dll i s'han de copiar al directori system32.

Per fer les operacions sobre el sistema SAP del Gecat és necessària la utilització del jar sapjco-2.1.6, que és el connector propi del SAP per fer les crides a les seves funcions BAPI (RFC).

Les classes que utilitzarem per fer els objectes d'operacions estan en el jar del connector Gecat09 canigo-connectors-gecat09-2.3.2.jar

Les classes que utilitzarem per fer les operacions han estat generades amb una eina Open Source anomenada JAXB (Java API for Xml Binding), que genera classes java a partir d'un esquema de xml (XMLSchema). Aquesta eina ens permet no solament generar automàticament classes java sinó també fer validacions per comprovar que les dades que contenen els objectes són vàlides. Per això també haurem d'incloure els jars que necessita JAXB:

* jaxb-api-1.0.1.jar
* jaxb-libs-1.0.6.jar
* jaxb-impl-1.0.5.jar
* jax-qname-1.1.jar
* namespace-1.0.1.jar
* relaxngDatatype-20020414.jar
* xsdlib-2013.6.1.jar

Per tal d'instal-lar el mòdul de GECAT es pot incloure automàticament a través de l'eina de suport al desenvolupament o bé afegir manualment en el pom.xml de l'aplicació la següent dependència:

```
<canigo.integration.gecat.version>[1.2.0,1.3.0)</canigo.integration.gecat.version>

<dependency>
          <groupId>cat.gencat.ctti</groupId>
          <artifactId>canigo.integration.gecat</artifactId>
          <version>${canigo.integration.gecat.version}</version>
</dependency>
```

### Configuració

La configuració es realitza automàticament a partir de l'eina de suport al desenvolupament.

Ubicació: <PROJECT_ROOT>/src/main/resources/config/props/sap.properties

Propietat                | Requerit | Descripció
------------------------ | -------- | ----------
*.sap.client 	         | Sí       | Client
*.sap.username 	         | Sí       | Usuari de connexió
*.sap.password 	         | Sí       | Password de connexió
*.sap.language 	         | Sí       | Idioma
*.sap.hostname 	         | Sí       | Nom del servidor
*.sap.systemNumber 	     | Sí       | SAP system number
*.sap.connectionPool     | No       | Connexió amb pool. Per defecte: true
*.sap.connectionPoolName | No       | Nom del pool. Per defecte: poolCanigoSAP
*.sap.maxNumConnections  | No       | Número de connexions màximes. Per defecte: 5
*.sap.repositoryName     | No       | Nom del repository. Per defecte: ARAsoft

## Utilització del Mòdul

La utilització del Connector es basa principalment en la configuració. L'ús directe des dels clients es permet mitjançant les interfícies definides.

El connector del Gecat ofereix tres operacions: alta de factures online, consultes i reserves. Cada operació té una classe que conté tota la informació de l'operació (o crida) i un altra amb la informació que retorna SAP per aquesta operació. Cada classe conté un altra classe per cada línia que tingui l'operació.

Si per exemple tenim l'operació consultaFactura, que conté una sola línia, daddadesConsulta, haurem de crear un objecte de la classe DadesConsultaFacturaType i un altre de DadesConsultaType. Aquesta última l'omplirem amb totes les dades que facin falta mitjançant els seus mètodes setters (setSocietat, setCodiCreditor, etc..). Un cop omplert del tot aquest objecte (que representa una sola línia), l'assignarem a l'altre (que és el que representa tota la consulta) mitjançant també un mètode setter: dadesConsultaFactura.setDadesConsulta(dadesConsulta). Si tingués més línies, hauríem de fer el mateix per a totes.

En el cas en que una mateixa línia pugui aparèixer més d'una vegada la forma de fer les operacions canvia, ja que el conjunt de totes les línies del mateix tipus aniran dins d'una llista.

Un cop hem creat l'objecte de crida amb totes les dades necessàries, utilitzarem un objecte de la classe GecatConnector per obtenir l'objecte de retorn amb les dades retornades pel SAP.

### REST

Per a utilitzar aquest mòdul, cal crear un Controller i un Service:

**GecatService.java**

Classe Java on es realitzarà la lògica de la operació a realitzar i es connecta amb el mòdul de Notificacions electròniques.

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import cat.gencat.ctti.canigo.arch.integration.gecat.connector.GecatConnector;
import cat.gencat.ctti.canigo.arch.integration.gecat.consultes.ConsultaTerritori.DadesConsultaTerritoriType;
import cat.gencat.ctti.canigo.arch.integration.gecat.consultes.ConsultaTerritori.DadesConsultaType;
import cat.gencat.ctti.canigo.arch.integration.gecat.consultes.ConsultaTerritori.ObjectFactory;
import cat.gencat.ctti.canigo.arch.integration.gecat.consultes.ConsultaTerritoriRetorn.DadesConsultaTerritoriRetornType;

@Service("gecatService")
@Lazy
public class GecatService {

	private static final Logger log = LoggerFactory.getLogger(GecatService.class);

	@Autowired
    private GecatConnector gecatConnector;
    

	public String testGecat(){
		
		String message;

		try {

            ObjectFactory objectFactory = new ObjectFactory();

            /**
             * creem l'objecte per fer la consulta
             **/
            DadesConsultaTerritoriType dadesConsultaTerritori = objectFactory.createDadesConsultaTerritoriType();
            DadesConsultaType dadesConsulta = objectFactory.createDadesConsultaType();
            dadesConsulta.setCodiTerritori("0217188");
            dadesConsultaTerritori.setDadesConsulta(dadesConsulta);
            DadesConsultaTerritoriRetornType dadesConsultaRetorn = gecatConnector.consultaTerritori(dadesConsultaTerritori);

            log.info("getCodiTerritori():" +
                    dadesConsultaRetorn.getDadesRetorn().getCodiTerritori());
            log.info("getNomTerritori():" +
                    dadesConsultaRetorn.getDadesRetorn().getNomTerritori());

            message = "Resultat test : " + dadesConsultaRetorn.getDadesRetorn().getNomTerritori();
          } catch (Exception e) {
        	  message = "Error al test : " + e.getMessage();
        	  log.error(e.getMessage(),e);
          }
		
		return message;
    }
	
}
```

**GecatServiceController.java**  

Controller que publica les operacions disponibles per a qui hagi de consumir-les.

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cat.gencat.plantilla32.service.GecatService;

@RestController
@RequestMapping("/gecat")
public class GecatServiceController {

	@Autowired
	GecatService gecatService;

	@PostMapping(produces = { MediaType.APPLICATION_JSON_VALUE })
	public String testGecat() throws Exception {
		return gecatService.testGecat();
	}
}
```


### Consideracions

Crides a Gecat sense línies repetides

* Retorn sense línies repetides

Per mostrar aquest tipus de crida agafarem com exemple la consulta de partida pressupostària.

Primerament crearem tots els objectes que necessitarem per fer el procediment:

```java
cat.gencat.ctti.canigo.arch.integration.gecat.consultes.ConsultaPartidaPressupostaria.ObjectFactory objectFactory = new cat.gencat.ctti.canigo.arch.integration.gecat.consultes.ConsultaPartidaPressupostaria.ObjectFactory();
```

La classe ObjectFactory és, com el seu nom indica, una classe per crear objectes d'altres classes. Aquestes classes són les que ofereix JAXB per crear objectes amb una certa estructura predefinida. Crearem un objecte de la classe ObjectFactory per crear els objectes que serviran per fer la crida (objectFactory).

Seguidament crearem un objecte que representarà la crida completa. Aquest objecte contindrà un objecte per a cada línia que tingui la crida. Aquests objectes són els que s'han de completar amb la informació de la crida.

```java
DadesConsultaPartidaPressupostariaType dadesConsultaPartidaPressupostaria = objectFactory.createDadesConsultaPartidaPressupostariaType();

DadesConsultaType dadesConsulta = objectFactory.createDadesConsultaType();
dadesConsulta.setCentreGestor("1006");
dadesConsulta.setEntitatCP("1000");
dadesConsulta.setExercici("2002");
dadesConsulta.setPosicioPressupostaria("D/220100100/4551");
dadesConsulta.setVinculacio("S");
dadesConsultaPartidaPressupostaria.setDadesConsulta(dadesConsulta);
```

Amb aquest objecte ja podem fer la crida al SAP mitjançant el mètode consultaPartidaPressupostaria de la classe GecatConnector. Aquesta funció requereix de l'objecte de consulta.

```java
DadesConsultaPartidaPressupostariaRetornType dadesConsultaRetorn = gecatConnector.consultaPartidaPressupostaria(dadesConsultaPartidaPressupostaria);
```

En aquest punt ja tenim l'objecte de retorn llest per a ser utilitzat per l'aplicació.

```java
System.out.println("getDenominacio():" + dadesConsultaRetorn.getDadesRetorn().getDenominacio());
```

* Retorn amb línies repetides

Per mostrar aquest tipus de crida agafarem com exemple la consulta de creditor.

Primerament crearem tots els objectes que necessitarem per fer el procediment:

```java
net.gencat.gecat.consultes.ConsultaCreditor.ObjectFactory objectFactory = new net.gencat.gecat.consultes.ConsultaCreditor.ObjectFactory();
```

La classe ObjectFactory és, com el seu nom indica, una classe per crear objectes d'altres classes. Aquestes classes són les que ofereix JAXB per crear objectes amb una certa estructura predefinida. Crearem un objecte de la classe ObjectFactory per crear els objectes que serviran per fer la crida (objectFactory).

Seguidament crearem un objecte que representarà la crida completa. Aquest objecte contindrà un objecte per a cada línia que tingui la crida.

```java
DadesConsultaCreditorType dadesConsultaCreditor = objectFactory.createDadesConsultaCreditorType();
DadesConsultaType dadesConsulta = objectFactory.createDadesConsultaType();
dadesConsulta.setNIFoCodiCreditor("A53062927");
dadesConsulta.setRegistreInicial("001");
dadesConsulta.setSocietat("1000");
dadesConsultaCreditor.setDadesConsulta(dadesConsulta);
```

Haurem de passar al connector l'objecte de consulta mitjançant el mètode consultaCreditor de l'objecte gecatConnector:

```java
DadesConsultaCreditorRetornType dadesConsultaRetorn = gecatConnector.consultaCreditor(dadesConsultaCreditor);
```

Ara ja tenim l'objecte de retorn llest per a ser utilitzat:

```java
List finalList = dadesConsultaRetorn.getDadesRetorn().getDadaRetorn();
System.out.println("dadaRetorn.getAdreca:" + ((DadaRetornType)finalList.get(0)).getAdreca());
```

**Crides a Gecat amb línies repetides**

Per mostrar aquest altre tipus de crida prendrem com exemple l'alta de factures habilitats.

Crearem tots els objectes que necessitarem per fer el procediment:

```java
cat.gencat.ctti.canigo.arch.integration.gecat.factures.FacturesHabilitatsOnline.ObjectFactory objectFactory = new cat.gencat.ctti.canigo.arch.integration.gecat.factures.FacturesHabilitatsOnline.ObjectFactory();
```

La classe ObjectFactory és, com el seu nom indica, una classe per crear objectes d'altres classes. Aquestes classes són les que ofereix JAXB per crear objectes amb una certa estructura predefinida. Crearem un objecte de la classe ObjectFactory per crear els objectes que serviran per fer la crida (objectFactory).

Seguidament crearem un objecte que representarà la crida completa. Aquest objecte contindrà un objecte per a cada línia (o conjunt de línies) que tingui la crida.

```java
DadesAltaFacturesHabilitatsOnlineType dadesAltaFacturaHabilitats = objectFactory.createDadesAltaFacturesHabilitatsOnlineType();
DadesGeneralsFacturaType dadesGeneralsFactura = objectFactory.createDadesGeneralsFacturaType();
dadesGeneralsFactura.setDataCompt("24051980");
dadesGeneralsFactura.setDataDocument("01");
.
.
.
dadesGeneralsFactura.setTransaccio("ZD21");
dadesAltaFacturaHabilitats.setDadesGeneralsFactura(dadesGeneralsFactura);
```

Si la línia pot estar repetida, com en el cas de retencions habilitat subhabilitat, haurem de crear una llista d'objectes que representen una línia:

```java
RetencionsHabilitatSubhabilitatType retencionsHS = objectFactory.1createRetencionsHabilitatSubhabilitatType();
List retencionsHSList = retencionsHS.getRetencioHabilitatSubhabilitat();
RetencioHabilitatSubhabilitatType retencioHS = objectFactory.
createRetencionsHabilitatSubhabilitatTypeRetencioHabilitatSubhabilitatType();

retencioHS.setImportBase("1500");
retencioHS.setImportRetencio("25000");
retencioHS.setIndicadorRetencio("01");
retencioHS.setTipusRegistre("3");
retencioHS.setOrder(0);
retencionsHSList.add(retencioHS);

retencioHS = (RetencioHabilitatSubhabilitatType)retencioHS.getClass().newInstance();
retencioHS.setImportBase("1600");
retencioHS.setImportRetencio("26000");
retencioHS.setIndicadorRetencio("01");
retencioHS.setTipusRegistre("3");
retencioHS.setOrder(1);
retencionsHSList.add(retencioHS);

dadesAltaFacturaHabilitats.setRetencionsHabilitatSubhabilitat(retencionsHS);
```

Fixem-nos que és important donar un ordre a les línies contingudes en la llista:

```java
retencioHS.setOrder(0);
```

Amb aquest objecte ja podem fer la crida al SAP, mitjançant el mètode altaFacturesHabilitats de l'objecte gecatConnector:

```java
DadesConsultaCreditorRetornType dadesConsultaRetorn = gecatConnector.consultaCreditor(dadesConsultaCreditor);
```

Ara ja disposem de l'objecte de retorn per a ser utilitzat:

```java
List finalList = dadesAltaFacturaRetorn.getDadesRetorn().getDadaRetorn();
System.out.println("dadaRetorn.getClasseDocument():" +
((DadaRetornType)finalList.get(0)).getClasseDocument());
```

### Usuaris de prova

S'han habilitat dos usuaris per a fer proves amb el connector de Gecat. Aquests usuaris es poden fer servir en les proves de desenvolupament, però mai per a producció.

* ZBTCCANIGO per a les interfases "batch".
* ZINTCANIGO per a les interfases "on-line".
