+++
date        = "2022-02-10"
title       = "Catàleg Cloud CTTI"
description = "Catàleg Cloud CTTI"
sections    = "Cloud"
weight      = 3
categories  = ["Cloud","Cataleg Cloud","Catàleg Cloud"]
+++



## Part 1: Abast

## Part 2: Referències 

## Part 3: Termes i definicions
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.18/css/jquery.dataTables.min.css">
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/responsive/2.2.2/css/responsive.dataTables.min.css">
<link rel="stylesheet" type="text/css" href="https://canigo.ctti.gencat.cat/drafts/FullRuta20/tableStyle.css">
<script type="text/javascript" language="javascript" src="https://code.jquery.com/jquery-3.3.1.js"></script>
<script type="text/javascript" language="javascript" src="https://cdn.datatables.net/1.10.18/js/jquery.dataTables.min.js"></script>
<script type="text/javascript" language="javascript" src="https://cdn.datatables.net/responsive/2.2.2/js/dataTables.responsive.min.js"></script>

<table id="Revisio" class="display" style="width:50%" align="center">
    <thead>
        <tr>
            <th>Darrera revisió realitzada</th>
            <th>Catàleg Cloud vigent fins</th>
        </tr>
        <tr>
            <td>febrer de 2022</td>
            <td>juny de 2022</td>
        </tr>
    </thead>
</table>

<table id="CatalegCLOUD" class="display" style="width:100%">
    <thead>
        <tr>
            <th>Cloud</th>
            <th>Plataforma</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2">
                <table>
                    <thead>
                        <tr>
                            <th>Cloud Privat</th>                        
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>CPD1</th>                        
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>CPD1</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>                           
                        </tr>
                        <tr>
                            <td>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>CPD2</th>                        
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>CPD2</td>                          
                                        </tr>
                                    </tbody>
                                </table>
                            </td>                            
                        </tr>
                        <tr>
                            <td>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>CPD3</th>                        
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>CPD3</td>                        
                                        </tr>
                                    </tbody>
                                </table>
                            </td>                            
                        </tr>
                        <tr>
                            <td>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>CPD4</th>                        
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>CPD4</td>                          
                                        </tr>
                                    </tbody>
                                </table>
                            </td>                           
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        <tr>
            <td colspan="2">
                <table>
                    <thead>
                        <tr>
                            <th>Cloud Públic</th>                        
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Azure</th>                        
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Azure</td>                          
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>

<script>
$(document).ready(function() {
    var taulaCloudPrivat = $('#CloudPrivat').DataTable( {
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
        "ajax": "../FullRuta20/inventariCPD.json",
        "columns": [
            {
                "className":      'details-control',
                "orderable":      false,
                "data":           null,
                "defaultContent": '',
	        "width": "10%"
            },
            { "data": "categoria",
	      "width": "30%" },
            { "data": "producte", 
	      "className":      'intern',
	      "width": "30%"
	    },
            { "data": "obsolet",
	      "width": "20%" },
            { "data": "suportat",
	      "width": "80%" },
            { "data": "versioactual",
	      "className":      'intern',
	      "width": "80%"
	    },
            { "data": "roadmap",
	      "width": "100%" },
            { "data": "emergent",
	      "width": "100%" }
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
    $('#CloudPrivat tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = taulaCloudPrivat.row( tr );
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
