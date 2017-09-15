+++
date        = "2017-09-15"
title       = "Hibridació de l'autenticació i de la gestió d'identitats amb Office365"
description = "Arquitectura implementada per a assolir la hibridació de la capa de gestió d'identitats i de control d'accés amb l'Office365 de la Generalitat"
sections    = ["Blog", "home"]
blog_tags   = ["gestió identitats", "GICAR", "Office365", "Microsoft", "cloud"]
categories  = ["gestió identitats", "GICAR", "Office365", "Microsoft", "cloud"]
imatge      = "/related/gicar/adfs-index.PNG"
key         = "SETEMBRE2017"
+++

El present document té per objectiu explicar el projecte d'hibridació de l'autenticació amb Office365 (Exchange Online, Skype Empresarial, OneDrive Empresarial, Office Online) dels usuaris de la Generalitat de Catalunya, i quina és l'arquitectura implementada per a dur a terme aquesta funcionalitat.

## Antecedents

La Generalitat de Catalunya abans d'iniciar aquest projecte disposava de les següents eines per a gestionar les identitats dels seus empleats i col·laboradors:

### Al CPD de la Generalitat (On premise)

- El sistema corporatiu de gestió d'identitat (GICAR) amb 230.000 identitats actives

- Un Exchange desplegat sobre un domini Windows per donar servei al correu corporatiu. Aquest Exchange disposava d'unes 90.000 bústies nominals + 20.000 de genèriques.

- Les 90.000 bústies nominals estaven desplegades sobre identitats que venien sincronitzades des de la Gestió d'Identitats Corporativa (GICAR).

### Al Núvol

- Es disposava d'un tenant d'Office365, associat al domini gencat.cat, però sense cap lligam amb el Exchange i domini On Premise.

- Els usuaris entraven als serveis del núvol amb un usuari i contrasenya diferent al corporatiu GICAR.

- No hi havia cicle de vida dels usuaris al núvol. Quan un usuari marxava de la Generalitat no hi havia una sincronía entre la petició de baixa de GICAR i la d'aquest compte per a esborrar la identitat i la informació associada a aquella identitat a Office365.

## Arquitectura

### Requeriments a donar compliment

S'ha proposat i desplegat la següent arquitectura, suportada per Microsoft, per a donar compliment als següents requeriments:

- Mateixes credencials a la plataforma d'Exchange On Premise i als serveis del núvol.

- La informació dels usuaris a la Plataforma d'Exchange On Premise ha d'estar reflectida a l'Exchange del núvol. No tota la informació sino només un subconjunt rellevant per a l'ús de les aplicacions al núvol.

- Contrasenya de l'usuari nominal gestionada per GICAR, gestionable a través del Portal d'Autogestió de Contrasenyes, sotmesa a la Política de caducitat de les contrasenyes corporativa i hostatjada al CPD de la Generalitat.

- Cicle de vida de les identitats nominals, tant a on Premise com al núvol, gestionat per GICAR.

- Propagació de la llibreta d'adreces de l'Exchange On Premise cap als serveis d'Office365.

### Descripció de les peces que componen l'arquitectura

A continuació es descriuen les peces que componen aquesta arquitectura:

![Integració Aplicacions GICAR](/related/gicar/adfs-hibridacio.PNG)

- GICAR: plataforma de Gestió d'Identitats corporativa encarregada d'aprovisionar els usuaris i les contrasenyes d'aquests al directori actiu On Premise.

- OIM (Oracle Identity Manager): component de GICAR que és l'encarregat d'efectuar aquesta sincronització.

- Directori de LT1: directori actiu on Premise que conté les identitats que accedeixen tant a l'Exchange On Premise com a l'Office365.

- ADFS: Servidors d'Active Directory Federation Services que s'encarreguen de validar l'autenticació de les identitats contra el Directori de LT1. Aquests servidors són accessibles només des de la xarxa de la Generalitat. Per a accedir a aquests des de fora del nus de comunicacions de la Generalitat, s'ha d'accedir a través dels servidors WAP, que fan de proxy invers, per a dotar de més seguretat als ADFS.

- WAP: Web Application Proxy és un rol de servidor Windows que proporciona una funcionalitat de servidor proxy invers per a aplicacions web dins de la xarxa corporativa, per permetre que els usuaris de qualsevol dispositiu puguin accedir des de fora de la xarxa corporativa.

- AD Sync: Servidor que conté el producte AADConnect que s'encarrega de sincronitzar les identitats del Directori de LT1 cap al directori d'Azure, a través del qual es pot donar accés a les aplicacions d'Office365. A través d'aquest servidor se sincronitzen les dades mínimes dels usuaris per a poder fer servir els serveis d'Office365, i no se sincronitza la contrasenya corporativa. No se sincronitzen tampoc cap al núvol els usuaris sensibles que no es veuen a la llibreta d'adreces de l'Exchange On Premise.

