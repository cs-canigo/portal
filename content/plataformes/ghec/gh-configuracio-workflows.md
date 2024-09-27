
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

### Desplegaments estesos

#### Executor CD
- **cloud**: Entorn al núvol. Valors possibles:
  - `aws`
  - `azure`
  - `gcp`
- **engine**: Plataforma de desplegament. Valors possibles:
  - `kubernetes`
  - `database`
- **executor_image_version**: Versió d'imatge del executor.
- **environment**: Entorn.
- **registry_name**: Nom del registre.
- **function_name**: Nom de la funció.
- **resource_group**: Grup de recursos. Definir únicament si el cloud és `azure`.


#### Descriptors CD
- **cloud**: Entorn al núvol. Valors possibles:
  - `aws`
  - `azure`
  - `gcp`
- **engine**: Plataforma de desplegament. Valors possibles:
  - `kubernetes`
  - `database`
- **artifact_version**: Versió de l'artefacte.
- **environment**: Entorn.
- **function_name**: Nom de la funció.
- **cluster_name**: Nom del clúster.
- **chart_name**: Nom del Helm Chart.
- **local_chart_path**: Ruta local del Helm Chart.
- **namespace**: Nom del namespace dins el clúster.
- **jdbc_url**: URI endpoint de la BBDD.
- **db_username**: Nom de la base de dades.
- **changelog_file**: Fitxer de canvis.
- **secret_name**: Nom del secret.
- **resource_group**: Grup de recursos. Definir únicament si el cloud és `azure`.
- **destination_prefix**: Prefix de destí. Definir si el núvol és AWS i hi ha una subcarpeta dins del bucket de S3.
- **healthcheck_url**: URL del healthcheck. Actualment només es suporten URLs accessibles des d'internet `https://<endpoint_url.gencat.cat>/`.
- **healthcheck_regex**: Expessió regular per evaluar el contingut de la resposta.
- **healthcheck_timeout**: Temps màxim per comprovar el healthcheck. Ha de tenir un valor numèric entre cometes, ex: `"300"`.
- **repository_mat**: Per habilitar o deshabilitar la MAT del repositori. Valors possibles:
  - `true`
  - `false`
- **selenium_enabled**: Per habilitar o deshabilitar Selenium. Valors possibles:
  - `true`
  - `false`
- **selenium_urlapp**: URL de Selenium, ha de tener el valor: `https://<urlapp.gencat.cat>`. Definir únicament si Selenium està habilitat.
- **selenium_umbral**: Llindar de Selenium. Ha de tenir un valor numèric entre cometes, ex: `"20"`. Definir només si Selenium està habilitat.
- **jira_project_key**: Clau del projecte JIRA. Definir només si Selenium está habilitat.
- **jira_issue_key**: Clau de la issue de JIRA. Definir només si Selenium está habilitat.
- **itsm_id_change_coordinator**: ID del coordinador de canvis d'ITSM.
