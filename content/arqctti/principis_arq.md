+++
date        = "2018-11-15"
title       = "Principis d'arquitectura de sistemes d'informació"
description = "Normas i directrius generals destinades a informar i recolzar la forma en què CTTI vol que s'implementin els Sistemes d'Informació."
blog_tags	= ["directrius"]
sections    = ["principis"]
aliases = [
    "/principis",
    "/principis/",
    "/bloc/principis",
    "/bloc/2015/11/principis",
    "/blog/principis",
    "/blog/2015/11/principis",
    "/arquitectura/principis",
    "/arquitectura/2015/11/principis"
]
imatge 		= "/images/bloc/principis.png"
#teletext_id	= "principis"
langs = ["ca","es"]
weight 		  = 1
+++

## Introducció


Els principis d'arquitectura CTTI són les normas i directrius generals destinades a ser perdurables i rarament modificables i  tenen com a objectiu informar i recolzar la forma en què CTTI vol que s'implementin els Sistemes d'Informació.

Els principis, basats en el framework TOGAF, s’estructuren jeràrquicament en diferents segments i s’amplien amb una sèrie d’estratègies i pràctiques que marquen el rumb. Entre elles, destaquen el moviment DEVOPS, els principis sobre Microserveis i l'aposta per solucions de programari lliure.

<p>A continuació detallem quins són aquests principis.</p>



## 1. Principis sobre el disseny d’aplicacions

<p><strong>1.1 Segregació de funcions/responsabilitats</strong>. Les aplicacions han d’estar estructuralment dividides en blocs independents per funcionalitats, processos de negoci o serveis, per tal d’evitar els monòlits.</p><p>Aquest principi és d’aplicació a totes les capes. Una aplicació tipus pot dividir-se fàcilment, per exemple, en els següents mòduls:</p>

<ul>
    <li>Públic general (internet)</li>
    <li>Col·laboradors externs (extranet)</li>
    <li>BackOffice (intranet)</li>
    <li>Processos batch</li>
    <li>Extraccions (ETL)</li>
</ul>

<p><strong>1.2 Des del moment del disseny l'Arquitectura ha de ser desacoblada</strong> per permetre als components i aplicacions mantenir-se completament autònoms i independents:</p>

<ul>
    <li>1.2.1 Components autònoms (separació de la frontend/presentació i el backend/negoci), es desenvolupen i es despleguen independentment.</li>
    <li>1.2.2 Components independents, poden ser reemplaçats o actualitzats sense afectar a la resta de components.</li>
	<li>1.2.3 Desacoblament entre aplicacions. Cal evitar les relacions entre aplicacions que impedeixin el seu desacoblament. Per exemple, relacions en l'àmbit de base de dades, ús de llibreries compartides, fitxers de configuració compartits, etc. </li>
</ul>

<p><strong>1.3 Arquitectura orientada a serveis</strong>. Cada cop més, les aplicacions poden ser consumides externament (exposant la seva funcionalitat) o bé han d’integrar-se amb aplicacions de tercers. Les relacions s'han de dur a terme mitjançant serveis.
</p>
<p><strong>1.4 Model de qualitat</strong>, a l’hora de dissenyar un sistema cal incorporar aspectes qualitatius al cicle de vida, per més informació visitar el <a href="https://qualitat.solucions.gencat.cat/">Portal de Qualitat.</a> </p>

<p> <strong>1.5 Integració contínua i custòdia de codi</strong>
<ul>
	<li> 1.5.1 Totes les aplicacions han de tenir custodiat el codi font a algun dels repositoris oficials de la Generalitat.</li>
	<li> 1.5.2 Totes les aplicacions han d'estar preparades per ser desplegades de forma automàtica utilitzant les eines proporcionades pel <a href="https://canigo.ctti.gencat.cat/sic-documentacio/">Sistema d'Integració Continua.</a></li>
	<li> 1.5.3 Els components a desplegar han de ser els mateixos per tots els entorns. Per tant, el que s'hagi desplegat a Integració o Preproducció s'ha de poder desplegar a Producció sense necessitat de fer-hi canvis.</li>	
