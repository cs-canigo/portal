+++
date        = "2022-05-02"
title       = "Suport"
description = "Suport d'Eventhub"
sections    = "EventHub"
toc         = true
taxonomies  = []
weight      = 4
+++

## Oficina tècnica Eventhub

L’oficina tècnica Eventhub es va crear amb la finalitat de donar el suport necessari als departaments que es volen adherir a la seva plataforma.

L’oficina tècnica està pensada per ajudar en tot el procés d’integració, des de l’_onboarding_ de la aplicació a integrar-se amb Kafka fins el desplegament en els diferents entorns de la plataforma (INT, PRE i PRO).

### L’oficina tècnica s’encarrega de:

- Administrar la plataforma Confluent Kafka.
- Observabilitat de la plataforma.
- Afegir components d’arquitectura si calgués.
- Gestió de les peticions de manteniment dels esquemes (Schema Registry)
- Afegir nous plugins a Kafka Connect (mysql, oracle, sap, etc).
- Configurar connectors de Kafka Connect tant per source com per sink.
- Gestionar els usuaris d’aplicació i les seves autoritzacions.
- Ajudar a definir i configurar els topics necessaris per a la vostra aplicació.
- Fine tuning de topics i particions.
- Resolució de dubtes amb un equip d’experts en la tecnologia.
- Repositori de coneixement i experiències d’altres departaments.
- Generació d’informes detallats de consum dels topics.
- Suport a proves de rendiment.
- Donar suport a les aplicacions usuàries de la plataforma.
- Subscripció Gold amb Confluent, podem obrir tiquets de suport al fabricant
- Consultoria del fabricant en funció del cas d'ús. En cas que sigui necessari podem gestionar sessions de treball amb els consultors de Confluent.
- Donar accés per obrir tiquets a Confluent directament.

