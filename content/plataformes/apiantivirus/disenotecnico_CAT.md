+++
date        = "2025-01-21"
title       = "Disseny tècnic del API Antivirus"
description = "Descripció tècnica de les funcionalitats del API"
sections    = "APIANTIVIRUS"
weight      = 1
categories  = ["cloud","apiantivirus"]
+++

La següent informació es proporciona per a satisfer la necessitat dels clients de comprendre les funcionalitats de les APIs implementades per al projecte '**Antivirus Corporatiu**'. Incloent detalls sobre el funcionament, integració i ús dels serveis oferts per les APIs REST desenvolupades.

## **Descripció**

Al llarg d'aquesta secció s'abordaran els següents aspectes tècnics, que defineixen els punts principals que s'han dut a terme a l'hora de la implementació de les APIs Antivirus:
## 
* **Flux de APIs**: Des de l'enviament de petició per part del client fins que es retorni resposta per part del servidor.
* **Configuració de APIs**: Es detallen les configuracions claus de les APIs, així com la seguretat, polítiques i les propietats del API que s'empren.
* **Endpoints de APIs**: Els serveis i operacions disponibles per al client.
* **Especificacions de APIs**: S'adjunten les especificacions YAML de les APIs.

---

## **Definicions, acrònims i abreviatures**

A continuació, s'inclou una llista dels acrònims i abreviatures, per a la seva facilitar la comprensió de la documentació aportada.
## 

| Acrònims i abreviatures | Significat |  
|------|-------|
| API | És una interfície de programació d'aplicacions (API) que facilita la comunicació entre un usuari i un sistema o servei, canalitzant les sol·licituds de l'usuari cap a aplicacions que poden estar dins o fora de la xarxa interna del client, i transmetent les respostes corresponents de tornada a l'usuari.
| Polítiques | Les polítiques són mòduls interns del API que brinden funcions com a seguretat, limitació de velocitat, transformació i capacitats de mediació.
| Propietats del API (Properties) | Elements configurables pel desenvolupador que poden ser utilitzats per a controlar el comportament de les polítiques de API Connect. Dins de les propietats es poden configurar el nom de propietat, el valor i, opcionalment, un catàleg específic al qual s'aplica un valor de propietat.
| SPE (Symantec Protection Engine) | Symantec Protection Engine és un motor d'escaneig d'URL i contingut de classe operador. Symantec Protection Engine proporciona capacitats d'escaneig de contingut i filtrat d'URL a qualsevol aplicació sobre una xarxa IP, independentment de la seva plataforma.
| API Manager (IBM API Connect) | IBM API Connect és una solució de gestió de les API de cicle de vida complet que s'utilitza per a ajudar a crear, gestionar, protegir, socialitzar i monetitzar API de manera coherent.

---

## **Referències**

