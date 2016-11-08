+++
date        = "2016-09-30"
title       = "Spring Batch a una aplicació Canigó"
description = "How To per afegir Spring Batch a una aplicació Canigó."
section     = "howtos"
categories  = ["canigo"]
key         = "OCTUBRE2016"
+++

### A qui va dirigit

Aquest how-to va dirigit a tots aquells desenvolupadors/arquitectes que vulguin afegir Spring Batch a una aplicació Canigó 3.1 Rest.

### Versió de Canigó

Els passos descrits en aquest document apliquen a la versió 3.1.x del Framework Canigó.

### Introducció

En aquest HowTo s’explica com afegir Spring Batch a una aplicació Canigó 3.1 REST. Per a fer-ho desplegarem l’aplicació demo que genera el plugin de Canigó (amb una base de dades MySql) amb un procés batch que llegeixi d'un fitxer CSV cada cert temps i inserti les dades a BBDD.
Aquest procés ho implementarem amb Spring Batch.

Per a mostrar el funcionament de Spring Batch amb diferents nodes, farem un altre exemple que realitzi la mateixa tasca que l'anterior però particionada de forma que diferents threads s'ocupin paral·lelament del processament del fitxer. 
En un entorn real s'hauria d'utilitzar un framework de missatgeria(JMS) per a poder realitzar aquesta separació entre diferents nodes.

## Exemple Configuració Spring Batch

### Afegir Llibreries

S'ha d'afegir al pom.xml la dependència a Spring Batch Core

    <!-- SPRING BATCH -->
    <dependency>
        <groupId>org.springframework.batch</groupId>
        <artifactId>spring-batch-core</artifactId>
        <version>3.0.7.RELEASE</version>
    </dependency>
	
### Configuració Base de Dades de Spring Batch (Job Repository)

Primer s'han d'afegir a la base dades les taules de Spring Batch: S'ha d'executar a la Base de Dades el següent script https://github.com/spring-projects/spring-batch/blob/master/spring-batch-core/src/main/resources/org/springframework/batch/core/schema-mysql.sql

En cas de tenir una Base de Dades diferent a MySQL seleccionar el script adient : https://github.com/spring-projects/spring-batch/tree/master/spring-batch-core/src/main/resources/org/springframework/batch/core

Després hem de definir el job repository. Al fitxer app-custom-persistence-jpa.xml afegirem els següents beans:

	<!-- Spring Batch -->
	<!-- stored job-meta in database -->
	<bean id="jobRepository"
		class="org.springframework.batch.core.repository.support.JobRepositoryFactoryBean">
		<property name="dataSource" ref="dataSource" />
		<property name="transactionManager" ref="transactionManager" />
		<property name="databaseType" value="mysql" />
	</bean>
	
	<bean id="transactionManager"
		class="org.springframework.batch.support.transaction.ResourcelessTransactionManager" />

### Input (Fitxer CSV)

En aquest howto l'input del procés Batch és un fitxer CSV que hem desat a **resources/cvs/input/input.csv**

	'estacio autobusos', 'Balaguer'
	'Jutjat de Pau', 'Santa Coloma Gramenet'
	'centre obert Alba', 'Vilafranca'
	'La Salle Manlleu', 'Manlleu'
	'estacio metro', 'Barcelona'
	'Jutjat Social', 'Manresa'
	'centre obert Ocaso', 'Vic'
	'La Salle Salou', 'Salou'
	'estacio tren', 'Sant Celoni'
	'Jutjat Penal', 'Vielha'
	'centre obert Nit', 'Sabadell'
	'La Salle Lleida', 'Lleida'

### Configuració del Job

Hem de crear el fitxer app-custom-spring-batch.xml a la carpeta spring.

A la definició del xml afegim els esquemes de batch y task (per a crida al job de forma asíncrona)

	<?xml version="1.0" encoding="ISO-8859-1"?>
	<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
	xmlns:batch="http://www.springframework.org/schema/batch"
    xmlns:task="http://www.springframework.org/schema/task"
	xsi:schemaLocation="http://www.springframework.org/schema/beans 
           http://www.springframework.org/schema/beans/spring-beans-4.1.xsd
           http://www.springframework.org/schema/task
           http://www.springframework.org/schema/task/spring-task-4.1.xsd
           http://www.springframework.org/schema/batch
		   http://www.springframework.org/schema/batch/spring-batch-3.0.xsd">

