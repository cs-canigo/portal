+++
date = "2024-12-31"
title = "Desplegaments"
description = "Com desplegar productes i APIs a l'API Manager Corporatiu"
sections = "APIM"
toc = true
taxonomies = []
weight = 4
+++

## Introducció

El **API Manager Corporatiu** és una aplicació integrada amb el **[Servei d'Integració Contínua](/plataformes/sic/) (SIC)**, que és un servei a disposició dels proveïdors d'aplicacions per automatitzar el desplegament
de les aplicacions.
L'**API Manager Corporatiu** fa ús de les pipelines del **SIC 3.0**, configurades a **Jenkins**, o dels workflows de **SIC+**, configurades a **GitHub**, per desplegar i gestionar de manera senzilla el cicle de vida dels productes i APIs en els diferents entorns que el conformen.

## Passos previs al desplegament

Abans de començar amb el desplegament d' APIs, es llisten una sèrie d' accions que s' han de demanar i realitzar per tal de poder dur a terme un desplegament sense dificultats:

### Permisos
Per poder usar les eines i serveis necessaris per al desplegament d'APIs es requereix demanar una sèrie de permisos, com:
* **GICAR.** És l'Identity provider de CTTI. Cal tenir donat d' alta un usuari a GICAR ja que les eines a usar estan integrades amb aquest IDP.
* **VPN.** Necessària per accedir als recursos interns de CTTI, com ara el Gitlab, Jenkins..., per poder realitzar els desenvolupaments per cadascun dels proveïdors.
* **JIRA.** : Plataforma que es fa servir per realitzar peticions de suport, incidències, dubtes... per configurar tant l'API Manager com el SIC per als desplegaments a realitzar.
* **IBM API Connect.** Plataforma per on estan desplegades les APIs i els productes relacionats amb el CTTI.
* **Gitlab.** És l'eina que es farà servir com a repositori de tots els fitxers relacionats amb el projecte **(si es desplega amb SIC 3.0)**.
* **GitHub.** És l'eina que es farà servir com a repositori de tots els fitxers relacionats amb el projecte **(si es desplega amb SIC+)**.

### Instal·lació de programari
Aquests programes poden ser útils o fins i tot necessaris per poder fer els desplegaments.
* **Client GIT.** Instal·lar un client GIT pot ajudar a desplegar els canvis de codi amb facilitat al Gitlab/GitHub corporatiu.
* **Client VPN.** Permetrà configurar i connectar-se a la VPN de CTTI per poder accedir a serveis desplegats a la xarxa interna.
* **API Connect Toolkit/API Designer.** API Connect Toolkit, també anomenat API Designer, és l'eina facilitada per IBM perquè els desenvolupadors puguin desenvolupar les seves pròpies APIs en el seu entorn local, que compta amb les principals funcionalitats que té l'API Manager.
* **Docker.** Docker és una plataforma de programari que ens permet crear un entorn local de prova per testejar l'API que es desenvolupi.

### Configuració de l'entorn local
Després d'instal·lar els programes de la secció anterior, cal configurar-los per poder realitzar els desenvolupaments en local de forma àgil.
* **VPN.** Un cop instal·lat el client VPN, s'haurà de configurar la connexió a la VPN de CTTI per accedir als serveis interns corresponents.
* **API Connect Toolkit i Local Testing Environments (LTE)**. Permetrà desenvolupar les APIs de forma més senzilla i poder fer diverses proves en local.
* **Gitlab.** Al client GIT instal·lat prèviament es podrà configurar la connexió amb el Gitlab corporatiu per a la pujada del codi requerit per les pipelines per poder desplegar les APIs **(si es desplega amb SIC 3.0)**.
* **GitHub.** Al client GIT instal·lat prèviament es podrà configurar la connexió amb el GitHub corporatiu per a la pujada del codi requerit per poder desplegar les APIs **(si es desplega amb SIC+)**.

## Desplegament de APIs amb SIC 3.0

### Consideracions prèvies dins del CTTI

L'organització de catàlegs, espais i productes és la següent:

- Hi ha **quatre catàlegs segons el tipus d’entorn i el tipus de visibilitat**: `privat_pre`, `public_pre`, `privat` i `public`.
- **Cada codi de diàleg disposarà d'un espai propi** amb la nomenclatura "CD" + <codi_diàleg> (agrupació de productes). Per exemple: "CD0192".
- Un producte és una agrupació d’APIs i plans que les acompanyen (unitat mínima a versionar, desplegar i subscriure).

Un cop fet el desenvolupament amb [API Designer](https://www.ibm.com/docs/en/api-connect/10_reserved_instance?topic=toolkit-working-offline-in-api-designer),
caldrà exportar els yml de definició del producte i les seves APIs per a repositar-los al sistema de gestió de
codi font (SCM - Source Code Management) del SIC d'acord amb les següents premisses:

* Cada producte es correspondrà amb un projecte dins el **codi de diàleg** adient, de forma que tota la gestió posterior de pipelines
i creació de peticions Remedy o Jira s'associïn a l'aplicació corresponent. Per aquest mateix motiu, **no està contemplat la creació
de subgrups de projectes**, tot i que l'eina ho permeti.

* Els projectes poden tenir tantes branques com siguin necessàries, però sempre s’haurà d’incloure la **branca MASTER**
i el contingut d’aquesta branca serà amb el que
treballaran les pipelines de desplegament per defecte. No obstant això, el sistema permetrà opcionalment
desplegar el codi font associat a la **branca EVOLUTIUS**.

* Aquest repositori **no és un entorn de desenvolupament**, per la qual cosa només les persones assignades com a Release
Managers seran les encarregades de consolidar el codi i
lliurar-lo. Aquest codi font ja haurà d'estar validat en entorns de desenvolupament i es lliurarà quan es decideixi
distribuir als entorns dels serveis TIC centrals.

* Els **pipelines seran les encarregades de generar els TAGS de Release** de codi corresponents tan bon punt es desplegui amb èxit
a Producció.

### Creació de fitxers necessaris

De cara al funcionament correcte del pipeline cal que s' hagin creat prèviament uns arxius que s' allotjaran al Gitlab, bé al repositori del projecte o al projecte del SIC. Aquests fitxers són usats pel Pipeline tant per a l' aprovisionament, creació del Pipeline, com perquè el Pipeline reculli el detall de la configuració de l' API a desplegar. Els fitxers són:

* **ACA (Arxiu generat pel desenvolupador).** Es tracta d' un arxiu de configuració d' aplicacions imprescindible per a qualsevol projecte que s' ha d' allotjar en el repositori del projecte. Per tal de configurar la integració al SIC, tots els projectes hauran de disposar de la carpeta `/sic` al primer nivell de carpeta i, dins d’aquesta carpeta, caldrà crear l’arxiu de configuració `aca.yml` que proporcionarà la configuració necessària.
* **ACS (Arxiu generat per SIC).** L' ACS és l' arxiu de configuració generat i proporcionat per part de l' equip de SIC, el qual conté la configuració interna per al funcionament del pipeline i altres configuracions necessàries.
* **ACD (Arxiu generat per SIC).** L'ACD és l'arxiu de configuració de departament, el contingut del qual detalla la informació sobre l'àrea tècnica del servei del CTTI, Datacenter a usar on es desplegarà l'API, l'identificador del proveïdor/projecte i el codi del departament o àrea tècnica del CTTI. L' equip de SIC és el responsable de proporcionar i mantenir aquest arxiu. 
* **ACI (Arxiu generat per SIC).** L'ACI és l 'arxiu de configuració d'infraestructures (pot tenir-ne més d'un per aplicació-projecte), el nom del qual (sense incloure l'extensió) serà l'identificador facilitat al proveïdor d'aplicacions. Serà la responsabilitat del proveïdor d' infraestructures mantenir actualitzada aquesta informació i de notificar al proveïdor d' aplicacions quan s' hagi realitzat algun canvi sobre el fitxer.

### Pujada de carpetes i fitxers al repositori

Una vegada finalitzades les fases de disseny tant de les APIs com dels productes, on s' han configurat els fitxers YAML corresponents a cadascun d' ells, s' hauran de pujar aquests fitxers al repositori assignat al projecte, per posteriorment procedir amb el desplegament entre entorns.
L'estructura de carpetes d'un projecte de l'API Manager al Gitlab corporatiu és la següent: 

![Estructura de carpetes](/related/apim/Estructura_carpetes.png)

### Desplegament al pipeline

Un cop tinguem preparat el repositori amb els fitxers necessaris al Gitlab, es podrà procedir a desplegar.

El SIC s'encarrega de la publicació i el desplegament automatitzat de les APIs,
atorgant la màxima agilitat i autonomia als equips de desenvolupament. En aquest sentit, es proporciona un conjunt de
pipelines que permeten gestionar el seu cicle de vida d’una forma estandarditzada:

- **PUBLISH**: publicació d’una nova versió d’un producte i APIs associades. El sistema permet redesplegar versions als
catàlegs preproductius sempre que no hagin arribat a producció.
- **INFO**: obtenció d’informació del producte dins d’un catàleg (versions, subscripcions i altres). Caldrà seleccionar
el catàleg del qual es desitja informació.
- Operatives:
    * **DELETE**: eliminació del producte. Caldrà seleccionar el catàleg sobre el qual es desitja esborrar i indicar la
    versió del producte (*CURRENT_PRODUCT_VERSION*). Per exemple: `1.1.0`.
    * **DEPRECATE**: deprecació d’una versió del producte sense deixar cap versió vigent. Caldrà seleccionar el catàleg
    sobre el qual es desitja deprecar i indicar la versió del producte (*CURRENT_PRODUCT_VERSION*). Per exemple: `1.1.0`.
    * **REPLACE**: retirada d’una de les versions vigents del producte i migració de subscripcions. Caldrà seleccionar
    el catàleg sobre el qual es desitja reemplaçar, indicar la versió actual del producte (*CURRENT_PRODUCT_VERSION*) i
    la nova versió del producte (*NEW_PRODUCT_VERSION*). Per exemple: `1.1.0`.
    * **RETIRE**: retirada d’una versió del producte sense deixar cap versió vigent (les subscripcions es perden). Caldrà
    seleccionar el catàleg sobre el qual es desitja retirar i indicar la versió del producte (*CURRENT_PRODUCT_VERSION*).
    Per exemple: `1.1.0`.
    * **SUPERSEDE**: deprecació d’una de les versions vigents del producte i marcat de subscripcions “migrated”. Caldrà
    seleccionar el catàleg sobre el qual es desitja fer el supersede, indicar la versió actual del producte
    (*CURRENT_PRODUCT_VERSION*) i la nova versió del producte (*NEW_PRODUCT_VERSION*). Per exemple: `1.1.0`.

Cal tenir present que:

- Durant el desplegament es requeriran **accions d’usuari** destinades a autoritzar l’evolució de les etapes de desplegament. Per exemple: ![Missatge d'alerta (Check de plans i seguretat)](/related/apim/Check_alerta.png)
- Les pipelines **notificaran** dels resultats a les adreces de correu assignades.

Podeu consultar el document complet de la guia de desplegament, que conté tota la informació esmentada prèviament amb molt més detall: [**Guia de desplegament**](/related/apim/Guía_de_desplegament_v2.pdf).

Alhora, a la següent URL de la documentació del SIC, es pot trobar informació complementària a l'esmentada tant en aquesta pàgina com a la guia de desplegament: [**Com preparar productes i APIs per al desplegament a l'API Manager**](/plataformes/sic/guies/sic30-guies/preparar-apim)

## Desplegament de APIs amb SIC+

### Consideracions prèvies dins del CTTI

L'organització de catàlegs, espais i productes és la següent:

- Hi ha **quatre catàlegs segons el tipus d’entorn i el tipus de visibilitat**: `privat-pre`, `public-pre`, `privat` i `public`.
- **Cada codi de diàleg disposarà d'un espai propi** amb la nomenclatura "CD" + <codi_diàleg> (agrupació de productes). Per exemple: "CD0192".
- Un producte és una agrupació d’APIs i plans que les acompanyen (unitat mínima a versionar, desplegar i subscriure).

Un cop fet el desenvolupament amb [API Designer](https://www.ibm.com/docs/en/api-connect/10_reserved_instance?topic=toolkit-working-offline-in-api-designer),
caldrà exportar els YAMLs de definició del producte i els seus APIs per dipositar-los en el repositori adequat de GitHub:

* Cada producte es correspondrà amb un **repositori de GitHub**, la nomenclatura de la qual és **<CODI_DIÀLEG>.<COMP>-<ACRÒNIM_APP>-<COMPONENT_TÈCNIC>-<TIPUS_COMP>**. Més informació a https://canigo.ctti.gencat.cat/plataformes/ghec/gh-model-govern/.

* Es farà ús de la metodologia **Gitflow** per a la gestió de branques, havent de pujar-se el codi desenvolupat primer a una branca feature. Més informació aquí: https://canigo.ctti.gencat.cat/plataformes/ghec/modelTreball/model-gitflow-gitops/.

<p align="center">
  <img src="/related/apim/Gitflow.png" width="500" height="400"/>
</p>

* El model de treball serà amb **Pull Request a GitHub**, metodologia en la integració de branques en la qual intervenen dos actors: el **desenvolupador** i el **responsable tècnic/Release Manager**. Tota la informació sobre el model de treball es pot trobar en el següent enllaç: https://canigo.ctti.gencat.cat/plataformes/ghec/modelTreball/. 

* Dins d’aquest model de desenvolupament, **el versionat i tags d’artefactes estarà bloquejat al desenvolupador**, de tal manera que seran els **workflows automàtics de CI** els que s’encarreguin d’aquesta tasca. Tota la documentació relacionada es pot consultar en el següent link: https://canigo.ctti.gencat.cat/plataformes/ghec/modelTreball/gh-definicio-versionat/.

### Configuració

Abans de començar a pujar el codi al repositori i executar els workflows que realitzaran els desplegaments, s' ha d' haver configurat tot el necessari a GitHub en base al nou **model GHEC**. Tota la informació es pot trobar al següent enllaç, https://canigo.ctti.gencat.cat/plataformes/ghec/gh-adopcio-model-ghec/, però aquí es deixa un resum:

El procés d’integració actualment és el següent:
![GHEC](/related/apim/GHEC.png)

### Pujada de carpetes i fitxers al repositori

Una vegada finalitzades les fases de disseny tant de les APIs com dels productes, on s' han configurat els fitxers YAML corresponents a cadascun d' ells, s' hauran de pujar aquests fitxers al repositori assignat al projecte, per posteriorment procedir amb el desplegament entre entorns. Els fitxers del producte i els seus corresponents APIs han de trobar-se en la mateixa ruta, la ruta principal del repositori.

### Desplegament utilitzant workflows

Per a cadascun dels repositoris creats, es creen un conjunt de workflows que seran els que executin les tasques de **CI/CD (són els anàlegs a les pipelins de Jenkins de SIC 3.0)**.
L’accés a aquests workflows es realitzarà a través de l’opció **Actions** de cada repositori a GHEC.
<p align="center">
  <img src="/related/apim/Workflows.png" width="650" height="350"/>
</p>

L’execució dels workflows dependran de la seva tipologia i del model definit, essent:
* **Workflows de CI.** Executats automàticament en la sol·licitud d’un **Pull Request** o en l’execució d’un **Merge** de dita Pull Request. S’ha diferenciat en el workflow entre **canvis en temps de Pull Request (PR)**, que equivaldria al procés pel qual un usuari crea la PR, i encara no és validada per un moderador o usuari del repositori, i **canvis en temps de Commit**, que equivaldria al procés després d’haver-se acceptat la PR, i integrar ambdues branques involucrades.
    * **APIM CI on PR.** Aquest workflow, depenent d’aquestes branques que es vulguin “mergear”, executarà diferents steps amb diferents jobs. Si es crea una PR d’una branca feature a la branca **develop**, en temps d’execució es llançarà el workflow de CI que executarà els steps de validació de codi mitjançant el **comandament validate de l’eina apic** i aquest resultat es comenta en la PR. En canvi, si la PR es fes entre les branques **develop-release**, **release-master**, **hotfix-master**, s’ometrien aquests steps i es realitzaria un **fast-forward**.
    * **APIM CI on Commit.** Si estem en temps de commit, i partint de la base que el paquet no ha de ser mutable entre els diferents entorns, es comprova el tag generat en temps de PR, es publica l’artefacte a **Github Artifacts** i es torna a fer el tag del repositori.
* **Workflows de CD.** Executats sota demanda a través de la interfície web de GHEC.
    * **APIM CD PUBLISH.** El workflow farà la publicació d’una nova versió d’un producte i APIs associades. El sistema permet redesplegar versions als catàlegs preproductius sempre que no hagin arribat a producció. 
	
	<p align="center">
	  <img src="/related/apim/Workflow_publish.png" width="400" height="500"/>
	</p>
	
    * **APIM CD OPERATIVA.** El workflow realitzarà una de les següents operatives: **INFO**, **DELETE**, **DEPRECATE**, **RETIRE**, **REPLACE**, **SUPERSEDE**. 
	
	<p align="center">
	  <img src="/related/apim/Workflow_operativa.png" width="400" height="500"/>
	</p>
	
Podeu consultar el document complet de la guia de desplegament, que conté tota la informació esmentada prèviament amb molt més detall: [**Guia de desplegament**](/related/apim/Guía_de_desplegament_v2.pdf).

Per a més informació sobre el flux e2e i un exemple complet, accedir a https://canigo.ctti.gencat.cat/plataformes/ghec/workflows/exemples/gh-exemple-e2e-apimanager/.