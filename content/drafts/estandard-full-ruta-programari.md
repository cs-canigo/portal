+++
date        = "2017-07-28"
title       = "Estàndard pel full de ruta del programari"
description = "Estàndard pel full de ruta del programari"
weight		= 3
type = "estandard"
toc         = true
versio      = "1.0"
responsable = "Unitat d'arquitectura"
estandards =  ["programari"]
codi = "35.080.03"

+++

## Part 1: Abast


L’elevat volum de productes que estan desplegats als CPDs de la Generalitat de Catalunya i als seus
entorns de treball i la seva heterogeneïtat de versions fa que resulti cada cop més difícil mantenir
vigents les versions de programari de les diferents tecnologies.

Com a peça facilitadora, i amb la intenció de donar una visió de l’estat de l’art de cadascuna de les
tecnologies usades (o previstes d’usar) en els nous sistemes d’informació a desplegar s’ha elaborat el
full de ruta de versions de programari.

El full de ruta de versions de programari és un document que té com a objectiu **normalitzar i
racionalitzar el desplegament de tecnologies**, alhora que es concreta tant el ventall de productes
disponibles per a una determinada tecnologia, com la versió recomanada d’un programari concret. 

Per cadascuna de les tecnologies se’n proporciona:

- Una classificació bàsica del producte en funció del grau de coneixement i implantació de la
tecnologia.
- L’estat de maduresa del producte per facilitar la determinació tant de la versió a utilitzar en el
moment de la seva implantació com el grau d’obsolescència dels productes que estan
actualment en ús.


## Part 2: Referències 

## Part 3: Termes i definicions

##### Maduresa d'una tecnologia

La visió de la maduresa de la tecnologia consisteix en reflectir de forma objectiva el nivell de suport en què es troba una tecnologia concreta, tant si es tracta de versions que s’utilitzen des de fa temps com si es tracta de versions a utilitzar en un futur més o menys immediat.

Al full de ruta es presenta la maduresa des de dos punts de vista diferents:

- Des del punt de vista del grau de suport intern
- Des del punt de vista del grau de suport del fabricant de programari 

A l'annex <a href='{{<relref "#maduresa" >}}'>Maduresa d'una tecnologia</a> es recullen les diferents visions de maduresa incloses al full de ruta


##### Mètode de classificació

Per cada tecnologia inclosa en el full de ruta se li associen 2 valors:

- El **Grup de tecnologies** al que pertany (base de dades, gestió documental, sistema operatiu,
etc.)
- L’**Estat de la tecnologia** des del punt de vista del seu grau d’implantació. Es pot usar un dels següents valors:

	- MR: Model de Referència. El disseny de l’arquitectura tecnològica és propi i normalitzat, i
els processos d’explotació i suport estan preparats.
	- MP: Millor Pràctica. El disseny de l’arquitectura tecnològica no és propi i no està normalitzat, però els processos d’explotació i suport estan preparats.
	- OP: Opcional. Hi ha algun sistema d'informació amb aquesta tecnologia, però el disseny de l'arquitectura no és propi, i els processos d’explotació i suport són limitats.
	- SUP: A suprimir. Tecnologia que per qüestions de mercat i/o evolució tecnològica caldria deixar d’utilitzar.


## Part 4: Requisits del programari

1. Quan es defineixi la necessitat d'un nou programari **s'ha** d'usar el programari estandarditzat pel CTTI, segons les taules recollides a l'annex A l'annex <a href='{{<relref "#fullruta" >}}'>Programari estandarditzat</a>

1. Si un programari no es troba al full de ruta no vol dir ni que no es pugui utilitzar ni que no estigui subjecte als mateixos criteris d’obsolescència que la resta de productes. En cas de dubtes sobre algun programari podeu adreçar-vos a la Unitat d’Arquitectura Corportiva de CTTI.

1. Arran del dinamisme de les versions de les diferents tecnologies per part dels fabricants, el full de ruta ha de ser revisat quadrimestralment. D’aquesta forma cada full de ruta publicat contindrà les dates de la darrera revisió i validesa de la informació que conté.


# ANNEX A (normatiu) Programari estandarditzat

| Darrera revisió realitzada  | Revisió de full de ruta vigent fins 
| --------------------------- |:-----------------------------------:
| 1 de Maig de 2018           | 1 de Setembre de 2018

### Lloc de treball


#### Sistemes operatius

