+++
date        = "2021-01-02"
title       = "Canigó. Com permetre l'intercanvi creuat de recursos (CORS)"
description = "Howto per a mostrar com permetre l'intercanvi creuat de recursos (CORS) des d'un servidor, en un origen diferent (domini) al qual pertany"
section     = "howtos"
categories  = ["canigo"]
#key        = "FEBRER2021"
+++


## Introducció

L'objectiu d'aquest article és mostrar com permetre l'intercanvi creuat de recursos ([CORS](https://www.w3.org/wiki/CORS_Enabled))
des d'un servidor per a un origen diferent del qual pertany (diferent domini) en el cas de projectes creats
amb [Canigó plugin](https://canigo.ctti.gencat.cat/canigo/entorn-desenvolupament/).

## Justificació

CORS és un mecanisme que restringeix l'accés web a recursos fora del domini al qual pertany qui realitza la petició.
És a dir, si des d'un navegador web es realitza una petició a un servidor i es requereix algun recurs web que estigui a un altre servidor,
s'utilitza CORS per a la seva gestió. **Defineix com interactua un navegador web amb un servidor per determinar si l'intercanvi de recursos
amb altres servidors és segur fent ús de les capçaleres HTTP**.

Quan s'utilitza un projecte creat amb [Canigó plugin](https://canigo.ctti.gencat.cat/canigo/entorn-desenvolupament/) que es
basa en Spring, **per defecte no s'envien a la capçalera HTTP cap dels paràmetres que permeten l'intercanvi creuat; per la qual cosa és necessari
realitzar alguns ajustos per a la seva activació**.


## Configuració

Per a activar CORS en un projecte creat amb [Canigó plugin](https://canigo.ctti.gencat.cat/canigo/entorn-desenvolupament/),
**és necessari crear un filtre web de Spring, agregar-lo al contenidor i a la configuració de l'adaptador de seguretat de Spring**.

### Classe `WebSecurityConfig.java`

Un exemple d'activació de CORS seria el següent:

```java
@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
  ...

  @Override
  protected void configure(final HttpSecurity http) throws Exception {
    http.cors();
    ...
  }

  @Bean
  public CorsFilter corsFilter() {
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    CorsConfiguration config = new CorsConfiguration();
    config.setAllowCredentials(true);
    config.setAllowedOrigins(Collections.singletonList(CorsConfiguration.ALL));
    config.addAllowedHeader(CorsConfiguration.ALL);
    config.setAllowedMethods(Arrays.asList(CorsConfiguration.ALL));
    source.registerCorsConfiguration("/**", config);
    return new CorsFilter(source);
  }
  ...
}
```

## Exemple d'ús

Per a mostrar un exemple d'ús de CORS és necessari crear un projecte Canigó amb
[Canigó plugin](https://canigo.ctti.gencat.cat/canigo/entorn-desenvolupament/) afegint el mòdul de seguretat i
crear una pàgina HTML que invoqui a través de Javascript algun recurs del servidor utilitzant les APIs `XMLHttpRequest` o `Fetch`.

Un exemple de pàgina web que invoca el servei REST `/equipaments/id` podria ser la següent:

### cors_test.html

```html
<!DOCTYPE html PUBLIC"-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <meta http-equiv="encoding" content="utf-8" />
    <title>CORS Test</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="/cors_request.js"></script>
  </head>

  <body>
    <div>
      <p class="equipament-id">ID: </p>
      <p class="equipament-nom">Nom: </p>
      <p class="equipament-municipi">Municipi: </p>
    </div>
  </body>
</html>
```

### cors_request.js

```javascript
$(document).ready(function() {
  $.ajax({
    url: "http://localhost:8090/equipaments/15"
  }).then(function(data, status, jqxhr) {
    $('.equipament-id').append(data.id);
    $('.equipament-nom').append(data.nom);
    $('.equipament-municipi').append(data.municipi);
    console.log(jqxhr);
  });
});
```

### Proves 

Per a comprovar el seu funcionament s'iniciaran dues instàncies de l'aplicació utilitzant ports diferents. En aquest cas
s'utilitzaran els ports 8090 (on es troba el servei REST a consultar) i el 8095 (on cridarà la pàgina Web):

```sh
  mvn spring-boot:run \
    -Dspring-boot.run.arguments=--server.port=8090
```

```sh
  mvn spring-boot:run \
    -Dspring-boot.run.arguments=--server.port=8095 \
    -Dspring-boot.run.fork=false
```

<br/>
#### Prova amb CORS desactivat

En aquest cas realitzarem la **prova sense configurar el filtre**. Si fem una crida a l'aplicació iniciada
al port 8090 observarem que el navegador genera la petició correctament però retorna un error a l'aplicació que
està al port 8095 indicant que no està permès l'intercanvi de recursos.

![Spring CORS Ejemplo 1](/images/howtos/2021-01-02_spring_cors_example1.png)

![Spring CORS Ejemplo 2](/images/howtos/2021-01-02_spring_cors_example2.png)


#### Prova amb CORS activat

En aquest cas realitzarem la **prova amb la configuració del filtre**. Si fem una crida a l'aplicació iniciada
al port 8090, observarem que el navegador genera la petició correctament i que el navegador permet l'intercanvi i
respon amb les dades del servei REST de prova.

![Spring CORS Ejemplo 3](/images/howtos/2021-01-02_spring_cors_example3.png)

![Spring CORS Ejemplo 4](/images/howtos/2021-01-02_spring_cors_example4.png)