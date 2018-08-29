+++
date        = "2018-08-29"
title       = "Principis d'Arquitectura de Sistemes d'Informació v2"
description = "Principis d'Arquitectura de Sistemes d'Informació v2"
weight		= 3
type = "estandard"
toc         = true
versio      = "1.0"
responsable = "Unitat d'arquitectura"
estandards =  ["programari"]
codi = "35.080.03"

+++
## Introducció


Els Principis d'Arquitectura CTTI són les normes i directrius generals destinades a ser perdurables i rarament modificables i  tenen com a objectiu informar i recolzar la forma en què CTTI vol que s'implementin els Sistemes d'Informació.

Els principis basats en el framework TOGAF s’estructuren jeràrquicament en diferents segments i s’amplien amb una sèrie d’estratègies i pràctiques que marquen el rumb, entre elles destaquen el moviment DEVOPS, els principis sobre Microserveis i l'aposta per solucions Opensource.

<p>A continuació detallem quins són aquests principis.</p>



## 1. Principis sobre el disseny d’aplicacions

<p><strong>1.1 Segregació de funcions/responsabilitats</strong>, les aplicacions han d’estar estructuralment dividides en blocs independents per funcionalitats, processos de negoci o serveis, per tal d’evitar els monòlits.</p><p>Aquest principi és d’aplicació a totes les capes. Una aplicació tipus pot dividir-se fàcilment, per exemple, en els següents mòduls:</p>

<ul>
    <li>Públic general (internet)</li>
    <li>Col·laboradors externs (extranet)</li>
    <li>BackOffice (intranet)</li>
    <li>Processos batch</li>
    <li>Extraccions (ETL)</li>
</ul>

<p><strong>1.2 Arquitectura desacoblada</strong>, permeten als components mantenir-se completament autònoms i independents:</p>

<ul>
    <li>1.2.1 Components autònoms (separació de la frontend/presentació i el backend/negoci), es desenvolupen i es despleguen independentment.</li>
    <li>1.2.2 Components independents, poden ser reemplaçats o actualitzats sense afectar a la resta de components.</li>
	<li>1.2.3 Desacoblament entre aplicacions: Evitar les relacions entre aplicacions que impedeixin el seu desacoblament.(Per exemple, relacions pel que fa a base de dades, us de llibreries compartides, fitxers de configuració compartits). Totes les relacions s'han de dur a terme mitjançant serveis.</li>
</ul>

<p><strong>1.3 Arquitectura Orientada a Serveis</strong>, cada cop més, les aplicacions poden ser consumides externament o bé han d’integrar-se amb 3rs. Els backend han d’exposar la seva funcionalitat de negoci via serveis per facilitar-ho. 

<p><strong>1.4 Compatibilitat de versions</strong>, tenir present sempre la compatibilitat cap enrere dels components, com per exemple: </p>

<ul>
    <li> Si s’exposa una API REST i s’actualitza un servei, que sigui compatible amb versions anteriors per a evitar actualitzacions innecessàries als consumidors i d’aquesta manera poder evolucionar el servei lliurement (sense dependre de calendaris o recursos de tercers).</li>
</ul>

<p><strong>1.5 Rendiment de les aplicacions</strong>, el comportament de les  aplicacions han de satisfer les necessitats del negoci:</p>

<ul>
    <li>1.5.1 Concurrència, els sistemes permetran que els processos s’executin simultàniament i que puguin interactuar entre ells.</li>
    <li>1.5.2 Disponibilitat, el sistema tindrà la capacitat de desenvolupar les funcions per les quals va estar dissenyat en les condicions d’ús determinades.</li>
    <li>1.5.3 Elasticitat, el disseny de les aplicacions permetrà ampliar o reduir la infraestructura per poder donar el servei desitjat sense posar en perill els requeriments d'estabilitat, rendiment, seguretat, governabilitat o de compliment normatiu i legal.</li>
    <li>1.5.4 Zero DownTime, els serveis no poden ser interromputs, s’han d’utilitzar els mecanismes necessaris per evitar situacions de parada de negoci.</li>
</ul>

<p><strong>1.6 Facilitat d’utilització</strong>, les aplicacions seran fàcils d'usar. La tecnologia subjacent ha de ser transparent per als usuaris.</p>

