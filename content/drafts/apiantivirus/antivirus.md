+++
date        = "2025-01-21"
title       = "Antivirus corporatiu"
description = "Antivirus corporatiu"
sections    = "APIANTIVIRUS"
weight      = 1
toc         = true
categories  = ["cloud","apiantivirus"]
+++



## Antivirus corporatiu


## Descripció del servei Antivirus corporatiu

La plataforma d’Antivirus corporatiu és una solució perquè les aplicacions desenvolupades a la Generalitat el puguin consumir amb l’objectiu de poder garantir la seguretat dels fitxers intercanviats. 
Symantec Protection Engine és l'eina utilitzada per a aquest propòsit.

L'aplicació consumidora del servei, envia el fitxer codificat i l'antivirus l'analitza i torna OK o KO

Existeixen dos entorns, a part del entorn obligatori de PRO, es disposa del entorn de PRE per facilitar la integració de l’aplicació a la infraestructura corporativa.

  ![Arquitectura](/images/antivirus/arquitectura.jpg)

## Metodologia d'Integració

La recomanació actual és realitzar l'integració via **[API](https://canigo.ctti.gencat.cat/plataformes/canigo/documentacio-per-versions/3.8LTS/3.8.0/moduls/moduls-integracio/modul-antivirus/)**

També és possible realitzar la integració amb el connector de  [Canigó](https://canigo.ctti.gencat.cat/plataformes/canigo/documentacio-per-versions/3.8LTS/3.8.0/moduls/moduls-integracio/modul-antivirus/) però aquesta opció tendirà a desaparèixer.



