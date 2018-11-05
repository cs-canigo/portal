+++
date = "2018-11-02"
title = "HowTo usar Hikari CP a Canigó 3.2"
description = "En aquest HowTo es proposa i s'explica un mètode per integrar i utilitzar Hikari CP a Canigó 3.2"
section = "howtos"
categories = ["canigo"]
key = "NOVEMBRE2018"
+++

## Audiència

Aquest how-to va dirigit principalment al personal tècnic (desenvolupadors, analistes tècnics i arquitectes) que desenvolupin una aplicació Canigó 3.2 i tinguin la necessitat de treballar amb un *Connection Pool* d'alt rendiment.

## Context

Els pools de connexions proporcionen una millora en el rendiment de les consultes SQL, minimitzant el temps d'adquisició i ús de les connexions a BBDD. Les diferents maneres de gestionar aquestes connexions i l'oferta de funcionalitats relacionades fa que hi hagi diferents implementacions (Apache DBCP2, Hikari CP, C3P0, Tomcat Pool, etc.)

Hikari CP és un pool de connexions que actualment té un gran *momentum* degut principalment a una visió minimalista de la gestió de les connexions, fent que frameworks molt populars (com Spring) l'hagin triat com una opció més per la tasca de gestionar les connexions a BBDD.

## Configuració

Hikari actualment proporciona 3 versions, segons la versió de Java sigui 8+ o prèvies; tot i que les versions per Java 7 i 6 estan només en mode de manteniment. Segons la versió de Java s'ha de triar la dependència Maven apropiada:

```xml
	<!-- Java 8+ -->
	<dependency>
		<groupId>com.zaxxer</groupId>
		<artifactId>HikariCP</artifactId>
		<version>3.2.0</version>
	</dependency>

	<!-- Java 7 -->
	<dependency>
		<groupId>com.zaxxer</groupId>
		<artifactId>HikariCP</artifactId>
		<version>2.4.7</version>
	</dependency>

	<!-- Java 6 -->
	<dependency>
		<groupId>com.zaxxer</groupId>
		<artifactId>HikariCP</artifactId>
		<version>2.3.13</version>
	</dependency>
```

### jpa.properties

De manera ad-hoc s'ha definit que les propietats específiques del pool de connexions de Hikari tinguin el prefix `persistence.hikari`; agrupant la configuració de les propietats del pool de connexions en 3 parts:

1. Mode d'accés i/o autenticació: S'ha de definir l'accés a la BBDD o bé mitjançant l'identificador JNDI o bé mitjançant l'URL, l'usuari i el password.
1. Propietats generals del pool: Quantitat de connexions i temporitzadors associats. En aquest cas, la resta de configuracions del pool són calculats en funció d'aquests valors.
1. (Opcional) propietats específiques del driver JDBC: Ajustos específics per millorar el rendiment o per *troubleshooting*.

Un exemple de configuració per Hikari seria el següent:

```properties
#
# HikariCP
#

# 1. Accés / Autenticació 
# 1.a JDNI
#*.persistence.hikari.jndiName=java:comp/env/jdbc/OracleIntranetDS

# 1.b. JDBC Auth
*.persistence.hikari.jdbc.url=jdbc:h2:mem:bbdd_proves;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=false
*.persistence.hikari.jdbc.username=sa
*.persistence.hikari.jdbc.password=

# 2. Pool configuration
# 20s
*.persistence.hikari.connectionTimeout=20000
# 4m
*.persistence.hikari.maxLifetime=240000
# Recomanació genèrica: 10 (per aplicacions web intranet), 20 (per aplicacions amb processos batch/nocturns), 50 (per aplicacions web extranet). Finalment 100+ (per grans aplicacions amb molts usuaris concurrents i/o transaccions lentes, OLAP, data Warehouse, etc.)
*.persistence.hikari.maximumPoolSize=10

# 3. JDBC Driver (MySql) específic
#    Exemple de https://github.com/brettwooldridge/HikariCP#initialization
*.persistence.hikari.driver.cachePrepStmts=true
*.persistence.hikari.driver.prepStmtCacheSize=500
*.persistence.hikari.driver.prepStmtCacheSqlLimit=2048
*.persistence.hikari.driver.useServerPrepStmts=true
*.persistence.hikari.driver.useLocalSessionState=true
*.persistence.hikari.driver.rewriteBatchedStatements=true
*.persistence.hikari.driver.cacheResultSetMetadata=true
*.persistence.hikari.driver.cacheServerConfiguration=true
*.persistence.hikari.driver.elideSetAutoCommits=true
*.persistence.hikari.driver.maintainTimeStats=false
```


### Application.java

La creació del DataSource s'ha de definir de la següent manera:

