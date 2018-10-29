+++
date        = "2018-06-06"
title       = "Matriu catàleg cloud"
description = "Elements de catàleg disponibles en els diferents CPDs/Clouds"
sections    = "Container Cloud"
weight      = 3
categories  = ["cloud","docker","container","paas"]
+++

Element            |Tipus       | Capa  |Versió (1)   |CPD1   |CPD2   |CPD3   |CPD4   |Bluemix |Azure  |Observacions
-------            |------      |:-----:|:-----------:|:-----:|:-----:|:-----:|:-----:|:------:|:-----:|-------------
Apache             | PaaS       |Web    | 2.4   |x      |x      |x      |x      |        |       |Inclou GICAR
Apache             | Contenidor |Web    | 2.4   |x      |       |       |x      |x       |       |Amb o sense GICAR   
Nginx              | xPaaS      |Web    |1.12   |       |       |       |       |x       |       |   
Nginx              | Contenidor |Web    |1.10   |x      |       |       |x      |x       |       |Obsolet   
Nginx              | Contenidor |Web    |1.12   |x      |       |       |x      |x       |       |   
Nginx              | Contenidor |Web    |1.14   |x      |       |       |x      |x       |       |   
IIS                | PaaS       |Web    |8.5    |x      |x      |x      |x      |        |       | 
Tomcat             | PaaS       |App    |8      |x      |x      |x      |x      |        |       | 
Tomcat             | xPaaS      |App    |8      |       |       |x      |x      |x       |       | 
Tomcat             | xPaaS      |App    |8.5    |       |       |       |       |x       |       | 
Tomcat             | xPaaS      |App    |9      |       |       |       |       |x       |       | 
Tomcat             | Contenidor |App    |7      |x      |        |      |x      |x       |       |Obsolet
Tomcat             | Contenidor |App    |8      |x      |        |      |x      |x       |       | 
Tomcat             | Contenidor |App    |8.5    |x      |        |      |x      |x       |       | 
Weblogic           | PaaS       |App    |12.1   |x      |x      |x      |x      |        |       | 
Websphere          | PaaS       |App    |8.5    |x      |x      |x      |x      |        |       | 
Websphere          | xPaaS      |App    |-      |       |       |       |       |x       |       | 
HAProxy            | Contenidor |-      |1.5.1  |x      |       |       |x      |x       |       |Balanceig de contenidors arrencats amb docker-compose a Bluemix 
Java               | xPaaS      |-      |8      |       |       |       |       |x       |       | 
Java               | xPaaS      |-      |9      |       |       |       |       |x       |       | 
Java               | Contenidor |-      |7      |x      |       |       |x      |x       |       |Obsolet 
Java               | Contenidor |-      |8      |x      |       |       |x      |x       |       | 
JBoss              | PaaS       |App    |6.x    |x      |x      |x      |x      |        |       | 
JBoss              | xPaaS      |App    |6      |       |       |x      |x      |        |       | 
.Net               | PaaS       |App    |4.5.2  |x      |x      |x      |x      |        |       | 
.Net               | xPaaS      |App    |       |       |       |       |       |x       |x      | 
NodeJS             | xPaaS      |App    |4.2    |       |       |x      |x      |        |       | 
NodeJS             | xPaaS      |App    |4.9    |       |       |       |       |x       |       | 
NodeJS             | xPaaS      |App    |6.14   |       |       |       |       |x       |       | 
NodeJS             | xPaaS      |App    |8.11   |       |       |       |       |x       |       | 
NodeJS             | Contenidor |App    |4.8    |x      |       |       |x      |x       |       | 
NodeJS             | Contenidor |App    |6.12   |x      |       |       |x      |x       |       | 
NodeJS             | Contenidor |App    |8.9    |x      |       |       |x      |x       |       | 
PHP                | PaaS       |App    |5.6    |x      |       |       |       |        |       |    
PHP                | xPaaS      |App    |>5.5   |       |       |x      |x      |        |       |    
PHP                | xPaaS      |App    |5.6    |       |       |       |       |x       |       |    
PHP                | xPaaS      |App    |7.1    |       |       |       |       |x       |       |    
PHP                | Contenidor |App    |5.6    |x      |       |       |x      |x       |       |    
PHP                | Contenidor |App    |7.1    |x      |       |       |x      |x       |       |    
OracleDB           | PaaS       |DB     |12.1   |x      |x      |x      |x      |        |       |    
MySQL              | PaaS       |DB     |5.7    |x      |x      |x      |x      |        |       |    
MySQL              | Contenidor |DB     |5.7    |x      |       |       |x      |x       |       | Opció d'administració a CPD4   
MySQL              | DBaaS      |DB     |-      |       |       |       |       |x       |       |Beta
MySQL              | DBaaS      |DB     |-      |       |       |       |       |        |x      |En proves     
SQLServer          | PaaS       |DB     |2014   |x      |x      |x      |x      |        |       |    
SQLServer          | DBaaS      |DB     |v12    |       |       |       |       |        |x      | 
MongoDB            | DBaaS      |DB     |3.2    |       |       |       |       |x       |       |    
MongoDB            | DBaaS      |DB     |3.4    |       |       |       |       |x       |       |    
MongoDB            | PaaS       |DB     |3.2    |x      |       |       |x      |        |       |Adhoc
MongoDB            | Contenidor |DB     |3.2    |x      |       |       |x      |x       |       |    
PostgreSQL         | Contenidor |DB     |9.5    |x      |       |       |x      |x       |       | Opció d'administració a CPD4    
PostgreSQL         | DBaaS      |DB     |9.5    |       |       |       |       |x       |       |    
PostgreSQL         | DBaaS      |DB     |9.6    |       |       |       |       |x       |       |    
PostgreSQL         | DBaaS      |DB     |-      |       |       |       |       |        |x      |En proves    
ElasticSearch      | DBaaS      |DB     |2.4    |       |       |       |       |x       |       |Obsolet    
ElasticSearch      | DBaaS      |DB     |5.6    |       |       |       |       |x       |       |    
ElasticSearch      | DBaaS      |DB     |6.2    |       |       |       |       |x       |       |    
Contenidors a mida | Contenidor |-      |-      |x      |       |       |x      |x       |       |
Màquines virtuals  | IaaS       |-      |-      |x      |x      |x      |x      |        |x      |  

