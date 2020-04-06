+++
date        = "2020-03-27"
title       = "Canigó. Com configurar i utilitzar autoritzacions via Gicar pel protocol SAML a una aplicació Canigó"
description = "Howto per a configurar una aplicació Canigó per a utilitzar l'autorització amb Gicar mitjançant el protocol SAML, a més de l’autenticació"
section     = "howtos"
categories  = ["canigo"]
key         = "GENER2020"
+++

## Introducció

A les últimes novetats de Gicar s’incorpora la possibilitat de disposar d'un sistema d'autorització d'usuaris, a més del sistema d'autenticació.
Aquest how-to va dirigit a tots aquells perfils tècnics que tinguin la necessitat de **configurar i utilitzar aquesta funcionalitat utilitzant el protocol SAML a una aplicació Canigó**.

## Asserció SAML

El Mòdul de Seguretat SAML té com a propòsit principal **gestionar l’autenticació dels usuaris en aplicacions Canigó a partir d’[assercions SAML2](https://en.wikipedia.org/wiki/SAML_2.0)**
del proveïdor d’identitats (Shibboleth) de GICAR. El mòdul de seguretat SAML utilitza la informació de l'asserció SAML per a construir la informació de l'usuari.

<br/>
A les últimes novetats de Gicar proporciona el nou atribut *groupMembership* dins de l'asserció SAML i el contingut té el següent format:

```
<saml2:Attribute FriendlyName="groupMembership" Name="urn:oid:2.16.840.1.113719.1.1.4.1.25" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:uri">
  <saml2:AttributeValue xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">77_11_VISCAT_Usuaris_ADI</saml2:AttributeValue>
  <saml2:AttributeValue xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">elk_kibana_user</saml2:AttributeValue>
  <saml2:AttributeValue xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">ACA_ADMIN_APLICACIONS-GICARDC</saml2:AttributeValue>
  <saml2:AttributeValue xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">INT_98_01 TECA_Administracio_ADD</saml2:AttributeValue>
  <saml2:AttributeValue xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">GESNUS_CESICAT_PROVA-GICARDC</saml2:AttributeValue>
  <saml2:AttributeValue xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">0192_MANTAINER_3162</saml2:AttributeValue>
  <saml2:AttributeValue xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">PROVA_MULTIPLE-GICARGESTIODC</saml2:AttributeValue>
  <saml2:AttributeValue xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">INT_77_11_VISCAT_Usuaris_ACA_ADD</saml2:AttributeValue>
  <saml2:AttributeValue xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">192_206_gaudi</saml2:AttributeValue>
  <saml2:AttributeValue xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">CTTI_XPACK-GICARDC</saml2:AttributeValue>
  <saml2:AttributeValue xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">prova</saml2:AttributeValue>¡
  <saml2:AttributeValue xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">Usuaris_ColectiuT2</saml2:AttributeValue>
  <saml2:AttributeValue xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">INT_90_12_ SiteTributari_TecnicAca</saml2:AttributeValue>
<saml2:AttributeValue xmlns:xs</saml2:Attribute>
```

A partir de la **versió 2.2.1 del Mòdul de Seguretat SAML de Canigó s'utilitza l'asserció SAML** i aquest nou atribut per a construir la informació de l'usuari i els seus rols
i poder-los utilitzar en l'autorització d'una aplicació Canigó.

## Mòdul de seguretat SAML

Per tal d’instal·lar el Mòdul de Seguretat SAML es pot optar per incloure'l automàticament mitjançant el *plugin* de Canigó de l’Eclipse, o bé afegir
manualment la següent dependència en el fitxer `pom.xml` de l’aplicació:

```
<canigo.security.saml.rest>[2.0.0,2.3.0)</canigo.security.saml.rest>
<dependency>
    <groupId>cat.gencat.ctti</groupId>
    <artifactId>canigo.security.saml.rest</artifactId>
    <version>${canigo.security.saml.rest}</version>
</dependency>
```

## Configuració per a utilitzar l'autorització (i autenticació) via Gicar mitjançant el protocol SAML

A la versió 1.7.7 del plugin de Canigó per l'Eclipse ja s'incorpora la nova opció d'autenticació utilitzant el protocol SAML i l'autorització via Gicar quan
s'afegeix el mòdul de seguretat en una aplicació Canigó. Podeu veure les opcions disponibles a:
[Actualització archetype 1.6.5 i plugin eclipse 1.7.7](/noticies/2020-03-24-Actualitzacio_Actualitzacio_archetype_1_6_5_plugin_eclipse_1_7_7).

En cas d'optar per fer-ho manualment, serà necessari crear els següents fitxers:

- `WebSecurityConfig.java`
- `security.properties`
- `app-custom-security.xml`

###  WebSecurityConfig

Aquest fitxer ha d'estar ubicat al *package* `config` del projecte, al mateix nivell que `AppConfig.java`, i ha de tenir el següent contingut:

```
import javax.inject.Named;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.preauth.AbstractPreAuthenticatedProcessingFilter;

import cat.gencat.ctti.canigo.arch.core.config.PropertiesConfiguration;
import cat.gencat.ctti.canigo.arch.security.rest.authentication.jwt.JwtAuthenticationFilter;
import cat.gencat.ctti.canigo.arch.security.rest.authentication.jwt.JwtTokenHandler;
import cat.gencat.ctti.canigo.arch.security.rest.authentication.service.AuthenticationService;
import cat.gencat.ctti.canigo.arch.security.rest.authentication.service.impl.JwtGicarAuthenticationService;
import cat.gencat.ctti.canigo.arch.security.saml.authentication.claims.enforce.SAMLJwtTokenClaimsEnforcer;
import cat.gencat.ctti.canigo.arch.security.saml.authentication.claims.enforce.impl.SAMLJwtTokenClaimsEnforcerMail;
import cat.gencat.ctti.canigo.arch.security.saml.authentication.claims.select.SAMLJwtTokenClaimsSelector;
import cat.gencat.ctti.canigo.arch.security.saml.authentication.claims.select.impl.SAMLJwtTokenClaimsSelectorMailNomCognoms;
import cat.gencat.ctti.canigo.arch.security.saml.authentication.jwt.SAMLJwtTokenHandler;
import cat.gencat.ctti.canigo.arch.security.saml.authentication.service.SAMLValidationService;
import cat.gencat.ctti.canigo.arch.security.saml.authentication.service.impl.SAMLAuthenticationService;
import cat.gencat.ctti.canigo.arch.security.saml.authentication.service.impl.SAMLValidationServiceOpenSAML;

@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

   @Autowired
   @Lazy
   private AuthenticationEntryPoint restAuthenticationEntryPoint;

   @Autowired
   private PropertiesConfiguration propertiesConfiguration;

   @Autowired
   @Lazy
   private AuthenticationManager authenticationManager;

   @Autowired
   @Lazy
   private AuthenticationSuccessHandler restAuthenticationSuccessHandler;

   @Autowired
   @Lazy
   private AuthenticationFailureHandler restAuthenticationFailureHandler;

   @Autowired
   @Lazy
   private AccessDeniedHandler restAccessDeniedHandler;

   @Override
   protected void configure(final HttpSecurity http) throws Exception {

      http.authorizeRequests()
      .antMatchers("/api/saml").permitAll()
      .antMatchers("/api/auth").permitAll()
      .antMatchers("/images/*/**", "/css/*/**", "/js/*/**", "/fonts/*/**").permitAll()
      .antMatchers("/api/info/**", "/api/logs/**").hasRole("ADMIN")
//    .antMatchers("/api/equipaments/**").hasRole("USER");
      .antMatchers("/api/equipaments/**").hasAnyAuthority("ROLE_USER","192_189_sgde");
      http.exceptionHandling().authenticationEntryPoint(restAuthenticationEntryPoint);
      http.exceptionHandling().accessDeniedHandler(restAccessDeniedHandler);
      http.csrf().disable();
      http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
      http.addFilterBefore(jwtAuthenticationFilter(), AbstractPreAuthenticatedProcessingFilter.class);
   }

   @Bean
   @Named("jwtAuthenticationService")
   public AuthenticationService jwtAuthenticationService() {
      final JwtGicarAuthenticationService jwtGicarAuthenticationService = new JwtGicarAuthenticationService();
      jwtGicarAuthenticationService.setSiteminderAuthentication(isSiteminderAuthentication());
      jwtGicarAuthenticationService.setTokenResponseHeaderName(getTokenResponseHeaderName());
      jwtGicarAuthenticationService.setHeaderAuthName(getHeaderAuthName());
      return jwtGicarAuthenticationService;
   }

   @Bean
   @Named("jwtAuthenticationFilter")
   public JwtAuthenticationFilter jwtAuthenticationFilter() {
      final JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter();
      jwtAuthenticationFilter.setHeaderAuthName(getHeaderAuthName());
      jwtAuthenticationFilter.setStartToken(getStartToken());
      jwtAuthenticationFilter.setTokenResponseHeaderName(getTokenResponseHeaderName());
      return jwtAuthenticationFilter;
   }

   @Bean
   @Named("jwtTokenHandler")
   public JwtTokenHandler jwtTokenHandler() {
      final JwtTokenHandler JwtTokenHandler = new JwtTokenHandler();
      JwtTokenHandler.setExpiration(getExpiration());
      JwtTokenHandler.setSecret(getSecret());
      return JwtTokenHandler;
   }

   private String getSecret() {
      final String secret = propertiesConfiguration.getProperty("jwt.secret");
      return secret != null ? secret : "canigo";
   }

   private Long getExpiration() {
      final Long expiration = new Long(propertiesConfiguration.getProperty("jwt.expiration"));
      return expiration != null ? expiration : 3600L;
   }

   private String getStartToken() {
      final String startToken = propertiesConfiguration.getProperty("jwt.header.startToken");
      return startToken != null ? startToken : "Bearer";
   }

   private String getHeaderAuthName() {
      final String headerAythName = propertiesConfiguration.getProperty("jwt.header");
      return headerAythName != null ? headerAythName : "Authentication";
   }

   private String getTokenResponseHeaderName() {
      final String tokenResponseHeaderName = propertiesConfiguration.getProperty("jwt.tokenResponseHeaderName");
      return tokenResponseHeaderName != null ? tokenResponseHeaderName : "jwtToken";
   }

   private boolean isSiteminderAuthentication() {
      final Boolean siteminder = new Boolean(propertiesConfiguration.getProperty("jwt.siteminderAuthentication"));
      return siteminder != null ? siteminder : false;
   }

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

}
```

<br/>
On es defineix, com a punts més rellevants:

- Que totes les peticions `/api/saml` són acceptades. És aquest el servei que s'utilitzarà per a informar de l'asserció SAML.

- Que com a *AuthenticationService* s’utilitzarà *SAMLAuthenticationService*.

- Que com a *SAMLValidationService* s’utilitzarà *SAMLValidationServiceOpenSAML*.

- Que com a *SAMLJwtTokenHandler* s'utilitzarà *SAMLJwtTokenHandler*.

###  security.properties

Aquest fitxer ha d'estar ubicat a `/src/main/resources/config/props` i ha d'incloure, per defecte, la següent definició de propietats:

```
###########################################################
#
# Arxiu de Configuració del Mòdul de Seguretat
# ---------------------------------------------------------
#
#  Propietats de mòdul multi-entorn:
#
#     Format de la propietat:  ENTORN.MÒDUL.PROPIETAT
#        El concepte ENTORN és el valor de la propietat d'arrancada
#        de la màquina virtual Java informada al servidor d'aplicacions.
#
#
#     Exemples de configuració:
#        *.security.database.jndiName       ->  Propietat vàlida per a tots els entorns, sempre que no s'informi una propietat
#                                               més especifica per al entorn en el qual s'executa l'aplicació.
#        dev.security.database.jndiName     ->  Propietat vàlida només a desenvolupament
#        test.security.database.jndiName    ->  Propietat vàlida només a test
#
#
#
#
#
#  Propietat                                  Requerit    Descripció
#  ---------------------------------------------------------------------------------
#  security.database.jndiName                 Si          Nom JNDI d'accés a la base de dades.
#  security.database.driverClassName          Si          Driver per connexió amb JDBC
#  security.database.url                      Si          URL de connexió a la base de dades.
#  security.database.username                 Si          Usuari de connexió a la base de dades
#  security.database.password                 Si          Password de connexió a la base de dades
#  security.gicar.httpGicarHeaderUsernameKey  No          Clau capçelera GICAR
#  security.sace.userNameFormat               No          Format del camp userName. Per defecte: NIF. Valors possibles: NIF, INTERNAL_CODE
#  security.sace.authoritiesbyUserNameQuery   No          Aquesta propietat permet especificar la query SQL per a recollir els rols dels usuaris
#  security.sace.keyStore                     Si          Localització de la keystore
#  security.sace.keyStorePassPhrase           Si          Password de la keystore
#  security.sace.url                          Si          URL del servei de SACE
#
#
###########################################################
# GICAR configuration
#*.security.gicar.httpGicarHeaderUsernameKey=NIF

# JWT Configuration
*.jwt.header = Authentication
*.jwt.header.startToken = Bearer
*.jwt.tokenResponseHeaderName = jwtToken
*.jwt.secret = canigo
*.jwt.expiration = 3600
*.jwt.siteminderAuthentication = true

*.saml.extraValidityMinutes = 60
*.saml.idpEntityId  = https://preproduccio.idp1-gicar.gencat.cat/idp/shibboleth
*.saml.idpMetadaResource = /metadata/gicar/metaDadesGicarPre.xml
*.saml.spBridgeEntityId  = https://vagrant.vm/bridge00
```

###  app-custom-security.xml

Aquest fitxer ha d'estar ubicat a `/src/main/resources/spring/` i ha d'incloure la següent definició:

```
<?xml version="1.0" encoding="UTF-8"?>
<beans  xmlns="http://www.springframework.org/schema/beans"
      xmlns:security="http://www.springframework.org/schema/security"
      xmlns:context="http://www.springframework.org/schema/context"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xmlns:jdbc="http://www.springframework.org/schema/jdbc"
      xsi:schemaLocation=
      "http://www.springframework.org/schema/beans      http://www.springframework.org/schema/beans/spring-beans-4.3.xsd
       http://www.springframework.org/schema/context    http://www.springframework.org/schema/context/spring-context-4.3.xsd
       http://www.springframework.org/schema/security   http://www.springframework.org/schema/security/spring-security-4.2.xsd
       http://www.springframework.org/schema/jdbc       http://www.springframework.org/schema/jdbc/spring-jdbc-4.3.xsd">

   <security:authentication-manager>
   <!-- SAML Authentication provider-->
      <security:authentication-provider ref="samlAuthenticationWithMemberProvider" />
   </security:authentication-manager>
</beans>
```

## Informació addicional

Podeu trobar més informació als següents enllaços:

- [Mòdul de Seguretat SAML de Canigó](/canigo-documentacio-versions-3x-core/modul-saml/)

- [Plugin Canigó per a Eclipse](/canigo-download-related/plugin-canigo/)

- [Control d'accés als recursos via GICAR](/gicar-saml2/auth-saml2-grups2/)