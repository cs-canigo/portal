+++
date = "2020-02-28"
title = "Autoservei de pipelines"
description = "L'Autoservei de pipelines permet als proveïdors d'aplicacions ser autònoms per a integrar al SIC les aplicacions"
sections = "SIC"
toc = true
aliases = [
    "/noticies/2018-05-16-SIC-Autoservei-pipelines/"
]
taxonomies = []
weight = 5
+++


## Introducció

L'Autoservei de pipelines permet als usuaris del SIC la **generació al vol de pipelines d'automatització de la construcció i del desplegament de l'aplicació** sense
la intervenció de l'equip del SIC. D'aquesta manera, els equips de cada codi d'aplicació són independents per preparar la construcció de la pipeline corresponent per a cada projecte de GitLab.

Aquest autoservei de pipelines es basa en la generació de tasques Jenkins a partir d'arxius de configuració que els equips que en són responsables informen i publiquen al Git.
La pipeline de generació identifica si ha hagut canvis en aquests arxius en fer un push i s'encarrega de generar una nova versió de la pipeline de desplegament. Finalment, si s'han produït
altres canvis al codi font de l'aplicació, també s'encarrega d'executar la pipeline generada.

Amb l'autoservei de pipelines es poden definir tants entorns i infraestructures com siguin necessari/es per a la construcció i el desplegament d'una aplicació.

A continuació, entrarem en més detall sobre com funciona aquest nou servei que ofereix el SIC.

## Motivació

Els objectius que vol assolir aquesta nova funcionalitat són:

* La línia estratègica de DevOps que està marcant CTTI requereix **flexibilitat i independència** en els principals actors que intervenen en la construcció i els desplegaments de les aplicacions.
* A tal efecte, una necessitat clau és anular la dependència existent cap a l'equip del SIC, que fins ara implementava els automatismes de construcció i desplegament. Amb aquest nou model **els usuaris del SIC són autosuficients per generar-se ells mateixos les seves pròpies pipelines**.
* Com a conseqüència del punt anterior, **no cal ajustar-se al calendari de l'equip SIC per obtenir les pipelines de construcció i desplegament**. Els propis usuaris poden implementar-les en el moment que els hi sigui més adient.
* **Augmenta l'eficiència en les integracions d'aplicacions al SIC**, ja que s'eliminen del procés traspassos innecessaris d'informació i de responsabilitats a l'equip SIC.
* De retruc, el fet d'afegir un sistema de configuració amb arxius YML independents de la plataforma d'Integració Contínua Jenkins **proporciona al SIC un nivell d'abstracció addicional amb el que es podria disposar d'altres eines d'automatització sense afectar als usuaris**.

## Funcionament

Generalment, a cada codi d'aplicació li correspon un proveïdor d'aplicacions i un proveïdor d'infraestructures. Aquests dos equips **han de participar i col·laborar** per tal d'utilitzar l'autoservei de jobs pipeline del SIC aportant la informació necessària de la que cadascun és responsable.

![Pipeline del SIC](/images/news/AutoserveiJobs-Funcionament.png)

El funcionament previst és el següent:

1. Els **proveïdors d'aplicacions i els proveïdors d'infraestructures aportaran cadascun d'ells el seu propi arxiu de configuració**.
2. Si es fa algun canvi en la configuració de l'autoservei corresponent a l'aplicació s'invocarà a la pipeline generadora de pipelines. Aquesta pipeline recupera els arxius de configuració necessaris per a la **generació de la pipeline** de l'aplicació i la dispara.
3. En posteriors execucions, sempre que no es canviï l'arxiu de configuració, **no es tornarà a regenerar** i s'invocarà directament la darrera pipeline generada.

D'aquesta manera, mitjançant els arxius de configuració proporcionats per cada proveïdor, s'invoca a una **pipeline generadora de pipelines** que construeix la pipeline encarregada de la construcció i del desplegament de l'aplicació.
Finalment, un cop generada la nova pipeline, aquesta serà invocada per realitzar la construcció i el desplegament automatitzats definits als arxius de configuració.

## Configuració

Caldrà realitzar les tasques prèvies de configuració per a que el sistema sigui capaç de generar una tasca de desplegament operativa.

<br/>
### Arxiu de Configuració de l'Aplicació (ACA)

La informació que aporta el proveïdor d'aplicacions quedarà recollida en l'arxiu `/sic/aca.yml` dins del repositori del projecte. La seva existència és la que determina si l'aplicació té actiu el mode Autoservei de Pipelines. Es tracta d'un arxiu de text en format YAML, que serà responsabilitat del proveïdor d'aplicacions de mantenir-lo actualitzat, en el que s'ha d'aportar la següent configuració:

* **Versió**: versió (independent de la versió de l'aplicació) que s'utilitza per fer seguiment de l'arxiu de configuració.
* **Paràmetres**: parells clau-valor en els que es farà substitució dins de la pipeline.
* **Recursos**: diferents tipus de recursos als que es fa referència en la pipeline.
    - **Entorns**: entorns als que es desplega l'aplicació, així com el seu ordre i la modalitat de desplegament desitjada.
    - **Infraestructures**: denominació d'infraestructures destí (cal demanar al proveïdor d'infraestructures la denominació de la infraestructura).
    - **Artefactes**: artefactes a generar durant el procés de construcció que s'han de desplegar en el procés de desplegament.
* **Procés de construcció**: definició del procés de construcció amb l'ús de passes (*steps*) de construcció.
* **Procés de desplegament**: definició del procés de desplegament amb l'ús de passes (*steps*) de desplegament.
* **Notificacions**: definició d'adreces de correu electrònic on notificar accions manuals en espera i resultats de l'execució.

