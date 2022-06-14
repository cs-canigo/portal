+++
date        = "2021-12-27"
title       = "Mòdul Seguretat"
description = "Autenticació i autorització d'usuaris"
sections    = "Canigó. Documentació Versió 3.6"
weight      = 9
+++

## Propòsit

El Mòdul de Seguretat té com a propòsit general **gestionar l'autenticació i l'autorització dels usuaris en aplicacions Canigó**.
L'objectiu de l'autenticació és comprovar que l'usuari és qui diu ser, mentre que l'autorització s'encarrega de comprovar que
realment té accés als recursos sol·licitats. Canigó recomana l'ús de _Spring Security_ com a Framework base i les extensions
que Canigó proporciona.

## Instal·lació

Per tal d'instal·lar el Mòdul de Seguretat es pot optar per incloure’l automàticament a través de l'eina de suport al desenvolupament o bé afegir
manualment la següent dependència en el fitxer `pom.xml` de l’aplicació:

```
<dependency>
   <groupId>cat.gencat.ctti</groupId>
   <artifactId>canigo.security</artifactId>
   <version>${canigo.security.version}</version>
</dependency>
```

A la [Matriu de Compatibilitats] (/canigo-fwk-docs/documentacio-per-versions/3.6LTS/3.6.3/moduls/compatibilitat-per-modul/) es pot comprovar la versió del mòdul compatible amb la versió de Canigó utilitzada.

## Configuració

La configuració es realitza automàticament a l'aplicació a partir de l'eina de suport al desenvolupament

### Configuració de JWT (JSON Web Token)

