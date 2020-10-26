+++
date        = "2020-10-08"
title       = "Canigó. Com definir handler exception personalitzat"
description = "Howto per a definir un handler d'excepció personalitzat"
section     = "howtos"
categories  = ["canigo"]
#key         = "NOVEMBRE2020"
+++

## Introducció

Canigó proporciona una sèrie objectes i handlers per a la gestió d'excepcions al [Mòdul d'excepcions](/canigo-documentacio-versions-3x-core/modul-excepcions/)
incloent, per defecte, una gestió de les excepcions base més comunes. En aquest how-to explicarem:

- 1. Com personalitzar la gestió de les excepcions base més comunes,
- 2. Com definir un handler per una excepció base sense gestió per defecte,
- 3. Com definir una excepció pròpia i definir-li un handler

Tal i com es detalla al [Mòdul d'excepcions](/canigo-documentacio-versions-3x-core/modul-excepcions/), l'objecte
*cat.gencat.ctti.canigo.arch.web.rs.controller.exception.handler.GlobalDefaultExceptionHandler* conté els diferents handlers
per a la gestió per defecte de les excepcions base més comunes. Així si, per exemple, tenim una excepció a l'aplicació de
tipus *java.lang.Exception*, el servei rest podria retornar quelcom similar a:

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

## Com personalitzar la gestió de les excepcions base més comunes

Si per una excepció de tipus *java.lang.Exception* volguéssim retornar a la propietat codi de l'objecte
*cat.gencat.ctti.canigo.arch.web.rs.response.ResponseError* de la response un mateix text internacionalitzat,
hauríem de definir un handler propi a l'aplicació que estengués de *cat.gencat.ctti.canigo.arch.web.rs.controller.exception.handler.GlobalDefaultExceptionHandler*
i reimplementar el mètode que es vol personalitzar, en aquest cas, *defaultErrorHandlerException*. Per exemple:

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
     * @param request
     * @param response
     * @param e
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

On estem retornant el codi 999 en el body de la resposta, tot i que la millor estratègia seria tenir-ho a un objecte de constants d'error:

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

## Definir un handler per una excepció base sense gestió per defecte

Si volem, per exemple, retornar un codi d'error en concret per les excepcions base *cat.gencat.ctti.canigo.arch.core.exceptions.CoreException*,
serà  necessari definir un nou "@ExceptionHandler". Per exemple:

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
     * @param request
     * @param response
     * @param e
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

D'aquesta forma, la resposta seria quelcom similar a:

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

## Definir una excepció pròpia i definir-li un handler

Si hi ha la necessitat de retornar un codi http i un codi d'error al body de la resposta propi, per una part específica del negoci de l'aplicació,
s'ha de definir una excepció pròpia de l'aplicació i definir-li un handler. Així si, per exemple, volem tenir una excepció per les validacions dels serveis Rest,
podem definir una excepció amb nom *ValidationException*. Per exemple:

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
I definir un handler per a aquesta nova excepció:

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

Obtenint com a resposta quelcom similar a:

```
Response Body
{
  "errors": [
    {
      "code": 777,
      "message": "És necessari informar l’identificador"
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

On estem indicant que si hi ha un error de validació, retornarem un codi http 400 (Bad request) i, en el body de la response,
hi haurà el detall de l’error de validació que, en aquest cas, està associat al codi 777 i missatge "És necessari informar l'identificador".