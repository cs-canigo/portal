+++
date        = "2017-05-05"
title       = "Accesos dels RML a SIC a SIC 2.0"
description = "Amb l'entrada de SIC 2.0, el rol del Release Manager (RML) al SIC no es veurà afectada. Continuarà encarregant-se de centralitzar les pujades de codi de les aplicacions però patirà algunes modificacions."
sections    = ["Notícies", "drafts"]
categories  = ["sic"]
key         = "MAIG2017"
+++

Amb l'entrada de SIC 2.0, el rol del Release Manager (RML) al SIC no es veurà afectada. Continuarà encarregant-se de centralitzar les pujades de codi de les aplicacions però patirà algunes modificacions. La següent taula mostra aquestes:

||RML a SIC 1.0|RML a SIC 2.0|
|----------------------|-------------|---|
|Petició d'alta d'usuaris|Canalitzada a partir del responsable d'àmbit a través de SAU-Remedy|No cal. Els usuaris ja es troben creats (bolcats de GICAR).|
|Límit usuaris|Limitació de 3 usuaris per grup de repositoris d'aplicacions mateix lot i àmbit|No hi ha límit. De partida seran els mateixos que hi figuren a SIC 1.0 però mitjançant l'Autoservei, els mateixos RML podran designar-ne més.|
|Credencials d'accés|Antigues, en format [1ª inicial del Nom]+[cognom]|Mateixes credencials d'usuari GICAR. Els canvis de dades dels usuaris al seu perfil GICAR (inclòs password) es propagaran a SIC.|
|Accessos|SVN i Jenkins (visibilitat jobs format antic: BLD, INT, PRE, PRO)|Gitlab i Jenkins (visibilitat jobs Pipeline)|


A partir de l'entrada en vigor de SIC 2.0, ja no es tractaran més altes d'usuaris RML per a l'accés als repositoris SVN. L'escenari que es trobarà a partir d'aquell moment serà el següent:

* Els usuaris que ja hi treballaven amb repositoris SVN de SIC amb codi pujat, podran continuar pujant codi en aquests amb normalitat, amb les mateixes credencials (format SIC 1.0).
* Els usuaris que tinguin accés a repositoris SVN ja creats però buits i hagin de començar a fer pujades, les haurien de començar a fer amb el sistema SIC 2.0. (obviar el repositori a SVN generar el repositori dins Gitlab mitjançant l'Autoservei de repositoris)
* No s'atendran peticions de creació d'usuari RMLs ni de canvis d'accessos d'aquests als repositoris SVN. Tot nou accés s'haurà de fer mitjançant el format SIC 2.0, migrant prèviament el repositori SVN cap a Gitlab i gestionant l'accés a aquests mitjançant l'Autoservei d'usuaris de Gitlab.

Els detalls sobre el procés de migració i del funcionament de l'Autoservei d'usuaris i repositoris Gitlab serà explicat en posteriors articles.