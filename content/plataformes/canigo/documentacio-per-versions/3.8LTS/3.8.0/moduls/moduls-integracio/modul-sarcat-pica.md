+++
date        = "2024-12-11"
title       = "SARCAT PICA"
description = "Serveis que ofereix la plataforma de Sarcat mitjançant la PICA i el seu connector nadiu."
sections    = "Canigó. Documentació Versió 3.8"
weight      = 9
+++

## Propòsit

Aquest mòdul permet consumir els diferents serveis que ofereix la plataforma de Sarcat mitjançant la PICA i el seu connector nadiu. El mòdul permet consumir els serveis oferts pels WebService amb peticions síncrones.

## Funcionalitats del connector

El connector proporciona accés a les següents operacions de Sarcat:

Operació Sarcat                   | Descripció Funcional | Modalitat PICA | Operació PICA
--------------------------------- | -------------------- | -------------- | -------------
consultaAssentaments              | Permet obtenir una relació d'assentaments, amb les dades bàsiques, que compleixin uns criteris de filtratge específics. | SARCAT_AL_CONSULTA    | OP_CONSULTA_ASSENTAMENTS
cercaAssentaments                 | Permet obtenir totes les dades d'un assentament concret.                                                                | SARCAT_AL_CONSULTA    |  OP_CERCA_ASSENTAMENTS
recollirAssentamentsSafataEntrada | Permet recollir assentaments de la safata d'entrada per incorporar-los a d'altres sistemes.                             | SARCAT_AL_CONSULTA    |  OP_RECOLLIR_ENTRADA
recollirAssentamentsSafataSortida | Permet recollir assentaments de la safata de sortida per incorporar-los a d'altres sistemes.                            | SARCAT_AL_CONSULTA    |  OP_RECOLLIR_SORTIDA
esPresortida                      | Conèixer si un assentament concret és una pre-sortida o una sortida.                                                    | SARCAT_AL_CONSULTA    |  OP_ES_PRESORTIDA
insertarAssentamentEntrada        | Es registra l'assentament d'entrada i retorna el número d'assentament assignat i la data de registre.                   | SARCAT_AL_ALTA        |  OP_INSERTAR_ASSENTAMENTS_ENTRADA
insertarAssentamentSortida        | Es registra l'assentament de sortida i retorna el número d'assentament assignat i la data de registre.                  | SARCAT_AL_ALTA        |  OP_INSERTAR_ASSENTAMENTS_SORTIDA
insertarAssentamentSafata         | Donada la informació d'assentaments d'entrada, els grava i retorna el número de registre de cadascun. Addicionalment comprova la validesa de la destinació externa respecte l'unitat de registre associada a l'assentament.                                                                                            | SARCAT_AL_ALTA        |  OP_INSERTAR_ASSENTAMENTS_SAFATA
insertarAssentamentPresortida     | Donada la informació X d'assentaments de presortida, els grava i retorna el número de registre de cadascun.             | SARCAT_AL_ALTA        |  OP_INSERTAR_ASSENTAMENTS_PRESORTIDA
numExp                            | Permet modificar el número d'expedient prèviament assignat a un assentament d'entrada o sortida realitzat.              | SARCAT_AL_MODIFICACIO |  OP_CANVI_NUM_EXPEDIENT
getNumsRegistre                   | Permet obtenir un conjunt de números d'assentaments que són reservats per s@rcat de manera exclusiva pel Backoffice que fa la sol- licitud.                                                                                                                                                                             | SARCAT_AL_RESERVA     |  OP_GET_NUM_REGISTRE
cercaAssentamentsHist             | Permet obtenir totes les dades d'un assentament que ha passat pel repositori d'històrics d'assentaments de S@rcat.      | SARCAT_AP_HISTORIC    |  OP_CERCA_ASSENTAMENT_HISTORIC
baixaAssentament                  | Permet donar de baixa assentaments d'entrada, sortida o presortida prèviament realitzats.                               | SARCAT_AL_BAIXA       |  OP_BAIXA_ASSENTAMENTS
llistarTaulesMestres              | A partir d'una data concreta, s'obtenen totes les actualitzacions realitzades en les taules mestres de S@rcat a partir d'aquesta data.                                                                                                                                                                                   | SARCAT_AL_LLISTA_REG  |  OP_LLISTA_REG
llistarTaulaMestra                | Recuperació de codis o valors possibles per a un determinat concepte o taula mestra.                                    | SARCAT_AP_LLISTA      |  OP_LLISTA_TAULA_MESTRA

