+++
date        = "2024-07-01"
title       = "Directrius d'integració"
description = "Directrius d'integració CI/CD, Seguretat i Gov. Dada"
sections    = "PTD"
toc         = false
taxonomies  = []
weight      = 2
+++



# **DIRECTRIUS D'INTEGRACIÓ CI/CD**

## **1. INTRODUCCIÓ**

Aquest document té com a objectiu establir les directrius per a la implementació i la gestió de processos d'Integració Contínua (CI) i Desplegament Continu (CD) dins de la nostra organització. En un entorn tecnològic cada cop més dinàmic i competitiu, és fonamental comptar amb procediments estandarditzats que permetin el desenvolupament i el lliurament de programari de manera eficient, segura i d'alta qualitat. Les directrius aquí descrites estan dissenyades per optimitzar el flux de treball, millorar la col·laboració entre equips i assegurar la consistència i la confiança dels nostres desplegaments. Aquest document servirà com a guia per a tots els equips de desenvolupament i operacions, proporcionant les millors pràctiques i estàndards necessaris per assolir els nostres objectius estratègics i operatius.


## **2. VISIÓ GENERAL DEL CI/CD**

## **2.1. Definició de CI/CD**
La Integració Contínua (CI) és una pràctica de desenvolupament de programari on els desenvolupadors integren el seu codi en un dipòsit compartit diverses vegades al dia, amb cada integració verificada per una compilació automatitzada i proves per detectar errors ràpidament. El Desplegament Continu (CD) és una extensió de CI que automatitza el lliurament de canvis de codi a un entorn de producció, assegurant que el programari sempre estigui en un estat desplegable.

## **2.2. Beneficis de  CI/CD**
•	**Reducció d'Errors:** Detecta errors ràpidament i en facilita la correcció immediata.
•	**Lliurament Ràpida:** Accelera el temps de lliurament de noves funcionalitats i millores.
•	**Millora a la Qualitat del Programari:** Les proves automatitzades asseguren que el codi nou no trenqui la funcionalitat existent.
•	**Feedback Continu:** Proporciona retroalimentació constant, permetent ajustaments i millores contínues.
•	**Major Eficiència:** Automatitza tasques repetitives, alliberant temps per al desenvolupament de noves funcionalitats.

## **2.3. Principis Fonamentals**
•	**Automatització:** Automatitzar les compilacions, proves i desplegaments per reduir errors humans i augmentar la velocitat.
•	**Integració Freqüent:** Integrar canvis de codi al repositori diverses vegades al dia per detectar i corregir errors ràpidament.
•	**Lliurament continu:** Mantenir el codi en un estat constantment desplegable, permetent desplegaments freqüents i assegurances.
•	**Proves Rigoroses:** Implementar proves automatitzades exhaustives per assegurar la qualitat del programari.
•	**Feedback Ràpid:** proveir retroalimentació ràpida als desenvolupadors sobre la qualitat del codi i l'estat de la integració.


## **3. Eines i Tecnologies**

## **3.1. Eines d'integració contínua:**
Les eines d'Integració Contínua (CI) automatitzen el procés d'integració del codi en un dipòsit compartit, executant compilacions i proves de manera automàtica per detectar errors com més aviat millor. En el nostre cas, utilitzem GitHub Actions, una poderosa plataforma de QI que permet definir fluxos de treball per compilar, provar i desplegar codi directament des del repositori de GitHub. GitHub Actions ofereix integració nativa amb el repositori i una àmplia varietat daccions predefinides per personalitzar el procés dintegració contínua.

## **3.2. Eines de Desplegament Continu:**
Les eines de Desplegament Continu (CD) automatitzen el procés de lliurament de codi als entorns de producció i preproducció. També fem servir GitHub Actions per a CD, aprofitant la seva capacitat per desencadenar desplegaments automàtics basats en esdeveniments específics, com la fusió de codi en una branca principal. Això assegura que els canvis siguin provats i desplegats de manera consistent i ràpida, mantenint el programari sempre en un estat llest per a producció.

## **3.3. Gestió de Repositoris i Versionat:**
La gestió de repositoris i versions és crucial per mantenir la integritat del codi i facilitar la col·laboració entre equips. GitHub és la nostra plataforma triada per a la gestió de repositoris, oferint un control de versions robust amb Git. GitHub facilita la col·laboració a través de característiques com pull requests, revisions de codi i branques, permetent als equips treballar en paral·lel sense conflictes. A més, GitHub proporciona eines de seguretat i gestió d'accessos, assegurant que només els usuaris autoritzats puguin modificar el codi.


## **4. DIRECTRIUS PER A INTEGRACIÓ CONTÍNUA (CI)**
•	**Configuració de Repositoris**
La configuració de repositoris és essencial per mantenir un entorn de desenvolupament organitzat i eficient. A la nostra plataforma, utilitzem GitHub per gestionar tots els repositoris de codi. Cada projecte tindrà el seu propi dipòsit dedicat, i s'implementaran polítiques d'accés per assegurar que només els membres de l'equip autoritzats puguin modificar el codi. A més, es configuraran plantilles de pull request i issues per estandarditzar les contribucions i facilitar-ne la revisió i el seguiment de problemes.