```java
	/**
	 * NOTA: Sobreescrivim el bean "dataSource" creat anteriorment per a què, amb el
	 * mateix àlies, sigui retornat el DS de Hikari.
	 * 
	 * @param configuration
	 * @param configurer
	 * @return
	 */
	@Bean(name = { "hikariDataSource", "dataSource" }, destroyMethod = "close")
	@Primary
	public DataSource hikariDataSource(final PropertiesConfiguration configuration,
			final ICustomPropertyPlaceHolderConfigurer configurer) {

		final DataSource ds = init(new HikariDataSource(), "persistence.hikari.", //
				configuration, configurer.getResolvedProps());

		if (logger.isDebugEnabled())
			logger.debug(ToStringBuilder.reflectionToString(ds));

		return ds;
	}

	protected DataSource init(final HikariDataSource ds, final String prefix,
			final PropertiesConfiguration configuration, final Map<String, String> properties) {

		final String jndiName = configuration.getProperty(prefix + "jndiName");
		final String jdbcUrl = configuration.getProperty(prefix + "jdbc.url");

		if (jndiName != null && jdbcUrl != null)
			logger.warn("jndiName i jdbcUrl estan definits alhora per " + prefix);

		if (jndiName != null) {
			ds.setDataSourceJNDI(jndiName);
		} else {
			ds.setJdbcUrl(jdbcUrl);
			ds.setUsername(configuration.getProperty(prefix + "jdbc.username"));
			ds.setPassword(configuration.getProperty(prefix + "jdbc.password"));
		}

		ds.setConnectionTimeout(new Integer(configuration.getProperty(prefix + "connectionTimeout"))); // ~20s
		ds.setValidationTimeout(Math.max(ds.getConnectionTimeout() / 5, 5 * 1000)); // 20% connectionTimeout
		//
		final int MINUTE = 60 * 1000;
		ds.setMaxLifetime(new Integer(configuration.getProperty(prefix + "maxLifetime"))); // ~4m
		ds.setIdleTimeout(Math.max( //
				Math.min(ds.getMaxLifetime() - MINUTE, 4 * MINUTE) //
				, 10 * 1000));
		//
		ds.setMaximumPoolSize(new Integer(configuration.getProperty(prefix + "maximumPoolSize"))); // ~20
		ds.setMinimumIdle(Math.max(ds.getMaximumPoolSize() / 10, 1)); // [ 10% maximumPoolSize, 1]

		//
		// Definició de les propietats : persistence.hikari.driver.XYZ ->
		// ds.addDataSourceProperty(XYZ, *)
		//

		for (final Entry<String, String> entry : properties.entrySet()) {

			final String key = entry.getKey();

			if (key.startsWith(prefix + "driver.")) {
				final String property = key.substring((prefix + "driver.").length());
				ds.addDataSourceProperty(property, parse(entry.getValue()));
			}
		}

		return ds;
	}

	protected Object parse(final String value) {

		try {
			return new Integer(value);
		} catch (NumberFormatException e) {
			logger.debug(e.getMessage());
		}

		if ("true".equals(value))
			return true;

		if ("false".equals(value))
			return false;

		return value;
	}
```

## Informació addicional

A continuació es defineix una llista d'enllaços amb informació addicional per poder aprofundir en els diferents aspectes i opcions mostrades al document.

* Hikari
  * http://brettwooldridge.github.io/HikariCP/
  * https://github.com/brettwooldridge/HikariCP
  * https://github.com/brettwooldridge/HikariCP/wiki
* Propietats específiques de drivers JDBC
  * http://www.h2database.com/javadoc/org/h2/engine/SysProperties.html
  * https://dev.mysql.com/doc/connector-j/5.1/en/connector-j-reference-configuration-properties.html
  * https://jdbc.postgresql.org/documentation/head/connect.html
  * https://docs.oracle.com/database/121/JAJDB/oracle/jdbc/OracleDriver.html
* https://commons.apache.org/proper/commons-dbcp/
* https://tomcat.apache.org/tomcat-8.0-doc/jdbc-pool.html
  

## Annex. Configurar exemple de Swagger

Per poder treballar amb l'exemple de l'API de Swagger fent ús del Hikari, només cal modificar el fitxer `src/main/resources/spring/app-custom-persistence-jpa.xml` de la següent manera:

1. Comentar (o eliminar) el tag `<jdbc:embedded-database id="dataSource" type="H2">`
2. Afegir el següent xml:
```xml
	<jdbc:initialize-database data-source="hikariDataSource" >
		<jdbc:script location="classpath:scripts/h2/db-app-h2db-schema.sql"/>
		<jdbc:script location="classpath:scripts/h2/db-app-h2db-data.sql"/>
	</jdbc:initialize-database>
```

