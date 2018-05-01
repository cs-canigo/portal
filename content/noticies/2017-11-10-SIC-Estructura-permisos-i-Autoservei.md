+++
date        = "2018-04-30"
title       = "SIC 2.0. Estructura de permisos i autoservei d'usuaris"
description = "Degut al gran nombre de consultes rebudes sobre el funcionament d'aquest autoservei, hem decidit publicar aquest article on describim amb més detall la seva operativa. (Editat el 30/04/2018 - nova estructura de grups en el sistema de permisos)"
sections    = ["Notícies", "home"]
categories  = ["sic"]
key         = "NOVEMBRE2017"
+++

Degut al gran nombre de consultes rebudes sobre el funcionament d'aquest autoservei, hem decidit publicar aquest article on describim amb més detall la seva operativa. Primer explicarem l'estructura de permisos del SIC 2.0 i posteriorment descriurem què cal fer per concedir permisos amb l'autoservei.

**Avís**: Aquest article ha estat modificat el 30/04/2018 per explicar el nou model de seguretat (model de seguretat del SIC 2018) en el que els Release Managers ja no són d'àmbit i lot sinó que hi ha un grup de Release Managers per a cada codi d'aplicació.

### Estructura de permisos del SIC 2.0

El SIC 2.0 té estructurada la seva seguretat en diferents tipus de grups:

* Grups per a lots i proveïdors d'aplicacions
* Grups per a CPDs i LdT
* Altres grups

#### Grups per a lots d'aplicacions

Aquests tipus de grups contenen a desenvolupadors i altres perfils que componen l'amalgama de perfils requerits per desenvolupar una aplicació. Dins d'aquests tipus de grups, distingim tres subtipus de grups:

* Release Managers
* Responsable de lot

A continuació, descriurem cadascun d'aquests subtipus.

**Release Managers**

Aquest tipus de grup recull als Release Managers (RM, en endavant). És a dir, recullen a tots els usuaris amb perfil Release Manager que pertanyen a un codi d'aplicació concret. Per exemple, el grup de RM del codi d'aplicació 0192 recull tots els Release Managers d'aquest codi d'aplicació.

Els membres d'un grup RM són perfils que poden:

* Operar amb el GitLab
* Concedir permisos a altres companys per accedir com a Developers o Masters al codi d'aplicació corresponent
* Crear projectes dins del grup oficial (el que té com a nom el codi d'aplicació) al GitLab
* Accedir a la plataforma Jenkins per veure el resultat de l'execució d'un job
* Dipositar i recollir binaris dipositats prèviament al mòdul de Gestió de binaris

**Responsable de lot**

Aquest tipus de grup recull als Responsables de Lot (RSPL, en endavant). Al SIC 1.0, els membres d'aquest tipus de grup eren els encarregats de sol·licitar accés per a un RM. Actualment, al SIC 2.0, aquesta funcionalitat careix de valor gràcies a l'autoservei d'usuaris, mitjançant el qual els propis RMs poden concedir accés a companys. Aquest grup ha passat a ser un agregador tots els codis d'aplicació per a un lot. És a dir, són membres d'un lot d'aplicacions amb una participació transversal a tots els codis d'aplicació i poden realitzar les mateixes accions que un RM.

#### Grups de CPD i Ldt

Aquests tipus de grups corresponen a CPDs (CPD1, CPD2...) i a LDT (LT2A, LT2B...). Els membres d'aquest tipus de grup tenen accés en mode lectura als repositoris i al mòdul de gestió de binaris i poden executar a Jenkins jobs de desplegament automàtic per als codis d'aplicació que els hi corresponen.

La pertinença als grups d'aquest tipus és automàtica i ve donada per la categorització que fa GICAR als usuaris, els quals assigna a un LOT/CPD/LDT concret en el moment de la creació. Per tant, tot usuari de GICAR per ser d'un CPD o un grup de LDT concrets té accés preconcedit al SIC 2.0.

#### Altres tipus de grups

Al SIC 2.0 tenim altres grups per a la gestió del servei i altres funcionalitats. Grup d'administradors, un grup concret per a Qualitat, etc. Són grups per al correcte funcionament i per a la integració del SIC amb la resta d'agents del CTTI.

La pertincença als grups d'aquest tipus es realitza de forma manual ja que els usuaris d'aquest tipus de grups varia amb molt poca freqüència.

### Autoservei

Per tant, l'autoservei d'usuaris afecta als lots i proveïdors fora de lot d'aplicacions. Tot usuari que necessiti accés haurà de sol·licitar als companys que ja en tenen que els hi concedeixin accés. Us recordem que vam publicar un [article](http://canigo.ctti.gencat.cat/noticies/2017-07-18-SIC-Autoservei-usuaris-SIC2.0/) on explicàvem com concedir permisos a companys per accedir al SIC com RM.

Hem inclòs referències a aquest article tant a l'apartat de [manuals del SIC](http://canigo.ctti.gencat.cat/sic-documentacio/manuals/) com a l'apartat de [FAQ del SIC](http://canigo.ctti.gencat.cat/sic/faq/) dins del web d'arquitectura per a que sigui més fàcil localitzar-lo.

Per a qualsevol dubte o aclariment sobre el funcionament de l'Autoservei d'usuaris SIC al GitLab, podeu obrir una [consulta](/howtos/2018-01-howto-obrir-peticions-SIC-a-autoservei-Remedy/#consulta) a SAU Remedy.
