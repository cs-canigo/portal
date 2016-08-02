+++
date        = "2015-08-01"
title       = "SIC. Gestió de dependències per aplicacions .NET"
description = "Procediment de gestió de dependències amb aplicacions .NET al SIC"
section     = "Notícies"
categories  = ["sic"]
+++

## Gestió de dependències amb .NET: NuGet

Durant la tardor de 2015, es va habilitar un nou repositori en el servidor Nexus del SIC que permet emmagatzemar llibreries .NET. Es tracta d'un repositori Nexus compatible amb [NuGet](https://www.nuget.org/). A més, es va habilitar en els servidors d'integració contínua l'ús d'aquest repositori per fer el muntatge de l'aplicació. D'aquesta manera, es garanteix que les llibreries utilitzades són fiables tant en termes de compatibilitat i fiabilitat com de seguretat.

### Llibreries a tenir en compte

Abans de començar, us recordem que s'han de considerar totes les llibreries que no venen incloses en un servidor Windows amb la instal·lació del Framework de .NET.

Un problema que hem trobat de forma recurrent és, per exemple, la no inclusió de les llibreries del client de base de dades Oracle.

Aquestes llibreries s'instal·len als servidors i als entorns de desenvolupament i queden registrades al GAC (Global Assembly Cache) del sistema. Per tant, són llibreries que no cal incloure-les al projecte, ja que tant en l'entorn de desenvolupament com en els entorns d'Integració, Preproducció i Producció ja estan registrades.

Un cop l'aplicació s'integra al SIC, aquest tipus de llibreries s'han d'incloure, ja que si no fos així, els servidors del SIC haurien de tenir totes les versions del client Oracle instal·lades per partida doble (binaris de 32 i 64 bits).

### Com funciona?

Tota dependència que s'hagi d'incloure a un projecte .NET es declara a l'arxiu de projecte (_XXXXX.csproj_ ó _XXXXX.vbproj_). Les llibreries que no són de sistema, queden amb un format similar al següent:

	(...)
    <Reference Include="Oracle.DataAccess, Version=4.121.1.0, Culture=neutral, PublicKeyToken=89b483f429c47342, processorArchitecture=x86">
		<Private>False</Private>
    </Reference>
    (...)

Aquestes llibreries, s'han de declarar com a paquets NuGet. Per tant, a l'arxiu de gestió de dependències NuGet (generalment _packages.config_) s'ha de declarar aquesta dependència:

    <?xml version="1.0" encoding="utf-8"?>
    <packages>
        <package id="Oracle.DataAccess.x86" version="4.121.1.0" targetFramework="net40" />
			(...)
    </packages>

D'aquesta manera es descarregarà la llibreria del repositori Nexus del SIC a la carpeta _/packages_.

Haurem de tornar a l'arxiu de projecte i incloure el path on s'ha descarregat la dependència:

	(...)
    <Reference Include="Oracle.DataAccess, Version=4.121.1.0, Culture=neutral, PublicKeyToken=89b483f429c47342, processorArchitecture=x86">
		<HintPath>..\packages\Oracle.DataAccess.x86.4.121.1.0\lib\net40\Oracle.DataAccess.dll</HintPath>
		<Private>False</Private>
    </Reference>
    (...)

Per tal que l'empaquetat de l'aplicació continuï funcionant a l'entorn de desenvolupament, caldrà afegir la referència al Repository NuGet del Nexus de SIC (http://hudson.intranet.gencat.cat/nexus/content/groups/nuget-group/) al vostre _Nuget.config_.

Tot i així, en molts aspectes no és necessari haver d'arribar a tant baix nivell. La comunitat .NET ofereix les següents solucions:

* NuGet Package Explorer: Per explorar paquets NuGet i construir-los visualment.
* NuSpec Reference Generator: Generar dependències per a nuspec
* NuProj: Creador avançat de paquets NuGet amb intergació amb Visual Studio.

Per a les llibreries de codi obert publicades al NuGet Gallery i per a les llibreries pròpies del proveïdor, no caldrà fer cap tasca adicional. Per a la resta de llibreries, com per exemple el client Oracle, caldrà facilitar-li al SIC el paquet Nuget o l'artefacte .dll corresponent identificant l'*arquitectura* (**x86** o **x64**), la *versió* i el *targetFramework*.