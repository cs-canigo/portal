+++
date        = "2019-10-04"
title       = "SIC. Actualització de versió Gitlab"
description = "Durant el mes d'Octubre s'han dut a terme actualització del Servei de Custodia de Codi (Gitlab)"
#categories  = ["SIC"]
#sections    = ["Notícies", "home"]
+++

## Actualització del servei de Custodia de Codi

**Durant el mes d'Octubre s'han dut a terme actualització del Servei de Custodia de Codi a la versió 11.11.8 de Gitlab**.
<br>
Les principals novetats d'aquesta actualització són les següents:

*** Multiples assigats per Merge Request
No és infreqüent que diverses persones col·laborin en una funcionalitat en una branca compartida i sol·licitin una Merge Request, com ara una col·laboració d’enginyers frontend i backend, o en equips on els enginyers treballen sempre en parella com en Programació extrema.

A la versió 11.11 del Gitlab es proporciona que les Merge Request es pugui assignar diversos destinataris perquè totes les persones responsables del canvi puguin ser assignats a la Merge Request

*** Serialització dels grafics de commits
Moltes operacions habituals de Git requereixen consultar el gràfic de commits. Aquestes operacions són més lentes a mesura que creix el nombre de commits perquè aquestes consultes requereixen que cada objecte es carregui des del disc.

A la versió 11.11 del Gitlab s'ha habilitat la característica de gràfics de commits serialitzada, introduïda en els darrers llançaments de Git, per aprofitar l'augment de rediment en la generació dels gràfics de commits.

*** Descàrrega de directoris d'un projecte
A vegades tenim la necessitat de descarregar una part d'un projecte. Fins ara per obtenir aquesta part del projecte s'havia de descarregar tot el projecte, realitzant una descàrrega innecessària de components.

A la versió 11.11 del Gitlab s'ha proporcionat la possibilitat de descarregar un directori d'un projecte, així si naveguem dins del projecte, si cliquem a l'icono de descàrrega del projecte obtenim:
- Descarregar tot el projecte (com fins ara)
- Descarregar només aquell directory

Un exemple seria:
![](https://about.gitlab.com/images/11_11/repo_download-archive.png)

*** Increment del rendiment
A la versió 11.11 del Gitlab s'ha incrementat el rendiment en els següents punts:
- [Increment del rendiment de les cerques de les issues](https://gitlab.com/gitlab-org/gitlab-ce/merge_requests/27817)
- [Increment del rendiment en la funcionalitat de diff complet](https://gitlab.com/gitlab-org/gitlab-foss/merge_requests/27413)
- [No carregar les pàgines wiki d'un projecte si només es llisten](https://gitlab.com/gitlab-org/gitlab-foss/merge_requests/22801)
- [No crear una referència temporal si es comparen branch del mateix projecte](https://gitlab.com/gitlab-org/gitlab-foss/merge_requests/24038)


Recordem que a patir de la versió 11.11 del Gitlab és necessari utilitzar Git 2.21.0 o superior

Per a més informació de les funcionalitats que proporciona gitlab versió 11.11 podeu consultar [GitLab 11.11](https://about.gitlab.com/2019/05/22/gitlab-11-11-released/).
<br>
<br>
Amb aquesta actualització es proporciona als proveïdors d’aplicacions un sistema de custodia de codi consistent, de qualitat i amb els millors temps de resposta per a proporcionar un cicle de vida del codi el més agradable possible.
Recordem que dins del planning de CS Canigó es preveu l'actualització tecnològica programada de forma trimestral i anual per anar incorporant millores i nova funcionalitat.
<br>
<br>
Si teniu qualsevol dubte o problema assegureu-vos de no trobar resposta a les [FAQ] (/sic/faq) i utilitzeu el canal de [Suport] (/sic/suport) o contacteu amb l'Oficina Tècnica Canigó CTTI a través del correu electrònic: **oficina-tecnica.canigo.ctti@gencat.cat**.