•	**Estratègies de Branching**
Per gestionar el desenvolupament i els lliuraments de programari de manera efectiva, farem servir l'estratègia de branching **Gitflow**. Gitflow permet un control clar i estructurat de les branques amb dues branques principals per entorn: **develop** i release per a desenvolupament, **pre-prod** i **pre-release** per a **pre-producció**, i **màster** i **hotfix** per a producció. Les branques **feature** es crearan a partir de **develop** per desenvolupar noves funcionalitats i s'integraran de tornada mitjançant pull requests. Aquesta estratègia facilita la gestió de múltiples entorns i assegura que el codi sigui robust i provat abans darribar a producció.

•	**Proves Automatitzades**
Les proves automatitzades són fonamentals per assegurar la qualitat i estabilitat del programari. Cada pipeline de CI/CD executarà proves unitàries configurades a cada projecte. Les proves unitàries s'executaran automàticament cada cop que es faci una integració de codi, assegurant que les noves modificacions no introdueixin errors. Utilitzem eines com JUnit, pytest o similars, depenent del llenguatge de programació del projecte, per definir i executar aquestes proves de manera sistemàtica.

•	**Integració de Codi**
La integració de codi serà gestionada mitjançant pipelins automatitzades a GitHub Actions. Cada cop que s'enviï una pull request, la pipeline executarà les proves unitàries i realitzarà una anàlisi estàtica del codi utilitzant SonarQube per verificar la qualitat del codi. A més, s'utilitzarà Dependency Track per identificar i mitigar qualsevol vulnerabilitat a les dependències del projecte. Això assegura que només el codi d'alta qualitat i segur sigui fusionat a les branques principals.

•	**Validació i Revisió de Codi**
La validación y revisión de código son procesos clave para mantener la calidad del software. Todas las pull requests deberán ser revisadas y aprobadas por al menos un miembro del equipo antes de ser fusionadas. Durante la revisión, se verificará que el código cumpla con los estándares de codificación establecidos, pase todas las pruebas unitarias y no contenga vulnerabilidades detectadas por SonarQube y Dependency Track. Este proceso asegura que el código integrado sea robusto, seguro y conforme a las mejores prácticas de desarrollo.


## **5. DIRECTRIUS PER A DESPLEGAMENT CONTINUO (CD)**
[Aquest punt està a acabar de desenvolupar]
•	Automatització del Desplegament
•	Gestió d'entorns
•	Estratègies de Desplegament
•	Proves en Entorns de Preproducció
•	Monitorització i Feedback


## **6. GESTIÓ DE CONFIGURACIÓ I ARTEFACTES**
[Aquest punt està a acabar de desenvolupar]
•	Definició d'artefactes
•	Gestió de Versions d'Artefactes
•	Emmagatzematge i Recuperació d'Artefactes


## **7. MONITORITZACIÓ I REPORTING**
[Aquest punt està a acabar de desenvolupar]

•	Eines de Monitorització
•	Mètriques de Rendiment
•	Informes i Dashboards
•	Gestió d'Incidents


# **DIRECTRIUS DE SEGURITAT**

# 1. INTRODUCCIÓ

Aquest document té com objectiu establir les directrius bàsiques que han de seguir totes les aplicacions per poder treballar amb la PTD de forma segura. La seguretat, des del principi, ha estat un element clau en la construcció de la plataforma i la integració del diferents projectes que l’utilitzen. El punt de partida i principal marc de controls, treballat amb l’Agència de Ciberseguretat de Catalunya (Agència), ha estat l’Esquema Nacional de Seguretat (ENS), juntament amb el marc normatiu de la Generalitat de Catalunya en matèria de seguretat de la informació.

De totes formes, a banda d’aquest document, és essencial mantenir **reunions** amb els equips de desenvolupament a l’inici de qualsevol projecte i **acompanyar**\-los durant tota l’etapa de creació de les aplicacions sobre la PTD.

# 2. DIRECTRIUS DE SEGURETAT

De tots els controls que hi apliquen, s’han extret els necessaris (les directrius) que ha de seguir qualsevol desenvolupament nou per poder treballar amb la PTD. Aquests s’han dividit en:

- Desenvolupament segur.
- Gestió d’usuaris i control d’accés.
- Seguretat de la informació.
- Altres directrius.

## 2.1. Desenvolupament segur

Tot desenvolupament sobre la PTD ha de seguir el seu **marc de desenvolupament segur**, basat en OWASP SAMM. Principalment:

1. S’han de seguir els **estàndards i polítiques** de seguretat aplicables a nivell autonòmic, nacional i europeu. Els principals a tenir en compte són:
    - [Marc normatiu del CTTI](https://portal.ciberseguretat.cat).
    - [Esquema Nacional de Seguretat (ENS)](https://ens.ccn.cni.es/es/).
    - [RGPD](https://eur-lex.europa.eu/legal-content/ES/TXT/HTML/?uri=CELEX:32016R0679)/[LOPDGDD](https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673&tn=1&p=20230509).
2. És essencial seguir **guies de bones pràctiques**, principalment d’OWASP, segons les necessitats de desenvolupament. Algunes d’aquestes són:
    - [OWASP Top Ten](https://owasp.org/Top10/es/).
    - [OWASP Application Security Verification Standard (ASVS)](https://github.com/OWASP/ASVS/raw/v4.0.3/4.0/OWASP%20Application%20Security%20Verification%20Standard%204.0.3-es.pdf).
    - [OWASP Top 10 API Security Risks](https://owasp.org/API-Security/editions/2023/en/0x11-t10/).
    - [Java Oracle Secure Coding Guidelines](https://www.oracle.com/java/technologies/javase/seccodeguide.html).
    - [Angular Security Guide](https://angular.dev/best-practices/security).
    - [Azure Databricks Security Best Practices](https://cms.databricks.com/sites/default/files/2023-01/azure_databricks-security_best_practices_and_threat_model.pdf).
    - [Guies Scala](https://blog.codacy.com/9-scala-security-issues).
3. S’ha de mantenir un **catàleg de requisits** de seguretat, per garantir la implementació efectiva de mesures de seguretat, protegir actius i dades, i facilitar el compliment de la normativa.
4. En quant a la **implementació**:
    - Totes les **eines de desenvolupament** (IDE principalment) han de:
        - Ser configurades de forma segura.
        - Incloure els següents **plugins** de detecció de vulnerabilitats, problemes de qualitat i seguretat (o d’altres de similars):
            - SpotBugs.
            - SonarLint, connectat amb SonarQube.
            - Dependency Check, per poder analitzar dependències amb tercers.
    - S’ha de mantenir el **control de versions** del software.
    - Per al desenvolupament segur s’ha de tenir en compte:
        - [Els controls proactius d’OWASP](https://owasp.org/www-project-proactive-controls/v3/en/0x04-introduction), d’**obligat** compliment. Al següent Excel es detalla cadascun dels controls i permet fer un seguiment de la seva implementació, que ha de ser presentat a l’equip de seguretat de la plataforma abans de poder posar res en producció.


[Fichero: PTD-ChecklistProactiveControlsOWASPv2.0.xlsx](/related/Seguritat/PTD-ChecklistProactiveControlsOWASPv2.0.xlsx)


- - - Guies de desenvolupament segur de:
            - Angular
            - Java
            - JavaScript
            - Spring Boot
            - Scala
            - Python
    - Tots els secrets han d’estotjar-se a **Azure Key Vault**. Si es treballa amb Databricks, s’empraran els Secret Scopes associats als Azure Key Vault. La creació de secrets ha de ser **gestionada amb l’equip de seguretat encarregat**.

5. En quant a la **verificació** s’han de dur a terme, al menys, les següents proves de seguretat:
    - **Tests unitaris** amb un cobriment mínim del 85% del codi.
    - **Anàlisi estàtica de codi font (SAST)** amb SonarQube + FindBugs. Aquestes anàlisis es duran a terme dins els pipelines CI/CD. El codi que no passi les proves SAST no pujarà al repositori. Per tant, és recomanable que els desenvolupadors facin servir els plugins esmentats abans per detectar possibles vulnerabilitats.
    - **Anàlisi de dependències de tercers (SCA)** amb Dependency Track dins el pipelines CI/CD. El codi que no passi les proves SCA no pujarà al repositori. Per tant, és recomanable que els desenvolupadors facin servir el plugin Dependency Check esmentat abans dins els seus IDE per detectar possibles problemes.
    - **Anàlisi dinàmica d’aplicacions (DAST)**. Són proves dinàmiques que només es duran a terme a l’entorn de PRE amb l’eina OWASP ZAP. Aquesta només és utilitzada per l'equip de la Oficina de Seguretat de Minsait de CTTI ([rspminsait@minsait.com] i per tant és qui gestiona les peticions de proves DAST, la seva realització i l’entrega de resultats a Gencat.
	
6. S’ha de dur a terme el **registre d’activitats dels usuaris i d’esdeveniment** dins l’aplicació. Aquestes traces escrites per l’aplicació seran recollides pels serveis de logs del proveïdor cloud, pel que serà necessari coordinar-se amb l’equip de seguretat per tal de realitzar la configuració adient. Per defecte, el **període de retenció de logs** serà de 6 mesos disponibles en tot moment i de 12 mesos disponibles sota demanda, el que implica un total de 18 mesos de retenció. Quan sigui possible, **s’ha d’enregistrar**:
    - Falles en la validació d'entrada, per exemple, violacions del protocol, codificacions inacceptables, noms i valors de paràmetres invàlids.
    - Falles de validació de sortida, per exemple, desajustaments del conjunt de registres de la base de dades, codificació de dades invàlida.
    - Èxits i fracassos de l'autenticació. Important no enregistrar la contrasenya en els logs.
    - Falles d'autorització (control d'accés).
    - Falles en la gestió de la sessió, per exemple, modificació del valor d'identificació de la sessió de _cookies_.
    - Errors d'aplicació i esdeveniments del sistema, per exemple, errors de sintaxis i de temps d'execució, problemes de connectivitat, problemes de rendiment, missatges d'error de servei de tercers, errors del sistema d'arxius, detecció de virus de càrrega d'arxius, canvis de configuració.
    - Arrencades i tancaments d'aplicacions i sistemes relacionats, i inicialització del registre (inici, parada o pausa).
    - Utilització de funcions de major risc, per exemple, connexions de xarxa, addició o eliminació d'usuaris, modificació de privilegis, assignació d'usuaris a fitxes, addició o eliminació de fitxes, utilització de privilegis d'administració de sistemes, accés d'administradors d'aplicacions, totes les accions d'usuaris amb privilegis administratius, accés a dades de titulars de targetes de pagament, utilització de claus de xifratge de dades, canvis de claus, creació i eliminació d'objectes a nivell de sistema, importació i exportació de dades, inclosos informes en pantalla, presentació de contingut generat pels usuaris, especialment càrregues d'arxius.
    - Permisos legals i d'un altre tipus, per exemple, permisos per a la utilització de telèfons mòbils, condicions d'ús, termes i condicions, consentiment per a l'ús de dades personals, permís per a rebre comunicacions comercials.
    - Fallada en la seqüenciació.
    - Ús excessiu.
    - Canvis de dades.
    - Frau i altres activitats delictives.
    - Comportament sospitós, inacceptable o inesperat.
    - Modificacions de la configuració.
    - Arxiu de codi d'aplicació i/o canvis en la memòria.

## 2.2. Gestió d’usuaris

Les directrius a seguir en quant a la gestió d’usuaris són les següents.

1. A la Plataforma de Dades del CTTI es defineixen les següents tipologies d’usuaris:

- **Usuaris d’administració**, amb privilegis administratius sobre els diferents components de la plataforma de dades (Databricks, MongoDB Atlas, Microsoft Azure, etc.). Quan sigui possible, seran usuaris nominals del CTTI i sempre es farà servir MFA durant la seva autenticació.
- **Usuaris nominals** associats a persones físiques. Aquests seran usuaris de la Generalitat i iniciaran sessió SSO a través de **GICAR** del CTTI. GICAR es sincronitza alhora amb Microsoft Entra ID de la plataforma, de manera automàtica. És competència de CTTI.
- **Usuaris màquina**, que accediran a la plataforma a través de SSH, SFTP, JDBC, interfases no SSO, etc. Principalment, seran **usuaris genèrics** associats a altres sistemes que no formen part de la plataforma de dades (BI, portals i backoffices departamentals, sistemes de tercers, etc.) i aquells **usuaris automàtics** d’explotació i processament de les dades de la plataforma.

2. Els **usuaris màquina** s’han de crear des dels diferents components de la plataforma de dades. Aquests, per fer-los servir, han de tenir assignades les credencials corresponents, segons el component de la plataforma:

- Databricks: _access token_ associat al compte d'App d'Azure del Service Principal.
- MongoDB: password.
- Eventhub: certificat mTLS.
- SFTP d’ingesta de dades: password o clau SSH.
- Denodo: OAUTH o password.

3. Per poder treballar amb un **usuari**, s'ha de fer petició a l'equip d'administració d'usuaris, **justificar** necessitat i indicar els requisits d'accés als components de la plataforma (Databricks, MongoDB Atlas, etc.).

## 2.3. Control d’accés

El control d'accés ajuda a prevenir que persones no autoritzades obtinguin accés als diferents recursos de la PTD. Mitjançant els permisos d’accés a la plataforma, es podrà controlar de forma granular quins usuaris hi tenen accés.

![Cas 1](/related/Seguritat/SEG01.png)

En quant a les directrius de **control d’accés** a les dades i altres recursos de la PTD:

1. Els prestadors de serveis de manteniment i desenvolupament **no han de tenir accés a les dades de PRO**. La gestió d'usuari a PRO és **responsabilitat de negoci** (departament). No obstant això, els prestadors de serveis han de procurar que les mesures establertes i configurades de control d'accés siguin les adients (contrasenyes segures, que el sistema permeti crear rols, MFA, etc.).
2. Es faran servir els **rols i grups** definits per l’equip de seguretat. Qualsevol nova petició haurà de ser **avaluada i aprovada per aquest equip, actuant baix les directrius del CTTI**. Al següent esquema es mostra la definició dels perfils principals d’usuari existents i els seus accessos a cadascuna de les capes de dades d’un projecte a la PTD.

![Cas 2](/related/Seguritat/SEG02.png)

Al quadre següent es poden veure l’assignació dels diferents permisos per tipus d’usuari i capa de dades.

![Cas 3](/related/Seguritat/SEG03.png)

3. Els recursos i dades del sistema es protegiran de tal forma que **per defecte s’impedeix el seu ús**, excepte per als usuaris amb els drets d'accés suficients.
4. Els **drets d'accés** de cada recurs s'establiran segons les decisions de la **persona responsable del recurs**, que s’haurà d’atendre a les polítiques i normatives de seguretat de la PTD.
5. Es gestionaran els permisos i les autoritzacions d’accés amb incorporació dels principis de **menor privilegi i separació de funcions**.
6. Els **drets d’accés de cada usuari** es limitaran atenent els principis següents:
    - **Tot accés estarà prohibit**, excepte autorització expressa.
    - **Mínim privilegi**. Els privilegis de cada usuari es reduiran al mínim estrictament necessari per complir amb les seves obligacions.
    - **Necessitat de conèixer**. Els privilegis es limitaran de manera que els usuaris només accediran al coneixement d’aquella informació requerida per complir les seves obligacions.
    - **Capacitat d’autoritzar**. Només i exclusivament el personal amb competència per fer-ho pot concedir, alterar o anul·lar l’autorització d’accés als recursos, d’acord amb els criteris establerts pels responsable.

Els **mecanismes d’autenticació**, que actualment es poden emprar a la PTD, són els de la taula següent, qualsevol altra necessitat s’ha de presentar, avaluar i ser aprovada pel CTTI i l’Agència:

| Plataforma | Mecanismes/sistemes autenticació | Descripció |
| --- | --- | --- |
| Databricks | Microsoft Entra ID/OAUTH | L’autenticació d’usuaris nominals es realitzarà mitjançant el Microsoft Entra ID del CTTI, que es sincronitza amb el GICAR (no federat) i no permetrà SSO. |
| Databricks | Service principal/OAUTH | Mecanisme de Databricks que representa un usuari màquina dintre del sistema, permetent l'automatització de tasques. Per a cada service principal a fer servir, s'ha d'enregistrar una aplicació dins Microsoft Entra ID. |
| MongoDB Atlas | GICAR CTTI/SAML | MongoDB Atlas permet gestionar l’autenticació d’usuaris nominals federant-se amb GICAR CTTI, emprant el protocol SAML 2.0. Els usuaris entraran amb les seves credencials de GICAR. S’emprarà principalment per l’accés a les consoles d’administració. |
| MongoDB Atlas | SCRAM | Usuari i password per als usuaris de les bases de dades, és a dir, els usuaris màquina. |
| Eventhub | mTLS | Dins la Plataforma Eventhub els clients han d’emprar mTLS per autenticar-se contra els brokers de Kafka, ja sigui per produir com per consumir esdeveniments. |
| SFTP | Usuari/Password | Usuari i password de l’SFTP de la plataforma. |
| SFTP | PKI | Parell de claus pública-privada per connectar-se a l’SFTP de la plataforma sense necessitat d’utilitzar un usuari i contrasenya. |
| Denodo | GICAR CTTI/OIDC | Denodo permet gestionar l’autenticació d’usuaris nominals federant-se amb GICAR CTTI, emprant el protocol OIDC. Els usuaris entraran amb les seves credencials de GICAR amb MFA. S’emprarà principalment per l’accés a les consoles d’administració. |
|  Denodo | Usuari/Password | Per als usuaris màquina, serà necessari emprar usuari i password. |

## 2.4. Seguretat de la informació

En quant a les seguretat de les dades, s’han de seguir les següents directrius:

1. S’ha de complir amb els requisits del [Marc de Ciberseguretat per a la Protecció de Dades (MCPD) - Mesures de seguretat](https://portal.ciberseguretat.cat/compliment-normatiu-1/auditoria-i-marc-normatiu/marc-normatiu/marc-normatiu-i-legal/marc-de-ciberseguretat-per-a-la-proteccio-de-dades-mesures-de-seguretat.pdf/view) de l’Agència, segons el nivell de protecció resultant de la qualificació de la informació.
2. S’ha d’omplir el [formulari de qualificació](https://forms.office.com/Pages/ResponsePage.aspx?id=LzkobXpESk6iYpe6sejsJz7aNJibx9lJifqsOWHfnt9UQ0pTRVRNWDhDUDY1UzJaU01QS09EUEFQWSQlQCN0PWcu) de la informació exigida per l’Agència de Ciberseguretat i l’ENS. L’Agència farà arribar la seva qualificació i una llista de requisits a complir. Per al conjunt de la PTD s’han establert els nivells de protecció de la següent taula.

![Cas 4](/related/Seguritat/SEG04.png)


La categorització anterior no eximeix del fet que els projectes nous hagin de qualificar la seva informació, abans d’aplicar les mesures de seguretat més adients per protegir les seves dades.

3. Queda **prohibit l’ús de dades personals reals en entorns no productius**. Queda prohibida l’exportació de dades personals de producció cap a entorns no productius sense haver rebut prèviament un **tractament d’anonimització** i l’aprovació del seu responsable.
4. **Les dades a preproducció i desenvolupament** **mai no** **podran ser reals**.
6. Tots els **accessos de dades de producció** han de ser aprovats pel seu responsable i justificat convenientment. S’ha d’indicar sobre quines dades s’actuarà, com s’hi accedirà i quant de temps serà necessari el seu accés.
6. Les **extraccions** de dades de **producció** cap a sistemes tercers seran aprovades pel seu responsable. Només s’extrauran les dades mínimes per cobrir els requisits dels casos d’ús i, sempre que es pugui **anonimitzades** o **pseudonimitzades**. Totes les dades viatjaran **xifrades**.
7. Totes les dades seran **xifrades** **en** **repòs i en trànsit**. Tot el material criptogràfic emprat al xifrat de dades s’ha d’emmagatzemar i gestionar dins Azure Key Vaults.
8. Es **minimitzarà** la informació personal i de negoci ingestada a la PTD. És a dir, només s’ingestaran les dades necessàries per a cada cas d’ús.
9. S’han **d’auditar els accessos a dades personals**.
10. Es realitzaran **còpies de seguretat** de les dades. La **política** de compliment de còpies de seguretat per a la PTD és la següent: **estàndard**. És a dir, diària incremental amb 2 setmanes de retenció, setmanal completa amb 1 mes de retenció, mensual completa amb 3 mesos de retenció i anual completa amb 1 any de retenció (cobrint 1 any i 3 mesos de retenció de dades). Està alineada amb la [guia del CTTI](https://portal.ciberseguretat.cat/compliment-normatiu-1/auditoria-i-marc-normatiu/marc-normatiu/gestio-de-la-continuitat-de-negoci/guit040-c-guia-de-copies-de-seguretat.pdf/view) de còpies de seguretat.

A la següent imatge es poden veure algunes de les tècniques a fer servir per tal de garantir la protecció de les dades personals.

![Cas 5](/related/Seguritat/SEG05.png)


I a la següent imatge a on és convenient aplicar cadascuna de les tècniques esmentades dins el flux de les dades dins la PTD.

![Cas 6](/related/Seguritat/SEG06.png)



## 2.5. Altres directrius de seguretat

**Retirar comptes i contrasenyes estàndard**. No és faran servir en cap moment comptes ni contrasenyes estàndard. Els usuaris nominals entraran per GICAR o Entra ID; és en aquests sistemes on es gestionen les contrasenyes dels usuaris nominals.

**Aplicació de la regla de mínima funcionalitat**. Totes les aplicacions que es creen sobre la PTD només han de proporcionar les funcionalitats necessàries per al seu funcionament correcte.

**Aplicació de la regla de seguretat per defecte**. Totes les aplicacions que es creen sobre la PTD han d’incloure el control d'accés dels usuaris, el que implica que els usuaris només han de poder realitzar accions definides pel seu perfil. Només l'administrador pot reduir la seguretat de manera conscient. I encara que un usuari desconegui com treballar no podrà realitzar accions fora de les accions permeses dins del seu perfil.

Tots els **intercanvis d'informació i prestació de serveis amb altres sistemes** hauran de ser objecte d'una **autorització** prèvia. Tot flux d'informació estarà prohibit excepte autorització expressa. Per a cada **interconnexió** es documentarà explícitament: les característiques de la interfície, els requisits de seguretat i protecció de dades i la naturalesa de la informació intercanviada.

A la PTD existeix el xifrat de les dades en trànsit per tal d'evitar qualsevol tipus d'atac que puguin comprometre la integració de la informació. Només s'admeten els **protocols de comunicacions segures TLS v1.2 o superior i ssh**. Totes les comunicacions han de passar per la NET0 de CTTI, tant internes com externes.


# **DIRECTRIUS D'INTEGRACIO DE GOVERN DE LA DADA**

**REQUISITS DE GOVERN DE LES DADES PER ALS PROVEÏDORS**

Que treballin amb la Plataforma Transversal de Dades de la Generalitat de Catalunya

# Introducció

Aquest document conté tots els requisits necessaris per poder introduir tota la informació de govern de les dades referent a les entitats del cas d’us a l’eina de govern de la Generalitat de Catalunya (Axon).

També conté tota la informació que els diferents proveïdors que treballin amb la Plataforma Transversal de Dades necessiten per complimentar tots els requisits de govern i les plantilles necessàries.

# Informació bàsica inicial

| **Nom** | Nom del cas d’ús. |
| --- | --- |
| **Abreviació del nom del cas d’us** | Aquesta ha de tenir com a màxim una paraula, que servirà per identificar el cas d’ús i disposar d’una versió del nom més curta que s'utilitzarà en els noms de les BBDD i directoris. |
| **Context** | Text que proporcioni una visió general del cas d’ús i ajudi a que tots els involucrats comprenguin que és el que s’ha d’explotar, com es vol dur a terme i de que tracten les dades. |
| **Objectius** | Objectius del cas d’ús. |
| **Domini** | Domini al que forma part el cas d’ús. |
| **Subdomini/s** | Subdomini/s al/s que forma part el cas d’ús. |
| **Departament peticionari** | Departament que sol·licita l’execució del cas d’ús. |
| **Àmbit funcional** | Àmbit funcional on pertany el cas d’ús. |

El domini i subdominis es poden complimentar a partir del document “Abreviacións de dominis i subdominis que es pot trobar al final del document”.


## Definició dels rols

Per tal de poder representar totes les parts interessades de les diferents entitats del cas d’us a l’eina de govern, és necessari recollir la següent informació:

| **Rols responsables govern funcional** | **Nom i cognoms** | **Contacte (correu)** |
| --- | --- | --- |
| DGAD |     |     |
| Responsable funcional |     |     |
| Referent de govern de les dades |     |     |

| **Rols responsables govern tècnic** | **Nom i cognom** | **Contacte (correu)** |
| --- | --- | --- |
| CTTI |     |     |
| Referent tècnic de govern de les dades |     |     |
| Arquitecte de la dada (PTD) |     |     |
| Administrador de sistemes (PTD) |     |     |
| Arquitecte/s de la dada (sistema/es orígen) |     |     |
| Administrador/s de sistema/es (sistema/es orígen) |     |     |

# Informació de les capes funcionals de la PTD

La Plataforma Transversal de Dades està composta de les següents capes funcionals, utilitzades per distribuir les dades en funció del seu grau d’estandardització i enriquiment:

- **Capa Bronze (BRZ):** Utilitzada per emmagatzemar una rèplica de les dades dels sistemes origen.
- **Capa Silver (SLV):** Utilitzada per emmagatzemar una rèplica de les dades de la capa BRZ quan han passat pel procés d’estandardització i qualitat de remeiació inicial. És una capa d’explotació.
- **Capa Gold (GLD):** Utilitzada per emmagatzemar les dades enriquides que apareixen al desenvolupar tècnicament el cas d’ús, després del modelat

![Cas 1](/related/Govern/GOV01.png)

Al final del present document es pot trobar el document “Estàndards tècnics de govern” amb tota la informació referent a les capes funcionals.

## Nomenclatura a la BBDD – Databricks

A la base de dades de la PTD (Databricks), les dades s’agrupen mitjançant les capes funcionals, catàlegs i esquemes. Aquests catàlegs i esquemes han de tenir la següent nomenclatura:

| **Catàleg** | ABREVIACIÓ DOMINI_(DES,PRE,PRO) |
| --- | --- |
| **Esquema BRZ** | BRZ_APP/SISTEMA ORIGEN_ABREVIACIÓ SUBDOMINI |
| **Esquema SLV** | SLV_ABREVIACIÓ SUBDOMINI |
| **Esquema GLD** | GLD_ABREVIACIÓ NOM CAS D’ÚS_ABREVIACIÓ SUBDOMINI |

Per exemple, per el cas d’ús de REU:

| **Catàleg** | EDU_FORMACIO_(DES,PRE,PRO) |
| --- | --- |
| **Esquema BRZ** | BRZ_ACCESNET_ESTUDIS_UNIVERSITARIS |
| **Esquema SLV** | SLV_ESTUDIS_UNIVERSITARIS |
| **Esquema GLD** | GLD_PREIN_ESTUDIS_UNIVERSITARIS |

Cada un dels catàlegs (DES,PRE,PRO) contindrà, com a mínim un esquema de BRZ, un esquema de SLV i un esquema de GLD, però en poden existir més en cas que existeixin diverses aplicacions o sistemes origen o en cas que les dades formin part de diferents subdominis.

En cas que les dades formin part de diferents dominis, serà necessari crear els catàlegs corresponents.

Al document d’estàndards tècnics que es pot trobar al final del present document, es pot trobar tota la informació detallada i amb exemples de les nomenclatures a Databricks.

## Informació de govern de les entitats de les diferents capes

A l’eina de govern de les dades (Axon), s’ingesta la informació de govern referent a les entitats de de les diferents capes funcionals de la PTD. D’una banda, la informació referent a les dades en l’estat en el que es troben a l’origen (per poder representar el llinatge tècnic a l’eina) corresponent a la capa BRZ i d’altra banda, la informació referent a les dades estandarditzades i enriquides, corresponents a les capes SLV i GLD.

A continuació es detallen els requisits necessaris per incorporar tota aquesta informació a l’eina de govern de les dades.

### Plantilles d’ingesta de les entitats de la capa BRZ

Per tal de poder introduir la informació de les entitats d’origen al l’eina i representar el llinatge tècnic, és necessari completar les següents plantilles, que es poden trobar al final del document:

- **Plantilla de sistemes:** Cal complimentar tota la informació demanada referent als sistemes i aplicacions origen de les dades.
- **Plantilla de Conjunts de Dades i Atributs:** Cal complimentar tota la informació demanada referent als Conjunts de Dades (taules) i els seus corresponents Atributs (camps) en l’estat en que es troben als sistemes origen.
- **Plantilla de Glossari de termes de negoci:** Cal dissenyar el glossari de termes de negoci que es relacionaran amb les taules i camps de l’anterior plantilla i complimentar tota la inormació demanada per tal de poder introduir-lo a l’eina.

Aquestes plantilles s’han de treballar i complimentar conjuntament amb els corresponents usuaris del departament propietari del cas d’ús.

### Plantilles d’ingesta de les entitats de la capa SLV

Per tal de poder introduir la informació de les entitats estandarditzades a l’eina i representar el llinatge tècnic, és necessari completar les següents plantilles, que es poden trobar al final del document:

- **Plantilla de sistemes:** Cal complimentar tota la informació demanada referent al sistema. Per al cas de SLV i GLD, es crearà un sol sistema a l’eina de govern, amb el nom del cas d’us, que contindrà totes les taules i camps explotables del mateix. Serà necessari informar el sistema PTD com a sistema principal a la plantilla.
- **Plantilla de Conjunts de Dades i Atributs:** Cal complimentar tota la informació demanada referent als Conjunts de Dades (taules) i els seus corresponents Atributs (camps) en l’estat en que es troben a la capa SLV, despres d’haver estat estandarditzats mitjançant les directrius de nomenclatura de la PTD.
- **Plantilla de relacions entre atributs:** Es troba al mateix document que la plantilla anterior i, en aquest cas, s’ha d’utilitzar per establir la relació entre els atributs dels conjunts de dades de BRZ (no estandarditzats) i els de SLV (estandarditzats), per tal de representar el llinatge a l’eina.
- **Plantilla de Glossari de termes de negoci:** En aquest cas, els termes de negoci del glossari seran els mateixos que s’han dissenyat per les entitats de la capa BRZ, doncs es tracta de les mateixes taules i camps però estandarditzats, i han d’estar relacionats amb els mateixos conceptes de negoci.

Aquestes plantilles s’han de treballar i complimentar conjuntament amb els corresponents usuaris del departament propietari del cas d’ús i, en el cas dels conjunts de dades i atributs, s‘han de seguir les següents directrius de nomenclatura, recollides al document d’estàndards tècnics:

![Cas 2](/related/Govern/GOV02.png)

![Cas 3](/related/Govern/GOV03.png)

![Cas 4](/related/Govern/GOV04.png)

![Cas 5](/related/Govern/GOV05.png)

![Cas 6](/related/Govern/GOV06.png)


### Plantilles d’ingesta de les entitats de la capa GLD

Una vegada finalitzat el desenvolupament tècnic del cas d’ús, per tal de poder introduir la informació de les entitats enriquides a l’eina, és necessari completar les següents plantilles, que es poden trobar al final del document:

- **Plantilla de Conjunts de Dades i Atributs:** Cal complimentar tota la informació demanada referent als Conjunts de Dades (taules) i els seus corresponents Atributs (camps) que s’han generat a la capa GLD a partir del desenvolupament del cas d’ús, aquests ja s’han d’haver generat mitjançant les directrius de nomenclatura de la PTD.
- **Plantilla de relacions entre atributs:** Es troba al mateix document que la plantilla anterior i, en aquest cas, s’ha d’utilitzar per establir la relació entre els atributs dels conjunts de dades de SLV i els de GLD i si s’escau, entre GLD i GLD, per tal d’acabar de representar totes les relacions i obtenir el mapa complet a l’eina.
- **Plantilla de Glossari de termes de negoci:** És necessari desenvolupar els termes de negoci corresponents als nous conceptes que hagin pogut aparèixer a partir de l’enriquiment i modelat de les dades de la capa SLV i també es poden aprofitar els que s’havien creat anteriorment en els casos que apliqui.

Aquestes plantilles s’han de treballar i complimentar conjuntament amb els corresponents usuaris del departament propietari del cas d’ús i, en el cas dels conjunts de dades i atributs, s‘han de seguir les directrius de nomenclatura, esmentades anteriorment i recollides al document d’estàndards tècnics.

# Documents de suport i plantilles

A continuació s’adjunten tots els documents de suport que contenen la informació necessària per completar totes les tasques esmentades en aquest document i les plantilles necessàries que s’han de completar amb els usuaris.

## Document que conté la informació de dominis i subdominis

Aquest document conté la recopilació completa de dominis i subdominis definits per la Funció Central Funcional, les seves descripcions i les seves corresponents abreviacions que s’hauràn d’utilitzar a l’hora de definir les nomenclatures dels catàlegs i esquemes de la BBDD (Databricks).

[Acronims_Abreviacions_Dominis_Subdominis.xlsx](/related/Govern/010224_Acronims_Abreviacions_Dominis_Subdominis.xlsx)


## Document d’estàndards tècnics

Aquest document conté tota la informació necessària per realitzar les tasques referents a l’estructura de capes, la definició de nomenclatures i, a mes a mes, conté la informació referent al model de seguretat i privacitat de la plataforma.

[PTD_Estàndars_tècnics_gover.pdf](/related/Govern/PTD_Estàndars_tècnics_gover.pdf)


## Plantilles d’ingesta de l’eina de govern (Axon)

En aquest apartat s’adjunten totes les plantilles necessàries que cal utilitzar a l’hora de treballar amb els usuaris dels departaments. S’han de complimentar rigorosament per posteriorment poder incorporar i representar tota la informació recollida a l’eina de govern de les dades. Totes elles contenen instruccions i llegendes per tal de facilitar aquesta tasca.

### Plantilla de sistemes

[Plantilla_Sistemes_aut.xlsx](/related/Govern/20240620_Plantilla_Sistemes_aut.xlsx)


### Plantilla de Conjunts de dades i Atributs + relacions entre Atributs

[Plantilles_Conjuntsdades_Atributs_aut.xlsx](/related/Govern/20240620_Plantilles_Conjuntsdades_Atributs_aut.xlsx)


### Plantilla del Glossari de termes de negoci

[Plantilla_Glossari_aut.xlsx](/related/Govern/20240620_Plantilla_Glossari_aut.xlsx)




