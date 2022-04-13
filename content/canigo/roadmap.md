+++
date        = "2022-04-13"
title       = "Roadmap Framework Canigó"
description = "Roadmap previst per a la evolució del Framework Canigó"
sections    = "Canigó"
taxonomies  = []
toc 		= true
weight 		= 3
+++

Aquest és el Roadmap previst per a la evolució del Framework de Canigó 3

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
	  [ '1','Canigo 3.4 LTS', new Date(2019, 2), new Date(2022, 3) ],
	  [ '2','Canigo 3.4.0', new Date(2019, 2), new Date(2019, 5) ],  
	  [ '3','Canigo 3.4.1', new Date(2019, 5), new Date(2019, 8) ],
	  [ '4','Canigo 3.4.2', new Date(2019, 8), new Date(2019, 11) ],
	  [ '5','Canigo 3.4.3', new Date(2019, 11), new Date(2020, 2) ],
	  [ '6','Canigo 3.4.4', new Date(2020, 2), new Date(2020, 6) ],
	  [ '7','Canigo 3.4.5', new Date(2020, 6), new Date(2021, 3) ],
	  [ '8','Canigo 3.4.6', new Date(2021, 3), new Date(2021, 12) ],
	  [ '9','Canigo 3.4.7', new Date(2021, 12, 13), new Date(2021, 12, 17) ],
	  [ '10','Canigo 3.4.8', new Date(2021, 12, 17), new Date(2021, 12, 27) ],
	  [ '11','Canigo 3.4.9', new Date(2021, 12, 27), new Date(2022, 3) ],
	  [ '12','Canigo 3.6 LTS', new Date(2021, 10), new Date(2024, 10) ],
	  [ '13','Canigo 3.6.0', new Date(2021, 10), new Date(2021, 12) ],
	  [ '14','Canigo 3.6.1', new Date(2021, 12, 13), new Date(2021, 12, 17) ],
	  [ '15','Canigo 3.6.2', new Date(2021, 12, 17), new Date(2021, 12, 27) ],	
	  [ '16','Canigo 3.6.3', new Date(2021, 12, 27), new Date(2022, 04, 11) ],
	  [ '16','Canigo 3.6.4', new Date(2022, 04, 11), new Date(2022, 7) ]
	]);

    var options = {
      timeline: { groupByRowLabel: false, showRowLabels: false },
	  colors: ['blue', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'blue', 'green', 'green', 'green', 'green', 'green', 'green']
    };

    chart.draw(dataTable, options);
  }
</script>

<div id="roadmap" style="height: 590px;"></div>


<br />

* *El període associat a cada release no correspon a temps de desenvolupament, si no al temps en què es considera vigent*
* *Aquest Roadmap està subjecte a canvis*

