+++
date = "2022-04-11"
title = "Canigó. Vulnerabilitat Spring4Shell"
description = "Com resoldre la vulnerabilitat que afecta al Framework Spring coneguda com SpringShell/Spring4Shell"
#section = "howtos"
#categories  = ["canigo"]
#key = "MAIG2022"
+++

**Spring Framework és un marc d'aplicació de codi obert per a la plataforma Java** les característiques de la qual poden
ser utilitzades per qualsevol aplicació. En aquest sentit, **el passat 29 de març es va publicar una nova vulnerabilitat
d'execució remota de codi que afecta a Spring Core**, un framework que permet el desenvolupament d'aplicacions web amb
Java i, l'explotació de les quals permetria a atacants executar remotament codi arbitrari en els sistemes de la víctima
per mitjà d'una petició no autenticada d'HTTP.

Aquesta vulnerabilitat és coneguda sota el nom de Spring4Shell o SpringShell i afecta a spring-core que, segons els investigadors
de Praetorian, es tracta d'un bypass per a una CVE més antiga [CVE-2010-1622](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2010-1622)
que, a causa d'una característica de JDK9, pot haver estat restablerta.

<br/>
Les vulnerabilitats detectades són les següents:

- Spring4Shell [CVE-2022-22965](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2022-22965): es tracta d'una vulnerabilitat
crítica que permet l'execució remota de codi arbitrari en els sistemes de la víctima per mitjà d'una petició no autenticada d'HTTP.

- [CVE-2022-22963](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2022-22963): es tracta d'una vulnerabilitat de gravetat mitjana
a Spring Cloud Function que pot ser explotada per accedir als recursos locals.

- [CVE-2022-22950](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2022-22950): es tracta d'una vulnerabilitat de DoS de
gravetat mitjana que afecta a Spring Framework.

S'ha publicat la **versió 5.3.18 d'`org.springframework`, la versió 2.5.12 d'`org.springframework.boot` i la versió 5.6.2 d'`spring.security`
per a mitigar aquestes vulnerabilitats**.

Per més informació podeu consultar [Spring Framework RCE](https://spring.io/blog/2022/03/31/spring-framework-rce-early-announcement).

<br/>
Des de l'Agència de Ciberseguretat de la Generalitat s'han considerat aquestes vulnerabilitats com a crítiques i d'un potencial
gran impacte, recomanant als usuaris i administradors de sistemes que prenguin mesures de forma urgent.

<br/>
Altra informació de referència:

* <https://nvd.nist.gov/vuln/detail/CVE-2022-22965/> \
* <https://nvd.nist.gov/vuln/detail/CVE-2022-22963/> \
* <https://nvd.nist.gov/vuln/detail/CVE-2022-22950/> \
* <https://www.cyberkendra.com/2022/03/springshell-rce-0-day-vulnerability.html/> \
* <https://tanzu.vmware.com/security/cve-2022-22965/> \

## Com solucionar la vulnerabilitat a les aplicacions Canigó 3.6

El Framework Canigó 3.6 es troba afectat de forma transversal, per la qual cosa s'han alliberat noves versions:

* Versió 3.6.4 de Canigó per a resoldre aquesta vulnerabilitat als mòduls de Canigó.
Podeu consultar: [Publicació nova versió 3.6.4](/noticies/2022-04-11-CAN-actualitzacio-canigo-3_6_4).

* Versió 1.7.4 de l'archetype de Canigó i la versió 1.8.4 del plugin del eclipse per a generar projectes amb Canigó 3.6.4.
Podeu consultar: [Actualització archetype 1.7.4 i plugin Eclipse 1.8.4](/noticies/2022-04-11-CAN-Actualitzacio_archetype_1_7_4_plugin_eclipse_1_8_4/).

Des de CS Canigó es recomana actualitzar a aquestes noves versions. Per a fer-ho, serà necessari revisar les dependències de l'aplicació
per a utilitzar els mòduls de la versió 3.6.4. Podeu consultar la [Matriu de Compatibilitats 3.6](/canigo-download-related/matrius-compatibilitats/canigo-36/).

<br/><br/>
Per qualsevol dubte relatiu a aquesta nova versió del Framework Canigó us podeu posar en contacte amb el CS Canigó
al [servei CAN](https://cstd.ctti.gencat.cat/jiracstd/projects/CAN) del JIRA CSTD o enviant-nos un correu electrònic
a la [bústia del CS Canigó](mailto:oficina-tecnica.canigo.ctti@gencat.cat).