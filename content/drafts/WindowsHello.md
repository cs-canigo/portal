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
Per simplificar el desplegament i millorar la compatibilitat, Microsoft ha combinat aquestes tecnologies en una única solució amb el nom de Windows Hello i pot aplicar-se tant per àmbit personal com empresarial. Amb aquesta funcionalitat s’ofereix als usuaris de Windows una manera alternativa d'iniciar sessió als seus dispositius i aplicacions mitjançant l'empremta digital, l'escaneig de l'iris o el reconeixement facial.

Es tracta d’una solució d’autenticació biomètrica fiable i totalment integrada basada en el reconeixement facial o la concordança d'empremtes digitals que utilitza una combinació de càmeres especials d'infrarojos (IR) i programari per augmentar la precisió i protegir-se de la falsificació en el processos d’autenticació. 
Els principals venedors de maquinari disposen de dispositius amb càmeres integrades  i lectors d’empremtes digitals compatibles amb aquesta solució, permetent que els dispositius que no en tenen, els puguin afegir. 

El reconeixement facial, utilitza càmeres especials que veuen en llum d’infrarojos, la qual cosa, els permet distingir de manera fiable entre una fotografia o escaneig i una persona viva, és per aquest motiu que hi ha diversos venedors que estan posant a la venta càmeres externes que incorporen aquesta tecnologia. A més, els principals fabricants d'ordinadors portàtils també l'incorporen als seus dispositius. 

El reconeixement d’empremtes digitals utilitza un sensor d'empremta capacitiu per escanejar-la.  Aquests  estan disponibles als ordinadors Windows des de fa anys, tot i que la  generació actual de sensors és significativament més fiable i menys propensa a errors. És per aquest motiu que la majoria de lectors d'empremtes digitals existents funcionen amb Windows 10 i Windows 11.

A nivell de privacitat i seguretat, Windows emmagatzema les dades biomètriques que s'utilitzen per implementar la solució de manera segura només al dispositiu local i les dades biomètriques no es desplacen i mai s'envien a dispositius o servidors externs. Per això no hi ha cap punt de recollida únic que un atacant pugui comprometre per robar dades biomètriques.

És important saber que per la utilització d’aquesta funcionalitat, cal fer una verificació inicial en dos passos que ha de fer el propi usuari i que es du a terme, durant  la inscripció. 

Windows Hello es configura al dispositiu de l'usuari, i Windows demana a l'usuari que estableixi una dada biomètrica i un PIN (serà necessari en l’inici de sessió si la lectura biomètrica no és possible). A continuació, Windows disposa de la capacitat per a utilitzar la funcionalitat durant el procés d’autenticació.
Per configurar la solució, cal anar a les opcions d'inici de sessió de la configuració del compte.  S’ha d'establir una exploració facial, una exploració de l'iris o una empremta digital per començar, però sempre es podrà millorar aquestes exploracions i afegir o eliminar empremtes dactilars addicionals. Destacar també que la funcionalitat de Windows Hello pot conviure amb la contrasenya com una opció addicional d’inici de sessió.
Un cop configurat, un cop d'ull al seu dispositiu o l'exploració d'un dit desbloquejarà l'accés als comptes de Microsoft.
<br>
<div align="center">
  <img src="/images/bloc/2022/03/foto1.jpg" />
</div>
<br>

---

## **Windows Hello versus Windows Hello For Business** {#WindowsHelloVSWindowsHelloFBusiness}

## **Novetats** {#Novetats}

###### [Inici] (#TaulaContiguts)

## **Referències** {#Referencies}
https://docs.microsoft.com/en-us/windows/security/identity-protection/hello-for-business/hello-hybrid-cloud-trust <br>
https://docs.microsoft.com/en-us/windows/security/identity-protection/hello-for-business/hello-overview <br>
https://docs.microsoft.com/en-us/windows/security/identity-protection/hello-for-business/ <br>
https://www.obscorp.com/blog/using-windows-hello-to-add-security <br>
https://katystech.blog/mem/intune-windows-hello-for-business <br>
https://www.microsoft.com/en-us/microsoft-365/blog/2018/04/17/windows-hello-fido2-security-keys/
https://www.intercede.com/us/how-it-leaders-can-best-use-windows-hello-for-business-for-strong-workforce-authentication/ <br>
https://www.jasonsamuel.com/2020/10/13/using-windows-hello-fido2-capability-with-web-browsers-microsoft-wvd-teams-and-native-windows-apps-for-passwordless-logins-using-your-fingerprint-or-face/ <br>
https://fidoalliance.org/microsoft-achieves-fido2-certification-for-windows-hello/ <br>
https://www.computerworld.com/article/3244347/what-is-windows-hello-microsofts-biometrics-security-system-explained.html <br>


## **Glossari** {#Glossari}
