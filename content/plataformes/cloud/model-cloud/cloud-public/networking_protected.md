+++
date        = "2025-02-17"
title       = "Networking"
description = "Model de Networking"
sections    = "Cloud"
categories  = ["cloud","model","aws","azure","gcp"]
aliases     = ["/model-cloud/cloud-public/networking"]
weight      = 3
+++

Descripció del model de networking (estructura xarxa daplicació, elements requerits, integració amb NET0, etc.).

## Networking a AWS

### Introducció

En aquest document, es descriu una arquitectura de xarxa completament privada desplegada a AWS, on una VPC (Virtual Private Cloud) tindrà diferents rangs CIDR associats. Aquesta VPC combinarà subxarxes enrutables i no enrutables per gestionar el trànsit, optimitzar la seguretat i estalviar adreces IP. Els recursos crítics com bases de dades, sistemes de fitxers, serveis de contenidors, entre d'altres, es desplegaran en subxarxes no enrutables per garantir la seva seguretat, aïllament i una millor assignació d'IPs, mentre que una NAT Gateway privada gestionarà el trànsit sortint d'aquestes subxarxes cap a l'exterior.

![Networking AWS](/related/cloud/networking-aws.png)

### Components Principals

- **VPC (Virtual Private Cloud)**: Una única VPC serà la base de l'arquitectura, on es definiran múltiples subxarxes amb diferents rangs CIDR. Els rangs CIDR estaran dissenyats per a diferents necessitats de xarxa: uns per subxarxes enrutables i altres per subxarxes no enrutables.

- **Subxarxes enrutables**: Aquestes subxarxes tindran rangs CIDR específics que permetran el trànsit cap a i des de l'exterior de la VPC. Aquí es desplegaran els recursos que necessiten tenir connectivitat directa amb l'exterior, i que no tindran la seva IP de sortida natejada. A més, en aquestes subxarxes es desplegaran NAT Gateways privades per permetre el trànsit de sortida dels recursos de les subxarxes "Intra" o no enrutables.

- **Subxarxes no enrutables**: Aquestes subxarxes contindran recursos que no necessiten o no es desitja que siguin accessibles des de fora de la VPC, com ara ECS, EC2 bases de dades o altres serveis que requereixen un gran nombre d'adreces IP, però que han de mantenir-se segurs i aïllats. Les subxarxes no enrutables no podran enviar trànsit directament cap a l'exterior ni a altres xarxes fora de la VPC.

- **NAT Gateway privada**: La NAT Gateway privada estarà desplegada en una de les subxarxes enrutables. La seva funció és permetre que els recursos que es troben a les subxarxes no enrutables puguin enviar trànsit cap a l'exterior, fent un procés de "NATing" (Network Address Translation) de les seves adreces IP. Aquesta NAT Gateway evitarà que les subxarxes no enrutables enviïn trànsit directament a xarxes externes, garantint que el trànsit passi per la subxarxa enrutable.

- **Rangs CIDR**:
  - **CIDR enrutables**: Aquest rang serà el principal de la VPC i tindrà una màscara menor. S'hi crearan preferiblement dues subxarxes enrutables, on es desplegaran els recursos que han de ser accessibles des de fora de la VPC.
  - **CIDR no enrutables**: S'utilitzarà un rang molt més gran per a aquest CIDR, on es desplegarà la majoria dels recursos que no necessiten ser accessibles des de l'exterior, assegurant una major capacitat per allotjar recursos interns.

### Exemple de Distribució de Recursos entre Subxarxes Privades i Intra

Per norma general, l'assignació de recursos a les subxarxes enrutables (privades) i no enrutables (intra) depèn de la seva necessitat d'accés extern o de comunicació fora de la VPC. A continuació, es presenta una distribució suggerida d'alguns dels recursos més comuns:

