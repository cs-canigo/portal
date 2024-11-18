
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
- **cloud**: (obligatori) Entorn al núvol. Valors possibles:
  - `aws` (default)
  - `azure`
  - `gcp`
- **terraform_version**: (obligatori) Versió de Terraform.
- **infra_version_plan**: (obligatori) Versió del pla d'Infracost.
- **environment**: (obligatori) Entorn.
- **healthcheck_url**: (opcional) URL del comprovador d'estat. Ha de ser `https://<endpoint_url.gencat.cat>/`. Definir si existeix un endpoint després del deploy i una expressió d'avaluació del body.
- **healthcheck_regex**: (opcional) Regressió de l'estat. Ha de tenir format semàntic entre cometes, ex: `"1.0.0"`. Definir si existeix un endpoint després del deploy i una expressió d'avaluació del body.
- **healthcheck_timeout**: (opcional) Temps màxim per a la comprovació d'estat. Ha de tenir un valor numèric entre cometes, ex: `"300"`. Definir si existeix un endpoint després del deploy i una expressió d'avaluació del body.
- **repository_mat**: (opcional) Per habilitar o deshabilitar la MAT del repositori. Valors possibles:
  - `true` (default)
  - `false`
- **selenium_enabled**: (opcional) Per habilitar o deshabilitar Selenium. Valors possibles:
  - `true`
  - `false` (default)
- **selenium_urlapp**: (opcional) URL de Selenium, ha de tenir el valor: `https://<urlapp.gencat.cat>`. Definir només si Selenium està habilitat.
- **selenium_umbral**: (opcional) Llindar de Selenium. Ha de tenir un valor numèric entre cometes, ex: `"20"`. Definir només si Selenium està habilitat. Valor per defecte: 20.
- **jira_project_key**: (opcional) Clau del projecte Jira. Definir només si Selenium està habilitat.
- **jira_issue_key**: (opcional) Clau de l'issue de Jira. Definir només si Selenium està habilitat.
- **itsm_enabled**: (opcional) Per habilitar o deshabilitar ITSM. Valors possibles:
  - `true` (default)
  - `false`
- **itsm_id_change_coordinator**: (opcional) ID del coordinador de canvis de l'ITSM.

**Exemple de crida al workflow:**
```yaml
  uses: ctti-arq/reusable-workflows/.github/workflows/infra-cd-apply-reusable.yaml@v3
    secrets: inherit
    with:
      cloud: aws
      terraform_version: 1.7.5
      infra_version_plan: ${{ inputs.infra_version_plan }}
      environment: ${{ inputs.environment }}
      healthcheck_url: "https://<endpoint_url.gencat.cat>/"
      healthcheck_regex: "1.0.0"
      healthcheck_timeout: "300"
      repository_mat: true
      selenium_enabled: true
      selenium_urlapp: "https://<urlapp.gencat.cat>"
      selenium_umbral: "20"
      jira_project_key: "<jira_project_key>"
      jira_issue_key: "<jira_issue_key>"
      itsm_enabled: true
      itsm_id_change_coordinator: ${{ inputs.itsm_id_change_coordinator }}
```

#### CI on Commit
- **terraform_version**: (obligatori) Versió de Terraform.

**Exemple de crida al workflow:**
```yaml
  uses: ctti-arq/reusable-workflows/.github/workflows/infra-ci-on-commit-reusable.yaml@v3
    secrets: inherit
    with:
      terraform_version: 1.7.5
```

#### CI on PR
- **cloud**: (obligatori) Entorn al núvol. Valors possibles:
  - `aws` (default)
  - `azure`
  - `gcp`
- **terraform_version**: (obligatori) Versió de Terraform.
- **checkov**: (opcional) Definir només si Checkov està habilitat. Valors possibles:
  - `true` (default)
  - `false`
- **infracost**: (opcional) Definir només si Infracost està habilitat. Valors possibles:
  - `true` (default)
  - `false`

**Exemple de crida al workflow:**
```yaml
  uses: ctti-arq/reusable-workflows/.github/workflows/infra-ci-on-pr-reusable.yaml@v3
    secrets: inherit
    with:
      cloud: aws
      terraform_version: 1.7.5
```

### Container

#### CD
- **technology**: (opcional) Tecnologia del projecte. Valors possibles:
  - `java`
  - `nodejs`
  - `dotnet` **IMPORTANT .Net Framework no està suportat**
