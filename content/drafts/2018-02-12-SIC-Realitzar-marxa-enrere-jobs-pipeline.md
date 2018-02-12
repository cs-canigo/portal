+++
date        = "2018-02-12"
title       = "SIC. Gestionar marxes enrere amb jobs pipeline"
description = "En aquest article mostrem com redesplegar una versió anterior de l'aplicació al SIC després d'un desplegament fallit."
sections    = ["drafts"]
categories  = ["sic"]
key         = "FEBRER2018"
draft =true
+++

Amb la posada en marxa del SIC 2.0, el procés d'execució de jobs i de gestió de la marxa enrere ha canviat substancialment. A continuació us en fem un resum de les novetats més importants que aporta el SIC 2.0:

* **Els jobs són de tipus pipeline**: Ja no es creen més jobs de tipus BLD, LIB, INT, PRE ni PRO. Amb el SIC 2.0 existeix un sol job s'encarrega de construir i desplegar a tots els entorns (si s'escau).
* **No s'ha de crear cap tag**: Si es disposa de jobs pipeline per a l'aplicació, amb el SIC 2.0, és la pròpia pipeline la que crea els tags en els repositoris de l'aplicació.
* **Canvia la gestió de permisos**: Tal i com us ja hem comentat en altres articles, la gestió dels permisos és automàtica per a CPD i LDT i en format d'autoservei per a proveïdors d'aplicació.
* **Integració amb GICAR**: Tot usuari del SIC, cal que tingui un usuari vàlid GICAR amb el camp del mail informat.

## Implicacions d'aquests canvis en la gestió de la marxa enrere

Actualment, els jobs del SIC no realitzen cap marxa enrere de forma automàtica (a excepció dels desplegaments en servidors d'aplicacions). Per tant, la gestió de la marxa enrere correspon a l'usuari desplegant una versió anterior.

Amb els antics jobs freestyle del SIC 1.0, es podia executar el job de l'entorn corresponent sel·leccionant el tag desitjat i es desplegava la versió de marxa enrere desitjada.

Amb el SIC 2.0, cal fer un push al repositori d'una versió o d'un tag anteriors. A continuació, s'explica com fer-ho.

### Realitzar un push d'una versió o d'un tag anterior

El procediment és el següent:





si l'aplicació compta amb jobs pipeline, aquests s'executen automàticament després de fer un push al repositori.

Des de l'implantament del GitLab al SIC, tots els projectes disposen de la possibilitat de la creació de wikis internes per a la documentació i descripció tant dels processos inclosos al repositori com també per allotjar tots els procediments necessaris per al correcte desenvolupament, desplegament i proves relacionats amb el projecte.

## Accés a la Wiki

Dins de cada projecte tenim una opció al menú superior de manteniment del projecte que ens permet accedir a la Wiki.

La primera vegada que accedim a la Wiki del nostre projecte, aquesta, te l'aspecte següent:

<div style="width:90%;margin:0 auto;"><img style="width: 90%; height: auto" src="/images/news/SIC-wiki-aspecte-inicial.png" alt="Aspecte inicial de la wiki" title="Aspecte inicial de la wiki"></img></div>

## Organització de les Wikis d'un codi d'aplicació

Dins del grup d'aplicació on estigui allotjat el repositori de la nostra aplicació, podem organitzar la Wiki de forma que tingui un abast general o podem tenir una wiki per a cada projecte independent.

En el cas de decidir-nos per un àmbit general, cal crear un projecte separat de la resta per allotjar tota la documentació que generarem.

Escollim la opció que sigui, si volem allotjar documents i imatges, hem de crear una estructura de directoris on penjar-los. Per exemple, aquí tenim un projecte anomenat **documentacio** on tenim una carpeta per als **manuals** i un altre per les **imatges**. El directori per allotjar les imatges, s’ha d'anomenar-se obligatòriament  **wiki/images**.

<div style="width:90%;margin:0 auto;"><img style="width: 90%; height: auto" src="/images/news/SIC-estructura-organitzacio-wiki.png" alt="Estructura de directoris de la wiki" title="Estructura de directoris de la wiki"></img></div>


## Llenguatge de edició/generació de la Wiki

Un dels llenguatges més utilitzat per a la generació de wikis, i que és el que utilitzem al SIC per la generació d'aquestes pàgines, és el **Markdown**.

Markdown és un llenguatge de **marcat** que facilita l'aplicació de format a un text fent servir una series de caràcters d'una forma especial.

```
Per exemple, si escrivim **text en negreta**, aquest apareix en negreta.
```
Resultat: **text en negreta**.

La sintaxis es molt senzilla i ens permet anar escrivint el text que vulguem i afegint els caràcters de marcatge de forma fluida per formatar el nostre text.

Aquest llenguatge ens permet afegir títols de diferent nivell, diferents formats de text, taules, llistes, links, etc...

Podeu accedir a més informació referent a Markdown als enllaços següents:  
[Suport de Markdown al GitLab](https://git.intranet.gencat.cat/help/user/markdown)  
[Markdown a la WikiPedia](https:/ca.wikipedia.org/wiki/Markdown)  
[Pàgina del creador de Markdown](https://daringfireball.net/projects/markdown/)  


## Procés de generació de la Wiki

Per a la creació d'una pàgina wiki hem de fer click al botó **New Page** que es mostra a la wiki del projecte. En cas de no tenir cap pàgina a la wiki, nomès entrar ja s'ens mostra l'editor preparat per a generar una pàgina d'entrada a la wiki, tal com hem vist al primer punt d'aquest document.

L'editor web ens permet escollir el tipus de **Format** que volem fer servir per a la pàgina, podem afegir directament el contingut i afegir un comentari als canvis fets al document. Ens permet escollir si volem un document Markdown, RDoc o AsciiDoc.

<div style="width:90%;margin:0 auto;"><img style="width: 90%; height: auto" src="/images/news/SIC-wiki-pagina-nova-format.png" alt="Format nova pàgina a la wiki" title="Format nova pàgina a la wiki"></img></div>

Al crear una pàgina nova, el primer que ens demana és el nom.

<div style="width:90%;margin:0 auto;"><img style="width: 90%; height: auto" src="/images/news/SIC-wiki-pagina-nova-nom.png" alt="Nom nova pàgina a la wiki" title="Nom nova pàgina a la wiki"></img></div>  


Editem el contingut:

<div style="width:90%;margin:0 auto;"><img style="width: 90%; height: auto" src="/images/news/SIC-wiki-pagina-text.png" alt="Text nova pàgina wiki" title="Text nova pàgina wiki"></img></div>

I veiem els resultats fent **Preview**:

<div style="width:90%;margin:0 auto;"><img style="width: 90%; height: auto" src="/images/news/SIC-wiki-pagina-preview.png" alt="Preview nova pàgina wiki" title="Preview nova pàgina wiki"></img></div>


Un cop finalitzada la edició de la pàgina wiki, la guardem i queda afegida a l'índex de la nostra wiki.

<div style="width:90%;margin:0 auto;"><img style="width: 90%; height: auto" src="/images/news/SIC-wiki-pagina-prova.png" alt="Nova pàgina wiki" title="Nova pàgina wiki"></img></div>