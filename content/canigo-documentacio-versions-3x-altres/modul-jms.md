+++
date        = "2015-04-02T13:14:36+02:00"
title       = "Cues JMS"
description = "Missatgeria estándard JMS"
sections    = "Canigó. Documentació versió 3.x"
weight      = 2
+++

## Propòsit

En aquest apartat s'explica de forma senzilla la infraestructura de missatgeria estándard JMS (Java Messaging Service) de J2EE. Aquest estàndar defineix dues modalitats:

1. Producció de missatges
2. Consum de missatges, que pot ser asíncron.

El consum de missatges assíncrons a l'estàndar J2EE es realitza mitjançant "Message-Driven Beans".

Canigó no incorpora cap llibreria addicional a les ja aportades per Spring per lo que aquest apartat estará enfocat com a guia per a simplificar la publicació i consum de missatge.

## Documents i Fonts de Referència

Referència | URL
---------- | ---
Spring JMS | http://static.springsource.org/spring/docs/4.1.0.RELEASE/spring-framework-reference/html/jms.html

## Glossari

**JMS**

JMS o Java Message Service es un estàndard de missatgeria que permet als components de les aplicacions basades en la plataforma J2EE, crear, enviar, rebre i llegir missatges de manera sincrona i asincrona.

**ConnectionFactory**

Factoria encarregada de crear una connexió al proveidor del sistema de missatges.

**Destination**

Punts de destí dels missatges que s'envien.

## Descripció detallada

### Missatgeria Publicació/Subscripció

La missatgeria de publicació/subscripció permet a una aplicació enviar missatges a una o múltiples aplicacions. Aquestes aplicacions envien i reben missatges subscrivint-se a un servidor de missatges a una cua o tòpic determinat.

Hi ha dos tipus de missatge depenent de com es consumeixen:

* Queue: en el cas d'un missatge enviat a una cua, encara que hi hagi varis subscriptors a aquests missatges, únicament es processarà una única vegada pel primer subscriptor que estigui lliure.
* Topic: en el cas d'un missatge enviat a un tòpic, tots els subscriptors a aquests missatges els processaran.

Els consumidors d'un missatge poden ser síncrons o asíncrons. En general, els consumidors asíncrons escalen millor i tenen un rendiment superior.

