+++
date        = "2016-11-28T10:44:27+01:00"
title       = "Instrumentació"
description = "Mòdul per generar dades d’instrumentació (nombre de peticions, nombre d’errors, …) de la seva execució."
sections    = "Canigó. Documentació versió 3.x"
weight      = 1
+++

## Propòsit

Aquest mòdul permet a l'aplicació generar dades d'instrumentació de la seva execució, per tal de poder ser explotades posteriorment amb eines de monitorització.

Dins d'aquest mòdul podem trobar les següents funcionalitats:

* Instrumentació de les peticions web: nombre de peticions, nombre d'errors i temps mig per petició.
* Eines de revisió de l'estat de l'aplicació definits pel desenvolupador.
* Instrumentació manual en format log de mètodes de classes aplicatives.

## Instal.lació i Configuració

### Instal.lació

Per tal d'instal-lar el mòdul d'instrumentació es pot incloure automàticament a través de l'eina de suport al desenvolupament o bé afegir manualment en el pom.xml de l'aplicació la següent dependència:

```
<canigo.operation.instrumentation.version>[1.1.0,1.2.0)</canigo.operation.instrumentation.version>

<dependency>
    <groupId>cat.gencat.ctti</groupId>
    <artifactId>canigo.operation.instrumentation</artifactId>
    <version>${canigo.operation.instrumentation.version}</version>
</dependency>
```

### Configuració

La configuració es realitza automàticament a partir de la eina de suport al desenvolupament.

L'eina de desenvolupament també genera automàticament el fitxer de propietats necessari per a la configuració del servei.  

Ubicació proposada: <PROJECT_ROOT>/src/main/resources/config/props/instrumentation.properties

<table>
    <tbody>
        <tr>
            <th><b>Propietat</b></th>
            <th><b>Requerit</b></th>
            <th><b>Descripció</b></th>
        </tr>
        <tr>
            <td> *.instrumentation.interval </td>
            <td> No </td>
            <td> Interval de refresc de les dades instrumentades en l'aplicació de monitorització. Per defecte: 60000 </td>
        </tr>
        <tr>
            <td> *.instrumentation.implementation </td>
            <td> No </td>
            <td> Implementació del servei per als diferents servidors d'aplicacions, amb i sense cluster <br clear="all">
            Opcions:
            <ul>
                <li>Weblogic + cluster: cat.gencat.ctti.canigo.arch.operation.monitoring.cluster.WeblogicMonitoringServiceImpl</li>
                <li>Tomcat + cluster: cat.gencat.ctti.canigo.arch.operation.monitoring.cluster.TomcatMonitoringServiceImpl</li>
                <li>Tomcat/Weblogic sense cluster: cat.gencat.ctti.canigo.arch.operation.monitoring.single.MonitoringImpl <br clear="all">
            <b>Per defecte: cat.gencat.ctti.canigo.arch.operation.monitoring.single.MonitoringImpl</b> </li>
            </ul>
            </td>
        </tr>
        <tr>
            <td> *.instrumentation.username </td>
            <td> No </td>
            <td> Usuari per logarse al admin server del Cluster. Per defecte: weblogic </td>
        </tr>
        <tr>
            <td> *.instrumentation.password </td>
            <td> No </td>
            <td> Password per logarse al admin server del Cluster. Per defecte: weblogic </td>
        </tr>
        <tr>
            <td> *.instrumentation.protocol </td>
            <td> No </td>
            <td> Protocol per la connexió al Mbean Server. Per defecte: t3 </td>
        </tr>
        <tr>
            <td> *.instrumentation.jndiRoot </td>
            <td> No </td>
            <td>&nbsp;</td>
        </tr>
        <tr>
            <td> *.instrumentation.port </td>
            <td> No </td>
            <td> Port del admin server. Per defecte: 7001 </td>
        </tr>
        <tr>
            <td> *.instrumentation.hostname </td>
            <td> No </td>
            <td> IP del admin server. Per defecte: localhost </td>
        </tr>
        <tr>
            <td> *.instrumentation.mbean </td>
            <td> No </td>
            <td> mbean de monitorització. Per defecte: cat.gencat.ctti.canigo."application.Id" </td>
        </tr>
    </tbody>
