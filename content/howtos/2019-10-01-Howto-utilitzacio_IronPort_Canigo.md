+++
date        = "2019-12-24"
title       = "Canigó. Com configurar i utilitzar IronPort a una aplicació Canigó"
description = "Howto per a configurar i utilitzar IronPort com a servidor SMTP per una aplicació Canigó"
section     = "howtos"
categories  = ["canigo"]
key         = "GENER2020"
+++

## Introducció

IronPort és el servidor SMTP que permet fer ús del servei de correu corporatiu de la Generalitat. Aquest how-to va dirigit a tots aquells perfils tècnics que tinguin la necessitat de configurar i utilitzar aquest servidor de SMTP per una aplicació Canigó.

El servei utilitza els equips IronPort de Cisco que, a banda de la gestió de les cues de correu, també incorpora un sistema de protecció contra correu no desitjat (Spam) i virus.

![IronPort](/images/howtos/Howto-utilitzacio_IronPort_Canigo.png)

## Mòdul de correu

Canigó proporciona, en el mòdul de suport de correu (mailing), serveis per a l'enviament de correus electrònics des d'una aplicació. Es pot incorporar automàticament el mòdul d’enviament de correu mitjançant l’eina de suport al desenvolupament, o bé afegir manualment la següent dependència en el pom.xml de l'aplicació:

```
<canigo.support.mailing.version>[2.0.0,2.2.0)</canigo.support.mailing.version>
<dependency>
    <groupId>cat.gencat.ctti</groupId>
    <artifactId>canigo.support.mailing</artifactId>
    <version>${canigo.support.mailing.version}</version>
</dependency>
```

Per a l’enviament de correus electrònics des d’una aplicació Canigó, des de la versió 1.3.0 es proporciona la interfície *cat.gencat.ctti.canigo.arch.support.mailing.FluentMailService*, seguint l’especificació Fluent Builder, així com la interfície ja deprecada *cat.gencat.ctti.canigo.arch.support.mailing.MailService*.

## Configuració per utilitzar IronPort
Per a poder utilitzar el servidor SMTP IronPort és necessari redefinir el "mailSender":

 ```xml
 <bean id="mailSender" parent="mailSenderParent" class="org.springframework.mail.javamail.JavaMailSenderImpl">
		<property name="javaMailProperties">
			<map>
				<entry key="mail.smtp.auth" value="${mail.auth}"/>
				<entry key="mail.smtp.starttls.enable" value="${mail.isSmtpSSLEnabled}"/>
				<entry key="mail.smtp.timeout" value="${mail.timeout}"/>
				<entry key="mail.smtps.debug" value="${mail.debug}"/>
			</map>
		</property>
	</bean>
  ```

I definir les següents propietats al fitxer "mail.properties":
   ```
*.mail.host=smtp-intranet.gencat.cat
*.mail.port=25
*.mail.protocol=smtp
*.mail.maxAttachmentSize=1048576
*.mail.defaultEncoding=UTF-8
*.mail.auth=true
*.mail.username=
*.mail.password=
*.mail.timeout=8500
*.mail.isSmtpSSLEnabled=false
*.mail.debug=true
   ```
 On:

 - mail.maxAttachmentSize: mida màxima permesa dels fitxers adjunts. Per defecte: 0 (sense límits).
 - mail.defaultEncoding: codificació de caràcters del correu electrònic.
 - mail.auth: s’indica si es requereix autenticació d’usuari.
 - mail.username: usuari.
 - mail.password: paraula de pas.
 - mail.timeout: temps d’espera de la connexió amb l’IronPort.
 - mail.isSmtpSSLEnabled: s’indica si s’estableix connexió segura SSL.
 - mail.debug: s’indica si es volen treure traces de debug de l'enviament del correu.

Amb aquesta configuració ja podem utilitzar els components "FluentMailService" o "MailService". A continuació adjuntem un exemple d’ús en un test:

