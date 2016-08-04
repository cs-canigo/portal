+++
date        = "2016-04-07"
title       = "Dels Applets a Java Web Start amb JNLP"
description = "Us expliquem breument les estratègies de migració dels Applets Java i en concret, la migració a tecnologia Java Web Start amb JNLP"
sections    = ["Bloc", "home"]
bloc_tags	= ["legacy"]
enllac	    = "http://canigo.ctti.gencat.cat/bloc/2016/04/applets-to-jnlp/"
key         = "ABRIL2016"
+++

Tal i com us explicàvem fa unes setmanes, la tecnologia applet tal i com la coneixem deixarà de poder utilitzar-se als navegadors d'internet en breu i, a més, la versió Java 9 deixarà de donar suport als plugins de navegador que permeten l'execució d'aquests applets.

Per tant, davant d'aquesta problemàtica se'ns presenten dues solucions:

- Continuar utilitzant els applets amb l'alternativa recomanada per Oracle: Java Web Start
- Canviar la funcionalitat que utilitza els applets per tecnologia nativa web

### Java Web Start (JWS)

[Java Web Start](https://www.java.com/en/download/faq/java_webstart.xml) permet executar aplicacions des de la web, però enlloc d'executar-se dins del navegador, incrustats a l'html (tags object, applet, ...) l'usuari es descarrega un fitxer JNLP (Java Network Launching Protocol) i, en clicar-lo, s'executa l'aplicació JWS fora del navegador.

En el cas dels applets, JWS dóna suport a la seva execució, de manera que un applet incrustat en una pàgina web d'aquesta manera:

		<applet code="java2d.Java2DemoApplet"          
        	jnlp_href="dynamictree_applet.jnlp"         
        	width="710" 
        	height="540" >        
		    <param name="param1" value="value1"/>
		</applet> 

Passaria a cridar-se mitjançant un fitxer amb extensió jnlp que contindria el següent codi:

		<jnlp spec='1.0+' codebase='http://sc-pre.aoc.cat/appletCentralitzat/resources/jars/' href=''>
			<information>
				<title>Applet Centralitzat</title>
			</information>
			<resources>
				<jar href="SwingSet2.jar"/>
			</resources>
			<applet-desc main-class="SwingSet2Applet" name="SwingSet" width="625" height="595">
				<param name="param1" value="value1"/>
			  	<param name="param2" value="value2"/>
			</applet-desc>
		</jnlp>

L'usuari es descarregaria aquest fitxer des de la web i aixecaria l'aplicació Java fora del navegador. 

**En el cas que l'applet intercanviés informació amb l'aplicació web que el fa servir (o a la inversa) mitjançant javascript, aquesta comunicació deixarà de funcionar, i, per tant, s'haurà de canviar la manera de comunicar l'aplicació applet/java i l'aplicació web. La solució passa per crear un servei del costat de servidor que s'encarregui de comunicar l'applet i l'aplicació web.** 

Nota d'Oracle sobre la migració d'applets a JWS: http://docs.oracle.com/javase/8/docs/technotes/guides/deploy/applet_dev_guide.html#JSDPG1032

### Exemples d'Applets migrats a JWS/JNLP o en procés de migració

- Applet de Signatura de l'AOC: 
	- http://test-applet-centralitzat.eu-gb.mybluemix.net/demo/
	- https://github.com/cs-canigo/applet-centralitzat

- JClic: http://clic.xtec.cat/ca/jclic/

