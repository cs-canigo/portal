+++
date        = "2019-02-22"
title       = "Monitoratge i traces als contenidors"
description = "Informació per accedir  al monitoratge i traces a les diferents plataformes de contenidors."
sections    = "Container Cloud"
weight      = 13
toc         = true
categories  = ["cloud","docker","container","kubernetes","appagile","swarmme"]
+++

# Monitoratge i traces als contenidors

Dins del marc de la metodologia DevOps, s'ofereixen a lot d'aplicacions un conjunt d'eines per a que monitorin i tinguin accés a les traces dels diferents contenidor.

A continuació es descriuen les diferents eines a cadascuna de les plataformes disponibles.

## AppAgile

Al desplegar una aplicació a AppAgile, es proporciona a lot d'aplicacions un usuari amb permisos de **lectura** del seu projecte a la plataforma AppAgile.

### Monitoratge

Es pot accedir a la consola d'AppAgile a la url https://master.appagile.cpd4.intranet.gencat.cat:8443

Des d'allà es pot consultar de cada projecte la següent informació:

- Configuració dels diferents elements (Desplegaments, Serveis, Rutes, ...)
- Estat dels desplegaments
- Estat dels pods
- Mètriques dels pods
- Logs dels pods

Podeu trobar més informació al respecte a [OpenShift Container Platform 3.9 Documentation.](https://docs.openshift.com/container-platform/3.9/welcome/index.html)

Addicionalment a la consola, també podeu accedir a la informació i configuracions utilitzant el client **oc**.

Podeu trobar més informació a [Get Started with the CLI.](https://docs.openshift.com/container-platform/3.9/cli_reference/get_started_cli.html)

Podeu descarregar el client oc a [oc client v3.9 .](https://github.com/openshift/origin/releases/tag/v3.9.0)

### Logs

Des de la plataforma d'openshift es poden veure els logs dels pods en temps real. Si necessiteu accedir a logs anteriors o de pods que ja no existeixi, està disponible un Kibana amb tots els logs de l'aplicació amb una retenció de 30 dies.

Podeu accedir al Kibana a la url https://kibana.appagile.cpd4.intranet.gencat.cat/app/kibana
utilitzant l'usuari porporcionat.

## IBMCloud Kubernetes

En desplegar una aplicació a Kubernetes, es proporciona a lot d'aplicacions un usuari amb permisos de **lectura** del seu projecte a la plataforma Kubernetes.

### Monitoratge

Amb aquest usuari us podeu logar a la plataforma d'IBMCloud i accedir via cli i kubectl a la següent informació:

- Configuració dels diferents elements (Desplegaments, Serveis, Rutes, ...)
- Estat dels desplegaments
- Estat dels pods
- Mètriques dels pods
- Logs dels pods

#### Instruccions

##### Instal·lació

Instal·lar el IBMCloud cli.

El podeu descarregar de https://github.com/IBM-Cloud/ibm-cloud-cli-release/releases

- Instal·lar el plugin **kubernetes-service**
```
        ibmcloud plugin install kubernetes-service -r Bluemix
```
- Instal·lar el cli de kubernetes (kubectl) versió 1.12.5

    El podeu descarregar de:
  
  - Windows: http://storage.googleapis.com/kubernetes-release/release/v1.12.5/bin/windows/amd64/kubectl.exe
  - Linux: http://storage.googleapis.com/kubernetes-release/release/v1.12.5/bin/linux/amd64/kubectl


##### Configuració

- Loggar-se a Bluemix
```
        ibmcloud login -a https://api.eu-gb.bluemix.net
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

        Using default API endpoint: https://uk-south.containers.bluemix.net
        OK        
```
- Mostrar el cluster
```
        ibmcloud ks clusters

    respon

        OK
        Nombre        ID                                 Estado   Creado       Trabajadores   Ubicación   Versión         Nombre de grupo de recursos
        cluster_pre   390086041bd947d496e3be8f1ad25487   normal   1 year ago   2              London      1.12.5_1537     default
        cluster_pro   157e6387175449c1bdfff78eed37c4a6   normal   1 year ago   2              London      1.10.12_1543*   default

```

- Configurar cluster de PRE
  
```
    ibmcloud ks cluster-config cluster_pre

a windows respon alguna cosa similar a 

    SET KUBECONFIG=C:\Users\usuari\.bluemix\plugins\container-service\clusters\cluster_pre\kube-config-lon02-cluster_pre.yml

a linux respon alguna cosa similar a

    export KUBECONFIG=/home/user/.bluemix/plugins/container-service/clusters/cluster_pre/kube-config-lon02-cluster_pre.yml

```

- Configurar cluster de PRO
  
```
    ibmcloud ks cluster-config cluster_pro

a windows respon alguna cosa similar a 

    SET KUBECONFIG=C:\Users\usuari\.bluemix\plugins\container-service\clusters\cluster_pro\kube-config-lon02-cluster_pro.yml

a linux respon alguna cosa similar a

    export KUBECONFIG=/home/user/.bluemix/plugins/container-service/clusters/cluster_pro/kube-config-lon02-cluster_pro.yml

```

Les comandes SET/export són les que cal executar per accedir als diferents clusters de Kubernetes.

Pot donar-se el cas que el endpoint de la APi i els noms dels clusters no siguin exactament els mateixos que s'indiquen aquí. L'equip de Suport Cloud us proporcionarà les dades concretes de cadascun.

##### Configuració variable d'entorn

Una vegada realitzada la configuració, a cada sessió que necessiteu accedir al cluster de kubernetes amb kubectl, només caldrà executar les comandes SET/export anteriors.

Periòdicament, el token d'accés caduca i caldrà repetir el procés de configuració complet.

### Logs

Amb la cli de kubernetes  es poden veure els logs dels pods en temps real. Si necessiteu accedir a logs anteriors o de pods que ja no existeixi, està disponible un Kibana amb tots els logs de l'aplicació amb una retenció de 3 dies i amb una mida màxima de 500Mb del logs per dia.

L'equip de Suport Cloud us proporcionarà la url on podreu accedir als logs.


## IBM CaaS Kubernetes

En desplegar una aplicació a Kubernetes, es proporciona a lot d'aplicacions un token amb permisos de **lectura** del seu projecte a la plataforma Kubernetes.

### Monitorització

Amb aquest token podeu accedir via kubectl a la següent informació:

- Configuració dels diferents elements (Desplegaments, Serveis, Rutes, ...)
- Estat dels desplegaments
- Estat dels pods
- Mètriques dels pods
- Logs dels pods

#### Instruccions

##### Instal·lació

- Instal·lar el cli de kubernetes (kubectl) versió 1.11.5

    El podeu descarregar de:
  
  - Windows: http://storage.googleapis.com/kubernetes-release/release/v1.11.5/bin/windows/amd64/kubectl.exe
  - Linux: http://storage.googleapis.com/kubernetes-release/release/v1.11.5/bin/linux/amd64/kubectl

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

- *<cluster>* és el nom del cluster que es desitgi.
- *<fitxer_configuracio>* és el fitxer de configuració que es desitgi.

###### User

Executar:

```
kubectl config --kubeconfig=<fitxer_configuracio> set-credentials <usuari>  --token=<token>
```

on:

- *<cluster>* és el nom del cluster que es desitgi.
- *<fitxer_configuracio>* és el fitxer de configuració que es desitgi.
- *<usuari>* és el nom d'usuari que es desitgi.
- *<token>* és el nom token proporcionat per l'equip de Suport Cloud.

###### Context

Executar:

```
kubectl config --kubeconfig=<fitxer_configuracio> set-context <context> --cluster=<cluster> --namespace=<namespace> --user=<usuari>
```

on:

- *<fitxer_configuracio>* és el fitxer de configuració que es desitgi.
- *<cluster>* és el nom del cluster que es desitgi.
- *<namespace>* és el nom del namespace del projecte, proporcionat per Suport cloud.
- *<usuari>* és el nom d'usuari que es desitgi.


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