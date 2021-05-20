+++
date = "2021-05-20"
title = "Catàleg d'imatges builder"
description = "El catàleg d'imatges del SIC proporciona imatges Docker builder als proveïdors d'aplicacions."
sections = "SIC"
toc = true
taxonomies = []
weight = 6
+++

## Introducció

El SIC actualment utilitza la [tecnologia Docker](https://www.docker.com/) per a disposar d’un **entorn aïllat i immutable
de construcció que, a més pugui ser utilitzat i testejat pels propis proveïdors**.
Per defecte, Docker està configurat per a utilitzar el registre públic [Docker Hub](https://hub.docker.com/) com a repositori d’imatges.
No obstant això, **les imatges que utilitzarà SIC per a la construcció es troben allotjades un registre docker privat**
escollit per la Generalitat de Catalunya: [Harbor](https://goharbor.io/).

![Pipeline del SIC](/related/sic/3.0/harbor_login.png)
</br>

El registre Docker privat de la Generalitat de Catalunya, està disponible a: https://docker-registry.ctti.extranet.gencat.cat.
Es tracta d’un registre privat sense cap repositori d'accés públic.

## Imatges de construcció

Podeu accedir al catàleg d'imatges per a la construcció d'aplicacions (`builder`) mitjançant el següent enllaç:
https://docker-registry.ctti.extranet.gencat.cat/harbor/projects/129/repositories.

![Pipeline del SIC](/related/sic/3.0/harbor_docker_images.png)
</br>

## Permisos d'accés

Per a disposar d'accés a les imatges Docker utilitzades al SIC és necessari contactar amb l'Oficina Tècnica de Canigó a través dels
canals establerts: https://canigo.ctti.gencat.cat/sic/suport/. L'Oficina subministrarà al proveïdor d’aplicacions un usuari
amb permís de lectura al projecte **gencat-sic-builders** que conté les imatges Docker utilitzades pel SIC.

## Codi font i documentació

Podeu accedir al codi font del catàleg d'imatges, i a la documentació associada, mitjançant el següent enllaç: </br>
https://git.intranet.gencat.cat/0192-intern/sic-builders.

![Pipeline del SIC](/related/sic/3.0/docker_images_project.png)
</br>

## Ús del registre privat

Podeu consultar el següent article: [Utilitzar imatges Docker Builder](/howtos/2021-05-06-sic30-SIC-Howto-utilitzar-imatges-docker-builder).

<br/><br/><br/>
Si voleu més informació podeu consultar la secció de [**HOWTOs i manuals**](/sic30-guies/). <br/>
Si teniu qualsevol dubte o problema assegureu-vos de no trobar resposta a les [**FAQ**] (/sic/sic30-faq) i utilitzeu el
canal de [**Suport**] (/sic/sic30-suport) o contacteu amb l'Oficina Tècnica Canigó CTTI a través del correu
electrònic: **oficina-tecnica.canigo.ctti@gencat.cat**.