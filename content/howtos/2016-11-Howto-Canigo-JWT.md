+++
date        = "2016-11-30"
title       = "Autenticació amb JWT a una aplicació Canigó 3.1"
description = "Autenticació amb JWT a una aplicació Canigó 3.1"
section     = "howtos"
categories  = ["canigo"]
key         = "DESEMBRE2016"
+++

### A qui va dirigit

Aquest how-to va dirigit a tots aquells desenvolupadors/arquitectes que vulguin autenticar amb JWT a una aplicació Canigó 3.1 (REST+HTML5/JS).

### Versió de Canigó

Els pasos descrits en aquest document apliquen a la versió 3.1.x del Framework Canigó.

### Introducció

En aquest HowTo s’explica com autenticar amb  JWT a una aplicació Canigó 3.1 REST. Per a fer-ho desplegarem l’aplicació demo que genera el plugin de Canigó amb seguretat per BBDD (amb una base de dades H2 en memòria).


## Configuració

### Afegir Llibreries

S'ha d'afegir al pom.xml la dependència a JWT

   	<!-- JJWT -->
	<dependency>
		<groupId>io.jsonwebtoken</groupId>
		<artifactId>jjwt</artifactId>
		<version>0.7.0</version>
	</dependency>
	
### Configuració Petició/Resposta

Per configurar el JWT primer de tot creem les classes per gestionar la petició, la resposta, i el handler de la resposta:

Al path *src/main/java/cata/gencat/canigorest311/security/authentication/dto* generem les següents classes:

**AuthenticationRequestDto.java**, per a la petició:

	package cat.gencat.canigorest311.security.authentication.dto;

	import java.io.Serializable;

	public class AuthenticationRequestDto implements Serializable {

		private static final long serialVersionUID = 3237170924587387745L;

		private String username;
		private String password;

		public AuthenticationRequestDto() {
			super();
		}

		public AuthenticationRequestDto(final String username, final String password) {
			this.setUsername(username);
			this.setPassword(password);
		}

		public String getUsername() {
			return username;
		}

		public void setUsername(final String username) {
			this.username = username;
		}

		public String getPassword() {
			return password;
		}

		public void setPassword(final String password) {
			this.password = password;
		}
	}

**AuthenticationResponseDto.java**, per a la respsota

	package cat.gencat.canigorest311.security.authentication.dto;

	import java.io.Serializable;

	public class AuthenticationResponseDto implements Serializable {

		private static final long serialVersionUID = -576643360234236041L;

		private final int code;

		public AuthenticationResponseDto(final int code) {
			this.code = code;
		}

		public int getCode() {
			return code;
		}
	}

**JwtAuthenticationResponseDto.java**, per al token

	package cat.gencat.canigorest311.security.authentication.dto;

	import java.io.Serializable;

	public class JwtAuthenticationResponseDto implements Serializable {

		private static final long serialVersionUID = -5766433606831683041L;
		private final String token;

		public JwtAuthenticationResponseDto(final String token) {
			this.token = token;
		}

		public String getToken() {
			return token;
		}
	}
	
Al path *src/main/java/cata/gencat/canigorest311/security/authentication/response* generem les classes utilitzades a la resposta:

**ResponseRest.java**

	package cat.gencat.canigorest311.security.authentication.response;

	import java.io.Serializable;

	public class ResponseRest implements Serializable {
		/**
		 *
		 */
		private static final long serialVersionUID = -89237367748293773L;
		private int code;
		private String message;

		public ResponseRest() {
			super();

		}

		public ResponseRest(final int code, final String message) {
			super();
			this.code = code;
			this.message = message;
		}

		public int getCode() {
			return code;
		}

		public void setCode(final int code) {
			this.code = code;
		}

		public String getMessage() {
			return message;
		}

		public void setMessage(final String message) {
			this.message = message;
		}
	}

**ResponseRestOk.java**

	package cat.gencat.canigorest311.security.authentication.response;

	public class ResponseRestOK extends ResponseRest {

		private static final long serialVersionUID = -234121341241231L;

		public ResponseRestOK() {
			super();
		}

		public ResponseRestOK(final int code, final String message) {
			super(code, message);

		}

	}

**ResponseRestError.java**

	package cat.gencat.canigorest311.security.authentication.response;

	public class ResponseRestError extends ResponseRest {

		private static final long serialVersionUID = -12141241223455L;

		public ResponseRestError() {
			super();
		}

		public ResponseRestError(final int code, final String message) {
			super(code, message);

		}

	}
	
