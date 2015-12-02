+++
date        = "2015-04-02T11:06:02+02:00"
title       = "Fusió de documents"
description = "Mòdul de fusió de documents."
section     = "Documentació versió 3.x"
weight      = 2
+++

## Propòsit

Aquest servei permet aplicar un conjunt de canvis definits per un diccionari sobre un document en format WordML.

Es parteix d'un document que conté un o més marcadors que han de ser substituits i d'un conjunt de diccionaris de substitució.

Per cada un dels diccionaris de substitució, el servei de merging realitza la substitució de cada marcador pel valor indicat en el diccionari i el resultat és un nou document, també en format WordML.

Els marcadors consisteixen en una marca d'inici, un texte-clau i una marca de final.

## Instal.lació i Configuració

### Instal.lació

Per tal d'instal-lar el mòdul de fusió es pot incloure automàticament a través de l'eina de suport al desenvolupament o bé afegir manualment en el pom.xml de l'aplicació la següent dependència:

```
<canigo.support.merging.version>[1.1.0,1.2.0)</canigo.support.merging.version>

<dependency>
    <groupId>cat.gencat.ctti</groupId>
    <artifactId>canigo.support.merging</artifactId>
    <version>${canigo.support.merging.version}</version>
</dependency>
```

### Configuració

La configuració es realitza automàticament a partir de la eina de suport al desenvolupament.

L'eina de desenvolupament genera automàticament el fitxer de propietats necessari per a la configuració del servei.

Ubicació proposada: <PROJECT_ROOT>/src/main/resources/config/props/merging.properties

Propietat              | Requerit | Descripció
---------------------- | -------- | ---------------------------------------------------------------------
*.merging.initBookmark | No       | Marca d'inici del texte a substituir (2 caràcters). Per defecte: @@.
*.merging.endBookmark  | No       | Marca de final del texte a substituir (2 caràcters). Per defecte: ##h2. Utilització del Mòdul.

### Utilització del Mòdul

#### JSF

Per a utilitzar aquest mòdul, cal crear un bean i una jsf:

**mergingBean.java**

```java
@Component("mergingBean")
@Scope("singleton")
@Lazy
public class MergingBean {
	private String name;
	private String text;
	@Autowired
	private MergeTemplateEngine engine;
	@Autowired
	private I18nResourceBundleMessageSource messageResource;


	public MergeTemplateEngine getEngine() {
		return engine;
	}

	/**
	 * Get name
	 * @return
	 */
	public String getName() {
		return name;
	}

	/**
	 * Set name
	 * @param name
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * Get text
	 * @return
	 */
	public String getText() {
		return text;
	}

	/**
	 * Set text
	 * @param text
	 */
	public void setText(String text) {
		this.text = text;
	}

	/**
	 * Merge document
	 */
	public void merge(){
		Map<String,String> itemsMap = new HashMap<String,String>();
		itemsMap.put("name", getName());
		itemsMap.put("text", getText());

		List<Map<String,String>> dades = new ArrayList<Map<String,String>>();
		dades.add(itemsMap);

		try{
			InputStream is = Thread.currentThread().getContextClassLoader().getResourceAsStream("TestDoc.xml");
			ByteArrayOutputStream[] os = getEngine().mergeTemplate(is, dades);

			HttpServletResponse response = (HttpServletResponse) FacesContext.getCurrentInstance()
			.getExternalContext().getResponse();
			response.setContentType("application/xml");
			response.setHeader("Content-Disposition", "attachment;filename=\"" +
			         "test.xml" + "\"");
			response.setContentLength(os[0].size());
			ServletOutputStream ouputStream = response.getOutputStream();
			ouputStream.flush();
			ouputStream.write(os[0].toByteArray(), 0, os[0].size());
			ouputStream.flush();
			ouputStream.close();
			FacesContext.getCurrentInstance().responseComplete();

			FacesContext.getCurrentInstance().addMessage("mergingForm", new FacesMessage(
                    FacesMessage.SEVERITY_INFO, getMessageResource().getMessage("mergingSuccess"), null));

		}catch(Exception e){
			FacesContext.getCurrentInstance().addMessage("mergingForm", new FacesMessage(
	                FacesMessage.SEVERITY_ERROR, "mergingError", null));
		}

	}

	public I18nResourceBundleMessageSource getMessageResource() {
		return messageResource;
	}

}
```  

**merging.jsf**

```
<?xml version="1.0" encoding="ISO-8859-1" standalone="yes" ?>
<html xmlns="http://www.w3.org/1999/xhtml"
	xmlns:ui="http://java.sun.com/jsf/facelets"
	xmlns:f="http://java.sun.com/jsf/core"
	xmlns:h="http://java.sun.com/jsf/html"
	xmlns:c="http://java.sun.com/jstl/core">


	<ui:composition template="layouts/template.jsf">
		<ui:define name="ariadna">
			<h:outputLink value="index.jsf">
				<h:outputFormat>#{msg.breadCrumbInit}</h:outputFormat>
			</h:outputLink>
		</ui:define>
		<ui:define name="body">
			<h1>#{msg.menuSupportMerging}</h1>
			<h:form id="mergingForm">
                <h:panelGrid columns="2">
                	<h:outputText value="Name:" />
                	<h:inputText id="name" value="#{mergingBean.name}"/>
                	<h:outputText value="Text:" />
                	<h:inputTextarea id="text" value="#{mergingBean.text}"/>
                    <h:commandButton value="#{msg.canigoSubmit}" action="#{mergingBean.merge}" />
                    <br/>
                    <h:message for="mergingForm" infoStyle="color: green;" errorStyle="color: red;" />
                </h:panelGrid>
            </h:form>
		</ui:define>
	</ui:composition>

</html>
```
