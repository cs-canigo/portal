+++
date        = "2016-11-28T11:48:54+02:00"
title       = "Mòdul Seguretat"
description = "Autenticació i autorització d'usuaris"
sections    = "Canigó. Documentació versió 3.x"
weight      = 9
+++

## Propòsit

El Mòdul de Seguretat té com a propòsit principal gestionar l'autenticació i l'autorització dels usuaris en aplicacions Canigó. L'objectiu de l'autenticació és comprovar que l'usuari és qui diu ser, mentre que l'autorització s'encarrega de comprovar que realment té accés als recursos sol·licitats.
	
Canigó recomana l'ús de Spring Security com a framework base i les extensions que Canigó proporciona.

## Instal.lació i Configuració

### Instal.lació

Per tal d'instal- lar el mòdul de seguretat es pot incloure automàticament a través de l'eina de suport al desenvolupament o bé afegir manualment en el pom.xml de l'aplicació la següent dependència:

```
<canigo.security.version>[1.2.0, 1.3.0)</canigo.security.version>
<canigo.test.version>[1.2.0,1.3.0)</canigo.test.version>

<dependency>
	<groupId>cat.gencat.ctti</groupId>
	<artifactId>canigo.security</artifactId>
	<version>${canigo.security.version}</version>
</dependency>

<dependency>
	<groupId>cat.gencat.ctti</groupId>
	<artifactId>canigo.test</artifactId>
	<version>${canigo.test.version}</version>
	<scope>test</scope>
</dependency>

<dependency>
   <groupId>cat.gencat.ctti</groupId>
   <artifactId>canigo.security</artifactId>
   <type>test-jar</type>
   <version>${canigo.security.version}</version>
   <scope>test</scope>
   <classifier>tests</classifier>
</dependency>

```
Al pom.xml també s'ha d'afegir el plugin executa el test unitari del mòdul de seguretat. 
En el cas de tenir configurat l'execució del test dels mòduls de configuració i/o persistència,
cal excloure la dependència del mòdul de seguretat per tal d'evitar conflictes:
```
<build>
	...
	<plugins>
		...
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-surefire-plugin</artifactId>
            <executions>
                <execution>
                    <id>base-test</id>
                    <phase>test</phase>
                    <goals>
                        <goal>test</goal>
                    </goals>
                    <configuration>
                        <dependenciesToScan>
		          <dependency>cat.gencat.ctti:canigo.core</dependency>
		          <dependency>cat.gencat.ctti:canigo.persistence.jpa</dependency>
			  <dependency>cat.gencat.ctti:canigo.web.rs</dependency>
                        </dependenciesToScan>
			<excludes>
			  <exclude>%regex[${project.groupId}.*.*Test.*]</exclude>
			</excludes>
			<classpathDependencyExcludes>
			  <classpathDependencyExcludes>cat.gencat.ctti:canigo.security</classpathDependencyExcludes>
			</classpathDependencyExcludes>
                    </configuration>
                </execution>
                <execution>
                    <id>cat.gencat.ctti:canigo.security-test</id>
                    <phase>test</phase>
                    <goals>
                        <goal>test</goal>
                    </goals>
                    <configuration>
                        <dependenciesToScan>
                          <dependency>cat.gencat.ctti:canigo.security</dependency>
                        </dependenciesToScan>
			<excludes>
			  <exclude>%regex[${project.groupId}.*.*Test.*]</exclude>
			</excludes>
                    </configuration>
                </execution>
                ...
            </executions>
        </plugin>
		...
	</plugins>
	...
</build>	
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

Per provar l'autenticació per token s'ha de cridar a "http://<app>/api/auth" amb la capçalera GICAR, en cas d'autenticació per GICAR, o en el cos de la petició en format JSON en altres casos.
```
{ 
	username = user,
	password  = secret
} 
```
Aquesta crida ens retornarà un token vàlid. Per a les següents peticions s'ha d'enviar aquest token a la capçalera HTTP de la petició de la següent manera (configuració per defecte):

Authentication Bearer eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE0NzkyMzEzODMsInN1YiI6ImFkbWluIiwiYXV0aG9yaXRpZXMiOiJST0xFX0FETUlOLFJPTEVfVVNFUiJ9.jeApLoXyn4nrdp2iPRkjhoTWmzFNUYOkphnck0gmp1pLygOj1hgN1O1Ps86_jY6ZXaEhXl2Fk-o36SOMQAQGHA

Més endavant es mostra un exemple de configuració a Canigó de JWT + GICAR.

#### Publicació Controladors de Seguretat

Per defecte el mòdul de seguretat publica les api /auth i /login.

En cas de no voler publicar-les a la nostra aplicació s'hauria de condicionar la càrrega de Spring Boot de la següent manera:

Al fitxer de configuració de l'aplicació (AppConfig.java) afegir l'annotació @PropertySource al fitxer boot.properties que s'ha de crear:

	@Configuration
	@PropertySource("classpath:/config/props/boot.properties")
	@ImportResource({ "classpath:cat/gencat/ctti/canigo/arch/core/config/canigo-core.xml" })
	@EnableTransactionManagement
	public class AppConfig {
	}
	
Crear el fitxer /src/main/reources/config/props/boot.properties amb la propietat *publishAuthController* a false:

	publishAuthController=false


#### Configuració de l'autenticació

En la configuració de l'autenticació tindrem en consideració:

* Seleccionar el tipus de font contra la que es realitza l'autenticació (per arxiu de propietats, base de dades, LDAP, ...)
* Configurar el formulari d'autenticació web i la seqüència d'accions per realitzar l'autenticació.

Dins d'aquest mòdul trobem els següents proveidors de seguretat:

* Seguretat In-Memory
* Seguretat Base de dades
* Seguretat LDAP
* Seguretat GICAR

Els diferents proveidors comparteixen els següents arxius de configuració:

* security.properties: propietats del servei de seguretat
* app-custom-security.xml: arxiu XML amb la configuració de seguretat.
* SecurityConfig.java: classe Java amb la configuració de seguretat Web.
* security.users.properties: llistat en format pla dels usuaris/password/rols de l'aplicació per al proveïdor "InMemory".

La disposició dels arxius és la següent:

* Ubicació: <PROJECT_ROOT>/src/main/resources/config/props/security.users.properties
* Ubicació: <PROJECT_ROOT>/src/main/resources/spring/app-custom-security.xml
* Ubicació: <PROJECT_ROOT>/src/main/java/cat/gencat/nomapp/config/SecurityConfig.java
* Ubicació: <PROJECT_ROOT>/src/main/resources/config/props/security.properties

A continuació es mostra la classe SecurityConfig per a una configuració basada en GICAR amb token JWT en una aplicació Canigó:

```
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
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
	private DataSource dataSource;

	@Override
	protected void configure(final HttpSecurity http) throws Exception {

		http.authorizeRequests().antMatchers("/api/auth").permitAll().antMatchers("/images/*/**", "/css/*/**", "/js/*/**", "/fonts/*/**")
				.permitAll().antMatchers("/api/info/properties", "/api/info/modules").hasRole("ADMIN").antMatchers("/api/equipaments/**").hasRole("USER");

		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		http.exceptionHandling().authenticationEntryPoint(restAuthenticationEntryPoint);
		http.addFilterBefore(jwtAuthenticationFilter(), AbstractPreAuthenticatedProcessingFilter.class);

	}

	@Bean
	@Autowired
	public ProxyUsernamePasswordAuthenticationFilter proxyUsernamePasswordAuthenticationFilter() {
		final ProxyUsernamePasswordAuthenticationFilter proxyUsernamePasswordAuthenticationFilter = new ProxyUsernamePasswordAuthenticationFilter("/api/login",
				RequestMethod.POST.toString());
		proxyUsernamePasswordAuthenticationFilter.setSiteminderAuthentication(true);
		proxyUsernamePasswordAuthenticationFilter.setAuthenticationManager(authenticationManager);
		proxyUsernamePasswordAuthenticationFilter.setAuthenticationSuccessHandler(restAuthenticationSuccessHandler);
		return proxyUsernamePasswordAuthenticationFilter;
	}

	@Bean
	public AuthenticationProvider gicarProvider() {
		final SiteminderAuthenticationProvider siteminderAuthenticationProvider = new SiteminderAuthenticationProvider();
		siteminderAuthenticationProvider.setUserDetailsService(gicarUserDetailsService());
		return siteminderAuthenticationProvider;
	}

	@Bean
	@Primary
	public UserDetailsService gicarUserDetailsService() {
		final GICARUserDetailsServiceImpl gicarUserDetailsService = new GICARUserDetailsServiceImpl();
		gicarUserDetailsService.setHttpGicarHeaderUsernameKey(getHttpGicarHeaderUsernameKey());
		gicarUserDetailsService.setAuthoritiesDAO(authoritiesDAO());
		return gicarUserDetailsService;
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
		auth.authenticationProvider(gicarProvider());
	}

	@Bean
	@Autowired
	public AuthenticationManager authenticationManager(final AuthenticationManagerBuilder auth) {
		return auth.getOrBuild();
	}

	@Bean
	@Named("jwtAuthenticationService")
	public AuthenticationService jwtAuthenticationService() {
		final JwtAuthenticationService JwtAuthenticationService = new JwtAuthenticationService();
		JwtAuthenticationService.setSiteminderAuthentication(getSiteminderAuthentication());
		JwtAuthenticationService.setTokenResponseHeaderName(getTokenResponseHeaderName());
		JwtAuthenticationService.setHeaderAuthName(getHeaderAuthName());

		return JwtAuthenticationService;
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

	private boolean getSiteminderAuthentication() {
		final Boolean siteminder = new Boolean(propertiesConfiguration.getProperty("jwt.siteminderAuthentication"));
		return siteminder != null ? siteminder : false;
	}

	private String getHttpGicarHeaderUsernameKey() {
		final String gicarHeader = propertiesConfiguration.getProperty("security.gicar.httpGicarHeaderUsernameKey");
		return gicarHeader != null ? gicarHeader : "NIF";
	}
}
```



#### Configuració de la font d'autorització per base de dades

Per a configurar la font d'autorització mitjançant base de dades és necessari:

* Configurar l'arxiu de propietats security.properties.
* Conigurar el proveïdor de seguretat dins de la configuració de seguretat de Spring.

Els dos arxius es generen i configuren de manera automàtica mitjançant l'eina de desenvolupament.

Les propietats de l'arxiu security.properties son les següents:

Propietat                    | Requerit | Descripció
---------------------------- | -------- | ----------------------------------------------------------
*.security.database.jndiName | Si       | Nom JNDI d'accés a la BD. Obligatori per a connexions JNDI
*.security.database.url      | Si       | URL de connexió a la base de dades
*.security.database.username | Si       | Usuari de connexió a la base de dades
*.security.database.password | Si       | Password de connexió a la base de dades

La configuració del provider en app-custom-security.xml per aquest proveidor és la següent:

* Afegim el provider al authentication manager.
* Afegim el tipus de codificador de password per tal de comparar el password de base de dades i el que ens ha proporcionat l'usuari de l'aplicació. Aquest codificador suporta: plaintext, sha, sha-256, md5, md4, ssha. Si en la base de dades tenim emmagatzemat els password d'usuari en md5, i marquem "password-encode" com a md5, de manera automàtica, el password proporcionat per l'usuari via formulari de login (j_password) es codificarà en md5 per posteriorment ser comparat amb el emmagatzemat a la base de dades.

```
<security:authentication-manager>
	<security:authentication-provider>
                <security:password-encoder hash="plaintext"/>
		<security:jdbc-user-service data-source-ref="dataSource"/>
	</security:authentication-provider>
