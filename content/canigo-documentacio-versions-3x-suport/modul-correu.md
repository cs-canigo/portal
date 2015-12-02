+++
date        = "2015-03-27T12:45:04+01:00"
title       = "Correu"
description = "Enviament de correu electrònic."
section     = "Documentació versió 3.x"
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

```
<canigo.support.mailing.version>[1.1.0,1.2.0)</canigo.support.mailing.version>

<dependency>
	<groupId>cat.gencat.ctti</groupId>
	<artifactId>canigo.support.mailing</artifactId>
	<version>${canigo.support.mailing.version}</version>
</dependency>
```

### Configuració

La configuració es realitza automàticament a partir de la eina de suport al desenvolupament.

L'eina de desenvolupament genera automàticament el fitxer de propietats necessari per a la configuració del servei.

Ubicació proposada: <PROJECT_ROOT>/src/main/resources/config/props/mail.properties

Propietat                | Requerit | Descripció
------------------------ | -------- | ----------
*.mail.host              | Sí       | Nom del servidor de correu sortint (smtp).
*.mail.port              | No       | Port del servidor de correu sortint (smtp). Valor per defecte: -1.
*.mail.protocol          | No       | Protocol del servidor de correu sortint (smtp).
*.mail.username          | No       | Usuari de connexió al servidor de correu sorting (smtp).
*.mail.password          | No       | Password de l'usuari de connexió.
*.mail.maxAttachmentSize | No       | Tamany màxim permés dels fitxers adjunts. Per defecte: 0 (sense limits).
*.mail.isSmtpSSLEnabled  | No       | Habilitar o deshabilitar SSL.
*.mail.debug             | No       | Activar les traces de debug.
*.mail.timeout           | No       | Timeout pel servidor de correu.

Per poder utilitzar correctament les propietats isSmtpSSLEnabled, debug i timeout s'ha de declarar un bean com aquest:

```
<bean id="mailSender" parent="mailSenderParent" class="org.springframework.mail.javamail.JavaMailSenderImpl">
	<property name="javaMailProperties">
		<map>
			<entry key="mail.smtp.auth" value="${mail.isSmtpSSLEnabled}"/>
			<entry key="mail.smtp.starttls.enable" value="${mail.isSmtpSSLEnabled}"/>
			<entry key="mail.smtp.timeout" value="${mail.timeout}"/>
			<entry key="mail.smtps.debug" value="${mail.debug}"/>
		</map>
	</property>
</bean>
```

que es recomana declarar en l'arxiu app-support-mailing.xml que s'ha de situar en /src/main/resources/spring/

## Utilització del Mòdul

### JSF

Per a utilitzar aquest mòdul, cal crear un bean i una jsf:

**mailingBean.java**

```java
package cat.gencat.ctti.canigo.app.bean;

import javax.faces.application.FacesMessage;
import javax.faces.context.FacesContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import cat.gencat.ctti.canigo.arch.core.i18n.I18nResourceBundleMessageSource;
import cat.gencat.ctti.canigo.arch.support.mailing.MailService;

@Component("mailingBean")@Scope("request")
public class MailingBean {

	private MailService service;
	private String to;
	private String subject;
	private String from;
	private String cc;
	private String cco;
	private String body;@Autowired
	private I18nResourceBundleMessageSource messageResource;
	private String result;

	public String getResult() {
		if (result\ != null) {
			return messageResource.getMessage(result);
		} else {
			return "";
		}
	}

	public String getTo() {
		return to;
	}
	
	public void setTo(String to) {
		this.to = to;
	}
	
	public String getSubject() {
		return subject;
	}
	
	public void setSubject(String subject) {
		this.subject = subject;
	}
	
	public String getFrom() {
		return from;
	}
	
	public void setFrom(String from) {
		this.from = from;
	}
	
	public String getCc() {
		return cc;
	}
	
	public void setCc(String cc) {
		this.cc = cc;
	}
	
	public String getCco() {
		return cco;
	}
	
	public void setCco(String cco) {
		this.cco = cco;
	}
	
	public String getBody() {
		return body;
	}
	
	public void setBody(String body) {
		this.body = body;
	}
	
	public MailService getService() {
		return service;
	}
	
	@Autowired
	public void setService(MailService service) {
		this.service = service;
	}
   
    /**
    * Send mail
    */
    String sendMail() {
        try {
            this.service.send(getFrom(), getSubject(), getBody(), false, getTo());
            FacesContext.getCurrentInstance().addMessage("mailingForm", new FacesMessage(FacesMessage.SEVERITY_INFO, messageResource.getMessage("mailingSuccces"), null));
            this.result = "mailingSuccces";
        } catch (Exception e) {
            FacesContext.getCurrentInstance().addMessage("mailingForm", new FacesMessage(FacesMessage.SEVERITY_ERROR, e.getMessage(), null));
            this.result = "mailingError";
        }
        return "mail";
    }
}
```

