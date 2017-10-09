+++
date        = "2016-11-09"
title       = "Tecnologia darrera del Web d'Arquitectura"
description = "Us expliquem la tecnologia darrera la web d'arquitectura i com l'utilitzem de base per a part de la R&D que fem a la unitat"
sections    = ["Blog", "home"]
blog_tags	= ["patrons de disseny"]
imatge 		= "/images/bloc/web-aq.png"
aliases       = [
"/bloc/2016/11/web-arquitectura/"
]
key         = "NOVEMBRE2016"
+++

Amb el **Web d'Arquitectura** gaudim d'un petit laboratori d'investigació que ens permet avaluar tecnologies, provar aspectes que en un futur seran susceptibles de formar part del catàleg de solucions, i posar en producció principis i tècniques que serviran com a patrons per al disseny d'aplicacions.

## Web d'Arquitectura S01E01 "Pilot"

El Web d'Arquitectura actual va néixer de l'antic web del Centre de Suport Canigó, desenvolupat amb _Confluence_, i era difícil de mantenir i evolucionar. En el moment que ens vàrem plantejar la modernització del web i l'ampliació de seccions i continguts, vam estudiar què es feia al món dels bloggers. 

Allà hi havia una tendència per a simplificar la pila tecnològica sobre la que corrien els blocs (normalment PHP + MySQL, com en el cas de Wordpress). D'aquest corrent varen començar a sorgir el que s'anomenen **Static Site Generators**. Aquestes eines simplificaven moltíssim la gestió de blocs, mitjançant un sistema de plantilles com qualsevol gestor de continguts. Utilitzant **markdown** com a metallenguatge que es "compila" a html, es generaven sites estàtics que es podien allotjar a tan sols un servidor web o en _(diverses plataformes)_ al núvol.

Vam considerar interessant aquesta aproximació i vam avaluar diverses eines. D'elles vam considerar [**Hugo**](http://gohugo.io) per la seva senzillesa i potència, per que no incorpora dependències externes (doncs és un sol binari), i aconsegueix un performance molt elevat en la generació del web. Una altra raó colateral es que està desenvolupat amb Golang i va coincidir en el temps amb la nostra investigació d'aquest llenguatge de programació.

Un temps després, a principis de l'any 2015, vàrem publicar el web que esteu llegint.

## Web d'Arquitectura S01E02 "Hugo"

En què ens beneficia, doncs, [**Hugo**](http://gohugo.io)? 

Paradoxalment, en molts casos ens trobem que el rendiment que donen piles tecnològiques més complexes pel fet de ser dinàmiques, com el nostre vell i estimat model en 3 capes, no és òptim per la quantitat de visites que pateix. Llavors un remei que acostumem a aplicar és guardar, a memòria cau, còpies del html que genera aquest codi dinàmic, que, per disseny, a cada petició accedeix a una base de dades. És a dir, guardem a la caché una còpia de la crida que fa el codi dinàmic a la base de dades i la transformació a html que es serveix a l'usuari final. Llavors, ens trobem que, si obviem aquesta generació dinàmica, només necessitem quelcom que ens generi l'html directament. Val a dir que no tots els webs o aplicacions poden fer servir aquesta tècnica, però per al web d'arquitectura, va encaixar perfectament. Un altre dels principis que pretenim cobrir es que les arquitectures puguin evolucionar segons requeriments o la tecnologia de cada moment. En tenir els continguts en text pla organitzats en carpetes, un canvi d'eina de generació del web seria relativament senzill.

## Web d'Arquitectura: el Making-off

A banda de Hugo com a generador del site, hem anat incoporant diverses peces a mida que anàvem investigant o necessitant de noves solucions tecnològiques. Us fem un breu resum i us explicarem en posts posteriors algunes d'elles:

- **Cercador**: inicialment utilitzàvem el _Google Search Appliance_ com a eina de cerca, però, lligat a que Google discontinuarà aquesta solució i havíem d'investigar-ne de noves, una de les avaluades ens va semblar prou bona i ens ha servit per establir requeriments per al futur **Cercador Corporatiu**. En aquest cas parlem d'[**Algolia**](https://www.algolia.com), un _Search Engine as a Service_ que dóna moltíssimes facilitats per a crear tant l'índex com les pàgines de resultats.

- [**Github**](https://github.com): el web l'editen diversos usuaris i com que, inicialment, l'edició la fèiem en local (cada usuari editor necessitava instal·lar el binari d'Hugo a la seva màquina), necessitàvem un repositori àgil que ens permetés recuperar (git pull) i publicar (git push) els canvis i fer-los visibles als companys. A banda, ens ha servit per avaluar **Git** com a possible substitució del **Subversion** que utilitzem al **SIC**.

- [**Github Pages**](https://pages.github.com): per a publicar el web, de manera que tingui la màxima disponibilitat possible, res millor que un _Content Delivery Network_. En aquest cas, utilitzant Github com a repositori del codi (templates Hugo, contingut markdown, ...), publicar el portal a la solució que ofereix el propi Github per a allotjar webs, ens va semblar una bona idea i ens va servir per a demostrar els beneficis de cloud públic per a segons quines necessitats.

- [**NodeJS**](https://nodejs.org): utilitzem uns scripts desenvolupats amb aquesta tecnologia per a transformar el markdown a un index en JSON que injectem a Algolia. Fem un incremental amb els canvis, de manera que l'índex sempre està operatiu (_zero downtime_): https://github.com/cs-canigo/portal/blob/master/_tasks/algolia/index-algolia.js

- [**Prose.io**](http://prose.io): com hem comentat, inicialment tots els usuaris editors havien d'instal·lar certes eines a la seva màquina (Hugo, client de Git,...). Recentment hem començat a utilitzar Prose com a editor per sobre de Github, cosa que ens permet actualitzar els continguts del portal a través del navegador web. Lligat al punt següent de Continuous Delivery, hem aconeguit tenir la solució totalment lliure de dependències locals i podem treballar únicament amb un navegador web.

- **Continuous Delivery**: la nostra línia objectiu d'evolució del SIC, lligat a la iniciativa de cloud públic/contenidors/xpaas, és normalitzar els conceptes d'integració contínua i lliurament continu. En aquest cas, com que estem parlant d'un web estàtic, no crític, ens ha semblat un bon exemple per a començar. Hem utilitzat una eina al cloud públic ([**Wercker**](http://www.wercker.com)) que simularà el que acabarem fent al SIC amb Jenkins. En aquest cas, hem configurat l'eina per a que rebi un _webhook_ de Github quan es produeix un "push" del codi del portal. Aquesta eina s'encarrega de fer la construcció del web (amb Hugo), la indexació a Algolia (amb NodeJS) i la publicació a Github pages (amb Git). Aquí es pot veure el workflow i les pipelines que hem creat: https://github.com/cs-canigo/portal/blob/master/wercker.yml

- [**Disqus**](https://disqus.com): Un cop creat el portal ens va semblar que li faltava un punt de interactivitat. Amb **Disqus** tenim una eina SaaS que ens permet la interacció amb els lectors en base a comentaris al propi bloc. Sent un portal obert al públic, Disqus ens permet també la gestió dels comentaris i així evitar comentaris malsonants o fora de lloc.

![Workflow](/related/blog/workflow.png)


## Referències

* Llista de generadors de sites estàtics: https://www.staticgen.com/
* Markdown: https://guides.github.com/features/mastering-markdown/
* Codi del web a github: https://github.com/cs-canigo/portal
* Html generat a github pages: https://github.com/cs-canigo/portal/tree/gh-pages
