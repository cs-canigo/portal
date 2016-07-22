+++
date        = "2015-03-31"
title       = "Nou model TIC al SIC"
description = ""
section     = "SIC"
weight      = 1
+++

### Nou model TIC al SIC

La implantació del nou model TIC al SIC ha consistit en:

- Creació d'una nova estructura del repositoris on les aplicacions s'agrupen segons el seu àmbit i codi de diàleg (abans s'agrupaven per àmbit i nom d'aplicació).
- Les noves altes d'aplicació es realitzaran contra aquesta estructura.
- Creació de nous grups de permissos per gestionar els accessos a aquests repositoris.
- Homogeneïtzació de la llista dels d'àmbits al que poden pertanyen les aplicacions.

## Nous grups de permisos

A continuació s'enumeren els grups de permisos LDAP disponibles per accedir als repositoris de codi font/Portal d'Integració Contínua del SIC:

- AMBIT: Es defineix un grup per cada àmbit, cadascun amb accés total al repositori de codi de les seves aplicacions SIC.
El grup està integrat pels responsables CTTI de l'àmbit. La llista d'àmbits es pot consultar al següent apartat.
- RSPL_LOT: Es defineix un grup de responsables per cada lot amb accés total al repositori de codi de les aplicacions SIC del seu lot.
El grup està integrat amb els responsables d'arquitectura i qualitat dels lots.
- CPD: Es defineix un grup per cada CPD dels codis de diàleg amb accés al repositori de codi de les aplicacions SIC del seu CPD.
- RML_LOT_AMBIT: Es defineix un grup de release manager per a cada lot i àmbit amb accés total a les aplicacions SIC de l'àmbit que pertanyin al lot.
El grup s'integra amb les persones sol- licitades per CTTI, aquesta sol- licitud es realitzarà com una petició estàndard al SIC.
- APP_CODI_DIALEG_SVN: Es defineix un grup per a cada codi de diàleg amb accés al repositori de codi.
El grup s'integra amb les persones sol- licitades per CTTI, aquesta sol- licitud es realitzarà com una petició estàndard al SIC.

## Llistat d'àmbits disponibles

| Codi àmbit  	| Descripció d'àmbit  														|
| :---------- 	| :----------------- 														|
| AAM			| 	Departament d'Agricultura, Ramaderia, Pesca, Alimentació i Medi Natural	|
| ACC			| 	Agència Catalana del Consum												|
| ACC10			|	ACC1Ó																	|
| ACT			|	Agència Catalana de Turisme												|
| ATC			|	Agència Tributària de Catalunya											|
| ATM			|	Autoritat del Transport Metropolità										|
| BSF			|	Departament de Benestar Social i Família								|
| CCAC			|	Direcció General d'Atenció Ciutadana i Difusió							|
| CCAE			|	DGPAE																	|
| CCE			|	Consell Català de l'Esport												|
| CLT			|	DEPARTAMENT DE CULTURA													|
| CTT			|	Centre de Telecomunicacions i Tecnologies de la Informació				|
| DGP			|	Direcció General de la Policia											|
| EAD			|	EADOP																	|
| EAPC			|	Escola d'Administració Pública de Catalunya								|
| ECO			|	Departament d'Economia i Coneixement									|
| EMO			|	Departament d'Empresa i Ocupació										|
| ENS			|	Departament d'Ensenyament												|
| GRI			|	Departament de Governació i Relacions Institucionals					|
| ICA			|	ICAEN																	|
| ICS			|	ICS																		|
| INT			|	Departament d'Interior													|
| JUS			|	Departament de Justícia													|
| PRE			|	Departament de la Presidència											|
| SCT			|	Servei Català de Trànsit												|
| SEM			|	Servei d'Emergències Mèdiques											|
| SLT			|	Departament de Salut													|
| SOC			|	Servei d'Ocupació de Catalunya (SOC)									|
| SUR			|	Secretaria d'Universitats i Recerca										|
| TES			|	Departament de Territori i Sostenibilitat								|

## Repositoris de codi que ja es troben creats de forma massiva

L'equip de SIC en data 10-9-2014 va realitzar la creació massiva de repositoris de codi per a les aplicacions que figuren en aquest [Inventari d'Aplicacions](/related/sic/Inventari_SIC_140910.xlsx).