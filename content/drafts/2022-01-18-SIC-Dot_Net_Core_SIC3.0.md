+++
date        = "2022-01-18"
title       = "SIC. .Net Core al SIC 3.0"
description = "A partir del 01/02/2022 es posa en servei la dotació de construcció i desplegament d’aplicacions .NET Core al SIC 3.0."
#sections    = ["Notícies", "home"]
#categories  = ["SIC"]
#key         = "FEBRER2022"
+++

## Introducció

El **Servei d'Integració Contínua és un servei a disposició dels proveïdors d'aplicacions per a automatitzar el desplegament
de les aplicacions**.

**.Net Core és un framework de Microsoft pel desenvolupament d'aplicacions i llibreries**. .Net Core és el successor multiplataforma de .Net Framework, que quedarà en desús, quedant només .Net Core com a únic estàndard.

## Novetats

A partir del 01/02/2022 es posa en servei la dotació de construcció i desplegament d’aplicacions .NET Core al SIC 3.0. Amb aquest canvi s'assoleix l'objectiu de dotar a la plataforma SIC 3.0 de la possibilitat de construir i desplegar en plataformes de contenidors aplicacions .NET Core. Les versions de .Net Core suportades són 3.1 i 5.0.

Així les pipelines dels jobs del SIC 3.0 permeten:

* La construcció d’aplicacions .NET Core amb la corresponent resolució de dependències, tant externes com internes, utilitzant el repositori d'artefactes.
* El desplegament d’aplicacions .NET Core en plataformes de contenidors.
* El desplegament de llibreries .NET Core utilitzant el repositori d'artefactes.

## Utilització

S'ha actualitzat la [Matriu de tecnologies de construcció](/drafts/ci/#matriu-de-tecnologies-de-construcci%C3%B3) del SIC 3.0, afegint la taula de tecnologíes Microsoft suportades pel SIC 3.0

Per a construir una aplicació o llibreria en .Net Core al SIC 3.0 és necessari utilitzar una imatge de dotnet builder disponibles a:

https://docker-registry.ctti.extranet.gencat.cat/harbor/projects/129/repositories/gencat-sic-builders%2Fdotnet-builder

El codi font dels builders de dotnet està disponible a:

https://git.intranet.gencat.cat/0192-intern/sic-builders/dotnet-builder

S'ha afegit exemples d'aca de construcció i desplegament d'aplicacions amb .Net Core i de contrucció i desplegament de llibreries amb .Net Core a la documentació [Com construir el fitxer ACA](/drafts/fitxer-aca/) del SIC 3.0:

* [Construcció aplicació .Net Core i desplegament al Kubernetes CaaS](/related/sic/3.0/aca_const_despl_dotnet_kubernetes_caas.yml)
* [Construcció i publicació de llibreria .Net Core al Nexus](/related/sic/3.0/aca_const_publi_nexus_dotnet_lib.yml)

<br/>
Per a més informació:

- [Servei d'Integració Contínua](/sic30-serveis/ci/)

<br/><br/>
Si teniu qualsevol dubte o problema podeu revisar les [**Preguntes Freqüents**] (/sic/faq) o utilitzar els canals de [**Suport**] (/sic/suport).