```
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.mail.Message.RecipientType;
import javax.mail.MessagingException;
import javax.mail.internet.AddressException;

import org.junit.Assert;
import org.junit.Before;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import cat.gencat.ctti.canigo.arch.core.exceptions.ModuleException;
import cat.gencat.ctti.canigo.arch.support.mailing.impl.Attachment;
import cat.gencat.ctti.canigo.arch.support.mailing.to.InlineFile;

/**
 * Unit test for mailing service
 */
@RunWith(SpringJUnit4ClassRunner.class)
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
@ContextConfiguration(locations = { "classpath:spring/canigo-core.xml" })
public class MailServiceTest {
	@Autowired
	private MailService mailService;

	@Autowired
	private FluentMailService fluentMailService;

	private String from = "from@gencat.cat";
	private String subject = "This is a test!";
	private String aMessage = "Rigourous Test :-)";
	private boolean isHtml = true;
	private String to = "to@gencat.cat";

	@Before
	public void setUp() throws AddressException {
		Assert.assertNotNull(mailService);
		Assert.assertNotNull(fluentMailService);
	}

	/**
	 * Send with multiple attachment
	 *
	 * @throws ModuleException
	 * @throws MessagingException
	 * @throws IOException
	 */
	@Test
	public void check03SendMessageWithMultipleAttachment() throws ModuleException, MessagingException, IOException {

		List<File> fileAttachments = new ArrayList<File>();
		Attachment[] arrayAttachments = new Attachment[4];
		for (int i = 0; i < arrayAttachments.length; i++) {
			File file = File.createTempFile("temp", "test");
			fileAttachments.add(file);
			arrayAttachments[i] = new Attachment(file, false);
		}

		Map<RecipientType, Object> recipients = new HashMap<RecipientType, Object>();
		recipients.put(RecipientType.TO, to);
		String[] cc = { to };
		recipients.put(RecipientType.CC, cc);
		recipients.put(RecipientType.BCC, cc);

		mailService.send(from, subject, "check03SendMessageWithMultipleAttachment.mailService: " + aMessage, isHtml,
				recipients, fileAttachments);

		fluentMailService.send(fluentMailService.from(from).to(to).subject(subject)
				.message("check03SendMessageWithMultipleAttachment.fluentMailService: " + aMessage, isHtml)
				.attachments(arrayAttachments));

	}

	@Test
	public void check04SendMessageWithMultipleAttachmentInline()
			throws ModuleException, MessagingException, IOException {

		List<File> fileAttachments = new ArrayList<File>();
		Attachment[] arrayAttachments = new Attachment[1];
		for (int i = 0; i < arrayAttachments.length; i++) {
			File file = File.createTempFile("temp", "test");
			fileAttachments.add(new InlineFile(file, true));
			arrayAttachments[i] = new Attachment(file, true);
		}

		Map<RecipientType, Object> recipients = new HashMap<RecipientType, Object>();
		recipients.put(RecipientType.TO, to);
		String[] cc = { to };
		recipients.put(RecipientType.CC, cc);
		recipients.put(RecipientType.BCC, cc);

		mailService.send(from, subject, "check04SendMessageWithMultipleAttachmentInline.mailService: " + aMessage,
				isHtml, recipients, fileAttachments);

		fluentMailService.send(fluentMailService.from(from).to(to).subject(subject)
				.message("check03SendMessageWithMultipleAttachment.fluentMailService: " + aMessage, isHtml)
				.attachments(arrayAttachments));
	}

	/**
	 * Test exceptions. Bad
	 *
	 * @throws ModuleException
	 * @throws AddressException
	 * @throws IOException
	 *
	 */
	@Test
	public void check05SendMessageWithoutAttachment() throws ModuleException, AddressException, IOException {

		mailService.send(from, subject, "check05SendMessageWithoutAttachment.mailService: " + aMessage, isHtml, to);

		fluentMailService.send(fluentMailService.from(from).to(to).subject(subject)
				.message("check05SendMessageWithoutAttachment.fluentMailService: " + aMessage, isHtml));
	}
```

## Informació addicional

Podeu trobar més informació mitjançant els següents enllaços:

Manual SMTP:
[Manual per a la integració SMTP (IronPort)](https://portic.ctti.gencat.cat/solucions/soltecnologiques/_layouts/15/WopiFrame2.aspx?sourcedoc=/solucions/soltecnologiques/Documents/Lloc%20de%20Treball/10-02/CTTI_9.61_Integraci%c3%b3_SMTP_IronPort.pdf)

Principis d'arquitectura:
[Principis d'arquitectura de sistemes d'informació](/arqctti/principis_arq/)

Mòdul de correu:
[Documentació mòdul correu](/canigo-documentacio-versions-3x-suport/modul-correu/)