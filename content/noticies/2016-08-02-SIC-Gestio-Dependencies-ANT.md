+++
date        = "2016-08-11"
title       = "SIC. Gestió de dependències per aplicacions ANT"
description = "Procediment de gestió de dependències amb aplicacions ANT al SIC"
sections    = ["Notícies", "home"]
categories  = ["sic"]
key         = "SETEMBRE2016"
+++

## Gestió de dependències amb Java utilitzant ANT

Per aplicacions Java no mavenitzades, tot i que existeixen solucions com [Apache Ivy](http://ant.apache.org/ivy/), és freqüent la utilització directament d'[Apache ANT](http://ant.apache.org/) per a gestionar dependències.

Per a què la gestió de dependències ANT configurada a l'aplicació sigui compatible amb el SIC, cal que compleixi els següents punts:

1. Utilització d'una versió d'**ANT 1.9.2 o superior**.

2. S'han d'incloure a l'inici del fitxer _build.xml_ del projecte les següents directives:

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
        
3. Cercar al repositori Nexus del SIC la llibreria que desitgem incloure al projecte:

  1. Accedim al [Nexus del SIC](http://hudson.intranet.gencat.cat/nexus)
  2. Escrivim la llibreria que desitgem cercar:
  <img alt="Cerca de la llibreria" src="/images/news/SIC-ant-nexus-01.png" style="margin: 10px auto;width: 80%;auto;display:block;"/>
  3. Ens apareixeran els resultats de la cerca:
  <img alt="Cerca de la llibreria" src="/images/news/SIC-ant-nexus-02.png" style="margin: 10px auto;width: 80%;auto;display:block;"/>
  4. Seleccionem l'element desitjat. Ens apareixeran dades que necessitem informar:
      * El grup
      * L'artefacte
      * La versió
      * L'extensió
      * Indicador del repositori (a l'esquerra)
   <img alt="Cerca de la llibreria" src="/images/news/SIC-ant-nexus-03.png" style="margin: 10px auto;width: 80%;height: auto;display:block;"/>
  5. Ens falta saber el nom del repositori del qual s'ha resolt la dependència. Farem clic a *Repositoris*:
   <img alt="Cerca de la llibreria" src="/images/news/SIC-ant-nexus-04.png" style="margin: 10px auto;display:block;"/>
  6. Busquem el repositori a partir de l'indicador obtingut al pas 3.4. En aquest cas, el repositori de **3rd party** és **thirdparty**:
   <img alt="Cerca de la llibreria" src="/images/news/SIC-ant-nexus-05.png" style="margin: 10px auto;width: 80%;auto;display:block;"/>
4. Per a cada llibreria que tingui el projecte, invocar a la macro que hem definit en el pas 2. Com a destí, especificar la ruta (path relatiu) on guardeu les llibreries del projecte. Exemple:

		<descarrega-nexus repositori="thirdparty" grup="com.liferay.portal" artefacte="servlet-api" versio="5.1.2" extensio="jar" desti="./lib/"/>
        
Per a qualsevol dubte referent a la gestió de dependències amb ANT al SIC  podeu [obrir una consulta](http://canigo.ctti.gencat.cat/sic/peticions/) al servei “FRAMEWORK SIC” de SAU-Remedy.

