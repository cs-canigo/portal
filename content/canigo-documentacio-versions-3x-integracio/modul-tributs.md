+++
date        = "2015-03-20T09:09:23+01:00"
title       = "Tributs"
description = "Servei de consulta de dades fiscals de la PICA."
section     = "Canigó. Documentació versió 3.x"
weight      = 16
+++

## Introducció

L'objectiu d'aquest connector ,es el de proporcionar accés als 3 grans serveis de consulta de dades fiscals que actualment ofereix la PICA. Aquests tres serveis són:

* AEAT: Agència Estatal de l'Administració Tributària
* ATC: Agència Tributària de Catalunya
* TGSS: Tresoreria General de la Seguretat Social

a més també es troba integrat el servei AEAT_ATC_TGSS que sintetitza una petita suite de les modalitats de servei dels 3 productes anteriors.

### Propòsit

El propòsit del connector és proporcionar una interfície funcional reduïda al connector de la Pica que simplifica l'utilització del servei de consulta de dades fiscals ofert per la generalitat.

### Context i Escenaris d'ús

El connector PICA-TRIBUTS es troba dins els connectors de serveis funcionals de la Generalitat.

### A qui va dirigit

Aquest document va dirigit als següents perfils:

* Programador. Per conèixer l'ús del connector.
* Arquitecte. Per conèixer quins són els components i la configuració del connector.

## Descripció Detallada

### Introducció

Com ja s'ha comentat aquest connector sintetitza peticions als tres grans serveis oferts per la PICA relatius a la consulta de dades fiscals.

### Serveis

#### Servei AEAT (Agència Estatal de l'Administració Tributària)

La seva finalitat és l'obtenció de dades tributàries de l'AEAT per consultar, per part dels gestors públics, les dades relatives als contribuents que ofereix l'Agència Estatal de l'Administració Tributària.

Per una descripció detallada del servei i de les seves modalitats es pot consultar el document "Guia d'us del servei AEAT_PICA v1.7.pdf" disponible en l'àrea privada de http://cttiprojectes.gencat.cat/web/otpica en la secció "productes Oferts -> Interoperabilitat -> AEAT"

Modalitats:

* AEAT_PICA_C1: Està al corrent de pagament/ No està al corrent de pagament.
* AEAT_PICA_C2: Les dades del certificat individual de renda.
* AEAT_PICA_C3: Les dades identificatives del CIF o DNI/NIE corresponent.
* AEAT_PICA_C4: Les dades del certificat de renda per a prestacions socials.
* AEAT_PICA_C5: Les dades del certificat de renda d'agricultors.
* AEAT_PICA_C6: Les dades del certificat de renda per a beques.
* AEAT_PICA_C7: Les dades del certificat de renda per a beques anticipades.
* AEAT_PICA_C8: Les dades del certificat de l'impost d'activitats econòmiques.

Totes les modalitats anteriors són síncrones.

#### Servei ATC (Agència Tributària de Catalunya)

El servei d'obtenció del certificat de deutes amb la Generalitat de Catalunya té com a objectiu poder consultar per part dels gestors públics les dades que ofereix l'Agència Tributària de Catalunya respecte a deutes amb la Generalitat.

Per una descripció detallada del servei i de les seves modalitats es pot consultar el document "Guia d'us del servei de l'ATCv1.4.3.pdf" disponible en l'àrea privada de http://cttiprojectes.gencat.cat/web/otpica en la secció "productes Oferts -> Interoperabilitat -> ATC"

Modalitats:

* ATC_INF_DEUTES_TMP: Modalitat de servei asíncrona que retorna les dades d'un certificat de deutes amb la Generalitat de Catalunya.

#### Servei TGSS (Tresoreria General de la Seguretat Social)

El servei d'obtenció de dades de la seguretat social de la TGSS té com a objectiu poder consultar, per part dels gestors públics, les dades que ofereix la Tresoreria General de la Seguretat Social.

Per una descripció detallada del servei i de les seves modalitats es pot consultar el document "Guia d'us del servei de TGSS v1.6.pdf" disponible en l'àrea privada de http://cttiprojectes.gencat.cat/web/otpica en la secció "productes Oferts -> Interoperabilitat -> TGSS"

