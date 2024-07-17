+++
date        = "2024-07-01"
title       = "Serveis"
description = "Móduls i serveis de la PTD"
sections    = "PTD"
toc         = false
taxonomies  = []
weight      = 2
+++


## Serveis i Capacitats de la PTD

A l’hora de garantir el camí de la dada, la PTD disposa d’un conjunts de mòduls que conformen 
l’arquitectura de la Plataforma i els serveis proporcionats

La **Plataforma Transversal de Dades de la Generalitat de Catalunya (PTD)**, es presenta com una solució tecnològica integral, adaptable, confiable i orientada a resoldre reptes presents i futurs de l’administració. 

Construïda sobre una arquitectura SaaS multicloud que prioritza l'ús de tecnologies opensource, incloent eines com Databricks, Spark i Deltalake.

La proposta arquitectònica és compatible amb el model europeu de Gaia-X, ja que permet l'emmagatzematge, processament i transmissió de la informació per compartir dades amb clients, mantenint la sobirania de les dades. També compleix amb els requisits d'arquitectura federada, descentralitzada i oberta de Gaia-X.

Aquesta plataforma integra mòduls per la gestió de Dades de Referència i Mestres de Dades d'ús corporatiu, així com un mòdul específic d'Integració i Data Quality, destacant la importància de la diversitat, complexitat i sensibilitat de les dades tractades.

![Cas 1](/plataformes/ptd/related/PTD/PTD01.png)


### Mòduls de la PTD

Els Mòduls de la PTD, donen resposta a les diferents necessitats d’ingesta, qualitat, emmagatzemament, transformació i publicació de la Dada.

![Cas 2](/plataformes/ptd/related/PTD/PTD02.png)

- **Connexió/Ingesta:** Les capacitats de connexió i ingesta de la PTD permeten integrar múltiples orígens de dades i formats, tant on-premise com en cloud, en batch o temps real. També es pot integrar amb Webservices, API Rest i sistemes d’esdeveniments en streaming com Confluent Kafka. Permet utilitzar Databricks amb processos adhoc d’ingesta o el Mòdul ITQ que per automatitzar i planificar càrregues, o virtualitzar els origens amb Denodo per desacoblar les fonts de dades dels seus processaments de càrrega.

![Cas 3](/plataformes/ptd/related/PTD/PTD03.png)

- **Data Quality:** La PTD ofereix una solució configurable de qualitat de dades basada en Spark que s'executa sobre Databricks i utilitza taules Delta Lake. Normalitza la qualitat de les dades d’entrada validant-les, corregint-les i enriquint-les. Pot processar dades en diversos formats  i recollir-les mitjançant JDBC de multitud de bases de dades. També gestiona dades en temps real en forma d'esdeveniments i el procés de qualitat inclou ingesta, validació, enriquiment, remediació, remediació manual i consolidació.

![Cas 4](/plataformes/ptd/related/PTD/PTD04.png)

- **Emmagatzemament i dominis d’informació:** El Data Lake central de la PTD utilitza Databricks, amb tecnologies com Apache Spark, Delta Lake i Delta Sharing. Databricks facilita la gestió centralitzada de dades amb Unity Catalog i una col·laboració eficient gràcies a la seva arquitectura Lakehouse.
La PTD adopta un enfocament Datamesh, on diverses bases de dades coexisteixen en un entorn governat i distribuït per dominis funcionals i estandarditza els fluxos de dades en capes: Bronze (dada crua), Silver (dada amb qualitat) i Gold (dada enriquida).

![Cas 5](/plataformes/ptd/related/PTD/PTD05.png)

- **Transformació:** La PTD amb Databricks ofereix una plataforma integrada per a l'execució de processos Spark que faciliten la transformació, l'enriquiment i la gestió del cicle de vida de les dades. També amb interfícies per a l'orquestració visual de workflows i la gestió de tasques, permet als usuaris desenvolupar i executar transformacions de dades en temps real mitjançant notebooks. Això millora l'autonomia dels usuaris, la gestió de càrregues i la interacció entre tenants, essent més eficaç i flexible.

