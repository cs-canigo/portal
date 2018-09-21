+++
date        = "2015-03-19T12:06:35+01:00"
title       = "Antivirus"
description = "Accés a l'escaneig d'arxius mitjançant el servei d'antivirus Centrals del CTTI."
sections    = "Canigó. Documentació versió 3.x"
weight      = 1
+++

## Propòsit

Aquest mòdul permet l'escaneig d'arxius mitjançant el servei d'antivirus Centrals del CTTI.

## Instal.lació i Configuració

### Instal.lació

Per tal d'instal-lar el mòdul d'Antivirus es pot incloure automàticament a través de l'eina de suport al desenvolupament o bé afegir manualment en el pom.xml de l'aplicació la següent dependència:

```
<canigo.integration.antivirus.version>[1.3.0,1.4.0)</canigo.integration.antivirus.version>

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
*.antivirus.serverIp                   | Sí       | IP del Host on es troba el Servidor d'antivirus Centrals.<br>  antivirus.intranet.gencat.cat per entorns productius <br> preproduccio.antivirus.intranet.gencat.cat per entorns preproductius i d'altres
*.antivirus.serverPort                 | Sí       | Port del Host on es troba el Servidor d'antivirus Centrals.<br> Valor per defecte: 1344
*.antivirus.numDayDBExpirationWarning  | Sí       | Número de dies que han de passar per que una definició de virus de la base de dades d'antivirus centrals es consideri caducada. <br>Valor per defecte: 15

## Utilització del Mòdul

Per a utilizar aquest mòdul s'ha de demanar la llibreria sym-7.5.jar enviant un correu a la bústia canigó <oficina-tecnica.canigo.ctti@gencat.cat>

### Exemple d'ús

**AntivirusServiceController.java**

Endpoint de l'aplicació que publica el servei de l'antivirus

```java
	import java.io.InputStream;

	import org.springframework.beans.factory.annotation.Autowired;
	import org.springframework.http.MediaType;
	import org.springframework.web.bind.annotation.PostMapping;
	import org.springframework.web.bind.annotation.RequestMapping;
	import org.springframework.web.bind.annotation.RestController;

	import com.sun.jersey.core.header.FormDataContentDisposition;
	import com.sun.jersey.multipart.FormDataParam;

	import cat.gencat.plantilla32.service.AntivirusService;

	@RestController
	@RequestMapping("/antivirus")
	public class AntivirusServiceController {

		@Autowired
		AntivirusService antivirusService;

		@PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE}, 
				produces = { MediaType.APPLICATION_JSON_VALUE })
		public String scan(@FormDataParam("file") InputStream inputStream, 
							@FormDataParam("file") FormDataContentDisposition fileDetail) {
			
			return antivirusService.scan(inputStream);
		}
	}
```

**AntivirusService.java**

Classe java on es realitza la lògica de la operació i es crida al mòdul de l'antivirus

```java
	import java.io.ByteArrayOutputStream;
	import java.io.IOException;
	import java.io.InputStream;

	import org.h2.util.IOUtils;
	import org.slf4j.Logger;
	import org.slf4j.LoggerFactory;
	import org.springframework.beans.factory.annotation.Autowired;
	import org.springframework.context.annotation.Lazy;
	import org.springframework.stereotype.Service;

	import cat.gencat.ctti.canigo.arch.integration.antivirus.Antivirus;
	import cat.gencat.ctti.canigo.arch.integration.antivirus.ResultatEscaneig;
	import cat.gencat.ctti.canigo.arch.integration.antivirus.beans.InfectionInfo;
	import cat.gencat.ctti.canigo.arch.integration.antivirus.exceptions.AntivirusException;

	@Service("antivirusService")
	@Lazy
	public class AntivirusService {

		@Autowired
		private Antivirus service;
		
		private static final Logger log = LoggerFactory.getLogger(AntivirusService.class);


		 /**
		 * Escaneig de l'arxiu pujat al servidor
		 *
		 */
			public String scan(InputStream file){
				String resultat = null;
				String message = null;
				log.info("AntivirusAction [scan] - Inici");
				ResultatEscaneig res = null;
				try {
			
					ByteArrayOutputStream out = new ByteArrayOutputStream();
					
					IOUtils.copy(file, out);
					
					res = service.scan(out.toByteArray());
			
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
			
					message = "Resultat del escaneig: " + resultat;
			
					log.info("AntivirusAction [scan] - Final");
				} catch (AntivirusException ae) {
					log.error("AntivirusException - Antivirus ("+ service.getClass()+"): " + service
							+ " " + ae.getStackTrace());
					message = "Resultat del escaneig(Error): " + ae.getMessage();
				} catch (IOException e) {
					log.error("AntivirusException - Antivirus ("+ service.getClass()+"): " + service
							+ " " + e.getStackTrace());
					message = "Resultat del escaneig(Error): " + e.getMessage();
				} 
				
				return message;
			}
	}
```