Modalitats:

* TGSS_AL_CORRENT_PAGAMENT: Especifica si una persona o una organització té algun deute amb la seguretat social en el moment de fer la consulta.
* TGSS_INFORME_SITUACIO: Aquest informe especifica si una persona cotitzava a una data determinada, per tant és un possible sinònim de si la persona treballava o no.
* TGSS_ACREDITACIO_AGRARIA_PROPI: Aquest informe especifica les situacions de les acreditacions de jornades agràries en un període de temps determinat pels valors del filtre.

#### Servei AEAT_ATC_TGSS

L'objectiu del Servei de consulta de la situació de deute d'un contribuent respecte de AEAT, ATC i TGSS és l'agrupació dels productes AEAT (Agència Estatal de l'Administració Tributària), ATC(Agència Tributària de Catalunya) i TGSS (Tresoreria General de la Seguretat Social) en una sola consulta per a la obtenció de la situació de deute d'un contribuent a AEAT, ATC i TGSS. En concret, és l'agrupació de les modalitats següents:

-AEAT: Certificat d'obligacions tributàries (AEAT_PICA_C1)<br>
-ATC: Informe de situació de deutes amb la Generalitat de Catalunya (ATC_INF_DEUTES_TMP)<br>
-TGSS: Informe de situació de deutes de la TGSS (TGSS_AL_CORRENT_PAGAMENT)<br>

Per una descripció detallada del servei i de les seves modalitats es pot consultar el document "Guia d'us del servei deutes del contribuent AEAT-ATC-TGSS v1.1.pdf" disponible en l'àrea privada de http://cttiprojectes.gencat.cat/web/otpica en la secció "productes Oferts -> Interoperabilitat -> AEAT_ATC_TGSS"

Modalitats:

* AEAT_ATC_TGSS_CONSULTA_DEUTES: Modalitats de servei asíncrona que llença una petició de consulta sobre les modalitats anteriorment anomenades dels tres serveis de consulta de dades fiscals AEAT, ATC i TGSS.

Totes les modalitats anteriors són síncrones.

## Arquitectura i Components

### Interfícies i Components Genèrics

Es pot trobar tota el codi font referent aquests components a les següents url's:

Codi Font:  http://repos.canigo.ctti.gencat.cat/repository/maven2/cat/gencat/ctti/canigo.integration.tributs.pica/1.1.0/  

### Requeriments

El connector TRIBUTS és compatible amb les versions 1.5 o superior de Java. Per versions inferiors no és garantit el seu correcte funcionament.

Per tal de que el connector DNI funcioni correctament sobre l'aplicació que l'utilitzi, es s'ha de tenir configurat el servei connector genèric de la PICA 1.1.0.

## Configuració


Per configurar el mòdul d'integració PICA-DNI és necessari configurar els següents arxius:

1.- Importar el mòdul PICA-DNI amb el plugin de Canigó 3 de l'eclipse o bé incorporar manualment les seves dependències en el pom.xml de l'aplicació.

En el pom.xml:

```
<canigo.integration.tributs.pica.version>[1.1.0,1.2.0)</canigo.integration.tributs.pica.version>
...

<!-- Dependencia del mòdul PICA-TRIBUTS -->
<dependency>
        <groupId>cat.gencat.ctti</groupId>
	<artifactId>canigo.integration.tributs.pica</artifactId>
	<version>${canigo.integration.tributs.pica.version}</version>
</dependency>
```

2.- Crear l'arxiu /config/props/tributs.properties amb el següent contingut:

```
*.tributs.pica.nifEmisor=[nifEmisor]
*.tributs.pica.nomEmisor=[nomEmisor] #normalment:"CONSORCI AOC"
*.tributs.pica.nomEmisorCAT365=[nomEmisor] #normalment:"CONSORCI AOC"
*.tributs.pica.finalitat=[finalitat]
*.tributs.pica.url=http://preproduccio.pica.intranet.gencat.cat/pica_cataleg/AppJava/services/
*.tributs.pica.nomFuncionari=[nomFuncionari]
*.tributs.pica.nifFuncionari=[nifFuncionari]
*.tributs.pica.emailFuncionari=[emailFuncionari]
```

