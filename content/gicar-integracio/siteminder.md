+++
date        = "2016-06-08T17:11:42+01:00"
title       = "Siteminder"
description = "Característiques i arquitectura"
section     = "GICAR"
taxonomies  = []
weight 		= 1
+++


GICAR disposa d’una eina, el SiteMinder, per facilitar l’autenticació d’aplicacions web. A continuació es veurà que és Siteminder, quines són les seves característiques principals, els elements dels quals es composa (Servidor de Polítiques, Agents, Servidor Web i els diferents directoris) i les tasques que s’han de realitzar per tal d’integrar-ne una aplicació. 

A part de tots el punts anteriors que enfoquen l’autenticació de l’usuari contra el Directori Corporatiu de la Generalitat (empleat públic de la Generalitat), al punt 3.6, s’exposaran quins són els passos a seguir per tal de que GICAR pugui proporcionar a una aplicació el servei d’autenticació anònima mitjançant l’ús d’un certificat digital. 

En cas que l’aplicació a integrar tingui la necessitat de que sigui accedida per usuaris de la Generalitat, i per usuaris de les administracions locals catalanes (AAL), GICAR permet també autenticar aquests usuaris gràcies al servei de validació que proporciona GICAR contra el Directori del Consorci AOC (EACAT). Podeu trobar informació de com fer aquesta integració al punt 3.7.

Així doncs i a mode de resum, GICAR permet l’autenticació als següents col·lectius i amb les següents modalitats:

![Integració Aplicacions GICAR](/related/gicar/taula-modalitats-autenticacio.png)

Per últim en l’apartat 3.8 s’exposa com fer la integració d’una aplicació amb GICAR utilitzant com a protocol d’integració SAML2, indicat per a aplicacions que només puguin delegar l’autenticació a GICAR a través de SAML2.


## Característiques de SiteMinder

SiteMinder és l’eina de la plataforma GICAR que, de forma centralitzada i en alta disponibilitat, s’utilitza per gestionar les polítiques d’accés dels usuaris a les aplicacions web. Per tant, les aplicacions deleguen completament el procés d’autenticació en SiteMinder.

Quan una aplicació està protegida, quan l’usuari intenta accedir-hi,  SiteMinder li demana a l’usuari les credencials (usuari i contrasenya, o certificat digital) i posteriorment es fa una validació d’aquestes al Directori Corporatiu de la Generalitat de Catalunya. En el cas que el resultat sigui positiu, SiteMinder li lliura a l’aplicació final unes capçaleres HTTP amb informació de l’usuari validat. A partir d’aquest moment, l’aplicació és la que determina quins permisos d’accés o privilegis té l’usuari dins l’aplicació (Autorització).

En resum, les característiques més rellevants de SiteMinder són:

- Seguretat Centralitzada, amb la capacitat d’aplicar polítiques diferents en funció del tipus d’usuari, del col·lectiu al que pertany, del departament, etc.
- Permet disposar d’un entorn de Single Sign On, amb contrasenya única del Directori (autenticació única)
- Alta Disponibilitat dels Servidors de Polítiques
- Disposa d’un registre d’accessos (log) molt complert per processos d’auditoria.
- Servei d’administració per tal de realitzar, per exemple, el manteniment del Servidor de Polítiques.


## Arquitectura i elements de SiteMinder

El següent gràfic mostra l’arquitectura dels elements de GICAR responsables del procés d’autenticació:

![Integració Aplicacions GICAR](/related/gicar/arquitectura-siteminder.png)

Tal i com s’observa en el gràfic, l’arquitectura de SiteMinder la integren els elements que es descriuen a continuació:

- SiteMinder Policy Server proporciona i centralitza la gestió de polítiques, autenticació i auditoria per a aplicacions web. El Policy Server és el responsable de:
	- Aplicar una política de control d’accés sobre les aplicacions integrades.
	- Realitzar, quan sigui necessari, l’autenticació d’usuari.
	- Permetre l’accés a determinats recursos d’aquells únicament dels usuaris autoritzats.
	- Facilitar a les aplicacions les dades necessàries per a la identificació de l’usuari que accedeix al recurs.
	- Oferir SSO (Single Sign-On) entre totes les aplicacions integrades.
	- Separar la lògica d’autenticació de la lògica d’aplicació. Això permet modificar el procediment d’autenticació sense afectar a l’aplicació així com aplicar polítiques centralitzades de contrasenyes.
	
- Agent de SiteMinder: Es tracta d’una extensió del servidor web (un filtre ISAPI en el cas de l’IIS, un mòdul mod en el cas d’Apache) que intercepta les peticions abans de ser processades, tot aplicant la política definida al servidor central. S’instal·la en el Servidor Web on resideix el frontal de l’aplicació i s’ocupen d’interceptar les peticions d’accés a les pàgines web d’aquest servidor. Aquestes peticions són enviades al Servidor de Polítiques de SiteMinder per determinar si l’aplicació està protegida i requereix d’autenticació.
En línies generals, SiteMinder intercepta totes les peticions rebudes pel servidor web i, abans de passar-la a l’aplicació, verifica que l’usuari estigui autenticat.

![Integració Aplicacions GICAR](/related/gicar/arquitectura-siteminder2.png)

- Directori Corporatiu: és el repositori central d’identitats utilitzat per SiteMinder per comprovar la validesa o no d’una identitat que intenta accedir a una aplicació web protegida. En el Directori Corporatiu és on resideix la contrasenya única utilitzada per validar totes les aplicacions integrades amb SiteMinder.

- Servidor Web: es on resideix el frontal de l’aplicació web a protegir i on cal instal.lar l’agent de SiteMinder.

