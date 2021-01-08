+++
date        = "2020-06-25"
title       = "Documentació"
description = "Documentació canigo.integration.dni.pica 2.2.0"
sections    = "Canigó"
weight      = 3
+++

## Propòsit

El propòsit del connector és proporcionar una interfície java per accedir a la PICA (Plataforma d’Integració i Col.laboració Administrativa). El connector amb la PICA disposa de dos tipus de comunicació, un d’ells a través de web service síncron, i l’altre, mitjançant web service asíncron.

## Funcionalitats

### Beans

Contiene la entidad que representa los datos de consulta del DNI "DadesConsultaDni"

### Excepción

Contiene la excepción que se genera al consultar un DNI "DniException"

### Pica

Contiene la interfaz e implementación de "DniConnector" que incluye los métodos de verificación.
