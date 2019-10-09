+++
date        = "2019-10-04"
title       = "SIC. Actualització de versió Gitlab"
description = "Durant el mes d'Octubre s'ha dut a terme l'actualització del Servei de Custodia de Codi (Gitlab)"
#categories  = ["SIC"]
#sections    = ["Notícies", "home"]
+++

## Actualització del servei de custodia de Codi

**Durant el mes d'Octubre s'ha dut a terme l'actualització del Servei de Custodia de Codi a la versió 11.11.8 de Gitlab**.
<br><br>
Les principals novetats i millores d'aquesta actualització són les següents:

### Novetats

#### Assignacions múltiples per Merge Request

No és infreqüent que diverses persones col·laborin en una funcionalitat en una branca compartida i sol·licitin una Merge Request, com ara una col·laboració d’enginyers frontend i backend o en equips on els enginyers treballen sempre en parella com en Programació extrema.

A la versió 11.11 del Gitlab es permet que a les Merge Request es pugui assignar diversos destinataris per a indicar a totes les persones que ho estan revisant o en són responsables.

Per a més informació: [Múltiples assignats per Merge Request](https://docs.gitlab.com/ee/user/project/merge_requests/#multiple-assignees-starter)

#### Serialització dels gràfics de commits

Moltes operacions habituals de Git requereixen consultar el gràfic de commits. Aquestes operacions són més lentes a mesura que creix el nombre de commits perquè aquestes consultes requereixen que cada objecte es carregui des del disc.

A la versió 11.11 del Gitlab s'ha habilitat la característica de gràfics de commits serialitzada, introduïda en els darrers llançaments de Git, per tal d'aprofitar la millora de rendiment en la generació dels gràfics de commits.

Per a més informació: [Funcionalitats de gràfics de commits](https://git-scm.com/docs/commit-graph)

#### Descàrrega de directoris d'un projecte

A vegades tenim la necessitat de descarregar una part d'un projecte. Fins ara, per obtenir aquesta part del projecte s'havia de descarregar tot el projecte, realitzant una descàrrega innecessària de components.

A la versió 11.11 del Gitlab es proporciona la possibilitat de descarregar un directori d'un projecte. Si naveguem dins del projecte i cliquem a la icona de descàrrega del projecte ens permet:

- Descarregar tot el projecte (com fins ara)

- Descarregar només aquell directori

Per a més informació: [Descàrrega de directoris d'un projecte](https://docs.gitlab.com/ee/user/project/repository/#download-source-code)

<br>
![](https://about.gitlab.com/images/11_11/repo_download-archive.png)

### Millores de rendiment

A la versió 11.11 del Gitlab s'ha millorat el rendiment principalment en els següents punts:

- [Cerques de les issues](https://gitlab.com/gitlab-org/gitlab-ce/merge_requests/27817)

- [Funcionalitat de diff complet](https://gitlab.com/gitlab-org/gitlab-foss/merge_requests/27413)

- [No carregar les pàgines Wiki d'un projecte si només es llisten](https://gitlab.com/gitlab-org/gitlab-foss/merge_requests/22801)

- [No crear una referència temporal si es comparen branques del mateix projecte](https://gitlab.com/gitlab-org/gitlab-foss/merge_requests/24038)

<br><br><br>
Recordem que a patir de la versió 11.11 del Gitlab és necessari utilitzar **Git 2.21.0 o superior**.

Per a més informació sobre les funcionalitats que proporciona Gitlab a la versió 11.11 podeu consultar:
- [GitLab v.11.11](https://about.gitlab.com/2019/05/22/gitlab-11-11-released/)
- [238 issues tancades](https://gitlab.com/gitlab-org/gitlab-foss/issues?scope=all&utf8=%E2%9C%93&state=all&milestone_title=11.11)
<br>
<br>
Amb aquesta actualització es proporciona als proveïdors d’aplicacions un sistema de custodia de codi consistent, de qualitat i amb els millors temps de resposta per a permetre un cicle de vida del codi el més agradable possible.
Recordem que dins de la planificació de CS Canigó es preveu l'actualització tecnològica programada de forma trimestral i anual per anar incorporant millores i noves funcionalitats.
<br>
<br>
Si teniu qualsevol dubte o problema assegureu-vos de no trobar resposta a les [FAQ] (/sic/faq) i utilitzeu el canal de [Suport] (/sic/suport) o contacteu amb l'Oficina Tècnica Canigó CTTI a través del correu electrònic: **oficina-tecnica.canigo.ctti@gencat.cat**.