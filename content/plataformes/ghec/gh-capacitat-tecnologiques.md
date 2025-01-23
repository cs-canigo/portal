
+++
date         = "2024-11-20"
title        = "Tecnologies suportades i Requisits"
description  = "Capacitats tecnològiques de la plataforma GitHub Enterprise Cloud (GHEC)"
weight      = "4"
sections    = ["GHEC"]
aliases = [
    "/drafts/ghec/gh-capacitat-tecnologiques",
    "/ghec/gh-capacitat-tecnologiques",
    "/plataformes/ghec/gh-capacitat-tecnologiques"
]
+++

## Objectiu  🚀

El present document descriu les diferents capacitats tecnològiques que suporta actualment la plataforma GHEC.


## Llenguates i tipus d'artefactes

A la següent matriu es poden observar els llenguatges i tipus d'artefactes suportats:

![Capacitat Tecnológiques](/images/GHEC/gh_capacidades_tecnologicas.png)


## Desplegament a hiperescalars 

Actualment, estan certificats els desplegaments als següents hiperescalars, sempre acotat als llenguatges i tipus d'artefactes indicats en la secció anterior:

![Capacitat Tecnológiques](/images/GHEC/gh-hyperescalares_cloud.png)                                        


## Altres capacitats

Addicionalment, la plataforma suporta les següents capacitats :

### Desplegaments a [API Manager corporatiu (APIM)](https://canigo.ctti.gencat.cat/plataformes/apim/)

Suport a les següents accions i operatives:

* **PUBLISH**: publicació d’una nova versió d’un producte i APIs associades. El sistema permet redesplegar versions als catàlegs preproductius sempre que no hagin arribat a producció.

* **INFO**: obtenció d’informació del producte dins d’un catàleg (versions, subscripcions i altres). Caldrà seleccionar el catàleg del qual es desitja informació.

* Operatives:
    * **DELETE**: eliminació del producte. Caldrà seleccionar el catàleg sobre el qual es desitja esborrar i indicar la versió del producte (CURRENT_PRODUCT_VERSION). Per exemple: 1.1.0.
    * **DEPRECATE**: deprecació d’una versió del producte sense deixar cap versió vigent. Caldrà seleccionar el catàleg sobre el qual es desitja deprecar i indicar la versió del producte (CURRENT_PRODUCT_VERSION). Per exemple: 1.1.0.
    * **REPLACE**: retirada d’una de les versions vigents del producte i migració de subscripcions. Caldrà seleccionar el catàleg sobre el qual es desitja reemplaçar, indicar la versió actual del producte (CURRENT_PRODUCT_VERSION) i la nova versió del producte (NEW_PRODUCT_VERSION). Per exemple: 1.1.0.
    * **RETIRE**: retirada d’una versió del producte sense deixar cap versió vigent (les subscripcions es perden). Caldrà seleccionar el catàleg sobre el qual es desitja retirar i indicar la versió del producte (CURRENT_PRODUCT_VERSION). Per exemple: 1.1.0.
    * **SUPERSEDE**: deprecació d’una de les versions vigents del producte i marcat de subscripcions “migrated”. Caldrà seleccionar el catàleg sobre el qual es desitja fer el supersede, indicar la versió actual del producte (CURRENT_PRODUCT_VERSION) i la nova versió del producte (NEW_PRODUCT_VERSION). Per exemple: 1.1.0.


    En el següent enllaç, es pot revisar la definició de workflows per a totes les tecnologies incloent API's: [Workflows Reutilitzables](../gh-definicio-workflows/).



## Requisits

Addicionalment, dins la política de versions implantada, es detallen els requisits necessaris de configuració, depenent de la tecnologia.
Respecte al versionat de l' artefacte, el nom del lliurable i la seva version s' obté automàticament dels fitxers de configuració del projecte.  Aquest dependrà del tipus de tecnologia.


### JAVA (Maven)

* **Versionat**
   * Fitxer : pom.xml
   * Nom Lliurable : Tag artifactid
   * Versió Lliurable : Tag version

* **Requisists**
   Per a projectes Maven cal definir en el `pom.xml` la següent dependència per fer l'escaneig amb SonarQube:
   ```
   <plugin>
    <groupId>org.sonarsource.scanner.maven</groupId>
    <artifactId>sonar-maven-plugin</artifactId>
    <version>3.4.0.905</version>
    </plugin>
   ```
    
### JAVA (Gradle)
* **Versionat**
   * Fitxer / Nom Lliurable : settings.gradle / Camp -  rootProject.name 
   * Fitxer / Versió Lliurable :  build.gradle / Camp -  version i Camp -  group

* **Requisits**
   Per a projectes Maven cal definir en el `build.gradle` la següent dependència per fer l'escaneig amb SonarQube:
   ```
   plugins {
    id 'org.sonarqube' version '5.1.0.4882'
   }
   ```
   I per publicar una biblioteca:
   ```
   plugins {
    id 'maven-publish'
   }
   ```
    
