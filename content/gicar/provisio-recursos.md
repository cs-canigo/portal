+++
date        = "2016-06-08T17:11:42+01:00"
title       = "Provisió de recursos i aplicacions"
description = ""
section     = "GICAR"
taxonomies  = []
toc 		= false
weight 		= 4
+++




La plataforma GICAR ofereix un altre ventall de funcionalitats relacionades amb el Control d’Accés a Recursos. Els conceptes bàsics a conèixer es descriuen a continuació:

1. **Provisió d’usuaris**: GICAR disposa d’un dipòsit central d’informació on s’emmagatzemen atributs relatius al tipus d’autorització que té l’usuari per accedir als repositoris/directoris finals (recursos). Mitjançant aquesta eina es pot aprovisionar/ deprovisionar informació de l’usuari en cadascun dels recursos als que té accés. D’aquesta manera, el sistema permet gestionar l’accés a recursos finals i disposar d’una eina de traçabilitat i control centralitzada.

1. **Reconciliació**: és el procés mitjançant el qual la plataforma de provisioning garanteix la integritat entre la informació del dipòsit central i la informació d’usuari en el recurs/directori final. Solen ser processos nocturns o de cap de setmana per l’elevat volum de comprovacions que es realitzen.

1. **Workflow**: eina de la plataforma GICAR utilitzada per aplicar controls de negoci i tecnològics prèviament al provés de provisió/ deprovisió de comtes d’usuari en els recursos/ directori finals. És un portal tipus self-service al que tots els usuaris del Directori Corporatiu poden accedir per efectuar les seves peticions d’accés a recursos. Les fases d’autorització i validació estan reservades a identitats concretes per cada recurs.

1. **Autogestió de Contrasenyes**: eina de la plataforma GICAR que permet que una identitat del Directori Corporatiu (DC) s’autogestioni la contrasenya del DC mitjançant la resposta de desafiaments prèviament configurats per l’usuari. Actualment, l’usuari ha de respondre 3 preguntes i, en el cas de respondre-les correctament, pot canviar-se la contrasenya.

1. **Sincronització de Contrasenyes**: eina de la plataforma GICAR que permet sincronitzar la contrasenya d’un recurs/ directori amb la contrasenya del Directori Corporatiu. Es tracta d’un mecanisme bidireccional. 

## Arquitectura i elements pel Control d’Accés a Recursos.

En el següent esquema s’inclouen els diferents elements de la plataforma GICAR que intervenen en la gestió del control d’accés a recursos:

![Integració Aplicacions GICAR](/related/gicar/arq_apr.png)

Tal i com s’observa en l’esquema anterior, els elements de la plataforma són:

1. **OIM (Oracle Identity Manager)**: és l’eina de Gestió d’Identitats i control d’accés a recursos de la Generalitat de Catalunya. Es descriuen a continuació algunes de les característiques més remarcables:

	- És eina sincronitzada amb el Directori Corporatiu de la Generalitat per garantir la integritat de la informació.

	- La seva funció més important és la provisió de comptes d’usuaris o deprovisió en els recursos finals integrats a la plataforma. Aquesta funció facilita enormement els procesos de gestió i administració d’usuaris de les aplicacions finals.

	- Permet disposar de traçabilitat d’accions realitzades en els recursos integrats (alta en un recurs, baixa, modificació, bloqueig, sincronisme de contrasenya, etc)

	- Disposa d’un mòdul de sincronisme de contrasenyes amb el Directori Corporatiu que propaga la contrasenya en cas que es vegi modificada cap a o des dels recursos integrats.

	- Es poc intrusiu amb els recursos/ aplicacions finals donat que els connectors d’aprovisionament es troben integrats dins la pròpia plataforma i no cal cap tipus d’instal.lació en l’aplicació client.

	- Permet activar automatismes de control que analitzen l’estat de les identitats i que poden forçar canvis d’estat en funció de paràmetres prèviament definits.

	- Integrat amb l’eina de workflow (explicada posteriorment). OIM recull informació de l’estat d’una identitat pel que fa a l’accés a recursos (bloquejat, actiu, etc)

	- Fa servir una base de dades Oracle com a dipòsit d’informació.

	- Disposa d’una eina d’autogestió de contrasenyes, que li permet a tot usuari del Directori Corporatiu modificar-se la contrasenya en el cas de respondre correctament al 3 preguntes prèviament emmagatzemades en OIM (desafiaments-resposta)

