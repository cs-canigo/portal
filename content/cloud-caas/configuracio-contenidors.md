+++
date        = "2019-02-20"
title       = "Gestió de configuracions a Contenidors"
description = "Model de gestió de configuracions en orquestradors basats en Kubernetes: Kubernetes ,Openshift i Swarm"
sections    = "Container Cloud"
weight      = 10
categories  = ["cloud","docker","container","kubernetes","openshift","Swarm"]
+++

A gestió de configuracions als Orquestradors docker, es poden distingir dos escenaris clarament diferenciats:

- Gestió de configuracions a Kubernetes i Openshift
- Gestió de configuracions a Swarm

## Gestió de configuracions a Kubernetes i Openshift

Una de les funcionalitats que ofereix kubernetes (i Openshift), més enllà del que ofereixen els contenidors dockers, és la gestió de configuracions.

Per la gestió de configuració, kubernetes ens ofereix els següents components:

- Variables d'entorn
- ConfigMap
- Secret

### Variables d'entorn

Com els seu propi nom indica son variables que s'inclouran al descriptor de desplegament dels pods (**Deployment** a Kubernetes i **DeploymentConfig** a Openshift) que un cop arrenquin els contenidors, son variables d'entorn del sistema operatiu.

Està orientat a paràmetres de configuració simples de tipus clau/valor.

Tenen el següent aspecte:
```
...
 env:
- name: ENV1_NAME
  value: env1_value
- name: ENV2_NAME
  value: env2_value
...          
```
Podeu trobar més informació a [Define Environment Variables for a Container.](https://kubernetes.io/docs/tasks/inject-data-application/define-environment-variable-container/)

Addicionalment a les variables d'entorn definides per l'aplicació, Kubernetes exposa unes variables d'entorn que faciliten la comunicació entre pods.

Bàsicament s'exposen unes variables de tipus **{SVCNAME}_SERVICE_HOST** i **{SVCNAME}_SERVICE_PORT** on **{SVCNAME}** és el nom del servei a Kubernetes.

Podeu trobar més informació a [Discovering services.](https://kubernetes.io/docs/concepts/services-networking/service/#discovering-services)

Podeu trobar exemples de yamls complets dels descriptors de desplegament a 
- [Contenidors AppAgile](https://canigo.ctti.gencat.cat/cloud/contenidors_appagile/)
- [Contenidors Kubernetes](https://canigo.ctti.gencat.cat/cloud/contenidors_kubernetes/)

### ConfigMap

Està orientat a configuracions més complexes. Suporta tant variables del tipus clau valor com fitxers de configuració.

Tenen el següent aspecte:

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: harbor-jobservice-config
data:
  LOG_LEVEL: INFO
  CONFIG_PATH: /etc/jobservice/app.conf
  ADMINSERVER_URL: "http://adminserver:8080"
  GODEBUG: netdns=cgo
  config: |
    appname = jobservice
    runmode = dev
    
    [dev]
    httpport = 8080
```

En aquest cas hi ha variables del tipus clau/valor, com pot ser **LOG_LEVEL** i variables de tipus fitxer de configuracío com pot ser **config**

#### Accés als ConfigMaps dels des pods

Per accedir a les propietats/fitxers dels ConfigMaps cal definir-ho als descriptors de desplegament.

L'accés a les variables clau/valor es realitza a través de les variables d'entorn. Per exemple:

```
...
env:
- name: LOG_LEVEL
  valueFrom:
    configMapKeyRef:
      name: harbor-jobservice-config
      key: LOG_LEVEL
...
```

L'accés als fixers es realitza muntant volums als descriptors de desplegament. Per exemple:

```
...
volumeMounts:
- name: config
  mountPath: /jobservice-conf
...
volumes:
- name: config
  configMap:
    name: harbor-jobservice-config
    items:
    - key: config
      path: app.conf
...
```

**Nota important: A les versions actuals de Kubernetes i  Openshift, el path complert on es monten els ConfigMaps i els Secrets, són de només lectura. Cal vigilar on es monten els fitxers de configuració, perquè no es podrà escriure cap altre fitxer en tot el path.**


Podeu trobar més informació dels ConfigMaps a [Configure a Pod to Use a ConfigMap.](https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/)



### Secrets

Està orientat a configuracions amb dades sensibles. Suporta tan variables del tipus clau valor com fitxers de configuració. Suporta tant formats text com binari.
Els valors estan codificats en base64.

**En cap cas, està permés utilitzar variables d'entorn o ConfigMaps per emmagatzemar dades sensibles.**

Tenen el següent aspecte:

```
apiVersion: v1
kind: Secret
metadata:
  name: jobservice-secret
type: Opaque
data:
  UI_SECRET: "dWlfc2VjcmV0X2Jhc2U2NA=="
  JOBSERVICE_SECRET: "am9ic2VydmljZV9zZWNyZXRfYmFzZTY0"
  SECRET_KEY: "c2hhcmVkX3NlY3JldF9rZXlfYmFzZTY0"
  ```

Per accedir a les propietats/fitxers dels Secrets cal definir-ho als descriptors de desplegament.

L'accés a les variables clau/valor es realitza a través de les variables d'entorn. Per exemple:

```
...
env:
- name: UI_SECRET
  valueFrom:
    secretKeyRef:
      name: jobservice-secret
      key: UI_SECRET
...
```

L'accés als fixers es realitza muntant volums als descriptors de desplegament. Per exemple:

```
...
volumeMounts:
- name: key
  mountPath: /key/jobservice
...
volumes:
- name: key
  secret:
    secretName: jobservice-secret
    items:
    - key: SECRET_KEY
      path: key  
...
```

**Nota important: A les versions actuals de Kubernetes i  Openshift, el path complert on es monten els ConfigMaps i els Secrets, són de només lectura. Cal vigilar on es monten els fitxers de configuració, perquè no es podrà escriure cap altre fitxer en tot el path.**

Podeu trobar més informació dels Secrets a [Secrets](https://kubernetes.io/docs/concepts/configuration/secret/)


## Gestió de configuracions a Swarm

Per la gestió de configuració, kubeSwarmrnetes ens ofereix els següents components:

- Variables d'entorn
- Secret

### Variables d'entorn

Són variables del tipus clau/valor.

Les variables d'entorn es defineixen en el moment de desplegar el contenidor.
Cal proporcionar-les a l'equip de Suport Cloud a l'hora de configurar el desplegament al SIC.

### Secrets

El seu ús està en estudi i encara no està suportat en els desplegaments a SwarmMe.