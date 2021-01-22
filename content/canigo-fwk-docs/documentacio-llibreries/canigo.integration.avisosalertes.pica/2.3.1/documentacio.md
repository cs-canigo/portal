+++
date        = "2020-06-25"
title       = "Documentació"
description = "Documentació canigo.integration.avisosalertes.pica 2.3.1"
sections    = "canigo-fwk-docs"
weight      = 3
+++

## Propòsit

L’objectiu d’aquest connector és el de proporcionar accés als serveis d’enviament de SMS i CORREU del CTTI a través del servei AVISALERT de la PICA.

## Funcionalitats

### Beans

Contiene la entidad que representa la respuesta asíncrona al envío de la alerta "DataResponse"

### Excepción

Contiene la excepción que se genera al enviar una alerta "AvisosAlertesException"

### Avisos Alertes

Contiene la interfaz e implementación de "AvisosAlertesConnector" que incluye los métodos de envío síncronos y asíncronos. 
