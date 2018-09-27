+++
date        = "2018-09-27"
title       = "Serverless Computing o FaaS"
description = "Com a evolució dels serveis oferts al nuvol, apareix un nou concepte anomenat FaaS (Function as a service) o Serverless Computing (Informàtica sense Servidor) que proporciona una plataforma que permet als clients desenvolupar, executar i gestionar les funcionalitats de l'aplicació sense la complexitat de construir i mantenir la infraestructura associada al desenvolupament i llançament d'una aplicació."
sections    = ["Blog", "home"]
blog_tags   = ["cloud","nuvol","FaaS","Serverless"]
categories  = ["Cloud Services"]
imatge      = "/images/bloc/201809/FaaS.png"
key         = "SETEMBRE2018"
+++

## Introducció

Serverless computing, també conegut com a Function as a service (FaaS), és una categoria de serveis de cloudcomputing que proporciona una plataforma que permet als clients desenvolupar, executar i gestionar les funcionalitats de l&#39;aplicació sense la complexitat de construir i mantenir la infraestructura associada al desenvolupament i llançament d&#39;una aplicació.

![FaaS logo](/images/bloc/201809/FaaS.png)

## Origen i Motivació

Des de fa anys s&#39;està incorporant als desenvolupaments l&#39;arquitectura de microserveis, una forma d&#39;arquitectura SOA (ServiceOrientedArquitecture). Les aplicacions basades en microserveis divideixen la funcionalitat en serveis especialitzats, molt desacoblats i que comuniquen entre ells i col·laboren a través d&#39;API&#39;s.
La contrapartida dels microserveis és l&#39;augment en les tasques de gestió i manteniment d&#39;infraestructura, el que comporta que només sigui recomanable per aplicacions molt grans a empreses grans.
Per cobrir aquest inconvenient en els microserveis apareix el ServerlessComputing, que permet als equips de desenvolupament centrar-se a definir cada funcionalitat i cada lògica de negoci, deixant a banda tots els aspectes relacionats amb la infraestructura com són:

- Aprovisionament de servidors
- Manteniment i gestió de servidors
- Escalabilitat de l&#39;aplicació
- Disponibilitat i tolerància a errors

## Casos d&#39;ús

El Serverless computing encaixa molt bé per càrregues de treball que responen a peticions entrants, els events inclouen:

- Temporitzadors / tasques programades
- Crides HTTP per escenaris API i WebHook
- Cues

També es pot fer ús d&#39;aquesta tecnologia per altres tipus d&#39;aplicacions com són:

- Processament de dades
  - Processament d&#39;arxius en temps real
  - Processament de transmissions en temps real
  - Extracció, transformació i carrega
- Back-ends
  - Back-end per a IOT: Per administrar sol·licituds web, mòbils, Internet de les coses i API de tercers
  - Aplicacions Web

## Quins són els avantatges i inconvenients?

**Respecte als avantatges podem destacar:**

**Cost**

Amb l&#39;arquitectura FaaS pagues només quan s&#39;està executant el teu codi, si no hi ha funcions actives no hi ha cost. Per exemple, si el teu codi només s&#39;executa un cop al dia amb una durada de 15 minuts, es factura 1 unitat d&#39;execució i 15 minuts de còmput.

**Operacions**

Una arquitectura sense servidor significa que els desenvolupadors i els operadors no necessiten dedicar temps a configurar i ajustar polítiques, el proveïdor del núvol s&#39;encarrega de garantir que la capacitat sempre satisfà la demanda.

**Productivitat**

En la informàtica sense servidor, les unitats de codi exposades al món exterior són funcions simples. Això vol dir que, normalment, el programador no ha de preocupar-se per la transmissió multidireccional o per gestionar directament les sol·licituds HTTP al seu codi, simplificant la tasca del desenvolupament de programari de fons.

**Independència amb el Proveïdor**

Existeixen biblioteques intermèdies que s&#39;encarreguen d&#39;unificar els diferents models dels principals proveïdors de forma que les funcions que es creïn puguin executar-se en els núvols més populars. La més coneguda d&#39;aquestes biblioteques és Serverless (https://serverless.com/), que a més es Open Source.

**Alguns dels inconvenients de FaaS inclouen:**

**Rendiment**

El codi sense servidor utilitzat amb poca freqüència pot patir una major latència de resposta que el codi que s&#39;executa contínuament en un servidor dedicat, màquina virtual o contenidor. Això és degut al fet que, a diferència de l&#39;autocompressió, el proveïdor del núvol normalment &quot;atura o li treu prioritat&quot; al codi sense servidor quan no està en ús. Això vol dir que si el temps d&#39;execució (per exemple, el temps d&#39;execució de Java) requereix una quantitat considerable de temps per arrencar, crearà una latència addicional.

**Límits de recursos**

El programari sense servidor no és adequat per a algunes càrregues de treball computacionals, com ara l&#39;alt rendiment, a causa dels límits de recursos que imposen els proveïdors de núvol i també per que és probable que sigui més econòmic proporcionar massivament el nombre de servidors que es consideren necessaris en qualsevol moment en el temps.

**Seguiment i depuració**

El diagnòstic del rendiment o els problemes d&#39;ús de recursos excessius amb el codi sense servidor pot ser més difícil que amb el codi del servidor tradicional, ja que, tot i que es poden programar funcions completes, normalment no hi ha cap possibilitat d&#39;aprofundir en afegir perfils, depuradores o eines de monitoratge. A més, l&#39;entorn on s&#39;executa el codi no sol ser de codi obert, de manera que les seves característiques de rendiment no es poden reproduir exactament en un entorn local.

**Seguretat**

Serverless a vegades es considera erròniament més segur que les arquitectures tradicionals. Tot i que això és cert en certa manera perquè les vulnerabilitats del SO són ateses pel proveïdor del núvol, la superfície d&#39;atac total és significativament més gran, ja que hi ha molts més components per a l&#39;aplicació en comparació amb les arquitectures tradicionals i cada component és un punt d&#39;entrada a l&#39;aplicació sense servidor . A més, les solucions de seguretat que els clients solien tenir per protegir les seves càrregues de treball en el núvol es converteixen en irrellevants perquè els clients no poden controlar i instal·lar res al punt final i al nivell de xarxa com IDS / IPS.

## Tecnologia amb futur o només es tracta d&#39;una moda?

La informàtica sense servidor o FaaS és una evolució dels serveis oferts al núvol i encara que es tracta d&#39;una tecnologia nova són molts els operadors de CloudComputing que ofereixen serveis de funcions &quot;Sense Servidor&quot;, entre ells podem destacar els següents:
- Microsoft amb AzureFunctions.
- Amazon amb AWS Lambda.
- Google amb Google CloudFunctions

## Lectures relacionades

[**https://en.wikipedia.org/wiki/Function\_as\_a\_service**](https://en.wikipedia.org/wiki/Function_as_a_service)

[**https://aws.amazon.com/es/lambda/features/**](https://aws.amazon.com/es/lambda/features/)

[**https://azure.microsoft.com/es-es/services/functions/**](https://azure.microsoft.com/es-es/services/functions/)

[**https://cloud.google.com/functions/docs/**](https://cloud.google.com/functions/docs/)

[**https://www.ibm.com/cloud/functions**](https://www.ibm.com/cloud/functions)

[**https://serverless.com/**](https://serverless.com/)

[**https://www.slideshare.net/bennybauer1/serverless-when-to-faas**](https://www.slideshare.net/bennybauer1/serverless-when-to-faas)

