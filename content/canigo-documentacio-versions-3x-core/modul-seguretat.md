+++
date        = "2019-10-21"
title       = "Mòdul Seguretat"
description = "Autenticació i autorització d'usuaris"
sections    = "Canigó. Documentació versió 3.x"
weight      = 9
+++

## Propòsit

El Mòdul de Seguretat té com a propòsit principal gestionar l'autenticació i l'autorització dels usuaris en aplicacions Canigó. L'objectiu de l'autenticació és comprovar que l'usuari és qui diu ser, mentre que l'autorització s'encarrega de comprovar que realment té accés als recursos sol·licitats.
	
Canigó recomana l'ús de Spring Security com a framework base i les extensions que Canigó proporciona.

## Instal·lació i Configuració

### Instal·lació

Per tal d'instal·lar el mòdul de seguretat es pot incloure automàticament a través de l'eina de suport al desenvolupament o bé afegir manualment en el pom.xml de l'aplicació la següent dependència:

```
<canigo.security.version>[2.0.0, 2.3.0)</canigo.security.version>

<dependency>
	<groupId>cat.gencat.ctti</groupId>
	<artifactId>canigo.security</artifactId>
	<version>${canigo.security.version}</version>
</dependency>
```

### Configuració

La configuració es realitza automàticament a partir de l'eina de suport al desenvolupament i es compon de les següents parts:

* Configuració de filtres web
* Configuració de JWT (JSON Web Token)
* Publicació Controladors de Seguretat
* Configuració d'autenticació
* Configuració d'autorització
* Configuració de la font de dades de l'esquema de seguretat

#### Configuració de filtres web

Spring Security utilitza un conjunt de filtres per a detectar aspectes de l'autorització i autenticació. Per a fer-los servir definirem en el fitxer 'WEB-INF/web.xml el codi següent:

```
<filter>
    <filter-name>springSecurityFilterChain</filter-name>
    <filter-class>org.springframework.web.filter.DelegatingFilterProxy</filter-class>
</filter>
<filter-mapping>
    <filter-name>springSecurityFilterChain</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>
```