## Procediment de contacte amb l'Oficina Tècnica
En aquest apartat es descriu com s'ha de cursar la sol·licitud en cas de necessitat de realitzar una petició a l'Oficina Tècnica, ja sigui aprovisionament de recursos o dubtes d'integració.
- Accedir al JIRA CSTD: https://cstd-ctti.atlassian.net/
- Demanar mitjançant una petició [**REMEDY**](https://pautic.gencat.cat/) de tipus “Gestió accés d'usuaris”, seleccionant “Alta” i l’aplicació “JIRA CSTD”, indicant DNI i sol·licitant els permisos corresponents per a obrir peticions al servei Servei d’acompanyament de la plataforma EventHub (ACOEVENT).
- S'ha de crear una petició d'acompanyament amb les dades del vostre requeriment.
---
Per a més informació podeu contactar amb l'Oficina Tècnica mitjançant [e-mail](mailto:eventhub.ctti@gencat.cat). 

## Serveis que ofereix l’oficina tècnica

### Serveis actius a la plataforma i com demanar-los

_Kafka Brokers, Schema Registry i Kafka Connect_

- Onboarding per conèixer les seves necessitats, entendre el cas d’ús i tenir una visió de totes les peces. Ens podeu contactar a **eventhub.ctti@gencat.cat**

- Passes a seguir per integrar-se a la plataforma Eventhub
  - Obrir regles de firewall fins als endpoints de la plataforma als diferents entorns.
  - Demanar usuari a partir del codi de diàleg i nom d'aplicació.
  - Demanar certificats.
  - Demanar els topics.
- Aprovisionar, topics.
- Aprovisionar schemas.
- Ajudar en la definició dels topics (nombre de particions, rèpliques, etc). En cas de dubtes ens podeu obrir un tiquet i podem fer reunions de treball.
- En cas necessari, demanar la configuració de Kafka Connect per fer transferències de registres entre bases de dades o sistemes d’informació
- Seguiment de les Best practices de l’arquitectura
  - Per la integració d’aplicacions (consumir / produir)
  - Ús de les llibreries i dependències per la integració
  - Knowledge base de Confluent
  - Assessorament per la implementació de microserveis
- Comptem amb l’experiència d’altres equips ja integrats a la plataforma

## Demanar nou client del sistema
### Tiquet petició nou client Kafka
Quan un nou client vol integrar-se amb la plataforma Eventhub, el primer que ha de fer és realitzar una petició via tiquet aportant la següent informació:
Codi del projecte de 4 dígits.
Nom de l'aplicació
Entorn pel qual es vol: INT, PRE, PRO.

### Tasques a fer
**Crear nom usuari**

L’oficina tècnica crearà el nom de l’usuari segons les dades informades en el tiquet.

**Assignar rols i permisos**

L’oficina tècnica s’encarregarà de l'assignació dels permisos corresponents.

**Demanar certificat**

L’Oficina Tècnica proporcionarà un [script](/related/eventhub/mkcert.sh) de creació de la clau privada i CSR per facilitar aquesta tasca als clients. La clau privada s’ha d’emmagatzemar protegida i el CSR s’enviarà a l’AC, que el signarà i retornarà al client el certificat final (clau pública) signat amb Sectigo.

**Com generar certificats per als entorns de PRE i PRO**

Haureu de crear el CSR i clau privada.
El CSR s'ha d'enviar a l'Agència de Ciberseguretat perquè el signi amb la CA de Sectigo.
 
Ús de [l'script](/related/eventhub/mkcert.sh) per a la generació dels CSR i clau privada per a l'entorn de PRE:
```
./mkcert.sh -n nouClient -o /path/to/pre-cert -e pre
```

Un cop torneu el certificat signat, haureu de generar el fitxer JKS que utilitzareu per realitzar la connexió a partir d'aquest.

Podeu seguir els següents passos per generar el vostre jks:

- Crear un keystore PKCS12 temporal:
```
openssl pkcs12 -export -out nouClient.pkcs12 -in nouClient.client.eventhub.intranet.gencat.cat.cer -inkey nouClient.key -name nouClient -CAfile BundleCASectigo.cer -caname SectigoCARoot -chain
```
 
- Crear el keystore JKS a partir del PKCS12:
```
keytool -importkeystore -srckeystore nouClient.pkcs12 -srcstoretype PKCS12 -destkeystore nouClient.keystore.jks -deststoretype JKS
```
 
Nota: eliminar el PKCS12 després de crear el JKS.
 
- Incloure els certificats CA arrel y CA intermedi dins el JKS:

```
keytool -import -trustcacerts -alias SectigoCARoot -file SectigoCARoot.cer -keystore nouClient.keystore.jks -storepass "xxxxx" –noprompt 
```

```
keytool -import -trustcacerts -alias SectigoRSAOrganization -file SectigoRSAOrganization.cer -keystore nouClient.keystore.jks -storepass "xxxx" -noprompt
```

### Pla de capacitat
Un client que vulgui integrar-se a la plataforma Eventhub, haurà, en la mesura que sigui possible, presentar un pla de capacitat indicant una estimació de l'ús que farà de la plataforma.

Aquest pla haurà de tenir en compte la informació següent, per cadascun dels tòpics sol·licitats:

- Estimació de missatges produïts/període de temps. Ex.: 100 msg/s.
- Estimació de missatges consumits/període de temps. Ex.: 100 msg/s.
- Estimació de mida dels missatges. Ex.: 10 KiB.
- Estimació dús de disc. Ex.: 10 GiB. 

En posteriors sol·licituds de tòpics, cal presentar l'estimació per a aquests nous tòpics.

## Gestionar topics
### Tiquet de petició de gestió de topics Kafka
El client haurà de sol·licitar via tiquet l’alta, esborrat o modificació del topic, omplint el formulari descrit a sota.
L’oficina tècnica validarà la petició i farà les accions oportunes.

Formulari de gestió de topics:
![Nou topic](/related/eventhub/formtopics.png)

Exemples:
Topic per a l'aplicació Portal Tributari, amb codi 0205, domini "tributs", propòsit self assessment i entorn de preproducció: a0205-portaltributari-tributs-selfassessment-pre

Topic per a l'aplicació Portal Tributari, amb codi 0205, domini "tributs", propòsit actualitzar estats i entorn de producció: a0205-portaltributari-tributs-updatestate


### Aplicacions Kafka Streams
Les aplicacions Kafka Streams poden generar tòpics interns necessaris per al seu funcionament. 

Un projecte que tingui intenció de fer ús d'aquesta tecnologia per al desenvolupament d’aplicacions, ho haurà de comunicar a l'Oficina Tècnica per assignar els permisos de RBAC necessaris. 

El paràmetre application.id, definit per l'aplicació, és utilitzat com a prefix a l'hora de generar el nom dels tòpics interns (**\<application.id>-\<operatorName>-\<suffix>**) i, per tant, serà tingut en compte a l'assignació de permisos de RBAC. El valor d'aquest paràmetre ha de seguir la nomenclatura **\<a>\<codi aplicació>-\<nom aplicació>-ks-\<domini>** per poder garantir que sigui únic al clúster.

En aplicacions stateful, és molt recomanable el nomenat d'operadors per evitar problemes derivats de canvis de topologia. Veure [1](https://docs.confluent.io/platform/current/streams/developer-guide/dsl-topology-naming.html#naming-kstreams-dsl-topologies) y [2](https://developer.confluent.io/tutorials/naming-stateful-operations/kstreams.html) per a més informació.

## Gestionar l’Schema Registry
### Tiquet de petició de gestió de l’Schema Registry
- El client haurà de sol·licitar via tiquet l’alta, esborrat o modificació del schema, omplint el formulari descrit a sota.
- L’oficina tècnica validarà la petició i farà les accions oportunes.

Formulari de gestió de Schema Registry:
![Nou schema](/related/eventhub/srform.png)

## Demanar accés a un topic existent
### Tiquet de petició d’accés a un topic Kafka
- El client haurà de sol·licitar per tiquet l’accés als topics, emplenant el formulari de sol·licitud i comptant amb l’autorització corresponent per part del gestor/PO del sistema. 
- L’oficina tècnica validarà la petició i gestionarà l’assignació de permisos per l’usuari.
- L’oficina tècnica informarà en el tiquet la finalització de l’operació.


Formulari d’accés a un tòpic:
![Topic accés](/related/eventhub/formtopicacces.png)

## Gestionar connectors
### Tiquet de petició de gestió de topics Kafka
- El client haurà de sol·licitar via tiquet l’alta, esborrat o modificació del connector, omplint el formulari descrit a sota.
- L’oficina tècnica validarà la petició i farà les accions oportunes.
- En cas que el plugin no estigui disponible, caldrà una instal·lació per manteniment.

Formulari de gestió de connectors:
![Form connect](/related/eventhub/formconnect.png)
