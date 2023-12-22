+++
date        = "2021-11-01"
title       = "Documentació"
description = "Documentació canigo.security.saml.bridge 3.0.0"
sections    = "canigo-fwk-docs"
weight      = 3
+++

## Propòsit

El Mòdul de Seguretat SAML bridge té com a propòsit general oferir els components per a l’autenticació utilitzant SAML.

## Funcionalitats

### Beans

Conté l'entitat que representa la informació del idp i les metadata de les credencials de SAML a  *cat.gencat.ctti.canigo.arch.security.saml.authentication.credentials.SAMLIdPMetadataManagerCredentials*

Conté l'entitat que representa la informació del key manager de les credencials de SAML a *cat.gencat.ctti.canigo.arch.security.saml.authentication.credentials.SAMLKeyManagerCredentials*

### Service

S'ofereix el servei que obté l'informació de l'assertion SAML a *cat.gencat.ctti.canigo.arch.security.saml.authentication.service.SAMLResponseToAssertionService*

### Filter

Per a la gestió de l'autenticació a través de les request amb SAML s'utilitza el filtre *cat.gencat.ctti.canigo.arch.security.saml.authentication.filter.SAMLProcessingCapturingFilter*

### Controller

Per a oferir serveis rest per a l'autenticació utilitzant SAML a partir de les assertions, existeix el controller *cat.gencat.ctti.canigo.arch.security.saml.authentication.controller.AssertionController*
