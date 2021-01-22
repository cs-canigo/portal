+++
date        = "2020-06-25"
title       = "Documentació"
description = "Documentació canigo.security.saml.rest 2.3.0"
sections    = "canigo-fwk-docs"
weight      = 3
+++

## Propòsit

El Mòdul de Seguretat té com a propòsit general gestionar l’autenticació i l’autorització dels usuaris en aplicacions Canigó. L’objectiu de l’autenticació és comprovar que l’usuari és qui diu ser, mentre que l’autorització s’encarrega de comprovar que realment té accés als recursos sol·licitats. Canigó recomana l’ús de Spring Security com a Framework base i les extensions que Canigó proporciona.

## Funcionalitats

### Excepción

Contiene las excepciones que se generan en la autenticación

### Controller

Contiene el Endpoint "SAMLAuthController" que permite obtener un token JWT. 
