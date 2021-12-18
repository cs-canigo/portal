+++
date        = "2021-10-01"
title       = "Exemple de Kafka Streams"
description = "El propòsit d'aquest exemple és demostrar l'escriptura i la lectura d'un tòpic de Kafka"
sections    = "EventHub"
toc 		= false
taxonomies  = []
weight 		= 1
+++


# Kafka Streams Example
- [Kafka Streams Example](#kafka-streams-example)
  - [Objectiu](#objectiu)
  - [Requisits](#requisits)
  - [Crear el projecte](#crear-el-projecte)
  - [Docker Confluent Platform](#docker-confluent-platform)
  - [Configurar el projecte](#configurar-el-projecte)
  - [Esquema avro](#esquema-avro)
  - [Crear l'aplicació Kafka Streams](#crear-laplicació-kafka-streams)
  - [Crear el Productor](#crear-el-productor)
  - [Compilar i executar](#compilar-i-executar)
  - [Produir esdeveniments al tòpic d'entrada](#produir-esdeveniments-al-tòpic-dentrada)
  - [Comprovar l'execució de l'aplicació Kafka Streams](#comprovar-lexecució-de-laplicació-kafka-streams)
  - [Execució en entorn securitzat](#execució-en-entorn-securitzat)
  - [Recursos externs](#recursos-externs)

## Objectiu
El propòsit d'aquest exemple és demostrar l'escriptura i la lectura d'un tòpic de Kafka.

Per això es crearà una aplicació encarregada de produir missatges al tòpic, així com una altra encarregada de la lectura d'aquests missatges.

Els missatges enviats al tòpic estaran representats mitjançant un esquema Avro compost dels següents camps:
- number: Número del missatge.
- message: text del missatge.

L'aplicació productora assignarà als registres enviats al tòpic una clau identificativa de l'aplicació.

Aquesta clau serà utilitzada en la lectura amb el propòsit de processar només els missatges que coincideixin amb aquesta clau.

L'aplicació encarregada del processament dels missatges filtrarà els que la seva clau coincideixi amb el valor definit a properties com a application.id i que a més el valor del camp number sigui parell.


## Requisits
- Docker
- docker-compose
- JDK 1.8
- Gradle

## Crear el projecte
En primer lloc, crearem el directori arrel del projecte:
```shell
mkdir kstreams-example && cd kstreams-example
```

## Docker Confluent Platform
Farem ús de Docker per executar el projecte de manera local.

Per això crearem el fitxer __docker-compose.yml__ amb el contingut següent:

```yaml
---
version: '2'

services:
  zookeeper:
    image: confluentinc/cp-zookeeper:6.1.0
    hostname: zookeeper
    container_name: zookeeper
    ports:
      - "2181:2181"
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000

  broker:
    image: confluentinc/cp-kafka:6.1.0
    hostname: broker
    container_name: broker
    depends_on:
      - zookeeper
    ports:
      - "29092:29092"
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: 'zookeeper:2181'
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: PLAINTEXT:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://broker:9092,PLAINTEXT_HOST://localhost:29092
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
      KAFKA_GROUP_INITIAL_REBALANCE_DELAY_MS: 0

  schema-registry:
    image: confluentinc/cp-schema-registry:6.1.0
    hostname: schema-registry
    container_name: schema-registry
    depends_on:
      - broker
    ports:
      - "8081:8081"
    environment:
      SCHEMA_REGISTRY_HOST_NAME: schema-registry
      SCHEMA_REGISTRY_KAFKASTORE_BOOTSTRAP_SERVERS: 'broker:9092'
      SCHEMA_REGISTRY_LOG4J_ROOT_LOGLEVEL: WARN
```

## Configurar el projecte
Crearem el fitxer de construcció de Gradle __build.gradle__:
```groovy
buildscript {
  repositories {
    mavenCentral()
  }
  dependències {
    classpath "com.commercehub.gradle.plugin:gradle-avro-plugin:0.22.0"
    classpath "com.github.jengelman.gradle.plugins:shadow:4.0.2"
  }
}

plugins {
  aneu "java"
  id "com.google.cloud.tools.jib" version "3.1.1"
}

sourceCompatibility = "1.8"
targetCompatibility = "1.8"
versió = "0.0.1"

repositories {
  mavenCentral()


  maven {
    url "https://packages.confluent.io/maven"
  }
}

apply plugin: "com.commercehub.gradle.plugin.avro"
apply plugin: "com.github.johnrengelman.shadow"

dependències {
  implementation "org.apache.avro:avro:1.10.2"
  implementation "org.slf4j:slf4j-simple:1.7.30"
  implementation "org.apache.kafka:kafka-streams:2.7.0"
  implementation "io.confluent:kafka-streams-avro-serde:6.1.1"
  testImplementation "org.apache.kafka:kafka-streams-test-utils:2.7.0"
  testImplementation "junit:junit:4.13.2"
}

test {
  testLogging {
    outputs.upToDateWhen { false }
    showStandardStreams = true
    exceptionFormat = "full"
  }
}

jar {
  manifest {
    attributs(
        "Class-Path": configurations.compileClasspath.collect { it.getName() }.join(" "),
        "Main-Class": "org.example.kstreams.KStreamsExample"
    )
  }
}

shadowJar {
  archiveBaseName = "kstreams-example-standalone"
  archiveClassifier = ''
}
```

Obtenim el wrapper de Gradle:
```shell
gradle wrapper
```

El segënt pas serà crear el fitxer de properties amb els paràmetres de configuració del projecte.

Creem el directori __configuration__:
```shell
mkdir configuration
```

Dins el directori que acabem de crear, afegirem el fitxer __dev.properties__:
```properties
application.id=a1234.test.kstreams.example
bootstrap.servers=127.0.0.1:29092
acks=all
schema.registry.url=http://127.0.0.1:8081

input.topic.name=test.topic.kstreams.example
```

## Esquema avro
Creem el directori per a l'esquema dels missatges al nostre stream d'esdeveniments:
```shell
mkdir -p src/main/avro
```

Dins aquest directori, creem l'esquema __message.avsc__:
```json
{
  "namespace": "org.example.kstreams.schema",
  "type": "record",
  "name": "Message",
  "fields": [
    {"name": "number", "type": "int"},
    {"name": "message", "type": "string"}
  ]
}
```

Finalment, atès que l'esquema serà utilitzat des de codi Java, construirem el projecte:
```shell
./gradlew build
```

## Crear l'aplicació Kafka Streams
Aquesta aplicació llegeix registres del tòpic configurat al fitxer de properties, aplica un filtre sobre ells i
mostra per la sortida estàndard els registres que compleixen el filtre.

Els criteris aplicats per filtar els registres són els següents:
- ID d'aplicació:
  Filtrem registres la clau dels quals correspongui amb el valor de l'application.id que hem definit al nostre fitxer de properties.
  Això ens permetrà tractar només els registres que generem des del nostre productor en cas d'haver-hi diverses aplicacions realitzant proves simultàniament.
- Elements per als quals el valor del camp __number__ és parell.

En primer lloc, des de l'arrel del projecte, crearem el directori que allotjarà el codi font de l'aplicació:
```shell
mkdir -p src/java/org/example/kstreams
```

A continuació, creem la classe __KStreamsExample.java__:
```java
package org.example.kstreams;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.time.Duration;
import java.util.Map;
import java.util.Properties;
import java.util.concurrent.CountDownLatch;

import org.apache.kafka.common.serialization.Serdes;
import org.apache.kafka.streams.KafkaStreams;
import org.apache.kafka.streams.StreamsBuilder;
import org.apache.kafka.streams.StreamsConfig;
import org.apache.kafka.streams.Topology;
import org.apache.kafka.streams.kstream.Consumed;
import org.apache.kafka.streams.kstream.Printed;
import org.example.kstreams.schema.Message;

import io.confluent.common.utils.TestUtils;
import io.confluent.kafka.streams.serdes.avro.SpecificAvroSerde;

public class KStreamsExample {

  private SpecificAvroSerde<Message> messageSerde(final Properties allProps) {
    final SpecificAvroSerde<Message> serde = new SpecificAvroSerde<>();
    Map<String, String> config=(Map)allProps;
    serde.configure(config, false);
    return serde;
  }

  public Topology buildTopology(Properties allProps,
                                final SpecificAvroSerde<Message> messageSerde) {
    final StreamsBuilder builder = new StreamsBuilder();

    final String applicationID = allProps.getProperty("application.id");
    final String inputTopic = allProps.getProperty("input.topic.name");

    builder.stream(inputTopic, Consumed.with(Serdes.String(), messageSerde))
        // The same topic is shared by multiple applications, so
        // filter messages que correspon a la nostra applicationID.
        //
        // We also apply a filter to process only even numbers for demonstration purposes.
        .filter((recordKey, message) -> applicationID.equals(recordKey) && message.getNumber() % 2 == 0)
        .print(Printed.toSysOut());

    return builder.build();
  }

  public Properties loadEnvProperties(String fileName) throws IOException {
    Properties allProps = new Properties();
    try (FileInputStream input = new FileInputStream(fileName)) {
      allProps.load(input);
    }

    return allProps;
  }


  public static void main(String[] args) throws IOException {
    if (args.length < 1) {
      throw new IllegalArgumentException(
          "This programes tenen un argument: la path to environment configuration file.");
    }

    new KStreamsExample().runRecipe(args[0]);
  }

  private void runRecipe(final String configPath) throws IOException {
    final Properties allProps = new Properties();
    try (InputStream inputStream = new FileInputStream(configPath)) {
      allProps.load(inputStream);
    }
    allProps.put(StreamsConfig.APPLICATION_ID_CONFIG, allProps.getProperty("application.id"));
    allProps.put(StreamsConfig.STATE_DIR_CONFIG, TestUtils.tempDirectory().getPath());

    Topology topology = this.buildTopology(allProps, this.messageSerde(allProps));

    final KafkaStreams streams = new KafkaStreams(topology, allProps);
    final CountDownLatch latch = New CountDownLatch(1);

    // Attach shutdown handler to catch Control-C.
    Runtime.getRuntime().addShutdownHook(new Thread("streams-shutdown-hook") {
      @Override
      public void run() {
        streams.close(Duration.ofSeconds(5));
        latch.countDown();
      }
    });

    try {
      streams.start();
      latch.await();
    } catch (Throwable e) {
      System.exit(1);
    }
    System.exit(0);

  }
}
```

## Crear el Productor
Ara crearem el productor que s'encarregarà d'enviar registres al tòpic.

Dins del directori __src/java/org/example/kstreams__, crearem la classe __ProducerExample.java__:
```java
package org.example.kstreams;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.common.serialization.StringSerializer;
import org.example.kstreams.schema.Message;

public class ProducerExample {

public static void main(String[] args) throws IOException {
if (args.length < 1) {
throw new IllegalArgumentException(
"This programes tenen un argument: la path to environment configuration file.");
}
new ProducerExample().runProducer(args[0]);
}

public void runProducer(final String configPath) throws IOException {
    final Properties allProps = new Properties();
    try (InputStream inputStream = new FileInputStream(configPath)) {
      allProps.load(inputStream);
    }
allProps.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
allProps.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, "io.confluent.kafka.serializers.KafkaAvroSerializer");

    final String topic = allProps.getProperty("input.topic.name");
final String applicationID = allProps.getProperty("application.id");

KafkaProducer<String, Message> producer = new KafkaProducer<>(allProps);

try {
for (int i = 0; i < 100; i++) {
Message message = new Message(applicationID, "Test message" + i);
ProducerRecord<String, Message> producerRecord = new ProducerRecord<>(topic, applicationID, message);

producer.send(producerRecord);
}
} catch (Exception e) {
e.printStackTrace();
} finally {
producer.close();
}
}
}
```

## Compilar i executar
Generarem el jar de l'aplicació mitjançant l'ordre:

```shell
./gradlew shadowJar
```

Executem l'entorn de Confluent Platform mitjançant docker:

```shell
docker-compose up -d
```

Creem el tòpic sobre el qual treballarem:
```shell
docker exec -it broker kafka-topics --bootstrap-server broker:9092 \
  --topic test.topic.kstreams.example --create --partitions 1 --replication-factor 1
```

Llancem l'aplicació de Kafka Streams:

```shell
java -jar build/libs/kstreams-example-standalone-0.0.1.jar configuration/dev.properties
```

## Produir esdeveniments al tòpic d'entrada
Per començar a produir esdeveniments al tòpic llançarem el productor:

```shell
java -cp build/libs/kstreams-example-standalone-0.0.1.jar org.example.kstreams.ProducerExample configuration/dev.properties
```

## Comprovar l'execució de l'aplicació Kafka Streams
Podrem observar per la sortida estàndard els missatges filtrats.

```
[KSTREAM-FILTER-0000000001]: a1234.test.kstreams.example, {"number": 0, "message": "Test message 0"}
[KSTREAM-FILTER-0000000001]: a1234.test.kstreams.example, {"number": 2, "message": "Test message 2"}
[KSTREAM-FILTER-0000000001]: a1234.test.kstreams.example, {"number": 4, "message": "Test message 4"}
```

## Execució en entorn securitzat
Haurem de crear un nou fitxer de configuració amb la informació que se'ns hagi assignat per accedir al clúster.

Dins el directori __configuration__, afegirem el fitxer __int.properties__:
```properties
application.id=<ID de l'aplicació>
bootstrap.servers=<Llista de brokers separats per comes>
acks=all
ssl.truststore.location=<Ruta al fitxer truststore.jks>
ssl.truststore.password=<Password del truststore>
ssl.keystore.location=<Ruta al fitxer keystore.jks>
ssl.keystore.password=<Password del keystore>
ssl.key.password=<Password de la clau privada>
security.protocol=SSL
schema.registry.url=<URL de Schema Registry>
schema.registry.ssl.truststore.location=<Ruta al fitxer truststore.jks>
schema.registry.ssl.truststore.password=<Password del truststore>
basic.auth.credentials.source=<>
basic.auth.user.info=<>

input.topic.name=<Nom del tòpic de prova>
```

No caldrà crear el tòpic en aquest cas, ja que estarà creat per endavant a l'entorn.

Llancem l'aplicació de Kafka Streams amb la nova configuració:
```shell
java -jar build/libs/kstreams-example-standalone-0.0.1.jar configuration/int.properties
```

Farem el mateix pel productor:
```shell
java -cp build/libs/kstreams-example-standalone-0.0.1.jar org.example.kstreams.ProducerExample configuration/int.properties
```

## Recursos externs

- [Desenvolupament d'aplicacions Kafka](https://docs.confluent.io/platform/current/build-applications.html)
- [Tutorials de Kafka de Confluent](https://kafka-tutorials.confluent.io/)
- [Seguretat a Confluent Platform](https://docs.confluent.io/platform/current/security/general-overview.html)