</ul>	
</p>
<p> <strong>1.6 <a href="http://ctti.gencat.cat/ca/ctti/solucions-corporatives/">Solucions transversals</a></strong>. Es prioritzarà la utilització de solucions transversals en lloc de fer solucions a mida. S'ha d'evitar desenvolupar les funcionalitats que ja estan disponibles. A continuació es detallen algunes de les solucions transversals més esteses.</strong>
<ul>
	<li> <strong>1.6.1 Ús del framework Canigo</strong>. Per aplicacions JEE s'ha de fer ús del <a href="https://canigo.ctti.gencat.cat/canigo/framework/">Framework Canigó.</a></li>
	<li><strong>1.6.2 Servidors SMTP transversals</strong>, utilitzar els servidors SMTP transversals (IronPort) com servidor SMTP per enviar correus des de les aplicacions.
			<a href="https://portic.ctti.gencat.cat/solucions/soltecnologiques/_layouts/15/WopiFrame.aspx?sourcedoc=%2Fsolucions%2Fsoltecnologiques%2FDocuments%2FLloc%20de%20Treball%2F10%2D02%2FCTTI%5F9%2E61%5FIntegraci%C3%B3%5FSMTP%5FIronPort%2Epdf&action=view">Manual per a la integració SMTP</a></li>
	<li><strong>1.6.3 Accés a internet des de xCAT</strong>, per accedir a recursos internet des de servidors ubicats a la xarxa XCAT, és necessari utilitzar el ProxyPass, mai accedir directament a internet.</li>
	<li><strong>1.6.4 Gestió d'identitats</strong>, les aplicacions han d’autentificar els usuaris tenint en compte els següents models: </li>
	<ul>
		<li>1.6.4.1 Col·lectiu Gencat: autentificació mitjançant <a href="http://ctti.gencat.cat/ca/ctti/solucions-corporatives/gestio-didentitats/">“GICAR”</a>.</li>
		<li>1.6.4.2 Col·lectiu Híbrid (Gencat/Empreses): autentificació mitjançant <a href="http://ctti.gencat.cat/ca/ctti/solucions-corporatives/gestio-didentitats/">“GICAR”</a>.</li>
		<li>1.6.4.3 Ciutadans: autentificació mitjançant <a href="https://www.aoc.cat/serveis-aoc/valid/">“VÀlid”</a> d'AOC.</li>
	</ul>
	<li><strong>1.6.5 Sistema de gestió del document electrònic </strong>(<a href="http://ctti.gencat.cat/ca/ctti/solucions-corporatives/solucions-de-suport/sistema-de-gestio-del-document-electronic-sgde/">SGDE</a>), proporciona als Sistemes d’Informació, les principals funcions necessàries per al tractament i transformació del document electrònic, per tal de donar suport a l’intercanvi fiable i segur de documents i informació entre els ciutadans i la Generalitat de Catalunya.</li>	
	<li><strong>1.6.6 Gestor de continguts web </strong>(<a href="http://ctti.gencat.cat/ca/ctti/solucions-corporatives/comunicacio-i-relacio/webs/geco/">GECO+</a>), permet crear i mantenir continguts i portals d'internet mitjançant un conjunt de peces i serveis comuns (framework).</li>	
<li><strong>1.6.7 PICA - Plataforma d'interoperabilitat</strong>(<a href="http://ctti.gencat.cat/ca/ctti/solucions-corporatives/administracio-electronica/serveis-dintegracio-i-interoperabilitat/">PICA</a>). Plataforma que permet l'accés a informació dels organismes de la Generalitat i altres administracions públiques i institucions, el consum de serveis comuns de tramitació, la integració entre els Sistemes d'Informació departamentals i la plataforma de tramitació corporativa. Tot sota criteris d'estandardització, rapidesa, senzillesa, seguretat i legalitat.</li>

<li><strong>1.6.8 Tramitador d'ajuts i subvencions - </strong>(<a href="http://ctti.gencat.cat/ca/ctti/solucions-corporatives/tramitacio-i-gestio-de-serveis/tais/">TAIS</a>). Sistema d'informació per a la gestió electrònica d'expedients de gestió de subvencions.</li>
</ul>
<p></p>

## 2. Principis sobre la Tecnologia

<p><strong>2.1 Continuïtat tecnològica</strong>. D’acord a les necessitats i amb l’objectiu de millorar el manteniment i evolució de les aplicacions es promou:

<ul>
	<li> 2.1.1 Per a la creació d’aplicacions orientades a serveis, els serveis (backend) exposaran el seu negoci mitjançant REST i en format JSON (REST permet ser consumit per qualsevol tecnologia que interpreti Http).</li>
	<li> 2.1.2 En el cas d’aplicacions web, la presentació estarà construïda amb tecnologies estàtiques  (html5/javascript/css) i consumirà els serveis que li proporcioni el backend. </li>
</ul>

<p><strong>2.2 Estabilitat de les versions de programari</strong>. Les versions de les diferents peces (productes, llibreries...) que composen un sistema han de ser el més estables possible. S'ha de fer ús de versions LTS (Long-Term Support) o bé, o en la seva mancança, la GA (General Availability) o la nomenclatura que hagi donat el fabricant com a estable. Un sistema productiu no pot incorporar versions no consolidades (snapshot, alpha, beta, release candidate, milestone...) dels components que en formin part.</p>

<p><strong>2.3 Interoperabilitat</strong>. El programari i el maquinari han d’ajustar-se a estàndards definits que promouen la interoperabilitat de dades, aplicacions i tecnologia.</p>