Definim el nostre job, que tindrà un step. Aquest step s'encarrega de llegir del fitxer csv, processar la informació i escriure-la en base de dades:

	<batch:job id="howtoJob">
	  <batch:step id="step1">
		<batch:tasklet>
			<batch:chunk reader="cvsFileItemReader" writer="jdbcItemWriter" processor="itemProcessor" commit-interval="2"></batch:chunk>
		</batch:tasklet>
	  </batch:step>
	</batch:job>
	
	<bean id="cvsFileItemReader" class="org.springframework.batch.item.file.FlatFileItemReader">
		<property name="resource" value="classpath:cvs/input/input.csv" />

		<property name="lineMapper">
		    <bean class="org.springframework.batch.item.file.mapping.DefaultLineMapper">
			<property name="lineTokenizer">
				<bean
					class="org.springframework.batch.item.file.transform.DelimitedLineTokenizer">
					<property name="names" value="nom,municipi" />
				</bean>
			</property>
			<property name="fieldSetMapper">
				<bean class="cat.gencat.howtobatch.batch.EquipamentFieldSetMapper" />
			</property>
		    </bean>
		</property>
	</bean>
	
	<bean id="itemProcessor" class="cat.gencat.howtobatch.batch.CustomItemProcessor" />
	
	<bean id="jdbcItemWriter" class="org.springframework.batch.item.database.JdbcBatchItemWriter">
		<property name="dataSource" ref="dataSource" />
		<property name="sql">
		  <value>
	            <![CDATA[
	            	insert into equipaments (nom, municipi)
					values (:nom, :municipi)
	            ]]>
		  </value>
		</property>
		<!-- It will take care matching between object property and sql name parameter -->
		<property name="itemSqlParameterSourceProvider">
			<bean class="org.springframework.batch.item.database.BeanPropertyItemSqlParameterSourceProvider" />
		</property>
	</bean>
		
Definim també el jobLauncher, que s'encarrega de iniciar la execució dels diferents jobs que tinguem a l'aplicació

	<bean id="jobLauncher"
		class="org.springframework.batch.core.launch.support.SimpleJobLauncher">
		<property name="jobRepository" ref="jobRepository" />
	</bean>
		
I com en aquest howto volem iniciar de forma asíncrona el nostre procés batch definim un scheduler que s'executi cada 15 segons.

	 <bean id="runScheduler" class="cat.gencat.howtobatch.batch.RunScheduler" />

	<!-- Run every 15 seconds -->
	<task:scheduled-tasks>
		<task:scheduled ref="runScheduler" method="run" cron="*/15 * * * * *" />
	</task:scheduled-tasks>

Ara s'ha de crear les classes que hem definit: 

 - EquipamentFieldSetMapper: S'encarrega de convertir cada línea del CSV en un objecte Equipaments
 - CustomItemProcessor: S'encarrega de processar les dades obtingudas de la lectura (En aquest howto no fem res, però per a facilitar futures implementacions es mostra un exemple)
 - RunScheduler: És la tasca que s'executarà cada 15 segons. Aquí s'inicia el job de Spring Batch
 
#### EquipamentFieldSetMapper

	package cat.gencat.howtobatch.batch;

	import org.springframework.batch.item.file.mapping.FieldSetMapper;
	import org.springframework.batch.item.file.transform.FieldSet;
	import org.springframework.validation.BindException;

	import cat.gencat.howtobatch.model.Equipament;

	public class EquipamentFieldSetMapper implements FieldSetMapper<Equipament>{

		@Override
		public Equipament mapFieldSet(FieldSet fieldset) throws BindException {
			
			Equipament equipament = new Equipament();
			equipament.setNom(fieldset.readString(0));
			equipament.setMunicipi(fieldset.readString(1));
			return equipament;
		}
	}

#### CustomItemProcessor

	package cat.gencat.howtobatch.batch;

	import org.springframework.batch.item.ItemProcessor;
	import cat.gencat.howtobatch.model.Equipament;

	public class CustomItemProcessor implements ItemProcessor<Equipament, Equipament> {

		@Override
		public Equipament process(Equipament item) throws Exception {
			System.out.println("Tractant..." + item);
			return item;
		}
	}