Els valors d finalitat, urlPica, nifEmisor i nomEmisor s'han de consultar a la OT PICA en requeridors.otpica.ctti@gencat.cat

NOTA: El valor per defecte de urlPica es la de l'entorn de Pre-producció.

3.- Configurar l'arxiu /config/props/pica.properties amb el següent contingut:

```
*.pica.modes.passwordType=PasswordText
*.pica.requirer.signatureFile=classpath:config/cert/signature.properties
*.pica.requirer.petitionerId=[petitionerId]
*.pica.requirer.transmitionId=[transmitionId]
*.pica.requirer.petitionerName=[petitionerName]
*.pica.requirer.password=[password]
*.pica.requirer.user=[password]
*.pica.axisdefinition.location=classpath:axis2client/
*.pica.trustStore.location=classpath:config/cert/certificats.jks
*.pica.trustStore.type=JKS
*.pica.trustStore.password=[trustStore.password]
```

Els valors entre [] s'han de consultar a la OT PICA en requeridors.otpica.ctti@gencat.cat

4.- Configurar l'arxiu /spring/app-integration-tributs.xml amb el següent contingut:

```
<!-- BEAN DE LA PICA -->
<bean id="picaService" class="cat.gencat.ctti.canigo.arch.integration.pica.PicaServiceWrapperImpl" scope="prototype">
    <property name="axisDefinition" value="${pica.axisdefinition.location}"/>
    <property name="trustStoreSSLKeystore" value="${pica.trustStore.location}" />
    <property name="trustStoreSSLKeystoreType" value="${pica.trustStore.type}" />
    <property name="trustStoreSSLKeystorePassword" value="${pica.trustStore.password}" />
    <property name="requeridor" ref="requeridor"/>
    <property name="modalitats">
        <map>

        </map>
    </property>
</bean>
```

Les propietats trustStoreSSLKeystore, trustStoreSSLKesytoreType i trustStoreSSLKeystorePassword només són necessàries en cas d'accedir a la url de la PICA mitjançant HTTPS.

### Utilització del Connector

#### Exemple d'utilització d'una modalitat de Servei de AEAT

Recuperar el bean del servei de AEAT des de la classe on es vol utilitzar:

```java
@Autowired
private AeatConnectorImpl aeatConnector;
```

Fer la crida a la modalitat del servei desitjat, p.e.:

```java
DadesPeticioAEAT peticio = new DadesPeticioAEAT();
peticio.setNom("Cristian");
peticio.setCognom1("Casals");
peticio.setCognom2("Molina");
peticio.setNomComplet("Cristian Casals Molina");
peticio.setTipusDocument("NIF");
peticio.setDocument("39361642V");
	
C1PICAResponse resposta = aeatConnector.ObligacionsTributaries(peticio);
```

Per més informació sobre les dades d'entrada i sortida d'aquesta modalitat es pot consultar el document "Guia d'us del servei AEAT_PICA v1.7.pdf"

#### Exemple d'utilització del servei ATC

Recuperar el bean del servei de ATC des de la classe on es vol utilitzar:

```java
@Autowired
private AtcConnectorImpl atcConnector;
```

En aquest cas d'exemple es consumirà la modalitat de servei ATC_INF_DEUTES_TMP que retorna les dades d'un certificat de deutes amb la Generalitat de Catalunya.

Donat que el servei ATC es consumeix de forma asíncrona la forma correcta per poder consumir-ho es realitza en 3 fases:

1. Fer petició al Servei
2. Testar l'estat de resolució de la petició
3. Recuperar les dades de la petició

NOTA: Les dades de nom, cognom1 i 2, nom complet i el valor del document sobre l'exemple son inventades.

