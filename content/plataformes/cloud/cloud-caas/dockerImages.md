+++
date          = "2022-10-20"
title         = "Criteris creació contenidors docker"
description   = "Criteris per crear les imatges dels contenidors docker que es desplegaran als diferents clouds públics i privats"
sections      = "Container Cloud"
weight        = 3
categories    = ["cloud","docker","container","paas","openshift"]
aliases       = ["/cloud/cloud-caas/dockerImages/"]
+++

## Introducció

A l'hora de crear les imatges dels diferents contenidors docker per les aplicacions gencat cal establir un conjunt de criteris que garanteixin la seva estabilitat i seguretat.

## Imatges homologades pel CTTI
L'equip de Suport Cloud del CTTI manté un conjunt d'imatges docker de les tecnologies més utilitzades a la Generalitat de Catalunya. Aquestes imatges són compatibles amb totes les plataformes basades en contenidors disponibles a la Generalitat (Openshift i Kubernetes).

Aquestes imatges docker es poden trobar al **registre docker privat**, al projecte **gencatcloud**.

Podeu trobar més informació respecte al registre privat a [Registre d'imatges](/plataformes/sic/serveis/sic30-serveis/registre-imatges/).


## Criteris per escollir la imatge base

* Les imatges de docker es crearan sempre a partir del fitxer Dockerfile, en cap cas es crearan imatges a partir de contenidors.
* En cas que existeixin imatges homologades pel CTTI de la tecnologia requerida, el Dockerfile particular de cada aplicació haurà de tenir com a base la imatge homologada, utilitzant la directiva **FROM**.
* En cas que no existeixin imatges homologades pel CTTI de la tecnologia requerida, a l'hora d'escollir les imatges de base es faran servir els següents criteris:
    * **Sempre es crearan les imatges utilitzant Dockerfile, en cap cas s'utilitzaran imatges preconstruides.**
    * S'utilitzarà preferentment el Dockerfile d'Imatges oficials dels fabricants, normalment disponibles al [docker hub](https://hub.docker.com/).
	* En cas que existeixi una imatge oficial basada en **[Alpine](https://hub.docker.com/_/alpine/)**, s'escollirà aquesta.
    * En cas que no existeixi una imatge oficial basada en Alpine, s'escollirà la imatge basada en Centos, substituint Centos per la versió d'Oracle Linux Slim corresponent. Aquesta substitució és necessària pel support de pegats de seguretat que ofereix Oracle Linux i no ofereix Centos.
	* En cas que no existeixi una imatge oficial basada en Alpine ni Centos, s'escollirà la que recomani el fabricant. Sol ser la que al tag només s'indica la versió.
* **Mai s'escollirà el tag latest**. És una versió que va canviant en el temps i genera inestabilitat a les aplicacions. Escollir sempre la versió més tancada possible.

## Criteris generals per la creació de les imatges

Alguns d'aquests criteris no apliquen en cas d'utilitzar les imatges homologades pel CTTI.

* Deixar instal·lat el nombre mínim de paquets al docker, si és necessari instal·lar paquets per realitzar compilacions, desinstal·lar-los un cop realitzada aquesta.
* Actualitzar els packets del sistema operatiu a l'última versió disponible amb tots els pegats de seguretat aplicats.
* No deixar el codi font al docker, un cop compilat, eliminar-lo.
* Incloure a la imatge el script **wait-for-it.sh**, adjuntat a baix, per poder testejar les comunicacions. Notar que requereix tenir el bash instal·lat.
* No executar mai el procés final de les aplicacions amb l'usuari **root**. La majoria de tecnologies inclouen scripts que utilitzen usuaris específics per arrencar-les.
* Fixar els uid i gid dels usuaris i grups utilitzats per executar els processos, amb l'objectiu d'evitar escalat de privilegis.
* Assegurar la seguretat dels directoris definint el propietari i els permisos explícitament. S'adjunta a baix l'script **docker-setup.sh** d'exemple.
* Executar el procés principal des d'un script, mai directament al Dockerfile.
* Utilitzar el volum **/data** per desar la informació que cal persistir.
* No executar múltiples processos a dins de la imatge docker. Docker està pensat per executar un únic procés.
* Fer servir imatges confiables de repositoris oficials i verificats
* Exposar només els ports necessaris, i sempre que sigui possible, configurar l’aplicació per treballar amb ports no-estandar
* **No afegir mai credencials a les instruccions del Dockerfile ni afegir dades sensibles**
* La imatge generada ha de ser independent de recursos externs i autosificient per arrencar a qualsevol entorn
* Signar les imatges creades identificant l’equip que les ha generat
* Prioritzar l’us de COPY sobre ADD
* **Reduir el nº de layers tot el possible**, concatenant comandes que ho admetin (per exemple, RUN)
* Ubicar les comandes que menys canvi presentin a l’inici del Dockerfile
* **No escriure els logs de l'aplicació a fitxers. Enviar els logs sempre a la sortida estàndard**. D'aquesta manera la plataforma capturarà els logs i no caldrà entrar als contenidors per veure'ls.

Per garantir el compliment de les bones pràctiques en la generació de les imatges, utilitzar l'eina [Haskell Dockerfile Linter (hadolint)](https://github.com/hadolint/hadolint).

## Criteris de seguretat

* Intentar utilitzar l'última versió del producte, sol ser la que té menys vulnerabilitats de seguretat.
* Per validar la seguretat de les imatges creades, utilitzar l'eina [Clair](https://github.com/coreos/clair). En cas que es detectin vulnerabilitats, intentar eliminar-les instal·lant els patches necessaris.
* Aplicar totes les configuracions de seguretat recomanades pel fabricant o la comunitat per cada producte en particular.
* Es recomanable seguir les directrius de seguretat definides per CIS. [CIS Docker Benchmark](https://www.cisecurity.org/benchmark/docker/).

Abans de desplegar un contenidor a producció, es realitzarà una validació de seguretat utilitzant l'eina Clair. En cas de detectar vulnerabilitats de caràcter greu la imatge no serà desplegada.

## Criteris específics de Openshift

[Openshift](https://www.openshift.com/), tot i que suporta desplegar imatges de docker, presenta uns criteris més restrictius de seguretat que cal tenir present a l'hora de construir el Dockerfile.

* No utilitzar l'usuari **root** ni per executar l'script principal del docker (normalment s'utilitza l'usuari root). Utilitzar la directiva **USER uid** per definir amb quin usuari s'executarà el procés.
* Cal tenir present que openshift executa el procés amb un id d'usuari aleatori que pertany al grup **root**.
	* Aquest usuari es crea a l'executar el docker. No existeix, ni es coneix, en etapa de construcció de la imatge de docker.
	* A causa de la característica anterior, és possible que algunes accions que habitualment es fan en etapa de construcció calgui fer-les en etapa d'execució amb alguna shell.
	* Cal que les carpetes on el procés escriu dades, pertanyin al grup root. Es pot veure a l'script **docker-setup.sh** inclòs abaix.
	* Algunes aplicacions necessiten que l'usuari estigui definit al fitxer **/etc/passwd**. En aquest cas existeixen dues opcions:
      * Utilitzar el paquet **[nss_wrapper](https://cwrap.org/nss_wrapper.html)** per emular els canvis en aquest fitxer.
  Es necessari heretar de la imatge [alpine-nss](https://git.intranet.gencat.cat/3048-intern/imatges-docker/alpine-nss). Important llegir el README.md amb les instruccions de com utilitzar-la.

        Es pot veure un exemple d'ús a la imatge docker [postgres](https://git.intranet.gencat.cat/3048-intern/imatges-docker/postgres). Fixeu-vos sobretot en l'ús del ENTRYPOINT.

      * Utilitar la funcionalitat que ofereix [cri.o](https://cri-o.io/), motor de contenidors d'Openshift 4, que afegeix automàticament l'usuari amb que arrenca el contenidor al fitxer de **/etc/password**

        Veure la plana web [Openshift. Creating Images. Guidelines. OpenShift Origin-Specific Guidelines. Support Arbitrary User IDs](https://docs.openshift.com/container-platform/4.3/openshift_images/create-images.html) per més detalls.
* Utilitzar variables d'entorn per la configuració.
* Més informació de com construir les imatges de docker està disponible a :
  * [Openshift 4.10. Creating Images. Guidelines](https://docs.openshift.com/container-platform/4.10/openshift_images/create-images.html)
  * [Openshift 3.11. Creating Images. Guidelines](https://docs.openshift.com/container-platform/3.11/creating_images/guidelines.html)
  * [OpenShift Containers - Modification of /etc/passwd](https://access.redhat.com/articles/4859371)

## Exemples
Podeu trobar exemples de diferents imatges de docker seguint aquests criteris al [registre docker privat](https://registreimatges.sic.intranet.gencat.cat) projecte **gencatcloud**. Podeu trobar els Dockerfiles de les imatges a [git imatges docker](https://git.intranet.gencat.cat/3048-intern/imatges-docker/).

Quan trobeu que per una tecnologia existeix la versió normal i la versió amb
amb sufix **-openshift**, les imatges amb versió normal son compatibles amb docker(local) i les imatges amb amb sufix **-openshift** són compatibles amb Kubernetes i Openshift.

## Annexos
_wait-for-it.sh_
```
#!/usr/bin/env bash
#   Use this script to test if a given TCP host/port are available

cmdname=$(basename $0)

echoerr() { if [[ $QUIET -ne 1 ]]; then echo "$@" 1>&2; fi }

usage()
{
    cat << USAGE >&2
Usage:
    $cmdname host:port [-s] [-t timeout] [-- command args]
    -h HOST | --host=HOST       Host or IP under test
    -p PORT | --port=PORT       TCP port under test
                                Alternatively, you specify the host and port as host:port
    -s | --strict               Only execute subcommand if the test succeeds
    -q | --quiet                Don't output any status messages
    -t TIMEOUT | --timeout=TIMEOUT
                                Timeout in seconds, zero for no timeout
    -- COMMAND ARGS             Execute command with args after the test finishes
USAGE
    exit 1
}
wait_for()
{
    if [[ $TIMEOUT -gt 0 ]]; then
        echoerr "$cmdname: waiting $TIMEOUT seconds for $HOST:$PORT"
    else
        echoerr "$cmdname: waiting for $HOST:$PORT without a timeout"
    fi
    start_ts=$(date +%s)
    while :
    do
        (echo > /dev/tcp/$HOST/$PORT) >/dev/null 2>&1
        result=$?
        if [[ $result -eq 0 ]]; then
            end_ts=$(date +%s)
            echoerr "$cmdname: $HOST:$PORT is available after $((end_ts - start_ts)) seconds"
            break
        fi
        sleep 1
    done
    return $result
}
wait_for_wrapper()
{
    # In order to support SIGINT during timeout: http://unix.stackexchange.com/a/57692
    if [[ $QUIET -eq 1 ]]; then
        timeout -t $TIMEOUT $0 --quiet --child --host=$HOST --port=$PORT --timeout=$TIMEOUT &
    else
        timeout -t $TIMEOUT $0 --child --host=$HOST --port=$PORT --timeout=$TIMEOUT &
    fi
    PID=$!
    trap "kill -INT -$PID" INT
    wait $PID
    RESULT=$?
    if [[ $RESULT -ne 0 ]]; then
        echoerr "$cmdname: timeout occurred after waiting $TIMEOUT seconds for $HOST:$PORT"
    fi
    return $RESULT
}
# process arguments
while [[ $# -gt 0 ]]
do
    case "$1" in
        *:* )
        hostport=(${1//:/ })
        HOST=${hostport[0]}
        PORT=${hostport[1]}
        shift 1
        ;;
        --child)
        CHILD=1
        shift 1
        ;;
        -q | --quiet)
        QUIET=1
        shift 1
        ;;
        -s | --strict)
        STRICT=1
        shift 1
        ;;
        -h)
        HOST="$2"
        if [[ $HOST == "" ]]; then break; fi
        shift 2
        ;;
        --host=*)
        HOST="${1#*=}"
        shift 1
        ;;
        -p)
        PORT="$2"
        if [[ $PORT == "" ]]; then break; fi
        shift 2
        ;;
        --port=*)
        PORT="${1#*=}"
        shift 1
        ;;
        -t)
        TIMEOUT="$2"
        if [[ $TIMEOUT == "" ]]; then break; fi
        shift 2
        ;;
        --timeout=*)
        TIMEOUT="${1#*=}"
        shift 1
        ;;
        --)
        shift
        CLI="$@"
        break
        ;;
        --help)
        usage
        ;;
        *)
        echoerr "Unknown argument: $1"
        usage
        ;;
    esac
done
if [[ "$HOST" == "" || "$PORT" == "" ]]; then
    echoerr "Error: you need to provide a host and port to test."
    usage
fi
TIMEOUT=${TIMEOUT:-15}
STRICT=${STRICT:-0}
CHILD=${CHILD:-0}
QUIET=${QUIET:-0}
if [[ $CHILD -gt 0 ]]; then
    wait_for
    RESULT=$?
    exit $RESULT
else
    if [[ $TIMEOUT -gt 0 ]]; then
        wait_for_wrapper
        RESULT=$?
    else
        wait_for
        RESULT=$?
    fi
fi
if [[ $CLI != "" ]]; then
    if [[ $RESULT -ne 0 && $STRICT -eq 1 ]]; then
        echoerr "$cmdname: strict mode, refusing to execute subprocess"
        exit $RESULT
    fi
    exec $CLI
else
    exit $RESULT
fi
```

_docker-setup.sh_
```
#!/bin/sh

# setup directory for data
mkdir -p /data
chown -R nginx:0 /data
chmod g+w -R /data
chown -R nginx:0 /usr
chown -R nginx:0 /var

chgrp -R 0 /usr
chmod -R g+rw /usr
find /usr -type d -exec chmod g+x {} +

chgrp -R 0 /var
chmod -R g+rw /var
find /var -type d -exec chmod g+x {} +
```