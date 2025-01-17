
+++
date         = "2024-04-19"
title        = "Configuració workflows"
description  = "Guia per configurar els workflows a demanda"
weight      = "2"
sections    = ["GHEC"]
toc         = true
aliases = [
    "/drafts/ghec/gh-configuracio-workflows",
    "/ghec/gh-configuracio-workflows",
    "/plataformes/ghec/gh-configuracio-workflows"
]
+++


## Infra

### CD Apply
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

### CI on Commit
- **terraform_version**: (obligatori) Versió de Terraform.

**Exemple de crida al workflow:**
```yaml
  uses: ctti-arq/reusable-workflows/.github/workflows/infra-ci-on-commit-reusable.yaml@v3
    secrets: inherit
    with:
      terraform_version: 1.7.5
```

### CI on PR
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

## Container

### CD
- **technology**: (opcional) Tecnologia del projecte. Valors possibles:
  - `java`
  - `nodejs`
  - `dotnet` **IMPORTANT .Net Framework no està suportat**
  - `python`
  - `java-gradle`
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

### CI on commit to develop
- **technology**: (opcional) Tecnologia del projecte. Valors possibles:
  - `java`
  - `nodejs`
  - `dotnet` **IMPORTANT .Net Framework no està suportat**
  - `python`
  - `java-gradle`
