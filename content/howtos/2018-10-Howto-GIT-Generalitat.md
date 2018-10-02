+++
date = "2018-10-02"
title = "Proposta de treball amb GIT de la Generalitat"
description = "En aquest HowTo es proposa i s'explica un mètode de treball amb GIT de la Generalitat"
section = "howtos"
categories = ["canigo"]
key = "NOVEMBRE2018"
+++

## Audiència

Aquest how-to va dirigit principalment al personal tècnic (desenvolupadors i integradors) que treballin amb l'eina GIT directament.

## Contexte

El SIC disposa d'un repositori GIT on (anomenat d'ara en andavant "GIT del SIC" o "SIC" directament) emmagatzemar i centralitzar les versions lliurables del codi. En aquest context, el workflow de treball proposat es compon de 2 repositoris:

1. El repositori corporatiu amb el qual es desenvolupa el treball normal amb el codi: **origin**
2. El repositori del SIC de la Generalitat on es puja el codi lliurable: **gencat**

## Workflows

Un cop definits els 2 repositoris, el seu nom i rols, el mètode proposat per treballar de manera integrada amb el SIC, és seguir el workflow estàndard de GIT: una branca **develop** amb la línia de desenvolupament principal, i una branca **master** amb la línia de desplegaments a PRO.

### Inicialització i integració (només la primera vegada)

**IMPORTANT**: Aquest pas dóna per fet que el codi que hi ha al repositori **gencat** és més nou (i té precedència) respecte el repositori **origin**, es _recomana_ fer un backup (o _stash_) abans de continuar.

```bash
git remote add gencat https://12345678A@git.intranet.gencat.cat/0123/ABC.git --tags -f -m master
git reset --hard ; git checkout -f
git pull --all
git checkout -t -b master-gencat gencat/master
# merge inicial
git checkout master # origin/master
git merge --allow-unrelated-histories -Xtheirs master-gencat
git push
#
```

### Baixada des del SIC

El workflow d'integracions de canvis és el següent: gencat/master -> origin/master -> origin/develop

```bash
git reset --hard ; git checkout -f
git pull --all
#
git checkout master # origin/master
git merge master-gencat
git push
#
git checkout develop # origin/develop
git merge master
git push
```

### Desenvolupament amb GitFlow

El workflow de desenvolupament recomanat és GitFlow. Hi ha publicada molta documentació al respecte, i exposarem aquí únicament la metodologia aplicada a desenvolupament de noves funcionalitats (el cas més comú).

1. Inicialització (només la primera vegada per a un mateix repositori)

```bash
sudo apt-get install git-flow
git flow init -d
```

2. Crear nova branca per una funcionalitat (manteniment, correctiu, sota demanda, etc.)

```bash
# Normalitzar el nom de la branca (p.e. a partir de una tasca JIRA)
_FEATURE="INTEMO-1234 - Normalitzar i definir el procediment per treballar amb l'eina de  desenvolupament Git"
_FEATURE=$(echo $_FEATURE | sed -e 'y/ÀÁÈÉÌÍÒÓÙÚÜÇçÑñàáèéìíïòóùúü/AAEEIIOOUUUCcNnaaeeiiioouuu/' -e 's:[^-0-9A-Za-z]:_:g' -e 's:_\{2,\}:_:g' -e 's:^_::' -e s:_el_:_:g -e s:_l_:_:g -e s:_amb_:_:g -e s:_i_:_:g -e s:_-_:-:g -e 's:_$::' | cut -c-80)
git pull origin
git reset --hard ; git checkout -f
git checkout develop
git flow feature start $_FEATURE
```

3. Finalitzar i publicar la funcionalitat actual

```bash
git pull origin
git commit -a
git flow feature publish && git flow feature finish && git push
```

4. Crear i publicar una nova release

```bash
git flow release start
# Un cop s'han integrat canvis d'última hora de DEVELOP (si escau)

git flow release finish
git push --tags
```

### Pujada a SIC

El workflow d'integracions de canvis és el següent: origin/develop -> origin/master -> gencat/master

```bash
git reset --hard ; git checkout -f
git pull --all
#
git checkout master # origin/master
git merge develop
git push
git push --tags
#
git checkout master-gencat # gencat/master
git merge master
git push gencat master
git push gencat master --tags
```

## Informació adicional

* https://services.github.com/on-demand/downloads/github-git-cheat-sheet.pdf
* https://www.atlassian.com/git/tutorials/atlassian-git-cheatsheet
* https://danielkummer.github.io/git-flow-cheatsheet/

## Annexe. Inicialitzar el repositori

El HowTo dóna per fet que es disposa d'un codi repositat amb GIT, però pot donar-se el cas que el codi no s'hagi repositat prèviament amb GIT. Aquest annexe adreça aquesta situació.

Per inicialitzar el repositori s'ha de seguir les següents passes (Bash):

```bash
die () {
  echo ERROR $*
  exit $1
}
do_repo_git_init () {
  
  # carpeta temporal de treball
  local _CARPETA_GIT_NOU=/tmp/repogitnou

  rm -fr $_CARPETA_GIT_NOU 2>/dev/null
  mkdir -p $_CARPETA_GIT_NOU || die 1 # crea la carpeta temporal de treball
  cd $_CARPETA_GIT_NOU || die 2
  echo ">> Ara s'ha de copiar el codi del projecte en aquesta carpeta : $_CARPETA_GIT_NOU <<"
  echo "Premi INTRO per continuar..." && read
  git init || die 3
  cat>>.gitignore<<EOF
.settings/
.project
.classpath
bin/
target/
EOF
  git status
}
do_repo_git_init
```