| Tipus                       |  Estat | Obsolet | Suportat | Versió actual CTTI | En Roadmap CTTI | Emergent
| --------------------------- |:-------:| :--------:|:----------:|:--------------------:|:-----------------:|:--------:                 
| Windows estació de treball | MP | XP, Vista, 7 | 8.1 | 8.1 | 10 | --
| Windows tauleta | MP | XP, Vista, 7 | 8.1 | 8.1 | 10 | --
| Branques Windows 10 | MP | 1507 (Inicial) | 1511, 1607, 1703,1709 | 1709 | 1803 | 1809

#### Eines ofimàtiques

| Tipus                       |  Estat | Obsolet | Suportat | Versió actual CTTI | En Roadmap CTTI | Emergent
| --------------------------- |:-------:| :--------:|:----------:|:--------------------:|:-----------------:|:--------:                 
| MS Office estació de treball | MP    | 2003, 2007, 2010 | 2013, 2016               | 2016     | -- | 2019 
| MS Office tauleta            | MP    |2003, 2007, 2010  | 2013, 2016               | 2016     | -- | 2019 
| Openoffice                   | OP    | 3.3, 3.4, 4.0    | 4.1.x| 4.1.3    | -- | -- 
| LibreOffice                  | OP    | 5.0, 5.1, 5.2, 5.3  | 5.4       | 5.4.6    | -- | 6.0 









#### Navegadors Web

| Tipus                       |  Estat | Obsolet | Suportat | Versió actual CTTI | En Roadmap CTTI | Emergent
| --------------------------- |:-------:| :--------:|:----------:|:--------------------:|:-----------------:|:--------:                 
| Internet Explorer | MP    | 6, 7, 8, 9, 10 | 11               | 11                 | -- | --
| Microsoft Edge    | MP    | 1507 (Inicial) | 1511, 1607, 1703, 1709 | 1709 | 1803| 1809
| Mozilla Firefox   | MP    | 48, 49           | 52               | 59                 | --              | 60    
| Google Chrome     | MP    | 53, 54       | 59             | 65               | 66            | 67  



### Servidors

#### Mainframe i AS400

| Tipus                       |  Estat | Obsolet | Suportat | Versió actual CTTI | En Roadmap CTTI | Emergent
| --------------------------- |:-------:| :--------:|:----------:|:--------------------:|:-----------------:|:--------:                 
| Content Manager | OP    | <= V5R2                | V5R3                  | V5R3               | --              | --       | 
| DB2 (AS400)     | OP    | <= V5R4, V6R1          | V7R1(7.1), V7R2(7.2)            | V7R2               | V7R3            | --       | 
| Iseries         | MP    | <= V5R4, V6R1          | V7R1(7.1), V7R2(7.2)            | V7R2               | V7R3            | --       | 
| z/OS            | MP    | 1.x                    | 2.1                   | 2.1                | 2.2             | 2.3       | 
| DB2 (HOST)      | MP    | 8.1, 9                 | 10.2,11.x, 12.1       | 12.1               | --              | 12.2     | 
| CA IDMS Server  | MP    | 16                     | 18                    | 19                 | --              | --       | 
| CICS            | MP    | 3.2                    | 5.2, 5.3              | 5.3                | 5.4             | --      | 
| SNA Server      | MP    | SNA Server 4, HIS 2000 | HIS 2010, 2013, 2016  | HIS 2016           | --              | --       | 

### Programari base

#### Bases de dades

| Tipus                       |  Estat | Obsolet | Suportat | Versió actual CTTI | En Roadmap CTTI | Emergent
| --------------------------- |:-------:| :--------:|:----------:|:--------------------:|:-----------------:|:--------:                 
| Oracle / Oracle RAC         | MR      |9i, 10g, 11.1, 11.2      | 12.1, 12.2    |12.2      | --              | 18c                        | x        | Enterprise                       | 
| MySql Database              | MR      | 4, 5.0, 5.1, 5.5, 5,6  | 5.7                | 5.7                | --              | --                       | x        | Community                        | 
| SqlServer                   | MP     |2000, 2005, 2008, 2012  |2014, 2016        | 2016               | --              | 2017                      | x        | Standard                         | 
| PostgreSQL                  | OP     | 7.x, 8.x, 9.0, 9.1, 9.2  | 9.3, 9.4, 9.5, 9.6 | 9.6                | 10             | --                        |          |                                | 
| MongoDB                     | MP     | 2.2, 2.4, 2.6, 3.0 | 3.2, 3.4           | 3.4 | 3.6             | --                        |          | Community                        | 
| Redis                       | MP     | < 3.0, 3.0  | 3.2                | 3.2                | --             | 4.0                        |          | Community                        | 
| MariaDB                     | OP     | <= 5.3    | 5.5, 10.0, 10.1        | 10.1               | 10.2           | 10.3                        |          | Community                        | 


