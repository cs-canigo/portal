+++
date        = "2024-01-15"
draft        = true
title       = "Mòdul Seguretat SAML"
description = "Autenticació d'usuaris utilitzant SAML2"
sections    = "Canigó. Documentació Versió 3.8"
weight      = 10
+++

## Propòsit

El **Mòdul de Seguretat SAML ([Security Assertion Markup Language](https://en.wikipedia.org/wiki/SAML_2.0))** té com a propòsit principal gestionar l'autenticació
dels usuaris en aplicacions Canigó a partir d’assercions SAML2 del proveïdor d'identitats (*Shibboleth*) de GICAR.

## Funcionament

El sistema d'autenticació per API REST de Canigó a partir d'assercions SAML GICAR té dues particularitats:

* És **totalment autocontingut en Java**, es desplega amb la pròpia aplicació i és indiferent del servidor web per davant del servidor d’aplicacions.
No requereix la instal·lació de software binari ni configuració dels Apache que requereix Shibboleth SP.

* És totalment **stateless pel que fa a l’API REST**. Amb implicacions, doncs SAML és un protocol totalment *stateful* i que fa ús de *cookies* per a desar informació.


Per a poder fer conviure una API *stateless* (aplicació Canigó amb autenticació JWT) i un sistema d'autenticació basat en assercions SAML *stateful* s'ha de dividir l'aplicació en dues parts:

•  **Webapp stateless** que conté l’API REST protegida per *token JWT* (Aplicació Canigó amb tota la funcionalitat).

•  **Webapp stateful** (aplicació Bridge) que conté la interfície d’usuari protegida per asserció SAML. Actua com a Service Provider(SP) encarregant-se únicament
d'obtenir i tractar les assercions SAML amb el proveïdor d'identitat (GICAR).

<br/>
L'aplicació *Stateful* funciona com a una SPA protegida per SAML. En accedir, si l'usuari no es troba autenticat, serà redirigit al *login* de GICAR.
Un cop autenticat de forma satisfactòria l'usuari disposarà d'una asserció SAML vàlida. La SPA s'ha d'encarregar, aleshores, de cridar a l'Endpoint `/api/saml` de l'aplicació *Stateless*
amb l'asserció SAML com a paràmetre codificat en Base64. Aquest Endpoint retorna un token JWT vàlid per a accedir als serveis REST de l'aplicació *Stateless* protegits.

<br/>
<div><img src="/related/canigo/documentacio/modul-saml/diagrama-fluxe-saml-drawio.png" alt="Diagrama seqüencia SAML-GICAR-JWT" title="Diagrama seqüencia SAML-GICAR-JWT"></img></div>

## Aplicació Bridge (Stateful)

Des de Canigó **es proporciona una aplicació Bridge plantilla** per tal de fer-se servir com a *Service Provider*.
Aquesta aplicació bridge s'ha de sol·licitar a l'equip del CS Canigó ja que conté dades sensibles.

### Configuració

A continuació es descriu la configuració que caldrà aplicar.

#### Servidor Web

**SAML depèn dels noms DNS dels serveis i la generació de metadades SAML depèn de que l'aplicació conegui el nom DNS**. Els noms de DNS han de tenir sentit al navegador de l’usuari.
Es poden crear metadades de SP amb noms de DNS locals encara que l’IdP no els conegui però el navegador ha de ser capaç de resoldre'l.
Utilitzar *localhost* no funciona, cal un proxy que exposi un nom DNS i es recomana que el protocol d'accés sigui SSL.
Per a realitzar aquesta configuració s'ha utilitzat Apache 2.4. Es descriu a continuació.

<br/>
Al fitxer `httpd.conf` s'han habilitat els següents mòduls:

```
   proxy_module
   proxy_connect_module
   proxy_http_module
   ssl_module
```

És possible que aquests mòduls requereixin l'activació d'altres mòduls del que tinguin dependències. En cas que sigui així, també s'haurien d'incloure per a que el servidor funcioni correctament.

<br/>
Caldrà incloure la següent configuració al final del fitxer `httpd.conf`:

```
   <IfModule ssl_module>
   Include conf/extra/httpd-ssl.conf
   SSLRandomSeed startup builtin
   SSLRandomSeed connect builtin
   </IfModule>
```

<br/>
I caldrà configurar el *VirtualHost* al fitxer `conf/extra/httpd-ssl.conf`:

```
   <VirtualHost _default_:443>

   #Path on es deixa el contingut stàtic de l'aplicació Bridge
   DocumentRoot "${SRVROOT}/htdocs/saml"
   ServerName vagrant.vm
   ServerAlias www.vagrant.vm
   ServerAdmin admin@example.cat
   ErrorLog "${SRVROOT}/logs/error_bridge.log"
   TransferLog "${SRVROOT}/logs/access.log"

   SSLEngine on

   SSLProxyEngine on

   ProxyRequests Off
   ProxyPreserveHost On

   #connexió amb l'aplicació Bridge
   ProxyPass /bridge/ http://localhost:8080/bridge/
   ProxyPassReverse /bridge/ http://localhost:8080/bridge/

   #connexió amb l'API de Canigó
   ProxyPass /api/ http://localhost:9090/api/
   ProxyPassReverse /api/ http://localhost:9090/api/

   SSLCipherSuite ALL:!ADH:!EXPORT56:RC4+RSA:+HIGH:+MEDIUM:+LOW:+SSLv2:+EXP:+eNULL

   #Certificats SSL
   SSLCertificateFile "${SRVROOT}/conf/ssl/apache.crt"
   SSLCertificateKeyFile "${SRVROOT}/conf/ssl/apache.key"

   <FilesMatch "\.(cgi|shtml|phtml|php)$">
      SSLOptions +StdEnvVars
   </FilesMatch>
   <Directory "${SRVROOT}/cgi-bin">
      SSLOptions +StdEnvVars
   </Directory>

   BrowserMatch ".*MSIE.*" \
          nokeepalive ssl-unclean-shutdown \
          downgrade-1.0 force-response-1.0


   </VirtualHost>
```

<br/>
Els certificats `apache.crt` i `apache.key` es poden generar amb [Openssl](ttps://www.openssl.org/):

   ```
        openssl req -x509 -nodes -days 1095 -newkey rsa:2048 -out ${SRVROOT}/conf/ssl/apache.crt -keyout ${SRVROOT}/conf/ssl/apache.key
   ```

<br/>
Aquesta operació demanarà emplenar algunes dades però la que és realment important és el paràmetre *Common Name* que ha de ser el mateix que el valor indicat a *ServerName* al fitxer `httpd-ssl.conf`.
Addicionalment, i en cas que el navegador no pugui resoldre el nom de servidor, s'haurà d'afegir al fitxer `hosts`:

```
   127.0.0.1  vagrant.vm
```

<br/>
Per a realitzar la connexió per HTTPS a l'aplicació Bridge, s'ha d'indicar el *schema* i el *proxyPort* al Tomcat de Spring Boot, concretament al fitxer `TomcatContainerCustomizer`:

```
   import org.slf4j.Logger;
   import org.slf4j.LoggerFactory;
   import org.springframework.boot.context.embedded.ConfigurableEmbeddedServletContainer;
   import org.springframework.boot.context.embedded.EmbeddedServletContainerCustomizer;
   import org.springframework.boot.context.embedded.tomcat.TomcatEmbeddedServletContainerFactory;
   import org.springframework.stereotype.Component;

   @Component
   public class TomcatContainerCustomizer implements EmbeddedServletContainerCustomizer{

      private static final Logger logger = LoggerFactory.getLogger(TomcatContainerCustomizer.class);

      @Override
      public void customize(ConfigurableEmbeddedServletContainer container) {
         if (container instanceof TomcatEmbeddedServletContainerFactory) {
            final TomcatEmbeddedServletContainerFactory tomcat = (TomcatEmbeddedServletContainerFactory) container;
            tomcat.addConnectorCustomizers(connector -> {
               connector.setScheme("https");
               connector.setProxyPort(443);
            });
            logger.info("Enabled secure scheme (https).");
         } else {
            logger.warn("Could not change protocol scheme because Tomcat is not used as servlet container.");
         }
      }
   }
```

<br/>
#### Intercanvi de Metadades Aplicació Bridge (SP) amb IdP GICAR

Per a realitzar la comunicació SAML entre SP (aplicació Bridge) i IdP (GICAR) cadascun ha de tenir les metadades de l'altre. Per a obtenir les metadades de l'IdP GICAR s'ha de demanar a GICAR.
A l'entorn de PRE, a la redacció d'aquest manual, es poden trobar a: https://preproduccio.idp1-gicar.gencat.cat/idp/shibboleth.

<br/>
A l'aplicació Bridge proporcionada pel CS Canigó, aquest fitxer s'ha ubicat a `src/resources/saml/metadata/metaDadesGicarPRE.xml`.
De forma que, al fitxer de propietats `config/props/saml.properties` s’ha d’indicar la ruta:

```
   *.idpMetadata=/saml/metadata/metaDadesGicarPre.xml
```

Del fitxer de metadades proporcionat per GICAR s'obté l'*entityId* que també caldrà indicar-lo també al fitxer `saml.properties`:

```
   *.idpEntityId=https://preproduccio.idp1-gicar.gencat.cat/idp/shibboleth
```

<br/>
Se li ha de proporcionar a GICAR el fitxer metadades del SP i, per a generar-lo, caldrà definir les següents propietats al fitxer `saml.properties`:

Propietat                     | Descripció                                                              | Valor a l'aplicació Bridge proporcionada
----------------------------- | ------------------------------------------------------------------------|------------------
*.spId                          | Identificador del SP. Serveix un UUID a l’atzar precedit de id_. S'ha de consensuar amb GICAR per a que sigui únic     | id_d1e325c0-f6ca-11e7-8c3f-9a214cf093ae
*.spEntityId                  | EntityID del SP. També ha de ser consensuat amb GICAR per a que sigui únic | https://vagrant.vm/bridge00
*.spEntityBaseURL             | URL de l'aplicació | https://vagrant.vm/bridge
*.spKeystore                  | Localització del certificat del Service Provider   | classpath:/saml/samlKeystore.jk
*.spKeystorePass              | Clau privada del certificat | nalle123
*.spKeyname                   | Nom d'accés a la clau privada del certificat   | apollo
*.spKeynamePass               | Paraula de pas d'accés a la clau privada del certificat   | nalle123

<br/>
Una vegada finalitzada la configuració, si s’accedeix a la url de l'aplicació Bridge mitjançant l'Endpoint `/saml/metadata` s'obté el fitxer metadades que s'ha de proporcionar a GICAR.
A l'aplicació Bridge Demo la url seria https://vagrant.vm/bridge/saml/metadata.

<br/>
El fitxer que es genera amb la configuració predeterminada seria el següent:

```
   <?xml version="1.0" encoding="UTF-8"?>
   <md:EntityDescriptor xmlns:md="urn:oasis:names:tc:SAML:2.0:metadata"
      ID="id_d1e325c0-f6ca-11e7-8c3f-9a214cf093ae" entityID="https://vagrant.vm/bridge00">
      <md:SPSSODescriptor AuthnRequestsSigned="true"
         WantAssertionsSigned="true" protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol">
         <md:KeyDescriptor use="signing">
            <ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
               <ds:X509Data>
                  <ds:X509Certificate>certificat...
                  </ds:X509Certificate>
               </ds:X509Data>
            </ds:KeyInfo>
         </md:KeyDescriptor>
         <md:KeyDescriptor use="encryption">
            <ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
               <ds:X509Data>
                  <ds:X509Certificate>certificat...
                  </ds:X509Certificate>
               </ds:X509Data>
            </ds:KeyInfo>
         </md:KeyDescriptor>
         <md:SingleLogoutService
            Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" Location="https://vagrant.vm/bridge/saml/SingleLogout" />
         <md:SingleLogoutService
            Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect"
            Location="https://vagrant.vm/bridge/saml/SingleLogout" />
         <md:NameIDFormat>urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress
         </md:NameIDFormat>
         <md:NameIDFormat>urn:oasis:names:tc:SAML:2.0:nameid-format:transient
         </md:NameIDFormat>
         <md:NameIDFormat>urn:oasis:names:tc:SAML:2.0:nameid-format:persistent
         </md:NameIDFormat>
         <md:NameIDFormat>urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified
         </md:NameIDFormat>
         <md:NameIDFormat>urn:oasis:names:tc:SAML:1.1:nameid-format:X509SubjectName
         </md:NameIDFormat>
         <md:AssertionConsumerService
            Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" Location="https://vagrant.vm/bridge/saml/SSO"
            index="0" isDefault="true" />
         <md:AssertionConsumerService
            Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Artifact"
            Location="https://vagrant.vm/bridge/saml/SSO" index="1" />
      </md:SPSSODescriptor>
   </md:EntityDescriptor>
```

<br/>
#### Altres configuracions Aplicació Bridge

Les assercions tenen un temps de vida útil que pot ser massa estricte en cas de no generar el *Token JWT* a l'instant.
No obstant, es pot optar per afegir un temps addicional en minuts al fitxer `saml.properties`:

```
   *.extraValidityMinutes=60
```

## API Canigó (Stateless)

Aquesta és l'**aplicació a la que l'usuari vol accedir**.
Per a poder accedir als Endpoints publicats l’usuari ha de tenir un *Token JWT* vàlid i, per a obtenir-lo, s'haurà de fer a
partir d'un asserció SAML a través de l'Endpoint `/api/saml` que proporciona el mòdul de seguretat SAML.

### Instal·lació

Per tal d'instal·lar el mòdul de Seguretat SAML s'ha d'afegir la següent dependència al fitxer `pom.xml` de l’aplicació:

```
   <dependency>
      <groupId>cat.gencat.ctti</groupId>
      <artifactId>canigo.security.saml.rest</artifactId>
      <version>${canigo.security.saml.rest}</version>
   </dependency>
```

A la [Matriu de Compatibilitats](/plataformes/canigo/documentacio-per-versions/3.8LTS/3.8.0/moduls/compatibilitat-per-modul/) es pot comprovar la versió del mòdul compatible amb la versió de Canigó utilitzada.

### Configuració

La configuració SAML requereix definir les següent propietats al fitxer `security.properties`:

Propietat                     | Descripció                                                              | Valor a l'aplicació
----------------------------- | ------------------------------------------------------------------------|------------------
*.saml.idpMetadataResource    | Path del classpath on es troba el fitxer Metadades de GICAR        | /metadata/gicar/metaDadesGicarPre.xml
*.saml.idpMetadaFile          | En cas de no informar el valor anterior i no tenir el fitxer Metadades al classpath, path on es troba el fitxer    |
*.saml.idpEntityId           | EntityID del IdP. (GICAR)   | https://preproduccio.idp1-gicar.gencat.cat/idp/shibboleth
*.saml.spBridgeEntityId       | EntityID del SP. (Aplicació Bridge) | https://vagrant.vm/bridge00
*.saml.extraValidityMinutes    | Les assercions tenen un temps de vida útil que potser massa estricte en cas de no generar el token JWT a l'instant, es pot afegir un temps addicional en minuts | 60

Al fitxer `app-custom-security.xml` és necessari definir dos proveïdors d’autenticació: un per a realitzar l’autenticació SAML i un altre que s'encarrega de l'autorització (Arxiu, Base de dades, etc).

<br/>
Per exemple, tot i que no seria el sistema recomanat, amb l’**autorització per fitxer** seria:

```
   <security:authentication-manager>
   <!-- In-Memory Authentication provider-->
      <security:authentication-provider>
         <security:password-encoder ref="passwordEncoder" />
         <security:user-service properties="classpath:config/props/security.users.properties"/>
      </security:authentication-provider>

   <!-- SAML Authentication provider-->
      <security:authentication-provider ref="samlAuthenticationProvider" />
   </security:authentication-manager>

   <bean id="passwordEncoder"
      class="org.springframework.security.crypto.password.NoOpPasswordEncoder"
      factory-method="getInstance" />
```

Al fitxer `security.users.properties` es troben els detalls dels usuaris amb autorització per accedir a l'aplicació amb el següent format:

```
   IDGICAR=password, ROLE, [ROLE_N..,] enabled
```

Com s'utilitzen les assercions SAML per a les autenticacions, la paraula de pas proporcionada en aquest fitxer no s’utilitza.

<br/>
Una altre exemple podria ser l'**autorització per base de dades**:

```
   <security:authentication-manager>
   <!-- BBDD Authentication provider-->
      <security:authentication-provider>
         <security:password-encoder ref="passwordEncoder" />
         <security:jdbc-user-service data-source-ref="dataSource"/>
      </security:authentication-provider>
   <!-- SAML Authentication provider-->
      <security:authentication-provider ref="samlAuthenticationProvider" />
   </security:authentication-manager>

   <bean id="passwordEncoder"
      class="org.springframework.security.crypto.password.NoOpPasswordEncoder"
      factory-method="getInstance" />
```

Com en el cas anterior, com s'utilitzen les assercions SAML per a les autenticacions, la paraula de pas proporcionada a les taules de la BBDD no s'utilitza.

<br/>
Per últim, si es vol utilitzar l'**autorització per Gicar** la configuració seria:

```
   <security:authentication-manager>
   <!-- SAML Authentication provider-->
      <security:authentication-provider ref="samlAuthenticationWithMemberProvider" />
   </security:authentication-manager>
```

Amb aquesta configuració s'utilitzaria la informació proporcionada al atribut *groupMembership* de l'asserció SAML de Gicar per a construir el llistat de rols de l'usuari. Per a més informació sobre els rols de Gicar podeu consultar la documentació del [Control d'accés als recursos amb Gicar](/gicar-saml2/auth-saml2-grups2/).

<br/>
Al fitxer `WebSecurityConfig` s'han d'establir els *Beans* dels serveis d'autorització i validació SAML i un *JWT token handler* orientat a SAML:

```
   @Bean
   @Named("samlAuthenticationService")
   public AuthenticationService samlAuthenticationService() {
      final SAMLAuthenticationService samlAuthenticationService = new SAMLAuthenticationService();
      samlAuthenticationService.setTokenResponseHeaderName(getTokenResponseHeaderName());
      return samlAuthenticationService;
   }

   @Bean
   public SAMLValidationService samlValidationService() {

      SAMLValidationServiceOpenSAML samlValidationService = new SAMLValidationServiceOpenSAML();
      samlValidationService.config(propertiesConfiguration);

      return samlValidationService;
   }

   @Bean
   @Named("samlJwtTokenHandler")
   public SAMLJwtTokenHandler samlJwtTokenHandler() {

      final SAMLJwtTokenHandler samlJwtTokenHandler = new SAMLJwtTokenHandler();

      samlJwtTokenHandler.setExpiration(getExpiration());
      samlJwtTokenHandler.setSecret(getSecret());

      SAMLJwtTokenClaimsEnforcer enforcer = new SAMLJwtTokenClaimsEnforcerMail();
      samlJwtTokenHandler.setEnforcer(enforcer);

      SAMLJwtTokenClaimsSelector selector = new SAMLJwtTokenClaimsSelectorMailNomCognoms();
      samlJwtTokenHandler.setSelector(selector);

      return samlJwtTokenHandler;
   }
```

## Exemple d'execució

Per a les proves d'execució, s'ha desplegat l'aplicació Bridge al port 8080 i l'aplicació Canigó al port 9090. S'intenta accedir al SPA de l'aplicació Bridge https://vagrant.vm/bridge/app sense
tenir sessió, la capa de seguretat detecta la necessitat d'autenticació i realitza una redirecció 302 al SS0 (URL de GICAR IdP). S'han d’introduir les credencials d'un usuari vàlid a GICAR i,
a continuació, es fa la redirecció a la SPA amb l'asserció SAML.

<br/>
La SPA proporcionada a l'aplicació Bridge té dues parts:

* Una part on es mostra informació general obtinguda a partir de l'asserció SAML

![Informació General](/related/canigo/documentacio/modul-seguretat-saml/assertionInformation.jpg)

* L'altre part proporciona un botó per a capturar l'asserció i generar el *JWT Token* que, al ser una aplicació Demo, es fa a través d'un botó. No obstant, en entorns productius aquesta part s'hauria de fer automàticament al carregar la pàgina. També proporciona un altre botó per a accedir a un *Endpoint* protegit de l'API de Canigó, en aquest cas per a obtenir un llistat dels equipaments.

![Test SAML](/related/canigo/documentacio/modul-seguretat-saml/testsaml.jpg)
