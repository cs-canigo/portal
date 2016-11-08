+++
date        = "2016-06-08T17:11:42+01:00"
title       = "Tasques per a integrar una aplicació amb SiteMinder"
description = ""
sections    = "GICAR"
taxonomies  = []
weight 		= 2
+++


Per tal de realitzar la integració d’una aplicació amb SiteMinder (instal·lació de l’agent al frontal web propi de l’aplicació) s’haurà de seguir el següent procediment:

1. Obertura dels ports dels firewalls per connectar l’Agent de SiteMinder amb el SiteMinder Policy Server. El responsable de l’aplicació sol·licitarà l’obertura dels ports següents:

	![Integració Aplicacions GICAR](/related/gicar/taula-ports-sm.png)

1. L’interlocutor de CPD interessat en dur a terme la integració, haurà d’omplir el formulari “Petició d’integració d’una aplicació v3.xls” i enviar-les al sau.tic@gencat.cat, amb la capçalera _PET_ORD_9.34 GICAR_ENTORN_Integració XXXX 

1.	L’Administrador de GICAR, aplicarà les configuracions pertinents, i omplirà el formulari i el retornarà al sol·licitant.
 
1.	El tècnic de sistemes instal·larà  l’Agent de SiteMinder en el Servidor Web on resideix el frontal a protegir per SiteMinder, fent ús de la informació lliurada en l’apartat 3 .

1.	L’administrador de GICAR, consensuadament amb els responsables de l’aplicació, aplica les polítiques de seguretat en SiteMinder.

1.	L’integrador de l’aplicació haurà de modificar l’aplicació per poder capturar i tractar les capçaleres HTTP que li envia SiteMinder un cop l’usuari ha estat validat al Directori Corporatiu .

**Si l’usuari s’ha autenticat amb usuari i contrasenya contra el  obtindrà les següents capçaleres:**

* **HTTP_GICAR (conté les dades de l’usuari al DC)** = “CODIINTERN=NRDRJN0001;NIF=11112222W;EMAIL=mail.admin@gencat.net;UNITAT_MAJOR=CTTI;UNITAT_MENOR=CTTI Qualitat”

* **HTTP_GICAR_ID (conté el NIF de l’usuari al DC)** --> 11112222W

Els detalls d’aquests camps es poden veure en la següent taula:

![Integració Aplicacions GICAR](/related/gicar/taula-capçalera-gicar.png)

Si l’usuari s’ha autenticat amb certificat:

* **HTTP_GICAR (conté dades si l’usuari està al DC, sino ve buida)** = “CODIINTERN=NRDRJN0001;NIF=11112222W;EMAIL=mail.admin@gencat.net;UNITAT_MAJOR=CTTI;UNITAT_MENOR=CTTI Qualitat”

* **HTTP_GICAR_ID (conté el NIF de l’usuari)** --> 11112222W

Sota petició podran obtenir-se també les següents capçaleres:

* **HTTP_GICAR_CERT** (conté el classification level, el issuer, el subject, i el OID del certificat)  --> CLASIFICATIONLEVEL=4;CERTISSUER=C=ES, O=Agencia Catalana de Certificacio (NIF Q-0801176-I), L=Passatge de la Concepcio 11 08008 Barcelona, OU=Serveis Publics de Certificacio ECV-2, OU=Vegeu https://www.catcert.net/verCIC-2 (c)03, OU=Secretaria d'Administracio i Funcio Publica, CN=EC-SAFP;CERTSUBJECT=C=ES, O=Centre Telecomunicacions i Tecnologies de la Informació, OU=Serveis Públics de Certificació CPISR-1, OU=Vegeu https://www.catcert.cat/verCPISR-1 (c)03, SN=GARCIA GARCIA, G=ALBERT, SERIALNUMBER=46587898A, CN=CPISR-1 ALBERT GARCIA GARCIA;CERTIFICATEPOLICY=1.3.6.1.4.1.15096.1.3.1.81

* **HTTP_GICAR_PSIS**: que contindrà la resposta de PSIS completa, i estarà enzipada i codificada en base64. Un cop descodificada i desenzipada s’obtindran les dades en la forma que s’especifica en l’annex D.

A partir d’aquest moment, l’aplicació determinarà els privilegis que té l’usuari que hi accedeix.


