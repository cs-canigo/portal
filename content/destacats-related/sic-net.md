+++
date        = "2015-06-30"
title       = ".NET al SIC"
description = ""
section     = "SIC"
+++


La integració del llenguatge .NET al SIC s'està realitzant gràcies a l'ús dels diferents slaves Windows que formen part del nou SIC Multi-CPD. Aquests slaves amb SO Windows permeten la compilació de .NET. Per més informació del nou model SIC MUlti-CPD podeu seguir el següent [enllaç](http://canigo.ctti.gencat.cat/noticies/2015-04-30-SIC-Master-Slave-CPD4/) on es presenta el primer slave posat en marxa a CPD4-TSystems.

Des de l'equip del SIC s'està treballant en els següents punts:

* *Custodia de codi*: gestió de versions al SVN del codi font de les aplicacions. Caldrà sol·licitar excepcions per poder emmagatzemar fitxers .dll al SVN.
* *Compilació*: ús del plugin MSBuild de Jenkins per la compilació d'aplicacions .NET. Caldrà especificar la versió de .NET i Visual Studio (mòduls Web i WebApplications). Gestió de dependències amb [NuGet](https://www.nuget.org/).
* *Auditories*: integració amb Fortify (Anàlisi de Seguretat) i CAST (Anàlisi de Qualitat) per auditories de codi.
* *Desplegaments*: desplegaments a IIS amb MSDeploy.

Un cop hagi finalitzat aquesta integració, es notificarà en un comunicat amb tot el detall pel seu ús per part dels proveïdors d'aplicacions.