+++
date        = "2021-05-11"
title       = "Canigó. Resolució problema connector SARCAT PICA"
description = "S'han revisat i resolt els problemes detectats en el mòdul d'integració del connector SARCAT PICA"
sections    = ["Notícies", "home"]
categories  = ["canigo"]
#key         = "JUNY2021"
+++

## Introducció

Dins de l'abast de la **versió 3.4.6 del Framework Canigó s'ha resolt el problema del connector SARCAT PICA del mòdul d'integració de Canigó**. Podeu consultar l'abast complet de la versió 3.4.5 a les
[Release Notes, apartat Canigó 3.4.6](/canigo-download-related/release-notes-canigo-34).

El maig del 2021 es va reportar un problema en la recuperació de les respostes de PICA que es fan a través del connector de SARCAT de Canigó en la seva versió 1.0.1. L'error es produeix perquè PICA ha modificat els prefixes dels namespace de les respostes i el connector intenta cercar els nodes de resposta amb un namespace prefixat

## Novetats

El mòdul d'integració amb Sarcat, a partir de la versió 1.0.0 fa servir un mètode per parsejar les respostes a les crides al servei. Aquest mètode intenta recuperar la resposta amb un prefix. Actualment, la PICA respon amb un prefix diferent i per tant es produeix un problema de parseig.

```
		Node nodeResposta = SarcatXMLUtils.findNode(resposta.getDomNode(), "alta:SarcatAlAltaResponse");
		SarcatAlAltaResponseDocument respostaAlta = null;
```

Quan la PICA respon per exemple:

```
<ns2:SarcatAlAltaResponse xmlns:ns2="http://gencat.net/scsp/esquemes/peticion/alta">

<ns2:error>

<ns3:codi xmlns:ns3="http://gencat.net/scsp/esquemes/peticion/common">0</ns3:codi>

<ns3:descripcio xmlns:ns3="http://gencat.net/scsp/esquemes/peticion/common"/>

<ns3:descripcioExtesa xmlns:ns3="http://gencat.net/scsp/esquemes/peticion/common"/>

</ns2:error>

<ns2:assentamentRetorn anyPK="2021" codiURPK="0278" dataAlta="28/04/2021 10:35:22" numPK="183">

<ns2:errorAssentament>

<ns3:codi xmlns:ns3="http://gencat.net/scsp/esquemes/peticion/common">0</ns3:codi>

<ns3:descripcio xmlns:ns3="http://gencat.net/scsp/esquemes/peticion/common"/>

<ns3:descripcioExtesa xmlns:ns3="http://gencat.net/scsp/esquemes/peticion/common"/>

</ns2:errorAssentament>

</ns2:assentamentRetorn>

</ns2:SarcatAlAltaResponse>
```

S'han modificat els mòduls de la PICA per a poder recuperar la resposta independentment del prefix que retorni la PICA, centralitzant la classe d'utilitats per parsejar i transformar de objectes a xml a:

```
cat.gencat.ctti.canigo.arch.integration.pica.utils.PICAXMLUtils
```

Els mòduls modificats són:

- canigo.integration.pica versió 2.3.2
- canigo.integration.sarcat.pica versió 2.3.2
- canigo.integration.tributs.pica versió 2.4.2
- canigo.integration.padro.pica versió 2.3.2
- canigo.integration.dni.pica versió 2.3.2
- canigo.integration.avisosalertes.pica versió 2.3.2

## Documentació de les versions

Podeu consultar el detall de la versió de cada mòdul a la [Matriu de Compatibilitats](/canigo-download-related/matrius-compatibilitats/)
al Portal de Frameworks i Solucions d’Arquitectura.

Per a més informació sobre la documentació del connector d'integracions de SARCAT PICA de Canigó podeu consultar el [mòdul SARCAT](/canigo-documentacio-versions-3x-integracio/modul-sarcat/)