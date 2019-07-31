+++
date        = "2019-07-31"
title       = "Estàndard per la identificació de versions del programari"
description = "Requisits per la identificació de les versions dels lliurables d'una solució, tant la seva documentació generada, com el codi font i altres lliurables de suport"
weight		= 4
type = "estandard"
toc         = true
versio      = "1.1"
responsable = "Unitat de qualitat i models del CTTI"
estandards =  ["programari"]
codi = "35.080.04"

+++

## Part 1: Abast

Aquest document especifica els requisits per la identificació de les versions dels lliurables d'una solució, tant la seva documentació generada, com el codi font i altres lliurables de suport


## Part 2: Referències 

## Part 3: Termes i definicions


##### Versió major

Representa una versió final relacionada amb un nou projecte o un gran evolutiu (canvis funcionals o d’arquitectura importants). No tenen una periodicitat establerta, sinó que es defineixen seguint el roadmap establert pel comitè de canvis.

##### Versió menor

Representa un conjunt d'evolutius menors o paquets de correcció a diversos errors coneguts sobre la versió major. En general les versions menors es planifiquen en períodes preestablerts (exemple: trimestralment).

##### Versió de pegat

Versions per modificacions urgents o pegats.

##### Build

Representa el cicle de vida intern de proves i acceptació per part del CTTI i/o client, abans de ser lliurat al client de negoci.


## Part 4: Identificació de versions del programari

1. Tot lliurament  (documentació, codi font, executables, especificacions, ....) **ha de** tenir assignat una versió i un build, seguint la següent nomenclatura:

	```
	<Versió>[.<Build>]
	```
	o
  ```
	<Versió>[-<Build>]
	```

	On versió estarà composada de 3 dígits:
	```
	<Versió major>.<Versió Menor>.<Versió de Pegat>
	```


1. Els builds **s'han de** identificar amb la nomenclatura 'B' seguida d'un nombre consecutiu de 3 dígits (que s'han d'omplir amb zeros a l'esquerra en cas que es requereixi)


## Part 5: Cicle de vida de les versions

1. Si es realitza una nova iteració o paquet de noves funcionalitats per una planificació, **s'ha de** generar una nova versió, incloent la identificació del build (B001)

2. Aquesta versió **ha de** ser provada, per exemple en el cicle de proves de qualificació. Si es detecten fallides, **s'ha de** generar un nou build que inclogui les correccions (passaríem per exemple a B002).

3. Si finalment les proves són exitoses, es pot passar la mateixa versió per a la realització de les proves d'acceptació.

4. Si durant les proves d'acceptació es troben defectes, s'ha de generar una nova versió (la B003 per exemple).

5. Finalment, quan l'aplicació està acceptada s'etiqueta la versió a desplegar eliminant el sufix Build, per exemple lliurant la versió 1.2.2.

6. Quan es posa en funcionament una solució, aquesta ha d'estar identificada únicament per la versió, mai s'ha de visualitzar el build. 


# ANNEX A (informatiu) Exemples de versionatge

<br/>
Exemple1: Primer lliurament d'un nou projecte

![versio_1](/images/versio1a.png)　 

Un cop finalitzat el desenvolupament, s’etiqueta la versió conforme es considera apta per iniciar el procés de proves i acceptació (s'afegeix B0001). Si el CTTI detecta un error durant les proves s'haurà de fer les correccions i pujar una nova versió incrementant en 1 el dígit corresponent al build. Si finalment el CTTI realitza l'acceptació s'etiqueta la versió eliminant l'últim dígit de build.

Exemple 2: Detecció d'una incidència urgent
![versio_2](/images/versio2a.png)
