+++
date        = "2025-01-21"
title       = "Manual d'ús del API Antivirus"
description = "Documentació detallada de com integrar-se i fer ús de les funcionalitats del API"
sections    = "APIANTIVIRUS"
weight      = 1
categories  = ["cloud","apiantivirus"]
+++

La següent informació es proporciona com una guia per als clients, detallant els passos necessaris que les aplicacions han de seguir per a poder fer ús de les APIs d'Antivirus. El seu propòsit és brindar orientació clara i concisa sobre el procés de configuració de les anomenades a la API, assegurant que se segueixin els passos adequats per a garantir una integració reeixida.

## **Requisits previs**

### **Sol·licitar alta d'usuari en Gicar**

Gicar és el Identity provider de CTTI integrat en tots els serveis de CTTI. Per a accedir als serveis i plataformes de CTTI és necessari tenir un usuari vàlid de Gicar per a autenticar-se en les plataformes.

La gestió de l'alta, baixa, modificació dels usuaris/passwords en GICAR es duu a terme a través del departament de Gestió d'identitats dins de CTTI. Cada proveïdor tindrà un agent del PMO, qui s'encarregarà de gestionar els comptes Gicar, amb les dades com el DNI, correu i el nom facilitat per l'agent del projecte.

<p>
  <img src="/related/apiantivirus/AutenticacioDeUsuariosGicar.png" width="1100" height="600"/>
</p>

---

### **Creació de l'aplicació en el portal de desenvolupadors**

De cara a poder fer ús de les APIs, és necessari subscriure's al producte associat. Per a això, s'ha d'accedir al portal de developer per a l'entorn corresponent:

