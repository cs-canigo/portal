+++
date        = "2017-11-23"
lastmod     = "2018-01-15"
title       = "Gestors documentals"
description = "Recomanacions de quan i com utilitzar gestors documentals. Què és un gestor documental, història i serveis transversals que cobreixen aquesta necessitat"
sections    = ["drafts"]
blog_tags   = ["eines"]
categories  = ["blog","gestors"]
+++

## Gestor documentals

Des d'arquitectura CTTI veiem que els ["gestors documentals"](#dms) són una solució molt utilitzada a diferent projectes, sent segurament Alfresco la solució més popular.

Molt sovint, la necessitat a cobrir és, senzillament, poder emmagatzemar documents a un servidor sense aprofitar totes les avantatges d'un gestor documental. 

Però què dona realment un gestor documental?  Quines són les seves característiques?

Un gestor documental (DMS) és un sistema que emmagatzema documents digitals, facilitant la col·laboració i compartició d'informació entre usuaris.

Algunes de les característiques clau de un gestor documental són:

* Interfície d'usuari per pujar/baixar fitxers i processos de bloqueig per coordinar edició simultània de documents de múltiples usuaris.
* Versionat del fitxers així que diferents versions poden ser fàcilment recuperables i distingides. El control de canvis permet aplicar polítiques d'auditoria.
* Registres d'activitats que permeten la reconstrucció dels documents durant el cicle de vida del document.


## Història

Per veure l'estat actual dels gestors documentals i possibilitats que ofereixen, és important veure l'evolució d'aquests sistemes amb el temps.

L'inici dels gestors documentals es remunta al començament dels 80. Inicialment, la idea era software que ajudava a gestionar documents físics en paper. Aquests sistemes gestionaven tant documents físics com fotografies, impressions, etc.

La evolució natural d'aquests sistemes va ser orientada a gestionar documents electrònics, que eren emmagatzemats a sistemes de fitxers de l'usuari local. Els primers DMS gestionaven un nombre molt limitat de formats o inclús creaven el seu propi format propietari. Molt d'aquest sistemes es van especialitzar en sistemes de gestió d'imatges, actualment coneguts com gestors d'actius digitals["(DAM)"](#dam). El gestors documentals van evolucionar per abastar més formats, eines de col.laboració, seguretat, fluxos de treball i auditoria.

### CMS

A principis dels 90, van sortir els primers gestors que permetien emmagatzemar el contingut en HTML. Aquests nous sistemes es coneixen com gestor de continguts (CMS) i suposa un canvi en el paradigma,on l'element principal del sistema ja no és el document sinó el contingut. Entre els avantatges que això comporta podem incloure:

* Més senzill de crear un disseny unificat per tot els continguts
* Permet una cerca més efectiva que inclou tots els continguts
* Permet enllaçar contingut de diferents pàgines
* Control de versions més sofisticat
* Gestió de permisos i auditoria més granular

Un CMS, en canvi, presenta els següents punts negatius:

* Corba d'aprenentatge més elevada donat a que cada CMS té editors i fluxos de treball diferents. 
* Edició de disseny més limitada respecte a altres formats.

Tot i que CMS i Wikis comparteixen moltes característiques, diferències clau entre ambdues solucions serien:

CMS:

* Focalitzat al contingut que es publica a través de plantilles estandarditzades. 
* Molt orientat a la presentació i estil consistent. Plantilles molt personalitzades
* Utilitzat per gent no tècnica i més útil per contingut força estàtic

Wiki:

* Focalitzat a la col.laboració i millorar contínuament el contingut.
* Molt orientat al contingut. Plantilles orientades a ser senzilles d'utilitzar i actualitzar.
* Més obert al públic i contingut més dinàmic en natura