A continuació, s'indica l'enllaç a la documentació d'IBM relacionada amb el API Manager (plataforma on estan situades les APIs desenvolupades):
- [Documentació API Manager](https://www.ibm.com/docs/en)

---

## **Diagrama de flux del API de l'Antivirus**

<p>
  <img src="/related/apiantivirus/DiagramaFlujoAPIAntivirus_cat.png" width="1100" height="600"/>
</p>


**_Llegenda:_**
## 
- **Client**: Aplicació que fa ús de les APIs d'antivirus.
- **Gicar**: Proveïdor d'identitats de CTTI. En el context d'aquest projecte és l'encarregat de gestionar els tokens d'accés que s'utilitzen per a autenticar-se contra les APIs, fent ús del proveïdor Keycloak.
- **API Manager**: Plataforma on estaran desplegades les APIs desenvolupades.
- **Producte**: Agrupació de les APIs desenvolupades. Per a poder fer ús de les APIs és requerit per part del client subscriure's al pla del producte corresponent.
- **Pla de producte**: Conté un límit d'invocacions per hora i per minut a les APIs que estan associades al producte.
- **SPE (Symantec Protection Engine)**: Servidor d'Antivirus.

---

## **Escenaris i algorismes**
### **API Authentication**

<p>
  <img src="/related/apiantivirus/ApiAuthentication_cat.png" width="1100" height="600"/>
</p>
 
**_Llegenda:_**
## 
- **Petició usuari:** És la petició realitzada pel client contra la API REST de l'antivirus.
- **Valguda Request (ctti-validate-request):** És la política encarregada de realitzar la validació del missatge d'entrada de la invocació a la API contra l'esquema generat en les operacions del disseny de la API.
- **Recuperar Variables (ctti-get-variables):** És la política encarregada de recuperar el valor de les variables emmagatzemades en diferents arxius en DataPower Gateway. Això permet tenir un control sobre el procés de retornar valors que no es desitgen exposar en el YAML de les APIs. D'aquesta manera, es poden recuperar els valors de manera segura.
- **GatewayScript Configuració usuari SPE:** És el script intern configurat per a muntar la petició que s'envia al servidor SPE, configurant l'usuari vàlid per a autenticar-se, i d'aquesta manera, obtenir tokens d'accés per a accedir a la resta dels serveis de la plataforma.
- **Logs d'invocació (ctti-invoke-log):** És la política que s'empra per a guardar en el log la request i response de la política de Invoke per a posteriorment ser enviats al Analytics, permetent d'aquesta manera registrar més etapes del flux d'execució, podent el desenvolupador revisar la invocació abans i després de ser enviada al backend. Amb el que es permet identificar si la lògica aplicada en la API i el backend estan funcionant correctament, agilitzant la identificació i resolució d'errors, i el seu temps, ampliant la traçabilitat.
- **Invocació al servidor SPE (invoke):** En aquesta part del flux es realitza la petició al servidor de SPE.
- **(Extensió) Capçaleres de seguretat:** Aquesta extensió s'encarregarà d'eliminar les capçaleres de resposta que puguin contenir informació sensible.
- **Finalització:** Finalització del flux.
- **Gestió d'errors (ctti-error-management):** És la política que s'empra per a proporcionar una gestió més efectiva dels errors produïts dins del assembly del API, retornant una estructura uniformitzada i més clara per al client.
##

### **API Scan File**

<p>
  <img src="/related/apiantivirus/ApiScanFile_cat.png" width="1100" height="600"/>
</p>

**_Llegenda:_**
## 
- **Petició usuari:** És la petició realitzada pel client contra la API REST de l'antivirus.
- **Valguda Request (ctti-validate-request):** És la política encarregada de realitzar la validació del missatge d'entrada de la invocació a la API contra l'esquema generat en les operacions del disseny de la API.
- **Logs d'invocació (ctti-invoke-log):** És la política que s'empra per a guardar en el log la request i response de la política de Invoke per a posteriorment ser enviats al Analytics, permetent d'aquesta manera registrar més etapes del flux d'execució, podent el desenvolupador revisar la invocació abans i després de ser enviada al backend. Amb el que es permet identificar si la lògica aplicada en la API i el backend estan funcionant correctament, agilitzant la identificació i resolució d'errors, i el seu temps, ampliant la traçabilitat.
- **Invocació al servidor SPE (Invoke):** En aquesta part del flux es realitza la petició al servidor de SPE.
- **(Extensió) Capçaleres de seguretat:** Aquesta extensió s'encarregarà d'eliminar les capçaleres de resposta que puguin contenir informació sensible.
- **Finalització:** Finalització del flux.
- **Gestió d'errors (ctti-error-management):** És la política que s'empra per a proporcionar una gestió més efectiva dels errors produïts dins del assembly del API, retornant una estructura uniformitzada i més clara per al client.
---

## **Definició del API REST d'Antivirus**
### **Requisit previ de l'ús**
Per a poder fer ús de les operacions de les APIs, és necessari realitzar una crida prèvia al endpoint de Keycloak per a sol·licitar un token d'accés, facilitant per a això les credencials Client ID i Client Secret facilitades per Gicar. El token d'accés obtingut s'utilitzarà per a autenticar-se contra la capa de OAuth implementada en les APIs, i d'aquesta manera, processar les peticions del client correctament.
## 

Dominis Accés Internet:
+ **PRE:**
	https://preproduccio.endpointma.autenticaciogicar4.extranet.gencat.cat/realms/gicarcpd4/protocol/openid-connect/token
+ **PRO:**
	https://endpointma.autenticaciogicar4.extranet.gencat.cat/realms/gicarcpd4/protocol/openid-connect
	
La petició que s'ha de realitzar és el següent:
## 

###### **_EndPoints:_**

1) **_POST '/scan-file'_**

+ **Descripció:** Operació que permet l'obtenció d'un token d'accés Keycloak per a autenticar-se contra la capa de seguretat del API, facilitant per a això les credencials Client ID i Client Secret necessàries.
+ **Cos de la Sol·licitud:** Credencials requerides per a la petició ("client_id", "client_secret" i "grant_type").
	+ **Tipus:** `x-www-form-urlencoded`
+ **Capçalera de la Sol·licitud:** Buit
+ **Resposta Reeixida (200 OK):** El token d'accés generat per Keycloak.
	+ **Tipus:** `application/json`

