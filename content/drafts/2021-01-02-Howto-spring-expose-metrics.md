+++
date        = "2021-01-02"
title       = "Canigó. Com exposar i capturar mètriques amb Prometheus i Grafana"
description = "Com exposar i capturar mètriques generades a través de Spring i capturades per serveis com Prometheus i Grafana."
section     = "howtos"
categories  = ["canigo"]
#key        = "JULIOL2021"
+++


## Introducció

L'objectiu d'aquest article és **mostrar com es poden exposar mètriques de les aplicacions per a projectes generats amb el
Framework Canigó i capturades per serveis de monitorització, alerta i visualizació** de codi obert com:
[Prometheus](https://github.com/prometheus/prometheus) i [Grafana](https://github.com/grafana/grafana).


## Justificació

Un dels principals reptes d'una aplicació és **tenir visibilitat de què succeeix durant la seva execució, sobretot
en escenaris de desplegament sobre contenidors**. Els contenidors afegeixen velocitat i augmenten el rendiment
dins del procés de desenvolupament, però aporten complexitat addicional sobre la visibilitat del comportament
i la gestió d'alertes relacionades. És en aquest punt en el qual les solucions de monitoratge com Prometheus,
per a l’explotació de dades, i Grafana, per a la seva visualització i anàlisi, poden ajudar molt.

Quan s'utilitza un projecte creat amb Canigó basat en Spring, és possible exposar diferents mètriques utilitzant
la llibreria `spring-boot-starter-actuator`, i és possible exposar les mètriques en un format compatible amb
Prometheus amb la llibreria `micrometer-registry-prometheus`.


## Configuració

Per a activar les mètriques amb `actuator` i exposar-les amb un exporter de Prometheus en un projecte creat amb
Canigó, és necessari afegir algunes dependències i configuracions que es detallen a continuació.

### Dependències a afegir al fitxer `pom.xml`

```xml
  ...

  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
    <exclusions>
      <exclusion>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-logging</artifactId>
      </exclusion>
    </exclusions>
  </dependency>

  <dependency>
    <groupId>io.micrometer</groupId>
    <artifactId>micrometer-registry-prometheus</artifactId>
  </dependency>

  ...
```

### Configuració dels `endpoints` de `actuator` al fitxer `application.yml`

```yaml
server:
  port: 8099

# Actuator
  management:
    endpoint:
      shutdown:
        enabled: true
      beans:
        cache:
          time-to-live: 10s
      health:
        #### Show all details of health
        show-details: always
    endpoints:
      web:
        exposure:
          #### Activate all web endpoints
          include: "*"
```


### Fitxer de configuració `prometheus.yml`

Per a recollir les mètriques iniciarem un Prometheus, en aquest cas, en un contenidor:

```yaml
global:
  scrape_interval: 10s

scrape_configs:
  - job_name: 'canigo_spring_prometheus'
    metrics_path: '/actuator/prometheus'
    scrape_interval: 5s
    static_configs:
      - targets: ['xxx.xxx.xxx.xxx:8099']  ## On xxx.xxx.xxx.xxx és la ip del servidor de la aplicación
```

Iniciarem el contenidor amb el fitxer de configuració:

```sh
docker run --rm -d -p 9090:9090 -v $PWD/prometheus.yml:/etc/prometheus/prometheus.yml prom/prometheus
```

Per a visualitzar les mètriques, iniciarem un Grafana, en aquest cas, en un contenidor:

```sh
docker run --rm -d -p 3000:3000 grafana/grafana
```

## Funcionament

Per a provar el funcionament iniciarem l'aplicació:

```sh
  mvn spring-boot:run
```

I provarem alguns serveis que mostren les mètriques disponibles:

  * /actuator

  * /actuator/health

  * /actuator/metrics/jvm.memory.used

  * /actuator/prometheus

![Spring Exposes Metrics Ejemplo 1](/images/howtos/2021-01-02_spring_expose_metrics_example1.gif)


Es comprova a Prometheus que estigui configurada la tasca d'importació de mètriques:

![Spring Exposes Metrics Ejemplo 2](/images/howtos/2021-01-02_spring_expose_metrics_example2.gif)


Es consulten a Prometheus les mètriques:

![Spring Exposes Metrics Ejemplo 3](/images/howtos/2021-01-02_spring_expose_metrics_example3.gif)


Es configura Grafana per a obtenir les dades del Prometheus i s'importen els Dashboards per a visualitzar les
mètriques en format gràfic:

![Spring Exposes Metrics Ejemplo 4](/images/howtos/2021-01-02_spring_expose_metrics_example4.gif)


## Conclusió

És possible a configurar un projecte Canigó per a exposar mètriques en i poder-les explotar i visualitzar
utilitzant eines com Prometheus i Grafana.

## Referències

Per a més informació podeu consultar:

 * [Spring Boot Actuator](https://docs.spring.io/spring-boot/docs/current/reference/html/actuator.html)
 * [Micrometer Prometheus](https://micrometer.io/docs/registry/prometheus)