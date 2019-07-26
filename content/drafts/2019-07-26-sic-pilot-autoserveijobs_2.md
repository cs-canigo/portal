+++
date        = "2019-07-26"
title       = "SIC. Pilot de l'autoservei de jobs pipeline amb T-Systems i l'àmbit ATC"
description = "Durant el mes de Juliol s'han dut a terme sessions amb el proveïdor T-Systems i l'àmbit ATC per tal d'abordar nous projectes pilot per a la construcció i desplegament d'aplicacions mitjançant l'autoservei de jobs pipeline"
categories  = [] <!--- ["SIC"] --->
sections    = [] <!--- ["Notícies", "home"] --->
key = "" <!--- "AGOST2019" --->
+++

Durant el mes de Juliol s'han dut a terme sessions amb el proveïdor T-Systems i l'àmbit ATC per tal d'abordar nous projectes pilot per a la construcció i desplegament d'aplicacions mitjançant l'autoservei de jobs pipeline.
Aquestes sessions formatives i d'establiment de plans d'acció ha permés planificar l'inici d'aquests projectes que, en el cas de T-Systems, ja han estat iniciats per a tres aplicacions del Departament de Justícia i programades per a l'Octubre en el cas de l'Agència Catalana de Catalunya.

<br/>
A continuació expliquem quin és el funcionament de l'autoservei per a la construcció i desplegament d'aplicacions.

## Funcionament

### Arxiu de Configuració de l’Aplicació (ACA, format YAML)
Informació aportada pel proveïdor d’aplicacions repositada dins el propi projecte al Git corporatiu (ruta “/sic/aca.yml”):

* Versió de l’arxiu
* Paràmetres (opcional)
* Recursos: entorns on es desplega, denominació d’infraestructures i artefactes generats
* Procés de construcció: passes per a la construcció d’artefactes
* Procés de desplegament: passes per al desplegament d’artefactes
* Adreces de notificació
<br/>

### Arxiu de Configuració d’Infraestructures (ACI, format YAML)
Informació aportada pel proveïdor d’infraestructures repositada dins un grup i projecte específic per proveïdor al Git corporatiu:

* Versió de l’arxiu
* Recursos: dades d’infraestructures (paraules de pas encriptades)
* Només resulta necessari si es realitzen desplegaments en modalitat automàtica (INT).
<br/>

### Pipeline generadora de pipelines
* S’executa en fer un push al projecte (només si el projecte disposa d’un arxiu ACA i aquest ha estat creat o modificat)
* Recupera els arxius de configuració ACA i ACI
* Genera la pipeline de construcció i desplegament del projecte
* Executa la pipeline generada (només si el projecte ha sofert altres modificacions)
<br/>


<br/>
Per a més informació, podeu consultar:

* [Servei d’Integració Continua](/sic-serveis/ci/)
* [Com construir el fitxer ACA](/sic-welcome-pack/fitxer-aca/)
* [Manuals](/sic/manuals/)

<br/>

Si teniu qualsevol dubte o problema assegureu-vos de no trobar resposta a les [FAQ] (/sic/faq) i utilitzeu el canal de [Suport] (/sic/suport) o contacteu amb l'Oficina Tècnica Canigó CTTI a través del correu electrònic: **oficina-tecnica.canigo.ctti@gencat.cat**.