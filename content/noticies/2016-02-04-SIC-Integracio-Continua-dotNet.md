+++
date        = "2016-02-04"
title       = "Suport complet del SIC a la integració contínua amb .NET"
description = "El SIC s'ha certificat en la construcció, en la gestió de dependències i en els desplegaments d'aplicatius programats amb .NET"
sections    = ["Notícies", "home"]
categories  = ["sic"]
key         = "FEBRER2016"
+++

__Els inicis amb MSBuild__

Des de l'estiu de 2015, el SIC ha estat treballant per poder oferir el mateix suport a les aplicacions desenvolupades amb .NET que el que ja ofereix a les aplicacions desenvolupades amb Java.

Com a primer pas en la integració de .NET al SIC, es va habilitar la compilació i el muntatge d'aquest tipus d'aplicacions mitjançant [MSBuild](https://msdn.microsoft.com/es-es/library/dd393574.aspx).

La utilització de MSBuild permet controlar amb un fitxer xml el procés de compilació i muntatge del programari d'una forma equivalent a les eines del món Java tals com ANT i Maven. Amb MSBuild, a través de la definició de tasques i d'objectius en aquest fitxer xml, es pot orquestrar la gestió de mòduls i la generació dels artefactes .NET.

__Gestió de dependències amb NuGet__

Un element fonamental en la integració contínua és la gestió de dependències. L'ús de llibreries provinents de repositoris oficials o de pròpies validades i emmagatzemades en un repositori de confiança garanteix l'absència d'errors de compatibilitat entre les llibreries utilitzades en l'entorn de desenvolupament i l'entorn d'execució.

Durant la tardor de 2015, es va habilitar un nou repositori en el servidor Nexus del SIC que permet emmagatzemar llibreries .NET. Es tracta d'un repositori Nexus compatible amb [NuGet](https://www.nuget.org/). A més, es va habilitar en els servidors d'integració contínua l'ús d'aquest repositori per fer el muntatge de l'aplicació. D'aquesta manera, es garanteix que les llibreries utilitzades són fiables tant en termes de compatibilitat i fiabilitat com de seguretat.

__Desplegaments amb Web Deploy__

Un cop s'ha aconseguit controlar el procés de muntatge i la gestió de dependències, era el torn estandarditzar el procés de desplegament als servidors.

Durant el mes de gener de 2016, s'han certificat al SIC els desplegaments a IIS mitjançant [Web Deploy](https://www.microsoft.com/es-es/download/details.aspx?id=43717&751be11f-ede8-5a0c-058c-2ee190a24fa6=True). Amb aquesta eina, s'aprofita la generació de l'empaquetament zip --que es desa en el procés de muntatge en les carpetes de binaris-- per desplegar l'aplicació de forma automàtica als servidors IIS.

Aquest sistema de desplegament és el que internament utilitza Visual Studio en els entorns de desenvolupament.

Amb aquestes tres eines, el SIC està preparat per oferir un suport complet a les aplicacions desenvolupades amb .NET. La tecnologia .NET ja és considerada "first class" dins del SIC, amb totes les prestacions que fins avui només gaudia la tecnologia JEE.