### NODE
* **Versionat**
   * Fitxer : package.json
   * Nom Lliurable :  name
   * Versió Lliurable : version

### .NET
* **Versionat**
En aquest cas hi ha dues casuistiques :        
       
   * Nom Lliurable :
        1. Si només hi ha un unic projecte, només hi ha un **.csproj** i s'obtindra del camp **name** d'aquest fitxer.
        2. Si tenim en el repo més d'un projecte, hi ha diferents .csproj, s'obté de la variable **Project_Name** el valor del qual s'introdueix en el setup del projecte.


   * Versió Lliurable : 
        1. Si només hi ha un unic projecte, només hi ha un **.csproj** i s'obtindra del camp **version** d'aquest fitxer 
        2. Si tenim en el repo més d'un projecte, hi ha diferents .csproj, després hi hauria d'haver un fitxer centralitzat de versions anomenat **Directory.Build.props** i d'aquí s'obtindre del camp **VERSION**.

* **Requisits**
    Per a projectes on la tecnologia sigui dotnet és necessària l'existència de l'arxiu `*.csproj` a l'arrel. Si existeixen dos arxius `*.csproj` serà obligatori especificar el `Project_Name`.

### APIM
* **Versionat**
   * Fitxer : product.yaml
   * Nom Lliurable : title
   * Versió Lliurable : version

* **Requisits**
   Els fitxers de producte i d'APIs han d'estar a l'arrel del repositori i no poden incloure la versió en el nom.

### PYTHON
* **Versionat** 
   * Fitxer : setup.py
   * Nom Lliurable : name
   * Versió Lliurable : version

* **Requisits**
   Per a projectes Python és necessari que a l'arrel del repositori existeixin els fitxers de configuració `setup.py` i `requirements.txt`.

### Android (Gradle):
* **Versionat**
   * Fitxer / Nom Lliurable : app/build.gradle / Task - packageName
   * Fitxer / Versió Lliurable : app/build.gradle / Task - versionName
   * Fitxer / Build Lliurable : app/build.gradle / Task - versionCode

### iOS

   * Fitxer / Nom Lliurable : Build Settings / Camp - PRODUCT_BUNDLE_IDENTIFIER
   * Fitxer / Versió Lliurable : Build Settings / Camp - MARKETING_VERSION
   * Fitxer / Build Lliurable : Build Settings / Camp - CURRENT_PROJECT_VERSION

### Desplegaments estesos

El model de GHEC està enfocat a noves aplicacions o migració d'aplicacions cap a arquitectures cloud-native desplegades a Cloud Públic, però també s'ha volgut donar cabuda a aplicacions amb tecnologies menys estratègiques dins del CTTI com puguin ser **clusters de Kubernetes** o **màquines virtuals**. També els desplegaments de canvis en **bases de dades** poden fer ús d'aquest model de desplegament ja sigui utilitzant frameworks com Liquibase, o bé executant directament scripts mitjançant les CLIs de PostgreSQL, MySQL o altres motors de bases de dades.

Les tecnlogies certificades actualment són les següents:

* Desplegaments a AWS de:
    * Scripts BBDD
    * Kubernetes amb Helm Kubectl
    * Màquines Virtuals (En roadmap)

* Desplegaments a Azure de:
    * Scripts BBDD 
    * Kubernetes amb Helm Kubectl
    * Màquines Virtuals (En roadmap)

Per a desplegaments estesos seran necessaris certs recursos com a prerequisits al núvol, depenent del mateix, perquè funcioni correctament el model com es pot observar en [Desplegaments Estesos](../gh-desplegaments-estesos/). Aquests són tant recursos d'infraestructura com permisos necessaris perquè la lambda pugui accedir als recursos necessaris.

**AWS**

Per al desplegament de descriptors en AWS es requereix dels següents recursos d'infraestructura:

1. **Elastic Container Registry (ECR)**: Per a emmagatzemar les imatges de contenidors que es generin a partir dels Dockerfiles.
2. **Lambda basada en contenidors**: Per a executar el contenidor que es generi a partir de la imatge pujada a ECR. Aquesta lambda serà una funció basada en contenidor (no en codi).
3. **Bucket S3**: Per a emmagatzemar els descriptors (Helm Charts, manifestos, scripts de bases de dades, etc.) que es vulguin desplegar.
4. **Secrets Manager**: Per a emmagatzemar les credencials d'accés als recursos que es vulguin modificar (clúster de kubernetes, base de dades, etc.).
5. **IAM Role**: Per a donar permisos a la lambda perquè pugui accedir als recursos necessaris, tant per a descarregar els descriptors del bucket, com per a obtenir les credencials del Secrets Manager. A més, s'hauran de donar permisos a la lambda perquè pugui fer la connexió i el desplegament dels descriptors en els recursos.
6. **Endpoint gateway**: Per a que la lambda pugui accedir als recursos de la VPC (S3).