Per aplicacions que s'executen al costat servidor, gairebé sempre sempre s'utilitzaran consumidors asíncrons. Concretament per aplicacions J2ee es fa mitjançant Message-Driven Beans (MDB's) que són EJB's configurats per escoltar i subscriures a cues o tòpics del servidor d'aplicacions.

A continuació es destaquen alguns paràmetres de configuració dels missatges JMS que cal tenir en compte en el desenvolupament d'aplicacions que publiquin o consumeixin aquests tipus de missatges.

### Persistència del missatge

Els missatges JMS poden ser especificats com a persistents o no-persistents.

* Un missatge persistent garanteix la seva entrega un i només un cop. El missatge no pot ser perdut degut a una fallida del proveïdor JMS, i no pot ser entregat dos cops. No es considerat enviat el missatge fins que no ha estat persistit (a un fitxer ó a una base de dades).
* Un missatge no-persistent no és emmagatzemat. Està garantit que sigui entregat com a molt un cop, però si hi ha una fallida del proveïdor JMS el missatge pot ser perdut.

Els missatges persistents tenen pitjor rendiment degut al pas addicional d'haver-se d'escriure en disc o a base de dades. Només es recomana utilitzar missatges persistents pels casos d'ús crítics, on no es pot permetre la pèrdua del missatge (p.ex. una trasacció bancària, ...).

### Destinacions distribuïdes

Una destinació distribuïda és un conjunt de destinacions que són accessibles com a una única destinació lògica al client. Disposen d'una sola adreça JNDI, i els membres d'aquest conjunt normalment són distribuïts pels membres d'un cluster, on cada destinació pertany a un servidor JMS separat.

Les aplicacions que usen destinacions distribuïdes tenen més disponibilitat respecte a les tradicionals, ja que els servidor (Weblogic) proporciona balanceig de càrrega i tolerància a fallades pels membres d'una destinació distribuïda en un cluster.

Per tant, es recomana l'ús de destinacions distribuïdes sempre que les aplicacions publicadores/consumidores es desplegin en un cluster de Weblogic.

## Instal.lació i Configuració

### Instal.lació

Per tal d'instal- lar Quartz es necessari afegir manualment en el pom.xml de l'aplicació la següent dependència:

```
<org.opensymphony.quartz.version>2.2.1</org.opensymphony.quartz.version>
<commons.collections.version>4.0</commons.collections.version>
<org.springframework.version>4.1.0.RELEASE</org.springframework.version>

<dependency>
	<groupId>org.springframework</groupId>
	<artifactId>org.springframework.jms</artifactId>
	<version>$org.springframework.version}</version>
</dependency>
<dependency>
	<groupId>javax.jms</groupId>
	<artifactId>com.springsource.javax.jms</artifactId>
	<version>1.1.0</version>
</dependency>
<!-- Active MQ -->
<dependency>
	<groupId>org.apache.activemq</groupId>
	<artifactId>com.springsource.org.apache.activemq</artifactId>
	<version>5.3.0</version>
</dependency>
<dependency>
	<groupId>org.apache.xbean</groupId>
	<artifactId>com.springsource.org.apache.xbean.spring</artifactId>
	<version>3.6.0</version>
</dependency>
<dependency>
	<groupId>org.apache.geronimo.specs</groupId>
	<artifactId>com.springsource.javax.management.j2ee</artifactId>
	<version>1.0.1</version>
</dependency>
```

### Configuració

La configuració del servei de cues el podriem dividir en els següents punts:

* Configuració de la infraestructura
* Configuració del productor
* Configuració del consumidor
* Externalització de les propietats d'aquests beans

Ubicació: <PROJECT_ROOT>/src/main/resources/spring/jms-config.xml

Configuració dels arxius de propietats

Ubicació: <PROJECT_ROOT>/src/main/resources/config/props/jms.properties

Dins d'aquest arxiu romandrien les propietats per a la gestió de la invocació:

Exemple d'arxiu de propietats:

```
*.jms.physicalNameDestination=cat.gencat.cttit.jms.test
*.jms.acknowledge=auto
*.jms.uri=tcp://localhost:0
``


## Utilització del Mòdul

En aquest exemple es configurarà:

* Arxiu de configuració de Spring per a la càrrega de beans implicats en l'enviament i consum de missatges JMS.
* Arxiu de propietats de configuració.
* Productor de missatges.
* Listener/consumidor de missatges.
* Classe de Test per certificar el se funcionament.

**jms-config.xml**

```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:p="http://www.springframework.org/schema/p"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:jms="http://www.springframework.org/schema/jms"
       xmlns:amq="http://activemq.apache.org/schema/core"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
                           http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/context
                           http://www.springframework.org/schema/context/spring-context.xsd
                           http://www.springframework.org/schema/jms
                           http://www.springframework.org/schema/jms/spring-jms.xsd
                           http://activemq.apache.org/schema/core
                           http://activemq.apache.org/schema/core/activemq-core.xsd">

    <context:component-scan base-package="cat.gencat.ctti.testing.jms" />

    <!--  ActiveMQ Broker Embegut -->
    <amq:broker id="broker" useJmx="false" persistent="false">
        <amq:transportConnectors>
            <amq:transportConnector uri="${jms.uri}" />
        </amq:transportConnectors>
    </amq:broker>

    <!--  ActiveMQ Destination  -->
    <amq:queue id="destination" physicalName="${jms.physicalNameDestination}" />

    <!-- JMS ConnectionFactory al broker embegut -->
    <amq:connectionFactory id="jmsFactory" brokerURL="${jms.brokerURL}" />

    <!-- Configuració del productor -->
    <bean id="jmsProducerConnectionFactory"
          class="org.springframework.jms.connection.SingleConnectionFactory"
          depends-on="broker"
          p:targetConnectionFactory-ref="jmsFactory" />

    <bean id="jmsProducerTemplate" class="org.springframework.jms.core.JmsTemplate"
          p:connectionFactory-ref="jmsProducerConnectionFactory"
          p:defaultDestination-ref="destination" />

    <!-- Configuració del consumidor -->
    <bean id="jmsConsumerConnectionFactory"
          class="org.springframework.jms.connection.SingleConnectionFactory"
          depends-on="broker"
          p:targetConnectionFactory-ref="jmsFactory" />

    <jms:listener-container container-type="default"
                            connection-factory="jmsConsumerConnectionFactory"
                            acknowledge="${jms.acknowledge}">
        <jms:listener destination="org.springbyexample.jms.test" ref="jmsMessageListener" />
    </jms:listener-container>

    <!-- Contador per al consumidor i la clase de test per verificar el número de missatges enviats -->
    <bean id="counter" class="java.util.concurrent.atomic.AtomicInteger" />

</beans>
```

<div class="message information">
En aquest cas s'ha fet servir un servidor ActiveMQ embegut que Spring s'encarrega de aixecar. En el cas d'apuntar a un servidor remot, s'hauria d'eliminar les referències a aquest i apuntar al nou broker.
</div>


Destacar que els beans del consumidor i productor han de'estar al package "cat.gencat.ctti.testing.jms" perque component-scan aixequi de manera automàtica els beans de Spring.

**jms.properties**

```
*.jms.physicalNameDestination=cat.gencat.cttit.jms.test
*.jms.acknowledge=auto
*.jms.uri=tcp://localhost:0
*.jms.brokerURL=vm://localhost
```

**JmsMessageProducer.java**

```java
@Component
public class JmsMessageProducer {

    private static final Log logger = LogFactory.getLog(JmsMessageProducer.class);

    protected static final String MESSAGE_COUNT = "messageCount";

    @Autowired
    private JmsTemplate template = null;
    private int messageCount = 100;

    /**
     * Generació dels missatges
     */
    @PostConstruct
    public void generateMessages() throws JMSException {
        for (int i = 0; i < messageCount; i++) {
            final int index = i;
            final String text = "Message number is " + i + ".";

            template.send(new MessageCreator() {
                public Message createMessage(Session session) throws JMSException {
                    TextMessage message = session.createTextMessage(text);
                    message.setIntProperty(MESSAGE_COUNT, index);
                    logger.info("Sending message: " + text);
                    return message;
                }
            });
        }
    }
}
```

L'annotació PostConstruct fa que el métode generateMessage s'executi un cop Spring instanciï/creï el bean **JmsMessageProducer**.

**JmsMessageListener.java**

```java
@Component
public class JmsMessageListener implements MessageListener {

    private static final Log logger = LogFactory.getLog(JmsMessageListener.class);

    @Autowired
    private AtomicInteger counter = null;

    /**
     * Implementació de <code>MessageListener</code>.
     */
    public void onMessage(Message message) {
        try {
            int messageCount = message.getIntProperty(JmsMessageProducer.MESSAGE_COUNT);

            if (message instanceof TextMessage) {
                TextMessage tm = (TextMessage)message;
                String msg = tm.getText();
                logger.info("Processed message '" + msg + "'.  value=" + messageCount);
                counter.incrementAndGet();
            }
        } catch (JMSException e) {
            logger.error(e.getMessage(), e);
        }
    }

}
```

Consumim asincronament els missatges que el productor ha anat enviat a la cua.

**JmsMessageListenerTest.java**

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"jms-config.xml"})
public class JmsMessageListenerTest {

    private static final Log logger = LogFactory.getLog(JmsMessageListenerTest.class);

    @Autowired
    private AtomicInteger counter = null;

    @Test
    public void testMessage() throws Exception {
        assertNotNull("Counter is null.", counter);
        int expectedCount = 100;
        logger.info("Testing...");
        // Esperem que el listener processi tots els missatges
        Thread.sleep(2 * 1000);
        assertEquals("Message is not '" + expectedCount + "'.", expectedCount, counter.get());
    }

}
```

Ens assegurem que el contador ha arribat a 100, lo que asegura que el consumidor ha rebut els 100 missatges del productor.