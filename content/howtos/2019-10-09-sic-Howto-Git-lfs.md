+++
date        = "2019-10-11"
title       = "Utilitzar Git-lfs per a arxius de gran tamany"
description = "Howto per a configurar i utilitzar Git-lfs que dóna suport a arxius de gran tamany al servei de custodia de codi"
#section     = "howtos"
#categories  = ["sic"]
key         = "NOVEMBRE2019"
+++

## A qui va dirigit

Aquest how-to va dirigit a tots aquells perfils tècnics que necessitin fer ús de l'extensió Git LFS per a poder incloure arxius al servei de custòdia de codi (Gitlab) que superin la limitació de 25 MB.

## Introducció

Tot i que Git és ben conegut com a sistema de control de versions, l'ús de Git LFS (emmagatzematge d'arxius grans) sovint és desconegut per als usuaris de Git.
Git LFS és un projecte de codi obert i és una extensió de Git. El seu objectiu és treballar de manera més eficient amb arxius grans i arxius binaris en el repositori donat:

- Els arxius grans faran **créixer l'historial** del repositori cada cop que s'actualitzin;
- Els arxius grans faran que les **operacions sobre el projecte s'alenteixin**;
- Git considerarà una **actualització d'un arxiu binari com un canvi complet de l'arxiu**, per la qual cosa no només s'emmagatzemaran les diferències i, si es fan canvis freqüents, el
repositori anirà creixent de tamany i les comandes Git cada cop seran més lentes.

Per tant, si disposa d'arxius grans en el seu repositori i/o molts binaris, és recomanable usar Git LFS.

Git LFS utilitza punters en lloc d'arxius reals quan els arxius (o tipus d'arxius) es troben marcats com a arxius LFS.

## Requisits que cal complir

Per a utilitzar-lo dins d'un projecte cal que **tots els col·laboradors instal·lin l'extensió** en el lloc de treball. Com ja s’ha comentat, Git LFS és una extensió de Git i, per tant, cal instal·lar-se per separat.

## Com dur a terme la instal·lació

Les instruccions d'instal·lació les podeu trobar a:

* [Instal·lació Windows](https://github.com/git-lfs/git-lfs/wiki/Installation#windows)
* [Instal·lació Linux](https://github.com/git-lfs/git-lfs/wiki/Installation#debian-and-ubuntu)


Un cop instal·lat, en qualsevol projecte podrem indicar les extensions dels fitxers que cal incloure en el Git LFS mitjançant la següent comanda executada a l'arrel del projecte:

```
git lfs track "*.iso"
```

Aquesta instrucció s'encarregarà de generar un fitxer **.gitattributes** que haurem d'incloure en el nostre projecte git.

![Git-lfs](/related/sic/git-lfs.png)
<br/>

Es recomana confirmar i enviar aquest arxiu al repositori perquè tots els desenvolupadors treballin amb la mateixa configuració de Git LFS.

## Com funciona

Un cop instal·lat el component i indicades les extensions dels fitxers afectades, en endavant tots els fitxers amb extensió afectada (.iso en l’exemple) es pujaran automàticament al Git LFS del servidor evitant les restriccions de tamany.

Git LFS **accepta expressions regulars** semblants a les que podem trobar en el fitxer .gitignore, per tant el tracking pot ser tant d'un fitxer com de grups de fitxers per extensió o altres configuracions que siguin necessàries.

Quan s'extrau un arxiu Git LFS al repositori local, l'arxiu s'envia a través d'un filtre que reemplaçarà el punter per l'arxiu real.
L'extensió Git LFS permet integrar **fitxers d'àudio, de vídeo i gràfics** en el nostre codi font sense incrementar el tamany en el repositori central i evitant possibles problemes de rendiment en el servidor.

## Consells

- La **caché local de Git LFS no es netejarà automàticament** pel que, de forma regular, cal executar la següent comanda:
```
git lfs prune
```
- Asseguri’s que **tots els desenvolupadors tinguin instal·lat Git LFS** doncs, si algú sense l’extensió confirma un arxiu que hauria d’estar associat amb Git LFS, obtindrà errors estranys que, tot i que són esmenables, millor evitar-los.
- Abans de decidir assignar binaris a un repositori Git cal pensar en si **realment és necessari** fer control de versions i si existeix alguna alternativa basada en text.

<br/><br/>
La documentació oficial la podeu trobar a la [Web Oficial](https://docs.gitlab.com/ee/workflow/lfs/manage_large_binaries_with_git_lfs.html)
