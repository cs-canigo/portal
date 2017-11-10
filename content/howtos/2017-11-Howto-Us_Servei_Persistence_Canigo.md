+++
date = "2017-11-10"
title = "Ús del Servei de Persistencia en Canigó 3.2"
description = "Ús del Servei de Persistencia en Canigó 3.2"
section = "howtos"
categories = ["canigo"]
key = "NOVEMBRE2017"
+++

### A qui va dirigit

Aquest how-to va dirigit a tots aquells desenvolupadors/arquitectes que desenvolupin una aplicació Canigó 3.2.

### Versió de Canigó

Els passos descrits en aquest document apliquen a la versió 3.2.x del Framework Canigó.

### Introducció

En aquest HowTo s'explica l'estructura del servei de persistència i com definir consultes utilitzant Spring Data y Query DSL.

Per a fer-ho es desplega l'aplicació demo que genera el plugin de Canigó que per defecte ja incorpora el servei de persistència.

### Estructura del Servei

El servei de persistència ofereix la classe GenericRepository que hereta de la classe de SpringData JpaRepository.

Aquest repository proporciona els mètodes bàsics per a la gestió d'una entitat:

	S save(S entity);
	Optional findById(ID primaryKey);
	Iterable findAll();
	long count();
	void delete(T entity);
	boolean existsById(ID primaryKey);
	...

També proporciona mètodes per a realitzar la paginació i l'ordenació:

	Iterable findAll(Sort sort);
	Page findAll(Pageable pageable);

El servei de persistència així mateix ofereix dos mètodes més:

	Page findAll(FactoryExpression factoryExpression, Predicate predicate, Pageable pageable);
	List bulkSave(Iterable entities);

El mètode **findAll** que es proporciona retorna tots els elements de l'entitat cercada, però mostrant el valor només dels camps desitjats.

El mètode **bulkSave** proporciona un mètode per a [realitzar inserts i updates de forma massiva.](/howtos/2017-04-Batch-inserts-updates-canigo32/)

Per a utilitzar aquest Repository l'aplicació demo de Canigó proporciona la següent estructura per a l'entitat Equipament. És l'estructura que es recomana utilitzar per a les entitats pròpies de cada aplicació.

#### EquipamentRepositoryCustom

Aquesta interfície és on definirem mètodes específics per a la nostra entitat que tinguem la necessitat d'implementar.

#### EquipamentRepositoryImpl

Classe que implementa els mètodes que hem declarat a EquipamentRepositoryCustom

#### EquipamentRepository

Interfície que hereta de GenericRepository (proporcionat pel servei de Persistència) i del nostre EquipamentRepositoryCustom. És l'objecte a què accedirà el nostre Servei (EquipamentService en aquest cas) per a realitzar les operacions desitjades.

### Spring Data

A banda de les operacions genèriques (count, delete, find, get) Spring Data proporciona la possibilitat de construir quèries de forma automàtica utilitzant el prefix **By** seguit del camp desitjat.

Aquestes quèries s'ha de definir com a mètode a la classe EquipamentRepository, ja que no hem de realitzar cap implementació a la nostra aplicació.

Per exemple:

	public interface EquipamentRepository extends GenericRepository<Equipament, Long>, EquipamentRepositoryCustom {

		List findByNom(String nom);
		long countByMunicipi(String municipi);
		long deleteByMunicipi(String municipi);
	}

	findByNom retorna la llista d'equipaments que tinguin el nom proporcionat.
	countByMunicipi retorna el nombre d'equipaments amb el municipi proporcionat.
	deleteByMunicipi retorna el nombre d'equipaments eliminats amb el municipi proporcionat.

Spring Data també permet la utilització d'expressions com DISTINCT, permet la concatenació de camps al criteri de la query amb AND i OR , la ordenació dels resultats amb ASC o DESC i més funcionalitats.

Per a més informació de la creació de quèries es pot consultar la documentació de [Spring Data] (https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#repositories.query-methods.query-creation)

### Query DSL

El servei de persistència ofereix la integració de Query DSL amb Spring Data i proporciona els mètodes:

	T findOne(Predicate predicate); -> Retorna un element que compleixi el Predicate
	Iterable findAll(Predicate predicate); -> Retorna tots els elements que compleixin el Predicate
	long count(Predicate predicate); -> Retorna el nombre d'elements que compleixin el Predicate
	boolean exists(Predicate predicate); -> Retorna si hi ha algun element que compleixi el Predicate

Per a facilitar la creació del Predicate el servei de persistència ofereix la classe **GenericPredicateBuilder**.

Aquesta classe suporta els següents operadors:

Operador | Descripció
--------- | --------
> | major que
>: | major o igual que
< | menor que
<> | diferent de
: | igual que

I permet afegir paràmetres de forma individual:

	public void addParam (String key, String operation, Object value)

On key és el nom del camp, operation és l'operador i value el valor a comparar.

O de forma conjunta:

	public void populateSearchCriteria(String search)

On el valor de search ha de complir el patró **field1Operador1Valor1,field2Operador2Valor2,fieldNOperadorNValorN**

Un exemple d'aquest ús es pot trobar al mètode findPaginated d'EquipamentService a la aplicació demo de Canigó:

	public Page findPaginated(final Integer page, final Integer rpp, final String sort, final String filter) {

		final GenericPredicateBuilder builder = new GenericPredicateBuilder(Equipament.class, "equipament");

		builder.populateSearchCriteria(filter);

		final Pageable pageable = new PageRequest(page - 1, rpp, getOrdenacio(sort));

		return repository.findAll(builder.build(), pageable);
	}

No és obligatori utilitzar el GenericPredicateBuilder per a construir els predicates. El servei de persistència suporta qualsevol Predicate vàlid.

Podeu trobar més informació a la documentació de [Spring Data] (https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#core.extensions.querydsl) o de [QueryDSL] (http://www.querydsl.com/static/querydsl/latest/reference/html/)
