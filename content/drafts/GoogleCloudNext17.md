# Google Cloud Next' 17
![Google Next 17]({{site.baseurl}}/content/drafts/Screen Shot 2017-02-08 at 10.11.12 AM.png)

Google Cloud Next 17 és l'event que va organtizar Google a Sant Francisco els dies 8,9 i 10 de març. En aquest event s'aprofita per a presentar les novetats referents al treball a nivell empresarial en Cloud, tan en lloc de treball (GSuite), com a nivell d'aplicacions (Google Cloud Platform).

Tota l'agenda de l'event es pot veure a [Shedule](https://cloudnext.withgoogle.com/schedule) i les conferències estan puglicades a [Youtube](https://www.youtube.com/playlist?list=PLIivdWyY5sqI8RuUibiH8sMb1ExIw0lAR.). 


![GSuite]({{site.baseurl}}/content/drafts/Imatge1.png)

La solució de Google al treball col.laboratiu en Cloud amb funcionalitat empresarial és GSuite. Durant l'event es van presentar les principals novetats en aquesta Suite:
## Team Drive 
Google Drive Corporatiu. Permetrà veure’s com a unitat local tot i no estar sincronitzat. Els documentes hostatjats no pertanyen a una persona, sinó a la corporació.
## App Maker
Entorn de desenvolupament d’aplicacions JS internes orientades a gestió de dades. (https://developers.google.com/appmaker/)
## Jamboard 
Pissarra que permet col·laboració en temps real a través de Hangouts.

![Google Cloud Platform]({{site.baseurl}}/content/drafts/Imatge3.png)

Dins de la categoria de Cloud Platform, Google ofereix solucions a diferents nivells:
## Plataformes d'execució
On segons si la gestió recau més en el desenvolupador o en Google, ens ofereix.
- **AppEngines**. Motors d'execució gestionats per Google on sols es desplega el codi d'aplicació.
- **Contenidors**. Desplegament de contenidors a través de l'orquestrador **Kubernetes**. 
- **Infraestructura**. Potencia a nivell de SO.
- **Cloud Functions**. Serveis Serverless, **novetat presentada en l'event en estat beta.**

Les principals novetats en aquesta categoria es van presentar a nivell de Kubernetes:
**Kubernetes** és l'orquestrador de clusters de contenidors opensource desenvolupat per Google. Les seves principals funcionalitats inclouen:
- Auto-corregit
- programació del desplegament
- Escalat horitzontal manual I automatitzat
- Reinici automàtic
- Balanceig integrat
Algunes de les novetats presentades en la versió 1.6 de Kubernetes son:
- Balanceig Multi-Cluster / multi-zona  N7 amb SSL amb una única IP (Ingress)
- Nous paràmetres de desplegament:
- Condicionar el desplegament a la tipologia de hardware sobre el que s'executa:
	- Desplega a la màquina mes barata
	- Desplega a la màquina que té un mínim de prestacions a nivell de maquinari
	- Desplega a la màquina que té un mínim de prestacions a nivell deTipus de disc
- Aprovisionamet dinàmic de volums estàtics 
- Aplicacions amb estat
- Federació de clústers (kubefed) en diverses regions(fins i tot entre on-premis i cloud)
- Afinitat a pods
- Afinitat a zones


