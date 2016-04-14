+++
date        = "2016-03-31"
title       = "SIC. S'habiliten els desplegaments de sites estàtics al núvol"
description = "A partir d'aquest mes de març, el SIC comença a fer les seves primeres passes amb les tecnologies cloud integrant el desplegament de sites estàtics a Bluemix, el servei al núvol d'IBM."
section     = "Notícies"
categories  = ["sic"]
key         = "ABRIL2016"
+++

Un dels objectius que el SIC s'ha fixat enguany és ampliar el ventall de tecnologies i paradigmes que suporta per donar servei al màxim d'aplicacions possible. Amb la integració dels desplegaments de sites estàtics al núvol, s'inicia un nou camí en què es pretèn que el paraigua de la Integració Contínua acabi cobrint el 100% de les aplicacions de la Generalitat de Catalunya que requereixin desplegar-se en aquest nou tipus d'entorn.

El SIC ha publicat una nova versió del *Formulari d’alta d’aplicació per al Portal d’Integració Contínua (Tasques al Jenkins)* que podeu trobar a [la plana de Formularis del SIC del Portal](http://canigo.ctti.gencat.cat/sic-documentacio/formularis/). És mitjançant aquest formulari que es pot sol·licitar aquest nou tipus de desplegaments. Veureu que s’ha creat un nou apartat "Web estàtiques" per aplicacions d'aquest tipus.

### Sites estàtics a Bluemix

Val a dir que, com a primera aproximació a aquest nou escenari, el SIC ha decidit limitar-se al desplegament de sites estàtics a Bluemix, la solució Cloud d'IBM.

Bluemix permet per desplegar múltiples aplicacions i/o serveis ja siguin en forma de buildpacks --com és en aquest cas-- o d'altres --com per exemple contenidors Docker--. Aquests elements desplegats s'emmagatzemen dins d'un espai determinat que, alhora, pertany a una organització concreta. És a dir, una organització pot contenir múltiples espais que alhora poden contenir diverses aplicacions. Aquesta és la jerarquia utilitzada a Bluemix per estructurar les aplicacions i els serveis albergats.

<center>![sites_estatics_Bluemix.png](/images/news/sites_estatics_Bluemix.png)</center>

### Jobs de Jenkins

En principi, cada aplicació web estàtica al Bluemix requerirà la creació de tres jobs de jenkins:

* **Job de tipus BLD**: s'encarregarà de realitzar les mètriques de codi necessàries, la construcció de l'artefacte i la generació dels arxius de manifest per a cada entorn.
* **Job de tipus PRE**: s'encarregarà de realitzar la construcció de l'artefacte i el desplegament a Bluemix utilitzant l'arxiu de manifest per a aquest entorn.
* **Job de tipus PRO**: s'encarregarà de desplegar l'artefacte construït de forma satisfactòria en l'anterior entorn utilitzant l'arxiu de manifest per a aquest entorn.

### Properes passes

En futures ampliacions del servei, es pretén donar suport a múltiples tipologies d'aplicació així com a múltiples proveïdors d'infrastructura al núvol.

Com sempre, per a qualsevol dubte relatiu a aquest tema, ens podeu [obrir una consulta](http://canigo.ctti.gencat.cat/sic/peticions/) al servei "FRAMEWORK SIC" de SAU-Remedy .