Es proporciona una [Guia de construcció del fitxer ACA](/howtos/2018-05-SIC-Autoservei-jobs-pipeline-ACA) amb un exemple de cas d'ús.

<br/>
### Arxiu de Configuració d'Infraestructures (ACI)

D'altra banda, la informació que aporta el proveïdor d'infraestructures queda recollida en el seu repositori del SIC. En aquest repositori hi dipositarà els arxius de configuració d'infraestructures (en pot tenir més d'un per aplicació o projecte), el nom dels quals -sense l'extensió- és l'identificador que ha de facilitar al proveïdor d'aplicacions.

Serà responsabilitat del proveïdor d'infraestructures tenir actualitzada aquesta informació i de notificar al proveïdor d'aplicacions quan hagi realitzat algun canvi. El proveïdor d'aplicacions haurà de fer com a mínim un increment de versió a l'ACA per tal de provocar la regeneració de la pipeline incorporant els canvis realitzats pel proveïdor d'infraestructures a la nova pipeline generada.

El proveïdor d'infraestructures haurà d'informar als seus arxius de configuració:

* **Versió**: versió de l'arxiu de configuració.
* **Recursos**: secció que recull tots els recursos de la part d'infraestructures. Actualment, només hi ha el detall de cada infraestructura.
* **Infraestructures**: detall de les infraestructures incloses en aquest arxiu de configuració.

S'han d'incloure tots els entorns de les capes/stacks definides en l'arxiu pertinent.

</br>
#### Clau pública

La infraestructura de clau pública (PKI en anglès) permet establir un sistema de xifrat en el que es permet l'execució amb garanties operacionals criptogràfiques, tals com el xifrat, la firma digital i el no repudi de transaccions electròniques.

El SIC aprofita els avantatges d'aquest sistema oferint aquesta clau pública als seus usuaris per tal que aquests puguin fer-ne ús en els procediments operatius que la requereixin. Es tracta d’un arxiu `.pem` amb la clau pública del SIC. Aquesta clau consisteix en una RSA de 4096 bits.

En el casos en els que el proveïdor d'infraestructures necessita introduir paraules de pas als descriptors ACI, per encriptar-les pot utilitzar la següent comanda:

    ```
    $ echo '<password_a_encriptar>' | openssl rsautl -encrypt -pubin -inkey sic_id_rsa.pub.pem | base64
	K0zcD3BuLKN55XVjqpovmwbJDEVehnEN7pz06ytPMlBowuc2IATSyH/c/zN5EmLE5DFoJcRLFA9B
	Nmf0rh0yzUDb3kS+jXUuFhx+N35N2ScbemiZL3sjji3icXqgWmiQTmfp1hCAZgq5oMfMJzpwjWlq
	ubT15lXq/6jgkj0hS9pYUpZBz0rH6IX0q81xRvsnQteMyrtQik/p/2ZaTbj0ciiLG61kkVcGSZLo
	sr9iOVdFh3q8Ok7+CAPhKaa/maGn0LEeaafj+5pBLE9AWcOy98imBRUzr4C8bi9ydMjuRdvd12XT
	1JdcHer/G1ZWBx9yEIYQEGgG/eFR4njNBjtjH/A53YBcbLIH2ZzHI3v33PCE5W3aVoK5qVqdVf64
	GlicdVQ2VSm7ROE4bfcUu4BzVw1em6hUw6LSXxH6GrKVxFe0JVWbrIlOyDL1nGu3Yu6zdplayK+q
	anqNjSRixyLOjoKon2g80dHGd12S7j1av3oyhPz/1KlqMt71YgTrZG3GxeW7NB356V/18bY/PwCn
	UcNttMs3oOvt+6d4UgeqqesA1fgDx92X+zIoyOTh2rnkfWo554cwqg+w3JaB5Kp30vGJNXwrvR+W
	+x4v2PLCO1D2b59Bb3n9/rFENXHE8wYLPAecPoSNjB6dB2/JdZibUwDJz+T98nOlcgJ7FcBBQ4s=
	$
    ```

<a href="/related/sic/key/sic_id_rsa.pub.pem" download target="_blank" style="display: block; margin: 25px auto; border-radius: 5px; width: 200px; padding: 10px; color: white !important; text-decoration: none !important;background-color: #CC0000;text-align: center;font-weight:bold;">
Descarregar la clau
</a>

## Tecnologies compatibles

Hi ha les següents tecnologies de construcció suportades:

* Maven (Java)
* Ant (Java)
* MS Build (.NET)
* Npm (NodeJS)
* Hugo (Webs estàtiques)

Finalment, també s'integren els desplegaments a:

- Servidor web Apache
- Servidors d'aplicacions
    - Tomcat (Java)
    - Weblogic (Java)
    - Websphere (Java)
    - JBoss (Java)
    - IIS (.NET)
- Servidors de Bases de Dades
  - MySQL
  - MongoDB
  - PostgreSQL
  - Oracle
  - SQL Server

Per a més detall del que es pot fer amb l'Autoservei de pipelines, us recomanem que consulteu l'apartat 7 del [manual d'usuari.](/related/sic/manual-usuari.pdf).

<br/><br/><br/>
Si voleu més informació podeu consultar la secció de [**HOWTOs i manuals**](/sic/manuals/). <br/>
Si teniu qualsevol dubte o problema assegureu-vos de no trobar resposta a les [**FAQ**] (/sic/faq) i utilitzeu el canal de [Suport] (/sic/suport) o contacteu amb l'Oficina Tècnica Canigó CTTI a través del correu electrònic: **oficina-tecnica.canigo.ctti@gencat.cat**.