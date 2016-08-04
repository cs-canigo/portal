+++
date        = "2015-04-30"
title       = "SIC. Multi-CPD - Desplegaments a CPD4-TSystems"
description = "El SIC - Multi CPD basat en l'arquitectura Master/Slave de Jenkins ja s’ha començat a implantar. El primer CPD on s’ha posat en marxa el Slave de Jenkins per als desplegaments d’aplicacions ha estat a CPD4-TSystems. Aquest slave és controlat pel Jenkins Master (CPD1-HP), el qual li delegarà el desplegament de les aplicacions ubicades a CPD4-TSystems."
sections    = ["Notícies", "home"]
categories  = ["sic"]
+++


El SIC - Multi CPD basat en l'arquitectura Master/Slave de Jenkins ja s’ha començat a implantar. El primer CPD on s’ha posat en marxa el Slave de Jenkins per als desplegaments d’aplicacions ha estat a CPD4-TSystems. Aquest slave és controlat pel Jenkins Master (CPD1-HP), el qual li delegarà el desplegament de les aplicacions ubicades a CPD4-TSystems.

Els avantatges d’aquesta arquitectura Master/Slave són els següents:

- *Distribució de la càrrega de treball*: l'execució de les tasques (jobs) es realitza en els slaves.
- *Reduïr el tràfic a XCAT*: els artefactes es promouen entre entorns dins el CPD.
- *Minimitzar les connectivitats entre CPDs*: el master només necessita connexió ssh amb els slaves. L'execució de les tasques per el desplegament la realitzen els slaves dins els CPDs.

<CENTER>![SIC_MultiCPD_Slave_CPD4.png](/images/news/SIC_MultiCPD_Slave_CPD4.png)</center>

Destacar que entre els diferents slaves i el master hauran de sincronitzar-se certes dades  (artefactes resultat, logs execució, ...). D'aquesta manera el master centralitza tota la informació i pot presentar-la a l'usuari al [Portal de Jenkins](http://hudson.intranet.gencat.cat).

Es recorda el procediment per a poder realitzar desplegaments de les aplicacions des de SIC:

- Custodiar el codi font de l'aplicació al [SVN del SIC](http://svn.intranet.gencat.cat). Si encara no es disposa d'un espai per el codi de diàleg demanar-ne la creació enviant el "Formulari d’alta d’aplicació per a la Custòdia de codi al SIC" que podeu trobar dins la secció de [Documentació del SIC](http://canigo.ctti.gencat.cat/sic/documentacio/) al Portal de Frameworks i Solucions d'Arquitectura.
- Demanar l'alta de jobs a Jenkins mitjançant el "Formulari d’alta d’aplicació per al Portal d’Integració Contínua (Jenkins)" disponible també en la secció de [Documentació del SIC](http://canigo.ctti.gencat.cat/sic/documentacio/).

Aquests formularis han de ser lliurats a la [bústia del SIC](mailto:sic.ctti@gencat.cat) pel responsable de l'aplicació (persona dins el CTTI o d’un Departament).

Per a obtenir més informació relativa al SIC podeu accedir a la [secció SIC](http://canigo.ctti.gencat.cat/sic/) dins el Portal de Frameworks i Solucions d'Arquitectura. Per consultes o suport preferiblement fer una petició al [Servei SICQ del JIRA CSTD](https://cstd.ctti.gencat.cat/jiracstd/browse/SICQ) o bé enviar un correu a la [bústia del SIC](mailto:sic.ctti@gencat.cat).
