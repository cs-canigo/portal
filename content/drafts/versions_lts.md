+++
date        = "2017-05-05"
title       = "Nou principi d'arquitectura: Utilització preferent de versions LTS de programari"
description = "Les versions LTS (de Long Term Support) de productes opensource són les d'elecció preferent per Arquitectura CTTI"
sections    = ["Blog", "drafts"]
blog_tags   = ["patrons de disseny", "LTS", "principis d'arquitectura"]
categories  = ["principis"]
imatge      = "/images/bloc/lts.png"
key         = "JUNY2017"
+++

### Nou Principi d'Arquitectura: fer servir versions LTS sempre que el programari escollit les ofereixi

Les versions LTS ofereixen a la Generalitat una opció ideal per a mantenir el versionat dels components del programari al dia amb una eficiència en cost. També s'adapta millor al cicle de vida habitual de les nostres aplicacions, més llarg que en altres sectors. És per aquest motiu que s'ha decidit introduïr les versions LTS dins els aspectes qualitatius del cicle de vida de les aplicacions, en concret al control de versions:


	*Control de versions*. El sistema, en el seu conjunt, ha de ser tractat com un producte amb les seves versions majors, menors, 	etc. Es recomana alliberar versions LTS (Long-Term Support) per tal de potenciar l'estabilitat dels sistemes de llarg recorregut. Les versions de les diferents peces (altres productes, llibreries, etc) que componen el sistema han de ser el més estable possible, d'aquí que es recomani també l'ús de versions LTS o, si de cas hi manca, GA (General Availability) o la  nomenclatura que hagi donat el fabricant. Versions productives d'un sistema mai haurien d'incorporar versions no consolidades (alpha, beta, release candidate, milestone, etc) dels components que en formen part.

### Què són les versions de Suport a Llarg Termini 

El Suport a Llarg Termini (o LTS, Long-Term Support, en anglès) es un tipus especial de versions o edicions de programari que estan designades per a ser suportades per un període més llarg que el normal. És un concepte que ha aparegut majoritàriament en programari opensource.

Es tracta d'una política de gestió del cicle de vida del programari, que aplica criteris d'estabilitat de les versions en un termini més llarg de l'acostumat, alterant la freqüència de les noves versions per rebaixar el risc, la despesa i la disruptivitat que provoquen.

Al principi d'un període de suport a llarg termini, els desenvolupadors del programari imposen una congelació de les característiques: corregeixen errors i vulnerabilitats, però no introdueixen noves característiques que poden causar problemes de regressió.

### La necessitat d'un suport a llarg termini

El cicle de vida tradicional en molts projectes opensource es desplegar noves versions sovint, o planificar els desplegaments en períodes curts i regulars. En qualsevol cas, cada nova versió inclou tant correccions funcionals com de seguretat i noves funcionalitats.

Les grans organitzacions, i altres tipus de col·lectius amb projectes de missió crítica, necessiten les correccions a les vulnerabilitats però sovint prefereixen mantenir la mateixa base de codi per un període estès en el temps sense que hi hagi cap tipus de canvi en les funcionalitats. És habitual que canvis en les funcionalitats impliquin introducció de nous errors o que es trenquin funcionalitats existents.

Encara que es pogués assegurar al 100% que les noves versions estan lliures de defectes, per aquests tipus d'usuaris, tractar amb noves funcionalitats és sovint molt car. Actualitzar una aplicació requereix la participació de molts equips que poden fer prohibitiu la certificació continua de noves versions.

Les versions LTS d'un programari usualment adrecen aquestes preocupacions desplegant només aquelles actualitzacions que afecten a problemes de seguretat, donat que instal·lar-les aporta menys risc que no fer-ho.

### Exemples

* NodeJS

![NodeJS schedule](/images/bloc/nodejs_schedule.png)
 
* Ubuntu

![Ubuntu schedule](/images/bloc/ubuntu_schedule.png)
