+++
date        = "2024-01-15"

title       = "Proves"
description = "Proves unit�ries"
sections    = "Canig�. Documentaci� Versi� 3.8"
weight      = 4
+++

## Prop�sit

Les proves son una part fonamental en el desenvolupament d'aplicacions, en aquest apartat es focalitza en com realitzar proves unit�ries dels diferents m�duls de l'aplicaci� mitjan�ant Spring Test.

A l'utilitzar injecci� de depend�ncia, aix� fa que el codi sigui menys dependent del que ho seria en un desenvolupament java tradicional i per tant realitzar proves unit�ries de diferents parts de m�duls sense tenir el conjunt complert hauria de ser m�s senzill.

## Documents i Fonts de Refer�ncia

Refer�ncia | URL
---------- | ---
Spring Test | https://docs.spring.io/spring-framework/docs/6.0.0/reference/html/testing.html#testing

## Glossari

**@ExtendWith** - Anotaci� a nivell de classe per indicar amb que s'executar� la classe de test.

**@ContextConfiguration** - Anotaci� a nivell de classe per a carregar el context d'Spring.

**@BeforeEach** - Anotaci� a nivell de m�tode per indicar quin �s el m�tode d'inicialitzaci� de la classe de test.

**@Test** - Anotaci� a nivell de m�tode per indicar que el m�tode �s de test.

**@Autowired** - Anotaci� a nivell de propietat o m�tode per a indicar que la propietat de la classe es carregui autom�ticament amb el bean del context d'spring.

**@Qualifier** - Anotaci� a nivell de propietat o m�tode que s'utilitza quan s'ha indicat un **@Autowired** i al context d'spring existeixen m�s d'un bean del mateix tipus del que s'ha de realitzar l'autowired, aleshores d'indica el **@Qualifier** per indicar a Spring el nom del bean que ha de setejar.

## Instal.laci�

Utilitzant Canig�3 on cal realitzar cap pas addicional per a tenir instal�lat el m�dul de testing d'Spring. Ja que el framework ja incorpora la depend�ncia.

**Depend�ncia pom.xml**

A **Canig� 3.8** incorpora la depend�ncia d'Spring Test en scope test, aquesta depend�ncia la incorpora canigo-test. A Canig� 3.8 la versi� utilitzada de Junit �s la 5 **(Jupiter)**.

## Utilitzaci�

### Definici� classe de test

Per a crear una classe de test simplement s'ha de crear una classe de Java tradicional i afegir la seg�ent anotaci� @ExtendWith **(org.junit.jupiter.api.extension.ExtendWith)** per a que spring detecti que �s una classe de test.

```
import org.springframework.test.context.junit.jupiter.SpringExtension;

...

@ExtendWith(SpringExtension.class)
```

### C�rrega del context de l'aplicaci�

Per a carregar el context de l'aplicaci� s'utilitzar� l'anotaci� @ContextConfiguration (org.springframework.test.context.ContextConfiguration) a nivell de classe.

Es pot carregar el context de canigo-core que carregar� tot el framework:

```
@ContextConfiguration(locations = {"../../../core/config/canigo-core.xml"})
```


al carregar el context de canig� ser� necessari indicar els fitxers xml app-custom-***.xml dintre del directori spring i els fitxers de propietats d'aquest fitxer xml dintre del directori config, tal i com es te a l'aplicaci�.

o be nom�s carregar els beans que es troben en certs fitxers xml:

```
@ContextConfiguration(locations = {"config/canigo-support-mailing.xml", "config/app-support-mailing.xml"})
```

### M�todes de setUp

Per indicar el m�tode de setUp del test cal fer-ho mitjan�ant l'anotaci� @Before (org.junit.Before) a nivell de m�tode.

En aquest m�tode es realitzaran les inicialitzacions necess�ries per a poder executar els m�todes de test de la classe.

```java
@Autowired
@Qualifier("accountDAO")
AccountDAO<Account, Integer> dao = null;

...
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;
@Before
public void settingUp(){
	assertNotNull(dao);
	assertEquals(Account.class, dao.getPersistentClass());
}
```

### M�todes de test

Per indicar que un m�tode �s de test cal fer-ho mitjan�ant l'anotaci� @Test (org.junit.Test) a nivell de m�tode.

```java
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;
@Test
public void testFinder(){		
	assertNull(dao.get(1));
	Account account = new Account();
	account.setName("test1");
	dao.save(account);
	
	assertNotNull(dao.get(account.getId()));
	
	Account account2 = new Account();
	account2.setName("test2");
	dao.save(account2);
	
	List<Account> accounts = dao.findAll();
	assertEquals(5, accounts.size());
}
```
