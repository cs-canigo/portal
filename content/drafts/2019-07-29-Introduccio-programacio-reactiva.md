+++
date        = "2019-07-29"
title       = "Introducció programació reactiva"
description = "Introducció als conceptes de programació reactiva"
sections    = ["Notícies", "home"]
categories  = ["canigo"]
+++

### Introducció programació reactiva

La programació reactiva és un paradigma de programació enfocat a treballar amb fluxos de dades asíncrones. La seva concepció i evolució ha estat lligada a la publicació del [Reactive Manifesto](https://www.reactivemanifesto.org/), que estableix les bases dels sistemes reactius, que han de ser:

- **Responsius**: asseguren la qualitat del servei complint uns temps de resposta establerts
- **Resilents**: es mantenen responsius inclús en situacions d'errors
- **Elástics**: es mantenen responsius inclús en augments de càrrega de treball
- **Orientat a missatges**: minimitzem l'acoblament entre els components al establir interaccions basades en l'intercanvi de missatges de manera asíncrona

La programació reactiva segueix el patró de disseny Observer; quan hi ha un canvi a l'estat d'un objecte, els altres objectes són notificats i actualitzats segons el canvi. Per tant, en lloc de sondejar events pels canvis, els events es realitzen de forma asíncrona per a que els observadors puguin processar-los

La motivació darrera d'aquest nou paradigma procedeix de la necessitat de respondre a les limitacions d'escalat presents en els models de desenvolupaments actuals, que es caracteritzen per el seu desaprofitament del ús de la CPU degut al I/O, la sobreutilització de memòria i la ineficàcia de les interaccions bloquejants

<br>

### Exemple programació reactiva vs no reactiva

Un exemple dels beneficis d'una programació reactiva rau en l'ús eficient de recursos. Així per exemple, en els sistemes I/O sense programació reactiva inutilitzaríem recursos ja que els elements receptors han d'estar preguntant contínuament si hi ha hagut un canvi, per exemple, per saber si s'ha connectat algun component als nostres ports

En un sistema amb programació reactiva, si s'ha connectat algun component als nostres ports serà notificat als elements receptors en el moment de la connexió, poden utilitzar, mentre no hi ha l'event, els nostres recursos a altres accions

<br>

### Aplicació programació reactiva

Canigó amb la publicació de Canigó 3.4 proporciona les funcionalitats de programació reactiva

Per a conèixer l’aplicació de programació reactiva a Canigó podeu consultar [Mongodb reactiu](/canigo-documentacio-versions-3x-altres/modul-mongodb-reactiu/)
