+++
date        = "2019-10-11"
title       = "Utilitzar Git-lfs per a arxius de gran tamany"
description = "Howto per a configurar i utilitzar Git-lfs que dóna suport a arxius de gran tamany al servei de custodia de codi"
#section     = "howtos"
#categories  = ["sic"]
key         = "NOVEMBRE2019"
+++

## A qui va dirigit

Aquest how-to va dirigit a tots aquells perfils tècnics que necessitin fer ús de l'extensió git-lfs per a poder incloure arxius al servei de custodia de codi (Gitlab) que superin la limitació de 25 MB.

## Introducció

L'extensió Git-lfs permet integrar fitxers d’audio, de vídeo i gràfics en el nostre codi font sense incrementar el tamany en el repositori central i evitant possibles problemes de rendiment en el servidor.

## Requisits

Per a utilitzar-lo dins d'un projecte cal que **tots els col·laboradors instal·lin l'extensió** en el lloc de treball.

## Instal·lació

Les instruccions d'instal·lació les podeu trobar a:

* [Instal·lació Windows](https://github.com/git-lfs/git-lfs/wiki/Installation#windows)
* [Instal·lació Linux](https://github.com/git-lfs/git-lfs/wiki/Installation#debian-and-ubuntu)


Un cop instal·lat, en qualsevol projecte podrem indicar les extensions dels fitxers que cal incloure en el git-lfs mitjançant la següent comanda executada a l'arrel del projecte:

```
   git lfs track "*.iso"

Aquesta instrucció s'encarregarà de generar un fitxer **.gitattributes** que haurem d'incloure en el nostre projecte git.

## Funcionament

Un cop instal·lat el component i indicades les extensions dels fitxers afectades, en endavant tots els fitxers amb extensió afectada (.iso en l’exemple) es pujaran automàticament al mòdul lfs del servidor evitant les restriccions de tamany.

**Lfs** accepta expressions regulars semblants a les que podem trobar en el fitxer .gitignore, per tant el tracking pot ser tant d'un fitxer com de grups de fitxers per extensió o altres configuracions que siguin necessàries.

<br/><br/>
La documentació oficial per el gitlab la podeu trobar a la [Web Oficial](https://docs.gitlab.com/ee/workflow/lfs/manage_large_binaries_with_git_lfs.html)