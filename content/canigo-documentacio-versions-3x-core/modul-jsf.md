+++
date        = "2015-03-12T12:11:42+01:00"
title       = "Mòdul JSF"
description = "Capa de presentació Java Server Faces"
sections    = "Canigó. Documentació versió 3.x"
weight      = 6
+++

## Propòsit

El propósit d'aquest document és donar una visió general de quina és l'arquitectura base de la capa de presentació JSF i els seus components, així com la configuració necessària. Es tractarà entre d'altres:

* Quins són els components principals de l'arquitectura de la capa de presentació
* Quin és el patró recomanat en el desenvolupament de les aplicacions
* Quin és el procediment que segueix l'arquitectura interna de canigo en el tractament d'una petició

## Instal·lació

### Instal·lació

Aquest mòdul s'afegeix com a dependència de manera directa durant la creació d'una aplicació JSF 1.x amb l'eina de suport al desenvolupament, també es pot afegir de manera manual dins el pom.xml de l'aplicacio:

```
<canigo.web.jsf.version>[1.2.0,1.3.0)</canigo.web.jsf.version>

<dependency>
          <groupId>cat.gencat.ctti</groupId>
          <artifactId>canigo.web.jsf</artifactId>
          <version>${canigo.web.jsf.version}</version>
</dependency>
```

## Tecnologies utilitzades

### JavaServer Faces (JSF)

JavaServer Faces és un framework d'interficie de components d'usuari del costat del servidor per a aplicacions web basades en la tecnologia Java. Els principals components de la tecnologia son:

* Una API per a representar componentes d'interficie d'usuari i gestionar el seu estat.
* Gestió d'events, validacions i conversió de dades en el servidor.
* Gestió de la navegació entre pàgines.
* Suport d'internacionalització i accesibilitat.
* Conjunt d'etiquetes JSP personalitzades per a representat components en una pàgina JSP i lligar aquests components a objectes de servidor.

JSF és una especificació desenvolupada per la Java Community Process. Actualment existeixen quatre versions:

* JSF 1.0 (11-03-2004)
* JSF 1.1 (27-05-2004) - Especificació JSR-127: http://jcp.org/en/jsr/detail?id=127
* JSF 1.2 (11-05-2006) - Especificació JSR-252: http://jcp.org/en/jsr/detail?id=252
* JSF 2.0 (01-07-2009) - Especificació JSR-314: http://jcp.org/en/jsr/detail?id=314
* JSF 2.2 (21-05-2013) - Especificació JSR-344: http://jcp.org/en/jsr/detail?id=344

Canigó 3.1 està lligat a la especificació **JSF 2.2**, concretament a la implementació de Sun RI.

El nou model de programació i les llibreries d'etiquetes faciliten la construcció i manteniment de les aplicacions web. Amb un mínim esforç es podria:

* Afegir components rics mitjançant etiquetes a les pàgines JSF.
* Enllaçar events generats per aquest components amb el codi d'aplicació en el servidor.
* Relacionar components de la interficie d'usuari en una pàgina amb dades del servidor.
* Construir interficies d'usuaria amb components reutilitzables i extensibles.
* Guardar i restaurar l'estat de la interficie més allà de la vida de les peticions.

En resum, JSF proporciona:

* Una clara separació entre vista i model.
* Desenvolupament bassat en component, no en peticions. El punt més destacable.
* Les accions de l'usuari es lliguen molt facilment al codi del servidor. Facilitat d'integració d'events del client a components del servidor.
* Creació de families de components visuals per a agilitzar el desenvolupament. Juntament amb els tags per defecte de JSF, s'inclouen els tags proporcionats per Richfaces

### PrimeFaces

PrimeFaces és un framework de codi obert que afegeix capacitats Ajax dins de les aplicacions JSF existents sense recorre a JavaScript. PrimeFaces inclou cicle de vida, validacions, conversions i la gestió de recursos estàtics i dinàmics. Els components de PrimeFaces, construits amb suport Ajax i un alt grau de personalització del "look-and-feel", poden ser incorporats fàcilment dins de les aplicacions JSF.

PrimeFaces permet:

* Intensificar els beneficis de JSF mentre es treballa amb Ajax. PrimeFaces està totalment integrat al cicle de vida de JSF.
* Afegeix les capacitats d'Ajax dins de les aplicacions JSF. No hi ha la necesitat de escriure cap codi Javascript o canviar els components existents per altres amb suport d'Ajax. Mitjançant events activats pel client, s'invoca una petició Ajax que després de canviar dades en el servidor actualitza o renderitza parts de la pàgina indicades pel desenvolupador.
* Crear components rics pròpis amb suport Ajax de manera àgil.
* Suport de "pells" o skins. Els desenvolupadors poden integrar nous estils a la UI.