## Instal.lació i Configuració

### Instal.lació

Per tal d'instal-lar el mòdul de Sarcat Pica es pot incloure automàticament a través de l'eina de suport al desenvolupament o bé afegir manualment en el pom.xml de l'aplicació la següent dependència:

```xml
  <properties>
    ...
    <canigo.integration.sarcat.pica.version>[3.0.0,3.1.0)</canigo.integration.sarcat.pica.version>
  </properties>
  <dependencies>
    ...
    <dependency>
      <groupId>cat.gencat.ctti</groupId>
      <artifactId>canigo.integration.sarcat.pica</artifactId>
      <version>${canigo.integration.sarcat.pica.version}</version>
    </dependency>
  </dependencies>
```

A la [Matriu de Compatibilitats](/plataformes/canigo/documentacio-per-versions/3.8LTS/3.8.0/moduls/compatibilitat-per-modul/) es pot comprovar la versió del mòdul compatible amb la versió de Canigó utilitzada.

### Configuració

La configuració es realitza automàticament a partir de la eina de suport al desenvolupament.

Ubicació proposada: <PROJECT_ROOT>/src/main/resources/config/props/sarcat.properties

Propietat                 | Requerit | Descripció
-------------------       | -------- | ----------
*.sarcat.urlPica          | Sí       | Url del WebService de Sarcat. Valor per defecte: http://preproduccio.pica.intranet.gencat.cat/pica_cataleg/AppJava/services/
*.sarcat.user             | Sí       | Usuari de Sarcat
*.sarcat.password         | Sí       | Password de l'usuari de Sarcat
*.sarcat.finalitat        | Sí       | Finalitat de l'ús del servei (TEST, PRODUCTIU...)
*.sarcat.nifEmisor        | Sí       | Nif de l'emissor
*.sarcat.nomEmisor        | Sí       | Nom de l'emissor
*.sarcat.nomFuncionari    | Sí       | Nom del funcionari
*.sarcat.nifFuncionari    | Sí       | Nif del funcionari
*.sarcat.emailFuncionari  | Sí       | Email del funcionari

Els valors de finalitat, urlPica, nifEmisor i nomEmisor s'han de consultar a la [OT PICA](http://transversals.ctti.intranet.gencat.cat/sol-pica/integracio/)

Aquest mòdul és dependent del [mòdul de la PICA](/plataformes/canigo/documentacio-per-versions/3.8LTS/3.8.0/moduls/moduls-integracio/modul-pica/) pel que també s'ha de configurar aquest.

## Utilització del Mòdul

### REST

Per a utilitzar aquest mòdul, cal crear un Controller i un Service:

**SarcatService.java**

Controller que publica les operacions disponibles per a qui hagi de consumir-les.

