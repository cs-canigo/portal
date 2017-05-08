+++
date        = "2017-05-05"
title       = "Recordatori sobre el sistema d'accessos als repositoris SVN del SIC per a Release Managers"
description = "S'han detectat dubtes per part de proveïdors d'aplicacions i responsables d'àmbit pel que fa al sistema d'accessos dels Release Manager a repositoris SVN del SIC. Aquest article pretén recordar com funciona el sistema d'accessos d'aquests usuaris als repositoris SVN del SIC i les restriccions a tenir en compte a l'hora de demanar-los."
sections    = ["Notícies", "drafts"]
categories  = ["sic"]
key         = "MAIG2017"
+++

S'han detectat dubtes per part de proveïdors d'aplicacions i responsables d'àmbit pel que fa al sistema d'accessos dels Release Manager a repositoris SVN del SIC. Aquest article pretén recordar com funciona el sistema d'accessos d'aquests usuaris als repositoris SVN del SIC i les restriccions a tenir en compte a l'hora de demanar-los.

Els repositoris SVN del SIC no van ser concebuts com a repositori de treball sinó per al lliurament de versions codi font (més endavant es van permetre també l'ús per a la compartició de binaris amb CPD). Per aquest motiu, no és necessari que cada desenvolupador hagi de poder fer pujades al SVN del SIC. Les pujades s'haurien de centralitzar en determinades persones de l'equip, escollides per el mateix Lot. El SIC s'acull a aquesta filosofia de treball i contempla l'accés per a aquesta figura, la del Release Manager Lot i Àmbit (RML en endavant).

Un desconeixement força comú que s'ha observat és el fet que molts usuaris demanen accés al SVN a una o diverses carpetes de codi d'aplicació particulars. Els accessos no es proporcionen a nivell de carpetes de codi d'aplicació sinó a conjunts de carpetes de codi d'aplicació d'un mateix Lot i àmbit. 

En crear un repositori SVN, es concedeix accés a aquest al grup RML corresponent, segons Lot que la mantingui i àmbit de l'aplicació. Per tant, a l'hora de demanar l'accés per a un usuari, cal demanar-ho com a RML d'aplicacions d'un Lot i àmbit determinat.

![Accés per a RML](/images/news/accessosRML.png)

Altres aspectes que cal tenir en compte a l'hora de fer peticions d'accés al SVN són:

* L'alta ha de ser canalitzada a partir d'un dels responsables d'àmbit per part CTTI. El formulari d'alta/accés pot ser emplenat pel Lot però la petició a Remedy l'haurà de realitzar algun dels responsables de l'àmbit.
* El SIC limita a 3 el nombre d'usuaris RML de Lot i àmbit. S'entén que en determinats escenaris és requerit disposar-ne de més i en alguns casos i sota estudi s'ha contemplat ampliar-ho.

