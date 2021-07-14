+++
date        = "2021-07-14"
title       = "Dades de Referència Test Instancies 2"
description = "Arquitectura de Dades de CTTI"
sections    = ["Data Architecture"]
categories  = ["Data Architecture"]
weight= 5
+++

Les dades de referència són un tipus especial de dades orientades amb propòsits de classificació (codificacions i estàndards) o de suport a la gestió; en essència són codis que bàsicament transformen dades en informació significativa pel negoci. Utilitzar dades de referència entre sistemes d’una organització permet comunicar-se de manera efectiva, evitant la creació de diferents fonts d’informació inconsistents.

Coordinadament amb la Oficina d’Innovació i Administració Digital (OIAD), responsable d’impulsar, coordinar i desenvolupar el sistema de governança per gestionar les dades de l'Administració de la Generalitat, el CTTI posa a disposició de la Generalitat de Catalunya la primera versió del Catàleg Tècnic de Dades de Referència, avalat per la OIAD garantint que la informació publicada té un òrgan públic responsable del seu manteniment, unicitat, completesa qualitat i vigència.

En aquest sentit, el Catàleg Tècnic de Dades de Referència es divideix en dos grups:

<div style="width:100%; padding-left:30px">
a) Dades de Referència consolidades i avalades per l’OIAD que són d’obligat ús pels nous sistemes d’informació, i
<br/><br/>	
b) Dades de Referència que es troben en revisió per l’òrgan responsable, però que tot i no estar avalades, es poden utilitzar com a millor aproximació a la font de dades en qüestió. Aquestes entitats poden patir canvis estructurals o inclús ser rebutjades.
<br/><br/>
</div>

Per qualsevol dubte o aclariment podeu posar-vos en contacte amb l’Oficina de Gestió Tècnica de Dades CTTI a traves del correu electrònic: gtd.ctti@gencat.cat



<br/>
## Catàleg Tècnic de Dades
<br/>

Posem a disposició de les aplicacions el catàleg tècnic d’entitats de referència organitzades en els dos grups mencionats anteriorment:

- Dades de referència d’obligat compliment per les noves aplicacions

- Dades de referència pendents d’aprovació

En els llistats que es presenten a continuació, es visualitzen les metadades principals de les entitats de referència, sent possible accedir al detall d’aquestes.


