+++
date        = "2018-01-10"
title       = "SIC. Avantatges de la creació de Wikis als projectes del GitLab"
description = "Hem decidit publicar aquest article on descrivim les avantatges de la creació de Wikis per als projectes allotjats al GitLab del SIC i com es creen i gestionen."
sections    = ["drafts"]
categories  = ["sic"]
key         = "GENER2018"
draft =true
+++


Des del implantament del GitLab al SIC, tots els projectes, disposen de la possibilitat de la creació de wikis internes per a la documentació i descripció tant dels processos inclosos al repositori com també per allotjar tots els procediments necessaris per al correcte desenvolupament, desplegament i proves relacionats amb el projecte.

## Accés a la Wiki

Dintre de cada projecte tenim una opció al menú superior de manteniment del projecte que ens permet accedir a la Wiki.

La primera vegada que accedim a la Wiki del nostre projecte, aquesta, te l'aspecte següent:

<div style="width:90%;margin:0 auto;"><img style="width: 90%; height: auto" src="/images/news/SIC-wiki-aspecte-inicial.png" alt="Aspecte inicial de la wiki" title="Aspecte inicial de la wiki"></img></div>

## Organització de la Wiki

Dins del grup d'aplicació on estigui allotjat el repositori de la nostre aplicació, podem organitzar la Wiki de forma que tingui un abast general o podem tenir una wiki per a cada projecte independent.

En el cas de decidir-nos per un àmbit general, lo ideal es crear un projecte separat de la resta per allotjar tota la documentació que generarem.

Escollim la opció que sigui, si volem allotjar documents i imatges, hem de crear una estructura de directoris on penjar-los. Per exemple, aquí tenim un projecte anomenat **documentacio** on tenim una carpeta per als **manuals** i un altre per les **imatges**. El directori per allotjar les imatges, s’ha d'anomenar-se obligatòriament  **wiki/images**.

<div style="width:90%;margin:0 auto;"><img style="width: 90%; height: auto" src="/images/news/SIC-estructura-organitzacio-wiki.png" alt="Estructura de directoris de la wiki" title="Estructura de directoris de la wiki"></img></div>


## Llenguatge de programació/generació de la Wiki

Un dels llenguatges més utilitzat per a la generació de wikis, i que es el que utilitzem al SIC per la generació d'aquestes pàgines, es el **Markdown**.

Markdown es un llenguatge de **marcat** que facilita l'aplicació de format a un text fent servir una series de caràcters d'una forma especial. 

```
Per exemple, si escrivim **text en negreta**, aquest apareix en negreta.
```
 Resultat: **text en negreta**.
 
La sintaxis es molt senzilla i ens permet anar escrivint el text que vulguem i afegint els caràcters de marcatge de forma fluida per formatar el nostre text.

Aquest llenguatge ens permet afegir Títols de diferent nivell, diferents formats de text, taules, llistes, links, etc...

Podeu accedir a més informació referent a Markdown als links següents:  
[Suport de Markdown al GitLab](https://git.intranet.gencat.cat/help/user/markdown)  
[Markdown a la WikiPedia](https:/ca.wikipedia.org/wiki/Markdown)  
[Pàgina del creador de Markdown](https://daringfireball.net/projects/markdown/)  


## Procés de generació de la Wiki

Per a la creació d'una pàgina wiki hem de fer click al botó **New Page** que surt a la wiki del projecte, en cas de no tenir cap pàgina a la wiki, nomès entrar ja s'ens mostra l'editor preparat per a generar una pàgina d'entrada a la wiki, tal com hem vist al primer punt d'aquest document.

L'editor web ens permet escollir el tipus de **Format** que volem fer servir per a la pàgina, podem afegir directament el contingut i afegir un comentari als canvis fets al document. Ens permet escollir si volem un document Markdown, RDoc o AsciiDoc.

<div style="width:90%;margin:0 auto;"><img style="width: 90%; height: auto" src="/images/news/SIC-wiki-pagina-nova-format.png" alt="Format nova pàgina a la wiki" title="Format nova pàgina a la wiki"></img></div>

Al crear una pàgina nova, el primer que ens demana es el nom.

<div style="width:90%;margin:0 auto;"><img style="width: 90%; height: auto" src="/images/news/SIC-wiki-pagina-nova-nom.png" alt="Nom nova pàgina a la wiki" title="Nom nova pàgina a la wiki"></img></div>  


Editem el contingut.  

<div style="width:90%;margin:0 auto;"><img style="width: 90%; height: auto" src="/images/news/SIC-wiki-pagina-text.png" alt="Text nova pàgina wiki" title="Text nova pàgina wiki"></img></div>

I veiem els resultats fent **Preview**.

<div style="width:90%;margin:0 auto;"><img style="width: 90%; height: auto" src="/images/news/SIC-wiki-pagina-preview.png" alt="Preview nova pàgina wiki" title="Preview nova pàgina wiki"></img></div>


Un cop finalitzada la edició de la pàgina wiki, la guardem i queda afegida al índex de la nostre wiki.

<div style="width:90%;margin:0 auto;"><img style="width: 90%; height: auto" src="/images/news/SIC-wiki-pagina-prova.png" alt="Nova pàgina wiki" title="Nova pàgina wiki"></img></div>

