+++
date        = "2021-09-10"
title       = "Monitoratge i traces als contenidors"
description = "Informació per accedir  al monitoratge i traces a les diferents plataformes de contenidors."
sections    = "Container Cloud"
weight      = 13
toc         = true
categories  = ["cloud","docker","container","kubernetes","openshift","swarmme"]
+++

Dins del marc de la metodologia DevOps, s'ofereixen a lot d'aplicacions un conjunt d'eines per a que monitorin i tinguin accés a les traces dels diferents contenidor.

A continuació es descriuen les diferents eines a cadascuna de les plataformes disponibles.

## Openshift

Al desplegar una aplicació a Openshift, es proporciona a lot d'aplicacions un usuari amb permisos de **lectura** del seu projecte a la plataforma Openshift.

### Monitoratge

Des de la consola web de les diferents plataformes es pot consultar de cada projecte la següent informació:

- Configuració dels diferents elements (Desplegaments, Serveis, Rutes, ...)
- Estat dels desplegaments
- Estat dels pods
- Mètriques dels pods
- Logs dels pods

Podeu trobar més informació al respecte a:

 - [OpenShift Container Platform 4.6 Documentation.](https://docs.openshift.com/container-platform/4.6/welcome/index.html)

Addicionalment a la consola, també podeu accedir a la informació i configuracions utilitzant el client **oc**.

Podeu trobar més informació a:

 -  [Get Started with the CLI. OCP 4.6](https://docs.openshift.com/container-platform/4.6/cli_reference/openshift_cli/getting-started-cli.html)

Podeu descarregar el client oc a:

-  [oc client v4.6](https://mirror.openshift.com/pub/openshift-v4/clients/oc/4.6/)

En cas de necessitar un monitoratge més avançat l'equip de Suport Cloud disposa d'unes plantilles de **Prometheus i Grafana** que és poden solicitar desplegar junt amb l'aplicació. Previament cal haver-les inclós al DA junt amb la resta de components de l'aplicació.

### Logs

Des de la plataforma d'openshift es poden veure els logs dels pods en temps real. Si necessiteu accedir a logs anteriors o de pods que ja no existeixi, està disponible un Kibana amb tots els logs de l'aplicació amb una retenció de 30 dies.

### Urls d'accés als diferent entorns

Podeu accedir a les consoles web i Kibana de les diferents plataformes utilitzant les credencials proporcionades per l'equip de Suport Cloud.

#### Openshift Consolidables CPD2 PRE

- **Consola web**: https://console-openshift-console.apps.cer01-gct-007-k01.cpd2pre.intranet.gencat.cat/
- **Kibana**: https://c-logging-kibana.apps.cer01-gct-007-k01.cpd2pre.intranet.gencat.cat/

#### Openshift Consolidables CPD2 PRO

- **Consola web**: https://console-openshift-console.apps.cer01-gct-008-k01.cpd2.intranet.gencat.cat/
- **Kibana**: https://c-logging-kibana.apps.cer01-gct-008-k01.cpd2.intranet.gencat.cat/

#### Openshift Consolidables CPD3

- **Consola web**: https://console-openshift-console.apps.mdc-ops-ctti-cl.cpd3.intranet.gencat.cat/
- **Kibana**: https://kibana-openshift-logging.apps.mdc-ops-ctti-cl.cpd3.intranet.gencat.cat/

#### Openshift Crítics/Consolidables CPD4 PRE

- **Consola web**: https://console-openshift-console.apps.ocpconspre.cpd4pre.intranet.gencat.cat/
- **Kibana**: https://kibana-openshift-logging.apps.ocpconspre.cpd4pre.intranet.gencat.cat/

#### Openshift Crítics/Consolidables CPD4 PRO

- **Consola web**: https://console-openshift-console.apps.ocpcons.cpd4.intranet.gencat.cat/
- **Kibana**: https://kibana-openshift-logging.apps.ocpcons.cpd4.intranet.gencat.cat/

#### Openshift Crítics Salut CPD4 PRE

- **Consola web**: https://console-openshift-console.apps.ocpsalutpre.cpd4pre.intranet.gencat.cat/
- **Kibana**: https://kibana-openshift-logging.apps.ocpsalutpre.cpd4pre.intranet.gencat.cat/

#### Openshift Crítics Salut CPD4 PRO

- **Consola web**: https://console-openshift-console.apps.ocpsalut.cpd4.intranet.gencat.cat/
- **Kibana**: https://kibana-openshift-logging.apps.ocpsalut.cpd4.intranet.gencat.cat/

## IBMCloud Kubernetes

En desplegar una aplicació a Kubernetes, es proporciona a lot d'aplicacions un usuari amb permisos de **lectura** del seu projecte a la plataforma Kubernetes.

### Monitoratge

Amb aquest usuari us podeu logar a la plataforma d'IBMCloud i accedir via cli i kubectl a la següent informació:

- Configuració dels diferents elements (Desplegaments, Serveis, Rutes, ...)
- Estat dels desplegaments
- Estat dels pods
- Mètriques dels pods
- Logs dels pods

En cas de necessitar un monitoratge més avançat l'equip de Suport Cloud disposa d'unes plantilles de **Prometheus i Grafana** que és poden solicitar desplegar junt amb l'aplicació. Previament cal haver-les inclós al DA junt amb la resta de components de l'aplicació.

#### Instruccions

##### Instal·lació

Instal·lar el IBMCloud cli.

El podeu descarregar de https://github.com/IBM-Cloud/ibm-cloud-cli-release/releases

- Instal·lar el plugin **kubernetes-service**
```
        ibmcloud plugin install kubernetes-service -r 'IBM Cloud'
```
- Instal·lar el cli de kubernetes (kubectl), la darrera versió de la 1.19

    El podeu descarregar de:

  - Windows: https://storage.googleapis.com/kubernetes-release/release/v1.19.14/bin/windows/amd64/kubectl.exe
  - Linux: https://storage.googleapis.com/kubernetes-release/release/v1.19.14/bin/linux/amd64/kubectl

##### Configuració

- Loggar-se a IBMCloud
```
        ibmcloud login -a https://cloud.ibm.com -r eu-gb
```
- Posar usuari i contrasenya
- Escollir el compte
```
        1. CENTRE DE TELECOMUNICACIONS?GENERALITAT DE CATALUNYA (db4051d27e4a2eff044e6d5062abdf69) <-> 1449381
```

- Inicialitzar el container service

```
        ibmcloud ks init

    respon

        Using default API endpoint: https://containers.cloud.ibm.com
        OK
```

- Mostrar el cluster

```
        ibmcloud ks clusters

    respon

        OK
        Nombre           ID                                 Estado   Creado       Trabajadores   Ubicación   Versión
        cluster_pre      390086041bd947d496e3be8f1ad25487   normal   4 years ago   4            London     1.19.14_1557
        cluster_pro      157e6387175449c1bdfff78eed37c4a6   normal   3 years ago   4            London     1.19.14_1557
        cluster_pro_eu   0f658877aaa94a54a1ed0b43759d0f1c   normal   3 years ago   1            ams03      1.19.14_1557
```

- **Configurar cluster de PRE**

```
    ibmcloud ks cluster config --cluster cluster_pre
```

    respon alguna cosa similar a

```
OK
The configuration for cluster_pre was downloaded successfully.

Added context for cluster_pre to the current kubeconfig file.
You can now execute 'kubectl' commands against your cluster. For example, run 'kubectl get nodes'.
```

- **Configurar cluster de PRO**

```
    ibmcloud ks cluster config --cluster cluster_pro
```

respon alguna cosa similar a

```
OK
The configuration for cluster_pro was downloaded successfully.

Added context for cluster_pro to the current kubeconfig file.
You can now execute 'kubectl' commands against your cluster. For example, run 'kubectl get nodes'.

```

Pot donar-se el cas que el endpoint de la APi i els noms dels clusters no siguin exactament els mateixos que s'indiquen aquí. L'equip de Suport Cloud us proporcionarà les dades concretes de cadascun.

##### Configuració variable d'entorn

Una vegada realitzada la configuració, a cada sessió que necessiteu accedir al cluster de kubernetes amb kubectl, només caldrà executar les comandes SET/export anteriors.

Periòdicament, el token d'accés caduca i caldrà repetir el procés de configuració complet.

### Logs

Amb la cli de kubernetes  es poden veure els logs dels pods en temps real.


## IBM CaaS Kubernetes

En desplegar una aplicació a Kubernetes, es proporciona a lot d'aplicacions un token amb permisos de **lectura** del seu projecte a la plataforma Kubernetes.

### Monitoratge

Amb aquest token podeu accedir via kubectl a la següent informació:

- Configuració dels diferents elements (Desplegaments, Serveis, Rutes, ...)
- Estat dels desplegaments
- Estat dels pods
- Mètriques dels pods
- Logs dels pods

En cas de necessitar un monitoratge més avançat l'equip de Suport Cloud disposa d'unes plantilles de **Prometheus i Grafana** que és poden solicitar desplegar junt amb l'aplicació. Previament cal haver-les inclós al DA junt amb la resta de components de l'aplicació.

#### Instruccions

##### Instal·lació

- Instal·lar el cli de kubernetes (kubectl) versió 1.18.19

    El podeu descarregar de:

  - Windows: http://storage.googleapis.com/kubernetes-release/release/v1.18.19/bin/windows/amd64/kubectl.exe
  - Linux: http://storage.googleapis.com/kubernetes-release/release/v1.18.19/bin/linux/amd64/kubectl

##### Configuració del fitxer kubeconfig

Al fitxer kubeconfig, cal configurar els següents elements:-

- cluster
- user
- context

###### Cluster

Executar:

```
kubectl config --kubeconfig=<fitxer_configuracio> set-cluster <nom_cluster> --server=https://172.24.149.130 --insecure-skip-tls-verify
```

on:

- ***cluster*** és el nom del cluster que es desitgi.
- ***fitxer_configuracio*** és el fitxer de configuració que es desitgi.

###### User

Executar:

```
kubectl config --kubeconfig=<fitxer_configuracio> set-credentials <usuari>  --token=<token>
```

on:

- ***cluster*** és el nom del cluster que es desitgi.
- ***fitxer_configuracio*** és el fitxer de configuració que es desitgi.
- ***usuari*** és el nom d'usuari que es desitgi.
- ***token*** és el nom token proporcionat per l'equip de Suport Cloud.

###### Context

Executar:

```
kubectl config --kubeconfig=<fitxer_configuracio> set-context <context> --cluster=<cluster> --namespace=<namespace> --user=<usuari>
```

on:

- ***fitxer_configuracio*** és el fitxer de configuració que es desitgi.
- ***cluster*** és el nom del cluster que es desitgi.
- ***namespace*** és el nom del namespace del projecte, proporcionat per Suport cloud.
- ***usuari*** és el nom d'usuari que es desitgi.


**Tingueu present que els noms escollits als diferents elements han de coincidir.**


##### Configuració variable d'entorn

A cada sessió que necessiteu accedir al cluster de kubernetes amb kubectl , caldrà que configureu la variable d'entorn **KUBECONFIG** apuntant al fitxer de configuració que heu creat al pas anterior.

a windows seria alguna cosa similar a

    SET KUBECONFIG=<path_a_fitxer_configuracio>

a linux seria alguna cosa similar a

    export KUBECONFIG=<path_a_fitxer_configuracio>

### Logs

Amb la cli de kubernetes  es poden veure els logs dels pods en temps real. Si necessiteu accedir a logs anteriors o de pods que ja no existeixi, està disponible un Kibana.

L'equip de Suport Cloud us proporcionarà l'usuari i contrasenya per poder accedir als logs.

## SwarmMe

### Monitoratge

La plataforma te disponible un Grafana per accedir a les mètriques de l'aplicació a la següent url :

 - http://monitor.swarmme.cpd1.intranet.gencat.cat/

L'equip de Suport Cloud us proporcionarà l'usuari i contrasenya per poder accedir a les metriques de les aplicacions.

### Logs

La plataforma te disponible un Kibana per accedir als logs de l'aplicació a la següent url :

 - http://logger.swarmme.cpd1.intranet.gencat.cat/

L'equip de Suport Cloud us proporcionarà l'usuari i contrasenya per poder accedir als logs de les aplicacions.