![Cas 6](/plataformes/ptd/related/PTD/PTD06.png)

- **Publicació:** La disponibilització de dades es pot fer amb Delta Sharing de Databricks, que permet compartir dades de manera segura entre entorns interns i externs, i amb els BIs corporatius. Els usuaris poden accedir a les dades en temps real sense duplicar-les,  i facilitant l'anàlisi i govern. La PTD també disposa de virtualització amb Denodo per desacoblar dades heterogènies en una única Font, de les eines d’explotació. Si en canvi es precisa de Microserveis, s'emprarà Openshift cloud com a solució comuna multicloud.



### Mòduls de la PTD - Connexió/Ingesta

![Cas 2](/plataformes/ptd/related/PTD/PTD02.png)

Dins del mòdul d’Integració separarem la capa més relacionada amb els sistemes de connexió en sí dels integradors batch i real time de primer nivell i antecessors de l’etapa d’ETL i DQ.

**Mòduls de connexió:**
	- **Temps real:** vindrà en forma d’esdeveniments o via eines de Change Data Capture (CDC) com p.e. Debezium
	- **Amb BD, fitxers o sistemes tercers:** es farà via API Manager Corporatiu
	- **SFTP corporatius on-premise o Cloud:** connexió directa via les ETLs, o amb la virtualització de Denodo y el mòdul de ITQ

**Mòduls de integració/ingesta:**
- **Temps real:** mitjançant el servei corporatiu i transversal de missatgeria Kafka multitenant (Servei EventHub).
- **Batch Corporativa:** mitjançant l'eina corporativa d’integració, Oracle Data Integrator (ODI) permetent utilitzar, com a origen de dades o com a destí, múltiples tecnologies (Oracle, MS SQL, HDFS, Serveis web, Postgres, SAP, etc).
- **Integració ELT:**  les capacitats d’ingesta, mitjançant Databricks, permet integrar-se amb una àmplia gamma d'orígens de dades com fitxers amb diversos formats, bases de dades i magatzems de dades, ja siguin on-premise o al cloud.
- **Integració Webservices:** les capacitats d’ingesta, mitjançant Databricks, permet integrar-se també amb Webservices, Api Rest i amb sistemes d’esdeveniments com a Apache Kafka
- **Virtualització en Origen:** Permet amb Denodo permet independitzar els processos ETL i ELT de la complexitat pròpia de treballar amb fonts heterogènies de dades. Es farà disponible com a font única de cara al data Lake i al mòdul de ITQ.
- **Mòdul ITQ:** El mòdul disposa com a primer procés, una amplia varietat de processos automatitzats d’ingesta, totes elles prèvies a la fase de data Quality.  Ingesta de fitxers, BBDD, Data Lake i de tòpics de kafka.

![Cas 7](/plataformes/ptd/related/PTD/PTD07.png)

Aquest mòdul d’ingesta inclòs en el mòdul d’ITQ a la PTD, permet tractar els fitxers a processar que hi siguin al corresponent directori de Landing (Azure ADLS), així com, tractar els orígens que s’integren via connexió JDBC, així com tractar els orígens que s’integren via Tòpic de Kafka:

- **AutoLoader:** s’encarrega de realitzar la ingesta automàtica a partir dels fitxers sense processar del directori de Landing del origen/versió en execució.

- **JdbcLoader:** s’encarrega de realitzar la ingesta planificada establint una connexió JDBC amb la BBDD del departament propietari de la informació mitjançant la configuració emmagatzemada a la col·lecció del MongoDB.

- **DeltaLoader:** s'encarrega de realitzar la ingesta planificada d'una altra taula del delta lake sobre les dades de la qual es volen validar i remeiar mitjançant itq., mitjançant la configuració emmagatzemada en la col·lecció del MongoDB.

- **StreamLoader:** s’encarrega de realitzar la ingesta automàtica a partir del Tòpic de Kafka configurat a la col·lecció del MongoDB.

![Cas 8](/plataformes/ptd/related/PTD/PTD08.png)


