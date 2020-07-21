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
	<canigo.support.lopd>[1.4.0,1.5.0)</canigo.support.lopd>
</properties>

<dependency>
      <groupId>cat.gencat.ctti</groupId>
      <artifactId>canigo.support.lopd</artifactId>
      <version>${canigo.support.lopd}</version>
</dependency>

...

<build>
...
	 <plugin>
		<groupId>org.codehaus.mojo</groupId>
		<artifactId>aspectj-maven-plugin</artifactId>
		<version>1.10</version>
		<configuration>
			<complianceLevel>1.7</complianceLevel>
			<source>1.7</source>
			<target>1.7</target>
			 <weaveDependencies>
			<weaveDependency>
				  <groupId>cat.gencat.ctti</groupId>
				  <artifactId>canigo.support.lopd</artifactId>
			</weaveDependency>
		  </weaveDependencies>
		</configuration>
		<executions>
			<execution>
				<goals>
					<goal>compile</goal>
				</goals>
				<configuration>
					<complianceLevel>1.7</complianceLevel>
					<source>1.7</source>
					<target>1.7</target>
				</configuration>
			</execution>
		</executions>
	</plugin>
...
</build>

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
<bean id="levels" class="cat.gencat.ctti.canigo.arch.support.lopd.levels.Levels">
    <property name="low" ref="lowLevel"/>
    <property name="med" ref="medLevel"/>
    <property name="high" ref="highLevel"/>
</bean>
```

Al fitxer Application.Java s'ha d'afegir el Bean del AspectLOPD

	@Bean
    public AspectLOPD aspectLOPD() {
    	 return Aspects.aspectOf(AspectLOPD.class);
    }
	
#### Anotacions

Com s'ha indicat en punts anteriors l'aplicació de la seguretat es fa amb una anotació. Aquesta Anotació està dissenyada per posar-se en els mètodes setter i getter de les Entitats responsables de la transferència de les dades entre la base de dades i els objectes de negoci de l'aplicació.

Un exemple de com utilitzar la nova anotació seria el següent:

```java
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import cat.gencat.ctti.canigo.arch.support.lopd.annotation.LOPDSecure;



@Entity
@Table(name = "equipaments")
public class Equipament {
	
	public static final String ID = "id";
	public static final String NOM = "nom";
	public static final String MUNICIPI = "municipi";

	private Long id;
	
	private String nom;
	
	private String municipi;
	
	public Equipament() {
		
	}
	
	public Equipament(Long id) {
		this.id =id;
	}
	
	@Id
	@GeneratedValue(generator = "generator")
	@GenericGenerator(name = "generator", strategy = "increment")
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	
	@Column(name = "nom", nullable = false, unique = true)
	 @LOPDSecure(level = "LOW")//<--Nova Anotació de seguretat
	public String getNom() {
		return nom;
	}

	 @LOPDSecure(level = "LOW")//<--Nova Anotació de seguretat
	public void setNom(String nom) {
		this.nom = nom;
	}

	 @LOPDSecure(level = "HIGH")//<--Nova Anotació de seguretat
	@Column(name = "municipi")
	public String getMunicipi() {
		return municipi;
	}

	 @LOPDSecure(level = "HIGH")//<--Nova Anotació de seguretat
	public void setMunicipi(String municipi) {
		this.municipi = municipi;
	}	
	
	@Override
	public String toString() {
		return "Equipament [nom=" + nom + "]";
	}
	
	public void addCustomer() {
		System.out.println("addCustomer() is running ");
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
canigo Message: 17 05 2018 16:17:48,403 DEBUG [http-nio-8080-exec-1] DEBUG [http-nio-8080-exec-1] cat.gencat.ctti.canigo.arch.support.lopd.annotation.impl.AspectLOPD - [AspectLOPD][level][valor = HIGH]
canigo Message: 17 05 2018 16:17:58,043 INFO  [http-nio-8080-exec-1] INFO  [http-nio-8080-exec-1] cat.gencat.ctti.canigo.arch.support.lopd.operations.trace.impl.TraceImpl - [LOPD access entry][Property: Municipi][of Class: cat.gencat.can2303.model.Equipament][accessed by user: admin][at: 17/05/2018 04:17:54]

```

De cara al xifrat de les dades, totes les que hagin sigut anotades amb nivell de seguretat HIGH, apareixeran xifrades en base de dades.