La nova versió de Canigó permet treballar amb [JWT](https://jwt.io/), per aquest motiu s'utilitza la
llibreria [Java JWT](https://java.jsonwebtoken.io/) que permet autenticar l'usuari amb qualsevol dels mètodes descrits a l’apartat
"Configuració d'autenticació". Un cop autenticat l'usuari, el servidor genera un _token_ que serà enviat pel client dins la capçalera HTTP a cada petició.

Per a poder configurar JWT és necessari afegir al fitxer `security.properties` la següent configuració:

Propietat                     | Requerit | Descripció                                 | Valor per Defecte
----------------------------- | -------- | -------------------------------------------|------------------
*.jwt.header                  | No       | Nom del header del _token_ JWT           | Authentication
*.jwt.header.startToken       | No       | Inici del _token_ JWT                    | Bearer
*.jwt.tokenResponseHeaderName | No       | Nom del header del _token_ JWT                | jwtToken
*.jwt.secret                  | No       | Password per generar el _token_ JWT          | canigo
*.jwt.expiration              | No       | Temps de vida del _token_ JWT                 | 3600
*.jwt.siteminderAuthentication| No       | Gicar authentication                      | false

Es recomana utilitzar un secret de longitud superior a 100 caracters per evitar atacs de força bruta per substreure'l

Per a verificar l'autenticació per _token_ s'ha d'invocar al servei `http://<app>/api/auth`, amb la capçalera GICAR en cas
d'autenticació via GICAR, o en el cos de la petició en format JSON en la resta de casos:

```
{  username = user,
   password  = secret }
```

Aquesta crida ens retornarà un _token_ vàlid que s'haurà d'enviar dins la capçalera HTTP de les corresponents peticions
com es mostra a continuació (configuració per defecte):

```
Authentication Bearer eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE0NzkyMzEzODMsInN1YiI6ImFkbWluIiwiYXV0aG9yaXRpZXMiOiJST0xFX0FETUlOLFJPTEVfVVNFUiJ9.jeApLoXyn4nrdp2iPRkjhoTWmzFNUYOkphnck0gmp1pLygOj1hgN1O1Ps86_jY6ZXaEhXl2Fk-o36SOMQAQGHA
```

En aquest mateix article es mostra un exemple de configuració a Canigó de JWT + GICAR.

<br/>
##### Compressió token JWT

A partir de la versió 2.4.0 del mòdul, es proporciona la funcionalitat de compressió del _token JWT_. Per defecte,
si no especifiquem que volem utilitzar compressió, el mòdul genera el _token JWT_ sense aplicar la compressió. Per a **activar la
funcionalitat de compressió** s'ha afegit el següent mètode a *cat.gencat.ctti.canigo.arch.security.rest.authentication.jwt.JwtTokenHandler*:
```
public void setTokenWithCompress(boolean tokenWithCompress)
```

<br/>
En cas d’activar la compressió, per defecte s'utilitzarà la compressió _DEFLATE_ i, si volem utilitzar un altre algoritme de
compressió, disposem del següent mètode:
```
public void setTokenCompressionCodec(CompressionCodec tokenCompressionCodec)
```

<br/>
Tenim disponibles els següents algoritmes de compressió a *io.jsonwebtoken.CompressionCodecs*:

- [DEFLATE](https://en.wikipedia.org/wiki/DEFLATE): algoritme per defecte que acompleix l'estàndard [JWA](https://tools.ietf.org/html/rfc7518).
- [GZIP](https://en.wikipedia.org/wiki/Gzip): algoritme que no acompleix l'estàndard JWA. Si voleu utilitzar aquest
sistema de compressió comproveu que tots els sistemes ho suportin.

Per tant, si volem comprimir el _token JWT_ amb _DEFLATE_ serà necessari:

1. Definir al fitxer `security.properties` la següent propietat:
```
*.jwt.tokenWithCompress = true
```

2. Carregar la nova propietat a `WebSecurityConfig.java`:
```
@Value("${jwt.tokenWithCompress}")
private boolean tokenWithCompress;
```

3. A la definició del _JwtTokenHandler_ en el fitxer `WebSecurityConfig.java`, indicar que volem utilitzar la compressió:
```
jwtTokenHandler.setTokenWithCompress(tokenWithCompress);
```

### Publicació controladors de seguretat

Per defecte el mòdul de seguretat publica les api _/auth_ i _/login_. En cas de no voler publicar-les a la nostra aplicació,
s'haurà de condicionar la càrrega de _Spring Boot_ com es mostra a continuació.

1. Crear el fitxer `/src/main/reources/config/props/boot.properties` amb la propietat _publishAuthController_ a _false_:
```
   publishAuthController=false
```

2. Al fitxer de configuració de l'aplicació `AppConfig.java`, afegir l'anotació _@PropertySource_ cap al fitxer `boot.properties` creat:
```
   @Configuration
   @PropertySource("classpath:/config/props/boot.properties")
   @ImportResource({ "classpath:cat/gencat/ctti/canigo/arch/core/config/canigo-core.xml" })
   @EnableTransactionManagement
   public class AppConfig {
   }
```

### Configuració d'autenticació, autorització i font de dades de l'esquema de seguretat

En la configuració de l'autenticació haurem de considerar:

* Seleccionar el tipus de font contra la que es realitza l'autenticació (per arxiu de propietats, base de dades, Gicar, ...).
* Configurar el formulari d'autenticació web i la seqüència d'accions per a realitzar l'autenticació.

Dins d'aquest mòdul trobem els següents proveïdors de seguretat:

* Seguretat In-Memory
* Seguretat Base de dades
* Seguretat GICAR

Els diferents proveïdors comparteixen els següents arxius de configuració:

* `security.properties`: propietats del servei de seguretat
* `app-custom-security.xml`: arxiu XML amb la configuració de seguretat
* `WebSecurityConfig.java`: classe Java amb la configuració de seguretat Web
* `security.users.properties`: llistat en format pla dels usuaris/passwords/rols de l'aplicació per al proveïdor "InMemory"

La disposició dels arxius és la següent:

* <PROJECT_ROOT>/src/main/resources/config/props/security.users.properties
* <PROJECT_ROOT>/src/main/resources/spring/app-custom-security.xml
* <PROJECT_ROOT>/src/main/java/cat/gencat/nomapp/config/WebSecurityConfig.java
* <PROJECT_ROOT>/src/main/resources/config/props/security.properties

<br/>
#### Configuració per base de dades

Per a configurar la font d'autorització mitjançant base de dades serà necessari configurar:

* L'arxiu de propietats `security.properties`
* El **proveïdor de seguretat** dins de la configuració de seguretat de _Spring_

Els dos arxius es generen i configuren de manera automàtica mitjançant l'eina de desenvolupament. Les propietats de
l'arxiu `security.properties` són les següents:

Propietat                    | Requerit | Descripció
---------------------------- | -------- | ----------------------------------------------------------
*.security.database.jndiName | Si       | Nom JNDI d'accés a la BD. Obligatori per a connexions JNDI
*.security.database.url      | Si       | URL de connexió a la base de dades
*.security.database.username | Si       | Usuari de connexió a la base de dades
*.security.database.password | Si       | Password de connexió a la base de dades

La configuració del _provider_ en `app-custom-security.xml` per a aquest proveïdor es realitza com es descriu a continuació:

* Afegir el _provider_ al _authentication manager_.
* Afegir el tipus de codificador de _password_ per tal de comparar la clau de base de dades i la que ens ha proporcionat
l'usuari de l'aplicació. Aquest codificador suporta: _plaintext_, _sha_, _sha-256_, _md5_, _md4_ i _ssha_. Si a la base de dades tenim
emmagatzemades les claus d'usuari en _md5_ i marquem _password-encode_ com a _md5_, de manera automàtica la clau proporcionada
per l'usuari via formulari de login (_j_password_) es codificarà en md5 per a, posteriorment, ser comparada amb la emmagatzemada
a la base de dades.

```
<security:authentication-manager>
      <security:authentication-provider>
         <security:password-encoder ref="passwordEncoder" />
         <security:jdbc-user-service data-source-ref="dataSource"/>
      </security:authentication-provider>
   </security:authentication-manager>

   <bean id="passwordEncoder"
      class="org.springframework.security.crypto.password.NoOpPasswordEncoder"
      factory-method="getInstance" />
```

A continuació es mostra la classe `WebSecurityConfig` per a una configuració basada en l’autenticació i l’autorització per base de dades sense utilitzar JWT:

```
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;
import org.springframework.http.HttpStatus;
import javax.sql.DataSource;

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
import org.springframework.web.bind.annotation.RequestMethod;

import cat.gencat.ctti.canigo.arch.core.config.PropertiesConfiguration;
import cat.gencat.ctti.canigo.arch.security.rest.authentication.gicar.ProxyUsernamePasswordAuthenticationFilter;
import cat.gencat.ctti.canigo.arch.security.rest.authentication.jwt.JwtAuthenticationFilter;
import cat.gencat.ctti.canigo.arch.security.rest.authentication.jwt.JwtTokenHandler;
import cat.gencat.ctti.canigo.arch.security.rest.authentication.service.AuthenticationService;
import cat.gencat.ctti.canigo.arch.security.rest.authentication.service.impl.JwtGicarAuthenticationService;

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

   @Autowired
   @Lazy
   private DataSource dataSource;

   @Override
   protected void configure(final HttpSecurity http) throws Exception {
      http.authorizeRequests()
      .antMatchers("/images/*/**", "/css/*/**", "/js/*/**", "/fonts/*/**").permitAll()
      .antMatchers("/api/info/**", "/api/logs/**").hasRole("ADMIN")
      .antMatchers("/api/equipaments/**").hasRole("USER");

      http.exceptionHandling().authenticationEntryPoint(restAuthenticationEntryPoint);
      http.exceptionHandling().accessDeniedHandler(restAccessDeniedHandler);
      http.csrf().disable();

      http.formLogin().loginProcessingUrl("/api/login").successHandler(restAuthenticationSuccessHandler).failureHandler(restAuthenticationFailureHandler);
      http.logout().logoutUrl("/api/logout").logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler(HttpStatus.ACCEPTED))
                   .invalidateHttpSession(true);
      http.addFilterBefore(proxyUsernamePasswordAuthenticationFilter(), AbstractPreAuthenticatedProcessingFilter.class);
   }

   @Bean
   @Autowired
   public ProxyUsernamePasswordAuthenticationFilter proxyUsernamePasswordAuthenticationFilter() {
      final ProxyUsernamePasswordAuthenticationFilter proxyUsernamePasswordAuthenticationFilter =
            new ProxyUsernamePasswordAuthenticationFilter("/api/login", RequestMethod.POST.toString());
      proxyUsernamePasswordAuthenticationFilter.setSiteminderAuthentication(isSiteminderAuthentication());
      proxyUsernamePasswordAuthenticationFilter.setAuthenticationManager(authenticationManager);
      proxyUsernamePasswordAuthenticationFilter.setAuthenticationSuccessHandler(restAuthenticationSuccessHandler);
      proxyUsernamePasswordAuthenticationFilter.setAuthenticationFailureHandler(restAuthenticationFailureHandler);
      return proxyUsernamePasswordAuthenticationFilter;
   }

   private boolean isSiteminderAuthentication() {
      return false;
   }
}
```

A continuació es mostra la classe `WebSecurityConfig` per a una configuració basada en l’autenticació i l’autorització per base de dades amb JWT:

```
import javax.inject.Named;
import javax.sql.DataSource;

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

   @Autowired
   @Lazy
   private DataSource dataSource;

   @Override
   protected void configure(final HttpSecurity http) throws Exception {

      http.authorizeRequests()
      .antMatchers("/api/auth").permitAll()
      .antMatchers("/images/*/**", "/css/*/**", "/js/*/**", "/fonts/*/**").permitAll()
      .antMatchers("/api/info/**", "/api/logs/**").hasRole("ADMIN")
      .antMatchers("/api/equipaments/**").hasRole("USER");

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

}
```

<div class="message information">
L'eina de suport al desenvolupament automatitza la instal·lació del mòdul de persistència si aquest no ha estat instal·lat prèviament pel desenvolupador.
</div>

<br/>
#### Configuració per LDAP

Per a configurar l'accés per LDAP (funcionalitat ja desfasada) serà necessari configurar:

* L'arxiu de propietats `security.properties`
* El **proveïdor de seguretat** dins de la configuració de seguretat de Spring

Els dos arxius es generen i configuren de manera automàtica mitjançant l'eina de desenvolupament. Les propietats de
l'arxiu `security.properties` són les següents:

Propietat                           | Requerit | Descripció
----------------------------------- | -------- | -----------------------------------------------------------------------
*.security.ldap.url                 | Si       | Direcció del servidor ldap separat amb dos punts ":" del port
*.security.ldap.manager.dn          | Sí       | Identificador de l'usuari administrador del LDAP
*.security.ldap.manager.password    | Si       | Password de l'usuari administrador del LDAP
*.security.ldap.user.search.filter  | No       | Filtre de cerca dels usuaris dins de l'estructura del LDAP. Per defecte: (uid={0})
*.security.ldap.user.search.base    | Si       | String base de la ubicació dels usuaris dins de l'estructura del LDAP
*.security.ldap.group.search.base   | Si       | String base de la ubicació dels grups dins de l'estructura del LDAP
*.security.ldap.group.search.filter | No       | Filtre de cerca dels grups dins de l'estructura del LDAP. Per defecte: (cn={0})

Per a realitzar les proves en l’entorn de desenvolupament podem instal·lar un servidor LDAP senzill (veure l'apartat
"Eines de Suport" per a més informació). La configuració del _provider_ en `app-custom-security.xml` es realitza
com es descriu a continuació:

* Afegir el _provider_ a l’_Authentication Manager_
* Afegir la connexió al LDAP server

```
<security:authentication-manager>
    <security:ldap-authentication-provider
        server-ref="ldapLocal"
        user-search-filter="${security.ldap.user.search.filter:(uid={0})}"
        user-search-base="${security.ldap.user.search.base}"
        group-search-base="${security.ldap.group.search.base}"
        group-search-filter="${security.ldap.group.search.filter:(cn={0})}">

        <security:password-compare/>
    </security:ldap-authentication-provider>
</security:authentication-manager>

<security:ldap-server url="${security.ldap.url}" id="ldapLocal" manager-dn="${security.ldap.manager.dn}"
manager-password="${security.ldap.manager.password}"/>
```

<br/>
#### Configuració per arxiu de propietats

Aquest proveïdor de seguretat es basa en un arxiu de propietats per a carregar en memòria els usuaris/passwords/rols de
l'aplicació. Per a configurar l'accés mitjançant un arxiu de propietats serà necessari:

* Configurar l'arxiu de propietats `security.users.properties`
* Configurar el proveïdor de seguretat dins la configuració de seguretat de Spring `app-custom-security.xml`

L'arxiu `security.users.properties` conté aquesta configuració i té el següent format:

```
username=password,grantedAuthority[,grantedAuthority][,enabled|disabled]
```

A continuació es mostra un exemple de configuració:

```
user=password,ROLE_USER,enabled
admin=password,ROLE_USER,ROLE_ADMIN,enabled
```

Per a configurar el _provider_ a `app-custom-security.xml` s'ha de fer el següent:

* Afegir el _provider_ al _authentication manager_
* Afegir el tipus de codificador de _password_ per tal de comparar la clau de l'arxiu de propietats i la que ens
ha proporcionat l'usuari de l'aplicació. Aquest codificador suporta: _plaintext_, _sha_, _sha-256_, _md5_, _md4_ i _ssha_.

```
<security:authentication-manager>
      <security:authentication-provider>
         <security:password-encoder ref="passwordEncoder" />
         <security:user-service properties="classpath:config/props/security.users.properties"/>
      </security:authentication-provider>

   </security:authentication-manager>

   <bean id="passwordEncoder"
      class="org.springframework.security.crypto.password.NoOpPasswordEncoder"
      factory-method="getInstance" />
```

A continuació es mostra la classe `WebSecurityConfig` per a una configuració basada en l'autenticació i l'autorització
per arxiu de propietats sense utilitzar JWT:

```
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;
import org.springframework.http.HttpStatus;
import javax.sql.DataSource;

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
import org.springframework.web.bind.annotation.RequestMethod;

import cat.gencat.ctti.canigo.arch.core.config.PropertiesConfiguration;
import cat.gencat.ctti.canigo.arch.security.rest.authentication.gicar.ProxyUsernamePasswordAuthenticationFilter;
import cat.gencat.ctti.canigo.arch.security.rest.authentication.jwt.JwtAuthenticationFilter;
import cat.gencat.ctti.canigo.arch.security.rest.authentication.jwt.JwtTokenHandler;
import cat.gencat.ctti.canigo.arch.security.rest.authentication.service.AuthenticationService;
import cat.gencat.ctti.canigo.arch.security.rest.authentication.service.impl.JwtGicarAuthenticationService;

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

   @Autowired
   @Lazy
   private DataSource dataSource;

   @Override
   protected void configure(final HttpSecurity http) throws Exception {

      http.authorizeRequests()
      .antMatchers("/images/*/**", "/css/*/**", "/js/*/**", "/fonts/*/**").permitAll()
      .antMatchers("/api/info/**", "/api/logs/**").hasRole("ADMIN")
      .antMatchers("/api/equipaments/**").hasRole("USER");

      http.exceptionHandling().authenticationEntryPoint(restAuthenticationEntryPoint);
      http.exceptionHandling().accessDeniedHandler(restAccessDeniedHandler);
      http.csrf().disable();

      http.formLogin().loginProcessingUrl("/api/login").successHandler(restAuthenticationSuccessHandler).failureHandler(restAuthenticationFailureHandler);
      http.logout().logoutUrl("/api/logout").logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler(HttpStatus.ACCEPTED))
                   .invalidateHttpSession(true);
      http.addFilterBefore(proxyUsernamePasswordAuthenticationFilter(), AbstractPreAuthenticatedProcessingFilter.class);
   }

   @Bean
   @Autowired
   public ProxyUsernamePasswordAuthenticationFilter proxyUsernamePasswordAuthenticationFilter() {
      final ProxyUsernamePasswordAuthenticationFilter proxyUsernamePasswordAuthenticationFilter =
            new ProxyUsernamePasswordAuthenticationFilter("/api/login", RequestMethod.POST.toString());
      proxyUsernamePasswordAuthenticationFilter.setSiteminderAuthentication(isSiteminderAuthentication());
      proxyUsernamePasswordAuthenticationFilter.setAuthenticationManager(authenticationManager);
      proxyUsernamePasswordAuthenticationFilter.setAuthenticationSuccessHandler(restAuthenticationSuccessHandler);
      proxyUsernamePasswordAuthenticationFilter.setAuthenticationFailureHandler(restAuthenticationFailureHandler);
      return proxyUsernamePasswordAuthenticationFilter;
   }

   private boolean isSiteminderAuthentication() {
      return false;
   }

}
```

A continuació es mostra la classe `WebSecurityConfig` per a una configuració basada en l'autenticació i l'autorització
per arxiu de propietats amb JWT:

```
import javax.inject.Named;
import javax.sql.DataSource;

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

   @Autowired
   @Lazy
   private DataSource dataSource;

   @Override
   protected void configure(final HttpSecurity http) throws Exception {

      http.authorizeRequests()
      .antMatchers("/api/auth").permitAll()
      .antMatchers("/images/*/**", "/css/*/**", "/js/*/**", "/fonts/*/**").permitAll()
      .antMatchers("/api/info/**", "/api/logs/**").hasRole("ADMIN")
      .antMatchers("/api/equipaments/**").hasRole("USER");

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

}
```

<br/>
#### Configuració de la font d'autenticació per GICAR

Per a configurar l'accés a GICAR serà necessari configurar:

* L'arxiu de propietats `security.properties`
* El **proveïdor de seguretat** dins de la configuració de seguretat de _Spring_

Els dos arxius es generen i configuren de manera automàtica mitjançant l'eina de desenvolupament. L'arxiu **security.properties** té el següent format:

Propietat                                   | Requerit | Descripció
------------------------------------------- | -------- | -----------------------------------
*.security.gicar.httpGicarHeaderUsernameKey | No       | Aquesta propietat indica quin és el camp de la capçalera HTTP_GICAR que conté el nom de l'usuari autenticat a GICAR. Per defecte: NIF

Des de la versió 1.2.7 el servei de seguretat de Canigó suporta de manera automàtica la capçalera `HTTP_GICAR_PSIS` per a l’autenticació amb certificats per usuaris que no estan en el DC (Autenticació Anònima), utilitzant-se com a font de dades alternativa per a tasques d'autenticació. A la pàgina del [Servei d'autenticació anònima amb GICAR](/gicar-integracio/auth-anonima/) es pot trobar informació detallada d'aquesta capçalera.

A continuació es mostra la classe `WebSecurityConfig` per a una configuració basada en GICAR com a sistema d'autenticació sense utilitzar JWT:

```
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.Primary;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;
import org.springframework.security.web.authentication.preauth.AbstractPreAuthenticatedProcessingFilter;
import org.springframework.web.bind.annotation.RequestMethod;

import cat.gencat.ctti.canigo.arch.core.config.PropertiesConfiguration;
import cat.gencat.ctti.canigo.arch.security.authorities.dao.AuthoritiesDAO;
import cat.gencat.ctti.canigo.arch.security.authorities.dao.impl.AuthoritiesDAOImpl;
import cat.gencat.ctti.canigo.arch.security.provider.gicar.GICARUserDetailsServiceImpl;
import cat.gencat.ctti.canigo.arch.security.provider.siteminder.SiteminderAuthenticationProvider;
import cat.gencat.ctti.canigo.arch.security.rest.authentication.gicar.ProxyUsernamePasswordAuthenticationFilter;

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

   @Autowired
   @Lazy
   private DataSource dataSource;

   @Override
   protected void configure(final HttpSecurity http) throws Exception {

      http.authorizeRequests()
      .antMatchers("/images/*/**", "/css/*/**", "/js/*/**", "/fonts/*/**").permitAll()
      .antMatchers("/api/info/**", "/api/logs/**").hasRole("ADMIN")
      .antMatchers("/api/equipaments/**").hasRole("USER");

      http.exceptionHandling().authenticationEntryPoint(restAuthenticationEntryPoint);
      http.exceptionHandling().accessDeniedHandler(restAccessDeniedHandler);
      http.csrf().disable();

      http.formLogin().loginProcessingUrl("/api/login").successHandler(restAuthenticationSuccessHandler).failureHandler(restAuthenticationFailureHandler);
      http.logout().logoutUrl("/api/logout").logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler(HttpStatus.ACCEPTED))
                   .invalidateHttpSession(true);
      http.addFilterBefore(proxyUsernamePasswordAuthenticationFilter(), AbstractPreAuthenticatedProcessingFilter.class);
   }

   @Bean
   @Autowired
   public ProxyUsernamePasswordAuthenticationFilter proxyUsernamePasswordAuthenticationFilter() {
      final ProxyUsernamePasswordAuthenticationFilter proxyUsernamePasswordAuthenticationFilter =
            new ProxyUsernamePasswordAuthenticationFilter("/api/login", RequestMethod.POST.toString());
      proxyUsernamePasswordAuthenticationFilter.setSiteminderAuthentication(isSiteminderAuthentication());
      proxyUsernamePasswordAuthenticationFilter.setAuthenticationManager(authenticationManager);
      proxyUsernamePasswordAuthenticationFilter.setAuthenticationSuccessHandler(restAuthenticationSuccessHandler);
      proxyUsernamePasswordAuthenticationFilter.setAuthenticationFailureHandler(restAuthenticationFailureHandler);
      return proxyUsernamePasswordAuthenticationFilter;
   }

   @Bean
   public AuthenticationProvider authenticationProvider() {
      final SiteminderAuthenticationProvider siteminderAuthenticationProvider = new SiteminderAuthenticationProvider();
      siteminderAuthenticationProvider.setUserDetailsService(gicarUserDetailsService());
      return siteminderAuthenticationProvider;
   }

   @Bean
   @Primary
   public UserDetailsService gicarUserDetailsService() {
      final GICARUserDetailsServiceImpl gicarUserDetailsServiceImpl = new GICARUserDetailsServiceImpl();
      gicarUserDetailsServiceImpl.setHttpGicarHeaderUsernameKey(getHttpGicarHeaderUsernameKey());
      gicarUserDetailsServiceImpl.setAuthoritiesDAO(authoritiesDAO());
      return gicarUserDetailsServiceImpl;
   }

   @Bean
   public AuthoritiesDAO authoritiesDAO() {
      final AuthoritiesDAOImpl authoritiesDAOImpl = new AuthoritiesDAOImpl();
      authoritiesDAOImpl.setDataSource(dataSource);
      return authoritiesDAOImpl;
   }

   @Override
    @Autowired
    protected void configure(final AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authenticationProvider());
    }

    @Bean
    @Autowired
    public AuthenticationManager authenticationManager(final AuthenticationManagerBuilder auth) {
        return auth.getOrBuild();
    }

   private String getHttpGicarHeaderUsernameKey() {
      final String gicarHeader = propertiesConfiguration.getProperty("security.gicar.httpGicarHeaderUsernameKey");
      return gicarHeader != null ? gicarHeader : "NIF";
   }

   private boolean isSiteminderAuthentication() {
      return true;
   }

}

```

A continuació es mostra la classe `WebSecurityConfig` per a una configuració basada en GICAR com a sistema d'autenticació amb JWT:

```
import javax.inject.Named;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
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
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.userdetails.UserDetailsService;
import cat.gencat.ctti.canigo.arch.security.authorities.dao.AuthoritiesDAO;
import cat.gencat.ctti.canigo.arch.security.authorities.dao.impl.AuthoritiesDAOImpl;
import cat.gencat.ctti.canigo.arch.security.provider.gicar.GICARUserDetailsServiceImpl;
import cat.gencat.ctti.canigo.arch.security.provider.siteminder.SiteminderAuthenticationProvider;

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

   @Autowired
   @Lazy
   private DataSource dataSource;

   @Override
   protected void configure(final HttpSecurity http) throws Exception {

      http.authorizeRequests()
      .antMatchers("/api/auth").permitAll()
      .antMatchers("/images/*/**", "/css/*/**", "/js/*/**", "/fonts/*/**").permitAll()
      .antMatchers("/api/info/**", "/api/logs/**").hasRole("ADMIN")
      .antMatchers("/api/equipaments/**").hasRole("USER");

      http.exceptionHandling().authenticationEntryPoint(restAuthenticationEntryPoint);
      http.exceptionHandling().accessDeniedHandler(restAccessDeniedHandler);
      http.csrf().disable();

      http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
      http.addFilterBefore(jwtAuthenticationFilter(), AbstractPreAuthenticatedProcessingFilter.class);
   }

   @Bean
   public AuthenticationProvider authenticationProvider() {
      final SiteminderAuthenticationProvider siteminderAuthenticationProvider = new SiteminderAuthenticationProvider();
      siteminderAuthenticationProvider.setUserDetailsService(gicarUserDetailsService());
      return siteminderAuthenticationProvider;
   }

   @Bean
   @Primary
   public UserDetailsService gicarUserDetailsService() {
      final GICARUserDetailsServiceImpl gicarUserDetailsServiceImpl = new GICARUserDetailsServiceImpl();
      gicarUserDetailsServiceImpl.setHttpGicarHeaderUsernameKey(getHttpGicarHeaderUsernameKey());
      gicarUserDetailsServiceImpl.setAuthoritiesDAO(authoritiesDAO());
      return gicarUserDetailsServiceImpl;
   }

   @Bean
   public AuthoritiesDAO authoritiesDAO() {
      final AuthoritiesDAOImpl authoritiesDAOImpl = new AuthoritiesDAOImpl();
      authoritiesDAOImpl.setDataSource(dataSource);
      return authoritiesDAOImpl;
   }

   @Override
    @Autowired
    protected void configure(final AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authenticationProvider());
    }

    @Bean
    @Autowired
    public AuthenticationManager authenticationManager(final AuthenticationManagerBuilder auth) {
        return auth.getOrBuild();
    }

   private String getHttpGicarHeaderUsernameKey() {
      final String gicarHeader = propertiesConfiguration.getProperty("security.gicar.httpGicarHeaderUsernameKey");
      return gicarHeader != null ? gicarHeader : "NIF";
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

}
```

On s'ha d’haver definit a la base de dades de l'aplicació les taules necessàries per a obtenir les _athorities_ al
DAO `AuthoritiesDAOImpl`. Per a més informació sobre aquestes taules, podeu consultar la documentació de
Spring [Security Database Schema](https://docs.spring.io/spring-security/site/docs/current/reference/html5/#appendix-schema).
Amb aquesta configuració ha de ser possible autoritzar un usuari que prèviament ha estat autenticat en el servei de GICAR.
Per aquest motiu serà necessari rebre certes dades referents a l'autenticació realitzada. A la capçalera HTML
podrem accedir a les següents dades:

```
HTTP_GICAR=CODIINTERN=NRDRJN0001;NIF=11112222W;EMAIL=mail.admin@gencat.net;UNITAT_MAJOR=CTTI;
UNITAT_MENOR=CTTI Qualitat
```

On:

- CODIINTERN és el codi intern de l'usuari,
- el NIF el NIF de l'usuari,
- EMAIL l'adreça de correu electrònic enregistrada al Director Corporatiu,
- UNITAT_MAJOR és l'organització i
- UNITAT_MENOR és la unitat

<div class="message information">
En cas que l'aplicació estigui separada entre codi estàtic i dinàmic, serà necessari indicar la següent propietat
dins el bean `proxyUsernamePasswordAuthenticationFilter`:
<br><br>
<b>&lt;property name="filterProcessesUrl" value="/AppJava/j_spring_security_check" /&gt;</b>
</div>

<br/>
### Configuració de la font d'autenticació i autorització per GICAR

Per a configurar l'autenticació i l'autorització a GICAR serà necessari configurar:

* L'arxiu de propietats `security.properties`
* El **proveïdor de seguretat** dins de la configuració de seguretat de Spring

Els dos arxius es generen i configuren de manera automàtica mitjançant l'eina de desenvolupament. Per a configurar
l'accés a GICAR serà necessari configurar l'arxiu de propietats `security.properties` que té el següent format:

Propietat                                   | Requerit | Descripció
------------------------------------------- | -------- | -----------------------------------
*.security.gicar.httpGicarHeaderUsernameKey | No       | Aquesta propietat indica quin és el camp de la capçalera HTTP_GICAR que conté el nom de l'usuari autenticat a GICAR. Per defecte: NIF

A continuació es mostra la classe `WebSecurityConfig` per a una configuració basada en GICAR com a sistema
d'autenticació i autorització sense utilitzar JWT:

```
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.Primary;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;
import org.springframework.security.web.authentication.preauth.AbstractPreAuthenticatedProcessingFilter;
import org.springframework.web.bind.annotation.RequestMethod;

import cat.gencat.ctti.canigo.arch.core.config.PropertiesConfiguration;
import cat.gencat.ctti.canigo.arch.security.provider.gicar.GICARWithMemberUserDetailsServiceImpl;
import cat.gencat.ctti.canigo.arch.security.provider.siteminder.SiteminderAuthenticationProvider;
import cat.gencat.ctti.canigo.arch.security.rest.authentication.gicar.ProxyUsernamePasswordAuthenticationFilter;

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

   @Autowired
   @Lazy
   private DataSource dataSource;

   @Override
   protected void configure(final HttpSecurity http) throws Exception {

      http.authorizeRequests()
      .antMatchers("/images/*/**", "/css/*/**", "/js/*/**", "/fonts/*/**").permitAll()
      .antMatchers("/api/info/**", "/api/logs/**").hasRole("ADMIN")
      .antMatchers("/api/equipaments/**").hasRole("USER");

      http.exceptionHandling().authenticationEntryPoint(restAuthenticationEntryPoint);
      http.exceptionHandling().accessDeniedHandler(restAccessDeniedHandler);
      http.csrf().disable();

      http.formLogin().loginProcessingUrl("/api/login").successHandler(restAuthenticationSuccessHandler).failureHandler(restAuthenticationFailureHandler);
      http.logout().logoutUrl("/api/logout").logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler(HttpStatus.ACCEPTED))
                   .invalidateHttpSession(true);
      http.addFilterBefore(proxyUsernamePasswordAuthenticationFilter(), AbstractPreAuthenticatedProcessingFilter.class);
   }

   @Bean
   @Autowired
   public ProxyUsernamePasswordAuthenticationFilter proxyUsernamePasswordAuthenticationFilter() {
      final ProxyUsernamePasswordAuthenticationFilter proxyUsernamePasswordAuthenticationFilter =
            new ProxyUsernamePasswordAuthenticationFilter("/api/login", RequestMethod.POST.toString());
      proxyUsernamePasswordAuthenticationFilter.setSiteminderAuthentication(isSiteminderAuthentication());
      proxyUsernamePasswordAuthenticationFilter.setGicarWithMemberAuthentication(true);
      proxyUsernamePasswordAuthenticationFilter.setAuthenticationManager(authenticationManager);
      proxyUsernamePasswordAuthenticationFilter.setAuthenticationSuccessHandler(restAuthenticationSuccessHandler);
      proxyUsernamePasswordAuthenticationFilter.setAuthenticationFailureHandler(restAuthenticationFailureHandler);
      return proxyUsernamePasswordAuthenticationFilter;
   }

   @Bean
   public AuthenticationProvider authenticationProvider() {
      final SiteminderAuthenticationProvider siteminderAuthenticationProvider = new SiteminderAuthenticationProvider();
      siteminderAuthenticationProvider.setUserDetailsService(gicarUserDetailsService());
      return siteminderAuthenticationProvider;
   }

   @Bean
   @Primary
   public UserDetailsService gicarUserDetailsService() {
      final GICARWithMemberUserDetailsServiceImpl gicarWithMemberUserDetailsServiceImpl = new GICARWithMemberUserDetailsServiceImpl();
      gicarWithMemberUserDetailsServiceImpl.setHttpGicarHeaderUsernameKey(getHttpGicarHeaderUsernameKey());
      return gicarWithMemberUserDetailsServiceImpl;
   }

   @Override
    @Autowired
    protected void configure(final AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authenticationProvider());
    }

    @Bean
    @Autowired
    public AuthenticationManager authenticationManager(final AuthenticationManagerBuilder auth) {
        return auth.getOrBuild();
    }

   private String getHttpGicarHeaderUsernameKey() {
      final String gicarHeader = propertiesConfiguration.getProperty("security.gicar.httpGicarHeaderUsernameKey");
      return gicarHeader != null ? gicarHeader : "NIF";
   }

   private boolean isSiteminderAuthentication() {
      return true;
   }

}
```

A continuació es mostra la classe `WebSecurityConfig` per a una configuració basada en GICAR com a sistema d'autenticació i autorització amb JWT:

```
import javax.inject.Named;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.Primary;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.preauth.AbstractPreAuthenticatedProcessingFilter;

import cat.gencat.ctti.canigo.arch.core.config.PropertiesConfiguration;
import cat.gencat.ctti.canigo.arch.security.provider.gicar.GICARWithMemberUserDetailsServiceImpl;
import cat.gencat.ctti.canigo.arch.security.provider.siteminder.SiteminderAuthenticationProvider;
import cat.gencat.ctti.canigo.arch.security.rest.authentication.jwt.JwtAuthenticationFilter;
import cat.gencat.ctti.canigo.arch.security.rest.authentication.jwt.JwtTokenHandler;
import cat.gencat.ctti.canigo.arch.security.rest.authentication.service.AuthenticationService;
import cat.gencat.ctti.canigo.arch.security.rest.authentication.service.impl.JwtGicarWithMemberAuthenticationService;

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

   @Autowired
   @Lazy
   private DataSource dataSource;

   @Override
   protected void configure(final HttpSecurity http) throws Exception {

      http.authorizeRequests()
      .antMatchers("/api/auth").permitAll()
      .antMatchers("/images/*/**", "/css/*/**", "/js/*/**", "/fonts/*/**").permitAll()
      .antMatchers("/api/info/**", "/api/logs/**").hasRole("ADMIN")
      .antMatchers("/api/equipaments/**").hasRole("USER");

      http.exceptionHandling().authenticationEntryPoint(restAuthenticationEntryPoint);
      http.exceptionHandling().accessDeniedHandler(restAccessDeniedHandler);
      http.csrf().disable();

      http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
      http.addFilterBefore(jwtAuthenticationFilter(), AbstractPreAuthenticatedProcessingFilter.class);
   }

   @Bean
   public AuthenticationProvider authenticationProvider() {
      final SiteminderAuthenticationProvider siteminderAuthenticationProvider = new SiteminderAuthenticationProvider();
      siteminderAuthenticationProvider.setUserDetailsService(gicarUserDetailsService());
      return siteminderAuthenticationProvider;
   }

   @Bean
   @Primary
   public UserDetailsService gicarUserDetailsService() {
      final GICARWithMemberUserDetailsServiceImpl gicarWithMemberUserDetailsServiceImpl = new GICARWithMemberUserDetailsServiceImpl();
      gicarWithMemberUserDetailsServiceImpl.setHttpGicarHeaderUsernameKey(getHttpGicarHeaderUsernameKey());
      return gicarWithMemberUserDetailsServiceImpl;
   }

   @Override
    @Autowired
    protected void configure(final AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authenticationProvider());
    }

    @Bean
    @Autowired
    public AuthenticationManager authenticationManager(final AuthenticationManagerBuilder auth) {
        return auth.getOrBuild();
    }

   private String getHttpGicarHeaderUsernameKey() {
      final String gicarHeader = propertiesConfiguration.getProperty("security.gicar.httpGicarHeaderUsernameKey");
      return gicarHeader != null ? gicarHeader : "NIF";
   }

   @Bean
   @Named("jwtAuthenticationService")
   public AuthenticationService jwtAuthenticationService() {
      final JwtGicarWithMemberAuthenticationService jwtGicarWithMemberAuthenticationService = new JwtGicarWithMemberAuthenticationService();
      jwtGicarWithMemberAuthenticationService.setSiteminderAuthentication(isSiteminderAuthentication());
      jwtGicarWithMemberAuthenticationService.setTokenResponseHeaderName(getTokenResponseHeaderName());
      jwtGicarWithMemberAuthenticationService.setHeaderAuthName(getHeaderAuthName());

      return jwtGicarWithMemberAuthenticationService;
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

}
```

Amb aquesta configuració s'utilitzen les capçaleres *HTTP_GICAR* i *HTTP_GICAR_ID*, o *HTTP_GICAR_CERT* i *HTTP_GICAR_PSIS*
per a l'autenticació; i *HTTP_GICAR_MEMBERL* per l'autorització. Per a més informació sobre les capçaleres GICAR podeu
consultar [Control d'accés als recursos amb GICAR](/gicar-saml2/auth-saml2-grups2/).

### Logout

Per a tots els mètodes d'autenticació, el procediment de _logoff_ consisteix en **invalidar la sessió, forçant així que el
servei de seguretat intervingui en la següent petició sol·licitant nova identificació per part de l’usuari**.
En el cas de **GICAR, aquesta autenticació és realitzada per un sistema extern** a l'aplicació i, per tant, s'ha de
comunicar a aquest sistema extern la intenció de fer el _logoff_. El mecanisme previst per a fer-ho consisteix en
una URL de Gicar que, en ser invocada, realitza el _logoff_. El _logoff_ depèn de l'agent de _SiteMinder_ que l'aplicació
fa servir per a comunicar-se amb el _Policy Server_.

Els enllaços de _logoff_ són els següents:

* Per a una aplicació ubicada als apaches corporatius de internet: http://sso.gencat.cat/siteminderagent/forms/logoff.html
* Per a una aplicació ubicada als apaches corporatius de intranet: http://sso.gencat.intranet/siteminderagent/forms/logoff.html
* Per a una aplicació amb apache "propi": http://****.gencat.***/siteminderagent/forms/logoff.html;

## Eines de Suport

### Servidor LDAP de proves: openLDAP

A continuació s’expliquen els diferents passos per a instal·lar openLDAP i importar un directori LDAP d'exemple:

* Baixar OpenLDAP per a Windows http://sourceforge.net/projects/openldapwindows/ i instal·lar-lo
* Canviar la configuració per defecte de OpenLDAP: copiar les dades següents en un fitxer `slapd.conf` i afegir
aquest fitxer a la mateixa carpeta que OpenLDAP:

```
#######################################################################
# See slapd.conf(5) for details on configuration options.
# This file should NOT be world readable.
#######################################################################
ucdata-path ./ucdata
include ./etc/schema/core.schema
include ./etc/schema/cosine.schema
include ./etc/schema/inetorgperson.schema

# Define global ACLs to disable default read access.

# Do not enable referrals until AFTER you have a working directory
# service AND an understanding of referrals.
#referral ldap://root.openldap.org

pidfile ./var/run/slapd.pid
argsfile ./var/run/slapd.args

#######################################################################
# BDB database definitions
#######################################################################

###database bdb
###suffix "dc=my-domain,dc=com"
###rootdn "cn=Manager,dc=my-domain,dc=com"

database bdb
suffix dc="mycompany",dc="com"
rootdn "cn=Manager,dc=mycompany,dc=com"

rootpw secret
Eines de Suport

directory ./var/openldap-data
index objectClass eq
```

* Obrir una pantalla "DOS command", dirigir-se a la carpeta on hem instal·lat el programa i arrancar OpenLDAP amb la següent comanda:

```
.\slapd -d 1
```

Si tot ha funcionat bé, hauríem de veure una sortida com aquesta:

![Execució Open LDAP](/related/canigo/documentacio/modul-seguretat/ServeiSeguretat_img012.jpg.gif)

* Copiar les dades següents en un fitxer `setup.ldif`. Aquest fitxer conté un directori LDAP de l'empresa "mycompany.com"
amb 2 persones: "gestoruser" i "usuari". Copiarem el fitxer `setup.ldif` a la mateixa carpeta que openLDAP.

```
### Top level definition
#dn: dc=mycompany,dc=com
#objectClass: top
#objectClass: dcObject
#objectClass: domain
#dc: mycompany

### organizationalUnit : PEOPLE
# Definition of people
dn: ou=people,dc=mycompany,dc=com
objectClass: top
objectClass: organizationalUnit
ou: people

# Gestor User
dn: uid=gestoruser,ou=people,dc=mycompany,dc=com
objectClass: person
objectClass: inetOrgPerson
cn: State App
displayName: App Admin
givenName: App
mail: gestor@fake.org
title: ROLE_ADMIN
sn: Gestor
uid: gestoruser
userPassword: gestorpassword

# usuario normal
dn: uid=usuario,ou=people,dc=mycompany,dc=com
objectClass: person
objectClass: inetOrgPerson
cn: State App
displayName: App Admin
givenName: App
mail: usuario@fake.org
title: ROLE_USER
sn: Usuario
uid: usuario
userPassword: usuariopassword
```

* Obrir una altra pantalla "DOS command", dirigir-se a la carpeta on hem instal·lat el programa i importar les dades
amb la següent comanda. La paraula de pas per defecte és "secret".

```
ldapadd -x -D "cn=Manager,dc=mycompany,dc=com" -W -f setup.ldif
```

### Client LDAP Java: Jxplorer

Comprovarem que la importació de dades ha funcionat amb _Jxplorer_, un client LDAP Java de codi obert.

* Baixar Jxplorer de la url http://sourceforge.net/projects/jxplorer/ i instal·lar-lo
* Prémer el botó per a connectar-se al nostre directori LDAP. La paraula de pas per defecte és "secret".

La pantalla següent mostra els valors dels diferents paràmetres:

![Configuració paràmetres JXplorer](/related/canigo/documentacio/modul-seguretat/ServeiSeguretat_img013.jpg.gif)

Si tot ha funcionat bé, hauríem de veure la següent pantalla:

![Resultat JXplorer](/related/canigo/documentacio/modul-seguretat/ServeiSeguretat_img014.jpg.gif)
