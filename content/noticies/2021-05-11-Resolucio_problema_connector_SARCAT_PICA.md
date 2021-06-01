+++
date        = "2021-05-11"
title       = "Canigó. Adaptació connector Sarcat PICA"
description = "S'ha adaptat el mòdul d'integració del connector Sarcat PICA arran les modificacions en els prefixos dels namespace de les respostes de la PICA"
sections    = ["Notícies", "home"]
categories  = ["canigo"]
key         = "JUNY2021"
+++

## Introducció

Dins de l'abast de la **versió 3.4.6 del Framework Canigó s'ha adaptat el mòdul d'integració del connector Sarcat PICA de Canigó per a
recuperar les respostes de la PICA independentment del prefix**. Podeu consultar l'abast complet de la versió 3.4.6 a les
[Release Notes, apartat Canigó 3.4.6](/canigo-download-related/release-notes-canigo-34).

## Motivació

El maig del 2021 es va reportar una **incidència en la recuperació de les respostes de PICA** que es fan a través del connector
de Sarcat de Canigó des de la seva versió 1.0.0. L'error es produeix perquè la PICA ha fet modificacions en els prefixos
dels namespace de les respostes i el connector intentava cercar els nodes de resposta amb un namespace prefixat.

Per exemple:
```
Node nodeResposta = SarcatXMLUtils.findNode(resposta.getDomNode(), "alta:SarcatAlAltaResponse");
SarcatAlAltaResponseDocument respostaAlta = null;
```

Quan la PICA retorna una resposta com la següent:

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

On es pot comprovar que la resposta no disposa del prefix "alta" esperat.

## Novetats

S'han modificat els mòduls de la PICA per a poder **recuperar la resposta independentment del prefix** que
retorni la PICA, centralitzant les utilitats per a parsejar i transformar d’objectes a XML a la classe:

```
cat.gencat.ctti.canigo.arch.integration.pica.utils.PICAXMLUtils
```

<br/>
Els **mòduls que han estat revisats** són els següents:

- canigo.integration.pica versió 2.3.2
- canigo.integration.sarcat.pica versió 2.3.2
- canigo.integration.tributs.pica versió 2.4.2
- canigo.integration.padro.pica versió 2.3.2
- canigo.integration.dni.pica versió 2.3.2
- canigo.integration.avisosalertes.pica versió 2.3.2

## Documentació de les versions

Teniu disponible la següent documentació:

- [Matrius de compatibilitats](/canigo-download-related/matrius-compatibilitats/)
- [Mòdul Sarcat](/canigo-documentacio-versions-3x-integracio/modul-sarcat/)