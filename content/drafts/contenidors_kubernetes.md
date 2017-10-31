+++
date          = "2017-11-02"
title         = "Kubernetes"
description   = "Consideracions i exemples respecte Kubernetes"
sections      = "Container Cloud"
weight        = 7
categories    = ["cloud","docker","container","paas","kubernetes"]
+++

## Introducció
Kubernetes és un orquestrador desenvolupat inicialment per Google. Sembla que actualment és l'orquestrador que presenta més futur. Recentment ha rebut el suport oficial de Docker.

En aquest article es defineix l'arquitectura tipus d'una aplicació a Kubernetes i es proporcionen diversos exemples.

A la Generalitat de Catalunya, actualment, Kubernetes està disponible a la plataforma d'IBM Bluemix. 

La versió de Kubernetes disponible és la  **1.7.4_1503**.

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
| Ruta  |  Ingress | A nivell d'aplicació cal definir un fitxer yaml de configuració.|
| Servei  |  Service | A nivell d'aplicació cal definir un fitxer yaml de configuració.|
| Desplegament  |  Deployment | A nivell d'aplicació cal definir un fitxer yaml de configuració.|
| Controlador  |  ReplicaSet | És generat directament pel Deployment. No és necessari configurar res.|
| Pod  |  Pod | És generat directament pel ReplicationController. No és necessari configurar res.|
| Contenidor  |  Container | És generat directament pel Pod. No és necessari configurar res.|
| Petició d'emmagatzematge  |  PersistentVolumeClaim | A nivell d'aplicació cal definir un fitxer yaml de configuració.|
| Emmagatzematge  |  PersistentVolume | És gestionat per l'administrador de la plataforma. A nivell d'aplicació no és necessari configurar res. Cal fer una petició al fer la sol·licitut inicial de recursos.|
| Secret  | Secret | A nivell d'aplicació cal definir un fitxer yaml de configuració.|
| Mapa de configuració  | ConfigMap | A nivell d'aplicació cal definir un fitxer yaml de configuració.|

![Components Kubernetes](/related/cloud/ArquitecturaKubernetes.png)

## Informació necessària al crear l'aplicació
Quan és sol·licita la creació d'una aplicació a Kubernetes és necessària la següent informació:

* **Unitats i mida de discos persistents** necessaris. Amb aquesta informació l'administrador de la plataforma crearà els PersistentVolume necessaris i farà arribar als responsables de l'aplicació el nom d'aquests Volums.
* **Memòria RAM** total necessaria per tots els contenidors de l'aplicació. Amb aquesta informació s'assignarà una CPU proporcional i es definiran les quotes globals de l'aplicació.
## Exemples
### PersistentVolumeClaim
En una aplicació el primer element que cal configurar és el PersistentVolumeClaim. Mapejarà PersistentVolume amb el volumes lògics que s'utilitzaran als pods.

Configuració de l'exemple:

* Namespace del projecte: **XXXX-app1-data01-pre**
* Nom del volum lògic: **XXXX-app1-data01-claim**
* Mida del disc: **20Gb**

```
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: XXXX-app1-data01-claim
  namespace: XXXX-app1-pre
spec:
  accessModes:
  - ReadWriteMany
  resources:
    requests:
      storage: 20Gi
```

### Deployment
El Deployment és el principal element de configuració de l'aplicació.

Configuració de l'exemple:

* Namespace del projecte: **XXXX-app1-data01-pre**
* Nom de l'aplicació: **XXXX-app1-server**
* Nom del deployment: **XXXX-app1-server-deployment**
* Nombre de rèpliques: **2**
* **El pod conté un únic contenidor**.
* Estratègia de desplegament: **RollingUpdate**. No es recomana modificar, ni variar els seus paràmetres.
* Quotes: **100 milicores de CPU** i **1024Mb de RAM**
* Nom de la imatge dels contenidors: **XXXX-app1-pre/XXXX-app1-server:1.0.0**
* Variables d'entorn dels contenidors:

    * **ENV1_NAME** amb valor **env1_value**
    * **ENV2_NAME** amb valor **env2_value**