**mailing.jsf**

```
<?xml version="1.0" encoding="ISO-8859-1" standalone="yes" ?>
<html xmlns="http://www.w3.org/1999/xhtml"
xmlns:ui="http://java.sun.com/jsf/facelets"
xmlns:f="http://java.sun.com/jsf/core"
xmlns:h="http://java.sun.com/jsf/html"
xmlns:c="http://java.sun.com/jstl/core"
xmlns:val="http://shale.apache.org/validator">

<ui:composition template="layouts/template.jsf">
<ui:define name="ariadna">
<h:outputLink value="index.jsf">
<h:outputFormat>#
{msg.breadCrumbInit}
</h:outputFormat>
</h:outputLink>
</ui:define>
<ui:define name="body">
<h1>$
{msg.menuSupportMailing}
</h1>
<h:form id="mailingForm" onsubmit="return validateForm(this);">
<h:panelGrid columns="3">
<h:outputText value="#
{msg.mailingTo}:" />


arg="#{msg.mailingTo}
"
server="true"
client="true"/>
<val:commonsValidator type="email"
arg="#
{msg.mailingTo}
"
server="true"
client="true"/>
</h:inputText>
<h:message for="to" errorStyle="color: red;" />
<h:outputText value="#
{msg.mailingFrom}:" />


arg="#{msg.mailingFrom}
"
server="true"
client="true"/>
<val:commonsValidator type="email"
arg="#
{msg.mailingFrom}
"
server="true"
client="true"/>
</h:inputText>
<h:message for="from" errorStyle="color: red;" />
<h:outputText value="#
{msg.mailingCC}
:" />
<h:inputText id="cc" value=""/>
<h:message for="cc" errorStyle="color: red;" />
<h:outputText value="#
{msg.mailingCCO}
:" />
<h:inputText id="cco" value=""/>
<h:message for="cco" errorStyle="color: red;" />
<h:outputText value="#
{msg.mailingSubject}:" />


arg="#{msg.mailingSubject}
"
server="true"
client="true"/>
</h:inputText>
<h:message for="subject" errorStyle="color: red;" />
<h:outputText value="#
{msg.mailingBody}
:" />
<h:inputTextarea id="body"/>
<h:commandButton value="#
{msg.canigoSubmit}
" action="#
{mailingBean.sendMail}
" />
<br/>
<h:outputText value="#
{mailingBean.result}
"/>
<h:message for="mailingForm" infoStyle="color: green;" errorStyle="color: red;" />
<val:validatorScript functionName="validateForm"/>
</h:panelGrid>
</h:form>
</ui:define>
</ui:composition>
</html>
```

### STRUTS+TAGLIBS

Per a utilitzar el mòdul cal crear el fitxer de configuració una Acció i una JSP:

**app-mailing.xml**

