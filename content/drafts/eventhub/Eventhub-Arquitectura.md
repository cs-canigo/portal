+++
date        = "2022-05-20"
title       = "Arquitectura"
description = "Arquitectura d'Eventhub"
sections    = "EventHub"
toc         = false
taxonomies  = []
weight      = 2
+++


## Arquitectura d'Eventhub


### Esquema conceptual

![Cas 6](/related/eventhub/MU07.png)

### Diagrama funcional

![Cas 7](/related/eventhub/DiagramaFuncional.png)

### Vista de desplegament

![Cas 7](/related/eventhub/MU08.png)

### Evolució prevista

![Cas 8](/related/eventhub/MU09.png)


## Model de Seguretat

### Com implementem la seguretat on-prem platform

* Els clients (productors i consumidors) i serveis del sistema s’autenticaran mitjançant certificat software, signat per l’auto ritat pública de certificació Sectigo, amb el mètode mTLS d’autenticació (garanteix que les parts de cadascun dels extrems d’una connexió de xarxa són els que diuen ser, verificant que ambdues tenen la clau privada correcta. La informació continguda en els seus respectius certificats TLS/SSL proporciona una verificació addicional). La signatura del certificat es demanarà a l’Agèn cia de Ciberseguretat (AC), prèvia creació de la clau privada i el certificat CSR corresponents.

* L’Oficina Tècnica proporcionarà un *script* de creació de la clau privada i CSR per facilitar aquesta tasca als clients. La clau privada s’ha d’emmagatzemar protegida i el CSR s’enviarà a l’AC, que el signarà i retornarà al client el certificat final (clau pública) signat amb Sectigo.

* Els administradors accediran al sistema i el Control Center de Confluent amb usuari/password.

* Els usuaris de consulta accediran al Control Center amb usuari/password.

* Els drets d’accés a cada recurs s’establiran segons les decisions de la persona responsable del mateix. 

* Els drets d’accés de cada usuari es limitaran segons els següents principis: mínim privilegi, necessitat de conèixer i capaci tat d’autoritzar. 

* Els usuaris que vulguin treballar amb la plataforma han de sol·licitar els permisos adients segons les seves necessitats. Aquests permisos es demanaran a l’Oficina Tècnica, que podrà acceptar o rebutjar la petició en base als criteris anteriors.

### Com implementem la seguretat cloud

* En el clúster Standard actual els clients (productors i consumidors) i serveis del sistema s'autentiquessin mitjançant credencials client i secret. Si és necessari aplicar una seguretat mes extricta ha de comunicar-se a l'Oficina Tècnica per a realitzar un estudi i donar solució als requisits de seguretat acordats.

* Els administradors accediran al sistema i el Control Center de Confluent amb usuari/password. 

* Els usuaris de consulta accediran al Control Center amb usuari/password.

* Els drets d’accés a cada recurs s’establiran segons les decisions de la persona responsable del mateix.

* Els drets d’accés de cada usuari es limitaran segons els següents principis: mínim privilegi, necessitat de conèixer i capacitat d’autoritzar.

* Els usuaris que vulguin treballar amb la plataforma han de sol·licitar els permisos adients segons les seves necessitats. Aquests permisos es demanaran a l’Oficina Tècnica, que podrà acceptar o rebutjar la petició en base als criteris anteriors.

## Multitenancy i entorns

### Com implementem el multitenancy 

A la plataforma Eventhub implementem el multitenancy i aïllament de recursos a partir de quotes. 

El clúster Kafka té la capacitat d'aplicar quotes a les sol·licituds per controlar els recursos del broker utilitzats pels clients. Els brokers de Kafka poden aplicar dos tipus de quotes de clients per a cada grup de clients que comparteix una quota:

* Les quotes d'amplada de banda de xarxa defineixen els llindars de velocitat de bytes. 

* Les quotes de velocitat de sol·licitud defineixen els llindars d'utilització de la CPU com a percentatge dels fils d'E/S i de xarxa.

Amb la implementació de quotes evitarem:

* La monopolització dels recursos de la plataforma per part d’una aplicació 

* La saturació de la xarxa

* Denegació del servei per altres clients

### Entorns 

Posem a disposició de les aplicacions 3 entorns de treball: INT, PRE i PRO


---
Per a més informació podeu contactar amb l'Oficina Tècnica mitjançant [e-mail](mailto:eventhub.ctti@gencat.cat). També podeu consultar l'apartat de [Suport](/eventhub/Suport).
