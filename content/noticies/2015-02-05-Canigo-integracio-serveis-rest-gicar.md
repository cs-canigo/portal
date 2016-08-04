+++
date        = "2015-02-05"
title       = "Canigó. Integració de serveis REST amb GICAR"
description = "Les aplicacions Canigó 3 basades en l'arquitectura HTML5/JS+REST han de tenir en compte una sèrie de consideracions en cas que estiguin integrades amb GICAR. En concret, és probable que hagin de sol·licitar que s'apliquin les següents excepcions"
sections    = ["Notícies", "home"]
categories  = ["desenvolupament", "canigó"]
+++

Les aplicacions Canigó 3 basades en l'arquitectura HTML5/JS+REST han de tenir en compte una sèrie de consideracions en cas que estiguin integrades amb GICAR. En concret, és probable que hagin de sol·licitar que s'apliquin les següents excepcions:

- <i>Habilitar mètodes "PUT" i "DELETE"</i>: aquests mètodes HTTP són utilitzats en serveis RESTful per operacions de modificació/inserció de dades (PUT) i eliminació (DELETE). És molt habitual per tant en aplicacions que utilitzen REST, sobretot de backoffice on es realitza administració d'informació, que requereixin aquests mètodes HTTP.

- <i>Deshabilitar la validació GICAR de la cometa simple (‘) al querystring</i>: els agents GICAR instal·lats en els frontals corporatius, a més de gestionar l'autenticació d'usuaris, també inclouen validacions de seguretat. Una d'aquestes validacions no permet la cometa simple (‘) en el querystring. Al deshabilitar aquesta validació es torna imprescindible que les aplicacions protegeixin el seu codi per evitar SQL Injection. En el cas d'aplicacions Canigó 3 es recomana fer ús del "Parameter Binding" de JPA (Java Persistence Api) alhora de setejar paràmetres en sentències JPQL (Java Persistence Query Language) o SQL (Structured Query Language).

Quan s’hagin de fer aquestes excepcions cal que el responsable de la solució afectada obri un tiquet a <a href="mailto://sau.tic@gencat.cat">sau.tic@gencat.cat</a> en el servei GICAR,  demanant l’excepció pertinent (aquestes identificades o unes altres), indicant també l’aplicació que ho requereix.

Us deixem una referència al comunicat de Canigó de Novembre 2013 on podeu trobar un exemple d'aplicació Canigó 3 amb arquitectura HTML5/JS+REST. Per qualsevol dubte relacionat amb l'ús d'aquest tipus d'arquitectura en aplicacions Canigó 3 podeu fer una petició de consulta al [JIRA CSTD](https://cstd.ctti.gencat.cat/jiracstd/browse/CAN) o enviar un correu a la <a href="mailto://oficina-tecnica.canigo.ctti@gencat.cat">Bústia del CS Canigó</a>. 