+++
date        = "2018-01-31T17:11:42+01:00"
title       = "Definició sondes per aplicacions Canigó a AppAgile"
description = "Definició sondes per aplicacions Canigó a AppAgile utilitzant livenessProbe i readinessProbe"
sections    = "Canigó"
taxonomies  = []
toc 		= true
weight 		= 1
+++

## Definició sondes per aplicacions Canigó a AppAgile

Els contenidors AppAgile proporcionen serveis per validar si un servidor està iniciat i serveis per validar que el servidor proporciona servei

Spring boot proporciona funcionalitats de health per comprovar si un servidor està iniciat i donant servei

Aquestes funcionalitats són proporcionades per la llibreria **spring-boot-starter-actuator**

Des del descriptor yml dels contenidors AppAgile es pot lligar les funcionalitats de health que proporciona Spring boot amb els serveis que proporciona AppAgile per comprovar si un servidor està iniciat i donant servei, així si un servidor no està iniciat, el AppAgile reiniciarà el servidor i si un servidor no dona servei no li enrutarà peticions fins que torni a donar servei

Les seccions del descriptor yml dels contenidors AppAgile són **livenessProbe** i **readinessProbe**

Es poden combinar comprovacions de tipus livenessProbe i readinessProbe

Si només hi ha configurat un servidor al AppAgile i aquest amb les comprovacions de readinessProbe determina que el servidor està ocupat i no pot atendre més peticions, el AppAgile retornarà un error a les següents crides que es facin, indicant que no hi ha cap servidor disponible per atendre-les

Les comprovacions que es poden realitzar són l'execució d'una commanda (exec), la crida a un port (port) o una crida http (httpGet)

Exemples de cada un:
- Execució d'una commanda:
```
  exec:
      command:
        - ...
```

- Crida a un port:
```
  tcpSocket:
      port: 
```

- Crida http:
```
  httpGet:
    	path: 
    	port: 
    	scheme:
```

Recomenem l'utilització de comprovacions de tipus crida a un port o crida http

A més del tipus de comprovació hi ha els següents paràmetres configurables:
- **failureThreshold**: Número límit de comprovacions errones per la qual el AppAgile realitzarà les accions de reiniciar el servidor o no servir crides
- **initialDelaySeconds**: Número de segons de delay per començar a fer les comprovacions. Recomenem aplicar un temps igual o superior a 600 segons
- **periodSeconds**: Amb quina freqüència es realitza la comprovació
- **successThreshold**: Número pel qual es considera que la comprovació és correcte
- **timeoutSeconds**: Número de segons pel qual es considera que la comprovació s'ha de tallar i per tant és incorrecte

Així per exemple, podriem tenir el cas d'un procés extern al del servidor d'aplicacions que necessitem que estigui iniciat, si aquest procés cau, necessitem que es reinici el servidor o podriem tenir el cas que un servei utilitzi molts recursos del servidor i necessitem que el servidor se centri en resoldre les crides a aquest servei abans de proporcionar servei a altres crides

### Exemple de com configurar un servei que reinicï el servidor si un procés extern cau:

Anem a implementar un servei propi de health de Spring Boot que comprovi si un procés de libre office està aixecat a la màquina del servidor d'aplicacions, per això realitzarem:

1. Afegir al pom.xml la dependencia de spring-boot-actuator
``` xml
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-actuator</artifactId>
			<exclusions>
				<exclusion>
					<artifactId>spring-boot-starter-logging</artifactId>
					<groupId>org.springframework.boot</groupId>
				</exclusion>
			</exclusions>
		</dependency>
```
		
2. Al fitxer boot.properties afegir l'exposició només del servei de health amb detall. També afegim la propietat per excloure la resta de serveis:
``` properties
management.endpoints.web.exposure.include=health
management.endpoint.health.show-details=always
management.security.enabled=false
management.endpoints.jmx.exposure.exclude=*
```