```
DadesPeticioATC peticio = new DadesPeticioATC();
    	
peticio.setIdioma("Català");
peticio.setNom("Nom");
peticio.setCognom1("Cognom1");
peticio.setCognom2("Cognom2");
peticio.setNomComplet("Nom Cognom1 Cognom2");
peticio.setDocument("12341234D");
peticio.setTipusDocument("NIF");
DataResponse resposta = atcConnector.informeSituacioDeute(peticio); //<-- Petició al servei
    
EstatAsincron estatResposta = atcConnector.getEstatInformeSituacioDeute(resposta.getResponse()); //<-- Comprovació estat petició
int tempsEstimat = estatResposta.getTempsEstimatResposta();
  
...
    	
Informacio inf = atcConnector.getDadesInformeSituacioDeute(resposta.getServei()); //<-- Recuperació resposta a la petició
```

Per més informació sobre les dades d'entrada i sortida d'aquesta modalitat es pot consultar el document "Guia d'us del servei de l'ATCv1.4.3.pdf"

#### Exemple d'utilització d'una modalitat de Servei TGSS

Recuperar el bean del servei de TGSS des de la classe on es vol utilitzar:

```java
@Autowired
private TgssConnectorImpl tgssConnector;
```

En aquest cas d'exemple es consumirà la modalitat de servei TGSS_AL_CORRENT_PAGAMENT que especifica si una persona o una organització té algun deute amb la seguretat social en el moment de fer la consulta.

NOTA: Les dades de nom, cognom1 i 2, nom complet i el valor del document sobre l'exemple son inventades.

```java
DadesPeticioTGSS peticio = new DadesPeticioTGSS();
peticio.setNom("Nom");
peticio.setCognom1("Cognom1");
peticio.setCognom2("Cognom2");
peticio.setNomComplet(null);
peticio.setTipusDocumentacioInt(Constants.TGSS_NIF);
peticio.setDocument("12345678B");

RespostaAlCorrentDePagament resposta = tgssConnector.alCorrentPagament(peticio);
```

Per més informació sobre les dades d'entrada i sortida d'aquesta modalitat es pot consultar el document "Guia d'us del servei de TGSS v1.6.pdf"

#### Exemple d'utilització del servei AEAT_ATC_TGSS

Recuperar el bean del servei de AEAT_ATC_TGSS des de la classe on es vol utilitzar:

```java
@Autowired
private TgssConnectorImpl tgssConnector;
```

En aquest cas d'exemple es consumirà la modalitat de servei AEAT_ATC_TGSS_CONSULTA_DEUTES que retorna les dades conjuntes de les modalitats següents:

-AEAT: Certificat d'obligacions tributàries (AEAT_PICA_C1)<br>
-ATC: Informe de situació de deutes amb la Generalitat de Catalunya (ATC_INF_DEUTES_TMP)<br>
-TGSS: Informe de situació de deutes de la TGSS (TGSS_AL_CORRENT_PAGAMENT)

Donat que el servei AEAT_ATC_TGSS es consumeix de forma asíncrona la forma correcta per poder consumir-ho es realitza en 3 fases:

1. Fer petició al Servei
2. Testar l'estat de resolució de la petició
3. Recuperar les dades de la petició

NOTA: Les dades de nom, cognom1 i 2, nom complet i el valor del document sobre l'exemple son inventades.

```java
DadesPeticioAEAT_ATC_TGSS peticio = new DadesPeticioAEAT_ATC_TGSS();
			
peticio.setIdioma("Català");
peticio.setTipusDocumentacio(Constants.AAT_NIF);
peticio.setDocument("12345678B");
peticio.setNom("Nom");
peticio.setNomComplet("Nom Cognom1 Cognom2");
peticio.setCognom1("Cognom1");
peticio.setCognom2("Cognom2");
			
resposta = aeatAtcTgssConnector.consultaDeutes(peticio); //<-- Petició al servei
		
EstatAsincron estatResposta = aeatAtcTgssConnector.getEstatConsultaDeutes(resposta.getResponse()); //<-- Consulta de l'estat de la petició
int tempsEstimat = estatResposta.getTempsEstimatResposta();
	
...

RespostaConsultaDeutes dadesResposta = aeatAtcTgssConnector.getDadesConsultaDeutes(resposta.getServei()); //<-- recuperació de les dades de la petició
```

Per més informació sobre les dades d'entrada i sortida d'aquesta modalitat es pot consultar el document "Guia d'us del servei deutes del contribuent AEAT-ATC-TGSS v1.1.pdf"