* Port del contenidor: **8080**
* **readinessProbe** per validar que el servidor està inicialitzat.
* **livenessProbe** per validar que el servidor proporciona servei.
* Volum persistit: dins del contenidor es monta a **/data**. Fà referència al PersistentVolumeClaim anomenat **XXXX-app1-data01-claim** (creat a l'exemple anterior)
* Nom del defaultToken: **default-token-rwj8z**

```
apiVersion: apps/v1beta1
kind: Deployment
metadata:
  name: XXXX-app1-server-deployment
  namespace: XXXX-app1-data01-pre
  labels:
    app: XXXX-app1-server
spec:
  replicas: 2
  selector:
    matchLabels:
      app: XXXX-app1-server
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 25%
      maxUnavailable: 25%
  minReadySeconds: 0
  revisionHistoryLimit: 3       
  template:
    metadata:
      labels:
        app: XXXX-app1-server
    spec:
      containers:
      - name: XXXX-app1-server
        image: XXXX-app1-pre/XXXX-app1-server:1.0.0
        resources:
          limits:
            cpu: 100m
            memory: 1024Mi
          requests:
            cpu: 100m
            memory: 1024Mi
        imagePullPolicy: Always
        env:
        - name: ENV1_NAME
          value: env1_value                       
        - name: ENV2_NAME
          value: env2_value                       
        ports:
        - containerPort: 8080
        readinessProbe:
          tcpSocket:
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 10
        livenessProbe:
          httpGet:
            path: /healthz
            port: 8080
            httpHeaders:
            - name: X-Custom-Header
              value: Awesome
          initialDelaySeconds: 3
          periodSeconds: 3      
        volumeMounts:
        - mountPath: /data
          name: XXXX-app1-server
        - mountPath: /var/run/secrets/kubernetes.io/serviceaccount
          name: default-token-rwj8z
          readOnly: true           
      imagePullSecrets:
        - name: uk-docker-registry-secret      
      volumes:
      - name: *XXXX-app1-server
        persistentVolumeClaim:
          claimName: XXXX-app1-data01-claim
      - name: default-token-rwj8z
        secret:
          defaultMode: 420
          secretName: default-token-rwj8z
```

### Service
A l'exemple es crea un servei per el DeploymentConfig creat anteriorment.

Kubernetes suporta tant serveis amb protocol HTTP/HTTPS com  serveis amb altres tipus de protocols, com per exemple SSH, JDBC, ...

#### Servei HTTP
L'aplicació exposa un servei HTTP a través de la IP de l'Ingress.
Configuració de l'exemple:

* Port exposat per servei: **80**
* Port intern dels pods: **8080**

```
apiVersion: v1
kind: Service
metadata:
  name: XXXX-app1-server
  namespace: XXXX-app1-data01-pre
  labels:
    name: XXXX-app1-server
spec:
  ports:
  - protocol: TCP
    port: 80
    targetPort: 8080
  type: NodePort    
  selector:
    app: XXXX-app1-server

```

#### Servei No HTTP
L'aplicació exposa un servei no HTTP a través d'una IP pròpia.
Configuració de l'exemple:

* Port exposat per servei: **3030**
* Port intern dels pods: **3731**
* IP on s'exposa el servei: **169.45.10.144**

```
apiVersion: v1
kind: Service
metadata:
  labels:
    name: XXXX-app1-server
  name: XXXX-app1-data01-pre
  namespace:  XXXX-app1-server
spec:
  ports:
  - protocol: TCP
    port: 3030
    targetPort: 3731
  selector:
    app: XXXX-app1-server
  type: XXXX-app1-server
  loadBalancerIP: 169.45.10.144
```


### Ingress
A l'exemple es crea una ruta pel servei creat anteriorment.

Configuració de l'exemple:

* host: **app1-server.gencat.cat**

```
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: app1-route
  namespace: XXXX-app1-pre
spec:
  rules:
  - host: app1-server.gencat.cat
    http:
      paths:
      - path: /
        backend:
          serviceName: XXXX-app1-server
          servicePort: 80   
```


## Informació relacionada

* https://v1-7.docs.kubernetes.io/docs/home/