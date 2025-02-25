+++
date        = "2025-01-21"
title       = "Antivirus corporatiu"
description = "Antivirus corporatiu"
sections    = "APIANTIVIRUS"
weight      = 1
toc         = true
categories  = ["cloud","apiantivirus"]
+++

## Descripció del servei Antivirus corporatiu

La plataforma d'Antivirus corporatiu és una solució implementada perquè les aplicacions desenvolupades en la Generalitat puguin consumir-la, garantint una capa extra de seguretat i fiabilitat sobre els fitxers intercanviats.

L'eina utilitzada per a aquest propòsit és Symantec Protection Engine, la qual proporciona les capacitats d'escaneig de contingut de fitxers de qualsevol aplicació.

L'objectiu de la plataforma, és facilitar la integració de les aplicacions dins de la Generalitat amb l'aplicació externa Symantec Protection Engine, proporcionant diferents modes d'integració, perquè l'aplicació consumidora pugui acollir-se al qual més li convingui. La funcionalitat principal per part de les aplicacions que desitgin consumir-la, seria la de l'enviament d'un fitxer codificat per a ser escanejat per l'antivirus, aquest procediria amb l'anàlisi i retornaria un OK o un KO en funció del contingut del fitxer.

## Infraestructura

A nivell d'infraestructura existeixen dos entorns, a part de l'entorn de producció (PRO), es disposa de l'entorn de preproducció (PRE), per a facilitar la integració de les aplicacions a la infraestructura corporativa. Tot aquesta situat en CPD4 i el producte és l'antivirus Symantec/Broadcom.

 ![Arquitectura](/related/apiantivirus/arquitectura.jpg)

Les aplicacions poden utilitzar un connector Canigo si ha estat desenvolupat sota aquest framework, o es pot desenvolupar un connector propi, per a això s'hauria de facilitar-se el JAR d'aquest. Actualment existeixen aplicacions fent ús de l'antivirus per a totes dues tipologies.
## 

## Modes d'Integració

Actualment existeixen dos modes d'integració, un a través del connector [Canigó](https://canigo.ctti.gencat.cat/plataformes/canigo/documentacio-per-versions/3.8LTS/3.8.0/moduls/moduls-integracio/modul-antivirus/), el qual tendirà a desaparèixer, i un altre mode via API **[API](/drafts/apiantivirus/intro_CAT/)**. Es recomana encaridament l'ús del mode d'integració del API a causa de la seva versatilitat, facilitat d'ús i integració, i fiabilitat..

A continuació, s'indiquen una sèrie d'exemples d'ús i el model d'integració recomanat:
## 

| Cas d'ús | Mode d'integració recomanat |  
|------|-------|
| Sol·licitud d'escaneig de fitxers amb una grandària inferior a 15MB | **[API](/drafts/apiantivirus/intro_CAT/)** (Escaneig per fitxer adjunt)
| Sol·licitud d'escaneig de fitxers amb una grandària superior a 15MB | **[API](/drafts/apiantivirus/intro_CAT/)** (Escaneig per URL)
| Desenvolupaments que no poden integrar-se via API | **[SDK](https://canigo.ctti.gencat.cat/plataformes/canigo/documentacio-per-versions/3.8LTS/3.8.0/moduls/moduls-integracio/modul-antivirus/)**
