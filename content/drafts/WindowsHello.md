+++
date        = "2022-05-18"
title       = "Windows Hello"
description = "windows Hello"
sections    = "Blog"
weight      = 3
categories  = ["Windows", "Microsoft"]
+++

# **Windows Hello**

---

## **Taula de Continguts** {#TaulaContiguts}

1. [Introducció] (#Introduccio)
2. [Windows Hello versus Windows Hello For Business] (#WindowsHelloVSWindowsHelloFBusiness)
3. [Novetats] (#Novetats)
4. [Referències] (#Referencies)
5. [Glossari] (#Glossari)

---

## **Introducció** {#Introduccio}

Quan Windows 10 va aparèixer per primera vegada, incorporava Microsoft Passport i Windows Hello, fet que va permetre  proporcionar una autenticació multifactorial. 
Per simplificar el desplegament i millorar la compatibilitat, Microsoft ha combinat aquestes tecnologies en una única solució amb el nom de Windows Hello i _**pot aplicar-se tant per àmbit personal com empresarial**_. Amb aquesta funcionalitat s’ofereix als usuaris de Windows una manera alternativa d'iniciar sessió als seus dispositius i aplicacions mitjançant l'empremta digital, l'escaneig de l'iris o el reconeixement facial.

Es tracta d’una solució d’autenticació biomètrica fiable i totalment integrada basada en el reconeixement facial o la concordança d'empremtes digitals que utilitza una combinació de càmeres especials d'infrarojos (IR) i programari per augmentar la precisió i protegir-se de la falsificació en el processos d’autenticació. 
Els principals venedors de maquinari disposen de dispositius amb càmeres integrades  i lectors d’empremtes digitals compatibles amb aquesta solució, permetent que els dispositius que no en tenen, els puguin afegir. 

El **reconeixement facial**, utilitza càmeres especials que veuen en llum d’infrarojos, la qual cosa, els permet distingir de manera fiable entre una fotografia o escaneig i una persona viva, és per aquest motiu que hi ha diversos venedors que estan posant a la venta càmeres externes que incorporen aquesta tecnologia. A més, els principals fabricants d'ordinadors portàtils també l'incorporen als seus dispositius. 

El **reconeixement d’empremtes digitals** utilitza un sensor d'empremta capacitiu per escanejar-la.  Aquests  estan disponibles als ordinadors Windows des de fa anys, tot i que la  generació actual de sensors és significativament més fiable i menys propensa a errors. És per aquest motiu que la majoria de lectors d'empremtes digitals existents funcionen amb Windows 10 i Windows 11.

A nivell de privacitat i seguretat, Windows emmagatzema les dades biomètriques que s'utilitzen per implementar la solució de manera segura només al dispositiu local i les dades biomètriques no es desplacen i mai s'envien a dispositius o servidors externs. Per això no hi ha cap punt de recollida únic que un atacant pugui comprometre per robar dades biomètriques.

És important saber que per la utilització d’aquesta funcionalitat, cal fer una verificació inicial en dos passos que ha de fer el propi usuari i que es du a terme, durant  la inscripció. 

Windows Hello es configura al dispositiu de l'usuari, i Windows demana a l'usuari que estableixi una dada biomètrica i un PIN (serà necessari en l’inici de sessió si la lectura biomètrica no és possible). A continuació, Windows disposa de la capacitat per a utilitzar la funcionalitat durant el procés d’autenticació.

Per configurar la solució, cal anar a les opcions d'inici de sessió de la configuració del compte.  S’ha d'establir una exploració facial, una exploració de l'iris o una empremta digital per començar, però sempre es podrà millorar aquestes exploracions i afegir o eliminar empremtes dactilars addicionals. Destacar també que la funcionalitat de Windows Hello pot conviure amb la contrasenya com una opció addicional d’inici de sessió.

Un cop configurat, un cop d'ull al seu dispositiu o l'exploració d'un dit desbloquejarà l'accés als comptes de Microsoft.
<br>
<br>
<div align="center">
  <img src="/images/bloc/2022/05/foto1.gif" />
</div>
<br>

Windows Hello soluciona els problemes següents sobre les contrasenyes: 

* Les contrasenyes fortes poden ser difícils de recordar i els usuaris sovint reutilitzen contrasenyes en diversos llocs.
* Les infraccions del servidor poden exposar les credencials de xarxa simètriques (contrasenyes).
* Les contrasenyes estan subjectes a atacs de repetició.
* Els usuaris poden exposar les seves contrasenyes sense voler a causa d'atacs de pesca.

Addicionalment, cal dir que Windows Hello permet als usuaris autenticar-se a través de:

* Un compte de Microsoft.
* Un compte d'Active Directory.
* Un compte de Microsoft Azure Active Directory (Azure AD).
* Les aplicacions que utilitzin l’API.
* Serveis de proveïdors d'identitat o serveis de persones de confiança que admeten l'autenticació Fast ID Online (FIDO) v2.0.

<br>
<div align="center">
  <img src="/images/bloc/2022/05/foto2.gif" />
</div>
<br>

## **Windows Hello versus Windows Hello For Business** {#WindowsHelloVSWindowsHelloFBusiness}

Windows Hello està orientat tant per l’entorn personal com per l’empresarial  però és important destacar que tots els models d’implementació empresarials compleixen amb directrius estrictes de processament i tractament de dades biomètriques que garanteixen la seguretat de les mateixes i la privacitat de les dades.

**Punts clau de Windows Hello:**

* La funcionalitat domèstica de Windows Hello (anomenat també PIN de Conveniència) està orientat a ús personal i no pas empresarial. No disposa de suport empresarial.
* A Windows Hello domèstic, les persones poden crear un PIN o un gest biomètric als seus dispositius personals per iniciar la sessió còmodament. Aquest ús és exclusiu del dispositiu on està configurat, però utilitza un simple _**hash de contrasenya**_ en funció del tipus de compte de la persona. Aquesta configuració s'anomena PIN de conveniència de Windows Hello i _**no està recolzada per una autenticació asimètrica**_ (clau pública/privada) o basada en certificats.
* No disposa de gestió avançada.
* No requereix registre amb multi factor d’autenticació (MFA).


**Punts clau de Windows Hello for Business:**

* Windows Hello for Business crea un parell de claus criptogràfiques vinculades al mòdul de plataforma de confiança (TPM). L'accés a aquestes claus i l'obtenció d'una signatura per validar la possessió de la clau privada de l'usuari, només s'habilita mitjançant el PIN o biomètrics. 
* La verificació en dos passos que té lloc durant la inscripció a la solució, crea una relació de confiança entre el proveïdor d'identitat i l'usuari quan la part pública del parell de claus pública/privada s'envia a un proveïdor d'identitat i s'associa amb un compte d'usuari. 
* Windows Hello for Business permet la configuració mitjançant una política de grup o una política de gestió de dispositius mòbils (MDM). 
* Sempre utilitza l'autenticació basada en clau o certificat i això fa que sigui molt més segur que el PIN de conveniència de Windows Hello.
* La clau privada mai surt d'un dispositiu quan s'utilitza TPM. El servidor d'autenticació té una clau pública que s'assigna al compte d'usuari durant el procés de registre.
* Els comptes personals (compte de Microsoft) i corporatius (Active Directory o Azure AD) utilitzen un únic contenidor per a les claus. Totes les claus estan separades pels dominis dels proveïdors d'identitat per ajudar a garantir la privadesa dels usuaris.
* És compatible amb un entorn passwordless.
* És compatible amb FIDO 2.0 i 2FA interactiu.
* Disposa de suport empresarial amb el fabricant.
<br><br>

## **Novetats** {#Novetats}
Microsoft ha anat incorporant al llarg de les seves actualitzacions de sistema operatiu, millores i evolucions que afecten a la funcionalitat de Windows Hello i de les quals es poden destacar les següents:

**Suport Multi-càmera per a Windows Hello**

Permet als usuaris triar la prioritat de càmera externa quan hi ha càmeres internes i externes compatibles amb Windows Hello.

**Mètode d’implementació de Windows Hello for Business Cloud trust**

Aquest nou mètode utilitza Azure Active Directory (AD) Kerberos per abordar els problemes del model de desplegament empresarial de confiança clau.

L’objectiu és oferir una experiència de desplegament simplificada d’inici de sessió únic local amb claus de seguretat i amb una configuració addicional mínima. És el model recomanable per Microsoft si es compleixen els seus requeriments mínims i si no es necessari suportar escenaris d’autenticació de certificats.

A diferencia dels altres models d’implementació empresarial, aquest model ofereix una experiència de desplegament més senzilla perquè no requereix el desplegament d'infraestructura de clau pública (PKI), ni canvis a la PKI existent, i tampoc requereix la sincronització de claus publiques entre Azure AD i els controladors de domini locals per a que els usuaris puguin accedir als recursos i aplicacions locals. 

En definitiva, es pot utilitzar per a nous desplegaments de Windows Hello empresarial o desplegaments existents que es poden moure a aquest mètode mitjançant controls de polítiques.

<br>
<div align="center">
  <img src="/images/bloc/2022/05/foto4.jpg" />
</div>
<br>

**Windows Hello amb Identitat ràpida online 2.0 (FIDO 2.0)**

L'adopció de l'especificació FIDO significa que els socis de Microsoft poden proporcionar claus de seguretat per a una capa addicional de protecció quan inicien sessió mitjançant Windows Hello.

Microsoft dona suport a la darrera versió del protocol de seguretat, FIDO2. Això permet als usuaris accedir a dispositius basats en estàndards, com ara _**claus de seguretat USB**_, que ofereixen una capa addicional de protecció quan inicien sessió als comptes de Microsoft.

Amb la versió 2004 de Microsoft Windows 10, Microsoft va estendre la capacitat sense contrasenya per Windows Hello i Windows Hello for Business als navegadors web, això també significa, que les aplicacions natives de Windows que estan protegides amb Azure AD i que obren una vista web amb Edge per  l'autenticació, _**també són compatibles**_. Es permet doncs, l’ús de la capacitat de Windows Hello FIDO2 al Sistema Operatiu, navegadors web, Microsoft WVD, Teams i aplicacions natives de Windows per iniciar sessió sense contrasenya amb l'empremta digital o reconeixement facial.

Anteriorment, Windows Hello era un autenticador de plataforma que només es podia utilitzar dins del propi sistema operatiu de Windows. Amb aquesta nova capacitat, el lector d'empremtes digitals integrat de l’ordinador portàtil, la càmera web d'infrarojos integrada o la càmera web USB externa es poden utilitzar amb el navegador web, d’igual forma que els autenticadors externs. 

Bàsicament, qualsevol perifèric compatible es pot utilitzar amb navegadors web de la mateixa manera que es fa amb  les claus de seguretat FIDO2 d’avui. Actualment, Windows Hello és compatible com a autenticador Fast Identity Online 2 (FIDO2) a tots els navegadors principals, inclosos Chrome i Firefox.

Windows Hello for Business es compatible amb el directori actiu híbrid d’Azure i l'inici de sessió amb el número de telèfon (MSA). D’aquesta forma el suport de claus de seguretat FIDO2 s'amplia als entorns híbrids d’Azure que permet a les empreses amb entorns híbrids, aprofitar l'autenticació sense contrasenya amb aquesta capa addicional de seguretat.

<br>
<div align="center">
  <img src="/images/bloc/2022/05/foto3.png" />
</div>
<br>

## **Referències** {#Referencies}
https://docs.microsoft.com/en-us/windows/security/identity-protection/hello-for-business/hello-hybrid-cloud-trust <br>
https://docs.microsoft.com/en-us/windows/security/identity-protection/hello-for-business/hello-overview <br>
https://docs.microsoft.com/en-us/windows/security/identity-protection/hello-for-business/ <br>
https://www.obscorp.com/blog/using-windows-hello-to-add-security <br>
https://katystech.blog/mem/intune-windows-hello-for-business <br>
https://www.microsoft.com/en-us/microsoft-365/blog/2018/04/17/windows-hello-fido2-security-keys/ <br>
https://www.intercede.com/us/how-it-leaders-can-best-use-windows-hello-for-business-for-strong-workforce-authentication/ <br>
https://www.jasonsamuel.com/2020/10/13/using-windows-hello-fido2-capability-with-web-browsers-microsoft-wvd-teams-and-native-windows-apps-for-passwordless-logins-using-your-fingerprint-or-face/ <br>
https://fidoalliance.org/microsoft-achieves-fido2-certification-for-windows-hello/ <br>
https://www.computerworld.com/article/3244347/what-is-windows-hello-microsofts-biometrics-security-system-explained.html <br>


## **Glossari** {#Glossari}
* **FIDO (Fast Identity Online):** És el nou estàndard que reforça la seguretat dels sistemes d'autenticació de la identitat en línia en dispositius mòbils i aplicacions web.
* **WVD (Windows Virtual Desktop):** És un servei de virtualització d'escriptoris i aplicacions que s'executa dins de Microsoft Azure.
* **MSA (Microsoft Account):** És la compte de Microsoft que permet als usuaris iniciar sessió mitjançant un únic conjunt de credencials.
* **Passwordless:** Fa referència a la capacitat que té Windows Hello a tendir a un entorn on la paraula de pas és utilitzada menys vegades i fins i tot, pot arribar a deixar d’utilitzar-se en determinats casos d’ús.


<br>
<br>
###### **Unitat Arquitectura d’Entorn Digital de Treball**
###### **Direcció Arquitectura i Components Transversals**
