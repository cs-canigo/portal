+++
date        = "2019-04-15"
title       = "Passar traslladar info usuari entorn desenvolupament v2.4 a v3.0.0"
description = "Howto traslladar informació usuari entorn desenvolupament versió 2.4 a 3.0.0"
section     = "howtos"
categories  = ["canigo"]
key         = "JUNY2019"
+++

### A qui va dirigit

Aquest how-to va dirigit a tots aquells perfils tècnics que tinguin la necessitat d'utilitzar l'entorn de desenvolupament de Canigó i vulguin traspassar la informació d'un entorn de desenvolupament antic a la versió 3.0.0.

En aquest how-to es mostraran els passos utilitzants per tralladar la informació d'un entorn de desenvolupament amb versió 2.4 a 3.0.0

Per a més informació podeu consultar la secció [Entorn de desenvolupament](/canigo/entorn-desenvolupament/)

### Introducció entorn desenvolupament

L’entorn de desenvolupament és una màquina virtual Linux, basada en Lubuntu Desktop (Ubuntu Bionic Beaver 18.04.2 LTS), a la qual se li ha afegit una selecció de programari enfocat principalment a aplicacions Canigó, per proporcionar la millor experiència d’usuari out-of-the-box en el desenvolupament d’aplicacions Canigó.

### Passos per tralladar la informació

Per poder copiar els fitxers d'una máquina virtual a una altre utilitzarem una carpeta compartida a la máquina host, això vol dir que per poder mantenir els fitxers és necessari tenir l'espai suficient en disc per allotjar els fitxers a copiar en 3 ubicacions: màquina virtual antiga, màquina host i màquina vitual nova

Recordem que per iniciar la màquina virtual és necessari realitzar-ho amb:
```
vagrant up
```

Els passos següits per traslladar la informació són:

1. Comprovar si l'usuari canigo està dins del grup vboxsf
```
id canigo
```
![id canigo](/images/news/2019-06-14-Howto-info-usuari-v2.4-a-v3.0.0-entorn-dev-id-canigo.png)

2. Sino està al grup, afegir-lo
```
sudo usermod -aG vboxsf canigo
```

3. Tornem a comprovar si està al grup
```
id canigo
```
![id canigo after add](/images/news/2019-06-14-Howto-info-usuari-v2.4-a-v3.0.0-entorn-dev-id-canigo-after-add.png)

4. Crear carpeta compartida

A la pantalla de VirtualBox Máquina > Configuración > Carpetas compartidas

Crear una carpeta compartida amb les opcions permantente i automontar, en el nostre cas hem compartit tota la unitat c: de la máquina host
![Carpetas compartidas](/images/news/2019-06-14-Howto-info-usuari-v2.4-a-v3.0.0-entorn-dev-carpetas-compartidas.png)


5. Reiniciar

Una vegada reiniciat comprovem que tenim accés a la carpeta compartida
![Accés carpeta compartida](/images/news/2019-06-14-Howto-info-usuari-v2.4-a-v3.0.0-entorn-dev-acces-carpeta-compartida.png)

Realitzar els mateixos passos a les dues màquines virtuals per a tenir la mateixa carpeta compartida a les dues màquines

6. Crearem una carpeta on deixar els fitxers, per exemple a c:/tmp/backup_dev_env a la máquina host, que a les màquines virtuals correspon a /media/sf_C_DRIVE/tmp/backup_dev_env

7. Crearem una carpeta temporal a la màquina virtual antiga on copiar els fitxers, per exemple a /tmp/backup_dev_env

8. Copiarem les següents carpetes o fitxers de la máquina virtual antiga
- Fitxers que vulguem mantenir del Desktop, en el nostre cas ho hem posat dins de la carpeta /tmp/backup_dev_env/Desktop
![Desktop](/images/news/2019-06-14-Howto-info-usuari-v2.4-a-v3.0.0-entorn-dev-desktop.png)

- Fitxers que vulguem mantenir del Documents, en el nostre cas ho hem posat dins de la carpeta /tmp/backup_dev_env/Documents

