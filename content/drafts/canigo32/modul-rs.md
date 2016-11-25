+++
date        = "2016-11-22T09:26:16+01:00"
title       = "MODULE REST"
description = "Mòdul de Rest Services."
sections    = "Canigó. Documentació versió 3.x"
weight      = 2
+++

## Propòsit

Aquest mòdul proporciona eines per a l'exposició de serveis com serveis Rest. Està basat en les millors pràctiques descrites en: [Canigó APIs RESTful](http://canigo.ctti.gencat.cat/blog/2016/01/api/)

Entre altres proporciona un control genèric d'errors. La seva encapsulació en un json de resposta. Classes base per a les respostes en format json dels Webservices. I dos controladors per exposar les propietats i els mòduls carregats en format JSON.

## Instal·lació i Configuració

### Instal·lació

Per tal d'instal·lar el mòdul web-rs es pot incloure automàticament a través de l'eina de suport al desenvolupament o bé afegir manualment en el pom.xml de l'aplicació la següent dependència:

```
<canigo.web.rs.version>[1.0.0,1.3.0)</canigo.web.rs.version>

<dependency>
 <groupId>cat.gencat.ctti</groupId>
 <artifactId>canigo.web.rs</artifactId>
 <version>${canigo.web.rs.version}</version>
</dependency>
```
### Configuració
No necessita cap configuració especial.

### Ús dels controllers
Per a l'ús dels controladors prèviament definits, no cal fer res especial. Hi ha dos controladors prèviament definits que són:
```
    1. InfoModulesController: Retorna la llista de mòduls Canigó i les seves versions que s'estan utilitzant en l'aplicació. La seva URL és .../info/modules
    2. InfoPropertiesController: Retorna la llista de propietats definides i els seus valors de l'aplicació. La seva URL és .../info/properties
```

#### Donar d'alta un nou controlador

Per donar d'alta un nou controlador s'ha de seguir la guia de Spring MVC disponible a [Spring MVC reference](http://docs.spring.io/spring/docs/current/spring-framework-reference/html/mvc.html)

Exemple de definició d'un controlador que retorna un missatge d'exemple:

```
package cat.gencat.ctti.canigo.arch.web.rs.controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

RestController
@RequestMapping("/hello")
public class HelloController {

	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public String getHello() {
		return "hello!";
	}

}
```

#### Control d'errors per defecte
Una de les funcionalitats que aporta el mòdul rs per defecte és el control d'errors. S'ha definit un @RestControllerAdvice que intercepta les excepcions dels tipus:

```
	- MultipartException
	- Exception
	- AuthenticationException
	- AccessDeniedException
	- ResourceNotFoundException
```
Un cop es produeix una d'aquestes excepcions són capturades pel RestControllerAdvice i retornades en format json perquè puguin ser tractades en el client. D'aquesta manera al client li arriba un json amb el codi i missatge de l'excepció en el cos de la resposta i en el format JSON o JSONP si s'ha fet la trucada amb una funció de retorn.
Es pot personalitzar el missatge que s'envia al client en cadascuna de les excepcions. Per a això és possible fer-ho definint les següents propietats en els resources que estigui usant el messageResource definit en l'aplicació:
```	
	- canigo.web.rs.resource.notfoud.msg --> Per a les excepcions de tipus ResourceNotFoundException
	- canigo.web.rs.unauthorized.msg  --> Per a les excepcions de tipus AuthenticationException i AccessDeniedException
	- canigo.web.rs.multipart.bad.request.msg --> Per a les excepcions de tipus MultipartException
	- Per a la resta de Excepcions que s'estenguin del tipus Exception s'usa el localizedMessage de la pròpia excepció.	
	  Pel que és necessari si es vol sobreescriure el mètode getLocalizedMessage amb la propietat que es vulgui enviar com a missatge al client. Un exemple seria el següent:

	public class CustomException extends Exception {

		private static final long serialVersionUID = -3973341495451225082L;
	
		@Override
		public String getLocalizedMessage() {
			return "custom.message";
		}

    }
    
    
```
Si ho desitja pot definir quants RestControllerAdvice com necessiti.


#### Objectes request
S'han definit els següents objectes de petició  tal com es defineix en el document de bones pràctiques [Canigó APIs RESTful](http://canigo.ctti.gencat.cat/blog/2016/01/api/):
```
	- BatchRequest --> Per a peticions batch

```
#### Objectes response
S'han definit els següents objectes de petició  tal com es defineix en el document de bones pràctiques [Canigó APIs RESTful](http://canigo.ctti.gencat.cat/blog/2016/01/api/):
```
	- ResponseBatch --> Per a peticions batch
	- ResponseError --> Per errors
	- ResponsePage  --> Per documents paginats
