+++
date        = "2019-05-08"
title       = "Exemples i ajuda Plantilla DA"
description = "Plantilla DA"
sections    = "Document Arquitectura"
weight      = 3
categories  = ["Document Arquitectura","DA","Plantilla"]
+++

## Vista Context: {#DiagramesContext}

![Exemple Diagrama Context 1](/images/PlantillaDA/Exemple_Context.JPG)

![Exemple Diagrama Context 2](/images/PlantillaDA/Exemple_Context_2.JPG)

## Vista Funcional: {#DiagramaFuncional}

![Exemple Diagrama Funcional 1](/images/PlantillaDA/Exemple_Diagrama_Funcional.JPG)

## Vista d'Informació: {#VistaInformacio}

### Nivell de RGPD assignat al fitxer {#NivellRGPD}

**Quines dades es consideren Bàsiques:**

- Dades identificatives (nom, cognoms, DNI, correu electrònic, adreça, telèfon, IP)

- Dades econòmiques (comptes bancaris, targetes de crèdit, nòmines,...)

- Característiques físiques

- Característiques personals (estat civil, edat, sexe, nacionalitat,...)

- Dades acadèmiques o professionals


**Quines dades es consideren Especialment protegides:**

- Origen ètnic o racial

- Opinions polítiques

- Conviccions religioses o filosòfiques

- Afiliació sindical

- Dades biomètriques 

- Dades relatives a la salut

- Dades relatives a la vida sexual o orientacions sexuals

- Dades relatives a condemnes i infraccions penals

- Dades de geolocalització

- Dades financeres


### Nivell de sensibilitat de les dades {#NivellDades}

- **MOLT CRÍTIC**	La informació és altament confidencial, accessible per un nombre molt restringit d’individus, amb requeriments d’integritat, autenticitat i traçabilitat molt alts? (exemples: dades de Seguretat Pública, informació policial, gestió de claus criptogràfiques, etc.)

- **CRÍTIC**	La informació és confidencial, restringida a un cercle reduït d’individus, amb requeriments de xifrat i traçabilitat dels accessos?
	(Exemples: gestió de centres penitenciaris, eleccions, gabinets jurídics, subvencions, contractacions, plataformes transversals de suport a la tramitació, actuació de cossos d'emergències, inventari d'infraestructures crítiques, plans de protecció civil, etc.))
	
- **SENSIBLE**	La informació és restringida a àrees o unitats amb requeriments avançats de control d'accés i garanties d'intergitat i autenticitat? (Exemples: registre de ciutadans amb dades acadèmiques, sistemes de gestió de personal, llistes de col·lectius, la divulgació de les quals podria tenir repercussió política, registres d'empreses amb informació reservada, gestió de dades pressupostàries i econòmico-financeres, gestió del deute, sistemes d’ anàlisi de dades: estadístiques de serveis/operativa i quadres de comandament, actuacions de cossos operatius de la Generalitat (exceptuant els d'emergències), gestió de flotes d'emergència, tràmits de pagament on-line, tràmits electrònics i portals de tràmits, auditories, gestió de riscos, plans de continuïtat de negoci, assistència jurídica, gestió de la publicació d’informació (previ a la publicació))

- **INTERN**	Hi ha informació no crítica on es pot permetre una lleu pèrdua d'integritat e informació? 
	(Exemples: intranets departamentals, plataformes col·laboratives, fòrums, blogs, registres de professionals, convocatòries, concursos de personal, oposicions, usuaris d'aplicació, assistents a cursos, entrada/sortida de documents, gestió d'inventaris, qüestions parlamentàries, plecs, plans d'actuació, gestió de compres, consultes i suggeriments, queixes sense dades sensibles, infraestructures, expedients sense informació anterior, etc.)
	
- **PUBLIC**	La informació és pública sense restriccions de difusió del contingut?

## Vista Desenvolupament: {#DiagramesDesenvolupament}

![Exemple Diagrama Desenvolupament 1](/images/PlantillaDA/Exemple_Diagrama_Desenvolupament.JPG)

## Vista Desplegament:
### *1 Tipus de Servei {#TipusServei}
- PaaS
- IaaS
- Hosting

### *2 Possibles opcions de Nivell de Servei {#NivellServei}
- Continu - AD	24x7   
- Continu	24x7
- Laboral - AD	12x5
- Laboral	12x5
- No productiu	12x5

### *3 Tipus d’emmagatzematge {#TipusDisc}
- Blocs: Aquest tipus d’emmagatzematge està especialment pensat per quan es necessita una capacitat de disc dur en brut, com per exemple, espai per a una BBDD Oracle.
- Fitxers: Aquest tipus d’emmagatzematge està especialment pensat per quan l’usuari necessita accés a una carpeta compartida de fitxers.

### *4 Nivell de disc  {#NivellDisc}
- Alt rendiment (TIER 1). Dades d’alta criticitat, fitxers que s’accedeixen sovint, etc.
- Mig rendiment (TIER 2). Fitxers que no s’accedeixen gaire sovint. 
- Alta Capacitat (TIER 3). Copies de seguretat.

### *5 RTO i RPO {#RTORPO}
- RTO: 2 hores / 8  hores / 12 hores
- RPO: RPO Zero (No pot perdre cap transacció) /  RPO Darrer Backup

## Vista Operacional:

### Polítiques de retenció {#PolitiquesRetencio}

- **Estàndard** - Diària incremental amb 2 setmanes de retenció, setmanal completa amb 1 mes de retenció, mensual completa amb 3 mesos de retenció i anual completa amb 1 any de retenció (cobrint 1 any i 3 mesos de retenció de dades)

- **Avançada** - Diària incremental amb 1 mes de retenció, setmanal completa amb 2 mesos de retenció, mensual completa amb 6 mesos de retenció i anual completa amb 2 anys de retenció (cobrint 2 anys i 6 mesos de retenció de dades)

- **Especial** - Diària incremental amb 1 mes de retenció, setmanal completa amb 2 mesos de retenció, mensual completa amb 12 mesos de retenció i anual completa amb 5 anys de retenció. (cobrint 6 anys de retenció de dades)
