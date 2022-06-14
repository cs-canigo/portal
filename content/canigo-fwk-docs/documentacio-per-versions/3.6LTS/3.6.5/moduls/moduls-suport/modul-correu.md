+++
date        = "2022-06-13"
title       = "Correu"
description = "Enviament de correu electrònic."
sections    = "Canigó. Documentació Versió 3.6"
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

Per tal d'instal-lar el mòdul d'enviament de correu es pot incloure automàticament a través de l'eina de suport al desenvolupament o bé afegir manualment en el *pom.xml* de l'aplicació la següent dependència:

```xml
  ...
  <properties>
    ...
    <canigo.support.mailing.version>[3.0.0,3.1.0)</canigo.support.mailing.version>
  </properties>
  <dependencies>
    ...
    <dependency>
      <groupId>cat.gencat.ctti</groupId>
      <artifactId>canigo.support.mailing</artifactId>
      <version>${canigo.support.mailing.version}</version>
    </dependency>
  </dependencies>
```

A la [Matriu de Compatibilitats] (/canigo-fwk-docs/documentacio-per-versions/3.6LTS/3.6.5/moduls/compatibilitat-per-modul/) es pot comprovar la versió del mòdul compatible amb la versió de Canigó utilitzada.

### Configuració

La configuració es realitza automàticament a partir de la eina de suport al desenvolupament.

L'eina de desenvolupament genera automàticament el fitxer de propietats necessari per a la configuració del servei.

Ubicació proposada: <PROJECT_ROOT>/src/main/resources/config/props/mail.properties

|Propietat              |Requerit   | Valor Defecte |Descripció                                     |
|-----------------------|-----------|---------------|-----------------------------------------------|
|mail.host              | No        |localhost      |Nom del servidor de correu sortint (smtp)      |
|mail.port              | No        |25             |Port del servidor de correu sortint (smtp)     |
|mail.protocol          | No        |smtp           |Protocol del servidor de correu sortint (smtp) |
|mail.maxAttachmentSize | No        |1048576        |Tamany màxim permès dels fitxers adjunts       |
|mail.defaultEncoding   | No        |UTF-8          |Default encoding                               |
|mail.smtpTimeout       | No        |10000          |Timeout (smtp) mili segons                     |
|mail.smtpAuth          | No        |false          |Intent d'autenticar l'usuari utilitzant l'ordre AUTH |
|mail.isSmtpSSLEnabled  | No        |false          |Habilita l'ús de l'ordre STARTTLS per canviar la connexió a una connexió protegida TLS |
|mail.debug             | No        |true           |Debug mode                                     |
|mail.username          | No        |               |Usuari de connexió al servidor de correu sorting (smtp) |
|mail.password          | No        |               |Password de l'usuari de connexió               |
|mail.encoded.password  | No        |               |Encoded password de l'usuari de connexió       |
|mail.extraProperties   | No        |{}             |Extra array propietats. Valor d'exemple: {'mail.smtp.ssl.protocols':'TLSv1.2'} |

## Utilització del Mòdul

### Configuració

Exemple de configuració de l'arxiu de propietats: *mail.properties*

```properties
*.mail.host=localhost
*.mail.port=25
*.mail.protocol=smtp
*.mail.maxAttachmentSize=1048576
*.mail.defaultEncoding=UTF-8
*.mail.smtpTimeout=10000
*.mail.smtpAuth=true
*.mail.isSmtpSSLEnabled=true
*.mail.debug=true
*.mail.username=test@testcanigo.cat
*.mail.password=password
*.mail.extraProperties={\
  'mail.smtp.ssl.enable':'false',\
  'mail.smtp.ssl.protocols':'TLSv1.2',\
  'mail.smtp.connectiontimeout': '5000',\
  'mail.from': 'master@testcanigo.cat'\
  }
```

<div class="message information">
És possible agregar variables dinàmicament concatenant dades en: `mail.extraProperties`
</div>

### Controller

Existeixen 2 beans injectats al context de l'aplicació (Spring) que poden ser consumits directament: *fluentMailService* i *encodedPasswordFluentMailService*

**MailController.java**  

Controller que publica els operacions disponibles per a qui hagi de consumir-els

Utilitzant password no encriptat:

```java
import cat.gencat.ctti.canigo.arch.support.mailing.FluentMailService;
import cat.gencat.ctti.canigo.arch.support.mailing.exception.MailModuleException;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/mail")
public class MailController {

  private final FluentMailService fluentMailService;

  public MailController(FluentMailService fluentMailService) {
    this.fluentMailService = fluentMailService;
  }

  @GetMapping(produces = { MediaType.APPLICATION_JSON_VALUE })
  public void sendMail(
    @RequestParam(defaultValue = "test1@testcanigo.cat", value = "fromEMail") String fromEMail,
    @RequestParam(defaultValue = "test2@testcanigo.cat", value = "toEMail") String toEMail,
    @RequestParam(defaultValue = "Test message", value = "messageTitle") String messageTitle,
    @RequestParam(defaultValue = "This is a test", value = "messageBody") String messageBody
  ) throws MailModuleException {
    fluentMailService.send(fluentMailService
        .from(fromEMail)
        .to(toEMail)
        .subject(messageTitle)
        .message("<html>" +
          "<body>" + messageBody + "</body>" +
          "<footer>" + LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME) + "</footer>" +
          "</html>", true));
  }
}
```

Utilitzant password encriptat:

```java
import cat.gencat.ctti.canigo.arch.support.mailing.FluentMailService;
import cat.gencat.ctti.canigo.arch.support.mailing.exception.MailModuleException;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/mail")
public class MailController {

  @Qualifier("encodedPasswordFluentMailService")
  private final FluentMailService fluentMailService;

  public MailController(FluentMailService fluentMailService) {
    this.fluentMailService = fluentMailService;
  }

  @GetMapping(produces = { MediaType.APPLICATION_JSON_VALUE })
  public void sendMail(
    @RequestParam(defaultValue = "test1@testcanigo.cat", value = "fromEMail") String fromEMail,
    @RequestParam(defaultValue = "test2@testcanigo.cat", value = "toEMail") String toEMail,
    @RequestParam(defaultValue = "Test message", value = "messageTitle") String messageTitle,
    @RequestParam(defaultValue = "This is a test", value = "messageBody") String messageBody
  ) throws MailModuleException {
    fluentMailService.send(fluentMailService
        .from(fromEMail)
        .to(toEMail)
        .subject(messageTitle)
        .message("<html>" +
          "<body>" + messageBody + "</body>" +
          "<footer>" + LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME) + "</footer>" +
          "</html>", true));
  }
}
```
