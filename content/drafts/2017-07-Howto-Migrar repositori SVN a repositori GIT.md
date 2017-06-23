+++
date        = "2017-07-01"
title       = "Migrar repositori SVN a repositori GIT"
description = "Migrar repositori SVN a repositori GIT"
section     = "howtos"
categories  = ["sic"]
key         = "JULIOL2017"
+++

### A qui va dirigit

Aquest how-to va dirigit a tots aquells Release Manager que vulguin migrar el codi del repositori SVN del SIC al GIT del SIC.

### Introducció

Degut al llançament de [SIC 2.0] (/noticies/2017-06-07-SIC-SIC_2.0/) s'ha de migrar el codi de SVN a GIT, aquest HowTo té la finalitat de proporcionar una guia per a realitzar aquesta migració.

### Prerrequisits

S'ha de tenir instal·lats els paquets git, git-svn i svn.

### Obtenir els autors

Primer de tot, s'ha d'obtenir qui ha modificat els arxius del SVN, per fer això s'ha preparat un [script bash amb una llibreria java que realitza aquest procés] (/related/sic/howto/obtenirAutors.zip).

S'ha de descarregar el fitxer i descomprimir a la carpeta dessitjada, en aquest howto /migracio.

Anar a /migracio i executar:

	./obtenirAutors.sh $1 $2 $3 $4

On els paràmetres són:
	
	$1 -> acrònim del departament (En una ruta com http://svn.intranet.gencat.cat/ctt/0192/) seria ctt )
	$2 -> codi de diàleg (Per exemple 0192)
	$3 -> usuari SVN
	$4 -> password SVN
	
Aquest procés et genera un fitxer author.txt

### Obtenir les dades del SVN

Per a obtenir les dades del SVN que s'han de migrar, dintre de la carpeta /migracio (on es troba el fitxer author.txt) executar:

	git svn clone --authors-file=author.txt http://svn.intranet.gencat.cat/$1/$2/$3 --no-metadata -s $4
	
On s'ha de substituir les variables segons:

	$1 -> acrònim del departament (En una ruta com http://svn.intranet.gencat.cat/ctt/0192/) seria ctt )
	$2 -> codi de diàleg (Per exemple 0192)
	$3 -> path de la carpeta que conté les carpetes tags, trunk i branches. En cas que estiguin a l'arrel no posar res.
	$4 -> nom de la carpeta que es crea al sistema de fitxers locals on es deixa el codi
	
### Tractament del codi SVN

Accedir a la carpeta que s'ha creat en el punt anterior ($4) i abans de pujar el codi a GIT executar les següents comandes:

	cp -Rf .git/refs/remotes/origin/tags/* .git/refs/tags/
	rm -Rf .git/refs/remotes/origin/tags
	cp -Rf .git/refs/remotes/* .git/refs/heads/
	rm -Rf .git/refs/remotes

### Crear projecte en GIT

Per a crear el projecte en GIT heu d'accedir a https://git.intranet.gencat.cat/ anar al grup del vostre codi de diàleg i prèmer **New Project**

### Pujar el codi a GIT

Continuem en la carpeta on s'ha desat el codi SVN i executar:

	git remote add origin https://$1@git.intranet.gencat.cat/$2/$3.git
	
On s'ha de substituir les variables segons:

	$1 -> usuari gitlab
	$2 -> codi de diàleg (Per exemple 0192)
	$3 -> Nom del projecte de gitlab

Per finalitzar es puja el codi a GIT
	
	git push origin --all
	git push --tags
	
