+++
date        = "2019-01-02"
title       = "Què és el Servei d'Integració Contínua"
description = "Conceptes, motivació, modalitats d’integració i serveis que es proporcionen"
sections    = "SIC"
toc         = true
aliases = [
   "/sic/about/"
]
taxonomies  = []
weight 		= 1
+++

## Conceptes i motivació

La integració de les diferents peces de programari que componen una aplicació és un repte present en tot projecte de desenvolupament. 
Sovint apareixen **problemàtiques** com els següents:

* Proves d'integració ajornades fins moments massa propers al desplegament.
* Alt cost de correcció dels errors.
* Visibilitat baixa de l'estat de construcció dels projectes.
* Manca d'homogeneïtat en les eines utilitzades.
L'existència d'un servei que gestioni el cicle de vida d'aquestes peces i permeti automatitzar certes tasques i donar visió global proporciona molts **beneficis**, entre els quals podem citar:
* Reducció en els costos de manteniment de les aplicacions.
* Augment de la qualitat i fiabilitat de les aplicacions.
* Donar visibilitat de les activitats, lliurables i estat del desenvolupament dels projectes.
* Disposar d'un conjunt d'eines comunes en la construcció de les aplicacions.
* Establir un repositori comú on ubicar el codi font de les aplicacions.
* Simplificar i reduir el temps de desplegament als diferents entorns.
A més, el concepte d'integració contínua permet disposar permanentment d'una versió del codi provinent d'un repositori controlat i amb uns paràmetres de qualitat mesurables.
El Servei d'Integració Contínua (SIC) neix amb l'objectiu de donar aquest suport al cicle de vida de manera centralitzada i amb un cost reduït, ja que està basat en tecnologies de programari lliure.

## Modalitats d’integració

Es contemplen dos tipus de modalitats d’integració de les aplicacions al SIC:

* **Integracions automatitzades**: es fa ús de les eines per la custòdia de codi font i les eines de construcció i desplegament automatitzat d’artefactes. Es divideixen en dos tipus:
	- Automatització en la construcció i desplegament fins a l’entorn d’integració i entrega dels artefactes a CPD a través del servei de gestió de binaris per a que CPD pugui realitzar el desplegament als entorns de preproducció i producció.
	- Automatització en la construcció i desplegament fins a l’entorn de producció. Actualment disponible per aplicacions desplegades al Cloud Públic.
* **Integracions sense automatització**: es fa ús de les eines per a la custòdia de codi font i és el proveïdor d’aplicacions qui s’encarrega de fer la construcció i lliurar els artefactes a través del servei de gestió de binaris per a que CPD pugui realitzar el desplegament.

## Serveis

### Custòdia de codi font

Quan l'equip de desenvolupament té una nova versió del codi font llesta per lliurar, es connecta al sistema de custòdia de codi font del SIC i efectua la pujada de la nova versió. <br/>
La persona de l'equip que efectua aquesta acció és la que té el rol de Release Manager o **Gestor de Lliuraments**. 
Tot i que qualsevol usuari de l'equip de desenvolupament podria accedir al servei de custòdia de codi font de SIC, es recomana que l'accés sigui efectuat només per les figures dels Release Manager. Es considera que l'equip de desenvolupament ja té el seu propi repositori de codi a les seves instal·lacions i que allà és on es fan les proves pertinents fins que es considera el codi llest per lliurar.

Per a més informació: [Custòdia de codi font](/sic-serveis/scm/)

### Integració contínua

El SIC té capacitat per a poder realitzar el **desplegament automàtic** d'un gran nombre d'aplicacions de diferents tecnologies a diferents entorns. 
Aquests es realitzen mitjançant l'eina d'Integració Contínua de SIC: Jenkins.

Es configurarà una única tasca per projecte que s'executarà automàticament amb cada pujada de codi al servei de custòdia de codi font.
La tasca inclourà accions de construcció d'artefactes, versionat de codi, execució de tests, anàlisi de codi i desplegaments a entorns no-productius i productius. En aquells entorns on no es pugui desplegar automàticament, el flux d'execució de la tasca s'aturarà esperant una resposta manual d'acceptació.

Per a més informació:

- [Integració contínua (SIC 3.0)](/plataformes/sic/serveis/sic30-serveis/ci/)

### Binaris

Si les aplicacions no permeten la construcció i desplegament d'artefactes mitjançant el sistema d'integració contínua, el SIC proporciona un servei per a que les aplicacions puguin **lliurar els artefactes** (.war, .ear, .jar, .zip, etc.) a CPD/LdT mitjançant el sistema de gestió de binaris de SIC. 

Per a més informació: [Binaris](/sic-serveis/binaris/)

### Autoservei d’usuaris

Els usuaris Release Managers, responsables de lot i tècnics de CPD assignats disposaran d’accés als corresponents serveis del SIC. No obstant, es podran incloure **nous membres del grup de Release Managers** mitjançant l’autoservei d’usuaris.

Per a més informació: [Autoservei d'usuaris](/sic-serveis/autoservei-usuaris/)
