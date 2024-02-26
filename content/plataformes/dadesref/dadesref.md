+++
date        = "2024-02-26"
title       = "Dades de Referència"
description = "Arquitectura de Dades de CTTI"
sections    = ["Data Architecture"]
categories  = ["Data Architecture"]
weight= 2
aliases = [
    "/dadesref/dadesref"
]
+++

Les dades de referència són un tipus especial de dades orientades amb propòsits de classificació (codificacions i estàndards) o de suport a la gestió; en essència són codis que bàsicament transformen dades en informació significativa pel negoci. Utilitzar dades de referència entre sistemes d’una organització permet comunicar-se de manera efectiva, evitant la creació de diferents fonts d’informació inconsistents.

Coordinadament amb la Direcció General d'Administració Digital (DGAD), responsable d’impulsar, coordinar i desenvolupar el sistema de governança per gestionar les dades de l'Administració de la Generalitat, el CTTI posa a disposició de la Generalitat de Catalunya la primera versió del Catàleg Tècnic de Dades de Referència, avalat per la DGAD garantint que la informació publicada té un òrgan públic responsable del seu manteniment, unicitat, completesa qualitat i vigència.

En aquest sentit, el Catàleg Tècnic de Dades de Referència es divideix en dos grups:

a) Dades de Referència consolidades i avalades per la DGAD que són d’obligat ús pels nous sistemes d’informació, i
<br/><br/>	
b) Dades de Referència que es troben en revisió per l’òrgan responsable, però que tot i no estar avalades, es poden utilitzar com a millor aproximació a la font de dades en qüestió. Aquestes entitats poden patir canvis estructurals o inclús ser rebutjades.
<br/><br/>

Per qualsevol dubte o aclariment podeu posar-vos en contacte amb l’Oficina de Gestió Tècnica de Dades CTTI a traves del correu electrònic: gtd.ctti@gencat.cat

## Catàleg Tècnic de Dades

Posem a disposició de les aplicacions el catàleg tècnic d’entitats de referència organitzades en els dos grups mencionats anteriorment:

- Dades de referència d’obligat compliment per les noves aplicacions

- Dades de referència pendents d’aprovació

En els llistats que es presenten a continuació, es visualitzen les metadades principals de les entitats de referència, sent possible accedir al detall d’aquestes.

 
> Destaquem que, en la majoria de les entitats modelades, per garantir el compliment del nivell de **completesa** que s'exigeix en la valoració de la **qualitat de les dades**, s'han afegit dos valors genèrics:
> 
> + **"No consta"**: Aquest valor es pot utilitzar en aquells casos que té sentit tenir un registre per representar la situació en què es desconeix la dada.
> + **"Altres/Diversos"**: Amb aquest valor es representen dues situacions diferents:
>   - Altres: Es coneix el valor a informar, però no és cap dels de la llista que ofereix l'entitat.
>   - Diversos: En la llista de valors de l'entitat hi ha més d'un registre que representa la dada a informar.
> 
> Funcionalment, aquests valors de completesa permeten detectar casos en què cal fer ajustos en les entitats. Per exemple, un ús elevat del valor "No consta" significa que és una dada que sovint es desconeix, sigui perquè no es requereix o perquè és difícil d'obtenir. Un ús elevat del valor "Altres/Diversos" pot significa que cal ampliar el rang de valors de l'entitat.
> 


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
    background: url('./../detall/details_open.png') no-repeat center center;
    cursor: pointer;
	padding-left:15px;
	padding-right:15px;
}
tr.shown td.details-control {
    background: url('./../detall/details_close.png') no-repeat center center;
}

</style>


<script src="https://code.jquery.com/jquery-3.6.0.js" type="text/javascript"></script>
<script src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js" type="text/javascript"></script>

