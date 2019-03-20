+++
date        = "2019-02-19"
title       = "Consideracions en desplegaments de contenidors"
description = "Consideracions generals a tenir present en desplegaments de contenidors"
sections    = "Container Cloud"
weight      = 9
categories  = ["cloud","docker","container","kubernetes","appagile","swarmme"]
+++

Al desplegar una aplicació a les diferents plataformes de contenidors cal tenir present una sèrie de consideracions.
Algunes apliquen a qualsevol plataforma, altres apliquen a plataformes en concret.

- **Tots els desplegaments a les diferents de contenidors es faran via SIC**
- En un desplegament de contenidors es poden identificar quatre blocs clarament diferenciats:

  - **Custòdia del codi font**. És comú a totes les aplicacions.
  - **Construcció dels artefactes de l'aplicació**. És comú a totes les aplicacions.
  - **Construcció de la imatge docker**. És un pas addicional que no és present en el desplegament d'aplicacions tradicional.
  - **Desplegament pròpiament dit**. Tot i que és comú a totes les aplicacions, desplegar als orquestradors docker presenta certes particularitats que cal tenir present.

## Custòdia del codi font

Els artefactes destinats a ser desplegats. Es construiran a partir de codi font repositat al [Servei de custodia de codi font del SIC.](https://canigo.ctti.gencat.cat/sic-serveis/scm/)

**Es crearà un projecte/repositori diferent per cada component que sigui desplegat com a contenidor.**

**En cas de generar llibreries que seran compartides per diferents aplicacions es crearà un projecte/repositori per cadascuna d'elles.**

## Construcció dels artefactes

És important notar que **l'artefacte desplegat serà el mateix a tots els entorns**, això implica que la definició de les propietats específiques de l'entorn han d'estar definides en variables d'entorn o fitxers de configuració.
Podeu trobar més informació de com gestionar la configuració i contrasenyes en contenidors a  [Fitxers de configuració a contenidors](https://canigo.ctti.gencat.cat/cloud-caas/configuracio-contenidors/)

Notar la necessitat de definir la versió de l'artefacte utilitzant el fitxer **sic.yml** a la carpeta **sic**, amb la propietat **version** que defineix la versió de l'artefacte/imatge.

Addicionalment a la definició manual de la versió de l'artefacte, en desenvolupaments basats en **maven** es pot generar la versió automàticament a partir de la versió definida al **pom.xml**. Es pot trobar més informació a l'article [Integració d'una aplicació Canigó a SIC 2.0](https://canigo.ctti.gencat.cat/howtos/2017-12-howto-integracio_canigo_sic/)

La construcció de l'artefacte es realitzarà al SIC. En cap cas es construirà l'artefacte a la construcció de la imatge docker.

Cal proporcionar l'equip de Sic/Suport Cloud les instruccions necessàries, incloent-hi les eines i versions, per construir els artefactes a desplegar.

Podeu trobar més informació a [Integració de contenidors a SIC](https://canigo.ctti.gencat.cat/cloud-caas/integracio-contenidors-sic/)

## Construcció de la imatge docker

El CTTI disposa d'un conjunt d'imatges docker homologades que es recomana utilitzar com a base per construir les imatges docker de les diferents aplicacions.
Aquestes imatges es poden consultar al [elements de catàleg](https://canigo.ctti.gencat.cat/cloud-caas/cataleg-contenidors/) i suporten les tecnologies més freqüents utilitzades a la Generalitat de Catalunya.

En cas de necessitar una imatge d'una tecnologia o producte no suportat, cal tenir present les consideracions indicades a [Criteris creació contenidors docker](https://canigo.ctti.gencat.cat/cloud-caas/dockerImages/)

A l'hora d'utilitzar les imatges base, en cap cas les copieu i les modifiqueu, feu una imatge que hereti de la imatge base. Dockerfile ex:

```
FROM docker-registry.ctti.extranet.gencat.cat/gencatcloud/tomcat:9.0-java8

ENV CATALINA_HOME /usr/local/tomcat

COPY artefacte ${CATALINA_HOME}/webapps
```

Totes les imatges base estan repositades al registre docker privat del CTTI i el seu codi font és accessible al gitlab a [Imatges-docker](https://git.intranet.gencat.cat/3048-intern/imatges-docker).

Podeu trobar més informació a [Registre docker privat.](https://canigo.ctti.gencat.cat/cloud-caas/dockerRegistry/)

## Desplegament

El desplegament a plataformes docker basades en Kubernetes (Kubernetes i Openshift) requereix la creació d'uns descriptors en format yaml.

Aquests descriptors seran creats per l'equip de desenvolupament i es repositaran a un projecte/repositori anomenat **Orchestrators** dins del grup del codi de diàleg del projecte.

Cada entorn i component d'aplicació estarà separat en carpetes. Ex:

- app1/PRE
- app1/PRO
- app2/PRE
- app2/PRO
- ...

En cadascuna d'aquestes carpetes s'inclouran tots els descriptors necessaris.
Els Secrets s'inclouran sense les dades sensibles, que seran gestionades per l'equip de Suport Cloud.

Podeu trobar més informació respecte als descriptors yaml de cadascuna de les plataformes a:

- [Contenidors AppAgile](https://canigo.ctti.gencat.cat/cloud-caas/contenidors_appagile/)
- [Contenidors Kubernetes](https://canigo.ctti.gencat.cat/cloud-caas/contenidors_kubernetes/)

El desplegament a la plataforma SwarmMe no requereix descriptors específics, però si requereix disposar de la següent informació:

- namespace
- imatge docker
- xarxa
- mida del contenidor
- domini
- port
- repliques
- paràmetres d'entorn
- ...

Bàsicament són les mateixes dades que s'informen als descriptors yaml.