Al path *src/main/java/cata/gencat/canigorest311/security/authentication/handler* generem les classes utilitzades per a construir la reposta:

**RestAuthenticationFailureHandler.java**

	package cat.gencat.canigorest311.security.authentication.handler;

	import java.io.IOException;
	import java.io.PrintWriter;

	import javax.servlet.ServletException;
	import javax.servlet.http.HttpServletRequest;
	import javax.servlet.http.HttpServletResponse;

	import org.springframework.http.MediaType;
	import org.springframework.security.core.AuthenticationException;
	import org.springframework.security.web.authentication.AuthenticationFailureHandler;
	import org.springframework.stereotype.Component;

	import com.fasterxml.jackson.databind.ObjectMapper;

	import cat.gencat.canigorest311.security.authentication.response.ResponseRestError;

	@Component("restAuthenticationFailureHandler")
	public class RestAuthenticationFailureHandler implements AuthenticationFailureHandler {

		@Override
		public void onAuthenticationFailure(final HttpServletRequest request, final HttpServletResponse response, final AuthenticationException exception)
				throws IOException, ServletException {
			builJsonResponse(response);

		}

		private void builJsonResponse(final HttpServletResponse response) throws IOException {
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			response.setContentType(MediaType.APPLICATION_JSON.toString());

			final ObjectMapper mapper = new ObjectMapper();
			final ResponseRestError error = new ResponseRestError(HttpServletResponse.SC_UNAUTHORIZED, "401. Unauthorized");
			final String json = mapper.writeValueAsString(error);
			final PrintWriter writer = response.getWriter();
			writer.write(json);
			writer.flush();
			writer.close();
		}
	}
	
**RestAuthenticationSuccessHandler.java**

	package cat.gencat.canigorest311.security.authentication.handler;

	import java.io.IOException;
	import java.io.PrintWriter;

	import javax.servlet.ServletException;
	import javax.servlet.http.HttpServletRequest;
	import javax.servlet.http.HttpServletResponse;

	import org.springframework.http.MediaType;
	import org.springframework.security.core.Authentication;
	import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
	import org.springframework.stereotype.Component;

	import com.fasterxml.jackson.databind.ObjectMapper;

	import cat.gencat.canigorest311.security.authentication.response.ResponseRestOK;

	@Component("restAuthenticationSuccessHandler")
	public class RestAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

		@Override
		public void onAuthenticationSuccess(final HttpServletRequest request, final HttpServletResponse response, final Authentication authentication)
				throws IOException, ServletException {
			// We do not need to do anything extra on REST login success, because there is no page to redirect to
			builJsonResponse(response);
		}

		private void builJsonResponse(final HttpServletResponse response) throws IOException {
			response.setStatus(HttpServletResponse.SC_OK);
			response.setContentType(MediaType.APPLICATION_JSON.toString());

			final ObjectMapper mapper = new ObjectMapper();
			final ResponseRestOK error = new ResponseRestOK(HttpServletResponse.SC_OK, "200. Login Sucess");
			final String json = mapper.writeValueAsString(error);
			final PrintWriter writer = response.getWriter();
			writer.write(json);
			writer.flush();
			writer.close();
		}

	}

### Configuració JWT

#### Handler del token

Classe que s'utilitza per a obtenir la informació del token (username, authorities):

Al path *src/main/java/cata/gencat/canigorest311/security/authentication/jwt*