#### Servidors d'aplicacions

| Tipus                       |  Estat | Obsolet | Suportat | Versió actual CTTI | En Roadmap CTTI | Emergent
| --------------------------- |:-------:| :--------:|:----------:|:--------------------:|:-----------------:|:--------:                 
| Tomcat                          | MR              | 5.0, 5.5, 6.0                         |  7.0, 8.0               | 8.0                | --              | 9.0                        | x        | JBoss EWS 3.0                  | 
| WebLogic                        | MR              | 8.1, 9.2, 10.2, 12.1.x                        | 11g (10.3.x), 12.2.x    | 12.2.x                    | --                        | --                        | x        | Premier                          | 
| WebSphere                       | OP              | 4.0, 5.1,6.1, 7.0, 8.0                 | 8.5, 9.0      | 9.0                | --              | --                        |          |                                  | 
| Microsoft                       | MR              | "DNA COM+, < .NET 3.5                 | 3.5 SP1,  4.5.x,  4.6.x, 4.7 | 4.7              | --         | --                          | x        | Versió distribuïda amb SO |        
| Jboss EAP                       | MR              | 4.3, 5.x                              | 6.x, 7.x                  | 7.x                | --              | --                       | x        | EAP                              | 
| PHP                             | MR              | 4.x, 5.1, 5.3, 5.4, 5.5               | 5.6,7.0,7.1                 | 7.1                | --              | 7.2                       | x        | RHEL / Software Collections 2.2  | 
| JDK                             | MR              | 1.4, 1.5, 1.6                              |  1.7, 1.8            | 1.8                | --              | --                       |          |                                  | 
| Node.js                         | MP              | 0.10, 0.12, 4.x, 5.x                                   | 6.x, 8.x                  | 8.x                | --              | 10.x                        |          | LTS                              | 


#### Servidors Web

| Tipus                       |  Estat | Obsolet | Suportat | Versió actual CTTI | En Roadmap CTTI | Emergent
| --------------------------- |:-------:| :--------:|:----------:|:--------------------:|:-----------------:|:--------:                 
| Apache                          | MR              | 1.3, 2.0, 2.2                              |  2.4             | 2.4                | --              | --                        | x        | RHEL / Software Collections 2.2  | 
| IIS                             | MP              | 4.0, 5.0, 6.0                         | 7.0, 7.5, 8.0, 8.5, 10   | 10                | --              | --                        | x        | Versió distribuïda amb SO        | 
| Nginx                           | OP              | 1.8                                    |  1.10, 1.12                    | 1.12                | --              | --                        |          | Software Collections 2.1         | 
| IHS                             | OP              | 4.0, 5.1, 6.1 , 7.0.x, 8.0.x  | 8.5.x, 9.0.x      | 9.0.x               | --             | --                        |          |                                  | 


#### Gestors documentals i continguts

| Tipus                       |  Estat | Obsolet | Suportat | Versió actual CTTI | En Roadmap CTTI | Emergent
| --------------------------- |:-------:| :--------:|:----------:|:--------------------:|:-----------------:|:--------:                 
| Documentum                      | MR              | 5.x, 6.x, 7.0                         | 7.1, 7.2             | 7.2                | 7.3              | --                        |          |                                  | 
| FileNet - Case Foundation       | MR              | 4.0, 4.5.x, 5.1                       | 5.2                  | 5.2                | --              | 5.5                        |          |                                  | 
| Alfresco                        | OP              | 2.2, 3.x, 4.x excepte 4.2.3           | 4.2.7, 5.0, 5.1      | 5.1                | 5.2             | --                        |          |                                  | 
| OpenCMS                        | MP               | --                                    | 9, 9.5, 10.0   | 10.0               | 10.5            | --        |               |                                 | 
| Liferay                        | MP               | 4.3, 5.1                              | 6.1, 6.2, 7.0        | 7.0                | --              | --        |               |                                 | 
| Sharepoint                     | MR              | 2003, 2007, 2010                      | 2013, 2016            | 2016                | --              | 2017                       |          |                                  | 
#### Bus de serveis

| Tipus                       |  Estat | Obsolet | Suportat | Versió actual CTTI | En Roadmap CTTI | Emergent
| --------------------------- |:-------:| :--------:|:----------:|:--------------------:|:-----------------:|:--------:                 
| OSB                             | MP              | 10.3, 12.1.x   | 11.1.x, 12.2.x   | 12.2.x         | --              | --                        |                         | Fusion Middleware                | 

