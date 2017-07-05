+++
date = "2017-07-05"
title = "Canigó. Versions LTS"
description = "Canigó. Versions LTS"
sections = ["Notícies", "home"]
categories = ["canigo"]
+++

Des de Canigó s'ha decidit introduir el concepte de **versions LTS (Long-Term Support)**, així com a dotar d'un significat molt concret als dígits destinats al versionatge del framework.

Les [versions LTS](http://canigo.ctti.gencat.cat/blog/2017/06/versions_lts/) són un tipus especial de versions que estan designades per a ser suportades per un periode més llarg del normal, l'objectiu de les quals és ser el més estable possible. En el període de temps entre dues versions LTS apareixeran versions de Canigó que solucionin bugs, eliminin vulnerabilitats o afegeixen noves funcionalitats.

La versió Canigó 3.2.0 publicada el passat mes de Març és considerada com la primera (i actual) versió LTS del framework. És a partir d'aquesta versió que es comença aplicar la següent **política de versions**:

* _4rt dígit_: publicació de correccions d'incidències o noves funcionalitats que la seva publicació no pot esperar a l'agrupació de correccions o noves funcionalitats (modificació 3r dígit) - _No planificades_ [Ex. 3.2.0.1]
* _3r dígit_: correcció d'incidències, vulnerabilitats o noves funcionalitats que no introdueixen cap incompatibilitat - _Cada 3 mesos_ [Ex 3.2.1]
* _2on dígit_: noves funcionalitats que introdueixen incompatibilitats, i que per tant, fan necessari adaptacions a les aplicacions - _Previsiblement cada 2 anys_

Respecte al segon dígit, les versions imparelles es consideren internes destinades a proves (Ex. 3.3), i per tant, no seran aptes per a ser desplegades en entorns productius.

Aquest és el **roadmap** previst per Canigó:



<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>

<script type="text/javascript">
  google.charts.load("current", {packages:["timeline"], 'language': 'es'});
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
    var container = document.getElementById('roadmap');
    var chart = new google.visualization.Timeline(container);
    var dataTable = new google.visualization.DataTable();

	dataTable.addColumn({ type: 'string', id: 'id' });
    dataTable.addColumn({ type: 'string', id: 'Name' });
    dataTable.addColumn({ type: 'date', id: 'Start' });
    dataTable.addColumn({ type: 'date', id: 'End' });
    dataTable.addRows([
      [ '1','Canigo 3.2.0 LTS', new Date(2017, 2), new Date(2020, 2) ],
      [ '2','Canigo 3.2.1', new Date(2017, 5), new Date(2017, 8) ],
      [ '3','Canigo 3.2.2', new Date(2017, 8), new Date(2017, 11) ],
	  [ '4','Canigo 3.2.3', new Date(2017, 11), new Date(2018, 2) ],
	  [ '5','Canigo 3.2.4', new Date(2018, 2), new Date(2018, 5) ],
	  [ '6','Canigo 3.2.5', new Date(2018, 5), new Date(2018, 8) ],
      [ '7','Canigo 3.2.6', new Date(2018, 8), new Date(2018, 11) ],
	  [ '8','Canigo 3.2.7', new Date(2018, 11), new Date(2019, 2) ],
	  [ '9','Canigo 3.4.0 LTS', new Date(2019, 2), new Date(2022, 2) ],
	  [ '10','Canigo 3.4.1', new Date(2019, 5), new Date(2019, 8) ],
	  [ '11','Canigo 3.4.2', new Date(2019, 8), new Date(2019, 11) ],
	  [ '12','Canigo 3.4.3', new Date(2019, 11), new Date(2020, 2) ],
	  [ '13','Canigo 3.4.4', new Date(2020, 2), new Date(2020, 5) ]]);

    var options = {
      timeline: { groupByRowLabel: false, showRowLabels: false },
	  colors: ['blue', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'blue','green','green','green','green']
    };

    chart.draw(dataTable, options);
  }
</script>

<div id="roadmap" style="height: 590px;"></div>



Pel que fa al **suport**:

* Les _versions LTS_ tindran un període de suport de fins a 3 anys. Per garantir la màxima estabilitat rebran totes les correccions d'incidències i vulnerabilitats, però no noves funcionalitats.

* Les _versions actuals (current)_ tindran suport mentre siguin la versió actual, és a dir, de 3 mesos.

Com es pot observar, cada 2 anys es publicarà una nova versió LTS (Ex. 3.4.0 LTS) amb tots els canvis (correcció d'incidències i vulnerabilitats, millores, noves funcionalitats) realitzats des de l'última versió LTS. Hi haurà un període de convivència d'un any entre versions LTS per tal que les aplicacions es puguin **actualitzar**.

L'actualització de les aplicacions, sempre que es tracti d'un 4er dígit (fix), serà directe. En el cas del 3er dígit o inferior, caldrà realitzar adaptacions. Per el 3er dígit les adaptacions seran mínimes, previsiblement només actualització de dependències amb mòduls Canigó.

L'objectiu d'aquesta nova política de versionatge és evitar l'**obsolescència** tecnològica de les aplicacions que utilitzin Canigó forçant la seva actualització com a màxim cada 3 anys a la versió LTS actual.

Respecte als nous desenvolupaments, es recomana adoptar la versió actual (current) i anar actualitzant fins que aparegui la següent versió LTS, per tal de tenir un suport continuat així com màxima estabilitat.

Per qualsevol dubte respecte d'aquesta nova política de versionatge us podeu posar en contacte amb l'Oficina Tècnica de Canigó fent una petició al [JIRA CSTD](https://cstd.ctti.gencat.cat/jiracstd/browse/CAN) o per correu a la [bústia](mailto:oficina-tecnica.canigo.ctti@gencat.cat).
