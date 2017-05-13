+++
date        = "2017-05-05"
title       = "Accesos dels RML a SIC 2.0"
description = "Amb l'entrada de SIC 2.0, el rol del Release Manager (RML) al SIC no es veurà afectat. Continuarà encarregant-se de centralitzar les pujades de codi de les aplicacions del Lot però les gestions d'altes i accessos d'aquests es veuran afectats."
sections    = ["drafts"]
categories  = ["sic"]
key         = "MAIG2010"
+++

Amb l'entrada de SIC 2.0, el rol del Release Manager (RML) al SIC no es veurà afectat. Continuarà encarregant-se de centralitzar les pujades de codi de les aplicacions del Lot però les gestions d'altes i accessos d'aquests es veuran afectats. La següent taula mostra aquests canvis:

||RML a SIC 1.0|RML a SIC 2.0|
|----------------------|-------------|---|
|Petició d'alta d'usuaris|Canalitzada a partir del responsable d'àmbit a través de SAU-Remedy|No cal. Els usuaris de Lot, CPD i CTTI ja es troben creats (bolcats de GICAR).|
|Petició d'alta de repositoris|Canalitzada a partir del responsable d'àmbit a través de SAU-Remedy|No cal, els usuaris RMLs seràn autònoms per crear el repositori al Gitlab mitjançant l'Autoservei de repositoris|
|Límit usuaris|Limitació de 3 usuaris per grup de repositoris d'aplicacions mateix lot i àmbit|No hi ha límit. De partida seran els mateixos que hi figuren a SIC 1.0. Mitjançant l'Autoservei, els mateixos RML podran designar-ne més.|
|Credencials d'accés|Antigues, en format [1ª inicial del Nom]+[cognom]|Mateixes credencials d'usuari GICAR. Els canvis de dades dels usuaris al seu perfil GICAR (inclòs password) es propagaran a SIC.|
|Accessos|SVN i Jenkins (visibilitat jobs format antic: BLD, INT, PRE, PRO)|Gitlab i Jenkins (visibilitat jobs Pipeline)|


A partir de l'entrada en vigor de SIC 2.0, ja no es tractaran més altes d'usuaris RML per a l'accés als repositoris SVN. L'escenari que es trobarà a partir d'aquell moment serà el següent:

* Els usuaris que ja hi treballaven amb repositoris SVN de SIC amb codi pujat, podran continuar pujant codi en aquests amb normalitat, amb les mateixes credencials (format SIC 1.0).
* Aquells repositoris SVN que es trobessin creats però sense codi pujat s'esborraran.
* No s'atendran peticions de creació d'usuari RMLs, d'accessos a aquests als repositoris SVN ni de repositoris  SVN. Tot nou accés s'haurà de fer mitjançant el format SIC 2.0, migrant prèviament el repositori SVN cap a Gitlab i gestionant l'accés a aquests mitjançant l'Autoservei d'usuaris de Gitlab.

Els detalls sobre el procés de migració i del funcionament de l'Autoservei d'usuaris + repositoris Gitlab serà explicat en posteriors articles.
