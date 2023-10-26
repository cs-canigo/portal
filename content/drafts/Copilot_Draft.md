+++
date        = "2023-10-26"
title       = "Microsoft 365 Copilot"
description = "Microsoft 365 Copilot"
sections    = ["Blog"]
categories  = ["microsoft", "office365", "intel·ligència artificial"]
+++

---

# **Microsoft 365 Copilot**

---

## **Taula de Continguts** {#TaulaContiguts}
1. [Introducció] (#Introduccio)
2. [Caracteristíques principals] (#Caracteristiques)
3. [Integracions amb Microsoft 365 Copilot] (#Integracions)
4. [Usos de Microsoft 365 Copilot] (#Usos)
5. [Limitacions i consideracions] (#Limitacions)
6. [Conclusions] (#Conclusions)
7. [Referències] (#Referencies)
8. [Glossari] (#Glossari)

---

## **Introducció** {#Introduccio}

### **Què és Microsoft 365 Copilot ?** 

**Microsoft 365 Copilot** és una eina de productivitat amb tecnologia d’intel·ligència artificial que combina tres grans elements. D'una banda, les aplicacions de Microsoft 365 ubicades al cloud (Word, Excel, Outlook, Teams, etc.). Per un altre, l'anomenat Microsoft Graph, una API que serveix per connectar altres serveis al núvol de Microsoft  com per exemple, dades, correus, xats, calendari, etc.. I finalment, un model de llenguatge LLM (Large Language Model) que s'encarrega d'entendre el context i aquests elements a través d'una petició de l'usuari (prompt), la resolt i li dona una sortida (resposta).<br> 

Què són els LLM?<br>
Els grans models de llenguatge (LLM) són un tipus de model d'IA que pot entendre text en llenguatge natural i generar respostes semblants a les humanes. Copilot utilitza LLM per proporcionar assistència intel·ligent en temps real als usuaris mentre treballen. Pot ajudar els usuaris amb tasques com ara la creació de contingut de text, la comprensió i molt més.<br>

Cal destacar també que Microsoft té un Copilot per cada experiència Microsoft Cloud com es pot veure a continuació en la imatge.<br>

<br>
<div align="center"> <img src="/images/bloc/2023/10/Post-AI-Copilot.png" /></div>
<br>

### **Com funciona ?** 

Microsoft 365 Copilot es basa en la intel·ligència artificial dels grans models de llenguatge (LLM), incloent-hi GPT-4 d’ OpenAI . Combina el poder d'aquests models amb les dades de Microsoft 365 i Microsoft Graph.<br>

En el diagrama següent es proporciona una representació visual de com funciona Microsoft 365 Copilot.<br>

<br>
<div align="center"> <img src="/images/bloc/2023/10/microsoft-365-copilot-flow.png" /></div>
<div align="center">Flux Microsoft 365 Copilot</div>
<br>

* Copilot rep una consulta d'entrada d'un usuari en una aplicació com Word o PowerPoint.<br>

* A continuació, Copilot processa prèviament la consulta a través d'un enfocament denominat grounding, que millora l'especificitat de la consulta, la qual cosa garanteix que s'obtinguin respostes rellevants i que es puguin processar  per la tasca específica. La consulta pot incloure text d'arxius d'entrada o un altre contingut detectat per Copilot, Copilot envia la consulta al LLM  pel seu processament. Copilot només accedeix a les dades als quals un usuari ja té accés, en funció, per exemple, dels controls d'accés basats en rols de Microsoft 365 existents.<br>

* Copilot pren la resposta del LLM i posteriorment la processa. Aquest processament posterior inclou altres crides de grounding a: Microsoft Graph, comprovacions d'intel·ligència artificial responsable, revisions de seguretat, compliment i privacitat, i generació de comandes.<br>

* Copilot retorna la resposta a l'aplicació, on l'usuari pot revisar i avaluar la resposta.<br>

Microsoft 365 Copilot processa i organitza de manera iterativa aquests sofisticats serveis per poder generar resultats rellevants per l'organització, ja que es basen contextualment en les dades de l'organització.<br>


### **Requeriments de Microsoft 365 Copilot** 

A continuació es descriuen alguns dels requeriments més importants a tenir en compte per utilitzar Microsoft 365 Copilot:<br>

* A data actual, es necessita una llicència **Microsoft 365 E3** o una **Microsoft 365 E5** per poder utilitzar aquest complement.<br>

* **Llicència Copilot de Microsoft 365:** No cal autoritzar a tots els usuaris. Microsoft 365 Copilot no és un complement obligatori per Microsoft 365. Es pot triar desplegar-ho  només als usuaris que més es beneficiïn.<br>

* Els usuaris han de tenir comptes de **Microsoft Entra ID** (anteriorment Azure Active Directory) per utilitzar plenament el servei Microsoft 365 Copilot.<br>

* Els dispositius d’usuari han d’estar al **Canal actual** o al **Canal mensual Enterprise** per accedir a les característiques de Microsoft 365 Copilot (vegeu https://learn.microsoft.com/en-us/deployoffice/updates/overview-update-channels si no s’està familiaritzat amb aquests canals).<br>

* Cal revisar la configuració de privacitat de les aplicacions de Microsoft 365 per empreses, ja que pot afectar la disponibilitat de les característiques de Microsoft 365 Copilot. Per obtenir més informació, cal consultar https://learn.microsoft.com/es-es/microsoft-365-copilot/microsoft-365-copilot-privacy#microsoft-365-copilot-and-policy-settings-for-connected-experiences <br>


Alguns requeriments previs d’algunes de les  aplicacions son:<br>

* Algunes característiques en Microsoft 365 Copilot, com la restauració d'arxius i l'administració de OneDrive, requereixen que els usuaris tinguin un compte de OneDrive.<br>

* Microsoft 365 Copilot funciona amb el nou Outlook per Windows (https://support.microsoft.com/office/getting-started-with-the-new-outlook-for-windows-656bb8d9-5a60-49b2-a98b-ba7822bc7627) i Mac, que es troba actualment en versió preliminar.<br>

Properament Microsoft 365 Copilot estarà disponible pels clients de Microsoft Enterprise.<br>


## **Caracteristíques principals** {#Caracteristiques}

Algunes de les  característiques de Microsoft 365 Copilot són:<br>

* **Assistència en temps real:** proporciona assistència en temps real mentre es treballa en els documents, fulls de càlcul i presentacions.<br>
* **Generació de contingut:** Pot generar contingut rellevant i útil basat en les necessitats i preferències.<br>
* **Resums i anàlisis:** Resumeix i analitza la informació continguda en els documents.
Integració amb Microsoft Graph: s'integra amb Microsoft Graph per a proporcionar  informació contextual rellevant.<br>
* **Millora de la productivitat:** Està dissenyat per a millorar la productivitat en ajudar a completar les tasques més ràpides i de manera més eficient.<br>

Les aplicacions de Microsoft 365 (com Word, Excel, PowerPoint, Outook, Teams  i Loop) funcionen amb Copilot per donar suport als usuaris en el context del seu treball.<br> 

En la taula següent es mostren algunes d'aquestes característiques:<br> 

<table align="center">
 <tr>
    <td align="center"><div><b>Aplicació de Microsoft</b></div></td>
    <td align="center"><div><b>Característica</b></div></td>
    <td align="center"><div><b>Descripció</b></div></td>
  </tr>
  <tr>
    <td align="center"><div>Word</div><div><img src="/images/bloc/2023/10/word.webp" /></div></td>
    <td align="left">Esborrany amb Copilot</td>
    <td align="left">Generació de text amb i sense format en documents nous o existents.</td>
  </tr>
  <tr>
    <td align="center"><div>PowerPoint</div><div><img src="/images/bloc/2023/10/icon.webp" /></div></td>
    <td align="left">Esborrany amb Copilot</td>
    <td align="left">Creació a partir del prompt o file, aprofitant les plantilles empresarials. La integració amb DALL-E, el generador d'imatges de OpenAI, també permet als usuaris demanar a Copilot que creï imatges personalitzades.<br>Afegeix diapositives, imatges o fa canvis de text.</td>
  </tr>
  <tr>
    <td align="center"><div>Loop</div><div><img src="/images/bloc/2023/10/Loop.png" /></div></td>
    <td align="left">Creació de contingut de col·laboració</td>
    <td align="left">Crea contingut que pot millorar-se de manera col·laborativa mitjançant l'edició directa o el refinament per part de Copilot.</td>
  </tr>
  <tr>
    <td align="center"><div>Outlook</div><div><img src="/images/bloc/2023/10/Outlook.webp" /></div></td>
    <td align="left">Suggeriments d'entrenament</td>
    <td align="left">S’obtenen suggeriments de coaching sobre claredat, sentiment i to, juntament amb una avaluació general de missatges i suggeriments per millorar.</td>
  </tr>  
  <tr>
    <td align="center"><div>Teams</div><div><img src="/images/bloc/2023/10/Teams.webp" /></div></td>
    <td align="left">Reunions</td>
    <td align="left">Els usuaris poden invocar Copilot en reunions. Copilot utilitza la transcripció en temps real per a respondre a les preguntes de l'usuari. Només fa servir la transcripció i coneix el nom de l'usuari que escriu la pregunta. L'usuari pot escriure qualsevol pregunta o utilitzar missatges predefinits, no obstant això, Copilot només respondrà a les preguntes relacionades amb la conversa de la reunió de la transcripció. L'usuari pot copiar o enganxar una resposta i accedir a Copilot una vegada finalitzada la reunió en la pàgina Resum. L'historial d'interacció de Copilot amb l'usuari es manté durant 24 hores.</td>
  </tr>    
</table>
<br>

## **Integracions amb Microsoft 365 Copilot** {#Integracions}

A continuació es mostra una llista d’aplicacions que s'integren amb Microsoft 365 Copilot:<br>

* **ChatGPT** és un model de llenguatge desenvolupat per OpenAI i s’entrena en una gamma diversa de text d'Internet, el que li permet generar respostes humanes a una varietat d'indicadors. El ChatGPT es pot utilitzar per diverses tasques de processament del llenguatge natural, com ara la resposta a preguntes, la conversa i la generació de text.<br> 
* **Microsoft 365 (abans Microsoft Office 365):** Outlook, OneDrive, Word, Excel, PowerPoint, OneNote, SharePoint, Microsoft Teams, Engage (abans Yammer) i molts més.<br>
* **Microsoft Teams:** Espai de treball compartit on es pot xatejar, reunir-se, compartir fitxers i treballar amb aplicacions empresarials.<br>
* **Microsoft PowerPoint:** Creació de presentacions. Transmet les idees amb un disseny, animació, moviment, models 3D i icones.<br>
* **Microsoft Outlook:** Correu electrònic, calendari, contactes tot en un sol lloc.<br> 
* **Microsoft OneNote:** Bloc de notes digital. Amb una navegació i una cerca fàcils, per trobar les notes.<br> 
* **Microsoft Excel:** Crea fàcilment fulls de càlcul a partir de plantilles i utilitza fórmules per realitzar càlculs. Els diagrames i gràfiques ajuden a presentar les dades.<br>
* **Microsoft LooP:**  Permet compartir pàgines, dades i fitxers amb l’equip. Creació conjunta que reuneix equips, contingut i tasques en les seves eines i dispositius. És un espai de treball únic amb capacitats d'intel·ligència artificial dissenyades per portar tot el que un usuari necessita a una aplicació, eliminant la necessitat de canviar entre diferents aplicacions.<br>
* **Microsoft Power Platform:** Analitza dades, crea solucions, automatitza processos i crea agents virtuals. Copilot en Power Platform pot ajudar a optimitzar i accelerar el  treball amb eines de low code com Power Automate, Power Apps, Power BI o Power Virtual Agent. A continuació, es descriuen algunes de les accions que es poden fer amb aquest Copilot:<br>
   * **Generació de codi:** Copilot pot generar codi automàticament en llenguatge de fórmules M per Power Query, en llenguatge DAX per Power BI i en llenguatge Power Automate per fluxos de treball. Es pot       
demanar una descripció del que es desitja aconseguir i Copilot generarà el codi corresponent.<br>
   * **Suggeriments de funcions i fórmules:** Quan s’està escrivint fórmules en Power Apps o Power Automate, Copilot pot suggerir funcions i fórmules rellevants en funció del context. Això ajuda trobar ràpidament la funció o fórmula adequada i estalviar temps de cerca.<br>
   * **Ajuda amb la sintaxi:** Si hi ha dubtes sobre la sintaxi d'una funció o es necessita recordar com s'escriu una fórmula específica, Copilot  proporciona exemples de codi i explicacions detallades per ajudar a entendre i utilitzar correctament la sintaxi.<br>
   * **Optimització de consultes i fluxos de treball:** Copilot  analitza les consultes en Power Query o els fluxos de treball en Power Automate i proposa millores per optimitzar el rendiment i l'eficiència.<br> 
   * **Resolució de problemes:** Si hi ha un error o un problema en l’aplicació de Power Apps o en el flux de Power Automate, Copilot pot ajudar a identificar i solucionar el problema en proporcionar suggeriments i possibles solucions.<br>


## **Usos de Microsoft 365 Copilot** {#Usos}

En general a totes les aplicacions de Microsoft 365 Copilot es pot **Xatejar** per obtenir suggeriments, idees o respostes a  preguntes.<br>

<br>
<div align="center"> <img src="/images/bloc/2023/10/xat.png" /></div>
<br>


Microsoft 365 Copilot **ofereix diferents prompts** i opcions per adaptar-se a les necessitats i referències.<br>
A continuació es descriuen diferents usos de Microsoft 365 Copilot:<br>


### **Funcionalitats Copilot en Word** 

**Copilot en Word**  es pot utilitzar per escriure, editar, accedir, incorporar informació i resumir amb major rapidesa i precisió. Pot crear un primer esborrany, incorporar informació d'interès, afegir documents relacionats… A més, és capaç d'aportar un to personalitzat a cada tasca en conèixer els destinataris del document.<br> 
Per fer servir Copilot en Word, només s’ha d'obrir un document i fer clic a la icona de Copilot a la part superior dreta. A continuació, es veu, una barra lateral on es pot escriure o dir el que es vol que faci.<br> 
Per exemple, es poden demanar accions com:<br>

* Resumir un document en punts clau.<br>
* Generar resums basats en altres documents de text.<br>
* Afegir una introducció i una conclusió al document.<br>
* Canviar el to d’escriptura del document: professional, informal,..<br>
* Aportar arguments per defensar una tesi.<br>
* Reescriure apartats o ressaltar incoherències.<br>
* Crear esborranys de text basats en esquemes o estructures.<br> 

<br>
<div align="center"> <img src="/images/bloc/2023/10/M365_Word.gif" /></div>
<br>


### **Funcionalitats Copilot en Excel** 

**Copilot en Excel**  facilita l'anàlisi i exploració de dades. Ja no són necessàries les fórmules. Simplement, es pot preguntar a Copilot en llenguatge natural  sobre el conjunt de dades presentades i s’accedeix a respostes concretes, correlacions i escenaris hipotètics. A més, suggereix noves fórmules basades en les preguntes, mitjançant models que ajuden a explorar les dades.<br>
Identifica tendències, crea visualitzacions i demana recomanacions per obtenir una major profunditat de coneixement.<br>
Es pot per exemple demanar:<br>

* En un full de càlcul d'Excel amb  dades i variables, filtrar els valors més alts o els més baixos. Això pot ser molt útil per comprovar, per exemple, els productes més venuts, d'on venen els majors costos o quines categories són les més reeixides entre el públic.<br>
* Crear esborranys de pressupostos o de comptabilitat.<br>
* Generar gràfics.<br>
* Realitzar hipòtesi sobre els resultats de vendes, creixement… en canviar una de les variables.<br>

<br>
<div align="center"> <img src="/images/bloc/2023/10/M365_Excel.gif" /></div>
<br>


### **Funcionalitats Copilot en PowerPoint** 

**Copilot en PowerPoint** ajuda a convertir les idees en presentacions. Pot transformar documents escrits en presentacions completes, fins i tot amb notes i fonts, per reforçar la presentació. O iniciar una nova presentació des de zero a partir d'una simple indicació o esquema.<br> 
Condensa presentacions llargues i ajusta el disseny, reformata el text o sincronitza perfectament les animacions mitjançant les indicacions en llenguatge natural.<br> 

Es pot demanar per exemple:<br>

* Generar l'esborrany de presentació de diapositives amb la informació d'un altre arxiu.<br>
* Resumir presentacions.<br>
* Canviar el disseny d'una diapositiva concreta.<br>
* Reduir el text i sincronitzar-lo amb les animacions ja presents en una presentació.<br>

<br>
<div align="center"> <img src="/images/bloc/2023/10/M365_PowerPoint.gif" /></div>
<br>


### **Funcionalitats Copilot en Outlook** 

**Copilot en Outlook** pot ajudar a resumir cadenes de missatges de diferents correus o crear esborranys de respostes de manera automàtica, netejar la safata d’entrada més ràpidament així com escriure esborranys de correu electrònic basats en la informació d'altres documents.<br>
Copilot ofereix diverses funcions que poden agilitzar el procés de composició del correu electrònic.<br> 
Aquestes són algunes de les funcionalitats clau per ajudar a redactar correus electrònics de manera més eficaç:<br>

* Ajuda a completar frases, corregir la gramàtica i fer suggeriments contextuals per millorar la qualitat general del vostre correu electrònic.<br>
* Proporciona comentaris sobre la llegibilitat dels correus electrònics, ajudant a garantir la claredat i la concisió.<br>
* Analitza el to del correu electrònic i suggereix canvis per mantenir un estil de comunicació més directa, casual, formal o inclús que sigui el teu propi to.<br> 
* Ofereix recomanacions a l’assumpte per cridar l'atenció i millorar les taxes d'obertura del correu electrònic.<br>

<br>
<div align="center"> <img src="/images/bloc/2023/10/M365_Outlook.gif" /></div>
<br>


### **Funcionalitats Copilot en Teams** 

**Copilot en Teams** fa que les reunions siguin més productives, amb resums en temps real i punts d'acció directament en el context de la conversa. També pots usar-ho per posar-se al dia sobre les converses revisant ràpidament els punts principals, els elements d'acció i les decisions.<br>
Copilot pot transcriure reunions, recordar detalls que es pot haver perdut si s’arriba tard, o resumir la reunió i generar un informe sobre el qual s'ha debatut. Copilot recull tota la informació de la reunió gràcies a la transcripció, per això és important que aquesta funcionalitat estigui activa.<br> 
Algunes de les accions que s’hi poden demanar són:<br> 

* **Abans de la reunió:** Generar un llistat de possibles temes dels quals parlar en la reunió a partir de documents previs que s’indiqui. També, genera l'estructura de la reunió d'acord amb missatges de xat.<br>
* **Durant una reunió:** Es pot utilitzar per resumir els punts clau de la discussió, inclòs qui va dir què i en què s'està d'acord o en desacord, per suggerir elements d'acció, tot en temps real durant una reunió.<br> 
* **Després de la reunió:** Crear resums de les reunions per aquelles persones que no han pogut assistir, que han arribat tard o que desitgen una síntesi.<br>

<br>
<div align="center"> <img src="/images/bloc/2023/10/phonecopilot.gif" /></div>
<br>


### **Funcionalitats Copilot en OneNote** 

Copilot també s'integra amb **OneNote** per ajudar a crear, capturar, organitzar i recordar informació de manera més eficient.<br> 
Algunes de les coses que es poden fer són:<br>

* **Resumir les notes:** Copilot pot ajudar a resumir una selecció de text, pàgina i secció de notes en un format que es pot compartir.<br>
* **Crear una llista de tasques:** Es pot utilitzar Copilot per crear llistes de tasques pendents a partir de les notes i mantenir un seguiment de les activitats pendents.<br>
* **Dissenyar un pla:** Copilot pot ajudar a dissenyar plans per esdeveniments, reunions i celebracions i organitzar les  idees de manera estructurada.<br>

<br>
<div align="center"> <img src="/images/bloc/2023/10/OneNote.gif" /></div>
<br>


## **Limitacions i consideracions** {#Limitacions}

En general, Microsoft 365 Copilot és una eina que pot ajudar als usuaris a ser més productius. No obstant això, és important tenir en compte les consideracions i limitacions per a aprofitar al màxim l'eina.<br>

Microsoft 365 Copilot és una **eina de suport, no una eina de reemplaçament**. Els usuaris encara han de tenir un coneixement bàsic de les tasques que estan realitzant per poder aprofitar al màxim la intel·ligència artificial.<br>

Microsoft 365 Copilot pot **proporcionar suggeriments inexactes o generar contingut incorrecte**, que poden afectar la qualitat i precisió de la sortida.<br>

**Incapacitat per retenir converses:** Microsoft 365 Copilot no té la capacitat de retenir converses, el que vol dir es que pot no recordar interaccions o context anteriors.<br>

**Copilot Copyright Commitment** és un nou compromís de Microsoft amb els entorns dels Copilots i la propietat intel·lectual (setembre 2023). Això vol dir que es poden utilitzar els serveis Copilot així com la sortida que generen sense preocupar-se per reclamacions de propietat intel·lectual, ja que Microsoft té el compromís de que si es rep una reclamació per motius de propietat intel·lectual, Microsoft assumirà la responsabilitat dels possibles riscos legals associats.<br>

En general, Microsoft 365 Copilot admet les següents llengües per les indicacions:
**Anglès, Francès, Alemany, Italià, Xinès (simplificat), Japonès, Portuguès (Brasil) i Espanyol**. A data actual, Copilot a Excel només està suportat en anglès.<br>

**Impacte en costos**. Com que Copilot és un complement, és una despesa addicional per totes les organitzacions, independentment de la seva llicència actual.<br>

Les capacitats de la IA de Copilot són impressionants, però plantegen preocupacions per la **privacitat de les dades**, ja que l’eina analitza les dades de l'usuari. Però segons Microsoft,  Copilot s'ha dissenyat i implementat complint amb els més estrictes requisits de privacitat, seguretat de dades i responsabilitat.<br>


## **Conclusions** {#Conclusions}

En resum, Microsoft 365 Copilot és una eina poderosa que pot ajudar a millorar la productivitat i creativitat. Amb la seva capacitat per treballar juntament amb diverses aplicacions populars de Microsoft 365, pot transformar el flux de treball i fer que les tasques diàries siguin més eficients, efectives i amb més creativitat.<br>

Però caldrà tenir en compte que com totes les plataformes d'intel·ligència artificial es  modela amb dades i que si aquestes  són incompletes, parcials, incorrectes o corruptes, els suggeriments que genera, independentment de qui ho demani, seran incomplets, parcials, erronis o corruptes.<br>

Per un altre banda,  les empreses que intentin aplicar correctament la IA hauran de controlar acuradament les dades a les quals pugui accedir Copilot. Per exemple pot haver-hi notes de reunions que formin part de flux de dades que son rebutjades i poden contaminar el flux de dades i  propagar-se a través de l’organització.<br>

Les empreses també hauran de decidir si amagar dades a la IA, és més beneficiós que permetre l’accés a la IA.<br>

Microsoft 365 Copilot és una plataforma que encara està en desenvolupament i caldrà anar veien com evoluciona i com es pot aprofitar al màxim.<br> 


## **Referències** {#Referencies}

* https://www.youtube.com/watch?v=E5g20qmeKpg <br>
* https://techcommunity.microsoft.com/t5/microsoft-mechanics-blog/how-to-get-ready-for-microsoft-365-copilot/ba-p/3853773 <br>
* https://learn.microsoft.com/es-es/microsoft-365-copilot/microsoft-365-copilot-requirements <br>
* https://learn.microsoft.com/es-es/microsoft-365-copilot/microsoft-365-copilot-overviewhttps://news.microsoft.com/es-es/2023/09/21/llega-microsoft-copilot-el-companero-de-inteligencia-artificial-para-el-dia-a-dia/ <br>
* https://licenseq.com/microsoft-365-copilot-everything-you-need-to-know/ <br>
* https://learn.microsoft.com/es-es/microsoft-365-copilot/microsoft-365-copilot-overview <br>
* https://powerbi.microsoft.com/es-es/blog/introducing-microsoft-fabric-and-copilot-in-microsoft-power-bi/ <br>
* https://news.microsoft.com/es-es/2023/09/19/microsoft-anuncia-un-nuevo-compromiso-ante-sus-clientes-en-torno-a-los-copilots-y-la-propiedad-intelectual/ <br>
* https://www.plainconcepts.com/es/microsoft-copilot-guia/ <br>
* https://support.microsoft.com/es-es/copilot-word <br>
* https://support.microsoft.com/es-es/copilot-excel <br>
* https://support.microsoft.com/en-us/copilot-powerpoint <br>
* https://support.microsoft.com/es-es/copilot-teams <br>
* https://support.microsoft.com/es-es/copilot-onenote <br>


## **Glossari** {#Glossari}

* **LLD (Large Language Model):** és un tipus de model de llenguatge destacat per la seva capacitat d'aconseguir una comprensió i generació del llenguatge de propòsit general.<br>
* **Prompt:** És una instrucció, pregunta o un text que s'utilitza per interactuar amb sistemes d'intel·ligència artificial. Podríem dir que és com un comando, amb el qual se li demana a aquest sistema que faci una tasca concreta.<br>


<br>
<br>
#### Àrea d'Arquitectura d'Entorn Digital de Treball i Comunicacions <br>
#### Direcció Infraestructures