Permisos requerits:

1. ECR (Elastic Container Registry): 
   * ecr:CreateRepository
   * ecr:PutImage
   * ecr:GetDownloadUrlForLayer
   * ecr:BatchCheckLayerAvailability
   * ecr:CompleteLayerUpload
   * ecr:InitiateLayerUpload
   * ecr:UploadLayerPart
2. Lambda: 
   * lambda:UpdateFunctionCode
   * lambda:CreateFunction
   * lambda:UpdateFunctionConfiguration

#### Exemple de codi terraform

    resource "aws_iam_role" "lambda_role" {
        name = "lambda_execution_role"

        assume_role_policy = jsonencode({
        Version = "2012-10-17"
        Statement = [
            {
            Action = "sts:AssumeRole"
            Effect = "Allow"
            Principal = {
                Service = "lambda.amazonaws.com"
            }
            }
        ]
        })
    }

    resource "aws_iam_policy" "lambda_policy" {
        name        = "lambda_policy"
        description = "IAM policy for Lambda to access Secrets Manager, S3, and DynamoDB"

        policy = jsonencode({
        Version = "2012-10-17"
        Statement = [
            {
            Effect = "Allow"
            Action = [
                "secretsmanager:GetSecretValue"
            ]
            Resource = "arn:aws:secretsmanager:eu-south-2:123456789012:secret:your-secret-name"
            },
            {
            Effect = "Allow"
            Action = [
                "s3:GetObject"
            ]
            Resource = "arn:aws:s3:::my-bucket/*"
            },
            {
            Effect = "Allow"
            Action = [
                "dynamodb:PutItem"
            ]
            Resource = "arn:aws:dynamodb:eu-south-2:123456789012:table/my-table"
            }
        ]
        })
    }

    resource "aws_iam_role_policy_attachment" "lambda_policy_attachment" {
        role       = aws_iam_role.lambda_role.name
        policy_arn = aws_iam_policy.lambda_policy.arn
            }

            resource "aws_lambda_function" "my_lambda" {
            function_name = "my_lambda_function"
            role          = aws_iam_role.lambda_role.arn
            handler       = "lambda_function.handler"
            runtime       = "python3.8"
            filename      = "path/to/your/lambda_function.zip"

            environment {
            variables = {
                SECRET_NAME = "your-secret-name"
            }
        }
    }

    resource "aws_iam_role" "lambda_role" {
        name = "lambda_execution_role"

        assume_role_policy = jsonencode({
        Version = "2012-10-17"
        Statement = [
            {
            Action = "sts:AssumeRole"
            Effect = "Allow"
            Principal = {
                Service = "lambda.amazonaws.com"
            }
            }
        ]
        })
    }

    resource "aws_iam_policy" "lambda_policy" {
        name        = "lambda_policy"
        description = "IAM policy for Lambda to access ECR and update Lambda function"

        policy = jsonencode({
        Version = "2012-10-17"
        Statement = [
            {
            Effect = "Allow"
            Action = [
                "ecr:CreateRepository",
                "ecr:PutImage",
                "ecr:GetDownloadUrlForLayer",
                "ecr:BatchCheckLayerAvailability",
                "ecr:CompleteLayerUpload",
                "ecr:InitiateLayerUpload",
                "ecr:UploadLayerPart"
            ]
            Resource = "*"
            },
            {
            Effect = "Allow"
            Action = [
                "lambda:UpdateFunctionCode",
                "lambda:CreateFunction",
                "lambda:UpdateFunctionConfiguration"
            ]
            Resource = "arn:aws:lambda:us-west-2:123456789012:function:your-lambda-function-name"
            }
        ]
        })
    }

    resource "aws_iam_role_policy_attachment" "lambda_policy_attachment" {
        role       = aws_iam_role.lambda_role.name
        policy_arn = aws_iam_policy.lambda_policy.arn
    }

    resource "aws_lambda_function" "my_lambda" {
        function_name = "my_lambda_function"
        role          = aws_iam_role.lambda_role.arn
        handler       = "lambda_function.handler"
        runtime       = "python3.8"
        filename      = "path/to/your/lambda_function.zip"

        environment {
            variables = {
                ECR_REPOSITORY = "your-ecr-repository"
            }
        }
    }

**Azure**

Per al desplegament de descriptors en Azure es requereix dels següents recursos d'infraestructura:

1. **Azure Container Registry (ACR)**: Per a emmagatzemar les imatges de contenidors que es generin a partir dels Dockerfiles.
2. **Storage Account i Blob Storage**: Per a emmagatzemar els descriptors (Helm Charts, manifestos, scripts de bases de dades, etc.) que es vulguin desplegar.
3. **KeyVault**: Per a emmagatzemar les credencials d'accés als recursos que es vulguin modificar (clúster de kubernetes, base de dades, etc.).