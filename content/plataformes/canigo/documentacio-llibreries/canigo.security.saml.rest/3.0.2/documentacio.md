+++
date        = "2021-12-17"
title       = "Documentació"
description = "Documentació canigo.security.saml.rest 3.0.2"
sections    = "canigo-fwk-docs"
weight      = 3
+++

## Propòsit

El Mòdul de Seguretat SAML Rest té com a propòsit general gestionar l’autenticació i l’autorització dels usuaris en aplicacions Canigó utilitzant el protocol SAML. 

## Funcionalitats

### Beans

Conté l'entitat que representa la informació de l'usuari SAML a *cat.gencat.ctti.canigo.arch.security.provider.saml.SAMLUser*

Conté l'entitat que representa la informació del token amb l'informació de SAML a *cat.gencat.ctti.canigo.arch.security.saml.authentication.token.SAMLAuthenticationToken*

### Service

Per la validació del assertin SAML s'ofereix *cat.gencat.ctti.canigo.arch.security.saml.authentication.service.SAMLValidationService*

### Controller

Per a la publicació dels serveis rest per a l'autenticació amb el protocol SAML s'ofereix el controller *cat.gencat.ctti.canigo.arch.security.saml.authentication.controller.SAMLAuthController*

### Excpetion

Per a la gestió dels diferents errors que es poden produïr a l'autenticació utilitzant SAML s'ofereixen les exceptions:

- Exception generic per errors en l'autenticació utilitzant SAML s'ofereix *cat.gencat.ctti.canigo.arch.security.saml.authentication.exception.SAMLAuthenticationException* 
- Exception per errors en el contigut del token jwt amb l'informació de l'autenteicació utilitzant SAML s'ofereix *cat.gencat.ctti.canigo.arch.security.saml.authentication.exception.SAMLJwtTokenClaimsEnforceException* 
- Exception per indicar que hi ha errors al configurar els components pel protocol SAML s'ofereix *cat.gencat.ctti.canigo.arch.security.saml.authentication.exception.SAMLNotConfiguredException*

### JWT

Per a la gestió del token JWT a partid de la informació de l'autenticació utilitzant SAML s'ofereix *cat.gencat.ctti.canigo.arch.security.saml.authentication.jwt.SAMLJwtTokenHandler*

### Provider

Per a la gestió de l'autenticació utilitzant SAML s'ofereix *cat.gencat.ctti.canigo.arch.security.provider.saml.SAMLAuthenticationProvider* i *cat.gencat.ctti.canigo.arch.security.provider.saml.SAMLAuthenticationWithMemberProvider*
