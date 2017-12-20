+++
date        = "2017-03-29T09:26:16+01:00"
title       = "Mòdul RS"
description = "Mòdul RESTful Services"
sections    = "Canigó. Documentació versió 3.x"
weight      = 2
+++

## Propòsit

Aquest mòdul proporciona eines per a l'exposició de serveis REST. Està basat en les millors pràctiques descrites a [Canigó APIs RESTful](http://canigo.ctti.gencat.cat/blog/2016/01/api/)

Entre altres característiques, destaquem les següents:

- Control genèric d'errors
- Classes estàndard de resposta
- Controladors per exposar les propietats de configuració de l'aplicació i mòduls carregats

Tot el contingut es serveix en format JSON.

## Instal·lació i Configuració

### Instal·lació

El mòdul RS i el corresponent test unitari s'inclou per defecte dins del core de Canigó 3.
Durant el procés de creació de l'aplicació, l'eina de suport al desenvolupament inclourà la referència dins del pom.xml. 
En cas d'una instal- lació manual afegir les següents línies al pom.xml de l'aplicació:

```
<canigo.web.rs.version>[1.1.0,1.2.0)</canigo.web.rs.version>
<canigo.test.version>[1.2.0,1.3.0)</canigo.test.version>

<dependency>
 <groupId>cat.gencat.ctti</groupId>
 <artifactId>canigo.web.rs</artifactId>
 <version>${canigo.web.rs.version}</version>
</dependency>

<dependency>
	<groupId>cat.gencat.ctti</groupId>
	<artifactId>canigo.test</artifactId>
	<version>${canigo.test.version}</version>
	<scope>test</scope>
</dependency>

<dependency>
   <groupId>cat.gencat.ctti</groupId>
   <artifactId>canigo.web.rs</artifactId>
   <type>test-jar</type>
   <version>${canigo.web.rs.version}</version>
   <scope>test</scope>
   <classifier>tests</classifier>
</dependency>
```

Al pom.xml també s'ha d'afegir el plugin que executa el test unitari del mòdul RS:
```
<build>
    ...
    <plugins>
        ...
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-surefire-plugin</artifactId>
            <executions>
                <execution>
                    <id>base-test</id>
                    <phase>test</phase>
                    <goals>
                        <goal>test</goal>
                    </goals>
                    <configuration>
                        <dependenciesToScan>
                            <dependency>cat.gencat.ctti:canigo.web.rs</dependency>
                            ...
                        </dependenciesToScan>
			<excludes>
                            <exclude>%regex[${project.groupId}.*.*Test.*]</exclude>
			</excludes>
                    </configuration>
                </execution>
                ...
            </executions>
        </plugin>
        ...
    </plugins>
    ...
</build>    
```
### Configuració

No necessita cap configuració especial.

### Ús de controladors (REST Controllers)

Hi ha dos controladors inclosos dins el mòdul:
```
    1. _InfoModulesController_: retorna la llista de mòduls Canigó carregats a l'aplicació i les seves corresponents versions. La seva URL és http://<app>/info/modules
    2. _InfoPropertiesController_: retorna la llista de propietats definides a l'aplicació i els seus valors. La seva URL és http://<app>/info/properties
```

#### Donar d'alta un nou controlador

Per donar d'alta un nou controlador a l'aplicació Canigó s'ha de seguir la [documentació de referència de Spring MVC](http://docs.spring.io/spring/docs/current/spring-framework-reference/html/mvc.html)

Exemple de definició d'un controlador:

```
package cat.gencat.ctti.canigo.arch.web.rs.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/hello")
public class HelloController {

	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public String getHello() {
		return "hello!";
	}

}
```

### Gestió d'errors per defecte

Una de les funcionalitats que incorpora el Mòdul RS és la de gestió d'errors per defecte. S'ha definit un @RestControllerAdvice que intercepta les excepcions dels tipus:

```
	- MultipartException
	- AuthenticationException
	- AccessDeniedException
	- ResourceNotFoundException
    - Exception
    
```
Quan es produeix aquestes excepcions a l'aplicació, són capturades pel @RestControllerAdvice i retornades en format JSON al client. El client rep un JSON amb el codi i missatge de l'excepció en el cos de la resposta, i en format JSON o JSONP si s'ha fet la crida amb una funció de retorn.
Es pot personalitzar i "localitzar" (i18n) el missatge que s'envia al client per cadascuna de les excepcions. Això és possible fer-ho definint les següents propietats en els fitxers de recursos carregats a l'aplicació:

```	
	- canigo.web.rs.resource.notfoud.msg --> Per a les excepcions de tipus ResourceNotFoundException
	- canigo.web.rs.unauthorized.msg  --> Per a les excepcions de tipus AuthenticationException i AccessDeniedException
	- canigo.web.rs.multipart.bad.request.msg --> Per a les excepcions de tipus MultipartException
	- Per a la resta d'excepcions que estenguin del tipus Exception s'utilitza el localizedMessage de la mateixa excepció. Per tant, és necessari sobreescriure el mètode getLocalizedMessage amb la propietat el valor de la qual es vol enviar com a missatge al client. Un exemple seria el següent:

	public class CustomException extends Exception {

		private static final long serialVersionUID = -3973341495451225082L;
	
		@Override
		public String getLocalizedMessage() {
			return "custom.message";
		}

    }
    
    
```

Es poden definir tants RestControllerAdvice com es necessiti.


### Objectes de suport

Amb la finalitat d'estandaritzar i facilitar la feina als desenvolupadors, es posa a la seva disposició objectes estàndard de petició i resposta.

#### Request

S'han definit els següents objectes de petició, tenint en compte les bones pràctiques definides a [Canigó APIs RESTful](http://canigo.ctti.gencat.cat/blog/2016/01/api/):

```
	- BatchRequest --> Per a peticions batch

```

#### Response

S'han definit els següents objectes de resposta, tenint en compte les bones pràctiques definides a [Canigó APIs RESTful](http://canigo.ctti.gencat.cat/blog/2016/01/api/):

```
	- ResponseBatch --> Per a peticions batch
	- ResponseError --> Per errors
	- ResponsePage  --> Per documents paginats
    
```
