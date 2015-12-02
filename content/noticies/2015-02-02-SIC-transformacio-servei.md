+++
date        = "2014-12-02"
title       = "SIC. Transformació del servei"
description = "El passat 13/11 es va efectuar la transformació del servei SIC al CPD1-HP. En el següent diagrama es mostren els components més rellevants de la capa d'aplicacions i com es realitza la redirecció dels dominis cap als servidors del SIC"
section     = "Notícies"
categories  = ["SIC"]
+++


El passat 13-11-2014 es va efectuar la transformació del servei SIC al CPD1-HP. En el següent diagrama es mostren els components més rellevants de la capa d'aplicacions i com es realitza la redirecció dels dominis cap als servidors del SIC: 

![Nou SIC](/related/sic/SIC-CPD1.png)

Per a tots els usuaris del SIC que accedeixen als serveis per domini, ja sigui "hudson.intranet.gencat.cat" (Jenkins) o "svn.intranet.gencat.cat" (Subversion), el canvi ha estat transparent donat que la connectivitat al nou servidor està oberta i la resolució dels noms per DNS es va canviar el 13/11 per a accedir als nous servidors. Destacar que degut a requeriments d'infraestructura des d'aquesta data és obligatori l'accés per domini, deixant de funcionar l'accés directe per IP (10.48.143.21).

Els usuaris del SIC poden trobar tots els recursos als quals accedien a l'entorn antic en les mateixes URLs. No han canviat les referències a repositoris de Subversion ni a jobs de Jenkins. També es manté tota la informació històrica (tags, històric de modificacions, execucions de jobs, etc.).

En aquesta transformació s'han fet millores en l'arquitectura del SIC així com actualitzat diferents peces del software que formen part del servei. Els serveis de Jenkins i Nexus ara corren en diferents instàncies de servidors web Tomcat 7.0.50 (Java JRE 1.7.0_51), aïllant les possibles incidències i intervencions que es puguin realitzar en un respecte a l'altre. Les versions de Jenkins i Nexus actuals al SIC són 1.509.4 i 2.10.0 respectivament. Per aquest últim s'ha fet un upgrade de la versió 1.8.0.1 que hi havia instal·lada a l'antic servidor.

En aquest procés de transformació de CPD s'ha donat de baixa el servei Sonar (sonar.intranet.gencat.cat). Es segueix recomanant però l'ús d'aquest tipus d'eines en entorns de desenvolupament, prèviament a l'alliberament de noves versions de les aplicacions al SIC. L'eina corporativa per l'anàlisi de qualitat de codi és CAST. Més informació al Portal de Qualitat a la secció Eines - CAST.

En cas de tenir qualsevol dubte o detectar qualsevol afectació conseqüència d'aquesta transformació us podeu posar en contacte amb l'equip del SIC preferiblement via JIRA CSTD al servei SICQ o bé enviant un correu a la bústia sic.ctti@gencat.cat