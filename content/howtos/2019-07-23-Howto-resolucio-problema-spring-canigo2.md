+++
date        = "2019-12-02"
title       = "Resolució problema optimització Spring a Canigó 2"
description = "Com resoldre el problema conegut d'optimització d'obtenció de Beans de Spring a Canigó 2"
section     = "howtos"
categories  = ["canigo"]
+++

### Introducció al problema

El Juliol de 2019 es va reportar un problema de rendiment a aplicacions que utilitzaven la versió 2 de Canigó, per tant, aquest how-to va dirigit a tots aquells perfils tècnics que utilitzin la versió 2 de Canigó i/o Spring anterior a la versió 3.1.2. 

El problema de rendiment s'originava si hi havia una alta utilització del component **net.gencat.ctti.canigo.services.web.taglib.util.TagUtil** de la llibreria **canigo-services-web** de Canigó 2 i més concretament, el que succeïa és que es generava un bloqueig als _threads_ del servidor d'aplicacions el qual acabava desestabilitzant el sistema. Un exemple de traça del servidor d'aplicacions amb el _thread_ bloquejat:

```

<Jul 17, 2019 12:35:42 PM CEST> <Error> <WebLogicServer> <BEA-000337> <[STUCK] ExecuteThread: '44' for queue: 'weblogic.kernel.Default (self-tuning)' has been busy for "668" seconds working on the request "Http Request Information: weblogic.servlet.internal.ServletRequestImpl@1fc30e99[GET XXX.jsp]
", which is more than the configured time (StuckThreadMaxTime) of "600" seconds in "server-failure-trigger". Stack trace:
    org.springframework.beans.factory.support.DefaultSingletonBeanRegistry.getSingleton(DefaultSingletonBeanRegistry.java:141)
    org.springframework.beans.factory.support.AbstractBeanFactory.getBean(AbstractBeanFactory.java:246)
    org.springframework.beans.factory.support.AbstractBeanFactory.getBean(AbstractBeanFactory.java:160)
    org.springframework.beans.factory.support.AbstractBeanFactory.getTypeForFactoryBean(AbstractBeanFactory.java:1145)
    org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.getTypeForFactoryBean(AbstractAutowireCapableBeanFactory.java:569)
    org.springframework.beans.factory.support.AbstractBeanFactory.isTypeMatch(AbstractBeanFactory.java:439)
    org.springframework.beans.factory.support.DefaultListableBeanFactory.getBeanNamesForType(DefaultListableBeanFactory.java:174)
    org.springframework.beans.factory.support.DefaultListableBeanFactory.getBeansOfType(DefaultListableBeanFactory.java:243)
    org.springframework.beans.factory.support.DefaultListableBeanFactory.getBeansOfType(DefaultListableBeanFactory.java:237)
    org.springframework.context.support.AbstractApplicationContext.getBeansOfType(AbstractApplicationContext.java:814)
    net.gencat.ctti.canigo.services.web.spring.util.WebApplicationContextUtils.getBeanOfType(WebApplicationContextUtils.java:45)
    net.gencat.ctti.canigo.services.web.taglib.util.TagUtil.copyConfiguration(TagUtil.java:163)
    net.gencat.ctti.canigo.services.web.struts.taglib.forms.fields.OptionsFieldTag.doEndTag(OptionsFieldTag.java:85)
    net.gencat.ctti.canigo.services.web.struts.taglib.forms.fields.helpers.SelectFieldTagHelper.generateOptions(SelectFieldTagHelper.java:174)
    net.gencat.ctti.canigo.services.web.struts.taglib.forms.fields.SelectFieldTag.doAfterValue(SelectFieldTag.java:330)
    fr.improve.struts.taglib.layout.field.SelectTag.doEndEditField(SelectTag.java:238)
    fr.improve.struts.taglib.layout.field.SelectTag.doEndEditMode(SelectTag.java:229)
    fr.improve.struts.taglib.layout.field.AbstractModeFieldTag.doEndLayoutTag(AbstractModeFieldTag.java:110)
    net.gencat.ctti.canigo.services.web.struts.taglib.forms.fields.SelectFieldTag.doEndLayoutTag(SelectFieldTag.java:352)
    fr.improve.struts.taglib.layout.LayoutTagSupport.doEndTag(LayoutTagSupport.java:47)

```

<br>

### Detall del problema

El _bug_ radica en la forma de llistar i retornar un Bean de Spring. La versió 2.0.5 de Spring que s'utilitza a Canigó 2, el te registrat a la següent _issue_:

https://github.com/spring-projects/spring-framework/issues/14083

El problema s'apuntava que la forma com Spring retornava un Bean no era òptim i era necessari incorporar una caché i per tant, aquest inconvenient va ser resolt afegint una caché a la versió 3.1.2 de Spring. Es pot consultar el detall de la resolució al següent Commit de Spring:

https://github.com/spring-projects/spring-framework/commit/4c7a1c0a5403b35dd812dae1f2a753538928bb32

<br>

### Solució al problema

Hi ha diverses formes de resoldre el problema: Optimitzar l'obtenció dels beans de Spring als components de Canigó (es mitiga el problema però no se soluciona), afegir una caché al mètode centralitzat de Canigó d'obtenció de Beans o afegir una caché a nivell de Spring. En els següents apartats es detalla cadascuna d'aquestes solucions, tot i que des de des de CS Canigó recomanem aplicar la d’afegir una caché a nivell de Spring.

<br></br>

#### Solució 1: Optimitzar l'obtenció dels beans de Spring als components de Canigó

Amb aquesta solució es mitiga el problema però no es resol, ja que únicament s'optimitza la forma en què es demanen els _beans_ a Spring des de Canigó 2, per tant, des de CS Canigó **no es recomana la utilització d'aquesta solució**.

Canigó 2, per obtenir els _beans_ de Spring, fa servir el component **net.gencat.ctti.canigo.services.web.spring.util.WebApplicationContextUtils** mètode **getBeanOfType**. Així, per exemple, per obtenir el servei per escriure a log des del component **TagUtil**, s'obté a partir de la següent crida:

```

LoggingService logService = (LoggingService) WebApplicationContextUtils.getBeanOfType(aTag.getPageContext()
                                                                                                      .getServletContext(),
                  LoggingService.class);

```

El component **TagUtil** no està correctament optimitzat i cada cop que vol escriure demana a Spring que li retorni el _bean_ *LoggingService*. Exemple:
```

      } else if (!(aTag instanceof OptionsFieldTag)) {

         LoggingService logService = (LoggingService) WebApplicationContextUtils.getBeanOfType(aTag.getPageContext()
                                                                                                   .getServletContext(),
               LoggingService.class);

         if (logService != null) {

            logService.getLog(TagUtil.class)
                      .info("No bean found in tagsConfiguration property under styleId " +
               aTag.getStyleId() + " for bean " + aTag.getClass().getName());
         }


      } else {
         LoggingService logService = (LoggingService) WebApplicationContextUtils.getBeanOfType(aTag.getPageContext()
                                                                                                   .getServletContext(),
               LoggingService.class);

         if (logService != null) {
            logService.getLog(TagUtil.class)
                      .info("Skipping options field " + aTag.getStyleId());
         }

```

Aquesta manera no òptima d'obtenir el _bean_ fa que aflueixi ràpidament el problema d'optimització del retorn de _beans_ de Spring, per a resoldre'l, es pot modificar el component de Canigó 2 reescrivint el com s'obté el _bean_ de Spring, guardant el Beans a una variable global. Així per exemple a **Tagutil** tindríem:

```

...
public class TagUtil {

	private static LoggingService logService;

...

```

I abans de la utilització del Bean LoggingService consultaríem si aquest ja ha estat carregat anteriorment o no, per tal de només demanar a Spring que ens retornés el Bean una vegada. Per exemple:

```

if (logService == null)
					logService = (LoggingService) WebApplicationContextUtils
						.getBeanOfType(aTag.getPageContext().getServletContext(), LoggingService.class);

				if (logService != null) {
					logService.getLog(TagUtil.class)
							.error("Class from JSP " + aTag.getClass().getName()
									+ " doesn't match with class in tagsConfiguration "
									+ tagConfiguration.getClass().getName() + " for styleId " + aTag.getStyleId(), ex);
				}

```

S'ha de tenir present que si es vol aplicar aquesta solució s'haurà de modificar tots els components que utilitzin **WebApplicationContextUtils** mètode **getBeansOfType**:

- Filtre de Loggin
- Filtre de Acegi
- Mode tag

<br>

#### Solució 2: Afegir una caché al mètode centralitzat de Canigó d'obtenció de Beans

A Canigó 2 la manera d'obtenció dels Beans de Spring estava centralitzat al component **WebApplicationContextUtils** mètode **getBeansOfType**, per tant, per no haver de tocar a tots els llocs on s'obté un Bean de Spring, a Canigó es pot afegir una caché a aquest component. 

Afegirem una caché dels noms dels beans de Spring de la mateixa manera com van resoldre el _bug_ de Spring. Es pot consultar aquesta solució en el següent enllaç: https://github.com/spring-projects/spring-framework/blob/4c7a1c0a5403b35dd812dae1f2a753538928bb32/spring-beans/src/main/java/org/springframework/beans/factory/support/DefaultListableBeanFactory.java

Així, podríem tenir el component **WebApplicationContextUtils** amb la caché de la següent manera:

```java

public class WebApplicationContextUtils extends org.springframework.web.context.support.WebApplicationContextUtils {

	/** Map of singleton bean names keyed by bean class */
	private static final Map<Class<?>, String[]> cache = new ConcurrentHashMap<Class<?>, String[]>();

	/**
	 * Documentaci�.
	 *
	 * @param context
	 *            Documentaci�
	 * @param clazz
	 *            Documentaci�
	 *
	 * @return Documentaci�
	 */
	public static Object getBeanOfType(ServletContext context, Class clazz) {
		WebApplicationContext webAppContext = WebApplicationContextUtils.getWebApplicationContext(context);

		if (webAppContext != null) {

			Map map = getBeansOfType(webAppContext, clazz);

			if ((map != null) && (map.size() > 0)) {
				return map.get(map.keySet().iterator().next());
			}
		}

		return null;
	}

	private static String[] getBeanNamesForType(WebApplicationContext webAppContext, Class clazz) {
		String[] resolvedBeanNames = cache.get(clazz);
		if (resolvedBeanNames != null) {
			return resolvedBeanNames;
		}
		resolvedBeanNames = webAppContext.getBeanNamesForType(clazz);
		cache.put(clazz, resolvedBeanNames);

		return resolvedBeanNames;
	}

	private static Map getBeansOfType(WebApplicationContext webAppContext, Class clazz) {
		Map result = null;

		String[] beanNames = getBeanNamesForType(webAppContext, clazz);

		if (beanNames != null) {
			result = CollectionFactory.createLinkedMapIfPossible(beanNames.length);
			for (int i = 0; i < beanNames.length; i++) {
				String beanName = beanNames[i];
				result.put(beanName, webAppContext.getBean(beanName));
			}
		}

		return result;
	}

```
<br>

#### Solució 3: Afegir una caché a nivell de Spring

Per a optimitzar l'obtenció dels Beans de Spring a nivell global, no només als components de Canigó, cal afegir una caché a nivell global. Aquesta solució és homologa a la aportada al blog:

http://jawspeak.com/2010/11/28/spring-slow-autowiring-by-type-getbeannamesfortype-fix-10x-speed-boost-3600ms-to/

La solució consta d'una implementació de **DefaultListableBeanFactory** amb caché i instanciant-la en el *WebApplicationContext*. Aquesta implementació podria ser:

```java

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.support.DefaultListableBeanFactory;

public class CachingByTypeBeanFactory extends DefaultListableBeanFactory {
    private static Logger log = Logger.getLogger(CachingByTypeBeanFactory.class);

	/** Map of singleton bean names keyed by bean class */
	private final Map<Class<?>, String[]> singletonBeanNamesByType = new ConcurrentHashMap<Class<?>, String[]>();

	/** Map of non-singleton bean names keyed by bean class */
	private final Map<Class<?>, String[]> nonSingletonBeanNamesByType = new ConcurrentHashMap<Class<?>, String[]>();

    @Override
    public String[] getBeanNamesForType(Class type) {
        return getBeanNamesForType(type, true, true);
    }

    @Override
    public String[] getBeanNamesForType(Class type, boolean includeNonSingletons, boolean allowEagerInit) {
		if (type == null || !allowEagerInit) {
			return super.getBeanNamesForType(type, includeNonSingletons, allowEagerInit);
		}

		Map<Class<?>, String[]> cache = includeNonSingletons ?
				this.nonSingletonBeanNamesByType : this.singletonBeanNamesByType;

		String[] resolvedBeanNames = cache.get(type);
		if (resolvedBeanNames != null) {
			return resolvedBeanNames;
		}

		resolvedBeanNames = super.getBeanNamesForType(type, includeNonSingletons, allowEagerInit);
		cache.put(type, resolvedBeanNames);

		return resolvedBeanNames;
    }

```

Creem una factoria que creï la nova implementació amb caché de **DefaultListableBeanFactory**:

```java

import org.springframework.beans.factory.support.DefaultListableBeanFactory;
import org.springframework.web.context.support.XmlWebApplicationContext;

public class CachingWebApplicationContext extends XmlWebApplicationContext {

    @Override
    protected DefaultListableBeanFactory createBeanFactory() {
        return new CachingByTypeBeanFactory();
    }
}

```

Registrarem aquesta factoria al web.xml

```xml
    <context-param>
	<param-name>contextClass</param-name>
	<param-value>CachingWebApplicationContext</param-value>
    </context-param>

```

<br>

### Conclusió

Si una aplicació està utilitzant Spring anterior a la versió 3.1.2 és necessari revisar-la per determinar si està afectada per aquest problema i decidir quina solució caldria aplicar. 

**La solució que es recomana des de CS Canigó és afegir una caché a nivell de Spring**.

Si necessiteu més informació, podeu obrir tiquet via [JIRA CSTD](https://cstd.ctti.gencat.cat/jiracstd/projects/CAN) o, en cas de no disposar de permisos d’accés, enviar un correu a la bústia del CS Canigó (oficina-tecnica.canigo.ctti@gencat.cat).
