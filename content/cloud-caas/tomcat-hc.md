+++
date = "2019-08-19"
title = "Tomcat amb sessió distribuïda"
description = "En aquest article es descriu com utilitzar Tomcat amb sessió distribuïda a Kubernetes i openshift."
sections    = "Container Cloud"
weight      = 14
toc         = true
categories  = ["cloud","container","kubernetes","appagile","tomcat"]
+++

Tomcat, a diferència d'altres servidors d'aplicacions com poden ser Weblogic o JBoss, no presenta de manera nativa una gestió eficient de sessions http entre diferents instàncies.

En aquest article es descriu la solució proposada per gestionar la sessió distribuïda  a Tomcat en contenidors desplegats a Kubernetes o Openshift.

## Introducció

Les configuracions més eficients en servidors Tomcat, es basen en què cada instància de Tomcat gestioni les seves pròpies sessions i aquestes no es comparteixin entre els diferents Tomcats que ofereixen un servei.

Quan existeixen múltiples instàncies de Tomcat amb un balancejador davant per repartir la càrrega, es garanteix, que per cada usuari que utilitza l'aplicació, les seves peticions sempre són servides per la mateixa instància de Tomcat. Per aconseguir aquest comportament es configura el que s'anomena **Sticky Session**.

La **Sticky Session** presenta l'avantatge de simplicitat i millor rendiment, però presenta el següent inconvenient principal:

