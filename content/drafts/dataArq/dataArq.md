+++
date        = "2017-09-23"
title       = "Radar CTTI"
description = "Radar tecnològic del CTTI"
sections    = ["Radar"]
categories  = ["radar"]
weight= 5
+++

- El Radar CTTI és un manera visual de definir els canvis que pensem que actualment són interessants en el desenvolupament de programari: coses que estem rebent en les revisions d'arquitectura i altres que creiem que s'hauria de prestar atenció i considerar l'ús en els projectes que es fan per a la Generalitat. A diferència del **[Full de Ruta](https://qualitat.solucions.gencat.cat/estandards/estandard-full-ruta-programari/).**, només reflecteix l'opinió d'un grup d'arquitectes, basada en el nostre treball i experiències quotidianes. Encara que pensem que és interessant, no s'ha de considerar una anàlisi profunda del mercat, ni un posicionament explícit sobre les eines, tècniques, plataformes o llenguatges que hi surten.

El Radar CTTI està basat en codi alliberat per **[Thoughtworks](https://www.thoughtworks.com/radar).** 

<table id="Titol_CPD" class="display" style="width:100%">
        <thead>
	    <tr>
                <th  colspan="8" align="center" style="font-weight:bold">  Programari estandarditzat per Servidors</th>
            </tr>
 </thead>
</table>
</font>
<table id="FullRutaCPD" class="display" style="width:100%">
        <thead>
            <tr>
                <th></th>
                <th>Grup</th>
                <th>Entitat</th>
                <th>Data Actualització</th>
                <!--<th>Suportat</th>
                <th>Versió Actual CTTI</th>
                <th>En Roadmap</th>
                <th>Emergent</th>-->
            </tr>
        </thead>
</table>

<script>

// Funció que dona format a la taula interna del Full de Ruta de CPD
function formatCPD(d) {
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
            '<td colspan="13">'+d.cpd1v1+'</td>'+
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
        "ajax": "./json/entitats.json",
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
	      "width": "20%" }/*,
            { "data": "suportat",
	      "width": "80%" },
            { "data": "versioactual",
	      "className":      'intern',
	      "width": "80%"
	    },
            { "data": "roadmap",
	      "width": "100%" },
            { "data": "emergent",
	      "width": "100%" }*/
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
