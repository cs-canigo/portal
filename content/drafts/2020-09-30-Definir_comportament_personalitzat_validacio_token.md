+++
date        = "2020-09-30"
title       = "Canigó. Com definir comportament personalitzat validacions token"
description = "Howto per a definir un comportament personalitzat a les validacions del token"
section     = "howtos"
categories  = ["canigo"]
#key         = "SETEMBRER2020"
+++

## Introducció

Canigó proporciona objectes per a la gestió del token JWT al [Mòdul de seguretat](/canigo-documentacio-versions-3x-core/modul-seguretat/). Dins de la gestió del token, Canigó proporciona una gestió per defecte dels errors de la validació del token. En aquest how-to explicarem una forma de reimplementar la gestió d'errors de la validació del token, per exemple, en el cas de que el client ens enviï un token invàlid retornem informació personalitzada diferent de la de per defecte proporciona Canigó

## Gestió del token per defecte

Canigó realitza la gestió del token JWT a:

```
cat.gencat.ctti.canigo.arch.security.rest.authentication.jwt.JwtAuthenticationFilter
```

Aquest realitza les validacions del token JWT i si és vàlid recupera la informació de l'usuari.

Per cada cas de la validació del token JWT realitza una crida al objecte *cat.gencat.ctti.canigo.arch.security.rest.authentication.jwt.JwtTokenHandler* instanciat al *WebSecurityConfig* del projecte Canigó amb:

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

Així es realitza una cida als següents mètodes:

- **handleTokenValid**: Si la petició necessita autenticació, s'ha proporcionat token i el token és vàlid

- **handleTokenInvalid**: Si la petició necessita autenticació, s'ha proporcionat token i el token és invàlid

- **handleAuthenticationSecurity**: Si la petició necessita autenticació, s'ha proporcionat token però ja hi ha una autenticació de Spring prèvia a l'autenticació amb token

- **handleAuthentication**: Si la petició necessita autenticació, però no s'ha proporcionat token

- **handleNoAuthentication**: Si es una petició d'una url que no necessita autenticació

Així, si es proporciona un token JWT i aquest és invàlid, es cridarà a *handleTokenInvalid* i l'aplicació retornarà alguna cosa com:

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

Anem a per exmple a retornar un missatge personalitzat al client indicant que el token és invàlid, retornant un error http 400 i un missatge d'error amb un codi d'error i un missatge utilitzant *cat.gencat.ctti.canigo.arch.web.rs.response.ResponseError*

Per a això realitzarem les següents modificacions:

**1-** Crearem un *cat.gencat.ctti.canigo.arch.security.rest.authentication.jwt.JwtTokenHandler* personalitzat reimplementant el mètode *handleTokenInvalid*

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

A la reimplementació del mètode *handleTokenInvalid* el que realitzem és:

- Li indiquem que el codi de resposta http serà HttpStatus.BAD_REQUEST

- Que el contingut de la resposta serà de tipus JSON

- Creem l'error amb el codi 999 pel client (la millor política seria tenir-ho a constants), i com a descripció un texte internacionalitzat amb el codi *token.invalid*

- Escrivim l'objecte *cat.gencat.ctti.canigo.arch.web.rs.response.ResponseError* que conté el missatge d'error al body de la resposta

**2-** Insertem el codi d'error als fitxers de internacionalització

Així en els fitxers de */src/main/resources/config/i18n/* afegim el codi *token.invalid*, per exemple:
```
token.invalid=Token invalid!!
```

**3-** Instanciem el nou *CustomJwtTokenHandler* personalitzat al *WebSecurityConfig* del projecte enlloc del *JwtTokenHandler* per defecte:

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

Amb aquests canvis enlloc de retornar l'informació per defecte retornarà alguna cosa semblant a:

```
Response Body
{
  "errors": [
    {
      "code": 999,
      "message": "Token invalid!!"
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

Seguint aquesta mateixa estratègia es pot modificar el comportament per defecte de la resta de casos de la validació del token JWT

