+++
date        = "2019-09-17"
title       = "Actualització mòdul Seguretat Canigó"
description = "S'ha publicat una nova versió del mòdul de Seguretat de Canigó per obtenir els rols de l’usuari a través de GICAR (autorització)"
#sections    = ["Notícies", "home"]
#categories  = ["canigo"]
#key         = "NOVEMBRE2019"
+++

Dins de l'abast de la **versió 3.4.2 del framework Canigó** s'ha allibrerat una nova versió del mòdul de Seguretat de Canigó consistent en incorporar l’opció de l’obtenció dels rols de l’usuari a través de GICAR (autorització)

Amb aquesta actualització s'aconsegueix proporcionar als proveïdors una forma estàndard d'obtenció dels rols de l'usuari autenticat a través de GICAR

Podeu consultar l'abast complet de la versió 3.4.2 a:

[Abast Canigó 3.4.2](https://cstd.ctti.gencat.cat/jiracstd/issues/?jql=project%20%3D%20CAN%20AND%20fixVersion%20%3D%203.4.2)

## Introducció

GICAR és l’eina amb que s’ha dotat a la Generalitat de Catalunya per a la gestió centralitzada de les identitats de persones que interactuen amb els sistemes d’informació.

La plataforma GICAR es fonamenta bàsicament en dos objectius principals: 

- Facilitar la gestió de les identitats (persones) de treballen o col•laboren amb la Generalitat de Catalunya (funcionaris, interins, empreses públiques, externs, etc). 

- Facilitar la gestió i el control de l’accés als recursos per part de les identitats

Per a més informació podeu consultar la [Descripció servei](/gicar/descripcio/) de Gicar.

Canigó té com a propòsit principal en el Mòdul de Seguretat gestionar l’autenticació i l’autorització dels usuaris en aplicacions Canigó.

Canigó utilitza Spring Security com a framework base per la seguretat d'una aplicació.

Actualment Canigó proporciona els components per a la configuració de la font d’autenticació per fitxer (local), base de dades, LDAP (deprecat) i Gicar.

Actualment els components per la configuració de l'autenticació de la font d'autenticació per Gicar necessiten tenir definit un *cat.gencat.ctti.canigo.arch.security.authorities.dao.AuthoritiesDAO*.

Canigó proporciona una implementació base de *cat.gencat.ctti.canigo.arch.security.authorities.dao.AuthoritiesDAO* en el component *cat.gencat.ctti.canigo.arch.security.authorities.dao.impl.AuthoritiesDAOImpl*, aquest necessita que cada aplicació tingui a la seva base de dades les taules necessaries per retornar el llistat de rols d'un usuari.

Per més informació de la definició de les taules necessaries per retornar el llistat de rols d'un usuari, podeu consultar la documentació de Spring de [Security Database Schema](https://docs.spring.io/spring-security/site/docs/current/reference/htmlsingle/#appendix-schema)

## Novetats

En les últimes novetats dels serveis de Gicar, proporciona la centralització de la gestió dels rols dels usuaris, estalviant a les aplicacions haver de gestionar en la seva base de dades les taules necessaries per retornar el llistar de rols d'un usuari.

Les principals avantatges d'aquesta solució són:

1. Augmentar l’estandardització de com es construeixen les aplicacions.

2. Gestió autoservei i descentralitzada dels rols dels usuaris a les aplicacions.

3. Uns mateixos rols definits poden servir per un grup d’aplicacions.

4. Simplificació del model autoritzatiu de les aplicacions.

5. Alleugeriment d’esforços al donar d’alta un usuari en aplicacions que tenen el model autoritzatiu creuat.

6. Gestió automàtica de revocació de rols quan un usuari marxa de l’organització.

7. Auditoria centralitzada d’assignació / des-assignació de rols.

8. Capacitat d’integració de la solució definida amb Remedy.

9. Solució plenament compatible i orientada al model de directori únic futurible.

La solució de GICAR per incorporar l’autorització és proporcionar a les aplicacions una nova capçalera HTTP anemanada *HTTP_GICAR_MEMBERL*, amb el format:

```
CN=VPN_PRE-GICARDC^CN=VPN_GENERIC-GICARDC^CN=GESNUS_N3_Escriptura^CN=VPN_GENERIC
```

Per a obtenir més informació del sobre aquesta nova integració amb Gicar podeu consultar [Control d'accés als recursos amb GICAR](/gicar-integracio/autoritzacio/)

A la versió 2.2.0 del Mòdul de Seguretat de Canigó es proporcionen els components per consultar aquesta nova capçalera HTTP i per construir el llistat de rols de l'usuari a patir d'aquesta, no sent necessari definir cap *cat.gencat.ctti.canigo.arch.security.authorities.dao.AuthoritiesDAO* i per conseqüent, no sent necessari tenir cap taula per retornar el llistat de rols d'un usuari. 

## Documentació mòdul

Per a obtenir més informació del Mòdul de Seguretat podeu consultar la documentació del [Mòdul Seguretat](/canigo-documentacio-versions-3x-core/modul-seguretat/) al Portal de Frameworks i Solucions d’Arquitectura.
