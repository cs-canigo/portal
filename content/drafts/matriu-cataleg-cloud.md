+++
date        = "2016-10-11"
title       = "Matriu catàleg cloud"
description = "Elements de catàleg disponibles en els diferents Container Clouds i Clouds Públics"
sections    = ""
categories  = [""]
+++


Element            |Tipus       | Capa  |Versió |Container Cloud  |AppAgile  |Bluemix |Azure  |Compose  |Observacions
-------            |------      |:-----:|:-----:|:-----:|:-----:|:------:|:-----:|:-----:|-------------
Apache             | Contenidor |Web    |2.4    |x      |       |x       |       ||Amb o sense GICAR. Amb GICAR només a CPD Privat   
Nginx              | xPaaS      |Web    |1.8    |       |       |x       |       ||   
Tomcat             | xPaaS      |App    |8      |x      |       |x       |       || 
Tomcat             | Contenidor |App    |8      |x      |       |x       |       || 
Websphere          | xPaaS      |App    |-      |       |       |x       |       || 
HAProxy            | Contenidor |-      |1.5.1  |x      |       |x       |       ||Balanceig de contenidors arrencats amb docker-compose a Bluemix 
Java               | Contenidor |-      |8      |x      |       |x       |       ||
JBoss              | xPaaS      |App    |6      |x      |       |        |       || 
.Net               | xPaaS      |App    |       |       |       |x       |x      || 
NodeJS             | xPaaS      |App    |4.2    |x      |       |x       |       || 
NodeJS             | Contenidor |App    |4.2    |x      |       |x       |       || 
PHP                | xPaaS      |App    |>5.5   |x      |       |x       |       ||    
PHP                | Contenidor |App    |5.6    |x      |       |x       |       ||    
MySQL              | Contenidor |DB     |5.7    |x      |       |x       |       ||    
MySQL              | DBaaS      |DB     |-      |       |       |       |       |x  |Beta    
SQLServer          | DBaaS      |DB     |v12    |       |       |        |x      |  || 
MongoDB            | DBaaS      |DB     |3.2    |       |       |       |       |x  ||    
PostgreSQL         | Contenidor |DB     |9.5.3  |x      |       |       |       |x  |    
PostgreSQL         | DBaaS      |DB     |9.5.4  |       |       |       |       |x  |    
ElasticSearch      | DBaaS      |DB     |2.4.0  |       |       |       |       |x  |    
Contenidors a mida | Contenidor |-      |-      |x      |       |x       |       ||
Màquines virtuals  | IaaS       |-      |-      |      |      |        |x      || 


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
	                if(col_index===3 || col_index===10){
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
