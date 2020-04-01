+++
date        = "2020-04-01"
title       = "GECAT"
description = "Utilització del connector al sistema SAP del Gecat"
sections    = "Canigó. Documentació versió 3.x"
weight      = 7
+++

<div class="message warning">

A partir de la publicació de Canigó 3.4.3 el 26/03/2020 aquest mòdul quedarà deprecat, per lo que no es preveu seguir evolucionant aquest mòdul.

</div>

## Propòsit

L'objectiu d’aquest article és **descriure la metodologia a seguir en la utilització del connector al sistema SAP de Gecat des de qualsevol aplicació Java del Framework J2EE**.
L'abast d'aquest connector es fonamenta en la utilització de les funcions d'alta de factures, consultes i reserves online del SAP de Gecat, així com totes les funcions batch.
El connector permet l'accés al SAP mitjançant objectes de consulta, transformant aquests objectes en una cadena de caràcters vàlida per al SAP. La cadena de retorn és transformada novament en un objecte que conté els registres de retorn.

## Instal·lació
Per a poder utilitzar el connector haurem de configurar el projecte per a que inclogui unes **llibreries DLL i diferents llibreries Java**:

* Les llibreries DLL són: *sapjcorfc.dll* i *librfc32.dll*, s'hauran de copiar al directori *system32*.

* Per a fer les operacions sobre el sistema SAP del Gecat és necessària la utilització de la llibreria *sapjco-2.1.6.jar*, que és el connector propi del SAP per a fer les crides a les seves funcions BAPI (RFC).

* Les classes que utilitzarem per a construïr els objectes d'operacions estan disponibles a la llibreria del connector Gecat09 *canigo-connectors-gecat09-2.3.2.jar*.

Les classes que utilitzarem per a fer les operacions han estat generades amb una eina Open Source anomenada JAXB (Java API for Xml Binding) que s’encarrega de
generar les classes Java a partir d'un esquema de Xml (*XMLSchema*). Aquesta eina ens permet no solament generar automàticament classes sinó també fer validacions
per a comprovar que les dades que contenen els objectes siguin vàlides. Serà necessari, per tant, incloure també:

* jaxb-api-1.0.1.jar
* jaxb-libs-1.0.6.jar
* jaxb-impl-1.0.5.jar
* jax-qname-1.1.jar
* namespace-1.0.1.jar
* relaxngDatatype-20020414.jar
* xsdlib-2013.6.1.jar

Per tal d'instal·lar el mòdul de GECAT es pot optar per incloure’l automàticament a través de l'eina de suport al desenvolupament o bé afegir manualment
en el fitxer *pom.xml* de l'aplicació la següent dependència:

```
<canigo.integration.gecat.version>[1.2.0,1.3.0)</canigo.integration.gecat.version>

<dependency>
          <groupId>cat.gencat.ctti</groupId>
          <artifactId>canigo.integration.gecat</artifactId>
          <version>${canigo.integration.gecat.version}</version>
</dependency>
```

## Configuració

La configuració es realitza automàticament a partir de l'eina de suport al desenvolupament.
El fitxer de configuració es troba a: *<PROJECT_ROOT>/src/main/resources/config/props/sap.properties*.

Propietat                | Requerit | Descripció
------------------------ | -------- | ----------
*.sap.client            | Sí       | Client
*.sap.username              | Sí       | Usuari de connexió
*.sap.password              | Sí       | Paraula de pas de connexió
*.sap.language              | Sí       | Idioma
*.sap.hostname              | Sí       | Nom del servidor
*.sap.systemNumber          | Sí       | SAP system number
*.sap.connectionPool     | No       | Connexió amb pool. Per defecte: true
*.sap.connectionPoolName | No       | Nom del pool. Per defecte: poolCanigoSAP
*.sap.maxNumConnections  | No       | Número de connexions màximes. Per defecte: 5
*.sap.repositoryName     | No       | Nom del repositori. Per defecte: ARAsoft

## Utilització