<p><strong>1.7 Model de qualitat</strong>, a l’hora de dissenyar un sistema cal incorporar aspectes qualitatius al cicle de vida, per més informació visitar el <a href="https://qualitat.solucions.gencat.cat/">Portal de Qualitat.</a> </p>
<ul>
    <li>1.7.1 Proves per a verificar la qualitat o requisits no funcionals del sistema.</li>
    <li>1.7.2 Documentació detallada del projecte (descripció d’arquitectura, document funcional, manual de desplegament, manual d’explotació, …).</li>
    <li>1.7.3 Control de versions. El sistema, en el seu conjunt, ha de ser tractat com un producte amb les seves versions majors, menors, etc.</li>
    <li>1.7.4 Proves automàtiques, execució de proves automàtiques que verifiquin la instal·lació i integració contínua.</li>
</ul>

<p> <strong>1.8 Integració continua i custòdia de codi</strong>
<ul>
	<li> 1.8.1 Totes les aplicacions han de tenir custodiat el codi font a algun dels repositoris oficials de la Generalitat.</li>
	<li> 1.8.2 Totes les noves aplicacions han d'estar preparades per ser desplegades de forma automàtica utilitzant les eines proporcionades pel <a href="https://canigo.ctti.gencat.cat/sic-documentacio/">SIC 2.0.</a></li>
	<li> 1.8.3 Els components a desplegar han de ser els mateixos per tots els entorns, per tant el que s'hagi desplegat a Integració o preproducció és té que pogué desplegar a producció sense necessitat de fer canvis.</li>	
</ul>	

<p> <strong>1.9 Solucions Transversals</strong>, es prioritzarà la utilització de solucions transversals en comptes de fer-ne solucions a mida. A continuació es detallen les solucions transversals mes exteses.</strong>
<ul>
	<li> <strong>1.9.1 Us del Framework Canigo</strong>, per aplicacions J2EE es te que fer ús del <a href="https://canigo.ctti.gencat.cat/canigo/framework/">Framework Canigó.</a></li>
	<li><strong>1.9.3 Servidors SMTP Transversals</strong>, utilitzar els servidors Smtp transversals (IronPort) com servidor SMTP per enviar correus des de les aplicacions.
			<a href="https://portic.ctti.gencat.cat/solucions/soltecnologiques/_layouts/15/WopiFrame.aspx?sourcedoc=%2Fsolucions%2Fsoltecnologiques%2FDocuments%2FLloc%20de%20Treball%2F10%2D02%2FCTTI%5F9%2E61%5FIntegraci%C3%B3%5FSMTP%5FIronPort%2Epdf&action=view">Manual per a la Integració SMTP</a></li>
	<li><strong>1.9.4 Accés a internet des de xCAT</strong>, per accedir a recursos Internet des de servidors ubicats a la xarxa XCAT, es necessari utilitzar el ProxyPass, mai accedir directament a Internet.</li>
	<li><strong>1.9.5 Autentificació</strong>, les aplicacions han d’autentificar els usuaris tenint en compte els següents models: </li>
	<ul>
		<li>1.9.5.1 Col·lectiu Gencat: autentificació mitjançant “GICAR”.</li>
		<li>1.9.5.2 Col·lectiu Híbrid (Gencat/Empreses): autentificació mitjançant “GICAR”.</li>
		<li>1.9.5.3 Ciutadans: autentificació mitjançant “VÀlid” de AOC.</li>
	</ul>
</ul>
<p></p>

## 2. Principis sobre la Tecnologia

<p><strong>2.1 Continuïtat tecnològica</strong>, d’acord a les necessitats i amb l’objectiu de millorar el manteniment i evolució de les aplicacions es promou:

<ul>
	<li> 2.1.1 La creació d’aplicacions orientades a serveis; els serveis (backend) exposaran el seu negoci mitjançant REST i en format JSON (REST permet ser consumit per qualsevol tecnologia que interpreti Http).</li>
	<li> 2.1.2 En el cas d’aplicacions web, la presentació estarà construïda amb tecnologies estàtiques  (html5/javascript/css) i consumirà els serveis que li proporcioni el backend. </li>
</ul>

<p><strong>2.2 Estabilitat del sistema</strong>, les versions de les diferents peces (productes, llibreries...) que componen un sistema han de ser el més estable possible, d’aquí que es recomani l’ús de versions LTS (Long-Term Support) o, si de cas hi manca, GA (General Availability) o la nomenclatura que hagi donat el fabricant. Versions productives d’un sistema mai haurien d’incorporar versions no consolidades (snapshot, alpha, beta, release candidate, milestone...) dels components que en formen part.</p>

<p><strong>2.3 Interoperabilitat</strong>, el programari i el maquinari han d’ajustar-se a estàndards definits que promouen la interoperabilitat de dades, aplicacions i tecnologia.</p>

