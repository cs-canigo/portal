+++
date        = "2024-01-15"
title       = "Documentació"
description = "Documentació canigo.web.rs 3.1.0"
sections    = "canigo-fwk-docs"
weight      = 3
+++

## Propòsit

El propòsit del mòdul de Canigo Web RS és aportar funcionalitats genèriques per a aplicacions amb serveis rest

## Funcionalitats

### Beans

Conté l'entitat que s'ofereix per representar la informació on s'allotjarà la resposta dels serveis rest amb paginació a *cat.gencat.ctti.canigo.arch.web.rs.model.Data*

Conté l'entitat que s'ofereix per representar la informació on s'allotjarà l'error en la resposta dels serveis rest a *cat.gencat.ctti.canigo.arch.web.rs.model.Error*

### Controller

S'ofereix el controller *cat.gencat.ctti.canigo.arch.web.rs.controller.InfoModulesController* per exposar serveis rest per obtenir informació dels mòduls de Canigó utilitzats a l'aplicació, publicat segons la propietat "publishInfoModules"

S'ofereix el controller *cat.gencat.ctti.canigo.arch.web.rs.controller.InfoPropertiesController* per exposar serveis rest per obtenir informació les propietats utilitzades a l'aplicació, publicat segons la propietat "publishInfoProperties"

### Handler

S'ofereix el handler genèric *cat.gencat.ctti.canigo.arch.web.rs.controller.exception.handler.GlobalDefaultExceptionHandler* per a gestionar errors de tipus *org.springframework.web.multipart.MultipartException*, *java.lang.Exception*, *org.springframework.security.core.AuthenticationException*, *org.springframework.security.access.AccessDeniedException* i *cat.gencat.ctti.canigo.arch.web.rs.controller.exception.ResourceNotFoundException*

### Exception

S'ofereix la exception *cat.gencat.ctti.canigo.arch.web.rs.controller.exception.ResourceNotFoundException*, per a identificar errors de recursos no trobats en aplicacions amb serveis rest


#REVISAR_DOCU