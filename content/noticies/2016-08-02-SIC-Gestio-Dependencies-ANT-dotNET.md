+++
date        = "2015-08-02"
title       = "SIC. Gestió de dependències per aplicacions .NET i JAVA al SIC"
description = "El SIC ha incorporat les tecnologies ANT i .NET. Us expliquem com implementar la gestió de dependències amb aquestes tecnologies."
section     = "Notícies"
categories  = ["sic"]
+++

## Gestió de dependències al SIC

L'única forma fins a l'actualitat de gestionar dependències al SIC era mitjançant [Apache Maven](http://maven.apache.org/). Aquesta gestió de dependències només era possible en aplicacions JAVA i utilizava [Nexus](http://www.sonatype.com/download-oss-sonatype) com a repositori d'artefactes.

Us recordem que, per defecte, no es permet la inclusió de llibreries i/o artefactes (.jar, .war, .ear, .dll...) al repositori de codi SVN del SIC. Aquests elements es poden obtenir de 3 formes diferents:

* Si es tracta d'una llibreria del proveïdor, aquesta es generarà en el propi procés de construcció de l'aplicació.
* Si no és una llibreria del proveïdor:
	* Si és una llibreria que es pot obtenir d'un repositori Maven / NuGet oficial, el servidor Nexus l'obtindrà en el procés  de construcció de l'aplicació.
	* Si és una llibreria que no es troba en cap repositori oficial, s'haurà de facilitar en el procés d'integracióde l'aplicació al SIC per a que sigui inclosa al repositori Nexus de forma manual.

A continuació, amb l'experiència adquirida gràcies a la integració de les primeres aplicacions ANT i .NET al SIC, hem desenvolupat uns procediments per a que les aplicacions JAVA-ANT i .NET puguin gestionar dependències al SIC.

Si hi esteu interessats, premeu els següents enllaços:

* [Gestió de dependències amb .NET: NuGet](/noticies/2016-08-02-SIC-Gestio-Dependencies-dotNET)
* [Gestió de dependències amb JAVA utilitzant ANT](/noticies/2016-08-02-SIC-Gestio-Dependencies-ANT)

