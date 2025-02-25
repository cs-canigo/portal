+++
date        = "2025-02-14"
title       = "PSIS"
description = "Validació de Signatures electròniques mitjançant els serveis de PSIS oferts per CatCert."
sections    = "Canigó. Documentació Versió 3.8"
weight      = 8
+++

## Propòsit

Aquest mòdul permet la validació de Signatures electròniques mitjançant els serveis de PSIS oferts per CatCert.

## Instal.lació i Configuració

### Instal.lació

Per tal d'instal- lar el mòdul de PSIS es pot incloure automàticament a través de l'eina de suport al desenvolupament o bé afegir manualment en el pom.xml de l'aplicació la següent dependència:

```xml
<dependency>
          <groupId>cat.gencat.ctti</groupId>
          <artifactId>canigo.integration.psis</artifactId>
          <version>${canigo.integration.psis.version}</version>
</dependency>
```

A la [Matriu de Compatibilitats](/plataformes/canigo/documentacio-per-versions/3.8LTS/3.8.0/moduls/compatibilitat-per-modul/) es pot comprovar la versió del mòdul compatible amb la versió de Canigó utilitzada.

### Configuració

La configuració es realitza automàticament a partir de la eina de suport al desenvolupament.

Ubicació: <PROJECT_ROOT>/src/main/resources/config/props/psis.properties

Propietat          | Requerit | Descripció
------------------ | -------- | -----------
*.psis.urlPica  | Sí       | Url del WebService de PSIS. Valor per defecte: http://preproduccio.pica.intranet.gencat.cat/pica_cataleg/AppJava/services/
*.psis.finalitat   | Sí       | Finalitat de l'accés al servei. 
*.psis.nifEmisor   | Sí       | Nif de l'emisor
*.psis.nomEmisor   | Sí       | Nom de l'emisor
*.psis.nomFuncionari| Sí      | Nom del funcionari
*.psis.nifFuncionari| Sí      | Nif del funcionari
*.psis.emailFuncionari| Sí    | Email del funcionari

Els valors de finalitat, urlPica, nifEmisor i nomEmisor s'han de consultar a la [OT PICA](http://transversals.ctti.intranet.gencat.cat/sol-pica/integracio/)

Aquest mòdul és dependent del [mòdul de la PICA](/plataformes/canigo/documentacio-per-versions/3.8LTS/3.8.0/moduls/moduls-integracio/modul-pica/) amb lo qual també s'ha de configurar aquest.

## Utilització del Mòdul

### PicaService

El mòdul PSIS requereix de la creació del Bean del servei de la pica, per defecte Psis cerca un bean anomenat picaService. Si es dessitja canviar aquest nom es pot fer afegint al fitxer psis.propierties la següent propietat:

	psis.picaServiceBeanName=[nom del bean]
	
Un exemple del bean que s'ha de crear:

	<!-- BEAN DE LA PICA -->
	<bean id="picaService" parent="abstractPicaService">
        <property name="modalitats">
            <map>
            </map>
        </property>
    </bean>

### REST

Per a utilitzar aquest mòdul, cal crear un Controller i un Service:

**PsisService.java**

Classe Java on es realitzarà la lògica de la operació a realitzar.

En aquest exemple es valida la caducitat d'un certificat amb PSIS:

```java
import java.io.InputStream;

import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import cat.gencat.ctti.canigo.arch.integration.psis.PSISConnector;
import cat.gencat.ctti.canigo.arch.integration.psis.exceptions.PSISException;
import net.gencat.pica.psis.schemes.valCertSimpPICARequest.ValCertSimpPICARequestDocument;
import net.gencat.pica.psis.schemes.valCertSimpPICARequest.ValCertSimpPICARequestDocument.ValCertSimpPICARequest;
import net.gencat.pica.psis.schemes.valCertSimpPICAResponse.ValCertSimpPICAResponseDocument;

@Service("psisService")
@Lazy
public class PsisService {
	
	/** Logger  */  
	private static final Logger logger = LoggerFactory.getLogger(PsisService.class);

	@Autowired
	private PSISConnector psisServices;
	
	private static byte[] certificatCaducat = getBytesFromInputStream(Thread.currentThread().getContextClassLoader().getResourceAsStream("config/cert/certificatCaducat.crt"));


	 private static byte[] getBytesFromInputStream(InputStream is) {
		 byte[] resultat = null;
		 try {
			 resultat = IOUtils.toByteArray(is);
		 } catch (Exception e) {
			 logger.error(e.getMessage(),e);
		 }
		 return resultat;
	 }
	 
	 public String testValidarCertificatCaducat() {
		 logger.debug("[testValidarCertificatCaducat]");
		 
		 String message;
		 try{
			 ValCertSimpPICARequestDocument document = ValCertSimpPICARequestDocument.Factory.newInstance();
			 ValCertSimpPICARequest peticioValidar = ValCertSimpPICARequest.Factory.newInstance();
			 peticioValidar.setCertificat(certificatCaducat);
			 document.setValCertSimpPICARequest(peticioValidar);
			 ValCertSimpPICAResponseDocument resposta = psisServices.validarCertificat(document);
			 if (resposta!=null && resposta.getValCertSimpPICAResponse()!=null && resposta.getValCertSimpPICAResponse().getResultat()!=null){
				 message = "S'ha verificat la caducitat del certificat amb el següent resultat: "+ resposta.getValCertSimpPICAResponse().getResultat();
			 }else{
				 message = "No s'ha rebut resposta del servei o el format d'aquesta no es l'esperat";
			 }
		 } catch (PSISException e) {
			 message = "S'ha produït un error al servei";
			 logger.error(e.getMessage(), e);
		 } catch (Exception e) {
			 message = "S'ha produït un error general";
			 logger.error(e.getMessage(), e);
		 }
		 
		 return message;
	 }
	 
}
```

**PsisServiceController.java**  
Controller que publica les operacions disponibles per a qui hagi de consumir-les

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cat.gencat.plantilla32.service.PsisService;

@RestController
@RequestMapping("/psis")
public class PsisServiceController {

	@Autowired
	PsisService psisService;

	@GetMapping(produces = { MediaType.APPLICATION_JSON_VALUE })
	public String testValidarCertificatCaducat() {
		
		String message = psisService.testValidarCertificatCaducat();
		
		return message;
	}
}
```
