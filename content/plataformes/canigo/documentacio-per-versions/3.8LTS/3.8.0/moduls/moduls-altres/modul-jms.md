+++
date        = "2024-01-15"

title       = "Cues JMS"
description = "Missatgeria est�ndard JMS"
sections    = "Canig�. Documentaci� Versi� 3.8"
weight      = 2
+++

## Prop�sit

En aquest apartat s'explica de forma senzilla la infraestructura de missatgeria est�ndard JMS (Java Messaging Service) de J2EE. Aquest est�ndar defineix dues modalitats:

1. Producci� de missatges
2. Consum de missatges, que pot ser as�ncron.

El consum de missatges ass�ncrons a l'est�ndar J2EE es realitza mitjan�ant "Message-Driven Beans".

Canig� no incorpora cap llibreria addicional a les ja aportades per Spring per lo que aquest apartat estar� enfocat com a guia per a simplificar la publicaci� i consum de missatge.

## Documents i Fonts de Refer�ncia

Refer�ncia | URL
---------- | ---
Spring JMS | https://docs.spring.io/spring-framework/docs/6.0.0/reference/html/integration.html#jms

## Glossari

**JMS**

JMS o Java Message Service �s un est�ndard de missatgeria que permet als components de les aplicacions basades en la plataforma J2EE, crear, enviar, rebre i llegir missatges de manera sincrona i asincrona.

**ConnectionFactory**

Factoria encarregada de crear una connexi� al proveidor del sistema de missatges.

**Destination**

Punts de dest� dels missatges que s'envien.

## Descripci� detallada

### Missatgeria Publicaci�/Subscripci�

La missatgeria de publicaci�/subscripci� permet a una aplicaci� enviar missatges a una o m�ltiples aplicacions. Aquestes aplicacions envien i reben missatges subscrivint-se a un servidor de missatges a una cua o t�pic determinat.

Hi ha dos tipus de missatge depenent de com es consumeixen:

* Queue: en el cas d'un missatge enviat a una cua, encara que hi hagi varis subscriptors a aquests missatges, �nicament es processar� una �nica vegada pel primer subscriptor que estigui lliure.
* Topic: en el cas d'un missatge enviat a un t�pic, tots els subscriptors a aquests missatges els processaran.

Els consumidors d'un missatge poden ser s�ncrons o as�ncrons. En general, els consumidors as�ncrons escalen millor i tenen un rendiment superior.

