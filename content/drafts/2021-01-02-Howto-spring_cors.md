+++
date        = "2021-01-02"
title       = "Canigó. Como permitir el intercambio cruzado de recursos (CORS)"
description = "Como permitir el intercambio cruzado de recursos (CORS) desde un servidor, en un origen distinto (dominio) al que pertenece."
section     = "howtos"
categories  = ["canigo"]
#key        = "GENER2021"
+++


## Introducción

El objetivo de este artículo es mostrar como permitir el intercambio cruzado de recursos ([CORS](https://www.w3.org/wiki/CORS_Enabled)) desde un servidor, en un origen distinto (dominio) al que pertenece, dentro de un proyecto generado con el framework Canigó

---
## Justificación

CORS es un mecanismo que restringue el acceso web a recursos fuera del dominio al que pertenece quien hace una petición, es decir, sí desde un navegador web se realiza una petición a un servidor y se requiere algún recurso web que este en otro servidor, entonces se utiliza CORS para su gestión. 

CORS define como interactua un navegador web con un servidor para determinar si el intercambio de recursos con otros servidores es seguro. Para su funcionamiento CORS utiliza las cabeceras HTTP.

Cuando se utiliza un proyecto creado con [Canigó plugin](https://canigo.ctti.gencat.cat/canigo/entorn-desenvolupament/) que se basa en Spring, por defecto no se envian en la cabcera HTTP ninguno de los parámetros que permiten el intercambio cruzado; por lo que es necesario realizar algunos ajustes para su activación.


---
## Configuración

Para activar CORS en un proyecto creado con [Canigó plugin](https://canigo.ctti.gencat.cat/canigo/entorn-desenvolupament/), se requiere crear un filtro web de Spring, agregarlo al contenedor de Spring y a la configuración del adaptador de seguridad de Spring.

### Cambios en `WebSecurityConfig.java`

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
## Uso 

### Desarrollo 

> Se requiere crear dentro de un proyecto creado con [Canigó plugin](https://canigo.ctti.gencat.cat/canigo/entorn-desenvolupament/) con el módulo de seguridad instalado, una pagina HTML que invoque a través de Javascript algún recurso del servidor utilizando las APIs `XMLHttpRequest` o  `Fetch`.

> Ejemplo de página web que invoca el servicio REST `/equipaments/id` de prueba que existe en Canigó: `cors_test.html`

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
### Pruebas 

> Para probar el funcionamiento se inician 2 instancias de la aplicación utilizando puertos diferentes, en este caso se utilizan los puertos 8090 (donde se encuentra el servicio REST a consultar) y 8095 (donde se llamará la página Web)

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
> Prueba con CORS desactivado

* Se realiza la prueba sin configurar el filtro

> Se observa que el navegador genera la petición correctamente para la aplicación que está en el puerto 8090, sin embargo, genera un error en la aplicación que está en el puerto 8095, que indica que no está permitido el intercambio

![Spring CORS Ejemplo 1](/images/howtos/2021-01-02_spring_cors_example1.png)

![Spring CORS Ejemplo 2](/images/howtos/2021-01-02_spring_cors_example2.png)

---
> Prueba con CORS activado

* Se realiza la prueba con la configuración

> Se observa que el navegador permite el intercambio y responde con los datos del servicio REST de prueba

![Spring CORS Ejemplo 3](/images/howtos/2021-01-02_spring_cors_example3.png)

![Spring CORS Ejemplo 4](/images/howtos/2021-01-02_spring_cors_example4.png)

---
## Conclusión

 * Implementar el intercambio cruzado de recursos utilizando Canigó y Spring es posible y sencillo.
