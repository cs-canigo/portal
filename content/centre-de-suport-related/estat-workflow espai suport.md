+++
date        = "2015-01-24T17:11:42+01:00"
title       = "Estats i workflow de l'espai de suport (incidències, consultes i peticions de canvi)"
description = ""
sections    = "Centre de Suport"
weight 		= 1
+++

### Introducció 

L'espai de suport permet reportar diferents activitats relacionades amb el Framework Canigó. Una activitat pot ser una incidència, una consulta o una petició de canvi.

 - Una incidència informa d'un bug en un servei, i per una versió concreta, del Framework Canigó. Aquest bug, si finalment és tal, ha d'acabar generant una petició de canvi (s'ha de fer una actualització del codi font de Canigó).
 - Una consulta planteja un dubte relacionat amb l'ús del Framework Canigó o bé amb el propi Framework Canigó.
 - De vegades, un projecte concret necessita una funcionalitat no desenvolupada en el Framework Canigó. En aquests casos, es pot sol- licitar una petició de canvi demanant aquesta nova funcionalitat. Per tal de poder valorar correctament la necessitat d'aquesta petició cal que s'informi amb el màxim detall possible el context (situació inicial que requereix del canvi), i necessitat del canvi (per què s'hauria de fer aquest canvi en el Framework. Si s'han provat solucions alternatives, resultat d'aquestes proves, ...).
 
 Aquests tipus d'activitats tenen definit un workflow que ens permet, en cada moment, identificar l'estat en què es troba l'activitat (si està assignada, si està en progrés, si està pendent, ...).

En els següents apartats s'expliquen els diferents estats pels quals pot passar una activitat i el que signifiquen cadascun d'ells. 

#### 1. Incidències i consultes.

<b>Estats</b>

 - <b>Nou</b>: el reportador ha donat d'alta una nova incidència o consulta. L'OT de Canigó s'encarregarà de classificar (indicar la seva prioritat) i assignar a una persona de l'Oficina Tècnica de Canigó la nova incidència o consulta.<br>
		- Estats següents: <b>Assignat</b>.
 - <b>Assignat</b>: la incidència o consulta ha estat assignada a una persona de l'Oficina Tècnica de Canigó que serà l'encarregada de la resolució i seguiment de la mateixa.<br>
		- Estats següents: En <b>progrés</b> (s'ha iniciat la resolució de la incidència o consulta), <b>Assignat</b> (es reassigna aquesta activitat a una altra persona de l'Oficina Tècnica de Canigó).
 - <b>En progrés</b>: la persona encarregada de l'activitat ha passat a estudiar la seva resolució.<br>
		- Estats següents: <b>Resolt</b> (la persona encarregada de l'activitat proposa una solució pel problema reportat), <b>Pendent</b> (la persona encarregada de l'activitat considera que falten dades per arribar a la resolució de la mateixa), <b>Assignat</b> (s'escala el problema perquè no es considera una incidència o consulta sinò una petició de canvi que cal estudiar i avaluar, en aquest cas l'activitat s'assignarà a la persona de l'equip encarregada dels Evolutius del Framework Canigó).
 - <b>Pendent</b>: l'OT de Canigó està en espera de què el reportador de l'activitat afegeixi les dades que se li han demanat.<br>
		- Estats següents: En <b>progrés</b> (el reportador ha afegit les dades que se li han demanat i es continua amb la resolució de l'activitat), <b>Tancat</b> per "<b>Falta d'informació</b>" (en aquest cas han passat tres o més dies des que es va sol- licitar més informació per la resolució de l'activitat i el reportador de la mateixa no l'ha afegida), <b>Assignat</b> (el reportador de l'activitat ha afegit les dades i així ho comunica, opció "<b>Dades afegides</b>").
 - <b>Resolt</b>: des de l'OT de Canigó s'ha donat una solució per l'activitat reportada.<br>
		- Estats següents: <b>Tancat</b< en aquest cas el reportador de l'activitat pot tancar-la indicant el grau de satisfacció de la solució proposada, valorant-la d'1 a 5. Anàlogament, l'OT de Canigó pot tancar l'activitat per "<b>Tancada automàticament</b>" en el cas que el reportador de l'activitat no l'hagi tancat havent transcorregut tres o més dies. Finalment, un altre estat al que es pot arribar a partir d'aquest és "<b>Assignat</b>", aquest és l'estat al que s'arriba quan el reportador de l'activitat no queda conforme amb la resolució donada, amb ell indica que vol que la persona encarregada de la resolució de l'activitat proposi una altra solució.
		
####  2. Peticions de canvi.

<b>Estats</b>

 - <b>Nou</b>: el reportador ha donat d'alta una petició de canvi. L'OT de Canigó s'encarregarà de classificar (indicar la necessitat d'aquest canvi) i assignar-la a una persona de l'Oficina Tècnica de Canigó la nova<br>
Estats següents: <b>Assignat, Resolt.</b>
 - <b>Classificat</b>: l'OT ha classificat la necessitat de la petició de canvi.<br>
Estats següents: <b>En valoració</b> en aquest estat, l'OT valora la necessitat del canvi i estudia la seva planificació.
 - <b>En valoració</b>: l'OT indica el temps inicial estimat per dur a terme el canvi demanat així com la versió en què es publicarà el canvi.<br>
Estats següents: <b>Aprovat</b> (el canvi demanat s'implementarà per futures versions de Canigó), <b>Pendent</b> (es requereixen mes dades per part del reportador de la petició de canvi per poder fer una valoració correcta de la petició de canvi), <b>Resolt</b> (no cal dur a terme el canvi indicat perquè aquest ja està resolt).
 - <b>Aprovat</b>: el canvi demanat s'implementarà per futures versions de Canigó.<br>
Estats següents: <b>Assignat</b>
 - <b>Assignat</b>: la petició de canvi ha estat assignada a una persona de l'Oficina Tècnica de Canigó que serà l'encarregada de la implementació del canvi.<br>
Estats següents: <b>En progrés</b>
 - <b>En progrés</b>: la persona encarregada de la petició de canvi comença la seva implementació.<br>
Estats següents: <b>Pendent</b> (manca informació per part del reportador del canvi per dur a terme la implementació del canvi) i <b>Resolt</b> (s'ha dut a terme el canvi sol- licitat).
 - <b>Pendent</b>: la implementació de la petició de canvi s'ha aturat momentàniament per falta de dades per part del reportador del canvi.<br>
Estats següents: <b>En Progrés</b> (el reportador ha indicat la nova informació i es continua amb la implementació del canvi) i <b>Tancat</b> (el reportador de la petició de canvi no inclou les dades demanades, es tanca la petició de canvi).
 - <b>Resolt</b>: s'ha finalitzat el canvi en el codi font del Framework Canigó.<br>
Estats següents: <b>Tancat</b> (s'ha finalitzat el canvi) i <b>Classificat</b> (es reobre la petició de canvi, cal tornar a estudiar-la per classificar-la convenientment).
 - <b>Tancat</b>: s'ha finalitzat el canvi.<br>