La **virtualització amb Denodo** en origen a la PTD permet independitzar els processos ETL i ELT de la complexitat de treballar amb fonts de dades heterogènies.  L’ús Denodo permet desacoblar les fonts de dades del seu processament, ideal com a hub d'integració del data lake de la PTD. 

- Proporciona **accés virtualitzat** a diverses fonts de dades, tant Near Real-Time (NRT) com batch, connectant-se a tot tipus de fonts (BD, API, fitxers, SAP, etc.). 

- La viertualització  ofereix una **capa lògica d’abstracció** sobre la capa física, minimitzant el moviment de dades i reduint costos de transmissió. 

- També permet mantenir **acords d’interfície de dades amb negoci**, facilitant migracions sense impactar usuaris. 

- Proporciona **seguretat amb xifrat de dades** en repòs, comunicacions segures (TLS/SSL), integració amb SAML2 i OAuth2 per SSO, seguretat a nivell de fila i columna, control d’accés mitjançant etiquetes de negoci, **emmascarament** de dades i **auditoria** d’accés.

![Cas 9](/plataformes/ptd/related/PTD/PTD09.png)


### Mòduls de la PTD - Data Quality

![Cas 3](/plataformes/ptd/related/PTD/PTD03.png)

La PTD ofereix una solució configurable de qualitat de dades basada en Spark, operant sobre Databricks amb taules Delta Lake. Assegura la qualitat de les dades d'entrada mitjançant processos de validació, correcció i enriquiment. Les dades poden provenir de fitxers en diversos formats, bases de dades, dades en near real time o virtualitzades en origen. El procés de qualitat inclou ingesta, validació, enriquiment, remediació, remediació manual i consolidació, garantint dades precises i fiables per a l'anàlisi empresarial.

Després de la ingesta, es realitzen validacions basades en les normatives ISO 25000. 
Els errors detectats es corregeixen afegint informació addicional, com p.e. la normalització d'adreces. Les dades que no es poden corregir automàticament es deixen per a remediació manual, que es registra per tractar errors futurs de manera automàtica.

La consolidació reuneix les dades correctes en fitxers, bases de dades o data lakes externs. 

Per a les remediacions manuals, es proporciona una llista d'errors amb enllaços als camps afectats, augmentant la productivitat. El sistema s'integra amb GICAR per a l'autenticació, és multitenant i utilitza RBAC per al control d'accés.

A més, permet l'ús de Data Quality com a servei a través API Corporativa, publicant serveis de qualitat de dades per a tercers, com la normalització d'adreces per part del ICC.

![Cas 10](/plataformes/ptd/related/PTD/PTD10.png)


#### Mòduls i fluxos del Data Quality a la PTD

![Cas 11](/plataformes/ptd/related/PTD/PTD11.png)

#### Mostra de les Regles de Data Quality disponibles a la PTD

![Cas 12](/plataformes/ptd/related/PTD/PTD12.png)

### Mòduls de la PTD - Emmagatzemament

![Cas 4](/plataformes/ptd/related/PTD/PTD04.png)

El data lake central de la PTD està basada en Databricks, y conforma una plataforma d’analítica unificada en format SaaS Multicloud.  

**Dades estructurades:**  La PTD proporciona el **Delta Lake** de Databricks, com a la solució per donar suport al requisit de data lake per a les dades estructurades. Es tracta d’una solució de codi obert que proveeix una capa d’emmagatzemament optimitzat per a les dades subjacents del data lake. En ser totalment compatible amb l’API d’Apache Spark, permet operar amb processos de tipus batch i streaming, facilitant el processament incremental a gran escala.  Prinsipals caracteristiques
- Basat en tecnologies opensource com **Apache Spark, Delta Lake i Delta Sharing**.
- És **multicloud**, integrant-se de forma transparent amb els tres proveïdors de cloud.
- Permet un govern centralitzat, amb l’eina **Unity Catalog**, de totes les dades i elements definits en múltiples workspaces
- Empra el protocol **Data Sharing**, integrat en Unity Catalog, per compartir informació de forma segura entre diferents dominis de negoci i organitzacions.
- Utilitzar la plataforma **Databricks Lakehouse**, que combina els avantatges d'un data lake i un data warehouse, oferint: (1) **Simplicitat:** Integra totes les dades en una sola plataforma; (2) **Obertura:** Controla les dades des del compte cloud del client; (3) **Col·laboració:** Facilita el treball conjunt sobre les mateixes dades, compartint models, dashboards, notebooks i datasets al llarg del workflow.

