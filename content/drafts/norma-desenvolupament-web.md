
+++
date        = "2015-01-24T17:11:42+01:00"
title       = "Normatiu de Desenvolupament de la Capa de Presentació Web"
description = "Normatiu de Desenvolupament de la Capa de Presentació Web"
section     = "Normes"
weight                 = 4
toc         = false
data-actualitzacio =  "2015-01-12"
versio      = 1.2
responsable = "Unitat d’arquitectura corporativa, estàndards i qualitat. Àrea de Solucions."
abast       = "Aquesta norma estableix els estàndards a acomplir en el desenvolupament de la capa de presentació d'aplicacions web, i determina els requeriments mínims de navegadors amb els que s’han de poder visualitzar els webs i aplicacions de la Generalitat de Catalunya, lligats al full de ruta de programari del CTTI."
aplica      = "Les normes contingudes en aquest document apliquen a tots els proveïdors de desenvolupament i manteniment d’aplicacions."
llegenda = "<img src=\"/images/icon-mandatory.png\" /> Obligatori<br /><img src=\"/images/icon-recommended.png\" /> Recomanat<br /><img src=\"/images/icon-choice.png\" /> Elecció<br />"

+++

## Resum i context

* La Generalitat de Catalunya, com a administració pública, està obligada a l’acompliment de la normativa d’accessibilitat recollida en la Norma UNE 139803:2012, que és la norma de referència al Reial Decret 1494/2007, del BOE de 12 de novembre. 

* Aquesta norma actualitza i substitueix l’anterior, de 2004, i marca com a estàndard les pautes d’accessibilitat recollides a la WCAG 2.0 (Web Content Accessibility Guidelines).

* D’altra banda, la implementació tècnica dels webs hauria de seguir els estàndards marcats pel W3C i així com les millors pràctiques acceptades per la comunitat.

**Normes referenciades**

