+++
date        = "2022-05-23"
title       = "Errors coneguts"
description = "Errors coneguts plugin eclipse 1.8.5"
sections    = "canigo-fwk-docs"
weight		= 2
+++

## Errors coneguts versió 1.8.5

### Error "Possiblement els Archetypes no s'han instal·lat correctament"

#### Detall error

Una vegada instal·lat el plugin de l'eclipse, al intentar crear un projecte de tipus Canigó s'obté l'error "Error al executar maven. Possiblement els Archetypes no s'han instal·lat correctament"

![](/related/canigo/documentacio/plugin-canigo/Error_archetypes_no_installat_correctament.png)

Aquest error es produeix quan l'instal·lació del maven o la seva configuració no està a la ruta habitual, < home_del_usuari >/.m2/

El plugin de Canigó utilitza una llibreria per executar maven per a construir els projectes, i aquesta llibreria agafa com a ruta per trobar el settings.xml i el repository la variable "user.home" de la màquina virtual Java. Si s'utilitza l'entorn de desenvolupament aquesta variable ja apunta correctament a la ubicació del settings.xml i del repository maven

#### Solució

Per a solucionar aquest problema es necessari cambiar la variable "user.home" de la JVM dintre de l'Eclipse. 

* Per això accedirem a Windows -> Preferences -> Java -> Installed JREs 

![](/related/canigo/documentacio/plugin-canigo/Solucio_error_archetypes_no_installat_correctament_jre.png)

* Seleccionarem la JRE en ús i editarem: 

![](/related/canigo/documentacio/plugin-canigo/Solucio_error_archetypes_no_installat_correctament_jre_utilitzada.png)

* Agregarem el següent argument a la JRE: -Duser.home=/path-maven: 

![](/related/canigo/documentacio/plugin-canigo/Solucio_error_archetypes_no_installat_correctament_afegir_variable.png)

ON /path-maven és el path és la ruta base on está la configuració (settings.xml) i repositori (repository) de maven amb la següent estructura:

```
/path-maven
    /-- .m2
        /-- settings.xml (amb el nexus del sic)
        /-- repository
            /-- ...
```

Encara que les imatges són d'una màquina amb Linux, també aplica per a màquines Windows