**JwtTokenHandler.java**

	package cat.gencat.canigorest311.security.authentication.jwt;

	import java.util.Date;
	import java.util.HashMap;
	import java.util.Map;

	import javax.annotation.PostConstruct;

	import org.apache.commons.lang3.StringUtils;
	import org.apache.commons.logging.Log;
	import org.apache.commons.logging.LogFactory;
	import org.springframework.security.core.authority.AuthorityUtils;
	import org.springframework.security.core.userdetails.User;
	import org.springframework.security.core.userdetails.UserDetails;
	import org.springframework.util.Assert;

	import io.jsonwebtoken.Claims;
	import io.jsonwebtoken.Jwts;
	import io.jsonwebtoken.SignatureAlgorithm;

	public class JwtTokenHandler {

		private static final Log logger = LogFactory.getLog(JwtAuthenticationFilter.class);

		public static final String SECRET_PASSWORD = "***";
		public static final String CLAIM_KEY_USERNAME = "sub";
		public static final String CLAIM_KEY_AUTHORITIES = "authorities";

		private String secret;

		private Long expiration;

		public UserDetails getUserFromToken(final String token) {
			UserDetails user;
			try {
				final Claims claims = getClaimsFromToken(token);
				final String userName = claims.get(CLAIM_KEY_USERNAME, String.class);
				final String authorityes = claims.get(CLAIM_KEY_AUTHORITIES, String.class);

				user = buildUserDetails(userName, authorityes);
			} catch (final Exception e) {
				logger.error("Error getting user from token. Token is invalid?", e);
				user = null;
			}
			return user;
		}

		public String getUsernameFromToken(final String token) {
			String username;
			try {
				final Claims claims = getClaimsFromToken(token);
				username = claims.getSubject();
			} catch (final Exception e) {
				logger.error("Error getting userName from token. Token is invalid?", e);
				username = null;
			}
			return username;
		}

		public Date getExpirationDateFromToken(final String token) {
			Date expiration;
			try {
				final Claims claims = getClaimsFromToken(token);
				expiration = claims.getExpiration();
			} catch (final Exception e) {
				logger.error("Error getting expiration date from token. Token is invalid?", e);
				expiration = null;
			}
			return expiration;
		}

		public String generateToken(final UserDetails userDetails) {
			final Map<String, Object> claims = new HashMap<>();
			claims.put(CLAIM_KEY_USERNAME, userDetails.getUsername());
			claims.put(CLAIM_KEY_AUTHORITIES, StringUtils.join(userDetails.getAuthorities(), ','));
			return generateToken(claims);
		}

		public String generateToken(final Map<String, Object> claims) {
			return Jwts.builder().setClaims(claims).setExpiration(generateExpirationDate()).signWith(SignatureAlgorithm.HS512, secret).compact();
		}

		public Boolean canTokenBeRefreshed(final String token) {
			return !isTokenExpired(token) || ignoreTokenExpiration();
		}

		public String refreshToken(final String token) {
			String refreshedToken;
			try {
				final Claims claims = getClaimsFromToken(token);
				refreshedToken = generateToken(claims);
			} catch (final Exception e) {
				logger.error("Error refreshing token. Token is invalid?", e);
				refreshedToken = null;
			}
			return refreshedToken;
		}

		public Boolean validateToken(final String token) {
			return !isTokenExpired(token);
		}

		protected Boolean ignoreTokenExpiration() {
			return false;
		}

		private Claims getClaimsFromToken(final String token) {
			Claims claims;
			try {
				claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
			} catch (final Exception e) {
				logger.error("Error getting claimsfrom token. Token is invalid?", e);
				claims = null;
			}
			return claims;
		}

		private Date generateExpirationDate() {
			return new Date(System.currentTimeMillis() + expiration * 1000);
		}

		private Boolean isTokenExpired(final String token) {
			final Date expiration = getExpirationDateFromToken(token);
			return expiration.before(new Date());
		}

		private UserDetails buildUserDetails(final String userName, final String authorityes) {
			return new User(userName, SECRET_PASSWORD,
					StringUtils.isEmpty(authorityes) ? AuthorityUtils.NO_AUTHORITIES : AuthorityUtils.commaSeparatedStringToAuthorityList(authorityes));
		}

		@PostConstruct
		private void assertAfterPropertySet() {
			Assert.hasLength(secret, "Secret (jwt.secret property) for JWT must not be null or empty!");
			Assert.notNull(expiration, "expiration (jwt.expiration property) for JWT must not be null!");
			Assert.state(expiration > 0, "expiration (jwt.expiration property) for JWT must not be less than 0!");

		}

		public String getSecret() {
			return secret;
		}

		public void setSecret(final String secret) {
			this.secret = secret;
		}

		public Long getExpiration() {
			return expiration;
		}

		public void setExpiration(final Long expiration) {
			this.expiration = expiration;
		}

	}

#### Entrypoint

Hem de generar la classe que indicarem a la configuració com a punt d'entrada de l'autenticació:

