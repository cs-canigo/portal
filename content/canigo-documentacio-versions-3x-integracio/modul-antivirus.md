+++
date        = "2015-03-19T12:06:35+01:00"
title       = "Antivirus"
description = "Accés a l'escaneig d'arxius mitjançant el servei d'antivirus Centrals del CTTI."
section     = "Canigó. Documentació versió 3.x"
weight      = 1
+++

## Propòsit

Aquest mòdul permet l'escaneig d'arxius mitjançant el servei d'antivirus Centrals del CTTI.

## Instal.lació i Configuració

### Instal.lació

Per tal d'instal-lar el mòdul d'Antivirus es pot incloure automàticament a través de l'eina de suport al desenvolupament o bé afegir manualment en el pom.xml de l'aplicació la següent dependència:

```
<canigo.integration.antivirus.version>[1.2.0,1.3.0)</canigo.integration.antivirus.version>

<dependency>
    <groupId>cat.gencat.ctti</groupId>
    <artifactId>canigo.integration.antivirus</artifactId>
    <version>${canigo.integration.antivirus.version}</version>
</dependency>
```

### Configuració

La configuració es realitza automàticament a partir de la eina de suport al desenvolupament.

Ubicació proposada: <PROJECT_ROOT>/src/main/resources/config/props/antivirus.properties

Propietat                              | Requerit | Descripció
-------------------------------------- | -------- | ----------
*.antivirus.remote                     | Sí       | Paràmetre que indica si l'escaneig dels arxius es realitza de forma remota o no. Si fos de forma remota l'arxiu a escanejar s'ha de pujar abans al servidor d'antivirus centrals, procés que fa automàticament el mòdul. En cas de remote a fals s'enten que l'arxiu ja es troba pujat al servidor d'antivirus centrals. <br>Valor per defecte: true
*.antivirus.serverIp                   | Sí       | IP del Host on es troba el Servidor d'antivirus Centrals.<br>  antivirus.gencat.intranet per entorns productius <br> preproduccio.antivirus.gencat.intranet per entorns preproductius i d'altres
*.antivirus.serverPort                 | Sí       | Port del Host on es troba el Servidor d'antivirus Centrals.<br> Valor per defecte: 1344
*.antivirus.numDayDBExpirationWarning  | Sí       | Número de dies que han de passar per que una definició de virus de la base de dades d'antivirus centrals es consideri caducada. <br>Valor per defecte: 15

## Utilització del Mòdul

Per a utilizar aquest mòdul s'ha de demanar la llibreria sym-7.5.jar enviant un correu a la bústia canigó <oficina-tecnica.canigo.ctti@gencat.cat>

### JSF

Per a configurar el mòdul és necessari:

* Crear un managed bean de JSF que contingui la lògica d'invocació al servei d'antivirus.
* Pàgina JSF per a realitzar la invocació al managed bean.

**AntivirusBean.java**

Managed Bean de JSF que gestiona la crida al servei d'antivirus.

En aquest bean es pot veure:

** Inyecció del servei d'antivirus via annotacions (@Autowired) de Spring.
** Inserció del missatge de resultat de l'operació que posteriorment sera recuperat pel formulari JSF.

