+++
date        = "2023-09-01"
title       = "Actualització d'atributs del servei del connector de PSGD"
description = "S'ha modificat el servei de connector de PSGD on s'han afegit nous atributs sobre la base de la PSGD Manual Integració."
categories  = ["Data Architecture"]
sections    = ["Notícies", "home"]
key = "SETEMBRE2023"
+++

## Introducció

El dia 01/09/2023 s'ha afegit al connector de PSGD actualitzant els seus atributs
 
## Novetats

Aquests són els endpoints que s'han actualitzat:<br><br>

- Descarregar un document (/get/document/content)
  - S'han afegit les següents variables:
    - Array d' objecte  UrlsAcces que conte les següents variables  
      -  String amb el nom de url
  
- Alta d’un expedient (/create/folder)
  - S'han afegit les següents variables:
    -  La variable Creator Id de tipus String


  
Per a més informació sobre la Gestió Tècnica de Dades podeu consultar:

* [Llistat de canvis](https://canigo.ctti.gencat.cat/plataformes/canigo/documentacio-llibreries/canigo.integration.psgd/3.0.5/llistat-de-canvis/)