#### Directoris de noms

| Tipus                       |  Estat | Obsolet | Suportat | Versió actual CTTI | En Roadmap CTTI | Emergent
| --------------------------- |:-------:| :--------:|:----------:|:--------------------:|:-----------------:|:--------:                 
| Active Directory                | MP              | Veure S.O. Windows                    | Veure S.O. Windows   | Veure S.O. Windows | --              | --                        |          |                                  | 
| OpenLDAP                        | OP              | --                                    | 2.4                  | 2.4                | --              | --                        |          |                                  | 
#### ETLs

| Tipus                       |  Estat | Obsolet | Suportat | Versió actual CTTI | En Roadmap CTTI | Emergent
| --------------------------- |:-------:| :--------:|:----------:|:--------------------:|:-----------------:|:--------:                 
| Oracle Data integrator          | OP              | 10.1.x, 12.1.x                                    | 11.1.x, 12.2.x             | 12.2.x                | --              | --                        |          |                                  | 
| Talend                          | OP              | 5.4, 5.5                              | 5.6, 6.0, 6.1, 6.2, 6.3        | 6.1                | 6.4              | 6.5                        |          | Enterprise Data Integration      | 
| SQL Server Integration Services | OP              | 2000, 2005, 2008, 2012                      | 2014, 2016           | 2016               | --              | 2017                        |          |                                  | 

#### BIs

| Tipus                       |  Estat | Obsolet | Suportat | Versió actual CTTI | En Roadmap CTTI | Emergent
| --------------------------- |:-------:| :--------:|:----------:|:--------------------:|:-----------------:|:--------:                 
| Click@Decide                    | OP              | 2.20, 11.1, 12.2                  | 13.x, 15.x              | 15.x               | 16.x            | --	                           |          |                                  | 
| Microstrategy                   | MP              | 7.x, 8.x, <=9.3                   | 9.4, 10.4                | 10.4               | --              | --                        |          |                                  | 
| Oracle BI                       | MP              | 10gR3                             | 11.1.x, 12.1.x, 12.2.x   | 12.2.x             | --              | --                        |          |                                  | 
| SQL Server Analysis Services    | MP              | 2000, 2005, 2008, 2012                  | 2014, 2016         | 2016               | --              | 2017                        |          |                                  | 


#### Formularis

| Tipus                       |  Estat | Obsolet | Suportat | Versió actual CTTI | En Roadmap CTTI | Emergent
| --------------------------- |:-------:| :--------:|:----------:|:--------------------:|:-----------------:|:--------:                 
| Adobe LC                        | MR              | 7.2, 8, ES2, ES3                           | ES4 SP1, AEM6             | ES4                | AEM6           | AEM6.3                        |          |                                  | 

#### Enterprise Search

| Tipus                       |  Estat | Obsolet | Suportat | Versió actual CTTI | En Roadmap CTTI | Emergent
| --------------------------- |:-------:| :--------:|:----------:|:--------------------:|:-----------------:|:--------:                 
| Google Search Appliance         | SUP             | --                                     | 6.14, 7.2, 7.4, 7.6            | 7.2                | --              | 7.6                       |          |                                  | 
| Apache Solr                     | MP              | 4.x                                    | 5.5, 6.x             | 6.2                | --              | 7.0                        |          |                                  | 
| ElasticSearch                   | MR              | 1.x, >2.4                              | 2.4, 5.x             | 5.4                | 5.6              | 6.x                       | En radar |                                  | 



### Sistemes operatius


| Tipus                       |  Estat | Obsolet | Suportat | Versió actual CTTI | En Roadmap CTTI | Emergent
| --------------------------- |:-------:| :--------:|:----------:|:--------------------:|:-----------------:|:--------:                 
| Solaris                         | OP              | 8, 9, 10                              | 11                   | 11                 | --              | 11.next   	                     |          |                                  | 
| HP UX                           | MP              | <= 11.v2                              | 11i v3               | 11i v3             | --              | --                        |          |                                  | 
| AIX                             | MP              | 5.1, 5.3, 6.1                         | 7.1                 | 7.1                | 7.2             | --                        |          |                                  | 
| Linux (RH)                      | MP              | RHEL4, RHEL5                          | RHEL6, 7             | RHEL 7             | --              | --                        | x        | RHEL                             | 
| Linux (Oracle)                  | MP              | OL4, OL5                              | OL 6, 7              | OL 7               | --              | --                        | x        | OL Premier Support               | 
| Linux (Suse)                    | OP              | SLES 9, 10                            | SLES 11, 12          | SLES 12            | --              | --                        |          |                                  | 
| Windows                         | MP              | 2008 R2, 2012                         | 2012 R2, 2016              | 2016            | --            | --                       | x        | Standard                         | 
| Hiper-V                         | OP              | 2008 R2, 2012                         | 2012 R2, 2016              | 2016            | --            | --                        |          |                                  | 
| XenApp & XenDesktop                        | MR              | 6                         | 6.5, 7.0 to 7.13, 7.6, 7.14, 7.15, 7.16, 7.17              | 7.15            | --            | --                        |          |   
| VMWare                          | MP              | 2.0.5, 3.0, 3.5, 4.x                  | 5.0, 5.5, 6.0             | 5.0, 5.5           | 6.5             |                           |          |                                  | 


