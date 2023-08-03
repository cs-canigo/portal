+++
date        = "2021-08-17T17:11:42+01:00"
title       = "Possibilitats funcionals d'integració amb GICAR"
description = "Índex de possibilitats funcionals d'integració amb GICAR"
sections    = "gicar-novesintegracions-funcionalitats-autenticacio"
taxonomies  = []
toc			= false
weight 		= 1
+++

GICAR permet que una aplicació li delegui l'autenticació i l'autorització. A continuació es resumeixen les possibilitats que GICAR permet en aquest aspecte:

![Integració Aplicacions GICAR](/related/gicar/panoramica-autenticacio.png)

### 1.- Autenticació contra el directori corporatiu amb usuari i contrasenya i amb certificat digital.
Aquest servei, que correspon al servei més bàsic que permet GICAR, permet que una aplicació li delegui l'autenticació d'usuari a GICAR, i GICAR autentiqui només a l'usuari si aquest està al Directori Corporatiu de la Generalitat. L'autenticació podrà ser feta de la següent manera:

- Usuari i contrasenya  del Directori Corporatiu.
- Certificat digital.

### 2.- Autenticació amb certificat digital per usuaris que no estiguin al directori corporatiu.
Aquest servei permet que una aplicació li delegui l'autenticació d'usuari a GICAR, i GICAR autentiqui a l'usuari amb certificat digital sempre que aquest sigui vàlid, **estigui o no donat d'alta al directori corporatiu**. Aquesta modalitat d'integració també permet obviament que si l'usuari està donat d'alta al directori corporatiu se l'autentiqui de forma normal, igual que al punt anterior. L'autenticació podrà ser feta de la següent manera:

- Usuari i contrasenya del Directori Corporatiu.
- Certificat digital.

### 3.- Autenticació contra el directori de l'EACAT
Aquest servei permet que una aplicació li delegui l'autenticació d'usuari a GICAR, i GICAR autentiqui a l'usuari contra el directori de l'EACAT, o contra el Directori Corporatiu, o amb certificat digital sempre que aquest sigui vàlid, **estigui o no donat d'alta al directori corporatiu**.

- Usuari i contrasenya del Directori Corporatiu/Directori d'EACAT.
- Certificat digital.

### 4.- Autenticació hibrida GICAR - Vàlid (Passarel·la GICAR-Vàlid).
Aquest servei permet combinar qualsevol de les anteriors tres modalitats d'integració, amb la integració contra el Vàlid de l'AOC. D'aquesta manera, desenvolupant una sola integració per part de l'aplicació, l'aplicació pot autenticar contra GICAR, en qualsevol de les tres modalitats d'autenticació abans enumerades, i contra Vàlid (Certificat digital, IdCat Mòbil, Clave).

### 5.- Autenticació i autorització pels usuaris de GICAR.
Aquest servei permet que pels usuaris que estan donats d'alta a GICAR (Directori Corporatiu), se li puguin assignar rols d'aplicació, i aquests rols puguin ser passats a l'aplicació en el moment de fer l'autenticació. Això permet que l'aplicació pugui delegar per complet l'autenticació i l'autorització a GICAR.
