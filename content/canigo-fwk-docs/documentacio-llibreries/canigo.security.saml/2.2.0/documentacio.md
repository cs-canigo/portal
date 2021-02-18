+++
date        = "2020-06-25"
title       = "Documentació"
description = "Documentació canigo.security.saml 2.2.0"
sections    = "canigo-fwk-docs"
weight      = 3
+++

## Propòsit

El Mòdul de Seguretat té com a propòsit general gestionar l’autenticació i l’autorització dels usuaris en aplicacions Canigó. L’objectiu de l’autenticació és comprovar que l’usuari és qui diu ser, mentre que l’autorització s’encarrega de comprovar que realment té accés als recursos sol·licitats. Canigó recomana l’ús de Spring Security com a Framework base i les extensions que Canigó proporciona.

## Funcionalitats

### Beans

Conté l'entitat que representa el resultat de la validació del contingut SAML a *cat.gencat.ctti.canigo.arch.security.saml.validation.SAMLValidatorResult*

### Exception

Conté la exception que es genera al realitzar la validació del contingut SAML "cat.gencat.ctti.canigo.arch.security.saml.validation.SAMLValidatorException"

### Validador

L'encarregat de realitzar la validació del contingut SAML és *cat.gencat.ctti.canigo.arch.security.saml.validation.SAMLValidator*