![Cas 14](/plataformes/ptd/related/PTD/PTD14.png)


**Dades Semiestructurade i No estructurades:** la PTD ofereix com a solución la BD **MongoDB**, una base de dades NoSQL de referència per a documents Json/Bson.  Ofereix funcionalitats bàsiques (insert, select, update, delete) i avançades (aggregation framework, charts). **MongoDB Atlas**, la versió SaaS multicloud, disponible a Azure, AWS i GCP, proporciona emmagatzemament en fred i cerca textual amb Lucene. Atlas permet redimensionar la infraestructura segons l'ús, oferint una solució cross cloud que pot incloure nodes en diferents clouds simultàniament, optimitzant costos de tràfic de dades i rendiment.

**Dades relacionals:** La PTD cdisposa també de les capacitats relacionals utilitzant **PostgreSQL**, una tecnologia de codi obert àmpliament utilitzada i disponible en SaaS i DbaS als tres clouds seleccionats. PostgreSQL és una base de dades relacional compatible amb serveis cloud, que s'executa en diversos sistemes operatius. És ideal per projectes grans i complexos amb operacions d'alt volum de dades, oferint alta velocitat, fiabilitat i escalabilitat en lectura i escriptura de dades.

**Dades en Graf:** La PTD proporciona **Neo4j AuraDB** com a solució de grafs ràpida, escalable, sempre activa i administrada com a servei SaaS amb suport multicloud (Azure, AWS, GCP). Els seus punts destacats inclouen automatització de recursos, escalabilitat sota demanda, suport per a diversos llenguatges de programació, seguretat, còpies de seguretat i permet crear sistemes amb milers de milions de nodes i relacions, mantenint velocitat, rendiment i seguretat, i compleix els estàndards ACID per a transaccions fiables i ràpides.

![Cas 16](/plataformes/ptd/related/PTD/PTD16.png)


### Mòduls de la PTD - Transformacions i Enriquiment

![Cas 05](/plataformes/ptd/related/PTD/PTD05.png)

La PTD amb Databricks ofereix una plataforma integrada i centrada en la utilització de **processos Spark** per a transformar, enriquir i gestionar eficientment el cicle de vida complet de les dades. A través d'una interfície integrada, els usuaris poden executar, monitoritzar, i ajustar processos Spark de manera aïllada, facilitant una gestió detallada que inclou la repetició de tasques, la modificació de paràmetres i la visualització de logs.
La plataforma permet **l'orquestació avançada de workflows**, que connecta diverses tasques en una cadena seqüencial per formar un pipeline completament visual. Aquest pipeline gestiona des de la captura inicial de dades fins a la seva transformació i enriquiment, suportant estàndards de vida de les dades definits pels protocols de la PTD.
Paral·lelament a la gestió de processos Spark, Databricks ofereix **notebooks** com a eines clau per a la autonomia dels usuaris en la manipulació de dades. Aquests notebooks suporten el **desenvolupament i l'execució de processament de dades** en temps real, permetent als usuaris operar sense necessitat de desplegaments tradicionals. Funcionen com entorns de desenvolupament integrats que faciliten la creació de capes informatives personalitzades, des de dades brutes fins a dades enriquides.
L'ús intensiu de notebooks potencia la creació d'una arquitectura de dades alineada amb les necessitats i el coneixement de cada usuari. La plataforma ofereix funcionalitats addicionals com la programació periòdica de tasques, la col·laboració mitjançant notebooks compartits, i eines d'importació i exportació. Això permet una gestió més eficient i adaptativa dels processos de dades, amb la capacitat de definir finestres d'execució que optimitzen les càrregues de treball i la interoperabilitat entre diferents tenants.

