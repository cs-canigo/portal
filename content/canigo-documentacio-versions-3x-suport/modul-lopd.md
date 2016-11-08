+++
date        = "2015-04-02T11:29:07+02:00"
title       = "LOPD"
description = "Aplicació de protecció de dades."
sections    = "Canigó. Documentació versió 3.x"
weight      = 3
+++

## Propòsit

El servei de LOPD de Canigó permet assignar un determinat nivell de protecció a les dades de l'aplicació que l'utilitzi.

## Context i Escenaris d'Ús

El servei de LOPD es troba dins dels serveis generals de Canigó.  
El seu ús és necessari en cas de voler protegir dades sensibles de l'aplicació o d'enregistrar el seu accés.

## A qui va dirigit

Aquest document va dirigit als següents perfils:

* Programador. Per conèixer l'ús del servei.
* Arquitecte. Per conèixer quins són els components i la configuració del servei.

## Glossari

**LOPD:** Llei Orgànica de Protecció de Dades

## Descripció Detallada

###  Arquitectura i Components

#### Introducció

El servei LOPD ofereix suport a les aplicacions basades en Canigó per facilitar el compliment de la LOPD. Donat que l'aplicació dels mecanismes de seguretat afecta únicament a les dades emmagatzemades en la base de dades s'ha definit un sistema d'anotacions per tal de "marcar" les dades sensibles en els TO's (Transfer Object).

#### Instal-lació

Disposar del mòdul LOPD és pot fer mitjançant dos camins:

