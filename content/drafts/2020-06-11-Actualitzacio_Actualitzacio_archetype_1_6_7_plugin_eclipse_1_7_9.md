+++
date        = "2020-06-11"
title       = "Canigó. Actualització archetype 1.6.7 i plugin eclipse 1.7.9"
description = "S'ha publicat una nova versió de l’arquetipus i del plugin del eclipse de Canigó per generar projectes amb Canigó 3.4.4"
#sections    = ["Notícies", "home"]
categories  = ["canigo"]
#key         = "JUNY2020"
+++

## Introducció

Dins dels lliurables de Canigó hi consten l’*archetype* i el *plugin* de l’Eclipse.
Seguint l’objectiu de CS Canigó de proporcionar facilitadors per a la creació de projectes Canigó als desenvolupadors d’aplicacions, s’han actualitzat ambdós lliurables per a
generar projectes amb **Canigó 3.4.4**. Podeu consultar l’abast complet de la nova versió del marc de treball a les [Release Notes, apartat Canigó 3.4.4](/canigo-download-related/release-notes-canigo-34).

* L’*archetype* és una eina Maven que **facilita la creació de projectes seguint una plantilla**. Utilitzant l’arquetipus i executant un *goal* de maven obtenim un projecte Canigó amb una
base preconfigurada i preparada per a incorporar-li noves funcionalitats.

* El *plugin* és un **connector desenvolupat específicament per a l’IDE Eclipse** que permet afegir-hi menús contextuals per a la creació de projectes Canigó utilitzant
l’arquetipus de Maven, a més de permetre afegir mòduls a un projecte creat i amb una configuració per defecte. D’aquesta manera, podem crear un projecte amb l’Eclipse i
afegir-l’hi els mòduls necessaris obtenint un projecte preparat per al marc de treball Canigó i estalviant temps als desenvolupadors.


## Novetats *archetype*

La versió 1.6.7 de l’arquetipus de Canigó permet generar projectes amb Canigó 3.4.4, per això s'han modificat els rangs de versions dels següents mòduls:

- canigo.core: [4.0.0,4.4.0)
- canigo.operation.logging: [2.0.0,2.4.0)
- canigo.persistence.jpa: [2.0.0,2.4.0)
- canigo.web.core: [2.0.0,2.4.0)
- canigo.web.rs: [2.0.0,2.4.0)

## Novetats *plugin* d'Eclipse

La nova versió 1.7.9 del plugin utilitza la versió 1.6.7 de l’arquetipus de Canigó per a generar projectes amb Canigó 3.4.4 i s'han modificat els següents rangs de versions dels següents mòduls:

- Integració:
  - canigo.integration.antivirus: [2.0.0,2.5.0)
  - canigo.integration.dni.pica: [2.0.0,2.4.0)
  - canigo.integration.icc: [2.0.0,2.4.0)
  - canigo.integration.notificacions.electroniques: [2.0.0,2.4.0)
  - canigo.integration.tributs.pica: [2.0.0,2.4.0)
 
- Operació
  - canigo.operation.instrumentation: [2.0.0,2.4.0)
  - canigo.operation.logging: [2.0.0,2.4.0)
 
- Persistència:
  - canigo.persistence.jpa: [2.0.0,2.4.0)
 
- Seguretat:
  - canigo.security: [2.0.0,2.5.0)
  - canigo.security.saml: [2.0.0, 2.4.0)
 
- Suport:
  - canigo.support.fileupload: [2.0.0,2.4.0)
  - canigo.support.lopd: [2.0.0,2.4.0)
  - canigo.support.mailing: [2.0.0,2.4.0)
  - canigo.support.merging: [2.0.0,2.4.0)
  - canigo.support.ole: [2.0.0,2.4.0)
  - canigo.support.resizeimg: [2.0.0,2.5.0)
  - canigo.support.sftp: [2.0.0,2.4.0)

<br/>
Per a instal·lar o actualitzar la versió del plugin és necessari seguir els passos descrits a la secció "Instal·lació" del [Plugin Canigó per a Eclipse](/canigo-download-related/plugin-canigo/#instal-lació).

## Documentació

Teniu disponible la següent documentació:

* [Plugin Canigó per a Eclipse](/canigo-download-related/plugin-canigo/)