Més informació a http://www.primefaces.org/.  
Guia d'usuari a http://www.primefaces.org/docs/guide/primefaces_user_guide_5_0.pdf  
Exemples i llistat de components suportats a http://www.primefaces.org/showcase/

### Facelets

JavaServer Facelets és un framework per a plantilles (templates) centrat en la tecnologia JSF (JavaServer Faces). Les característiques més remarcables d'aquest framework son:

* Facilitat en la creació del templating per als components i pàgines.
* Habilitat de separar els UIComponents en diferents arxius.
* Suport complet de EL (Expression Language).
* Validació de EL en temps de construcció.
* No és necesaria cap configuració XML.

Més informació a https://facelets.java.net/

## Avantatges de JSF sobre Struts

Els principals avantatges de JSF sobre Struts son:

* Components personalitzats: JSF permet combinar fàcilment GUIs complexes en un component mentre que Struts no.
* Millor suport per a Ajax: Una gran part de llibreries de components donen suport a Ajax. Struts no te realment aquestes llibreries de components.
* Dona suport per altres tecnologíes de visualització: JSF no está limitat a HTML i HTTP, mentre que Struts sí.
* Accés a beans per nom: JSF permet assignar noms a beans i posteriorment accedir directament a ells des d'un formulari. Struts disposa d'un proces complex per a accedir-hi.
* El llenguatge de expresió (EL) és més concis i potent a JSF.
* Controladors i definicions de beans més simples: JSF no exigeix que el teu controlador i les classes bean siguin exteses a alguna clase pare en particular (per exemple, Action) o facin servir algún mètode en particular (per exemple, execute).
* Arxius de configuració més simples.
* Eines més potents: JSF dispossa d'eines que faciliten al desenvolupador la construcció d'interficies visuals mitjançant eines de "drag-and-drop".

## Descripció Detallada

### Arquitectura i Components

#### Cicle de vida

El cicle de vida d'una aplicació JSF descriu totes les accions portades a terme desde que el client inicialitza una sessió. La majoria de les fases d'una aplicació JSF son gestionades pel framework JSF, deixant només una petita part com a responsabilitat del desenvolupador. Les fases que compossen el cicle de vida son sis (caixes de color verd) i es poden observar en la següent imatge:

![Fases de vida framework JSF](/related/canigo/documentacio/modul-jsf/JsfIntro-lifecycle.gif "Fases de vida framework JSF")
<br><br>

#### Restauració de la vista

Una vista en JSF representa un arbre de componentes IU. Cadascuna de les peticions al servidor te el seu contexto JSF on s'emagatzema un graf de la vista actual de la sesió. La responsabilidad primaria d'aquesta fase es identificar la vista actual des del contexte JSF, en cas de no existir, es creara una vista nova. Si el graf de la vista existeix, es restaura i es mostra al usuari. Aquest procés és automàtic i no és responsabilitat del desenvolupador.

#### Assignar els valors de la petició

Després de restaurar la vista, els valos ingresats pel client de l'aplicació es mapejen als components UI corresponents. Per exemple, en una interficie que conté un formulari, cada cop que es realitza un enviament d'informació al servidor, JSF iterarà sobre l'arbre de components, agafarà cadascun dels seus valos i els assignarà al component corresponent. Aquest procés és automàtic i no és responsabilitat del desenvolupador.

#### Validació de les dades d'usuari

JSF iterarà sobre tots els nodes de l'arbre de components UI cridant tant al validador per defecte (si existeix) com als validadors personificables segons la configuració pròpia de cada component. Aquest procés és automàtic però és responsabilitat del desenvolupador configurar els validadors en cadascun dels components.

#### Actualitzar objectes del model

Durant aquesta fase, els valors dels components mapejats i validats es situen en els Java Beans corresponents. Aquest procés és automàtic però es responsabilitat del desenvolupador indicar el mapeig del component amb l'atribut del Java Bean.

#### Executar la lògica de l'aplicació

Mitjançant el mecanisme de mapeig d'events s'executen les funcions definides en els Java Bean per portar a terme les operacions o lògica de negoci pròpia de l'aplicació. És responsabilitat del programador tant el mapeig d'events com la lògica pròpia de l'aplicació.

#### Renderització de la resposta

D'acord amb el mecanisme de mapeig de navegació, en funció dels resultats obtinguts durant la fase anterior, es selecciona o renderitza la vista apropiada a mostrar a l'usuari. És responsabilitat del desenvolupador gestionar la lògica de navegació de l'aplicació.

