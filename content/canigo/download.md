+++
date        = "2015-01-24T17:11:42+01:00"
title       = "Binaris de Canigó"
description = "Descàrrega de les diferents versions de Canigó, entorn de treball, plugin d'eclipse..."
sections    = "Canigó"
toc	    = true
weight	    = 4
+++

## Canigó 3.2

- [Release notes Canigó 3.2](/canigo-download-related/release-notes-canigo-32)
- [Matriu de Compatibilitat Canigo 3](/canigo-download-related/matrius-compatibilitats)

|          Versió LTS Actual       	 |      Última versió disponible    	 |
|--------------------------------- 	 |------------------------------------	 |
|              3.2.0.1            	 |                3.2.7	             |

### Creació de l'entorn local de desenvolupament

<!--
- Descàrrega de l'[entorn base de treball](http://repos.canigo.ctti.gencat.cat/repository/maven2/canigo/entorn-treball/canigo3.html) *És necessari realitzar l'upgrade del plugin de Canigó per Eclipse a la versió 1.2.0.
- Guia d'inici per a la configuració d'un entorn de desenvolupament. Veure aquest [link](/canigo-download-related/guia-inici)
-->

Veure [Entorn desenvolupament Canigó](http://canigo.ctti.gencat.cat/canigo/entorn-desenvolupament/)

Altra informació d'interés:

* [Plugin Canigó 3.2 per a Eclipse i creació d'aplicació](/canigo-download-related/plugin-canigo)
* [Codi plantilla demo Canigó 3.2] (https://github.com/gencatcloud/plantilla-demo-canigo32)

### Configuració Maven (manual)

Per a la resolució de dependències de Canigó i llibreries de tercers necessàries, fora de l'entorn de desenvolupament proporcionats pel CS Canigó on ja està pre-configurat, cal configurar el següent repositori Maven:
```
    https://sic.ctti.extranet.gencat.cat/nexus/content/groups/canigo-group-maven2/
```
Per a utilitzar el repositori, en realitat grup de repositoris, s'ha d'afegir el certificat del domini "sic.ctti.extranet.gencat.cat" al "cacerts" de Java des d'on s'executi el procés Maven que construeixi l'aplicació Canigó. Les passes a seguir són les següents:

* Descarregar el certificat de la web mitjançant un navegador. Per exemple amb Google Chrome es pot fer de la següent manera:
```
    Chrome -> "Eines per a desenvolupadors" -> "Seguretat" -> "Veure certificat" -> "Detalls" -> "Exportar"
```
* Importar el certificat (Ex. "certificat.cer") al magatzem "cacerts" de Java amb l'eina keytool inclosa dins la JDK:
```
    $ keytool -keystore cacerts -importcert -alias canigo -file certificat.cer
```
Un cop importat el certificat els processos Maven executats que utilitzin la JDK on s'ha importat el certificat seran capaços de descarregar dependències del grup de repositoris.

Al settings.xml del Maven configurar el repository al profile per defecte:

```
	<profile>
		<id>defaultProfile</id>
		<activation>
			<activeByDefault>true</activeByDefault>
		</activation>
		<repositories>
			<repository>
				<id>canigo</id>
				<url>https://sic.ctti.extranet.gencat.cat/nexus/content/groups/canigo-group-maven2/</url>
				<snapshots>
					<enabled>true</enabled>
					<updatePolicy>always</updatePolicy>
				</snapshots>
				<releases>
					<enabled>true</enabled>
				</releases>
			</repository>
		</repositories>
		<properties>
			<downloadSources>true</downloadSources>
			<downloadJavadocs>false</downloadJavadocs>
		</properties>
	</profile>
  
```

## Canigó 2.3

- [Release notes Canigó 2.3.22](https://cstd.ctti.gencat.cat/jiracstd/browse/CAN/fixforversion/10452)
- [Plantilla Canigó 2.3.20 (Amb exemples) (format .zip)](http://repos.canigo.ctti.gencat.cat/repository/maven2/canigo/plantilla-canigo-inicial/2.3.20/demo-canigo-2.3.20.zip)
- [Plantilla Canigó 2.3.20 (Sense exemples) (format .zip)](http://repos.canigo.ctti.gencat.cat/repository/maven2/canigo/plantilla-canigo-inicial/2.3.20/plantilla-canigo-2.3.20.zip)
- [Contingut estàtic versió 2.3.20 (Comprimit) (format .zip)](http://repos.canigo.ctti.gencat.cat/repository/maven2/canigo/plantilla-canigo-inicial/2.3.20/demo-canigo-static-compress-2.3.20.zip)

### Creació de l'entorn local de desenvolupament

- Descàrrega de l'[entorn base de treball](https://sic.ctti.extranet.gencat.cat/nexus/content/groups/canigo-group-maven2/canigo/entorn-treball/canigo.zip)
- Guia d'inici per a la configuració d'un entorn de desenvolupament. Veure aquest [link](/canigo-download-related/guia-inici-canigo2)

<p>&nbsp;</p>

## Versions anteriors 2.x

Per a versions antigues del Framework Canigó, contacteu amb el [Centre de Suport](https://canigo.ctti.gencat.cat/centre-de-suport/contacta/).
<p>&nbsp;</p>
