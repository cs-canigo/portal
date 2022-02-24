+++
date        = "2022-02-10"
title       = "Catàleg Cloud v2"
description = "Catàleg Cloud v2"
weight		= 3
type = "estandard"
toc         = true
versio      = "1.0"
responsable = "Unitat d'arquitectura"
estandards =  ["cataleg cloud"]

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

Per cada tecnologia inclosa en el full de ruta se li associa el **Grup de tecnologies** al que pertany (base de dades, gestió documental, sistema operatiu, etc.)

## Part 4: Requisits del programari

1. Quan es defineixi la necessitat d'un nou programari **s'ha d'usar el programari estandarditzat pel CTTI**, segons les taules recollides a l'annex A l'annex <a href='{{<relref "#fullruta" >}}'>Programari estandarditzat</a>

1. Si un programari no es troba al full de ruta no vol dir ni que no es pugui utilitzar ni que no estigui subjecte als mateixos criteris d’obsolescència que la resta de productes. En cas de dubtes sobre algun programari podeu adreçar-vos a la Unitat d’Arquitectura Corportiva de CTTI.

1. Arran del dinamisme de les versions de les diferents tecnologies per part dels fabricants, el full de ruta ha de ser revisat quadrimestralment. D’aquesta forma cada full de ruta publicat contindrà les dates de la darrera revisió i validesa de la informació que conté.

# ANNEX A (normatiu) Programari estandarditzat
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.18/css/jquery.dataTables.min.css">
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/responsive/2.2.2/css/responsive.dataTables.min.css">
<link rel="stylesheet" type="text/css" href="https://canigo.ctti.gencat.cat/drafts/FullRuta20/tableStyle.css">
<script type="text/javascript" language="javascript" src="https://code.jquery.com/jquery-3.3.1.js"></script>
<script type="text/javascript" language="javascript" src="https://cdn.datatables.net/1.10.18/js/jquery.dataTables.min.js"></script>
<script type="text/javascript" language="javascript" src="https://cdn.datatables.net/responsive/2.2.2/js/dataTables.responsive.min.js"></script>


<font size="20">
<table id="Titol_CPD" class="display" style="width:100%">
        <thead>
	    <tr>
                <th  colspan="8" align="center" style="font-weight:bold">  Programari estandarditzat per Servidors</th>
            </tr>
 </thead>
</table>
</font>

<table id="Revisio" class="display" style="width:50%" align="center">
<thead>
<tr>
<th>Darrera revisió realitzada</th>
<th> Revisió de full de ruta vigent fins</th>
</tr>
<tr>
<td>febrer de 2022 </td>
<td>juny de 2022</td>
</tr>
</thead>
</table>

<table id="catalegCloud" class="display" style="width:100%">
        <thead>
            <tr>
                <th></th>
                <th>Grup de Tecnologies</th>
                <th>Producte</th>
                <th>Versió</th>
            </tr>
        </thead>
</table>

<script>
// Funció que dona format a la taula interna del Full de Ruta de CPD
function formatCPD(d) {
    // `d` is the original data object for the row
    return '<table cellpadding="7" cellspacing="1" style="padding-left:50px;border-collapse:collapse;width:100%">'+
        '<tr>'+
            '<th>CPD</th>'+
            '<th colspan="2">CPD1</th>'+
            '<th colspan="2">CPD2</th>'+
            '<th>CPD3</th>'+
            '<th>CPD4</th>'+
        '</tr>'+
        '<tr>'+
            '<th>Plataforma</th>'+
            '<th>SwarmMe</th>'+
            '<th>Kubernetes</th>'+
            '<th>Kubernetes</th>'+
            '<th>Openshift</th>'+
            '<th>Openshift</th>'+
            '<th>Openshift</th>'+
        '</tr>'+
        '<tr>'+
            '<th style="border: 1px solid rgb(165, 165, 165);">Cloud Privat</th>'+
            '<td>'+d.cpd1swarm+'</td>'+
            '<td>'+d.cpd1kubernetes+'</td>'+
            '<td>'+d.cpd2kubernetes+'</td>'+
            '<td>'+d.cpd2openshift+'</td>'+
            '<td>'+d.cpd3openshift+'</td>'+
            '<td>'+d.cpd4openshift+'</td>'+
        '</tr>'+        
	    '<tr>'+
            '<th>Imatges del Catàleg Cloud</th>'+
            '<td colspan="7">'+d.imatgescatalegcloud+'</td>'+
        '</tr>'+
        '<tr>'+
            '<th>Plataforma</th>'+
            '<th colspan="2">Compose</th>'+
            '<th colspan="2">IBM Cloud</th>'+
            '<th colspan="2">Azure</th>'+
        '</tr>'+
        '<tr>'+
            '<th style="border: 1px solid rgb(165, 165, 165);">Cloud Public</th>'+
            '<td colspan="2" style="border: 1px solid rgb(165, 165, 165);">'+d.compose+'</td>'+
            '<td colspan="2" style="border: 1px solid rgb(165, 165, 165);">'+d.ibmcloud+'</td>'+ 
            '<td colspan="2" style="border: 1px solid rgb(165, 165, 165);">'+d.azuregestionat+'</td>'+
        '</tr>'+
        '<tr>'+
	        '<th>   </th>'+
	        '<th  colspan="7">   </th>'+
	    '</tr>'+
        '<tr>'+
            '<th>Observacions:</th>'+
            '<td colspan="7">'+d.observacions+'</td>'+
        '</tr>'+
    '</table>';
}
$(document).ready(function() {
    var taulaCatalegCloud = $('#catalegCloud').DataTable( {
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
        "ajax": "../catalegCloud/catalegCloud.json",
        "columns": [
            {   "className":      'details-control',
                "orderable":      false,
                "data":           null,
                "defaultContent": '',
	            "width": "10%" },
            {   "data": "categoria",
	            "width": "30%" },
            {   "data": "producte", 
	            "className":      'intern',
	            "width": "30%" },
            {   "data": "versio",
                "className":      'intern',
	        "width": "80%" },
            
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
    $('#catalegCloud tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = taulaCatalegCloud.row( tr );
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

\* DB2: Versió actual CTTI (DGP) es la 10, versió actual CTTI (Corporatiu) es la 8.

### Descripció de la informació proporcionada a la taula de programari estandarditzat de CPD

A la taula de programari estandarditzat de CPD es proporciona informació respecte a les versions de programari o tecnologia i la seva <a href='{{<relref "#maduresa" >}}'>maduresa</a>, a més a la taula desplegable es pot trobar informació addicional respecte a la prestació dels serveis oferts per cada un dels CPDs per la tecnologia seleccionada, així com informació respecte a si és desplegable de forma automàtica des del SIC.

#### Definició dels tipus de serveis a cloud

- **xPaaS**: És un entorn d’execució que s’arrenca en el moment de fer el push de l’artefacte que volem fer córrer. No hi ha pre-aprovisionament. Talles flexibles. Escalat automàtic.
- **Contenidor**: Artefacte de software que inclou totes les dependències necessàries per a dur a terme la seva funció i és portable entre clouds que els suportin (Docker)
- **DBaaS**: Base de dades com a servei, és un subtipus de xPaaS. Escala automàticament.
- **PaaS**: Plataforma de programari oferta al nuvol que inclou el middleware administrat.
- **IaaS**: Màquines virtuals a cloud, on s’aprovisiona inclouen el sistema operatiu administrat i s'instal·la a sobre el programari personalitzat que es demani.
