+++
date        = "2019-12-11"
title       = "Canigó. Com utilitzar l'autorització via Gicar a aplicacions Canigó"
description = "Howto per configurar una aplicació Canigó per utilitzar l'autorització a més de la autenticació via Gicar"
section     = "howtos"
categories  = ["canigo"]
key         = "GENER2020"
+++

## Introducció

A les últimes novetats de Gicar s’incorpora la possibilitat de tenir l'autorització a més de l'autenticació. Aquest how-to va dirigit a tots aquells perfils tècnics que tinguin la necessitat de configurar i utilitzar aquesta utilitat a una aplicació Canigó.

Hi ha dos tipus d'autenticació i d'autorització en els serveis d'una aplicació Canigó: amb o sense JWT. En aquest how-to ens centrarem en l'opció d'autenticació i d'autorització amb JWT. Per a més informació sobre l’opció sense JWT podeu consultar el [Mòdul de Seguretat](/canigo-documentacio-versions-3x-core/modul-seguretat/).


Gicar, per l'autenticació, proporciona les capçaleres HTTP:
- HTTP_GICAR
- HTTP_GICAR_ID
- HTTP_GICAR_CERT
- HTTP_GICAR_PSIS

Per l'autorització, proporciona les capçaleres HTTP:
- HTTP_GICAR_MEMBERL

Un exemple de capçalera seria:

```
HTTP_GICAR_MEMBERL --> VPN_PRE-GICARDC;VPN_GENERIC-GICARDC;GESNUS_N3_Escriptura;VPN_GENERIC
```

A la versió 2.2.x del Mòdul de Seguretat de Canigó, s'utilitzen aquestes capçaleres per a construir la informació de l'usuari i els seus rols per a poder ser utilitzats en una aplicació Canigó.

## Mòdul de seguretat
Canigó proporciona, en el mòdul de suport de correu (mailing), serveis per a l'enviament de correus electrònics des d'una aplicació. Es pot incorporar automàticament el mòdul d’enviament de correu mitjançant l’eina de suport al desenvolupament, o bé afegir manualment la següent dependència en el pom.xml:

Per tal d’instal·lar el mòdul de seguretat en una aplicació Canigó es pot optar per incorporar automàticament el mòdul mitjançant el plugin de Canigó de l’Eclipse, o bé afegir manualment la següent dependència en el pom.xml de l’aplicació:

```
<canigo.security.version>[2.0.0,2.3.0)</canigo.security.version>
<dependency>
      <groupId>cat.gencat.ctti</groupId>
      <artifactId>canigo.security</artifactId>
      <version>${canigo.security.version}</version>
      <exclusions>
        <exclusion>
          <artifactId>spring-security-taglibs</artifactId>
          <groupId>org.springframework.security</groupId>
        </exclusion>
      </exclusions>
    </dependency>
```

## Configuració per a utilitzar l'autorització i l'autenticació via Gicar

A la versió 1.7.6 del plugin de Canigó per l'Eclipse ja s’incorpora la nova opció d'autenticació i d'autorització Gicar en afegir el mòdul de seguretat en una aplicació Canigó. Podeu veure les opcions disponibles a:
[Actualització plugin eclipse 1.7.6](/noticies/2019-10-25-Actualitzacio_plugin_eclipse_1_7_6)

En cas contrari, serà necessari crear els següents fitxers:

- "WebSecurityConfig.java" al package "config" del projecte, al mateix nivell que "AppConfig.java".
- "security.properties" a "/src/main/resources/config/props".

###  WebSecurityConfig.java

Amb el següent contingut:

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

On es defineix, com a punts més rellevants:

- Que totes les peticions "/api/auth" són acceptades. Aquest és el servei que utilitzarà Gicar per informar-nos de les capçaleres HTTP.

- Que com a UserDetailsService s’utilitzarà GICARWithMemberUserDetailsServiceImpl.

- Que com a AuthenticationService s’utilitzarà JwtGicarWithMemberAuthenticationService.


###  security.properties

Amb la següent definició de propietats per defecte:

```
###########################################################
#
# Arxiu de configuració del mòdul de seguretat
# ---------------------------------------------------------
#
#	Propietats de mòdul multientorn:
#
#		Format de la propietat:  ENTORN.MÒDUL.PROPIETAT
#			El concepte ENTORN és el valor de la propietat d’arrencada de la màquina virtual Java informada al
#			servidor d'aplicacions.
#		Exemples de configuració:
#
#			*.security.database.jndiName	   ->  Propietat vàlida per a tots els entorns, sempre que no s'informi una propietat més especifica per al entorn en el qual s'executa l'aplicació.
#			dev.security.database.jndiName  ->  Propietat vàlida només a desenvolupament.
#			test.security.database.jndiName  ->  Propietat vàlida només a test.
#
#
#
#
#
#	Propietat							 	Requerit		Descripció
#	---------------------------------------------------------------------------------
#	security.database.jndiName	 				Si	 		Nom JNDI d'accés a la BD
#	security.database.driverClassName			Si			Driver per connexió amb JDBC
#	security.database.url	 					Si	 		URL de connexió a la base de dades.
#	security.database.username					Si	 		Usuari de connexió a la base de dades
#	security.database.password					Si	 		Password de connexió a la base de dades
#	security.gicar.httpGicarHeaderUsernameKey	No			Clau capçelera GICAR
#	security.sace.userNameFormat				No			Format del camp userName. Per defecte: NIF. Valors possibles: NIF, INTERNAL_CODE
#	security.sace.authoritiesbyUserNameQuery	No    		Aquesta propietat permet especificar la query SQL per a recollir els rols dels usuaris
#	security.sace.keyStore						Si			Localització de la keystore
#	security.sace.keyStorePassPhrase		    Si			Password de la keystore
#	security.sace.url						    S			URL del servei de SACE
#
#
#########################################################################################################################################################################
# GICAR configuration
#*.security.gicar.httpGicarHeaderUsernameKey=NIF
# JWT Configuration
*.jwt.header = Authentication
*.jwt.header.startToken = Bearer
*.jwt.tokenResponseHeaderName = jwtToken
*.jwt.secret = canigo
*.jwt.expiration = 3600
*.jwt.siteminderAuthentication = true
```

Amb aquesta configuració, s'aconsegueix disposar d’una aplicació Canigó 3.4.x amb autenticació i autorització via Gicar.

## Informació addicional

Podeu trobar més informació mitjançant els següents enllaços:

Mòdul de seguretat de Canigó:
[Mòdul de Seguretat](/canigo-documentacio-versions-3x-core/modul-seguretat/)

Plugin de Canigó per Eclipse:
[Plugin Canigó per a Eclipse](/canigo-download-related/plugin-canigo/)

Autenticació i autorització a Gicar:
[Control d'accés als recursos amb GICAR](/gicar-saml2/auth-saml2-grups2/)