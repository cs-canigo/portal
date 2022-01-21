+++
date        = "2022-01-18"
title       = "SIC. .NET Core al SIC 3.0"
description = "A partir del dd/mm/yyyy es passa a donar cobertura a la construcció i desplegament d’aplicacions .NET Core al SIC 3.0."
#sections    = ["Notícies", "home"]
#categories  = ["SIC"]
#key         = "FEBRER2022"
+++

## Introducció

El **Servei d'Integració Contínua és un servei a disposició dels proveïdors d'aplicacions per a automatitzar el desplegament
de les aplicacions**. Per la seva banda, **.NET Core és un Framework de Microsoft pel desenvolupament d'aplicacions** considerant-se
el successor multiplataforma de .NET Framework que acabarà quedant en desús passant a ser .NET Core l'únic estàndard.

## Novetats

**A partir del dd/mm/yyyy es passa a donar cobertura a la construcció i desplegament d'aplicacions .NET Core al SIC 3.0**.
Amb aquest evolutiu s'assoleix l'objectiu de dotar a la plataforma SIC 3.0 de la possibilitat de construir i desplegar en
plataformes de contenidors aplicacions .NET Core.
Les **versions de .NET Core suportades actualment són: 3.1 i 5.0**.

<br/>
Per tant, les pipelines del SIC 3.0 passen a permetre:

* La publicació de llibreries .NET Core al repositori d'artefactes del SIC.

* La construcció d’aplicacions .NET Core amb la corresponent resolució de dependències, tant externes com internes,
utilitzant el repositori d'artefactes del SIC.

* El desplegament d’aplicacions .NET Core en plataformes de contenidors.

<br/>
Per a construir una aplicació o llibreria .NET Core al SIC 3.0 serà necessari fer ús d'una imatge de construcció de dotnet disponible al
[Catàleg d'imatges corporatiu](/sic30-serveis/cataleg-imatges/), on s'indica també com accedir al codi font d'aquestes.

## Documentació

S'ha actualitzat la [Matriu de tecnologies de construcció](/sic30-serveis/ci/#matriu-de-tecnologies-de-construcció) del SIC 3.0,
afegint la taula de les noves tecnologies Microsoft suportades.

<br/>
Es proporcionen nous exemples de fitxers `aca.yml` per a la construcció i desplegament d'aplicacions .NET Core,
així com perde contrucció i publicació de llibreries:

* [Construcció aplicació .NET Core i desplegament al Kubernetes CaaS](/related/sic/3.0/aca_const_despl_dotnet_kubernetes_caas.yml)

* [Construcció i publicació de llibreria .NET Core al Nexus](/related/sic/3.0/aca_const_publi_nexus_dotnet_lib.yml)

<br/>
Per a més informació:

- [Servei d'Integració contínua](/sic30-serveis/ci/)
- [Catàleg d'imatges builder](/sic30-serveis/cataleg-imatges/)
- [Com utilitzar imatges Docker Builder](/howtos/2021-07-13-SIC-Howto-utilitzar-imatges-docker-builder/)
- [Com construir el fitxer ACA](/sic30-guies/fitxer-aca/)

<br/><br/>
Si teniu qualsevol dubte o problema podeu revisar les [**Preguntes Freqüents**] (/sic/faq) o utilitzar els canals de [**Suport**] (/sic/suport).