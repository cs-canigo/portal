+++
date        = "2025-01-21"
title       = "API Antivirus"
description = "Informació general"
sections    = "APIANTIVIRUS"
weight      = 1
categories  = ["cloud","apiantivirus"]
+++

L'objectiu principal a l'hora de crear el API Antivirus ha estat modernitzar i optimitzar la integració amb el servei de verificació de fitxers de l'antivirus (Symantect Protection Engine), passant d'un model basat en llibreries JAR a un model de consum mitjançant APIs REST.

Amb aquest canvi s'ha aconseguit el següent:
## 
- **Facilitar la integració**: Proveir una interfície estandarditzada que permeti a les aplicacions consumir els serveis de verificació de fitxers de manera àgil i consistent.
- **Millorar la interoperabilitat**: Garantir que les aplicacions de diferents entorns tecnològics puguin accedir al servei sense dependre de llibreries o frameworks específics.
- **Augmentar l'escalabilitat**: Permetre un maneig més eficient de les peticions concurrents, alineant-se amb les millors pràctiques de disseny de sistemes basats en Apis.
- **Simplificar el manteniment**: Centralitzar el punt d'accés en el servei per a facilitar la seva actualització i monitoratge, reduint els esforços necessaris per a la seva gestió.
- **Complir amb els estàndards de seguretat**: Assegurar que la comunicació entre aplicacions i el servei compleixi amb els requisits de seguretat exigits, utilitzant protocols segurs i autenticació robusta.

## Descripció

A continuació, es llisten les diferents funcionals que ofereix el API Antivirus, les quals es detallessin més en profunditat en la secció de **[disseny tècnic del API](../disenotecnico_CAT/)**.
## 
- **Obtenir token d'autenticació**: Operació per a sol·licitar un token d'autenticació i de refresh, requerits per a poder fer ús de la funcionalitat d'escaneig del API Antivirus.
- **Refrescar Token**: Operació que s'usa per a refrescar el període de caducitat del token proporcionant un nou token d'accés, facilitant per a això el token de refresh.
- **Escanejar fitxers**: Operació que permet analitzar fitxers, els quals s'envien/adjunten en les peticions, rebent com a resposta el resultat de l'anàlisi amb els detalls de l'amenaça.
- **Escanejar fitxers a través de la ruta del fitxer**: Operació que permet analitzar fitxers, els quals s'envien/adjunten en les peticions, rebent com a resposta el resultat de l'anàlisi amb els detalls de l'amenaça.

## Documentació

A través del següent enllaç es pot anar a la secció de canigo relacionada amb el disseny tècnic del API Antivirus.
- **[disseny tècnic del API Antivirus](../disenotecnico_CAT/)**.

A través del següent enllaç es pot anar a la secció de canigo relacionada amb els requisits necessaris per a fer ús del API Antivirus.
- **[Requisits per a fer ús del API Antivirus](../requisitosdeuso_CAT/)**.

A través del següent enllaç es pot anar a la secció de canigo relacionada amb el manual d'ús del API Antivirus.
- **[Manual d'ús del API Antivirus](../manualdeuso_CAT/)**.


