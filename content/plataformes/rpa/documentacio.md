+++
date        = "2022-03-25T17:11:42+01:00"
title       = "Documentació de la Plataforma Corporativa de RPA"
description = "Documentació i formularis específics"
sections    = "RPA"
taxonomies  = []
weight 		= 2
toc			= true
+++

## Presentació del servei

El següent document fa una presentació general sobre la plataforma:

[Presentació](/related/rpa/RPA_Presentacio_v1.0.pdf)

##  Gestió de la demanda

La incorporació de processos robotitzats dins la plataforma està definit pel següent procediment:

![Gestio Demanda](/related/rpa/demanda.png)

En cadascuna de les fases s'identifiquen:

- Les actuacions més habituals que es poden dur a terme durant la fase en qüestió, així com la responsabilitat sobre l'execució de les mateixes (actuacions que realitza l'àmbit propietari del procés o que realitza l'Oficina Tècnica)
- Els lliurables associats en cada fase, diferenciant aquells que obligatòriament requerirà l'Oficina Tècnica (**Sol·licitud d'automatizació, Document de desplegament, Document d'operativa del robot**) d'aquells que recomanem que siguin lliurats a l'àmbit per part de l'equip que desenvolupa el procés a robotitzar

##	Prerequisits pel desplegament de processos

El desenvolupament i posterior desplegament de processos dins la Plataforma Corporativa de RPA anirà marcat pel compliment dels següents prerequisits (segons diferents àmbits):

### Operacionals

|Prerequisit|Descripció|
|-------|-------|
|Procés desatès (Unattended)|El procés ha de poder funcionar normalment sense cap intervenció humana. Ha de ser capaç de realitzar la totalitat dels passos requerits de forma autònoma i sense supervisió des del moment en què aquest s’iniciï (manualment o de forma programada)|
|Regles fixes|El funcionament del procés (els passos que realitza) han de venir determinats per regles fixes i deterministes. Els camins i accions que pugui fer i en quins casos les haurà de fer han d’estar completament definits (no pot haver-hi decisions que impliquin processos “no deterministes”, com per exemple derivats de Machine Learning o Intel·ligència Artificial)|
|Sense Visió per Computador o Reconeixement òptic de caràcters (OCR)|En el funcionament del procés no hi ha d’haver cap part que depengui de reconeixement d’imatges o de caràcters (text) de manera visual, és a dir, que depengui del que visualment es vegi a la pantalla|
|Aplicacions estables|Les aplicacions sobre les quals funcioni el procés o de les que depengui han de ser estables. En cap cas pot funcionar sobre una aplicació en fase beta o en qualsevol altre estat preliminar|
|Sense necessitat d’execució manual|El procés no pot necessitar cap execució manual de cap cas perquè funcioni correctament, és a dir, no ha de fer falta l’execució o processat de cap cas ni de cap pas per un usuari per tal que la la resta (o una part) dels casos o passos del procés es puguin completar|
|Autonomia i robustesa d’execucions|El procés ha de ser autònom i robust entre execucions. S’ha de poder executar dues o més vegades seguides sense que generi problemes ni processi més d’un cop els mateixos ítems, encara que les cues de procés estiguin buides, li faltin Assets a Orchestrator, etc.|

### Projecte UiPath

|Prerequisit|Descripció|
|-------|-------|
|Versió|La versió de UiPath en què ha d’estar el projecte ha de ser la 2021.10.* o superior (que sigui estable)|
|Compilació i validació correcta|El projecte es pot obrir correctament amb UiPath Studio sense problemes i sense que generi cap avís. El projecte compila i es pot validar sense errors amb l’eina de validació que proporciona UiPath|
|Nom|El nom del projecte de UiPath ha de seguir la convenció estàndard de nomenclatura de projectes, que és RPA_AAA_BBB_CCC_NNN, essent “AAA”, “BBB” i “CCC” l’acrònim de l’Àrea, l’Aplicació i el nom de l’Automatisme, respectivament. NNN ha de ser el número de l’Automatisme d’aquesta Àrea, Aplicació i nom, començant per 001. Exemple: Per l’automatisme de Valoració de Béns Immobles (IMM), que és de ATC, opera sobre Gaudí (GAU) i és el primer que es desenvolupa per aquesta tasca, el nom seria “RPA_ATC_GAU_IMM_001”|
|Biblioteques i espais de noms|Les biblioteques (libraries) que faci servir el projecte són oficials i/o estan aprovades per utilitzar-se amb UiPath. A més a més, la versió que s’utilitza és estable i no obsoleta. Al projecte no hi pot haver biblioteques que no es facin servir. De manera similar, els espais de noms que faci servir el projecte en el codi han d’estar aprovats per UiPath i no poden estar inclosos al projecte si no es fan servir|
|Repositori de control de versions|L’equip desenvolupador del procés automatitzat haurà de desar el projecte dins el repositori corporatiu (GIT) del SIC. Per fer-ho, l’Oficina Tècnica donarà accés als usuaris pertinents dins el projecte associat al procés que es generarà dins el GIT i vinculat a la Plataforma Corporativa de RPA|
|Desplegament amb Anàlisi|El projecte s’ha de poder desplegar des de Studio a Orchestrator amb l’opció de “Enforce Analyzer before publish” activa, que garanteix que el projecte està validat correctament per l’eina de validació de UiPath abans de desplegar-se|

### Estructura de codi i bones pràctiques

|Prerequisit|Descripció|
|-------|-------|
|Arquitectura i ús de Performer/Dispatcher|El projecte ha d’estar programat seguint l’estructura de Productor i Consumidor (Performer/Dispatcher), que han d’estar en paquets (packages) de projecte diferents. També ha d’utilitzar la plantilla Robotic Enterprise Framework en el cas del consumidor|
|Modularitat|Totes les funcionalitats implementades en codi que s’utilitzin en més d’un punt del mateix han d’estar encapsulades en workflows (fitxers de codi .xaml) diferents. Dins dels fitxers no pot haver codi duplicat ni codi que es repeteixi en diferents fitxers del projecte|
|Bones pràctiques|El projecte ha de complir amb les bones pràctiques (o millors pràctiques) que hi ha definides en el document de Sol·licitud d’Automatizació|

### Funcionals

|Prerequisit|Descripció|
|-------|-------|
|Document d’automatització|Cal lliurar el Document de Sol·licitud d’Automatització emplenat|
|Guia de desplegament|Cal disposar de la Guia de Desplegament amb tots els passos i requisits necessaris per posar a punt el procés en l’entorn d’Orchestrator per poder executar el desplegament del procés des de l’entorn de Preproducció, a l’entorn de Producció|
|Guia Operativa|Cal disposar de la guia Operativa del procés, que detalli els components del mateix, els passos a seguir per executar-lo en l’entorn d’Orchestrator i la operativa en cas d’incidències, abans d’activar el procés en l’entorn de Producció|

##  Plantilles de documents

Les següents plantilles de documents han de ser complimentades i lliurades a l'Oficina Tècnica per cadascun dels processos desplegats:

- [Plantilla de Solicitud d'automatizació](/related/rpa/Assumpte_DT_ARPA_V1.0.docx), a lliurar durant la definició de requeriments del procés automatitzat.
- [Plantilla de Document de desplegament](/related/rpa/Assumpte_DES_RPA_v1.0.xlsx), a lliurar en la fase d'implantació, dins la petició de desplegament del procés en l'entorn de producció.
- [Plantilla de Document d'operativa de Robot](/related/rpa/Assumpte_OPER_RPA_v1.0.docx), a lliurar en la fase de control i seguiment, en el moment que el procés entra definitívament en producció.