![Cas 17](/related/PTD/PTD17.png)


### Mòduls de la PTD - Publicació

![Cas 06](/plataformes/ptd/related/PTD/PTD06.png)


**Serveis, Microserveis i Contenidors**: Els microserveis proposats a la PTD, son compatibles entre els tres clouds, donat que poden desplegar-se en els sistemes nadius de **Kubernetes** de cadascun d’ells (**AKS, EKS i GKS**). Es proposa l’ús de **Openshift cloud** comú, a l’hora de millorar la monitorització, proporcionant un únic cluster multicloud. Tot això addicionalment al clúster Openshift on-premise que ja disposa el CTTI.

**Virtualització en la publicació:** La **virtualització amb Denodo** desacobla les dades de les eines d'explotació, facilitant l'accés a dades heterogènies (SQL i NoSQL) en una única font explotable. Centralitza accessos, auditoria i seguretat en un sol punt, permetent consultes a diferents bases de dades amb una única connexió, combinant taules de motors com Oracle, DB2, HDFS, Parquet, MongoDB, Delta Lake o Neo4j. La integració amb EDC/AXON facilita el llinatge punt a punt. L'arquitectura lògica **abstrau els consumidors de la tecnologia subjacent i la ubicació de les dades**, oferint un model consistent i adaptat a les necessitats, reduint el treball dels científics de dades, equips d'ETL i de Reporting. **API Corporativa:** La PTD s'integra amb **l'API Manager Corporatiu** en modalitat SaaS de pagament per ús, facilitant la publicació, consum, versionat i gestió del cicle de vida d'APIs. També ofereix suport tècnic, extracció d'indicadors, aprovisionament d'accessos i resolució d'incidències a través de **l'Oficina Tècnica APIM**. API Connect inclou un Portal Desenvolupador que permet als proveïdors publicar documentació i als consumidors consultar APIs disponibles i sol·licitar accés, actuant com un marketplace per desplegar i consumir serveis fàcilment.

![Cas 18](/plataformes/ptd/related/PTD/PTD18.png)


**Data Sharing:** La PTD fa servir el protocol Data Sharing, que facilita la **compartició de la informació de forma segura entre diferents dominis de negoci i organitzacions**, propi de Databricks i construït dins Unity Catalog. **Delta Sharing de Databricks** ofereix funcionalitats clau com la possibilitat de compartir dades amb qualsevol client, ja sigui intern o extern, sense necessitat de copiar o moure dades. Permet compartir dades en temps real, mantenint la consistència i seguretat. Delta Sharing és compatible amb múltiples formats de dades, incloent Parquet i Delta Lake, i s'integra fàcilment amb eines d'anàlisi com PowerBI i Apache Spark. A més, proporciona controls detallats d'accés a les dades i auditabilitat, garantint que només els usuaris autoritzats puguin accedir a la informació compartida.

**Dades Real Time:** La PTD s’integra amb el gestor d’esdeveniments corporatiu (Eventhub) que està basat en Confluent Kafka i dissenyat com una capa de comunicació per al processament de grans volums d’informació en temps real. No només s’integra a la plataforma com un component d’ingesta de dades, sinó també com una **interfície que disposa la informació en temps real existent en el data lake** o bé produït pels propis processos d’enriquiment i analítica avançada dels departaments.

**sFTP Corporatiu:** La PTD reutilitzen com a servei corporatiu, un conjunt de serveis FTP segurs (SFTP) en on-premise i en cloud, que permeten deixar aquells fitxers de dades que calgui compartir de la PTD, entre departaments o agents externs. 

![Cas 19](/plataformes/ptd/related/PTD/PTD19.png)


### Mòduls de la PTD - Dades de Referencia (RDM)

