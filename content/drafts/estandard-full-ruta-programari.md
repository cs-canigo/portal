+++
date        = "2017-07-28"
title       = "Estàndard pel full de ruta del programari"
description = "Estàndard pel full de ruta del programari"
weight		= 3
type = "estandard"
toc         = true
versio      = "1.0"
responsable = "Unitat d'arquitectura"
estandards =  ["programari"]
codi = "35.080.03"

+++

 Producte                    |  Categoria | Obsolet | Suportat | Versió actual CTTI | En Roadmap CTTI | Emergent
 ---------------------       |:-------:| :--------:|:----------:|:--------------------:|:-----------------:|:--------:                 
 Windows estació de treball  | Sistemes operatius LLT | XP, Vista, 7 | 8.1 | 8.1 | 10 | --
 Windows tauleta | Sistemes operatius LLT  | XP, Vista, 7 | 8.1 | 8.1 | 10 | --
 Branques Windows 10 | Sistemes operatius LLT  | 1507 (Inicial) | 1511, 1607, 1703,1709 | 1709 | 1803 | 1809
 MS Office estació de treball | Eines ofimàtiques    | 2003, 2007, 2010 | 2013, 2016               | 2016     | -- | 2019 
| MS Office tauleta            | Eines ofimàtiques    |2003, 2007, 2010  | 2013, 2016               | 2016     | -- | 2019 
| Openoffice                   | Eines ofimàtiques    | 3.3, 3.4, 4.0    | 4.1.x| 4.1.3    | -- | -- 
| LibreOffice                  | Eines ofimàtiques    | 5.0, 5.1, 5.2, 5.3  | 5.4       | 5.4.6    | -- | 6.0 
| Internet Explorer | Navegadors Web    | 6, 7, 8, 9, 10 | 11               | 11                 | -- | --
| Microsoft Edge    | Navegadors Web    | 1507 (Inicial) | 1511, 1607, 1703, 1709 | 1709 | 1803| 1809
| Mozilla Firefox   | Navegadors Web    | 48, 49           | 52               | 59                 | --              | 60    
| Google Chrome     | Navegadors Web    | 53, 54       | 59             | 65               | 66            | 67  
| Content Manager | Mainframe i AS400    | <= V5R2                | V5R3                  | V5R3               | --              | --       | 
| DB2 (AS400)     | Mainframe i AS400    | <= V5R4, V6R1          | V7R1(7.1), V7R2(7.2)            | V7R2               | V7R3            | --       | 
| Iseries         | Mainframe i AS400    | <= V5R4, V6R1          | V7R1(7.1), V7R2(7.2)            | V7R2               | V7R3            | --       | 
| z/OS            | Mainframe i AS400    | 1.x                    | 2.1                   | 2.1                | 2.2             | 2.3       | 
| DB2 (HOST)      | Mainframe i AS400    | 8.1, 9                 | 10.2,11.x, 12.1       | 12.1               | --              | 12.2     | 
| CA IDMS Server  | Mainframe i AS400    | 16                     | 18                    | 19                 | --              | --       | 
| CICS            | Mainframe i AS400    | 3.2                    | 5.2, 5.3              | 5.3                | 5.4             | --      | 
| SNA Server      | Mainframe i AS400    | SNA Server 4, HIS 2000 | HIS 2010, 2013, 2016  | HIS 2016           | --              | --       | 
| Oracle / Oracle RAC         | Bases de dades      |9i, 10g, 11.1, 11.2      | 12.1, 12.2    |12.2      | --              | 18c                        | x        | Enterprise                       | 
| MySql Database              | Bases de dades      | 4, 5.0, 5.1, 5.5, 5,6  | 5.7                | 5.7                | --              | --                       | x        | Community                        | 
| SqlServer                   | Bases de dades     |2000, 2005, 2008, 2012  |2014, 2016        | 2016               | --              | 2017                      | x        | Standard                         | 
| PostgreSQL                  | Bases de dades     | 7.x, 8.x, 9.0, 9.1, 9.2  | 9.3, 9.4, 9.5, 9.6 | 9.6                | 10             | --                        |          |                                | 
| MongoDB                     | Bases de dades     | 2.2, 2.4, 2.6, 3.0 | 3.2, 3.4           | 3.4 | 3.6             | --                        |          | Community                        | 
| Redis                       | Bases de dades     | < 3.0, 3.0  | 3.2                | 3.2                | --             | 4.0                        |          | Community                        | 
| MariaDB                     | Bases de dades     | <= 5.3    | 5.5, 10.0, 10.1        | 10.1               | 10.2           | 10.3                        |          | Community                        | 
| Tomcat                          | Servidors aplicacions              | 5.0, 5.5, 6.0                         |  7.0, 8.0               | 8.0                | --              | 9.0                        | x        | JBoss EWS 3.0                  | 
| WebLogic                        | Servidors aplicacions              | 8.1, 9.2, 10.2, 12.1.x                        | 11g (10.3.x), 12.2.x    | 12.2.x                    | --                        | --                        | x        | Premier                          | 
| WebSphere                       | Servidors aplicacions              | 4.0, 5.1,6.1, 7.0, 8.0                 | 8.5, 9.0      | 9.0                | --              | --                        |          |                                  | 
| Microsoft                       | Servidors aplicacions              | "DNA COM+, < .NET 3.5                 | 3.5 SP1,  4.5.x,  4.6.x, 4.7 | 4.7              | --         | --                          | x        | Versió distribuïda amb SO |        
| Jboss EAP                       | Servidors aplicacions              | 4.3, 5.x                              | 6.x, 7.x                  | 7.x                | --              | --                       | x        | EAP                              | 
| PHP                             | Servidors aplicacions              | 4.x, 5.1, 5.3, 5.4, 5.5               | 5.6,7.0,7.1                 | 7.1                | --              | 7.2                       | x        | RHEL / Software Collections 2.2  | 
| JDK                             | Servidors aplicacions              | 1.4, 1.5, 1.6                              |  1.7, 1.8            | 1.8                | --              | --                       |          |                                  | 
| Node.js                         | Servidors aplicacions              | 0.10, 0.12, 4.x, 5.x                                   | 6.x, 8.x                  | 8.x                | --              | 10.x                        |          | LTS                              | 
| Apache                          | Servidors Web           | 1.3, 2.0, 2.2                              |  2.4             | 2.4                | --              | --                        | x        | RHEL / Software Collections 2.2  | 
| IIS                             | Servidors Web           | 4.0, 5.0, 6.0                         | 7.0, 7.5, 8.0, 8.5, 10   | 10                | --              | --                        | x        | Versió distribuïda amb SO        | 
| Nginx                           | Servidors Web           | 1.8                                    |  1.10, 1.12                    | 1.12                | --              | --                        |          | Software Collections 2.1         | 
| IHS                             | Servidors Web           | 4.0, 5.1, 6.1 , 7.0.x, 8.0.x  | 8.5.x, 9.0.x      | 9.0.x               | --             | --                        |          |                                  | 

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

} );
</script>