```java
/**
 * Classe d'exemple d'invocació al servei d'antivirus
 *
 * @author cscanigo
 *
 */
@Component("antivirusBean")
@Lazy
public class AntivirusBean {

    private static final Log log = LogFactory.getLog(AntivirusBean.class);

    @Autowired
    private Antivirus service;

    private UploadedFile upFile;


        /**
         * Getter file
         * @return file
         */
    public UploadedFile getUpFile(){
        return upFile;
    }

        /**
         * Setter file
         * @param file
         */
    public void setUpFile(UploadedFile upFile){
        this.upFile = upFile;
    }

         /**
         * Escaneig de l'arxiu pujat al servidor
         *
         */
    public void scan(){
        String resultat = null;
        log.info("AntivirusAction [scan] - Inici");
        ResultatEscaneig res = null;
        try {

            res = service.scan(getUpFile().getBytes());

            if (res != null) {
                switch (res.getEstat()) {
                case 0:
                    log.info("AntivirusAction [scan] - arxiu sense Virus");
                    resultat = "Arxiu sense Virus";
                    break;
                case -1:
                    log.info("AntivirusAction [scan] - arxiu amb Virus!");
                    StringBuffer sb = new StringBuffer();
                    sb.append("Arxiu amb Virus!");
                    if(res.getArrayVirus()!=null){
                        for(InfectionInfo i : res.getArrayVirus()){
                            sb.append(i.getFileName() + " - " + i.getViolationName() + "; ");
                        }
                        resultat = sb.toString();
                    }
                    break;
                case 1:
                    log.info("AntivirusAction [scan] - Warning");
                    resultat = res.getMissatge();
                    break;
                default:
                    log.info("AntivirusAction [scan] - Error en el procés d'escaneig");
                    resultat = "S'ha produit un error";
                }
            }

            FacesContext.getCurrentInstance().addMessage("antivirusForm", new FacesMessage(
                    FacesMessage.SEVERITY_INFO, "Resultat del escaneig: " + resultat, null));

            log.info("AntivirusAction [scan] - Final");
        } catch (AntivirusException ae) {
            log.error("AntivirusException - Antivirus ("+ service.getClass()+"): " + service
                    + " " + ae.getStackTrace());
            FacesContext.getCurrentInstance().addMessage("antivirusForm", new FacesMessage(
                    FacesMessage.SEVERITY_ERROR, "Resultat del escaneig: " + ae.getMessage(), null));
        } catch (IOException e) {
            log.error("AntivirusException - Antivirus ("+ service.getClass()+"): " + service
                    + " " + e.getStackTrace());
            FacesContext.getCurrentInstance().addMessage("antivirusForm", new FacesMessage(
                    FacesMessage.SEVERITY_ERROR, "Resultat del escaneig: " + e.getMessage(), null));
        }
    }
}
```

**antivirus.jsf**

Invocació del métode "scan" del managed bean de JSF definit anteriorment com a "antivirusBean". El Tag message mostrarà el resultat de la crida (veure FacesContext.getCurrentInstance().addMessage("antivirusForm"....).

```
<?xml version="1.0" encoding="ISO-8859-1" standalone="yes" ?>
<html xmlns="http://www.w3.org/1999/xhtml"
    xmlns:ui="http://java.sun.com/jsf/facelets"
    xmlns:f="http://java.sun.com/jsf/core"
    xmlns:h="http://java.sun.com/jsf/html"
    xmlns:c="http://java.sun.com/jstl/core"
    xmlns:t="http://myfaces.apache.org/tomahawk">


<ui:composition template="layouts/template.jsf">
    <ui:define name="ariadna">
        <h:outputLink value="index.jsf">
            <h:outputFormat>#{msg.breadCrumbInit}</h:outputFormat>
        </h:outputLink>
    </ui:define>
    <ui:define name="body">
        <h1>${msg.menuIntegrationAntivirus}</h1>
        <h:form id="antivirusForm" enctype="multipart/form-data">
            <h:panelGrid columns="1">
                <t:inputFileUpload id="fileupload" value="#{antivirusBean.upFile}"    size="20" />
                <h:commandButton value="#{msg.antivirusUploadFile}" action="#{antivirusBean.scan}" />
                <h:message for="antivirusForm" infoStyle="color: green;" errorStyle="color: red;" />
            </h:panelGrid>
        </h:form>
    </ui:define>
</ui:composition>

</html>
```
<div class="message warning">
Pujada d'arxius al servidor<br>
Per a l'exemple s'ha fet servir a més el mòdul de fileupload per tal de gestionar la pujada d'arxius al servidor i el posterior escaneig d'aquest.
</div>