En el nostre cas hem copiat: carpeta workspace antiga del eclipse (workspace-sts-3.7.1.RELEASE),  carpeta workspace antiga del soap ui (soapui-projects), carpeta on descarregavem els projectes del git (git), altres fitxers i carpetes de treball
![Documents](/images/news/2019-06-14-Howto-info-usuari-v2.4-a-v3.0.0-entorn-dev-documents.png)

- Fitxers de video i imatges si tenim, per exemple a /tmp/backup_dev_env/Videos i /tmp/backup_dev_env/Pictures

- Fitxers de descarregues si tenim, per exemple a /tmp/backup_dev_env/Downloads

- Fitxers de la home de l'usuari que vulguem mantenir (per exemple scripts i documents), en el nostre cas ho hem posat dins de la carpeta /tmp/backup_dev_env/

- Fitxers del maven .m2, en el nostre cas ho hem posat dins de la carpeta /tmp/backup_dev_env/.m2
![m2](/images/news/2019-06-14-Howto-info-usuari-v2.4-a-v3.0.0-entorn-dev-m2.png)

- Fitxers del git .gitconfig i .gitcredentials

- Fitxers de configuració del docker .docker, en el nostre cas ho hem posat dins de la carpeta /tmp/backup_dev_env/.docker
![docker](/images/news/2019-06-14-Howto-info-usuari-v2.4-a-v3.0.0-entorn-dev-docker.png)

- Fitxers de configuració del ssh .ssh, en el nostre cas ho hem posat dins de la carpeta /tmp/backup_dev_env/.ssh

- Altres fitxers de configuració

9. Una vegada copiats els fitxers que volem mantenir, es necessari empaquetar la carpeta /tmp/backup_dev_env
```
tar -cvf backup_dev_env.tar backup_dev_env/
```

10. Una vegada obtingut el paquet, el copiem a la carpeta compartida /media/sf_C_DRIVE/tmp/backup_dev_env
![backup_dev_env.tar](/images/news/2019-06-14-Howto-info-usuari-v2.4-a-v3.0.0-entorn-dev-backup_dev_env.tar.png)

11. A la màquina virtual nova, copiem el paquet de la carpeta compartida /media/sf_C_DRIVE/tmp/backup_dev_env a una carpeta on hi hagi espai, per exemple a /opt

12. Desempaquetem el paquet
```
tar -xvf backup_dev_env.tar
```

13. Copiem els fitxers desempaquetats de /opt/backup_dev_env a les seves ubicacions

- Els fitxers del Desktop a la carpeta Desktop

- Els fitxers de Documents (en el nostre cas Docker, fakeSMTP, git, scripts_canigo_db_init, soapui-projects) a /opt

- Creem un enllaç de la carpeta git ja que estava a Documents 
```
ln -s /opt/git /home/canigo/Documents/git
```

- Els fitxers del workspace de Documents (workspace-sts-3.7.1.RELEASE) a /opt/workspaces/workspace-canigo

- Els fitxers de video i imatges a Videos i Pictures

- Els fitxers de Downloads a la carpeta Downloads

- Els fitxers de la home a la home de l'usuari canigo

- Els fitxers del maven (.m2) a la home de l'usuari canigo sobreescrivint els fitxers actuals

- Els fitxers de configuració del git (.gitconfig i .git-credentials) a la home de l'usuari canigo

- Els fitxers de configuració del docker (.docker) a la home de l'usuari canigo

Una vegada copiats els fitxers és necessari actualitzar el client de docker, per això executarem:
```
docker version
```
![docker version](/images/news/2019-06-14-Howto-info-usuari-v2.4-a-v3.0.0-entorn-dev-docker-version.png)

Agafarem la versió del client: 18.09.5

Modificant el fitxer /home/canigo/.docker/config.json amb la versió del client del docker actual, en aquest cas hem canviat
```
"User-Agent": "Docker-Client/18.06.0-ce (linux)"
```
per:
```
"User-Agent": "Docker-Client/18.09.5 (linux)"
```

- Fitxers de configuració del ssh (.ssh) a la home de l'usuari canigo 

- Altres fitxers de configuració

Per acabar podem fer neteja de la carpeta /opt/backup_dev_env i /media/sf_C_DRIVE/tmp/backup_dev_env

Amb això ja tenim configurada la nova màquina virtual amb el git, docker, ssh, maven, projectes, documents i altres configuracions tal i com teniem a la màquina antiga
