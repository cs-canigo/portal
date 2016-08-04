+++
date        = "2016-05-28"
title       = "Canigó. Actualització d'aplicacions Canigó 3.0 a Canigó 3.1"
description = "Recordatori del procediment per a realitzar l'actualització d'aplicacions Canigo 3.0 a Canigó 3.1"
sections    = ["Notícies", "home"]
categories  = ["canigo"]
key         = "JUNY2016"
+++

Amb motiu de la recent publicació del mòdul d'[Administració de Logs de Canigó](/noticies/2016-04-14-Canigo-Administracio-Logs/), el qual té com a requisit l'ús de Canigó 3.1, us recordem com procedir per a realitzar l'actualització d'una aplicació Canigó 3.0 a Canigó 3.1. Els passos a efectuar per a realitzar l'actualització els podeu trobar en aquest [howto](/related/canigo/howto/Canig%C3%B3+-+Howto+-+Actualitzacio+Canig%C3%B3+3.0+a+Canigo+3.1.pdf).

En cas de realitzar l'actualització en una aplicació basada en arquitectura REST+HTML5/JS, i no JSF (JavaServer Faces), el frontend no es veu afectat per l'actualització. Si l'aplicació Canigó 3.0 que s'actualitza utilitza JSF cal analitzar en detall la compatibilitat de les vistes (.jsf, .xhtml) i els seus components de presentació (Primefaces, Richfaces, ...) respecte a JSF 2.2. En aquest cas l'impacte pot ser major.

Canigó 3.1 es va alliberar a finals del 2014 amb els següents canvis com a més destacables:

* *Actualització de llibreries*:

|   | Canigó 3.0   | Canigó 3.1 |
|---|--------------|------------|
| __Spring Framework__ | 3.0.3.RELEASE | 4.1.0.RELEASE |
| __JPA__ | 1.0 | 2.1 |
| __Hibernate__ | 3.3.2.GA | 4.3.6.Final |
| __Servlet API__ | 2.5 | 3.0.1 |
| __JSF__ | 2.0 | 2.2 |
| __PICA__ | 1.6.3  | 1.9.2 |

* *Revisió de llibreries*: eliminació de llibreries innecessàries i unificació de llibreries entre els diferents mòduls

Per a qualsevol dubte referent al procés d'actualització de Canigó 3.0 a 3.1 podeu obrir una consulta o petició de suport al [servei CAN del JIRA CSTD](https://cstd.ctti.gencat.cat/jiracstd/browse/CAN).
