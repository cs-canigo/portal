+++
date        = "2016-09-30"
title       = "Gestió global d'errors a una aplicació Canigó"
description = "How To de com gestionar els errors de forma global a una aplicació Canigó Rest."
sections    = ["Canigo", "howtos"]
categories  = ["canigo"]
key         = "NOVEMBRE2016"
+++

### A qui va dirigit

Aquest how-to va dirigit a tots aquells desenvolupadors/arquitectes que desenvolupin una aplicació REST amb Canigó 3.1 i vulguin gestionar els errors de forma global.

### Versió de Canigó

Els passos descrits en aquest document apliquen a la versió 3.1.x del Framework Canigó.

### Introducció

En aquest HowTo s’explica com gestionar els errors utilitzant @ControllerAdvice a una aplicació Canigó Canigó 3.1 REST. Per a fer-ho desplegarem l’aplicació demo que genera el plugin de Canigó i i afegirem la gestió d'errors.

Per a mostrar el funcionament de @ControllerAdvice crearem un MockController que llençi els errors, que seran capturats pel nostre ControllerAdvice i aquest retornarà un ResponseError amb el codi i missatge de l'error en qüestió. 

### Afegir Llibreries

En aquest how to es genera un handler per a excepcions del tipus AuthenticationException i AccessDeniedException del mòdul de seguretat de Spring, així que l'afegim al pom.xml de l'aplicació. 

Si la vostra aplicació ja utilitza el mòdul de seguretat de Canigó, aquesta dependència ja es trobarà a la vostra aplicació.

    <!-- SPRING SECURITY -->
	<dependency>
		<groupId>org.springframework.security</groupId>
		<artifactId>spring-security-core</artifactId>
		<version>${spring.security.version}</version>
	</dependency>
	
### Response Error

Primer de tot es crea l'objecte ResponseError, per a utilitzar-lo com a resposta d'error genèrica

En aquest howto s'ha creat al path cat.gencat.canigorest311.model.response:

	package cat.gencat.canigorest311.model.response;

	import java.io.Serializable;

	public class ResponseError implements Serializable {

		private static final long serialVersionUID = 3626211819197624092L;
		private int code;
		private String message;

		public ResponseError() {
			super();
		}

		public ResponseError(final int code, final String message) {
			super();
			this.code = code;
			this.message = message;
		}

		public int getCode() {
			return code;
		}

		public void setCode(int code) {
			this.code = code;
		}

		public String getMessage() {
			return message;
		}

		public void setMessage(String message) {
			this.message = message;
		}

	}

### Excepcions específiques

Cada aplicació pot tenir les seves exceptions específiques per tractar errors controlats a la seva lògica. Com a exemple en aquest howto es crea l'objecte ResourceNotFoundException, que s'utilitzaria en cas d'intentar accedir a un Resource de l'aplicació i no trobar-lo.

En aquest howto s'ha creat al path cat.gencat.canigorest311.model.exception:

	package cat.gencat.canigorest311.model.exception;

	public class ResourceNotFoundException extends RuntimeException {

		private static final long serialVersionUID = 354698655002619627L;

		private long resourceId;

		public ResourceNotFoundException(long resourceId) {
			this.setResourceId(resourceId);
		}

		public long getResourceId() {
			return resourceId;
		}

		public void setResourceId(long resourceId) {
			this.resourceId = resourceId;
		}
	}

### Handler per a les excepcions

Es crea l'objecte GlobalDefaultExceptionHandler per a gestionar totes les excepcions.