<script type="text/javascript">

	function construir_tab_instancies ( d ) {
	    var vRowInstancia;
		var vStyle;
		var vButton;
		
        
		vRowInstancia='';
		for(var i=0,z=d.instancies.length;i<z;i++){
			//vStyle='style="fontWeight:bold;color:darkgrey;"';
			vStyle='';
			if (d.instancies[i].iestat!="Vigent")
			{
				vStyle='style="color:darkgrey;"';
			}

            vButton='<td></td>';
			if (d.instancies[i].idatapublicacio!="")
			{
				vButton='<td style="text-align:center;"><button class="myButton">Detall</button></td>';
			}			
			
			vRowInstancia=vRowInstancia+'<tr>'+
					'<td '+vStyle+'>'+d.instancies[i].inom+'</td>'+
					'<td '+vStyle+'>'+d.instancies[i].idescripcio+'</td>'+
					'<td '+vStyle+'>'+d.instancies[i].ipromotor+'</td>'+
                    '<td '+vStyle+'>'+d.instancies[i].iestat+'</td>'+
					'<td '+vStyle+'>'+d.instancies[i].idatapublicacio+'</td>'+
					'<td '+vStyle+'>'+d.instancies[i].idataobsoleta+'</td>'+
                    vButton+
				'</tr>';
		}

		return '<table cellpadding="7" cellspacing="0" border="0" style="margin-top:0px; padding-left:20px;font-size:12px;width:100%;">'+
			'<thead>'+
				'<tr>'+
					'<th style="background-color: papayawhip;">Nom</th>'+
					'<th style="background-color: papayawhip; width:30%;">Descripcio</th>'+
					'<th style="background-color: papayawhip; width:30%;">Promotor</th>'+
					'<th style="background-color: papayawhip;">Estat</th>'+
					'<th style="background-color: papayawhip;">Publicada</th>'+
					'<th style="background-color: papayawhip;">Obsoleta</th>'+
					'<th style="background-color: papayawhip;"></th>'+					
			    '</tr>'+
			'</thead>'+
			'<tbody>'+vRowInstancia+'</tbody>'+
		'</table>';
	}

  //------------------------------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------------------------------
 
  
  $(document).ready(function() {  

    var tcons =  $('#tabvalidades').DataTable( {
      "ajax": '../json/entitats.json',
	  "deferRender": true,
      "bFilter": true,
      "autoWidth": true,
      "scrollY": "450px",
      "scrollCollapse": true,
      "paging": false,
      "ordering": true,
      //"pageLength": 10,
      //"order": [[ 0, 'asc' ]],
      "info": true,
      "stateSave": true,
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
            { "data": "Classificacio", "visible": false },
			{ "data": "Ambit" },
			{ "data": "Subambit" },
			{ "data": "Nom" },
			{ "data": "Descripcio" },
            { "data": "Data_publicacio" },
            { "data": "Data_actualitzacio" }
           ],
	  "columnDefs": [ {
			"targets": [6,7],
				 "render": function ( data, type, row, meta ) {
							 return '<span style="display:none">="'+data.split("/").reverse().join("/")+'"></span>'+data+'';
					  }
		  } ], 
	  "searchCols": [null, { "search": "Consolidat" }, null, null, null, null, null, null ],
	  "order": [ [ 2, 'asc' ], [ 3, 'asc' ], [ 4, 'asc' ] ],
	  "initComplete": function( settings, json ) {
	        //calcular nombre d'instàncies vigents
	        var dadesConso=json.data; 
			var vigents=0;			 
			for (var i = 0; i < dadesConso.length; i++) {			 
				for (var j = 0; j < dadesConso[i].instancies.length; j++) {	
					if (dadesConso[i].instancies[j].iestat == "Vigent")
						vigents++;
				}
			}
			//console.log("vigents: " + vigents);
			
			//Mostrar text amb el nombre d'instàncies vigents
			//$('#numInstancies').text("Nombre total d'instàncies vigents: " + vigents);
			$('#numInstancies').text("Nombre total d'entitats vigents: " + vigents);
		  },
		  
	  "infoCallback": function( settings, start, end, max, total, pre ) {
	       
		    // Calcula el número d'instàncies que es visualitzen aplicant el filtre
			var dadesFiltre=$('#tabvalidades').DataTable().rows( { filter : 'applied'} ).data() 
			var vigents2=0;			 
			for (var i = 0; i < dadesFiltre.length; i++) {			 
				for (var j = 0; j < dadesFiltre[i].instancies.length; j++) {	
					if (dadesFiltre[i].instancies[j].iestat == "Vigent")
						vigents2++;
				} 
			}
			
			// Constuim el tex tenint en compte el singular/plural, per defecte plural.
			var txtEntitats=" entitats i ";
			if (total == 1){ txtEntitats=" entitat i ";}
			
			var txtInstancies=" instàncies vigents";
			if (vigents2 == 1){ txtInstancies=" instància vigent";}	
             			
	        //retornem el text que es visualitzarà
			//return total + txtEntitats + vigents2 + txtInstancies;
			txtEntitats=" entitats";
			if (total == 1){ txtEntitats=" entitat";}
			return vigents2 + txtEntitats;
			
		}
    } ); 

     $('#tabvalidades tbody').on('click', 'button', function () {
        //Obtenir l'index de la instancia a on s'ha fet el click per veure el detall;
	    var $tr = $(this).closest('tr');
	    var posicio = $tr.index();
        //console.log("posicio: " + posicio);  //es mostra el resultat en el log - Debug

		
        //Obtenir tot l'element data son de l'entitat a on s'ha fet el click per veure el detall;
	    var data = tcons.row( $(this).parents('tr') ).data();
        data= tcons.row( $(this).parents('tr').prev() ).data();
        //alert( 'You clicked on '+data[0]+'\'s row' );
        //console.log("data: "); //es mostra el resultat en el log - Debug
        //console.log(data);         //es mostra el resultat en el log - Debug
		
		// Passem totes les dades de l'entitat i les instancies
        localStorage.setItem('data', JSON.stringify(data));
		// Passem la posicio de la instancia seleccionada
        localStorage.setItem('pos', posicio);

        window.location = "./../detall/detalldadesref";
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
            row.child( construir_tab_instancies(row.data()) ).show();
            tr.addClass('shown');
        }
    } );
	
	
	// carregar taula de pendents
    var tpend =  $('#tabpendents').DataTable( {
      "ajax": '../json/entitats.json',
      "deferRender": true,
      "bFilter": true,
      "autoWidth": true,
      "scrollY": "450px",
      "scrollCollapse": true,
      "paging": false,
      "ordering": true,
      //"pageLength": 10,
      //"info":     false,
	  "language":{
                "search" : "<strong>Cerca:</strong> ",
                "infoEmpty": "No hi ha entitats",
                "zeroRecords": "No s'han trobat entitats",
                "infoFiltered":   "_END_ entitats",
                "info": ""
        },
	  "columns": [
            { "data": "Classificacio", "visible": false },
			{ "data": "Ambit" },
			{ "data": "Subambit" },
			{ "data": "Nom" },
			{ "data": "Descripcio" },
            { "data": "Data_publicacio" },
            { "data": "Data_actualitzacio" },
			{ "data": null, "defaultContent": "<button class=\"myButton\">Detall</button>"  }
           ],
	  "columnDefs": [ {
			"targets": [5,6],
				 "render": function ( data, type, row, meta ) {
							 return '<span style="display:none">="'+data.split("/").reverse().join("/")+'"></span>'+data+'';
					  }
		  } ], 
	  "searchCols": [ { "search": "Pendent" }, null, null, null, null, null, null, null ],
	  "order": [ [ 1, 'asc' ], [ 2, 'asc' ], [ 3, 'asc' ] ]
    } );
	
    $('#tabpendents tbody').on('click', 'button', function () {
        //Obtenir l'index de la instancia a on s'ha fet el click per veure el detall;
		//  En el cas de les pendents, la posició sempre és 0 perquè només hi ha una instancian de l'entitat
			//var $tr = $(this).closest('tr');
			//var posicio = $tr.index();
		var posicio =0;
        //console.log("posicio pendents: " + posicio);  //es mostra el resultat en el log - Debug

        //Obtenir tot l'element data son de l'entitat a on s'ha fet el click per veure el detall;
        var data = tpend.row( $(this).parents('tr') ).data();
        //alert( 'You clicked on '+data[0]+'\'s row' );
        //console.log("data pendents: "); //es mostra el resultat en el log - Debug
        //console.log(data);         //es mostra el resultat en el log - Debug
        

		// Passem totes les dades de l'entitat i les instancies
        localStorage.setItem('data', JSON.stringify(data));
		// Passem la posicio de la instancia seleccionada
        localStorage.setItem('pos', posicio);

        window.location = "./../detall/detalldadesref";
    } );

    $('.dataTables_filter').css('float','right');  
    $('.dataTables_filter').css('padding-right','20px');  
    $('.dataTables_filter').css('padding-bottom','10px');
	
	$('.dataTables_info').css('padding-top','20px'); 
	
    $('article table').css('margin','0');
	
	// text instancies vigent dins de l'espai que ocupa la taula validada
	$('#divInstancies').prependTo('#tabvalidades_wrapper'); 
    
  });


 
