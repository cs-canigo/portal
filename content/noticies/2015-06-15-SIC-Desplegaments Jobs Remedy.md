+++
date        = "2015-06-15"
title       = "SIC. Peticions desplegament via Remedy"
description = "Fins ara totes les peticions de desplegament de les aplicacions a entorns PRE i PRO realitzades des del SIC es demanaven via correu a SAU (sau.ctti@gencat.cat). El SIC està evolucionant per tal que aquestes peticions de desplegament es sol·licitin via Remedy a mida que van migrant les aplicacions a aquest nou sistema."
section     = "Notícies"
categories  = ["sic"]
key 		= "JULIOL2015"
+++

Fins ara totes les peticions de desplegament de les aplicacions a entorns PRE i PRO realitzades des del SIC es demanaven via correu a SAU (sau.ctti@gencat.cat). El SIC està evolucionant per tal que aquestes peticions de desplegament es sol·licitin via Remedy a mida que van migrant les aplicacions a aquest nou sistema.
Per tal d'assolir aquest objectiu s'estan adaptant els jobs de Jenkins del SIC per tal d'integrar-se amb Remedy. Aquesta integració es realitzarà en 2 fases:

+ 1a Fase: Es deshabilitarà l'execució de tots els jobs de PRE/PRO de les aplicacions que ja es trobin a Remedy. Gràcies a un sistema d'alertes seran fàcilment identificables els jobs afectats. A més, s'han enviat comunicats informatius als usuaris Release Manager d'aquestes aplicacions.
+ 2a Fase: S'implementarà la integració SIC - Remedy per tal de permetre que els jobs obrin peticions de desplegament a PRE/PRO mitjançant la generació d'un canvi en mode DRAFT a Remedy. S'aplicarà aquesta integració als jobs deshabilitats i es reactivaran. La previsió es que a finals de Juliol es realitzi aquesta activació.

Mentre no s'hagi completat aquesta integració, el procediment que caldrà seguir per a demanar desplegaments d’aquestes aplicacions serà el definit per Gestió de Serveis, és a dir, obrint una RFC directament a Remedy demanant el desplegament i indicant a CPD la ubicació de l'artefacte i les instruccions de desplegament.

Una vegada completat, a mesura que les aplicacions amb jobs al SIC migrin a Remedy, l'equip del SIC actualitzarà els jobs de desplegament per tal que utilitzin aquesta via.

L'escenari final contempla que totes les aplicacions estiguin integrades a Remedy, però fins llavors al SIC ens trobarem en una situació com la següent:

<CENTER>![SIC-Desplegament-Remedy.png](/images/news/SIC-Desplegament-Remedy.png)</center>

Per qualsevol dubte relatiu a aquesta integració del SIC amb Remedy us podeu posar en contacte amb l'equip del SIC a la bústia del [SIC](mailto:sic.ctti@gencat.cat).