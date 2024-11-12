+++
date = "2024-11-12"
title = "Guia d'ús de tokens personals"
description = "Guia d'ús de tokens personals per a l'accés programàtic i des de línia de comando a Gitlab"
sections = "SIC"
toc = true
aliases = [
    "/sic30-guies/guia-convert-aca-msbuild/"
]
taxonomies = []
weight = 8
+++

## Introducció

A partir del pròxim 15 de desembre, s'activarà l'autenticació amb MFA en Gitlab i es deshabilitarà l'autenticació bàsica. Aquest canvi significa que, a partir d'aquesta data, per a accedir a Gitlab des del navegador se sol·licitarà MFA de Cisco DUO i no serà possible l'accés des d'eines de línia de comando amb l'usuari i la contrasenya de GICAR. 
Per a poder continuar treballant normalment amb les eines de línia de comando, haurem de configurar i utilitzar els [**Personal Access Token (PAT) de què disposa Gitlab**](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html)

L'objectiu de la present guia és donar unes breus indicacions perquè cada usuari de Gitlab pugui crear-se i mantenir els seus propis token d'accés.

## Creació del Personal Access Token (PAT)

La gestió dels tokens d'accés personal es gestionen des de la interfície web de Gitlab. Aquests token tenen una durada limitada i personalitzada que no pot superar 365. Cada usuari pot disposar de diversos token vàlids i pot revocar-los en qualsevol moment. Per a accedir a la gestió dels token d'accés personal:

1. Accedir a la consola web de Gitlab en la URL habitual.

![Login](/related/sic/3.0/gitlab-login.png)
<br/>

2. Accedir a la modificació de l'el nostre perfil d'usuari.

![Profile](/related/sic/3.0/gitlab-perfil.png)
<br/>

3. Gestionar els token afegint, eliminant o revocant.

![pat](/related/sic/3.0/gitlab-pat.png)
<br/>

4. Crear el token ajustant la durada i l'abast. L'habitual serà assignar l'abast "write_repository"

![Permissions](/related/sic/3.0/gitlab-permissions.png)
<br/>

En el següent [**enllaç**](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html) de la documentació oficial disposen de tota la informació detallada sobre permisos, durada i gestió dels token d'accés personal i poden accedir per a ampliar informació.

## Ús del PAT

El token d'accés personal (PAT) generat ha d'utilitzar-se en tots els accessos programàtics al Gitlab, fonamentalment per a accedir a la API i als repositoris des de línia de comando amb utilitats com Git o el IDE que utilitzem normalment.

La configuració de l'accés es realitzarà utilitzant l'usuari GICAR com a nom d'usuari i el PAT en lloc de la contrasenya. 
Exemple:

![Login](/related/sic/3.0/git-login.png)
<br/>


## Més informació

En la documentació oficial dels token d'accés personal de Gitlab es disposa de més informació sobre la definició, abast, arrebossat, deshabilitat i altres maneres de generar i utilitzar els token d'accés personals. Allí podran ampliar la informació aquí proporcionada.

[**https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html**](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html)


Si voleu més informació podeu consultar la secció de [**Guies**](/plataformes/sic/guies/sic30-guies/).

Si teniu qualsevol dubte o problema podeu revisar les [**Preguntes Freqüents**](/sic/faq) o utilitzar els canals de [**Suport**](/sic/suport).