+++
date        = "2018-04-04"
title       = "Integració de CPDs al SIC"
description = "Guia d'integració de CPDs al SIC"
aliases = [
    "/howtos/2018-03-SIC-Integracions-amb-CPD/"
]
sections    = "SIC"
taxonomies  = []
weight 		= 3
+++

En aquesta guia s'explica per a cada tipus de plataforma (Servidors web, servidors de fitxers, servidors d'aplicacions, bases de dades, etc.) què és el que necessita el SIC per part de CPD quan s'està posant en marxa una nova aplicació a CTTI. 

## Models de desplegament

Abans d'entrar amb els detalls de què es requereix, prèviament cal ser conscient del tipus de desplegament que es realitzarà a cada entorn. El SIC pot realitzar dos tipus de desplegament:

* **Desplegament manual**: Desplegament realitzat manualment pels tècnics de CPD en el que el SIC facilita els artefactes.
* **Desplegament automàtic**: Desplegament realitzat de forma automàtica per la pipeline.

### Desplegament manual

Consisteix en:

1. Pujar els artefactes a un espai SFTP del CPD on es desplega, d'aquesta manera els tècnics de CPD tenen accés de forma ràpida a aquests fitxers.
2. En funció de si l'aplicació està integrada a Remedy o no, obrir un tiquet de canvi a Remedy o enviar un correu al SAU corresponent. Sigui quina sigui l'opció escollida, s'inclou la ubicació dels artefactes.
3. Dins de la finestra de desplegament, el tècnic realitzarà manualment les tasques de desplegament obtenint els artefactes proporcionats pel SIC.

#### Requeriments

Els requeriments del SIC per a aquest tipus de desplegaments són:

* Tenir un **compte SFTP** a CPD on poder pujar els artefactes perquè el tècnic els reculli i pugui dur a terme el desplegament de l'aplicació. L’usuari ha de tenir permisos per esborrar, modificar i crear carpetes i arxius, i qualsevol contingut que pugui tenir haurà de tenir com a owner aquest compte creat.
La informació que s'ha de comunicar al SIC per aquest compte SFTP és:

	* Usuari
	* Paraula de pas
	* FQDN del host (nom complet amb el domini inclòs)
	* Port

L'espai SFTP ha de ser suficient per emmagatzemar tots els artefactes i no ha d'estar mapejat directament a on el servidor web, d'aplicacions, etcètera, esperi que estigui el binari de l'aplicació. El tractament de l'artefacte desat pel SIC el farà el tècnic de CPD.

### Desplegament automàtic

Aquest tipus de desplegament realitza de forma automàtica el desplegament de l'aplicació a l'entorn indicat.

#### Requeriments

Per tal d'automatitzar els desplegaments, el SIC requereix una sèrie d'accions per part de CPD. Les detallem a continuació en funció de la plataforma/tecnologia utilitzada.

Dreceres:

* Servidors web:
	* <a href="#ServidorWeb">Servidors web</a>
* Sevidors de fitxers:
	* <a href="#ServidorFitxers">Servidors de fitxers</a>
* Servidors d'aplicacions:
	* <a href="#IIS">Servidors IIS</a>
	* <a href="#WL">Servidors Weblogic</a>
	* <a href="#WAS">Servidors Websphere</a>
	* <a href="#Tomcat">Servidors Tomcat</a>
	* <a href="#JBoss">Servidors JBoss</a>
* Servidors de bases de dades:
	* <a href="#Oracle">Bases de dades Oracle</a>
	* <a href="#MySQL">Bases de dades MySQL</a>
	* <a href="#MongoDB">Bases de dades MongoDB</a>
	* <a href="#SQLServer">Bases de dades SQLServer</a>
	* <a href="#PostgreSQL">Bases de dades PostgreSQL</a>

<hr />

<div id="ServidorWeb" style="background-color: #f5f5f5; padding: 10px;">
<div  style="font-weight: bold;margin: 5px 0px;">Servidors web</div>

Per als servidors web, el SIC requereix un usuari i accés al webroot del servidor web per esborrar el contingut estàtic del contexte de l'aplicació i descomprimir el del nou artefacte.

Per tant, el SIC requerirà un __compte SFTP__ que ens ha de permetre **poder fer esborrats de fitxers i carpetes publicats en el webroot**. Es necessita, també, que tots els arxius i subcarpetes que conformen el contingut estàtic tinguin com a owner aquest compte creat. La mida de l'espai assignat pot variar, però generalment 100 MB són suficients. En concret, caldrà facilitar al SIC les següents dades:

* Les dades del compte SSH:
	* Usuari
	* Paraula de pas
	* FQDN del host (nom complet amb el domini inclòs)
	* Port

* El path d'on es troba el contexte de l'aplicació.

<div style="text-align: right; padding: 0px; 5px;"><a href="#requeriments-1">Tornar amunt</a></div>
</div>
<hr />
<div id="ServidorFitxers" style="background-color: #f5f5f5; padding: 10px;">
<div style="font-weight: bold;margin: 5px 0px;">Servidors de fitxers</div>