</security:authentication-manager>
```

<div class="message warning">
Accés base de dades

L'eina de suport al desenvolupament automatitza la instal- lació del mòdul de persistència si aquest no ha estat instal- lat prèviament pel desenvolupador.
</div>

#### Configuració de l'Autorització per LDAP

Per a configurar l'acces a LDAP és necessari:

* Configurar l'arxiu de propietats security.properties.
* Conigurar el proveidor de seguretat dins de la configuració de seguretat de Spring.

Els dos arxius es generen i configuren de manera automàtica mitjançant l'eina de desenvolupament.

Les propietats de l'arxiu security.properties son les següents:

Propietat                           | Requerit | Descripció
----------------------------------- | -------- | -----------------------------------------------------------------------
*.security.ldap.url                 | Si       | Direcció del servidor ldap separat amb dos punts ":" del port
*.security.ldap.manager.dn          | Sí       | Identificador de l'usuari administrador del LDAP
*.security.ldap.manager.password    | Si       | Password del l'usuari administrador del LDAP
*.security.ldap.user.search.filter  | No       | Filtre de cerca dels usuaris dintre de l'estructura del LDAP. Per defecte: (uid={0})
*.security.ldap.user.search.base    | Si       | String base de la ubicació dels usuaris dintre de l'estructura del LDAP
*.security.ldap.group.search.base   | Si       | String base de la ubicació dels grups dintre de l'estructura del LDAP
*.security.ldap.group.search.filter | No       | Filtre de cerca dels grups dintre de l'estructura del LDAP. Per defecte: (cn={0})

Per a realitzar les proves en desenvolupament podem instal- lar un servidor LDAP senzill (veure l'apartat 'Eines de Suport' per a més referència).

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

#### Configuració de l'Autorització per arxiu de propietats

Aquest proveidor de seguretat es recolça en un arxiu de propietats per carregar en memòria els usuaris/password/rols de l'aplicació.

Per a configurar l'acces mitjançant un arxiu de propietats és necessari:

* Configurar l'arxiu de propietats **security.users.properties**.
* Conigurar el proveidor de seguretat dins de la configuració de seguretat de Spring (**app-custom-security.xml**).

L'arxiu que conté aquesta configuració **security.users.properties** te el següent format:

    username=password,grantedAuthority[,grantedAuthority][,enabled|disabled]

Exemple de configuració:

```
user=password,ROLE_USER,enabled
admin=password,ROLE_USER,ROLE_ADMIN,enabled
```

#### Configuració del provider en **app-custom-security.xml**:

* Afegim el provider al authentication manager.
* Afegim el tipus de codificador de password per tal de comparar el password de l'arxiu de propietats i el que ens ha proporcionat l'usuari de l'aplicació. Aquest codificador suporta: plaintext, sha, sha-256, md5, md4, ssha.

```
<security:authentication-manager>
	<security:authentication-provider>
		<security:password-encoder hash="plaintext"/>
		<security:user-service properties="classpath:/config/props/security.users.properties"/>
	</security:authentication-provider>
