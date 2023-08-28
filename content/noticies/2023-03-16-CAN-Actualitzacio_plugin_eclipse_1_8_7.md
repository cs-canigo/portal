+++
date = "2023-03-16"
title = "Canigó. Actualització plugin Eclipse 1.8.7"
description = "S'ha publicat una nova versió del plugin de l'eclipse de Canigó per a generar projectes amb Canigó 3.6.5 amb el template corresponent a la última versió del mòdul canigo.support.mailing"
sections = ["Notícies", "home"]
categories = ["canigo"]
key = "ABRIL2023"
+++

## Introducció

**L'arquetipus és una eina Maven que facilita la creació de projectes seguint una plantilla**. Utilitzant l'arquetipus i
executant un _goal_ de maven obtenim un projecte Canigó amb una base preconfigurada preparada per a incorporar-li noves
funcionalitats.

**El _plugin_ és un connector desenvolupat específicament per a l'IDE Eclipse que permet afegir-hi menús contextuals
per a la creació de projectes Canigó fent ús de l'arquetipus de Maven**, a més d'afegir mòduls a un projecte creat i
amb una preconfiguració donada. Així, usant l'Eclipse, podem crear un projecte i afegir-l'hi els mòduls necessaris
obtenint un projecte preconfigurat per al marc de treball Canigó i estalviant temps als desenvolupadors.

## Novetats _plugin_ Eclipse

S'ha actualitzat el plugin de Canigó per a **generar projectes amb Canigó 3.6.5 amb el template corresponent
als canvis de _sarcat.webservice_ de Sarcat i de _sgde.forms.wsdl.url_ i _sgde.std.wsdl.url_ de SGDE que apunten a HTTPS**.
Podeu consultar el [Llistat de canvis del _plugin_ Eclipse 1.8.7](/canigo-fwk-docs/entorn-de-desenvolupament/plugin-eclipse/1.8.7/llistat-de-canvis/).

La nova versió 1.8.7 del _plugin_ fa servir la versió 1.7.5 de l'arquetipus per a generar projectes amb Canigó 3.6.5.
Per a instal·lar o actualitzar aquesta versió del _plugin_ serà necessari seguir els passos descrits a la secció
"Instal·lació" de la documentació del [plugin de Canigó](/canigo-fwk-docs/entorn-de-desenvolupament/plugin-eclipse/).

Cal destacar que per a utilitzar el plugin a partir de la versió 1.8.0, és necessari iniciar l'eclipse amb la màquina
virtual de Java versió 11.

## Documentació addicional

Podeu consultar l'abast complet de la nova versió al
[Llistat de canvis](/plataformes/canigo/documentacio-per-versions/3.6LTS/3.6.5/llistat-de-canvis/).

Podeu consultar la notícia de la publicació de la [versió 3.6.5 de Canigó]
(/noticies/2022-05-23-CAN-actualitzacio-canigo-3_6_5/).