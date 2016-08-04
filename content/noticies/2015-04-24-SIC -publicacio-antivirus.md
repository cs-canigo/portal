+++
date        = "2015-04-24"
title       = "Canigó. Nova versió del connector Antivirus"
description = "S'han publicat noves versions del connector d'Antivirus de Canigó 3 i Canigó 2. El funcionament d'aquestes versions, 1.2.0 i 2.3.21-SNAPSHOT respectivament, ha estat certificat amb la versió 7.5 de l'API de Symantec corresponent a la versió instal·lada per el nou Antivirus corporatiu. Cal destacar els canvis de dominis realitzats en la transformació del servei d'Antivirus. Les aplicacions han de fer canvis a la seva configuració per accedir-hi."
sections    = ["Notícies", "home"]
categories  = ["desenvolupament", "canigo"]
+++

Durant el mes d'Abril han estat publicades les versions [1.2.0](http://repos.canigo.ctti.gencat.cat/repository/maven2/cat/gencat/ctti/canigo.integration.antivirus/1.2.0/) del [Connector d'Antivirus] (/canigo-documentacio-versions-3x-integracio/modul-antivirus/) per a Canigó 3 i [2.3.21-SNAPSHOT](http://repos.canigo.ctti.gencat.cat/repository/maven2/canigo/connectors/canigo-connectors-antivirus/2.3.21-SNAPSHOT/) per a Canigó 2.

Aquestes noves versions utilitzen la versió 7.5 de l’API de Symantec. Per a poder utilitzar aquesta API s’ha de sol·licitar el jar “sym-7.5.jar” a la bústia de canigó <oficina-tecnica.canigo.ctti@gencat.cat> al no estar disponible a cap repositori públic Maven. Altrament l’aplicació no podrà compilar. La instal·lació haurà de fer-se en els repositoris locals dels desenvolupadors. Aquesta llibreria ja ha estat incorporada internament al SIC (Servei d’Integració Contínua) per a compilacions de releases d’aplicacions.

Per a continuar utilitzant l'API de Symantec 4.3.1 s'ha de mantenir la versió 1.1.0 del connector (o anterior) en cas de Canigó 3 i 2.3.20 (o anterior) en cas de Canigó 2. No s'han detectat incompatibilitats en l'ús d'aquesta versió de l'API en l'accés al nou servei d'Antivirus.

Els nous dominis d'accés al Servei d'Antivirus són:

Entorn         | Domini 										| port
-------------- | ----------------------------------------------	| -----
preproducció   | preproduccio.antivirus.intranet.gencat.cat     | 1344
producció      | antivirus.intranet.gencat.cat       			| 1344

El port d'accés, ICAP (1344), no és un dels estàndars (80-http, 443-https). És per aquest motiu que s’han de gestionar les regles de firewall per habilitar la connectivitat cap al servei d’Antivirus des dels servidors d'aplicacions.

Per a obtenir més informació del Mòdul d'Antivirus podeu consultar la documentació del [Connector d'Antivirus] (/canigo-documentacio-versions-3x-integracio/modul-antivirus/) al Portal de Frameworks i Solucions d’Arquitectura.
