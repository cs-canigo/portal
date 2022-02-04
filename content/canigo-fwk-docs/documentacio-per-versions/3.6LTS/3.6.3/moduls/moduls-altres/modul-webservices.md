+++
date        = "2021-12-27"
title       = "Webservices"
description = "Webservices"
sections    = "Canigó. Documentació Versió 3.6"
weight      = 3
+++

## Propòsit

El propòsit d'aquest apartat es introduir al desenvolupador en la configuració i ús d'una infraestructura de Webservices en dues modalitats:

* Exportació de serveis Java mitjançant Web Services.
* Importació de Web Services externs, generació si cal de classes Java d'invocació.

Ja que Canigó 3 no disposa d'un servei addicional de Webservices, l'enfocament d'aquest apartat es el de simplificar tant la definició de Web Services a partir de serveis Java simples (que no tindran dependències amb la implementació particular de Web Services) així com la de facilitar la invocació a Web Services externs.

Per aquesta aproximació s'ha fet servir Spring WS i JAXB i OXM.

## Context i Escenaris d'Ús

La integració de WebServices no es troba ubicat dins del framework de Canigó com a un servei addicional. Ens recolzarem en les classes de Spring WS per a realitzar els exemples d'integració.

## Documents i Fonts de Referència

Referència | URL
---------- | ---
Spring Web Services | https://docs.spring.io/spring-ws/docs/current/reference/html/


## Glossari

**EndPoint**

Una interfície endpoint, també coneguda com a interfície de servei endpoint (SEI), és un terme utilitzat en la plataforma J2EE quan s'exposa un Enterprise Java Bean com a servei web. Un client accedeix a partir d'aquesta interfície, que com a totes les interfícies, defineix el mètodes de negoci del bean.

**OXM**

La API OXM (spring-oxm.jar) proporciona integració entre les APIs més populars de marshalling de XML (JAXB1, JAXB2, Castor, Jibx).

**JAXB**

Java Architecture for XML Binding (JAXB) és una API que proporcionar als desenvolupadors una eina de mapping de classes Java a la seva representació XML.

**Marshalling**

És el procés que s'encarrega de transformar la representació d'un objecte en memoria (Java Object) en un format que encaixi amb el canal de comunicació amb el que es treballa (XML).

**UnMarshalling**

És el procés invers al Marshalling, la representació en format XML passa a convertir-se en una Java Object.

**XSDL**

Un arxiu WSDL és un arxiu XML que descriu la forma de comunicació, es a dir, els requsisits de protocol i els formats dels missatges necessaris per interactuar amb els serveis llistats en el seu catàleg. Així un arxiu WSDL funciona com a interficie pública del web service.

## Instal.lació i Configuració

### Instal.lació

La instal.lació del servei requereix de la utilització de la llibreria 'spring-ws-core'.

	 <dependency>
      <groupId>org.springframework.ws</groupId>
      <artifactId>spring-ws-core</artifactId>
    </dependency>

## Configuració

Aquest punt el dividirem en dues parts segons si volem exposar un servei o bé som consumidor(clients) de ell:

### Configuració com a client

La configuració del web implica els següents passos:

* Generar les classes Java i els seus bindings a partir del WSDL del Webservice.
* Definir l'arxiu de propietats amb les dades del webservice.
* Definir l'arxiu de configuració de Spring: client, marshallers, WebserviceTemplate.
* Definir el client que realitzarà la crida.
* Test d'exemple

#### Generar les classes Java i els seus bindings a partir del WSDL del Webservice

Per aquest procés s'utilitza el plugin [cxf-codegen-plugin](http://cxf.apache.org/docs/maven-cxf-codegen-plugin-wsdl-to-java.html) de maven. Aquest és l'encarregat de generar el codi Java i les anotacions de binding de manera automàtica a partir del WSDL.

En aquest exemple utilitzem el WSDL públic: http://ws.cdyne.com/ip2geo/ip2geo.asmx?wsdl
	
    És recomanable generar aquestes classes en un projecte extern, i posteriorment afegir aquest projecte com a dependència del projecte
	
En un projecte tipus maven configurem el pom.xml.

A data de creació d'aquest exemple la última versió de CXF disponible és la 3.4.5, recomanem utilitzar la última versió.

**pom.xml**

	....
	<build>
		<plugins>
			...........
					...........

			<plugin>
				<groupId>org.apache.cxf</groupId>
				<artifactId>cxf-codegen-plugin</artifactId>
				<version>3.4.5</version>
				<executions>
					<execution>
						<id>generate-sources</id>
						<phase>generate-sources</phase>
						<configuration>
							<sourceRoot>${basedir}/src/main/java</sourceRoot>
							<wsdlOptions>
								<wsdlOption>
									<wsdl>http://ws.cdyne.com/ip2geo/ip2geo.asmx?wsdl</wsdl>
								</wsdlOption>
							</wsdlOptions>
						</configuration>
						<goals>
							<goal>wsdl2java</goal>
						</goals>
					</execution>
				</executions>
			</plugin>
		</plugins>
	</build>
	......


Aquest plugin generarà automàticament el codi Java del WSDL informat:

