+++
date        = "2019-05-07"
title       = "Exemples i ajuda Plantilla DA"
description = "Plantilla DA"
sections    = "Document Arquitectura"
weight      = 3
categories  = ["Document Arquitectura","DA","Plantilla"]
+++

<a href='{{<relref "#RTORPO" >}}'>Prova link</a>
<a href='{{<relref "#NivellDisc" >}}'>Prova link2</a>

## Vista Desplegament:
### *1 Tipus de Servei {#TipusServei}
- PaaS
- IaaS
- Hosting

### *2 Possibles opcions de Nivell de Servei {#NivellServei}
- Continu - AD	24x7   
- Continu	24x7
- Laboral - AD	12x5
- Laboral	12x5
- No productiu	12x5

### *3 Tipus d’emmagatzematge {#TipusDisc}
- Blocs: Aquest tipus d’emmagatzematge està especialment pensat per quan es necessita una capacitat de disc dur en brut, com per exemple, espai per a una BBDD Oracle.
- Fitxers: Aquest tipus d’emmagatzematge està especialment pensat per quan l’usuari necessita accés a una carpeta compartida de fitxers.

### *4 Nivell de disc  {#NivellDisc}
- Alt rendiment (TIER 1). Dades d’alta criticitat, fitxers que s’accedeixen sovint, etc.
- Mig rendiment (TIER 2). Fitxers que no s’accedeixen gaire sovint. 
- Alta Capacitat (TIER 3). Copies de seguretat.

### *5 RTO i RPO {#RTORPO}
- RTO: 2 hores / 8  hores / 12 hores
- RPO: RPO Zero (No pot perdre cap transacció) /  RPO Darrer Backup
