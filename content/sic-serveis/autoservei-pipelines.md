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

L'Autoservei de pipelines permet la **generació automàtica de pipelines d'automatització de la construcció i del desplegament de les aplicacions** sense
la intervenció de l'equip del SIC. D'aquesta manera, els equips de cada codi d'aplicació són independents per a preparar la construcció de la pipeline de desplegament
associada a cada projecte repositat al Sistema de Custodia de Codi (Gitlab).

A continuació, entrarem en més detall sobre com funciona aquest nou servei que ofereix el SIC.

## Motivació

Cobreix les següents necessitats:

* Dotar de **flexibilitat i independència** als principals actors que intervenen en la construcció i els desplegaments de les aplicacions.
* **Incrementar ràpidament el grau d’integració al SIC de les aplicacions** evitant traspassos innecessaris d'informació i responsabilitats.
* Proporcionar un **nivell d'abstracció** que permeti ser independent de les tecnologies emprades i permeti evolucionar el producte mantenint compatibilitat amb versions anteriors.
* **Acomplir les directrius** de CTTI sobre desplegaments i gestió de canvis.

La solució ha de:

* Ser **natural** per als usuaris del servei
* Permetre definir **tot el necessari** per a construir i desplegar l’aplicació
* Donar cobertura a **totes les tecnologies** amb les que el SIC és actualment compatible
* Ser **mantenible, escalable i eficient**

## Requeriments generals

S'estableixen una sèrie de requeriments per a estar en disposició d'integrar l'aplicació mitjançant aquest servei:

* Conèixer els **entorns** on es desplegarà l'aplicació i les **modalitats de desplegament** aplicables en cada cas
* L'**aplicació ha de ser integrable** amb el servei d'automatització de la construcció i desplegament
* [**Aplicació preparada i acompleix els requeriments**](/sic-welcome-pack/preparar-aplicacio/) per a poder ser desplegada
* Per als entorns amb modalitat de desplegament automàtic, disposar dels **identificadors d'infraestructures** de desplegament
* **Col·laboració**: el proveïdor d'aplicacions i el proveïdor d'infraestructures han d'estar disposats a col·laborar i mantenir una comunicació

## Funcionament

Generalment, a cada codi d'aplicació li correspon un proveïdor d'aplicacions i un proveïdor d'infraestructures.
Aquests dos equips **han de participar i col·laborar** per tal d'utilitzar l'autoservei de pipelines del SIC aportant la informació necessària de la que cadascun és responsable.

Es composa de les següents peces:

* **Arxiu de Configuració d’Aplicació (ACA)**
* **Arxiu de Configuració d’Infraestructura (ACI)**
* **Pipeline generadora**

El funcionament previst és el següent:

* Els **proveïdors d'aplicacions i els proveïdors d'infraestructures aportaran cadascun d'ells el seu propi arxiu de configuració**.
* Si es fa algun canvi en la configuració de l'autoservei corresponent a l'aplicació s'invocarà a la pipeline generadora de pipelines.
Aquesta pipeline recupera els arxius de configuració necessaris per a la **generació de la pipeline** de l'aplicació i la dispara.
* En posteriors execucions, sempre que no es canviï l'arxiu de configuració, **no es tornarà a regenerar** i s'invocarà directament la darrera pipeline generada.

D'aquesta manera, mitjançant els arxius de configuració proporcionats per cada proveïdor, s'invoca a una **pipeline generadora de pipelines** que
construeix la pipeline encarregada de la construcció i del desplegament de l'aplicació. Finalment, un cop generada la nova pipeline, aquesta serà invocada
per realitzar la construcció i el desplegament de l'aplicació.

![Pipeline del SIC](/images/news/AutoserveiJobs-Funcionament.png)
</br>

## Configuració

Caldrà realitzar les tasques prèvies de configuració per a que el sistema sigui capaç de generar una tasca de desplegament operativa.

### Arxiu de Configuració de l'Aplicació (ACA)

La informació que aporta el **proveïdor d'aplicacions** quedarà recollida en l'arxiu `/sic/aca.yml` dins del repositori del projecte.
La seva existència és la que determina si l'aplicació té actiu el mode Autoservei de Pipelines. Es tracta d'un arxiu de text en format YAML,
que serà responsabilitat del proveïdor d'aplicacions mantenir-lo actualitzat, en el que s'ha d'aportar la següent informació:

* **Versió**: versió (independent de la versió de l'aplicació) que s'utilitza per fer seguiment de l'arxiu de configuració.
* **Paràmetres**: parells clau-valor en els que es farà substitució dins de la pipeline.
* **Recursos**: diferents tipus de recursos als que es fa referència en la pipeline.
    - **Entorns**: entorns als que es desplega l'aplicació, així com el seu ordre i la modalitat de desplegament desitjada.
    - **Infraestructures**: denominació d'infraestructures destí (cal demanar al proveïdor d'infraestructures la denominació de la infraestructura).
    - **Artefactes**: artefactes a generar durant el procés de construcció que s'han de desplegar en el procés de desplegament.
* **Procés de construcció**: definició del procés de construcció amb l'ús de passes (*steps*) de construcció.
* **Procés de desplegament**: definició del procés de desplegament amb l'ús de passes (*steps*) de desplegament.
* **Notificacions**: definició d'adreces de correu electrònic on notificar accions manuals en espera i resultats de l'execució.

![Pipeline del SIC](/images/news/AutoserveiJobs-ACA.png)
<br/>

Per a més informació: [Com construir el fitxer ACA](/sic-welcome-pack/fitxer-aca/)
<br/>

### Arxiu de Configuració d'Infraestructures (ACI)

La informació que aporta el **proveïdor d'infraestructures** queda recollida en el seu repositori del SIC. En aquest repositori hi dipositarà els
arxius de configuració d'infraestructures (en pot tenir més d'un per aplicació-projecte), el nom dels quals (sense incloure l'extensió) serà l'identificador que ha
de facilitar al proveïdor d'aplicacions. Serà responsabilitat del proveïdor d'infraestructures mantenir actualitzada aquesta informació i de notificar al
proveïdor d'aplicacions quan hagi realitzat algun canvi. Es tracta d’un arxiu de text en format YAML, que serà responsabilitat del proveïdor d’infraestructures
mantenir-lo actualitzat, en el que s’ha d’aportar la següent informació:

* **Versió**: versió de l'arxiu de configuració.
* **Recursos**: secció que recull tots els recursos de la part d'infraestructures. Actualment, només hi ha el detall de cada infraestructura.
* **Infraestructures**: detall de les infraestructures incloses en aquest arxiu de configuració.

S'han d'incloure tots els entorns de les capes/stacks definides en l'arxiu pertinent.

![Pipeline del SIC](/images/news/AutoserveiJobs-ACI.png)
<br/>

#### Clau pública

El SIC aprofita els avantatges del sistema de clau pública (PKI en anglès), que ofereix garanties operacionals criptogràfiques tals com el xifrat, la firma digital i transaccions segures.
Es tracta d’un arxiu `.pem` amb la clau pública que consisteix en una RSA de 4096 bits i permet encriptar paraules de pas mitjançant la següent comanda:


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


<br/><br/><br/>
Si voleu més informació podeu consultar la secció de [**HOWTOs i manuals**](/sic/manuals/). <br/>
Si teniu qualsevol dubte o problema assegureu-vos de no trobar resposta a les [**FAQ**] (/sic/faq) i utilitzeu el canal de [**Suport**] (/sic/suport) o contacteu amb l'Oficina Tècnica Canigó CTTI a través del correu electrònic: **oficina-tecnica.canigo.ctti@gencat.cat**.