- AD Azure: Directori de Microsoft al núvol, el qual permet gestionar l'accés pels usuaris als recursos de l'Office365.

![Integració Aplicacions GICAR](/related/gicar/adfs-arquitectura.PNG)

## Descripció del procés d'autenticació

El procés d'autenticació que se segueix de cara a que l'usuari pugui accedir als serveis de l'Office365 està basat en el protocol WS-FED, variant del protocol SAML.

Quan un usuari intenta accedir a un dels serveis de l'Office365 es produeixen les següents accions:

1.- Intent d’accés al recurs d’Office365 i introducció de nom d’usuari @gencat.cat.

![Integració Aplicacions GICAR](/related/gicar/adfs-pas1.PNG)

2.- Redirecció de l’usuari al ADFS de Gencat per a fer login
![Integració Aplicacions GICAR](/related/gicar/adfs-pas2.PNG)

La redirecció es fa amb els paràmetres que necessita el ADFS per identificar l'aplicació origen d'on ve la petició. Quan l'accés a aquest ADFS es fa des d'internet, les peticions es fan a través d'un servidor WAP.

3.- L’ADFS de GENCAT valida credencials contra el directori de LT1. **Procés efectuat a On Premise**

4.- El directori de LT1 retorna OK/KO de les credencials. **Procés efectuat a On Premise**

5.- ADFS de GENCAT retorna token amb la sessió de l’usuari. **Procés efectuat a On Premise**

Per a fer això l'ADFS efectua un POST a **https://login.microsoftonline.com/login.srf** amb el paràmetre **wresult** que conté el XML de tornada cap a Office365 signat per l'ADFS.

Al estar aquest token signat per l'ADFS, no és possible generar aquesta resposta per un tercer si no disposa del certificat de signatura dels tokens que només té el ADFS.

6.- Amb aquest token es concedeix l’accés a Office365:
![Integració Aplicacions GICAR](/related/gicar/adfs-pas3.PNG)

## Descripció del procés de sincronització d'usuaris

El procés de sincronització d'usuaris permet que l'Office365 pugui trobar els usuaris al AD Azure i per tant, se li puguin assignar grups i autoritzacions a l'Office365.

Aquest procés es dispara cada tres hores a la màquina del AADConnect, i el que fa és sincronitzar els canvis que hi ha hagut al directori de LT1 cap l'AD Azure.

Aquest procés sincronitza només cap a l'AD Azure els atributs d'usuari que es poden veure a través de la llibreta d'adreces corporativa.

El procés de rèplica d'aquesta informació cap al núvol es fa de manera segura mitjançant protocol TLS per assegurar la confidencialitat de les dades que es repliquen.

Quan Recursos Humans dels Departaments de la Generalitat fan una baixa a GICAR, a través d'aquest procés de sincronització d'usuaris, aquesta també es replica al AD Azure, impedint a l'usuari poder accedir al seu compte un cop ja no està en l'organització.


## Altres funcionalitats que ens permetrà aquesta arquitectura en el futur

- A banda de la federació del servei d'Office365 anteriorment descrita, aquesta solució de federació permet també la integració de portals web On Premise amb aquest flux d'autenticació. L'ADFS permet doncs la validació/generació de tokens cap a aplicacions On Premise (en el nostre cas s'ha fet ja amb aplicacions corporatives de col·laboració) o núvol (en el nostre cas Office365). En un futur poden ser més les aplicacions que s'integrin amb aquesta arquitectura, no necessàriament lligades a tecnologies Microsoft.

- El fet de tenir els usuaris corporatius de la Generalitat aprovisionats a AD Azure també obre la porta a poder fer ús d'aquests usuaris en futures aplicacions de la Generalitat que puguin ser desplegades al CPD d'Azure.

## Conclusions

- Amb aquest tipus d'arquitectura es permet fer l'autenticació a l'Office365 sense haver de passar credencials d'usuari al núvol. Tot el procés d'autenticació es fa a On Premise, i només es passa cap al núvol un token signat amb l'identificador de l'usuari que s'ha autenticat.

- Amb aquest model d'arquitectura les dades dels usuaris a l'Office365 són consistents amb les dades dels usuaris a GICAR. Les dades que l'usuari tingui als serveis al núvol seran fidedignes amb les que hi ha a GICAR.

- Amb aquest model d'arquitectura el cicle de vida de l'usuari queda cobert, i una baixa d'un usuari a GICAR queda reflectida a l'Office365 evitant així la proliferació de comptes orfes d'usuaris que ja no estan a l'organització, i conseqüentment el cost en llicències innecessari que això podria implicar.

- Aquesta arquitectura podria ser utilitzada per altres aplicacions on Premise que puguin requerir d'ADFS com a mecanisme d'autenticació.
