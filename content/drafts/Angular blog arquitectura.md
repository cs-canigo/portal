# Angular: Estat actual i evolució

AngularJS és un framework de JavaScript de codi obert, mantes per Google, utilitzat per desenvolupar aplicacions web d'una única pàgina, és a dir, single-page application (SPA) .

 (Imatge)

Des de l'alliberament el seu ús i recolzament per part de la comunitat software ha estat molt ample. Comparativament amb altres frameworks que ofereixen funcionalitat similar com ara VueJS o React l'ús d'Angular ha guanyat dràsticament.

Utilitzant Google trends podem veure la tendència i popularitat d'AngularJs sobre els seus competidors:

(Imatge)

Per què tanta popularitat? Hi ha varies raons:

- Va sortir el primer: Ja al 2010 la versió 1.0
- Mantingut per Google que ja genera confiança pel fet
- És senzill tenir-ho tot bé organitzat encara que siguin aplicatius grans
- Un dels objectius principals és la modularitat: més senzill testejar i extreure components
- Corba d'aprenentatge molt plana per començar a produir

Ara bé, si AngularJS ha estat tan exitós i tan bé adoptat per la comunitat, calia trencar-ho tot i fer la transició d'AngularJs a Angular 2 tan traumàtica?

Certament, hi va haver moltes coses millorables al procés, sobretot quan van anunciar que no hi hauria pla de migració de AngularJS 1.x a 2.0. Això va acabar de dividir i radicalitzar a la comunitat i fa encara més difícil defensar l'adopció de Angular 2.x. Què passarà quan surti una nova versió, diguem-ne Angular 4?  Serà la transició igual de dolorosa?

Abans de mirar en detall com s'ha gestionat això de cara al futur, mirem què ofereix Angular 2 respecte a AngularJS:

- El nom canvia d'AngularJS a Angular. No cal dir Angular 2, és senzillament Angular
- **Suport per plataformes mòbils:** AngularJS va ser pensat només per aplicacions responsives i de dades bidireccionals. L'arquitectura d'Angular, en canvi, està orientada a suport de plataformes mòbils des del començament. El mateix codi és generat diferent segons la plataforma final i la experiència d'usuari és molt similar a aplicacions natives.
- **Millores de rendiment:** El bootstrap, inicialització de l'aplicatiu, és fa diferent segons la plataforma reduint el temps i millorant la experiència d'usuari.
- **TypeScript** :  És un superset de JavaScript ES6 mantingut i desenvolupat per Microsoft. Afegeix tipat estàtic i objectes basats en classes. Una de les grans avantatges d'utilitzar TypeScript és el poder detectar errors abans d'executar el codi. És completament compatible amb ES6
- I molt més..: es canvia a programació basada en components, s'elimina el controvertit $scope d'AngularJS, simplificació de directives, més modular i un llarg etcètera.

Si Angular és de fet un nou framework i té poc a veure amb AngularJS és legítim qüestionar-se si val la pena fer la transició d'AngularJS a Angular o de fet triar altra framework.

Primer hem de dir que, desprès de la presentació d'Angular i de tota la incertesa que va generar, Google ha aprés i van reaccionar ràpid:

- Van oferir un pla de migració ben documentat i fins i tot van publicar llibreries per ajudar amb la transició com ara ng-upgrade
- Incorporen el concepte de SEMVER (semantic versioning). Això farà en el futur les actualitzacions menys traumàtiques. Totes les noves publicacions de Angular constaran de 3 números: MAJOR.MINOR.PATCH
  - MAJOR: Nova funcionalitat amb canvis incompatibles a l'API.
  - MINOR: Nova funcionalitat i és compatible amb versions anteriors
  - PATCH: Corregeix bugs i es manté retrocompatible

A més, l'equip d'Angular ha assegurat que en un futur una de les seves prioritats és facilitar al màxim la transició cap a noves versions.

Recentment s'ha publicat la versió 4 d'Angular i la transició de Angular 2 a 4, en contrast a la transició d'AngularJS a Angular és força senzilla i molt bé documentada.

(imatge)

Com hem mencionat, la versió actual es Angular 4, que va sortir al Març de 2017. I què va passar amb la versió 3? Angular 3 mai va ser publicada.

Al utilitzar el versionat semàntic es van trobar amb un problema amb la numeració de la llibreria router. Per ser coherents amb la nova adopció del SEMVER és va decidir de passar de la versió 2 a la 4 directament i així poder oferir un versionat coherent per totes les llibreries.

I com queda el panorama actual? On es situa Angular respecte als seus competidors?

(imatge)

Per ser justs, la cerca per AngularJS engloba a AngularJs i Angular (2). A més, altres mètriques com la quantitat d'stars per projecte a github o npm trends, la quantitat de vegades que es baixa una llibreria, dóna com a guanyador a React sobre Angular. Com és possible?

React és una llibreria ocupant-se de la part vista del MVC mentre que Angular és un framework i ofereix  una solució complerta per MVC a la part explorador així que no són totalment comparables. Una comparativa més acurada seria React + Redux contra Angular tot i que React es pot utilitzar amb altres frameworks.

A més React no ha experimentat una revolució tan traumàtica com Angular i això ha permès fidelitzar més a la seva comunitat. Tot i que Google no ha sabut fer bé la transició d'AngularJs a Angular, han certament aprés de les seves errades i la projecció és clarament al alça.

Tant React com Angular semblen a dia d'avui les opcions més estables i recolzades per la comunitat tot i que l'esperança de vida és difícil de estimar.

Estàndards emergents com WebAssembly, que permet l'execució de codi nadiu dins de màquines virtuals al browser, o web components, que permet estendre HTML i definir components reutilitzables, arriben per segmentar, encara més, un diversificat univers frontend.

(imatge)

Font original:  https://xkcd.com/927/

**Referències:**

Angular is not a massive monolith – but your mom is:

[https://gofore.com/angular-is-not-a-massive-monolith/](https://gofore.com/angular-is-not-a-massive-monolith/)

Angular 1 to Angular 2 Upgrade Strategy:

[https://docs.google.com/document/d/1xvBZoFuNq9hsgRhPPZOJC-Z48AHEbIBPlOCBTSD8m0Y/edit](https://docs.google.com/document/d/1xvBZoFuNq9hsgRhPPZOJC-Z48AHEbIBPlOCBTSD8m0Y/edit)

React vs Angular: An in-depth comparison

[https://www.sitepoint.com/react-vs-angular/](https://www.sitepoint.com/react-vs-angular/)

AngularJS to Angular quick reference

[https://angular.io/guide/ajs-quick-reference](https://angular.io/guide/ajs-quick-reference)