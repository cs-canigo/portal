+++
date        = "2024-08-09"
title       = "Proves de rendiment"
description = "Procediment de les proves de rendiment per a l'API Manager"
sections    = "APIM"
weight      = 6
+++

El procediment per a la sol·licitud de proves de rendiment a l’API Manager Corporatiu compta amb els següents passos:

1.	El **proveïdor d'aplicacions** ha de obrir un **tiquet JIRA ACOAPIM** sol·licitant les proves de rendiment. Al tiquet JIRA cal indicar el següent:
    1.	Les **APIs** sobre les que es faran les proves de rendiment.
    2.	El **volum de crides (per hora i totals)** que es realitzaran per cadascuna de les APIs que intervenen en les proves de rendiment. 
    3.	**L’horari** proposat per a fer les proves. L’horari s’hauria d’ajustar entre **dilluns i dijous a partir de les 15h**.
    4.	**Entorn** sobre el qual es proposen fer les proves (normalment l’entorn sobre el qual se sol·licitaran serà **PREPRODUCCIÓ**).
    5.	Si es requereix rebre alguna **evidència per part de CPD** de quin ha estat el rendiment de la infraestructura del API Manager durant la prova.

2.	**L’oficina tècnica d’API Manager/Responsable del servei** validaran si la proposta feta de proves de rendiment és assumible a nivell de volum de crides i d’horari. 
    1.	Si la petició és, en principi, **assumible** a nivell de volum i d’horari, la **oficina tècnica de API Manager** es comunicarà llavors amb **CPD** per informar-vos de l'horari en què es realitzarà la prova i, en cas d'haver estat sol·licitat pel **proveïdor d'aplicacions**, per a activar la recol·lecció de mètriques sobre la infraestructura de API Manager durant aquest horari. 
	    1.	Si **CPD accepta** aquesta data, llavors la petició tirarà endavant.
	    2.	Si **no**, proposarà un nou horari.	  
    2.  **L'oficina técnica de API Manager** contestarà al **proveïdor d'aplicacions** al **ticket JIRA ACOAPIM** indicant si s’accepta la petició o no. 
        1.	Si **s’accepta** la petició, **l’oficina tècnica d’API Manager Corporatiu** obre una **Workorder** a **Remedy** sol·licitant a **CPD** que és requerida la dedicació d'un tècnic de SO durant la finestra d'intervenció per coordinar-la i, en cas d'haver estat sol·licitat pel **proveïdor d'aplicacions**, la recol·lecció de mètriques sobre la infraestructura d’API Managar durant l'horari de les proves.
        2.	Si **no s’accepta** per volum o horari, es realitzarà una **contraproposta** indicant al **proveïdor d'aplicacions** quin podria ser un volum acceptable per a fer les proves i un horari assumible. Es tornarà a passar per **tot el punt 2** un cop el **proveïdor d'aplicacions** accepti la contraproposta.

3.	El **proveïdor d'aplicacions** executa les proves de rendiment.

4.	**CPD** estarà atent durant l’execució de les proves per si calgués reiniciar algun dels serveis (**en funció del nivell de servei contractat amb CPD de la infraestructura afectada**) derivat de la càrrega ocasionada sobre el servei de l’API Manager durant les proves de rendiment.

5.	**CPD** facilitarà les mètriques de les proves de rendiment a **l'oficina tècnica de API Manager**, en cas d’haver estat sol·licitades, a través de la Workorder. Després, **l'oficina tècnica de API Manager** proporcionarà les mètriques al proveïdor mitjançant el **tiquet JIRA ACOAPIM** obert.

6.	Si hi ha hagut algun **problema** en l’execució de les proves i el **proveïdor d'aplicacions** necessita tornar-les a llançar, el **proveïdor d'aplicacions** tornarà a proposar un **nou volum de crides i horari d’execució de les proves** i es tornarà al **punt 2** del present procediment.