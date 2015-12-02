+++
date        = "2015-03-05T17:11:42+01:00"
title       = "PSIS"
description = "Validació de Signatures electròniques mitjançant els serveis de PSIS oferts per CatCert."
section     = "Documentació versió 3.x"
weight      = 11
+++

## Propòsit

Aquest mòdul permet la validació de Signatures electròniques mitjançant els serveis de PSIS oferts per CatCert.

## Instal.lació i Configuració

### Instal.lació

Per tal d'instal- lar el mòdul de PSIS es pot incloure automàticament a través de l'eina de suport al desenvolupament o bé afegir manualment en el pom.xml de l'aplicació la següent dependència:

```xml
<canigo.integration.psis.version>[1.1.0,1.2.0)</canigo.integration.psis.version>

<dependency>
          <groupId>cat.gencat.ctti</groupId>
          <artifactId>canigo.integration.psis</artifactId>
          <version>${canigo.integration.psis.version}</version>
</dependency>
```

### Configuració

La configuració es realitza automàticament a partir de la eina de suport al desenvolupament.

Ubicació: <PROJECT_ROOT>/src/main/resources/config/props/psis.properties

Propietat          | Requerit | Descripció
------------------ | -------- | -----------
*.psis.webservice  | Sí       | Url del WebService de PSIS. Valor per defecte: http://preproduccio.pica.gencat.intranet/pica_cataleg/AppJava/services/
*.psis.finalitat   | Sí       | Finalitat de l'accés al servei. 

## Utilització del Mòdul

### JSF

Per a utilitzar aquest mòdul, cal crear un bean i una jsf:

**PsisBean.java**

Managed Bean de JSF expossat per Spring, i accesible desde la pàgina JSF amb el nom psisBean.

En aquest exemple es valida la caducitat d'un certificat amb PSIS:

```java
import java.io.InputStream;
import javax.faces.application.FacesMessage;
import javax.faces.context.FacesContext;

import net.gencat.pica.psis.schemes.valCertSimpPICARequest.ValCertSimpPICARequestDocument;
import net.gencat.pica.psis.schemes.valCertSimpPICARequest.ValCertSimpPICARequestDocument.ValCertSimpPICARequest;
import net.gencat.pica.psis.schemes.valCertSimpPICAResponse.ValCertSimpPICAResponseDocument;

import org.apache.commons.io.IOUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import cat.gencat.ctti.canigo.arch.integration.psis.PSISConnector;
import cat.gencat.ctti.canigo.arch.integration.psis.exceptions.PSISException;

@Component("modulPsisBean")
@Lazy
public class ModulPsisBean {

  @Autowired
  private PSISConnector psisServices;
  private static final Log log = LogFactory.getLog(ModulPsisBean.class);
  private static byte[] certificatCaducat = getBytesFromInputStream(
    Thread.currentThread().getContextClassLoader().getResourceAsStream("config/cert/certificatCaducat.crt"));

  public void testValidarCertificatCaducat() throws PSISException {
    log.debug("[testValidarCertificatCaducat]");
    try{
      ValCertSimpPICARequestDocument document = ValCertSimpPICARequestDocument.Factory.newInstance();
      ValCertSimpPICARequest peticioValidar = ValCertSimpPICARequest.Factory.newInstance();
      peticioValidar.setCertificat(certificatCaducat);
      document.setValCertSimpPICARequest(peticioValidar);
      ValCertSimpPICAResponseDocument resposta = psisServices.validarCertificat(document);
      if (resposta!=null && resposta.getValCertSimpPICAResponse()!=null && resposta.getValCertSimpPICAResponse().getResultat()!=null){
        FacesContext.getCurrentInstance().addMessage("psisForm",
          new FacesMessage( FacesMessage.SEVERITY_INFO,  "S'ha verificat la caducitat del certificat amb el següent resultat: "+
          resposta.getValCertSimpPICAResponse().getResultat(), null));
      }else{
        FacesContext.getCurrentInstance().addMessage("psisForm",
          new FacesMessage( FacesMessage.SEVERITY_ERROR, "No s'ha rebut resposta del servei o el format d'aquesta no es l'esperat", null));
      }
    } catch (PSISException e) {
      FacesContext.getCurrentInstance().addMessage("psisForm",
        new FacesMessage( FacesMessage.SEVERITY_ERROR, "S'ha produït un error al servei", null));
      e.printStackTrace();
    } catch (Exception e) {
      FacesContext.getCurrentInstance().addMessage("psisForm",
        new FacesMessage( FacesMessage.SEVERITY_ERROR, "S'ha produït un error general", null));
      e.printStackTrace();
    }
  }

  private static byte[] getBytesFromInputStream(InputStream is) {
    byte[] resultat = null;
    try {
      resultat = IOUtils.toByteArray(is);
    } catch (Exception e) {
      log.error(e);
    }
    return resultat;
  }
}
```

**psis.jsf**  
Pàgina JSF que conté un commandButton que realitza la crida al mètode "execute" del managed bean de JSF.

```
<h:form id="psisForm">
       <h:panelGrid columns="1">
           <h:commandButton value="#{msg.canigoSubmit}" action="#{modulPsisBean.testValidarCertificatCaducat}" />
           <h:message for="psisForm" infoStyle="color: green;" errorStyle="color: red;" />
       </h:panelGrid>
</h:form>
```
