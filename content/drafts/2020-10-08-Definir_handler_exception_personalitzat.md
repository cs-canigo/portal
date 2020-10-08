+++
date        = "2020-10-08"
title       = "Canigó. Com definir handler exception personalitzat"
description = "Howto per a definir un handler de exception personalitzat"
section     = "howtos"
categories  = ["canigo"]
#key         = "OCTUBRE2020"
+++

## Introducció

Canigó proporciona una sèrie objectes i handlers per a la gestió de excepcions al [Mòdul d'excepcions](/canigo-documentacio-versions-3x-core/modul-excepcions/)
incloent per defecte una gestió de les excepcions base més comunes. En aquest how-to explicarem com re-implementar la gestió de les exceptions bas més comunes, definir un hanlder per una excepció base sense gestió per defecte, definir una excepció pròpia de l'aplicació i definir-li un handler.

## Gestió de les excepcions base més comunes

Tal i com es detalla a [Mòdul d'excepcions](/canigo-documentacio-versions-3x-core/modul-excepcions/) l'objecte *cat.gencat.ctti.canigo.arch.web.rs.controller.exception.handler.GlobalDefaultExceptionHandler* conté els diferents handlers per la gestió per defecte de les exceptions base més comunes.

Així si per exemple tenim una excepció a l'aplicació de tipus *java.lang.Exception* el servei rest podria retornar alguna cosa semblant a:

```
Response Body
{
  "errors": [
    {
      "code": 500,
      "message": "Error obtenint les dades!!"
    }
  ]
}
Response Code
500
Response Headers
{
  "cache-control": "no-cache, no-store, max-age=0, must-revalidate",
  "connection": "close",
  "content-type": "application/json;charset=UTF-8",
  "date": "Thu, 08 Oct 2020 06:11:37 GMT",
  "expires": "0",
  "pragma": "no-cache",
  "transfer-encoding": "chunked",
  "x-content-type-options": "nosniff",
  "x-xss-protection": "1; mode=block"
}
```

## Personalització de la gestió de les excepcions base més comunes

Si en el cas anterior, per una excepció de tipus *java.lang.Exception* vulguéssim retornar a la propietat codi de l'objecte ** de la response sempre un mateix text internacionalitzat hauriem de definir un handler propi a l'aplicació que extengués de *cat.gencat.ctti.canigo.arch.web.rs.controller.exception.handler.GlobalDefaultExceptionHandler* i reimplementar el mètode que es vol canviar el seu comportament, en aquest cas *defaultErrorHandlerException*, per exemple:

```
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import cat.gencat.ctti.canigo.arch.web.rs.controller.exception.handler.GlobalDefaultExceptionHandler;
import cat.gencat.ctti.canigo.arch.web.rs.response.ResponseError;

@RestControllerAdvice
public class CustomExceptionHandler extends GlobalDefaultExceptionHandler {

    /** Constant LOGGER. */
    private static final Logger LOGGER = LoggerFactory.getLogger(CustomExceptionHandler.class);

    /**
     * Custom error handler exception.
     *
     * @param request request
     * @param response response
     * @param e e
     * @return response error
     */
    @Override
    public ResponseError defaultErrorHandlerException(final HttpServletRequest request,
            final HttpServletResponse response, final Exception e) {
        if (LOGGER.isErrorEnabled()) {
            LOGGER.error(e.getMessage(), e);
        }
        return new ResponseError(999, getMesssage(e.getLocalizedMessage(), null, e.getLocalizedMessage()));
    }

}
```

On estem retornant el codi 999 (la millor estrategia seria tenir-ho a un objecte de constant d'error) en el vody de la resposta, per exemple:

```
Response Body
{
  "errors": [
    {
      "code": 999,
      "message": "Error obtenint les dades!!"
    }
  ]
}
Response Code
500
Response Headers
{
  "cache-control": "no-cache, no-store, max-age=0, must-revalidate",
  "connection": "close",
  "content-type": "application/json;charset=UTF-8",
  "date": "Thu, 08 Oct 2020 07:30:21 GMT",
  "expires": "0",
  "pragma": "no-cache",
  "transfer-encoding": "chunked",
  "x-content-type-options": "nosniff",
  "x-xss-protection": "1; mode=block"
}
```

## Definir un hanlder per una excepció base sense gestió per defecte

Si volem per exemple retornar un codi d'error en concret per les excepcions base *cat.gencat.ctti.canigo.arch.core.exceptions.CoreException* definim un nou "@ExceptionHandler", per exemple:

```
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import cat.gencat.ctti.canigo.arch.core.exceptions.CoreException;
import cat.gencat.ctti.canigo.arch.web.rs.controller.exception.handler.GlobalDefaultExceptionHandler;
import cat.gencat.ctti.canigo.arch.web.rs.response.ResponseError;

@RestControllerAdvice
public class CustomExceptionHandler extends GlobalDefaultExceptionHandler {

    /** Constant LOGGER. */
    private static final Logger LOGGER = LoggerFactory.getLogger(CustomExceptionHandler.class);

    /**
     * Custom error handler exception.
     *
     * @param request request
     * @param response response
     * @param e e
     * @return response error
     */
    @Override
    public ResponseError defaultErrorHandlerException(final HttpServletRequest request,
            final HttpServletResponse response, final Exception e) {
        if (LOGGER.isErrorEnabled()) {
            LOGGER.error(e.getMessage(), e);
        }
        return new ResponseError(999, getMesssage(e.getLocalizedMessage(), null, e.getLocalizedMessage()));
    }
    
    /**
     * Custom error handler core exception.
     *
     * @param request request
     * @param response response
     * @param CoreException e
     * @return response error
     */
    @ExceptionHandler(CoreException.class)
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseError defaultErrorHandlerCoreException(final HttpServletRequest request,
            final HttpServletResponse response, final CoreException e) {
        if (LOGGER.isErrorEnabled()) {
            LOGGER.error(e.getMessage(), e);
        }
        return new ResponseError(888, getMesssage(e.getExceptionDetails().getErrorCode(), null, e.getExceptionDetails().getErrorCode()));
    }

}
```

Així la resposta podria ser:

```
Response Body
{
  "errors": [
    {
      "code": 888,
      "message": "Error obtenint les dades!!"
    }
  ]
}
Response Code
500
Response Headers
{
  "cache-control": "no-cache, no-store, max-age=0, must-revalidate",
  "connection": "close",
  "content-type": "application/json;charset=UTF-8",
  "date": "Thu, 08 Oct 2020 07:49:09 GMT",
  "expires": "0",
  "pragma": "no-cache",
  "transfer-encoding": "chunked",
  "x-content-type-options": "nosniff",
  "x-xss-protection": "1; mode=block"
}
```

## Definir una excepció pròpia de l'aplicació i definir-li un handler

Si hi ha la necessitat de retornar un codi http i un codi d'error al body de la resposta pròpi per una part específica del negoci de l'aplicació, s'ha de definir una excepció pròpia de l'aplicació i definir-li un handler. Així per exemple volem tenir una excepció per les validacions dels serveis rest, podriem definir una excepció amb nom *ValidationException*, per exemple:

```
import cat.gencat.ctti.canigo.arch.core.exceptions.BaseException;

/**
 * The Class ValidationException.
 */
public class ValidationException extends BaseException {

    /**
     * Constructor
     *
     * @param anErrorCode
     *            Error Code of exception. It is recommended to use a class of
     *            constants where this error code is defined
     */
    private static final long serialVersionUID = -298400707932570360L;

    public ValidationException(String anErrorCode) {
        super(anErrorCode);
    }

    /**
     * Constructor for use message argument and errorCode
     * 
     * @param message
     * @param anErrorCode
     */
    public ValidationException(String message, String anErrorCode) {
        super(message, anErrorCode);
    }

}
```

```
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import cat.gencat.ctti.canigo.arch.core.exceptions.CoreException;
import cat.gencat.ctti.canigo.arch.web.rs.controller.exception.handler.GlobalDefaultExceptionHandler;
import cat.gencat.ctti.canigo.arch.web.rs.response.ResponseError;
import cat.gencat.intcan2027.exception.ValidationException;

@RestControllerAdvice
public class CustomExceptionHandler extends GlobalDefaultExceptionHandler {

    /** Constant LOGGER. */
    private static final Logger LOGGER = LoggerFactory.getLogger(CustomExceptionHandler.class);

    /**
     * Custom error handler exception.
     *
     * @param request
     *            request
     * @param response
     *            response
     * @param e
     *            e
     * @return response error
     */
    @Override
    public ResponseError defaultErrorHandlerException(final HttpServletRequest request,
            final HttpServletResponse response, final Exception e) {
        if (LOGGER.isErrorEnabled()) {
            LOGGER.error(e.getMessage(), e);
        }
        return new ResponseError(999, getMesssage(e.getLocalizedMessage(), null, e.getLocalizedMessage()));
    }

    /**
     * Custom error handler core exception.
     *
     * @param request
     *            request
     * @param response
     *            response
     * @param CoreException
     *            e
     * @return response error
     */
    @ExceptionHandler(CoreException.class)
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseError defaultErrorHandlerCoreException(final HttpServletRequest request,
            final HttpServletResponse response, final CoreException e) {
        if (LOGGER.isErrorEnabled()) {
            LOGGER.error(e.getMessage(), e);
        }
        return new ResponseError(888,
                getMesssage(e.getExceptionDetails().getErrorCode(), null, e.getExceptionDetails().getErrorCode()));
    }

    /**
     * Custom error handler validation exception.
     *
     * @param request
     *            request
     * @param response
     *            response
     * @param CoreException
     *            e
     * @return response error
     */
    @ExceptionHandler(ValidationException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public ResponseError defaultErrorHandlerCoreException(final HttpServletRequest request,
            final HttpServletResponse response, final ValidationException e) {
        if (LOGGER.isErrorEnabled()) {
            LOGGER.error(e.getMessage(), e);
        }
        return new ResponseError(Integer.valueOf(e.getExceptionDetails().getErrorCode()),
                getMesssage(e.getMessage(), null, e.getMessage()));
    }

}
```

Obtenint com a resposta alguna cosa semblant a:

```
Response Body
{
  "errors": [
    {
      "code": 777,
      "message": "És necessari informar el identificador"
    }
  ]
}
Response Code
400
Response Headers
{
  "cache-control": "no-cache, no-store, max-age=0, must-revalidate",
  "connection": "close",
  "content-type": "application/json;charset=UTF-8",
  "date": "Thu, 08 Oct 2020 09:04:04 GMT",
  "expires": "0",
  "pragma": "no-cache",
  "transfer-encoding": "chunked",
  "x-content-type-options": "nosniff",
  "x-xss-protection": "1; mode=block"
}
```

On estem definint que si hi ha un errror de validació retornarem un codi http 400 (Bad request) i en el body de la response hi haurà el detall del error, en aquest cas l'error de validació amb codi 777 i missatge "És necessari informar el identificador"
