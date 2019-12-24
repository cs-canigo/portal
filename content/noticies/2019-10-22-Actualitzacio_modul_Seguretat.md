+++
date        = "2019-12-24"
title       = "Canigó. Actualització mòdul Seguretat"
description = "S'ha publicat una nova versió del mòdul de Seguretat de Canigó per a proporcionar un sistema estàndard en el tractament d'autoritzacions (rols d'usuari) via Gicar"
sections    = ["Notícies", "home"]
categories  = ["canigo"]
#key         = "GENER2020"
+++

## Introducció

Dins de l'abast de la **versió 3.4.2 del framework Canigó** s'ha alliberat una nova versió del mòdul de Seguretat, amb la qual s'aconsegueix proporcionar als proveïdors una forma estàndard d'obtenció dels rols de l'usuari autenticat a través de GICAR (autorització). Podeu consultar l'abast complet d'aquesta versió a les [Release Notes, apartat Canigó 3.4.2](/noticies/release-notes-canigo-34).

[GICAR](/gicar/descripcio/) és l’eina amb què s’ha dotat a la Generalitat de Catalunya per a la gestió centralitzada de les identitats de persones que interactuen amb els sistemes d’informació. Aquesta eina es fonamenta bàsicament en dos objectius principals: 

- Facilitar la gestió de les identitats (persones) que treballen o col·laboren amb la Generalitat de Catalunya (funcionaris, interins, empreses públiques, externs, etc.). 

- Facilitar la gestió i el control de l’accés als recursos per part de les identitats.

El mòdul de seguretat de Canigó té com a propòsit principal gestionar l’autenticació i l’autorització dels usuaris a les aplicacions. Aquest mòdul es basa principalment en el marc de treball Spring Security. D'aquesta manera es pot proporcionar a les aplicacions els components per a la configuració de la font d’autenticació per Gicar, fitxer (local), base de dades i LDAP (deprecat).

## Novetats

Amb l'afegit dels serveis de Gicar, el component de seguretat proporciona la centralització de la gestió dels rols dels usuaris, estalviant a les aplicacions haver de gestionar les taules necessàries per retornar el llistat de rols d'un usuari en la seva base de dades. 

Els  principals avantatges d'aquesta solució són:

1. Augmentar l’estandardització de la manera de com es construeixen les aplicacions.

2. Gestió en mode autoservei i descentralitzada dels rols dels usuaris a les aplicacions.

3. Uns mateixos rols definits poden servir per a un grup d’aplicacions.

4. Simplificació del model d'autorització de les aplicacions.

5. Alleugeriment d’esforços en donar d’alta un usuari en aplicacions que tenen el model d'autorització creuat.

6. Gestió automàtica de revocació de rols quan un usuari marxa de l’organització.

7. Auditoria centralitzada d’assignació / des-assignació de rols.

8. Capacitat d’integració de la solució definida amb Remedy.

9. Solució plenament compatible i orientada al model de directori únic futurible.

La solució de GICAR per incorporar l’autorització és proporcionar a les aplicacions una nova capçalera HTTP anomenada *HTTP_GICAR_MEMBERL*, amb el format:

```
CN=VPN_PRE-GICARDC^CN=VPN_GENERIC-GICARDC^CN=GESNUS_N3_Escriptura^CN=VPN_GENERIC
```

Per a obtenir més informació sobre aquesta nova integració amb Gicar podeu consultar [Control d'accés als recursos amb GICAR](/gicar-saml2/auth-saml2-grups2/).

A la **versió 2.2.0 del Mòdul de Seguretat de Canigó** es proporcionen els components per consultar aquesta nova capçalera HTTP i per construir el llistat de rols de l'usuari a patir d'aquesta, no sent necessari definir cap *cat.gencat.ctti.canigo.arch.security.authorities.dao.AuthoritiesDAO* i en conseqüència, no sent necessari tenir cap taula per retornar el llistat de rols d'un usuari. 

## Documentació del mòdul

Per a obtenir més informació del Mòdul de Seguretat podeu consultar la documentació del [Mòdul Seguretat](/canigo-documentacio-versions-3x-core/modul-seguretat/) al Portal de Frameworks i Solucions d’Arquitectura.