Per aplicacions que s'executen al costat servidor, gaireb� sempre sempre s'utilitzaran consumidors as�ncrons. Concretament per aplicacions J2ee es fa mitjan�ant Message-Driven Beans (MDB's) que s�n EJB's configurats per escoltar i subscriures a cues o t�pics del servidor d'aplicacions.

A continuaci� es destaquen alguns par�metres de configuraci� dels missatges JMS que cal tenir en compte en el desenvolupament d'aplicacions que publiquin o consumeixin aquests tipus de missatges.

### Persist�ncia del missatge

Els missatges JMS poden ser especificats com a persistents o no-persistents.

* Un missatge persistent garanteix la seva entrega un i nom�s un cop. El missatge no pot ser perdut degut a una fallida del prove�dor JMS, i no pot ser entregat dos cops. No es considerat enviat el missatge fins que no ha estat persistit (a un fitxer � a una base de dades).
* Un missatge no-persistent no �s emmagatzemat. Est� garantit que sigui entregat com a molt un cop, per� si hi ha una fallida del prove�dor JMS el missatge pot ser perdut.

Els missatges persistents tenen pitjor rendiment degut al pas addicional d'haver-se d'escriure en disc o a base de dades. Nom�s es recomana utilitzar missatges persistents pels casos d'�s cr�tics, on no es pot permetre la p�rdua del missatge (p.ex. una trasacci� banc�ria, ...).

### Destinacions distribu�des

Una destinaci� distribu�da �s un conjunt de destinacions que s�n accessibles com a una �nica destinaci� l�gica al client. Disposen d'una sola adre�a JNDI, i els membres d'aquest conjunt normalment s�n distribu�ts pels membres d'un cluster, on cada destinaci� pertany a un servidor JMS separat.

Les aplicacions que usen destinacions distribu�des tenen m�s disponibilitat respecte a les tradicionals, ja que els servidor (Weblogic) proporciona balanceig de c�rrega i toler�ncia a fallades pels membres d'una destinaci� distribu�da en un cluster.

Per tant, es recomana l'�s de destinacions distribu�des sempre que les aplicacions publicadores/consumidores es desplegin en un cluster de Weblogic.

## Instal.laci� i Configuraci�

### Instal.laci�

Per tal d'instal- lar Quartz es necessari afegir manualment en el pom.xml de l'aplicaci� la seg�ent depend�ncia:

```
<org.opensymphony.quartz.version>2.2.1</org.opensymphony.quartz.version>
<commons.collections.version>4.0</commons.collections.version>
<org.springframework.version>5.3.9</org.springframework.version>

<dependency>
	<groupId>org.springframework</groupId>
	<artifactId>org.springframework.jms</artifactId>
	<version>$org.springframework.version}</version>
</dependency>
<dependency>
	<groupId>jakarta.jms</groupId>
	<artifactId>com.springsource.jakarta.jms</artifactId>
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
	<version>3.8.0</version>
</dependency>
<dependency>
	<groupId>org.apache.geronimo.specs</groupId>
	<artifactId>com.springsource.jakarta.management.j2ee</artifactId>
	<version>1.0.1</version>
</dependency>
```

### Configuraci�

La configuraci� del servei de cues el podriem dividir en els seg�ents punts:

* Configuraci� de la infraestructura
* Configuraci� del productor
* Configuraci� del consumidor
* Externalitzaci� de les propietats d'aquests beans

Ubicaci�: <PROJECT_ROOT>/src/main/resources/spring/jms-config.xml

Configuraci� dels arxius de propietats

Ubicaci�: <PROJECT_ROOT>/src/main/resources/config/props/jms.properties

Dins d'aquest arxiu romandrien les propietats per a la gesti� de la invocaci�:

Exemple d'arxiu de propietats:

```
*.jms.physicalNameDestination=cat.gencat.cttit.jms.test
*.jms.acknowledge=auto
*.jms.uri=tcp://localhost:0
``


## Utilitzaci� del M�dul

En aquest exemple es configurar�:

* Arxiu de configuraci� de Spring per a la c�rrega de beans implicats en l'enviament i consum de missatges JMS.
* Arxiu de propietats de configuraci�.
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

    <!-- Configuraci� del productor -->
    <bean id="jmsProducerConnectionFactory"
          class="org.springframework.jms.connection.SingleConnectionFactory"
          depends-on="broker"
          p:targetConnectionFactory-ref="jmsFactory" />

    <bean id="jmsProducerTemplate" class="org.springframework.jms.core.JmsTemplate"
          p:connectionFactory-ref="jmsProducerConnectionFactory"
          p:defaultDestination-ref="destination" />

    <!-- Configuraci� del consumidor -->
    <bean id="jmsConsumerConnectionFactory"
          class="org.springframework.jms.connection.SingleConnectionFactory"
          depends-on="broker"
          p:targetConnectionFactory-ref="jmsFactory" />

    <jms:listener-container container-type="default"
                            connection-factory="jmsConsumerConnectionFactory"
                            acknowledge="${jms.acknowledge}">
        <jms:listener destination="org.springbyexample.jms.test" ref="jmsMessageListener" />
    </jms:listener-container>

    <!-- Contador per al consumidor i la clase de test per verificar el n�mero de missatges enviats -->
    <bean id="counter" class="java.util.concurrent.atomic.AtomicInteger" />

</beans>
```

<div class="message information">
En aquest cas s'ha fet servir un servidor ActiveMQ embegut que Spring s'encarrega de aixecar. En el cas d'apuntar a un servidor remot, s'hauria d'eliminar les refer�ncies a aquest i apuntar al nou broker.
</div>


Destacar que els beans del consumidor i productor han de'estar al package "cat.gencat.ctti.testing.jms" perque component-scan aixequi de manera autom�tica els beans de Spring.

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
     * Generaci� dels missatges
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

L'annotaci� PostConstruct fa que el m�tode generateMessage s'executi un cop Spring instanci�/cre� el bean **JmsMessageProducer**.

**JmsMessageListener.java**

```java
@Component
public class JmsMessageListener implements MessageListener {

    private static final Log logger = LogFactory.getLog(JmsMessageListener.class);

    @Autowired
    private AtomicInteger counter = null;

    /**
     * Implementaci� de <code>MessageListener</code>.
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
@ExtendWith(SpringExtension.class)
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