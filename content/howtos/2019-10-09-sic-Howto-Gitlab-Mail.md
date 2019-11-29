+++
date        = "2019-10-11"
title       = "Configurar notificacions via email al Gitlab"
description = "Howto per a configurar les notificacions al Gitlab per tal de rebre correus electrònics informant de l'activitat dels projectes"
#section     = "howtos"
#categories  = ["sic"]
key         = "NOVEMBRE2019"
+++

## Introducció

El servei de custòdia de codi (Gitlab) es pot configurar per a rebre via correu electrònic informació sobre l’activitat que es produeixen en els nostres projectes, el sistema permet activar aquesta utilitat tant per usuari com per projecte. Aquest how-to va dirigit a tots aquells perfils tècnics que vulguin configurar el servei per rebre aquestes notificacions.

## Com configurar les notificacions per usuari

Cada usuari pot configurar les notificacions que vol rebre accedint a l'apartat **User -> Settings -> Notifications**.  

Per a la configuració d'aquest tipus de notificacions s'aplica un criteri jeràrquic, concretament es divideix en tres grups: **global, grup o projecte**. Cada una d'aquestes configuracions, disposa de diferents nivells de notificació: **global, watch, on mention, participate, disabled o custom**.

![Notificacions Usuari](/related/sic/userNotifications.png)

<br/>
Per a més informació: [GitLab Notification Emails](https://docs.gitlab.com/ce/workflow/notifications.html).

## Com configurar les notificacions per projectes

Podem configurar notificacions per projecte, de forma que es rebi un correu electrònic per cada un dels canvis que es facin al projecte. En aquest cas haurem d’afegir les adreces de correu electrònic destinatàries.

Per a activar-les cal anar a l’apartat d’integracions del projecte i seleccionar la integració "**Emails on push**", on es disposa de les següents opcions: **push events, tag push events, send from committer i disable code diffs**.

![Notificacions Projecte](/related/sic/projectNotifications.png)

Per a més informació: [Enabling emails on push](https://docs.gitlab.com/ee/user/project/integrations/emails_on_push.html).