### Instal- lació i configuració

#### Configuració bàsica

#### Paràmetres de context

Fitxer de configuració: web.xml

Ubicació proposada: <PROJECT_ROOT>/src/main/webapp/WEB-INF/web.xml

En aquest apartat definirem els següents paràmetres:

* **contextConfigLocation:** indica la localització dels beans que posteriorment Spring carregarà al context de l'aplicació. La configuració per defecte proporcionada per l'eina carrega de manera automàtica tots els XMLs aplicatius que es troben en config/spring.
* **javax.faces.application.CONFIG_FILES:** Indica la localització de l'arxiu de faces-config.xml de JSF.
* **javax.faces.DEFAULT_SUFFIX:** Extensió per defecte si l'aplicació web está fent servir url extension mapping.
* **primefaces.THEME:** Nom del skin utilitzat per l'aplicació. Pot ser un literal o bé una expressió EL (#{beanName.property}).
* **facelets.DEVELOPMENT:** Indica que estem en un entorn de desenvolupament, i davant error en la aplicació es mostrarà una pàgina detallada amb la informació del mateix, així com l'arbre de components jsf que tenim en memòria.

#### Listeners

Fitxer de configuració: web.xml

Ubicació proposada: <PROJECT_ROOT>/src/main/webapp/WEB-INF/web.xml

En aquest apartat definirem els següents listeners:

```
com.sun.faces.config.ConfigureListener: Encarregat de configurar el runtime de JavaServer Faces.
org.springframework.web.context.ContextLoaderListener: Listener encarregat de carregar els arxius de context (contextConfigLocation). Spring crea un objecte del tipus WebApplicationContext a partir de les definicions dels beans del arxius carregats i l'injecta al ServletContext.
org.springframework.web.context.request.RequestContextListener: Listener que exposa la request al thread actual. Es pot accedir a la request amb les classes LocaleContextHolder i RequestContextHolder.
```

#### Filtres

Fitxer de configuració: web.xml

Ubicació proposada: <PROJECT_ROOT>/src/main/webapp/WEB-INF/web.xml

En aquest apartat definirem els següents filtres:

    cat.gencat.ctti.canigo.arch.web.core.filters.LoggingFilter: Filtre que inicialitza les traces de l'aplicació. Es pot sobrecarregar aquest filtre per afegir dades aplicatives al pattern de log4j.
    cat.gencat.ctti.canigo.arch.web.jsf.filter.ErrorHandlerFilter: Filtre que s'encarrega de gestionar les peticions errònies no controlades, redirigitn-les a una plana genèrica d'error.
    cat.gencat.ctti.canigo.arch.web.core.filters.LocalizationFilter: Filtre que proporciona a l'aplicació el suport d'internacionalització a l'aplicació.
    cat.gencat.ctti.canigo.arch.web.core.filters.urlrewrite.UrlRewriteFilter: Java Web Filter que permet reescriure les URLs per convertirles en amigables. Més informació a http://www.tuckey.org/urlrewrite/.

#### Servlets

Fitxer de configuració: web.xml

Ubicació proposada: <PROJECT_ROOT>/src/main/webapp/WEB-INF/web.xml

En aquest apartat definirem els següents servlets:

* javax.faces.webapp.FacesServlet: Representa el motor o engine de les aplicacions JSF.

#### Separació contingut estàtic i dinàmic (RichFaces 4.x)

Per tal de poder separar el contingut estàtic i dinàmic en aplicacions Canigó 3 amb JSF 2 + Primefaces 5 cal fer les següents configuracions:

1) Al fitxer faces-config.xml afegir la següent entrada:

```
<view-handler>cat.gencat.ctti.canigo.arch.web.jsf.view.CanigoViewHandler</view-handler>
```

2) I afegir al fitxer web.xml el següent codi:

```
<context-param>
  <param-name>cat.gencat.ctti.canigo.arch.web.jsf.JSF_RESOURCE_PREFIX</param-name>
  <param-value>/AppJava</param-value>
</context-param>
<context-param>
  <param-name>cat.gencat.ctti.canigo.arch.web.jsf.JSF_RESOURCE_PREFIX_MAPPINGS</param-name>
  <param-value>rfRes;javax.faces.resource</param-value>
</context-param>
```

El valor del paràmetre JSF_RESOURCE_PREFIX és el que es concatena abans de les URLs que continguin el valor del paràmetre definit a JSF_RESOURCE_PREFIX_MAPPINGS. En aquest segons paràmetre es poden definir tots els paths que es vulgui separats per ;

## Estils Canigó (Primefaces 5.0)

### Introducció

