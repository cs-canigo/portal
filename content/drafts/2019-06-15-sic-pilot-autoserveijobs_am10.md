+++
date        = "2019-06-15"
title       = "SIC. Pilot de l'autoservei de jobs pipeline al lot AM10"
description = "Durant el mes de Maig s'ha dut a terme un projecte pilot per a la construcció i desplegament d'aplicacions del lot AM10 mitjançant l'autoservei de jobs pipeline" 
categories  = [""]
sections    = [""]
key = "JULIOL2019"
+++

Durant el mes de Maig s'ha dut a terme un **projecte pilot per a la construcció i desplegament d'aplicacions del lot AM10 mitjançant l'autoservei de jobs pipeline** amb èxit.

* **1114 – OBR i 3256 – GESTILS**: projectes Oracle Apex amb entorns de desplegament INT/PRE/PRO.
* **1040 – SII, 1086 – POE i 1096 – FDC**: projectes Java Maven multimodule (.ear) amb desplegament de BBDD integrat en entorns de desplegament INT/PRE/PRO.

Durant el mes de Juliol s'ha dut a terme un **projecte pilot per a la construcció i desplegament d'aplicacions del proveïdor IBM mitjançant l'autoservei de jobs pipeline** amb èxit.

* **2560 - CCP**: projecte Java Maven amb contingut dinàmic (war) i estàtic (zip) amb entorns de desplegament PRE/PRO.
* **1035 - GSA**: projecte Java Maven amb contingut dinàmic (war) i estàtic (zip) amb entorns de desplegament INT/PRE/PRO.
* **2506 - GSIT_CEMP**: (en curs) projecte backend Java Maven, projecte frontend NodeJs i projecte de desplegament de base de dades amb entorns de desplegament INT/PRE/PRO.

S'ha corroborat que l'autoservei de jobs pipeline és totalment operatiu per a determinades tecnologies i cal treballar per ampliar el seu abast per tal de donar cobertura a un % elevat de projectes de la Generalitat.
En paral·lel es realitzaran sessions amb altres proveïdors i àmbits de cara a començar a fer ús de l'autoservei de jobs per tal d'automatitzar la construcció i desplegament de les seves aplicacions i ja s'ha iniciat el pilot amb IBM.

## Funcionament

### Arxiu de Configuració de l’Aplicació (ACA, format YAML)
Informació aportada pel proveïdor d’aplicacions repositada dins el propi projecte al Git corporatiu (ruta “/sic/aca.yml”):

* Versió de l’arxiu
* Paràmetres (opcional)
* Recursos: entorns on es desplega, denominació d’infraestructures i artefactes generats
* Procés de construcció: passes per a la construcció d’artefactes
* Procés de desplegament: passes per al desplegament d’artefactes
* Adreces de notificació

### Arxiu de Configuració d’Infraestructures (ACI, format YAML)
Informació aportada pel proveïdor d’infraestructures repositada dins un grup i projecte específic per proveïdor al Git corporatiu:

* Versió de l’arxiu
* Recursos: dades d’infraestructures (paraules de pas encriptades)
* Només resulta necessari si es realitzen desplegaments en modalitat automàtica (INT).

### Pipeline generadora de pipelines:
* S’executa en fer un push al projecte (només si el projecte disposa d’un arxiu ACA i aquest ha estat creat o modificat)
* Recupera els arxius de configuració ACA i ACI
* Genera la pipeline de construcció i desplegament del projecte
* Executa la pipeline generada (només si el projecte ha sofert altres modificacions)


<br/><br/>

Per a més informació, podeu consultar:

* [Servei d’Integració Continua](/sic-serveis/ci/)
* [Com construir el fitxer ACA](/sic-welcome-pack/fitxer-aca/)
* [Manuals](/sic/manuals/)

<br/>

Si teniu qualsevol dubte o problema assegureu-vos de no trobar resposta a les [FAQ] (/sic/faq) i utilitzeu el canal de [Suport] (/sic/suport) o contacteu amb l'Oficina Tècnica Canigó CTTI a través del correu electrònic: **oficina-tecnica.canigo.ctti@gencat.cat**.