#### RunScheduler

	package cat.gencat.howtobatch.batch;

	import java.util.Date;

	import org.springframework.batch.core.Job;
	import org.springframework.batch.core.JobExecution;
	import org.springframework.batch.core.JobParameters;
	import org.springframework.batch.core.JobParametersBuilder;
	import org.springframework.batch.core.launch.JobLauncher;
	import org.springframework.beans.factory.annotation.Autowired;
	import org.springframework.stereotype.Component;

	@Component
	public class RunScheduler {

		@Autowired
		JobLauncher jobLauncher;
		
		@Autowired
		Job howtoJob;

	  public void run() {

		try {

		String dateParam = new Date().toString();
		JobParameters param =
		  new JobParametersBuilder().addString("date", dateParam).toJobParameters();

		System.out.println(dateParam);

		JobExecution execution = jobLauncher.run(howtoJob, param);
		System.out.println("Sortida: " + execution.getStatus());

		} catch (Exception e) {
			e.printStackTrace();
		}

	  }
	}

Un job només es pot executar 1 vegada (si s'ha completat amb èxit). Com en aquest cas volem que el mateix job s'executi continuament li hem de passar un paràmetre que el faci únic. En aquest cas li pasem la data.

### Resultat

Si arranquem l'aplicació, cada 15 segons veurem a la consola els logs que hem posat al procés batch:

	Thu Sep 22 17:17:00 CEST 2016
	Tractant...Equipament [nom='estacio autobusos']
	Tractant...Equipament [nom='Jutjat de Pau']
	Tractant...Equipament [nom='centre obert Alba']
	Tractant...Equipament [nom='La Salle Manlleu']
	Tractant...Equipament [nom='estacio metro']
	Tractant...Equipament [nom='Jutjat Social']
	Tractant...Equipament [nom='centre obert Ocaso']
	Tractant...Equipament [nom='La Salle Salou']
	Tractant...Equipament [nom='estacio tren']
	Tractant...Equipament [nom='Jutjat Penal']
	Tractant...Equipament [nom='centre obert Nit']
	Tractant...Equipament [nom='La Salle Lleida']
	Sortida: COMPLETED
	Thu Sep 22 17:17:15 CEST 2016
	Tractant...Equipament [nom='estacio autobusos']
	Tractant...Equipament [nom='Jutjat de Pau']
	Tractant...Equipament [nom='centre obert Alba']
	Tractant...Equipament [nom='La Salle Manlleu']
	Tractant...Equipament [nom='estacio metro']
	Tractant...Equipament [nom='Jutjat Social']
	Tractant...Equipament [nom='centre obert Ocaso']
	Tractant...Equipament [nom='La Salle Salou']
	Tractant...Equipament [nom='estacio tren']
	Tractant...Equipament [nom='Jutjat Penal']
	Tractant...Equipament [nom='centre obert Nit']
	Tractant...Equipament [nom='La Salle Lleida']
	Sortida: COMPLETED
	Thu Sep 22 17:17:30 CEST 2016
	Tractant...Equipament [nom='estacio autobusos']
	Tractant...Equipament [nom='Jutjat de Pau']
	Tractant...Equipament [nom='centre obert Alba']
	Tractant...Equipament [nom='La Salle Manlleu']
	Tractant...Equipament [nom='estacio metro']
	Tractant...Equipament [nom='Jutjat Social']
	Tractant...Equipament [nom='centre obert Ocaso']
	Tractant...Equipament [nom='La Salle Salou']
	Tractant...Equipament [nom='estacio tren']
	Tractant...Equipament [nom='Jutjat Penal']
	Tractant...Equipament [nom='centre obert Nit']
	Tractant...Equipament [nom='La Salle Lleida']
	Sortida: COMPLETED

## Exemple Partitioning of Step

En aquest howto es mostra com configurar el processament de jobs de forma paral·lela. Per a mostrar el funcionament partirem els steps d'un job en N sub-steps i cadascún l'executarà un thread diferent.

Per a utilitzar aquest sistema en una aplicació amb diferents nodes de forma remota s'hauria d'utilitzar un framework de missatgeria(JMS) per a la comunicació entre els nodes.

Canvis a partir de l'exemple anterior:

### app-custom-spring-batch-config

Es modifica el fitxer de configuració per a partir el job. S'ha de implementar una classe que realitzi la partició

	...

    <job id="partitionJob" xmlns="http://www.springframework.org/schema/batch">
		<step id="howtoJob">
			<partition step="slave" partitioner="rangePartitioner">
				<handler grid-size="4" task-executor="taskExecutor" />
			</partition>
		</step>
	</job>
	
	<bean id="taskExecutor" class="org.springframework.core.task.SimpleAsyncTaskExecutor" />

	 <!-- each thread will run this job, with different stepExecutionContext values. -->
	  <step id="slave" xmlns="http://www.springframework.org/schema/batch">
	  	<tasklet>
			<chunk reader="cvsFileItemReader" writer="jdbcItemWriter" processor="itemProcessor" commit-interval="2">
			</chunk>
		</tasklet>
	  </step>
	  
	<bean id="rangePartitioner" class="cat.gencat.howtobatch.batch.RangePartitioner" />
	
		
	<bean id="itemProcessor" class="cat.gencat.howtobatch.batch.CustomItemProcessor" scope="step">
		<property name="threadName" value="#{stepExecutionContext[name]}" />
	</bean>
	...
	
Els beans cvsFileItemReader, jdbcItemWriterm, jobLauncher i runScheduler són los mateixos que a l'exemple anterior.
	
Ara s'ha de crear els fitxers que hem definit: 

 - rangePartitioner: S'encarrega de dividir els steps en el nombre de sub-steps que s'ha definit (grid-size)

#### RangePartitioner

	package cat.gencat.howtobatch.batch;

	import java.util.HashMap;
	import java.util.Map;

	import org.springframework.batch.core.partition.support.Partitioner;
	import org.springframework.batch.item.ExecutionContext;

	public class RangePartitioner implements Partitioner {

		@Override
		public Map<String, ExecutionContext> partition(int gridSize) {

			Map<String, ExecutionContext> result
						   = new HashMap<String, ExecutionContext>();

			for (int i = 1; i <= gridSize; i++) {
				ExecutionContext value = new ExecutionContext();

				value.putString("name", "Thread" + i);
				result.put("partition" + i, value);
			}
			return result;
		}
	}
 
Cada cop que es crea un ExecutionContext es crea un Thread, cada thread processarà 4 línies del fitxer CSV.

Al dividir el step en N sub steps, hi haurà N sortides (en aquest cas és indiferent ja que la sortida és escriure a base de dades, però si la sortida fós escriure en un fitxer es crearien N fitxers de sortida, un per cada sub-step)

#### CustomItemProcessor

Hem modificat aquest fitxer per a incloure el nom del thread que està processant el step:

	package cat.gencat.howtobatch.batch;

	import org.springframework.batch.item.ItemProcessor;

	import cat.gencat.howtobatch.model.Equipament;

	public class CustomItemProcessor implements ItemProcessor<Equipament, Equipament> {

		private String threadName;
		
		@Override
		public Equipament process(Equipament item) throws Exception {
			System.out.println(threadName  + " Tractant... " + item);
			return item;
		}

		public String getThreadName() {
			return threadName;
		}

		public void setThreadName(String threadName) {
			this.threadName = threadName;
		}
		
	}
 
### Resultat
 
	Fri Sep 23 09:49:00 CEST 2016
	Thread4 Tractant... Equipament [nom='estacio autobusos']
	Thread4 Tractant... Equipament [nom='Jutjat de Pau']
	Thread3 Tractant... Equipament [nom='centre obert Alba']
	Thread3 Tractant... Equipament [nom='La Salle Manlleu']
	Thread2 Tractant... Equipament [nom='estacio metro']
	Thread2 Tractant... Equipament [nom='Jutjat Social']
	Thread1 Tractant... Equipament [nom='centre obert Ocaso']
	Thread1 Tractant... Equipament [nom='La Salle Salou']
	Thread3 Tractant... Equipament [nom='Jutjat Penal']
	Thread3 Tractant... Equipament [nom='centre obert Nit']
	Thread4 Tractant... Equipament [nom='estacio tren']
	Thread4 Tractant... Equipament [nom='La Salle Lleida']
	Sortida: COMPLETED
	Fri Sep 23 09:49:15 CEST 2016
	Thread3 Tractant... Equipament [nom='estacio autobusos']
	Thread4 Tractant... Equipament [nom='centre obert Alba']
	Thread4 Tractant... Equipament [nom='La Salle Manlleu']
	Thread3 Tractant... Equipament [nom='Jutjat de Pau']
	Thread1 Tractant... Equipament [nom='estacio metro']
	Thread1 Tractant... Equipament [nom='Jutjat Social']
	Thread2 Tractant... Equipament [nom='centre obert Ocaso']
	Thread2 Tractant... Equipament [nom='La Salle Salou']
	Thread3 Tractant... Equipament [nom='estacio tren']
	Thread3 Tractant... Equipament [nom='Jutjat Penal']
	Thread2 Tractant... Equipament [nom='centre obert Nit']
	Thread4 Tractant... Equipament [nom='La Salle Lleida']
	Sortida: COMPLETED