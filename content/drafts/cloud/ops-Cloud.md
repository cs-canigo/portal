+++
date = "2018-06-16"
title = "Cloud. Tasques OPS del desenvolupament al Cloud"
description = "En aquest article es descriuen les tasques OPS del model DEVOPS aplicat als entorns cloud GENCAT."
sections    = "Cloud"
weight      = 4
toc = true
categories  = ["cloud","docker","container","kubernetes"]
key = "JUNY2018"
+++

# Tasques OPS del desenvolupament al Cloud

Dins del paradigma de desplegament al Container Cloud, l'equip de desenvolupament ha d'assumir certes tasques que en el model "On Premise" són pròpies de l'operativa de CPD.

![Cloud devops](https://canigo.ctti.gencat.cat/related/cloud/cloud_devops.JPG)

Les pròpies tecnologies utilitzades en el catàleg cloud com contenidors, i el desplegament en clouds públics fora del NUS, porta implícita l'assumpció de la responsabilitat de la configuració i el manteniment i securització de tots els elements que componen un desenvolupament. Les principals noves tasques que l'equip de desenvolupament haurà d'assumir es poden agrupar en les següents categories.

## Disponibilitat de l’aplicació
L'equip de desenvolupament ha de definir la parametrització a nivell de monitoratge dels elements disponibles dins de la plataforma cloud que s'utilitzi (llindars d'alarmes, helth checks, etc) així com les necessitats de backup per a la seva recuperació i la seva implementació.

## Monitoratge de la infraestructura
L'equip de desenvolupament té accés al monitoratge i defineix els mecanismes per a garantir la disponibilitat dels elements de l'aplicació, i assigna a un nou equip si no s'és autònom en la resolució de la disponibilitat.

## Dimensionament d’una aplicació
L'equip de desenvolupament ha de dimensionar l'aplicació i el seu creixement en totes les seves vessants, incloent qualsevol element facturable per ús tal com el consum de xarxa.

## Indicadors tècnics
L'equip de desenvolupament disposarà de les eines i visibilitat suficient per a extreure els indicadors de rendiment, capacitat i de cost de la seva aplicació.

## Seguretat de l’aplicació
L'equip de desenvolupament defineix i gestiona la seguretat a nivell no únicament de codi, sinó de Middleware, SO i xarxa. És també responsable del monitoratge dels accessos i de garantir la seguretat d'aquests.

## Gestió del canvi
L'equip de desenvolupament ha de garantir la vigència no únicament del codi, sinó de també dels Middlewares i SO utilitzats.

## Desplegament de l’aplicació
L'equip de desenvolupament inclou en el desplegament l'aplicació, el Middleware, la parametrització del middlware i el SO amb la seva parametrització.

## Resposta davant incidències
L'equip de desenvolupament serà el primer receptor de les incidències i peticions i tindrà les eines per a poder-les resoldre en la seva majoria. Havent d'escalar únicament aquelles que impliquin validació de cost per part del departament o incidències de plataforma. Aquest fet implica que l'aplicació ha d'estar configurada per tal que la gran majoria de tasques associades a incidències estiguin automatitzades.