</table>

### Utilització del Mòdul

Per a utilitzar aquest mòdul, cal instal- lar-lo amb l'eina de desenvolupament.

A continuació es descriu el mode d'ús per cadascuna de les funcionalitats oferides pel mòdul:

#### End Point Rest amb les dades de monitorització de l'aplicació

Per accedir a aquesta interfície l'usuari ha d'introduir la següent url al navegador:

    http:\\url_aplicacio\info\monitoring

En aquesta url es mostra el nombre de peticions, errors i temps mig per unitat de temps en format JSON.

<div class="message information">
Control d'accés

Per defecte, i només si el desenvolupador ha instal- lat el mòdul de seguretat de l'aplicació, aquesta pantalla només serà accessible per a usuaris logats amb rol administrador.
</div>


#### Eines de revisió de l'estat de l'aplicació

Mitjançant anotacions Java, el desenvolupador pot crear els seus propis punts de control de l'aplicació, per certificar d'una manera ràpida el seu correcte funcionament.

Classe de servei que serà invocada des del Managed Bean de JSF:

```java
/**
 * Check status for several backend
 *
 * @author
 *
 */
@Repository("statusService")
public class StatusService {

	@Autowired
        private GenericDAO<User, Integer> dao;


	/**
        * Check PSIS
        * @throws IOException
        */
        @CheckStatus
        public void checkPSIS() throws IOException{
	        URL myUrl = new URL("http://psis.catcert.net/psis/catcert/dss");
         	URLConnection myConn = (HttpURLConnection)myUrl.openConnection();
        	myConn.setRequestProperty("User-agent","Mozilla/4.0");
        	InputStreamReader is = null;
        	BufferedReader br = null;
        	try{
	        	is = new InputStreamReader(myConn.getInputStream());
		        br = new BufferedReader(is);
            		br.readLine();
          	}finally{
	         	if(is!=null){
		        	is.close();
          		}
	          	if(br!=null){
		        	br.close();
           		}
	         }
         }

	/**
	 * Database check
	 */
	@CheckStatus
	public void checkDataBaseConnection(){
		dao.get(1);
	}

	/**
	 * Always IOException
	 * @throws IOException
	 */
	@CheckStatus
	public void checkLDAP() throws IOException{
	  .....
          .....
	}

}
```

<div class="message information">
Control d'excepcions

Les excepcions dels diferents mètodes de validació han de propagar-se per tal de que Canigó detecti si ha finalitzat en execució correcta o errònia.
</div>

Les crides a aquest servei es realitzaran des de la classe CheckStatusBean proporcionada per l'eina de desenvolupament, dins del mètode check:

```java
@Component("statusBean")
@Scope("singleton")
@Lazy
public class CheckStatusBean {

        @Autowired
	private StatusService service;

	public void check() throws IOException{
		service.checkPSIS();
		service.checkDataBaseConnection();
		service.checkLDAP();
	}
}
```

Per executar aquestes comprovacions, dins de la pantalla de monitorització, pestanya "Estat", es pot visualitzar/llançar les validacions definides pel desenvolupador.

#### Instrumentació en format log de l'execució de mètodes de l'aplicació

Amb l'anotació @Trace, el desenvolupador pot marcar un mètode d'una classe gestionada per Spring, i de automàticament aquest generarà traces d'instrumentació de la seva execució:

```java
@Repository("myService")
public class ServiceImpl implements Service {


	@Trace
	public void doSomething(){
		.....
                .....
	}


}
```

On el resultat de l'execució del mètode ens deixarà la següent traça:

```
canigo Message: XX XXX 2010 16:45:40,774 INFO  [main] cat.gencat.ctti.canigo.arch.operation.instrumentation.trace.AspectTrace - ea84cbe0-60ff-4ba5-a4e8-d90465101ac3;loc;weblogic1;0;Service.doSomething();KO;
```

On cadascun dels camps separats per coma son:

* Identificador únic de petició
* Entorn
* Nom instància Weblogic
* Temps d'execució
* Mètode executat
* Resultat de l'execució.