La PTD compta com a missió, poder proporcionar dades comunes a diferents aplicacions i departaments, utilitzant un llenguatge únic mitjançant taules de **dades de referència**. Aquestes dades de referència són catàlegs d'ús estàndard que no depenen del negoci específic de cada departament però que hi interactuen habitualment, com per exemple,  el catàleg de municipis de Catalunya, assegurant que totes les aplicacions utilitzin la mateixa informació tècnica.  Les dades de referència es defineixen per:

**Metadades:** domini, subdomini, estat, propietari, persones de contacte, idiomes, freqüència d'actualització, històric de versions, fonts d'origen, sistemes de publicació, mecanismes de subscripció.
**Contingut:** llista de valors amb diferents atributs definits per les metadades, com províncies, municipis, comarques, dades econòmiques, etc.
**Flux de gestió i governança:** actors, rols, responsabilitats i tasques associades a cada etapa del cicle de vida de les DR (creació, modificació, publicació, autorització d'ús, subscripció, etc.).

Amb la coordinació de la Direcció General d’Administració Digital (DGAD), s'han definit i publicat dades tècniques de referència d’ús obligatori per a noves aplicacions.  La PTD posa a disposició dels projectes les actuals dades de referencia existentes a Dades Obertes 
- [Administració digital (gencat.cat)](https://administraciodigital.gencat.cat/ca/dades/dades-obertes/inici/)
- [Canigó Web Dades de Referència](https://canigo.ctti.gencat.cat/plataformes/dadesref/dadesref/)

![Cas 20](/plataformes/ptd/related/PTD/PTD20.png)

**Consum de les Dades de Referencia:** El model de consum de les Dades de Referència (DR) utilitza API de consultes a través de subscripció a l’API Manager Corporatiu, permetent a les aplicacions consumir les DR existents i publicades a la PTD.  La interoperabilitat entre l’RDM i qualsevol sistema (intern o extern a la PTD) es gestiona via Application Gateway per assegurar la disponibilitat i la seguretat. L'objectiu és un màxim desacoblament per facilitar la integració i el consum de les API amb el mínim impacte en qualsevol sistema.

**L'API de consulta** de dades s'ha dissenyat per consultar la informació de les dades de referència, emmagatzemada al repositori de MongoDB a la PTD. Consta d’un endpoint amb tres mètodes principals per executar consultes sobre les dades de MongoDB, i tres mètodes més pel servei de subscripció als canvis a les DR, tots 6 descrits i exemplaritzats a
continuació: 

- **dades_referencia/versions:** retorna llista de versions d’una DR sol·licitada
- **dades_referencia/dades:** retorna dades de la ER sol·licitada, amb paràmetres opcionals.
- **dades_referencia/subscribe:** es registra com a subscriptor de la DR
- **dades_referencia/unsuscribe:** finalitza la subscripció a una DR.
- **dades_referencia/changes:** retorna la llista de canvis que s’han produït en les DR a les quals es troba subscrit des d’una data.

![Cas 21](/plataformes/ptd/related/PTD/PTD21.png)


### Mòduls de la PTD - Mestres de dades (MDM)

La PTD compta amb un sistema de gestió de Dades Mestres (MDM) que permet als departaments obtenir una visió única, actualitzada i fiable de les seves dades clau, garantint la coherència, seguretat, transparència i eficiència dels processos. Les dades passen per un sistema de qualitat (DQ) abans d'entrar al MDM per assegurar la seva qualitat. El nucli del MDM es basa en una arquitectura de consolidació, ja que les entitats mestres alimenten sistemes informacionals sense necessitat de sincronització de canvis ni intervenció en els processos de negoci amb les aplicacions operacionals.

El MDM disponible a la PTD, proporciona diverses funcionalitats per gestionar dades mestres en totes les seves etapes:
 
- **Etapa de Scoring:** Sistema de ponderació per assignar un grau de confiança a cada columna de dades permet determinar **quins atributs són més fiables en funció de l'origen** de les dades, ajudant a crear un conjunt de dades mestres de qualitat i confiança. Aquest grau de confiança s'actualitza basant-se en diverses regles de qualitat:  
	- **Assignació de Fiabilitat:** Es determina un grau inicial de fiabilitat per a cada columna  de dades segons l'anàlisi de les dades d'origen. 
	- **Actualització de Fiabilitat:** Aquest grau de fiabilitat es pot ajustar basant-se en regles de validació de qualitat, disminuint-lo si les dades no compleixen certes normes establertes.

![Cas 25](/plataformes/ptd/related/PTD/PTD25.png)

**Etapa Staging:** L'etapa de "staging" en un sistema de gestió de dades mestres (MDM) és el procés d'incorporació de les dades al sistema. Aquesta etapa implica recollir les dades de la fase de qualitat (Data Quality, DQ) i introduir-les al MDM, llegint-les de les taules resultants del DQ i gravant-les a les taules definides al MDM, traduint els noms de les columnes si cal. A més, es calculen codis de coincidència (matchcodes) per a cada registre, que serviran per a la identificació posterior. Els matchcodes són conjunts de camps que podrien identificar un element sota certes condicions, i poden incloure valors de hash per emmascarar els valors. Aquesta etapa prepara les dades per a processos posteriors com la identificació i la fusió.

**Etapa Identificació:** L'etapa d'identificació en un MDM consisteix en assignar un identificador únic a cada registre. Inicialment, es generen codis de coincidència (matchcodes) per a cada registre. Aquests matchcodes es comparen amb registres existents mitjançant criteris de coincidència predefinits. Els registres que coincideixen reben el mateix identificador. Per als registres nous que no coincideixen, es generen nous identificadors. Finalment, aquests identificadors s'assignen als registres originals, garantint una identificació única i la coherència de les dades dins del sistema.

![Cas 22](/plataformes/ptd/related/PTD/PTD22.png)
![Cas 23](/plataformes/ptd/related/PTD/PTD23.png)

**Etapa Consolidació:** L'etapa de consolidació o fusió en un sistema de gestió de dades mestres (MDM) és clau per obtenir les millors dades posibles, i   permeten fusionar noves dades amb les preexistents, assegurant que es seleccionin els camps amb més qualitat per obtenir un conjunt de dades mestres precis i fiable. Aquesta etapa implica els següents passos clau:

**Agrupació de Camps per Blocs:** Els camps de dades es grupen en blocs segons l'origen i la prioritat assignada a cada bloc.

**Transformació de Registres:** Es transforma cada registre en un conjunt de registres més simples que representen camps individuals, afegint la prioritat de cada camp.

Càlcul de Períodes de Validesa: Es determina la història completa de l'entitat, calculant els períodes de validesa per a cada valor de cada propietat. Les dades vigents tindran data d'inici de validesa però no data de finalització.

**Etapa de Publicació Golden Record:** El procés de publicació en un sistema MDM s'encarrega de posar a disposició el Golden Record a les bases de dades després de processar la informació d'una ingesta. Els passos inclouen detectar les dades afectades per la nova ingesta, descartant la informació redundant o menys prioritària, i publicar les dades del Golden Record en paral·lel a les taules Delta i MongoDB. Això garanteix que les dades més fiables i actualitzades estiguin disponibles per a l'ús en diversos sistemes.

![Cas 24](/plataformes/ptd/related/PTD/PTD24.png)


**Etapa de Disponibilització:** El sistema ofereix diverses formes d’accedir a la informació dels censos:

API Rest:
- **Golden Record:** Les dades poden ser consultades per una api de consulta amb el identificador censal, per defecte, però també es possible consultar les dades amb diverses camps depenen del camp de consulta.
- **Golden Record Històric a una data:** Es possible consultar la informació del cens a un determinat temps en el passat. El sistema torna el “snapshot” de la informació a una data.
- **Golden Record Històric:** Es possible consultar la informació del cens en forma de “snapshots”. Es a dir, tots els canvis que va tenir el item del cens durant el temps.

Databricks:
Databricks ofereix diverses mecanismes per a disponibilitzar informació tals com:
- **JDBC:** Es dona accés al set de dades a un usuari ja sigui nominal o d’aplicació.
- **Delta Sharing:** Standard obert per a compartir informació de forma segura a la PTD.





