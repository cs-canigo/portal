+++
date        = "2025-01-21"
title       = "Requisits per a fer ús del API Antivirus"
description = "Documentació detallada dels requisits necessaris per a integrar-se amb el API Antivirus"
sections    = "APIANTIVIRUS"
weight      = 1
categories  = ["cloud","apiantivirus"]
+++

La següent informació es proporciona com una guia per als clients, detallant els requeriments i passos necessaris que les aplicacions/projectes han de seguir per a poder fer ús de les APIs d'Antivirus.

## **Requisits previs**

### **Sol·licitar alta d'usuari en Gicar**

Gicar és el Identity provider de CTTI integrat en tots els serveis de CTTI. Per a accedir als serveis i plataformes de CTTI és necessari tenir un usuari vàlid de Gicar per a autenticar-se en les plataformes.

La gestió de l'alta, baixa, modificació dels usuaris/passwords en GICAR es duu a terme a través del departament de Gestió d'identitats dins de CTTI. Cada proveïdor tindrà un agent del PMO, qui s'encarregarà de gestionar els comptes Gicar, amb les dades com el DNI, correu i el nom facilitat per l'agent del projecte.
## 

<p>
  <img src="/related/apiantivirus/AutenticacioDeUsuariosGicar.png" width="900" height="400"/>
</p>

---

### **Creació de l'aplicació en el portal de desenvolupadors**

De cara a poder fer ús de les APIs, és necessari subscriure's al producte associat. Per a això, s'ha d'accedir al portal de developer per a l'entorn corresponent:

- [Preproducció interna](https://portal.db40-c57f0fcb.eu-de.apiconnect.appdomain.cloud/ctti/privat-pre/) (Privat-pre)
- [Producció interna](https://portal.db40-c57f0fcb.eu-de.apiconnect.appdomain.cloud/ctti/privat/) (Privat)

<p>
  <img src="/related/apiantivirus/PortalDeDesarrolladores.png" width="1100" height="600"/>
</p>

## 
Una vegada accedit al portal de developer, s'inicia sessió amb el compte de Gicar sol·licitada prèviament i es procedeix a crear una nova aplicació.

Per a això, es prem primer en el botó "Apps" en la barra superior de la pantalla, i posteriorment, en el botó "Crear una aplicació nova".
## 

<p>
  <img src="/related/apiantivirus/PasoCrearAPP.png" width="1000" height="300"/>
</p>

## 
Procedim a crear l'aplicació, emplenant el camp "Title" amb el nom d'aquesta aplicació.
## 

<p>
  <img src="/related/apiantivirus/PasoCrearAPP_2.png" width="400" height="500"/>
</p>

<p>
  <img src="/related/apiantivirus/PasoCrearAPP_3.png" width="400" height="500"/>
</p>

## 
Una vegada que la tinguem creada, guardem el Client ID proporcionat.
## 

<p>
  <img src="/related/apiantivirus/PasoCrearAPP_4.png" width="400" height="700"/>
</p>

## 
A continuació, es tria el pla de subscripció que s'ajusti més a la necessitat del projecte. Els paràmetres dels plans són els següents:

- **Default:** Límit de _*100 peticions/hora*_ i _*10 peticions/minut*_.
- **Bronze:** Límit de _*1000 peticions/hora*_ i _*100 peticions/minut*_.
- **Silver:** Límit de _*2000 peticions/hora*_ i _*200 peticions/minut*_.
- **Gold:** Límit de _*4000 peticions/hora*_ i _*400 peticions/minut*_.

## 
_**Nota:**_ És possible sol·licitar la creació d'un pla customizado ajustant a la necessitat específica de cada projecte (sempre que no superi el límit de crides establert per la OFT), a través de l'obertura d'un tiquet ACOAPIM indicant a la OFT de API Manager el motiu i el pla que es vulgui crear amb els paràmetres adequats.
## 

<p>
  <img src="/related/apiantivirus/PasoCrearAPP_Plan.png" width="900" height="300"/>
</p>

## 
Després de triar el pla de subscripció adequat, se selecciona l'aplicació que s'ha creat anteriorment, i es prem sobre el botó "Continuar".
## 

<p>
  <img src="/related/apiantivirus/PasoCrearAPP_Plan_2.png" width="600" height="300"/>
</p>

<p>
  <img src="/related/apiantivirus/PasoCrearAPP_Plan_3.png" width="900" height="300"/>
</p>

## 
Una vegada subscrit al producte, es pot verificar per la pantalla de l'aplicació l'estat de la subscripció, que en aquest cas està en "Pending approval", la qual cosa indica que és necessari sol·licitar l'aprovació de la subscripció per part de l'administrador (OFT).
## 

<p>
  <img src="/related/apiantivirus/PasoCrearAPP_Detalle.png" width="600" height="400"/>
</p>

## 
### **Obertura del tiquet ACOAPIM per a l'aprovació de la subscripció de APIs**

De cara al fet que la OFT del API Manager pugui aprovar la subscripció del producte de APIs seleccionat, és necessari obrir un tiquet [ACOAPIM](https://cstd-ctti.atlassian.net/jira/software/c/projects/acoapim/issues), prement sobre el botó "Create" en la pàgina web de l'enllaç.
## 

**Nota:** _*Per a obtenir accés al JIRA i tiquet ACOAPIM, és necessari sol·licitar prèviament el permís per tiquet [REMEDY](https://pauticgencat.onbmc.com/), facilitant el DNI, el correu i el nom dels integrants de l'equip*_
## 

<p>
  <img src="/related/apiantivirus/AperturaTicket.png" width="1000" height="200"/>
</p>

## 
S'haurien d'emplenar com a mínim els següents camps recomanats:
- **Organisme/Projecte Afectat:** Indicar el nom del projecte / organisme. En el cas que no es trobi l'adequat en el desplegable, es pot informar el següent: CENTRO TELECOMUNICACIONS I TECNOLOGIES DE LA INFORMACIÓ.
- **Si no localitzes el projecte en el desplegable, introdueix-lo aquí:** Indicar el nom del projecte a desplegar.
- **Summary:** Concepte de la petició, per exemple, "Sol·licitud aprovació de la subscripció del producte API".
- **Descripció:** Descripció detallada de la sol·licitud.

Una vegada que la OFT d'API Manager hagi aprovat la subscripció del producte d'Apis sol·licitada, la confirmació del qual serà enviada per correu i registrada en el tiquet de ACOAPIM obert anteriorment, estarà tot habilitat perquè el client pugui començar a fer ús dels serveis d'antivirus a través de les Apis desenvolupades.
## 

### **Sol·licitud de les credencials de Keycloak**

Les APIs d'antivirus implementen el flux de seguretat i autenticació OAuth (Client Credentials) utilitzant el proveïdor intern recomanat per CTTI, GICAR, usant el sistema de gestió d'identitats de Keycloak. En aquest flux, l'aplicació empra les seves credencials prèviament sol·licitades per a obtenir un token d'accés. Keycloak verifica les credencials i, si són vàlides, genera un token d'accés que permet autenticar-se en la capa OAuth 2.0 del API, habilitant així l'accés als serveis oferts per les APIs.

Per a sol·licitar les credencials Client ID + Client Secret per a autenticar-se contra Keycloak és necessari obrir un tiquet [ACOGICAR](https://cstd-ctti.atlassian.net/jira/software/c/projects/acogicar/boards/21). Si no es disposa de permisos per a accedir a això, és necessari obrir un tiquet [REMEDY](https://pauticgencat.onbmc.com/) indicant la necessitat d'obtenir accés per a obrir tiquets de ACOGICAR.

---
