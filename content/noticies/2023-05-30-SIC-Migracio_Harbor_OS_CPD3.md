+++
date        = "2023-05-30"
title       = "SIC. Migració Registre d'imatges (Harbor) a Plataforma Openshift de Cpd3"
description = "El Registre d'imatges (Harbor) s'ha migrat a la Plataforma Openshift de Cpd3 amb l'objectiu de disposar d'un producte actualitzat, millorar el rendiment, el monitoratge i, en general, l'experiència d'usuari."
#sections    = ["Notícies", "home"]
#categories  = ["SIC"]
#key         = "JUNY2023"
+++

## Introducció

El **Servei d'Integració Contínua (SIC) és un servei a disposició dels proveïdors d'aplicacions per a automatitzar
el desplegament de les aplicacions**. Aquest servei fa ús del **Registre d'Imatges que proporciona un catàleg d'imatges
de construcció, un catàleg d'imatges base per a les aplicacions i, a més, permet persistir i gestionar les imatges
de les aplicacions** de cara a dur a terme els desplegaments sobre plataformes de cloud privat i cloud públic.

## Novetats

Amb l'objectiu principal de millorar l'experiència d'usuari, s'ha dut a terme la **migració del Servei de Registre d'imatges
(Harbor) als actuals clústers Openshift de Cpd3**, que permetrà, entre d'altres:

- Disposar d'entorns PRE i PRO aïllats.

- Disposar d'una versió de producte actualitzada, incorporant-lo al programa d'actualització periòdica.

- Aplicar el model de seguretat CTTI integrat amb Gicar.

- Automatitzar l'aprovisionament de projectes i gestió d'autoritzacions.

- Limitar l'ocupació d'espai de disc aplicant una política de retenció de les imatges repositades.

- Millorar el rendiment general del servei.

- Millorar el monitoratge del servei.

Podeu accedir al servei mitjançant el següent enllaç: **https://registreimatges.sic.intranet.gencat.cat/**.

### Principals canvis

A continuació es detalla la relació de principals canvis en l'operativa del servei:

- El servei passa a ser privat (àmbit intranet).

- Els usuaris s'autentiquen amb les seves credencials Gicar mitjançant doble factor d'autenticació.

- El catàleg corporatiu d'imatges de construcció "gencat-sic-builders" i el catàleg d'imatges base "gencatcloud"
passen a ser projectes públics, accessibles per a tots els usuaris.

- Els projectes d'imatges de les aplicacions s'aprovisionen automàticament en cas de no existir i seran accessibles
pels Release Managers del codi de diàleg.

- Les pipelines de desplegament etiquetaran les imatges de les aplicacions amb l'etiqueta "production" si aquestes
s'han desplegat amb èxit a producció. A tal efecte, les pipelines incorporen una nova etapa "Registry label" que
s'encarregarà de realitzar aquesta acció.

- S'aplica una política de retenció sobre les imatges de les aplicacions, de forma que únicament es respectaran les
últimes 10 versions productives de cada repositori i altres versions amb antiguitat inferior o igual a 90 dies.

### Migració

Es migra tot el contingut de repositoris i imatges dels catàlegs operatius, així com tots els repositoris i imatges
de les aplicacions aplicant, en aquest últim cas, un criteri alineat amb la política de retenció d'imatges: últimes 10
versions que han arribat amb èxit a producció i qualsevol versió posterior que no hagi arribat a producció. Aquest
criteri de migració permetrà que els desplegaments en curs puguin continuar fins a producció i que es pugui desplegar
un tag productiu (DEPLOY-TAG).

### Posada en servei

**El dia 08/06/2023 està previst posar en servei el nou Registre d'Imatges (https://registreimatges.sic.intranet.gencat.cat/)
que passa a substituir el servei antic (https://docker-registry.ctti.extranet.gencat.cat). No obstant això,
de cara a que els lots d'aplicacions disposin de marge suficient per a fer les oportunes adaptacions dels seus sistemes,
el domini antic seguirà donant servei única i exclusivament per a poder seguir fent ús de les imatges (pull).

En qualsevol cas, quan estigui previst donar de baixa el domini antic, es notificarà convenientment.

### Documentació

La documentació es troba en procés de revisió i serà actualitzada el dia de la posada en servei.

<br/><br/>
Si teniu qualsevol dubte o problema podeu revisar les [**Preguntes Freqüents**] (/sic/faq) o utilitzar els canals de [**Suport**] (/sic/suport).