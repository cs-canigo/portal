+++
date          = "2020-04-27"
title         = "Openshift Service Mesh"
description   = "Introducció i exemples de l'ús d'Openshift Service Mesh"
sections      = "Container Cloud"
weight        = 15
toc           = true
categories    = ["cloud","docker","container","caas","openshift","microservices","mesh"]
+++

## Introducció

En arquitectures basades en microserveis, la complexitat del sistema requereix tenir present tot un conjunt d'aspectes que no cal tenir present en arquitectures tradicionals.

Els Service Mesh faciliten la implementació de tots aquests aspectes amb un acoblament mínim amb les microserveis:

* Són independents de la tecnologia en què estan desenvolupats els microserveis
* No requereixen desenvolupaments pel seu ús

Tot i que es poden utilitzar en plataformes tradicionals, a causa de la pròpia arquitectura de microserveis, el seu ús és molt més comú en plataformes de contenidors.

Openshift Service Mesh és l'eina escollida pel CTTI per realitzar aquestes funcions.  

## Característiques

### Control del tràfic entre microserveis

En una arquitectura de microserveis és bastant habitual que els microserveis es cridin entre ells. Realitzar aquestes crides directament poden provocar diversos problemes, deguts bàsicament a fallides o mal funcionament d'algun microservei o la xarxa, que finalment acaben en fallides en cascada de tot el sistema on l'origen és difícilment identificable.

Per mitigar aquest tipus de problemes, s'implementen patrons del tipus:

* Timeouts
* Reintents
* Circuit Breakers

La implementació d'aquests patrons als propis microserveis és costós i afegeix un desenvolupament addicional al microservei, que no aporta res a la seva funcionalitat.

Els Service Mesh permeten la implementació d'aquests patrons sense necessitat de desenvolupament a través de simples fitxers de configuració.

### Balanceig i desplegaments avançats

Al controlar les comunicacions entre microserveis, els Service Mesh permeten realitzar Balanceig Avançat de tràfic, per exemple enviar un percentatge concret de peticions cap a una versió concreta d'un microservei, que els orquestradors de contenidors no poden fer.

Aquest tipus de funcionalitat permet fer a través de configuració desplegaments avançats d'aplicacions:

* Canary
* Blue Green
* Dark launching
* ...

### Seguretat

Implementar seguretat entre les crides de microserveis, és un altre dels aspectes que no és simple d'implementar. Requereix molt desenvolupament.

El Service Mesh permet aplicar seguretat entre les crides entre microserveis:

* Encriptació SSL del tràfic
* Mutual TLS per assegurar que la identitat de l'origen i el destí del tràfic
* Control d'accés, permetent indicar per exemple quins microserveis poden cridar a quins

### Monitoratge

El Service Mesh addicionalment ofereix monitoratge dels diferents microserveis, facilitant la detecció i identificació de problemes:

* Estat dels microserveis
* Flux de tràfic entre microserveis en temps real
* Rendiment dels microserveis
* Traces distribuides per identificar colls d'ampolla

## Openshift Service Mesh

Un cop descrites les característiques generals dels service Mesh ens centrarem en Openshift Service Mesh:

* Està basat en Istio 1.4
* Implementa multitenancy
* Es desplega sobre la plataforma Openshift

### Arquitectura

Openshift Service Mesh està format per dos components principals:

* Data Plane
* Control Plane

![Components Openshift Service Mesh](/related/cloud/ArquitecturaOpenshiftServiceMesh.png)

#### Data Plane

