+++
date        = "2018-05-28"
title       = "Full de Ruta 2.0 v3"
description = "Full de Ruta 2.0 v3"
weight		= 3
type = "estandard"
toc         = true
versio      = "1.0"
responsable = "Unitat d'arquitectura"
estandards =  ["programari"]
codi = "35.080.03"

+++

<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.16/css/jquery.dataTables.min.css">
<link rel="stylesheet" type="text/css" href="../tableStyle.css">
<script type="text/javascript" language="javascript" src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script type="text/javascript" language="javascript" src="https://cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js"></script>

<table id="FullRuta" class="display" style="width:100%">
        <thead>
            <tr>
                <th></th>
                <th>Producte</th>
                <th>Categoria</th>
                <th>Obsolet</th>
                <th>Suportat</th>
                <th>Versió Actual CTTI</th>
                <th>En Roadmap CTTI</th>
                <th>Emergent</th>
            </tr>
        </thead>
        <tfoot>
            <tr>
                <th></th>
                <th>Producte</th>
                <th>Categoria</th>
                <th>Obsolet</th>
                <th>Suportat</th>
                <th>Versió Actual CTTI</th>
                <th>En Roadmap CTTI</th>
                <th>Emergent</th>
            </tr>
        </tfoot>
</table>

<script>
// Formatting function for row details - modify as you need
function format(d) {
    // `d` is the original data object for the row
    return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
        '<tr class="intern">'+
            '<td>Tipus Infraestructura</td>'+
            '<td>CPDs ofereixen Producte</td>'+
            '<td>Versions vigents a CPDs</td>'+
                '<td>Observacions:</td>'+
        '</tr>'+
        '<tr>'+
            '<td>'+d.Tipus+'</td>'+
            '<td>'+d.CPDs+'</td>'+
            '<td>'+d.VersioActual+'</td>'+
                '<td>'+d.Observacions+'</td>'+
        '</tr>'+
    '</table>';
}
$(document).ready(function() {
    var taulaFullRuta = $('#FullRuta').DataTable( {
        "paging": false,
	    "info" : false,
	    "ordering": false,
    	"language":{
	        	"search" : "<strong>Cerca:</strong> ",
		        "infoEmpty": "No hi ha registres",
	        	"zeroRecords": "No s'han trobat registres"
        },
        "ajax": "../Inventari.txt",
        "columns": [
            {
                "className":      'details-control',
                "orderable":      false,
                "data":           null,
                "defaultContent": ''
            },
            { "data": "Producte" },
            { "data": "Categoria" },
            { "data": "Obsolet" },
            { "data": "Suportat" },
            { "data": "VersioActual" },
            { "data": "Roadmap" },
            { "data": "Emergent" }
        ],
        "order": [[1, 'asc']],
           "initComplete": function () {
            this.api().columns().every( function (col_index) {
                var column = this;
                if (col_index===0){
	                	$("<p>&nbsp;</p>").appendTo($(column.header()));
	                	return;
                }
                if (col_index===1){
	                	$("<p>producte</p>").appendTo($(column.header()));
	                	return;
                }

                var select = $('<select><option value=""></option></select>')
                    .appendTo( $(column.header()).empty() )
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
    $('#FullRuta tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = taulaFullRuta.row( tr );
        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child( format(row.data()) ).show();
            tr.addClass('shown');
        }
    });
});
</script>
