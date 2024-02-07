+++
date        = "2024-01-15"

title       = "Webservices"
description = "Webservices"
sections    = "Canig�. Documentaci� Versi� 3.8"
weight      = 3
+++

## Prop�sit

El prop�sit d'aquest apartat es introduir al desenvolupador en la configuraci� i �s d'una infraestructura de Webservices en dues modalitats:

* Exportaci� de serveis Java mitjan�ant Web Services.
* Importaci� de Web Services externs, generaci� si cal de classes Java d'invocaci�.

Ja que Canig� 3 no disposa d'un servei addicional de Webservices, l'enfocament d'aquest apartat es el de simplificar tant la definici� de Web Services a partir de serveis Java simples (que no tindran depend�ncies amb la implementaci� particular de Web Services) aix� com la de facilitar la invocaci� a Web Services externs.

Per aquesta aproximaci� s'ha fet servir Spring WS i JAXB i OXM.

## Context i Escenaris d'�s

La integraci� de WebServices no es troba ubicat dins del framework de Canig� com a un servei addicional. Ens recolzarem en les classes de Spring WS per a realitzar els exemples d'integraci�.

## Documents i Fonts de Refer�ncia

Refer�ncia | URL
---------- | ---
Spring Web Services | https://docs.spring.io/spring-ws/docs/current/reference/html/


## Glossari

**EndPoint**

Una interf�cie endpoint, tamb� coneguda com a interf�cie de servei endpoint (SEI), �s un terme utilitzat en la plataforma J2EE quan s'exposa un Enterprise Java Bean com a servei web. Un client accedeix a partir d'aquesta interf�cie, que com a totes les interf�cies, defineix el m�todes de negoci del bean.

**OXM**

La API OXM (spring-oxm.jar) proporciona integraci� entre les APIs m�s populars de marshalling de XML (JAXB1, JAXB2, Castor, Jibx).

**JAXB**

Java Architecture for XML Binding (JAXB) �s una API que proporcionar als desenvolupadors una eina de mapping de classes Java a la seva representaci� XML.

**Marshalling**

�s el proc�s que s'encarrega de transformar la representaci� d'un objecte en memoria (Java Object) en un format que encaixi amb el canal de comunicaci� amb el que es treballa (XML).

**UnMarshalling**

�s el proc�s invers al Marshalling, la representaci� en format XML passa a convertir-se en una Java Object.

**XSDL**

Un arxiu WSDL �s un arxiu XML que descriu la forma de comunicaci�, es a dir, els requsisits de protocol i els formats dels missatges necessaris per interactuar amb els serveis llistats en el seu cat�leg. Aix� un arxiu WSDL funciona com a interficie p�blica del web service.

## Instal.laci� i Configuraci�

### Instal.laci�

La instal.laci� del servei requereix de la utilitzaci� de la llibreria 'spring-ws-core'.

	 <dependency>
      <groupId>org.springframework.ws</groupId>
      <artifactId>spring-ws-core</artifactId>
    </dependency>

## Configuraci�

Aquest punt el dividirem en dues parts segons si volem exposar un servei o b� som consumidor(clients) de ell:

### Configuraci� com a client

La configuraci� del web implica els seg�ents passos:

* Generar les classes Java i els seus bindings a partir del WSDL del Webservice.
* Definir l'arxiu de propietats amb les dades del webservice.
* Definir l'arxiu de configuraci� de Spring: client, marshallers, WebserviceTemplate.
* Definir el client que realitzar� la crida.
* Test d'exemple

#### Generar les classes Java i els seus bindings a partir del WSDL del Webservice

Per aquest proc�s s'utilitza el plugin [cxf-codegen-plugin](http://cxf.apache.org/docs/maven-cxf-codegen-plugin-wsdl-to-java.html) de maven. Aquest �s l'encarregat de generar el codi Java i les anotacions de binding de manera autom�tica a partir del WSDL.

En aquest exemple utilitzem el WSDL p�blic: http://ws.cdyne.com/ip2geo/ip2geo.asmx?wsdl
	
    �s recomanable generar aquestes classes en un projecte extern, i posteriorment afegir aquest projecte com a depend�ncia del projecte
	
En un projecte tipus maven configurem el pom.xml.

A data de creaci� d'aquest exemple la �ltima versi� de CXF disponible �s la 3.4.5, recomanem utilitzar la �ltima versi�.

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


Aquest plugin generar� autom�ticament el codi Java del WSDL informat:

![classes_generades](/related/canigo/documentacio/modul-webservices/classes_generades.png)

Copiem les classes generades al nostre projecte Canig�.

#### Definici� de l'arxiu de propietats

Fitxer de configuraci�: webservices.properties
Ubicaci� proposada: <PROJECT_ROOT>/src/main/resources/config/props

    *.ws.uri=http://ws.cdyne.com/ip2geo/ip2geo.asmx

Contindr� les URLs del webservices segons l'entorn al que es vulgui atacar.

#### Definir l'arxiu de configuraci� de Spring

Fitxer de configuraci�: canigo-webservices-config.xml

Ubicaci� proposada: <PROJECT_ROOT>/src/main/resources/spring

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

En aquesta configuraci� destacar el bean `marshaller`, on a la propietat `contextPath` posem el package de les classes generades, en aquest exemple.

#### Definir el client que realitzar� la crida

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

	import static org.junit.jupiter.api.Assertions.assertNotNull;
	import static org.junit.jupiter.api.Assertions.assertEquals;
	import org.junit.jupiter.api.BeforeEach;
	import org.junit.jupiter.api.Test;
	import org.springframework.beans.factory.annotation.Autowired;
	import org.springframework.test.context.ContextConfiguration;
	import org.junit.jupiter.api.extension.ExtendWith;
	import org.springframework.test.context.junit.jupiter.SpringExtension;

	import com.cdyne.ws.ResolveIPResponse;

	import cat.gencat.wsprova.ws.WebServiceClient;


	@ExtendWith(SpringExtension.class)
	@ContextConfiguration(locations = {"classpath:cat/gencat/ctti/canigo/arch/core/config/canigo-core.xml"})
	public class WebServiceClientTest {
		
		@Autowired
		public WebServiceClient client;
		
		@BeforeEach
		public void init(){
			assertNotNull(client);
		}
		
		@Test
		public void testCall(){
			ResolveIPResponse response = client.simpleSendAndReceive("91.126.217.34", "?");
			
			assertNotNull(response);
			assertEquals("Fornells De La Selva", response.getResolveIPResult().getCity());
			assertEquals("Spain", response.getResolveIPResult().getCountry());
			
		}
		
	}