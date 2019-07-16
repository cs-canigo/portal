+++
date        = "2019-07-15"
title       = "Dades de Referència"
description = "Arquitectura de Dades de CTTI"
sections    = ["Data Architecture"]
categories  = ["Data Architecture"]
weight= 5
+++

Les dades de referència són un tipus especial de dades orientades amb propòsits de classificació (codificacions i estàndards) o de suport a la gestió; en essència són codis que bàsicament  transformen dades en informació significativa pel negoci.
El conjunt de dades de referència canvien lentament i les revisions s’han de fer sota l’autoritat d’un custodi de dades de referència.
Utilitzar dades de referència entre sistemes d’una organització permet comunicar-se de manera efectiva, evitant la creació de diferents fonts d’informació inconsistents.

És possible *descarregar* un fitxer Excel amb la informació actual de la taula, la més recent.

Les taules s'actualitzen periòdicament. Les dades evolucionen i canvien amb el temps i, en conseqüència, també ho fan les llistes de codis i les nomenclatures que les recullen. Qualsevol modificació d'una llista queda registrada amb una data de manera que és possible accedir al seu històric.

Està previst evolucionar la gestió tècnica de dades per definir els procediments d'ús d'entitats de referència per part dels aplicatius. Aquests procediments registraran la petició i permetran poder notificar als aplicatius qualsevol canvi que es realitzi sobre les entitats de referència utilitzades. Per altra banda, també està previst donar servei a la necessitat de poder especificar una conversió de valors en funció de l'entitat de referència i l'aplicació.

Per qualsevol dubte o aclariment podeu posar-vos en contacte a través d'un correu electrònic a la direcció següent: <code>oficina-tecnica.canigo.ctti@gencat.cat</code>

<br/>
<h5>Catàleg actual</h5>
<br/>
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
     $('#example tbody').on('click', 'tr', function () {
        var data = table.row( this ).data();

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
                <th>Data Actualització</th>
                <th style="width:40%">Descripció</th>
                <th>Detall</th>
            </tr>
        </thead>
    </table>
</div>




<script src="https://code.jquery.com/jquery-3.3.1.js" type="text/javascript"></script>
<script src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js" type="text/javascript"></script>
  
 <script src="https://qualitat.solucions.gencat.cat/js/imageMapResizer.min.js" type="text/javascript"></script>
<script src="https://qualitat.solucions.gencat.cat/js/imageMapResizer.min.js" type="text/javascript"></script>
