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

## Part 2: Referències 

## Part 3: Termes i definicions

## Part 4: Requisits del programari

# ANNEX A (normatiu) Catàleg Cloud del CTTI
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.18/css/jquery.dataTables.min.css">
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/responsive/2.2.2/css/responsive.dataTables.min.css">
<link rel="stylesheet" type="text/css" href="https://canigo.ctti.gencat.cat/drafts/catalegCloud/tableStyle.css">
<script type="text/javascript" language="javascript" src="https://code.jquery.com/jquery-3.3.1.js"></script>
<script type="text/javascript" language="javascript" src="https://cdn.datatables.net/1.10.18/js/jquery.dataTables.min.js"></script>
<script type="text/javascript" language="javascript" src="https://cdn.datatables.net/responsive/2.2.2/js/dataTables.responsive.min.js"></script>


<font size="20">
<table id="Titol_CPD" class="display" style="width:100%">
        <thead>
	    <tr>
            <th  colspan="8" align="center" style="font-weight:bold">Programari estandarditzat per Servidors</th>
        </tr>
 </thead>
</table>
</font>

<table id="Revisio" class="display" style="width:50%" align="center">
<thead>
<tr>
<th>Darrera revisió realitzada</th>
<th>Revisió de full de ruta vigent fins</th>
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
            '<th width="16%">CPD</th>'+
            '<th colspan="2" width="21%"><div align="center">CPD1</div></th>'+
            '<th colspan="2" width="21%"><div align="center">CPD2</div></th>'+
            '<th width="21%"><div align="center">CPD3</div></th>'+
            '<th width="21%"><div align="center">CPD4</div></th>'+
        '</tr>'+
        '<tr>'+
            '<th>Plataforma</th>'+
            '<td align="center"><img src="../catalegCloud/swarm.png" width="20"></td>'+
            '<td align="center"><img src="../catalegCloud/kubernetes.png" width="20"></td>'+
            '<td align="center"><img src="../catalegCloud/kubernetes.png" width="20"></td>'+
            '<td align="center"><img src="../catalegCloud/openShift.png" width="20"></td>'+
            '<td align="center"><img src="../catalegCloud/openShift.png" width="20"><img src="../catalegCloud/istio.png" height="20"></td>'+
            '<td align="center"><img src="../catalegCloud/openShift.png" width="20"><img src="../catalegCloud/istio.png" height="20"></td>'+
        '</tr>'+
        '<tr>'+
            '<th style="border: 1px solid rgb(165, 165, 165);">Cloud Privat</th>'+
            '<td align="center">'+d.cpd1swarm+'</td>'+
            '<td align="center">'+d.cpd1kubernetes+'</td>'+
            '<td align="center">'+d.cpd2kubernetes+'</td>'+
            '<td align="center">'+d.cpd2openshift+'</td>'+
            '<td align="center">'+d.cpd3openshift+'</td>'+
            '<td align="center">'+d.cpd4openshift+'</td>'+
        '</tr>'+
        '<tr>'+
            '<th style="border: 1px solid rgb(165, 165, 165);">Talles</th>'+
            '<td>'+
                '<table class="talles">'+
                    '<tr align="center">'+
                        '<th colspan="3"><strong><div class="a">S</div></strong></th>'+
                        '<th colspan="3"><strong><div class="a">M</div></strong></th>'+
                        '<th colspan="3"><strong><div class="a">L</div></strong></th>'+
                        '<th colspan="3"><strong><div class="a">XL</div></strong></th>'+
                    '</tr>'+
                    '<tr align="center">'+
                        '<td><strong><div class="a">RAM</div></strong></th>'+
                        '<td><strong><div class="a">CPU</div></strong></th>'+
                        '<td><strong><div class="a">DISC</div></strong></th>'+
                        '<td><strong><div class="a">RAM</div></strong></th>'+
                        '<td><strong><div class="a">CPU</div></strong></th>'+
                        '<td><strong><div class="a">DISC</div></strong></th>'+
                        '<td><strong><div class="a">RAM</div></strong></th>'+
                        '<td><strong><div class="a">CPU</div></strong></th>'+
                        '<td><strong><div class="a">DISC</div></strong></th>'+
                        '<td><strong><div class="a">RAM</div></strong></th>'+
                        '<td><strong><div class="a">CPU</div></strong></th>'+
                        '<td><strong><div class="a">DISC</div></strong></th>'+
                    '</tr>'+
                    '<tr align="center">'+
                        '<td><div class="a">512</div></td>'+
                        '<td><div class="a">500</div></td>'+
                        '<td><div class="a">10</div></td>'+
                        '<td><div class="a">1024</div></td>'+
                        '<td><div class="a">1000</div></td>'+
                        '<td><div class="a">10</div></td>'+
                        '<td><div class="a">2048</div></td>'+
                        '<td><div class="a">1500</div></td>'+
                        '<td><div class="a">10</div></td>'+
                        '<td><div class="a">-</div></td>'+
                        '<td><div class="a">-</div></td>'+
                        '<td><div class="a">-</div></td>'+
                    '</tr>'+
                '</table>'+
            '</td>'+
            '<td>'+
                '<table class="talles">'+
                    '<tr align="center">'+
                        '<th colspan="3"><strong>S</strong></th>'+
                        '<th colspan="3"><strong>M</strong></th>'+
                        '<th colspan="3"><strong>L</strong></th>'+
                        '<th colspan="3"><strong>XL</strong></th>'+
                    '</tr>'+
                    '<tr align="center">'+
                        '<td><strong>RAM</strong></th>'+
                        '<td><strong>CPU</strong></th>'+
                        '<td><strong>DISC</strong></th>'+
                        '<td><strong>RAM</strong></th>'+
                        '<td><strong>CPU</strong></th>'+
                        '<td><strong>DISC</strong></th>'+
                        '<td><strong>RAM</strong></th>'+
                        '<td><strong>CPU</strong></th>'+
                        '<td><strong>DISC</strong></th>'+
                        '<td><strong>RAM</strong></th>'+
                        '<td><strong>CPU</strong></th>'+
                        '<td><strong>DISC</strong></th>'+
                    '</tr>'+
                    '<tr align="center">'+
                        '<td>256</td>'+
                        '<td>250</td>'+
                        '<td>4</td>'+
                        '<td>512</td>'+
                        '<td>500</td>'+
                        '<td>4</td>'+
                        '<td>1024</td>'+
                        '<td>1000</td>'+
                        '<td>4</td>'+
                        '<td>2048</td>'+
                        '<td>2000</td>'+
                        '<td>4</td>'+
                    '</tr>'+
                '</table>'+
            '</td>'+
            '<td>'+
                '<table class="talles">'+
                    '<tr align="center">'+
                        '<th colspan="3"><strong>S</strong></th>'+
                        '<th colspan="3"><strong>M</strong></th>'+
                        '<th colspan="3"><strong>L</strong></th>'+
                        '<th colspan="3"><strong>XL</strong></th>'+
                    '</tr>'+
                    '<tr align="center">'+
                        '<td><strong>RAM</strong></th>'+
                        '<td><strong>CPU</strong></th>'+
                        '<td><strong>DISC</strong></th>'+
                        '<td><strong>RAM</strong></th>'+
                        '<td><strong>CPU</strong></th>'+
                        '<td><strong>DISC</strong></th>'+
                        '<td><strong>RAM</strong></th>'+
                        '<td><strong>CPU</strong></th>'+
                        '<td><strong>DISC</strong></th>'+
                        '<td><strong>RAM</strong></th>'+
                        '<td><strong>CPU</strong></th>'+
                        '<td><strong>DISC</strong></th>'+
                    '</tr>'+
                    '<tr align="center">'+
                        '<td>256</td>'+
                        '<td>62</td>'+
                        '<td>*</td>'+
                        '<td>521</td>'+
                        '<td>125</td>'+
                        '<td>*</td>'+
                        '<td>1024</td>'+
                        '<td>250</td>'+
                        '<td>*</td>'+
                        '<td>2048</td>'+
                        '<td>500</td>'+
                        '<td>*</td>'+
                    '</tr>'+
                '</table>'+
            '</td>'+
            '<td>'+
                '<table class="talles">'+
                    '<tr align="center">'+
                        '<th colspan="3"><strong>S</strong></th>'+
                        '<th colspan="3"><strong>M</strong></th>'+
                        '<th colspan="3"><strong>L</strong></th>'+
                        '<th colspan="3"><strong>XL</strong></th>'+
                    '</tr>'+
                    '<tr align="center">'+
                        '<td><strong>RAM</strong></th>'+
                        '<td><strong>CPU</strong></th>'+
                        '<td><strong>DISC</strong></th>'+
                        '<td><strong>RAM</strong></th>'+
                        '<td><strong>CPU</strong></th>'+
                        '<td><strong>DISC</strong></th>'+
                        '<td><strong>RAM</strong></th>'+
                        '<td><strong>CPU</strong></th>'+
                        '<td><strong>DISC</strong></th>'+
                        '<td><strong>RAM</strong></th>'+
                        '<td><strong>CPU</strong></th>'+
                        '<td><strong>DISC</strong></th>'+
                    '</tr>'+
                    '<tr align="center">'+
                        '<td>256</td>'+
                        '<td>62</td>'+
                        '<td>*</td>'+
                        '<td>521</td>'+
                        '<td>125</td>'+
                        '<td>*</td>'+
                        '<td>1024</td>'+
                        '<td>250</td>'+
                        '<td>*</td>'+
                        '<td>2048</td>'+
                        '<td>500</td>'+
                        '<td>*</td>'+
                    '</tr>'+
                '</table>'+
            '</td>'+
            '<td>'+
                '<table class="talles">'+
                    '<tr align="center">'+
                        '<th colspan="3"><strong>S</strong></th>'+
                        '<th colspan="3"><strong>M</strong></th>'+
                        '<th colspan="3"><strong>L</strong></th>'+
                        '<th colspan="3"><strong>XL</strong></th>'+
                    '</tr>'+
                    '<tr align="center">'+
                        '<td><strong>RAM</strong></th>'+
                        '<td><strong>CPU</strong></th>'+
                        '<td><strong>DISC</strong></th>'+
                        '<td><strong>RAM</strong></th>'+
                        '<td><strong>CPU</strong></th>'+
                        '<td><strong>DISC</strong></th>'+
                        '<td><strong>RAM</strong></th>'+
                        '<td><strong>CPU</strong></th>'+
                        '<td><strong>DISC</strong></th>'+
                        '<td><strong>RAM</strong></th>'+
                        '<td><strong>CPU</strong></th>'+
                        '<td><strong>DISC</strong></th>'+
                    '</tr>'+
                    '<tr align="center">'+
                        '<td>256</td>'+
                        '<td>250</td>'+
                        '<td>1</td>'+
                        '<td>512</td>'+
                        '<td>500</td>'+
                        '<td>2</td>'+
                        '<td>1024</td>'+
                        '<td>1000</td>'+
                        '<td>4</td>'+
                        '<td>2048</td>'+
                        '<td>2000</td>'+
                        '<td>8</td>'+
                    '</tr>'+
                '</table>'+
            '</td>'+
            '<td>'+
                '<table class="talles">'+
                    '<tr align="center">'+
                        '<th colspan="3"><strong>S</strong></th>'+
                        '<th colspan="3"><strong>M</strong></th>'+
                        '<th colspan="3"><strong>L</strong></th>'+
                        '<th colspan="3"><strong>XL</strong></th>'+
                    '</tr>'+
                    '<tr align="center">'+
                        '<td><strong>RAM</strong></th>'+
                        '<td><strong>CPU</strong></th>'+
                        '<td><strong>DISC</strong></th>'+
                        '<td><strong>RAM</strong></th>'+
                        '<td><strong>CPU</strong></th>'+
                        '<td><strong>DISC</strong></th>'+
                        '<td><strong>RAM</strong></th>'+
                        '<td><strong>CPU</strong></th>'+
                        '<td><strong>DISC</strong></th>'+
                        '<td><strong>RAM</strong></th>'+
                        '<td><strong>CPU</strong></th>'+
                        '<td><strong>DISC</strong></th>'+
                    '</tr>'+
                    '<tr align="center">'+
                        '<td>256</td>'+
                        '<td>250</td>'+
                        '<td>1</td>'+
                        '<td>512</td>'+
                        '<td>500</td>'+
                        '<td>2</td>'+
                        '<td>1024</td>'+
                        '<td>1000</td>'+
                        '<td>4</td>'+
                        '<td>2048</td>'+
                        '<td>2000</td>'+
                        '<td>8</td>'+
                    '</tr>'+
                '</table>'+
            '</td>'+
        '</tr>'+      
	    '<tr>'+
            '<th>Imatges del Catàleg Cloud</th>'+
            '<td colspan="7">'+d.imatgescatalegcloud+'</td>'+
        '</tr>'+
        '<tr>'+
            '<th width="16%">Plataforma</th>'+
            '<th colspan="2" width="21%"><div align="center">Compose</div></th>'+
            '<th colspan="2" width="21%"><div align="center">IBM Cloud</div></th>'+
            '<th width="21%"><div align="center">Azure</div></th>'+
            '<th width="21%"><div align="center">AWS</div></th>'+
        '</tr>'+
        '<tr>'+
            '<th style="border: 1px solid rgb(165, 165, 165);">Cloud Public</th>'+
            '<td colspan="2" style="border: 1px solid rgb(165, 165, 165);">'+d.compose+'</td>'+
            '<td colspan="2" style="border: 1px solid rgb(165, 165, 165);">'+d.ibmcloud+'</td>'+ 
            '<td style="border: 1px solid rgb(165, 165, 165);">'+d.azuregestionat+'</td>'+
            '<td style="border: 1px solid rgb(165, 165, 165);">'+d.aws+'</td>'+
        '</tr>'+
        '<tr>'+
	        '<th>   </th>'+
	        '<th colspan="7">   </th>'+
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

### Descripció de la informació proporcionada a la taula de programari estandarditzat de CPD

A la taula de programari estandarditzat de CPD es proporciona informació respecte a les versions de programari o tecnologia i la seva <a href='{{<relref "#maduresa" >}}'>maduresa</a>, a més a la taula desplegable es pot trobar informació addicional respecte a la prestació dels serveis oferts per cada un dels CPDs per la tecnologia seleccionada, així com informació respecte a si és desplegable de forma automàtica des del SIC.

#### Definició dels tipus de serveis a cloud

- **xPaaS**: És un entorn d’execució que s’arrenca en el moment de fer el push de l’artefacte que volem fer córrer. No hi ha pre-aprovisionament. Talles flexibles. Escalat automàtic.
- **Contenidor**: Artefacte de software que inclou totes les dependències necessàries per a dur a terme la seva funció i és portable entre clouds que els suportin (Docker)
- **DBaaS**: Base de dades com a servei, és un subtipus de xPaaS. Escala automàticament.
- **PaaS**: Plataforma de programari oferta al nuvol que inclou el middleware administrat.
- **IaaS**: Màquines virtuals a cloud, on s’aprovisiona inclouen el sistema operatiu administrat i s'instal·la a sobre el programari personalitzat que es demani.
