+++
date        = "2021-12-17"
title       = "Mòdul d'internacionalització"
description = "Mòdul d'internacionalització."
sections    = "Canigó. Documentació Versió 3.6"
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
Durant el procés de creació de l'aplicació, l'eina de
suport al desenvolupament inclourà la referència dins del pom.xml. En
cas d'una instal·lació manual afegir les següents línies al pom.xml de
l'aplicació:

~~~~ {.code-java}
<dependency>
          <groupId>cat.gencat.ctti</groupId>
          <artifactId>canigo.core</artifactId>
          <version>${canigo.core.version}</version>
</dependency>
~~~~

A la [Matriu de Compatibilitats 3.6] (/canigo-fwk-docs/documentacio-per-versions/3.6LTS/3.6.2/moduls/compatibilitat-per-modul/) es pot comprovar la versió del mòdul compatible amb la versió de Canigó utilitzada.

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