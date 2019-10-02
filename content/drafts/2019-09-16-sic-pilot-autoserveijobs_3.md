+++
date        = "2019-10-02"
title       = "SIC. Pilot de l'autoservei de jobs pipeline amb T-Systems, l'àmbit ATC i el lot AM10 - TICxCAT"
description = "Durant el mes d'Agost s'ha avançat amb T-Systems en els projectes pilot de l'àmbit de Justícia per a la construcció i desplegament d'aplicacions mitjançant l'autoservei de jobs pipeline i s'ha iniciat una Task Force per tal d'integrar totes les aplicacions APEX del lot AM10 (TICxCAT) mitjançant aquest mateix servei."
#sections    = ["Notícies", "home"]
#categories  = ["sic"]
key         = "OCTUBRE2019"
+++

Durant el mes d'Agost i setembre s'ha avançat amb **T-Systems** en els projectes pilot de l'àmbit de Justícia per a la construcció i desplegament d'aplicacions mitjançant l'autoservei de jobs pipeline i s'ha iniciat una Task Force per tal d'integrar totes les aplicacions APEX del lot AM10 (TICxCAT) mitjançant aquest mateix servei.

Per altra banda, s'ha planificat per aquest mes d'Octubre l'inici del pilot en el cas de les aplicacions de l'**Agència Tributària de Catalunya**.

Per iniciar aquests pilots s'han dut a terme prèviament **sessions formatives i d'establiment de plans d'acció**.

A continuació expliquem quin és el funcionament de l'autoservei per a la construcció i desplegament d'aplicacions.

## Funcionament

El servei es basa en l'aprovisionament de dos arxius en format YAML que són processats per una pipeline que s'encarrega de generar altres pipelines per a la construcció i el desplegament d'aplicacions.

### Arxiu de Configuració de l’Aplicació (ACA, format YAML)
L'arxiu de configuració de l'aplicació consisteix en informació aportada pel proveïdor d’aplicacions repositada dins el propi projecte al Git corporatiu (ruta “/sic/aca.yml”), es composa de:

* Versió de l’arxiu
* Paràmetres (opcional)
* Recursos: entorns on es desplega, denominació d’infraestructures i artefactes generats
* Procés de construcció: passes per a la construcció d’artefactes
* Procés de desplegament: passes per al desplegament d’artefactes
* Adreces de notificació
<br/>

### Arxiu de Configuració d’Infraestructures (ACI, format YAML)
L'arxiu de configuració d'infraestructures consisteix en informació aportada pel proveïdor d’infraestructures repositada dins un grup i projecte específic per proveïdor al Git corporatiu, es composa de:

* Versió de l’arxiu
* Recursos: dades d’infraestructures (paraules de pas encriptades)

Fem notar que aquest fitxer només resulta necessari si es realitzen desplegaments en modalitat automàtica, actualment només a l'entorn de INT.
<br/>

### Pipeline generadora de pipelines
La pipeline generadora s’executa en fer un push al projecte, només si el projecte disposa d’un arxiu ACA i aquest ha estat creat o modificat. Aquesta s'encarrega de recuperar els arxius de configuració ACA i ACI, generar una pipeline de construcció i desplegament del projecte i executar-la. Cal destacar que només s'executa si el projecte ha sofert altres modificacions.
<br/>


<br/>
Per a més informació, podeu consultar:

* [Servei d’Integració Continua](/sic-serveis/ci/)
* [Com construir el fitxer ACA](/sic-welcome-pack/fitxer-aca/)
* [Manuals](/sic/manuals/)

<br/>

Si teniu qualsevol dubte o problema assegureu-vos de no trobar resposta a les [FAQ] (/sic/faq) i utilitzeu el canal de [Suport] (/sic/suport) o contacteu amb l'Oficina Tècnica Canigó CTTI a través del correu electrònic: **oficina-tecnica.canigo.ctti@gencat.cat**.