Productes coneguts de CMS inclouen Wordpress (60% del mercat), Joomla (6.6%) i Drupal (4.6%) ["(cms2018)"](#cmsmarketshare) 

### ECM

Una idea més actual és la d'["ECM"](#ecm), gestor de continguts empresarials. Aquests gestors estenen el concepte de CMS, afegint processos i procediments orientats a gestionar els continguts d'acord amb les polítiques de la empresa. ECM pot ser vist com el software i a més un conjunt de estratègies, mètodes i eines que han de proporcionar la informació i contingut a audiències definides. 

La Associació Internacional per la Informació i Gestió d'imatges (AIIM) va crear el terme al voltant del any 2000. AIIM ha refinat la abreviatura ECM varis cops per reflectir el creixement en l'abast d'aquest tipus d'eina.

Les característiques clau que diferencien un ECM d'un DMS/CMS serien:

* Conversió de dades entre distintes formes digitals i tradicionals, incloent paper i film.
* Explotació de les dades.
* Integració amb motors de gestió de processos de negoci (BPM).
* Processos, estructura i cultura dins de l'organització per adoptar ECM.

Aquests sistemes, com hem vist, a més de gestor de documents, ofereixen múltiples possibilitats d'integració a nivell corporatiu. Si  l'adopció d'un ECM és merament per cobrir les necessitats documentals d'una aplicació, potser no estem aprofitant la eina. 

Un sistema ECM té, a més, integració amb processos de negoci, cosa que pot semblar atractiva. Aquestes solucions tendeixen a ser massa tancades o propietàries i difícil de personalitzar. Si realment cal integració DMS amb BPM, és millor veure quins estàndards d'integració suporta l'ECM/DMS i triar el BPM més adient.


Al món ECM, a data d'avui, trobem com a més populars Alfresco, Documentum i OpenText d'entre altres. 


## Quin ECM triar?

Gartner publica anualment el seu quadrant màgic d'ECM. El darrer, a data de 2017, ofereix el següent panorama:


![Quadrant màgic d'ECM](/images/bloc/201801/gartner2017.png)


Si només analitzem els ECM open-source, la llista és molt menys extensa. Del quadrant de Gartner només tindriem a Nuxeo i a Alfresco com referències. Alfresco surt com a "challenger" que vol dir que encara té una posició dominant al mercat però que ha perdut la visió per adaptarse a ell. Nuxeo, en canvi, surt com a "visionary", no té posició dominant al mercat però té la visió correcta. Veiem els 2 en detall segons el report de Gartner ["2017"](#gartner2017):


### ALFRESCO:

Alfresco és una solució madura, establerta ja al mercat i amb un posicionament important. 

Alfresco ha pres mesures en la innovació i fàcil adopció, com ser el primer proveïdor de serveis de contingut d'Amazon que ofereix Alfresco com a servei.

A més de les ofertes de suport d'Alfresco, hi ha una comunitat d'usuaris de Alfresco forta i activa que proporciona suport addicional entre iguals. 

#### PRECAUCIONS

La oferta de serveis a la carta, connectors externs, ERP i altres extensions és molt limitada. Es basa en els socis i les ofertes de tercers per oferir connectors i extensions.

Hi ha molta crítica sobre l'autèntica política d'["open-source d'Alfresco"](#criticaalfresco). Alfresco community (open-source) i One (comercial) són, a dia d'avui, 2 productes diferents. Fins i tot la documentació és equívoca i redirecciona d'un producte a altre sense cap criteri.

Els clients de referència entrevistats pel Quadrant van informar de la insatisfacció amb la "capacitat d'entendre les necessitats de la seva organització" d'Alfresco i el "valor derivat que proporciona el producte".

### NUXEO:

Nuxeo té una àmplia gamma de serveis de contingut, inclosa la gestió d'actius digitals (DAM) i una API completa. Nuxeo ha tingut èxit entre les empreses mitjanes-grans, especialment en els serveis financers i govern. 

Nuxeo és una bona opció per als clients que planifiquen desenvolupar serveis de contingut personalitzats, aplicacions i extensions per a aplicacions i sistemes de línia de negoci.

La plataforma moderna i modular de Nuxeo ofereix als clients la possibilitat d'ajustar la plataforma a les seves necessitats específiques, com ara escollir entre un RDBMS tradicional o un enfocament NoSQL per escalabilitat, centres de dades distribuïts i manipulació de metadades adaptables.

La versió comercial de Nuxeo comparteix el mateix codi base que la open-source. És a més, la única solució open-ource del quadrant que ofereix possibilitats de clusterització.

Un tema comú en referència als comentaris dels clients és la rapidesa en la implementació de la Plataforma Nuxeo i la rapidesa amb que els clients van poder obtenir un valor afegit de la seva inversió. Més del 60% dels enquestats van dir que la implementació va trigar menys de sis mesos; més de la meitat d'aquests van dir que va trigar menys de tres mesos.

#### PRECAUCIONS

Nuxeo és una empresa mitjana amb un grapat d'oficines a Estats Units i Europa occidental. El seu canal associat és limitat en comparació amb els de rivals més grans.

La plataforma Nuxeo no té la riquesa de característiques dels productes rivals, especialment en la captura de continguts i la gestió de registres. La captura, per exemple, es basa exclusivament en ofrenes de partners.


## Altres alternatives

Si la necessitat és, simplement, emmagatzemar i recuperar documents sense cap control de versions ni autorització granular possiblement un sistema de fitxers o una base de dades per binaris sigui la millor opció.

Un sistema de fitxers és més ràpid a l'hora de servir fitxers des de la web quan comparat a una base de dades.

Una base de dades NoSQL com ara MongoDB GridFS ofereix possibilitats com backup, escalat i clusterització respecte un sistema de fitxers convencional.

Altres característiques com ara control de versions pels fitxers són relativament senzilles d'aconseguir, ja sigui a nivell d'aplicatiu o utilitzant eines de control de versions com ara git o ["git-lfs"](#gitlfs)

A aquesta ["comparativa"](#fsvsnosql) es pot trobar més informació sobre quan triar un sistema de fitxers convencional o NoSQL per emmagatzemar documents.

Altra opció d'integració per aplicacions a l'univers Generalitat és a través d'["Aresta"](#aresta), el gestor documental corporatiu. 
Aquest gestor s'adreça a sistemes de back office de gestió d'expedients dels departaments i organismes de la Generalitat que tramiten expedients electrònics i cobreix el cicle de vida de documents a totes les fases.


## Conclusió

Les possibilitats per "gestors" documentals o eines per emmagatzemar documents són molt amplies. Quan es faci l'anàlisi de quina eina és l'adequada per la feina, s'ha de tenir en compte també el manteniment del sistema. 

Adoptar un producte amb funcionalitats que no calen a dia d'avui comporta un manteniment d'aquestes característiques.

És preferible utilitzar el producte més adient a la tasca, sobretot tenint en compte el seu cicle de vida i que faciliti una actualització senzilla a versions suportades. 


## Referències:

<a name="dms"></a>**Definició de gestor documental (DMS)**
[https://en.wikipedia.org/wiki/Document_management_system]
(https://en.wikipedia.org/wiki/Document_management_system)
<a name="cms"></a>**Definició de gestor de continguts (CMS)**
[https://en.wikipedia.org/wiki/Content_management_system]
(https://en.wikipedia.org/wiki/Content_management_system)
<a name="ecm"></a>**Definició de gestor de continguts empresarials (ECM)**
[https://en.wikipedia.org/wiki/Enterprise_content_management]
(https://en.wikipedia.org/wiki/Enterprise_content_management)
<a name="dam"></a>**Definició de gestor de actius digitals (DAM)**
[https://en.wikipedia.org/wiki/Digital_asset_management]
(https://en.wikipedia.org/wiki/Digital_asset_management)
<a name="dmsvscms"></a>**Diferències entre DMS i CMS**
[https://www.efilecabinet.com/content-management-systems-vs-document-management-systems/]
(https://www.efilecabinet.com/content-management-systems-vs-document-management-systems/)
<a name="dmsvsecm"></a>**Diferències entre ECM i DMS**
[https://www.efilecabinet.com/the-differences-between-ecm-and-dms/]
(https://www.efilecabinet.com/the-differences-between-ecm-and-dms/)
<a name="cmsvsecm"></a>**Diferències entre CMS i ECM**
[http://www.prescientdigital.com/articles/content-management/cms-or-ecm-2013-what-is-the-difference]
(http://www.prescientdigital.com/articles/content-management/cms-or-ecm-2013-what-is-the-difference)
<a name="futurcms"></a>**El futur de la gestió documental**
[https://www.cmswire.com/cms/document-management/3-takes-on-the-future-of-document-management-027398.php]
(https://www.cmswire.com/cms/document-management/3-takes-on-the-future-of-document-management-027398.php)
<a name="eovluciocms"></a>**Evolució CMS**
[https://www.fourkitchens.com/knowledge/webinars/the-future-of-the-cms/]
(https://www.fourkitchens.com/knowledge/webinars/the-future-of-the-cms/)
<a name="cmsmarketshare"></a>**Adopció CMS**
[https://websitesetup.org/popular-cms/]
(https://websitesetup.org/popular-cms/)
<a name="criticaalfresco"></a>**Crítica Alfresco**
[https://medium.com/@mathiasconradt/dumping-alfresco-for-nuxeo-as-my-preferred-document-management-system-2116cf421d36]
(https://medium.com/@mathiasconradt/dumping-alfresco-for-nuxeo-as-my-preferred-document-management-system-2116cf421d36)
<a name="gartner2017"></a>**Quadrant màgic per ECM (2017)**
[https://www.gartner.com/doc/reprints?id=1-4G83I6W&ct=171002&st=sb]
(https://www.gartner.com/doc/reprints?id=1-4G83I6W&ct=171002&st=sb)
<a name="fsvsnosql"></a>**NoSQL vs Filesystem**
[https://alexmarquardt.com/2017/03/02/trade-offs-to-consider-when-storing-binary-data-in-mongodb/]
(https://alexmarquardt.com/2017/03/02/trade-offs-to-consider-when-storing-binary-data-in-mongodb/)
<a name="aresta"></a>**Aresta**
[http://ctti.gencat.cat/ca/detalls/detallarticle/aresta]
(http://ctti.gencat.cat/ca/detalls/detallarticle/aresta)
<a name="gitlfs"></a>**Git-lfs**
[https://git-lfs.github.com/]
(https://git-lfs.github.com/)