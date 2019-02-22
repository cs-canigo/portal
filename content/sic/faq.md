+++
date = "2019-01-07"
title = "FAQ"
description = "Preguntes freqüents sobre els serveis del SIC"
sections = "SIC"
taxonomies = []
weight = 6
+++

## Accessibilitat

#### **Què necessito per a poder començar a treballar amb SIC?** ####
* Client Git instal·lat a la màquina des d'on es faran les pujades. Aquest es pot descarregar des de la [web oficial de Git](https://git-scm.com/downloads) tot i que també es pot utilitzar qualsevol altre client de Git com GitKraken o Sourcetree; o bé que aquest estigui integrat en un IDE de desenvolupament com Visual Studio Code, Eclipse, IntelliJ... etcètera.
* Usuari a GICAR, amb l'e-mail informat a la identitat i bolcat a l'LDAP del SIC.
<br/><br/>

#### **Des de la nostra oficina no tenim connectivitat cap als serveis del SIC. Com podem resoldre aquest problema?** ####
Caldrà configurar la vostra VPN/Lan2Lan/PPP per a que disposi d'accés a les adreces IP del SIC. Si us cal saber les adreces IP dels serveis podeu obrir una consulta a [Framework SIC](/sic/suport).
<br/><br/>

#### **Com puc concedir permisos a altres membres als meus codis d'aplicació?** ####
* En el cas de responsables de lot, CPD i LdT l'assignació de permisos és automàtica, per tant no calen accions addicionals.
* En el cas de proveïdors d'aplicacions, el SIC proporciona l'[Autoservei d'usuaris](/sic-serveis/autoservei-usuaris/) que permet definir nous membres del grup de Release Manager i concedir accés a la resta de l'equip de desenvolupament. 
<br/><br/>

#### **En accedir al Gitlab amb un usuari GICAR operatiu i amb les credencials correctes, es produeix un error d'autenticació. Cal fer alguna acció addicional?** ####
Missatge d'error: "*Could not authenticate you from Ldapmain because "Invalid credentials*". <br/>
Per accedir als serveis del SIC, resulta necessari que l'usuari es trobi bolcat a l'LDAP del SIC. Caldria fer una petició de suport al servei GICAR a través de SAU-Remedy per tal que duguin a terme aquest bolcat.
<br/><br/>

#### **En accedir al Gitlab, contínuament em redirigeix a la pàgina del meu perfil i m'obliga a informar una adreça de correu. Cal fer alguna acció addicional?** ####
Cal tenir informat el correu electrònic a la identitat GICAR per tal que la informació es propagui al Gitlab. Caldria fer una petició de suport al servei GICAR a través de SAU-Remedy per tal que actualitzin aquest camp.
<br/><br/>

#### **Si ja estic logat a GICAR, perquè em torna a demanar les credencials en accedir als portals Gitlab/Jenkins del SIC?** ####
Els portals Gitlab/Jenkins del SIC no es troben adherits al Single Sign-On de GICAR (no llegeixen les capçaleres d'autenticació GICAR). L'autenticació i autorització es realitza contra l'LDAP del SIC, on s'han bolcat les dades dels usuaris GICAR.
<br/><br/>


## Custodia de codi

#### **Quina versió de client GIT necessito tenir instal·lada per a treballar amb el Gitlab?** ####
La versió de GIT que fa servir el GITLAB de SIC és la 9.0.5 i, segons la documentació oficial de GIT, qualsevol versió 2.X seria compatible. Tanmateix, recomanem utilitzar una versió igual o superior a la 2.7.X.
<br/><br/>

#### **Quina diferència hi ha entre grup d'aplicació i projecte dins el Gitlab de SIC?** ####
* Els projectes són les diferents parts de les aplicacions (mòduls, serveis, llibreries pròpies,...) que disposen d'un control de versions propi. 
* Els grups són agrupacions de projectes i es corresponen amb el codi d'aplicació. 
<br/><br/>

#### **Quina diferència hi ha entre espai privat i espai corporatiu al Gitlab de SIC i a quin espai he de crear els projectes?** ####
Els usuaris Release Manager podran crear tant grups com projectes dins el seu espai personal al portal Gitlab, però de cara a oficialitzar a CTTI l'entrega del codi font d'un projecte, aquest haurà de figurar a l'espai corporatiu de SIC. <br/>
Els grups oficials d'aplicació es crearan automàticament a partir de la informació de l'inventari d'aplicacions.
Els projectes dins els grups oficials d'aplicació sí que podran ser creats pels Release Manager mitjançant el portal Gitlab.
<br/><br/>

#### **Puc crear subgrups dins els grups d'aplicació oficials al Gitlab?** ####
És possible crear subgrups dins un grup d'aplicació oficial però de cara a la integració amb Jenkins, comportarà una incompatibilitat. Per tant, es desaconsella treballar amb subgrups dins l'espai corporatiu del SIC.
<br/><br/>

#### **Com puc migrar el codi dels repositoris SVN (SIC 1.0) cap als del Gitlab (SIC 2.0)?** ####
Podeu consultar el procediment descrit a [Migració repositoris SVN a Git] (/sic/serveis/scm) a l'apartat corresponent.
<br/><br/>

#### **Fins quan podem utilitzar el SVN?** ####
El SVN es va passar a mode lectura el **5 de Febrer de 2018**.
<br/><br/>

#### **Com afectarà la migració del projectes de SVN a Gitlab als jobs Jenkins associats?** ####
Caldrà actualitzar l'origen del codi font dels jobs per tal que apuntin al repositori del projecte de Gitlab. Els nous jobs es crearan seguint el nou tipus de job Pipeline però els existents romandran amb el format actual.
<br/><br/>

#### **Mantindré els meus accessos de SIC 1.0 a SIC 2.0?** ####
Mantindrà els mateixos rols d'accés als serveis, ja que aquests s'han heretat de l'anterior sistema de permisos.
<br/><br/>


## Integració contínua

#### **Quines branques provoquen l'execució de pipelines de construcció i desplegament al Jenkins?** ####
Únicament la branca MASTER és la que té el lligam amb les pipelines de Jenkins. No obstant, es pot publicar qualsevol branca al Git del SIC.
<br/><br/>

#### **El job de desplegament no funciona informant que ja existeix el tag definitiu. Quin és el problema?** ####
La tasca de desplegament (job) comprova si existeix el tag definitiu associat a la versió indicada al fitxer "sic/sic.yml" i mostra error si no s'ha realitzat el corresponent increment de versió. Caldrà que incrementi el valor de versió i torni a provar.
<br/><br/>

#### **En els desplegaments automàtics a BBDD es gestionen transaccions?** ####
No es realitza cap gestió de transaccions de BBDD per defecte. Si escau, caldrà incorporar clàusules de transacció dins els scripts d'usuari: BEGIN TRANSACTION, COMMIT i ROLLBACK.
<br/><br/>


## Binaris

#### **En pujar nous binaris el sistema indica que el projecte no acompleix els requisits establers. Quin és el problema?** ####
Si el codi d'aplicació indicat és vàlid, probablement el sistema ha detectat inconsistències respecte al codi de projecte. És a dir, durant la pujada de binaris el sistema verifica que aquesta vingui acompanyada de l'actualització de la versió del codi font del projecte. Únicament estaran exemptes d’aquesta validació les aplicacions que disposin d’una excepció aprovada en la custodia de codi. <br/>
Per tant, per a resoldre el problema, caldrà actualitzar el codi font del projecte o tramitar, si escau, la corresponent excepció amb arquitectura del CTTI per a que l'aplicació no disposi d'aquesta restricció. <br/> 
En cas de tractar-se d'una aplicació multi projecte que sí reposita el codi però la pujada de binaris es vol realitzar en bloc (tots els artefactes, documentació...), o bé es vol lliurar un artefacte que no té un projecte al darrere (producte de tercers, llibreria sense codi...) caldrà optar per indicar un codi de projecte que acompleixi els requeriments indicats. En cas contrari, les pujades hauran de fer-se de forma diferenciada per a cada un dels projectes de l'aplicació.
A partir del **24/01/2019 aquest control serà restrictiu**.
<br/><br/>

#### **He anat a recuperar binaris pujats i veig que ja no hi son. Què ha passat?** ####
S'executa un procés diari d'esborrat de binaris respectant només les 5 últimes versions per codi d'aplicació i projecte. No s'ha de concebre com un servei de custodia de binaris "in eternum" si no com un servei d'intercanvi de binaris amb CPD/LdT.
<br/><br/>

<br/>
Si teniu qualsevol dubte o problema utilitzeu el canal de [Suport] (/sic/suport) o contacteu amb l'Oficina Tècnica Canigó CTTI a través del correu electrònic: **oficina-tecnica.canigo.ctti@gencat.cat**.