En aquest objecte es pot crear un Handler per a totes les excepcions que es dessitgin controlar, en aques howto es controlen les següents:
	- MultipartException
	- AuthenticationException
	- AccesDeniedException
	- ResourceNotFoundException (Aquesta és la que s'ha creat al punt anterior)
	- Exception (Per a controlar tots els errors no controlats)
	
Aquest objecte ha de tenir l'annotació @ControllerAdvice a nivell de classe.

	@ControllerAdvice
	public class GlobalDefaultExceptionHandler

Els mètodes que actuen com Handlers de les exceptions han de tenir el tag @ExceptionHandler amb la classe d'excepció que controlen.

	@ExceptionHandler(MultipartException.class)
	@ResponseStatus(value = HttpStatus.BAD_REQUEST)
	@ResponseBody
	public ResponseError defaultErrorHandlerMultipartException(final HttpServletRequest request, final HttpServletResponse response, final MultipartException e)
	
El fitxer resultant s'ha creat al path cat.gencat.canigorest311.service.exception.handler:

	package cat.gencat.canigorest311.service.exception.handler;

	import javax.servlet.http.HttpServletRequest;
	import javax.servlet.http.HttpServletResponse;

	import org.apache.commons.logging.Log;
	import org.apache.commons.logging.LogFactory;
	import org.springframework.http.HttpStatus;
	import org.springframework.security.access.AccessDeniedException;
	import org.springframework.security.core.AuthenticationException;
	import org.springframework.web.bind.annotation.ControllerAdvice;
	import org.springframework.web.bind.annotation.ExceptionHandler;
	import org.springframework.web.bind.annotation.ResponseBody;
	import org.springframework.web.bind.annotation.ResponseStatus;
	import org.springframework.web.multipart.MultipartException;

	import cat.gencat.canigorest311.model.exception.ResourceNotFoundException;
	import cat.gencat.canigorest311.model.response.ResponseError;

	@ControllerAdvice
	public class GlobalDefaultExceptionHandler {

		private static final Log LOGGER = LogFactory.getLog(GlobalDefaultExceptionHandler.class);

		private static final String RESOURCE_NOT_FOUND_MSG = "Resource no trobat";

		private static final String UNAUTHORIZED_MSG = "No es troba autoritzat per accedir a aquest recurs";

		private static final String MULTIPART_BAD_REQUEST_MSG = "Petició incorrecta";

		@ExceptionHandler(MultipartException.class)
		@ResponseStatus(value = HttpStatus.BAD_REQUEST)
		@ResponseBody
		public ResponseError defaultErrorHandlerMultipartException(final HttpServletRequest request, final HttpServletResponse response,
				final MultipartException e) {
			LOGGER.error(e.getMessage(), e);
			return new ResponseError(HttpStatus.BAD_REQUEST.value(), MULTIPART_BAD_REQUEST_MSG);
		}

		@ExceptionHandler(Exception.class)
		@ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
		@ResponseBody
		public ResponseError defaultErrorHandlerException(final HttpServletRequest request, final HttpServletResponse response, final Exception e) {
			LOGGER.error(e.getMessage(), e);
			return new ResponseError(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getLocalizedMessage());

		}

		@ExceptionHandler(value = { AuthenticationException.class, AccessDeniedException.class })
		@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
		@ResponseBody
		public ResponseError defaultErrorHandlerAuthenticationException(final Exception e) {
			LOGGER.error(e.getMessage(), e);
			return new ResponseError(HttpStatus.UNAUTHORIZED.value(), UNAUTHORIZED_MSG);

		}

		@ExceptionHandler(ResourceNotFoundException.class)
		@ResponseStatus(HttpStatus.NOT_FOUND)
		@ResponseBody
		public ResponseError resourceNotFound(final ResourceNotFoundException e) {
			final long resourceId = e.getResourceId();
			LOGGER.info("Resource Not Found idResource: " + resourceId);

			return new ResponseError(HttpStatus.NOT_FOUND.value(), RESOURCE_NOT_FOUND_MSG);
		}
	}


### Proves

Per a comprovar el funcionament es crea un MockController, el qual cridarem des de el navegador i llençarà una excepció que serà capturada pel nostre handler, GlobalDefaultExceptionHandler.

Ea crea al path cat.gencat.canigorest311.endpoints:

	package cat.gencat.canigorest311.endpoints;

	import org.springframework.http.MediaType;
	import org.springframework.web.bind.annotation.PathVariable;
	import org.springframework.web.bind.annotation.RequestMapping;
	import org.springframework.web.bind.annotation.RequestMethod;
	import org.springframework.web.bind.annotation.RestController;
	import cat.gencat.canigorest311.model.exception.ResourceNotFoundException;

	@RestController
	public class MockController {

		@RequestMapping(method = RequestMethod.GET, value = "/resource/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
		public void mockResourceNotFoundException(@PathVariable final long id) {
			throw new ResourceNotFoundException(id);
		}
	}

### Resultat

Una vegada desplegada l'aplicació, si fem la crida a "localhost:8081/CanigoRest311/api/resource/2" per pantalla es mostra l'objecte ResponseError:

{
code: 404,
message: "Resource no trobat"
} 
	