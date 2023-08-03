+++
date        = "2021-10-21"
title       = "Sarcat"
description = "Serveis que ofereix la plataforma de Sarcat directament."
sections    = "Canigó. Documentació Versió 3.6"
weight      = 10
+++

## Propòsit

Aquest mòdul permet consumir els diferents serveis que ofereix la plataforma de Sarcat directament als seus WebService i asincronament a través de SFTP

## Funcionalitats del connector

El connector proporciona accés a les següents operacions de Sarcat:

Operació Sarcat                   | Descripció Funcional | Modalitat PICA | Operació PICA
--------------------------------- | -------------------- | -------------- | -------------
consultaAssentaments              | Permet obtenir una relació d'assentaments, amb les dades bàsiques, que compleixin uns criteris de filtratge específics. | SARCAT_AL_CONSULTA    | OP_CONSULTA_ASSENTAMENTS
cercaAssentaments                 | Permet obtenir totes les dades d'un assentament concret.                                                               | SARCAT_AL_CONSULTA    |  OP_CERCA_ASSENTAMENTS
recollirAssentamentsSafataEntrada | Permet recollir assentaments de la safata d'entrada per incorporar-los a d'altres sistemes.                            | SARCAT_AL_CONSULTA    |  OP_RECOLLIR_ENTRADA
recollirAssentamentsSafataSortida | Permet recollir assentaments de la safata de sortida per incorporar-los a d'altres sistemes.                            | SARCAT_AL_CONSULTA    |  OP_RECOLLIR_SORTIDA
esPresortida                      | Conèixer si un assentament concret és una pre-sortida o una sortida.                                                    | SARCAT_AL_CONSULTA    |  OP_ES_PRESORTIDA
insertarAssentamentEntrada        | Es registra l'assentament d'entrada i retorna el número d'assentament assignat i la data de registre.                   | SARCAT_AL_ALTA        |  OP_INSERTAR_ASSENTAMENTS_ENTRADA
insertarAssentamentSortida        | Es registra l'assentament de sortida i retorna el número d'assentament assignat i la data de registre.                  | SARCAT_AL_ALTA        |  OP_INSERTAR_ASSENTAMENTS_SORTIDA
insertarAssentamentSafata         | Donada la informació d'assentaments d'entrada, els grava i retorna el número de registre de cadascun. Addicionalment comprova la validesa de la destinació externa respecte l'unitat de registre associada a l'assentament.                                                                                            | SARCAT_AL_ALTA        |  OP_INSERTAR_ASSENTAMENTS_SAFATA
insertarAssentamentPresortida     | Donada la informació X d'assentaments de presortida, els grava i retorna el número de registre de cadascun.             | SARCAT_AL_ALTA        |  OP_INSERTAR_ASSENTAMENTS_PRESORTIDA
numExp 							  | Permet modificar el número d'expedient prèviament assignat a un assentament d'entrada o sortida realitzat.              | SARCAT_AL_MODIFICACIO |  OP_CANVI_NUM_EXPEDIENT
getNumsRegistre                   | Permet obtenir un conjunt de números d'assentaments que són reservats per s@rcat de manera exclusiva pel Backoffice que fa la sol- licitud.                                                                                                                                                                             | SARCAT_AL_RESERVA     |  OP_GET_NUM_REGISTRE
cercaAssentamentsHist             | Permet obtenir totes les dades d'un assentament que ha passat pel repositori d'històrics d'assentaments de S@rcat.      | SARCAT_AP_HISTORIC    |  OP_CERCA_ASSENTAMENT_HISTORIC
baixaAssentament                  | Permet donar de baixa assentaments d'entrada, sortida o presortida prèviament realitzats.                               | SARCAT_AL_BAIXA       |  OP_BAIXA_ASSENTAMENTS
llistarTaulesMestres              | A partir d'una data concreta, s'obtenen totes les actualitzacions realitzades en les taules mestres de S@rcat a partir d'aquesta data.                                                                                                                                                                                   | SARCAT_AL_LLISTA_REG  |  OP_LLISTA_REG
llistarTaulaMestra                | Recuperació de codis o valors possibles per a un determinat concepte o taula mestra.                                    | SARCAT_AP_LLISTA      |  OP_LLISTA_TAULA_MESTRA

## Instal.lació i Configuració

### Instal.lació

Per tal d'instal·lar el mòdul de Sarcat es pot incloure automàticament a través de l'eina de suport al desenvolupament o bé afegir manualment en el pom.xml de l'aplicació la següent dependència:

```xml
<dependency>
    <groupId>cat.gencat.ctti</groupId>
    <artifactId>canigo.integration.sarcat</artifactId>
    <version>${canigo.integration.sarcat.version}</version>
</dependency>
```

A la [Matriu de Compatibilitats 3.6] (/canigo-download-related/matrius-compatibilitats/canigo-36/) es pot comprovar la versió del mòdul compatible amb la versió de Canigó utilitzada.

### Configuració

La configuració es realitza automàticament a partir de la eina de suport al desenvolupament.

Ubicació proposada: <PROJECT_ROOT>/src/main/resources/config/props/sarcat.properties

Propietat                              | Requerit | Descripció
-------------------------------------- | -------- | ----------
*.sarcat.webservice                     | Sí       | Url del WebService de Sarcat
*.sarcat.user                   		| No       | Usuari per a l'utilització del WebService de Sarcat
*.sarcat.password                 		| No       | Password per a l'utilització del WebService de Sarcat
*.sftp.url                              | No       | Url del SFTP de Sarcat. Obligatori si es vol utilitzar la consulta de Sarcat asincronament
*.sftp.username                         | No       | Usuari per a l'utilització del SFTP de Sarcat
*.sftp.password                         | No       | Password per a l'utilització del SFTP de Sarcat

## Utilització del Mòdul

### Exemple d'ús

Per a l'exemple cridarem directament als WebService de Sarcat des d'un controllador

**SARCATController.java**

Endpoint de l'aplicació que publica el servei de Sarcat, en aquest cas, publicarem un servei que realitzará la crida al servei de login

```java
	import org.openuri.Login;
import org.openuri.LoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cat.gencat.ctti.canigo.arch.integration.sarcat.exceptions.SarcatException;
import cat.gencat.ctti.canigo.arch.integration.sarcat.serveis.SarcatServices;
import es.tsystems.sarcat.schema.login.LoginInfo;

@RestController
@RequestMapping("/sarcat")
public class SARCATController {

  @Value("${sarcat.user}")
  private String sarcatUser;

  @Value("${sarcat.password}")
  private String sarcatPassword;

  /** sarcat services. */
  @Autowired
  private SarcatServices sarcatServices;

  @GetMapping(produces = { MediaType.APPLICATION_JSON_VALUE })
  public LoginResponse login() throws SarcatException {
    Login login = new org.openuri.ObjectFactory().createLogin();
    LoginInfo logginInfo = new es.tsystems.sarcat.schema.login.ObjectFactory().createLoginInfo();
    logginInfo.setPassword(sarcatPassword);
    logginInfo.setUser(sarcatUser);
    login.setLoginInfo(logginInfo);

    return sarcatServices.login(login);
  }


}
```