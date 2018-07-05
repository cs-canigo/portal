+++
date        = "2018-06-28"
title       = "SIC. Generació de sites web amb Hugo"
description = "En aquest article s'explica el procediment d'integració i el funcionament d'una web generada amb Hugo."
sections    = ["Notícies","home"]
categories  = ["sic"]
key         = "JULIOL2018"
+++

El passat mes de juny es va integrar el generador Hugo al SIC, que permet generar webs amb contingut estàtic d'una forma còmoda, fiable i eficient.

## Què és Hugo?

Hugo és un dels molts **generadors de webs estàtiques** que han sorgit en els darrers anys.

Un generador de webs estàtiques facilita la generació i la publicació dels continguts estàtics (HTML, CSS, elements multimèdia...) fins al punt que el manteniment del web no cal que es dugui a terme per part d'una persona amb perfil tècnic.

Amb l'ús de la senzilla sintaxi de Markdown, que permet aplicar estils, introduir enllaços i imatges amb facilitat, els usuaris poden generar continguts amb aspecte professional sense entrar en els detalls tècnics dels estils CSS i dels elements HTML.

A partir d'una configuració inicial (que sí requereix la participació d'un perfil tècnic), la posterior generació de continguts pot ser realitzada per un redactor sense coneixements tècnics. A tots els efectes pot substituir el paper d'eines dinàmiques de generació de blogs (com Joomla, Drupal o Wordpress) amb els avantatges de les webs estàtiques:

* **Més seguretat**: mai s'executa codi d'un gestor de continguts, ja que no n'hi ha. Les úniques vulnerabilitats possibles són les existents al propi servidor web.
* **Més eficiència**: el contingut mostrat pel servidor és estàtic, no cal generar-lo en cada accés.
* **Més mantenibilitat**: només cal mantenir el servidor web amb configuracions bàsiques. No cal configurar cap proxy al backend ni cap mena de CGI o procés PHP que s'encarregui de la generació del contingut.
* **Més robustesa**: L'arquitectura de la solució és més senzilla que en altres tipus de solucions. Seguint el principi KISS (* **K**eep **i**t **s**imple, **s**tupid!*). La intervenció de menys elements d'arquitectura fa que hi hagi menys elements susceptibles de fallar.
* **Més escalabilitat**: A més de ser més eficients i més robustes, aquestes solucions escalen millor i tenen més tolerància a pics d'accés.

Com inconvenient, òbviament, per a webs que requereixin més funcionalitat que la de mostrar continguts (passarel·les de pagament, operatives funcionals, etc.) es requerirà disposar de continguts dinàmics i caldrà adoptar una altra solució.

## Exemples de webs amb Hugo

A CTTI ja s'està emprant aquest generador estàtic de webs. Webs com aquest mateix d'**Arquitectura** o com el de **Solucions Corporatives** han estat generats amb aquesta eina.

## Ús d'Hugo al SIC

Si disposeu d'un web estàtic generat amb Hugo, per integrar-lo al SIC caldrà que seguiu el procediment estàndard d'integració:

1. Repositar el web al Gitlab del SIC, dins del codi d'aplicació adient.
2. Crear la carpeta `/sic` a l'arrel del projecte i incloure l'arxiu `/sic/sic.yml` per incloure la versió cada cop que feu un push.
3. Un cop estiguin creats aquests arxius, ja s'haurà integrat l'aplicació al SIC i en cada push haureu de confirmar el desplegament als entorns de PRE i PRO. Si disposeu d'entorn d'INT, el desplegament es farà automàticament.

Internament la pipeline generarà el web a una carpeta temporal i generarà un arxiu .zip que consistirà en l'artefacte estàtic que es desplegarà als servidors web de cada entorn.

També teniu disponible tota la informació relativa al seu funcionament al [Manual d'Usuari del SIC](/related/sic/manual-usuari.pdf).
