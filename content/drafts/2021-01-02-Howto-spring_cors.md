+++
date        = "2021-01-02"
title       = "Canigó. Com permetre l'intercanvi creuat de recursos (CORS)"
description = "Howto com permetre l'intercanvi creuat de recursos (CORS) des d'un servidor, en un origen diferent (domini) al que pertany."
section     = "howtos"
categories  = ["canigo"]
#key        = "GENER2021"
+++


## Introducció

L'objectiu d'aquest articule és mostrar com permetre l'intercanvi creuat de recursos ([CORS](https://www.w3.org/wiki/CORS_Enabled)) des d'un servidor, en un origen diferent (domini) al que pertany, en un projecte generat amb el framework Canigó

---
## Justificació

CORS és un mecanisme que restringeix l'accés web a recursos fora del dominio al que pertany qui realitza la petició, és a dir, si des d'un navegador web es realitza una petició a un servidor i es requereix algun recurs web que estigui a un altre servidor, llavors s'utilitza CORS per a la seva gestió. 

CORS defineix com interactua un navegador web amb un servidor per determinar si l'intercanvi de recursos amb altres servidors és segur. Pel seu funcionament CORS utilitza les capçaleres HTTP.

Quan s'utilitza un projecte creat amb [Canigó plugin](https://canigo.ctti.gencat.cat/canigo/entorn-desenvolupament/) que es basa en Spring, per defecte no s'envien a la capçalera HTTP cap dels paràmetres que permeten l'intercanvi creuat; pel que és necessari realitzar alguns ajustos per a la seva activació.


---
## Configuració

Per activar CORS en un projecte creat amb [Canigó plugin](https://canigo.ctti.gencat.cat/canigo/entorn-desenvolupament/), es necessari crear un filtre web de Spring, agregar-lo al contenidor de Spring i a la configuració de l'adaptador de seguretat de Spring.

### Canvis a `WebSecurityConfig.java`

Un exemple d'activació de CORS podria ser:

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

---
## Exemple d'utilització 

Per a mostrar un exemple d'utilització de CORS es necessari crear un projecte Canigó amb [Canigó plugin](https://canigo.ctti.gencat.cat/canigo/entorn-desenvolupament/) afegint el mòdul de seguretat i crear una pàgina HTML que invoqui a través de Javascript algun recurs del servidor utilitzant les APIs `XMLHttpRequest` o  `Fetch`.

Exemple de pàgina web que invoca el servei REST `/equipaments/id` de prova del projecte de Canigó: 

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
---
### Proves 

Per provar el funcionament s'iniciaran 2 instàncies de l'aplicació utilitzant ports diferents, en aquest cas s'utilitzen els ports 8090 (on es troba el servei REST a consultar) i 8095 (on cridarà la pàgina Web)

```sh
  mvn spring-boot:run \
    -Dspring-boot.run.arguments=--server.port=8090
```

```sh
  mvn spring-boot:run \
    -Dspring-boot.run.arguments=--server.port=8095 \
    -Dspring-boot.run.fork=false
```

---
#### Prova amb CORS desactivat

En aquesta prova anem a realitzar la prova sense configurar el filtre. Si fem una crida a l'aplicació iniciada al port 8080, podem observar que el navegador genera la petició correctament, però, genera un error a l'aplicació que està al port 8095 que indica que no està permès l'intercanvi de recursos.

![Spring CORS Ejemplo 1](/images/howtos/2021-01-02_spring_cors_example1.png)

![Spring CORS Ejemplo 2](/images/howtos/2021-01-02_spring_cors_example2.png)

---
#### Prova amb CORS activat

En aquesta prova anem a realitzar la prova amb la configuració del filtre. Si fem una crida a l'aplicació iniciada al port 8080, podem observar que el navegador genera la petició correctament i que el navegador permet l'intercanvi i respon amb les dades del servei REST de prova.

![Spring CORS Ejemplo 3](/images/howtos/2021-01-02_spring_cors_example3.png)

![Spring CORS Ejemplo 4](/images/howtos/2021-01-02_spring_cors_example4.png)

---
