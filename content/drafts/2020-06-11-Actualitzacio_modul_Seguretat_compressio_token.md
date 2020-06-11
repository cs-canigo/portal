+++
date        = "2020-06-11"
title       = "Canigó. Actualització mòdul Seguretat"
description = "S'ha publicat una nova versió del mòdul Seguretat de Canigó per oferir la funcionalitat de compressió de token JWT"
#sections    = ["Notícies", "home"]
categories  = ["canigo"]
#key         = "JUNY2020"
+++

## Introducció

Dins de l'abast de la **versió 3.4.4 del Framework Canigó s'ha alliberat una nova versió del mòdul de Seguretat**, el qual té com a propòsit
principal **oferir la funcionalitat de compressió de token JWT**.

Podeu consultar l'abast complet de la versió 3.4.4 a les [Release Notes, apartat Canigó 3.4.4](/canigo-download-related/release-notes-canigo-34).

## Novetats

A partir de la versió 2.4.0 del mòdul es proporciona la funcionalitat de compressió del token JWT. Per defecte, sino li indiquem que volem utilitzar compressió, el mòdul genera el token JWT sense compressió

Per activar la funcionalitat de compressió s'ha afegit el següent mètode a *cat.gencat.ctti.canigo.arch.security.rest.authentication.jwt.JwtTokenHandler*:
```
public void setTokenWithCompress(boolean tokenWithCompress)
```

Si activem la compressió, per defecte s'utilitzarà la compressió DEFLATE, si volem utilitzar un altre algoritme de compressió tenim disponible el mètode:
```
public void setTokenCompressionCodec(CompressionCodec tokenCompressionCodec)
```
Tenim disponibles els següents algoritmes de compressió a *io.jsonwebtoken.CompressionCodecs*:

- [DEFLATE](https://en.wikipedia.org/wiki/DEFLATE): Algoritme per defecte. Compleix l'estandard [JWA](https://tools.ietf.org/html/rfc7518)
- [GZIP](https://en.wikipedia.org/wiki/Gzip): No compleix l'estandard JWA. Si voleu utilitzar aquest algoritme comproveu que tots els sistemes ho suporten

Així, si volem comprimir el token JWT amb DEFLATE ens cal:

1. Definir al fitxer *security.properties* la següent propietat:
```
*.jwt.tokenWithCompress = true
```

2. Carregar la nova propietat a *WebSecurityConfig.java*:
```
	@Value("${jwt.tokenWithCompress}")
	private boolean tokenWithCompress;
```

3. A la definició del *JwtTokenHandler* en el fitxer *WebSecurityConfig.java* indicar-li que volem utilitzar la compressió:
```
jwtTokenHandler.setTokenWithCompress(tokenWithCompress);
```


## Documentació del mòdul

Per a obtenir més informació del Mòdul de Seguretat podeu consultar la documentació del [Mòdul de Seguretat](/canigo-documentacio-versions-3x-core/modul-seguretat/) al Portal de Frameworks i Solucions d’Arquitectura.
