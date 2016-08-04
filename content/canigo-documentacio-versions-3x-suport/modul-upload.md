+++
date        = "2015-03-27T13:52:15+01:00"
title       = "Pujada d'arxius"
description = "Pujada d'arxius al servidor."
sections    = "Canigó. Documentació versió 3.x"
weight      = 5
+++

## Propòsit

Aquest mòdul permet al servidor obtenir fitxers adjunts als formularis HTML de client. A més aquest mòdul permet llegir el fitxer de forma directa, deser-lo al sistema de fitxers, emmagatzemar-lo en una base de dades o enllaçar-ho amb altres mòduls com pot ser el servei d'antivirus.

## Instal.lació i Configuració

### Instal.lació

Per tal d'instal-lar el mòdul d'upload de fitxers es pot incloure automàticament a través de l'eina de suport al desenvolupament o bé afegir manualment en el pom.xml de l'aplicació la següent dependència:

```
<canigo.support.fileupload.version>[1.1.0,1.2.0)</canigo.support.fileupload.version>

<dependency>
  <groupId>cat.gencat.ctti</groupId>
  <artifactId>canigo.support.fileupload</artifactId>
  <version>${canigo.support.fileupload.version}</version>
</dependency>
```

#### JSF

Per aplicacions Canigó 3 basades en JSF 2.2 s'ha d'afegir la següent dependència amb la llibreria MyFaces Tomahawk, automàticament a través de l'eina de suport al desenvolupament o bé afegint-la manualment en el pom.xml de l'aplicació:

```
<tomahawk>1.1.14</tomahawk>
<dependency>
    <groupId>org.apache.myfaces.tomahawk</groupId>
    <artifactId>tomahawk21</artifactId>
    <version>${tomahawk}</version>
    <exclusions>
        <exclusion>
            <artifactId>commons-validator</artifactId>
            <groupId>commons-validator</groupId>
        </exclusion>
        <exclusion>
            <artifactId>itext</artifactId>
            <groupId>com.lowagie</groupId>
        </exclusion>
        <exclusion>
            <artifactId>jstl</artifactId>
            <groupId>javax.servlet</groupId>
        </exclusion>
        <exclusion>
            <artifactId>commons-logging</artifactId>
            <groupId>commons-logging</groupId>
        </exclusion>
        <exclusion>
            <artifactId>batik-awt-util</artifactId>
            <groupId>org.apache.xmlgraphics</groupId>
        </exclusion>
    </exclusions>
</dependency>
```

### Configuració

La configuració es realitza automàticament a partir de la eina de suport al desenvolupament.

#### JSF

En el cas d'utilitzar la opció de JSF, el que fa és afegir al web.xml el següent filtre per a interceptar les peticions multipart/form-data:

```
<filter>
    <filter-name>Extensions Filter</filter-name>
    <filter-class>org.apache.myfaces.webapp.filter.ExtensionsFilter</filter-class>
    <init-param>
        <param-name>uploadMaxFileSize</param-name>
        <param-value>20m</param-value>
        <description>Set the size limit for uploaded files.
            Format: 10 - 10 bytes
                    10k - 10 KB
                    10m - 10 MB
                    1g - 1 GB
        </description>
    </init-param>
</filter>
<filter-mapping>
    <filter-name>Extensions Filter</filter-name>
    <url-pattern>*.jsf</url-pattern>
</filter-mapping>
```

Cal afegir manualment en la jsf la següent capçalera:

```
xmlns:t="http://myfaces.apache.org/tomahawk"
```

#### Struts + Taglibs

En el cas d'utilitzar la opció d'Struts + Taglibs, la configuració del servei es realitza mitjançant un fitxer de propietats.

Ubicació proposada: <PROJECT_ROOT>/src/main/resources/config/props/fileupload.properties

Propietat | Requerit | Descripció
--------- | -------- | ----------
*.fileUpload.defaultEncoding | No | Direcció IP del servidor Engine Scan del CTTI, responsable dels escaneigs.
*.fileUpload.maxUploadSize   | No | Màxim tamany permés abans que es rebutgin els fitxers. Valor per defecte: -1(no hi ha límit).
*.fileUpload.maxInMemorySize | No | Màxim tamany permés en bytes abans de guardar en disc. Valor per defecte: 10240 (bytes).
*.fileUpload.launchExceptionIfVirusDetected | No | Opció només disponible per a la integració del fileupload i antivirus. Indica si es llençarà una excepció al servei en el cas de que es trobi un virus en l'arxiu pujat. Valor per defecte: true.

## Utilització del Mòdul

### JSF

Per a utilitzar aquest mòdul, cal crear un bean i una jsf:

***fileUploadBean.java***

