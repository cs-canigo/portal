+++
date        = "2018-05-16"
title       = "Autoservei de jobs pipeline"
description = "Funcionament de l'Autoservei de jobs pipeline"
aliases = [
    "/noticies/2018-05-16-SIC-Autoservei-pipelines/"
]
sections    = "SIC"
taxonomies  = []
weight 		= 9
+++

## Introducció

L'Autoservei de jobs pipeline permet als usuaris del SIC la generació al vol de pipelines d'automatització de la construcció i del desplegament de l'aplicació sense la intervenció de l'equip del SIC. D'aquesta manera, els equips de cada codi d'aplicació són independents per muntar el job corresponent a cada projecte de GitLab.

Aquest autoservei de pipelines es basa en la generació de jobs a partir d'arxius de configuració que els equips que en són responsables informen i publiquen al Git. La pipeline de generació identifica si hi ha hagut canvis en aquests arxius al fer un push i s'encarrega de generar una nova versió de la pipeline de CI. Finalment, l'executa.

A continuació, entrarem en més detall com funciona aquest nou servei que ofereix el SIC.

## Motivació

Els objectius que vol assolir aquesta nova funcionalitat són:

* La línia estratègica de DevOps que està marcant CTTI requereix **flexibilitat i independència** en els pricipals actors que intervenen en la construcció i els desplegaments de les aplicacions.
* A tal efecte, una necessitat clau és anular la dependència existent cap a l'equip del SIC, que fins ara implementava els automatismes de construcció i desplegament. Amb aquest nou model **els usuaris del SIC són autosuficients per generar-se ells mateixos les seves pròpies pipelines**.
* Com a conseqüència del punt anterior, **no cal ajustar-se al calendari de l'equip SIC per obtenir les pipelines de construcció i desplegament**. Els propis usuaris poden implementar-les en el moment que els hi sigui més adient.
* **Augmenta l'eficiència en les integracions d'aplicacions al SIC**, ja que s'eliminen del procés traspassos innecessaris d'informació i de responsabilitats a l'equip SIC.
* De retruc, el fet d'afegir un sistema de configuració amb arxius YML independents de la plataforma d'Integració Contínua Jenkins **proporciona al SIC un nivell d'abstracció addicional amb el que es podria disposar d'altres eines d'automatització sense afectar als usuaris**.

## Funcionament

Generalment, a cada codi d'aplicació li correspon un proveïdor d'aplicacions i un proveïdor d'infraestructures. Aquests dos equips **han de participar i col·laborar** per tal d'utilitzar l'autoservei de jobs pipeline del SIC aportant la informació necessària de la que cadascun és responsable.

A continuació es mostra un esquema del funcionament:

![Pipeline del SIC](/images/news/AutoserveiJobs-Funcionament.png)

El funcionament és el següent:

1. Els proveïdors d'aplicacions i els proveïdors d'infraestructures aportaran cadascun d'ells el seu propi arxiu de configuració.
2. Si es fa algun canvi en la configuració de l'autoservei corresponent a l'aplicació s'invocarà a la pipeline generadora de jobs. Aquesta pipeline recupera els arxius de configuració necessaris per a la generació de la pipeline de l'aplicació i l'invoca.
3. En posteriors execucions, sempre que no es canviï l'arxiu de configuració, no es tornarà a regenerar i s'invocarà directament la darrera pipeline generada.

### Arxiu de Configuració de l'Aplicació (ACA)

La informació que aporta el proveïdor d'aplicacions quedarà recollida en l'arxiu `/sic/aca.yml` dins del repositori del projecte. La seva existència és la que determina si l'aplicació té actiu el mode Autoservei de Pipelines. Es tracta d'un arxiu de texte en format YAML que serà responsabilitat del proveïdor d'aplicacions de mantenir-lo actualitzat en el que s'ha d'aportar la següent configuració:

1. **La versió de l’ACA**: Versió (independent de la versió de l'aplicació) que s'utilitza per fer seguiment de l'arxiu de configuració.
2. **Paràmetres de l’ACA**: Parells clau-valor en els que es farà substitució dins de la pipeline.
3. **Recursos de l’ACA**: Diferents tipus de recursos als que es fa referència en la pipeline.
    1. **Entorns**: Entorns als que es desplega l'aplicació.
    2. **Denominació de la infraestructura destí**: Denominació d'infraestructures destí (cal demanar al proveïdor d'infraestructures com han denominat aquesta infraestructura).
    3. **Artefactes**: Artefactes generats durant el procés de construcció que s'han de desplegar en el procés de desplegament.
4. **Procés de construcció**: Definició del procés de construcció amb l'ús de passes (*steps*) de construcció.
5. **Procés de desplegament**: Definició del procés de desplegament amb l'ús de passes (*steps*) de desplegament.

### Arxiu de Configuració d'Infraestructures (ACI)

D'altra banda, la informació que aporta el proveïdor d'infraestructures queda recollida en el seu repositori del SIC (`https://git.intranet.gencat.cat/<id_prov>/<id_prov>.git`). En aquest repositori hi dipositarà els arxius de configuració d'infraestructures (en pot tenir més d'un per aplicació o projecte), el nom dels quals -sense l'extensió- és l'identificador que ha de facilitar al proveïdor d'aplicacions.

Serà responsabilitat del proveïdor d'infraestructures tenir actualitzada aquesta informació i de notificar al proveïdor d'aplicacions quan hagi realitzat algun canvi. El proveïdor d'aplicacions haurà de fer com a mínim un increment de versió a l'ACA per tal de provocar la regeneració de la pipeline incorporant els canvis realitzats pel proveïdor d'infraestructures a la nova pipeline generada.

El proveïdor d'infraestructures haurà d'informar als seus arxius de configuració:

1. **La versió de l'ACI**: Versió de l'arxiu de configuració.
2. **Recursos de l'ACI**: Secció que recull tots els recursos de la part d'infraestrucures. Actualment, només hi ha el detall de cada infraestructura.
3. **Infraestructures**: Detall de les infraestructures incloses en aquest arxiu de configuració.

S'han d'incloure tots els entorns de les capes/stacks definides en l'arxiu pertinent.

### Generació i invocació de la pipeline

D'aquesta manera, mitjançant els arxius de configuració proporcionats per cada proveïdor, s'invoca a una pipeline generadora de pipelines que construeix la pipeline encarregada de la construcció i del desplegament de l'aplicació.

Finalment, un cop generada la nova pipeline, aquesta és invocada per realitzar la construcció i el desplegament automatitzats definits als arxius de configuració.

En el comunicat del mes de Juny s'ha publicat també el següent [How-To](/howtos/2018-05-SIC-Autoservei-jobs-pipeline-ACA) amb un exemple d'ús de l'Autoservei de Jobs Pipeline al SIC en el que es genera un ACA. En posteriors howtos es mostrarà com generar un ACI.

També teniu disponible tota la informació relativa al seu funcionament al [Manual d'Usuari del SIC](/related/sic/manual-usuari.pdf).