- En cas de caiguda del node que serveix les peticions d'un usuari, tot i que l'aplicació continua estant activa (hi ha altres instàncies de Tomcat que serveixen l'aplicació), les seves sessions es perden i per tant la informació de navegació que contenen, per exemple si està autenticat.

Aquest inconvenient és especialment important en el cas dels contenidors i cloud, on pot no estar garantit que no hi hagi reinicis i poden haver-hi canvis dinàmics d'instàncies, que pot provocar que es perdin sessions.

Com a alternativa a aquesta configuració, existeix la **Shared Session** que replica la sessió entre tots els nodes de Tomcat. Aquesta configuració augmenta molt la càrrega del sistema i no és recomanable.

Addicionalment, hi ha altres alternatives per gestionar les sessions. Bàsicament es basen en persistir la sessió en elements externs al servidor d'aplicacions i anar a buscar la sessió a aquests elements. Bàsicament existeixen les següents opcions:

- Utilitzar una **base de dades externa per emmagatzemar sessions**. Normalment NoSQL. És molt habitual utilitzar Redis, per exemple.
- Utilitzar i configurar un **servidor d'aplicacions en cluster**. Per exemple JBoss o Weblogic. Són servidors pesats i requereixen molts recursos
- Utilitzar un **In-Memory Data Grid (IMDG)** per emmagatzemar les sessions. Per exemple Hazelcast.

## Selecció de la solució

A l'hora d'escollir la solució s'han valorat les següents característiques:

- Rendiment
- Simplicitat
- Facilitat d'ús
- Facilitat d'adaptació a les plataformes de contenidors
- Cost

S'ha decidit utilitzar el **IMDG Hazelcast** pels següents motius:

- El rendiment de la solució és molt bo. Bàsicament les peticions són servides directament per Tomcat amb Sticky session, com si no hi hagués el IMDG. Aquest només és utilitzat el cas que hi hagui alguna caiguda de node de Tomcat. S'afegeix al sistema la càrrega addicional de mantenir en memòria les sessions distribuïdes.
- Simplicitat. La solució és molt simple, només cal afegir algunes llibreries al Tomcat i canviar alguns petits elements de configuració. No cal afegir elements externs, ni requereix cap canvi a l'aplicació.
- Facilitat d'ús. Per utilitzar-lo només cal realitzar una mínima configuració. És totalment transparent a l'aplicació.
- Facilitat d'adaptació a Kubernetes (i Openshift). Nativament el producte s'integra amb Kubernetes, de manera que el descobriment de nodes i pods es fà de manera automàtica sense necessitat d'afegir elements addicionals.
- Cost. La solució es Open Source. Disposa d'una versió comercial que afegeix eines de Gestió, Seguretat i Suport, però no afecta a IMDG en si.

S'ha escollit la solució de Hazelcast davant de Redis, pels següents motius:

- Simplicitat. Construir un cluster de Redis en HA, requereix sis pods com a mínim a Kubernetes amb diferents funcions i configuracions.
- Facilitat d'ús. Tot i que teòricament és transparent a l'aplicació, diverses proves han presentat comportaments de sessió estranys, que probablement requereixen canvis a les aplicacions.
- La Integració amb Contenidors no és directa, cal crear un cluster HA tal com si estigués en on premise i comfigurar-lo per a què s'autodescobreixin.

## Descripció de la solució

A l'afegir les llibreries de Hazelcast a Tomcat es crea un cluster de Hazelcast amb un node a cadascun dels pods de Tomcat.
Els nodes del cluster s'autodescobreixen de manera automàtica gràcies a un Service de Kubernetes dedicat només per aquesta tasca.
Addicionalment els Tomcats es configuren per a què gestionin les sessions a través d'un Session Mànager proporcionat per Hazelcast.

![Descripció de la solució](/related/cloud/tomcat-hc-1.png)

### Gestió de la sessió

**És important que tot el sistema estigui configurat en Sticky Session**, si nó podrien haver-hi diferents Tomcats amb la mateixa sessió (però amb diferent contingut) i podrien generar-se incongruències.

La gestió de la sessió és la següent:

- Un usuari fa una petició al Tomcat a través d'un balancejador. Aquest Tomcat crea una sessió i li torna una cookie amb l'identificador a l'usuari. ës el comportament normal de Tomcat.

![Petició](/related/cloud/tomcat-hc-2.png)

- En paral·lel el Tomcat, asincronament fa arribar la sessió al seu node de Hazelcast.

![Sessió](/related/cloud/tomcat-hc-3.png)

- Els nodes dels Hazelcast estan sincronitzats i propaguen la sessió a la resta de nodes del cluster.

![Sincronització](/related/cloud/tomcat-hc-4.png)

- Per les crides posteriors que l'usuari faci a l'aplicació, el procés serà el mateix. Notar que de cara a l'usuari, el comportament del Tomcat és el mateix que si no tingués el Hazelcast configurat. Totes les tasques addicionals es fan de manera asincrona.

- Suposem que el node de Tomcat que serveix la sessió de l'usuari cau. En condicions normals es perdria la sessió i l'usuari perdria total la informació, havent de tornar a començar des de zero.

![Node Caigut](/related/cloud/tomcat-hc-5.png)

- Amb la solució proposada:
  - El cluster de Hazelcast es redimensiona automàticament.
  - El balancejador envia la petició de l'usuari cap a un altre dels Tomcats disponibles (que no te la sessió)
  - Com que no té la sessió, el Tomcat la sol·licita al cluster de Hazelcast
  - El cluster de Hazelcast li torna la sessió a Tomcat i a partir de llavors el comportament ja es tal com era normalment.

![Solicitud sessió](/related/cloud/tomcat-hc-6.png)

![Recuparació sessió](/related/cloud/tomcat-hc-7.png)

- Quan el nou pod de Tomcat, es torna a aixecar, el Cluster de Hazelcast descubriex el nou membre i li proporciona total la informació que té, quedant el nou node tal com estan la resta de nodes.

![Recuparació node](/related/cloud/tomcat-hc-8.png)

## Configuració

Les imatges docker repositades al registre privat https://docker-registry.ctti.extranet.gencat.cat del tipus **gencatcloud/tomcat-hc:XX**, tenen configurades les llibreries i el Session Manager de Tomcat amb Hazelcast. Inclouen una configuració bàsica de Hazelcast que fa que es crei un cluster d'un únic node.

D'aquesta manera es poden utilitzar i provar les imatges a docker fent un *docker run* sense necessitat de disposar d'un Kubernetes.

### Configuració a Kubernetes/Openshift

Per una banda cal configurar els elements bàsics de Kubernetes pel Tomcat:

- **Deployment/DeploymentConfig** amb la imatge de l'aplicació
- **Service** per exposar l'aplicació a Kubernetes
- **Ingress/Route** per exposar l'aplicació cal a Internet/Intranet. És molt important que l'Ingress estigui configurat per a què utilitzi Sticky Session.

Exemple de Ingress amb **Sticky Session** a Kubernetes.

```
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: tomcat-hc-85
  annotations:
    ingress.bluemix.net/sticky-cookie-services: "serviceName=tomcat-hc-85 name=tomcat-hc-85"
spec:
  rules:
  - host: www.tomcat85-hc.k8s.gencat.cat
    http:
      paths:
      - path: /
        backend:
          serviceName: tomcat-hc-85
          servicePort: 80
```

Addicionalment a la configuració estàndard de qualsevol Tomcat, cal afegir la següent configuració:

 - **ConfigMap** amb el fitxer de configuració de Hazelcast
 - **Service addicional** que utilitza Hazelcast per descobrir automàticament els pods com a elements dins del cluster de Hazelcast

ConfigMap
```
kind: ConfigMap
metadata:
  name: tomcat-hc-85-config
data:
  hazelcast.xml: |
    <?xml version="1.0" encoding="UTF-8"?>
    ...
    ...
 
```

Hazelcast Service
```
apiVersion: v1
kind: Service
metadata:
  annotations:
  labels:
    app: tomcat-hc-85
  name: tomcat-hc2-85
spec:
  type: ClusterIP
  clusterIP: None
  ports:
  - name: "5701-tcp"
    port: 5701
    targetPort: 5701
  selector:
    app: tomcat-hc-85
```

**Important:**

- El Servei de Hazelcast ha d'apuntar cap al port **5701**, que és el port que exposen els nodes de Hazelcast.
- El Servei de Hazelcast ha de ser del tipus **ClusterIP: None**, no volem que s'exposi fora del pod.
- El Servei ha d'apuntar cap els pods de Tomcat.
- Tota la resta de configuració és igual que qualsevol altre Service de Kubernetes.

### Configuració de Hazelcast

La configuració de Hazelcast es realitza a un **ConfigMap**

Aquesta configuració presenta algunes diferències en funció de la versió de Hazelcast que alhora és depenent de la versió de java.

La versió de **Hazelcast 3.12.x és compatible amb java 8 o superior.**

La versió de **Hazelcast 3.11.x és compatible amb java 6 i 7.**  

#### Configuració de Hazelcast 3.12.x

Per configurar Hazelcast a Kubernetes/Openshift cal definir al fitxer xml les següents propietats:

- **group/name** : Defineix el nom del cluster de Hazelcast
- **hazelcast/network/join** : En aquest apartat es defineixen els diferents protocols i serveis que defineixen els nodes del cluster. Pel cas de Kubernetes i Openshift, cal desactivar tots els protocols (**enabled="false"**) i deixar activat només el de **kubernetes (**enabled="true"**). Addicionalment, a l'element kubernetes cal afegir el **\<service-dns\>** amb el nom de dsn del servei de kubernetes descrit anteriorment. 

El dns de servei de kubernetes es construeix seguint el patró **\<nom_servei\>.\<nom_namespace\>.svc.cluster.local**

```
...
    <hazelcast xmlns="http://www.hazelcast.com/schema/config"
               xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
               xsi:schemaLocation="http://www.hazelcast.com/schema/config
               http://www.hazelcast.com/schema/config/hazelcast-config-3.12.xsd">

        <group>
            <name>test</name>
        </group>
        <management-center enabled="false">http://hazelcast-mc/hazelcast-mancenter</management-center>
        <network>
            <port auto-increment="true" port-count="100">5701</port>
            <outbound-ports>
                <!--
                Allowed port range when connecting to other nodes.
                0 or * means use system provided port.
                -->
                <ports>0</ports>
            </outbound-ports>
            <join>
                <multicast enabled="false"/>
                <kubernetes enabled="true">
                    <service-dns>tomcat-hc2-85.proves-ctti.svc.cluster.local</service-dns>
                </kubernetes>
                <discovery-strategies>
                </discovery-strategies>
            </join>
...
```


Podeu trobar més informació respecte la configuració de Hazelcast a:

- https://github.com/hazelcast/hazelcast/blob/v3.12.2/hazelcast/src/main/resources/hazelcast-full-example.xml
- https://github.com/hazelcast/hazelcast-kubernetes/tree/v1.5.1


#### Configuració de Hazelcast 3.11.x

Per configurar Hazelcast a Kubernetes/Openshift cal definir al fitxer xml les següents propietats:

- **group/name** : Defineix el nom del cluster de Hazelcast
- **properties** : Cal habilitar les estrategies de descobriment afegint la propietat **\<property name="hazelcast.discovery.enabled"\>true\</property\>**
- **hazelcast/network/join** : En aquest apartat es defineixen els diferents protocols i serveis que defineixen els nodes del cluster. Pel cas de Kubernetes i Openshift, cal desactivar tots els protocols (**enabled="false"**). Addicionalment cal afegir una nova estratègia de descobriment per Kubernetes.

```
<discovery-strategies>
    <discovery-strategy enabled="true"
        class="com.hazelcast.kubernetes.HazelcastKubernetesDiscoveryStrategy">
        <properties>
        <!-- configure discovery service API lookup -->
            <property name="service-dns">tomcat-hc2-80java7.proves-ctti.svc.cluster.local</property>
        </properties>
    </discovery-strategy>
```

El dns de servei de kubernetes es construeix seguint el patró **\<nom_servei\>.\<nom_namespace\>.svc.cluster.local**

```
...
    <hazelcast xmlns="http://www.hazelcast.com/schema/config"
               xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
               xsi:schemaLocation="http://www.hazelcast.com/schema/config
               http://www.hazelcast.com/schema/config/hazelcast-config-3.11.xsd">

        <group>
            <name>test</name>
        </group>
        <properties>
            <!-- only necessary prior Hazelcast 3.12 -->
            <property name="hazelcast.discovery.enabled">true</property>
        </properties>
        <management-center enabled="false">http://hazelcast-mc/hazelcast-mancenter</management-center>
        <network>
            <port auto-increment="true" port-count="100">5701</port>
            <outbound-ports>
                <!--
                Allowed port range when connecting to other nodes.
                0 or * means use system provided port.
                -->
                <ports>0</ports>
            </outbound-ports>
            <join>
                <multicast enabled="false"/>
                <tcp-ip enabled="false" />

                <!-- activate the Kubernetes plugin -->
                <discovery-strategies>
                    <discovery-strategy enabled="true"
                        class="com.hazelcast.kubernetes.HazelcastKubernetesDiscoveryStrategy">

                        <properties>
                        <!-- configure discovery service API lookup -->
                            <property name="service-dns">tomcat-hc2-80java7.proves-ctti.svc.cluster.local</property>
                        </properties>
                    </discovery-strategy>
                </discovery-strategies>
            </join>
...
```


Podeu trobar més informació respecte a la configuració de Hazelcast a:

- https://github.com/hazelcast/hazelcast/blob/v3.11.4/hazelcast/src/main/resources/hazelcast-full-example.xml
- https://github.com/hazelcast/hazelcast-kubernetes/tree/v1.3.1

## Exemple

Podeu trobar un exemple de la solució proposada a https://git.intranet.gencat.cat/3048-intern/imatges-docker/tomcat-hc-test
