+++
date        = "2016-02-15"
title       = "Desenvolupament web. Discontinuació dels Applets Java"
description = ""
section     = "Notícies"
categories  = ["desenvolupament", "canigó"]
+++

Com bé sabeu la tecnologia dels applets està entrant en obsolescència i se n’està discontinuant el suport per part dels diferents actors del mercat:

* **Navegadors**: no es poden executar sobre Google Chrome des de setembre de 2015 en què es va deixar de donar suport a l’especificació NPAPI. La resta de navegadors també seguiran aquesta via (https://java.com/en/download/faq/chrome.xml)

* **Màquina virtual Java**: a partir de la versió 9 de Java, Oracle deixarà de donar suport als applets. Està previst que aquesta versió es publiqui l’abril de 2017. Cal fer esment que encara que es disposés d’un navegador que suportés l’execució d’applets no els podria executar quan la jvm del PC sigui la versió 9 (https://blogs.oracle.com/java-platform-group/entry/moving_to_a_plugin_free)

Des de la Unitat d’Arquitectura estem avaluant les diferents alternatives tecnològiques que hi ha a l’ús dels applets en funció del seu cas d’ús a les aplicacions de la Generalitat de Catalunya. 

Actualment, tenim identificats els casos d’ús següents:

* Accés a maquinari (perifèrics del PC):

	* **Accés a lectors de targes per la signatura digital des del navegador**. L’exemple més rellevant és el que es coneix com a “applet de CatCert”. L'AOC està en procés de construcció d’una alternativa a aquesta funcionalitat.  Estem fent seguiment amb ells per avaluar els impactes del canvi sobre els sistemes d’informació de la Generalitat. Al llarg de la propera setmana ja disposaran d’una primera versió sobre un entorn de proves i començaran les proves internes dins AOC.

	* **Accés a impressores**. Com per exemple, l’applet d S@rcat que permet accedir a la impressora de registre de documents.

	* **Accés a escàner**

* Accés a programari:

	* **JClic**: aquest applet s'utilitza per a fer córrer aplicacions educatives que es dissenyen amb el Generador de JClic

	* **Edició de documents**. Applet que s’utilitza per a poder editar documents amb un openOffice instal·lat al PC, convertir-los a pdf, etc.

	* **Comparador de documents de MS Word**

	* **Gestió de dades a client**: per temes de performance en aplicacions antigues s'utilitzaven applets per a emmagatzemar dades poc volàtils per a evitar anar a buscar-les al servidor

	* **Generació de pantalles a client**

Durant les properes setmanes publicarem les alternatives per substituir aquesta tecnologia a les aplicacions.
	