- **Recursos a les Subxarxes Privades (Enrutables).** Aquestes subxarxes estan dissenyades per contenir recursos que necessiten comunicar-se amb l'exterior, ja sigui amb altres xarxes dins o fora de AWS, com per exemple una xarxa on-premise o internet. Aquests recursos inclouen:

  - **Balancejadors de càrrega (Load Balancers)**: Especialment els **Application Load Balancers (ALB)** o **Network Load Balancers (NLB)** que han de gestionar trànsit tant des de dins de la VPC com des de fora d'ella (com a altres VPCs o On-premise). Això permet gestionar de manera segura les peticions de trànsit extern cap a serveis interns.

  - **APIs o serveis exposats**: Qualsevol API que necessiti ser accessible des de fora de la VPC. Això és comú en aplicacions que necessiten servir trànsit a clients externs o a altres serveis.

  - **VPC Endpoints (en alguns casos)**: Si s'utilitzen Gateway Endpoints per a serveis com S3 o DynamoDB, aquests es poden desplegar a les subxarxes privades per permetre el trànsit des de recursos a altres xarxes. Això millora la seguretat i evita exposar les dades al públic.

  - **NAT Gateway privada**: La NAT Gateway s'encarrega de gestionar el trànsit sortint de les subxarxes no enrutables cap a l'exterior. Està ubicada a les subxarxes privades perquè té un rol crític en la comunicació de recursos no accessibles externament amb altres serveis externs o a internet.

  - **Bastions o Jumpboxes**: Són màquines d'administració que es necessiten per accedir a recursos privats o no enrutables dins de la VPC. Aquestes màquines han de ser accessibles des de la VPN per permetre tasques de manteniment o administració remota.

  - **Instàncies amb accés extern**: Qualsevol màquina virtual (EC2) que necessiti accedir a serveis fora de la VPC o que requereixi comunicació amb altres VPC o xarxes on-premise.

