
+++
date         = "2024-04-19"
title        = "Configuració workflows"
description  = "Guia per configurar els workflows a demanda"
weight      = "14"
sections    = ["GHEC"]
aliases = [
    "/drafts/ghec/gh-configuracio-workflows",
    "/ghec/gh-configuracio-workflows",
    "/plataformes/ghec/gh-configuracio-workflows"
]
+++

### Container

#### CD
- **technology**: Tecnologia del projecte. Valors possibles:
  - `java`
  - `nodejs`
- **project_name**: Nom del projecte, especificar només si no hi ha compilació en el projecte.
- **cloud**: Entorn al núvol. Valors possibles:
  - `aws`
  - `azure`
  - `gcp`
- **engine**: Plataforma de desplegament. Valors possibles:
  - `ecs`
  - `aca`
- **artifact_version**: Versió de l'artefacte.
- **environment**: Entorn.
- **service_name**: Nom del servei.
- **registry_name**: Nom del registre.
- **cluster_name**: Nom del clúster. Definir si el projecte es basa en un motor AWS o ECS.
- **task_definition_name**: Nom de la definició de la tasca. Definir només si el projecte es basa en AWS.
- **resource_group**: Nom de grup de recurs. Definir si el projecte es basa en Azure Cloud o ACA engine.
- **healthcheck_url**: URL del comprovador d'estat. Ha de ser `https://<endpoint_url.gencat.cat>/`. Definir si existeix un endpoint després del deploy i una expressió d'avaluació del body.
- **healthcheck_regex**: Regressió de l'estat. Ha de tenir format semàntic entre cometes, ex: `"1.0.0"`. Definir si existeix un endpoint després del deploy i una expressió d'avaluació del body.
- **healthcheck_timeout**: Temps màxim per a la comprovació d'estat. Ha de tenir un valor numèric entre cometes, ex: `"300"`. Definir si existeix un endpoint després del deploy i una expressió d'avaluació del body.
- **repository_mat**: Per habilitar o deshabilitar la MAT del repositori. Valors possibles:
  - `true`
  - `false`
- **selenium_enabled**: Per habilitar o deshabilitar Selenium. Valors possibles:
  - `true`
  - `false`
- **selenium_urlapp**: URL de Selenium, ha de tenir el valor: `https://<urlapp.gencat.cat>`. Definir només si Selenium està habilitat.
- **selenium_umbral**: Llindar de Selenium. Ha de tenir un valor numèric entre cometes, ex: `"20"`. Definir només si Selenium està habilitat.
- **jira_project_key**: Clau del projecte Jira. Definir només si Selenium està habilitat.
- **jira_issue_key**: Clau de l'issue de Jira. Definir només si Selenium està habilitat.
- **itsm_id_change_coordinator**: ID del coordinador de canvis de l'ITSM.

#### CI on commit develop
- **technology**: Tecnologia del projecte. Valors possibles:
  - `java`
  - `nodejs`