**_Nota_**: El Client ID i Client Secret que es requereix per a aquesta operació se sol·licita a través del tiquet [ACOGICAR](https://cstd-ctti.atlassian.net/jira/software/c/projects/ACOGICAR/issues), per a l'entorn que correspon (PRE i PRO).
## 

### **Especificacions tècniques de les APIs**
A continuació, es detalla el disseny tècnic de les dues APIs encarregades de gestionar els serveis oferts per SPE, com són, l'obtenció del token d'autenticació i l'escaneig de fitxers. Les APIs proporcionaran les operacions necessàries per a poder fer ús d'aquests serveis per part del client.

### **_Especificacions de la API Scan File_**

- **Nom de la API:** api-scan-file
- **Versió:** 1.0.0
- **Descripció:** API per a la gestió de peticions d'escaneig de fitxers.

**_Dominis Accés Internet:_**

- **PRE**: https://preproduccio.ctti.apim.extranet.gencat.cat/ctti/privat-pre/
- **PRO**: https://ctti.apim.extranet.gencat.cat/ctti/privat/

**_Base Path:_**
- **URL del API:** /2669/api-scan-file

###### **_EndPoints:_**

1) **_POST '/scan-file'_**

+ **Descripció:** Operació que permet analitzar fitxers, els quals s'envien/adjunten en les peticions, rebent com a resposta el resultat de l'anàlisi amb els detalls de l'amenaça.
+ **Cos de la Sol·licitud:** El fitxer que s'adjunta en la petició per a analitzar.
	+ **Tipus:** multipart/form-data
+ **Capçalera de la Sol·licitud:**
	+ **Authorization-SPE:** Conté el token d'accés sol·licitat al servidor SPE que es requereix per a fer ús dels serveis d'antivirus.
	+ **Authorization:** Conté el token d'accés sol·licitat a Keycloak que es requereix per a autenticar-se contra la capa de seguretat OAuth implementada en la API.
+ **Resposta Reeixida (200 OK):** El resultat de l'anàlisi, incloent així detalls com les amenaces trobades i els fitxers que s'han escanejat.
	+ **Tipus:** application/json

2) **_POST '/scan-file-path'_**

+ **Descripció:** Operació que permet analitzar fitxers, facilitant per a això la ruta on està situat el fitxer, rebent com a resposta el resultat de l'anàlisi.
+ **Cos de la Sol·licitud:** La ruta on es troba el fitxer que s'adjunta en la petició per a analitzar.
	+ **Tipus:** application/json
+ **Capçalera de la Sol·licitud:**
	+ **Authorization-SPE:** Conté el token d'accés concedit per SPE que es requereix per a fer ús dels serveis d'antivirus.
	+ **Authorization:** Conté el token d'accés sol·licitat a Keycloak que es requereix per a autenticar-se contra la capa de seguretat OAuth implementada en la API.
+ **Resposta Reeixida (200 OK):** El resultat de l'anàlisi, incloent així detalls com les amenaces trobades i els fitxers que s'han escanejat.
	+ **Tipus:** application/json

**_Nota:_** per a poder fer ús de l'operació de Scan-file-path(url), les aplicacions hauran d'enviar via SFTP el fitxer a escanejar a la següents ubicacions, depenent de l'entorn PREPRODUCCIÓ o PRODUCCIÓ:

**_PREPRODUCCIÓ:_**
- **Servidor:** preproduccio.cpd4.sftp.intranet.gencat.cat (10.53.4.16)
- **User:** antivirus_pre
- **Pass:** <La password d'accés al servidor i carpeta del sftp s'ha de sol·licitar a través d'un tiquet a [ACOAPIM](https://cstd-ctti.atlassian.net/jira/software/c/projects/ACOAPIM/issues)>
- **Carpeta:** /files2scan
 
**_PRODUCCIÓ:_**
- **Servidor:** cpd4.sftp.intranet.gencat.cat (10.52.4.103)
- **User:** antivirus_pro
- **Pass:** <La password d'accés al servidor i carpeta del sftp s'ha de sol·licitar a través d'un tiquet a [ACOAPIM](https://cstd-ctti.atlassian.net/jira/software/c/projects/ACOAPIM/issues)>
- **Carpeta:** /files2scan
## 

###### **_Definició del API (yaml):_**
- [Adjuntem el fitxer ymal del API Scan File (Swagger)](/related/apiantivirus/2669-api-scan-file_v1.0.0.yaml)
## 

### **_Especificacions de la API Request Token_**

- **Nom de la API:** api-request-token
- **Versió:** 1.0.0
- **Descripció:** API per a la gestió de peticions d'obtenció de tokens.

**_Dominis Accés Internet:_**

- **PRE**: https://preproduccio.ctti.apim.extranet.gencat.cat/ctti/privat-pre/
- **PRO**: https://ctti.apim.extranet.gencat.cat/ctti/privat/

**_Base Path:_**
- **URL del API:** /2669/api-request-token

###### **_EndPoints:_**
1) **POST '/authentication'** 