- **docker_build_context**: (opcional) Context de construcció de Docker. Per defecte és `"."` (l'arrel). Valor per defecte: `"."`
- **project_name**: (opcional) Nom del projecte, especificar només si no hi ha compilació en el projecte.  En el cas de projectes amb tecnologia .NET i que en el repositori de projecte existeixin mes de dos .csproj, aquesta propietat project_name és obligatòria.
- **java_version**: (opcional) Versió de Java. Definir només si el projecte es basa en tecnologia Java.
- **java_distribution**: (opcional) Distribució de Java. Definir només si el projecte es basa en tecnologia Java.
- **maven_version**: (opcional) Versió de Maven. Definir només si el projecte es basa en tecnologia Java.
- **sonar_exclusions**: (opcional) Exclusió de Sonar, pot estar buit.
- **node_version**: (opcional) Versió de Node. Definir només si el projecte es basa en tecnologia Node.
- **dotnet_version**: (opcional) Versió de .Net. Definir només si el projecte es basa en tecnologia .Net.
- **install_build_command**: (opcional) Comanda personalitzada per construir i empaquetar el projecte. El valor per defecte per a nodejs és `"npm ci && npm run build"`, per a java maven `"mvn package -Dmaven.test.skip=true"`, per a java gradle `"gradle clean build"`, per a dotnet `"dotnet restore $PROJECT_PATH && dotnet build $PROJECT_PATH --configuration Release && dotnet publish $PROJECT_PATH --configuration Release --output ./out"`, i per a python `"pip install -r requirements.txt && python setup.py sdist bdist_wheel"`. Si no es proporciona cap comanda personalitzada, es farà servir la comanda per defecte segons la tecnologia especificada.
- **python_version**: (opcional) Versió de python. Definir només si el projecte es basa en tecnologia python.
- **gradle_version**: (opcional) Versió de gradle. Definir només si el projecte es basa en tecnologia python.
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

### CI on commit
- **technology**: (opcional) Tecnologia del projecte. Valors possibles:
  - `java`
  - `nodejs`
  - `dotnet` **IMPORTANT .Net Framework no està suportat**
  - `python`
  - `java-gradle`
- **project_name**: (opcional) Nom del projecte, especificar només si no hi ha compilació en el projecte. En el cas de projectes amb tecnologia .NET i que en el repositori de projectes hi hagi més de dos .csproj o projectes que no se li especifiqui la tecnologia, aquesta propietat project_name és obligatòria.

**Exemple de crida al workflow:**
```yaml
  uses: ctti-arq/reusable-workflows/.github/workflows/container-ci-on-commit-reusable.yaml@v3
    secrets: inherit
    with:
      technology: java
```


### CI on PR
- **technology**: (opcional) Tecnologia del projecte. Valors possibles:
  - `java`
  - `nodejs`
  - `raw`
  - `dotnet` **IMPORTANT .Net Framework no està suportat**
  - `python`
  - `java-gradle`
- **java_version**: (opcional) Versió de Java. Definir només si el projecte es basa en tecnologia Java.
- **java_distribution**: (opcional) Distribució de Java. Definir només si el projecte es basa en tecnologia Java.
- **maven_version**: (opcional) Versió de Maven. Definir només si el projecte es basa en tecnologia Java.
- **sonar_exclusions**: (opcional) Exclusió de Sonar, pot estar buit.
- **node_version**: (opcional) Versió de Node. Definir només si el projecte es basa en tecnologia Node.
- **dotnet_version**: (opcional) Versió de .Net. Definir només si el projecte es basa en tecnologia .Net.
- **python_version**: (opcional) Versió de pythont. Definir només si el projecte es basa en tecnologia python.
- **gradle_version**: (opcional) Versió de gradle. Definir només si el projecte es basa en tecnologia python.
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
- **install_build_command**: (opcional) Comanda personalitzada per construir i empaquetar el projecte. El valor per defecte per a nodejs és `"npm ci && npm run build"`, per a java maven `"mvn package -Dmaven.test.skip=true"`, per a java gradle `"gradle clean build"`, per a dotnet `"dotnet restore $PROJECT_PATH && dotnet build $PROJECT_PATH --configuration Release && dotnet publish $PROJECT_PATH --configuration Release --output ./out"`, i per a python `"pip install -r requirements.txt && python setup.py sdist bdist_wheel"`. Si no es proporciona cap comanda personalitzada, es farà servir la comanda per defecte segons la tecnologia especificada.
- **custom_test_command**:(opcional) Comanda personalitzada per realitzar les proves al projecte. Els valors per defecte són els següents segons la tecnologia:

  - **java/java-maven**: `"mvn surefire:test"`
  - **java-gradle**: `"gradle test"`
  - **nodejs**: `"npm test"`
  - **dotnet**: `"dotnet test $TEST_PROJECT_PATH --configuration Release"`
  - **python**: `"pytest tests/"`

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

## Function

### CD
- **technology**: (opcional) Tecnologia del projecte. Valors possibles:
  - `java`
  - `nodejs`
  - `dotnet` **IMPORTANT .Net Framework no està suportat**
  - `python`
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

### CI on Commit
- **technology**: (opcional) Tecnologia del projecte. Valors possibles:
  - `java`
  - `nodejs`
  - `dotnet` **IMPORTANT .Net Framework no està suportat**
  - `python`
- **project_name**: (opcional) Nom del projecte, especificar només si no hi ha compilació en el projecte. En el cas de projectes amb tecnologia .NET i que en el repositori de projecte existeixin mes de dos .csproj, aquesta propietat project_name és obligatòria.
- **java_version**: (opcional) Versió de Java. Definir només si el projecte es basa en tecnologia Java.
- **java_distribution**: (opcional) Distribució de Java. Definir només si el projecte es basa en tecnologia Java.
- **maven_version**: (opcional) Versió de Maven. Definir només si el projecte es basa en tecnologia Java.
- **sonar_exclusions**: (opcional) Exclusió de Sonar, pot estar buit.
- **node_version**: (opcional) Versió de Node. Definir només si el projecte es basa en tecnologia Node.
- **dotnet_version**: (opcional) Versió de .Net. Definir només si el projecte es basa en tecnologia .Net.
- **python_version**: (opcional) Versió de pythont. Definir només si el projecte es basa en tecnologia python.
- **install_build_command**: (opcional) Comanda personalitzada per construir i empaquetar el projecte. El valor per defecte per a nodejs és `"npm ci && npm run build"`, per a java maven `"mvn package -Dmaven.test.skip=true"`, per a java gradle `"gradle clean build"`, per a dotnet `"dotnet restore $PROJECT_PATH && dotnet build $PROJECT_PATH --configuration Release && dotnet publish $PROJECT_PATH --configuration Release --output ./out"`, i per a python `"pip install -r requirements.txt && python setup.py sdist bdist_wheel"`. Si no es proporciona cap comanda personalitzada, es farà servir la comanda per defecte segons la tecnologia especificada.
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

### CI on PR
- **technology**: (opcional) Tecnologia del projecte. Valors possibles:
  - `java`
  - `nodejs`
  - `dotnet` **IMPORTANT .Net Framework no està suportat**
  - `python`
- **java_version**: (opcional) Versió de Java. Definir només si el projecte es basa en tecnologia Java.
- **java_distribution**: (opcional) Distribució de Java. Definir només si el projecte es basa en tecnologia Java.
- **maven_version**: (opcional) Versió de Maven. Definir només si el projecte es basa en tecnologia Java.
- **sonar_exclusions**: (opcional) Exclusió de Sonar, pot estar buit.
- **node_version**: (opcional) Versió de Node. Definir només si el projecte es basa en tecnologia Node.
- **dotnet_version**: (opcional) Versió de .Net. Definir només si el projecte es basa en tecnologia .Net.
- **python_version**: (opcional) Versió de pythont. Definir només si el projecte es basa en tecnologia python.
- **sonar_exclusions**: (opcional) Exclusió de Sonar. Exemples:
  - `node_modules/**`
  - `test/**`
- **unit_test**: (opcional) Indica si s'han d'executar proves unitàries com a part del workflow d'integració contínua. Valor per defecte: false.
- **sonarqube**: (opcional) Indica si s'ha d'integrar SonarQube en el procés d'integració contínua. Valor per defecte: true.
- **dependabot**: (opcional) Permet activar o desactivar la funcionalitat de Dependabot en el workflow. Valor per defecte: true.
- **project_name**: (opcional) Nom del projecte, especificar només si no hi ha compilació en el projecte. En el cas de projectes amb tecnologia .NET i que en el repositori de projecte existeixin mes de dos .csproj, aquesta propietat project_name és obligatòria.
- **install_build_command**: (opcional) Comanda personalitzada per construir i empaquetar el projecte. El valor per defecte per a nodejs és `"npm ci"`, per a java `"mvn clean compile"`, per a dotnet `"dotnet restore $PROJECT_PATH && dotnet build $PROJECT_PATH --configuration Release"`, i per a python `" pip install -r requirements.txt"`. Si no es proporciona cap comanda personalitzada, es farà servir la comanda per defecte segons la tecnologia especificada.
**custom_test_command**:(opcional) Comanda personalitzada per realitzar les proves al projecte. Els valors per defecte són els següents segons la tecnologia:

  - **java/java-maven**: `"mvn surefire:test"`
  - **nodejs**: `"npm test"`
  - **dotnet**: `"dotnet test $TEST_PROJECT_PATH --configuration Release"`
  - **python**: `"pytest tests/"`

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


## Static

### CD
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


### CI on commit
- **technology**: (opcional) Tecnologia del projecte. Valors possibles:
  - `raw`
  - `nodejs`
- **project_name**: (opcional) Nom del projecte, especificar només si no hi ha compilació en el projecte.
- **node_version**: (opcional) Versió de Node. Definir només si el projecte es basa en tecnologia Node.
- **install_build_command**: (opcional) (opcional) Comanda personalitzada per construir i empaquetar el projecte. El valor per defecte per a nodejs és `"npm ci && npm run build"`.
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


### CI on PR
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
- **install_build_command**: (opcional) Comanda personalitzada per construir i empaquetar el projecte. El valor per defecte per a nodejs és `"npm ci"`. Si no es proporciona cap comanda personalitzada, es farà servir la comanda per defecte segons la tecnologia especificada.
- **custom_test_command**:(opcional) Comanda personalitzada per realitzar les proves al projecte. Els valors per defecte són els següents segons la tecnologia:

  - **nodejs**: `"npm test"`

**Exemple de crida al workflow:**
```yaml
  uses: ctti-arq/reusable-workflows/.github/workflows/static-ci-on-pr-reusable.yaml@v3
    secrets: inherit
    with:
      technology: nodejs
      node_version: 20.x
      sonar_exclusions: "node_modules/**,test/**"
```


## Library

### CI on Commit
- **technology**: (obligatori) Tecnologia del projecte. Valors possibles:
  - `java`
  - `nodejs`
  - `dotnet` **IMPORTANT .Net Framework no està suportat**
  - `java-gradle`
- **java_version**: (opcional) Versió de Java. Definir només si el projecte es basa en tecnologia Java.
- **java_distribution**: (opcional) Distribució de Java. Definir només si el projecte es basa en tecnologia Java.
- **maven_version**: (opcional) Versió de Maven. Definir només si el projecte es basa en tecnologia Java.
- **sonar_exclusions**: (opcional) Exclusió de Sonar, pot estar buit.
- **node_version**: (opcional) Versió de Node. Definir només si el projecte es basa en tecnologia Node.
- **dotnet_version**: (opcional) Versió de .Net. Definir només si el projecte es basa en tecnologia .Net.
- **gradle_version**: (opcional) Versió de gradle. Definir només si el projecte es basa en tecnologia python.
- **install_build_command**: (opcional) Comanda personalitzada per construir i empaquetar el projecte. El valor per defecte per a nodejs és `"npm ci"`, per a java maven `"mvn clean compile"`, per a java gradle `"gradle clean build"`, per a dotnet `"dotnet build $PROJECT_PATH -c Release"`. Si no es proporciona cap comanda personalitzada, es farà servir la comanda per defecte segons la tecnologia especificada.
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

### CI on PR
- **technology**: (opcional) Tecnologia del projecte. Valors possibles:
  - `java`
  - `nodejs`
  - `dotnet` **IMPORTANT .Net Framework no està suportat**
  - `java-gradle`
- **java_version**: (opcional) Versió de Java. Definir només si el projecte es basa en tecnologia Java.
- **java_distribution**: (opcional) Distribució de Java. Definir només si el projecte es basa en tecnologia Java.
- **maven_version**: (opcional) Versió de Maven. Definir només si el projecte es basa en tecnologia Java.
- **sonar_exclusions**: (opcional) Exclusió de Sonar, pot estar buit.
- **node_version**: (opcional) Versió de Node. Definir només si el projecte es basa en tecnologia Node.
- **dotnet_version**: (opcional) Versió de .Net. Definir només si el projecte es basa en tecnologia .Net.
- **gradle_version**: (opcional) Versió de gradle. Definir només si el projecte es basa en tecnologia python.
- **sonar_exclusions**: (opcional) Exclusió de Sonar. Exemples:
  - `node_modules/**`
  - `test/**`
- **sonarqube**: (opcional) Indica si s'ha d'executar l'anàlisi de codi mitjançant SonarQube. Valor per defecte: true.
- **dependabot**: (opcional) Indica si s'ha de permetre l'ús de Dependabot. Valor per defecte: true.
- **unit_test**: (opcional) Realització de proves unitàries. Valor per defecte: false.
- **project_name**: (opcional) Nom del projecte, especificar només si no hi ha compilació en el projecte. En el cas de projectes amb tecnologia .NET i que en el repositori de projecte existeixin mes de dos .csproj, aquesta propietat project_name és obligatòria.
- **install_build_command**: (opcional) Comanda personalitzada per construir i empaquetar el projecte. El valor per defecte per a nodejs és `"npm ci"`, per a java maven `"mvn clean compile"`, per a java gradle `"gradle clean build"`, per a dotnet `"dotnet build $PROJECT_PATH -c Release"`. Si no es proporciona cap comanda personalitzada, es farà servir la comanda per defecte segons la tecnologia especificada.
- **custom_test_command**:(opcional) Comanda personalitzada per realitzar les proves al projecte. Els valors per defecte són els següents segons la tecnologia:

  - **java/java-maven**: `"mvn surefire:test"`
  - **java-gradle**: `"gradle test"`
  - **nodejs**: `"npm test"`
  - **dotnet**: `"dotnet test $TEST_PROJECT_PATH --configuration Release"`

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

## Desplegaments estesos

### Executor CD
- **executor_image_version**: (obligatori) Versió d'imatge del executor.
- **technology**: Tecnologia. Valors possibles:
  - `liquibase`
  - `psql` 
  - `sqlcmd` 
  - `kubectl`
  - `helm`
- **environment**: (obligatori) Entorn.
- **cloud**: (obligatori) Entorn al núvol. Valors possibles:
  - `aws`
  - `azure`
  - `gcp`
- **engine**: (obligatori) Plataforma de desplegament. Valors possibles:
  - `kubernetes`
  - `database`
- **registry_name**: (obligatori) Nom del registre.
- **function_name**: (obligatori) Nom de la funció. Definir únicament si el cloud és `AWS`.

**Exemple de crida al workflow:**
```yaml
  uses: ctti-arq/reusable-workflows/.github/workflows/extended-executor-cd-reusable.yaml@v3
    secrets: inherit
    with:
      cloud: aws
      engine: database
      technology: psql
      executor_image_version: ${{ inputs.executor_image_version }}
      environment: ${{ inputs.environment }}
      registry_name: ${{ inputs.registry_name }}
      function_name: ${{ inputs.function_name }}
```


### Descriptors CD
- **executor_image_version**: (opcional) Versió d'imatge del executor. Definir únicament si el cloud és `azure`.
- **artifact_version**: (obligatori) Versió de l'artefacte.
- **technology**: (opcional) Technology. Valors possibles:
  - `liquibase`
  - `psql` 
  - `sqlcmd` 
  - `kubectl`
  - `helm`
- **environment**: (obligatori) Entorn.
- **cloud**: (obligatori) Entorn al núvol. Valors possibles:
  - `aws`
  - `azure`
  - `gcp`
- **engine**: (obligatori) Plataforma de desplegament. Valors possibles:
  - `kubernetes`
  - `database`
- **storage_name**: (obligatori) Nom de l'emmagatzematge.
- **blob_name**: (opcional) Blob nom. Definir únicament si el cloud és `azure`.
- **destination_prefix**: (opcional) Prefix de destí. Definir si el núvol és AWS i hi ha una subcarpeta dins del bucket de S3.
- **exclude**: (opcional) Indica els fitxers o directoris que s'han d'excloure durant el procés de càrrega de contingut. Valor per defecte: .git.
- **delete**: (opcional) Determina si els fitxers que no són presents en la font s'han de suprimir del destí durant el procés de càrrega. Valor per defecte: true.
- **descriptor_relative_path**: (obligatori) Path relatiu dels descriptors, (fitxer o directori), és a dir: 'folder/sql.sql' o 'folder/subfolder'. El path relatiu ja conté els valors "descriptors/_engine_/_technology_/", per la qual cosa no cal incloure'ls com a input, sinó que cal indicar a partir d'aquí.
- **key_vault_name**: (opcional) Key Vault nom. Definir únicament si el cloud és `azure`.
- **connection_secret_name**: (opcional) Nom del secret de connexió.
- **function_name**: (opcional) Nom de la funció. Definir únicament si el cloud és `AWS`.
- **resource_group**: (opcional) Grup de recursos. Definir únicament si el cloud és `azure`.
- **azure_region**: (opcional) Regió Azure. Definir únicament si el cloud és `azure`.
- **registry_name**: (opcional) Nom de l'egistry. Definir únicament si el cloud és `azure`.
- **vnet_name**: (opcional) VNet nom. Definir únicament si el cloud és `azure`.
- **subnet_name**: (opcional) Subnet nom. Definir únicament si el cloud és `azure`.
- **cluster_name**: (opcional) Nom del clúster.
- **namespace**: (opcional) Nom del namespace dins el clúster.
- **database_endpoint**: (opcional) URI endpoint de la BBDD.
- **database_name**: (opcional) Nom de la base de dades.
- **database_user**:(opcional) Usuari de la BBDD.
- **itsm_enabled**: (opcional) Activa la funcionalitat de Gestió de Canvis ITSM
- **itsm_id_change_coordinator**: (opcional) ID del coordinador de canvis d'ITSM.

**Exemple de crida al workflow:**
```yaml
  uses: ctti-arq/reusable-workflows/.github/workflows/extended-descriptor-cd-reusable.yaml@v4
    secrets: inherit
    with:
      cloud: aws
      engine: database
      technology: psql
      artifact_version: ${{ inputs.artifact_version }}
      environment: ${{ inputs.environment }}
      storage_name: "ghec-dev-s3-ew1-ingest-scripts-db-psql"
      descriptors_relative_path: ${{ inputs.descriptors_relative_path }}
      connection_secret_name: "rds!cluster-e490379f-cfff-4ebb-b083-f723b8fb136e"
      function_name: "ghec-dev-lam-ew1-000-psql"
      database_endpoint: ${{ inputs.database_endpoint }}
      database_name: ${{ inputs.database_name }}
      database_user: ${{ inputs.database_user }}
      itsm_enabled: false
      # itsm_id_change_coordinator: ${{ inputs.itsm_id_change_coordinator }}

```


## API Manager

### CD Publish
- **artifact_version**: (obligatori) Versió de l'artefacte que es publicarà.
- **apicCatalog**: (obligatori) Catàleg d'API Connect on es publicarà el producte.Valors possibles:
    - `privat`
    - `public`
    - `privat-pre`
    - `public-pre`
- **apicProductFile**: (obligatori) Fitxer del producte d'API Connect que es publicarà.
- **itsm_id_change_coordinator**: ID del coordinador de canvis en el sistema ITSM.
- **itsm_enabled**: Indica si la integració amb ITSM està habilitada (true/false).

**Exemple de crida al workflow:**
``` yaml
uses: ctti-arq/reusable-workflows/.github/workflows/apim-cd-publish-reusable.yaml@v3.0.16
    secrets: inherit
    with:
      artifact_version: ${{ inputs.artifact_version }}

      apicCatalog: ${{ inputs.apicCatalog }}
      apicProductFile: ${{ inputs.apicProductFile }}

      itsm_enabled: true
      itsm_id_change_coordinator: ${{ inputs.itsm_id_change_coordinator }}
```

### CD Operativa
- **operació**: (obligatori) Operació a fer amb el producte.
    - `INFO`
    - `REPLACE`
    - `RETIRE`
    - `DELETE`
    - `DEPRECATE`
    - `SUPERSEDE`
- **artifact_version**: (obligatori) Versió de l'artefacte que es publicarà.
- **apicCatalog**: (obligatori) Catàleg d'API Connect on es farà l'operació.
    - `privat`
    - `public`
    - `privat-pre`
    - `public-pre`
- **apicProductFile**: (obligatori) Fitxer del producte d'API Connect que es farà servir en l'operació.
- **apicNewProductVersion**: (obligatori en operacions de Replace i Supersede) Nova versió del producte d'API Connect que es farà servir en l'operació.
- **itsm_id_change_coordinator**: ID del coordinador de canvis en el sistema ITSM.
- **itsm_enabled**: Indica si la integració amb ITSM està habilitada (true/false).

**Exemple de crida al workflow:**
``` yaml
uses: ctti-arq/reusable-workflows/.github/workflows/apim-cd-operativa-reusable.yaml@v3.0.16
    secrets: inherit
    with: 
      operation: ${{ inputs.operation }}
      artifact_version: ${{ inputs.artifact_version }}

      apicCatalog: ${{ inputs.apicCatalog }}
      apicProductFile: ${{ inputs.apicProductFile }}
      apicNewProductVersion: ${{ inputs.apicNewProductVersion }}

      itsm_enabled: true
      itsm_id_change_coordinator: ${{ inputs.itsm_id_change_coordinator }}
```

### CI on Commit
- **apicProductFile**: (obligatori) Fitxer del producte d'API Connect que es publicarà.

**Exemple de crida al workflow:**
``` yml
uses: ctti-arq/reusable-workflows/.github/workflows/apim-ci-on-commit-reusable.yaml@v3.0.16
secrets: inherit
with:
    apicProductFile: "health-check-test_2.0.7.yaml"
```

### CI on PR
- **apicProductFile**: (obligatori) Fitxer del producte d'API Connect que es publicarà.

**Exemple de crida al workflow:**
``` yml
uses: ctti-arq/reusable-workflows/.github/workflows/apim-ci-on-pr-reusable.yaml@v3
secrets: inherit
with:
    apicProductFile: "health-check-test_2.0.7.yaml"
```

## Mobile Apps iOS

### CD

- **project_name**: (obligatori) Nom del projecte.
- **project_scheme**: (obligatori) Nom del scheme del projecte.
- **project_target**: (obligatori) Nom del target del projecte.
- **project_config**: (obligatori) Nom de la configuració del projecte.
- **xcode_version**: (opcional) Versió del Xcode. Valor per defecte: 15.4
- **use_private_library**: (opcional) Per habilitar o deshabilitar l'ús de llibreries propies. Valor per defecte: false

**Exemple de crida al workflow:**
```yaml
  uses: ctti-arq/reusable-workflows-mobile/.github/workflows/apps-mobils-ios-cd-reusable.yml@v1
    secrets: inherit
    with:
      project_name: "<project_name>"
      project_scheme: ${{ inputs.project_scheme }}
      project_target: ${{ inputs.project_target }}
      project_config: ${{ inputs.project_config }}
```

### CI on PR

- **project_name**: (obligatori) Nom del projecte.
- **project_scheme**: (obligatori) Nom del scheme del projecte.
- **project_target**: (obligatori) Nom del target del projecte.
- **project_config**: (obligatori) Nom de la configuració del projecte.
- **xcode_version**: (opcional) Versió del Xcode. Valor per defecte: 15.4
- **use_private_library**: (opcional) Per habilitar o deshabilitar l'ús de llibreries propies. Valor per defecte: false
- **unit_test**: (opcional) Per habilitar o deshabilitar l'execució de Unit Testing. Valor per defecte: true
- **unit_test_os_version**: (opcional) OS a utilizar al simulador per executar Unit Testing. Valor per defecte: 17.5
- **unit_test_device_model**: (opcional) Nom del dispositiu a utilizar al simulador per executar Unit Testing. Valor per defecte: iPhone 15
- **unit_test_testplan**: (opcional) Nom del test plan per executar Unit Testing.
- **lint**: (opcional) Per habilitar o deshabilitar l'execució de SwiftLint. Valor per defecte: true
- **dependabot**: (opcional) Per habilitar o deshabilitar l'execució de Dependabot. Valor per defecte: true

**Exemple de crida al workflow:**
```yaml
  uses: ctti-arq/reusable-workflows-mobile/.github/workflows/apps-mobils-ios-ci-on-pr-reusable.yml@v1
    secrets: inherit
    with:
      project_name: "<project_name>"
      project_scheme: "<project_scheme>"
      project_target: "<project_target>"
      project_config: "<project_config>"
```

## Mobile Apps Android

### CD

- **project_name**: (obligatori) Nom del projecte.
- **flavour**: (opcional) Nom del flavour del projecte. Valor per defecte: pro
- **build_type**: (obligatori) Nom del build type del projecte.
- **java_version**: (obligatori) Versió de Java.
- **gradle_version**: (opcional) Versió de Gradle.

**Exemple de crida al workflow:**
```yaml
  uses: ctti-arq/reusable-workflows-mobile/.github/workflows/apps-mobils-android-cd-reusable.yml@v1
    secrets: inherit
    with:
      project_name: "<project_name>"
      java_version: "<java_version>"
      flavour: ${{ inputs.flavour }}
      build_type: ${{ inputs.build_type }}
      gradle_version: "<gradle_version>"
```

### CI on PR

- **project_name**: (obligatori) Nom del projecte.
- **flavour**: (opcional) Nom del flavour del projecte. Valor per defecte: pro
- **build_type**: (obligatori) Nom del build type del projecte.
- **java_version**: (obligatori) Versió de Java.
- **gradle_version**: (opcional) Versió de Gradle.
- **unit_test**: (opcional) Per habilitar o deshabilitar l'execució de Unit Testing. Valor per defecte: true
- **sonarqube**: (opcional) Utilització de SonarQube. Valor per defecte: true.
- **sonar_exclusions**: (opcional) Exclusió de Sonar, pot estar buit.
- **lint**: (opcional) Per habilitar o deshabilitar l'execució de Lint. Valor per defecte: true
- **dependabot**: (opcional) Per habilitar o deshabilitar l'execució de Dependabot. Valor per defecte: true

**Exemple de crida al workflow:**
```yaml
  uses: ctti-arq/reusable-workflows-mobile/.github/workflows/apps-mobils-ios-ci-on-pr-reusable.yml@v1
    secrets: inherit
    with:
      project_name: "<project_name>"
      java_version: "<java_version>"
      flavour: ${{ inputs.flavour }}
      build_type: ${{ inputs.build_type }}
      gradle_version: "<gradle_version>"
```

## Mobile Library iOS

### CI on commit develop

- **library_scheme_name**: (obligatori) Nom del scheme del projecte.
- **xcode_version**: (opcional) Versió del Xcode. Valor per defecte: 15.4
- **use_private_library**: (opcional) Per habilitar o deshabilitar l'ús de llibreries propies. Valor per defecte: false
- **dependabot**: (opcional) Per habilitar o deshabilitar l'execució de Dependabot. Valor per defecte: true

**Exemple de crida al workflow:**
```yaml
  uses: ctti-arq/reusable-workflows-mobile/.github/workflows/library-mobils-ios-ci-on-commit-develop-reusable.yml@v1
    secrets: inherit
    with:
      library_scheme_name: "<library_schem_name>"
```

### CI on commit

- **library_scheme_name**: (obligatori) Nom del scheme del projecte.
- **xcode_version**: (opcional) Versió del Xcode. Valor per defecte: 15.4
- **use_private_library**: (opcional) Per habilitar o deshabilitar l'ús de llibreries propies. Valor per defecte: false

**Exemple de crida al workflow:**
```yaml
  uses: ctti-arq/reusable-workflows-mobile/.github/workflows/library-mobils-ios-ci-on-commit-reusable.yml@v1
    secrets: inherit
    with:
      library_scheme_name: "<library_schem_name>"
```

### CI on PR

- **library_scheme_name**: (obligatori) Nom del scheme del projecte.
- **xcode_version**: (opcional) Versió del Xcode. Valor per defecte: 15.4
- **use_private_library**: (opcional) Per habilitar o deshabilitar l'ús de llibreries propies. Valor per defecte: false
- **unit_test**: (opcional) Per habilitar o deshabilitar l'execució de Unit Testing. Valor per defecte: true
- **unit_test_os_version**: (opcional) OS a utilizar al simulador per executar Unit Testing. Valor per defecte: 17.5
- **unit_test_device_model**: (opcional) Nom del dispositiu a utilizar al simulador per executar Unit Testing. Valor per defecte: iPhone 15
- **unit_test_scheme_name**: (opcional) Nom del scheme de test del projecte per executar Unit Testing.
- **lint**: (opcional) Per habilitar o deshabilitar l'execució de SwiftLint. Valor per defecte: true
- **dependabot**: (opcional) Per habilitar o deshabilitar l'execució de Dependabot. Valor per defecte: true

**Exemple de crida al workflow:**
```yaml
  uses: ctti-arq/reusable-workflows-mobile/.github/workflows/library-mobils-ios-ci-on-pr-reusable.yml@v1
    secrets: inherit
    with:
      library_scheme_name: "<library_schem_name>"
      unit_test_scheme_name: "<unit_test_scheme_name>"
```