</script>

<br/><br/>
####  Dades de referència d'obligat compliment 

<div style="width:100%; padding-left:30px;">
<div id="divInstancies" style="float: left;">
<p id="numInstancies" style="margin-top:8px; font-size:14px; font-style:italic;" ></p>
</div>

<table id="tabvalidades" class="hover" style="width:100%; font-size:13px;">
        <thead>
            <tr>
                <th></th>
                <th>Nivell Validació</th>
                <th style="width:15%">Domini</th>
                <th style="width:15%">Subdomini</th>
                <th>Entitat</th>
                <th style="width:35%">Descripció</th>
                <th style="width:8%">Data publicació</th>
                <th style="width:8%">Darrera actualització</th>
            </tr>
        </thead>
    </table>

<br/><br/>
</div>

<div style="width:100%; padding-left:15px">
A continuació es presenta el diagrama amb les relacions entre les entitats de referència d'obligat compliment, indicant-se la cardinalitat per cada relació.
<br/><br/>
  <div style="padding-left:40px">
    <img style="padding: 5px; width: 100%; height: auto" src="./../entitats/DadesRef_DiagramaRelacions.png" alt="Relacions entre entitats" title="Diagrama relacions entre entitats"></img>
  </div>	
</div>


<br/><br/>
#### Dades de referència pendents d'aprovació