```java
import cat.gencat.ctti.canigo.arch.integration.sarcat.pica.SarcatConnector;
import cat.gencat.ctti.canigo.arch.integration.sarcat.pica.exceptions.SarcatException;
import net.gencat.scsp.esquemes.peticion.alta.SarcatAlAltaResponse;
import net.gencat.scsp.esquemes.peticion.common.OrdreCerca;
import net.gencat.scsp.esquemes.peticion.common.TipusAssentament;
import net.gencat.scsp.esquemes.peticion.consulta.SarcatAlConsultaResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import javax.inject.Inject;
import javax.inject.Named;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

@Service("sarcatClientService")
@Lazy
public class SarcatService {
  private static final Logger log = LoggerFactory.getLogger(SarcatService.class);

  @Inject
  @Named("sarcatService")
  private SarcatConnector sarcatConnector;

  public SarcatAlAltaResponse insertarAssentamentEntrada(
    Long numPK, String dataPresentacio, String dataDocument, String urCodi, String assumpte, String idPoblacio,
    Long idCentre, String nom, String cognom1, String cognom2, Long tipusDocumentIdentificatiu,
    String documentIdentificatiu, String observacions
  ) {
    try {
      var request = new net.gencat.scsp.esquemes.peticion.alta.ObjectFactory().createSarcatAlAltaRequest();
      var info = new net.gencat.scsp.esquemes.peticion.alta.ObjectFactory().createAssentamentEntradaInfo();

      request.setUrUsuari(urCodi);
      info.setAnyPK(Long.parseLong(new SimpleDateFormat("yyyy").format(new Date())));
      info.setNumPK(numPK);
      info.setDataPresentacio(dataPresentacio);
      info.setDataDocument(dataDocument);
      info.setCodiURPK(urCodi);
      info.setAssumpte(assumpte);
      info.setIdTipusTramesa(1);
      info.setIdPoblacioProc(idPoblacio);
      info.setIdPoblacioDest(idPoblacio);
      info.setIdCentreDestInterna(idCentre);
      info.setIdViaPresentacio(5);
      info.setIdSuportFisic(3L);
      info.setIdDocument(1L);
      info.setNom(nom);
      info.setCognom1(cognom1);
      info.setCognom2(cognom2);
      info.setTipusDocumentIdentificatiu(tipusDocumentIdentificatiu);
      info.setDocumentIdentificatiu(documentIdentificatiu);
      info.setObservacions(observacions);

      request.setAssentamentEntrada(List.of(info));

      return sarcatConnector.insertarAssentamentEntrada(request);
    } catch (SarcatException e) {
      log.error(e.getMessage(), e);
    }
    return null;
  }

  public List<SarcatAlConsultaResponse.Assentament> cercaAssentaments(String user) {
    try {
      var dateTimeFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
      var params = new net.gencat.scsp.esquemes.peticion.consulta.ObjectFactory().createAssentamentCercaParametresCerca();
      params.setDataInici(LocalDateTime.now().minusYears(10).format(dateTimeFormatter));
      params.setDataFinal(LocalDateTime.now().format(dateTimeFormatter));

      var cerca = new net.gencat.scsp.esquemes.peticion.consulta.ObjectFactory().createAssentamentCerca();
      cerca.setParametresCerca(params);
      cerca.setUrUsuari(user);
      cerca.setOrdreCerca(OrdreCerca.DATA_ALTA);
      cerca.setTipus(TipusAssentament.ENTRADA);
      cerca.setDescendent(true);

      var request = new net.gencat.scsp.esquemes.peticion.consulta.ObjectFactory().createSarcatAlConsultaRequest();
      request.setAssentamentCerca(cerca);
      return sarcatConnector.cercaAssentaments(request).getAssentament();
    } catch (SarcatException e) {
      log.error(e.getMessage(), e);
    }
    return null;
  }
}
```

**SarcatController.java**

Controller que publica les operacions disponibles per a qui hagi de consumir-les.

```java
import net.gencat.scsp.esquemes.peticion.alta.SarcatAlAltaResponse;
import net.gencat.scsp.esquemes.peticion.consulta.SarcatAlConsultaResponse;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.List;

@RestController
@RequestMapping("/sarcat")
public class SarcatClientController {
  @Inject
  @Named("sarcatClientService")
  private SarcatService sarcatService;

  @GetMapping(value ="insertarAssentamentEntrada", produces = { MediaType.APPLICATION_JSON_VALUE })
  public SarcatAlAltaResponse insertarAssentamentEntrada(
    Long numPK, String dataPresentacio, String dataDocument, String urCodi, String assumpte, String idPoblacio, Long idCentre, 
    String nom, String cognom1, String cognom2, Long tipusDocumentIdentificatiu, String documentIdentificatiu, String observacions
  ) {
    return sarcatService.insertarAssentamentEntrada(numPK, dataPresentacio, dataDocument, urCodi, assumpte, idPoblacio, idCentre, nom, cognom1,
      cognom2, tipusDocumentIdentificatiu, documentIdentificatiu, observacions);
  }

  @GetMapping(value ="cercaAssentaments", produces = { MediaType.APPLICATION_JSON_VALUE })
  public List<SarcatAlConsultaResponse.Assentament> cercaAssentaments(String user) {
    return sarcatService.cercaAssentaments(user);
  }
}
```