Al path *src/main/java/cata/gencat/canigorest311/security/authentication/entrypoint* generem la classe **RestAuthenticationEntrypoint.java**

	package cat.gencat.canigorest311.security.authentication.entrypoint;

	import java.io.IOException;
	import java.io.PrintWriter;

	import javax.servlet.http.HttpServletRequest;
	import javax.servlet.http.HttpServletResponse;

	import org.springframework.http.MediaType;
	import org.springframework.security.core.AuthenticationException;
	import org.springframework.security.web.AuthenticationEntryPoint;
	import org.springframework.stereotype.Component;

	import com.fasterxml.jackson.core.JsonProcessingException;
	import com.fasterxml.jackson.databind.ObjectMapper;

	import cat.gencat.canigorest311.security.authentication.response.ResponseRestError;

	@Component("restAuthenticationEntryPoint")
	public class RestAuthenticationEntryPoint implements AuthenticationEntryPoint {

		@Override
		public void commence(final HttpServletRequest request, final HttpServletResponse response, final AuthenticationException authException) throws IOException {
			// This is invoked when user tries to access a secured REST resource without supplying any credentials
			// We should just send a 401 Unauthorized response because there is no 'login page' to redirect to
			final ResponseRestError error = new ResponseRestError(HttpServletResponse.SC_UNAUTHORIZED, "401. Unauthorized");
			builJsonResponse(response, error);
		}

		private void builJsonResponse(final HttpServletResponse response, final ResponseRestError error) throws JsonProcessingException, IOException {
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			response.setContentType(MediaType.APPLICATION_JSON.toString());

			final ObjectMapper mapper = new ObjectMapper();
			final String json = mapper.writeValueAsString(error);
			final PrintWriter writer = response.getWriter();
			writer.write(json);
			writer.flush();
			writer.close();
		}
	}
	
#### Controlador de l'autenticació

A l'exemple hem generat un controlador (/auth) com a servei que hauria de cridar el login.

