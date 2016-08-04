+++
date        = "2015-03-12T10:00:15+01:00"
title       = "Mòdul d'internacionalització"
description = "Mòdul d'internacionalització."
sections    = "Canigó. Documentació versió 3.x"
weight      = 5
+++

## Propòsit

El mòdul d'internacionalització té com a objectiu principal permetre el
desenvolupament d'aplicacions en el que no sigui necessària cap
reenginyeria cada vegada que s'incorpori un nou llenguatge a
l'aplicació.

En general tota aplicació internacionalitzada pot realitzar-se de dues
formes diferenciades:

1.  Mitjançant la rèplica d'un conjunt de pàgines per a cada idioma.
2.  Mitjançant un únic conjunt de pàgines que obtenen diferents literals
    de forma externa segons l'idioma.

La primera solució, fins ara utilitzada en moltes pàgines Web, implica
un cost gran de rèplica i manteniment, ja que qualsevol nou requeriment
o canvi comporta realitzar més d'un desenvolupament, un per cada idioma.

La segona solució, recomanada per Canigó permet que:

1.  Es puguin afegir llenguatges sense haver de realitzar canvis al
    codi.
2.  Els texts, imatges i missatges s'emmagatzemen de forma externa al
    codi.
3.  La informació (per exemple dates) es pot formatejar segons l'idioma
    de l'usuari

## Glossari

**i18N (Internationalization)**

i18N o Internationalization (el 18 correspon a les 18 lletres que hi ha
entre la I inicial i la n final) és el procés d'agafar una aplicació
dissenyada i reestructurar-la per a què pugui ser usada en diferents
localitats o bé definir el procés de crear-la per a ser totalment
flexible per executar-se en qualsevol localitat. Java defineix les
classes bàsiques d'ús de la internacionalització.

## Instal.lació i configuració

### Instal.lació

El mòdul de configuració s'inclou per defecte dins del core de Canigó 3.
Durant el procés de creació de l'aplicació (Struts o JSF), l'eina de
suport al desenvolupament inclourà la referència dins del pom.xml. En
cas d'una instal- lació manual afegir les següents línies al pom.xml de
l'aplicació:

~~~~ {.code-java}
<canigo.core.version>[3.1.0,3.2.0)</canigo.core.version>

<dependency>
          <groupId>cat.gencat.ctti</groupId>
          <artifactId>canigo.core</artifactId>
          <version>${canigo.core.version}</version>
</dependency>
~~~~

### Configuració

Per a configurar el mòdul d'internacionalització s'han de manipular els
següents fitxers:

1.  Definició dels fitxers de traduccions (típicament els fitxers dels
    diferents idiomes: application.properties,
    application_XX_XX.properties)
2.  Definició de la integració amb el servei de presentació (web.xml)
3.  Definició dels idiomes i literals suportats (només JSF).

No requereix configuració per a inicialitzar el mòdul per part del
desenvolupador. Els xmls de configuració del servei es troben
internalitzats dins del jar del core, i s'inicialitzarà de manera
automàtica un cop arrenqui l'aplicació.

Els arxius de configuració d'idiomes de l'aplicació han d'estar en la
següent ubicació:

<PROJECT_ROOT>/src/main/resources/config/i18n/*.properties

Automàticament el mòdul d'internacionalització carregarà tots els arxius
de configuració d'idiomes perquè posteriorment puguin ser explotats per
l'aplicació.

#### Definició dels fitxers de traducció

Ubicació:

 <PROJECT_ROOT>/src/main/resources/config/i18n/*.properties

Explicació:

Els fitxers de traducció són els fitxers que contenen els missatges en
els diferents idiomes. Es basen en l'ús de la internacionalització de
Java (i18n o Internationalization).

 Aquests fitxers s'han de construir tenint en compte que:

1.  La seva extensió ha de ser '.properties' (es denominen resource
    bundles).
2.  Per cada idioma que volguem suportar cal crear un nou fitxer. Aquest
    fitxer tindrà la següent nomenclatura:
    'nomFitxer__lg_pa._properties', on 'lg' correspon al codi del
    llenguatge i 'pa' correspon al codi del país pel qual volem definir
    els literals.
3.  El seu contingut es basa en l'ús de parells clau-valor tal i com es
    mostra a continuació:

Fitxer de multiidioma application.properties

~~~~ {.code-java}
clau_1=valor_1
clau_2=valor_2
...
~~~~

En cas de que l'idioma escollit per l'usuari no correspongui amb cap
fitxer, es pot crear un fitxer per defecte. Aquest fitxer tindrà el
format 'nomFitxer.properties'.

Exemple:

1.  'applicationResources_en.properties', per representar els literals
    en anglès
2.  'applicationResources_es.properties', per representar els literals
    en castellà
3.  'applicationResources_ca.properties', per representar els literals
    català
4.  'applicationResources.properties', per representar els literals de
    qualsevol altre idioma

Més informació dels codis de pais e idioma:

-   [Codis d'idioma
    (ISO-639)](http://ftp.ics.uci.edu/pub/ietf/http/related/iso639.txt)
-   [Codis de pais
    (ISO-3166)](http://www.chemie.fu-berlin.de/diverse/doc/ISO_3166.html)

<div class="message warning">
En cas de que per un llenguatge determinat existeixi un fitxer específic, l'obtenció del literal a partir d'una clau s'obtindrà des d'aquest fitxer. Si no es troba la clau en cap cas s'anirà al fitxer per defecte. Així doncs és important que es mantinguin actualitzats els fitxers de recursos per cada idioma de l'aplicació per evitar problemes. És important que es proporcioni un fitxer de recursos per defecte. Aquest serà el fitxer utilitzat  pel servei en cas de que el llenguatge escollit per l'usuari no correspongui a cap dels fitxers de recursos definits.
</div>

#### Definició de la integració amb el mòdul de presentació

Fitxer de configuració: web.xml

Ubicació proposada: <PROJECT_ROOT>/src/main/webapp/WEB-INF/web.xml

Per integrar el mòdul d'internacionalització amb el mòdul de presentació
s'han de definir els següents filtres a nivell d'aplicació:

##### Localization Filter

Aquest filtre s'encarrega d'exposar el mòdul d'internacionalització per
tal de que sigui accessible a tota la capa web. Comú tant aplicacions
JSF com a Struts.

Atributs:

**Atribut**  | **Requerit** | **Valor**
------------ | ------------ | ---------
filter-name  | Sí           | Nom del filtre<br>Exemple: Localization Filter
filter-class | Sí           | cat.gencat.ctti.canigo.arch.web.core.filters.LocalizationFilter

~~~~ {.code-java}
<filter>
    <filter-name>Localization Filter</filter-name>
    <filter-class>cat.gencat.ctti.canigo.arch.web.core.filters.LocalizationFilter</filter-class>
</filter>
~~~~

##### Struts Locale Filter

Aquest filtre s'encarrega de d'integrar el mòdul d'internacionalització
exposat pel filtre comú de Localization Filter per tal que des de Struts
es pugui fer ús de fitxers d'internacionalització.

Atributs:

**Atribut**  | **Requerit** | **Valor**
------------ | ------------ | ---------
filter-name  | Sí           | Nom del filtre<br>Exemple: Struts Locale Filter
filter-class | Sí           | cat.gencat.ctti.canigo.arch.web.struts.filter.StrutsLocaleFilter

~~~~ {.code-java}
<filter>
   <filter-name>Struts Locale Filter</filter-name>
   <filter-class>cat.gencat.ctti.canigo.arch.web.struts.filter.StrutsLocaleFilter</filter-class>
</filter>
~~~~

#### Definició dels idiomes i literals suportats (només JSF)

Ubicació proposada:
<PROJECT_ROOT>/src/main/webapp/WEB-INF/faces-config.xml

La configuració del locale permet definir amb quin nom s'exposaran les
propietats a les pàgines JSF, i els idiomes permesos i per defecte del
navegador en cas de que no sigui informat.

Per defecte, l'eina de suport al desenvolupament de Canigó informa
aquest valors segons les opcions seleccionades durant la creació de
l'aplicació.

~~~~ {.code-java}
<?xml version="1.0" encoding="UTF-8"?>
<faces-config version="1.2" xmlns="http://java.sun.com/xml/ns/javaee"
 xmlns:xi="http://www.w3.org/2001/XInclude" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-facesconfig_1_2.xsd">

    <application>

        .......
        <locale-config>
        <default-locale>ca_ES</default-locale>
        <supported-locale>es</supported-locale>
        <supported-locale>en</supported-locale>
        <supported-locale>de</supported-locale>
    </locale-config>
    <resource-bundle>
            <base-name>config.i18n.applicationResources</base-name>
            <var>msg</var>
        </resource-bundle>
        .......
        </application>
        ........
</faces-config>
~~~~

En l'exemple anterior l'idioma per defecte és Català, el locales
suportats: espanyol, anglès i alemany.
 Els recursos de l'aplicació es podran accedir des de la JSF a partir
del nom de variable **msg** i trobaran situats a:

<PROJECT_ROOT>/src/main/resources/config/i18n/applicationResources.properties

~~~~ {.code-java}
<h:outputText value="#{msg.formulari_agregarCanvisArxiusIntegrats}"/>
~~~~

#### Definició dels literals suportats (només Struts)

Ubicació proposada:
<PROJECT_ROOT>/src/main/resources/struts/struts-config.xml

Aquest arxiu engloba la configuració de Struts, dins d'aquest podem
definir els recursos que seran accessibles des de les pàgines web. Per
tal d'habilitar aquesta internacionalització s'ha d'informar el tag
message-resources.

**Atribut** | **Requerit** | **Valor**
----------- | ------------ | ---------
parameter   | Sí           | Ruta per punts on estan localitzats els literals
null        | No           | Informant aquesta propietat com a "false" mostrará els recursos no informats com a ?key? enlloc de mostrar null

~~~~ {.code-java}
<message-resources parameter="i18n.applicationResources" null="false" />
~~~~

Si es vol exposar més d'un arxiu de literals crear tants tags
message-resources com siguin necessaris.

~~~~ {.code-java}
<message-resources parameter="i18n.applicationResources" null="false" />
<message-resources parameter="i18n.anotherApplicationResources" null="false" />
<message-resources parameter="i18n.thirdApplicationResources" null="false" />
~~~~

## Utilització del mòdul

### JSF

Suposant que els recursos estan exposats a la variable **msg** i com a
literals tenim:

**applicationResources.properties**

~~~~ {.code-java}
nomFormulari=Nom del formulari
~~~~

**prova.jsf**

~~~~ {.code-java}
<h:outputText value="#{msg.nomFormulari}"/>
~~~~

Si la key del literal a mostrar conté un punt s'ha de mostrar de la
següent manera:

~~~~ {.code-java}
<h:outputText value="#{msg['nom.formulari']"/>
~~~~

I si el literal és del tipus cadena=Hola {0} {1} es poden passar
paràmetres de la següent manera:

~~~~ {.code-java}
<h:outputFormat value="#{msg['cadena']}">
   <f:param value="Ramon" />
   <f:param value="Sala" />
</h:outputFormat>
~~~~

### Struts

Suposant els següents literals:

**applicationResources.properties**

~~~~ {.code-java}
nomFormulari=Nom del formulari
~~~~

**prova.jsf**

~~~~ {.code-java}
<font face="verdana">
  <bean:message key="formulari.errorActivacio" />
</font>
~~~~

## Preguntes freqüents

### Accés manual al servei d'internacionalització

Encara que no és una pràctica comú es pot accedir al mòdul d'idiomes
desde qualsevol bean de l'aplicació gestionat per Spring. Per recuperar
aquest bean el desenvolupador pot realitzar una crida de forma externa
mitjançant el patró ['Dependency
Injection'](http://martinfowler.com/articles/injection.html)
al mòdul i les seves propietats d'entorn.

- Injecció de dependències mitjançant xml. Per exemple:

Ruta proposada: <PROJECT_ROOT>/src/main/resources/spring/exemple-beans-config.xml

~~~~ {.code-java}
<bean id="myBean"  class="cat.gencat.app.exemples.Injection">
    <property name="i18nResource" ref="messageSource" />
</bean>
~~~~

La clase Injection tindria la següent estructura:

~~~~ {.code-java}
import cat.gencat.ctti.canigo.arch.core.i18n.I18nResourceBundleMessageSource;

public class Injection {
     I18nResourceBundleMessageSource i18n;
     private static final Log LOGGER= LogFactory.getLog(Injection.class);

     public void setI18nResource(I18nResourceBundleMessageSource i18nResource){
         this.i18n = i18nResource;
     }
     
     public void executeCommand(){
        if (LOGGER.isDebugEnabled()){
            LOGGER.debug(i18n.getMessage("test.label"));
        }
     }
}
~~~~

Spring s'encarregarà d'injectar el bean d'internacionalització dins del
bean "myBean" executant el mètode setI18nResource.

-   Injecció de dependències mitjançant anotacions:

~~~~ {.code-java}
import cat.gencat.ctti.canigo.arch.core.i18n.I18nResourceBundleMessageSource;

public class Injection {
     
     private static final Log LOGGER= LogFactory.getLog(Injection.class);
     
     @Autowired
     I18nResourceBundleMessageSource i18n;
     article table {
    margin:1em 0;
}
     public void executeCommand(){
        if (LOGGER.isDebugEnabled()){
            LOGGER.debug(i18n.getMessage("test.label"));
        }
     }
}
~~~~

L'anotació @Autowired injecta en aquest cas, un bean de tipus
cat.gencat.ctti.canigo.arch.core.i18n.I18nResourceBundleMessageSource
que Spring trobarà en el context de l'aplicació.

### Claus amb punts en JSF

A diferencia de Struts l'accés a propietats amb punts a la seva clau
canvia:

Exemple de claus amb punts:

~~~~ {.code-java}
usuaris.name=Nom
usuaris.dni=DNI
usuauri.surname=Cognoms
~~~~

Per accedir aquest tipus de clau des d'una pàgina JSF es necessari
accedir de la següent manera:

**pageExemple.jsf**

~~~~ {.code-java}
<?xml version="1.0" encoding="ISO-8859-1" standalone="yes" ?>
<html xmlns="http://www.w3.org/1999/xhtml"
    xmlns:ui="http://java.sun.com/jsf/facelets"
 xmlns:f="http://java.sun.com/jsf/core"
 xmlns:h="http://java.sun.com/jsf/html"
 xmlns:c="http://java.sun.com/jstl/core"
 xmlns:t="http://myfaces.apache.org/tomahawk">
 
<ui:composition template="../layouts/template.jsf">
   <h:outputText value="\#{msg['usuaris.name']}"/>
</ui:composition>
</html>
~~~~

## Exemples

### Exemple de Test unitari

Com a exemple d'utilització es mostra com podem fer una prova unitària:

1.  Creem la classe de test 'I18nTest' i afegim un mètode 'testI18N()'
2.  Creem els diferents fitxers de literals

~~~~ {.code-java}
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"../canigo-core.xml"})
public class I18nTest{
    
    @Autowired
    I18nResourceBundleMessageSource messageResource;

    @Test
    public void testI18N() {
       try {
            Assert.assertEquals("Hola!", messageResource.getMessage("var1"));
            Assert.assertEquals("Hi!", messageResource.getMessage("var1", Locale.UK));
            Assert.assertEquals("Attaaaaaack!", messageResource.getMessage("var1", Locale.US));
        }
        catch(NoSuchMessageException ex){
            Assert.assertTrue("var1 not found", false);
        }    
    }
}
~~~~

Fitxers dels diferents idiomes (application_xx_XX.properties):

-   **application.properties (fitxer per defecte)**

    ~~~~ {.code-java}
    var1=Hola!
    ~~~~

-   **application_en_US.properties (fitxer pel 'Locale' 'US')**

    ~~~~ {.code-java}
    var1=Attaaaaaack!
    ~~~~

-   **application_en_GB.properties (fitxer pel 'Locale' 'GB')**

    ~~~~ {.code-java}
    var1=Hi!
    ~~~~