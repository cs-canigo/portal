+++
date        = "2019-10-11"
title       = "Configurar notificacions via email al Gitlab"
description = "Howto per a configurar les notificacions al Gitlab per tal de rebre correus electrònics informant de l'activitat dels projectes"
#section     = "howtos"
#categories  = ["sic"]
key         = "NOVEMBRE2019"
+++

## A qui va dirigit

Aquest how-to va dirigit a tots aquells perfils tècnics que vulguin rebre via email informació sobre l'activitat dels seus projectes al servei de custodia de codi (Gitlab).

## Introducció

El Gitlab permet configurar notificacions per a rebre via email activitats que es produeixen en els nostres projectes.
El sistema permet activar aquest servei per usuari i per projecte.

## Com configurar les notificacions per usuari

Cada usuari pot configurar les notificacions que vol rebre accedint a l'apartat User -> Settings -> Notifications.

![Notificacions Usuari](/related/sic/userNotifications.png)

<br/>
La documentació oficial la podreu trobar a: [GitLab Notification Emails](https://docs.gitlab.com/ce/workflow/notifications.html).

## Com configurar les notificacions per projecte

També podem configurar notificacions per projecte, però en aquest cas haurem d'afegir les adreces de correu que volen rebre aquestes notificacions.
Per a activar-les cal anar a l'apartat d'integracions del projecte i seleccionar la integració "Emails on push".

![Notificacions Projecte](/related/sic/projectNotifications.png)

Per a més informació: [Enabling emails on push](https://docs.gitlab.com/ee/user/project/integrations/emails_on_push.html).