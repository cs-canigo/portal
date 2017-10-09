+++
date        = "2017-06-05"
title       = "Utilització preferent de versions LTS de programari"
description = "Les versions LTS (Long-Term Support) de programari lliure són les recomanades i a adoptar com a preferents seguint el criteri d'Arquitectura CTTI"
sections    = ["Blog", "home"]
blog_tags   = ["patrons", "LTS", "principis"]
categories  = ["principis"]
imatge      = "/images/bloc/keep-calm-and-use-lts-versions.png"
key         = "JUNY2017"
+++

### La necessitat d'un suport a llarg termini

El cicle de vida tradicional en molts projectes es desplegar noves versions sovint, o planificar els desplegaments en períodes curts i regulars. En qualsevol cas, cada nova versió inclou tant correccions funcionals com de seguretat i nous evolutius.

Les grans organitzacions, i altres tipus de col·lectius amb projectes de missió crítica, necessiten les correccions a les vulnerabilitats però sovint prefereixen mantenir la mateixa base de codi per un període estès en el temps sense que hi hagi cap tipus de canvi en les funcionalitats. És habitual que canvis funcionals impliquin introducció de nous errors.

Encara que es pogués assegurar al 100% que les noves versions estan lliures de defectes, per aquests tipus d'usuaris, el tractament de noves versions és sovint molt car. Actualitzar una aplicació requereix la participació de molts equips que poden fer prohibitiva la certificació contínua de noves versions.

Les versions de Suport a Llarg Termini d'un programari, també conegudes com a LTS, de l'anglès "Long Term Support", usualment adrecen aquestes preocupacions. 

### Què són les versions LTS 

Les versions LTS són un tipus especial de versions o edicions de programari que estan designades per a ser suportades per un període més llarg que el normal. És un concepte que ha aparegut majoritàriament en programari lliure.

Es tracta d'una política de gestió del cicle de vida del programari, que aplica criteris d'estabilitat de les versions en un termini més llarg de l'acostumat, alterant la freqüència de les noves versions per rebaixar el risc, la despesa i la disruptivitat que provoquen. Les versions LTS despleguen només aquelles actualitzacions que afecten a problemes de seguretat, donat que instal·lar-les aporta menys risc que no fer-ho. 

Al principi d'un període de suport a llarg termini, els desenvolupadors del programari imposen una congelació de les característiques: corregeixen errors i vulnerabilitats, però no introdueixen noves funcionalitats que poden causar problemes de regressió.

### Nou Principi d'Arquitectura: fer servir versions LTS sempre que el programari escollit les ofereixi

Les versions LTS ofereixen a la Generalitat una opció ideal per a mantenir el versionat dels components del programari al dia amb una eficiència en cost. També s'adapta millor al cicle de vida habitual de les nostres aplicacions, més llarg que en altres sectors. És per aquest motiu que s'ha decidit introduïr l'ús preferent de versions LTS dins dels [Principis d'Arquitectura](http://canigo.ctti.gencat.cat/principis/):

```
Les versions de les diferents peces (productes, llibreries, etc) que componen un sistema han de ser el més estable possible, d'aquí que es recomani l'ús de versions LTS (Long-Term Support) o, si de cas hi manca, GA (General Availability) o la nomenclatura que hagi donat el fabricant. Versions productives d'un sistema mai haurien d'incorporar versions no consolidades (snapshot, alpha, beta, release candidate, milestone, etc) dels components que en formen part.
```

### Exemples

A continuació es mostra el roadmap de versions de Symfony, NodeJS o Ubuntu com a exemples:

* Symfony

![Symfony](/images/bloc/symfony_schedule.png)

* NodeJS

![NodeJS schedule](/images/bloc/nodejs_schedule.png)
 
* Ubuntu

![Ubuntu schedule](/images/bloc/ubuntu_schedule.png)
