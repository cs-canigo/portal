+++
date = "2023-06-12"
title = "Registre d'imatges"
description = "El Registre d'imatges del SIC proporciona un catàleg d'imatges per als proveïdors d'aplicacions i allotja les imatges de les aplicacions desplegades via SIC a diferents plataformes de contenidors."
section = "SIC"
toc = true
aliases = [
    "/sic30-serveis/registre-imatges/"
]
taxonomies = []
weight = 6
+++

## Introducció

[**Harbor**](https://goharbor.io/) és l'eina implantada al SIC per al Registre d'imatges Docker, i es  tracta d'un servei
que dona resposta a diferents necessitats de la corporació:

- Proporcionar un **catàleg d'imatges de construcció**,
- Proporcionar un **catàleg d'imatges base per a les aplicacions**,
- Persistir i gestionar les **imatges de les aplicacions** de cara a dur a terme els desplegaments sobre el núvol privat i públic.

Hi destaquen les següents característiques:

- **Gestió d’usuaris RBAC**: els repositoris estan organitzats en projectes. Permet assignar permisos i rols als diferents
usuaris a cada projecte.
- **Portal web**: permet navegar per les imatges dels diferents projectes, veure el detall de repositoris i artefactes,
detectar vulnerabilitats i altres.
- **API REST**: gran part de les operacions efectuades des del portal web, es poden fer via API.
- **Anàlisi de vulnerabilitats**: totes les imatges repositades són analitzades amb l’eina
[Trivy](https://github.com/aquasecurity/trivy) per identificar les diferents vulnerabilitats.
- **Auditoria**: totes les acciones que es facin sobre el registre queden registrades per poder ser analitzades en auditories.

## Catàlegs d'imatges de construcció

El SIC actualment utilitza la [tecnologia Docker](https://www.docker.com/) per a disposar d’un **entorn aïllat i immutable
de construcció que, a més pugui ser utilitzat i testejat pels propis proveïdors**. Amb aquest objectiu, el SIC proporciona
un catàleg corporatiu d’imatges de construcció.

### Imatges de construcció

Podeu accedir al catàleg d'imatges per a la construcció d'aplicacions (`gencat-sic-builders`) mitjançant el següent enllaç:
https://registreimatges.sic.intranet.gencat.cat/harbor/projects/6/repositories.

![Harbor images](/related/sic/3.0/harbor_gencatsic-builders_images.png)
</br>

Es tracta d'un projecte amb un nivell d'accés públic, per la qual cosa, serà accessible per a qualsevol usuari,
autenticat o no.

### Codi font i documentació

Podeu accedir al codi font del catàleg d'imatges, i a la documentació associada, mitjançant el següent enllaç: </br>
https://git.intranet.gencat.cat/0192-intern/sic-builders.

![Gitlab projects](/related/sic/3.0/docker_images_project.png)
</br>

## Catàleg d'imatges base per a les aplicacions

El Centre de Suport Cloud proporciona un catàleg corporatiu d'imatges base per a les aplicacions.

### Imatges base

Podeu accedir al catàleg d'imatges base per a les aplicacions (`gencatcloud`) mitjançant el següent enllaç:
https://registreimatges.sic.intranet.gencat.cat/harbor/projects/8/repositories.

![Harbor images](/related/sic/3.0/harbor_gencatcloud_images.png)
</br>

Es tracta d'un projecte amb un nivell d'accés públic, per la qual cosa, serà accessible per a qualsevol usuari,
autenticat o no.

### Codi font i documentació

Podeu accedir al codi font del catàleg d'imatges, i a la documentació associada, mitjançant el següent enllaç: </br>
https://git.intranet.gencat.cat/3048-intern/imatges-docker.

![Gitlab projects](/related/sic/3.0/docker_gencatcloud_project.png)
</br>

## Imatges de les aplicacions

Totes les aplicacions basades en contenidors desplegades via SIC, estan integrades amb el Registre d'imatges corporatiu, de
forma que, **cada imatge que es desplegui a les diferents plataformes en contenidors quedaran repositades** a aquest servei.


## Funcionament

### Accés al servei

Podrà accedir mitjançant el següent enllaç: https://registreimatges.sic.intranet.gencat.cat/.
Per a poder accedir via VPN cal assegurar que es disposa de connectivitat pel port 443/TCP i, en cas de no disposar
de connectivitat, caldrà obrir una petició demanant l’obertura de Tallafocs dels seus entorns.

</br>
Haurà d’autenticar-se amb les seves credencials d’accés GICAR, amb la següent visibilitat:

- Disposaran d'**accés de lectura als diferents catàlegs públics** d'imatges,

- **Els Release Managers disposaran d'accés en mode lectura a les imatges de les seves aplicacions**. Si no disposa d’accés,
haurà de sol·licitar-ho al seu responsable.

![Harbor login](/related/sic/3.0/harbor_login-new.png)
</br>

### Ús del registre privat

Podeu consultar el següent article: [Utilitzar imatges Docker Builder](/howtos/2022-07-06-SIC-Howto-utilitzar-imatges-docker-builder).

### Aspectes a tenir en compte

A continuació es detalla la relació de principals aspectes a tenir en compte:

- Les pipelines de desplegament etiquetaran les imatges de les aplicacions amb l'**etiqueta `production` si aquestes
s'han desplegat amb èxit a producció**. A tal efecte, les pipelines incorporen l'etapa `Registry label` que
s'encarregarà de realitzar aquesta acció.

- No s'aplica una política d'immutabilitat d'imatges, per la qual cosa, els usuaris poden tornar a pujar una imatge
amb la mateixa etiqueta (tag) i això implicarà que la imatge anterior se sobreescriurà, de forma que l'etiqueta passarà
a apuntar a la nova imatge quedant l'anterior sense aquesta. Aquestes **imatges sense etiqueta seran eliminades automàticament
pel procés de neteja setmanal**. Cal, per tant, tenir-ho en compte i evitar referenciar imatges pel seu sha256 recomanant
fer-ho per etiqueta.

- S'aplica una **política de retenció** sobre les imatges de les aplicacions, de forma que únicament es respectaran les
últimes 10 versions productives de cada repositori i altres versions amb antiguitat inferior o igual a 90 dies.

<br/><br/><br/>
Si voleu més informació podeu consultar la secció de [**Guies**](/plataformes/sic/guies/sic30-guies/). <br/>
Si teniu qualsevol dubte o problema podeu revisar les [**Preguntes Freqüents**](/sic/faq) o utilitzar els canals de [**Suport**](/sic/suport).