+++
date        = "2017-10-07"
title       = "Principis de Microserveis"
description = "Un cop acabada la transformació del maquinari i dels programaris que suporten les aplicacions, comencem a observar una certa tracció en les necessitats de posar al dia també les aplicacions. En la majoria de casos són plantejables la conversió de monòlits en aplicacions basades en microserveis. En aquest post, presentem els principis que han de governar el disseny i la implementació de les aplicacions basades en microserveis."
sections    = ["drafts"]
blog_tags   = ["microserveis"]
categories  = ["microserveis"]
imatge      = "/related/gicar/adfs-index.PNG"
key         = "OCTUBRE2017"
+++

<div id="google_translate_element">
</div>

<script type="text/javascript">
function googleTranslateElementInit() {
  new google.translate.TranslateElement({pageLanguage: 'ca', includedLanguages: 'en,es', layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element');
}
</script>

<script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit">
</script>




##Principis de Microserveis

Un cop acabada la transformació del maquinari i dels programaris que suporten les aplicacions, comencem a observar interès en posar al dia també les aplicacions. En la majoria de casos són plantejables la conversió d'aplicacions monòlits cap a aplicacions basades en microserveis. En aquest post, presentem els principis que han de governar el disseny i la implementació de les aplicacions basades en microserveis.

Aquest post està basat en una sèrie de ponències i material videogràfic creat per [Sam Newman](http://samnewman.io/)

### 1. Han d'estar modelats sobre el domini de negoci que volem cobrir.

El disseny basat en el domini de negoci pot ajudar a trobar límits estables i reutilitzables

### 2. Es basen en l'automatització.

Es un principi crucial. Quan hi ha més parts a control·lar, l'automatització és clau per a poder construir i desplegar l'aplicació

### 3. Ocultar els detalls de la implementació.

Un dels errors que sovint cometen els sistemes distribuïts és el d'acoplar excessivament els seus serveis entre ells.

### 4. Descentralitzar totes les coses.

Per a poder tenir autonomia, cal descentralitzar els serveis, tant organitzativament com a nivell de l'arquitectura que els forma.

### 5. Es despleguen independentment els uns dels altres.

Potser la característica més important que necessiten els microserveis

### 6. Els consumidors del microserveis són els primers.

Com a creador d'una API, fer els serveis fàcils de consumir

### 7. Aïllar les fallades.

Una arquitectura de microserveis no fa que els sistemes siguin més estables. Els altres microserveis han de poder seguir funcionant malgrat la caiguda o la lentitud d'un.

### 8. Altament observables.

Amb moltes parts mòbils, pot ser un desafiament comprendre el que està passant en el sistema

## Referències:

Sam Newman: "Principles of Microservices"
[http://samnewman.io/talks/principles-of-microservices/](http://samnewman.io/talks/principles-of-microservices/)

Sam Newman: "The Principles of Microservices. Embrace Autonomy to Optimize Performance" [http://shop.oreilly.com/product/0636920043935.do#](http://shop.oreilly.com/product/0636920043935.do#)

Sam Newman: "Building Microservices"
[http://shop.oreilly.com/product/0636920033158.do?cmp=af-code-books-video-product_cj_0636920033158_7739078](http://shop.oreilly.com/product/0636920033158.do?cmp=af-code-books-video-product_cj_0636920033158_7739078)