<p><strong>2.4 <a href="https://qualitat.solucions.gencat.cat/estandards/"> Estàndars de qualitat</a></strong>, aplicables al desenvolupament, manteniment i ús de les solucions TI de la Generalitat de Catalunya, es detallen a continuacio els relacionats amb els principis d'arquitectura
<ul>
<li><strong>2.4.1 Full de Ruta</strong>, davant solucions estàndards s’utilitzaran preferentment els components llestos per adoptar que es troben al <a href="https://qualitat.solucions.gencat.cat/estandards/estandard-full-ruta-programari/">Full de Ruta</a> com a suportats CTTI. Aquest fet no exclou que per a noves solucions es puguin proposar altres tecnologies, que eventualment passaran a formar-ne part. La reutilització d'infraestructura ja existent no eximeix del requeriment d'actualitzar el programari en cas que aquest ja no estigui suportat pel fabricant.</li>

<li><strong>2.4.2 Principis de la Guia Web Gencat</strong>, son d'aplicació els principis detallats a la <a href="http://guiaweb.gencat.cat/ca/inici/"> Guia Web Gencat.</a></li>

<li><strong>2.4.3 Nomenclatura de dominis</strong>, respectar les nomenclatures de noms de dominis del document <a href="https://qualitat.solucions.gencat.cat/estandards/estandard-dominis-dns/">Estandards Dominis DNS.</a></li> 
<li><strong>2.4.4 Nomenclatura de les infraestructures</strong>, s'ha de complir l'estàndard pel que fa al nom de les infraestructures detallat al document <a href="https://qualitat.solucions.gencat.cat/estandards/estandard-nomenclatura-infraestructures/">Estandard Nomenclatura Infraestructures</a></li>
<li><strong>2.4.5 Estàndars sobre la seguretat</strong>, es tenen que tenir en compte els principis de seguretat publicats per CESICAT, per mes informació visitar el <a href="https://portal.cesicat.cat/index.php">Portal de CESICAT. </a></li>
</ul>

<p><strong>2.5 Us de Cloud Públic</strong>, valorar l'ús d'entorns Cloud públics, recomanat per aplicacions de les característiques detallades a continuació:
<ul>
	<li> D'us des de Internet. </li>
	<li> Aplicacions sense requeriments de seguretat alts. </li>
	<li> Sense integració amb altres serveis de Gencat. </li>
	<li> Aplicacions que no siguin critiques pel negoci.</li>
</ul>
<p><strong>2.6 Us d'Https</strong>, es necessari l’ús d'Https per les urls de les aplicacions i els serveis publicats tant a Internet com a xCAT.
<p><strong>2.7 Mateixa infraestructura per Preproduccio i Produccio</strong>,per què les proves fetes a preproduccio tinguin validesa, és necessari que els entorns de preproduccio i produccio siguin idèntics pel que fa al diseny, encara que els recursos assignats a preproduccio siguin inferiors.</p>


## 3. Principis sobre el cost i manteniment de les solucions

<p><strong>3.1 Optimització de costos</strong>, pensar en els costos i en la seva optimització:</p>
<ul>
    <li>3.1.1 onitoritzar els serveis per a identificar necessitats d’ampliació o reducció de recursos i poder ajustar els costos en conseqüència.</li>
    <li>3.1.2 Arquitectura/dissenyar les càrregues de treball amb els costos en ment.</li>
    <li>3.1.3 Arquitectura Mínima, tenir en compte l’escalabilitat i fer una previsió (mínim 1 any) amb l’objectiu d’aconseguir una arquitectura sostenible en el temps.</li>
</ul>

<p><strong>3.2 Benefici màxim al menor cost i risc possible</strong>, cal tenir presents els costos d’infraestructura i el model de llicenciament requerits per a posar en marxa una solució ja que representen un cost recurrent. Alhora de concebre una solució s’ha d’identificar quin tipus de llicenciament serà el millor per la solució desitjada. Quan s’escull un producte (opensource o comercial) o es tria fer un desenvolupament a mida, cal fer una avaluació del cost vs. benefici de l’opció triada respecte a les altres: </p>
<ul>
    <li>3.2.1 Per a problemes comuns, utilitza “Opensource”. </li>
    <li>3.2.2 Per a problemes poc comuns, compra. </li>
    <li>3.2.3 Per a problemes únics, construeix.</li>
</ul>

<p><strong>3.3 Impacte d’actualització</strong>, pensar en l’impacte d’actualització que pugui tenir un canvi de sistema operatiu, middleware o producte allà on corre l’aplicació: com menys acoblament amb el sistema de base i més utilització d’estàndards existeix, més senzilla serà l’actualització o l’ampliació de funcionalitats de l’aplicació.</p>
