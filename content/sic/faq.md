+++
date        = "2017-05-29"
title       = "FAQ SIC 2.0"
description = "Preguntes freqüents sobre els serveis SIC 2.0"
sections    = "SIC"
taxonomies  = []
weight 		= 3
+++

### **Què és SIC 2.0?** ####
És un conjunt d'evolutius i millores que s'han aplicat als serveis SIC. Entre aquestes destaca:

* Nou SCM : [GIT](https://git-scm.com/)
* Nou Portal de treball: [Gitlab](https://git.intranet.gencat.cat)
* Canvi al sistema de peticions d'alta de repositoris: Autoservei de repositoris de projectes a través del portal de treball Gitlab.
* Canvi al sistema d'accés: amb credencials d'usuari GICAR. No caldrà demanar altes d'usuaris, ja es troben bolcats de GICAR.
* Nous tipus de jobs Jenkins: Pipeline . Únic job que inclou Construcció + desplegament/petició desplegament a tots els entorns i que es dispara en fer una pujada de codi al Gitlab.

<br/>

#### **Què necessito per poder començar a treballar amb SIC 2.0?** ####

1) Client Git instal·lat a la màquina des d'on es faran les pujades. Aquest es pot descarregar des del [web oficial de Git](https://git-scm.com/downloads)

2) Usuari a GICAR, amb l'e-mail informat a la identitat.

<br/>


#### **Quina versió de GIT necessito tenir instal·lada per treballar-hi amb el Gitlab?** ####

La versió de GIT que fa servir el GITLAB de SIC és la 2.10.2. Segons la documentació oficial de GIT, qualsevol versió 2.X seria compatible. Tanmateix, recomanem utilitzar una versió igual o superior a la 2.7.X.

<br/>


#### **En accedir al Gitlab, contínuament em redirigeix a la pàgina del meu perfil i m'obliga a informar una adreça de correu. Cal fer alguna acció addicional?** ####

Cal tenir informat el correu electrònic a la identitat Gicar per tal que la informació es propagui al Gitlab. Caldria fer una petició de Suport al servei GICAR a través de SAU-Remedy per tal que actualitzin aquest camp.

<br/>

#### **Com puc migrar el codi dels repositoris SVN de SIC cap als del Gitlab?** ####
Caldrà:

* Comprovar que es disposa d'accés al grup d'aplicació al Gitlab. En cas que no es disposi d'accés, haurà de demanar a algun usuari Release Manager del Lot que li concedeixi mitjançant l'Autoservei d'usuaris del Gitlab.
* Crear el projecte de l'aplicació dins aquest grup.
* Publicar el repositori GIT local en aquest.
* Una vegada migrat el repositori, caldrà comunicar-ho a l'equip de SIC (consulta o petició de suport tècnic a Framework SIC via SAU-Remedy) per tal que desactivin l'accés d'escriptura al repositori SVN.
En cas de dubtes sobre el procediment, pot obrir una consulta a Remedy al servei de "Framework SIC".

<br/>

#### **Puc treballar simultàniament amb el repositori SVN i repositori Gitlab de la mateixa aplicació?** ####
No. En cas de fer-ho, seria difícil discernir quin dels 2 conté la darrera versió del codi. 

Per a les noves aplicacions, ja haurà de començar a treballar directament amb Gitlab. Per a aquelles aplicacions que migri del SVN cap al Gitlab haurà de deixar de treballar amb el repositori SVN, comunicar-ho a l'equip de SIC i fer servir únicament el repositori al Gitlab.

<br/>

#### **Fins quan podem utilitzar el SVN?** ####
La data planificada per al tancament definitiu del SVN és el **6 de Novembre de 2017**. Tots els repositoris SVN han d'estar migrats al Gitlab de SIC abans d'aquesta data.

<br/>


#### **Com afectarà la migració de codi de SVN a Gitlab als jobs Jenkins de l'aplicació?** ####
S'actualitzarà l'origen de dades d'aquests per tal que apuntin al repositori del projecte de Gitlab. Els nous jobs es crearan seguint el nou tipus de job Pipeline però els ja creats romandran amb el format actual.

<br/>

#### **Mantindré els meus accessos/rol de SIC 1.0 a SIC 2.0?** ####
Mantindrà el mateix rol o rols al Gitlab/Jobs Jenkins, ja que aquest s'han heretat de l'anterior sistema d'usuaris.

<br/>

#### **Si ja estic logat a GICAR, per què em torna a demanar les credencials en accedir als portals Gitlab/Jenkins del SIC?** ####
Els portals Gitlab/Jenkins del SIC no es troben adherits al Single Sign-On de GICAR (no llegeixen les capçaleres d'autenticació GICAR). L'autenticació i autorització es realitza contra l'LDAP del SIC, on s'han bolcat les dades dels usuaris GICAR.

<br/>


#### **Quina diferència hi ha entre grup d'aplicació i projecte dins el Gitlab de SIC?** ####

* Els projectes són les aplicacions (o mòduls d'aplicació, llibreries pròpies ,...) que tenen versionat de codi propi. 
* Els grups d'aplicació són els contenidors ('carpetes') on figuren els projectes. Reben per nom el codi d'aplicació. 

<br/>

#### **Quina diferència hi ha entre espai privat i espai corporatiu al Gitlab de SIC i a quin espai he de crear els projectes?** ####

Els usuaris Release Manager podran crear tant grups d'aplicació com projectes dins el seu espai personal al portal Gitlab. Per tal d''oficialitzar' a CTTI l'entrega del codi font d'un projecte, aquest haurà de figurar a l'espai corporatiu de SIC.

Els grups d'aplicació oficials només podran ser creats per l'equip del SIC. Els de les noves aplicacions es crearan arran les reunions de Fase0 de l'aplicació i els ja existents a partir de migracions de repositoris SVN.
Els projectes dins els grups d'aplicació sí que podran ser creats per els propis usuaris Release Manager mitjançant el portal Gitlab.

<br/>

#### **Puc crear subgrups dins els grups d'aplicació oficials al Gitlab?** ####
És possible crear subgrups dins un grup d'aplicació oficial (nom grup = codi aplicació) però de cara a la integració amb Jenkins, comportarà una incompatibilitat. Per tant, es desaconsella treballar amb subgrups (almenys dins els grups d'aplicació oficials).


<br/>