1.- Utilitzar l'eina de l'entorn de treball de Canigó (plugin per l'eclipse). On es podrà seleccionar el servei dintre del grup "suport".

NOTA: L'eina afegeix automàticament un arxiu anomenat lopd.properties situat en src\main\resources\config\props\ que conté la llavor utilitzada per fer el xifrat/desxifrat de les dades. En la versió 1.0.0 del servei aquest paràmetre no s'està utilitzant així que no es necessari configurar-lo.

2.- Afegir de forma manual les dependències del servei.

Modificar el pom.xml afegint:

```
<properties>
	<canigo.support.lopd>[1.3.0,1.4.0)</canigo.support.lopd>
</properties>

<dependency>
      <groupId>cat.gencat.ctti</groupId>
      <artifactId>canigo.support.lopd</artifactId>
      <version>${canigo.support.lopd}</version>
</dependency>
```

#### Components del Servei

El servei defineix tres nivells de seguretat diferents i dos tipus d'operacions amb les dades. L'aplicació dels nivells de seguretat està bassada en l'ús d'una anotació especial de seguretat anomenada LOPDSecure.

**Nivells de seguretat**

Els nivells de seguretat creats inicialment són els següents:

* LOW: Nivell de seguretat baix. Enregistrament de la dada.
* MED: Nivell de seguretat mitjà. Enregistrament de la dada.
* HIGH: Nivell de seguretat alt. Enregistrament i xifrat/desxifrat de la dada.

**Operacions amb dades**

S'han definit dos tipus d'operacions possibles aplicables en funció del nivell de seguretat.

* Enregistrament de les dades: Operació que registra l'accés d'una dada per part d'un usuari.
* Xifrat/desxifrat de les dades: Operació que xifra o desxifra una dada accedida per un usuari.

### Ús del servei

#### Configuració del servei

A spring s'ha de configurar el servei per a indiciar la classe que realitza l'enregistrament de les dades i el xifrat/desxifrat de les dades.

```
<bean id="aspectLOPD" class="cat.gencat.ctti.canigo.arch.support.lopd.annotation.impl.AspectLOPD">
    <property name="levels" ref="levelsBean"/>
</bean>

    <!-- Actions -->
<bean id="traceOperation" class="cat.gencat.ctti.canigo.arch.support.lopd.operations.trace.impl.TraceImpl">
</bean>

 <bean id="cipherOperation" class="cat.gencat.ctti.canigo.arch.support.lopd.operations.cipher.impl.BouncyCastleAESCipherImpl">
    <property name="key" value="${lopd.secretkey}"/>
    <!--Optional -->
    <property name="charset" value="UTF-8"/>
</bean>

<!-- Levels -->
<bean id="lowLevel" class="cat.gencat.ctti.canigo.arch.support.lopd.levels.Low">
    <property name="trace" ref="traceOperation"/>
</bean>
<bean id="medLevel" class="cat.gencat.ctti.canigo.arch.support.lopd.levels.Med">
    <property name="trace" ref="traceOperation"/>
</bean>
<bean id="highLevel" class="cat.gencat.ctti.canigo.arch.support.lopd.levels.High">
    <property name="trace" ref="traceOperation"/>
    <property name="cipher" ref="cipherOperation"/>
</bean>

<!-- Defined Levels to be used -->
<bean id="levelsBean" class="cat.gencat.ctti.canigo.arch.support.lopd.levels.Levels">
    <property name="low" ref="lowLevel"/>
    <property name="med" ref="medLevel"/>
    <property name="high" ref="highLevel"/>
</bean>
```

#### Anotacions

Com s'ha indicat en punts anteriors l'aplicació de la seguretat es fa amb una anotació. Aquesta Anotació està dissenyada per posar-se en els mètodes setter i getter dels TO's (Transfer Objects) responsables de la transferència de les dades entre la base de dades i els objectes de negoci de l'aplicació.

Un exemple de com utilitzar la nova anotació seria el següent:

```java
package cat.gencat.prova.bean.model;

import static javax.persistence.GenerationType.IDENTITY;
import java.util.Date;
import javax.persistence.*;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
*import cat.gencat.ctti.canigo.arch.support.lopd.annotation.LOPDSecure;*

/**
 * TbUsuaris generated by hbm2java
 */
@Entity
@Table(name = "TB_USUARIS", schema = "PUBLIC")
@NamedQueries({
	@NamedQuery(
			name="findUsuarisNomCognom", 
			query="FROM TbUsuaris u WHERE u.nom like :nomUsuari AND u.cognoms like :cognomsUsuari"),
	@NamedQuery(
			name="findUsuarisNom", 
			query="FROM TbUsuaris u WHERE u.nom like :nomUsuari"),
	@NamedQuery(
			name="findUsuarisCognom", 
			query="FROM TbUsuaris u WHERE u.cognoms like :cognomsUsuari")
})

public class TbUsuaris implements java.io.Serializable {

	private static final long serialVersionUID = -3588947496944606464L;
	private Integer idUsuari;
	private String nom;
	private String cognoms;
	private String nif;

	public TbUsuaris() {
	}

	public TbUsuaris(String nom) {
		this.nom = nom;
	}

	public TbUsuaris(String nom, String cognoms, String nif) {
		this.nom = nom;
		this.cognoms = cognoms;
		this.nif = nif;
	}

	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "ID_USUARI", unique = true, nullable = false)
	public Integer getIdUsuari() {
		System.out.println("getIdUsuari");
		return this.idUsuari;
	}

	public void setIdUsuari(Integer idUsuari) {
		System.out.println("setIdUsuari");
		this.idUsuari = idUsuari;
	}

	@LOPDSecure(level = "LOW")//<--Nova Anotació de seguretat
	@Column(name = "NOM", nullable = false)
	public String getNom() {
		System.out.println("getNom");
		return this.nom;
	}

	@LOPDSecure(level = "LOW")//<--Nova Anotació de seguretat
	public void setNom(String nom) {
		System.out.println("setNom");
		this.nom = nom;
	}

	@LOPDSecure(level = "MED")//<--Nova Anotació de seguretat
	@Column(name = "COGNOMS")
	public String getCognoms() {
		System.out.println("getCognoms");
		return this.cognoms;
	}

	@LOPDSecure(level = "MED")//<--Nova Anotació de seguretat
	public void setCognoms(String cognoms) {
		System.out.println("setCognoms");
		this.cognoms = cognoms;
	}

	@LOPDSecure(level = "HIGH")//<--Nova Anotació de seguretat
	@Column(name = "NIF")
	public String getNif() {
		System.out.println("getNif");
		return this.nif;
	}

	@LOPDSecure(level = "HIGH")//<--Nova Anotació de seguretat
	public void setNif(String nif) {
		System.out.println("setNif");
		this.nif = nif;
	}
}
```

Com es pot apreciar l'anotació

```
@LOPDSecure(value = [NIVELL_SEGURETAT])
```

està informada davant de cada setter i getter on es vol que s'apliqui la seguretat. L'anotació pot posar-se davant d'un getter o davant d'un setter per separat, donant així la possibilitat d'aplicar la seguretat només a un determinat tipus d'accés a la dada.
S'ha de tindre en compte que, en el cas especial de la política de seguretat HIGH, l'anotació ha d'anar en el setter i el getter de la dada en qüestió obligatòriament. Si no es fes així, la dada es xifraria i mai es podria recuperar el seu valor original o bé s'interpretaria com a xifrada quan no ho fos i s'intentaria desxifrar, provocant l'alteració del valor mostrat.

Un altre aspecte important, també en relació a la política HIGH, és que el tipus de la dada que ha de figurar en la base de dades sempre ha de ser format text. Això és així per que el procés de xifrat transforma la dada (del tipus que sigui) en un array de bytes, perdent qualsevol informació del tipus original. S'haurà de tindre especial atenció en el xifrat de dades del tipus numèric o data, per aquest motiu.

**Consulta de les dades**

Una vegada aplicades les anotacions sempre que s'accedeixi a una dada on el seu getter o setter hagi sigut anotat es podrà consultar en el log de l'aplicació una traça com la següent:

```
[LOPD access entry][Property: Nif][of Class: cat.gencat.prova.bean.model.TbUsuaris][accessed by user: cscanigo][at: 30/11/2011 10:23:12]
```

De cara al xifrat de les dades, totes les que hagin sigut anotades amb nivell de seguretat HIGH, apareixeran xifrades en base de dades.