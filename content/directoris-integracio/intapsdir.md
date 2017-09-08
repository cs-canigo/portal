+++
date        = "2017-09-08T17:11:42+01:00"
title       = "Integració d'aplicacions per autenticació en el nou model de directoris "
description = ""
section     = "Documentació"
taxonomies  = []
toc 		= false
weight 		= 4
+++


Les aplicacions objecte d’aquesta guia i que autentiquin usuaris a través del protocol de Windows Authentication, seguiran les següents directrius per a integrar-se en el model de directoris:

### Entorns de desenvolupament per a provar les solucions

El proveïdor d’aplicacions haurà de fer les proves unitàries de l’aplicació/producte sobre un entorn de desenvolupament que ell mateix haurà de construir-se, i que haurà de reproduir de forma fidedigna a l’arquitectura de directoris i d’usuaris descrita en el capítol 1.

### Ús dels dominis per part dels servidors de les aplicacions

- El servidor Windows (ja sigui per a un IIS, o per a un SQL Server) sobre el qual estigui desplegada l’aplicació, ha d’estar registrat sobre un dels dominis de CPD (cpdx.intranet.gencat.cat). En cap cas el servidor Windows es podrà registrar directament en el domini de lloc de treball (a excepció dels serveis propis de Lloc de treball). El domini de CPD no té usuaris nominals, ja que estan definits a LT2 (domini de lloc de treball).
- El servidor Windows i l’aplicació han d’utilitzar la relació de confiança existent amb els directoris de lloc de treball de LT2 (FMO) per a cercar els usuaris nominals a validar. La relació de confiança sempre serà seguint la següent direcció: AD CPD --> AD LT2.

### Autenticació

- L’aplicació ha d’autenticar els usuaris seguint la següent nomenclatura:
• Nom d’usuari: GCA\<DNI usuari> o  GCB\<DNI usuari> o  GCC\<DNI usuari>.
• Contrasenya: ha de ser la de GICAR.
- El proveïdor d’aplicacions, per a la correcta autenticació de l’usuari, haurà de suportar-se en els proveïdors de Lloc de treball per a validar la implantació de les següents recomanacions en les estacions de treball:
• Existència d’un controlador de domini, que li pugui generar els tiquets Kerberos, o que li serveixi per a poder atendre a peticions d’autenticació NTLM. 
• Tenir capacitat per a resoldre els dominis dels directoris de lloc de treball de LT2 (FMO). GCA, GCB, i GCC

### Autorització

- Quan sigui necessari autoritzar als usuaris, l’aplicació ha d’utilitzar grups de seguretat locals del directori de CPD.
- Els grups locals del directori de CPD, podran contenir:
• Grups universals dels directoris de LT2. 
Aquesta és l’opció òptima, donat que d’aquesta manera el manteniment de l’autorització dels usuaris sobre el grup local de CPD podrà fer-lo de forma autònoma l’administrador del directori de LT2, posant els usuaris a dins dels grups universals d’autorització de LT2.
• Objectes usuari dels directoris de LT2.
En el següent esquema s’il·lustra el plantejament dut a terme.

![Integració amb els Directoris de la Generalitat](/related/directoris-integracio/dir - grups.PNG)

### Consulta de dades d’usuaris

• L’aplicació no ha de fer consultes LDAP directament contra els directoris de lloc de treball de la Generalitat.
• L’aplicació ha d’utilitzar els mecanismes proporcionats per GICAR per a la consulta d’usuari (Web Service de GDI). A través d’aquest Web Service es podran consultar les dades dels usuaris de la Generalitat de Catalunya.

Per a més detall veure el document “Integració amb el Webservice de GICAR”