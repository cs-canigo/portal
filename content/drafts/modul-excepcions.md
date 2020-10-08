+++
date        = "2020-10-07"
title       = "Mòdul d'excepcions"
description = "Mòdul per a la gestió d'Errors"
sections    = "Canigó. Documentació versió 3.x"
weight      = 4
+++

## Propòsit

La gestió d'excepcions permet informar que s'ha produït un error al realitzar una petició. Aquest error podrà ser tractat adequadament i en cas necessari informar a l'usuari, llençar una traça, enviar un correu, etc.

La gestió correcta de les excepcions és molt important i crítica, però generalment la forma en la que es generen i gestionen les excepcions en les aplicacions és un dels aspectes més ignorats en el disseny de les mateixes. L'ús apropiat de les excepcions fa que els nostres aplicatius siguin més robusts, més fàcils de desenvolupar i mantenir, més lliures d'errors i més fàcils d'utilitzar. Per aquest motiu és important que donem el màxim de detall en les excepcions.

Per evitar l'ús innecessari de blocs 'try-catch' dins el codi dels nostres aplicatius, Canigó proporciona un mecanisme d'intercepció, pel qual indicarem quines excepcions volem tractar i quins gestors les tractaran sense haver d'incorporar cap referència a cap classe de l'aplicació.

## Glossari

## Instal.lació

El mòdul de configuració s'inclou per defecte dins del core de Canigó 3. Durant el procés de creació de l'aplicació, l'eina de suport al desenvolupament inclourà la referència dins del pom.xml. En cas d'una instal- lació manual afegir les següents línies al pom.xml de l'aplicació:

```
<canigo.core.version>[4.0.0,4.4.0)</canigo.core.version>
<canigo.web.rs.version>[1.2.0,1.3.0)</canigo.web.rs.version>

<dependency>
          <groupId>cat.gencat.ctti</groupId>
          <artifactId>canigo.core</artifactId>
          <version>${canigo.core.version}</version>
</dependency>

<dependency>
	<groupId>cat.gencat.ctti</groupId>
	<artifactId>canigo.web.rs</artifactId>
	<version>${canigo.web.rs.version}</version>
</dependency>
```

## Classes d'excepcions disponibles

Les classes disponibles i la seva jerarquia són:

![Imatge de les Excepcions Definides](/related/canigo/documentacio/modul-excepcions/jerarquia_exception.png)

```
public class BaseException extends Exception implements IBaseException
public class BusinessException extends BaseException
public class CoreException extends RuntimeException implements IBaseException
public class ModuleException extends BaseException
public class RuntimeModuleException extends RuntimeException implements IBaseException
public class WrappedCheckedException extends CoreException
public class ResourceNotFoundException extends RuntimeException
```

Cada excepció té un objectiu, sent de tipus *checked* o *unchecked*, així si s'ha de definir una exception a l'aplicació, segons quin sigui l'objectiu de l'exception, es pot extendre d'una o altre

## Handlers disponibles

Per a serveis rest, Canigó proporciona un *handler* global a l'objecte *cat.gencat.ctti.canigo.arch.web.rs.controller.exception.handler.GlobalDefaultExceptionHandler*

Aquest és l'encarregat de caputar les següents excepcions:

- **org.springframework.web.multipart.MultipartException**: Caputarda al mètode *defaultErrorHandlerMultipartException*. Retorna un error http 400 de Bad Request informant de l'error al body de la respota utilitzant *cat.gencat.ctti.canigo.arch.web.rs.response.ResponseError*

- **java.lang.Exception**: Caputarda al mètode *defaultErrorHandlerException*. Retorna un error http 500 de Error intern informant de l'error al body de la respota utilitzant *cat.gencat.ctti.canigo.arch.web.rs.response.ResponseError*

- **org.springframework.web.multipart.MultipartException**: Caputarda al mètode *defaultErrorHandlerMultipartException*. Retorna un error http 400 de Bad Request informant de l'error al body de la respota utilitzant *cat.gencat.ctti.canigo.arch.web.rs.response.ResponseError*

- **org.springframework.security.core.AuthenticationException** i **org.springframework.security.access.AccessDeniedException**: Caputarda al mètode *defaultErrorHandlerAuthenticationException*. Retorna un error http 401 de Unathorized informant de l'error al body de la respota utilitzant *cat.gencat.ctti.canigo.arch.web.rs.response.ResponseError*

- **cat.gencat.ctti.canigo.arch.web.rs.controller.exception.ResourceNotFoundException**: Caputarda al mètode *resourceNotFound*. Retorna un error http 404 de Not found informant de l'error al body de la respota utilitzant *cat.gencat.ctti.canigo.arch.web.rs.response.ResponseError*

Si es vol sobreescriure el comportament per defecte es pot extendre aquesta classe i sobreescriure el mètode que es necessiti

Si es vol retornar un missatge d'error o un codi http en concret per un tipus d'error, per exemple en una validació de paràmetres d'un servei rest, és necessari definir una exception pròpia (per exemple, ValidationException), i definir el *@ExceptionHandler* propi de cada exception a l'aplicació (en aquest cas seria un *@ExceptionHandler* de ValidationException)

Per exemple:
```
	@ExceptionHandler(ValidationException.class)
	@ResponseStatus(value = HttpStatus.BAD_REQUEST)
	public ResponseError defaultErrorHandlerValidationException(final HttpServletRequest request,
			final HttpServletResponse response, final ValidationException e) {
		if (log.isDebugEnabled()) {
			log.debug("defaultErrorHandlerValidationException request {} response {}", request, response);
		}
		return new ResponseError(e.getErrors());
	}
```
