+++
date        = "2021-10-21"
title       = "Mòdul d'excepcions"
description = "Mòdul per a la gestió d'excepcions de les aplicacions"
sections    = "Canigó. Documentació Versió 3.6"
weight      = 4
+++

## Propòsit

La **correcta gestió de les excepcions és molt important i crítica** però, sovint, la forma en la que es generen i gestionen les excepcions en les aplicacions
és un dels aspectes més ignorats en el disseny de les mateixes. L'ús apropiat de les excepcions fa que els nostres aplicatius siguin més robusts, més fàcils de
desenvolupar i mantenir, més lliures d'errors i més fàcils d'utilitzar. Per aquest motiu és important que tractem excepcions al màxim nivell de detall.

El **mòdul d'excepcions de Canigó permet gestionar els errors que es produeixen en realitzar una petició** de forma que aquests podran ser tractats adequadament i, si convé,
informar a l'usuari, enregistrar una traça, enviar un correu electrònic... etcètera. Per tal d'evitar l'ús innecessari de blocs *try-catch* dins el codi dels nostres
aplicatius, Canigó **proporciona un mecanisme d'intercepció**, al qual indicarem quines excepcions volem tractar i quins gestors les tractaran sense haver d'incorporar
cap referència a les classes de l'aplicació.

## Glossari

## Instal·lació

El mòdul de configuració s'inclou per defecte dins del core de Canigó 3.6.
Durant el procés de creació de l'aplicació, l'eina de suport al desenvolupament inclourà la referència dins el fitxer `pom.xml` i, en cas d'una instal·lació manual,
caldrà afegir les següents entrades al fitxer:

```
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

A la [Matriu de Compatibilitats 3.6] (/canigo-fwk-docs/documentacio-per-versions/3.6LTS/3.6.0/moduls/compatibilitat-per-modul/) es pot comprovar la versió del mòdul compatible amb la versió de Canigó utilitzada.

## Classes disponibles d'excepcions

Les classes disponibles, i la seva jerarquia, es mostren a continuació:

![Imatge de les Excepcions Definides](/related/canigo/documentacio/modul-excepcions/jerarquia_exception.png)

És a dir:
```
public class BaseException extends Exception implements IBaseException
public class BusinessException extends BaseException
public class CoreException extends RuntimeException implements IBaseException
public class ModuleException extends BaseException
public class RuntimeModuleException extends RuntimeException implements IBaseException
public class WrappedCheckedException extends CoreException
public class ResourceNotFoundException extends RuntimeException
```

Cada excepció té el seu objectiu, sent de tipus *checked* o *unchecked*. Per lo que, si s'ha de definir una nova excepció a l'aplicació,
segons quin sigui l'objectiu de la mateixa s'hauria de decidir estendre d'una o d'una altra.

## Handlers disponibles

Per a serveis Rest, Canigó proporciona un *handler* global a l'objecte *cat.gencat.ctti.canigo.arch.web.rs.controller.exception.handler.GlobalDefaultExceptionHandler*.
Aquest és l'encarregat de capturar les següents excepcions:

- **java.lang.Exception**: capturada al mètode *defaultErrorHandlerException*, que retorna un error http 500-Error intern.

- **org.springframework.web.multipart.MultipartException**: capturada al mètode *defaultErrorHandlerMultipartException*, que retorna un
error http 400-Bad Request.

- **org.springframework.web.multipart.MultipartException**: capturada al mètode *defaultErrorHandlerMultipartException* que retorna un
error http 400-Bad Request.

- **org.springframework.security.core.AuthenticationException** i **org.springframework.security.access.AccessDeniedException**: capturades
al mètode *defaultErrorHandlerAuthenticationException* que retorna un error http 401-Unathorized.

- **cat.gencat.ctti.canigo.arch.web.rs.controller.exception.ResourceNotFoundException**: capturada al mètode *resourceNotFound* que retorna un
error http 404-Not found.

En tots els casos, l'error s'informa al *body* de la resposta utilitzant un objecte *cat.gencat.ctti.canigo.arch.web.rs.response.ResponseError*.
Si es vol sobreescriure el comportament per defecte es pot estendre aquesta classe i sobreescriure el mètode que es necessiti.

### Exemple

Si es vol retornar un missatge d'error o un codi http en concret per un tipus d'error, per exemple en una validació de paràmetres d'un servei Rest,
serà necessari:

- 1. Definir una excepció pròpia. Per exemple: ValidationException
- 2. Definir l’*@ExceptionHandler* propi de cada excepció a l'aplicació que, en aquest cas, seria un *@ExceptionHandler* de ValidationException.

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
