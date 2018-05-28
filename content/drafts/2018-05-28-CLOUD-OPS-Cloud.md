+++
date        = "2018-05-28"
title       = "Cloud. Tasques OPS del desenvolupament al Cloud"
description = "En aquest article es descriuen les tasques OPS del model DEVOPS aplicat als entorns cloud GENCAT."
sections    = ["drafts"]
categories  = ["cloud"]
key         = "MAIG2018"
+++

# Tasques OPS del desenvolupament al Cloud

Dins del paradigma de desplegament al Cloud, l'equip de desenvolupament ha d'assumir certes tasques incloses en la part "operativa" de CPD en la infraestructura On Premise.

![Cloud devops](https://canigo.ctti.gencat.cat/drafts/cloud_devops.JPG)

Aquestes tasques apliquen als elements desplegats

## Disponibilitat de l’aplicació

El lot d'aplicacions ha de definir la parametrització a nivell de monitorització dels elements disponibles dins de la plataforma cloud que s'utilitzi (llindars d'alarmes, helth checks, etc) així com les necessitats de backup per a la seva recuperació i la seva implementació.
Monitorització de la infraestructura

## Dimensionament d’una aplicació
El lot d'aplicacions ha de dimensionar l'aplicació i el seu creixement en totes les seves basants, inclouent qualsevol elements facturable per ús tal com el consum de xarxa.
## Indicadors tècnics

El lot d'aplicacions té les eines i visibilitat suficient per a extreure els indicadors de rendiment, capacitat i de cost de la seva aplicació.


## Seguretat de l’aplicació

El lot d'aplicacions defineix gestiona la seguretat a nivell no únicament de codi, sinó de Middleware, SO i xarxa.
És també responsable de la monitorització dels accessos i de garantir la seguretat d'aquests.

## Gestió del canvi

El lot d'aplicacions ha de garantir la vigència no únicament del codi, sinó de també dels Middlewares i SO utilitzats.

## Desplegament de l’aplicació

El lot d'aplicacions inclou en el desplegament l'aplicació, el Middleware, la parametrització del middlware i el SO amb la seva parametrització.

## Resposta davant incidències

El lot d'aplicacions serà el primer receptor de les incidències i peticions i tindrà les eines per a poder-les resoldre en la seva majoria. Havent d'escalar únicament aquelles que impliquin validació de cost per part del departament o incidències de plataforma.