![classes_generades](/related/canigo/documentacio/modul-webservices/classes_generades.png)

Copiem les classes generades al nostre projecte Canigó.

#### Definició de l'arxiu de propietats

Fitxer de configuració: webservices.properties
Ubicació proposada: <PROJECT_ROOT>/src/main/resources/config/props

    *.ws.uri=http://ws.cdyne.com/ip2geo/ip2geo.asmx

Contindrà les URLs del webservices segons l'entorn al que es vulgui atacar.

#### Definir l'arxiu de configuració de Spring

Fitxer de configuració: canigo-webservices-config.xml

Ubicació proposada: <PROJECT_ROOT>/src/main/resources/spring

	<?xml version="1.0" encoding="UTF-8"?>
	<beans xmlns="http://www.springframework.org/schema/beans"
		xmlns:context="http://www.springframework.org/schema/context"
		xmlns:aop="http://www.springframework.org/schema/aop"
		xmlns:util="http://www.springframework.org/schema/util"
		xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
		xmlns:p="http://www.springframework.org/schema/p"
		xsi:schemaLocation="http://www.springframework.org/schema/beans 
				http://www.springframework.org/schema/beans/spring-beans-4.3.xsd
				http://www.springframework.org/schema/aop 
				http://www.springframework.org/schema/aop/spring-aop-4.3.xsd
				http://www.springframework.org/schema/context 
				http://www.springframework.org/schema/context/spring-context-4.3.xsd
				http://www.springframework.org/schema/util
				http://www.springframework.org/schema/util/spring-util-4.3.xsd">

		<bean id="messageFactory" class="org.springframework.ws.soap.saaj.SaajSoapMessageFactory">
			<property name="soapVersion">
				<util:constant static-field="org.springframework.ws.soap.SoapVersion.SOAP_12" />
			</property>
		</bean>
		
		<bean id="webServiceTemplate" class="org.springframework.ws.client.core.WebServiceTemplate">
			<constructor-arg ref="messageFactory" />
			<property name="marshaller" ref="marshaller" />
			<property name="unmarshaller" ref="marshaller" />
			<property name="defaultUri" value="${ws.uri}" />
		</bean>
		
		<bean id="webServiceClient" class="cat.gencat.wsprova.ws.WebServiceClientImpl">
			<property name="webServiceTemplate" ref="webServiceTemplate"/>
			<property name="defaultUri" value="${ws.uri}" />        
		</bean>
		
		<bean id="marshaller" class="org.springframework.oxm.jaxb.Jaxb2Marshaller">
			<property name="contextPath" value="com.cdyne.ws"/>
		</bean>

	</beans>

En aquesta configuració destacar el bean `marshaller`, on a la propietat `contextPath` posem el package de les classes generades, en aquest exemple.

#### Definir el client que realitzarà la crida

Codi d'exemple per a la crida al webservice.

**WebServiceClient.java**

	import com.cdyne.ws.ResolveIPResponse;


	public interface WebServiceClient {
		
		ResolveIPResponse simpleSendAndReceive(String ip, String licenseKey);
	}

**WebServiceClientImpl.java**

	import org.springframework.ws.client.core.WebServiceTemplate;

	import com.cdyne.ws.ResolveIP;
	import com.cdyne.ws.ResolveIPResponse;

	public class WebServiceClientImpl implements WebServiceClient {
		
		private WebServiceTemplate webServiceTemplate;

		public void setWebServiceTemplate(WebServiceTemplate webServiceTemplate) {
			this.webServiceTemplate = webServiceTemplate;
		}

		public void setDefaultUri(String defaultUri) {
			webServiceTemplate.setDefaultUri(defaultUri);
		}

		public ResolveIPResponse simpleSendAndReceive(String ip, String licenseKey) {
			
			ResolveIP request = new ResolveIP();
			request.setIpAddress(ip);
			request.setLicenseKey(licenseKey);
					
			return (ResolveIPResponse)webServiceTemplate.marshalSendAndReceive(request);
		}

	}

Definir un test per a certificar el seu funcionament

**WebServiceClientTest .java**

	import org.junit.Assert;
	import org.junit.Before;
	import org.junit.Test;
	import org.junit.runner.RunWith;
	import org.springframework.beans.factory.annotation.Autowired;
	import org.springframework.test.context.ContextConfiguration;
	import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

	import com.cdyne.ws.ResolveIPResponse;

	import cat.gencat.wsprova.ws.WebServiceClient;


	@RunWith(SpringJUnit4ClassRunner.class)
	@ContextConfiguration(locations = {"classpath:cat/gencat/ctti/canigo/arch/core/config/canigo-core.xml"})
	public class WebServiceClientTest {
		
		@Autowired
		public WebServiceClient client;
		
		@Before
		public void init(){
			Assert.assertNotNull(client);
		}
		
		@Test
		public void testCall(){
			ResolveIPResponse response = client.simpleSendAndReceive("91.126.217.34", "?");
			
			Assert.assertNotNull(response);
			Assert.assertEquals("Fornells De La Selva", response.getResolveIPResult().getCity());
			Assert.assertEquals("Spain", response.getResolveIPResult().getCountry());
			
		}
		
	}