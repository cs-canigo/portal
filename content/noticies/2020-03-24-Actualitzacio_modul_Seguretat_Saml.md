+++
date        = "2020-03-24"
title       = "Canigó. Actualització mòdul Seguretat SAML"
description = "S'ha publicat una nova versió del mòdul de Seguretat SAML de Canigó per a proporcionar un sistema estàndard en el tractament d'autoritzacions (rols d'usuari) via Gicar"
sections    = ["Notícies", "home"]
categories  = ["canigo"]
#key         = "ABRIL2020"
+++

## Introducció

Dins de l'abast de la **versió 3.4.3 del Framework Canigó s'ha alliberat una nova versió del mòdul de Seguretat SAML**,
amb la qual s'aconsegueix proporcionar als proveïdors una forma estàndard d'obtenció dels rols de l'usuari autenticat a través de GICAR (autorització).
[GICAR](/gicar/descripcio/) és l’eina amb què s’ha dotat a la Generalitat de Catalunya per a la gestió centralitzada de les identitats de persones que interactuen amb els sistemes d’informació
i proporciona [assertions SAML2](https://en.wikipedia.org/wiki/SAML_2.0) per a l'autenticació i autorització dels usuaris.
El mòdul de seguretat SAML de Canigó té com a propòsit principal **gestionar l’autenticació i l’autorització dels usuaris a les aplicacions Canigó a partir del protocol SAML**.

Podeu consultar l'abast complet d'aquesta versió a les [Release Notes, apartat Canigó 3.4.3](/canigo-download-related/release-notes-canigo-34).

## Novetats

La novetat dels serveis que ofereix el mòdul de seguretat SAML de Canigó és la possibilitat d'utilització centralitzada dels rols dels usuaris a Gicar, tenint l'opció d'obtenció
dels rols de l'usuari per BBDD com fins ara i la nova opció per Gicar. Els principals avantatges són:

1. Augmentar l’**estandardització** de la manera com es construeixen les aplicacions

2. **Gestió descentralitzada** dels rols dels usuaris a les aplicacions.

3. **Reaprofitament de rols**, que poden utilitzar-se per a un grup d’aplicacions.

4. **Simplificació del model d'autorització** de les aplicacions.

5. **Alleugeriment d’esforços** en donar d’alta un usuari en aplicacions que tenen el model d'autorització creuat.

6. **Gestió automàtica de revocació** de rols quan un usuari marxa de l’organització.

7. **Auditoria centralitzada** d’assignació / des-assignació de rols.

8. **Capacitat d’integració** de la solució definida amb Remedy.

9. **Solució plenament compatible** i orientada al model de directori únic futurible.

<br/>
Per a obtenir més informació sobre aquesta nova integració amb Gicar podeu consultar [Control d'accés als recursos amb GICAR](/gicar-saml2/auth-saml2-grups2/).

A la **versió 2.2.0 del mòdul canigo.security.saml**, **versió 2.2.1 del mòdul canigo.security.saml.bridge** i **versió 2.2.1 del mòdul canigo.security.saml.rest** es
proporcionen els components per a obtenir els rols a partir de Gicar utilitzant el protocol SAML, no sent necessari definir cap altre *provider* que proporcioni informació dels rols de l'usuari.

## Documentació del mòdul

Per a obtenir més informació del Mòdul de Seguretat SAML podeu consultar la documentació del [Mòdul de Seguretat SAML](/canigo-documentacio-versions-3x-core/modul-saml/) al Portal de Frameworks i Solucions d’Arquitectura.
