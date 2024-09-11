+++
date        = "2024-09-10"
title       = "Detall Dades de Referència"
description = "Visualització del detall d'una dada de referència"
sections    = ["Data Architecture"]
categories  = ["Data Architecture"]
aliases = [
    "/descripcio-arquitectura/detalldadesref"
]
[_build]
  list = 'never'
  publishResources = false
  render = 'always'
+++

  <div>
    <h2 id="entitatTitol"></h2>
    <p id="myDefinition"></p>
	<h4 id="instanciaTitol"></h4>
	<p id="instanciaDefinicio"></p>
    <table id="myTable"></table>
  </div>
  


<script type="text/javascript">

	// Recollim els parametres: json i posicio que indica la instancia seleccionada per visualitzar el detall
    var dades = JSON.parse(localStorage.getItem('data'));
	var numInstancia = localStorage.getItem('pos');

    // Mostrem en el log els valors recollits
    //console.log("Dades Json: ");
    //console.log(dades);
    //console.log("Nom entitat: "+dades.Nom);
	//console.log("Instancia Index: "+numInstancia);
	//console.log("Nom instancia: "+dades.instancies[numInstancia].inom);

	// Construim la pagina a visualitzar
	  
    var body = document.getElementsByTagName("body")[0];
	
	//Dades entitat
    
    var entitatTitol = document.getElementById("entitatTitol");
    entitatTitol.style.width = "70%";
    entitatTitol.style.marginRight = "15%";
    entitatTitol.style.marginLeft = "15%";
    entitatTitol.style.marginTop = "0.5em";
    entitatTitol.style.marginBottom = "0.5em";

    var textEntitatTitol = document.createTextNode(dades.Nom);
    entitatTitol.appendChild(textEntitatTitol);

    body.appendChild(entitatTitol);

    var definicio = document.getElementById("myDefinition");
    definicio.style.width = "70%";
    definicio.style.marginRight = "15%";
    definicio.style.marginLeft = "15%";
    definicio.style.marginTop = "0.5em";
    definicio.style.marginBottom = "1.5em";

    var textDefinicio = document.createTextNode(dades.Descripcio);
    definicio.appendChild(textDefinicio);

    body.appendChild(definicio);


	//Dades instancia

    var instanciaTitol = document.getElementById("instanciaTitol");
    instanciaTitol.style.width = "70%";
    instanciaTitol.style.marginRight = "15%";
    instanciaTitol.style.marginLeft = "15%";
    instanciaTitol.style.marginTop = "0.5em";
    instanciaTitol.style.marginBottom = "0.5em";

    var textEntitatTitol = document.createTextNode("Versió "+dades.instancies[numInstancia].inom);
    instanciaTitol.appendChild(textEntitatTitol);

    body.appendChild(instanciaTitol);

    var instanciaDefinicio = document.getElementById("instanciaDefinicio");
    instanciaDefinicio.style.width = "70%";
    instanciaDefinicio.style.marginRight = "15%";
    instanciaDefinicio.style.marginLeft = "15%";
    instanciaDefinicio.style.marginTop = "0.5em";
    instanciaDefinicio.style.marginBottom = "1.5em";

    var textDefinicio = document.createTextNode(dades.instancies[numInstancia].idescripcio);
    instanciaDefinicio.appendChild(textDefinicio);

    body.appendChild(instanciaDefinicio);



    // Construccio taules per identificar Metadades i la seva correspondencia a JSON
    var metadades   = ["Identificador","Domini"    ,"Subdomini" ,"Estat"      ,"Òrgan propietari","Tipus"       ,"Període actualització","Visibilitat"  ,"Data publicació"   ,"Obsolescència"  ,"Data fi vigència"   ,"Descàrrega"];
    var tabkeys_ent = ["Id"           ,"Ambit"     ,"Subambit"  ,"instancies" ,"instancies"      ,"instancies"  ,"instancies"           ,"instancies"   ,"instancies"        ,"instancies"     ,"instancies"    ,"instancies"];
    var tabkeys_ins = [""             ,""          ,""          ,"iestat"     ,"ipromotor"       ,"itipus"      ,"itipusactualitzacio"  ,"itipusvisual" ,"idatapublicacio"   ,"idataobsoleta"  ,"idataobsoleta" ,"ifitxer_xls"];


    var tabla   =  document.getElementById("myTable");
    tabla.style.width = "70%";
    tabla.style.marginRight = "15%";
    tabla.style.marginLeft = "15%";

    var tblBody = document.createElement("tbody");
    var tblThead = document.createElement("thead");


    var hilera = document.createElement("tr");
   
    var celda = document.createElement("th");
	celda.style.width = "25%";
    var textoCelda =  document.createTextNode("Metadades");
    celda.appendChild(textoCelda);
    hilera.appendChild(celda);

    var celda2 = document.createElement("th");
    var textoCelda2 =  document.createTextNode("Valor");
    celda2.appendChild(textoCelda2);
    hilera.appendChild(celda2);

    tblThead.appendChild(hilera);


    // Crea las celdas
    for (var i = 0; i < 11; i++) 
	{
	  
	  //++ 08/07/2020 (LAA) S'elimina la metadada Classificacio funcional. Per no modificar JSON, de moment 
	  //++ es controla posant condicional. Quan es regeneri JSON es treurà el valor de la metadada i el seu tractament.
	  //++ 04/11/2020 (LAA) S'elimina la metadada Identificador
		if ((metadades[i]=="Classificació funcional") || (metadades[i]=="Identificador") || (metadades[i]=="Obsolescència"))
		{
			continue;
		}
		
		  // Crea las hileras de la tabla
		  hilera = document.createElement("tr");

		for (var j = 0; j < 2; j++) 
		{
			// Crea un elemento <td> y un nodo de texto, haz que el nodo de
			// texto sea el contenido de <td>, ubica el elemento <td> al final
			// de la hilera de la tabla
			if(j==0)
			{
				celda = document.createElement("td");
				textoCelda = document.createTextNode(metadades[i]);
				celda.style.fontWeight = "bold";
				celda.appendChild(textoCelda);
				hilera.appendChild(celda);
			}
			else
			{
				celda = document.createElement("td");

				if (tabkeys_ent[i]=="instancies")
				{
					textoCelda = document.createTextNode(dades[tabkeys_ent[i]][numInstancia][tabkeys_ins[i]]);
				}
				else
				{
					textoCelda = document.createTextNode(dades[tabkeys_ent[i]]);
				}
				celda.appendChild(textoCelda);
								
				if (metadades[i]=="Estat")
				{
					if (dades[tabkeys_ent[i]][numInstancia][tabkeys_ins[i]]!="Vigent")
					{
						//celda.style.fontWeight = "bold";
						celda.style.color="red";
					}
				}
				
				hilera.appendChild(celda);
			}
	    }
		 
		// agrega la hilera al final de la tabla (al final del elemento tblbody)
		tblBody.appendChild(hilera);
    }

    // Determinem si s'ha de mostrar o no els fitxer de valors i atributs
	// Per defecte, mostrem atributs i no mostrem valors  (servirà per entitats pendents de validar)
	//    Per consolidades i estat vigent es mostren atributs i valors.
	//    Per consolidades amb estat diferents de vigent, no es mostren ni atributs ni valors.
	var bMostraAtributs = true;
	var bMostraValors = false;
	if (dades.Classificacio=="Consolidat") 
	{
	   if (dades.instancies[numInstancia].iestat=="Vigent")
	   {
	      bMostraAtributs = true;
	      bMostraValors = true;
		}
		else
		{
	      bMostraAtributs = false;
	      bMostraValors = false;
		}
	}
	
	// Si no s'han de mostrar ni atributs ni valors, creem una nova fila per posar el text que cal solicitar les dades
	if (!bMostraAtributs && !bMostraValors)
	{
		
		hilera = document.createElement("tr");
	   
		celda = document.createElement("td");
		celda.style.fontWeight = "bold";
		textoCelda =  document.createTextNode("Atributs i Dades");
		celda.appendChild(textoCelda);
		hilera.appendChild(celda);

		celda = document.createElement("td");
		celda.innerHTML = "Per tractar-se d'una instància obsoleta, els atributs i els valors no estan disponibles dins d'aquesta pàgina. Si necessiteu aquesta informació, cal que envieu un correu a la Bústia de la Gestió Tècnica de Dades del CTTI: <a href='mailto:gtd.ctti@gencat.cat'>gtd.ctti@gencat.cat</a> ";
		celda.innerHTML = celda.innerHTML + "indicant el nom de l'entitat i de la instància que voleu consultar."

		hilera.appendChild(celda);
		
		tblBody.appendChild(hilera);
	}
	else
	{
		// Creem la fila per mostrar els atributs
		if (bMostraAtributs)
		{
			// -----------------------------------------------------
			//  v02.CTD-16/10/2019 (inici) Crear nova fila de dades per mostrar informació sobre els atributs

			hilera = document.createElement("tr");

			celda = document.createElement("td");
			celda.style.fontWeight = "bold";
			textoCelda =  document.createTextNode("Atributs");
			celda.appendChild(textoCelda);
			hilera.appendChild(celda);
			
			celda = document.createElement("td");
			var frame = document.createElement('iframe');
			
			var nomFitAtr=dades.instancies[numInstancia].ifitxer_doc;
			
    frame.setAttribute("src","https://view.officeapps.live.com/op/embed.aspx?src=https://canigo.ctti.gencat.cat/plataformes/dadesref/entitats/"+ nomFitAtr);
			frame.style.width= "100%"
			frame.style.height= "300px";
			celda.appendChild(frame);
			hilera.appendChild(celda);

			tblBody.appendChild(hilera);

			//  v02.CTD-16/10/2019 (fi)
			// -----------------------------------------------------	
		}
		
		// Creem la fila per mostrar els links de descàrrega de fitxers: atributs i/o valors
		if (bMostraAtributs || bMostraValors)
		{
			hilera = document.createElement("tr");
		   
			celda = document.createElement("td");
			celda.style.fontWeight = "bold";
			textoCelda =  document.createTextNode("Descàrregues");
			celda.appendChild(textoCelda);
			hilera.appendChild(celda);

			celda = document.createElement("td");

			if (bMostraAtributs)
			{
				var link_valors = document.createElement('a');
    link_valors.setAttribute('href', './../../entitats/' + dades.instancies[numInstancia].ifitxer_doc);
				link_valors.innerHTML = "Descarregar definició atributs";
				celda.appendChild(link_valors);
			}
			
			// Si hi ha atributs i valors, posem espais per separar dels dos links de descàrrega.
			if (bMostraAtributs && bMostraValors)
			{
				textoCelda =  document.createTextNode("               ");
				celda.appendChild(textoCelda);
			}

			if (bMostraValors)
			{
				// ---------------------------------------------------
				//  v02.CTD-16/03/2021 (inici) Si l'entitat esta consolidada i no te link a dades obertes, descarregar fitxer Excel
				
				//Si es una entitat consolidada i una instancia vigent però sense link a dades obertes s'ha de posar el link de descarga al fitxer xls.
				if ((dades.Classificacio=="Consolidat") && (dades.instancies[numInstancia].iestat=="Vigent") && (dades.instancies[numInstancia].iurl_dades_obertes=="")  )
				{
					var link = document.createElement('a');
		link.setAttribute('href', './../../entitats/' + dades.instancies[numInstancia].ifitxer_xls);
					link.innerHTML = "Descarregar fitxer de dades";
					celda.appendChild(link);
				}
			   //  v02.CTD-16/03/2021 (fi) 
			   // ---------------------------------------------------
			}		  
		  
			hilera.appendChild(celda);
			
			tblBody.appendChild(hilera);
		}
		
		// --------------------------------------------------------------------------
		// Creem la fila per mostrar els valors
		// --------------------------------------------------------------------------
		hilera = document.createElement("tr");
	   
		celda = document.createElement("td");
		celda.style.fontWeight = "bold";
		textoCelda =  document.createTextNode("Dades");
		celda.appendChild(textoCelda);
		hilera.appendChild(celda);

		celda = document.createElement("td");
		
		// Si es consolidat es mostra el conjunt de dades, sino es mostra un missatge
		if (dades.Classificacio=="Consolidat")
		{

			// v02.CTD-16/03/2021 (inici) Si hi ha link a Dades Obertes posar el link, sino posar fitxer Excel
			if (dades.instancies[numInstancia].iurl_dades_obertes!="" && (dades.instancies[numInstancia].iestat=="Vigent")) 
			{
				var link_valors = document.createElement('a');
				link_valors.setAttribute('href', dades.instancies[numInstancia].iurl_dades_obertes);
				link_valors.innerHTML = "Accedir a dades";
				celda.appendChild(link_valors);
			}
			else
			{
				var frame = document.createElement('iframe');
		frame.setAttribute("src","https://view.officeapps.live.com/op/embed.aspx?src=https://canigo.ctti.gencat.cat/plataformes/dadesref/entitats/"+ dades.instancies[numInstancia].ifitxer_xls);
				frame.style.width= "100%"
				frame.style.height= "400px";
				celda.appendChild(frame);
			}
			// v02.CTD-16/03/2021
		}
		else
		{
			celda.innerHTML = "Per obtenir els valors de l'entitat cal que envieu un correu a la Bústia de la Gestió Tècnica <br/>  de Dades del CTTI: <a href='mailto:gtd.ctti@gencat.cat'>gtd.ctti@gencat.cat</a> ";
			celda.innerHTML = celda.innerHTML + "i se us donarà accès temporal a totes <br/> les entitats en revisió, pendents d'aprovació."
		}

		hilera.appendChild(celda);

		tblBody.appendChild(hilera);
	}

    tabla.appendChild(tblThead);
    tabla.appendChild(tblBody);

    body.appendChild(tabla);
    
    //function happycode(){
     //var dades = JSON.parse(localStorage.getItem('data'));
     //var url = "https://view.officeapps.live.com/op/embed.aspx?src=https://canigo.ctti.gencat.cat/drafts/entitats/"+ dades[13];
     //$('#myframe').attr("src", url);
    //}

</script>
