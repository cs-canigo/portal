+++
date        = "2018-09-13"
title       = "Full de Ruta test 1"
description = "Full de Ruta"
weight		= 3
type = "estandard"
toc         = true
versio      = "1.0"
responsable = "Unitat d'arquitectura"
estandards =  ["programari"]
codi = "35.080.03"

+++

# ANNEX A (normatiu) Programari estandarditzat
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
                <td>1 de Maig de 2018 </td>
                <td>1 de Setembre de 2018</td> 
             </tr>
        </thead>
</table>
## Programari estandarditzat lloc de treball

<table id="FullRutaLLT" class="display" style="width:100%">
        <thead>
            <tr>
                <th></th>
                <th>Producte</th>
                <th>Grup de Tecnologies</th>
                <th>Obsolet</th>
                <th>Suportat</th>
                <th>Versió Actual</th>
                <th>En Roadmap</th>
                <th>Emergent</th>
            </tr>
        </thead>
</table>
## Programari estandarditzat CPD

<table id="FullRutaCPD" class="display" style="width:100%">
        <thead>
            <tr>
                <th></th>
                <th>Producte</th>
                <th>Grup de Tecnologies</th>
                <th>Obsolet</th>
                <th>Suportat</th>
                <th>Versió Actual</th>
                <th>En Roadmap</th>
                <th>Emergent</th>
            </tr>
        </thead>
</table>

<script>
// Funció que dona format a la taula interna del Full de Ruta de Lloc de Treball
function formatLLT(d) {
    return '<table cellpadding="7" cellspacing="1" style="padding-left:50px;border-collapse:collapse;width:100%">'+
        '<tr>'+
            '<th>Versions per Lot </th>'+
            '<th width="300">LT2A</th>'+
            '<th width="300">LT2B</th>'+
            '<th width="300">LT2C</th>'+
        '</tr>'+
        '<tr>'+
            '<th style="border: 1px solid rgb(165, 165, 165);">Versions disponibles</th>'+
            '<td>'+d.lt2a+'</td>'+
            '<td>'+d.lt2b+'</td>'+
            '<td>'+d.lt2c+'</td>'+
        '</tr>'+
        '<tr>'+
	        '<th>   </th>'+
	        '<th  colspan="3">   </th>'+
	    '</tr>'+
	    '<tr>'+
            '<th>Observacions:</th>'+
            '<td colspan="3">'+d.observacions+'</td>'+
        '</tr>'+
    '</table>';
}
$(document).ready(function() {
    var taulaFullRutaLLT = $('#FullRutaLLT').DataTable( {
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
        "ajax": "../FullRuta20/inventariLLT.json",
        "columns": [
            {
                "className":      'details-control',
                "orderable":      false,
                "data":           null,
                "defaultContent": '',
	        "width": "20%"
            },
            { "data": "producte", 
	      "className":      'intern',
	      "width": "50%"
	    },
            { "data": "categoria",
	      "width": "90%" },
            { "data": "obsolet",
	      "width": "100%" },
            { "data": "suportat",
	      "width": "100%" },
            { "data": "versioactual",
	      "className":      'intern',
	      "width": "80%"
	    },
            { "data": "roadmap",
	      "width": "50%" },
            { "data": "emergent",
	      "width": "50%" }
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
    $('#FullRutaLLT tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = taulaFullRutaLLT.row( tr );
        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child( formatLLT(row.data()) ).show();
            tr.addClass('shown');
        }
    });
});
// Funció que dona format a la taula interna del Full de Ruta de CPD
function formatCPD(d) {
    // `d` is the original data object for the row
    return '<table cellpadding="7" cellspacing="1" style="padding-left:50px;border-collapse:collapse;width:100%">'+
        '<tr>'+
            '<th>Tipus Serveis i versions </th>'+
            '<th width="300">CPD1</th>'+
            '<th width="300">CPD2</th>'+
            '<th width="300">CPD3</th>'+
            '<th width="300">CPD4</th>'+
            '<th width="300">Bluemix</th>'+
            '<th width="300">Azure</th>'+
        '</tr>'+
        '<tr>'+
            '<th style="border: 1px solid rgb(165, 165, 165);">Cloud Privat</th>'+
            '<td>'+d.cpd1v1+'</td>'+
            '<td>'+d.cpd2v1+'</td>'+
            '<td>'+d.cpd3v1+'</td>'+
            '<td>'+d.cpd4v1+'</td>'+
            '<td>'+d.bluemixv1+'</td>'+
            '<td>'+d.azurev1+'</td>'+
        '</tr>'+
        '<tr>'+
            '<th style="border: 1px solid rgb(165, 165, 165);">Container Cloud</th>'+
            '<td style="border: 1px solid rgb(165, 165, 165);">'+d.cpd1v2+'</td>'+
            '<td style="border: 1px solid rgb(165, 165, 165);">'+d.cpd2v2+'</td>'+
            '<td style="border: 1px solid rgb(165, 165, 165);">'+d.cpd3v2+'</td>'+
            '<td style="border: 1px solid rgb(165, 165, 165);">'+d.cpd4v2+'</td>'+
            '<td style="border: 1px solid rgb(165, 165, 165);">'+d.bluemixv2+'</td>'+
            '<td style="border: 1px solid rgb(165, 165, 165);">'+d.azurev2+'</td>'+
        '</tr>'+
        '<tr>'+
	        '<th>   </th>'+
	        '<th  colspan="6">   </th>'+
	    '</tr>'+
	    '<tr>'+
            '<th >Desplegable al SIC</th>'+
            '<td colspan="6">'+d.desplegablesicv1+'</td>'+
        '</tr>'+
        '<tr>'+
            '<th>Observacions:</th>'+
            '<td colspan="6">'+d.observacions+'</td>'+
        '</tr>'+
    '</table>';
}
$(document).ready(function() {
    var taulaFullRutaCPD = $('#FullRutaCPD').DataTable( {
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
        "ajax": "../FullRuta20/inventariv3.json",
        "columns": [
            {
                "className":      'details-control',
                "orderable":      false,
                "data":           null,
                "defaultContent": '',
	        "width": "20%"
            },
            { "data": "producte", 
	      "className":      'intern',
	      "width": "50%"
	    },
            { "data": "categoria",
	      "width": "90%" },
            { "data": "obsolet",
	      "width": "100%" },
            { "data": "suportat",
	      "width": "100%" },
            { "data": "versioactual",
	      "className":      'intern',
	      "width": "80%"
	    },
            { "data": "roadmap",
	      "width": "50%" },
            { "data": "emergent",
	      "width": "50%" }
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
    $('#FullRutaCPD tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = taulaFullRutaCPD.row( tr );
        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child( formatCPD(row.data()) ).show();
            tr.addClass('shown');
        }
    });
});
</script>

 