- **Recursos a les Subxarxes "Intra" (No Enrutables).** Les subxarxes no enrutables estan destinades a contenir recursos que no han de ser accessibles des de fora de la VPC, ja sigui per raons de seguretat o per optimitzar l'ús d'adreces IP. Aquests recursos són més aïllats i no necessiten accés directe a xarxes externes. Entre els recursos que haurien de ser desplegats en aquestes subxarxes es troben:

  - **Clústers de ECS**: Els clústers de ECS, tasques i serveis, han de residir en subxarxes no enrutables perquè cada contenidor dins del clúster requereix una adreça IP. Aquests recursos no necessiten ser accessibles des de fora de la VPC i només requereixen accés intern dins de la VPC per comunicar-se amb altres serveis o components del clúster (en el cas que sigui necessari l'accés extern, es podrà utilitzar un balancejador de càrrega).

  - **Funcions Lambda**: Les funcions Lambda mai són accessibles a través d'una IP. L'accés a les Lambdas es realitza per mitjà d'API Gateway o altres serveis gestionats, de manera que no necessiten estar en subxarxes enrutables. Desplegar-les a les subxarxes intra ajuda a estalviar adreces IP a les subxarxes enrutables i manté un millor aïllament.

  - **Sistemes de fitxers (com Amazon EFS o FSx)**: Aquests sistemes de fitxers haurien de ser accessibles només des de dins de la VPC, sense cap necessitat de trànsit extern. El seu aïllament en subxarxes no enrutables augmenta la seguretat.

  - **Bases de dades**: Serveis com RDS haurien d'estar en subxarxes no enrutables, especialment quan no es requereix accés extern directe.

  - **Instàncies per a càlcul o processament de dades**: EC2 que es fan servir només per a tasques de càlcul, processament o tasques batch, que no necessiten cap accés extern, haurien de desplegar-se en subxarxes no enrutables per mantenir un aïllament complet.

### Flux de Trànsit

- **Tràfic intern dins de la VPC (comú a subxarxes enrutables i no enrutables)**: El trànsit que circula dins de la VPC entre recursos desplegats tant en subxarxes enrutables com en no enrutables no necessita sortir a internet ni passar per passarel·les externes. Els recursos poden comunicar-se directament dins de la VPC mitjançant rutes internes, sempre que es trobin dins del mateix domini de xarxa i es configurin adequadament les taules de rutes per permetre aquesta comunicació interna.

- **Tràfic extern a la VPC (per a subxarxes enrutables)**: El trànsit generat des de recursos a les subxarxes enrutables que necessita sortir de la VPC, ja sigui cap a internet, xarxes on-premise o altres VPCs, s'encamina directament a través del Transit Gateway Attachment. Això garanteix que el trànsit sortint s'adreci adequadament sense passar per components addicionals com una NAT Gateway.

- **Tràfic extern a la VPC (per a subxarxes no enrutables)**: El trànsit generat per recursos ubicats a les subxarxes no enrutables, com el trànsit d'ECS, que necessita accedir a xarxes externes (internet, on-premise o altres VPCs), serà redirigit a través de la NAT Gateway privada, situada en les subxarxes enrutables. Un cop el trànsit ha estat "natejat" per la NAT Gateway, aquest es dirigirà cap a la destinació externa a través del Transit Gateway Attachment, garantint que tot el trànsit sortint segueixi el mateix camí segur i gestionat.

- **Tràfic a serveis d'AWS (des de qualsevol subxarxa)**: El tràfic que es dirigeixi a serveis gestionats d'AWS (com S3, DynamoDB, etc.) des de qualsevol subxarxa (enrutable o no enrutable) sortirà a través dels VPC Endpoints associats. Per assegurar que aquest trànsit no passi per un proxy i s'encamini correctament dins de la VPC, s'ha de configurar el paràmetre NO_PROXY amb els rangs corresponents a aquests serveis, garantint que el trànsit es resolgui de manera local, de la mateixa manera que el trànsit intern dins de la VPC.

### Avantatges d'aquesta Arquitectura

- **Seguretat millorada**: Mantenir els recursos més sensibles, com ara RDS, en subxarxes no enrutables augmenta la seguretat i redueix les possibilitats d'exposició no desitjada.

- **Escalabilitat**: Separant els recursos en subxarxes enrutables i no enrutables, es permet la creació de grans clústers, com EKS, sense preocupar-se per l'exposició o l'assignació d'adreces IP.

- **Control sobre el trànsit**: L'ús d'una NAT Gateway privada permet un control total sobre el trànsit sortint de la VPC, assegurant que només el trànsit necessari pugui sortir cap a altres xarxes, i que tot el trànsit procedent de subxarxes no enrutables passi per una capa addicional de seguretat.

- Aquesta solució permet que des de l'entorn **on-premise** es puguin configurar rutes amb rangs CIDR molt més reduïts per enviar trànsit cap a la VPC. Això redueix la complexitat en la configuració de les rutes on-premise i facilita una major granularitat en l'enrutament.

### Aspectes a Tenir en Compte

En implementar aquesta arquitectura de xarxa privada a AWS, hi ha una sèrie de factors i consideracions que és important tenir en compte per assegurar que la solució funcioni de manera òptima i segura.

- **Conflicte de rangs CIDR solapats**: És crucial tenir en compte que, en cas que hi hagi solapament entre el rang CIDR no enrutable (secundari) de la VPC i algun rang CIDR d'una xarxa externa (per exemple, una xarxa on-premise o una altra VPC), els recursos desplegats dins de la VPC no podran accedir als recursos de fora de la VPC que estiguin en aquest rang solapat. Això es deu al fet que, en enfrontar-se a un solapament, el trànsit preferirà la ruta local, quedant dins de la VPC, i mai arribarà al destí real extern. Per tant, és fonamental evitar conflictes entre els rangs CIDR de la VPC i les xarxes externes.

- **Cost associat**: Les NAT Gateways tenen un cost fix per hora, així com costos addicionals relacionats amb el trànsit. Si es desplega una NAT Gateway per cada zona de disponibilitat (AZ) per garantir alta disponibilitat, aquests costos poden acumular-se significativament. Per tant, és important tenir en compte aquests costos en la planificació de l'arquitectura.

- **Accés a recursos desplegats a les subxarxes no enrutables**: En alguns casos en què sigui necessari accedir, de manera temporal o ocasional, a un recurs desplegat en una de les subxarxes "Intra", com per exemple una base de dades, s'haurà d'utilitzar, com a norma general, un balancejador de càrrega restringit a les IPs necessàries. Aquesta mesura ajuda a garantir la seguretat mentre es permet l'accés controlat als recursos interns.

### Determinació de la Màscara o Mida del Rang Principal de la VPC (Enrutable)

La mida del rang CIDR per a les subxarxes privades (enrutables) ha de ser adequadament dimensionat en funció dels recursos específics que s'hi desplegaran. Atès que aquestes subxarxes tindran menys recursos que les subxarxes no enrutables, és possible utilitzar un rang CIDR més petit. A continuació es descriu el procés per determinar aquest rang:

- **Recursos que es desplegaran a les Subxarxes Privades (Enrutables)**:

  - **Balancejador Multi-AZ**: Cada **Load Balancer** desplegat en múltiples zones de disponibilitat (AZ) requereix almenys 8 adreces IP per AZ. Si es despleguen a 3 AZ, es necessitaran 24 adreces IP per Load Balancer.

  - **VPC Endpoints**: Cada **VPC Endpoint** per accedir a serveis com S3, DynamoDB, etc., en una configuració multi-AZ també requerirà una adreça IP per cada AZ on es desplegui. Això depèn de la quantitat de serveis als quals es vulgui accedir mitjançant VPC Endpoints.

  - **NAT Gateway**: Cada NAT Gateway desplegada a una zona de disponibilitat requereix una adreça IP. Si es desplega una NAT Gateway per cada AZ per a alta disponibilitat, es requerirà una adreça per cada AZ (normalment 2 AZ).

  - **Instàncies d'EC2 per a Bastions o administració**: Qualsevol instància EC2 que es necessiti per a tasques administratives o de salt també ha de comptar amb una adreça IP per AZ.

- **Càlcul del Rang CIDR (Enrutable)**
  
  El nombre total d'adreces IP necessàries serà el sumatori dels recursos anteriors, tenint en compte les zones de disponibilitat que es vulguin cobrir. Per exemple, si es tenen 2 AZ i es despleguen els següents recursos:

  - 1 Balancejador multi-AZ: 16 IPs (8 per AZ)
  - 2 VPC Endpoints (S3 i DynamoDB): 4 IPs (2 per AZ)
  - 1 NAT Gateway: 1 IP
  - 1 Instància Bastion EC2: 1 IP
  - Adreces IP reservades per AWS: 10 IPs (5 per subxarxa)

  En aquest exemple, es necessitarien un mínim de **32 adreces IP**. Tenint en compte aquest càlcul, és recomanable seleccionar un rang CIDR amb una màscara prou àmplia per assegurar l'escalabilitat en el futur. Un rang **/26** proporciona 64 adreces IP, suficient per a aquest escenari i futurs recursos. 
    
  A causa dels requeriments esmentats, comuns a la gran majoria de casos, per norma general, el rang que es proporcionarà per als comptes nous tindrà, per defecte, una màscara /26 (64 IPs). Encara que, en casos aïllats, en els quals, per un motiu degudament justificat, sigui necessari un major número de IPs enrutables, es podria iniciar un procés en el qual s'intentaria buscar alternatives, o remenar una possible excepció.

  (En el cas d'entorns d'Integració, on només s'utilitzarà una zona de disponibilitat, es proporcionarà principalment un rang CIDR amb màscara /27).

- **Rang CIDR (No enrutable)**

  El rang CIDR designat com a no enrutable será el 172.20.0.0/20, podent utilitzar una màscara més reduïda si es considera oportú.

### Quan no aplicaria aquesta arquitectura? 

Aquesta arquitectura no s'aplicarà en tots els comptes de AWS, ja que, en alguns casos, on el nombre de recursos que podrien ser desplegats en les subxarxes no enrutables, és molt baix, no tindria cap avantatge sobre un model simple amb un únic rang CIDR enrutable. 
És a dir, si per exemple, la infraestructura requerida per a una aplicació està composta únicament de dos contenidors de ECS, exposats per un balanceador, aquest model de Networking utilitzaria el mateix número de IPs privades que el model simple, i, a més, tindria alguns desavantatges com una configuració més avançada i un cost més alt, a causa del desplegament de NAT Gateways.