+ **Descripció:** Operació per a sol·licitar un token d'autenticació i de refresh, requerits per a poder fer ús de les funcionalitats d'escaneig de fitxers del API de l'antivirus.
+ **Cos de la Sol·licitud:** Buit
+ **Capçalera de la Sol·licitud:*
	+ **Authorization:** Conté el token d'accés sol·licitat a Keycloak que es requereix per a autenticar-se contra la capa de seguretat OAuth implementada en la API.
+ **Resposta Reeixida (200 OK):** S'obté el token d'accés, el temps de validesa del token i el token de refresh.
	+ **Tipus:** application/json

2) **POST '/refresh'**

+ **Descripció:** Operació que s'usa per a refrescar el període de caducitat del token, proporcionant un nou token d'accés, per a això es requereix facilitar el token de refresh.
+ **Cos de la Sol·licitud:** buit
+ **Capçalera de la Sol·licitud:**
	+ **Authorization-SPE:** Conté el token de refresh que s'utilitzarà per a generar nou token d'accés.
	+ **Authorization:** Conté el token d'accés sol·licitat a Keycloak que es requereix per a autenticar-se contra la capa de seguretat OAuth implementada en la API.
+ **Resposta Reeixida (200 OK):** S'obté el token d'accés, el temps de validesa del token i el token de refresh.
	+ **Tipus:** application/json

###### **_Definició del API (yaml):_**
- [Adjuntem el fitxer ymal del API Request token (Swagger)](/related/apiantivirus/2669-api-request-token_v1.0.0.yaml)
## 

## **URL Del API REST de SPE:**

### **_API d'Autenticació_**
- **PRE:** preproduccio.antivirus.intranet.gencat.cat à Puerto 8008

### **_API d'Escaneig de Fitxers_**
- **PRE:** preproduccio.antivirus.intranet.gencat.cat à Puerto 8008

## **Gestió d'errors:**
- **Esquema resposta d'errors SPE:**
	
```
	{
		"timestamp": “DATE”,
		"status": ERROR_NUMBER,
		"error": "ERROR_INFO",
		"message": "STRING",
		"path": "URL_INVOKED"
	}
```
## 

- **HTTP Error:**
	+ **400 Bad Request:** Indica un error de sol·licitud. Podria deure's a un format inesperat del cos de la sol·licitud o altres formes d'error en la validació de la sol·licitud.
	+ **401 Unauthorized:** Indica un error d'autenticació del client. L'usuari facilitat per a l'operació no està autoritzat per a executar el servei.
	+ **403 Forbidden:** Indica un error d'autorització del client. Petició no permesa.
	+ **404 Not Found:** Indica un intent d'accés a un recurs inassolible o inexistent com, per exemple, un endpoint no disponible.
	+ **405 Method Not Allowed:** Indica un error de sol·licitud. Podria deure's a un mètode incorrecte invocada cap a una url sí existent.
	+ **429 Too Many Request:** Indica que s'ha aconseguit un llindar de límit de peticions/hora o peticions/minut de la subscripció del pla del producte i el client ha de tornar a intentar-lo més tard.
	+ **500 Internal Server Error** _(Error servei de backend, error en l'acoblat del API, error per servei no disponible temporal…etc)_: Un problema del costat del servidor que podria no solucionar-se des del costat del client.
## 

## **Seguretat Flux d'autenticació OAuth 2.0**

OAuth 2.0 és un marc d'autorització dissenyat per a permetre que un lloc web o una aplicació accedeixin a recursos protegits i allotjats per altres aplicacions web en nom d'un usuari.

S'ha implementat en les APIs d'antivirus el flux de seguretat/autenticació OAuth 2.0 (Client Credentials), mitjançant el proveïdor intern recomanat per CTTI, GICAR. Amb la finalitat d'enfortir la capa de seguretat en la crida del client contra les APIs REST de l'antivirus.

### **_Procés d'Autorització OAuth 2.0_**
1) **Sol·licitud de Access Token:** L'aplicació (client) envia una sol·licitud al servidor de Keycloak per a obtenir el token d'autorització, facilitant per a això les credencials Client ID i Client Secret vàlides en la petició.
2) **Concessió de Access Token:** Si el servidor valguda correctament el Client ID i Client Secret proporcionat pel client, el servidor emetrà un codi d'accés al client (Access_token).
3) **Accés al API:** Utilitzant el token d'accés, el client pot procedir a realitzar crides contra les APIs de l'antivirus desplegades en la plataforma de API Manager.

### **_Consideracions de Seguretat_**
* **Tokens d'Accés (Access token):** Són tractats com a credencials confidencials i transmesos de manera segura.

* **Abast i Durada:** L'abast i la durada dels tokens d'accés han de ser mínims segons sigui necessari.