Està format per un conjunt de proxies basats en [Envoy](https://www.envoyproxy.io/).
Es desplega com [Sidecar](https://billglover.me/2020/01/12/the-sidecar-pattern/) a dins de cada pod dels microserveis.

S'encarreguen de les funcionalitats més importants del Service Mesh:

* Controlen el tràfic de dades entre els pods
* Fa enrutament i balanceig de tràfic
* Comproven la disponibilitat dels microserveis
* Capturen la telemetria dels pods
* Securitza el tràfic

![Data Plane](/related/cloud/ServiceMeshDataPlane.png)

#### Control Plane

* És el responsable de gestionar, configurar i monitorar el Data Plane
* Implementa polítiques de control
* Recol·lecta totes les mètriques i les exposa a les diferents eines

![Control Plane](/related/cloud/ServiceMeshControlPlane.png)

### Eines

#### Kiali

* [Kiali](https://kiali.io/) és la consola web del Service Mesh
* Funciona amb peticions a temps real
* Descriu la topologia de comunicacions entre microserveis
* Informa de la salut dels microserveis
* Informa dels Serveis i Pods dels microserveis
* Proporciona mètriques dels microserveis
* Valida la configuració del Service Mesh
* Permet la integració amb Jaeger per fer el seguiment de traces distribuïdes

![Kiali_01](/related/cloud/kiali01.png)

![Kiali_02](/related/cloud/kiali02.png)

#### Jaeger

* [Jaeger](https://www.jaegertracing.io/) és una consola web per veure les traces distribuïdes.
* S’integra amb Opentracing
* Donada una petició a un microservei descriu tota la pila de peticions entre els diferents microserveis que es van cridant en cascada.
* Informa els temps de resposta de cadascun dels microserveis, permetent identificar colls d’ampolla
* És necessari que les peticions entre microserveis propaguin les capçaleres HTTP del tipus x-alguna_cosa

![Jaeger_01](/related/cloud/jaeger01.png)

![Jaeger_02](/related/cloud/jaeger02.png)

#### Prometheus

* [Prometheus](https://prometheus.io/) s’està convertint en un estàndard de monitoratge en plataformes de contenidors
* Es basa en la captura de mètriques a través d’exporters
* A Openshift Service Mesh obté les mètriques a través del Mixer

![Prometheus_01](/related/cloud/prometheus01.png)

#### Grafana

* [Grafana](https://grafana.com/) s’està convertint en un estàndard de visualització de Mètriques.
* S’integra amb múltiples fonts de dades, en aquest cas amb Prometheus
* Permet la creació de Dashboards a mida
* Permet la configuració d’Alarmes
* Amb Openshift Service Mesh, es desplega amb un conjunt de Dashboards que informen de les mètriques dels diferents components i dels microserveis gestionats pel Control Plane

![Grafana_01](/related/cloud/grafana01.png)

![Grafana_02](/related/cloud/grafana02.png)

## Model de Servei

### Segons el grau d'aïllament

Es proposen dos models en funció del grau aïllament dessijat

#### Service Mesh Compartit

* Control Plane únic compartit per diferents aplicacions
* Totes les eines de monitoratge seran compartides, sense segmentació per aplicació
  * Afecta a Kiali, Jaeger, Prometheus i Grafana
* Els gestors de les diferents aplicacions podran veure traces distribuïdes, configuració i mètriques de totes les aplicacions que comparteixen el Service Mesh

![Service Mesh Compartit](/related/cloud/ServiceMeshCompartit.png)

#### Service Mesh Dedicat

* Control Plane exclusiu per una aplicació
* Totes les eines de monitoratge exclusives per una aplicació
  * Afecta a Kiali, Jaeger, Prometheus i Grafana
* Només els gestors de l’aplicació podran veure les traces distribuïdes, configuració i mètriques de l’aplicació

![Service Mesh Dedicat](/related/cloud/ServiceMeshDedicat.png)

### Segons el model de traces distribuïdes

Es proposen dos models en funció del model de traces distribuïdes

#### Traces distribuïdes no persistents

* Només es monitora un percentatge petit de les traces distribuïdes (1 o 2% com a màxim)
* No s’emmagatzemen les traces en disc
* Traces emmagatzemades en memòria
* En cas de reinici dels contenidors del Control es perden les traces

#### Traces distribuïdes persistents

* Es monitora la totalitat de les traces distribuïdes
* S’emmagatzemen les traces en disc
* Requereix un cluster d’ElasticSearch per persistir les traces

## Descriptors destacats

* El component més important del Service Mesh és el Proxy Envoy
* La resta de components tenen la funció de facilitar la configuració del Proxy i donar suport a tasques auxiliars
* La majoria dels descriptors del Service Mesh, són elements de configuració dels Proxies Envoy. * Els més importants són:
  * VirtualService
  * DestinationRule
  * Gateway
* És important tenir clar quina és la funció de cada descriptor i només desplegar els descriptors necessaris

### VirtualService

* Configura les regles d’enrutament al Service Mesh
* No confondre amb els Services de Kubernetes/Openshift
  * Un Service de Kubernetes és una espècie de DNS que resol el nom del service contra les IP’s dels pods
  * Un VirtualService configura els Proxies Envoy per definir l’enrutament dels pods
* Permet definir el percentatge de peticions a enrutar per cada versió d’aplicació
* Podeu trobar més informació a https://archive.istio.io/v1.4/docs/reference/config/networking/virtual-service/

### DestinationRule

* Configura el LoadBalancer al Service Mesh
* Permet configurar
  * Reintents
  * Timeouts
  * Circuit Breakers
  * ...
* Funciona exactament igual que el VirtualService, configurant els Proxies
* Podeu trobar més informació a https://archive.istio.io/v1.4/docs/reference/config/networking/destination-rule/

### Gateway

* Configura els Istio Ingress Gateway i Istio Egress Gateway al Service Mesh
* En el cas del Ingress Gateway és molt semblant a les Routes
* Bàsicament permet configurar els dominis, protocols, ports, certificats
* Funciona exactament igual que el VirtualService, configurant els Edge Proxies
* Podeu trobar més informació a https://archive.istio.io/v1.4/docs/reference/config/networking/gateway/

### Altres descriptors

Podeu trobar informació de la resta de descriptors a:
* https://archive.istio.io/v1.4/docs/reference/config/networking/
* https://archive.istio.io/v1.4/docs/reference/config/security/
* https://archive.istio.io/v1.4/docs/reference/config/policy-and-telemetry/istio.mixer.v1.config.client/
* https://archive.istio.io/v1.4/docs/reference/config/policy-and-telemetry/istio.policy.v1beta1/

## Exemples

### Canary Deployment

* És un model de desplegament avançat en què la nova versió de l’aplicació (no segura) està desplegada simultàniament amb la versió estable
* Una petita part del tràfic s’envia a la versió nova i es va estudiant el seu comportament. Si el comportament és correcte, a poc a poc es va desviant més tràfic fins que tot el tràfic va a la versió nova
* Llavors ja es pot eliminar la versió antiga de l’aplicació

![Canary Deployment](/related/cloud/canaryDeployment.png)

Exemple:

* Tenim dos deployments desplegats, un amb la versió estable i un amb la nova versió
* Els dos deployments formen tenen el mateix service
  * Tenen la label **app: test-service**
* Addicionalment tenen la label version per poder distingir-los per istio
  * La versió estable **version: safe**
  * La versió nova **version: risky**
* L'exemple no té **Gateway**, és per un servei intern al què no s'accedeix des de l'exterior de la plataforma a través d'un navegador. En exemples posteriors s'afegirà el Gateway per veure com la configuració per serveis accessibles des de navegadors web
* La configuració necessària del Service Mesh per enviar el 90% del tràfic a la versió estable i el 10% a la versió nova seria el següent:

```yaml
kind: VirtualService
apiVersion: networking.istio.io/v1alpha3
metadata:
  name: a-set-of-routing-rules-we-can-call-this-anything  # "just" a name for this virtualservice
  namespace: default
spec:
  hosts:
    - test-service.default.svc.cluster.local  # The Service DNS (ie the regular K8S Service) name that we're applying routing rules to.
  http:
    - route:
        - destination:
            host: test-service.default.svc.cluster.local # The Target DNS name
            subset: safe-group  # The name defined in the DestinationRule
          weight: 90
        - destination:
            host: test-service.default.svc.cluster.local # The Target DNS name
            subset: risky-group  # The name defined in the DestinationRule
          weight: 10
---
kind: DestinationRule       # Defining which pods should be part of each subset
apiVersion: networking.istio.io/v1alpha3
metadata:
  name: grouping-rules-for-our-canary-release # This can be anything you like.
  namespace: default
spec:
  host: test-service # Service
  trafficPolicy: ~
  subsets:
    - labels:   # SELECTOR.
        version: safe # find pods with label "safe"
      name: safe-group
    - labels:
        version: risky
      name: risky-group
```

### A/B Testing

* És un model molt similar al Canary Deployment, també es basa en tenir dues versions desplegades y enviar part del tràfic a una versió i part a l’altre
* En el model de Canary Deployment, normalment no es decideix quins usuaris accedeixen a la nova versió i quins no, es fa per percentatge de tràfic
* En el model A/B Testing es pot decidir quins usuaris accedeixen a la nova versió i quins a l'antiga
* Normalment es fa a través d’una capçalera HTTP
* L'exemple té **Gateway**, és per serveis accessibles des de l'exterior de la plataforma amb navegadors web
* La configuració necessària del Service Mesh per enviar el tràfic que tingui la capçalera HTTP **x-my-header: test** a la nova versió i la resta a la versió estable seria el següent:

```yaml
kind: Gateway
apiVersion: networking.istio.io/v1alpha3
metadata:
  name: ingress-gateway-configuration
spec:
  selector:
    istio: ingressgateway # use Istio default gateway implementation
  servers:
  - port:
      number: 80
      name: http
      protocol: HTTP
    hosts:
    - "*"   # Domain name of the external website
---
kind: VirtualService
apiVersion: networking.istio.io/v1alpha3
metadata:
  name: a-set-of-routing-rules-we-can-call-this-anything  # "just" a name for this virtualservice
  namespace: default
spec:
  hosts:      # which incoming host are we applying the proxy rules to???
    - "*"
  gateways:
    - ingress-gateway-configuration
  http:
    - match:
      - headers:  # IF
          x-my-header:
            exact: test
      route: # THEN
      - destination:
          host: test-service.default.svc.cluster.local # The Target DNS name
          subset: risky-group  # The name defined in the DestinationRule
    - route: # CATCH ALL
      - destination:
          host: test-service.default.svc.cluster.local # The Target DNS name
          subset: safe-group  # The name defined in the DestinationRule

---
kind: DestinationRule # Defining which pods should be part of each subset
apiVersion: networking.istio.io/v1alpha3
metadata:
  name:grouping-rules-for-our-dark-launching # This can be anything you like.
  namespace: default
spec:
  host: test-service # Service
  subsets:
    - labels: # SELECTOR.
        version: safe # find pods with label "safe"
      name: safe-group
    - labels:
        version: risky
      name: risky-group
```

### Fault Injection

* Permet injectar errors a un percentatge de les peticions
* Permet fer que un microservei respongui més lent
* Molt útil per simular i identificar el comportament de sistema en casos de fallida de la xarxa i/o microserveis
* Es pot utilitzar amb model similar al de A/B Testing, de manera que el valor d’una capçalera HTTP decideixi si s’injecten errors o no
* La configuració necessària del Service Mesh per introduir error quan la capçalera HTTP sigui **x-my-header: test** seria el següent:

```yaml
kind: VirtualService
apiVersion: networking.istio.io/v1alpha3
metadata:
  name: a-set-of-routing-rules-we-can-call-this-anything  # "just" a name for this virtualservice
  namespace: default
spec:
  hosts:
    - test-service.default.svc.cluster.local # The Target DNS name
  http:
    - match:
        - headers: # IF
            x-my-header:
              exact: test
      fault:
        abort:
          httpStatus: 503 # BE CAREFUL WITH INDENTATION!
          percentage:
            value: 10
      route: # THEN
        - destination:
            host: test-service.default.svc.cluster.local # The Target DNS name
    - route: # CATCH ALL
        - destination:
            host: test-service.default.svc.cluster.local # The Target DNS name
```

### Timeouts

* Permet afegir, de manera transparent als microserveis, timeouts entre peticions per evitar colls d’ampolla i fallides en cascada
* La configuració necessària del Service Mesh per configurar Timeouts seria el següent:

```yaml
kind: VirtualService
apiVersion: networking.istio.io/v1alpha3
metadata:
  name: a-set-of-routing-rules-we-can-call-this-anything  # "just" a name for this virtualservice
  namespace: default
spec:
  hosts:
    - test-service.default.svc.cluster.local #The service
  http:
    - route:
      - destination:
          host: test-service.default.svc.cluster.local # The Target DNS name
          subset: v1  # The name defined in the DestinationRule
      timeout: 10s
```

### Reintents

* Permet afegir, de manera transparent als microserveis, polítiques de reintents entre peticions per mitigar puntuals de xarxa o microserveis
* La configuració necessària del Service Mesh per configurar Reintents seria el següent:

```yaml
kind: VirtualService
apiVersion: networking.istio.io/v1alpha3
metadata:
  name: a-set-of-routing-rules-we-can-call-this-anything  # "just" a name for this virtualservice
  namespace: default
spec:
  hosts:
    - test-service.default.svc.cluster.local #The service
  http:
    - route:
      - destination:
          host: test-service.default.svc.cluster.local # The Target DNS name
          subset: v1  # The name defined in the DestinationRule
      retries:
        attempts: 3
        perTryTimeout: 2s
```

### Throttling

* Permet limitar el nombre de peticions concurrents màxim a un microservei per evitar la seva saturació
* La configuració necessària del Service Mesh per configurar Throttling seria el següent:

```yaml
kind: DestinationRule # Defining which pods should be part of each subset
apiVersion: networking.istio.io/v1alpha3
metadata:
  name:grouping-rules # This can be anything you like.
  namespace: default
spec:
  host: test-service # Service
  subsets:
    - labels: # SELECTOR.
        version: v1 # find pods with label "v1"
      name: v1
      trafficPolicy:
        connectionPool:
          tcp:
            maxConnections: 100
```

### Circuit Breaker

* Circuit Breaker és un patró introduït per Martin Fowler molt important, en el àmbit de microserveis
  * https://martinfowler.com/bliki/CircuitBreaker.html
  * https://www.oscarblancarteblog.com/2018/12/04/circuit-breaker-pattern/
* En un sistema complex, quan un dels elements comença a fallar i introduir latències, és fàcil que es produeixi una fallida en cascada on és molt difícil identificar l’origen
* Aquest patró ajuda a evitar les fallides en cascada
* Es basa en testejar el servei i en cas que no es comporti correctament tallar les peticions durant un cert període de temps per evitar una fallida en cascada.

![Circuit Breaker](/related/cloud/circuitBreaker.png)

* La configuració necessària del Service Mesh per establir el Circuit Breaker seria:

```yaml
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: circuit-breaker-for-test-service
spec:
  host: test-service.default.svc.cluster.local  # This is the name of the k8s service that we're configuring
  trafficPolicy:
    outlierDetection: # Circuit Breakers HAVE TO BE SWITCHED ON
      consecutiveErrors: 3
      interval: 20s
      maxEjectionPercent: 100
    baseEjectionTime: 30s
```

### ACL

* Defineix la seguretat de les crides entre microserveis
* Defineix quins microserveis poden cridar a un microservei concret
* Simplifica la implementació de seguretat en microserveis, eliminant la necessitat de l’ús de keys per securitzar els microserveis
* Està basat en Policies de Mixer
* Per exemple, si tenim tres microserveis que només es poden cridar de manera seqüencial, Customer -> Preference -> Recommendation, la configuració seria la següent:

```yaml
apiVersion: "config.istio.io/v1alpha2"
kind: denier
metadata:
  name: do-not-pass-go
spec:
  status:
    code: 7
    message: Customer -> Preference -> Recommendation ONLY
---
apiVersion: "config.istio.io/v1alpha2"
kind: checknothing
metadata:
  name: just-stop
spec:
---
apiVersion: "config.istio.io/v1alpha2"
kind: rule
metadata:
  name: no-customer-to-recommendation
spec:
  match: source.labels["app"]=="customer" && destination.labels["app"] == "recommendation"
  actions:
  - handler: do-not-pass-go.denier
    instances: [ just-stop.checknothing ]
---
apiVersion: "config.istio.io/v1alpha2"
kind: rule
metadata:
  name: no-preference-to-customer
spec:
  match: source.labels["app"]=="preference" && destination.labels["app"] == "customer"
  actions:
  - handler: do-not-pass-go.denier
    instances: [ just-stop.checknothing ]
---
apiVersion: "config.istio.io/v1alpha2"
kind: rule
metadata:
  name: no-recommendation-to-customer
spec:
  match: source.labels["app"]=="recommendation" && destination.labels["app"] == "customer"
  actions:
  - handler: do-not-pass-go.denier
    instances: [ just-stop.checknothing ]
---
apiVersion: "config.istio.io/v1alpha2"
kind: rule
metadata:
  name: no-recommendation-to-preference
spec:
  match: source.labels["app"]=="recommendation" && destination.labels["app"] == "preference"
  actions:
  - handler: do-not-pass-go.denier
    instances: [ just-stop.checknothing ]

```

### RBAC

* Permet definir quins usuaris fer peticions als serveis.
* Permet restringir el tipus de petició HTTP (GET, POST, ...)
* Funciona de manera similar al RBAC d’Openshift
* Per exemple, tenim tres microserveis (Customer ,Preference i Recommendation) als que només volem permetre peticions GET, la configuració seria la següent:

```yaml
# Istio’s RBAC uses a deny-by-default strategy
# Nothing is permitted until you explicitly define an access-control policy

apiVersion: "rbac.istio.io/v1alpha1"
kind: RbacConfig
metadata:
  name: default
spec:
  mode: 'ON_WITH_INCLUSION'
  inclusion:
    namespaces: ["test"]

# mode can be
# OFF: Istio authorization is disabled.
# ON: Istio authorization is enabled for all services in the mesh.
# ON_WITH_INCLUSION: Enabled only for services and namespaces specified in the inclusion field.
# ON_WITH_EXCLUSION: Enabled for all services in the mesh except the services and namespaces specified in the exclusion field.

---

# Allow all users GET calls to microservices "customer", "recommendation", "preference"
apiVersion: "rbac.istio.io/v1alpha1"
kind: ServiceRole
metadata:
  name: service-viewer
  namespace: test
spec:
  rules:
  - services: ["*"]
    methods: ["GET"]
    constraints:
    - key: "destination.labels[app]"
      values: ["customer", "recommendation", "preference"]
---
apiVersion: "rbac.istio.io/v1alpha1"
kind: ServiceRoleBinding
metadata:
  name: bind-service-viewer
  namespace: test
spec:
  subjects:
  - user: "*"
  roleRef:
    kind: ServiceRole
    name: "service-viewer"

```

## Recursos addicionals

### Documentació

* https://docs.openshift.com/container-platform/4.3/welcome/index.html
  * Apartat Service Mesh
* https://archive.istio.io/v1.4/docs/
  * Important no confondre amb la v1.5 (última versió) de Istio, hi ha importants diferències en Arquitectura i Seguretat especialment
* https://maistra.io/
* https://kiali.io/
* https://www.jaegertracing.io/
* https://opentracing.io/
* https://prometheus.io/
* https://grafana.com/

### Tutorials i exemples

* https://redhat-developer-demos.github.io/istio-tutorial/istio-tutorial/1.4.x/index.html
* https://maistra.io/docs/examples/

