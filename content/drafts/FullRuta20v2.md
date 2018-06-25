+++
date        = "2018-05-25"
title       = "Full de Ruta 2.3"
description = "Full de Ruta 2.3"
weight		= 3
type = "estandard"
toc         = true
versio      = "1.0"
responsable = "Unitat d'arquitectura"
estandards =  ["programari"]
codi = "35.080.03"

+++

## Part 1: Abast


L’elevat volum de productes que estan desplegats als CPDs de la Generalitat de Catalunya i als seus
entorns de treball i la seva heterogeneïtat de versions fa que resulti cada cop més difícil mantenir
vigents les versions de programari de les diferents tecnologies..

Com a peça facilitadora, i amb la intenció de donar una visió de l’estat de l’art de cadascuna de les
tecnologies usades (o previstes d’usar) en els nous sistemes d’informació a desplegar s’ha elaborat el
full de ruta de versions de programari.

El full de ruta de versions de programari és un document que té com a objectiu **normalitzar i
racionalitzar el desplegament de tecnologies**, alhora que es concreta tant el ventall de productes
disponibles per a una determinada tecnologia, com la versió recomanada d’un programari concret. 

Per cadascuna de les tecnologies se’n proporciona:

- Una classificació bàsica del producte en funció del grau de coneixement i implantació de la
tecnologia.
- L’estat de maduresa del producte per facilitar la determinació tant de la versió a utilitzar en el
moment de la seva implantació com el grau d’obsolescència dels productes que estan
actualment en ús.


## Part 2: Referències 

## Part 3: Termes i definicions

##### Maduresa d'una tecnologia

La visió de la maduresa de la tecnologia consisteix en reflectir de forma objectiva el nivell de suport en què es troba una tecnologia concreta, tant si es tracta de versions que s’utilitzen des de fa temps com si es tracta de versions a utilitzar en un futur més o menys immediat.

Al full de ruta es presenta la maduresa des de dos punts de vista diferents:

- Des del punt de vista del grau de suport intern
- Des del punt de vista del grau de suport del fabricant de programari 

A l'annex <a href='{{<relref "#maduresa" >}}'>Maduresa d'una tecnologia</a> es recullen les diferents visions de maduresa incloses al full de ruta


##### Mètode de classificació

Per cada tecnologia inclosa en el full de ruta se li associen 2 valors:

- El **Grup de tecnologies** al que pertany (base de dades, gestió documental, sistema operatiu,
etc.)

## Part 4: Requisits del programari

1. Quan es defineixi la necessitat d'un nou programari **s'ha** d'usar el programari estandarditzat pel CTTI, segons les taules recollides a l'annex A l'annex <a href='{{<relref "#fullruta" >}}'>Programari estandarditzat</a>

1. Si un programari no es troba al full de ruta no vol dir ni que no es pugui utilitzar ni que no estigui subjecte als mateixos criteris d’obsolescència que la resta de productes. En cas de dubtes sobre algun programari podeu adreçar-vos a la Unitat d’Arquitectura Corportiva de CTTI.

1. Arran del dinamisme de les versions de les diferents tecnologies per part dels fabricants, el full de ruta ha de ser revisat quadrimestralment. D’aquesta forma cada full de ruta publicat contindrà les dates de la darrera revisió i validesa de la informació que conté.

# ANNEX A (normatiu) Programari estandarditzat
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.18/css/jquery.dataTables.min.css">
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/responsive/2.2.2/css/responsive.dataTables.min.css">
<link rel="stylesheet" type="text/css" href="https://canigo.ctti.gencat.cat/drafts/FullRuta20/tableStyle.css">
<script type="text/javascript" language="javascript" src="https://code.jquery.com/jquery-3.3.1.js"></script>
<script type="text/javascript" language="javascript" src="https://cdn.datatables.net/1.10.18/js/jquery.dataTables.min.js"></script>
<script type="text/javascript" language="javascript" src="https://cdn.datatables.net/responsive/2.2.2/js/dataTables.responsive.min.js"></script>

<table id="Revisio" class="display responsive nowrap" style="width:100%">
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
<table id="FullRuta" class="display responsive nowrap" style="width:100%">
        <thead>
            <tr>
                <th></th>
                <th>Producte</th>
                <th>Categoria</th>
                <th>Obsolet</th>
                <th>Suportat</th>
                <th>Versió Actual</th>
                <th>En Roadmap</th>
                <th>Emergent</th>
            </tr>
        </thead>
</table>

<script>
// Formatting function for row details - modify as you need
function format(d) {
    // `d` is the original data object for the row
    return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
        '<tr class="intern">'+
            '<td>Versions i Tipus Serveis CPD1</td>'+
            '<td>Versions i Tipus Serveis CPD2</td>'+
            '<td>Versions i Tipus Serveis CPD3</td>'+
            '<td>Versions i Tipus Serveis CPD4</td>'+
            '<td>Versions i Tipus Serveis Bluemix</td>'+
            '<td>Versions i Tipus Serveis Azure</td>'+
            '<td>Desplegable al SIC</td>'+
                '<td>Observacions:</td>'+
        '</tr>'+
        '<tr>'+
            '<td>'+d.cpd1v1+'</td>'+
            '<td>'+d.cpd2v1+'</td>'+
            '<td>'+d.cpd3v1+'</td>'+
            '<td>'+d.cpd4v1+'</td>'+
            '<td>'+d.bluemixv1+'</td>'+
            '<td>'+d.azurev1+'</td>'+
            '<td>'+d.desplegablesicv1+'</td>'+
                '<td>'+d.observacions+'</td>'+
        '</tr>'+
        '<tr>'+
        '<td>'+d.cpd1v2+'</td>'+
        '<td>'+d.cpd2v2+'</td>'+
        '<td>'+d.cpd3v2+'</td>'+
        '<td>'+d.cpd4v2+'</td>'+
        '<td>'+d.bluemixv2+'</td>'+
        '<td>'+d.azurev2+'</td>'+
        '<td>'+d.desplegablesicv2+'</td>'+
            '<td>'+d.observacions+'</td>'+
        '</tr>'+
    '</table>';
}
$(document).ready(function() {
    var taulaFullRuta = $('#FullRuta').DataTable( {
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
        "ajax": "../FullRuta20/inventariv2.json",
        "columns": [
            {
                "className":      'details-control',
                "orderable":      false,
                "data":           null,
                "defaultContent": '',
	            "width": "80%"
            },
            { "data": "producte" },
            { "data": "categoria" },
            { "data": "obsolet" },
            { "data": "suportat" },
            { "data": "versioactual" },
            { "data": "roadmap" },
            { "data": "emergent" }
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