3. Crearem un HealthIndicator propi extenent de *org.springframework.boot.actuate.health.AbstractHealthIndicator*
``` java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.actuate.health.AbstractHealthIndicator;
import org.springframework.boot.actuate.health.Health;
import org.springframework.stereotype.Component;

import cat.gencat.ctti.std.conversio.libre.office.ConversioLibreOffice;
import cat.gencat.ctti.std.conversio.libre.office.constants.ConversioLibreOfficeConstants;

@Component
public class ConversioLibreOfficeHealthIndicator extends AbstractHealthIndicator {

	@Autowired
	private ConversioLibreOffice conversioLibreOffice;

	@Value("${" + ConversioLibreOfficeConstants.CLAU_PROPIETAT_HOST_NAME_LIBRE_OFFICE + "}")
	private String hostNameLibreOffice;

	@Value("${" + ConversioLibreOfficeConstants.CLAU_PROPIETAT_PORT_LIBRE_OFFICE + "}")
	private Integer portLibreoffice;

	private String DETAIL_KEY = "detail";
	private String ERROR_KEY = "error";

	@Override
	protected void doHealthCheck(Health.Builder builder) throws Exception {
		try {
			conversioLibreOffice.connectLibreOffice(hostNameLibreOffice, portLibreoffice);
			builder.up().withDetail(DETAIL_KEY,
					"Connectat al Libreoffice en el servidor " + hostNameLibreOffice + " port " + portLibreoffice);
		} catch (Exception ex) {
			builder.down().withDetail(DETAIL_KEY, "No s'ha pogut connectar al Libreoffice en el servidor "
					+ hostNameLibreOffice + " port " + portLibreoffice).withDetail(ERROR_KEY, ex);
		}

	}
}
```

En aquesta comprovació si va bé es retornarà el missatge de que el servei està UP amb el detall "Connectat al Libreoffice en el servidor ..."
Si hi ha algun error a la comprovació es retornarà el missatge de que el servei està DOWN amb el detall "No s'ha pogut connectar al Libreoffice en el servidor ..."

Amb aquests canvis tenim publicat un servei a:
/api/health

On ens indica si la comprovació és correcte retornarà amb un http code 200 i el missatge:
``` json
{
  "status": "UP",
  "conversioLibreOffice": {
    "status": "UP",
    "detail": "Connectat al Libreoffice en el servidor 127.0.0.1 port 8100"
  },
  "diskSpace": {
    "status": "UP",
    "total": 65986711552,
    "free": 18808164352,
    "threshold": 10485760
  }
}
```

O si la comprovació no és correcte retornarà amb un http code 503 i el missatge:
``` json
{
  "status": "DOWN",
  "conversioLibreOffice": {
    "status": "DOWN",
    "detail": "No s'ha pogut connectar al Libreoffice en el servidor 127.0.0.1 port 8100",
    "error": {

		}
  },
  "diskSpace": {
    "status": "UP",
    "total": 65986711552,
    "free": 18807410688,
    "threshold": 10485760
  }
}
```

4. Afegim al descriptor yml del servidor la secció:
``` yml
livenessProbe:
  failureThreshold: 3
  httpGet:
    path: /api/health
    port: 8080
    scheme: HTTP
  initialDelaySeconds: 600
  periodSeconds: 10
  successThreshold: 1
  timeoutSeconds: 2
```
  
El contenidor AppAgile començarà a realitzar les comprovacions als 600 segons d'estar aixecat, amb una freqüencia de comprovacions cada 10 segons al servei /api/health i si es troba amb 3 indents fallits de comprovació reiniciarà el servidor

Exemple d'events dins del AppAgile on mostra com es reinicia el servidor si el servei http /api/health no respon correctament:

![Liveness_probe_service_killing_container](/content/drafts/Liveness_probe_service_killing_container.png "Liveness probe service killing container")

### Exemple de com configurar el AppAgile perquè reinicï el servidor si un port no està actiu:

1. Afegim al descriptor yml del servidor la secció:
``` yml
livenessProbe:
  failureThreshold: 3
  initialDelaySeconds: 600
  periodSeconds: 10
  successThreshold: 1
  tcpSocket:
    port: 8100
  timeoutSeconds: 2
```
  
El contenidor AppAgile començarà a realitzar les comprovacions als 600 segons d'estar aixecat, amb una freqüencia de comprovacions cada 10 segons al port 8100 i si es troba amb 3 indents fallits de comprovació reiniciarà el servidor

Exemple d'events dins del AppAgile on mostra com es reinicia el servidor si el port 8100 no respon correctament:

![Liveness_probe_port_killing_container](/content/drafts/Liveness_probe_port_killing_container.png "Liveness probe port killing container")

