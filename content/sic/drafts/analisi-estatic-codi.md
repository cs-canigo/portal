+++
date        = "2018-11-21"
title       = "Anàlisi estàtic de codi al SIC"
description = "Automatització de l'anàlisi de qualitat de codi a les pipelines del SIC"
sections    = "SIC"
taxonomies  = []
weight 	    = 12
draft       = true
+++


## Anàlisi estàtic de codi al SIC

A les pipelines del SIC existeix un stage per l'anàlisi estàtic de codi, stage que fins ara estava buit a l'espera de definir.

Conjuntament amb l'Oficina de Qualitat CTTI s'ha implementat aquest stage que permetrà executar l'anàlisi estàtic de codi.

Aquest stage tindrà, per defecte, un temps màxim d’execució de 5 minuts.

En el cas excepcional que es necessiti més temps per dur a terme l'execució, es podrà configurar un nou timeout mitjançant un paràmetre (expressat en **minuts**) en un fitxer de configuració ubicat en el path de cada projecte:

`/sic/sic.yml`

A més a més, s’ha afegit un mecanisme per tal de activar/desactivar aquest anàlisi, és a dir,  es pot configurar si aquest stage s’ha d’executar o no. 
Aquesta configuració, com la de abans (timeout) es fa mitjançant el paràmetre **active** al fitxer de configuració.

Exemple de configuració de timeout i active al sic.yml

```
version: 1.0.1
stages:
   - id: analisiCodiEstatic
     timeout: 2
     active: true

```

Com es pot observar, els dos paràmetres han d’estar sota l’id analisiCodiEstatic.
Per més informació sobre els requeriments i procediments per aquest anàlisi, adreçar-se a la web de l’Oficina de Qualitat https://qualitat.solucions.gencat.cat
