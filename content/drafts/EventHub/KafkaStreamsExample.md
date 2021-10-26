+++ date = "2021-10-01" title = "Exemple de Kafka Streams" description = "El propòsit d'aquest exemple és demostrar l'escriptura i lectura d'un tòpic de Kafka" responsable = "Oficina Tècnica EventHub" sections = ["drafts"] blog_tags = ["kafka"] categories = ["Kafka","EventHub"] key = "OCTUBRE2021" +++

# Kafka Streams Example
- [Kafka Streams Example](#kafka-streams-example)
  - [Objetivo](#objetivo)
  - [Requisitos](#requisitos)
  - [Crear el proyecto](#crear-el-proyecto)
  - [Docker Confluent Platform](#docker-confluent-platform)
  - [Configurar el proyecto](#configurar-el-proyecto)
  - [Esquema avro](#esquema-avro)
  - [Crear la aplicación Kafka Streams](#crear-la-aplicación-kafka-streams)
  - [Crear el Productor](#crear-el-productor)
  - [Compilar y ejecutar](#compilar-y-ejecutar)
  - [Producir eventos al tópico de entrada](#producir-eventos-al-tópico-de-entrada)
  - [Comprobar ejecución de la aplicación Kafka Streams](#comprobar-ejecución-de-la-aplicación-kafka-streams)
  - [Ejecución en entorno securizado](#ejecución-en-entorno-securizado)
  - [Recursos externos](#recursos-externos)

## Objetivo
El propósito de este ejemplo es demostrar la escritura y lectura de un tópico de Kafka.

Para ello se creará una aplicación encargada de producir mensajes al tópico, así como otra encargada de la lectura de dichos mensajes.

Los mensajes enviados al tópico estarán representados mediante un esquema Avro compuesto de los siguientes campos:
- number: Número del mensaje.
- message: Texto del mensaje.

La aplicación productora asignará a los registros enviados al tópico una clave identificativa de la aplicación.

Esta clave será utilizada en la lectura con el propóistro de procesar sólo los mensajes que coincidan con dicha clave.

La aplicación encargada del procesamiento de los mensajes filtrará los que su clave coincida con el valor definido en properties como application.id y que además el valor del campo number sea par.


## Requisitos
- Docker
- docker-compose
- JDK 1.8
- Gradle

## Crear el proyecto
En primer lugar, crearemos el directorio raíz del proyecto:
```shell
mkdir kstreams-example && cd kstreams-example
```

## Docker Confluent Platform
Haremos uso de Docker para ejecutar el proyecto de manera local.

Para ello crearemos el fichero __docker-compose.yml__ con el siguiente contenido:

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

## Configurar el proyecto
Crearemos el fichero de construcción de Gradle __build.gradle__:
```groovy
buildscript {
  repositories {
    mavenCentral()
  }
  dependencies {
    classpath "com.commercehub.gradle.plugin:gradle-avro-plugin:0.22.0"
    classpath "com.github.jengelman.gradle.plugins:shadow:4.0.2"
  }
}

plugins {
  id "java"
  id "com.google.cloud.tools.jib" version "3.1.1"
}

sourceCompatibility = "1.8"
targetCompatibility = "1.8"
version = "0.0.1"

repositories {
  mavenCentral()


  maven {
    url "https://packages.confluent.io/maven"
  }
}

apply plugin: "com.commercehub.gradle.plugin.avro"
apply plugin: "com.github.johnrengelman.shadow"

dependencies {
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
    attributes(
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

Obtenemos el wrapper de Gradle:
```shell
gradle wrapper
```

El siguiente paso será crear el fichero de properties con los parámetros de configuración del proyecto.

Creamos el directorio __configuration__:
```shell
mkdir configuration
```

Dentro del directorio que acabamos de crear, añadiremos el fichero __dev.properties__:
```properties
application.id=a1234.test.kstreams.example
bootstrap.servers=127.0.0.1:29092
acks=all
schema.registry.url=http://127.0.0.1:8081

input.topic.name=test.topic.kstreams.example
```

## Esquema avro
Creamos el directorio para el esquema de los mensajes en nuestro stream de eventos:
```shell
mkdir -p src/main/avro
```

Dentro de este directorio, creamos el esquema __message.avsc__:
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

Por último, dado que el esquema será utilizado desde código Java, construiremos el proyecto:
```shell
./gradlew build
```

## Crear la aplicación Kafka Streams
Esta aplicación lee registros del tópico configurado en el fichero de properties, aplica un filtro sobre ellos y 
muestra por la salida estándar los registros que cumplen el filtro.

Los criterios aplicados para filtar los registros son los siguientes:
- ID de aplicación: 
  Filtramos registros cuya clave corresponda con el valor del application.id que hemos definido en nuestro fichero de properties.
  Esto nos permitirá tratar sólo los registros que generamos desde nuestro productor en caso de haber varias aplicaciones realizando pruebas simultáneamente.
- Elementos para los que el valor del campo __number__ es par.

En primer lugar, desde la raíz del proyecto, crearemos el directorio que alojará el código fuente de la aplicación:
```shell
mkdir -p src/java/org/example/kstreams
```

A continuación, creamos la clase __KStreamsExample.java__:
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
    Map<String, String> config = (Map)allProps;
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
        // filter messages that correspond to our applicationID. 
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
          "This program takes one argument: the path to an environment configuration file.");
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
    final CountDownLatch latch = new CountDownLatch(1);

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
Ahora procederemos a crear el productor que se encargará de enviar registros al tópico.

Dentro del directorio __src/java/org/example/kstreams__, crearemos la clase __ProducerExample.java__:
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
					"This program takes one argument: the path to an environment configuration file.");
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
				Message message = new Message(applicationID, "Test message " + i);
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

## Compilar y ejecutar
Generaremos el jar de la aplicación mediante el comando:

```shell
./gradlew shadowJar
```

Ejecutamos el entorno de Confluent Platform mediante docker:

```shell
docker-compose up -d
```

Creamos el tópico sobre el que vamos a trabajar:
```shell
docker exec -it broker kafka-topics --bootstrap-server broker:9092 \
  --topic test.topic.kstreams.example --create --partitions 1 --replication-factor 1
```

Lanzamos la aplicación de Kafka Streams:

```shell
java -jar build/libs/kstreams-example-standalone-0.0.1.jar configuration/dev.properties
```

## Producir eventos al tópico de entrada
Para empezar a producir eventos en el tópico lanzaremos el productor:

```shell
java -cp build/libs/kstreams-example-standalone-0.0.1.jar org.example.kstreams.ProducerExample configuration/dev.properties
```

## Comprobar ejecución de la aplicación Kafka Streams
Podremos observar por la salida estándar los mensajes filtrados.

```
[KSTREAM-FILTER-0000000001]: a1234.test.kstreams.example, {"number": 0, "message": "Test message 0"}
[KSTREAM-FILTER-0000000001]: a1234.test.kstreams.example, {"number": 2, "message": "Test message 2"}
[KSTREAM-FILTER-0000000001]: a1234.test.kstreams.example, {"number": 4, "message": "Test message 4"}
```

## Ejecución en entorno securizado
Deberemos crear un nuevo archivo de configuración con la información que se nos haya asignado para acceder al cluster.

Dentro del directorio __configuration__, añadiremos el fichero __int.properties__:
```properties
application.id=<ID de la aplicación>
bootstrap.servers=<Lista de brokers separados por comas>
acks=all
ssl.truststore.location=<Ruta al fichero truststore.jks>
ssl.truststore.password=<Password del truststore>
ssl.keystore.location=<Ruta al fichero keystore.jks>
ssl.keystore.password=<Password del keystore>
ssl.key.password=<Password de la clave privada>
security.protocol=SSL
schema.registry.url=<URL de Schema Registry>
schema.registry.ssl.truststore.location=<Ruta al fichero truststore.jks>
schema.registry.ssl.truststore.password=<Password del truststore>
basic.auth.credentials.source=<>
basic.auth.user.info=<>

input.topic.name=<Nombre del tópico de prueba>
```

No será necesario crear el tópico en este caso, ya que estará creado de antemano en el entorno.

Lanzamos la aplicación de Kafka Streams con la nueva configuración:
```shell
java -jar build/libs/kstreams-example-standalone-0.0.1.jar configuration/int.properties
```

Haremos lo mismo para el productor:
```shell
java -cp build/libs/kstreams-example-standalone-0.0.1.jar org.example.kstreams.ProducerExample configuration/int.properties
```

## Recursos externos

- [Desarrollo de aplicaciones Kafka](https://docs.confluent.io/platform/current/build-applications.html)
- [Tutoriales de Kafka de Confluent](https://kafka-tutorials.confluent.io/)
- [Seguridad en Confluent Platform](https://docs.confluent.io/platform/current/security/general-overview.html)