- **project_name**: (opcional) Nom del projecte, especificar només si no hi ha compilació en el projecte.
- **cloud**: (obligatori) Entorn al núvol. Valors possibles:
  - `aws` (default)
  - `azure`
  - `gcp`
- **engine**: (obligatori) Plataforma de desplegament. Valors possibles:
  - `ecs` (default)
  - `aca`
- **artifact_version**: (obligatori) Versió de l'artefacte.
- **environment**: (obligatori) Entorn.
- **service_name**: (opcional) Nom del servei.
- **registry_name**:(obligatori)  Nom del registre.
- **cluster_name**: (opcional) Nom del clúster. Definir si el projecte es basa en un motor AWS o ECS.
- **task_definition_name**: (opcional) Nom de la definició de la tasca. Definir només si el projecte es basa en AWS.
- **resource_group**: (opcional) Nom de grup de recurs. Definir si el projecte es basa en Azure Cloud o ACA engine.
- **healthcheck_url**: (opcional) URL del comprovador d'estat. Ha de ser `https://<endpoint_url.gencat.cat>/`. Definir si existeix un endpoint després del deploy i una expressió d'avaluació del body.
- **healthcheck_regex**: (opcional) Regressió de l'estat. Ha de tenir format semàntic entre cometes, ex: `"1.0.0"`. Definir si existeix un endpoint després del deploy i una expressió d'avaluació del body.
- **healthcheck_timeout**: (opcional) Temps màxim per a la comprovació d'estat. Ha de tenir un valor numèric entre cometes, ex: `"300"`. Definir si existeix un endpoint després del deploy i una expressió d'avaluació del body.
- **repository_mat**: (opcional) Per habilitar o deshabilitar la MAT del repositori. Valors possibles:
  - `true` (default)
  - `false`
- **selenium_enabled**: (opcional) Per habilitar o deshabilitar Selenium. Valors possibles:
  - `true`
  - `false` (default)
- **selenium_urlapp**: (opcional) URL de Selenium, ha de tenir el valor: `https://<urlapp.gencat.cat>`. Definir només si Selenium està habilitat.
- **selenium_umbral**: (opcional) Llindar de Selenium. Ha de tenir un valor numèric entre cometes, ex: `"20"`. Definir només si Selenium està habilitat. Valor per defecte: 20.
- **jira_project_key**: (opcional) Clau del projecte Jira. Definir només si Selenium està habilitat.
- **jira_issue_key**: (opcional) Clau de l'issue de Jira. Definir només si Selenium està habilitat.
- **itsm_enabled**: (opcional) Per habilitar o deshabilitar ITSM. Valors possibles:
  - `true` (default)
  - `false`
- **itsm_id_change_coordinator**: (opcional) ID del coordinador de canvis de l'ITSM.

**Exemple de crida al workflow:**
```yaml
  uses: ctti-arq/reusable-workflows/.github/workflows/container-cd-reusable.yaml@v3
    secrets: inherit
    with:
      technology: java
      cloud: aws
      engine: ecs
      artifact_version: ${{ inputs.artifact_version }}
      environment: ${{ inputs.environment }}
      service_name: ${{ inputs.service_name }}
      registry_name: ${{ inputs.registry_name }}
      cluster_name: ${{ inputs.cluster_name }}
      task_definition_name: ${{ inputs.task_definition_name }}
      resource_group: ${{ inputs.resource_group }}
      healthcheck_url: "https://<endpoint_url.gencat.cat>/"
      healthcheck_regex: "1.0.0"
      healthcheck_timeout: "300"
      repository_mat: true
      selenium_enabled: true
      selenium_urlapp: "https://<urlapp.gencat.cat>"
      selenium_umbral: "20"
      jira_project_key: "<jira_project_key>"
      jira_issue_key: "<jira_issue_key>"
      itsm_enabled: true
      itsm_id_change_coordinator: ${{ inputs.itsm_id_change_coordinator }}
```

#### CI on commit develop
- **technology**: (opcional) Tecnologia del projecte. Valors possibles:
  - `java`
  - `nodejs`
  - `dotnet` **IMPORTANT .Net Framework no està suportat**
