
+++
date         = "2024-04-09"
title        = "Gitflow i GitOps"
description  = "Model de treball Gitflow i GitOps"
weight      = "1"
sections    = ["GHEC"]
aliases = [
    "/drafts/ghec/model-gitflow-gitops",
    "/ghec/model-gitflow-gitops",
    "/plataformes/ghec/model-gitflow-gitops"
]
+++

## Objectiu 🚀

El present document descriu el resultat de l'anàlisi i definició realitzat per modelar el Gitflow i el GitOps implantat al GitHub Enterprise Cloud (GHEC) del CTTI.

## Al detall  📋

Es proposen tres models de Gitflow molt estandarditzats a DevOps en l'actualitat, un de bàsic, composat per tres tipus diferents de branques en git l'avantatge del qual resideix en la rapidesa, un segon model més complet amb cinc diferents branques sent el més recomanat i estès a DevOps, i un últim model una mica més complex que estén el segon model amb una petita modificació en la qual coexisteixen diferents branques "release" (5 o més branques).

---

## MODEL GITFLOW

### Estratègia **simplificada** de branques i merges

Aquest diagrama explica l'estratègia simplificada de control de versions (basada en Gitflow):

![Model Gitflow simplificat](/images/GHEC/gitflow-simplified-model.png)

- **main** --> conté tot el codi que ha estat desplegat a producció - recull totes les versions "disponibles en live" i mai es treballa directament sobre elles.
- **develop** --> és on es duu a terme la major part del treball, mai es treballa directament, sinó que es fusionen els canvis de les branques corresponent a features.
- **feature** --> tenen una durada curta, per permetre als desenvolupadors treballar en una característica específica de forma aïllada de la branca de desenvolupament, on poden fer commits directes i push - es fusionen amb la branca de desenvolupament.

Amb aquest model proposat, les úniques branques en què es treballa directament són les de feature i hotfix (equivalent a feature però amb propòsit de resoldre incidents, no incorporar nova funcionalitat); la resta de branques evolucionen a través de fusions.

Es recomanen les merge request en lloc de les fusions directes per a desenvolupaments complexos, ja que fomenten les revisions al llarg del procés.

Per a aquest model, la nomenclatura que es farà servir per als noms dels artefactes serà la següent:

- Per a la branca **develop** --> major.minor.fix-SNAPSHOT

        Exemple: 1.2.0-SNAPSHOT

- Per a la branca **master** --> major.minor.fix

        Exemple: 1.2.0

### Estratègia **recomanada** de branques i merges

Aquest diagrama explica l'estratègia de control de versions recomanada (basada en Gitflow):

![Model Gitflow recomanat](/images/GHEC/gitflow-recommended-model.png)

- **main** -->  conté tot el codi que ha estat desplegat a producció - recull totes les versions "disponibles en live" i mai es treballa directament sobre elles.
- **release** --> es fusiona des de develop, quan el codi està llest per a ser posat en producció - normalment es crea una versió candidata (RC) en aquest punt.
  - Es desaconsella treballar directament en la branca release, ja que els errors detectats durant la validació dels canvis requeriran correccions en la branca feature corresponent i es fusionaran de nou a través de desenvolupament per evitar la pèrdua de canvis posteriors.
  - Un cop la versió està llesta, es fusiona amb la branca master i s'etiqueta amb el nom de la versió.
- **develop** --> és on es duu a terme la major part de l'activitat, tot i que no es treballa directament, sinó que es fusionen els canvis de les branques feature
- **feature** --> tenen una durada curta, per permetre als desenvolupadors treballar en una característica específica de forma aïllada de la branca de desenvolupament, on poden fer commits directes i push - es fusionen amb la branca de desenvolupament.
- **hotfix** --> es crea a partir de master quan s'identifica en producció un error que requereix una correcció urgent. La branca hotfix té un cicle de publicació "accelerat" i s'ha de fusionar amb la branca de desenvolupament per no perdre cap canvi.

Amb aquest model proposat, les úniques branques en què es treballa directament són les de feature i hotfix; la resta de branques evolucionen a través de fusions.

Es recomanen les merge request en lloc de les fusions directes per a desenvolupaments complexos, ja que fomenten les revisions al llarg del procés.

La "regla d'or" per a les fusions descendents és que cada canvi introduït en producció es fusioni també en desenvolupament.

Per a aquest model, la nomenclatura que es farà servir per als noms dels artefactes serà la següent:

- Per a la branca **master** --> major.minor.fix

        Exemple: 1.2.0

- Per a la branca **hotfix/x.x.x** --> major.minor.fix

        Exemple: 1.2.1

- Per a la branca **release/1.x** --> major.minor.fix-RCX

        Exemple: 1.2.0-RC3

- Per a la branca **develop** --> major.minor.fix-SNAPSHOT

        Exemple: 1.2.0-SNAPSHOT

### Estratègia **estesa** de branques i merges

Aquest diagrama explica l'estratègia de control de versions estesa (basada en Git Flow):

![Model Gitflow extés](/images/GHEC/gitflow-extended-model.png)

- **main** -->  conté tot el codi que ha estat desplegat a producció - recull totes les versions "disponibles en live" i mai es treballa directament sobre elles.
- **release** --> es fusiona des de develop, quan el codi està llest per a ser desplegat en producció - normalment es crea una versió candidata (RC) en aquest punt.
  - Es desaconsella treballar directament en la branca release, ja que els errors detectats durant la validació dels canvis requeriran correccions en la branca feature corresponent i es fusionaran de nou a través de desenvolupament per evitar la pèrdua de canvis posteriors.
  - Un cop la versió està llesta, es fusiona amb la branca master i s'etiqueta amb el nom de la versió.
