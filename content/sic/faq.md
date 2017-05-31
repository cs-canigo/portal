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

#### **Com puc migrar el codi dels repositoris SVN de SIC cap al Gitlab?** ####
En breu es proporcionaran instruccions per realitzar la de migració de contingut d'un SCM cap a l'altre.

<br/>

#### **Puc treballar simultàniament amb SIC 1.0 i SIC 2.0?** ####
Pot continuar treballant amb els repositoris SVN en els que ja havia pujat codi amb anterioritat. Per a les noves aplicacions, ja haurà de començar a treballar amb Gitlab.
No haurà de treballar en cap cas simultàniament amb el repositori SVN i repositori del projecte de la mateixa aplicació a Gitlab.

<br/>

#### **Com afectarà la migració de codi de SVN a Gitlab als jobs Jenkins de l'aplicació?** ####
S'actualitzarà l'origen de dades d'aquests per tal que apuntin al repositori del projecte de Gitlab. Els nous jobs es crearan seguint el nou tipus de job Pipeline però els ja creats romandran amb el format actual.

<br/>

#### **Mantindré els meus accessos/rol de SIC 1.0 a SIC 2.0?** ####
Mantindrà el mateix rol o rols al Gitlab/Jobs Jenkins, ja que aquest s'han heretat de l'anterior sistema d'usuaris. Respecte als accessos al Gitlab, tindrà visibilitat als grups d'aplicacions noves o que de projectes que s'hagin migrat des del SVN.

<br/>

#### **Si ja estic logat a GICAR, per què em torna a demanar les credencials en accedir als portals Gitlab/Jenkins del SIC?** ####
Els portals Gitlab/Jenkins del SIC no es troben adherits al Single Sign-On de GICAR (no llegeixen les capçaleres d'autenticació GICAR). L'autenticació i autorització es realitza contra l'LDAP del SIC, on s'han bolcat les dades dels usuaris GICAR.

<br/>

#### **CPD tindrà accés als binaris de l'aplicació que pugi al Gitlab?** ####
No. Al Gitlab no es permetrà la pujada de binaris (.jar, .war, .ear, .exe, .dll, ...) tal com es va habilitar al SVN. Per tant no caldrà que CPD hi accedeixi.

S'està treballant en un sistema alternatiu a SVN/Gitlab per a la compartició de binaris d'aplicació amb CPD. Aquest sistema es recolzarà amb el Jenkins de SIC.
La previsió és que es trobi enllestit a finals Juny 2017. En breu s'alliberarà més informació sobre el funcionament d'aquest sistema. Entretant, caldrà continuar emprant el SVN per a la compartició de binaris.

<br/>

#### **Quina diferència hi ha entre grup d'aplicació i projecte dins el Gitlab de SIC?** ####

* Els projectes són les aplicacions (o mòduls d'aplicació, llibreries pròpies ,...) que tenen versionat de codi propi. 
* Els grups d'aplicació són els contenidors ('carpetes') on figuren els projectes. Reben per nom el codi d'aplicació. 

Els accessos dels usuaris es maneguen a nivell de grups, no de projectes dins d'aquests.

<br/>

#### **Quina diferència hi ha entre espai privat i espai corporatiu al Gitlab de SIC i a quin espai he de crear els projectes?** ####

Els usuaris Release Manager podran crear tant grups d'aplicació com projectes dins el seu espai personal al portal Gitlab. Per tal d''oficialitzar' a CTTI l'entrega del codi font d'un projecte, aquest haurà de figurar a l'espai corporatiu de SIC.

Els grups d'aplicació oficials només podran ser creats per l'equip del SIC. Els de les noves aplicacions es crearan arran les reunions de Fase0 de l'aplicació i els ja existents a partir de migracions de repositoris SVN.
Els projectes dins els grups d'aplicació sí que podran ser creats per els propis usuaris Release Manager mitjançant el portal Gitlab.

<br/>

