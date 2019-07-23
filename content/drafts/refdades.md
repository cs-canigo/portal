+++
date        = "2019-07-15"
title       = "Dades de Referència"
description = "Arquitectura de Dades de CTTI"
sections    = ["Data Architecture"]
categories  = ["Data Architecture"]
weight= 5
+++

Les dades de referència són un tipus especial de dades orientades amb propòsits de classificació (codificacions i estàndards) o de suport a la gestió; en essència són codis que bàsicament transformen dades en informació significativa pel negoci. 

El conjunt de dades de referència i els seus valors canvien en el transcurs del temps. Qualsevol canvi ha de passar per un control de qualitat i ha de ser aprovat sota l’autoritat d’un custodi de dades de referència. 

Utilitzar dades de referència entre sistemes d’una organització permet comunicar-se de manera efectiva, evitant la creació de diferents fonts d’informació inconsistents.

En aquesta primera iteració del projecte, es presenten 22 entitats de referència dins d’una taula de catàleg que mostra les dades principals: el grup a on pertany l’entitat, el nom, la descripció, la data d'última publicació i un botó que permet obrir una nova pàgina per consultar el detall: les metadades i els valors que conté l'entitat.

Les següents actuacions planificadas són:

- Incrementar el nombre d'entitats de referència del catàleg.

- Millorar la presentació de les entitats. A causa dels canvis que poden tenir les entitats al llarg del temps, tant en l'àmbit estructural com en el contingut, està previst crear i gestionar diferents versions vàlides sobre una mateixa entitat.

- Definir procediments de gestió que permetin tenir constància de quines aplicacions fan ús de les entitats i amb quin perfil (propietari o de consum) així com poder gestionar peticions de noves entitats de referència o canvis sobre les entitats ja existents. Qualsevol canvi haurà de passar per un control de qualitat i validació per part del propietari.

- Facilitar un procediment que permeti als aplicatius definir una conversió de valors sobre una entitat per tal d'adaptar als valors al seu propi sistema.

- Comunicar a les aplicacions que fan ús d'una entitat qualsevol canvi que es faci sobre aquesta entitat per tal que, si és necessari, actualitzin la conversió de valors i les dades del seu propi sistema.


Per qualsevol dubte o aclariment podeu posar-vos en contacte amb l' Àrea d’Arquitectura Corporativa.


<br/>
<h5>Operativa</h5>
<br/>
Posem en disposició dels aplicatius el conjunt de les 22 entitats de referència que s'han descobert en aquesta primera iteració, veure la taula "Catàleg actual" d'aquesta mateixa pàgina. Els aplicatius poden consultar les metadades d'aquestes entitats i els valors que contenen, activant el botó de detall que apareix en la taula. Els valors que contenen les entitats es poden consultar mitjançant una previsualització o descarregant un fitxer Excel.

Tot aplicatiu que trobi interessant utilitzar les dades d'alguna entitat, pot utilitzar-les tenint en compte que en aquesta primera versió no es disposa de cap procediment de petició d'ús de les entitats ni es registra l'ús de les entitats. Si esteu interessats en què registrem l'ús per comunicar-vos qualsevol canvi que es produeixi sobre l'entitat, podeu posar-vos en contacte amb l'Àrea d’Arquitectura Corporativa.

Així mateix, estem a la vostra disposició per rebre propostes d'incorporació de noves entitats o adaptar les actuals a les necessitats dels aplicatius.



<br/>
<h5>Catàleg actual</h5>
<br/>

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
      "ajax": './json/entitats.json',
      "deferRender": true,
      "bFilter": false,
      "autoWidth": true,
      //"scrollY": "500px",
      //"scrollCollapse": true,
      "paging":   false,
      //"pageLength": 10,
      "order": [[ 0, 'asc' ]],
      //"info":     false,
      "columnDefs": [ {
            "targets": -1,
            "data": null,
            "defaultContent": "<button class=\"myButton\">Detall</button>"
        } ]
    } );
     $('#example tbody').on('click', 'button', function () {
        //var data = table.row( this ).data();
        var data = table.row( $(this).parents('tr') ).data();
        
        //console.log(data);
        //alert( 'You clicked on '+data[0]+'\'s row' );
        console.log("save data");
        console.log(data);
        localStorage.setItem('data', JSON.stringify(data));
      

        window.location = "../da/detallrefdades";
    } );

});
</script>

  
<div style="width:80%">
<table id="example" class="hover" style="width:100%">
        <thead>
            <tr>
                <th>Grup</th>
                <th>Entitat</th>
                <th style="width:40%">Descripció</th>
                <th>Data Última Publicació</th>
                <th>Detall</th>
            </tr>
        </thead>
    </table>
</div>




<script src="https://code.jquery.com/jquery-3.3.1.js" type="text/javascript"></script>
<script src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js" type="text/javascript"></script>
  
 <script src="https://qualitat.solucions.gencat.cat/js/imageMapResizer.min.js" type="text/javascript"></script>
<script src="https://qualitat.solucions.gencat.cat/js/imageMapResizer.min.js" type="text/javascript"></script>
