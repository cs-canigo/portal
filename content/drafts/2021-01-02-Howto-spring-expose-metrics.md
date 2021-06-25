+++
date        = "2021-01-02"
title       = "Canigó. Com exposar i capturar mètriques d'acompliment (Prometheus, Grafana)"
description = "Com exposar i capturar mètriques d'acompliment generades a través de Spring i capturades per serveis com Prometheus i Grafana."
section     = "howtos"
categories  = ["canigo"]
#key        = "GENER2021"
+++


## Introducció

L'objectiu d'aquest article és mostrar com exposar mètriques d'acompliment d'aplicacions, en un projecte generat amb el framework Canigó, i capturades per serveis de monitarització, alerta i visualizació OpenSource com: [Prometheus](https://github.com/prometheus/prometheus) i [Grafana](https://github.com/grafana/grafana)

---
## Justificació

Un dels reptes d'una aplicació és tenir visibilitat del què succeeix durant la seva execució, sobretot en escenaris de desplegament sobre contenidors. Els contenidors afegeixen velocitat i augmenten el rendiment dins del procés de desenvolupament, però aporten complexitat addicional sobre la visibilitat del comportament i la gestió d'alertes relacionades. És en aquest punt en el què les solucions de monitoratge com Prometheus i Grafana poden ajudar.

Quan s'utilitza un projecte creat amb Canigó que es basa en Spring, és possible exposar diferents mètriques utilitzant la llibreria `spring-boot-starter-actuator`, i és possible exposar les mètriques en un format compatible amb Prometheus amb la llibreria `micrometer-registry-prometheus`.

---
## Configuració

Per activar les mètriques amb `actuator`, i exposar-les amb un exporter de `Prometheus` en un projecte creat amb Canigó, es necessari afegir algunes dependències.

### Canvis al `pom.xml`

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

### Canvis al `application.yml` per configurar els `endpoints` de `actuator`

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

Per a recollir les mètriques, iniciarem un `Prometheus`, en aquest cas iniciarem un `Prometheus` en contenidor.

### Fitxer de configuració `prometheus.yml`

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

Iniciarem el contenidor de `Prometheus` amb el fitxer de configuració:

```sh
docker run --rm -d -p 9090:9090 -v $PWD/prometheus.yml:/etc/prometheus/prometheus.yml prom/prometheus
```

Per visualitzar les mètriques, iniciarem un `Grafana`, en aquest cas iniciarem un `Grafana` en contenidor.

```sh
docker run --rm -d -p 3000:3000 grafana/grafana
```

---
## Ús

### Proves 

> Per provar el funcionament iniciarem l'aplicació

```sh
  mvn spring-boot:run 
```

> Provarem alguns serveis que mostren les mètriques disponibles

  * /actuator

  * /actuator/health

  * /actuator/metrics/jvm.memory.used
  
  * /actuator/prometheus

![Spring Exposes Metrics Ejemplo 1](/images/howtos/2021-01-02_spring_expose_metrics_example1.gif)


> Es consulta a `Prometheus` que estigui configurat el job d'importació de mètriques

![Spring Exposes Metrics Ejemplo 2](/images/howtos/2021-01-02_spring_expose_metrics_example2.gif)


> Es consulta a `Prometheus` les mètriques

![Spring Exposes Metrics Ejemplo 3](/images/howtos/2021-01-02_spring_expose_metrics_example3.gif)


> Es configura `Grafana` per obtenir les dades del `Prometheus` i s'importen els `Dashboards` per visualitzar les mètriques en gràfics

![Spring Exposes Metrics Ejemplo 4](/images/howtos/2021-01-02_spring_expose_metrics_example4.gif)


---
## Conclusió

 * És possible a partir de configuració exposar mètriques en un projecte creat amb Canigó per a poder-les explotar i visualitzar utilitzant `Prometheus` i `Grafana`

---
## Referències

Per a més informació podeu consultar:

 * [Spring Boot Actuator](https://docs.spring.io/spring-boot/docs/current/reference/html/actuator.html)
 * [Micrometer Prometheus](https://micrometer.io/docs/registry/prometheus)
