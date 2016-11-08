+++
date        = "2015-02-05"
title       = "SGDE. OCR al STD"
description = "En el procés de transformació de CPD de l'entorn PROductiu del STD (Sistema de Transformació de Documents), finalitzat el passat 28/1, ha estat publicada una nova versió del WebService de Serveis Invocació STD"
sections    = ["Notícies", "home"]
categories  = ["desenvolupament", "sgde"]
+++

En el procés de transformació de CPD de l'entorn PROductiu del STD (Sistema de Transformació de Documents), finalitzat el passat 28/1, ha estat publicada una nova versió del WebService de Serveis Invocació STD:

- [WS v1.0] (http://sgde.intranet.gencat.cat/ServeisInvocacioSTD/services/ServeisSTD?wsdl)
- [WS v2.0 (NOVA VERSIÓ)] (http://sgde.intranet.gencat.cat/ServeisInvocacioSTD/services/ServeisSTDV2?wsdl)

Aquesta nova versió inclou mètodes d'OCR (Optical Character Recognition). A continuació es descriuen breument cadascuna de les funcionalitats proporcionades per aquests nous mètodes:

- ferOCR: a partir del binari d'una imatge retorna el text resultat del OCR.
- convertirPDFCercable: es passa l'OCR al document a convertir, prèvia conversió a imatge en cas que el document origen no sigui una imatge. El PDF resultat és un PDF "cercable".
- convertirComposarPDFCercable: mateixa funcionalitat que l'operació existent "convertirComposarPDF" però el document PDF a composar és un PDF "cercable", ja que prèviament a la composició s'aplica la funcionalitat de "convertirPDFCercable". 

I un diagrama on s'il·lustra el seu funcionament dins el STD:

<CENTER>![OCR](/images/news/OCR.png)</center>

En el Portal de Frameworks i Solucions d'Arquitectura, secció [SGDE] (/sgde/documentacio), podeu trobar tota la informació relacionada amb aquesta versió 2.0 del Webservice de Serveis Invocació STD. Properament es publicarà una nova versió del connector SGDE de Canigó 2 i Canigó 3 que faciliti el seu consum des d'aplicacions Canigó.