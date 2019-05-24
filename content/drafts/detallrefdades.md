+++
date        = "2017-09-23"
title       = "Dades de Referència1"
description = "Arquitectura de Dades de CTTI"
sections    = ["Data Architecture"]
categories  = ["Data Architecture"]
weight= 5
+++

<div style="width:50%">
  <p id="definicio"></p>
  <table id="detallDades" style="width:100%">
          
  </table>
</div> 


<script type="text/javascript">

    var dades = JSON.parse(localStorage.getItem('data'));


    var body = document.getElementsByTagName("body")[0];

    var definicio = document.createElement("p");
    definicio.style.width = "70%";
    definicio.style.marginRight = "15%";
    definicio.style.marginLeft = "15%";

    var textDeficicio = document.createTextNode(dades[16]);
    definicio.appendChild(textDeficicio);

    body.appendChild(definicio);

    var metadatos = ["Òrgan Responsable","Òrgan propietari","Origen","Darrera Actualització","Període Actualització","Classificació funcional","Agrupació temàtica","Tipus","Visibilitat","Nivell de seguretat","Nivell de qualitat","Identificador, Nom i Descripció","Descàrrega"];


    var tabla   = document.createElement("table");
    tabla.style.width = "70%";
    tabla.style.marginRight = "15%";
    tabla.style.marginLeft = "15%";

    var tblBody = document.createElement("tbody");
    var tblThead = document.createElement("thead");


    var hilera = document.createElement("tr");
   
    var celda = document.createElement("th");
    var textoCelda =  document.createTextNode("metadades");
    celda.appendChild(textoCelda);
    hilera.appendChild(celda);

    var celda2 = document.createElement("th");
    var textoCelda2 =  document.createTextNode("definició");
    celda2.appendChild(textoCelda2);
    hilera.appendChild(celda2);

    tblThead.appendChild(hilera);


     // Crea las celdas
     for (var i = 0; i < 12; i++) {
      // Crea las hileras de la tabla
      hilera = document.createElement("tr");

      for (var j = 0; j < 2; j++) {
        // Crea un elemento <td> y un nodo de texto, haz que el nodo de
        // texto sea el contenido de <td>, ubica el elemento <td> al final
        // de la hilera de la tabla
        if(j==0){
          celda = document.createElement("td");
          textoCelda = document.createTextNode(metadatos[i]);
          celda.style.fontWeight = "bold";
          celda.appendChild(textoCelda);
          hilera.appendChild(celda);
        }
        else{
          celda = document.createElement("td");
          textoCelda = document.createTextNode(dades[i+3]);
          celda.appendChild(textoCelda);
          hilera.appendChild(celda);
        }
      }

      // agrega la hilera al final de la tabla (al final del elemento tblbody)
      tblBody.appendChild(hilera);
    }


    hilera = document.createElement("tr");
   
    celda = document.createElement("td");
    celda.style.fontWeight = "bold";
    textoCelda =  document.createTextNode("descàrrega");
    celda.appendChild(textoCelda);
    hilera.appendChild(celda);

    celda = document.createElement("td");
    var link = document.createElement('a');
    var image = document.createElement('img');

    link.setAttribute('href', './entitats/' + dades[15]);

    image.setAttribute("src","https://img.icons8.com/color/50/000000/ms-excel.png");

    //link.innerHTML = dades[15];
    link.appendChild(image);
    celda.appendChild(link);
    //celda.appendChild(link);
    hilera.appendChild(celda);

    tblBody.appendChild(hilera);


    // posiciona el <tbody> debajo del elemento <table>

    tabla.appendChild(tblThead);
    tabla.appendChild(tblBody);
    // appends <table> into <body>
    body.appendChild(tabla);


  </script>
