+++
date        = "2019-07-29"
title       = "Introducció programació funcional"
description = "Introducció als conceptes de programació funcional"
sections    = ["Notícies", "home"]
categories  = ["canigo"]
+++

### Introducció paradigmes programació

Existeixen dos grans blocs en la programació empresarial: la programació orientat a objectes i la programació funcional

#### Programació orientada a objectes 

La programació orientada a objecte forma part de la programació imperativa, ja que amb la programació orientada a objectes, es descriu la seqüència de passos que ha de seguir un programa per resoldre un problema

La programació orientada a objectes utilitza estructura de dades anomenats objectes que aglutinen propietats i mètodes conjuntament amb les seves interaccions

A la programació orientatada a objecte es desciu com a objecte una estructura de dades que descriu amb la major fiabilitat possible un objecte del món real i descriu com es relaciona o interactua amb la resta del món que el rodeja

En l'actualitat, en el món empresarial, la programació orientada a objectes és la més estesa

#### Programació funcional

La programació funcional és un paradigma de programació declarativa basat en ús de funcions

La principal característica de la programació funcional es que el valor generat per una funció depèn en exclusiva dels arguments que l'alimenten

A la programació funcional se centra amb "què" estem fent i no amb "com" s'està fent. Això vol dir que si utilitzem una programació funcional expressarem la nostre lògica sense descriure controls de fluxe (cicles, blucles o condicions)

Encara que la programació funcional és de les més antigues, ha tingut un lleuger impacte en el món empresarial envers a altres paradigmes de programació

En els últims anys, hi ha hagut un repunt en la utilització de la programació funcional com a paradigma de programació

Els principals avantatges de la programació funcional són:

- El codi tendeix a ser més concís i expressiu
- Que l'estat sigui immutable evita molts errors ja que no hi ha efectes secundaris
- Que l'estat sigui immutable ens ajuda en sistemes concurrents o paral·lels
- Les funcions pures són sempre previsibles, ja que les funcions reben paràmetres i retornen un resultat
- El testeig tendeix a ser més senzill ja que, si utilitzem funcions pures, els resultats són més previsibles

#### Exemple programació orientada objecte vs programació funcional

Per il·lustrar la diferència entre programació orientatda a objecte vs programació funcional utilitzarem el cas de volem saber la quantitat d'elements majors de 10 d'una llista de números enters

Donat:
```java

List<Integer> numeros = List.of(18, 6, 4, 15, 55, 78, 12, 9, 8);

```

Amb una programació orientada a objectes podríem tenir:

```java

List<Integer> numeros = List.of(18, 6, 4, 15, 55, 78, 12, 9, 8);

int contador = 0;
for(int numero : numeros) {
    if(numero > 10) {
        contador ++;
    }
}
System.out.println(contador);

```

Amb una programació funcional podríem tenir:

```java

Long result = numeros.stream().filter(num -> num > 10).count();
System.out.println(result);

```

Com podem observar, amb una programació funcional es redueix les línies de codi i el codi es torna més llegible

### Aplicació programació funcional a Canigó

Canigó amb la publicació de Canigó 3.4 proporciona les funcionalitats de programació funcional

Per a conèixer l'aplicació de programació funcional a Canigó podeu consultar
[modul-webFlux](/canigo-documentacio-versions-3x-altres/modul-webFlux/)
