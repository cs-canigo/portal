+++
date        = "2018-09-26"
title       = "Connectors de Canigó amb serveis corporatius"
description = "Fem un recordatori dels diferentes connectors de Canigó i el seu manteniment/suport associat"
sections    = ["Notícies"]
categories  = ["canigo"]
key         = "OCTUBRE2018"
+++

## Manteniment de connectors Canigó

Dins de la tasca de manteniment del framework de Canigó, aquest mes de setembre, s'ha encetat una tasca de revisió i manteniment dels diferents connectors de Canigó, revisant les proves unitàries i actualitzant el codi mirant d'adaptar-lo als nous _best practices_.

Un connector de Canigó és un conjunt de funcionalitats dins un àmbit definit, empaquetades en un format accessible per al desenvolupador. L'objectiu dels connectors de Canigó és múltiple:

* Abstracció: Per una banda s'aconsegueix abstreure el desenvolupador dels detalls de la implementació, triant valors adients i pre-definits per la OT de Canigó (p.e. timeouts).
* Simplificació: Per l'altre banda els connectors ofereixen una capa simplificada d'utilització orientada als casos d'ús més estàndard, orientant el desenvolupament cap a una solució estàndard, millorant el TTM.
* Certificació i suport: Finalment, els connectors de Canigó ajuden a definir el conjunt de dependències per l'ús de l'aplicació. Tot aquest conjunt de dependències i de configuracions ajuda a definir un _quòrum_ que permet definir una aplicació certificada per Canigó, donant accés a un suport preferent i de qualitat.

A continuació es descriuen un petit subconjunt dels diferents connectors que proporciona Canigó:

### PICA

La Plataforma d'Integració i Col.laboració Administrativa disposa d'un suport preferent dins a Canigó, desplegat en diferents connectors segons l'àmbit dels serveis oferits.

Així doncs, el ventall de funcionalitats dels diferents connectors varia des de l'accés a dades del Padró i la validació de dades amb DNI, fins a l'accés a dades tributàries.

### ICC

Els serveis del connector per l'Institut Cartogràfic i Geològic de Catalunya estan orientats a la cerca i validació d'adreces, geo-posicionaments i serveis de localització.

### PSGD

Els serveis de Gestió Documental amb Alfresco giren entorn de la gestió de carpetes, documents i metadades associades.

### PSIS

El connector per treballar amb els certificats digitals oferts pel Consorci Administració Oberta de Catalunya ofereix serveis de validació de certificats i signatures.

### SGDE

El Servei de Gestió del Document Electrònic o SGDE, és un servei que permet realitzar múltiples operacions amb documents, des de renderitzacions i extraccions de dades de formularis PDF, fins a conversió de formats MS Office a PDF.

Per a qualsevol dubte respecte a l'ús d'aquests o altres connectors de Canigó, podeu possar-vos en contacte amb el CS Canigó obrint una petició al JIRA CSTD al servei [CAN](https://cstd.ctti.gencat.cat/jiracstd/browse/CAN) o bé enviant un correu a la [bústia](mailto:oficina-tecnica.canigo.ctti@gencat.cat).