### ERP

#### Sistemes SAP

| Tipus                       |  Estat | Obsolet | Suportat | Versió actual CTTI | En Roadmap CTTI | Emergent
| --------------------------- |:-------:| :--------:|:----------:|:--------------------:|:-----------------:|:--------:                 
| SAP Business Suite ERP          | MR              | <=ERP 5.0, 5.0                             | ERP 6.0              | ERP 6.0            | --              | ERP 6.8 SP01                        |          |                                  | 
| SAP Nw AS ABAP - Java           | OP              | <=Nw04, 7.0                                | 7.1 - 7.5            | 7.5             | --              | --                        |          |                                  | 
| SAP Nw Web Dispatcher           | MR              | < 7.0, 7.1                            | 7.2, 7.49            | 7.49               | --              | --                        |          |                                  | 
| SAP Nw Enterprise Portals       | MP              | <=Nw04, 7.0                                | 7.1 - 7.5            | 7.5             | --              | --                        |          |                                  | 
| SAP Nw Process Integrator       | MR              | <=Nw04, 7.0                                | 7.1 - 7.5            | 7.5                | --              | --                        |          |                                  | 
| SAP Nw Content Server           | OP              | 6.20, 6.30, 6.40                      | 6.50                 | 6.50               | --              | --                        |          |                                  | 
| OpenText                        | OP              | --                                    | 10.0-10.5, 16        | 16                 | --              | --                        |          |                                  | 
| SAP Data Services               |  OP             |  <=4.1                                | 4.2                  | 4.2                | --              | --                        |          |                                  | 
| SAP Nw Business Intelligence    | MR              | <=Nw04, 7.0                                | 7.1 - 7.5            | 7.5             | --              | --                        |          |                                  | 
| SAP Crystal Reports             | MP              | <2008, 2011                           | 2013, 2016           | 2016             | --              | --                        |          |                                  | 

# ANNEX B (informatiu) Maduresa d'una tecnologia {#maduresa}

### La maduresa des del punt de vista del grau de suport intern

Una tecnologia en les seves diferents versions pot passar per 5 estadis diferents. 

- **Obsolet**. Una versió d’una tecnologia es considerarà obsoleta en el moment en què estigui fora de la línia de manteniment correctiu del seu fabricant, ja sigui perquè està en període de suport extès o completament fora de suport del fabricant.

- **Suportat**. Una versió d’un producte es considerarà suportada mentre el fabricant (o una empresa de serveis especialitzada) doni suport de manteniment estàndard de la versió del programari.

- **Versió actual CTTI**. És la versió de programari que s’està desplegant actualment. Si no hi ha cap motiu que requereixi reconsiderar l’elecció, és la versió de programari que es recomana utilitzar.

- **En Roadmap CTTI**. És la versió de programari que està estudiant-se per la seva futura implantació. Un cop definida i implantada l’arquitectura de la versió, aquesta passarà a ser la “versió actual CTTI”.

- **Emergent**. És la darrera versió de programari publicada pel fabricant i reconeguda internament però que encara no està en avaluació per la seva implantació (és a dir, ni “En Roadmap CTTI” ni en “Versió actual CTTI”).

### La maduresa des del punt de vista del fabricant

Segons el fabricant d’una tecnologia, un producte en les seves diferents versions pot passar per 3 estadis diferents. 

- **No suportat**. Versió sobre la que ja no es presta suport o bé es presta un suport extès, normalment amb uns costos superiors als del manteniment habitual.

- **Suport estàndard**. Versió de programari sobre la que es presta suport evolutiu i correctiu. 

- **Actual**. Versió considerada com a actual per part del fabricant (coincideix amb les versions que estan en període de suport).
 