1.	**Workflow**: eina que controla l’estat de les peticions, autoritzacions i aprovacions d’accés a recursos. Fa ús de la mateixa BBDD d’OIM per emmagatzemar tota la informació (Estats de la petició, validadors, etc) 

	La provisició o deprovisió de recursos requereix en la majoria de casos d’aprovacions parcials per a que aquestes accions es portin a terme. La funció del portal de workflow és precisament aquesta: permet fer peticions d’alta, baixa i modificació d’accés a recursos, veure quines peticions té pendents d’aprovar un responsable, aprovador o autoritzador, saber a quins recursos ja té accés una identitat, quin és l’estat de les peticions, etc.

	La implantació d’una eina de fluxos de treball (Workflow) aporta molts beneficis:

	- Obliga a ordenar i estructurar els fluxos de treball per tal de poder automatitzar la seqüència d’accions a portar a terme i identificar a totes les persones que hi intervenen.
	- Permet establir mecanismes de control i seguiment dels procediments organitzatius.
	- Independitza el mètode i flux de treball de les persones que l’executen.
	- Facilita la mobilitat del personal.
	- Agilitza el procés d’intercanvi d’informació i agilitza la pressa de decisions d’una organització.
	- Redueix el paper i les accions manuals, a través de l’automatització.
	- Es guarden traces de totes les accions portades a terme dins d’un flux.
	- Els actors d’un flux poden consultar l’estat de les peticions en què hi intervenen.
	- L’eina permet delegació de funcions

	Les fases d’un flux de treball (workflow) per demanar accés, modificació o baixa d’un recurs/ Identitat es descriuen a continuació:

	- Creació d’una sol·licitud (petició): en aquesta fase, una identitat del Directori Corporatiu fa una petició d’accés/baixa a un recurs per ell mateix o per una persona que depèn d’ell. 

	- Autorització orgànica: és l’autorització de la sol·licitud per part d’un responsable orgànic (responsable d’identitat). Aquesta validació es podrà escalar tantes vegades com sigui necessari, fins que algú l’aprovi o denegui.

	- Validació tècnica: aquesta validació serà portada a terme per part del responsable del recurs implicat en la petició (pot ser alta o baixa del recurs). Aquesta validació podrà incloure tantes validacions consecutives com calgui ja sigui de responsables funcionals, de responsables de dades, d’administradors d’aplicació, etcètera.

	![Integració Aplicacions GICAR](/related/gicar/wf-fases.png)

	Es mostra a continuació una mostra de l’aspecte visual del portal de workflow que podrà ser usat pels usuaris per fer peticions, veure autoritzacions pendents, fer aprovacions tècniques, etc:

	![Integració Aplicacions GICAR](/related/gicar/wf-home.png)

	Esmentar que l’eina de workflow, addicionalment a la realització de peticions d’alta o baixa de recursos, també permet sol.licitar l’alta i baixa d’identitats tipus T3 al Directori Corporatiu.

1.	**BBDD OIM**: Base de dades on es guarda tota la informació relativa a una identitat:

	- Recursos als que té accés

	- Estat de les peticions de recursos per una identitat

	- Rols amb els que s’ha aprovisionat la identitat

	- Etc.

1.	Recursos Finals: recursos gestionats per OIM. OIM té la capacitat de connectar-se a aquests recursos per aprovisionar o eliminar comptes d’usuari, així com per validar la integritat de la informació entre OIM i el recurs final (procés de reconciliació).

## Tipus d'aprovisionament

Tal i com s’ha indicat, l’aprovisionament és l’acció de crear comptes d’usuari en els recursos finals. D’igual forma, el deprovisionament és l’acció d’eliminar comptes d’usuari en els recursos prèviament aprovisionats.

Tant l’aprovisionament com el deprovisionament de comptes d’usuari acostuma a efectuar-se com a resultat d’un procés de workflow. Aquest aprovisionament, deprovisionament pot ser:

- **Automàtic**: a través d’un connector entre OIM i la taula/repositori de comptes d’usuari i rols de l’aplicació, OIM enviarà la informació establerta a l’aplicació per crear o eliminar una compte d’usuari o bé modificar-ne el rol. Tots aquests canvis, quedaran registrats en OIM i es disposarà de traçabilitat de totes les accions efectuades.

- **Semi-Automàtic**: pràcticament idèntic a l’Automàtic, però en aquest cas es considera necessària la intervenció humana per perfilar el compte d’usuari aprovisionat en el recurs.

- **Manual**: a diferència dels altres mecanismes, en aquest cas l’administrador de l’aplicació rep notificació com a resultat del workflow, realitza les modificacions en el recurs afectat i finalment és l’administrador qui tanca el workflow. En aquest cas, no és necessari el desenvolupament de cap connector donat que totes les accions són manuals. Amb el tancament del workflow, OIM té coneixment de les accions que s’han efectuat en el recurs final.

<img src="/related/gicar/modes-aprov.png" style="width:75%" />

## Fases per donar accés a un recurs

Un cop descrites les eines que formen part de la Plataforma GICAR per gestionar els recursos als que té accés una identitat, es descriu a continuació el procés que es segueix (des de l’inici) per donar accés a una identitat a un recurs:

- Alta de la Identitat al Directori Corporatiu (requisit indispensable): mitjançant l’eina GDI o bé via procés de càrrega des de GIPSIP, es dóna d’alta la identitat al Directori Corporatiu.

- Accés al Portal de Workflow per sol.licitar accés al recurs (per exemple, la intranet)
	Una identitat del DC (qualsevol) accedeix al porta i sol.licita un recurs per ell o per una altra identitat.
	Un autoritzador orgànic s’ocuparà d’autoritzar l’alta.
	Un validador tècnic s’ocuparà d’una segona validació.

- Finalitzat correctament el workflow, OIM aprovisiona dades de la identitat al recurs final (creació del compte d’usuari i assignació d’un rol determinat)

- Si es considera necessari, un administrador de l’aplicació perfila el rol de l’usuari.

- A partir d’aquest moment, en OIM consta que aquest usuari té accés al recurs aprovisionat i amb el rol que s’hagi sol.licitat.

En cas d’estar interessats amb la modalitat d’integració d’aprovisionament d’usuaris amb GICAR poseu-nos amb contacte amb el responsables del servei GICAR de cara a avaluar l’abast del projecte.