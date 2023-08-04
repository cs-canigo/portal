+++
date        = "2021-12-17"
title       = "Documentació"
description = "Documentació canigo.security 2.4.3"
sections    = "canigo-fwk-docs"
weight      = 3
+++

## Propòsit

El Mòdul de Seguretat té com a propòsit general gestionar l’autenticació i l’autorització dels usuaris en aplicacions Canigó. L’objectiu de l’autenticació és comprovar que l’usuari és qui diu ser, mentre que l’autorització s’encarrega de comprovar que realment té accés als recursos sol·licitats. Canigó recomana l’ús de Spring Security com a Framework base i les extensions que Canigó proporciona.

## Funcionalitats

### Beans

Conté l'entitat que representa la informació de l'usuari a *cat.gencat.ctti.canigo.arch.security.beans.CanigoSecurityInfoBean*

Conté l'entitat que representa la informació de l'usuari a Gicar a *cat.gencat.ctti.canigo.arch.security.provider.gicar.GICARUser*

### DAO

Per a l'obtenció de l'informació de l'usuari a partir del username i password a la bbdd s'ofereix *cat.gencat.ctti.canigo.arch.security.authentication.dao.AuthenticationDAO*

Per a l'obtenció del llistat de rols associat a l'usuari per bbdd s'ofereix *cat.gencat.ctti.canigo.arch.security.authorities.dao.AuthoritiesDAO*

### Service

Per a realitzar l'autenticació a partir de la request s'ofereix *cat.gencat.ctti.canigo.arch.security.rest.authentication.service.AuthenticationService*

### Controller

Per a oferir serveis rest a les aplicacions per a l'autenticació i pel login, existeix el controller *cat.gencat.ctti.canigo.arch.security.rest.authentication.controller.AuthController*, conticionat a la seva publicació segons la propietat "publishAuthController"

### JWT

Per la gestió del token JWT s'ofereix el handler *cat.gencat.ctti.canigo.arch.security.rest.authentication.jwt.JwtTokenHandler* i el filtre *cat.gencat.ctti.canigo.arch.security.rest.authentication.jwt.JwtAuthenticationFilter*

#### Handler

S'ofereixen els següents handlers per a gestionar les respostes en els serveis de l'autenticació:

- Per a la gestió de la resposta a l'error d'accés denegat *cat.gencat.ctti.canigo.arch.security.rest.authentication.handler.RestAuthenticationAccessDeniedHandler*
- Per a la gestió de la resposta a l'error d'autenticació fallida *cat.gencat.ctti.canigo.arch.security.rest.authentication.handler.RestAuthenticationFailureHandler*
- Per a la gestió de la resposta a l'autenticació correcte *cat.gencat.ctti.canigo.arch.security.rest.authentication.handler.RestAuthenticationSuccessHandler*

### Providers

Per a la gestió de l'autenticació amb Gicar s'ofereix *cat.gencat.ctti.canigo.arch.security.provider.gicar.GICARUserDetailsServiceImpl* i *cat.gencat.ctti.canigo.arch.security.provider.gicar.GICARWithMemberUserDetailsServiceImpl* 

Per a la gestió de l'autenticació amb siteminder s'ofereix *cat.gencat.ctti.canigo.arch.security.provider.siteminder.SiteminderAuthenticationProvider* 
