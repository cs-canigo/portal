+++
date        = "2019-02-22"
title       = "Consideracions en desplegaments a XPaaS"
description = "Consideracions generals a tenir present en desplegaments sobre plataformes xPaaS"
sections    = "xPaaS Cloud"
weight      = 2
categories  = ["cloud","cloudfoundry", "ibmcloud"]
+++

Al desplegar una aplicació a les diferents plataformes xPaaS cal tenir present una sèrie de consideracions.
Algunes apliquen a qualsevol plataforma, altres apliquen a plataformes en concret.

- **Tots els desplegaments a IBMCloud Buildpack es faran via SIC**
- En un desplegament a una plataforma xPaaS es poden identificar quatre blocs clarament diferenciats:

  - **Custòdia del codi font**. És comú a totes les aplicacions.
  - **Construcció dels artefactes de l'aplicació**. És comú a totes les aplicacions.
  - **Construcció de les metadades de desplegament**. És un pas addicional que no és present en el desplegament d'aplicacions tradicional.
  - **Desplegament pròpiament dit**. Tot i que és comú a totes les aplicacions, desplegar als xPaaS presenta certes particularitats que cal tenir present.

## Custòdia del codi font

Els artefactes destinats a ser desplegats. Es construiran a partir de codi font repositat al [Servei de custòdia de codi font del SIC.](https://canigo.ctti.gencat.cat/sic-serveis/scm/)

**Es crearà un projecte/repositori diferent per cada component que sigui desplegat.**

**En cas de generar llibreries que seran compartides per diferents aplicacions es crearà un projecte/repositori per cadascuna d'elles.**

## Construcció dels artefactes

És important notar que **l'artefacte desplegat serà el mateix a tots els entorns**, això implica que la definició de les propietats específiques de l'entorn han d'estar definides en variables d'entorn.

Notar la necessitat de definir la versió de l'artefacte utilitzant el fitxer **sic.yml** a la carpeta **sic**, amb la propietat **version** que defineix la versió del artefacte/imatge.

Addicionalment a la definició manual de la versió de l'artefacte, en desenvolupaments basats en **maven** es pot generar la versió automàticament a partir de la versió definida al **pom.xml**. Es pot trobar més informació a l'article [Integració d'una aplicació Canigó a SIC 2.0](https://canigo.ctti.gencat.cat/howtos/2017-12-howto-integracio_canigo_sic/)

La construcció de l'artefacte es realitzarà al SIC.

Cal proporcionar a l'equip de Sic/Suport Cloud les instruccions necessàries, incloent-hi les eines i versions, per construir els artefactes a desplegar.

Podeu trobar més informació a [Integració d'aplicacions xPaaS a SIC](https://canigo.ctti.gencat.cat/cloud-xpaas/integracio-xpaas-sic/)

## Construcció de fitxers de metadades de desplegament

Les metadades de desplegament defineixen propietats i configuracions necessàries a l'hora de desplegar a la plataforma xPaaS.

La construcció dels fitxers de metadades es realitzarà al SIC a partir de la informació proporcionada pel lot d'aplicacions.

### IBMCloud BuildPacks

Informació necessaria:

- Buildpack que s'utilitzarà al PaaS.
- Nom de l'aplicació
- Memòria necessària
- Disc necessari
- Nombre d'instàncies
- Path de l'artefacte
- Serveis que s'utilitzaran
- Variables d'entorn
- Domini

### Altres plataformes

En l'actualitat el procés de creació de metadades via SIC no està implementat i es realitzarà manualment per part de l'equip de Suport Cloud.

## Desplegament

### IBMCloud BuildPacks

El desplegament a la plataforma xPaaS d'IBMCloud es realizarà via SIC.
No és necessària cap informació addicional més enllà de l'artefacte i les metadades de desplegament.

### Altres plataformes

En l'actualitat el desplegament via SIC no està implementat i es realitzarà manualment per part de l'equip de Suport Cloud.
