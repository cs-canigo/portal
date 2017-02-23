+++
date        = "2016-10-11"
title       = "Matriu catàleg cloud"
description = "Elements de catàleg disponibles en els diferents Container Clouds i Clouds Públics"
sections    = ""
toc 	    = true
categories  = [""]
+++

## Matriu catàleg Cloud

Element            |Tipus       | Capa  |Versió |ContainerCloud  |AppAgile  |Bluemix |Azure  |Compose  |Observacions
-------            |------      |:-----:|:-----:|:---------------:|:------:|:------:|:-----:|:-------:|-------------
Apache             | Contenidor |Web    |actual FRP    |x  |       |x       |       ||Amb o sense GICAR. Amb GICAR només a CPD Privat   
Nginx              | xPaaS      |Web    |1.8    | |       |x       |       ||   
Tomcat             | xPaaS      |App    |actual FRP      | |       |x       |       || 
Tomcat             | Contenidor |App    |actual FRP      | |       |x       |       || 
Websphere          | xPaaS      |App    |-      |       |       |x       |       || 
HAProxy            | Contenidor |-      |1.5.1  |x      |       |x       |       ||Balanceig de contenidors arrencats amb docker-compose a Bluemix 
Java               | Contenidor |-      |8      |x      |       |x       |       ||
JBoss              | xPaaS      |App    |actual FRP      |      |       |x        |       || 
.Net               | xPaaS      |App    |       |       |       |       |x      || 
NodeJS             | xPaaS      |App    |actual FRP    |      |       |x       |       || 
NodeJS             | Contenidor |App    |actual FRP    |x      |       |x       |       || 
PHP                | xPaaS      |App    |>5.5   |      |       |x       |       ||    
PHP                | Contenidor |App    |actual FRP    |x      |       |x       |       ||    
MySQL              | Contenidor |DB     |actual FRP    |x      |       |x       |       ||    
MySQL              | DBaaS      |DB     |-      |       |       |       |       |x  |Beta    
SQLServer          | DBaaS      |DB     |12    |       |       |        |x      |  || 
MongoDB            | DBaaS      |DB     |actual FRP    |       |       |       |       |x  ||    
PostgreSQL         | Contenidor |DB     |9.5.3  |x      |       |       |       |x  |    
PostgreSQL         | DBaaS      |DB     |9.5.4  |       |       |       |       |x  |    
ElasticSearch      | DBaaS      |DB     |2.4.0  |       |       |       |       |x  |    
Contenidors a mida | Contenidor |-      |-      |x      |       |x       |       ||
Màquines virtuals  | IaaS       |-      |-      |      |      |        |x      || 

(1) Per a tots els elements presents al [Full de Ruta del Programari (FRP) del CTTI](https://portic.ctti.gencat.cat/les_TIC/Normativa/arquitectura/Documents/Full de Ruta del Programari.pdf) està disponible la versió actual CTTI.

(2) Per als elements que no estan presents al [Full de Ruta del Programari (FRP) del CTTI](https://portic.ctti.gencat.cat/les_TIC/Normativa/arquitectura/Documents/Full de Ruta del Programari.pdf) s’especifica la versió disponible més actual.

Llegenda "Tipus":

- **xPaaS**: és un entorn d'execució que s'arrenca en el moment de fer el push de l'artefacte que volem fer córrer. No hi ha pre-aprovisionament. Talles flexibles. Escalat automàtic.
- **Contenidor**: artefacte de software que inclou tots les dependències necessàries per a dur a terme la seva funció i és portable entre clouds que els suportin (Docker)  
- **DBaaS**: base de dades com a servei, és un subtipus de xPaaS. Es demana el tipus de DB i es proporcionen les credencials d'accés. Escala automàticament.
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
	table tr:nth-child(2) th:nth-child(6),
	table tr:nth-child(2) th:nth-child(9), 
	table tr:nth-child(2) th:nth-child(10),
	table tr td:nth-child(4), 
	table tr td:nth-child(6),
	table tr td:nth-child(9), 
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
	                if(col_index===9){
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
	            $("<tr><th colspan='4'></th><th colspan='2'>Privat</th><th colspan='3'>Públic</th><th colspan='1'></th></tr>").insertBefore($("table thead tr"));
	        }	        
    	});
	});
</script>

## Talles

### Contenidors Docker i xPaaS Bluemix

Pico - 64mb
Nano - 128mb
Micro - 256mb
Molt petit - 512mb
Petit - 1gb
Mitja - 2gb
Gran - 4gb
Extra gran - 8gb
Extra gran 2X - 16gb

### Contenidors CPD3-MediaCloud (Openshift CPD3 Containers)

D1 - 256mb
D2 - 512mb
D3 - 1024mb
D4 - 2048mb


