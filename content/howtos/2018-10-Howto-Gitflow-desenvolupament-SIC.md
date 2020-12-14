+++
date = "2018-10-02"
title = "Com aplicar GitFlow en desenvolupament d'aplicacions al SIC"
description = "En aquest HowTo s'explica com utilitzar GitFlow en desenvolupament d'aplicacions al SIC"
section = "howtos"
categories = ["sic"]
key = "NOVEMBRE2018"
+++

## Audiència

Aquest how-to va dirigit principalment al personal tècnic (desenvolupadors i arquitectes) que treballin amb Git com a eina de control de versions de codi font.

## Contexte

El SIC disposa d'un repositori Git (anomenat d'ara en endavant "Git del SIC" o "SIC" directament) on emmagatzemar i centralitzar les versions lliurables del codi.

Amb anterioritat ja es va publicar un article ["SIC. Branca Master al Git del SIC"](https://canigo.ctti.gencat.cat/noticies/2018-03-05-SIC-Utilitzar-branca-master/) referent a quina era la metodologia recomanada per a utilitzar el Git del SIC. I tot i que en aquest article es recomana l'ús de [trunk-based (o master-based)](https://continuousdelivery.com/foundations/continuous-integration/), ja que és la forma més natural de fer-ho en relació amb la filosofia del SIC actual, també és possible aplicar GitFlow en un Git de desenvolupament tenint en compte com es faria el pas al Git del SIC posteriorment.

En aquest context, el workflow de treball proposat es compon de 2 repositoris:

1. El repositori amb el qual es realitza el desenvolupament o Git de desenvolupament: **origin**
2. El repositori del SIC on es pugen els lliurables o Git del SIC: **gencat**

## Workflows

Un cop definits els 2 repositoris, el seu nom i rols, el mètode proposat per a treballar de manera integrada amb el SIC, és seguir el workflow estàndard de GitFlow: una branca **develop** amb la línia de desenvolupament principal, i una branca **master** amb la línia de desplegaments a PRO.

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

El workflow de desenvolupament més popular per a treballar amb Git és [GitFlow](https://datasift.github.io/gitflow/IntroducingGitFlow.html).
Hi ha publicada molta documentació al respecte, i exposarem aquí únicament la metodologia aplicada a desenvolupament de noves funcionalitats (el cas més comú).


#### 1. Inicialització (només la primera vegada per a un mateix repositori)

```bash
sudo apt-get install git-flow
git flow init -d
```


#### 2. Crear nova branca per a una funcionalitat (manteniment, correctiu, sota demanda, etc.)

```bash
# Normalitzar el nom de la branca (p.e. a partir d’una tasca JIRA)
_FEATURE="INTEMO-1234 - Normalitzar i definir el procediment per a treballar amb l'eina de  desenvolupament Git"
_FEATURE=$(echo $_FEATURE | sed -e 'y/ÀÁÈÉÌÍÒÓÙÚÜÇçÑñàáèéìíïòóùúü/AAEEIIOOUUUCcNnaaeeiiioouuu/' -e 's:[^-0-9A-Za-z]:_:g' -e 's:_\{2,\}:_:g' -e 's:^_::' -e s:_el_:_:g -e s:_l_:_:g -e s:_amb_:_:g -e s:_i_:_:g -e s:_-_:-:g -e 's:_$::' | cut -c-80)
git pull origin
git reset --hard ; git checkout -f
git checkout develop
git flow feature start $_FEATURE
```


#### 3. Finalitzar i publicar la funcionalitat actual

```bash
git pull origin
git commit -a
git flow feature publish && git flow feature finish && git push
```


#### 4. Crear i publicar una nova release

Es pot crear una nova release del codi, aquesta però no podrà tenir el mateix format que la versió de l'aplicació ja que dins de les etapes de
desplegament en l’[Integració continua del SIC](https://canigo.ctti.gencat.cat/sic-serveis/ci/#etapes-de-desplegament) ja s’inclou la generació
automàtica del tag de build i del tag definitiu en base a la versió de l'aplicació.

```bash
_RELEASE="Release 1.0.0"
git flow release start $_RELEASE

// Un cop s'han integrat canvis d'última hora de DEVELOP (si escau)
git flow release finish $_RELEASE
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



## Informació addicional

* https://services.github.com/on-demand/downloads/github-git-cheat-sheet.pdf
* https://www.atlassian.com/git/tutorials/atlassian-git-cheatsheet
* https://danielkummer.github.io/git-flow-cheatsheet/
* https://www.toptal.com/software/trunk-based-development-git-flow
* https://canigo.ctti.gencat.cat/sic-serveis/ci/
* https://qualitat.solucions.gencat.cat/estandards/estandard-versions-programari/

## Annex. Inicialitzar el repositori

El HowTo dóna per fet que es disposa d'un codi repositat amb Git però pot donar-se el cas que el codi no sigui així. Aquest annex adreça aquesta situació.

Per inicialitzar el repositori s'ha de seguir les següents passes (bash):

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
  echo "Premi INTRO per a continuar..." && read
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