- **develop** --> és on es duu a terme la major part de l'activitat, tot i que no es treballa directament, sinó que es fusionen els canvis de les branques feature.
- **feature** --> tenen una durada curta, per permetre als desenvolupadors treballar en una característica específica de forma aïllada de la branca de desenvolupament, on poden fer commits directes i push - es fusionen amb la branca de desenvolupament.
- **hotfix** --> es crea a partir de màster quan s'identifica en producció un error que requereix una correcció urgent. La branca hotfix té un cicle de publicació "accelerat" i s'ha de fusionar amb la branca de desenvolupament per no perdre cap canvi.


La principal diferència amb el model **recomanat** és la presència de branques rellegides de mitjana o llarga durada.

Les branques de rellegiment són necessàries quan l'equip està treballant en un d'aquests escenaris:
* L'equip ha de proporcionar suport tècnic a diverses versions anteriors durant algun temps (per exemple, períodes de garantia) És a dir, l'equip conserva l'estat de la rellegida en una branca independent, per la qual cosa pot proporcionar correccions d'errors a aquesta versió anterior. 
* L'equip està treballant en diversos relleasos simultàniament. Si bé generalment això **no es recomana**, hi ha casos de grans projectes de transformació que poden requerir mantenir dues línies de desenvolupament alhora.

- Per a la branca **master** --> major.minor.fix

        Exemple: 1.2.0

- Per a la branca **hotfix/x.x.x** --> major.minor.fix

        Exemple: 1.2.1

- Per a la branca **release/1.x** --> major.minor.fix-RCX

        Exemple: 1.2.0-RC3

- Per a la branca **develop** --> maor.minor.fix-SNAPSHOT

        Exemple: 1.2.0-SNAPSHOT



---
Addicionalment, dins la política de versions implantada, el nom del lliurable i la seva version s' obté automàticament dels fitxers de configuració del projecte.  Aquest dependrà del tipus de tecnologia.

* **JAVA (Maven)**:
   * Fitxer : pom.xml
   * Nom Lliurable : Tag artifactid
   * Versió Lliurable : Tag version
    
* **JAVA (Gradle)**        
   * Fitxer / Nom Lliurable : settings.gradle / Camp -  rootProject.name 
   * Fitxer / Versió Lliurable :  build.gradle / Camp -  version
    
* **NODE**
   * Fitxer : package.json
   * Nom Lliurable :  name
   * Versió Lliurable : version

* **.NET**.  En aquest cas hi ha dues casuistiques :        
       
   * Nom Lliurable :
        1. Si sólo hay un unico proyecto, sólo hay un .csproj y se obtendra del campo **name** de dicho fichero.
        2. Si tenemos en el repo más de un proyecto,  hay distintos .csproj, se obtiene de la variable **Project_Name** cuyo valor se introduce en el setup del proyecto.

   * Versió Lliurable : 
        1. Si sólo hay un unico proyecto, sólo hay un .csproj y se obtendra del campo **versión** de dicho fichero 
        2. Si tenemos en el repo más de un proyecto,  hay distintos .csproj, luego debería haber un fichero centralizado de versiones llamado **Directory.Build.props** y de aquí se obtendra del campo **VERSION**.
   

## MODEL GITOPS


GitOps és una metodologia i conjunt de pràctiques per a la gestió i automatització d'infraestructura i aplicacions basades en la integració directa amb sistemes de control de versions, específicament utilitzant Git. El terme "GitOps" prové de la combinació de les paraules "Git" i "Operations". És un patró de flux de treball molt potent que permet gestionar la infraestructura moderna al núvol. Tot i que se centra principalment en la gestió de clústers de Kubernetes, la comunitat de DevOps aplica i publica solucions de GitOps en altres sistemes diferents de Kubernetes.

Alguns conceptes clau associats amb GitOps inclouen:

1. Infraestructura com a Codi (IaC):
    
- GitOps promou l'ús de la infraestructura com a codi, on la infraestructura i les configuracions es defineixen i gestionen utilitzant descripcions de codi emmagatzemades en repositoris de Git.

2. Repositoris de Git:

- Totes les configuracions, definicions d'infraestructura i codi d'aplicació estan emmagatzemats en repositoris de Git. Això inclou tant la infraestructura del sistema com les aplicacions que s'executen sobre aquesta infraestructura.

3. Declarativitat:

- GitOps segueix un enfocament declaratiu, on l'estat desitjat del sistema es descriu en arxius de configuració emmagatzemats a Git. Els canvis en el sistema s'aconsegueixen fent canvis en aquests arxius i aplicant aquests canvis a través de processos automatitzats.

4. Automatització Contínua:

- GitOps impulsa l'automatització contínua, on els canvis en els repositoris de Git desencadenen automàticament processos d'implementació i actualització en els diferents entorns.

5. Flux de Treball de GitOps:

- El flux de treball típic de GitOps implica canvis en els repositoris de Git, seguits d'una revisió i aprovació (si és necessari), i finalment, l'aplicació automàtica d'aquests canvis en l'entorn de producció.

Per al projecte en curs s'ha decidit separar o desacoblar en diferents workflows o processos la Integració Contínua (CI) i el procés de Desplegament Continu (CD). Això permetrà crear nombrosos artefactes, que posteriorment podran ser desplegats a voluntat en els entorns que es desitgi, ja siguin efímers de testing o productius.

![Model GitOps](/images/GHEC/gitops-model.png)

GitOps és particularment útil en entorns d'infraestructura i aplicacions distribuïdes, ja que proporciona una forma eficaç de gestionar la complexitat i l'escala mitjançant l'aplicació de pràctiques de desenvolupament de programari a l'operació d'infraestructura.

