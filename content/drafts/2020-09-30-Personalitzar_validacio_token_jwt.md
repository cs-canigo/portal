+++
date        = "2020-09-30"
title       = "Canigó. Com personalitzar les validacions del token JWT"
description = "Howto per a definir comportaments personalitzats a les validacions del token JWT"
section     = "howtos"
categories  = ["canigo"]
#key         = "SETEMBRER2020"
+++

## Introducció

Canigó proporciona una sèrie objectes per a la gestió del token JWT al [Mòdul de seguretat](/canigo-documentacio-versions-3x-core/modul-seguretat/)
incloent per defecte una gestió dels possibles errors en la validació del token. En aquest how-to explicarem com re-implementar la gestió d'errors de la validació del token JWT
amb un cas d'exemple però aquesta estratègia es podrà utilitzar per a modificar el comportament per defecte dels diferents casos de validació.

## Gestió del token per defecte

Canigó realitza la gestió del token JWT al component:

```
cat.gencat.ctti.canigo.arch.security.rest.authentication.jwt.JwtAuthenticationFilter
```

Aquest s'encarrega de realitzar les validacions del token JWT i, si és vàlid, recupera l'informació de l'usuari. Per tant, per a cada cas de validació del token JWT
es realitza una crida a l'objecte *cat.gencat.ctti.canigo.arch.security.rest.authentication.jwt.JwtTokenHandler* instanciat al *WebSecurityConfig* del projecte mitjançant:

```
   @Bean
   @Named("jwtTokenHandler")
   public JwtTokenHandler jwtTokenHandler() {
      CustomJwtTokenHandler customJwtTokenHandler = new CustomJwtTokenHandler();
      customJwtTokenHandler.setExpiration(getExpiration());
      customJwtTokenHandler.setSecret(getSecret());
      return customJwtTokenHandler;
   }
```

D'aquesta forma es realitzarà una crida als següents mètodes:

- **handleTokenValid**: si la petició requereix autenticació, s'ha proporcionat token i el token és vàlid.
- **handleTokenInvalid**: si la petició requereix autenticació, s'ha proporcionat token i el token és invàlid.
- **handleAuthenticationSecurity**: si la petició requereix autenticació, s'ha proporcionat token però ja hi ha una autenticació de Spring prèvia a l'autenticació amb token.
- **handleAuthentication**: si la petició requereix autenticació, s'ha proporcionat token.
- **handleNoAuthentication**: si es tracta d'una petició d'una URL que no requereix autenticació.

Per tant, si es proporciona un token JWT i aquest és invàlid, es cridarà al mètode *handleTokenInvalid* i l'aplicació retornarà quelcom similar a:

```
Response Body
{
 "code": 401,
 "message": "401. Unauthorized"
}
Response Code
401
Response Headers
{
 "cache-control": "no-cache, no-store, max-age=0, must-revalidate",
 "content-type": "application/json;charset=UTF-8",
 "date": "Wed, 30 Sep 2020 09:53:34 GMT",
 "expires": "0",
 "pragma": "no-cache",
 "transfer-encoding": "chunked",
 "x-content-type-options": "nosniff",
 "x-frame-options": "DENY",
 "x-xss-protection": "1; mode=block"
}
```

## Gestió del token personalitzada

Si, per exemple, volem retornar un missatge personalitzat al client indicant que el token és invàlid, retornant un error HTTP 400, i un missatge i codi d'error
específics utilitzant la classe *cat.gencat.ctti.canigo.arch.web.rs.response.ResponseError* la implementació seria la següent:
<br/>

<br/>
**1-** Crear un *cat.gencat.ctti.canigo.arch.security.rest.authentication.jwt.JwtTokenHandler* personalitzat re-implementant el mètode *handleTokenInvalid*

```
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.User;

import com.fasterxml.jackson.databind.ObjectMapper;

import cat.gencat.ctti.canigo.arch.core.i18n.I18nResourceBundleMessageSource;
import cat.gencat.ctti.canigo.arch.security.rest.authentication.jwt.JwtAuthenticationFilter;
import cat.gencat.ctti.canigo.arch.security.rest.authentication.jwt.JwtTokenHandler;
import cat.gencat.ctti.canigo.arch.web.rs.model.Error;
import cat.gencat.ctti.canigo.arch.web.rs.response.ResponseError;

public class CustomJwtTokenHandler extends JwtTokenHandler {

 @Inject
 private I18nResourceBundleMessageSource i18n;

 @Override
 public void handleTokenInvalid(HttpServletRequest request, HttpServletResponse response, FilterChain chain, User user,
     String authToken, JwtAuthenticationFilter jwtaFilter) throws IOException, ServletException {

   response.setStatus(HttpStatus.BAD_REQUEST.value());
   response.setContentType(MediaType.APPLICATION_JSON_VALUE);

   List<Error> errors = new ArrayList<>();
   errors.add(new Error(999, i18n.getMessage("token.invalid")));

   new ObjectMapper().writeValue(response.getWriter(), new ResponseError(errors));

 }

}
```

On estem definint el següent:

- el codi de resposta HTTP serà HttpStatus.BAD_REQUEST,
- el contingut de la resposta serà de tipus JSON,
- l'objecte d'error per al client: codi d'error 999 (tot i que la recomanació seria definir-lo com a constant) i, com a descripció, un missatge internacionalitzat amb el codi *token.invalid*
- assignar l'objecte d'error al _body_ de la resposta

<br/>
**2-** Definir el nou codi d'error als fitxers d'internacionalització */src/main/resources/config/i18n/*:
```
token.invalid=Token invàlid!!
```

<br/>
**3-** Instanciar la nova classe *CustomJwtTokenHandler* al *WebSecurityConfig* del projecte, enlloc del *JwtTokenHandler* per defecte:

```
 @Bean
 @Named("jwtTokenHandler")
 public JwtTokenHandler jwtTokenHandler() {
   CustomJwtTokenHandler customJwtTokenHandler = new CustomJwtTokenHandler();
   customJwtTokenHandler.setExpiration(getExpiration());
   customJwtTokenHandler.setSecret(getSecret());
   return customJwtTokenHandler;
 }
```

<br/>
D'aquesta forma s'aconseguirà retornar quelcom similar a:

```
Response Body
{
 "errors": [
   {
     "code": 999,
     "message": "Token invàlid!!"
   }
 ]
}
Response Code
400
Response Headers
{
 "cache-control": "no-cache, no-store, max-age=0, must-revalidate",
 "connection": "close",
 "content-length": "53",
 "content-type": "application/json;charset=ISO-8859-1",
 "date": "Wed, 30 Sep 2020 10:55:24 GMT",
 "expires": "0",
 "pragma": "no-cache",
 "x-content-type-options": "nosniff",
 "x-frame-options": "DENY",
 "x-xss-protection": "1; mode=block"
}
```