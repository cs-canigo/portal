+++
date        = "2015-03-19T11:25:26+01:00"
title       = "SAP"
description = "Interficie d'accés als Backends SAP de la Generalitat."
section     = "Canigó. Documentació versió 3.x"
weight      = 12
+++

## Propòsit

El propòsit del connector és proporcionar una interfície simplificada per accedir a backends SAP de la Generalitat.

## Instal.lació i Configuració

### Instal.lació

Per poder utilitzar el connector haurem de configurar el projecte perquè inclogui dues llibreries dll i diferents jars:

Les llibreries són sapjcorfc.dll i librfc32.dll i s'han de copiar al directori system32.

Per fer les operacions sobre el sistema SAP és necessària la utilització del jar sapjco-2.1.6, que és el connector propi del SAP per fer les crides a les seves funcions BAPI (RFC).

Les classes que utilitzarem per fer els objectes d'operacions estan en el jar del connector Gecat09 canigo-connectors-gecat09-2.3.2.jar

Les classes que utilitzarem per fer les operacions han estat generades amb una eina Open Source anomenada JAXB (Java API for Xml Binding), que genera classes java a partir d'un esquema de xml (XMLSchema). Aquesta eina ens permet no solament generar automàticament classes java sinó també fer validacions per comprovar que les dades que contenen els objectes són vàlides. Per això també haurem d'incloure els jars que necessita JAXB:

* jaxb-api-1.0.1.jar
* jaxb-libs-1.0.1.jar
* jaxb-impl-1.0.1.jar
* jax-qname-1.1.jar
* namespace-1.0.1.jar
* relaxngDatatype-1.0.1.jar
* xsdlib-1.1.2.jar

Per tal d'instal-lar el mòdul de SAP es pot incloure automàticament a través de l'eina de suport al desenvolupament o bé afegir manualment en el pom.xml de l'aplicació la següent dependència:

```
<canigo.integration.sap.version>[1.1.0,1.2.0)</canigo.integration.sap.version>
-
<dependency>
          <groupId>cat.gencat.ctti</groupId>
          <artifactId>canigo.integration.sap</artifactId>
          <version>${canigo.integration.sap.version}</version>
</dependency>
```

### Configuració

La configuració es realitza automàticament a partir de l'eina de suport al desenvolupament.

Ubicació: <PROJECT_ROOT>/src/main/resources/config/props/sap.properties

| Propietat                | Requerit     | Descripció
| ------------------------ | ------------ | --------------
| *.sap.client             | Sí           | Client
| *.sap.username           | Sí           | Usuari de connexió
| *.sap.password           | Sí           | Password de connexió
| *.sap.language           | Sí           | Idioma
| *.sap.hostname           | Sí           | Nom del servidor
| *.sap.systemNumber       | Sí           | SAP system number
| *.sap.connectionPool     | No           | Connexió amb pool. Per defecte: true
| *.sap.connectionPoolName | No           | Nom del pool. Per defecte: poolCanigoSAP
| *.sap.maxNumConnections  | No           | Número de connexions màximes. Per defecte: 5
| *.sap.repositoryName     | No           | Nom del repository. Per defecte: ARAsoft

## Utilització del Mòdul

### JSF

Per a configurar el mòdul és necessari:

    Crear un managed bean de JSF que contingui la lògica d'invocació al servei SAP.
    Pàgina JSF per a realitzar la invocació al managed bean.

**SAPBean.java**

Managed Bean de JSF que gestiona la crida al servei de SAP.

En aquest bean es pot veure:

* Inyecció del conector de SAP via annotacions (@Autowired) de Spring.
* Inyecció del servei d'internacionaliztació via annotacions (@Autowired) de Spring.
* Invocació de la funció BAPI_MATERIAL_GETLIST, taula MATNRSELECTION.
* Inserció del missatge de resultat de l'operació que posteriorment sera recuperat pel formulari JSF.
* En la classe MaterialBean s'introduirà el resultat de l'invocació de la funció SAP de manera transparent.

```java
/**
 * Classe d'exemple d'invocació al servei de SAP
 *
 * @author cscanigo
 *
 */
@Component("sapBean")
@Lazy
public class SAPBean {

    @Autowired
    private SapConnector connector;
    @Autowired
    private I18nResourceBundleMessageSource resource;

        /**
         * Execució de la funció SAP BAPI_MATERIAL_GETLIST
         *
         */
    public void execute(){
        try{
            this.connector.connect();
            Collection<Object> col = this.connector.executeFunction("BAPI_MATERIAL_GETLIST",
                    "MATNRSELECTION", null, MaterialBean.class);

            FacesContext.getCurrentInstance().addMessage("sapForm", new FacesMessage(
                    FacesMessage.SEVERITY_INFO, resource.getMessage("sapSuccess") + ": " + col.size(), null));
        }catch(Exception e){
            FacesContext.getCurrentInstance().addMessage("sapForm", new FacesMessage(
                    FacesMessage.SEVERITY_ERROR, resource.getMessage("sapError") + " - " + e.getMessage(), null));
        }finally{
            this.connector.disconnect();
        }
    }

}
```

**sap.jsf**

Invocació del métode "execute" del managed bean de JSF definit anteriorment com a "sapBean". El Tag message mostrarà el resultat de la crida (veure FacesContext.getCurrentInstance().addMessage("sapForm"....).

```
<h:form id="sapForm">
   <h:panelGrid columns="1">
      <h:commandButton value="#{msg.canigoSubmit}" action="#{sapBean.execute}" />
      <h:message for="sapForm" infoStyle="color: green;" errorStyle="color: red;" />
   </h:panelGrid>
</h:form>
```
