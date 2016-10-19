+++
date        = "2016-10-11"
title       = "Matriu catàleg cloud"
description = ""
sections    = ""
categories  = [""]
+++


Element            |Tipus       | Capa  |CPD1   |CPD2   |CPD3   |CPD4   |Bluemix |Azure  |Observacions
-------            |------      |:-----:|:-----:|:-----:|:-----:|:-----:|:------:|:-----:|-------------
Apache             | PaaS       |Web    |x      |x      |x      |x      |        |       |Inclou GICAR
Apache             | Contenidor |Web    |       |       |x      |       |x       |       |Amb o sense GICAR. Amb GICAR només a CPD Privat   
Nginx              | xPaaS      |Web    |       |       |       |       |x       |       |   
IIS                | PaaS       |Web    |x      |x      |x      |x      |        |       | 
Tomcat             | PaaS       |App    |x      |x      |x      |x      |        |       | 
Tomcat             | xPaaS      |App    |       |       |x      |       |x       |       | 
Tomcat             | Contenidor |App    |       |       |x      |       |x       |       | 
Weblogic           | PaaS       |App    |x      |x      |x      |x      |        |       | 
Websphere          | PaaS       |App    |x      |x      |x      |x      |        |       | 
Websphere          | xPaaS      |App    |       |       |       |       |x       |       | 
HAProxy            | Contenidor |-      |       |       |x      |       |x       |       |Balanceig de contenidors arrencats amb docker-compose a Bluemix 
Java               | Contenidor |-      |       |       |x      |       |x       |       | 
JBoss              | PaaS       |App    |x      |x      |x      |x      |        |       | 
JBoss              | xPaaS      |App    |       |       |x      |       |        |       | 
.Net               | PaaS       |App    |x      |x      |x      |x      |        |       | 
.Net               | xPaaS      |App    |       |       |       |       |x       |x      | 
NodeJS             | xPaaS      |App    |       |       |x      |       |x       |       | 
NodeJS             | Contenidor |App    |       |       |x      |       |x       |       | 
PHP                | PaaS       |App    |x      |       |       |       |        |       |    
PHP                | xPaaS      |App    |       |       |x      |       |x       |       |    
PHP                | Contenidor |App    |       |       |x      |       |x       |       |    
OracleDB           | PaaS       |DB     |x      |x      |x      |x      |        |       |    
MySQL              | PaaS       |DB     |x      |x      |x      |x      |        |       |    
MySQL              | Contenidor |DB     |       |       |x      |       |x       |       |    
MySQL              | DBaaS      |DB     |       |       |       |       |x       |       |Beta    
SQLServer          | PaaS       |DB     |x      |x      |x      |x      |        |       |    
SQLServer          | DBaaS      |DB     |       |       |       |       |        |x      | 
MongoDB            | DBaaS      |DB     |       |       |       |       |x       |       |    
MongoDB            | PaaS       |DB     |x      |       |       |x      |        |       |Adhoc. En definició
PostgreSQL         | Contenidor |DB     |       |       |x      |       |x       |       |    
PostgreSQL         | DBaaS      |DB     |       |       |       |       |x       |       |    
ElasticSearch      | DBaaS      |DB     |       |       |       |       |x       |       |    
Contenidors a mida | Contenidor |-      |       |       |x      |       |x       |       |
Màquines virtuals  | IaaS       |-      |x      |x      |x      |x      |        |x      |  


Llegenda "Tipus":

- **PaaS**: a CPD privat és un middleware pre-aprovisionat on es pot deixar codi o demanar configuració per al seu correcte funcionament. Talles prefixades. Escalat manual.
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
	table tr:nth-child(2) th:nth-child(3), 
	table tr:nth-child(2) th:nth-child(7), 
	table tr:nth-child(2) th:nth-child(9),
	table tr td:nth-child(3), 
	table tr td:nth-child(7), 
	table tr td:nth-child(9){
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
	            this.api().columns().every( function () {
	                var column = this;
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
	            $("<tr><th colspan='3'></th><th colspan='4'>Privat</th><th colspan='2'>Públic</th><th colspan='1'></th></tr>").insertBefore($("table thead tr"));
	        }	        
    	});
	});
</script>

 