Per a més informació consultar la pàgina [Spring Security Doc](http://docs.spring.io/spring-security/site/docs/4.2.x/reference/htmlsingle/#security-filter-chain)

#### Configuració de JWT (JSON Web Token)

La nova versió de Canigó permet treballar amb [JWT](https://jwt.io/). Per això s'ha fet servir la llibreria [Java JWT](https://java.jsonwebtoken.io/). Aquesta llibreria permet autenticar l'usuari amb qualsevol dels mètodes descrits en el següent apartat "Configuració d'autenticació". Un cop autenticat l'usuari, el servidor genera un token que serà enviat pel client a la capçalera HTTP a cada petició.

Per poder configurar JWT es necessita afegir al fitxer de propietats del Servei de Seguretat (security.properties) la següent configuració:

Propietat                     | Requerit | Descripció                                 | Valor per Defecte
----------------------------- | -------- | -------------------------------------------|------------------
*.jwt.header                  | No       | Nom del header del token JWT		      | Authentication
*.jwt.header.startToken       | No       | Inici del token JWT       		      | Bearer
*.jwt.tokenResponseHeaderName | No       | Nom del header del token JWT        	      | jwtToken
*.jwt.secret                  | No       | Password per generar el token JWT          | canigo
*.jwt.expiration              | No       | Temps de vida del token JWT       	      | 3600
*.jwt.siteminderAuthentication| No       | Gicar authentication             	      | false

Per provar l'autenticació per _token_ s'ha de cridar a "http:// < app > /api/auth" amb la capçalera GICAR, en cas d'autenticació per GICAR, o en el cos de la petició en format JSON en altres casos.
```
{ 
	username = user,
	password  = secret
} 
```
Aquesta crida ens retornarà un _token_ vàlid. Per a les següents peticions s'ha d'enviar aquest token a la capçalera HTTP de la petició de la següent manera (configuració per defecte):

Authentication Bearer eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE0NzkyMzEzODMsInN1YiI6ImFkbWluIiwiYXV0aG9yaXRpZXMiOiJST0xFX0FETUlOLFJPTEVfVVNFUiJ9.jeApLoXyn4nrdp2iPRkjhoTWmzFNUYOkphnck0gmp1pLygOj1hgN1O1Ps86_jY6ZXaEhXl2Fk-o36SOMQAQGHA

Més endavant es mostra un exemple de configuració a Canigó de JWT + GICAR.

#### Publicació Controladors de Seguretat

Per defecte el mòdul de seguretat publica les api /auth i /login.

En cas de no voler publicar-les a la nostra aplicació s'hauria de condicionar la càrrega de Spring Boot de la següent manera:

Al fitxer de configuració de l'aplicació (AppConfig.java) afegir l'anotació @PropertySource al fitxer boot.properties que s'ha de crear:
```
	@Configuration
	@PropertySource("classpath:/config/props/boot.properties")
	@ImportResource({ "classpath:cat/gencat/ctti/canigo/arch/core/config/canigo-core.xml" })
	@EnableTransactionManagement
	public class AppConfig {
	}
```	
Crear el fitxer /src/main/reources/config/props/boot.properties amb la propietat *publishAuthController* a _false_:
```
	publishAuthController=false
```

#### Configuració de l'autenticació

En la configuració de l'autenticació tindrem en consideració:

* Seleccionar el tipus de font contra la qual es realitza l'autenticació (per arxiu de propietats, base de dades, Gicar, ...)
* Configurar el formulari d'autenticació web i la seqüència d'accions per realitzar l'autenticació.

Dins d'aquest mòdul trobem els següents proveïdors de seguretat:

* Seguretat In-Memory
* Seguretat Base de dades
* Seguretat GICAR

Els diferents proveïdors comparteixen els següents arxius de configuració:

* security.properties: propietats del servei de seguretat
* app-custom-security.xml: arxiu XML amb la configuració de seguretat.
* WebSecurityConfig.java: classe Java amb la configuració de seguretat Web.
* security.users.properties: llistat en format pla dels usuaris/password/rols de l'aplicació per al proveïdor "InMemory".

La disposició dels arxius és la següent:

* Ubicació: <PROJECT_ROOT>/src/main/resources/config/props/security.users.properties
* Ubicació: <PROJECT_ROOT>/src/main/resources/spring/app-custom-security.xml
* Ubicació: <PROJECT_ROOT>/src/main/java/cat/gencat/nomapp/config/WebSecurityConfig.java
* Ubicació: <PROJECT_ROOT>/src/main/resources/config/props/security.properties

#### Configuració de la font d'autenticació i autorització per base de dades

Per a configurar la font d'autorització mitjançant base de dades és necessari:

* Configurar l'arxiu de propietats security.properties.
* Configurar el proveïdor de seguretat dins de la configuració de seguretat de Spring.

Els dos arxius es generen i configuren de manera automàtica mitjançant l'eina de desenvolupament.

Les propietats de l'arxiu security.properties són les següents:

Propietat                    | Requerit | Descripció
---------------------------- | -------- | ----------------------------------------------------------
*.security.database.jndiName | Si       | Nom JNDI d'accés a la BD. Obligatori per a connexions JNDI
*.security.database.url      | Si       | URL de connexió a la base de dades
*.security.database.username | Si       | Usuari de connexió a la base de dades
*.security.database.password | Si       | Password de connexió a la base de dades

La configuració del _provider_ en app-custom-security.xml per aquest proveïdor és la següent:

* Afegim el _provider_ al _authentication manager_.
* Afegim el tipus de codificador de _password_ per tal de comparar la clau de base de dades i la que ens ha proporcionat l'usuari de l'aplicació. Aquest codificador suporta: plaintext, sha, sha-256, md5, md4, ssha. Si a la base de dades hi tenim emmagatzemat les claus d'usuari en md5, i marquem "password-encode" com a md5, de manera automàtica, la clau proporcionada per l'usuari via formulari de login (j_password) es codificarà en md5 per posteriorment ser comparada amb la enmagatzemada a la base de dades.

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

A continuació es mostra la classe WebSecurityConfig per a una configuració basada l'autenticació i l'autorització per base de dades sense utilitzar JWT:

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
		http.logout().logoutUrl("/api/logout").logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler(HttpStatus.ACCEPTED)).invalidateHttpSession(true);
		http.addFilterBefore(proxyUsernamePasswordAuthenticationFilter(), AbstractPreAuthenticatedProcessingFilter.class);
	}
	
	@Bean
	@Autowired
	public ProxyUsernamePasswordAuthenticationFilter proxyUsernamePasswordAuthenticationFilter() {
		final ProxyUsernamePasswordAuthenticationFilter proxyUsernamePasswordAuthenticationFilter = new ProxyUsernamePasswordAuthenticationFilter("/api/login", RequestMethod.POST.toString());
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

A continuació es mostra la classe WebSecurityConfig per a una configuració basada l'autenticació i l'autorització per base de dades amb JWT:

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

<div class="message warning">
Accés base de dades

L'eina de suport al desenvolupament automatitza la instal·lació del mòdul de persistència si aquest no ha estat instal·lat prèviament pel desenvolupador.
</div>

#### Configuració de la font d'autenticació i autorització per LDAP

Per a configurar l'acces a LDAP (funcionalitat ja desfasadada) és necessari:

* Configurar l'arxiu de propietats security.properties.
* Conigurar el proveidor de seguretat dins de la configuració de seguretat de Spring.

Els dos arxius es generen i configuren de manera automàtica mitjançant l'eina de desenvolupament. Les propietats de l'arxiu security.properties són les següents:

Propietat                           | Requerit | Descripció
----------------------------------- | -------- | -----------------------------------------------------------------------
*.security.ldap.url                 | Si       | Direcció del servidor ldap separat amb dos punts ":" del port
*.security.ldap.manager.dn          | Sí       | Identificador de l'usuari administrador del LDAP
*.security.ldap.manager.password    | Si       | Password del l'usuari administrador del LDAP
*.security.ldap.user.search.filter  | No       | Filtre de cerca dels usuaris dintre de l'estructura del LDAP. Per defecte: (uid={0})
*.security.ldap.user.search.base    | Si       | String base de la ubicació dels usuaris dintre de l'estructura del LDAP
*.security.ldap.group.search.base   | Si       | String base de la ubicació dels grups dintre de l'estructura del LDAP
*.security.ldap.group.search.filter | No       | Filtre de cerca dels grups dintre de l'estructura del LDAP. Per defecte: (cn={0})

Per a realitzar les proves en desenvolupament podem instal·lar un servidor LDAP senzill (veure l'apartat 'Eines de Suport' per a més referència).

Configuració del provider en **app-custom-security.xml**:

* Afegim el provider al authentication manager.
* Afegim la connexió al LDAP server

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

#### Configuració de la font d'autenticació i autorització per arxiu de propietats

Aquest proveïdor de seguretat es basa en un arxiu de propietats per carregar en memòria els usuaris/password/rols de l'aplicació.

Per a configurar l'accés mitjançant un arxiu de propietats és necessari:

* Configurar l'arxiu de propietats **security.users.properties**.
* Conigurar el proveïdor de seguretat dins de la configuració de seguretat de Spring (**app-custom-security.xml**).

L'arxiu que conté aquesta configuració **security.users.properties** te el següent format:

    username=password,grantedAuthority[,grantedAuthority][,enabled|disabled]

Exemple de configuració:

```
user=password,ROLE_USER,enabled
admin=password,ROLE_USER,ROLE_ADMIN,enabled
```

Per a configurar el _provider_ a **app-custom-security.xml** realitzarem:

* Afegim el _provider_ al _authentication manager_.
* Afegim el tipus de codificador de _password_ per tal de comparar la clau de l'arxiu de propietats i la que ens ha proporcionat l'usuari de l'aplicació. Aquest codificador suporta: plaintext, sha, sha-256, md5, md4, ssha.

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
A continuació es mostra la classe WebSecurityConfig per a una configuració basada l'autenticació i l'autorització per arxiu de propietats sense utilitzar JWT:

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
		http.logout().logoutUrl("/api/logout").logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler(HttpStatus.ACCEPTED)).invalidateHttpSession(true);
		http.addFilterBefore(proxyUsernamePasswordAuthenticationFilter(), AbstractPreAuthenticatedProcessingFilter.class);
	}
	
	@Bean
	@Autowired
	public ProxyUsernamePasswordAuthenticationFilter proxyUsernamePasswordAuthenticationFilter() {
		final ProxyUsernamePasswordAuthenticationFilter proxyUsernamePasswordAuthenticationFilter = new ProxyUsernamePasswordAuthenticationFilter("/api/login", RequestMethod.POST.toString());
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

A continuació es mostra la classe WebSecurityConfig per a una configuració basada l'autenticació i l'autorització per arxiu de propietats amb JWT:

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

#### Configuració de la font d'autenticació per GICAR

Per a configurar l'accés a GICAR és necessari configurar:

* L'arxiu de propietats **security.properties**.
* El proveidor de seguretat dins de la configuració de seguretat de Spring.

Els dos arxius es generen i configuren de manera automàtica mitjançant l'eina de desenvolupament. 

L'arxiu **security.properties** es té el següent format:

Propietat                                   | Requerit | Descripció
------------------------------------------- | -------- | -----------------------------------
*.security.gicar.httpGicarHeaderUsernameKey | No       | Aquesta propietat indica quin és el camp de la capçalera HTTP_GICAR que conté el nom de l'usuari autenticat a GICAR. Per defecte: NIF

Des de la versió 1.2.7 el servei de seguretat de Canigó suporta de manera automàtica la capçalera `HTTP_GICAR_PSIS` per autenticació amb certificats per usuaris que no estan en el DC (Autenticació Anònima), utilitzant-se com a font de dades alternativa per a tasques d'autententicació. A la pàgina del [Servei d'autenticació anònima amb GICAR](https://canigo.ctti.gencat.cat/gicar-integracio/auth-anonima/) es pot trobar informació detallada d'aquesta capçalera.

A continuació es mostra la classe WebSecurityConfig per a una configuració basada en GICAR com a sistema d'autenticació sense utilitzar JWT:

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
		http.logout().logoutUrl("/api/logout").logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler(HttpStatus.ACCEPTED)).invalidateHttpSession(true);
		http.addFilterBefore(proxyUsernamePasswordAuthenticationFilter(), AbstractPreAuthenticatedProcessingFilter.class);
	}
	
	@Bean
	@Autowired
	public ProxyUsernamePasswordAuthenticationFilter proxyUsernamePasswordAuthenticationFilter() {
		final ProxyUsernamePasswordAuthenticationFilter proxyUsernamePasswordAuthenticationFilter = new ProxyUsernamePasswordAuthenticationFilter("/api/login", RequestMethod.POST.toString());
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

A continuació es mostra la classe WebSecurityConfig per a una configuració basada en GICAR com a sistema d'autenticació amb JWT:

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

On s'ha de tenir definit a la base de dades de l'aplicació les taules necessàries per a obtenir les _athorities_ al DAO AuthoritiesDAOImpl. Per a més informació sobre aquestes taules, podeu consultar la documentació de Spring [Security Database Schema](https://docs.spring.io/spring-security/site/docs/current/reference/html5/#appendix-schema)

Amb aquesta configuració ha de ser possible autoritzar un usuari que prèviament ha estat autenticat en el servei de GICAR. Per aquest motiu és necessari rebre certes dades referents a aquesta autenticació ja realitzada. A la capçalera HTML podrem accedir a aquestes dades:

```
HTTP_GICAR=CODIINTERN=NRDRJN0001;NIF=11112222W;EMAIL=mail.admin@gencat.net;UNITAT_MAJOR=CTTI;
UNITAT_MENOR=CTTI Qualitat
```

On CODIINTERN és el codi intern, el NIF el NIF, EMAIL l'adreça de correu electrònic registrada al Director Corporatiu, UNITAT_MAJOR és l'organització i UNITAT_MENOR és la unitat.

<div class="message warning">
En cas que l'aplicació utilitzi la separació entre codi estàtic i dinàmic és necessari indicar la següent propietat dintre del bean proxyUsernamePasswordAuthenticationFilter:
<br><br>

<b>&lt;property name="filterProcessesUrl" value="/AppJava/j_spring_security_check" /&gt;</b>

</div>

#### Configuració de la font d'autenticació i autorització per GICAR

Per a configurar l'autenticació i l'autorització a GICAR és necessari:

* Configurar l'arxiu de propietats **security.properties**.
* Configurar el proveïdor de seguretat dins de la configuració de seguretat de Spring.

Els dos arxius es generen i configuren de manera automàtica mitjançant l'eina de desenvolupament:

Les propietats de l'arxiu **security.properties** són les següents:

Per a configurar l'accés a GICAR és necessari configurar l'arxiu de propietats **security.properties**. Aquest arxiu es genera automàticament des de l'eina de suport, i té el següent format:

Propietat                                   | Requerit | Descripció
------------------------------------------- | -------- | -----------------------------------
*.security.gicar.httpGicarHeaderUsernameKey | No       | Aquesta propietat indica quin és el camp de la capçalera HTTP_GICAR que conté el nom de l'usuari autenticat a GICAR. Per defecte: NIF

A continuació es mostra la classe WebSecurityConfig per a una configuració basada en GICAR com a sistema d'autenticació i autorització sense JWT:
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
		http.logout().logoutUrl("/api/logout").logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler(HttpStatus.ACCEPTED)).invalidateHttpSession(true);
		http.addFilterBefore(proxyUsernamePasswordAuthenticationFilter(), AbstractPreAuthenticatedProcessingFilter.class);
	}
	
	@Bean
	@Autowired
	public ProxyUsernamePasswordAuthenticationFilter proxyUsernamePasswordAuthenticationFilter() {
		final ProxyUsernamePasswordAuthenticationFilter proxyUsernamePasswordAuthenticationFilter = new ProxyUsernamePasswordAuthenticationFilter("/api/login", RequestMethod.POST.toString());
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

A continuació es mostra la classe WebSecurityConfig per a una configuració basada en GICAR com a sistema d'autenticació i autorització amb JWT:

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

Amb aquesta configuració s'utilitzen les capçaleres *HTTP_GICAR* i *HTTP_GICAR_ID* o *HTTP_GICAR_CERT* i *HTTP_GICAR_PSIS* per a l'autentiació i *HTTP_GICAR_MEMBERL* per l'autorització

Per a més informació sobre les capçaleres GICAR podeu consultar [Control d'accés als recursos amb GICAR](/gicar-integracio/autoritzacio/)

### Logout

Per tots els mètodes d'autenticació, el procediment de logoff consisteix en invalidar la sessió, forçant així que el servei de seguretat intervingui en la següent petició solicitant la nova identificació de l'usuari.

En el cas de GICAR, però, aquesta autenticació és realitzada per un sistema extern a l'aplicació i, per tant, s'ha de comunicar a aquest sistema extern la intenció de fer el logoff. El mecanisme previst per fer-ho consisteix en una URL de Gicar que, al ser invocada, realitza el logoff.

Aquest enllaç de logout és depenent de l'agent de SiteMinder que l'aplicació fa servir per a comunicar-se amb el Policy Server.

Així doncs, els enllaços de logout són els següents:

* Per a una aplicació ubicada en els apaches corporatius de internet: http://sso.gencat.cat/siteminderagent/forms/logoff.html
* Per a una aplicació ubicada en els apaches corporatius de intranet: http://sso.gencat.intranet/siteminderagent/forms/logoff.html
* Per a una aplicació amb apache "pròpi": http://****.gencat.***/siteminderagent/forms/logoff.html;

## Eines de Suport

### Servidor LDAP de proves: openLDAP

Els diferents passos per a instal- lar openLDAP i importar un directori LDAP d'exemple són:

* Baixar openLDAP per a Windows http://sourceforge.net/projects/openldapwindows/ i instal- lar-ho.
* Canviar la configuració per defecte de openldap. Copiar les dades següents en un fitxer slapd.conf. Copiarem el slapd.conf en la mateixa carpeta que openLDAP.

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

* Obrir una pantalla "DOS command", anar a la carpeta on hem instal·lat el programa i arrancar openLDAP amb la comanda:

```
.\slapd -d 1
```

Si tot ha funcionat bé, hauríem de veure una sortida com la següent:  
    
![Execució Open LDAP](/related/canigo/documentacio/modul-seguretat/ServeiSeguretat_img012.jpg.gif)

* Copiar les dades següents en un fitxer setup.ldif. Aquest fitxer conté un directori LDAP de l'empresa "mycompany.com" amb 2 persones: "gestoruser" i "usuari". Copiarem el setup.ldif en la mateixa carpeta que openLDAP.

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

Obrir una altra pantalla "DOS command", anar a la carpeta on hem instal·lat el programa i importar les dades amb la comanda:

```
ldapadd -x -D "cn=Manager,dc=mycompany,dc=com" -W -f setup.ldif
```

La contrasenya per defecte és "secret".

### Jxplorer

Comprovarem que la importació de dades ha funcionat amb Jxplorer, un client LDAP Java i de codi obert.

* Baixar Jxplorer a la url http://sourceforge.net/projects/jxplorer/ i instal·lar-ho
* Prémer el botó per a connectar-se al nostre directori LDAP.

La contrasenya per defecte és "secret". La pantalla següent mostra els valors dels diferents paràmetres:

![Configuració paràmetres JXplorer](/related/canigo/documentacio/modul-seguretat/ServeiSeguretat_img013.jpg.gif)

Si tot ha funcionat bé, hauríem de veure la pantalla següent:

![Resultat JXplorer](/related/canigo/documentacio/modul-seguretat/ServeiSeguretat_img014.jpg.gif)