Per als servidors de fitxers, ens caldrà un **compte SFTP** amb accés directe al directori de l'aplicació. L'usuari ha de tenir permisos per esborrar, modificar i crear carpetes i arxius. Es necessita, també, que tots els arxius i subcarpetes que conformen el contingut tinguin com a owner aquest compte creat. No es requereix cap espai propi, es treballarà directament amb l'espai de l'aplicació.

Caldrà facilitar al SIC:

* Les dades del compte SFTP:
	* Usuari
	* Paraula de pas
	* FQDN del host (nom complet amb el domini inclòs)
	* Port

<div style="text-align: right; padding: 0px; 5px;"><a href="#requeriments-1">Tornar amunt</a></div>
</div>
<hr />
<div id="IIS" style="background-color: #f5f5f5; padding: 10px;">
<div style="font-weight: bold;margin: 5px 0px;">Servidors IIS</div>

Pel que fa als servidors IIS, el SIC fa desplegaments en remot. Per poder-los realitzar ens cal la següent configuració:

* Servei IIS:
	* Permetre l'administració remota del servei IIS
* Compte d'usuari:
	* L'usuari ha de tenir els privilegis suficients per administrar aplicacions i per crear i esborrar carpetes a l'IIS.

Tan bon punt s'hagin realitzat les configuracions, cal informar el SIC amb la següent informació:

* Compte d'usuari:
	* Usuari
	* Paraula de pas
* Servidor:
	* FQDN del host (nom complet amb el domini inclòs)
	* Port
* Dades de l'aplicació:
	* ComputerName
	* IISWebApplicationName

<div style="text-align: right; padding: 0px; 5px;"><a href="#requeriments-1">Tornar amunt</a></div>
</div>
<hr />
<div id="WL" style="background-color: #f5f5f5; padding: 10px;">
<div style="font-weight: bold;margin: 5px 0px;">Servidors Weblogic</div>

Per als servidors Weblogic, el SIC fa redeploys de l'aplicació. Per tant cal pujar l'artefacte a la mateixa ubicació des d'on es va fer el desplegament previ. El servidor ha d'estar preparat per a desplegar l'artefacte empaquetat.

Per tant, perquè el SIC pugui fer desplegaments a plataformes Weblogic, cal configurar:

* Un usuari amb rol deployer al Weblogic amb permisos per poder fer el desplegament.
* Un compte sftp amb accés a la ubicació dels artefactes i permisos per poder sobreescriure'ls.

Un cop s'ha realitzat la configuració, cal transmetre al SIC les següents dades:

* Accessos al weblogic:
	* Usuari amb rol deployer
	* Paraula de pas
	* FQDN del host (nom complet amb el domini inclòs)
	* Port
	* Protocol (t3s, per exemple)
	* AppName
	* ServerName

* Accessos a l'espai dels artefactes:
	* Usuari
	* Paraula de pas
	* FQDN del host (nom complet amb el domini inclòs)
	* Port

<div style="text-align: right; padding: 0px; 5px;"><a href="#requeriments-1">Tornar amunt</a></div>
</div>
<hr />
<div id="WAS" style="background-color: #f5f5f5; padding: 10px;">
<div style="font-weight: bold;margin: 5px 0px;">Servidors Websphere</div>

Pel que respecta als servidors Websphere, el SIC fa desplegaments en remot de l'aplicació. Ens caldrà un usuari amb permisos per fer el redesplegament i la informació relativa a l'aplicació.

En concret, necessitarem:

* Dades del WebSphere i de l'aplicació:
	* Usuari
	* Paraula de pas
	* FQDN del host (nom complet amb el domini inclòs)
	* Port
	* Nom del perfil
	* VirtualHost
	* Clúster
	* Nom de l'apliació
	* Tipus de connexió
	* Workspace

<div style="text-align: right; padding: 0px; 5px;"><a href="#requeriments-1">Tornar amunt</a></div>
</div>
<hr />
<div id="Tomcat" style="background-color: #f5f5f5; padding: 10px;">
<div style="font-weight: bold;margin: 5px 0px;">Tomcat</div>

Pel que fa als servidors Tomcat, el SIC realitza desplegaments remots de l'aplicació. Ens caldrà un usuari amb rol de manager-script i la informació relativa al desplegament.

En concret, necessitarem:

* Dades de l'usuari:
	* Usuari
	* Paraula de pas
* Dades del servidor:
	* Versió de Tomcat
	* FQDN del host (nom complet amb el domini inclòs)
	* Port
	* Protocol d'accés (HTTP/HTTPs)
* Dades de l'aplicació:
	* Contexte

<div style="text-align: right; padding: 0px; 5px;"><a href="#requeriments-1">Tornar amunt</a></div>
</div>
<hr />
<div id="JBoss" style="background-color: #f5f5f5; padding: 10px;">
<div style="font-weight: bold;margin: 5px 0px;">JBoss</div>