La utilització del connector es fonamenta en la seva **configuració prèvia i en la invocació des dels clients mitjançant les interfícies definides**.
El connector del Gecat ofereix tres operacions: alta de factures online, consultes i reserves.
Cada operació té associada una classe que conté tota la informació de l'operació (o crida) i un altra amb la informació de resposta.
Les operacions poden incloure una sola línia o diverses.

Per exemple, si tenim l'operació *consultaFactura* (que conté una sola línia *dadesConsulta*) haurem de crear un objecte de la classe *DadesConsultaFacturaType* i
un altre de *DadesConsultaType*. Aquest últim l'omplirem amb totes les dades necessàries mitjançant els seus mètodes d’assignació: *setSocietat*, *setCodiCreditor*, etcètera. Un cop emplenada la informació d’aquest objecte (que representa una sola línia) l'afegirem
a l'altre, que és el que representa tota la consulta, mitjançant també un mètode d’assignació *dadesConsultaFactura.setDadesConsulta()*.
Un cop hem creat l'objecte de crida amb totes les dades necessàries, utilitzarem un objecte de la classe *GecatConnector* per a obtenir l'objecte de sortida amb les dades retornades pel SAP.

### REST

Per a utilitzar aquest mòdul, cal crear un *Service* i un *Controller*.


#### Service (GecatService.java)

Aquesta classe és en la que s'implementarà la lògica de l’operació a realitzar i es connectarà amb el mòdul de notificacions electròniques.

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

#### Controller (GecatServiceController.java)

