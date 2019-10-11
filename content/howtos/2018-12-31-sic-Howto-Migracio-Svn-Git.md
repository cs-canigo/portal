+++
date        = "2018-12-31"
title       = "Migració de repositoris SVN al Git"
description = "Howto per dur a terme la migració de repositoris del SVN al Git"
#section     = "howtos"
#categories  = ["sic"]
key         = "DESEMBRE2018"
+++

## A qui va dirigit

Aquest how-to va dirigit a tots aquells perfils tècnics que encara no hagin migrat el codi font de les seves aplicacions cap a l'eina actual de custodia de codi font al SIC (Gitlab).

## Introducció

L'eina actual de custodia de codi font al SIC és Gitlab i l'anterior eina SVN (Subversion) ha quedat operativa en mode lectura fins a finalitzar la migració de repositoris.

Per a més informació: [Custodia de codi font] (/sic-serveis/scm/)

## Requisits

Per aplicacions que encara no hagin migrat el seu codi font, podran fer-ho si s'acompleixen els següents requisits:

* Utilitzar un sistema operatiu Linux i tenir instal·lats els paquets git, git-svn i svn.
* El repositori a migrar **no pot contenir binaris** (.jar, .war, .ear, .dll, .exe, carpeta "node_modules") **ni arxius de mida superior a 25 MB**.
Actualment el repositori original a SVN es troba disponible en mode lectura per a poder accedir a l'historial. Per a dur a terme la migració al nou sistema, caldrà seguir les següents passes:

## Procediment a seguir

A continuació s'explica el procediment que cal seguir per dur a terme la migració.

### 1. Eliminació de binaris

El Git del SIC té restriccions alhora de pujar fitxers binaris, fet que pot provocar errors en el procés de migració. Aquests repositoris que tinguin binaris no es podran migrar al Git, romandran en el SVN en mode lectura. Per aquests casos, per començar a treballar amb Git s'haurien de seguir els següents passos:

* Descarregar el darrer tag del SVN
* Eliminar els binaris. Podem tenir dos casos:
	- Binaris prescindibles: es poden generar a partir de codi font de l'aplicació, i per tant, no cal conservar-los
	- Binaris no prescindibles: s'han d'ubicar en el [servei de custodia de binaris](/sic-serveis/binaris/) o al [Nexus](https://hudson.intranet.gencat.cat/nexus/) del SIC.
* Inicialitzar el repositori Git local (git init)
* Fer el commit, push i tag d'aquesta versió inicial al Git
Un cop finalitzat aquest procés al Git es disposarà del tag més recent. L'històric es mantindrà al SVN en mode lectura.

<br/>
### 2. Obtenir els autors

En primer lloc, s'ha de consultar qui ha modificat els arxius del SVN. Per fer això s'ha preparat un [job de Jenkins] (https://hudson.intranet.gencat.cat/hudson/job/MIGRACIO_GENERAR_AUTORS/).

S'ha d'executar aquest job informant els següents paràmetres:

	DEPARTAMENT -> acrònim del departament (En una ruta com http://svn.intranet.gencat.cat/ctt/0192/) seria ctt )
	CODI_DIALEG -> codi de diàleg (Per exemple 0192)

Una vegada executat el job envia per email el fitxer author.txt a l'usuari que ha executat el job.

S'ha de descarregar i desar el fitxer a la carpeta desitjada, en aquest howto /migració.

A més d'obtenir el fitxer author.txt, s'ha de descarregar el següent [fitxer] (/related/sic/howto/unknown_author.zip) i descomprimir-lo en la mateixa carpeta (/migracio). Aquest zip conté un procés per a evitar errors en el següent pas.

<br/>
### 3. Obtenir les dades del SVN

Per a obtenir les dades del SVN que s'han de migrar, dintre de la carpeta /migracio (on es troba el fitxer author.txt) executar:

	git svn clone --authors-file=author.txt --authors-prog=unknown_author.sh http://svn.intranet.gencat.cat/$1/$2/$3 --no-metadata -s $4

On s'ha de substituir les variables segons:

	$1 -> acrònim del departament (En una ruta com http://svn.intranet.gencat.cat/ctt/0192/) seria ctt )
	$2 -> codi de diàleg (Per exemple 0192)
	$3 -> path de la carpeta que conté les carpetes tags, trunk i branches. En cas que estiguin a l'arrel no posar res.
	$4 -> nom de la carpeta que es crea al sistema de fitxers locals on es deixa el codi

<br/>
### 4. Tractament del codi SVN

Accedir a la carpeta que s'ha creat en el punt anterior ($4) i abans de pujar el codi a Git executar les següents comandes:

	cp -Rf .git/refs/remotes/origin/tags/* .git/refs/tags/
	rm -Rf .git/refs/remotes/origin/tags
	cp -Rf .git/refs/remotes/* .git/refs/heads/
	rm -Rf .git/refs/remotes
	for i in $(ls .git/refs/tags/ -1 | grep '@'); do rm ".git/refs/tags/$i"; done

<br/>
### 5. Crear projecte en Git

Per a crear el projecte en Git heu d'accedir a https://git.intranet.gencat.cat anar al grup del vostre codi de diàleg i prémer l'acció "New Project".

<br/>
### 6. Pujar el codi a Git

A la carpeta on s'ha desat el codi del SVN executar:

	git remote add origin https://$1@git.intranet.gencat.cat/$2/$3.git

On s'ha de substituir les variables segons:

	$1 -> usuari GitLab
	$2 -> codi de diàleg (Per exemple 0192)
	$3 -> Nom del projecte de GitLab

Per finalitzar es puja el codi a Git

	git push origin --all
	git push --tags

És molt important analitzar el log que mostra Git per pantalla per assegurar que no hi ha errors i s'han migrat tant el trunk com tots els tags.