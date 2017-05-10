+++
date        = "2017-05-05"
title       = "Accesos dels RML a SIC a SIC 2.0"
description = "Aquest article pretén recollir els principals canvis que patirà aquest colectiu amb l'entrada de SIC 2.0"
sections    = ["Notícies", "drafts"]
categories  = ["sic"]
key         = "MAIG2017"
+++

Aquest article pretén recollir els principals canvis que patirà el colectiu d'usuaris SIC de tipus RML amb l'entrada de SIC 2.0

||RML a SIC 1.0|RML a SIC 2.0|
|----------------------|-------------|---|
|Petició alta|a través de SAU-Remedy|No hi han. Els usuaris ja es troben creats (bolcats de GICAR).|
|Límit usuaris|Limitació de 3 usuaris per grup de repositoris d'aplicacions mateix lot i àmbit|No hi ha límit. De partida seràn els mateixos que hi figuren a SIC 1.0 però mitjançant l'Autoservei, els propis RML podran designar-ne més.|
|Credencials d'accés|Antigues, habitualment en format [1ª inicial del Nom]+[cognom]|Mateixes credencials d'usuari GICAR. Els canvis de dades dels usuaris al seu perfil GICAR (inclos password) es propagaran a SIC.|
|Accesos|SVN i Jenkins (visibilitat jobs tipus BLD, INT, PRE, PRO))|Gitlab i Jenkins (visibilitat jobs Pipeline)|




Amb l'entrada de SIC 2.0 amb el Gitlab com a nou SCM, ja no es tractaran més altes d'usuaris RML per a l'accés als repositoris SVN. L'escenari que es trobarà a partir d'aquell moment serà el següent:

* Els usuaris que ja hi treballaven amb repositoris SVN de SIC amb codi pujat, podran continuar pujant codi en aquests amb normalitat, amb les mateixes credencials (format SIC 1.0).
* Els usuaris que tinguin accés a repositoris SVN ja creats però buits i hagin de començar a fer pujades, les hauríen de començar a fer amb el sistema SIC 2.0. (obviar el repositori a SVN generar el repositori dins Gitlab mitjançant l'Autoservei de repositoris)
* No s'atendran peticions de creació d'usuari RMLs ni de canvis d'accéssos d'aquests als repositoris SVN. Tot nou accés s'haurà de fer mitjançant el format SIC 2.0, migrant prèviament el repositori SVN cap a Gitlab i gestioanant l'accés a aquests mitjançant l'Autoservei d'usuaris de Gitlab.

Els detalls sobre el procés de migració i del funcionament de l'Autoservei d'usuaris i repositoris Gitlab serà explicat en posteriors articles.