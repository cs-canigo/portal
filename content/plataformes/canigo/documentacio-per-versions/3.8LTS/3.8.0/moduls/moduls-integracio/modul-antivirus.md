+++
date        = "2022-05-23"
title       = "Antivirus"
description = "Accés a l'escaneig d'arxius mitjançant el servei d'antivirus Centrals del CTTI."
sections    = "Canigó. Documentació Versió 3.8"
weight      = 1
+++

## Propòsit

Aquest mòdul permet l'escaneig d'arxius mitjançant el servei d'antivirus Centrals del CTTI.

## Instal.lació i Configuració

### Instal.lació

Per tal d'instal·lar el mòdul d'Antivirus es pot incloure automàticament a través de l'eina de suport al desenvolupament o bé afegir manualment en el pom.xml de l'aplicació la següent dependència:

```
<dependency>
    <groupId>cat.gencat.ctti</groupId>
    <artifactId>canigo.integration.antivirus</artifactId>
    <version>${canigo.integration.antivirus.version}</version>
</dependency>
```

A la [Matriu de Compatibilitats](/canigo-download-related/matrius-compatibilitats/canigo-36/) es pot comprovar la versió del mòdul compatible amb la versió de Canigó utilitzada.

<div class="message warning">

L'última versió del connector de l'antivirus de Canigó utilitza l'última versió del connector de l'antivirus.

<br>

El servei de l'antivirus només dona suport si s'utilitza l'última versió del connector de l'antivirus, per tant, assegureu-vos que la versió de Canigó que s'utilitza a l'aplicació sigui compatible amb l'última versió del connector de l'antivirus de Canigó i que esteu utilitzant l'última versió del connector de l'antivirus de Canigó.

<br>

Podeu consultar quina és l'última versió de Canigó i quina és l'última versió del connector de l'antivirus de Canigó a:

<br>

<a href="/canigo-download-related/matrius-compatibilitats/">Matrius de Compatibilitats</a>

</div>

### Configuració

La configuració es realitza automàticament a partir de la eina de suport al desenvolupament.

Ubicació proposada: <PROJECT_ROOT>/src/main/resources/config/props/antivirus.properties

Propietat                              | Requerit | Descripció
-------------------------------------- | -------- | ----------
*.antivirus.remote                     | Sí       | Paràmetre que indica si l'escaneig dels arxius es realitza de forma remota o no. Si fos de forma remota l'arxiu a escanejar s'ha de pujar abans al servidor d'antivirus centrals, procés que fa automàticament el mòdul. En cas de remote a fals s'enten que l'arxiu ja es troba pujat al servidor d'antivirus centrals. <br>Valor per defecte: true
*.antivirus.serverIp                   | Sí       | IP del Host on es troba el Servidor d'antivirus Centrals.<br>  antivirus.intranet.gencat.cat per entorns productius <br> preproduccio.antivirus.intranet.gencat.cat per entorns preproductius i d'altres
*.antivirus.serverPort                 | Sí       | Port del Host on es troba el Servidor d'antivirus Centrals.<br> Valor per defecte: 1344
*.antivirus.numDayDBExpirationWarning  | Sí       | Número de dies que han de passar per que una definició de virus de la base de dades d'antivirus centrals es consideri caducada. <br>Valor per defecte: 15
*.antivirus.failRetryTime              | No       | Mil·lisegons d'espera màxima per obrir la connexió al servidor d'antivirus. <br>Valor per defecte: 30000
*.antivirus.readWriteTime              | No       | Mil·lisegons d'espera màxima per obtenir resposta d'una consulta al servidor d'antivirus. <br>Valor per defecte: 3600000

## Utilització del Mòdul

Per a utilizar aquest mòdul s'ha de demanar la següent llibreria enviant un correu a la bústia canigó <oficina-tecnica.canigo.ctti@gencat.cat> al no estar disponible a cap repositori públic Maven:

* Versió mòdul antivirus < 1.3.2: llibreria "sym-7.5.jar" configurant el pom.xml amb:
```xml
<dependency>
	<groupId>sym</groupId>
	<artifactId>sym</artifactId>
	<version>7.5</version>
</dependency>
```

* Versió mòdul antivirus >= 1.3.2 i < 2.2.0: llibreria "scanengine-api-7.0.0.8.jar" configurant el pom.xml amb:
```xml
<dependency>
	<groupId>com.symantec.scanengine.api</groupId>
	<artifactId>scanengine-api</artifactId>
	<version>7.0.0.8</version>
</dependency>
```
* Versió mòdul antivirus >= 2.2.0: llibreria "scanengine-api-8.2.0.jar" configurant el pom.xml amb:
```xml
<dependency>
	<groupId>com.symantec.scanengine.api</groupId>
	<artifactId>scanengine-api</artifactId>
	<version>8.2.0</version>
</dependency>
```

Aquestes llibreries ja estan incorporades internament al SIC (Servei d’Integració Contínua) per a compilacions de releases d’aplicacions

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
## Respostes servei antivirus

L'objecte `cat.gencat.ctti.canigo.arch.integration.antivirus.ResultatEscaneig` és l'encarregat d'interpretar la informació de la resposta del servei de l'antivirus. Aquest objecte conté els mètodes:

- `int getEstat()`: Número enter que representa l’estat de finalització del procés d’escaneig.
 
	o STATUS_OK = 0
	
	o STATUS_KO = -1
	
	o STATUS_WARN = 1

- `String getMissatge()`: String que emmagatzemarà la informació de les amenaces trobades en el procés d’escaneig. Si no hi hagués cap el seu valor serà null

- `List<InfectionInfo> getArrayVirus()`: Llistat d’objectes InfectionInfo. Aquests objectes representen cada amenaça detectada en l’escaneig. Cada objecte InfectionInfo disposa dels següents camps:

	o String violationId
	
	o String violationName
	
	o String threadCategory
	
	o String fileName
	
	o String disposition

El conjunt de dades que retornarà es pot resumir amb el següent quadre:

Cas | Estat | Missatge | ArrayVirus
--- | ----- | -------- | ----------
KO | -1 | [string amb la informació del virus] | [LLista d’objetes de tipus InfectionInfo amb informació de les amenaces detectades]
OK | 0 | null | null
WARN (No s’ha pogut accedir al fitxer) | 1 | FILE_ACCESS_FAILED | null
WARN(Error intern al servidor) | 1 | INTERNAL_SERVER_ERROR | null
WARN(no hi ha llicència disponible) | 1 | NO_AV_LICENSE | null
WARN(base de dades antivirus caducada) | 1 | Base de dades de la definició de l'antivirus caducada | null