- [Preproducció interna](https://portal.db40-c57f0fcb.eu-de.apiconnect.appdomain.cloud/ctti/privat-pre/) (Privat-pre)
- [Producció interna](https://portal.db40-c57f0fcb.eu-de.apiconnect.appdomain.cloud/ctti/privat/) (Privat)

<p>
  <img src="/related/apiantivirus/PortalDeDesarrolladores.png" width="1100" height="600"/>
</p>

Una vegada accedit al portal de developer, s'inicia sessió amb el compte de Gicar sol·licitada prèviament i es procedeix a crear una nova aplicació.

Per a això, es prem primer en el botó "Apps" en la barra superior de la pantalla, i posteriorment, en el botó "Crear una aplicació nova".

<p>
  <img src="/related/apiantivirus/PasoCrearAPP.png" width="1100" height="400"/>
</p>

Procedim a crear l'aplicació, emplenant el camp "Title" amb el nom d'aquesta aplicació.

<p>
  <img src="/related/apiantivirus/PasoCrearAPP_2.png" width="600" height="700"/>
</p>

<p>
  <img src="/related/apiantivirus/PasoCrearAPP_3.png" width="600" height="700"/>
</p>

Una vegada que la tinguem creada, guardem el Client ID proporcionat.

<p>
  <img src="/related/apiantivirus/PasoCrearAPP_4.png" width="400" height="700"/>
</p>

A continuació, es tria el pla de subscripció que s'ajusti més a la necessitat del projecte. Els paràmetres dels plans són els següents:

- **Default:** Límit de _*100 peticions/hora*_ i _*10 peticions/minut*_.
- **Bronze:** Límit de _*1000 peticions/hora*_ i _*100 peticions/minut*_.
- **Silver:** Límit de _*2000 peticions/hora*_ i _*200 peticions/minut*_.
- **Gold:** Límit de _*4000 peticions/hora*_ i _*400 peticions/minut*_.

_**Nota:**_ És possible sol·licitar la creació d'un pla customizado ajustant a la necessitat específica de cada projecte (sempre que no superi el límit de crides establert per la OFT), a través de l'obertura d'un tiquet ACOAPIM indicant a la OFT de API Manager el motiu i el pla que es vulgui crear amb els paràmetres adequats.

<p>
  <img src="/related/apiantivirus/PasoCrearAPP_Plan.png" width="1100" height="400"/>
</p>

Després de triar el pla de subscripció adequat, se selecciona l'aplicació que s'ha creat anteriorment, i es prem sobre el botó "Continuar".

<p>
  <img src="/related/apiantivirus/PasoCrearAPP_Plan_2.png" width="900" height="400"/>
</p>

<p>
  <img src="/related/apiantivirus/PasoCrearAPP_Plan_3.png" width="1100" height="400"/>
</p>

Una vegada subscrit al producte, es pot verificar per la pantalla de l'aplicació l'estat de la subscripció, que en aquest cas està en "Pending approval", la qual cosa indica que és necessari sol·licitar l'aprovació de la subscripció per part de l'administrador (OFT).

<p>
  <img src="/related/apiantivirus/PasoCrearAPP_Detalle.png" width="900" height="600"/>
</p>

### **Obertura del tiquet ACOAPIM per a l'aprovació de la subscripció de APIs**

De cara al fet que la OFT del API Manager pugui aprovar la subscripció del producte de APIs seleccionat, és necessari obrir un tiquet [ACOAPIM](https://cstd-ctti.atlassian.net/jira/software/c/projects/acoapim/issues), prement sobre el botó "Create" en la pàgina web de l'enllaç.

**Nota:** _*Per a obtenir accés al JIRA i tiquet ACOAPIM, és necessari sol·licitar prèviament el permís per tiquet [REMEDY](https://pauticgencat.onbmc.com/), facilitant el DNI, el correu i el nom dels integrants de l'equip*_

<p>
  <img src="/related/apiantivirus/AperturaTicket.png" width="1100" height="200"/>
</p>

S'haurien d'emplenar com a mínim els següents camps recomanats:
- **Organisme/Projecte Afectat:** Indicar el nom del projecte / organisme. En el cas que no es trobi l'adequat en el desplegable, es pot informar el següent: CENTRO TELECOMUNICACIONS I TECNOLOGIES DE LA INFORMACIÓ.
- **Si no localitzes el projecte en el desplegable, introdueix-lo aquí:** Indicar el nom del projecte a desplegar.
- **Summary:** Concepte de la petició, per exemple, "Sol·licitud aprovació de la subscripció del producte API".
- **Descripció:** Descripció detallada de la sol·licitud.

Una vegada que la OFT d'API Manager hagi aprovat la subscripció del producte d'Apis sol·licitada, la confirmació del qual serà enviada per correu i registrada en el tiquet de ACOAPIM obert anteriorment, estarà tot habilitat perquè el client pugui començar a fer ús dels serveis d'antivirus a través de les Apis desenvolupades.

### **Sol·licitud de les credencials de Keycloak**

Les APIs d'antivirus implementen el flux de seguretat i autenticació OAuth (Client Credentials) utilitzant el proveïdor intern recomanat per CTTI, GICAR, usant el sistema de gestió d'identitats de Keycloak. En aquest flux, l'aplicació empra les seves credencials prèviament sol·licitades per a obtenir un token d'accés. Keycloak verifica les credencials i, si són vàlides, genera un token d'accés que permet autenticar-se en la capa OAuth 2.0 del API, habilitant així l'accés als serveis oferts per les APIs.

Per a sol·licitar les credencials Client ID + Client Secret per a autenticar-se contra Keycloak és necessari obrir un tiquet [ACOGICAR](https://cstd-ctti.atlassian.net/jira/software/c/projects/acogicar/boards/21). Si no es disposa de permisos per a accedir a això, és necessari obrir un tiquet [REMEDY](https://pauticgencat.onbmc.com/) indicant la necessitat d'obtenir accés per a obrir tiquets de ACOGICAR.

---

## **Algorismes i funcionament de l'escaneig de fitxers**

En aquesta secció es detalla l'algorisme dissenyat per al API de Scan File, abastant el procés des de la petició de l'usuari fins a l'escaneig de fitxer i l'obtenció dels resultats de l'anàlisi.

### **Operació POST Scan-File**

<p>
  <img src="/related/apiantivirus/OperacionPostScanFile_cat.png" width="1000" height="600"/>
</p>

**_Llegenda:_**

- **Petició usuari:** És la petició realitzada pel client contra la API REST de l'antivirus.
- **Valguda Request (ctti-validate-request):** És la política encarregada de realitzar la validació del missatge d'entrada de la invocació a la API contra l'esquema generat en les operacions del disseny de la API.
- **Logs d'invocació (ctti-invoke-log):** És la política que s'empra per a guardar en el log la request i response de la política de Invoke per a posteriorment ser enviats al Analytics, permetent d'aquesta manera registrar més etapes del flux d'execució, podent el desenvolupador revisar la invocació abans i després de ser enviada al backend. Amb el que es permet identificar si la lògica aplicada en la API i el backend estan funcionant correctament, agilitzant la identificació i resolució d'errors, i el seu temps, ampliant la traçabilitat.
- **Invocació al servidor SPE (Invoke):** En aquesta part del flux es realitza la petició al servidor de SPE per a l'escaneig del fitxer adjunt en la petició.
- **(Extensió) Capçaleres de seguretat:** Aquesta extensió s'encarregarà d'eliminar les capçaleres de resposta que puguin contenir informació sensible.
- **Finalització:** Finalització del flux.
- **Gestió d'errors (ctti-error-management):** És la política que s'empra per a proporcionar una gestió més efectiva dels errors produïts dins del assembly del API, retornant una estructura uniformitzada i més clara per al client.

### **Operació POST Scan-File-Path**

<p>
  <img src="/related/apiantivirus/OperacionPostScanFilePath_cat.png" width="1000" height="600"/>
</p>

**_Llegenda:_**

- **Espai compartit de fitxers:** És l'espai on s'emmagatzemen els fitxers del client i són recuperats pel servidor de SPE, amb la informació de la ruta on es troba el fitxer, que és proporcionat pel client en la petició.
- **Petició usuari:** És la petició realitzada pel client contra la API REST de l'antivirus.
- **Valguda Request (ctti-validate-request):** És la política encarregada de realitzar la validació del missatge d'entrada de la invocació a la API contra l'esquema generat en les operacions del disseny de la API.
- **Logs d'invocació (ctti-invoke-log):** És la política que s'empra per a guardar en el log la request i response de la política de Invoke per a posteriorment ser enviats al Analytics, permetent d'aquesta manera registrar més etapes del flux d'execució, podent el desenvolupador revisar la invocació abans i després de ser enviada al backend. Amb el que es permet identificar si la lògica aplicada en la API i el backend estan funcionant correctament, agilitzant la identificació i resolució d'errors, i el seu temps, ampliant la traçabilitat.
- **Invocació al servidor SPE (Invoke):** En aquesta part del flux es realitza la petició al servidor de SPE per a l'escaneig del fitxer emmagatzemat en l'espai compartit, la ruta del qual per on es troba emmagatzemat el fitxer es facilita en la petició.
- **(Extensió) Capçaleres de seguretat:** Aquesta extensió s'encarregarà d'eliminar les capçaleres de resposta que puguin contenir informació sensible.
- **Finalització:** Finalització del flux.
- **Gestió d'errors (ctti-error-management):** És la política que s'empra per a proporcionar una gestió més efectiva dels errors produïts dins del assembly del API, retornant una estructura uniformitzada i més clara per al client.

## **Exemple d'ús de API d'Antivirus (Postman)**

En aquesta secció es detalla un exemple d'ús dels serveis de les APIs d'Antivirus mitjançant l'eina Postman, des de l'obtenció del token de Gicar fins a l'escaneig d'un fitxer.

### **Obtenció de token Gicar**

Per a l'obtenció del token Gicar, és necessari invocar a la següent operació amb les següents configuracions:

###### **_EndPoints_**

**_POST_**

	https://preproduccio.endpointma.autenticaciogicar4.extranet.gencat.cat/realms/gicarcpd4/protocol/openid-connect/token

<p>
  <img src="/related/apiantivirus/Postman1.png" width="1100" height="50"/>
</p>

###### **_Entrada_**

**_Cos de petició:_**
- **client_id:** _*client ID de Gicar obtingut en la sol·licitud de credencials de keycloak indicat anteriorment_*
- **client_secret:** _*Client secret de Gicar obtingut en la sol·licitud de credencials de keycloak indicat anteriorment_*
- **grant_type:** _*client_credentials_*

<p>
  <img src="/related/apiantivirus/Postman2.png" width="900" height="200"/>
</p>

**_Capçaleres: Buit_**

<p>
  <img src="/related/apiantivirus/Postman3.png" width="1000" height="200"/>
</p>

###### **Sortida:**

- **access_token:** *_Conté el token d'accés de Gicar_*
- **expiris_in:** *_Temps de validesa del token_*
- **token_type:** *_Tipus del token_*

<p>
  <img src="/related/apiantivirus/Postman4.png" width="1100" height="400"/>
</p>

### **Obtenció de token SPE**

Per a l'obtenció del token SPE, és necessari invocar a la següent operació amb les següents configuracions:

###### **_EndPoints_**

**_POST_**

	https://preproduccio.ctti.apim.intranet.gencat.cat/ctti/privat-pre/2669/api-request-token/authentication

<p>
  <img src="/related/apiantivirus/Postman5.png" width="1100" height="50"/>
</p>

###### **_Entrada_**

**_Capçaleres: Buit_**

<p>
  <img src="/related/apiantivirus/Postman6.png" width="1000" height="200"/>
</p>

**_Capçaleres:_**
- **Authorization:** *_Token d'accés Gicar_*
- **X-IBM-Client-Id:** *_Client ID de l'aplicació subscrita al producte de APIs_*

<p>
  <img src="/related/apiantivirus/Postman7.png" width="900" height="200"/>
</p>

###### **Sortida:**

- **access_token:** *_Conté el token d'accés de SPE_*
- **refresh_token:** *_Conté el token de refresh de SPE_*
- **access_token_expiration_time:** *_Temps de validesa del token_*

<p>
  <img src="/related/apiantivirus/Postman8.png" width="900" height="200"/>
</p>

### **Refresc de token SPE**

Per a refrescar el token SPE, és necessari invocar a la següent operació amb les següents configuracions:

###### **_EndPoints_**

**_POST_**

	https://preproduccio.ctti.apim.intranet.gencat.cat/ctti/privat-pre/2669/api-request-token/refresh

<p>
  <img src="/related/apiantivirus/Postman9.png" width="1100" height="50"/>
</p>

###### **_Entrada_**

**_Capçaleres: Buit_**

<p>
  <img src="/related/apiantivirus/Postman10.png" width="1000" height="200"/>
</p>

- **Authorization:** *_Bearer <Token de acceso Gicar>_*
- **X-IBM-Client-Id:** *_Client ID de l'aplicació subscrita al producte de APIs_*
- **Authorization-SPE:** *_Bearer <Token de refresh SPE>_*

<p>
  <img src="/related/apiantivirus/Postman11.png" width="900" height="200"/>
</p>

###### **Sortida:**

- **access_token:** *_Conté el token d'accés de SPE_*
- **refresh_token:** *_Conté el token de refresh de SPE_*
- **access_token_expiration_time:** *_Temps de validesa del token_*

<p>
  <img src="/related/apiantivirus/Postman12.png" width="900" height="200"/>
</p>

### **Escaneig de fitxers**

Per a escanejar fitxers, és necessari invocar a la següent operació amb les següents configuracions:

###### **_EndPoints_**

**_POST_**

	https://preproduccio.ctti.apim.intranet.gencat.cat/ctti/privat-pre/2669/api-scan-file/scan-file

<p>
  <img src="/related/apiantivirus/Postman13.png" width="1100" height="50"/>
</p>

###### **_Entrada_**

**_Cos de petició: form_data**

- **file:** *_<El fitxer adjuntat que es vulgui manar per a escanejar>_*

<p>
  <img src="/related/apiantivirus/Postman14.png" width="1000" height="200"/>
</p>

**_Capçaleres:**
- **Authorization:** *_Bearer <Token de acceso Gicar>_*
- **X-IBM-Client-Id:** *_Client ID de l'aplicació subscrita al producte de APIs_*
- **Authorization-SPE:** *_Bearer <Token de acceso SPE>_*

<p>
  <img src="/related/apiantivirus/Postman15.png" width="1000" height="200"/>
</p>

###### **Sortida:**

- **scanStatus:** *_Indicador de si l'escaneig s'ha realitzat amb èxit o no_*
- **fileScanned:** *_Nom del fitxer escanejat_*
- **fileStatus:** *_Resultat de l'anàlisi (CLEAN)_*
- **totalInfections:** *_Nombre total d'infeccions detectades_*
- **bytesScanned:** *_Nombre de bytes escanejats_*
- **totalFilesScanned:** *_Nombre de fitxers escanejats_*

<p>
  <img src="/related/apiantivirus/Postman16.png" width="1100" height="300"/>
</p>

### **Escaneig de fitxers per ruta**

*NOTA*: Actualment no es troba disponible aquesta operació, pel fet que encara falta per plantejar i aprovisionar un espai compartit on es pugui emmagatzemar els fitxers, i realitzar les configuracions necessàries perquè el servidor SPE pugui tenir accés a l'espai creat. {style="background: yellow"}

Per a escanejar fitxers facilitant la ruta per on es troba emmagatzemat els fitxers, és necessari invocar a la següent operació amb les següents configuracions:

###### **_EndPoints_**

**_POST_**

	https://preproduccio.ctti.apim.intranet.gencat.cat/ctti/privat-pre/2669/api-scan-file/scan-file-path

<p>
  <img src="/related/apiantivirus/Postman17.png" width="1100" height="50"/>
</p>


###### **_Entrada_**

**_Cos de petició: JSON**

- **filePath:** *_<La ruta del fitxer a analitzar, emmagatzemat en l'espai compartit>_*

<p>
  <img src="/related/apiantivirus/Postman18.png" width="1000" height="400"/>
</p>

**_Capçaleres:_**
- **Authorization:** *_Bearer <Token de acceso Gicar>_*
- **X-IBM-Client-Id:** *_Client ID de l'aplicació subscrita al producte de APIs_*
- **Authorization-SPE:** *_Bearer <Token de acceso SPE>_*

<p>
  <img src="/related/apiantivirus/Postman19.png" width="1000" height="200"/>
</p>

###### **Sortida:**

- **scanStatus:** *_Indicador de si l'escaneig s'ha realitzat amb èxit o no_*
- **fileScanned:** *_Nom del fitxer escanejat_*
- **fileStatus:** *_Resultat de l'anàlisi (CLEAN)_*
- **totalInfections:** *_Nombre total d'infeccions detectades_*
- **bytesScanned:** *_Nombre de bytes escanejats_*
- **totalFilesScanned:** *_Nombre de fitxers escanejats_*

<p>
  <img src="/related/apiantivirus/Postman20.png" width="1100" height="300"/>
</p>

## **Annexos**
### **Col·lecció POSTMAN**

En aquesta secció s'inclou la col·lecció de Postman, que pot ser importada en l'eina per a comptar amb totes les peticions al API d'Antivirus prèviament configurades.

- [Col·lecció Postman](/related/apiantivirus/ColeccionPostman.json)

### **API Antivirus Swagger**

En aquesta secció s'inclou les especificacions YAML de les APIs d'Antivirus desenvolupades.

**_API Request Token_**

API encarregada d'oferir els serveis d'autenticació contra el servidor de SPE i refrescar el token d'accés.

- [Adjuntem el fitxer ymal del API Request token (Swagger)](/related/apiantivirus/2669-api-request-token_v1.0.0.yaml)

**_API Scan File_**

API encarregada d'oferir els serveis relacionats amb l'escaneig dels fitxers.

- [Adjuntem el fitxer ymal del API Scan File (Swagger)](/related/apiantivirus/2669-api-scan-file_v1.0.0.yaml)

### **Configuració del token automàtic en Postman**

L'eina de Postman compta amb la funcionalitat de la configuració automàtica del token OAuth 2.0 en les peticions que es realitzen, que facilitaria el procés d'invocacions contra les APIs d'Antivirus.

En aquesta secció es detalla els passos per a configurar l'obtenció automàtica del token de Gicar (Keycloak) en les peticions contra el API d'Antivirus. Els passos a realitzar són els següents:

1) Primer s'accedeix a la sección "Authorization" del Postman, i es tria l'opció OAuth 2.0 en el desplegable de "Auth Type"

	<p>
		<img src="/related/apiantivirus/AnexoPostman1.png" width="900" height="400"/>
	</p>

S'emplenen els paràmetres amb els següents valors:

- **Token Name:** Indicar el nom del token
- **Grant type:** Client Credentials
- **Access Token URL:**
https://preproduccio.endpointma.autenticaciogicar4.extranet.gencat.cat/realms/gicarcpd4/protocol/openid-connect/token
- **Client ID:** Client ID de GICAR
- **Client Secret:** Client Secret de GICAR
- **Client Authentication:** Send as Basic Auth header

	<p>
		<img src="/related/apiantivirus/AnexoPostman2.png" width="900" height="600"/>
	</p>

2) Una vegada emplenat els paràmetres anteriors, es prem sobre el botó "Get new access token"

	<p>
		<img src="/related/apiantivirus/AnexoPostman3.png" width="900" height="600"/>
	</p>

3) Després d'obtenir el token d'accés GICAR, es prem sobre el botó "Use Token" per a afegir el token en les peticions que es realitzen contra les APIs d'antivirus.

	<p>
		<img src="/related/apiantivirus/AnexoPostman4.png" width="900" height="600"/>
	</p>