(1) Les versions s'alineen, en la mesura del possible, amb la versió actual CTTI del [Estàndard pel full de ruta del programari](https://qualitat.solucions.gencat.cat/estandards/estandard-full-ruta-programari/) per a tots els elements que hi estiguin presents
<br><br>

Llegenda "Tipus":

- **xPaaS**: és un entorn d'execució que s'arrenca en el moment de fer el push de l'artefacte que volem fer córrer. No hi ha pre-aprovisionament. Talles flexibles. Escalat automàtic.
- **Contenidor**: artefacte de software que inclou tots les dependències necessàries per a dur a terme la seva funció i és portable entre clouds que els suportin (Docker)  
- **DBaaS**: base de dades com a servei, és un subtipus de xPaaS. Escala automàticament.
- **IaaS**: màquines virtuals, on s'aprovisiona fins al nivell de SO.

<style>
	table tr:first-child th:first-child, table tr:first-child th:last-child{
		background-color:#fff;
	}
	table tr:first-child th:first-child{
		border-top: none!important;
		border-left:none!important;
	}
	table tr:first-child th:last-child{
		border-top: none!important;
		border-right:none!important;
	}

	table tr:nth-child(1) th:nth-child(1), 
	table tr:nth-child(1) th:nth-child(2), 
	table tr:nth-child(1) th:nth-child(3),
	table tr:nth-child(2) th:nth-child(4),
	table tr:nth-child(2) th:nth-child(8), 
	table tr:nth-child(2) th:nth-child(10),
	table tr td:nth-child(4), 
	table tr td:nth-child(8), 
	table tr td:nth-child(10){
		border-right: 3px solid #aaa;
	}
</style>

<script src="https://cdn.datatables.net/1.10.12/js/jquery.dataTables.min.js"></script>
<script>
	$(document).ready(function() {
		//Data table plugin
    	$('table').DataTable( {
	        "paging": false,
	        "info" : false,
	        "ordering": false,
	        "language":{
	        	"search" : "<strong>Cerca:</strong> ",
		        "infoEmpty": "No hi ha registres",
	        	"zeroRecords": "No s'han trobat registres"
	        },
	        initComplete: function () {
	            this.api().columns().every( function (col_index) {
	                var column = this;
	                if(col_index===10){
	                	$("<p>&nbsp;</p>").appendTo($(column.header()));
	                	return;
	                }
	                var select = $('<select><option value=""></option></select>')
	                    .appendTo( $(column.header()) )
	                    .on( 'change', function () {
	                        var val = $.fn.dataTable.util.escapeRegex(
	                            $(this).val()
	                        );
	 
	                        column
	                            .search( val ? '^'+val+'$' : '', true, false )
	                            .draw();
	                    } );
	 
	                column.data().unique().sort().each( function ( d, j ) {
	                    select.append( '<option value="'+d+'">'+d+'</option>' )
	                });
	            });

	            //adds header private/public
	            $("<tr><th colspan='4'></th><th colspan='4'>Privat</th><th colspan='2'>Públic</th><th colspan='1'></th></tr>").insertBefore($("table thead tr"));
	        }	        
    	});
	});
</script>
