+++
date = "2019-01-02"
title = "Binaris"
description = "Eina del SIC per el lliurament d'artefactes a CPD"
sections = "SIC"
aliases = [
  "/noticies/2017-07-05-SIC-Gestio-binaris/"
]
toc = true
taxonomies = []
weight = 3
+++

## Introducció

El sistema de gestió de **binaris del SIC** s'encarrega de:

* Emmagatzemar els binaris que entreguen els Release Managers (o el sistema d'integració continua per a entorns amb desplegament no automàtic) per  a deixar-los a disposició del CPD/LdT encarregat de desplegar-los.
* Emmagatzemar els binaris i arxius pesats que no són permesos dins de GIT i que, per algun motiu, no es poden emmagatzemar al Nexus (material multimèdia pesat, binaris que no són dependències, etcètera) per a aplicacions que repositen codi font.

## Funcionament

### Accés al servei

Podrà accedir mitjançant el següent enllaç: https://bin.sic.intranet.gencat.cat <br/>
Haurà d'autenticar-se amb de les seves credencials d'accés **GICAR**. Els Release Manager, responsables de lot i tècnics de CPD disposaran d'accés al servei. Si no disposa d'accés, haurà de sol·licitar-ho al seu responsable.

<br/>
Per a més informació: [Autoservei d'usuaris] (/sic-serveis/autoservei-usuaris/)

<CENTER>![Binaris](/images/news/SIC-GestioBinarisPortal.png)</center>
<br/>

### Pujada d'artefactes

Aquest servei està destinat a aplicacions que, ja sigui per estar desenvolupades amb una tecnologia no suportada o per particularitats del procés de construcció, no es poden construir i desplegar mitjançant el servei d'integració continua. <br/>
Per a més informació: [Manual d'Integració](/related/sic/manual-integracio.pdf). <br/>

En accedir al servei es mostra una pàgina de benvinguda amb l'acció **Dipositar artefactes al SIC**. <br/>
Aquesta acció és únicament accessible per als lots d'aplicacions i redirigieix a l'usuari al job de Jenkins de pujada d'artefactes al SIC. Es tracta d'un mateix job per a tots els Release Managers de tots els lots. No registra traces amb informació sensible i transmet els links amb les ubicacions dels manuals i artefactes per correu electrònic a l'usuari que ha iniciat l'execució.

Aquest job sol·licita la següent informació:

* **Codi d'aplicació**: número de 4 xifres que es correspon amb el codi de diàleg (obligatori).
* **Projecte**: identificador del projecte (obligatori).
* **Versió**: número de versió de lliurament (obligatori).
* **Arxiu de binaris**: arxiu de binaris que desitja dipositar (obligatori).
* **Descomprimir ZIP**: indica si l'arxiu de binaris caldrà descomprimir-lo un cop pujat (per defecte, no).
* **Arxiu de documentació**: arxiu de documentació que desitja associar (opcional).

El job validarà que el codi d'aplicació sigui vàlid i que l'usuari disposi dels corresponents permisos. Si s'especifica una combinació de codi d'aplicació, projecte i versió ja lliurada anteriorment, el sistema sobreescriurà el seu contingut.

<br/>
<span style="color: #C00000;font-weight: bold">AVÍS:</span> <span style="color: #C00000">A partir del dia 24/01/2019 s'activarà el mode restrictiu en la validació que la pujada d'un nou binari vingui acompanyada de l'actualització de la versió del codi font del projecte corresponent.</span> Únicament estaran exemptes d'aquesta validació les aplicacions que disposin d'una excepció aprovada en la custodia de codi. Fins aleshores, el control es realitza en mode informatiu permetent continuar.

### Recuperació d'artefactes

En accedir al servei es mostra una pàgina de benvinguda amb l'acció **Recuperar artefactes del SIC**. <br/>
Aquesta acció és accessible tant pels Release Managers de tots els lots com per a tots els administradors de tots els CPDS/LdT i serà utilitzada per CPD/LdT de cara al desplegament de les aplicacions. Aquests accediran al servei en mode lectura a través del frontal web.

## Eliminació de binaris

S'executa un **procés diari nocturn** d'esborrat de binaris de forma que es respectaran únicament les 5 últimes versions per codi d'aplicació i projecte. No està concebut, per tant, com un servei de custodia permanent de binaris si no com un sistema d'intercanvi de binaris amb CPD/LdT per al desplegament d'aplicacions.

<br/><br/><br/>
Si voleu més informació podeu consultar la secció de [Manuals](https://canigo.ctti.gencat.cat/sic/manuals). <br/>
Si teniu qualsevol dubte o problema assegureu-vos de no trobar resposta a les [FAQ] (/sic/faq) i utilitzeu el canal de [Suport] (/sic/suport) o contacteu amb l'Oficina Tècnica Canigó CTTI a través del correu electrònic: **oficina-tecnica.canigo.ctti@gencat.cat**.