- **docker_build_context**: (opcional) Context de construcció de Docker. Per defecte és `"."` (l'arrel). Valor per defecte: `"."`
- **project_name**: (opcional) Nom del projecte, especificar només si no hi ha compilació en el projecte.  En el cas de projectes amb tecnologia .NET i que en el repositori de projecte existeixin mes de dos .csproj, aquesta propietat project_name és obligatòria.
- **java_version**: (opcional) Versió de Java. Definir només si el projecte es basa en tecnologia Java.
- **java_distribution**: (opcional) Distribució de Java. Definir només si el projecte es basa en tecnologia Java.
- **maven_version**: (opcional) Versió de Maven. Definir només si el projecte es basa en tecnologia Java.
- **sonar_exclusions**: (opcional) Exclusió de Sonar, pot estar buit.
- **node_version**: (opcional) Versió de Node. Definir només si el projecte es basa en tecnologia Node.
- **dotnet_version**: (opcional) Versió de .Net. Definir només si el projecte es basa en tecnologia .Net.
- **install_build_command**: (opcional) Comanda personalitzada per construir i empaquetar el projecte. El valor per defecte per a nodejs és `"npm ci && npm run build"`, i per a java maven `"mvn package -Dmaven.test.skip=true"`
- **sonar_exclusions**: (opcional) Exclusió de Sonar. Exemples:
  - `node_modules/**`
  - `test/**`

**Exemple de crida al workflow:**
```yaml
uses: ctti-arq/reusable-workflows/.github/workflows/container-ci-on-commit-develop-reusable.yaml@v3
    secrets: inherit
    with:
      technology: java
      java_version: 21
      java_distribution: temurin
      maven_version: 3.9.5
      # install_build_command: "mvn package -Dmaven.test.skip=true"
```

#### CI on commit
- **technology**: (opcional) Tecnologia del projecte. Valors possibles:
  - `java`
  - `nodejs`
  - `dotnet` **IMPORTANT .Net Framework no està suportat**
- **project_name**: (opcional) Nom del projecte, especificar només si no hi ha compilació en el projecte. En el cas de projectes amb tecnologia .NET i que en el repositori de projecte existeixin mes de dos .csproj, aquesta propietat project_name és obligatòria.

**Exemple de crida al workflow:**
```yaml
  uses: ctti-arq/reusable-workflows/.github/workflows/container-ci-on-commit-reusable.yaml@v3
    secrets: inherit
    with:
      technology: java
```


#### CI on PR
- **technology**: (opcional) Tecnologia del projecte. Valors possibles:
  - `java`
  - `nodejs`
  - `raw`
  - `dotnet` **IMPORTANT .Net Framework no està suportat**
- **java_version**: (opcional) Versió de Java. Definir només si el projecte es basa en tecnologia Java.
- **java_distribution**: (opcional) Distribució de Java. Definir només si el projecte es basa en tecnologia Java.
- **maven_version**: (opcional) Versió de Maven. Definir només si el projecte es basa en tecnologia Java.
- **sonar_exclusions**: (opcional) Exclusió de Sonar, pot estar buit.
- **node_version**: (opcional) Versió de Node. Definir només si el projecte es basa en tecnologia Node.
- **dotnet_version**: (opcional) Versió de .Net. Definir només si el projecte es basa en tecnologia .Net.
- **sonar_exclusions**: (opcional) Exclusió de Sonar. Exemples:
  - `node_modules/**`
  - `test/**`
- **unit_test**: (opcional) Realització de proves unitàries.
  Valor per defecte: false.
- **sonarqube**: (opcional) Utilització de SonarQube.
  Valor per defecte: true.
- **dependabot**: (opcional) Activació de Dependabot.
  Valor per defecte: true.
- **project_name**: (opcional) Nom del projecte, especificar només si no hi ha compilació en el projecte. En el cas de projectes amb tecnologia .NET i que en el repositori de projecte existeixin mes de dos .csproj, aquesta propietat project_name és obligatòria.

**Exemple de crida al workflow:**
```yaml
  uses: ctti-arq/reusable-workflows/.github/workflows/container-ci-on-pr-reusable.yaml@v3
    secrets: inherit
    with:
      technology: java
      java_version: 21
      java_distribution: temurin
      maven_version: 3.9.5
```

### Function

#### CD
- **technology**: (opcional) Tecnologia del projecte. Valors possibles:
  - `java`
  - `nodejs`
  - `dotnet` **IMPORTANT .Net Framework no està suportat**
- **project_name**: (opcional) Nom del projecte, especificar només si no hi ha compilació en el projecte.
- **cloud**: Entorn al núvol. Valors possibles:
  - `aws` (default)
  - `azure`
  - `gcp`
- **engine**: (obligatori) Plataforma de desplegament. Valors possibles:
  - `lambda`
  - `afunction`
- **artifact_version**: (obligatori) Versió de l'artefacte.
- **environment**: (obligatori) Entorn.
- **function_names**: (obligatori) Noms de les funcions.
- **folder_names**: (opcional) Noms dels fitxers.
- **storage_name**: (opcional) Nom d'emmagatzematge. Descomentar només si s'espera que el fitxer .zip tingui més de 50 MB i és necessari pujar-lo a un bucket.
- **functions_folder_path**: (opcional) Ruta del fitxer de les funcions. Descomentar només si les funcions es troben en una carpeta diferent a l'arrel del repositori.
- **healthcheck_url**: (opcional) URL del comprovador d'estat. Ha de ser `https://<endpoint_url.gencat.cat>/`. Definir si existeix un endpoint després del deploy i una expressió d'avaluació del body.
- **healthcheck_regex**: (opcional) Regresió de l'estat. Ha de tenir format semàntic entre cometes, ex: "1.0.0". Definir si existeix un endpoint després del deploy i una expressió d'avaluació del body.
- **healthcheck_timeout**: (opcional) Temps màxim per a la comprovació d'estat. Ha de tenir un valor numèric entre cometes, ex: "300". Definir si existeix un endpoint després del deploy i una expressió d'avaluació del body.
- **repository_mat**: (opcional) Per habilitar o deshabilitar la MAT del repositori. Valors possibles:
  - `true` (default)
  - `false`
- **selenium_enabled**: (opcional) Per habilitar o deshabilitar Selenium. Valors possibles:
  - `true`
  - `false` (default)
- **selenium_urlapp**: (opcional) URL de Selenium, ha de tenir el valor: `https://<urlapp.gencat.cat>`. Definir només si Selenium està habilitat. Valor per defecte: false.
- **selenium_umbral**: (opcional) Llindar de Selenium. Ha de tenir un valor numèric entre cometes, ex: "20". Definir només si Selenium està habilitat. Valor per defecte: 20.
- **jira_project_key**: (opcional) Clau del projecte Jira. Definir només si Selenium està habilitat.
- **jira_issue_key**: (opcional) Clau de l'issue de Jira. Definir només si Selenium està habilitat.
- **itsm_id_change_coordinator**: (opcional) ID del coordinador de canvis de l'ITSM.
- **itsm_enabled**: (opcional) Permet activar la funcionalitat d'ITSM. Valor per defecte: false.

**Exemple de crida al workflow:**
```yaml
  uses: ctti-arq/reusable-workflows/.github/workflows/function-cd-reusable.yaml@v3
    secrets: inherit
    with:
      technology: nodejs
      cloud: aws
      engine: lambda
      artifact_version: ${{ inputs.artifact_version }}
      environment: ${{ inputs.environment }}
      function_names: ${{ inputs.function_names }}
      folder_names: ${{ inputs.folder_names}}
      storage_name: ${{ inputs.storage_name }}
      healthcheck_url: "https://<endpoint_url.gencat.cat>/"
      healthcheck_regex: "1.0.0"
      healthcheck_timeout: "300"
      repository_mat: true
      selenium_enabled: true
      selenium_urlapp: "https://<urlapp.gencat.cat>"
      selenium_umbral: "20"
      jira_project_key: "<jira_project_key>"
      jira_issue_key: "<jira_issue_key>"
      itsm_enabled: true
      itsm_id_change_coordinator: ${{ inputs.itsm_id_change_coordinator }}
```

#### CI on Commit
- **technology**: (opcional) Tecnologia del projecte. Valors possibles:
  - `java`
  - `nodejs`
  - `dotnet` **IMPORTANT .Net Framework no està suportat**
- **project_name**: (opcional) Nom del projecte, especificar només si no hi ha compilació en el projecte. En el cas de projectes amb tecnologia .NET i que en el repositori de projecte existeixin mes de dos .csproj, aquesta propietat project_name és obligatòria.
- **java_version**: (opcional) Versió de Java. Definir només si el projecte es basa en tecnologia Java.
- **java_distribution**: (opcional) Distribució de Java. Definir només si el projecte es basa en tecnologia Java.
- **maven_version**: (opcional) Versió de Maven. Definir només si el projecte es basa en tecnologia Java.
- **sonar_exclusions**: (opcional) Exclusió de Sonar, pot estar buit.
- **node_version**: (opcional) Versió de Node. Definir només si el projecte es basa en tecnologia Node.
- **dotnet_version**: (opcional) Versió de .Net. Definir només si el projecte es basa en tecnologia .Net.
- **install_build_command**: (opcional) Comanda personalitzada per construir i empaquetar el projecte. El valor per defecte per a nodejs és `"npm ci && npm run build"`, i per a java maven `"mvn package -Dmaven.test.skip=true"`
- **sonar_exclusions**: (opcional) Exclusió de Sonar. Exemples:
  - `node_modules/**`
  - `test/**`

**Exemple de crida al workflow:**
```yaml
  uses: ctti-arq/reusable-workflows/.github/workflows/function-ci-on-commit-reusable.yaml@v3
    secrets: inherit
    with:
      technology: java
      java_version: 21
      java_distribution: temurin
      maven_version: 3.9.5
      # install_build_command: "mvn package -Dmaven.test.skip=true"
```

#### CI on PR
- **technology**: (opcional) Tecnologia del projecte. Valors possibles:
  - `java`
  - `nodejs`
  - `dotnet` **IMPORTANT .Net Framework no està suportat**
- **java_version**: (opcional) Versió de Java. Definir només si el projecte es basa en tecnologia Java.
- **java_distribution**: (opcional) Distribució de Java. Definir només si el projecte es basa en tecnologia Java.
- **maven_version**: (opcional) Versió de Maven. Definir només si el projecte es basa en tecnologia Java.
- **sonar_exclusions**: (opcional) Exclusió de Sonar, pot estar buit.
- **node_version**: (opcional) Versió de Node. Definir només si el projecte es basa en tecnologia Node.
- **dotnet_version**: (opcional) Versió de .Net. Definir només si el projecte es basa en tecnologia .Net.
- **sonar_exclusions**: (opcional) Exclusió de Sonar. Exemples:
  - `node_modules/**`
  - `test/**`
- **unit_test**: (opcional) Indica si s'han d'executar proves unitàries com a part del workflow d'integració contínua. Valor per defecte: false.
- **sonarqube**: (opcional) Indica si s'ha d'integrar SonarQube en el procés d'integració contínua. Valor per defecte: true.
- **dependabot**: (opcional) Permet activar o desactivar la funcionalitat de Dependabot en el workflow. Valor per defecte: true.
- **project_name**: (opcional) Nom del projecte, especificar només si no hi ha compilació en el projecte. En el cas de projectes amb tecnologia .NET i que en el repositori de projecte existeixin mes de dos .csproj, aquesta propietat project_name és obligatòria.

**Exemple de crida al workflow:**
```yaml
  uses: ctti-arq/reusable-workflows/.github/workflows/function-ci-on-pr-reusable.yaml@v3
    secrets: inherit
    with:
      technology: java
      java_version: 21
      java_distribution: temurin
      maven_version: 3.9.5
```


### Static

#### CD
- **technology**: (opcional) Tecnologia del projecte. Valors possibles:
  - `raw`
  - `nodejs`
- **project_name**: (opcional) Nom del projecte, especificar només si no hi ha compilació en el projecte.
- **cloud**: (obligatori) Entorn al núvol. Valors possibles:
  - `aws` (default)
  - `azure`
  - `gcp`
- **engine**: (obligatori) Plataforma de desplegament. Valors possibles:
  - `s3`
  - `ablobstorage`
  - `cloudstorage`
- **artifact_version**: (obligatori) Versió de l'artefacte.
- **environment**: (obligatori) Entorn.
- **storage_name**: (obligatori) Nom d'emmagatzematge.
- **destination_prefix**: (opcional) Prefix de destinació. Definir si el núvol és AWS i hi ha una subcarpeta dins del bucket de S3, especifiqueu-ho aquí.
- **healthcheck_url**: (opcional) URL del comprovador d'estat. Ha de ser `https://<endpoint_url.gencat.cat>/`. Definir si existeix un endpoint després del deploy i una expressió d'avaluació del body.
- **healthcheck_regex**: (opcional) Regressió de l'estat. Ha de tenir format semàntic entre cometes, ex: `"1.0.0"`. Definir si existeix un endpoint després del deploy i una expressió d'avaluació del body.
- **healthcheck_timeout**: (opcional) Temps màxim per a la comprovació d'estat. Ha de tenir un valor numèric entre cometes, ex: `"300"`. Definir si existeix un endpoint després del deploy i una expressió d'avaluació del body.
- **repository_mat**: (opcional) Per habilitar o deshabilitar la MAT del repositori. Valors possibles:
  - `true` (default)
  - `false`
- **selenium_enabled**: (opcional) Per habilitar o deshabilitar Selenium. Valors possibles:
  - `true`
  - `false` (default)
- **selenium_urlapp**: (opcional) URL de Selenium, ha de tenir el valor: `https://<urlapp.gencat.cat>`. Definir només si Selenium està habilitat.
- **selenium_umbral**: (opcional) Llindar de Selenium. Ha de tenir un valor numèric entre cometes, ex: `"20"`. Definir només si Selenium està habilitat. Valor per defecte: 20.
- **jira_project_key**: (opcional) Clau del projecte Jira. Definir només si Selenium està habilitat.
- **jira_issue_key**: (opcional) Clau de l'issue de Jira. Definir només si Selenium està habilitat.
- **itsm_id_change_coordinator**: (opcional) ID del coordinador de canvis de l'ITSM.
- **itsm_enabled**: (opcional) Permet activar la funcionalitat d'ITSM. Valor per defecte: false.

**Exemple de crida al workflow:**
```yaml
  uses: ctti-arq/reusable-workflows/.github/workflows/static-cd-reusable.yaml@v3
    secrets: inherit
    with:
      technology: nodejs
      cloud: aws
      engine: s3
      artifact_version: ${{ inputs.artifact_version }}
      environment: ${{ inputs.environment }}
      storage_name: ${{ inputs.storage_name }}
      destination_prefix: "<bucket_subfolder_name>"
      healthcheck_url: "https://<endpoint_url.gencat.cat>/"
      healthcheck_regex: "1.0.0"
      healthcheck_timeout: "300"
      repository_mat: true
      selenium_enabled: true
      selenium_urlapp: "https://<urlapp.gencat.cat>"
      selenium_umbral: "20"
      jira_project_key: "<jira_project_key>"
      jira_issue_key: "<jira_issue_key>"
      itsm_enabled: true
      itsm_id_change_coordinator: ${{ inputs.itsm_id_change_coordinator }}
```


#### CI on commit
- **technology**: (opcional) Tecnologia del projecte. Valors possibles:
  - `raw`
  - `nodejs`
- **project_name**: (opcional) Nom del projecte, especificar només si no hi ha compilació en el projecte.
- **node_version**: (opcional) Versió de Node. Definir només si el projecte es basa en tecnologia Node.
- **install_build_command**: (opcional) (opcional) Comanda personalitzada per construir i empaquetar el projecte. El valor per defecte per a nodejs és `"npm ci && npm run build"`, i per a java maven `"mvn package -Dmaven.test.skip=true"`
- **sonar_exclusions**: (opcional) Exclusió de Sonar. Exemples:
  - `node_modules/**`
  - `test/**`
- **source_path**: (opcional) Paràmetre de la ruta de sortida de l'arxiu angular.json. Valor per defecte: src.
- **sonarqube**: (opcional) Indica si s'ha d'executar l'anàlisi de codi mitjançant SonarQube. Valor per defecte: false.
- **dependabot**: (opcional) Indica si s'ha de permetre l'ús de Dependabot. Valor per defecte: false.

**Exemple de crida al workflow:**
```yaml
  uses: ctti-arq/reusable-workflows/.github/workflows/static-ci-on-commit-reusable.yaml@v3
    secrets: inherit
    with:
      technology: nodejs
      node_version: 20.x
      # install_build_command: "npm ci && npm run build"
      sonar_exclusions: "node_modules/**,test/**"
      source_path: "dist"
```


#### CI on PR
- **technology**: (opcional) Tecnologia del projecte. Valors possibles:
  - `raw`
  - `nodejs`
- **node_version**: (opcional) Versió de Node. Definir només si el projecte es basa en tecnologia Node.
- **sonar_exclusions**: (opcional) Exclusió de Sonar. Exemples:
  - `node_modules/**`
  - `test/**`
- **unit_test**: (opcional) Indica si s'han d'executar proves unitàries com a part del flux de treball d'integració contínua. Valor per defecte: false.
- **sonarqube**: (opcional) Habilita la integració amb SonarQube. Valor per defecte: true.
- **dependabot**: (opcional) Activa o desactiva l'ús de Dependabot
  Valor per defecte: true.

**Exemple de crida al workflow:**
```yaml
  uses: ctti-arq/reusable-workflows/.github/workflows/static-ci-on-pr-reusable.yaml@v3
    secrets: inherit
    with:
      technology: nodejs
      node_version: 20.x
      sonar_exclusions: "node_modules/**,test/**"
```


### Library

#### CI on Commit
- **technology**: (obligatori) Tecnologia del projecte. Valors possibles:
  - `java`
  - `nodejs`
  - `dotnet` **IMPORTANT .Net Framework no està suportat**
- **java_version**: (opcional) Versió de Java. Definir només si el projecte es basa en tecnologia Java.
- **java_distribution**: (opcional) Distribució de Java. Definir només si el projecte es basa en tecnologia Java.
- **maven_version**: (opcional) Versió de Maven. Definir només si el projecte es basa en tecnologia Java.
- **sonar_exclusions**: (opcional) Exclusió de Sonar, pot estar buit.
- **node_version**: (opcional) Versió de Node. Definir només si el projecte es basa en tecnologia Node.
- **dotnet_version**: (opcional) Versió de .Net. Definir només si el projecte es basa en tecnologia .Net.
- **install_build_command**: (opcional) Comanda personalitzada per construir i empaquetar el projecte. El valor per defecte per a nodejs és `"npm ci && npm run build"`, i per a java maven `"mvn package -Dmaven.test.skip=true"`
- **sonar_exclusions**: (opcional) Exclusió de Sonar. Exemples:
  - `node_modules/**`
  - `test/**`
- **sonarqube**: (opcional) Indica si s'ha d'executar l'anàlisi de codi mitjançant SonarQube. Valor per defecte: false.
- **dependabot**: (opcional) Indica si s'ha de permetre l'ús de Dependabot. Valor per defecte: false.
- **project_name**: (opcional) Nom del projecte, especificar només si no hi ha compilació en el projecte. En el cas de projectes amb tecnologia .NET i que en el repositori de projecte existeixin mes de dos .csproj, aquesta propietat project_name és obligatòria.

**Exemple de crida al workflow:**
```yaml
  uses: ctti-arq/reusable-workflows/.github/workflows/library-ci-on-commit-reusable.yaml@v3
    secrets: inherit
    with:
      technology: java
      java_version: 21
      java_distribution: temurin
      maven_version: 3.9.5
      # install_build_command: "mvn package -Dmaven.test.skip=true"
```

#### CI on PR
- **technology**: (opcional) Tecnologia del projecte. Valors possibles:
  - `java`
  - `nodejs`
  - `dotnet` **IMPORTANT .Net Framework no està suportat**
- **java_version**: (opcional) Versió de Java. Definir només si el projecte es basa en tecnologia Java.
- **java_distribution**: (opcional) Distribució de Java. Definir només si el projecte es basa en tecnologia Java.
- **maven_version**: (opcional) Versió de Maven. Definir només si el projecte es basa en tecnologia Java.
- **sonar_exclusions**: (opcional) Exclusió de Sonar, pot estar buit.
- **node_version**: (opcional) Versió de Node. Definir només si el projecte es basa en tecnologia Node.
- **dotnet_version**: (opcional) Versió de .Net. Definir només si el projecte es basa en tecnologia .Net.
- **sonar_exclusions**: (opcional) Exclusió de Sonar. Exemples:
  - `node_modules/**`
  - `test/**`
- **sonarqube**: (opcional) Indica si s'ha d'executar l'anàlisi de codi mitjançant SonarQube. Valor per defecte: true.
- **dependabot**: (opcional) Indica si s'ha de permetre l'ús de Dependabot. Valor per defecte: true.
- **unit_test**: (opcional) Realització de proves unitàries. Valor per defecte: false.
- **project_name**: (opcional) Nom del projecte, especificar només si no hi ha compilació en el projecte. En el cas de projectes amb tecnologia .NET i que en el repositori de projecte existeixin mes de dos .csproj, aquesta propietat project_name és obligatòria.

**Exemple de crida al workflow:**
```yaml
  uses: ctti-arq/reusable-workflows/.github/workflows/library-ci-on-pr-reusable.yaml@v3
    secrets: inherit
    with:
      technology: java
      java_version: 21
      java_distribution: temurin
      maven_version: 3.9.5
```

### Desplegaments estesos

#### Executor CD
- **cloud**: (obligatori) Entorn al núvol. Valors possibles:
  - `aws`
  - `azure`
  - `gcp`
- **engine**: (obligatori) Plataforma de desplegament. Valors possibles:
  - `kubernetes`
  - `database`
- **executor_image_version**: (obligatori) Versió d'imatge del executor.
- **environment**: (obligatori) Entorn.
- **registry_name**: (obligatori) Nom del registre.
- **function_name**: (obligatori) Nom de la funció.
- **resource_group**: (opcional) Grup de recursos. Definir únicament si el cloud és `azure`.

**Exemple de crida al workflow:**
```yaml
  uses: ctti-arq/reusable-workflows/.github/workflows/extended-executor-cd-reusable.yaml@v3
    secrets: inherit
    with:
      cloud: aws
      engine: kubernetes
      executor_image_version: ${{ inputs.executor_image_version }}
      environment: ${{ inputs.environment }}
      registry_name: ${{ inputs.registry_name }}
      function_name: ${{ inputs.function_name }}
```


#### Descriptors CD
- **cloud**: (obligatori) Entorn al núvol. Valors possibles:
  - `aws`
  - `azure`
  - `gcp`
- **engine**: (obligatori) Plataforma de desplegament. Valors possibles:
  - `kubernetes`
  - `database`
- **artifact_version**: (obligatori) Versió de l'artefacte.
- **environment**: (obligatori) Entorn.
- **function_name**: (obligatori) Nom de la funció.
- **cluster_name**: (opcional) Nom del clúster.
- **chart_name**: (opcional) Nom del Helm Chart.
- **local_chart_path**: (opcional) Ruta local del Helm Chart.
- **namespace**: (opcional) Nom del namespace dins el clúster.
- **jdbc_url**: (opcional) URI endpoint de la BBDD.
- **db_username**: (opcional) Nom de la base de dades.
- **changelog_file**: (opcional) Fitxer de canvis.
- **secret_name**: (opcional) Nom del secret.
- **resource_group**: (opcional) Grup de recursos. Definir únicament si el cloud és `azure`.
- **destination_prefix**: (opcional) Prefix de destí. Definir si el núvol és AWS i hi ha una subcarpeta dins del bucket de S3.
- **healthcheck_url**: (opcional) URL del healthcheck. Actualment només es suporten URLs accessibles des d'internet `https://<endpoint_url.gencat.cat>/`.
- **healthcheck_regex**: (opcional) Expessió regular per evaluar el contingut de la resposta.
- **healthcheck_timeout**: (opcional) Temps màxim per comprovar el healthcheck. Ha de tenir un valor numèric entre cometes, ex: `"300"`.
- **repository_mat**: (opcional) Per habilitar o deshabilitar la MAT del repositori. Valors possibles:
  - `true` (default)
  - `false`
- **selenium_enabled**: (opcional) Per habilitar o deshabilitar Selenium. Valors possibles:
  - `true`
  - `false` (default)
- **selenium_urlapp**: (opcional) URL de Selenium, ha de tener el valor: `https://<urlapp.gencat.cat>`. Definir únicament si Selenium està habilitat.
- **selenium_umbral**: (opcional) Llindar de Selenium. Ha de tenir un valor numèric entre cometes, ex: `"20"`. Definir només si Selenium està habilitat. Valor per defecte: 20.
- **jira_project_key**: (opcional) Clau del projecte JIRA. Definir només si Selenium está habilitat.
- **jira_issue_key**: (opcional) Clau de la issue de JIRA. Definir només si Selenium está habilitat.
- **itsm_id_change_coordinator**: (opcional) ID del coordinador de canvis d'ITSM.
- **itsm_enabled**: (opcional) Activa la funcionalitat de Gestió de Canvis ITSM
- **exclude**: (opcional) Indica els fitxers o directoris que s'han d'excloure durant el procés de càrrega de contingut. Valor per defecte: .git.
- **delete**: (opcional) Determina si els fitxers que no són presents en la font s'han de suprimir del destí durant el procés de càrrega. Valor per defecte: true.

**Exemple de crida al workflow:**
```yaml
  uses: ctti-arq/reusable-workflows/.github/workflows/extended-descriptor-cd-reusable.yaml@v3
    secrets: inherit
    with:
      cloud: aws
      engine: kubernetes
      artifact_version: ${{ inputs.artifact_version }}
      environment: ${{ inputs.environment }}
      storage_name: ${{ inputs.storage_name }}
      function_name: ${{ inputs.function_name }}

      cluster_name: ${{ inputs.cluster_name }}
      chart_name: ${{ inputs.chart_name }}
      local_chart_path: ${{ inputs.local_chart_path }}
      namespace: ${{ inputs.namespace }}
      repository_mat: true
      selenium_enabled: false
      itsm_id_change_coordinator: ${{ inputs.itsm_id_change_coordinator }}
```