```
<bean name="/mailing" class="cat.gencat.ctti.canigo.demo.mailing.MailingAction" scope="prototype">
    <property name="pojoClass" value="cat.gencat.ctti.canigo.demo.mailing.MailingPojo"></property>
    <property name="mailService" ref="mailService"></property><\!-\- Configuració dels tags \-->
    <property name="tagsConfiguration">
        <map>
            <entry key="*">
                <list>
                    <bean parent="formTag">
                        <property name="styleId" value="actionForm"></property>
                        <property name="layout" value="true"/>
                        <property name="validationProperties">
                            <props>
                                <prop key="validationType">SERVER</prop>
                                <prop key="validatorName">mailingValidations</prop>
                            </props>
                        </property>
                    </bean>
                    <bean parent="textFieldTag">
                        <property name="styleId" value="textField"></property>
                        <property name="layout" value="true"/>
                        <property name="mode" value="E,E,E"></property>
                    </bean>
                    <bean parent="textFieldTag">
                        <property name="styleId" value="labelField"></property>
                        <property name="layout" value="false"/>
                        <property name="mode" value="I,H,I"></property>
                    </bean>
                    <bean parent="textFieldTag">
                        <property name="styleId" value="ocult"></property>
                        <property name="layout" value="false"/>
                        <property name="mode" value="H,H,H"></property>
                    </bean>
                    <bean parent="submitTag">
                        <property name="styleId" value="validaSubmit"/>
                        <property name="mode" value="D,D,D"/>
                        <property name="reqCode" value="enviaMail"/>
                        <property name="key" value="forms.buttons.send"/>
                    </bean>
                    <bean parent="fileFieldTag">
                        <property name="styleId" value="Arxiu"></property>
                        <property name="layout" value="false"></property>
                        <property name="mode" value = "E,E,E"></property>
                    </bean>
                    <bean parent="checkboxFieldTag">
                        <property name="styleId" value="checkbox"></property>
                        <property name="layout" value="false"></property>
                        <property name="mode" value = "E,E,E"></property>
                    </bean>
                    <bean parent="textAreaFieldTag">
                        <property name="styleId" value="textAreaDescripcio" />
                        <property name="rows" value="3" />
                        <property name="cols" value="30" />
                        <property name="layout" value="true"/>
                    </bean>
                </list>
            </entry>
        </map>
    </property>
</bean>
```  

**MailingAction.java**

```java
public class MailingAction extends DispatchActionSupport {

	private final String FORWARD_SUCCESS = "success";

	private static final Log log = LogFactory.getLog(MailingAction.class);

	private MailService mailService;

	/**
	 * Mètode que es crida pel reqCode=inici
	 * @param mapping ActionMapping
	 * @param form ActionForm
	 * @param request HttpServletRequest
	 * @param response HttpServletResponse
	 * @return ActionForward
	 * @throws Exception exception
	 */
	public ActionForward send(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		log.info("MailingAction [inici] - Inici");...mailService.send(from, subject, body, false, llistaMails, llistaAttachment);...
		return mapping.findForward(FORWARD_SUCCESS);
	}

	public MailService getMailService() {
		return mailService;
	}
	public void setMailService(MailService mailService) {
		this.mailService = mailService;
	}
}
```

**mailing.jsp**

```
<fwk:form styleId="actionForm" action="serveisGeneralsCorreu.do" method="POST" enctype="multipart/form-data">
    <!-- INICI HIDDENS -->
    <fwk:text styleId="ocult" property="reqCode"></fwk:text>
    <!-- FI HIDDENS -->
    <table class="striped_box" width="100%" border="0" cellspacing="0px">
        <fwk:row>
            <fwk:text styleId="textField" property="to" key="label.serveisgenerals.correu.to"></fwk:text>
        </fwk:row>
        <fwk:row>
            <fwk:text styleId="textField" property="from" key="label.serveisgenerals.correu.from"></fwk:text>
        </fwk:row>
        <fwk:row>
            <fwk:text styleId="textField" property="cc" key="label.serveisgenerals.correu.cc"></fwk:text>
        </fwk:row>
        <fwk:row>
            <fwk:text styleId="textField" property="cco" key="label.serveisgenerals.correu.cco"></fwk:text>
        </fwk:row>
        <fwk:row>
            <fwk:text styleId="textField" property="subject" key="label.serveisgenerals.correu.subject" ></fwk:text>
        </fwk:row>
        <fwk:row>
            <fwk:textarea styleId="textAreaDescripcio" property="body" key="label.serveisgenerals.correu.body"></fwk:textarea>
        </fwk:row>
        <fwk:row>
            <fwk:file styleId="Arxiu" property="arxiu" key="label.serveisgenerals.correu.arxiu"></fwk:file>
            <fwk:checkbox styleId="inline" property="isInline" key="label.serveisgenerals.correu.isInline"></fwk:checkbox>
        </fwk:row>
        <fwk:row>
            <fwk:submit styleId="validaSubmit"></fwk:submit>
        </fwk:row>
    </table>
</fwk:form>
```