Controlador que publica les operacions disponibles per a que es puguin consumir.

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
   GecatService;

   @PostMapping(produces = { MediaType.APPLICATION_JSON_VALUE })
   public String testGecat() throws Exception {
      return gecatService.testGecat();
   }
}
```


### Exemples


#### Crides a Gecat sense línies repetides


##### Retorn sense línies repetides

Per a mostrar aquest tipus de crida agafarem com a exemple la **consulta de partida **.
Primerament caldrà crear un objecte de la classe *ObjectFactory* que, com el seu nom indica, és una classe per a crear
objectes d'altres classes. Aquestes classes són les que ofereix JAXB per a crear objectes amb una certa estructura predefinida.

```java
cat.gencat.ctti.canigo.arch.integration.gecat.consultes.ConsultaPartidaPressupostaria.ObjectFactory objectFactory = new cat.gencat.ctti.canigo.arch.integration.gecat.consultes.ConsultaPartidaPressupostaria.ObjectFactory();
```

Seguidament crearem un objecte de la classe *DadesConsultaPartidaPressupostariaType* que representarà la crida completa.
Aquest objecte contindrà un objecte de la classe *DadesConsultaType* per a cada una de les línies amb tota la informació necessària.

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

Ja podrem fer la crida al SAP mitjançant el mètode *consultaPartidaPressupostaria* de la classe *GecatConnector* passant-li l’objecte de consulta.

```java
DadesConsultaPartidaPressupostariaRetornType dadesConsultaRetorn = gecatConnector.consultaPartidaPressupostaria(dadesConsultaPartidaPressupostaria);
```

En aquest punt ja es disposa de l’objecte de retorn llest per a ser utilitzat per l'aplicació.

```java
System.out.println("getDenominacio():" + dadesConsultaRetorn.getDadesRetorn().getDenominacio());
```


##### Retorn amb línies repetides

Per a mostrar aquest tipus de crida agafarem com exemple la **consulta de creditor**.
Primerament caldrà crear un objecte de la classe *ObjectFactory* que, com el seu nom indica, és una classe per a crear objectes d'altres classes.
Aquestes classes són les que ofereix JAXB per a crear objectes amb una certa estructura predefinida.

```java
net.gencat.gecat.consultes.ConsultaCreditor.ObjectFactory objectFactory = new net.gencat.gecat.consultes.ConsultaCreditor.ObjectFactory();
```

Seguidament crearem un objecte de la classe *DadesConsultaCreditorType* que representarà la crida completa.
Aquest objecte contindrà un objecte de la classe *DadesConsultaType* per a cada una de les línies amb tota la informació necessària.

```java
DadesConsultaCreditorType dadesConsultaCreditor = objectFactory.createDadesConsultaCreditorType();
DadesConsultaType dadesConsulta = objectFactory.createDadesConsultaType();
dadesConsulta.setNIFoCodiCreditor("A53062927");
dadesConsulta.setRegistreInicial("001");
dadesConsulta.setSocietat("1000");
dadesConsultaCreditor.setDadesConsulta(dadesConsulta);
```

Ja podrem fer la crida al SAP mitjançant el mètode *consultaCreditor* de la classe *GecatConnector* passant-li l’objecte de consulta.

```java
DadesConsultaCreditorRetornType dadesConsultaRetorn = gecatConnector.consultaCreditor(dadesConsultaCreditor);
```

En aquest punt ja es disposa de l’objecte de retorn llest per a ser utilitzat per l'aplicació.

```java
List finalList = dadesConsultaRetorn.getDadesRetorn().getDadaRetorn();
System.out.println("dadaRetorn.getAdreca:" + ((DadaRetornType)finalList.get(0)).getAdreca());
```


#### Crides a Gecat amb línies repetides

Per a mostrar aquest tipus de crida agafarem com a exemple la **consulta de factures d’habilitats**.
Primerament caldrà crear un objecte de la classe *ObjectFactory* que, com el seu nom indica, és una classe per a crear objectes d'altres classes.
Aquestes classes són les que ofereix JAXB per a crear objectes amb una certa estructura predefinida.

```java
cat.gencat.ctti.canigo.arch.integration.gecat.factures.FacturesHabilitatsOnline.ObjectFactory objectFactory = new cat.gencat.ctti.canigo.arch.integration.gecat.factures.FacturesHabilitatsOnline.ObjectFactory();
```

Seguidament crearem un objecte de la classe *DadesAltaFacturesHabilitatsOnlineType* que representarà la crida completa.
Aquest objecte contindrà un objecte de la classe *DadesGeneralsFacturaType*
per a cada una de les línies amb tota la informació necessària.

```java
DadesAltaFacturesHabilitatsOnlineType dadesAltaFacturaHabilitats = objectFactory.createDadesAltaFacturesHabilitatsOnlineType();
DadesGeneralsFacturaType dadesGeneralsFactura = objectFactory.createDadesGeneralsFacturaType();
dadesGeneralsFactura.setDataCompt("24051980");
dadesGeneralsFactura.setDataDocument("01");
...
dadesGeneralsFactura.setTransaccio("ZD21");
dadesAltaFacturaHabilitats.setDadesGeneralsFactura(dadesGeneralsFactura);
```

Si la línia pot estar repetida, com en el cas de les retencions aplicades, haurem de crear una llista d'objectes de la classe *RetencionsHabilitatSubhabilitatType*.

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

Ja podrem fer la crida al SAP mitjançant el mètode *altaFacturesHabilitats* de la classe *GecatConnector* passant-li l’objecte d’alta.


```java
DadesConsultaCreditorRetornType dadesConsultaRetorn = gecatConnector.consultaCreditor(dadesConsultaCreditor);
```

En aquest punt ja es disposa de l’objecte de retorn llest per a ser utilitzat per l'aplicació.

```java
List finalList = dadesAltaFacturaRetorn.getDadesRetorn().getDadaRetorn();
System.out.println("dadaRetorn.getClasseDocument():" +
((DadaRetornType)finalList.get(0)).getClasseDocument());
```


### Entorn de proves

S'han habilitat dos usuaris per a fer proves amb el connector de Gecat i poden ser utilitzats per als desenvolupadors de cara a fer proves:

* ZBTCCANIGO per a les interfícies "batch"
* ZINTCANIGO per a les interfícies "online"

No obstant, **en cap cas es podran utilitzar en entorns productius**.