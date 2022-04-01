+++
date        = "2022-03-17"
title       = "Catàleg Cloud"
description = "Catàleg Cloud v2"
sections    = "Cataleg Cloud"
weight	    = 3
estandards =  ["cataleg cloud"]
+++

# Catàleg Cloud del CTTI
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.18/css/jquery.dataTables.min.css">
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/responsive/2.2.2/css/responsive.dataTables.min.css">
<link rel="stylesheet" type="text/css" href="https://canigo.ctti.gencat.cat/drafts/catalegCloud/tableStyle.css">
<script type="text/javascript" language="javascript" src="https://code.jquery.com/jquery-3.3.1.js"></script>
<script type="text/javascript" language="javascript" src="https://cdn.datatables.net/1.10.18/js/jquery.dataTables.min.js"></script>
<script type="text/javascript" language="javascript" src="https://cdn.datatables.net/responsive/2.2.2/js/dataTables.responsive.min.js"></script>
---

# **Taula de Continguts** {#TaulaContiguts}

1. [Productes Middleware] (#ProductesMiddleware)
2. [Informació CPDs] (#InformacióCPDs)

---

<table id="Revisio" class="display" style="width:50%" align="center">
    <thead>
        <tr>
            <th>Darrera revisió realitzada</th>
            <th>Revisió de Catàleg Cloud vigent fins</th>
        </tr>
        <tr>
            <td>febrer de 2022 </td>
            <td>juny de 2022</td>
        </tr>
    </thead>
</table>

## **Productes Middleware** {#ProductesMiddleware}

<table id="catalegCloud" class="display" style="width:100%">
    <thead>
        <tr style="vertical-align: middle; font-size: 16px">
            <th></th>
            <th>Grup de Tecnologies</th>
            <th>Producte</th>
        </tr>
    </thead>
</table>

<script>
function ventanaSecundaria(URL){
    if (URL == 1)
        window.open("./catalegCloud/CPD1Swarm.html","ventana1","width=500,height=300,scrollbars=NO")
    else if (URL == 2)
        window.open("./catalegCloud/CPD1KuberMe.html","ventana1","width=500,height=300,scrollbars=NO")
    else if (URL == 3)
        window.open("./catalegCloud/CPD2KuberMe.html","ventana1","width=500,height=300,scrollbars=NO")
    else if (URL == 4)
        window.open("./catalegCloud/CPD2Openshift.html","ventana1","width=500,height=300,scrollbars=NO")
    else if (URL == 5)
        window.open("./catalegCloud/CPD3Openshift.html","ventana1","width=500,height=300,scrollbars=NO")
    else 
        window.open("./catalegCloud/CPD4Openshift.html","ventana1","width=500,height=300,scrollbars=NO")    
}
// Funció que dona format a la taula interna del Full de Ruta de CPD
function formatCPD(d) {
    // `d` is the original data object for the row
    return '<table cellpadding="7" cellspacing="1" style="padding-left:50px;border-collapse:collapse;width:100%">'+
        '<tr>'+
            '<th colspan="7" style="font-size: 16px;"><strong>CLOUD PRIVAT</strong></th>'+
        '</tr>'+
        '<tr>'+
            '<th width="16%" style="font-size: 14px;">CPD</th>'+
            '<th colspan="2" width="21%" style="font-size: 14px;"><div align="center">CPD1</div></th>'+
            '<th colspan="2" width="21%" style="font-size: 14px;"><div align="center">CPD2</div></th>'+
            '<th width="21%" style="font-size: 14px;"><div align="center">CPD3</div></th>'+
            '<th width="21%" style="font-size: 14px;"><div align="center">CPD4</div></th>'+
        '</tr>'+
        '<tr>'+
            '<th style="font-size: 14px;">Plataforma</th>'+
            '<td align="center"><a href="#CPD1Swarm"><img src="../catalegCloud/swarm.png" width="24" alt="Swarm"></a></td>'+
            '<td align="center"><a href="#CPD1KuberMe"><img src="../catalegCloud/kubernetes.png" width="24" alt="Kubernetes"></a></td>'+
            '<td align="center"><a href="#CPD2KuberMe"><img src="../catalegCloud/kubernetes.png" width="24" alt="Kubernetes"></a></td>'+
            '<td align="center"><a href="#CPD2Openshift"><img src="../catalegCloud/openShift.png" width="24" alt="Openshift"></a></td>'+
            '<td align="center"><a href="#CPD3Openshift"><img src="../catalegCloud/openShift.png" width="24" alt="Openshift"></a></td>'+
            '<td align="center"><a href="#CPD4Openshift"><img src="../catalegCloud/openShift.png" width="24"></a></td>'+
        '</tr>'+
        '<tr>'+
            '<th style="border: 1px solid rgb(165, 165, 165); font-size: 14px;">Model de Servei</th>'+
            '<td align="center">'+d.cpd1swarm+'</td>'+
            '<td align="center">'+d.cpd1kubernetes+'</td>'+
            '<td align="center">'+d.cpd2kubernetes+'</td>'+
            '<td align="center">'+d.cpd2openshift+'</td>'+
            '<td align="center">'+d.cpd3openshift+'</td>'+
            '<td align="center">'+d.cpd4openshift+'</td>'+
        '</tr>'+      
	    '<tr>'+
            '<th style="font-size: 14px;">Imatges del Catàleg Cloud</th>'+
            '<td colspan="7">'+d.imatgescatalegcloud+'</td>'+
        '</tr>'+
        '<tr>'+
            '<th style="font-size: 14px;">Observacions:</th>'+
            '<td colspan="7">'+d.observacions+'</td>'+
        '</tr>'+
        '</table>'+
        '<table cellpadding="7" cellspacing="1" style="padding-left:50px;border-collapse:collapse;width:100%">'+
        '<tr>'+
            '<th colspan="5" style="font-size: 16px;"><strong>CLOUD PÚBLIC</strong></th>'+
        '</tr>'+
        '<tr>'+
            '<th width="16%" style="font-size: 14px;">Plataforma</th>'+
            '<th width="21%" style="font-size: 14px;"><div align="center">Compose</div></th>'+
            '<th width="21%" style="font-size: 14px;"><div align="center">IBM Cloud</div></th>'+
            '<th width="21%" style="font-size: 14px;"><div align="center">Azure</div></th>'+
            '<th width="21%" style="font-size: 14px;"><div align="center">AWS</div></th>'+
        '</tr>'+
        '<tr>'+
            '<th style="border: 1px solid rgb(165, 165, 165); font-size: 14px;">Model de Servei</th>'+
            '<td style="border: 1px solid rgb(165, 165, 165);">'+d.compose+'</td>'+
            '<td style="border: 1px solid rgb(165, 165, 165);">'+d.ibmcloud+'</td>'+ 
            '<td style="border: 1px solid rgb(165, 165, 165);">'+d.azuregestionat+'</td>'+
            '<td style="border: 1px solid rgb(165, 165, 165);">'+d.aws+'</td>'+
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
	            "width": "45%" },
            {   "data": "producte", 
	            "className":      'intern',
	            "width": "45%" },          
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

## **Informació CPDs** {#InformacióCPDs}

<table id="tallesCPDs" cellpadding="7" cellspacing="1" style="padding-left:50px;border-collapse:collapse;width:70%">
    <thead>
        <tr style="vertical-align: middle; font-size: 20px; text-align: center">
            <th colspan="13">Detalls CPDs i plataformes de contenidors</th>
        </tr>
    </thead>
    <tr>
        <td style="font-size: 16px; widht: 20%"><strong>CPD1</strong></td>
        <td>
            <table id="CPD1Swarm" cellpadding="7" cellspacing="1" style="padding-left:50px;border-collapse:collapse;width:100%">
                <thead>
                    <tr>                    
                        <th colspan="13" style="vertical-align: middle; text-align: center; font-size: 16px"><img src="../catalegCloud/swarm.png" width="24" height="24" alt="Swarm"> Swarm</td>
                    <tr>
                </thead>
                <tr style="vertical-align: middle; text-align: center">
                    <td rowspan="3" style="font-size: 14px; text-align: center"><strong>Talles</strong></td>
                    <td colspan="3" style="font-size: 14px; text-align: center"><strong>S</strong></td>
                    <td colspan="3" style="font-size: 14px; text-align: center"><strong>M</strong></td>
                    <td colspan="3" style="font-size: 14px; text-align: center"><strong>L</strong></td>
                    <td colspan="3" style="font-size: 14px; text-align: center"><strong>XL</strong></td>
                </tr>
                <tr style="vertical-align: middle; text-align: center">
                    <th>RAM (MB)</th>
                    <th>CPU (milicores)</th>
                    <th>DISC (GB)</th>
                    <th>RAM (MB)</th>
                    <th>CPU (milicores)</th>
                    <th>DISC (GB)</th>
                    <th>RAM (MB)</th>
                    <th>CPU (milicores)</th>
                    <th>DISC (GB)</th>
                    <th>RAM (MB)</th>
                    <th>CPU (milicores)</th>
                    <th>DISC (GB)</th>
                </tr>
                <tr style="vertical-align: middle; text-align: center">
                    <td>512</td>
                    <td>500</td>
                    <td>10</td>
                    <td>1024</td>
                    <td>1000</td>
                    <td>10</td>
                    <td>2048</td>
                    <td>1500</td>
                    <td>10</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                </tr>
                <tr style="vertical-align: middle; text-align: center">
                    <td rowspan="2" style="font-size: 14px; text-align: center"><strong>Serveis</strong></td>
                    <th colspan="3" style="text-align: center"><strong>Versió</strong></th>
                    <th colspan="3" style="text-align: center"><strong>Logs</strong></th>
                    <th colspan="3" style="text-align: center"><strong>Mètriques</strong></th>
                    <th colspan="3" style="text-align: center"><strong>Service Mesh</strong></th>
                </tr>
                <tr style="vertical-align: middle; text-align: center">                    
                    <td colspan="3">Docker 18.9</td>
                    <td colspan="3"><img src="../catalegCloud/kibana.png" width="24" height="24" alt="kibana"></td>
                    <td colspan="3"><img src="../catalegCloud/grafana.png" width="24" height="24" alt="grafana"></td>
                    <td colspan="3"> - </td>
                </tr>
                <tr>
                    <td style="font-size: 14px; text-align: center"><strong>Comentaris</strong></td>
                    <td colspan="12">SwarmMe no pot fer servir els templates de Prometheus i Grafana</td>
                </tr>
            </table>
            <table id="CPD1KuberMe" cellpadding="7" cellspacing="1" style="padding-left:50px;border-collapse:collapse;width:100%">
                <thead>
                    <tr>                    
                        <th colspan="13" style="vertical-align: middle; text-align: center; font-size: 16px"><img src="../catalegCloud/kubernetes.png" width="24" height="24" alt="KuberMe"> KuberMe</td>
                    <tr>
                </thead>
                <tr style="vertical-align: middle; text-align: center">
                    <td rowspan="3" style="font-size: 14px; text-align: center"><strong>Talles</strong></td>
                    <td colspan="3" style="font-size: 14px; text-align: center"><strong>S</strong></td>
                    <td colspan="3" style="font-size: 14px; text-align: center"><strong>M</strong></td>
                    <td colspan="3" style="font-size: 14px; text-align: center"><strong>L</strong></td>
                    <td colspan="3" style="font-size: 14px; text-align: center"><strong>XL</strong></td>
                </tr>
                <tr style="vertical-align: middle; text-align: center">
                    <th>RAM (MB)</th>
                    <th>CPU (milicores)</th>
                    <th>DISC (GB)</th>
                    <th>RAM (MB)</th>
                    <th>CPU (milicores)</th>
                    <th>DISC (GB)</th>
                    <th>RAM (MB)</th>
                    <th>CPU (milicores)</th>
                    <th>DISC (GB)</th>
                    <th>RAM (MB)</th>
                    <th>CPU (milicores)</th>
                    <th>DISC (GB)</th>
                </tr>
                <tr style="vertical-align: middle; text-align: center">
                    <td>512</td>
                    <td>500</td>
                    <td>10</td>
                    <td>1024</td>
                    <td>1000</td>
                    <td>10</td>
                    <td>2048</td>
                    <td>1500</td>
                    <td>10</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                </tr>
                <tr style="vertical-align: middle; text-align: center">
                    <td rowspan="2" style="font-size: 14px; text-align: center"><strong>Serveis</strong></td>
                    <th colspan="3" style="text-align: center"><strong>Versió</strong></th>
                    <th colspan="3" style="text-align: center"><strong>Logs</strong></th>
                    <th colspan="3" style="text-align: center"><strong>Mètriques</strong></th>
                    <th colspan="3" style="text-align: center"><strong>Service Mesh</strong></th>
                </tr>
                <tr style="vertical-align: middle; text-align: center">                    
                    <td colspan="3">Kubernetes 1.18.10</td>
                    <td colspan="3"><img src="../catalegCloud/kibana.png" width="24" height="24" alt="kibana"></td>
                    <td colspan="3"><img src="../catalegCloud/grafana.png" width="24" height="24" alt="grafana"></td>
                    <td colspan="3"> - </td>
                </tr>
                <tr>
                    <td style="font-size: 14px; text-align: center"><strong>Comentaris</strong></td>
                    <td colspan="12"></td>
                </tr>
            </table>
        </td>               
    </tr>
    <tr>
        <td style="font-size: 16px; widht: 20%"><strong>CPD2</strong></td>
        <td>
            <table id="CPD2KuberMe" cellpadding="7" cellspacing="1" style="padding-left:50px;border-collapse:collapse;width:100%">
                <thead>
                    <tr>                    
                        <th colspan="13" style="vertical-align: middle; text-align: center; font-size: 16px"><img src="../catalegCloud/kubernetes.png" width="24" height="24" alt="KuberMe"> KuberMe</td>
                    <tr>
                </thead>
                <tr style="vertical-align: middle; text-align: center">
                    <td rowspan="3" style="font-size: 14px; text-align: center"><strong>Talles</strong></td>
                    <td colspan="3" style="font-size: 14px; text-align: center"><strong>S</strong></td>
                    <td colspan="3" style="font-size: 14px; text-align: center"><strong>M</strong></td>
                    <td colspan="3" style="font-size: 14px; text-align: center"><strong>L</strong></td>
                    <td colspan="3" style="font-size: 14px; text-align: center"><strong>XL</strong></td>
                </tr>
                <tr style="vertical-align: middle; text-align: center">
                    <th>RAM (MB)</th>
                    <th>CPU (milicores)</th>
                    <th>DISC (GB)</th>
                    <th>RAM (MB)</th>
                    <th>CPU (milicores)</th>
                    <th>DISC (GB)</th>
                    <th>RAM (MB)</th>
                    <th>CPU (milicores)</th>
                    <th>DISC (GB)</th>
                    <th>RAM (MB)</th>
                    <th>CPU (milicores)</th>
                    <th>DISC (GB)</th>
                </tr>
                <tr style="vertical-align: middle; text-align: center">
                    <td>256</td>
                    <td>62</td>
                    <td>*</td>
                    <td>512</td>
                    <td>125</td>
                    <td>*</td>
                    <td>1024</td>
                    <td>250</td>
                    <td>*</td>
                    <td>2048</td>
                    <td>500</td>
                    <td>*</td>
                </tr>
                <tr style="vertical-align: middle; text-align: center">
                    <td rowspan="2" style="font-size: 14px; text-align: center"><strong>Serveis</strong></td>
                    <th colspan="3" style="text-align: center"><strong>Versió</strong></th>
                    <th colspan="3" style="text-align: center"><strong>Logs</strong></th>
                    <th colspan="3" style="text-align: center"><strong>Mètriques</strong></th>
                    <th colspan="3" style="text-align: center"><strong>Service Mesh</strong></th>
                </tr>
                <tr style="vertical-align: middle; text-align: center">                    
                    <td colspan="3">Kubernetes 1.18.10</td>
                    <td colspan="3"><img src="../catalegCloud/kibana.png" width="24" height="24" alt="kibana"></td>
                    <td colspan="3"><img src="../catalegCloud/grafana.png" width="24" height="24" alt="grafana"></td>
                    <td colspan="3"> - </td>
                </tr>
                <tr>
                    <td style="font-size: 14px; text-align: center"><strong>Comentaris</strong></td>
                    <td colspan="12">A CPD2 no hi ha límit d'espai de disc temporal</td>
                </tr>
            </table>
            <table id="CPD2Openshift" cellpadding="7" cellspacing="1" style="padding-left:50px;border-collapse:collapse;width:100%">
                <thead>
                    <tr>                    
                        <th colspan="13" style="vertical-align: middle; text-align: center; font-size: 16px"><img src="../catalegCloud/openShift.png" width="24" height="24" alt="Openshift"> Openshift</td>
                    <tr>
                </thead>
                <tr style="vertical-align: middle; text-align: center">
                    <td rowspan="3" style="font-size: 14px; text-align: center"><strong>Talles</strong></td>
                    <td colspan="3" style="font-size: 14px; text-align: center"><strong>S</strong></td>
                    <td colspan="3" style="font-size: 14px; text-align: center"><strong>M</strong></td>
                    <td colspan="3" style="font-size: 14px; text-align: center"><strong>L</strong></td>
                    <td colspan="3" style="font-size: 14px; text-align: center"><strong>XL</strong></td>
                </tr>
                <tr style="vertical-align: middle; text-align: center">
                    <th>RAM (MB)</th>
                    <th>CPU (milicores)</th>
                    <th>DISC (GB)</th>
                    <th>RAM (MB)</th>
                    <th>CPU (milicores)</th>
                    <th>DISC (GB)</th>
                    <th>RAM (MB)</th>
                    <th>CPU (milicores)</th>
                    <th>DISC (GB)</th>
                    <th>RAM (MB)</th>
                    <th>CPU (milicores)</th>
                    <th>DISC (GB)</th>
                </tr>
                <tr style="vertical-align: middle; text-align: center">
                    <td>256</td>
                    <td>62</td>
                    <td>*</td>
                    <td>512</td>
                    <td>125</td>
                    <td>*</td>
                    <td>1024</td>
                    <td>250</td>
                    <td>*</td>
                    <td>2048</td>
                    <td>500</td>
                    <td>*</td>
                </tr>
                <tr style="vertical-align: middle; text-align: center">
                    <td rowspan="2" style="font-size: 14px; text-align: center"><strong>Serveis</strong></td>
                    <th colspan="3" style="text-align: center"><strong>Versió</strong></th>
                    <th colspan="3" style="text-align: center"><strong>Logs</strong></th>
                    <th colspan="3" style="text-align: center"><strong>Mètriques</strong></th>
                    <th colspan="3" style="text-align: center"><strong>Service Mesh</strong></th>
                </tr>
                <tr style="vertical-align: middle; text-align: center">                    
                    <td colspan="3">Openshift 4.6</td>
                    <td colspan="3"><img src="../catalegCloud/kibana.png" width="24" height="24" alt="kibana"></td>
                    <td colspan="3"><img src="../catalegCloud/grafana.png" width="24" height="24" alt="grafana"></td>
                    <td colspan="3"> - </td>
                </tr>
                <tr>
                    <td style="font-size: 14px; text-align: center"><strong>Comentaris</strong></td>
                    <td colspan="12">A CPD2 no hi ha límit d'espai de disc temporal</td>
                </tr>
            </table>
        </td>               
    </tr>
    <tr>
        <td style="font-size: 16px; widht: 20%"><strong>CPD3</strong></td>
        <td>
            <table id="CPD3Openshift" cellpadding="7" cellspacing="1" style="padding-left:50px;border-collapse:collapse;width:100%">
                <thead>
                    <tr>                    
                        <th colspan="13" style="vertical-align: middle; text-align: center; font-size: 16px"><img src="../catalegCloud/openShift.png" width="24" height="24" alt="Openshift"> Openshift</td>
                    <tr>
                </thead>
                <tr style="vertical-align: middle; text-align: center">
                    <td rowspan="3" style="font-size: 14px; text-align: center"><strong>Talles</strong></td>
                    <td colspan="3" style="font-size: 14px; text-align: center"><strong>S</strong></td>
                    <td colspan="3" style="font-size: 14px; text-align: center"><strong>M</strong></td>
                    <td colspan="3" style="font-size: 14px; text-align: center"><strong>L</strong></td>
                    <td colspan="3" style="font-size: 14px; text-align: center"><strong>XL</strong></td>
                </tr>
                <tr style="vertical-align: middle; text-align: center">
                    <th>RAM (MB)</th>
                    <th>CPU (milicores)</th>
                    <th>DISC (GB)</th>
                    <th>RAM (MB)</th>
                    <th>CPU (milicores)</th>
                    <th>DISC (GB)</th>
                    <th>RAM (MB)</th>
                    <th>CPU (milicores)</th>
                    <th>DISC (GB)</th>
                    <th>RAM (MB)</th>
                    <th>CPU (milicores)</th>
                    <th>DISC (GB)</th>
                </tr>
                <tr style="vertical-align: middle; text-align: center">
                    <td>256</td>
                    <td>250</td>
                    <td>1</td>
                    <td>512</td>
                    <td>500</td>
                    <td>2</td>
                    <td>1024</td>
                    <td>1000</td>
                    <td>4</td>
                    <td>2048</td>
                    <td>2000</td>
                    <td>8</td>
                </tr>
                <tr style="vertical-align: middle; text-align: center">
                    <td rowspan="2" style="font-size: 14px; text-align: center"><strong>Serveis</strong></td>
                    <th colspan="3" style="text-align: center"><strong>Versió</strong></th>
                    <th colspan="3" style="text-align: center"><strong>Logs</strong></th>
                    <th colspan="3" style="text-align: center"><strong>Mètriques</strong></th>
                    <th colspan="3" style="text-align: center"><strong>Service Mesh</strong></th>
                </tr>
                <tr style="vertical-align: middle; text-align: center">                    
                    <td colspan="3">Openshift 4.6</td>
                    <td colspan="3"><img src="../catalegCloud/kibana.png" width="24" height="24" alt="kibana"></td>
                    <td colspan="3"></td>
                    <td colspan="3"><img src="../catalegCloud/istio.png" width="24" height="24" alt="istio"></td>
                </tr>
                <tr>
                    <td style="font-size: 14px; text-align: center"><strong>Comentaris</strong></td>
                    <td colspan="12"></td>
                </tr>
            </table>
        </td>               
    </tr>
    <tr>
        <td style="font-size: 16px; widht: 20%"><strong>CPD4</strong></td>
        <td>
            <table id="CPD4Openshift" cellpadding="7" cellspacing="1" style="padding-left:50px;border-collapse:collapse;width:100%">
                <thead>
                    <tr>                    
                        <th colspan="13" style="vertical-align: middle; text-align: center; font-size: 16px"><img src="../catalegCloud/openShift.png" width="24" height="24" alt="Openshift"> Openshift</td>
                    <tr>
                </thead>
                <tr style="vertical-align: middle; text-align: center">
                    <td rowspan="3" style="font-size: 14px; text-align: center"><strong>Talles</strong></td>
                    <td colspan="3" style="font-size: 14px; text-align: center"><strong>S</strong></td>
                    <td colspan="3" style="font-size: 14px; text-align: center"><strong>M</strong></td>
                    <td colspan="3" style="font-size: 14px; text-align: center"><strong>L</strong></td>
                    <td colspan="3" style="font-size: 14px; text-align: center"><strong>XL</strong></td>
                </tr>
                <tr style="vertical-align: middle; text-align: center">
                    <th>RAM (MB)</th>
                    <th>CPU (milicores)</th>
                    <th>DISC (GB)</th>
                    <th>RAM (MB)</th>
                    <th>CPU (milicores)</th>
                    <th>DISC (GB)</th>
                    <th>RAM (MB)</th>
                    <th>CPU (milicores)</th>
                    <th>DISC (GB)</th>
                    <th>RAM (MB)</th>
                    <th>CPU (milicores)</th>
                    <th>DISC (GB)</th>
                </tr>
                <tr style="vertical-align: middle; text-align: center">
                    <td>256</td>
                    <td>250</td>
                    <td>*</td>
                    <td>512</td>
                    <td>500</td>
                    <td>*</td>
                    <td>1024</td>
                    <td>1000</td>
                    <td>*</td>
                    <td>2048</td>
                    <td>2000</td>
                    <td>*</td>
                </tr>
                <tr style="vertical-align: middle; text-align: center">
                    <td rowspan="2" style="font-size: 14px; text-align: center"><strong>Serveis</strong></td>
                    <th colspan="3" style="text-align: center"><strong>Versió</strong></th>
                    <th colspan="3" style="text-align: center"><strong>Logs</strong></th>
                    <th colspan="3" style="text-align: center"><strong>Mètriques</strong></th>
                    <th colspan="3" style="text-align: center"><strong>Service Mesh</strong></th>
                </tr>
                <tr style="vertical-align: middle; text-align: center">                    
                    <td colspan="3">Openshift 4.6</td>
                    <td colspan="3"><img src="../catalegCloud/kibana.png" width="24" height="24" alt="kibana"></td>
                    <td colspan="3"></td>
                    <td colspan="3"><img src="../catalegCloud/istio.png" width="24" height="24" alt="istio"></td>
                </tr>
                <tr>
                    <td style="font-size: 14px; text-align: center"><strong>Comentaris</strong></td>
                    <td colspan="12">Es defineixen 10 GB en d'espai total de disc per al namespace</td>
                </tr>
            </table>
        </td>               
    </tr>
</table>

#### Definició dels tipus de serveis a cloud

- **xPaaS**: És un entorn d’execució que s’arrenca en el moment de fer el push de l’artefacte que volem fer córrer. No hi ha pre-aprovisionament. Talles flexibles. Escalat automàtic.
- **Contenidor**: Artefacte de software que inclou totes les dependències necessàries per a dur a terme la seva funció i és portable entre clouds que els suportin (Docker)
- **DBaaS**: Base de dades com a servei, és un subtipus de xPaaS. Escala automàticament.
- **PaaS**: Plataforma de programari oferta al nuvol que inclou el middleware administrat.
- **IaaS**: Màquines virtuals a cloud, on s’aprovisiona inclouen el sistema operatiu administrat i s'instal·la a sobre el programari personalitzat que es demani.