<div style="width:100%; padding-left:30px;">
<table id="tabpendents" class="hover" style="width:100%; font-size:13px;">
        <thead>
            <tr>
                <th>Nivell Validació</th>
                <th style="width:15%">Domini</th>
                <th style="width:15%">Subdomini</th>
                <th>Entitat</th>
                <th style="width:35%">Descripció</th>
                <th style="width:8%">Data publicació</th>
                <th style="width:8%">Darrera actualització</th>
                <th>Detall</th>
            </tr>
        </thead>
    </table>
</div>

## Breu descripció  de la gestió tècnica i operativa

Des de CTTI es treballa amb el descobriment continuat de dades de referència, amb l’objectiu de modelar, validar i finalment incorporar dins del Catàleg Tècnic de Dades de Referència aquí publicat.

El procés de gestió de les dades de referència es realitza de manera coordinada amb la Direcció General d'Administració Digital, cadascun en el seu àmbit i amb els interlocutors que li són propis: l’àmbit tecnològic i la interlocució amb les seves àrees TIC i els proveïdors informàtics en cas del CTTI, i en el cas de la Direcció General d'Administració Digital, l’àmbit funcional i la interlocució amb òrgans funcionals (àrees d’organització o equivalents, i a través d’aquestes, unitats departamentals com ara les de gestió documental o d’estandardització de dades entre d’altres).

A la següent figura es mostra a grans trets el procés de govern que se segueix a fi de garantir la consistència, qualitat, veracitat, unicitat i vigència de cada dada de referència:


![DadRefProc](./../entitats/DadesRef_ProcesGeneral.png)

Per utilitzar les dades de referència s'ha d'activar l'enllaç "**Accedir a les dades**" de la fitxa descriptiva de les entitats i que porta al Portal de Dades Obertes des d'on es pot visualitzar la informació de l'entitat. Per importar les dades cap a un sistema destí, es pot fer de dues maneres:

- **De forma manual**: Fent servir l'opció "**Exporta**" per obtenir una còpia del fitxer de dades i fer ús d'aquest fitxer per importar la informació dins del sistema destí.<br/>

- **De forma automàtica**: Fent servir l'opció "**API**" del portal de Dades Obertes s'aconsegueix un enllaç al punt d'accés API que es pot utilitzar dins del sistema destí. D'aquesta manera, la informació es manté sincronitzada. Això vol dir que qualsevol canvi en el conjunt de valors de l'entitat, es replica automàticament dins del sistema destí.<br/>

En properes versions del Catàleg inclourem prestacions de subscripcions, notificacions i facilitats per recuperar automàticament el contingut de les dades de referència.

Si esteu interessats en què registrem l’ús per comunicar-vos qualsevol canvi que es produeixi sobre l’entitat, podeu posar-vos en contacte amb l’Oficina de Gestió Tècnica de Dades de CTTI a traves del correu electrònic: gtd.ctti@gencat.cat

Així mateix, estem a la vostra disposició per rebre propostes d’incorporació de noves dades de referència o adaptar les actuals a les necessitats de les aplicacions.