Pel que fa als servidors JBoss, el SIC realitza desplegaments remots de l'aplicació. Ens caldrà un usuari administrador i la informació relativa al desplegament.

En concret, necessitarem:

* Dades de l'usuari:
	* Usuari
	* Paraula de pas
* Dades del servidor:
	* Versió de JBoss
	* Domain Controller
	* Port
* Dades de l'aplicació:
	* Server Group
	* Nom de l'artefacte antic
	* Nom de l'artefacte nou (amb path inclòs)
	* Pieze
	* Nom Runtime

<div style="text-align: right; padding: 0px; 5px;"><a href="#requeriments-1">Tornar amunt</a></div>
</div>
<hr />
<div id="Oracle" style="background-color: #f5f5f5; padding: 10px;">
<div style="font-weight: bold;margin: 5px 0px;">BBDD Oracle</div>

Per a les bases de dades Oracle, el SIC realitza els desplegaments connectant-se amb un usuari propi fent proxy authentication contra l'usuari ADM de l'aplicació.

Un cop estigui creat, caldrà transmetre les següents dades al SIC:

* O bé ens cal les dades per separat:
	* Credencials
		* Usuari SIC
		* Paraula de pas de l'usuari SIC
		* Usuari ADM de l'aplicació
	* Connexió
		* FQDN del host (nom complet amb el domini inclòs)
		* Port
		* Servei
		* Instància (si cal)
* O bé la cadena de connexió TNS amb totes les dades anteriors.

<div style="text-align: right; padding: 0px; 5px;"><a href="#requeriments-1">Tornar amunt</a></div>
</div>
<hr />
<div id="MySQL" style="background-color: #f5f5f5; padding: 10px;">
<div style="font-weight: bold;margin: 5px 0px;">BBDD MySQL</div>

Per a les bases de dades MySQL, el SIC realitza els desplegaments connectant-se amb un usuari propi. Caldrà que l'usuari tingui permisos d'administrador dins de la base de dades MySQL de l'aplicació.

Un cop configurat el servidor, transmetre la següent informació al SIC:

* O bé les dades per separat:
	* Usuari
	* Paraula de pas
	*  FQDN del host (nom complet amb el domini inclòs)
	* Port
* O bé la cadena de connexió amb totes les dades anteriors.

<div style="text-align: right; padding: 0px; 5px;"><a href="#requeriments-1">Tornar amunt</a></div>
</div>
<hr />
<div id="MongoDB" style="background-color: #f5f5f5; padding: 10px;">
<div style="font-weight: bold;margin: 5px 0px;">BBDD MongoDB</div>

Per a les bases de dades MongoDB, el SIC realitza els desplegaments connectant-se amb un usuari propi. Caldrà que l'usuari tingui el rol **readWrite**.

Un cop configurat el servidor, transmetre la següent informació al SIC:

* Usuari
* Paraula de pas
* FQDN del host (nom complet amb el domini inclòs)
* Port
* Certificat
* ReplicaSet
* AuthenticationDatabase

<div style="text-align: right; padding: 0px; 5px;"><a href="#requeriments-1">Tornar amunt</a></div>
</div>
<hr />
<div id="SQLServer" style="background-color: #f5f5f5; padding: 10px;">
<div style="font-weight: bold;margin: 5px 0px;">BBDD MS SQLServer</div>

Per a les bases de dades SQLServer, el SIC realitza els desplegaments connectant-se amb un usuari propi. Caldrà que l'usuari tingui permisos per crear, modificar i esborrar objectes a la base de dades així com poder fer sentències INSERT, UPDATE, SELECT i DELETE.

Un cop configurat el servidor, transmetre la següent informació al SIC:

* Usuari
* Paraula de pas
* FQDN del host (nom complet amb el domini inclòs)
* Port

<div style="text-align: right; padding: 0px; 5px;"><a href="#requeriments-1">Tornar amunt</a></div>
</div>
<hr />
<div id="PostgreSQL" style="background-color: #f5f5f5; padding: 10px;">
<div style="font-weight: bold;margin: 5px 0px;">BBDD PostgreSQL</div>

Per a les bases de dades PostgreSQL, el SIC realitza els desplegaments connectant-se amb un usuari propi. Caldrà que l'usuari tingui permisos per crear, modificar i esborrar objectes a la base de dades així com poder fer sentències INSERT, UPDATE, SELECT i DELETE.

Un cop configurat el servidor, transmetre la següent informació al SIC:

* Usuari
* Paraula de pas
* FQDN del host (nom complet amb el domini inclòs)
* Port
* Nom de la base de dades

<div style="text-align: right; padding: 0px; 5px;"><a href="#requeriments-1">Tornar amunt</a></div>
</div>
<hr />

Si teniu cap dubte al respecte, podeu obrir una [consulta](http://canigo.ctti.gencat.cat/howtos/2018-01-howto-obrir-peticions-SIC-a-autoservei-Remedy/#consulta) a SAU Remedy.
