+++
date        = "2024-01-15"

title       = "Correu"
description = "Enviament de correu electrònic."
sections    = "Canigó. Documentació Versió 3.8"
weight      = 1
+++

## Propòsit

Aquest mòdul té com a objectiu permetre l'enviament de correus electrònics a una o diverses adreces especificades a qualsevol dels següents recipients:

* Destinataris principals
* Destinataris secundaris
* Destinataris ocults

Permet diferents modes d'enviament, tant en text pla, com en mode HTML, i en tots 2 casos oferint la possibilitat d'adjuntar un o més fitxers en mode adjunt o inline. 

Versions i Dependències

## Instal.lació i Configuració

### Instal.lació

Per tal d'instal-lar el mòdul d'enviament de correu es pot incloure automàticament a través de l'eina de suport al desenvolupament o bé afegir manualment en el pom.xml de l'aplicació la següent dependència:

```xml
<dependency>
	<groupId>cat.gencat.ctti</groupId>
	<artifactId>canigo.support.mailing</artifactId>
	<version>${canigo.support.mailing.version}</version>
</dependency>
```

A la [Matriu de Compatibilitats 3.8](/content/plataformes/canigo/documentacio-per-versions/3.8LTS/3.8.0/moduls/compatibilitat-per-modul.md)  es pot comprovar la versió del mòdul compatible amb la versió de Canigó utilitzada.

### Configuració

La configuració es realitza automàticament a partir de la eina de suport al desenvolupament.

L'eina de desenvolupament genera automàticament el fitxer de propietats necessari per a la configuració del servei.

Ubicació proposada: <PROJECT_ROOT>/src/main/resources/config/props/mail.properties

Propietat                | Requerit | Valor Defecte | Descripció
------------------------ | -------- | ------------- | -----------
*.mail.host              | Sí       |               | Nom del servidor de correu sortint (smtp).
*.mail.port              | No       |      25       | Port del servidor de correu sortint (smtp). 
*.mail.protocol          | No       |     smtp      | Protocol del servidor de correu sortint (smtp).
*.mail.username          | No       |               | Usuari de connexió al servidor de correu sorting (smtp).
*.mail.password          | No       |               | Password de l'usuari de connexió.
*.mail.defaultEncoding   | No       |     UTF-8     | Encoding per defecte del correu.  
*.mail.maxAttachmentSize | No       |0(sense límits)| Tamany màxim permés dels fitxers adjunts. 
*.mail.isSmtpSSLEnabled  | No       |     false     | Habilitar o deshabilitar SSL.
*.mail.debug             | No       |     false     | Activar les traces de debug.
*.mail.timeout           | No       |     8500      | Timeout pel servidor de correu(ms).


## Utilització del Mòdul

### Directe

A partir de la versió 1.3.0 del mòdul s'ha creat la interfície `cat.gencat.ctti.canigo.arch.support.mailing.FluentMailService` seguint l'especificació *Fluent Builder*, proporcionant més flexibilitat i claredat en la definició dels paràmetres.
Un exemple d'ús directe és el següent:

```java
import cat.gencat.ctti.canigo.arch.support.mailing.FluentMailService;

import org.springframework.stereotype.Service;

@Service
public class MyExampleClass {

	@Autowired
	private FluentMailService fluentMailService;

	public void sendTestEmail(boolean isHtml, boolean isInlineAttachment) {

		fluentMailService.send(fluentMailService //
				.from("from@test.com") //
				.to("to@test.com") //
				.subject("títol") //
				.message("The results are OK.", isHtml) //
				.attachments(new Attachment(logoByteArray, "companyLogo.gif", isInlineAttachment),
						new Attachment(pdfInputStream, "results.pdf", false)) //
		);
	}
}
```

### REST

Per a utilitzar aquest mòdul, cal crear un Controller i un Service:

**MailAplicacioService.java**

Classe Java on es realitzarà la lògica de la operació a realitzar i es connecta amb el mòdul d'enviament de correus.

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import cat.gencat.ctti.canigo.arch.support.mailing.MailService;

@Service("mailAplicacioService")
@Lazy
public class MailAplicacioService {

	private static final Logger log = LoggerFactory.getLogger(MailAplicacioService.class);

	@Autowired
	private MailService service;
    


	public String testEmail(String from, String subject, String body, boolean isHtml, String to){
		
		String message;

        try{
        	this.service.send(from, subject, body, isHtml, to);
        }catch(Exception e){
        	message = "Error al test: " + e.getMessage();
        	log.error(e.getMessage(), e);
        }
        
        message = "Test correcte";
        return message;

    }
	
}
```

**MailServiceController.java**  

Controller que publica les operacions disponibles per a qui hagi de consumir-les

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import cat.gencat.plantilla32.service.MailAplicacioService;

@RestController
@RequestMapping("/mail")
public class MailServiceController {

	@Autowired
	MailAplicacioService mailAplicacioService;


	@PostMapping(produces = { MediaType.APPLICATION_JSON_VALUE })
	public String testEnotum(@RequestParam String from, 
			@RequestParam String subject,
			@RequestParam String body,
			@RequestParam boolean isHtml,
			@RequestParam String to) throws Exception {
		return mailAplicacioService.testEmail(from, subject, body, isHtml, to);
	}
}
```
