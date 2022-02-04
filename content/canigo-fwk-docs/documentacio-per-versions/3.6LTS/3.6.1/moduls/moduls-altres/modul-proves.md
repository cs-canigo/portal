+++
date        = "2021-12-13"
title       = "Proves"
description = "Proves unitàries"
sections    = "Canigó. Documentació Versió 3.6"
weight      = 4
+++

## Propòsit

Les proves son una part fonamental en el desenvolupament d'aplicacions, en aquest apartat es focalitza en com realitzar proves unitàries dels diferents mòduls de l'aplicació mitjançant Spring Test.

A l'utilitzar injecció de dependència, això fa que el codi sigui menys dependent del que ho seria en un desenvolupament java tradicional i per tant realitzar proves unitàries de diferents parts de mòduls sense tenir el conjunt complert hauria de ser més senzill.

## Documents i Fonts de Referència

Referència | URL
---------- | ---
Spring Test | https://docs.spring.io/spring-framework/docs/5.3.9/reference/html/testing.html#testing

## Glossari

**@RunWith** - Anotació a nivell de classe per indicar amb que s'executarà la classe de test.
**@ContextConfiguration** - Anotació a nivell de classe per a carregar el context d'Spring.
**@Before** - Anotació a nivell de mètode per indicar quin és el mètode d'inicialització de la classe de test.
**@Test** - Anotació a nivell de mètode per indicar que el mètode és de test.
**@Autowired** - Anotació a nivell de propietat o mètode per a indicar que la propietat de la classe es carregui automàticament amb el bean del context d'spring.
**@Qualifier** - Anotació a nivell de propietat o mètode que s'utilitza quan s'ha indicat un @Autowired i al context d'spring existeixen més d'un bean del mateix tipus del que s'ha de realitzar l'autowired, aleshores d'indica el @Qualifier per indicar a Spring el nom del bean que ha de setejar.

## Instal.lació

Utilitzant Canigó3 on cal realitzar cap pas addicional per a tenir instal·lat el mòdul de testing d'Spring. Ja que el framework ja incorpora la dependència.

**Dependència pom.xml**

A Canigó 3.6 incorpora la dependència d'Spring Test en scope test, aquesta dependència la incorpora canigo-test. A Canigó 3.6 la versió utilitzada de Junit és la 4, però si és necessari es pot utilitzar Junit 5 ja que amb spring-boot-starter-test 2.5.4 utilitza Junit 5

## Utilització

### Definició classe de test

Per a crear una classe de test simplement s'ha de crear una classe de Java tradicional i afegir la següent anotació @RunWith (org.junit.runner.RunWith) per a que spring detecti que és una classe de test.

```
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

...

@RunWith(SpringJUnit4ClassRunner.class)
```

### Càrrega del context de l'aplicació

Per a carregar el context de l'aplicació s'utilitzarà l'anotació @ContextConfiguration (org.springframework.test.context.ContextConfiguration) a nivell de classe.

Es pot carregar el context de canigo-core que carregarà tot el framework:

```
@ContextConfiguration(locations = {"../../../core/config/canigo-core.xml"})
```


al carregar el context de canigó serà necessari indicar els fitxers xml app-custom-***.xml dintre del directori spring i els fitxers de propietats d'aquest fitxer xml dintre del directori config, tal i com es te a l'aplicació.

o be només carregar els beans que es troben en certs fitxers xml:

```
@ContextConfiguration(locations = {"config/canigo-support-mailing.xml", "config/app-support-mailing.xml"})
```

### Mètodes de setUp

Per indicar el mètode de setUp del test cal fer-ho mitjançant l'anotació @Before (org.junit.Before) a nivell de mètode.

En aquest mètode es realitzaran les inicialitzacions necessàries per a poder executar els mètodes de test de la classe.

```java
@Autowired
@Qualifier("accountDAO")
AccountDAO<Account, Integer> dao = null;

...

@Before
public void settingUp(){
	Assert.assertNotNull(dao);
	Assert.assertEquals(Account.class, dao.getPersistentClass());
}
```

### Mètodes de test

Per indicar que un mètode és de test cal fer-ho mitjançant l'anotació @Test (org.junit.Test) a nivell de mètode.

```java
@Test
public void testFinder(){		
	Assert.assertNull(dao.get(1));
	Account account = new Account();
	account.setName("test1");
	dao.save(account);
	
	Assert.assertNotNull(dao.get(account.getId()));
	
	Account account2 = new Account();
	account2.setName("test2");
	dao.save(account2);
	
	List<Account> accounts = dao.findAll();
	Assert.assertEquals(5, accounts.size());
}
```
