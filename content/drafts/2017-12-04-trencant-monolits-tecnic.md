+++
date        = "2017-12-04"
title       = "De monolits a (micro)serveis - Part 1: Descomposició tècnica"
description = "Com trencar un monòlit des del punt de vista tècnic"
sections    = ["drafts"]
categories  = ["microserveis","monolits"]
+++

## Monòlits

*Un cop acabada la fase de transformació i posada al dia del maquinari i dels programaris base que suporten les aplicacions i sistemes de la Generalitat, comencem a observar interès en posar al dia també les aplicacions. En la majoria de casos es posa damunt de la taula la conversió d'aplicacions monòlits cap a aplicacions basades en (micro)serveis. D'aquesta manera es pretén dotar de lleugeresa i adaptabilitat als canvis a aplicacions que acostumen a durar molts més anys que les infraestructures i programaris que les sustenten.*

Des d'arquitectura CTTI, hem decidit fer una sèrie de posts tractant els principis que han de governar el disseny i la implementació de les aplicacions basades en (micro)serveis com tècniques per tractar el problema tant des del punt de vista tècnic com funcional.

Aquest post serà un hands on tècnic sobre el trencament del monolit.

### Monolit i alternatives

Al post anterior hem parlat dels principis que han de governar el disseny dels serveis. Però, val sempre la pena trencar un monòlit? Són tan dolents?


OSGI, Java 9 with Jigsaw, tècniques per modularitzar
SOA i diferència amb microserveis

### Què és un microservei?
2 week work
2 pizza team
Owneership

### Per on començar?

sdfd

change algorithm. XX
### Aplicant TDD/BDD
fd ??

### Transaccionalitat
ddd

### Trencant el monolit de la base de dades
ddd

Base de dades i codi
Referencia al llibre famos

### Orquestració o coreografia?

fdfdkla. 


### Evolució
CI/CD
Postel's law -> tolerant reader
Dont allow to coexsit old and new endpoint for long time -> consider merging bot into same service them
REST best practices