* [Norma UNE 139803:2012](http://administracionelectronica.gob.es/pae_Home/pae_Estrategias/pae_Accesibilidad/pae_normativa/pae_eInclusion_Normas_Accesibilidad.html)
* [Reial Decret 1494/2007, de 12 de novembre, sobre las condiciones básicas para el acceso de las personas con discapacidad a las tecnologías, productos y servicios relacionados con la sociedad de la información y medios de comunicación social](http://www.boe.es/buscar/doc.php?id=BOE-A-2007-19968)

## Usabilitat

* <span class="mandatory"></span>Els webs de la Generalitat de Catalunya han de seguir la normativa de presentació recollida al [Programa d’Identificació Visual de la Generalitat de Catalunya](http://identitatcorporativa.gencat.cat/ca/inici/).




## Portabilitat i Adaptabilitat

1. <span class="mandatory"></span>Els webs de la Generalitat s’han de desenvolupar seguint els estàndards marcats pel W3C.
                
                Aquest fet implica que les aplicacions han de ser portables i compatibles amb els diferents navegadors i versions dels mateixos sense que per això hagi d’existir codi específic per a un navegador (degut a que aquest aspecte dificulta el manteniment, l’evolució i la portabilitat de les solucions).

2. <span class="mandatory"></span>Els webs de la Generalitat de Catalunya orientats a ciutadà s’han de desenvolupar seguint el paradigma del disseny web adaptatiu (responsive design).

                El desenvolupament s’ha d’adaptar al navegador mitjançant media-queries, prioritzant i tenint present el concepte de “primer, mòbil” (mobile first) i de “una única web” (One Web). El disseny haurà de tenir en compte altres tipus de dispositius com: escriptori, tauleta i mòbil.
                S’ha de tenir present que les media-queries impliquen l’ús de CSS3 i això serà incompatible amb la utilització de navegadors antics que no implementen aquest estàndard.

3. <span class="choice"></span>Els webs de la Generalitat de Catalunya orientats a ús intern, quan l’aplicació hagi de ser consumida per diferents tipus de dispositius, s’han de desenvolupar seguint el disseny web adaptatiu (responsive design).


4. <span class="recommended"></span>Es recomana seguir l’estàndard HTML5 per a la definició del tipus de document

                               <!DOCTYPE html>
                Es recomana l’ús d’aquest tipus de document, encara que no es faci ús de totes les tecnologies de l’especificació, ja que és el que segueixen els fabricants i permetrà una major compatibilitat cap a endavant.

## Accessibilitat


1. <span class="mandatory"></span>Els webs de la Generalitat han de complir el **nivell doble A (AA)** de les WCAG 2.0. 
Les WCAG 2.0 es referencien a la Norma UNE 139803:2012, que actualitza i substitueix l’anterior, de 2004, que feia referència a les normes WCAG 1.0.

2. <span class="recommended">Eines de validació de l’accessibilitat</span>
                
                Es recomana la revisió del compliment dels estàndards complementant la revisió manual amb la revisió automàtica que realitzen algunes eines. No es podrà justificar la validesa d’un lliurament de l’aplicació pel sol fet que l’eina no hagi detectat cap disconformitat, sempre s’haurà de justificar el compliment de totes les normes, siguin o no amb una eina. 

                Es recomana usar el següent conjunt d’eines:

                * Validador HTML: http://validator.w3.org/
                * Validador CSS: http://jigsaw.w3.org/css-validator/
                * Validador WCAG (accessibilitat): http://www.tawdis.net

3. <span class="mandatory">Javascript</span>
                
                Amb l’actual normativa, si s’utilitza javascript, s’ha de fer compatible amb les eines d’assistència. Ja no és un requeriment que les planes funcionin amb javascript desactivat.

## Navegadors compatibles

1. <span class="mandatory"></span>Tot i que s’orientarà el desenvolupament a estàndards, s’ha de comprovar que el desenvolupament funciona correctament amb diversos navegadors i motors de renderització (webkit, gecko, trident, ...), sempre tenint en compte les necessitats del projecte.
                
                >> Mitjançant l’enllaç [Navegadors Compatibles](http://www.gencat.cat/web/ctti/browser-gencat.html) es pot comprovar la llista actualitzada de navegadors que accedeixen a gencat.cat

2. <span class="mandatory"></span>Revisar el [Full de Ruta de Programari del CTTI](https://portic.ctti.gencat.cat/les_tic/Normativa/arquitectura/Documents/Full%20de%20Ruta%20del%20Programari.pdf) per comprovar les versions de navegadors que estan obsoletes (ja sigui perquè queden fora de suport del fabricant, per problemes coneguts de seguretat, característiques bàsiques no implementades, ...). 

                Com a norma general,  s’ha de garantir com a mínim, la compatibilitat amb els navegadors i versions que compleixin les següents condicions:

                - Continuen vigents, segons el full de ruta del programari del CTTI i,
                - Es van alliberar durant els últims 2 anys i,
                - La seva quota de mercat és superior al 5%

3. <span class="choice"></span>Per a projectes orientats a ús intern/intranet, donat que els equips informàtics poden tenir limitacions a l’hora d’actualitzar navegadors, podria ser necessari fer compatible el desenvolupament amb versions obsoletes de navegadors. 

##          Eficiència

1. <span class="recommended"></span>Aprofitar la memòria cau dels navegadors sempre que sigui possible per als recursos estàtics que canvien molt poc sovint, habilitant les capçaleres de servidor web corresponents.
1.4.3.2  Combinar els fitxers javascript i css en el menor nombre de fitxers possibles 

2. <span class="recommended"></span>Durant el desenvolupament dels webs es poden mantenir diferents funcionalitats i mòduls en fitxers separats segons les necessitats del projecte però aquests fitxers s’han d’empaquetar quan el projecte passi als entorns de la Generalitat.

3. <span class="recommended"></span>Minimitzar (compactar) els fitxers html, css i javascript per eliminar el contingut innecessari.

4. <span class="recommended"></span>Optimitzar l’ordre de càrrega dels fitxers css i javascript (per exemple, els fitxers javascripts els posarem al final de l’html mentre que els css els posarem al <head>).

5. <span class="recommended"></span>Utilitzar mètodes de càrrega asíncrons per evitar bloquejos de planes durant la càrrega i retrassar la càrrega de les funcionalitats javascript que no siguin necessàries fins que la plana està carregada 
6. <span class="recommended"></span>Reduir el nombre de peticions d’imatges utilitzant css sprites 
7. <span class="recommended"></span>Optimitzar les imatges tant en pes com en format i escala adient. No escalar les imatges dins la pàgina amb les propietats d’amplada i/o alçada.


![creative-commons.gif](/images/creative-commons.gif)
