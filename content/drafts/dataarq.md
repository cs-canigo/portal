+++
date        = "2017-09-23"
title       = "Dade de Referència"
description = "Arquitectura de Dades de CTTI"
sections    = ["Data Architecture"]
categories  = ["Data Architecture"]
weight= 5
+++

- Representen conceptes que serveixen de referència transversal per a tota o part de l’organització. 
Les Dades Mestres es consideren les dades més acurades i rellevants disponibles sobre entitats clau de negoci emprades per establir el context de dades transaccionals i poden existir a múltiples llocs de l‘organització. 
	- Exemples: dades d’un ciutadà compartides entre Departaments. Catàleg de tràmits de la Generalitat de Catalunya dirigits a la ciutadania, l’empresa, els ens locals i les entitats.

- Són dades que defineixen els valors possibles que poden ser utilitzats per altres camps o conjunts de camps. Aquest tipus de dades aporten més valor contra més s’utilitzin arreu de l’organització.
Algunes Dades de Referència són:
	- CCAE (Classificació Catalana d'Activitats Econòmiques), que categoritzen les unitats productives, segons el tipus d'activitat que desenvolupin, per tal d'obtenir dades que permetin confeccionar estadístiques de rendibilitat o producció.
	- CNAE (Classificació Nacional d’Activitats Econòmiques). Similar al CCAE però d’àmbit estatal, l’objectiu del qual és establir la jerarquia d’activitats econòmiques d’utilitat per la implementació d’estadístiques estatals segons les activitats circumscrites. 


<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.18/css/jquery.dataTables.min.css">
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/responsive/2.2.2/css/responsive.dataTables.min.css">
<link rel="stylesheet" type="text/css" href="https://canigo.ctti.gencat.cat/drafts/FullRuta20/tableStyle.css">
<script type="text/javascript" language="javascript" src="https://code.jquery.com/jquery-3.3.1.js"></script>
<script type="text/javascript" language="javascript" src="https://cdn.datatables.net/1.10.18/js/jquery.dataTables.min.js"></script>
<script type="text/javascript" language="javascript" src="https://cdn.datatables.net/responsive/2.2.2/js/dataTables.responsive.min.js"></script>


<table id="Revisio" class="display" style="width:50%">
        <thead>
            <tr>
                <th>Darrera revisió realitzada</th>
                <th> Revisió de full de ruta vigent fins</th>
             </tr>
	     <tr>
                <td>febrer de 2019 </td>
                <td>juny de 2019</td> 
             </tr>
        </thead>
</table>


<table id="DataArq" class="display" style="width:100%">
        <thead>
            <tr>
                <th></th>
                <th>Grup</th>
                <th>Entitat</th>
                <th>Data Actualització</th>
            </tr>
        </thead>
</table>

<script>

// Funció que dona format a la taula interna del Full de Ruta de CPD
function formatDataArq(d) {
    // `d` is the original data object for the row
    return '<table cellpadding="7" cellspacing="1" style="padding-left:50px;border-collapse:collapse;width:100%">'+
        '<tr>'+
            '<th>Metadades</th>'+
            '<th width="100">Òrgan Responsable</th>'+
            '<th width="100">Òrgan propietari</th>'+
            '<th width="100">Origen</th>'+
            '<th width="100">Darrera Actualització</th>'+
            '<th width="100">Període Actualització</th>'+
            '<th width="100">Classificació funcional</th>'+
            '<th width="100">Agrupació temàtica</th>'+
            '<th width="100">Tipus</th>'+
            '<th width="100">Visibilitat</th>'+
            '<th width="100">Nivell de seguretat</th>'+
            '<th width="100">Nivell de qualitat</th>'+
            '<th width="100">Identificador, Nom i Descripció</th>'+
            '<th width="100">Download</th>'+
        '</tr>'+
        '<tr>'+
            '<th style="border: 1px solid rgb(165, 165, 165);"></th>'+
            '<td>'+d.responsable+'</td>'+
            '<td>'+d.propietari+'</td>'+
            '<td>'+d.origen+'</td>'+
            '<td>'+d.data_actualitzacio+'</td>'+
            '<td>'+d.periode_actualitzacio+'</td>'+
            '<td>'+d.clasificacio_funcional+'</td>'+
            '<td>'+d.agrupacio_tematica+'</td>'+
            '<td>'+d.tipus+'</td>'+
            '<td>'+d.visibilitat+'</td>'+
            '<td>'+d.nivell_seguretat+'</td>'+
            '<td>'+d.nivell_qualitat+'</td>'+
            '<td>'+d.identificador+'</td>'+
            '<td><a href="/entitats/'+ d.download +'" download>download</td>'+
        '</tr>'+
        '<tr>'+
            '<th >Definició</th>'+
            '<td colspan="13">'+d.definicio+'</td>'+
        '</tr>'+
    '</table>';
}
$(document).ready(function() {
    var taulaDataArq = $('#DataArq').DataTable( {
    "columnDefs": [
        { "width": "10%", "targets": 0 }
    ],
    "paging": false,
	"info" : false,
	"ordering": false,
	"responsive": {
            details: false
    	},
    	"language":{
	        	"search" : "<strong>Cerca:</strong> ",
		        "infoEmpty": "No hi ha registres",
	        	"zeroRecords": "No s'han trobat registres"
        },
        "ajax": "../dataarq/json/entitats.json",
        "columns": [
            {
                "className":      'details-control',
                "orderable":      false,
                "data":           null,
                "defaultContent": '',
	        "width": "10%"
            },
            { "data": "entitat",
	      "width": "30%" },
            { "data": "grup", 
	      "className":      'intern',
	      "width": "30%"
	    },
            { "data": "data_actualitzacio",
	      "width": "20%" }
        ],
        "order": [[1, 'asc']],
           "initComplete": function () {
            this.api().columns().every( function (col_index) {
                var column = this;
                if (col_index !==1 && col_index !==2){
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
                } );
            } );
        }
    });
     // Add event listener for opening and closing details
    $('#DataArq tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = taulaDataArq.row( tr );
        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child( formatDataArq(row.data()) ).show();
            tr.addClass('shown');
        }
    });
});
</script>
