+++
date        = "2015-04-02T09:44:09+02:00"
title       = "SFTP"
description = "Transferència d'arxius de manera segura."
sections    = "Canigó. Documentació versió 3.x"
weight      = 4
+++

## Propòsit

El servei de SFTP de Canigó permet enviar i rebre arxius entre el servidor on s'executa l'aplicació a altres servidors de forma segura mitjançant l'intercanvi de claus.

El servei està basat en les llibreries JSCH i Commons-VFS, la primera es tracta d'un projecte open source que permet la connexió via SSH a qualsevol màquina. La segona llibrería és un projecte també open_source de la Apache Foundation que permet treballar amb més facilitat amb la JSCH, donant eines per crear connexions SFTP (entre d'altres) contra un servidor.

## Documents i Fonts de Referència

Nom         | URL
----------- | ------------------------------------
JSCH        | [http://www.jcraft.com/jsch/](http://www.jcraft.com/jsch/)
Commons VFS | [http://commons.apache.org/vfs/](http://commons.apache.org/vfs/)

## Glossari

**SFTP**  
Secure File Transfer Protocol (Protocol de Transferència Segura d'Arxius), es tracta d'un protocol de transferència de fitxers entre computadors de forma segura.

**Download**  
Rebre arxius des d'un servidor.

**Upload**  
Enviar arxius a un servidor.

**Socket**  
Port del servidor habilitat per realitzar la transferència de fitxers/streams mitjançant el protocol SFTP.  

## Instal.lació i Configuració

### Instal.lació

Per tal d'instal-lar el mòdul d'SFTP es pot incloure automàticament a través de l'eina de suport al desenvolupament o bé afegir manualment en el pom.xml de l'aplicació la següent dependència:

```
<canigo.support.sftp.version>[1.2.0,1.3.0)</canigo.support.sftp.version>

<dependency>
	<groupId>cat.gencat.ctti</groupId>
	<artifactId>canigo.support.sftp</artifactId>
	<version>${canigo.support.sftp.version}</version>
</dependency>
```

### Configuració

La configuració es realitza automàticament a partir de la eina de suport al desenvolupament.

L'eina de desenvolupament genera automàticament el fitxer de propietats necessari per a la configuració del servei.

Ubicació proposada: <PROJECT_ROOT>/src/main/resources/config/props/sftp.properties

Propietat |	Requerit | Descripció
--------- | -------- | ----------
*.sftp.url |Sí | Host del servidor sftp.
*.sftp.port | No | Port del servidor sftp. Valor per defecte: 22.
*.sftp.username | No | Usuari de connexió al servidor de secure ftp (sftp).
*.sftp.password | No | Password de l'usuari de connexió.
*.sftp.identityPath | No | Path del fitxer de claus privades. El fitxer ha de tenir format OpenSSH (RSA o DSA).
*.sftp.strictHostKeyChecking | No | Indica si volem intercanviar claus amb el servidor o no. Valor per defecte: no.
*.sftp.knownHosts | No | Directori on es troba el fitxer de claus SSH.
*.sftp.proxyType  | No | Tipus de proxy.
*.sftp.proxyHost  | No | Adreça del proxy.
*.sftp.proxyPort  | No | Port del proxy. Valor per defecte: 8080.
*.sftp.userDirIsRoot | No | Possibilitat d'indicar els paths relatius al directori home de l'usuari.<br>true --> Paths relatius a partir del directori home<br>false --> Paths absoluts. Valor per defecte.
*.sftp.uploadChecksum | No | Ofereix la possibilitat de generar i pujar un fitxer de checksum.<br>default --> Generarà i farà l'upload d'un fitxer .md5 a més del fitxer indicat.<br>all --> Generarà i farà l'upload d'un fitxer .md5, .sha1 a més del fitxer indicat.<br>md5 --> Generarà i farà l'upload d'un fitxer .md5 a més del fitxer indicat.<br>sha1 --> Generarà i farà l'upload d'un fitxer .sha1 a més del fitxer indicat.<br>none --> No generarà cap fitxer de checksum. El mateix que si no s'informa aquesta propietat.
*.sftp.uploadChecksumException | No | Serveix per a indicar si un error de checksum és bloquejant o no.<br>true --> Si es produeix un error al generar el fitxer de checksum, es llançarà una excepció i no es pujarà el fitxer al servidor.<br>false --> Si es produeix un error al generar el fitxer de checksum, es mostrarà un log d'error, però continuarà la pujada del fitxer indicat al servidor.
*.sftp.downloadChecksum | No | Ofereix la possibilitat de generar i pujar un fitxer de checksum.<br>default --> Validarà que el fitxer descarregat és correcte mitjançant el fitxer .md5.<br>md5 --> Validarà que el fitxer descarregat és correcte mitjançant el fitxer .md5.<br>sha1 --> Validarà que el fitxer descarregat és correcte mitjançant el fitxer .sha1.<br>none --> No realitzarà cap tipus de validació sobre el fitxer descarregat
*.sftp.downloadChecksumValidation | No | Serveix per a indicar el nivell de bloqueig del checksum.<br>exception --> Si no coincideix el checksum generat del fitxer descarregat amb el que hi ha al servidor es llançarà una excepció.<br>log --> Si no coincideix el checksum generat del fitxer descarregat amb el que hi ha al servidor mostrarà un log d'error.<br>none --> Si no coincideix el checksum generat del fitxer descarregat amb el que hi ha al servidor no farà res..

Els arxius de configuració que contenen els beans del mòdul i que serán carregats per Spring, son automàticament registrats pel core de Canigó, per lo que el desenvolupador no ha de definir cap arxiu XML per aixecar el servei.

### Utilització del Mòdul

Per accedir al mòdul de SFTP, el desenvolupador pot realitzar una crida de forma externa mitjançant el patró 'Dependency Injection'.

Podem diferenciar dues formes d'injectar-ho:

* Per XML:

```
<bean id="tractamentClients"  class="cat.gencat.demo.mbean.TractamentClient">
    <property name="sftpService" ref="sftpService" />
</bean>
```

La clase TractamentClient tindria la següent estructura:

```java
import cat.gencat.ctti.canigo.arch.support.sftp.SftpService;
public class TractamentClient{
   private SftpService sftpService;

   public void setSftpService(SftpService service){
       this.sftpService = service;
   }

   public void execute(){
       sftpService.login();
   }
}
```

Injecció del mòdul de configuració dins del bean "tractamentClients". Spring s'encarregarà d'injectar el mòdul de SFTP executant el mètode setSftpService.

* Per anotacions:

```java
import cat.gencat.ctti.canigo.arch.support.sftp.SftpService;

@Component("tractamentClients")
public class TractamentClient{
   @Autowired
   private SftpService sftpService;

   public void execute(){
       sftpService.login();
   }
}
```

#### Realitzar connexió

Tenim diferents maneres de realitzar la connexió:

* Els paràmetres de connexió venen informats a l'arxiu de propietats. El mòdul de SFTP farà servir aquestes propietats per gestionar la connexió al servidor.

```java
sftpService.login();
```


* Si no hem indicat a través de la configuració l'usuari i la contrasenya per realitzar la connexió, s'indicarà manualment en al crida.

```java
sftpService.login(usuari,contrasenya);
```

* Servidor, usuari, contrasenya i port no informat.

```java
sftpService.login(usuari, contrasenya, ftpUrl, ftpPort);
```

Per realitzar una connexió al servidor a través d'un proxy cal informar les següents propietats a l'arxiu de configuració del mòdul:  
 
* sftp.proxyType: Tipus de proxy, pot tenir els valors http o socks.
* sftp.proxyHost: Adreça del host.
* sftp.proxyPort: Port del host.


#### Realitzar desconnexió del servidor SFTP

Per realitzar la desconnexió del servidor FTP seguirem un patró com el mostrat en el següent exemple:

1. Validem que estem conectats.
2. Desconectem en el cas de estar logats al servidor.

```java
if (sftpService.isLogged()) {
    sftpService.logout();
}
```


#### Realitzar download d'un fitxer

Per realitzar un download d'un fitxer seguirem un patró com el mostrat en el següent exemple:

```java
sftpService.login();
if (sftpService.isLogged()) {
    sftpService.downloadFile(fileName, localPath, remotePath);
    sftpService.logout();
}
```

Realitzarem doncs els següents passos:

1. Cridem al mètode login() per realitzar la connexió i l'autentificació al servidor remot mitjançant el protocol SFTP.
2. En cas de que la connexió al servidor remot s'hagi realitzat correctament es crida al mètode downloadFile() per realitzar el download del fitxer del servidor remot.
3. Realitzar la desconnexió del servidor SFTP.

Es crida el mètode downloadFile() que amb els següents paràmetres:

Ordre | Requerit | Tipus  | Descripció
----- | -------- | ------ | ------------------------------------------------------------------
1     | Si       | String | Nom del fitxer del servidor remot que es vol realitzar el download.
2     | Si       | String | Directori local on es vol guardar el fitxer.
3     | Si       | String | Directori remot on es troba el fitxer a baixar.

I retorna:

Ordre | Requerit | Tipus   | Descripció
----- | -------- | ------- | ----------------------------------------------------------------
1     | Si       | boolean | TRUE o FALSE segons s'ha realitzat correcta o incorrectament el procés.

#### Realitzar upload d'un fitxer

Per realitzar un upload d'un fitxer seguirem un patró com el mostrat en el següent exemple:

```java
sftpService.login();
if (sftpService.isLogged()) {
    sftpService.uploadFile(fileName, localPath, remotePath);
    sftpService.logout();
}
```

Realitzarem doncs els següents passos:

1. Cridem al mètode login() per realitzar la connexió i l'autentificació al servidor remot mitjançant el protocol SFTP.
2. En cas de que la connexió al servidor remot s'hagi realitzat correctament es crida al mètode uploadFile() per realitzar el upload del fitxer del servidor local al servidor remot.
3. Realitzar la desconnexió del servidor SFTP.

Es crida el mètode uploadFile() que amb els següents paràmetres:

Ordre | Requerit  | Tipus  | Descripció
----- | --------- | ------ | -----------------------------------------------------------------
1     | Si        | String | Nom del fitxer del servidor remot que es vol realitzar el upload.
2     | Si        | String | Directori local on es troba el fitxer a pujar.
3     | Si        | String | Directori remot on es vol guardar el fitxer.

#### Obtenir la llista de noms dels fitxers del servidor remot

Per obtenir la llista de fitxers en una carpeta d'un servidor remot seguirem un patró com el mostrat en el següent exemple:

```java
sftpService.login();
if (sftpService.isLogged()) {
    FileObject[] listFiles = sftpService.listFiles(remotePath);
    sftpService.logout();
}
```

Realitzarem doncs els següents passos:

1. Cridem al mètode login() per realitzar la connexió i l'autentificació al servidor remot mitjançant el protocol SFTP.
2. En cas de que la connexió al servidor remot s'hagi realitzat correctament es crida al mètode listFiles() per obtenir una llista de fitxers en una carpeta d'un servidor remot.

Es crida el mètode listFiles() que amb els següents paràmetres:

Ordre | Requerit | Tipus  | Descripció
----- | -------- | ------ | ----------
1     | Sí       | String | Nom de la carpeta del servidor remot d'on es vol obtenir la llista de fitxers.

El mètode retorna un array de FileObject, interfícies de la llibrería Commons VFS que ens donen una sèrie de mètodes per a treballar amb els fitxers remots.

#### Crear un fitxer al servidor remot

Per crear un fitxer al servidor remot seguirem un patró com el mostrat en el següent exemple:

```java
sftpService.login();
if (sftpService.isLogged()) {
    createFile(fileName, remotePath);
    sftpService.logout();
}
```

Realitzarem doncs els següents passos:

1. Cridem al mètode login() per realitzar la connexió i l'autentificació al servidor remot mitjançant el protocol SFTP.
2. En cas de que la connexió al servidor remot s'hagi realitzat correctament es crida al mètode createFile() per crear el fitxer en el servidor remot.

Es crida el mètode createFile() que amb els següents paràmetres:

Ordre | Requerit | Tipus  | Descripció
----- | -------- | ------ | -----------
1     | Si       | String | Nom del fitxer a crear en el servidor remot.
2     | Si       | String | Directori remot on es vol crear el fitxer.

El mètode retorna un boolean TRUE o FALSE segons s'ha realitzat correcta o incorrectament el procés.

#### Crear un directori al servidor remot

Per crear un directori al servidor remot seguirem un patró com el mostrat en el següent exemple:

```java
sftpService.login();
if (sftpService.isLogged()) {
    createFolder(folderName, remotePath);
    sftpService.logout();
}
```

Realitzarem doncs els següents passos:

1. Cridem al mètode login() per realitzar la connexió i l'autentificació al servidor remot mitjançant el protocol SFTP.
2. En cas de que la connexió al servidor remot s'hagi realitzat correctament es crida al mètode createFolder() per crear el fitxer en el servidor remot.

Es crida el mètode createFolder() que amb els següents paràmetres:

Ordre | Requerit | Tipus  | Descripció
----- | -------- | ------ | -----------
1     | Si       | String | Nom del directori a crear en el servidor remot.
2     | Si       | String | Directori remot on es vol crear el directori.

El mètode retorna un boolean TRUE o FALSE segons s'ha realitzat correcta o incorrectament el procés.

#### Esborrar un fitxer al servidor remot

Per esborrar un fitxer al servidor remot seguirem un patró com el mostrat en el següent exemple:

```java
sftpService.login();
if (sftpService.isLogged()) {
    deleteFile(fileName, remotePath);
    sftpService.logout();
}
```

Realitzarem doncs els següents passos:

1. Cridem al mètode login() per realitzar la connexió i l'autentificació al servidor remot mitjançant el protocol SFTP.
2. En cas de que la connexió al servidor remot s'hagi realitzat correctament es crida al mètode deleteFile() per crear el fitxer en el servidor remot.

Es crida el mètode deleteFile() que amb els següents paràmetres: 

Ordre | Requerit | Tipus  | Descripció
----- | -------- | ------ | -----------   
1     | Si       | String | Nom del fitxer a esborrar en el servidor remot.
2     | Si       | String | Directori remot on es troba el fitxer.

El mètode retorna un boolean TRUE o FALSE segons s'ha realitzat correcta o incorrectament el procés.

## Exemples

### Tests Unitaris

Un exemple d'utilització del mòdul de SFTP són els tests unitaris.

S'ha de tenir en compte que s'ha de disposar d'accés a un servidor remot mitjançant el protocol SFTP per poder realitzar els tests.

Suposem que la configuració del

```java
/**
 * Unit test for mailing service
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"../../core/config/canigo-core.xml"})
public class SftpServiceReleaseTest{
	// File exchange
	private String fileName					= null;
	private String localPath				= null;
	private String remotePath				= null;
	private String tempName 				= null;

	@Autowired
	@Qualifier("sftpService")
	SftpService sftpService;

	@Before
	public void setUp() throws AddressException{
		fileName = "sftp.properties";
		remotePath = "/home/continuum/tmp";
		localPath = this.getClass().getResource("/temp/arxiu_pujar.pdf").getPath();
		localPath = localPath.substring(0, (localPath.lastIndexOf("/")+1));
	}

	/**
	* Documentació.
	*
	* @throws Exception Documentació
	*/
	@Test
	public void testLogin() throws Exception {
		try {
			Assert.assertTrue(sftpService.login());
			if (sftpService.isLogged()) {
				sftpService.logout();
			}
		} catch (SftpModuleException e) {
			Assert.fail();
		}
	}

	/**
	* Documentació.
	*
	* @throws Exception Documentació
	*/
	@Test
	public void testLogout() throws Exception {
		try {
			sftpService.login();
			Assert.assertTrue(sftpService.logout());
		} catch (SftpModuleException e) {
			Assert.fail();
		}
	}

	/**
	* Documentació.
	*
	* @throws Exception Documentació
	*/
	@Test
	public void testLogoutFailed() throws Exception {
		try {
			Assert.assertFalse(sftpService.logout());
		} catch (SftpModuleException e) {
			Assert.fail();
		}
	}

	/**
	* Documentació.
	*
	* @throws Exception Documentació
	*/
	@Test
	public void testUploadFile() throws Exception {
		try {
			sftpService.login();
			if(sftpService.isLogged()) {
                                sftpService.uploadFile(fileName, localPath, remotePath);
			        Assert.assertTrue(sftpService.existsFile(fileName, remotePath));
				sftpService.logout();
			}else{
                                Assert.fail();
                        }
		} catch (SftpModuleException e) {
			Assert.fail();
		}
	}

}
```
