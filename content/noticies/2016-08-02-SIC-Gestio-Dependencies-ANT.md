+++
date        = "2015-08-02"
title       = "SIC. Gestió de dependències per aplicacions ANT"
description = "Procediment de gestió de dependències amb aplicacions ANT al SIC"
section     = "Notícies"
categories  = ["sic"]
+++

## Gestió de dependències amb JAVA utilitzant ANT

Per aplicacions Java no mavenitzades, tot i que existeixen solucions com [Apache Ivy](http://ant.apache.org/ivy/), les aplicacions que ens hem trobat utilitzen directament [Apache ANT](http://ant.apache.org/) per a gestionar dependències.

El procediment és el següent:

1. Primerament, si voleu que també us funcioni a l'entorn de desenvolupament, haureu de disposar d'una versió d'**ANT 1.9.2 o superior**.
2. S'haurà d'incloure a l'inici _build.xml_ del projecte les següents directives:

		(...)
		<property name="nexus-url" value="http://hudson.intranet.gencat.cat/nexus/service/local/artifact/maven/redirect" />
    
	    <macrodef name="descarrega-nexus">
    	    <attribute name="repositori"/>
	        <attribute name="grup"/>
    	    <attribute name="artefacte"/>
        	<attribute name="versio"/>
        	<attribute name="extensio"/>
	        <attribute name="desti"/>
    	    <sequential>
            	<echo>[NEXUS] Descarregant llibreria @{grup}.@{artefacte}-@{versio}.@{extensio}</echo>
            	<get src="${nexus-url}?r=@{repositori}&amp;g=@{grup}&amp;a=@{artefacte}&amp;v=@{versio}&amp;e=@{extensio}" dest="@{desti}/@{artefacte}-@{versio}.@{extensio}" />
        	</sequential>
	    </macrodef>
		(...)
        
3. Buscar al repositori Nexus del SIC la llibreria que desitgem incloure al projecte:

  1. Accedim al [Nexus del SIC](http://hudson.intranet.gencat.cat/nexus)
  2. Escribim la llibreria que desitjem buscar:
  <img alt="Cerca de la llibreria" src="/images/news/SIC-ant-nexus-01.png" style="margin: 10px auto;width: 80%;auto;display:block;"/>
  3. Ens apareixeran els resultats de la cerca:
  <img alt="Cerca de la llibreria" src="/images/news/SIC-ant-nexus-02.png" style="margin: 10px auto;width: 80%;auto;display:block;"/>
  4. Sel·leccionem l'element desitjat. Ens apareixeran dades que necessitem informar:
      * El grup
      * L'artefacte
      * La versió
      * L'extensió
      * Indicador del respositori (a l'esquerra)
   <img alt="Cerca de la llibreria" src="/images/news/SIC-ant-nexus-03.png" style="margin: 10px auto;width: 80%;height: auto;display:block;"/>
  5. Ens falta saber el nom del repositori. Farem clic a *Repositoris*:
   <img alt="Cerca de la llibreria" src="/images/news/SIC-ant-nexus-04.png" style="margin: 10px auto;display:block;"/>
  6. Busquem el repositori a partir de l'indicador obtingut al pas 3.4. En aquest cas, el repositori de **3rd party** és **thirdparty**:
   <img alt="Cerca de la llibreria" src="/images/news/SIC-ant-nexus-05.png" style="margin: 10px auto;width: 80%;auto;display:block;"/>
4. Per a cada llibreria que tingui el projecte, invocar a la macro que hem definit en el pas 2. Com a destí, especificar la ruta on guardeu les llibreries del projecte. Exemple:

		<descarrega-nexus repositori="thirdparty" grup="com.liferay.portal" artefacte="servlet-api" versio="5.1.2" extensio="jar" desti="./lib/"/>
        