<p><strong>2.4 <a href="https://qualitat.solucions.gencat.cat/estandards/"> Els estàndards de qualitat</a></strong> definits pel CTTI són aplicables al desenvolupament, manteniment i ús de les solucions TI de la Generalitat de Catalunya. A continuació es llisten els relacionats amb els principis d'arquitectura
<ul>
<li><strong>2.4.1 Full de ruta</strong>. Davant solucions estàndard s’utilitzaran preferentment els components que es troben al <a href="https://qualitat.solucions.gencat.cat/estandards/estandard-full-ruta-programari/">Full de Ruta</a> en la versió "versió actual CTTI". Aquest fet no exclou que per a noves solucions es puguin proposar altres tecnologies que, eventualment, podran passar a formar-ne part. La reutilització d'infraestructura ja existent no eximeix del requeriment d'actualitzar el programari en cas que aquest ja no estigui suportat pel fabricant.</li>
<li><strong>2.4.2 Principis de la guia Web Gencat</strong>, són d'aplicació els principis detallats a la <a href="http://guiaweb.gencat.cat/ca/inici/"> Guia Web Gencat per aplicacions orientades a la ciutadania.</a></li>
<li><strong>2.4.3 Nomenclatura de dominis</strong>, respectar les nomenclatures de noms de dominis del document <a href="https://qualitat.solucions.gencat.cat/estandards/estandard-dominis-dns/">Estàndards Dominis DNS.</a></li> 
<li><strong>2.4.4 Nomenclatura de les infraestructures</strong>, s'ha de complir l'estàndard pel que fa al nom de les infraestructures detallat al document <a href="https://qualitat.solucions.gencat.cat/estandards/estandard-nomenclatura-infraestructures/">Estàndard nomenclatura infraestructures</a></li>
</ul>
</p>

<p><strong>2.5 Ús de Cloud Públic</strong>. Cal valorar l'ús d'entorns de Cloud Públic. Recomanat per aplicacions amb les característiques detallades a continuació:
<ul>
	<li> Aplicacions que no siguin crítiques pel negoci.</li>
	<li> Utilitzades des d'internet. </li>
	<li> Sense requeriments de seguretat alts. </li>
	<li> Si requereix integració amb altres serveis de Generalitat de Catalunya, aquesta ha de ser lleugera. </li>
</ul>
</p>

<p><strong>2.6 Ús d'Https</strong>. Les urls de les aplicacions i els serveis publicats tant a internet com a xCAT (xarxa intranet de la Generalitat) es faran mitjançant l'ús de protocols segurs (https).</p>	

<p><strong>2.7 Mateixa arquitectura per Preproducció i Producció</strong>. Perquè les proves fetes a preproducció tinguin validesa, és necessari que els entorns de preproducció i producció siguin idèntics pel que fa al disseny, encara que els recursos assignats a preproducció siguin inferiors.</p>


## 3. Principis sobre el cost i manteniment de les solucions

<p><strong>3.1 Optimització de costos</strong>, pensar en els costos i en la seva optimització:</p>
<ul>
    <li>3.1.1 Monitoritzar els serveis per a identificar necessitats d’ampliació o reducció de recursos i poder ajustar els costos en conseqüència.</li>
    <li>3.1.2 Dissenyar l’arquitectura amb una planificació de les càrregues de treball òptima en costos, de forma que s’equilibrin quan sigui possible les finestres d’execució dels components (online, extraccions, analítica, processos batch ...), per evitar els pics de càrrega i que es reparteixi de forma balancejada segons les necessitats del negoci.</li>
    <li>3.1.3 Arquitectura mínima. Cal tenir en compte l’escalabilitat i fer una previsió (mínim 1 any) amb l’objectiu d’aconseguir una arquitectura sostenible en el temps.</li>
</ul>

<p><strong>3.2 Benefici màxim al menor cost i risc possible</strong>. Cal tenir presents els costos d’infraestructura i el model de llicenciament requerits per a posar en marxa una solució, ja que representen un cost recurrent. A l'hora de concebre una solució s’ha d’identificar quin tipus de llicenciament serà el millor per la solució desitjada. Quan s’escull un producte (opensource o comercial) o es tria fer un desenvolupament a mida, cal fer una avaluació del cost vs. benefici de l’opció triada respecte a les altres: </p>
<ul>
    <li>3.2.1 Per a problemes comuns, utilitzar “Opensource”. </li>
    <li>3.2.2 Per a problemes poc comuns, comprar. </li>
    <li>3.2.3 Per a problemes únics, desenvolupar a mida.</li>
</ul>

<p><strong>3.3 Impacte d’actualització</strong>, pensar en l’impacte d’actualització que pugui tenir un canvi de sistema operatiu, middleware o producte allà on s'executa l’aplicació: com menys acoblament amb el sistema de base i més utilització d’estàndards existeix, més senzilla serà l’actualització o l’ampliació de funcionalitats de l’aplicació.</p>
