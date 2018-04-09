+++
date        = "2018-03-23"
title       = "SIC. Canvi del sistema de permisos al SIC"
description = "Durant el mes d'abril, es modificarà el sistema de permisos del SIC per tal de simplificar l'operativa de l'Autoservei. L'anterior model de seguretat quedarà obsolet i s'aplicarà el model de seguretat 2018."
sections    = ["Notícies","home"]
categories  = ["sic"]
key         = "ABRIL2018"
+++

Durant el mes d'abril, es modificarà el sistema de permisos del SIC per tal de simplificar l'operativa de l'Autoservei. L'anterior model de seguretat quedarà obsolet i s'aplicarà el **model de seguretat 2018**.

## Audiència

Aquest canvi en el sistema de permisos afecta els proveïdors d'aplicacions. Us recordem que els proveïdors d'aplicacions són els únics que gestionen els permisos amb la modalitat d'autoservei. La resta d'usuaris del SIC (CPD, LDT, personal CTTI) tenen els seus permisos predefinits i només el SIC els pot modificar.

## Canvi en l'estructura de permisos

### Model de seguretat 2014

Fins ara, l'actual model de seguretat en el que es basava el SIC seguia una estructura bidimensional, en el que una dimensió era la definició d'àmbits a data de 2014 i l'altra dimensió es basava en el model de proveïdors de lot/fora lot:

<div style="width:90%;margin:5px auto;"><img style="width: 90%; height: auto" src="/images/news/SIC-model-seguretat-2014.png" alt="Model de seguretat definit el 2014" title="Model de seguretat definit el 2014"></img></div>

Amb el llançament de l'Autoservei d'Usuaris al SIC, aquest model de seguretat s'ha tornat poc pràctic:

* Els àmbits en aquest model són estàtics. Al llarg d'aquests anys han aparegut nous departaments i d'altres han canviat de nom, s'han agrupat o s'han descompost en d'altres. Avui dia, és difícil per al proveïdor d'aplicacions determinar a quin àmbit del SIC correspon un codi d'aplicació.
* D'altra banda, l'estructuració de proveïdors d'aplicacions amb lots no sempre és útil, ja que a vegades hi ha subcontractacions d'un lot a un altre o intervé més d'un proveïdor en un sol codi d'aplicació.

### Model de seguretat 2018

El nou model pretén resoldre els problemes que ocasionava l'anterior model i, a més, se simplifica l'estructura de grups de seguretat. Passem a tenir model unidimensional de grups **basat en el codi d'aplicació**.

<div style="width:90%;max-width: 800px;margin:5px auto;"><img style="width: 90%;height: auto" src="/images/news/SIC-model-seguretat-2018.png" alt="Nou model de seguretat (2018)" title="Nou model de seguretat (2018)"></img></div>

Aquest nou model ens aporta una sèrie de beneficis:

* L'increment en la finor de la granularitat ens aporta **més detall** i **més versatilitat**.
* S'elimina la dependència que tenien els grups de seguretat amb els àmbits del SIC. Futurs canvis en l'organització de la Generalitat no afectaran el model de seguretat del SIC.
* Els release managers de cada codi d'aplicació podran incloure els usuaris que considerin pertinents, siguin del seu lot o d'un altre.

### Activació del nou model

Tan bon punt com entri en vigor el nou model de seguretat, estarà disponible la nova versió de la documentació relativa al sistema de permisos del SIC:

* Els articles que ja parlaven dels sistemes de permisos del SIC 2.0:
	* [Procediment de concessió de permisos al SIC](/noticies/2017-07-18-SIC-Autoservei-usuaris-SIC2.0/)
	* [Estructura de permisos al SIC](/noticies/2017-11-10-SIC-Estructura-permisos-i-Autoservei/)
* El [Manual d'Usuari](/related/sic/2.0/manual-usuari.pdf)
* El [Manual d'Integració](/related/sic/2.0/manual-integracio.pdf)

Durant l'activació es migraran els permisos actuals dels Release Managers al nou model. Per tant, els usuaris actuals no es veuran afectats per aquest canvi d'estructura de permisos.

Si teniu cap dubte al respecte, podeu obrir una [consulta](/howtos/2018-01-howto-obrir-peticions-SIC-a-autoservei-Remedy/#consulta) a SAU Remedy.
