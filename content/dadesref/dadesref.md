+++
date        = "2019-05-29"
title       = "Dades de Referència"
description = "Arquitectura de Dades de CTTI"
sections    = ["Data Architecture"]
categories  = ["Data Architecture"]
weight= 1
+++

Gestió Tècnica de Dades
En els darrers anys la tendència empresarial, ja sigui en l’àmbit públic o privat, s’està orientant cap a satisfer la necessitat d’una correcta gestió de les dades. Aquest fet inclou millorar la qualitat i la seguretat de les mateixes, entendre el seu significat i emprar-les com un actiu clau que permeti generar avantatges competitius en l’àmbit empresarial. Les organitzacions, doncs, depenem cada cop més de les dades per prendre decisions més efectives. 
En l’àmbit públic es fa palesa la necessitat de disposar de dades d’alta qualitat que permetin potenciar serveis proactius i facilitar la presa de decisions en les seves activitats operacionals, tàctiques i estratègiques proporcionant un millor servei a la ciutadania.
L’ecosistema de les dades és molt ampli. La Gestió Tècnica de les Dades cerca establir un model per a la gestió tècnica i control de totes elles. Establim tres grans grups de dades:
1.	Dada Mestra: representen objectes de forma acordada que serveixen de referència transversal per a tota o part de la Generalitat. Poden ser:
•	Dada Mestra Corporativa: representen aquells atributs comuns i implementats arreu de la Generalitat de la mateixa manera, garantint la interoperabilitat, el tractament homogeni i la identificació unívoca (exemple: ciutadà, empresa).
•	Dada Mestra Departamental: proporcionen atributs particulars que estenen la dada mestra corporativa per especificitat dins d’un àmbit o departament concret (exemple: atribut de la targeta sanitària d’un ciutadà).
2.	Dades de Referència: orientades a propòsits de classificació (codificacions i estàndards) o de suport a la gestió. Són dades bàsiques amb valors sobre dominis, termes estandarditzats, codificacions, identificadors únics de conceptes i, en general, qualsevol element orientat a la classificació consistent i exacta de les dades i la informació (per exemple, estat de tramitació, codis de comunitats, codis de països, etc.).
3.	Dades de negoci: les vinculades directament a qualsevol de les diferents activitats que realitza la Generalitat (per exemple, prestacions sanitàries).

Quins són els objectius que es persegueixen amb la Gestió Tècnica de les Dades ?
La gestió tècnica de dades ha de permetre a la Generalitat de Catalunya:
o	Disposar d’una visió única, consistent, transversal i confiable de les unitats bàsiques d’informació.
o	Generar proactivament dades d’alta qualitat que garanteixin tant l’operativa diària com la capacitat d’anàlisi de la informació.
o	Facilitar la presa de decisions sobre la base d’una informació consistent, completa i actualitzada, independentment de la seva tipologia o origen.
o	Generar nova informació de valor a partir de l’encreuament de les dades disponibles a l’organització, tot garantint el seguiment dels requisits legals que la normativa vigent estableixi.
o	Posar a disposició de la Generalitat de Catalunya el catàleg de dades que permeti publicar al seu torn la informació a consumir en els diferents àmbits de negoci.

Quins són les línies de treball iniciades en la Gestió Tècnica de les Dades ?
Des de l’Àrea d’Arquitectura Corporativa s’ha plantejat un projecte iteratiu amb diferents línies de treball:


<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
.tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
.tg .tg-y6fn{background-color:#c0c0c0;text-align:left;vertical-align:top}
.tg .tg-0lax{text-align:left;vertical-align:top}
</style>
<table class="tg">
  <tr>
    <th class="tg-y6fn"></th>
    <th class="tg-y6fn">Línea de treball</th>
    <th class="tg-y6fn">Objectiu</th>
  </tr>
  <tr>
    <td class="tg-0lax" rowspan="4"><br>Gestió tècnica de dades</td>
    <td class="tg-0lax">Descobriment de dades</td>
    <td class="tg-0lax" rowspan="4">•    Recopilar i publicar dades de referència d’ús comú per la Generalitat de Catalunya.<br>•    Descobrir i mantenir un catàleg tècnic de dades dels sistemes d’informació de la Generalitat.<br>•    Definir criteris de qualitat aplicables a dades de referència.<br>•    Establir un marc que estableixi una semàntica comú per facilitar la coordinació de la governança.<br>•    Definició de processos i procediments de governança tècnica de dades</td>
  </tr>
  <tr>
    <td class="tg-0lax">Diccionari tècnic de dades</td>
  </tr>
  <tr>
    <td class="tg-0lax">Qualitat de dades</td>
  </tr>
  <tr>
    <td class="tg-0lax">Processos en gestió tècnica</td>
  </tr>
  <tr>
    <td class="tg-0lax" rowspan="2">Plataformes de gestió de dades</td>
    <td class="tg-0lax">Definició conceptual</td>
    <td class="tg-0lax" rowspan="2">•    Definir un model tecnològic per gestionar les dades de referència.<br>•    Dissenyar plataformes de referència per a l’àmbit de dades i anàlisi de la informació</td>
  </tr>
  <tr>
    <td class="tg-0lax">Estàndards i Implementació física</td>
  </tr>
</table>


Les dades de referència són un tipus especial de dades orientades amb propòsits de classificació (codificacions i estàndards) o de suport a la gestió; en essència són codis que bàsicament  transformen dades en informació significativa pel negoci.
El conjunt de dades de referència canvien lentament i les revisions s’han de fer sota l’autoritat d’un custodi de dades de referència.
Utilitzar dades de referència entre sistemes d’una organització permet comunicar-se de manera efectiva, evitant la creació de diferents fonts d’informació inconsistents.


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
    var table =  $('#example').DataTable( {
      "ajax": '../json/entitats.json',
      "bFilter": false,
      "paging":   false,
      "ordering": false,
      "info":     false,
      "columnDefs": [ {
            "targets": -1,
            "data": null,
            "defaultContent": "<button class=\"myButton\">Detall</button>"
        } ]
    } );
     $('#example tbody').on('click', 'tr', function () {
        var data = table.row( this ).data();

        //console.log(data);
        //alert( 'You clicked on '+data[0]+'\'s row' );
        console.log("save data");
        console.log(data);
        localStorage.setItem('data', JSON.stringify(data));
      

        window.location = "../detallrefdades";
    } );

});
</script>

  
<div style="width:50%">
<table id="example" class="hover" style="width:100%">
        <thead>
            <tr>
                <th>Grup</th>
                <th>Entitat</th>
                <th>Data Actualització</th>
                <th>Detall</th>
            </tr>
        </thead>
    </table>
</div>




<script src="https://code.jquery.com/jquery-3.3.1.js" type="text/javascript"></script>
<script src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js" type="text/javascript"></script>
  
 <script src="https://qualitat.solucions.gencat.cat/js/imageMapResizer.min.js" type="text/javascript"></script>
<script src="https://qualitat.solucions.gencat.cat/js/imageMapResizer.min.js" type="text/javascript"></script>
