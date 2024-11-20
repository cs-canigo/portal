
+++
date         = "2024-04-09"
title        = "Notificacions"
description  = "Configuració de notificacions"
weight      = "4"
sections    = ["GHEC"]
aliases = [
    "/drafts/ghec/configuracio-notificacions",
    "/ghec/configuracio-notificacions",
    "/plataformes/ghec/configuracio-notificacions"
]
+++

## Objectiu 🚀

GitHub ofereix la possibilitat de rebre notificacions tant per correu electrònic com per mitjà d'una safata d'entrada que conté el portal web.
En el següent article es mostra la configuració necessària per a aconseguir l'objectiu.

## Al detall 📋

Per configurar les notificacions, el primer que s'ha de fer és situar-nos a la zona de configuració a nivell personal. Per això, cal fer clic a la icona de "Profile".


![Profile](/images/GHEC/configurar_notificacions/0.png)


En fer-ho, s'obre un menú desplegable, en el qual s'ha de seleccionar "Settings".


![Profile menu](/images/GHEC/configurar_notificacions/1.png)


En el menú de navegació de la configuració, s'ha de seleccionar la secció "Notifications".


![Notifications](/images/GHEC/configurar_notificacions/2.png)


El primer a revisar si es volen rebre notificacions per correu electrònic, és tenir-lo configurat per defecte a "Default notifications email". A priori, tots els usuaris hauran de tenir configurada la seva adreça de correu electrònica en aquest camp donat que s'haurà propagat des de GICAR.


![Default notifications email](/images/GHEC/configurar_notificacions/3.png)


El següent és revisar si es desitja la subscripció automàtica de repositoris a "Automatically watch repositories", de manera que es rebin notificacions des que s'obté l'accés a realitzar "push" en ells.

Després d'això, es revisa si es volen rebre de forma automàtica notificacions d'equip a "Automatically watch teams", de manera que es rebin notificacions des de les actualitzacions i mencions des de la incorporació als equips.


![Automatically watch](/images/GHEC/configurar_notificacions/3a.png)


Fet això, es revisa la configuració general de subscripcions. Hi ha diferents opcions de configuració. Per revisar-les i modificar-les, cal fer clic en els botons corresponents i seleccionar les caselles que apareixen en els menús desplegables.


![Subscriptions](/images/GHEC/configurar_notificacions/4.png)


És possible rebre notificacions de repositoris, equips i converses que triem com a "Watching". És a dir, és possible seguir aquells repositoris als quals se'ns permeti la seva visualització, i rebre'n notificacions sense ser col·laboradors.


![Watching](/images/GHEC/configurar_notificacions/4a.png)


El següent és revisar les converses en què es participA, les mencions i totes les activitats a les quals hi hagi subscripció per a determinats esdeveniments.


![Participating, @mentions and custom](/images/GHEC/configurar_notificacions/4b.png)


Es pot configurar quan rebre notificacions per correus per a allò en què es participi o es designi com a "watching". Es poden seleccionar revisions de pull request, pushes de pull request, comentaris en issues i pull request, i també decidir si incloure les de l'usuari del compte.


![Customize email updates](/images/GHEC/configurar_notificacions/4c.png)


Es poden designar seleccionar de quins repositoris no es vol rebre notificacions.


![Ignored repositories](/images/GHEC/configurar_notificacions/4d.png)


GitHub també ofereix la possibilitat de rebre notificacions sobre l'execució d'accions, Dependabot i "Deploy Keys" en cas de ser administrador.

En "Actions" es configuren les notificacions per a les execucions fetes per l'usuari. Es pot triar si rebre-les per GitHub, correu o ambdues opcions. També és possible triar si rebre notificacions de totes les execucions que realitzi o solament en cas de resultar fallides. Cal tenir la casella "Only notify for failed workflows" deshabilitada per rebre notificacions de totes les execucions, tant correctes com incorrectes.


![Actions](/images/GHEC/configurar_notificacions/5.png)


En les alertes de Dependabot es configura per on es volen rebre les alertes dels descobriments de noves vulnerabilitats en els repositoris.


![Dependabot alerts: New vulnerabilities](/images/GHEC/configurar_notificacions/5a.png)


També és possible rebre un resum setmanal o diari de fins a 10 repositoris.


![Email weekly digest](/images/GHEC/configurar_notificacions/5b.png)


Per acabar la configuració, s'ha de triar si rebre alertes per correu de la creació de deploy keys en cas de tenir permisos d'administrador en alguna organització.


!['Deploy key'alert email](/images/GHEC/configurar_notificacions/5c.png)
