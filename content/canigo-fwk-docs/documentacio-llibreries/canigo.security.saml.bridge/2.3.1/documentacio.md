+++
date        = "2020-06-25"
title       = "Documentació"
description = "Documentació canigo.security.saml.bridge 2.3.1"
sections    = "canigo-fwk-docs"
weight      = 3
+++

## Propòsit

El Mòdul de Seguretat té com a propòsit general gestionar l’autenticació i l’autorització dels usuaris en aplicacions Canigó. L’objectiu de l’autenticació és comprovar que l’usuari és qui diu ser, mentre que l’autorització s’encarrega de comprovar que realment té accés als recursos sol·licitats. Canigó recomana l’ús de Spring Security com a Framework base i les extensions que Canigó proporciona.

## Funcionalitats

### Excepción

Contiene la excepción que se genera al validar las aserciones "SAMLResponseException"

### Controller

Contiene el Endpoint "AssertionController" que permite consultar aserciones. 
