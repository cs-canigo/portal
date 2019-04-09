+++
date          = "2019-02-13"
title         = "Contenidors AppAgile"
description   = "Consideracions i exemples respecte els contenidors a AppAgile"
sections      = "Container Cloud"
weight        = 7
categories    = ["cloud","docker","container","paas","openshift","appagile"]
+++

## Introducció
AppAgile és un orquestrador d'imatges docker basat en Openshift que addicionalment està basat en Kubernetes. La versió actual d'AppAgile es basa concretament en la versió **OpenShift Container Platform 3.9.65 i Kubernetes 1.9.1.**

En aquest article es defineix l'arquitectura tipus d'una aplicació a AppAgile i es proporcionen diversos exemples.

## Imatges
A l'hora de construir les imatges docker, cal tenir present els criteris definits per la Generalitat de Catalunya i que Openshift, tot i que està basat en docker, té les seves particularitats.

A la plana [Criteris creació contenidors docker](http://canigo.ctti.gencat.cat/cloud/dockerImages/) podeu trobar més informació al respecte. 

## Arquitectura
### Conceptes bàsics
L'arquitectura bàsica d'una aplicació a AppAgile és bàsicament la mateixa que la de Kubernetes, però amb algunes petites particularitats.
A grans trets es poden distingir els següents components:

* **Enrutador:** És el punt d'entrada i sortida del tràfic http/https de la plataforma i l'exterior. És responsable d'enrutar el tràfic a cada contenidor concret.
* **Ruta:** És l'element de configuració on és defineix quin domini correspondrà a un Servei. Permet també la configuració del SSL. Informa a l'enrutador per a que aquest pugui redirigir el tràfic correctament.
* **Servei:** És l'element de configuració que permet exposar un servei basat en contenidors dins de la plataforma Openshift. Permet mapping de ports
* **Desplegament:** És l'element de configuració que defineix com es desplegaran els contenidors:

    * Nombre de rèpliques
    * Imatge a desplegar
    * Polítiques de recàrrega
    * Quotes
    * Variables d'entorn
    * Ports
    * Emmagatzematge lògic
    * Health checks
    * ...

* **Controlador:** És el component responsable de mantenir els contenidors sempre disponibles seguint els paràmetres configurats al Desplegament.
* **Pod:** És el conjunt de contenidors que tenen el mateix cicle de vida i és necessari desplegar sempre conjuntament.
* **Contenidor:** És el component mínim de la plataforma. És el contenidor docker.
* **Petició d'emmagatzematge:** S'utilitza quan és necessari emmagatzematge persistent. És l'element de configuració que actua de pont entre el emmagatzematge físic i l'emmagatzematge lògic.
* **Emmagatzematge:** És l'element de configuració responsable de definir l'emmagatzematge físic.
* **Secret:** És l'element de configuració responsable de gestionar els elements de configuració amb informació sensible, com poden ser contrasenyes.
* **Mapa de configuració:** Permet agrupar múltiples variables de configuració. Seria equivalent a un fitxer de propietats en una aplicació.

### Arquitectura AppAgile
A continuació es realitza la correlació entre els diferents components arquitectònics i els elements concrets a AppAgile i Openshift.

  Component genèric |  Component AppAgile | Observacions  |
|:-----------------|:---------|:-----------|
| Enrutador  |  Router | És gestionat per l'administrador de la plataforma. A nivell d'aplicació no és necessari configurar res.|
| Ruta  |  Route | A nivell d'aplicació cal definir un fitxer yaml de configuració.|
| Servei  |  Service | A nivell d'aplicació cal definir un fitxer yaml de configuració.|
| Desplegament  |  DeploymentConfig | A nivell d'aplicació cal definir un fitxer yaml de configuració.|
| Controlador  |  ReplicationController | És generat directament pel DeploymentConfig. No és necessari configurar res.|
| Pod  |  Pod | És generat directament pel ReplicationController. No és necessari configurar res.|
| Contenidor  |  Container | És generat directament pel Pod. No és necessari configurar res.|
| Petició d'emmagatzematge  |  PersistentVolumeClaim | A nivell d'aplicació cal definir un fitxer yaml de configuració.|
| Emmagatzematge  |  PersistentVolume | És gestionat per l'administrador de la plataforma. A nivell d'aplicació no és necessari configurar res. Cal fer una petició al fer la sol·licitut inicial de recursos.|
| Secret  | Secret | A nivell d'aplicació cal definir un fitxer yaml de configuració.|
| Mapa de configuració  | ConfigMap | A nivell d'aplicació cal definir un fitxer yaml de configuració.|

![Components Openshift](/related/cloud/ArquitecturaOpenshift.png)

## Informació necessària al crear l'aplicació
Quan és sol·licita la creació d'una aplicació a AppAgile és necessària la següent informació:

* **Unitats i mida de discos persistents** necessaris. Amb aquesta informació l'administrador de la plataforma crearà els PersistentVolume necessaris i farà arribar als responsables de l'aplicació el nom d'aquests Volums.
* **Memòria RAM** total necessaria per tots els contenidors de l'aplicació. Amb aquesta informació s'assignarà una CPU proporcional i es definiran les quotes globals de l'aplicació.
## Exemples
### PersistentVolumeClaim
En una aplicació el primer element que cal configurar és el PersistentVolumeClaim. Mapejarà PersistentVolume amb el volumes lògics que s'utilitzaran als pods.

Tenint present que el PersistentVolume s'anomena per exemple **XXXX-app1-data01-pre** el fitxer yaml seria:

```
apiVersion: v1
kind: List
items:
- apiVersion: v1
  kind: PersistentVolumeClaim
  metadata:
    name: XXXX-app1-data01-claim
  spec:
    accessModes:
      - ReadWriteOnce
    resources:
      requests:
        storage: 1Gi
    volumeName: XXXX-app1-data01-pre
```

### DeploymentConfig
El DeploymentConfig és el principal element de configuració de l'aplicació.

Configuració de l'exemple:

* Nom del projecte: **XXXX-app1-pre**
* Nom de l'aplicació: **XXXX-app1-server**
* Nom del deploymentConfig: **XXXX-app1-server-deployment**
* Nombre de rèpliques: **2**
* **El pod conté un únic contenidor**.
* Estratègia de desplegament: **Rolling**. No es recomana modificar, ni variar els seus paràmetres.
* Quotes: **100 milicores de CPU** i **1024Mb de RAM**
* Nom de la imatge dels contenidors: **XXXX-app1-pre/XXXX-app1-server:1.0.0**
* Variables d'entorn dels contenidors:

    * **ENV1_NAME** amb valor **env1_value**
    * **ENV2_NAME** amb valor **env2_value**
* Port del contenidor: **8080**
* **readinessProbe** per identificar quan es pot començar a enviar peticions al contenidor.
* **livenessProbe** per identificar quan cal reiniciar el contenidor.
* Volum persistit: dins del contenidor es monta a **/data**. Fà referència al PersistentVolumeClaim anomenat **XXXX-app1-data01-claim** (creat a l'exemple anterior)

```
apiVersion: v1
kind: List
items:
- apiVersion: v1
  kind: DeploymentConfig
  metadata:
    labels:
      app: XXXX-app1-server
    name: XXXX-app1-server-deployment
  spec:
    replicas: 2
    selector:
      app: XXXX-app1-server
      deploymentconfig: XXXX-app1-server-deployment
    strategy:
      type: Rolling
      rollingParams:
        updatePeriodSeconds: 1
        intervalSeconds: 1
        timeoutSeconds: 600
        maxUnavailable: 25%
        maxSurge: 25%    
      resources:
        limits:
            cpu: 0
            memory: 0
        requests:
            cpu: 0
            memory: 0
    template:
      metadata:
        labels:
          app: XXXX-app1-server
          deploymentconfig: XXXX-app1-server-deployment
      spec:
        containers:
        - image: XXXX-app1-pre/XXXX-app1-server:1.0.0
          name: XXXX-app1-server
          env:
          - name: ENV1_NAME
            value: env1_value
          - name: ENV2_NAME
            value: env2_value            
          ports:
          - containerPort: 8080
            protocol: TCP
          resources:
            limits:
                cpu: 100m
                memory: 1024Mi
            requests:
                cpu: 100m
                memory: 1024Mi
          readinessProbe:
            httpGet:
                path: /healthz
                port: 8080
            initialDelaySeconds: 15
            timeoutSeconds: 1
          livenessProbe:
            tcpSocket:
                port: 8080
            initialDelaySeconds: 15
            timeoutSeconds: 1                                              
          volumeMounts:
              - name: XXXX-app1-server-volume
                mountPath: /data
        terminationGracePeriodSeconds: 60                
        volumes:
          - name: XXXX-app1-server-volume
            persistentVolumeClaim:
              claimName: XXXX-app1-data01-claim           
    test: false
    triggers:
    - type: ConfigChange
    - imageChangeParams:
        automatic: true
        containerNames:
        - XXXX-app1-server
        from:
          kind: ImageStreamTag
          name: XXXX-app1-server:1.0.0
          namespace: XXXX-app1-pre
      type: ImageChange
```

### Service
A l'exemple es crea un servei per el DeploymentConfig creat anteriorment.

AppAgile només suporta serveis amb protocol HTTP/HTTPS, no suporta altres protocols, com per exemple SSH, JDBC, ...

Configuració de l'exemple:

* Port exposat per servei: **80**
* Port intern dels pods: **8080**

```
apiVersion: v1
kind: List
items:
- apiVersion: v1
  kind: Service
  metadata:
    labels:
      app: XXXX-app1-server
    name: XXXX-app1-server
  spec:
    ports:
    - name: 80-tcp
      port: 80
      protocol: TCP
      targetPort: 8080
    selector:
      app: XXXX-app1-server
      deploymentconfig:  XXXX-app1-server-deployment
```

### Route
A l'exemple es crea una ruta pel servei creat anteriorment.

Configuració de l'exemple:

* host: **app1-server.gencat.cat**

```
apiVersion: v1
kind: Route
metadata:
  name: app1-route
  namespace: XXXX-app1-pre
  labels:
    app: app1-server
spec:
  host: app1-server.gencat.cat
  to:
    kind: Service
    name:  XXXX-app1-server
    weight: 100
  port:
    targetPort: 80-tcp
  wildcardPolicy: None
```


## Informació relacionada

* http://appagile.io/
* https://docs.openshift.com/container-platform/3.9/