Al path *src/main/java/cata/gencat/canigorest311/security/authentication/controller* generem la classe **AuthController.java**

	package cat.gencat.canigorest311.security.authentication.controller;

	import javax.servlet.http.HttpServletRequest;
	import javax.servlet.http.HttpServletResponse;

	import org.springframework.beans.factory.annotation.Autowired;
	import org.springframework.beans.factory.annotation.Qualifier;
	import org.springframework.http.MediaType;
	import org.springframework.security.core.Authentication;
	import org.springframework.security.core.userdetails.User;
	import org.springframework.web.bind.annotation.RequestBody;
	import org.springframework.web.bind.annotation.RequestMapping;
	import org.springframework.web.bind.annotation.RequestMethod;
	import org.springframework.web.bind.annotation.RestController;

	import cat.gencat.canigorest311.security.authentication.dto.AuthenticationRequestDto;
	import cat.gencat.canigorest311.security.authentication.dto.JwtAuthenticationResponseDto;
	import cat.gencat.canigorest311.security.authentication.jwt.JwtTokenHandler;
	import cat.gencat.canigorest311.security.authentication.service.AuthenticationService;
	import cat.gencat.canigorest311.security.authentication.service.impl.DefaultAuthenticationService;

	@RestController
	public class AuthController {

		@Autowired(required = false)
		@Qualifier("jwtAuthenticationService")
		private AuthenticationService jwtAuthenticationService;

		@Autowired(required = false)
		private JwtTokenHandler jwtTokenHandler;

		@RequestMapping(value = "/auth", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
		public JwtAuthenticationResponseDto getAuthToken(final HttpServletRequest request, final HttpServletResponse response,
				@RequestBody(required = false) final AuthenticationRequestDto jwtAuthenticationRequestDto) {

			if (jwtAuthenticationRequestDto != null) {
				request.setAttribute(DefaultAuthenticationService.SPRING_SECURITY_FORM_USERNAME_KEY, jwtAuthenticationRequestDto.getUsername());
				request.setAttribute(DefaultAuthenticationService.SPRING_SECURITY_FORM_PASSWORD_KEY, jwtAuthenticationRequestDto.getPassword());

			}
			final Authentication authentication = jwtAuthenticationService.authenticate(request, response);
			final String token = jwtTokenHandler.generateToken((User) authentication.getPrincipal());

			return new JwtAuthenticationResponseDto(token);

		}

	}
	
#### Autenticació

En aquest exemple només hem implementat el provider de l'autenticació per defecte (DefaultAuthenticationService), si l'aplicació estiguès protegida per un altre provider (per exemple GICAR), s'hauria d'implementar un GicarAuthenticationService (per exemple) per a realitzar l'autenticació per GICAR.

Al path *src/main/java/cata/gencat/canigorest311/security/authentication/service*

**AuthenticationService.java**

	package cat.gencat.canigorest311.security.authentication.service;

	import javax.servlet.http.HttpServletRequest;
	import javax.servlet.http.HttpServletResponse;

	import org.springframework.security.core.Authentication;

	public interface AuthenticationService {
		Authentication authenticate(final HttpServletRequest request, final HttpServletResponse response);

		boolean isAuthRequest(HttpServletRequest request);
}

Al path *src/main/java/cata/gencat/canigorest311/security/authentication/service/impl*

**DefaultAuthenticationService.java**

	package cat.gencat.canigorest311.security.authentication.service.impl;

	import javax.servlet.http.HttpServletRequest;
	import javax.servlet.http.HttpServletResponse;

	import org.apache.commons.lang3.StringUtils;
	import org.springframework.beans.factory.annotation.Autowired;
	import org.springframework.context.annotation.Lazy;
	import org.springframework.security.authentication.AuthenticationManager;
	import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
	import org.springframework.security.core.Authentication;
	import org.springframework.stereotype.Component;

	import cat.gencat.canigorest311.security.authentication.service.AuthenticationService;

	@Component("defaultAuthenticationService")
	public class DefaultAuthenticationService implements AuthenticationService {

		public static final String SPRING_SECURITY_FORM_USERNAME_KEY = "username";
		public static final String SPRING_SECURITY_FORM_PASSWORD_KEY = "password";

		private String usernameParameter = SPRING_SECURITY_FORM_USERNAME_KEY;
		private String passwordParameter = SPRING_SECURITY_FORM_PASSWORD_KEY;

		@Autowired
		@Lazy
		private AuthenticationManager authenticationManager;

		@Override
		public Authentication authenticate(final HttpServletRequest request, final HttpServletResponse response) {
			final String username = obtainUsername(request);
			final String password = obtainPassword(request);

			final UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(username, password);

			return authenticationManager.authenticate(authRequest);
		}

		protected String obtainUsername(final HttpServletRequest request) {
			final String username = request.getParameter(usernameParameter);
			return StringUtils.isEmpty(username) ? "" : username.trim();
		}

		protected String obtainPassword(final HttpServletRequest request) {
			final String password = request.getParameter(passwordParameter);
			return StringUtils.isEmpty(password) ? "" : password;
		}

		@Override
		public boolean isAuthRequest(final HttpServletRequest request) {
			return !StringUtils.isEmpty(obtainUsername(request)) && !StringUtils.isEmpty(obtainPassword(request));
		}

	}

**JwtAuthenticationService.java**

	package cat.gencat.canigorest311.security.authentication.service.impl;

	import javax.annotation.PostConstruct;
	import javax.servlet.http.HttpServletRequest;
	import javax.servlet.http.HttpServletResponse;

	import org.apache.commons.lang3.StringUtils;
	import org.apache.commons.logging.Log;
	import org.apache.commons.logging.LogFactory;
	import org.springframework.beans.factory.annotation.Autowired;
	import org.springframework.beans.factory.annotation.Qualifier;
	import org.springframework.context.annotation.Lazy;
	import org.springframework.security.authentication.AbstractAuthenticationToken;
	import org.springframework.security.core.Authentication;
	import org.springframework.security.core.context.SecurityContextHolder;
	import org.springframework.security.core.userdetails.User;
	import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;

	import cat.gencat.canigorest311.security.authentication.jwt.JwtAuthenticationFilter;
	import cat.gencat.canigorest311.security.authentication.jwt.JwtTokenHandler;
	import cat.gencat.canigorest311.security.authentication.service.AuthenticationService;
	import io.jsonwebtoken.lang.Assert;

	public class JwtAuthenticationService implements AuthenticationService {

		private static final Log logger = LogFactory.getLog(JwtAuthenticationFilter.class);

		private String headerAuthName;

		private String tokenResponseHeaderName;

		@Autowired
		@Lazy
		private JwtTokenHandler jwtTokenHandler;

		@Autowired
		@Qualifier("defaultAuthenticationService")
		@Lazy
		private AuthenticationService defaultAuthenticationService;

		@Override
		public Authentication authenticate(final HttpServletRequest request, final HttpServletResponse response) {
			logger.info("try Authenticate whith credentials.");
			final Authentication authentication = defaultAuthenticationService.authenticate(request, response);
			((AbstractAuthenticationToken) authentication).setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
			SecurityContextHolder.getContext().setAuthentication(authentication);
			response.setHeader(tokenResponseHeaderName, jwtTokenHandler.generateToken((User) authentication.getPrincipal()));
			logger.info("setting JWT token to response header. Authenticate user in Spring context.");
			return authentication;
		}

		@Override
		public boolean isAuthRequest(final HttpServletRequest request) {
			return (defaultAuthenticationService.isAuthRequest(request))
					|| !StringUtils.isEmpty(request.getHeader(headerAuthName));
		}

		public String getHeaderAuthName() {
			return headerAuthName;
		}

		public void setHeaderAuthName(final String headerAuthName) {
			this.headerAuthName = headerAuthName;
		}

		public String getTokenResponseHeaderName() {
			return tokenResponseHeaderName;
		}

		public void setTokenResponseHeaderName(final String tokenResponseHeaderName) {
			this.tokenResponseHeaderName = tokenResponseHeaderName;
		}

		public JwtTokenHandler getJwtTokenHandler() {
			return jwtTokenHandler;
		}

		public void setJwtTokenHandler(final JwtTokenHandler jwtTokenHandler) {
			this.jwtTokenHandler = jwtTokenHandler;
		}

		public AuthenticationService getDefaultAuthenticationService() {
			return defaultAuthenticationService;
		}

		public void setDefaultAuthenticationService(final AuthenticationService defaultAuthenticationService) {
			this.defaultAuthenticationService = defaultAuthenticationService;
		}

		@PostConstruct
		public void checkProperties() {
			Assert.hasLength(headerAuthName, "headerAuthName can't be null or empty!");
			Assert.hasLength(tokenResponseHeaderName, "tokenResponseHeaderName can't be null or empty!");
		}

	}

#### Filtre Autenticació

S'ha de crear un nou filtre per a comprovar a les url protegides si l'usuari es troba autenticat, i en cas contrari intentar l'autenticació:

	Al path *src/main/java/cata/gencat/canigorest311/security/authentication/jwt* generem la classe **JwtAuthenticationFilter.java**

	package cat.gencat.canigorest311.security.authentication.jwt;

	import java.io.IOException;

	import javax.annotation.PostConstruct;
	import javax.servlet.FilterChain;
	import javax.servlet.ServletException;
	import javax.servlet.http.HttpServletRequest;
	import javax.servlet.http.HttpServletResponse;

	import org.apache.commons.logging.Log;
	import org.apache.commons.logging.LogFactory;
	import org.springframework.beans.factory.annotation.Autowired;
	import org.springframework.beans.factory.annotation.Qualifier;
	import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
	import org.springframework.security.core.Authentication;
	import org.springframework.security.core.context.SecurityContextHolder;
	import org.springframework.security.core.userdetails.User;
	import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
	import org.springframework.web.filter.OncePerRequestFilter;

	import cat.gencat.canigorest311.security.authentication.service.AuthenticationService;
	import io.jsonwebtoken.lang.Assert;

	public class JwtAuthenticationFilter extends OncePerRequestFilter {

		private static final Log logger = LogFactory.getLog(JwtAuthenticationFilter.class);

		private String headerAuthName;

		private String startToken;

		private String tokenResponseHeaderName;

		@Autowired
		private JwtTokenHandler jwtTokenHandler;

		@Autowired
		@Qualifier("jwtAuthenticationService")
		private AuthenticationService jwtAuthenticationService;

		@Override
		protected void doFilterInternal(final HttpServletRequest request, final HttpServletResponse response, final FilterChain chain)
				throws ServletException, IOException {

			if (requireDoFilter(request)) {

				final String header = request.getHeader(headerAuthName);

				if (header != null && header.startsWith(startToken)) {

					final String authToken = header.substring(7);
					final User user = (User) jwtTokenHandler.getUserFromToken(authToken);

					final Authentication authenticationSecurity = SecurityContextHolder.getContext().getAuthentication();
					if (authenticationSecurity == null) {
						if (user != null && jwtTokenHandler.validateToken(authToken)) {
							logger.info("token is valid, the user is autheticate correctly! setter response jwtToken");
							final UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
							authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
							SecurityContextHolder.getContext().setAuthentication(authentication);
							response.setHeader(tokenResponseHeaderName,
									jwtTokenHandler.canTokenBeRefreshed(authToken) ? jwtTokenHandler.refreshToken(authToken) : authToken);
						} else {
							logger.info("token is invalid or missing!");
						}
					} else {
						logger.info("The user was previous authenticate!");
					}

				} else {
					logger.info("attemp to default authentication: call --> wtAuthenticationService.authenticate");
					jwtAuthenticationService.authenticate(request, response);
				}
			} else {
				logger.info("The request:" + request.getPathInfo() + " has not info for authentication.");
			}

			chain.doFilter(request, response);

		}

		public String getHeaderAuthName() {
			return headerAuthName;
		}

		public void setHeaderAuthName(final String headerAuthName) {
			this.headerAuthName = headerAuthName;
		}

		public String getStartToken() {
			return startToken;
		}

		public void setStartToken(final String startToken) {
			this.startToken = startToken;
		}

		public String getTokenResponseHeaderName() {
			return tokenResponseHeaderName;
		}

		public void setTokenResponseHeaderName(final String tokenResponseHeaderName) {
			this.tokenResponseHeaderName = tokenResponseHeaderName;
		}

		public JwtTokenHandler getJwtTokenHandler() {
			return jwtTokenHandler;
		}

		public void setJwtTokenHandler(final JwtTokenHandler jwtTokenHandler) {
			this.jwtTokenHandler = jwtTokenHandler;
		}

		public AuthenticationService getJwtAuthenticationService() {
			return jwtAuthenticationService;
		}

		public void setJwtAuthenticationService(final AuthenticationService jwtAuthenticationService) {
			this.jwtAuthenticationService = jwtAuthenticationService;
		}

		@PostConstruct
		public void checkProperties() {
			Assert.hasLength(startToken, "startToken can't be null!");
			Assert.hasLength(headerAuthName, "headerAuthName can't be null or empty!");
			Assert.hasLength(tokenResponseHeaderName, "tokenResponseHeaderName can't be null or empty!");
		}

		private boolean requireDoFilter(final HttpServletRequest request) {
			return !isLoginRequest(request) && jwtAuthenticationService.isAuthRequest(request);

		}

		private boolean isLoginRequest(final HttpServletRequest request) {
			return request.getPathInfo() != null && request.getPathInfo().endsWith("/auth");
		}

	}
	
### Configuració Seguretat a Spring

Per a utilitzar la configuració de JWT que hem creat als punts anteriors, hem de realitzar la configuració al fitxer **app-custom-security.xml**

En aquest fitxer hem de fer que Spring tingui en compte el controlador creat:

	<context:component-scan base-package="cat.gencat.canigorest311.security" />
	
Declarar els beans de les noves classes creades:

	<bean name="jwtAuthenticationService" id="jwtAuthenticationService" class="cat.gencat.canigorest311.security.authentication.service.impl.JwtAuthenticationService">
		<property name="tokenResponseHeaderName" value="${jwt.tokenResponseHeaderName:jwtToken}" />
		<property name="headerAuthName" value="${jwt.header:Authentication}" />
	</bean>
	
	<bean name="jwtAuthenticationFilter" id="jwtAuthenticationFilter" class="cat.gencat.canigorest311.security.authentication.jwt.JwtAuthenticationFilter">
		<property name="startToken" value="${jwt.header.startToken:Bearer}" />
		<property name="tokenResponseHeaderName" value="${jwt.tokenResponseHeaderName:jwtToken}" />
		<property name="headerAuthName" value="${jwt.header:Authentication}" />
	</bean>
	
	<bean name="jwtTokenHandler" id="jwtTokenHandler" class="cat.gencat.canigorest311.security.authentication.jwt.JwtTokenHandler">
		<property name="expiration"	value="${jwt.expiration:3600L}" />
		<property name="secret"	value="${jwt.secret:canigo}" />
	</bean>
	
Declarar el punt d'entrada de la seguretat:

	<security:http use-expressions="true" create-session="stateless" entry-point-ref="restAuthenticationEntryPoint">
	
Declarar el filtre JWT:

	<security:custom-filter ref="jwtAuthenticationFilter" before="PRE_AUTH_FILTER" />
	
Amb aquests canvis el fitxer quedaria de la següent manera:

	<?xml version="1.0" encoding="UTF-8"?>
	<beans  xmlns="http://www.springframework.org/schema/beans"
			xmlns:security="http://www.springframework.org/schema/security"
			xmlns:context="http://www.springframework.org/schema/context"
		xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:jdbc="http://www.springframework.org/schema/jdbc"
			xsi:schemaLocation="http://www.springframework.org/schema/beans 	http://www.springframework.org/schema/beans/spring-beans-4.1.xsd
								http://www.springframework.org/schema/context 	http://www.springframework.org/schema/context/spring-context-4.1.xsd
								http://www.springframework.org/schema/security 	http://www.springframework.org/schema/security/spring-security-3.2.xsd
								http://www.springframework.org/schema/jdbc 		http://www.springframework.org/schema/jdbc/spring-jdbc-4.1.xs">

		<context:component-scan base-package="cat.gencat.canigorest311.security" />

		<bean name="jwtAuthenticationService" id="jwtAuthenticationService" class="cat.gencat.canigorest311.security.authentication.service.impl.JwtAuthenticationService">
			<property name="tokenResponseHeaderName" value="${jwt.tokenResponseHeaderName:jwtToken}" />
			<property name="headerAuthName" value="${jwt.header:Authentication}" />
		</bean>
		
		<bean name="jwtAuthenticationFilter" id="jwtAuthenticationFilter" class="cat.gencat.canigorest311.security.authentication.jwt.JwtAuthenticationFilter">
			<property name="startToken" value="${jwt.header.startToken:Bearer}" />
			<property name="tokenResponseHeaderName" value="${jwt.tokenResponseHeaderName:jwtToken}" />
			<property name="headerAuthName" value="${jwt.header:Authentication}" />
		</bean>
		
		<bean name="jwtTokenHandler" id="jwtTokenHandler" class="cat.gencat.canigorest311.security.authentication.jwt.JwtTokenHandler">
			<property name="expiration"	value="${jwt.expiration:3600L}" />
			<property name="secret"	value="${jwt.secret:canigo}" />
		</bean>

		<security:http pattern="/css/**" security="none" />
		<security:http pattern="/images/**" security="none" />
		<security:http pattern="/js/**" security="none" />

		<!-- Secure patterns -->
		<security:http use-expressions="true" create-session="stateless" entry-point-ref="restAuthenticationEntryPoint">
			<security:intercept-url pattern="/**" access="permitAll" method="OPTIONS" />
			<security:intercept-url pattern="/api/equipaments/**" access="hasRole('ROLE_ADMIN')" method="DELETE" />
			<security:intercept-url pattern="/api/equipaments/**" access="hasRole('ROLE_ADMIN')" method="GET" />
			<security:intercept-url pattern="/api/equipaments/**" access="hasRole('ROLE_ADMIN')" method="PUT" />
			<security:intercept-url pattern="/api/equipaments/**" access="hasRole('ROLE_ADMIN')" method="POST" />
			<security:intercept-url pattern="/api/logs/**" access="hasRole('ROLE_ADMIN')" />

			<security:form-login login-processing-url="/j_spring_security_check" login-page="/j_spring_security_check" />
			<security:custom-filter ref="jwtAuthenticationFilter" before="PRE_AUTH_FILTER" />
		</security:http>

		<security:authentication-manager alias="authenticationManager">	
			<!-- BBDD -->
			<security:authentication-provider>
				<security:jdbc-user-service data-source-ref="dataSource"/>
			</security:authentication-provider>
			
		</security:authentication-manager>

	</beans>
	
### Resultat

Amb aquesta configuració la primera vegada que un usuari vol accedir a l'aplicació hauria de proporcionar el usuari i password, i l'aplicació a la response retornarà un token:

	jwtToken:eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE0ODA2ODc0OTcsInN1YiI6ImFkbWluIiwiYXV0aG9yaXRpZXMiOiJST0xFX0FETUlOLFJPTEVfVVNFUiJ9.kmupP8B269D-SZemxkTdfdqYQ-vRMF3-nNtsWoi-bbDo5Wk38LbRYYf-sO3ceqZaYursfFIYyI0BR6keuko-4A
	
A partir d'aquí, l'aplicació ha d'enviar aquest token a la capçalera de les següents peticions:

	Nom: Authentication
	Valor: Bearer + token
	
Exemple

	Authentication: Bearer eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE0ODA2ODc0OTcsInN1YiI6ImFkbWluIiwiYXV0aG9yaXRpZXMiOiJST0xFX0FETUlOLFJPTEVfVVNFUiJ9.kmupP8B269D-SZemxkTdfdqYQ-vRMF3-nNtsWoi-bbDo5Wk38LbRYYf-sO3ceqZaYursfFIYyI0BR6keuko-4A