Per tal de poder adaptar la nova capa de presentació basada en la tecnologia JSF als estils de Canigó s'han de tindre en compte els següents aspectes:

* Els components de primefaces utilitzats en les nostres JSF's determinen la seva aparença en skins de primefaces, aquests skins són un conjunt de classes definides en uns css.
* Cada component de primefaces té definides una sèrie de classes per defecte. Són aquestes classes les que s'hauran de modificar per tal d'adaptar l'estil d'una JSF al desitjat.

### Components

En aquesta secció es presentarà cada component per separat amb una captura de pantalla, el codi jsf necessari per implementar-lo i l'estil aplicat

#### Menús

##### Exemple Component

![Fases de vida framework JSF](/related/canigo/documentacio/modul-jsf/menu_rf_4x.jpg)

##### Codi Jsf

```
<ui:composition>
      <h:form>
	      <p:dataList value="#{menuBean.menu.defaultOpt}" id="llistaMenu" var="menu" type="unordered" emptyMessage="" >
	            <h:link rendered="#{menu.link != null}" value="#{msg[menu.value]}" outcome="#{menu.link}" />
                    <p:commandLink rendered="#{menu.link == null}" value="#{msg[menu.value]}"></p:commandLink>
			  
	            <p:dataList value="#{menu.submenu}" id="llistaSubmenu" var="submenu" type="unordered" emptyMessage="">
	                  <h:link rendered="#{submenu.link != null}" value="#{msg[submenu.value]}" outcome="#{submenu.link}" />
	                  <p:commandLink rendered="#{submenu.link == null}" value="#{msg[submenu.value]}"></p:commandLink>
			    
	                   <p:dataList value="#{submenu.submenu}" id="llistaSubSubmenu" var="subsubmenu" type="unordered" emptyMessage="">
	                           <h:link rendered="#{subsubmenu.link != null}" value="#{msg[subsubmenu.value]}" outcome="#{subsubmenu.link}" />
	                           <p:commandLink rendered="#{subsubmenu.link == null}" value="#{msg[subsubmenu.value]}"></p:commandLink>
	                   </p:dataList>
	            </p:dataList>
	      </p:dataList>
      </h:form>    
</ui:composition>
```

##### Codi xml

Definir el menú en /src/main/resources/spring/app-custom-menu.xml

```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:context="http://www.springframework.org/schema/context"
	xmlns:aop="http://www.springframework.org/schema/aop"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
	xmlns:p="http://www.springframework.org/schema/p"
	xmlns:util="http://www.springframework.org/schema/util"
	xsi:schemaLocation="http://www.springframework.org/schema/beans 
            http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
            http://www.springframework.org/schema/aop 
			http://www.springframework.org/schema/aop/spring-aop-3.0.xsd
			http://www.springframework.org/schema/context 
			http://www.springframework.org/schema/context/spring-context-3.0.xsd
			http://www.springframework.org/schema/util 
			http://www.springframework.org/schema/util/spring-util-3.0.xsd">
	
	<bean lazy-init="true" id="menuBean" class="cat.gencat.ctti.canigo.arch.web.jsf.MenuBean">
		<property name="menu">
			<map>
				<entry key="defaultOpt">
				<list>
					<map>
						<entry key="value" value="menuApartat1"></entry>
						<entry key="submenu">
							<list>
								<map>
									<entry key="value" value="menuSubapartat1"></entry>
								</map>
								<map>
									<entry key="value" value="menuSubapartat2"></entry>
									<entry key="submenu">
										<list>
											<map>
												<entry key="value" value="menuSubsubapartat1"></entry>
											</map>
											<map>
												<entry key="value" value="menuSubsubapartat2"></entry>
											</map>
										</list>
									</entry>
								</map>
								<map>
									<entry key="value" value="menuSubapartat3"></entry>
								</map>
								<map>
									<entry key="value" value="menuSubapartat4"></entry>
								</map>
							</list>
						</entry>
					</map>
				</list>
				</entry>
			</map>
		</property>
	</bean>
</beans>
```

#### Taules

##### Exemple Component

##### Codi Jsf

```
<ui:define name="body">
	<p:dataTable id="taulaPropietats" 
		cellpadding="0" cellspacing="0" width="700" border="0" var="key"
		value="#{propertyService.itemKeys}" styleClass="taula">
	
		<p:column>
			<f:facet name="header">#{msg.propertyExposeKey}</f:facet>
			<h:outputText value="${key}" />
		</p:column>
	
		<p:column>
			<f:facet name="header">#{msg.propertyExposeValue}</f:facet>
			<h:outputText value="#{propertyService.values[key]}" />
		</p:column>
	
	</p:dataTable>
</ui:define>
```