```java
@Component("fileUploadBean")
@Scope("singleton")
@Lazy
public class FileUploadBean {

	@Autowired
	private I18nResourceBundleMessageSource messageResource;
	private UploadedFile uploadedFile;

	public void submit() {

		try {
			if(getUploadedFile()!=null & getUploadedFile().getBytes()!=null){
				// Show succes message.
			    FacesContext.getCurrentInstance().addMessage("uploadForm", new FacesMessage(
			        FacesMessage.SEVERITY_INFO, messageResource.getMessage("fileUploadSuccess"), null));
			}else{
				// Show succes message.
			    FacesContext.getCurrentInstance().addMessage("uploadForm", new FacesMessage(
			        FacesMessage.SEVERITY_ERROR, messageResource.getMessage("fileUploadError"), null));
			}
		} catch (IOException e) {
			FacesContext.getCurrentInstance().addMessage("uploadForm", new FacesMessage(
			        FacesMessage.SEVERITY_ERROR, messageResource.getMessage("fileUploadError"), null));
		}

	}

	public UploadedFile getUploadedFile() {
		return uploadedFile;
	}

	public void setUploadedFile(UploadedFile uploadedFile) {
		this.uploadedFile = uploadedFile;
	}

}
```

**fileUpload.jsf**

```
<h:form id="uploadForm" enctype="multipart/form-data">
    <h:panelGrid columns="3">
        <h:outputLabel for="file" value="#{msg.fileUploadSelectFile}" />
        <t:inputFileUpload id="file" value="#{fileUploadBean.uploadedFile}" required="true" />
        <h:message for="file" style="color: red;" />
        <h:panelGroup />
        <h:commandButton value="#{msg.canigoSubmit}" action="#{fileUploadBean.submit}" />
        <h:message for="uploadForm" infoStyle="color: green;" errorStyle="color: red;" />
    </h:panelGrid>
</h:form>

```

### STRUTS+TAGLIBS

Per a utilitzar el mòdul cal crear una Acció i una JSP:

**app-fileupload.xml**

```
<bean name="/fileUpload" class="cat.gencat.ctti.canigo.demo.fileupload.FileUploadAction" scope="prototype">
    <property name="pojoClass" value="cat.gencat.ctti.canigo.demo.fileupload.FileUploadPojo"></property>
    <property name="fileUpload" ref="fileUploadService" />
    <!-- Configuració dels tags -->
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
                                <prop key="validatorName">uploadValidations</prop>
                            </props>
                        </property>
                    </bean>
                    <bean parent="submitTag">
                        <property name="styleId" value="uploadSubmit"/>
                        <property name="mode" value="N,D,N"/>
                        <property name="reqCode" value="valida"/>
                        <property name="key" value="forms.buttons.valida"/>
                        <bean parent="fileFieldTag">
                            <property name="styleId" value="fileText"></property>
                            <property name="layout" value="false"></property>
                            <property name="mode" value = "E,E,E"></property>
                        </bean>
                    </bean>
                </list>
            </entry>
        </map>
    </property>
</bean>
```

**FileUploadAction.java**

```java
public class FileUploadAction extends DispatchActionSupport {

	private final String FORWARD_SUCCESS = "success";

	private static final Log log = LogFactory.getLog(FileUploadAction.class);

	private FileUploadService fileUpload;


	/**
	 * Mètode que es crida pel reqCode=inici
	 * @param mapping ActionMapping
	 * @param form ActionForm
	 * @param request HttpServletRequest
	 * @param response HttpServletResponse
	 * @return ActionForward
	 * @throws Exception exception
	 */
	public ActionForward upload(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		log.info("FileUploadAction [inici] - Inici");

		SpringBindingActionForm actionForm = (SpringBindingActionForm)form;
		FileUploadPojo pojo = (FileUploadPojo) actionForm.getTarget();

		String[] UPLOADED_FILES = new String[] { "fitxer" };
		UploadedFiles uploadedFiles = this.fileUpload.getUploadedFiles(request, UPLOADED_FILES);
		UploadedFile fitxerCarregat = uploadedFiles.getFile("fitxer");

		return mapping.findForward(FORWARD_SUCCESS);
	}

	public FileUploadService getFileUpload() {
		return fileUpload;
	}

	public void setFileUpload(FileUploadService fileUpload) {
		this.fileUpload = fileUpload;
	}
}
```

**fileUpload.jsp**

```
<fwk:form styleId="actionForm" action="sfileUpload.do?reqCode=upload" method="POST" enctype="multipart/form-data">
	<fwk:row>
		<fwk:file styleId="fileText" property="fitxer" key="label.fileupload.path"></fwk:file>
	</fwk:row>
	<fwk:row>
		<fwk:submit styleId="uploadSubmit"></fwk:submit>
	</fwk:row>
</fwk:form>
```