<style>
.myButton {
  -moz-box-shadow: 0px 0px 0px -13px #9fb4f2;
  -webkit-box-shadow: 0px 0px 0px -13px #9fb4f2;
  box-shadow: 0px 0px 0px -13px #9fb4f2;
  background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #7892c2), color-stop(1, #476e9e));
  background:-moz-linear-gradient(top, #7892c2 5%, #476e9e 100%);
  background:-webkit-linear-gradient(top, #7892c2 5%, #476e9e 100%);
  background:-o-linear-gradient(top, #7892c2 5%, #476e9e 100%);
  background:-ms-linear-gradient(top, #7892c2 5%, #476e9e 100%);
  background:linear-gradient(to bottom, #7892c2 5%, #476e9e 100%);
  filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#7892c2', endColorstr='#476e9e',GradientType=0);
  background-color:#7892c2;
  -moz-border-radius:42px;
  -webkit-border-radius:42px;
  border-radius:42px;
  border:1px solid #4e6096;
  display:inline-block;
  cursor:pointer;
  color:#ffffff;
  font-family:Arial;
  font-size:12px;
  padding:0px 25px;
  text-decoration:none;
  text-shadow:0px 1px 0px #283966;
}
.myButton:hover {
  background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #476e9e), color-stop(1, #7892c2));
  background:-moz-linear-gradient(top, #476e9e 5%, #7892c2 100%);
  background:-webkit-linear-gradient(top, #476e9e 5%, #7892c2 100%);
  background:-o-linear-gradient(top, #476e9e 5%, #7892c2 100%);
  background:-ms-linear-gradient(top, #476e9e 5%, #7892c2 100%);
  background:linear-gradient(to bottom, #476e9e 5%, #7892c2 100%);
  filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#476e9e', endColorstr='#7892c2',GradientType=0);
  background-color:#476e9e;
}
.myButton:active {
  position:relative;
  top:1px;
}

td.details-control {
    background: url('../da/details_open.png') no-repeat center center;
    cursor: pointer;
	padding-left:15px;
	padding-right:15px;
}
tr.shown td.details-control {
    background: url('../da/details_close.png') no-repeat center center;
}

</style>


<script src="https://code.jquery.com/jquery-3.3.1.js" type="text/javascript"></script>
<script src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js" type="text/javascript"></script>

<script type="text/javascript">

	function format_LAA ( d ) {
	    var vRowInstancia;
		var vStyle;
        
		vRowInstancia='';
		for(var i=0,z=d.instancies.length;i<z;i++){
			vStyle='style="fontWeight:bold;color:red;"';
			if (d.instancies[i].iestat=="Activa")
			{
				vStyle='style="fontWeight:bold;color:green;"';
			}
			
			vRowInstancia=vRowInstancia+'<tr>'+
					'<td '+vStyle+'>'+d.instancies[i].inom+'</td>'+
					'<td '+vStyle+'>'+d.instancies[i].idescripcio+'</td>'+
					'<td '+vStyle+'>'+d.instancies[i].ipromotor+'</td>'+
                    '<td '+vStyle+'>'+d.instancies[i].iestat+'</td>'+
					'<td '+vStyle+'>'+d.instancies[i].idatapublicacio+'</td>'+
					'<td '+vStyle+'>'+d.instancies[i].idataobsoleta+'</td>'+
                    '<td style="text-align:center;"><button class="myButton">Detall</button></td>'+
				'</tr>';
		}
		
		return '<table cellpadding="7" cellspacing="0" border="0" style="padding-left:20px;font-size:12px;width:100%;">'+
			'<thead>'+
				'<tr>'+
					'<th>Nom</th>'+
					'<th style="width:30%">Descripcio</th>'+
					'<th>Promotor</th>'+
					'<th>Estat</th>'+
					'<th>Publicada</th>'+
					'<th>Substituïda</th>'+
					'<th></th>'+					
			    '</tr>'+
			'</thead>'+
			'<tbody>'+vRowInstancia+'</tbody>'+
		'</table>';
	}

  $(document).ready(function() {  

    var tcons =  $('#tabvalidades').DataTable( {
      "ajax": '../da/entitats_instancies_20210714.json',
	  "deferRender": true,
      "bFilter": true,
      "autoWidth": true,
      "scrollY": "450px",
      "scrollCollapse": true,
      "paging": false,
      "ordering": false,
      //"pageLength": 10,
      //"order": [[ 0, 'asc' ]],
      //"info":     false,
	  "language":{
                "search" : "<strong>Cerca:</strong> ",
                "infoEmpty": "No hi ha entitats",
                "zeroRecords": "No s'han trobat entitats",
                "infoFiltered":   "_END_ entitats",
                "info": ""
        },
	  "columns": [
			{
                "className":      'details-control',
                "orderable":      false,
                "data":           null,
                "defaultContent": ''
            },
            { "data": "Classificacio" },
			{ "data": "Ambit" },
			{ "data": "Nom" },
			{ "data": "Descripcio" },
            { "data": "Data_publicacio" },
            { "data": "Data_actualitzacio" }
		//	,{ "data": null }
           ],
      "columnDefs": [ 
	        {"targets": [ 1 ], "visible": false }
             ],
       "searchCols": [
                { null, "search": "Consolidat" }, null,  null, null, null, null
		  ]
      //     ],
      //"columnDefs": [ 
	  //       {"targets": -1, "data": null, "defaultContent": "<button class=\"myButton\">Detall</button>" }
	  // 		]
    } );
	
    $('#tabvalidades tbody').on('click', 'button', function () {
        //Obtenir l'index de la instancia a on s'ha fet el click per veure el detall;
	    var $tr = $(this).closest('tr');
	    var posicio = $tr.index();
        console.log("posicio: " + posicio);  //es mostra el resultat en el log - Debug

		
        //Obtenir tot l'element data son de l'entitat a on s'ha fet el click per veure el detall;
	    var data = tcons.row( $(this).parents('tr') ).data();
        data= tcons.row( $(this).parents('tr').prev() ).data();
        //alert( 'You clicked on '+data[0]+'\'s row' );
        console.log("data: "); //es mostra el resultat en el log - Debug
        console.log(data);         //es mostra el resultat en el log - Debug
		
		// Passem totes les dades de l'entitat i les instancies
        localStorage.setItem('data', JSON.stringify(data));
		// Passem la posicio de la instancia seleccionada
        localStorage.setItem('pos', posicio);

        window.location = "../da/detallrefdades_instancia_2";
    } );

    // Add event listener for opening and closing details
    $('#tabvalidades tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = tcons.row( tr );
 
        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child( format_LAA(row.data()) ).show();
            tr.addClass('shown');
        }
    } );
	
  
    $('.dataTables_filter').css('float','right');  
    $('.dataTables_filter').css('padding-right','20px');  
    $('.dataTables_filter').css('padding-bottom','10px');
	
	$('.dataTables_info').css('padding-top','20px'); 
	
    $('article table').css('margin','0');
    
});
</script>

<br/><br/>
####  Dades de referència d'obligat compliment

<div style="width:100%; padding-left:30px">
<table id="tabvalidades" class="hover" style="width:100%">
        <thead>
            <tr>
                <th></th>
                <th>Nivell Validació</th>
                <th>Grup</th>
                <th>Entitat</th>
                <th style="width:40%">Descripció</th>
                <th>Data publicació</th>
                <th>Darrera actualització</th>
            </tr>
        </thead>
    </table>

<br/><br/>
</div>


