+++
date        = "2018-05-18"
title       = "Canigó. Evolució Mòdul de Traces"
description = "Analitzem l'evolució realitzada en el mòdul de traces a Canigó 3.2, recomanacions en quan al seu ús, i l'evolució a futur prevista per aquest servei"
sections    = ["Notícies"]
categories  = ["canigo"]
key         = "JUNY2018"
+++

El [**Mòdul de Traces**](https://canigo.ctti.gencat.cat/canigo-documentacio-versions-3x-core/modul-traces/) va ser actualitzat de Log4j 1.x a Log4j 2.x a Canigó 3.2. Amb aquesta actualització es va pretendre dotar a les aplicacions Canigó de totes les avantatges que suposa l'ús d'aquesta nova versió de la llibreria:

* Loggers asíncrons:
* Nivells de log personalitzats:
* Reconfiguracions en calent:
* Suport a lambdas:
* Filtres
* Plugins
* Suport a APIs:
* Traces de misatges personalitzats:
* Millores de concurrència:
* Configuració en diferents formats: fitxer XML, JSON o YAML, a més de configuració programàtica

Volem destacar la importància, pel que fa a aspectes de rendiment de les aplicacions, l'ús de loggers asíncrons. Aquests representen una gran millora respecte els síncrons, sobretot si el registre de les traces s'ha de realitzar en un destí amb una latència considerable (Ex. filesystem en un NAS). S'ha de tenir en compte que per obtenir aquest rendiment, es perd en fiabilitat ja que alguns events podríen arribar a perdres. Per aquest motiu, no es recomana el seu ús en auditoríes.

### Futur


