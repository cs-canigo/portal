+++
date        = "2015-03-19T16:01:37+01:00"
title       = "Enotum"
description = "Connector de la Pica que simplifica l'utilització del servei de Notificacions Telemàtiques de la Generalitat."
section     = "Canigó. Documentació versió 3.x"
weight      = 5
+++

## Propòsit

El propòsit del connector és proporcionar una interfície funcional reduida al connector de la Pica que simplifica l'utilització del servei de Notificacions Telemàtiques de la Generalitat.

## Descripció Detallada

Aquest connector permet realitzar les següents funcionalitats referents a les notificacions telemàtiques:

Funcionalitats per a l'empleat públic:

* Enviar tramesa: Creació d'una nova tramesa de notificacions telemàtiques al sistema E-Notum per part del sistema requeridor de notificacions telemàtiques.
* Consultar estat tramesa: Consulta de l'estat d'una tramesa de notificacions telemàtiques per part del sistema requeridor de notificacions telemàtiques.
* Consultar notificacions destinatari: Consulta de les notificacions telemàtiques adreçades al destinatari.
* Consultar detall notificació: Visualització d'una notificació telemàtica per part d'un empleat públic.
* Consultar evidències notificació: Consulta de les evidències d'una notificació telemàtica gestionades per eNotum.

Funcionalitats per al ciutadà:

* Consultar detall notificació: Visualització d'una notificació telemàtica per part del destinatari.
* Consultar notificacions destinatari: Consulta de les notificacions telemàtiques adreçades al destinatari.
* Modificar estat notificació: Permet canviar l'estat d'una notificació telemàtica, per qüestions de seguretat un usuari només pugui canviar d'estat les seves pròpies notificacions.

## Instal.lació i Configuració

### Instal.lació

Per tal d'instal-lar el mòdul de notificacions electròniques es pot incloure automàticament a través de l'eina de suport al desenvolupament o bé afegir manualment en el pom.xml de l'aplicació la següent dependència:

```
<canigo.integration.notificacions.electroniques.version>[1.3.0,1.4.0)</canigo.integration.notificacions.electroniques.version>

<dependency>
          <groupId>cat.gencat.ctti</groupId>
          <artifactId>canigo.integration.notificacions.electroniques</artifactId>
          <version>${canigo.integration.notificacions.electroniques.version}</version>
</dependency>
```

### Configuració

La configuració es realitza automàticament a partir de la eina de suport al desenvolupament.

Son necessaris els següents arxius de configuració:

* pica.properties
* pica.signature.properties
* client.axis2.xml
* modules.list
* rampart-1.3.mar
* certificats.jks
* notificacions-electroniques.properties
* app-enotum-config.xml

Ubicació: <PROJECT_ROOT>/src/main/resources/axis2client/conf/client.axis2.xml

Ubicació: <PROJECT_ROOT>/src/main/resources/axis2client/conf/rampart-1.3.mar

Ubicació: <PROJECT_ROOT>/src/main/resources/axis2client/conf/modules.list

Ubicació: <PROJECT_ROOT>/src/main/resources/config/cert/certificats.jks

Ubicació: <PROJECT_ROOT>/src/main/resources/config/cert/pica.signature.properties

Ubicació: <PROJECT_ROOT>/src/main/resources/spring/app-enotum-config.xml

Ubicació: <PROJECT_ROOT>/src/main/resources/config/props/notificacions-electroniques.properties

Propietat                                         | Requerit | Descripció
------------------------------------------------- | -------- | ----------
*.notificacions.electroniques.picaServiceBeanName | No       | Nom del bean de Spring per a PICA. Per defecte: picaService
*.notificacions.electroniques.urlPica             | Sí       | URL del servei de la PICA
*.notificacions.electroniques.nomEmissor		  | Sí		 | Nom de l'emissor
*.notificacions.electroniques.nifEmissor		  | Sí	     | Nif de l'emissor

Els valors de urlPica, nifEmisor i nomEmisor s'han de consultar a la OT PICA en requeridors.otpica.ctti@gencat.cat

## Utilització del Mòdul

### JSF

Per a utilitzar aquest mòdul cal:

* Configurar el fitxer XML de Spring per inicialitzar el servei.
* Crear una classe Managed Bean de JSF que contingui la lògica de la crida al servei.
* JSF que gestioni la crida al managed bean.

**app-enotum-config.xml**

Arxiu de configuració que inicialitza el servei de notificacions electròniques. Aquest arxiu de configuració es recolza en arxius de configuració interns del servei de Notificacions i PICA per simplificar la seva configuració.

```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:aop="http://www.springframework.org/schema/aop"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
           http://www.springframework.org/schema/beans/spring-beans-4.1.xsd">

    <bean id="picaEnotumService" parent="abstractPicaService" scope="prototype"/>

</beans>
```

**EnotumBean .java**

Managed Bean de JSF exposat per Spring, i accessible des de la pàgina JSF amb el nom "enotumBean".

En aquest exemple invoquem el servei de notificacions electròniques i afegim com a missatge de formulari, el resultat
de la seva invocació.

```java
@Component("enotumBean")
@Scope("singleton")
@Lazy
public class EnotumBean {

    @Autowired
    private NotificacionsElectroniquesConnector enotum;

    /**
     * Get funcionari
     * @return
     */
    private Funcionari getFuncionari() {
        Funcionari funcionari = new Funcionari();
        funcionari.setNombreFuncionario("Nom Funcionari");
        funcionari.setNifFuncionario("55555555A");
        funcionari.setEmailFuncionario("jmvila@gfi-info.com");
        return funcionari;
    }
    /**
     * Submit
     */
    public void submit(){

        try{

        String idTramesaNT = "101230";
            RespostaConsultarEstatTramesa resposta = enotum.getServeisEmpleatPublic(getFuncionari()).consultarEstatTramesa(idTramesaNT);

            if(resposta.getError()!=null){
                FacesContext.getCurrentInstance().addMessage("enotumForm", new FacesMessage(
                        FacesMessage.SEVERITY_ERROR, resposta.getError().getDescripcio(), null));
            }else{
                FacesContext.getCurrentInstance().addMessage("enotumForm", new FacesMessage(
                        FacesMessage.SEVERITY_INFO, resposta.getTramesa().getEstatTramesa(), null));
            }

        }catch(Exception e){
            FacesContext.getCurrentInstance().addMessage("enotumForm", new FacesMessage(
                    FacesMessage.SEVERITY_ERROR, e.getMessage(), null));
        }

    }

}
```

**enotum.jsf**

Pàgina d'exemple que conté un commandButton que realitza la crida al mètode "submit" del managed bean de JSF.

```
<h:form id="enotumForm">
   <h:panelGrid columns="1">
     <h:commandButton value="#{msg.canigoSubmit}" action="#{enotumBean.submit}" />
     <h:message for="enotumForm" infoStyle="color: green;" errorStyle="color: red;" />
   </h:panelGrid>
</h:form>
```