</security:authentication-manager>
```

#### Configuració de la Font d'Autorització per GICAR

Per a configurar l'accés a GICAR és necessari:

* Configurar l'arxiu de propietats **security.properties**.
* Configurar el proveidor de seguretat dins de la configuració de seguretat de Spring.

Els dos arxius es generen i configuren de manera automàtica mitjançant l'eina de desenvolupament:

Les propietats de l'arxiu **security.properties** son les següents:

Per a configurar l'acces a GICAR és necessari configurar l'arxiu de propietats **security.properties**. Aquest arxiu es genera automàticament des de l'eina de suport, i té el següent format:

Propietat                                   | Requerit | Descripció
------------------------------------------- | -------- | -----------------------------------
*.security.gicar.httpGicarHeaderUsernameKey | No       | Aquesta propietat indica quin és el camp de la capçalera HTTP_GICAR que conté el nom de l'usuari autenticat a GICAR. Per defecte: NIF

Des de la versió 1.2.7 el servei de seguretat de Canigó suporta de manera automàtica la capçalera `HTTP_GICAR_PSIS` per autenticació amb certificats per usuaris que no estan en el DC (Autenticació Anònima), utilitzant-se com a font de dades alternativa per a tasques d'autententicació.
A la pàgina del [Servei d'autenticació anònima amb GICAR](https://canigo.ctti.gencat.cat/gicar-integracio/auth-anonima/) es pot trobar informació detallada d'aquesta capçalera.

A continuació es mostra la classe SecurityConfig per a una configuració basada en GICAR sense utilitzar JWT com a sistema d'autenticació.

```
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
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
	private DataSource dataSource;

	@Override
	protected void configure(final HttpSecurity http) throws Exception {

		http.authorizeRequests().antMatchers("/api/auth").permitAll().antMatchers("/images/*/**", "/css/*/**", "/js/*/**", "/fonts/*/**").permitAll()
				.antMatchers("/api/info/properties", "/api/info/modules").hasRole("ADMIN").antMatchers("/api/equipaments/**").hasRole("USER");
        http.exceptionHandling().authenticationEntryPoint(restAuthenticationEntryPoint);
		http.addFilterBefore(proxyUsernamePasswordAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
		
	}
	
	@Override
	@Autowired
	protected void configure(final AuthenticationManagerBuilder auth) throws Exception {
		auth.authenticationProvider(gicarProvider());
	}

	@Bean
	@Autowired
	public ProxyUsernamePasswordAuthenticationFilter proxyUsernamePasswordAuthenticationFilter() {
		final ProxyUsernamePasswordAuthenticationFilter proxyUsernamePasswordAuthenticationFilter = new ProxyUsernamePasswordAuthenticationFilter("/api/login",
				RequestMethod.POST.toString());
		proxyUsernamePasswordAuthenticationFilter.setSiteminderAuthentication(true);
		proxyUsernamePasswordAuthenticationFilter.setAuthenticationManager(authenticationManager);
		proxyUsernamePasswordAuthenticationFilter.setAuthenticationSuccessHandler(restAuthenticationSuccessHandler);
		return proxyUsernamePasswordAuthenticationFilter;
	}

	@Bean
	public AuthenticationProvider gicarProvider() {
		final SiteminderAuthenticationProvider siteminderAuthenticationProvider = new SiteminderAuthenticationProvider();
		siteminderAuthenticationProvider.setUserDetailsService(gicarUserDetailsService());
		return siteminderAuthenticationProvider;
	}

	@Bean
	@Primary
	public UserDetailsService gicarUserDetailsService() {
		final GICARUserDetailsServiceImpl gicarUserDetailsService = new GICARUserDetailsServiceImpl();
		gicarUserDetailsService.setHttpGicarHeaderUsernameKey(getHttpGicarHeaderUsernameKey());
		gicarUserDetailsService.setAuthoritiesDAO(authoritiesDAO());
		return gicarUserDetailsService;
	}

	@Bean
	public AuthoritiesDAO authoritiesDAO() {
		final AuthoritiesDAOImpl authoritiesDAOImpl = new AuthoritiesDAOImpl();
		authoritiesDAOImpl.setDataSource(dataSource);
		return authoritiesDAOImpl;
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
}

```

Amb aquesta configuració ha de ser possible autoritzar un usuari que prèviament ha estat auntenticat en el servei de GICAR. Per aquest motiu és necessari rebre certes dades referents a aquesta autenticació ja realitzada. A la capçalera HTML podrem accedir a aquestes dades:

```
HTTP_GICAR=CODIINTERN=NRDRJN0001;NIF=11112222W;EMAIL=mail.admin@gencat.net;UNITAT_MAJOR=CTTI;
UNITAT_MENOR=CTTI Qualitat
```

On CODIINTERN és el codi intern, el NIF el NIF, EMAIL l'adreça de correu electrònic registrada al Director Corporatiu, UNITAT_MAJOR és l'organització i UNITAT_MENOR és la unitat.

<div class="message warning">
En cas de que l'aplicació utilitzi la separació entre codi estàtic i dinàmic és necessari indicar la següent propietat dintre del bean proxyUsernamePasswordAuthenticationFilter:
<br><br>

<b>&lt;property name="filterProcessesUrl" value="/AppJava/j_spring_security_check" /&gt;</b>

</div>

**Logout**

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

* Obrir una pantalla "DOS command", anar a la carpeta on hem instal- lat el programa i arrancar openLDAP amb la comanda

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

Obrir una altra pantalla "DOS command", anar a la carpeta on hem instal- lat el programa i importar les dades amb la comanda:

```
ldapadd -x -D "cn=Manager,dc=mycompany,dc=com" -W -f setup.ldif
```

La contrasenya per defecte és "secret".

### Jxplorer

Comprovarem que la importació de dades ha funcionat amb Jxplorer, un client LDAP Java i opensource.

* Baixar Jxplorer a la url http://sourceforge.net/projects/jxplorer/ i instal- lar-ho
* Prémer el botó per a connectar-se al nostre directori LDAP.

La contrasenya per defecte és "secret". La pantalla següent mostra els valors de la diferents paràmetres:

![Configuració paràmetres JXplorer](/related/canigo/documentacio/modul-seguretat/ServeiSeguretat_img013.jpg.gif)

Si tot ha funcionat bé, hauríem de veure la pantalla següent:

![Resultat JXplorer](/related/canigo/documentacio/modul-seguretat/ServeiSeguretat_img014.jpg.gif)

