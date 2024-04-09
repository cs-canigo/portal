+++
date        = "2024-04-10"
title       = "SIC. Deprecado SIC 2.0"
description = "Migració de pipelines a SIC 3.0 i deprecado de SIC 2.0"
sections    = ["drafts"]
categories  = ["SIC"]
key         = "ABRIL2024"
+++

## Introducció

En els pròxims dies començaran els treballs de migració dels Job de Jenkins de SIC 2.0 a SIC 3.0 Els treballs implicaran la creació de nous pipelines en SIC 3.0, per al que es precisarà la col·laboració de tots els proveïdors amb la finalitat de modificar els fitxers de configuració ACA.yml. 
Des de l'equip SIC s'anirà contactant amb els proveïdors de les aplicacions de manera gradual per a fer els canvis necessaris en cadascuna de les aplicacions.

## Descripció dels treballs

Depenent del tipus de pipeline i desplegament utilitzat, la migració a SIC 3.0 impactarà de diferent forma, que es podria resumir de la manera següent:

- **Jobs de publicació de llibreries en Nexus** Aquest tipus de jobs tambien existeixen en SIC 3.0 i es migraran amb molt pocs canvis. Bastarà que el proveïdor de l'aplicació generi un nou ACA seguint els [exemples que existeixen en el portal d'arquitectura] (/plataformes/sic/guies/sic30-guies/fitxer-aca/)

- **Jobs d'execució de scritps de base de dades** En SIC 3.0 els job d'execució de script de base de dades compten amb el seu propi projecte en Gitblab i els seus propis Jobs, independentment d'altres artefactes que puguin formar part de l'aplicació. Es precisarà la realització de diverses accions per part del proveïdor de l'aplicació:

    1.- Dividir el codi en dos projectes en Gitlab, deixant d'una banda els script de base de dades, i per l'altre la resta d'artefactes estàtics i dinàmics de l'aplicació.

    2.- Creació d'un nou fitxer ACA de desplegament de base de dades segons els [exemples que existeixen en el portal d'arquitectura] (/plataformes/sic/guies/sic30-guies/fitxer-aca/)

    3.- Creació d'un nou fitxer ACA per a la resta d'artefactes seguint els [exemples que existeixen en el portal d'arquitectura] (/plataformes/sic/guies/sic30-guies/fitxer-aca/).

Amb aquests nous fitxers ACA es crearan les noves pipelines en SIC 3.0 que substituiran a les actuals utilitzades en SIC 2.0.

- **Jobs de desplegament en modalitat SEMIAUTOMATIC** En SIC 3.0 tambien existeixen jobs amb aquesta modalitat de desplegament, per tant, aquests jobs poden migrar-se a SIC 3.0 amb molt poques modificacions:

    1.- Si inclou artefactes de base de dades, tal com es va comentar en el punt anterior, caldrà separar els artefactes de script de base de dades de la resta d'artefactes.

    2.- S'haurà de crear un nou fitxer ACA  seguint els [exemples que existeixen en el portal d'arquitectura] (/plataformes/sic/guies/sic30-guies/fitxer-aca/).

- **Jobs de desplegament en modalitat AUTOMATIC o DELEGATED** Aquests Jobs es migraran a SIC 3.0 com jobs en modalitat DELEGATED. En aquest cas, a més del proveïdor de l'aplicació, també es precisarà la col·laboració del CPD:

    1.- El CPD realitzarà la implementació oportuna del desplegament delegat i proporcionarà l'identificador d'infraestructura.

    2.- El proveïdor de l'aplicació modificarà el fitxer ACA utilitzant aquest identificador d'infraestructura i seguint els[exemples que existeixen en el portal d'arquitectura] (/plataformes/sic/guies/sic30-guies/fitxer-aca/).


## Pla d'acció

L'equip SIC contactarà amb els proveïdors de les diferents aplicacions per a iniciar els treballs de migració d'un determinat conjunt de jobs de SIC 2.0

    1.- En primer lloc s'enviarà un comunicat des de SIC indicant el conjunt de jobs afectats i els treballs a realitzar.

    2.- El proveïdor de l'aplicació designarà una o diverses persones de contacte.
    
    3.- Opcionalment es pot celebrar una sala tècnica per a aclarir dubtes.
    
    .- Es proposarà un termini raonable per a realitzar les adaptacions i proves pertinents, transcorregut el qual, es desactivaran els job de SIC 2.0 no permetent-se més desplegaments des d'aquesta plataforma.


<br/><br/>

Si teniu qualsevol dubte o problema sobre els serveis del SIC, podeu revisar les [**Preguntes Freqüents**](/sic/faq)
o utilitzar els canals de [**Suport**](/sic/suport).