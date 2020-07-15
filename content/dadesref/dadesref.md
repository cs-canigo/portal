+++
date        = "2020-05-05"
title       = "Dades de Referència"
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
  font-size:14px;
  padding:0px 40px;
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

</style>

<script type="text/javascript">
  $(document).ready(function() {  

    var tcons =  $('#tabvalidades').DataTable( {
      "ajax": '../json/entitats.json',
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
//                "infoFiltered":   "_END_ entitats consolidades d'un total _MAX_ entitats publicades",
//                "infoFiltered":   "",
                "infoFiltered":   "_END_ entitats",
                "info": ""
        },
	  "columns": [
          { data: 0 }, { data: 1 }, { data: 2 }, { data: 3 }, { data: 11 }, { data: 12 }, { data: "" }
           ],
      "columnDefs": [ 
	        {"targets": -1, "data": null, "defaultContent": "<button class=\"myButton\">Detall</button>" },
            {"targets": [ 0 ], "visible": false },
            {"targets": [ 4 ], "visible": false }
             ],
       "searchCols": [
                { "search": "Consolidat" }, null,  null, null, null, null, null
		  ]
    } );
	
    $('#tabvalidades tbody').on('click', 'button', function () {
        //var data = tcons.row( this ).data();
        var data = tcons.row( $(this).parents('tr') ).data();
        
        //console.log(data);
        //alert( 'You clicked on '+data[0]+'\'s row' );
        console.log("save data");
        console.log(data);
        localStorage.setItem('data', JSON.stringify(data));

        window.location = "../../da/detalldadesref";
    } );

  
    var table =  $('#tabpendents').DataTable( {
      "ajax": '../json/entitats.json',
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
                "search" : "<strong>Cerca:</strong>",
                "infoEmpty": "No hi ha entitats",
                "zeroRecords": "No s'han trobat entitats",
//                "infoFiltered":   "_END_ entitats d'un total _MAX_ entitats publicades",
//                "infoFiltered":   "",
                "infoFiltered":   "_END_ entitats",
               "info": ""
        },
	  "columns": [
          { data: 0 }, { data: 1 }, { data: 2 }, { data: 3 }, { data: 11 }, { data: 12 }, { data: "" }
           ],
      "columnDefs": [ 
	        {"targets": -1, "data": null, "defaultContent": "<button class=\"myButton\">Detall</button>" },
            {"targets": [ 0 ], "visible": false },
            {"targets": [ 4 ], "visible": false }
              ],
	  "searchCols": [
                { "search": "Pendent" }, null,  null, null, null, null, null
		  ]
    } );
     $('#tabpendents tbody').on('click', 'button', function () {
        //var data = table.row( this ).data();
        var data = table.row( $(this).parents('tr') ).data();
        
        //console.log(data);
        //alert( 'You clicked on '+data[0]+'\'s row' );
        console.log("save data");
        console.log(data);
        localStorage.setItem('data', JSON.stringify(data));

        window.location = "../../da/detalldadesref";
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
                <th>Nivell Validació</th>
                <th>Grup</th>
                <th>Entitat</th>
                <th style="width:40%">Descripció</th>
                <th>Data publicació</th>
                <th>Darrera actualització</th>
                <th>Detall</th>
            </tr>
        </thead>
    </table>

<br/><br/>
</div>

<div style="width:100%; padding-left:15px">
A continuació es presenta el diagrama amb les relacions entre les entitats de referència d'obligat compliment, indicant-se la cardinalitat per cada relació.
<br/><br/>
  <div style="padding-left:40px">
    <img style="padding: 10px; width: 90%; height: auto; background-color:#eeeeee" src="./../entitats/DadesRef_DiagramaRelacions.png" alt="Relacions entre entitats" title="Diagrama relacions entre entitats"></img>
  </div>	
</div>


<br/><br/>
#### Dades de referència pendents d'aprovació

<div style="width:100%; padding-left:30px">
<table id="tabpendents" class="hover" style="width:100%">
        <thead>
            <tr>
                <th>Nivell Validació</th>
                <th>Grup</th>
                <th>Entitat</th>
                <th style="width:40%">Descripció</th>
                <th>Data publicació</th>
                <th>Darrera actualització</th>
                <th>Detall</th>
            </tr>
        </thead>
    </table>
</div>



<br/>
## Breu descripció  de la gestió tècnica i operativa
<br/>
Des de CTTI es treballa amb el descobriment continuat de dades de referència, amb l’objectiu de modelar, validar i finalment incorporar dins del Catàleg Tècnic de Dades de Referència aquí publicat.

El procés de gestió de les dades de referència es realitza de manera coordinada amb la Direcció General d’Administració Digital, cadascun en el seu àmbit i amb els interlocutors que li són propis: l’àmbit tecnològic i la interlocució amb les seves àrees TIC i els proveïdors informàtics en cas del CTTI, i en el cas de la Oficina d’Innovació i Administració Digital, l’àmbit funcional i la interlocució amb òrgans funcionals (àrees d’organització o equivalents, i a través d’aquestes, unitats departamentals com ara les de gestió documental o d’estandardització de dades entre d’altres).

A la següent figura es mostra a grans trets el procés de govern que se segueix a fi de garantir la consistència, qualitat, veracitat, unicitat i vigència de cada dada de referència:


<CENTER>![DadRefProc](./../entitats/DadesRef_ProcesGeneral.png)</center>
<br/>

Tota aplicació que necessiti utilitzar alguna dada de referència, s’ha de descarregar la informació del Catàleg Tècnic de Dades de Referència aquí publicat, i carregar-la manualment en la seva aplicació. 

En properes versions del Catàleg inclourem prestacions de subscripcions, notificacions i facilitats per recuperar automàticament el contingut de les dades de referència.

Si esteu interessats en què registrem l’ús per comunicar-vos qualsevol canvi que es produeixi sobre l’entitat, podeu posar-vos en contacte amb l’Oficina de Gestió Tècnica de Dades de CTTI a traves del correu electrònic: gtd.ctti@gencat.cat

Així mateix, estem a la vostra disposició per rebre propostes d’incorporació de noves dades de referència o adaptar les actuals a les necessitats de les aplicacions.


<script src="https://code.jquery.com/jquery-3.3.1.js" type="text/javascript"></script>
<script src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js" type="text/javascript"></script>
  
<script src="https://qualitat.solucions.gencat.cat/js/imageMapResizer.min.js" type="text/javascript"></script>
<script src="https://qualitat.solucions.gencat.cat/js/imageMapResizer.min.js" type="text/javascript"></script>