- **docker_build_context**: Context de construcció de Docker. Per defecte és `"."` (l'arrel).
- **project_name**: Nom del projecte, especificar només si no hi ha compilació en el projecte.
- **java_version**: Versió de Java. Definir només si el projecte es basa en tecnologia Java.
- **java_distribution**: Distribució de Java. Definir només si el projecte es basa en tecnologia Java.
- **maven_version**: Versió de Maven. Definir només si el projecte es basa en tecnologia Java.
- **sonar_exclusions**: Exclusió de Sonar, pot estar buit.
- **node_version**: Versió de Node. Definir només si el projecte es basa en tecnologia Node.
- **install_build_command**: Comandament d'instal·lació. Definir només si el projecte es basa en tecnologia Node.
- **sonar_exclusions**: Exclusió de Sonar. Exemples:
  - `node_modules/**`
  - `test/**`

#### CI on commit
- **technology**: Tecnologia del projecte. Valors possibles:
  - `java`
  - `nodejs`
- **project_name**: Nom del projecte, especificar només si no hi ha compilació en el projecte.

#### CI on PR
- **technology**: Tecnologia del projecte. Valors possibles:
  - `java`
  - `nodejs`
- **java_version**: Versió de Java. Definir només si el projecte es basa en tecnologia Java.
- **java_distribution**: Distribució de Java. Definir només si el projecte es basa en tecnologia Java.
- **maven_version**: Versió de Maven. Definir només si el projecte es basa en tecnologia Java.
- **sonar_exclusions**: Exclusió de Sonar, pot estar buit.
- **node_version**: Versió de Node. Definir només si el projecte es basa en tecnologia Node.
- **sonar_exclusions**: Exclusió de Sonar. Exemples:
  - `node_modules/**`
  - `test/**`

### Static

#### CD
- **technology**: Tecnologia del projecte. Valors possibles:
  - `raw`
  - `nodejs`
- **project_name**: Nom del projecte, especificar només si no hi ha compilació en el projecte.
- **cloud**: Entorn al núvol. Valors possibles:
  - `aws`
  - `azure`
  - `gcp`
- **engine**: Plataforma de desplegament. Valors possibles:
  - `s3`
  - `ablobstorage`
  - `cloudstorage`
- **artifact_version**: Versió de l'artefacte.
- **environment**: Entorn.
- **storage_name**: Nom d'emmagatzematge.
- **destination_prefix**: Prefix de destinació. Definir si el núvol és AWS i hi ha una subcarpeta dins del bucket de S3, especifiqueu-ho aquí.
- **healthcheck_url**: URL del comprovador d'estat. Ha de ser `https://<endpoint_url.gencat.cat>/`. Definir si existeix un endpoint després del deploy i una expressió d'avaluació del body.
- **healthcheck_regex**: Regressió de l'estat. Ha de tenir format semàntic entre cometes, ex: `"1.0.0"`. Definir si existeix un endpoint després del deploy i una expressió d'avaluació del body.
- **healthcheck_timeout**: Temps màxim per a la comprovació d'estat. Ha de tenir un valor numèric entre cometes, ex: `"300"`. Definir si existeix un endpoint després del deploy i una expressió d'avaluació del body.
- **repository_mat**: Per habilitar o deshabilitar la MAT del repositori. Valors possibles:
  - `true`
  - `false`
- **selenium_enabled**: Per habilitar o deshabilitar Selenium. Valors possibles:
  - `true`
  - `false`
- **selenium_urlapp**: URL de Selenium, ha de tenir el valor: `https://<urlapp.gencat.cat>`. Definir només si Selenium està habilitat.
- **selenium_umbral**: Llindar de Selenium. Ha de tenir un valor numèric entre cometes, ex: `"20"`. Definir només si Selenium està habilitat.
- **jira_project_key**: Clau del projecte Jira. Definir només si Selenium està habilitat.
- **jira_issue_key**: Clau de l'issue de Jira. Definir només si Selenium està habilitat.
- **itsm_id_change_coordinator**: ID del coordinador de canvis de l'ITSM.

#### CI on commit
- **technology**: Tecnologia del projecte. Valors possibles:
  - `raw`
  - `nodejs`
- **project_name**: Nom del projecte, especificar només si no hi ha compilació en el projecte.
- **node_version**: Versió de Node. Definir només si el projecte es basa en tecnologia Node.
- **install_build_command**: Comandament d'instal·lació. Definir només si el projecte es basa en tecnologia Node.
- **sonar_exclusions**: Exclusió de Sonar. Exemples:
  - `node_modules/**`
  - `test/**`
- **source_path**: Paràmetre de la ruta de sortida de l'arxiu angular.json.

#### CI on PR
- **technology**: Tecnologia del projecte. Valors possibles:
  - `raw`
  - `nodejs`
- **node_version**: Versió de Node. Definir només si el projecte es basa en tecnologia Node.
- **sonar_exclusions**: Exclusió de Sonar. Exemples:
  - `node_modules/**`
  - `test/**`


### Function

#### CD
- **technology**: Tecnologia del projecte. Valors possibles:
  - java
  - nodejs
- **project_name**: Nom del projecte, especificar només si no hi ha compilació en el projecte.
- **cloud**: Entorn al núvol. Valors possibles:
  - aws
  - azure
  - gcp
- **engine**: Plataforma de desplegament. Valors possibles:
  - lambda
  - Afunction
- **artifact_version**: Versió de l'artefacte.
- **environment**: Entorn.
- **function_names**: Noms de les funcions.
- **folder_names**: Noms dels fitxers.
- **storage_name**: Nom d'emmagatzematge. Descomentar només si s'espera que el fitxer .zip tingui més de 50 MB i és necessari pujar-lo a un bucket.
- **functions_folder_path**: Ruta del fitxer de les funcions. Descomentar només si les funcions es troben en una carpeta diferent a l'arrel del repositori.
- **healthcheck_url**: URL del comprovador d'estat. Ha de ser `https://<endpoint_url.gencat.cat>/`. Definir si existeix un endpoint després del deploy i una expressió d'avaluació del body.
- **healthcheck_regex**: Regresió de l'estat. Ha de tenir format semàntic entre cometes, ex: "1.0.0". Definir si existeix un endpoint després del deploy i una expressió d'avaluació del body.
- **healthcheck_timeout**: Temps màxim per a la comprovació d'estat. Ha de tenir un valor numèric entre cometes, ex: "300". Definir si existeix un endpoint després del deploy i una expressió d'avaluació del body.
- **repository_mat**: Per habilitar o deshabilitar la MAT del repositori. Valors possibles:
  - true
  - false
- **selenium_enabled**: Per habilitar o deshabilitar Selenium. Valors possibles:
  - true
  - false
- **selenium_urlapp**: URL de Selenium, ha de tenir el valor: `https://<urlapp.gencat.cat>`. Definir només si Selenium està habilitat.
- **selenium_umbral**: Llindar de Selenium. Ha de tenir un valor numèric entre cometes, ex: "20". Definir només si Selenium està habilitat.
- **jira_project_key**: Clau del projecte Jira. Definir només si Selenium està habilitat.
- **jira_issue_key**: Clau de l'issue de Jira. Definir només si Selenium està habilitat.
- **itsm_id_change_coordinator**: ID del coordinador de canvis de l'ITSM.

#### CI on Commit
- **technology**: Tecnologia del projecte. Valors possibles:
  - java
  - nodejs
- **project_name**: Nom del projecte, especificar només si no hi ha compilació en el projecte.
- **java_version**: Versió de Java. Definir només si el projecte es basa en tecnologia Java.
- **java_distribution**: Distribució de Java. Definir només si el projecte es basa en tecnologia Java.
- **maven_version**: Versió de Maven. Definir només si el projecte es basa en tecnologia Java.
- **sonar_exclusions**: Exclusió de Sonar, pot estar buit.
- **node_version**: Versió de Node. Definir només si el projecte es basa en tecnologia Node.
- **install_build_command**: Comanda d'instal·lació. Definir només si el projecte es basa en tecnologia Node.
- **sonar_exclusions**: Exclusió de Sonar. Exemples:
  - node_modules/**
  - test/**

#### CI on PR
- **technology**: Tecnologia del projecte. Valors possibles:
  - java
  - nodejs
- **java_version**: Versió de Java. Definir només si el projecte es basa en tecnologia Java.
- **java_distribution**: Distribució de Java. Definir només si el projecte es basa en tecnologia Java.
- **maven_version**: Versió de Maven. Definir només si el projecte es basa en tecnologia Java.
- **sonar_exclusions**: Exclusió de Sonar, pot estar buit.
- **node_version**: Versió de Node. Definir només si el projecte es basa en tecnologia Node.
- **sonar_exclusions**: Exclusió de Sonar. Exemples:
  - node_modules/**
  - test/**

### Executor

#### Extended descriptor CD
- **cloud**: Entorno en la nube. Valores posibles:
  - `aws`
  - `azure`
  - `gcp`
- **engine**: Plataforma de despliegue. Valores posibles:
  - `kubernetes`
  - `database`
- **artifact_version**: Versión del artefacto.
- **environment**: Entorno.
- **function_name**: Nombres de la función.
- **cluster_name**: Nombre del clúster.
- **chart_name**: Nombre del Helm Chart.
- **local_chart_path**: Ruta local del Helm Chart.
- **namespace**: Nombre de espacio.
- **jdbc_url**: URI endpoint de la BBDDs.
- **db_username**: Nombre de la base de datos.
- **changelog_file**: Fichero de los de cambios.
- **secret_name**: Nombre del secreto.
- **resource_group**: Grupo de recursos. Definir solamente si se basa en tecnología Azure Cloud.
- **destination_prefix**: Prefijo de destino. Definir si la nube es AWS y hay una subcarpeta dentro del bucket de S3.
- **healthcheck_url**: URL del comprobador de estado. Debe ser `https://<endpoint_url.gencat.cat>/`. Definir si existe un endpoint tras el deploy y una expresión de evaluación del body.
- **healthcheck_regex**: Regresión del estado. Debe tener formato semántico entre comillas, ej: `"1.0.0"`. Definir si existe un endpoint tras el deploy y una expresión de evaluación del body.
- **healthcheck_timeout**: Tiempo máximo para la comprobación de estado. Debe tener un valor numérico entre comillas, ej: `"300"`. Definir si existe un endpoint tras el deploy y una expresión de evaluación del body.
- **repository_mat**: Para habilitar o deshabilitar la MAT del repositorio. Valores posibles:
  - `true`
  - `false`
- **selenium_enabled**: Para habilitar o deshabilitar Selenium. Valores posibles:
  - `true`
  - `false`
- **selenium_urlapp**: URL de Selenium, debe tener el valor: `https://<urlapp.gencat.cat>`. Definir sólo si Selenium está habilitado.
- **selenium_umbral**: Umbral de Selenium. Debe tener un valor numérico entre comillas, ej: `"20"`. Definir sólo si Selenium está habilitado.
- **jira_project_key**: Clave del proyecto Jira. Definir sólo si Selenium está habilitado.
- **jira_issue_key**: Clave del issue de Jira. Definir sólo si Selenium está habilitado.
- **itsm_id_change_coordinator**: ID del coordinador de cambios del ITSM.

#### Extended executor CD
- **cloud**: Entorno en la nube. Valores posibles:
  - `aws`
  - `azure`
  - `gcp`
- **engine**: Plataforma de despliegue. Valores posibles:
  - `kubernetes`
  - `database`
- **executor_image_version**: Ejecutor de la versión de imagen.
- **environment**: Entorno.
- **registry_name**: Nombre del registro.
- **function_name**: Nombres de la función.
- **resource_group**: Grupo de recurso. Definir solamente si la tecnología se basa en Azure Cloud.

### Infra

#### CD Apply
- **cloud**: Entorn al núvol. Valors possibles:
  - `aws`
  - `azure`
  - `gcp`
- **terraform_version**: Versió de Terraform.
- **infra_version_plan**: Versió del pla d'Infracost.
- **environment**: Entorn.
- **healthcheck_url**: URL del comprovador d'estat. Ha de ser `https://<endpoint_url.gencat.cat>/`. Definir si existeix un endpoint després del deploy i una expressió d'avaluació del body.
- **healthcheck_regex**: Regressió de l'estat. Ha de tenir format semàntic entre cometes, ex: `"1.0.0"`. Definir si existeix un endpoint després del deploy i una expressió d'avaluació del body.
- **healthcheck_timeout**: Temps màxim per a la comprovació d'estat. Ha de tenir un valor numèric entre cometes, ex: `"300"`. Definir si existeix un endpoint després del deploy i una expressió d'avaluació del body.
- **repository_mat**: Per habilitar o deshabilitar la MAT del repositori. Valors possibles:
  - `true`
  - `false`
- **selenium_enabled**: Per habilitar o deshabilitar Selenium. Valors possibles:
  - `true`
  - `false`
- **selenium_urlapp**: URL de Selenium, ha de tenir el valor: `https://<urlapp.gencat.cat>`. Definir només si Selenium està habilitat.
- **selenium_umbral**: Llindar de Selenium. Ha de tenir un valor numèric entre cometes, ex: `"20"`. Definir només si Selenium està habilitat.
- **jira_project_key**: Clau del projecte Jira. Definir només si Selenium està habilitat.
- **jira_issue_key**: Clau de l'issue de Jira. Definir només si Selenium està habilitat.
- **itsm_id_change_coordinator**: ID del coordinador de canvis de l'ITSM.

#### CI on Commit
- **terraform_version**: Versió de Terraform.

#### CI on PR
- **cloud**: Entorn al núvol. Valors possibles:
  - `aws`
  - `azure`
  - `gcp`
- **terraform_version**: Versió de Terraform.

### Library

#### CI on Commit
- **technology**: Tecnologia del projecte. Valors possibles:
  - `java`
  - `nodejs`
- **java_version**: Versió de Java. Definir només si el projecte es basa en tecnologia Java.
- **java_distribution**: Distribució de Java. Definir només si el projecte es basa en tecnologia Java.
- **maven_version**: Versió de Maven. Definir només si el projecte es basa en tecnologia Java.
- **sonar_exclusions**: Exclusió de Sonar, pot estar buit.
- **node_version**: Versió de Node. Definir només si el projecte es basa en tecnologia Node.
- **install_build_command**: Comanda d'instal·lació. Definir només si el projecte es basa en tecnologia Node.
- **sonar_exclusions**: Exclusió de Sonar. Exemples:
  - `node_modules/**`
  - `test/**`

#### CI on PR
- **technology**: Tecnologia del projecte. Valors possibles:
  - `java`
  - `nodejs`
- **java_version**: Versió de Java. Definir només si el projecte es basa en tecnologia Java.
- **java_distribution**: Distribució de Java. Definir només si el projecte es basa en tecnologia Java.
- **maven_version**: Versió de Maven. Definir només si el projecte es basa en tecnologia Java.
- **sonar_exclusions**: Exclusió de Sonar, pot estar buit.
- **node_version**: Versió de Node. Definir només si el projecte es basa en tecnologia Node.
- **install_build_command**: Comanda d'instal·lació. Definir només si el projecte es basa en tecnologia Node.
- **sonar_exclusions**: Exclusió de Sonar. Exemples:
  - `node_modules/**`
  - `test/**`