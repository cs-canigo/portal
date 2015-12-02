+++
date        = "2015-03-19T17:03:30+01:00"
title       = "SARCAT"
description = "Serveis que ofereix la plataforma de Sarcat mitjançant la PICA i el seu connector nadiu."
section     = "Documentació versió 3.x"
weight      = 13
+++

## Propòsit

Aquest mòdul permet consumir els diferents serveis que ofereix la plataforma de Sarcat mitjançant la PICA i el seu connector nadiu. El mòdul permet consumir els serveis oferts pels WebService amb peticions síncrones.

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

Per tal d'instal-lar el mòdul de Sarcat es pot incloure automàticament a través de l'eina de suport al desenvolupament o bé afegir manualment en el pom.xml de l'aplicació la següent dependència:

```
<canigo.integration.sarcat.pica.version>[1.1.0,1.2.0)</canigo.integration.sarcat.pica.version>

<dependency>
    <groupId>cat.gencat.ctti</groupId>
    <artifactId>canigo.integration.sarcat.pica</artifactId>
    <version>${canigo.integration.sarcat.pica.version}</version>
</dependency>
```

### Configuració

La configuració es realitza automàticament a partir de la eina de suport al desenvolupament.

Ubicació proposada: <PROJECT_ROOT>/src/main/resources/config/props/sarcat.properties

Propietat           | Requerit | Descripció
------------------- | -------- | ----------
*.sarcat.webservice | Sí       | Url del WebService de Sarcat. Valor per defecte: http://preproduccio.pica.gencat.intranet/pica_cataleg/AppJava/services/
*.sarcat.user       | Sí       | Usuari de Sarcat
*.sarcat.password   | Sí       | Password de l'usuari de Sarcat
*.sarcat.finalitat  | Sí       | Finalitat de l'ús del servei (TEST, PRODUCTIU...)

## Utilització del Mòdul

### JSF

Per a utilitzar el mòdul és necessari:

* Crear un managed bean de JSF que contingui la lògica d'invocació al servei de SARCAT.
* Pàgina JSF per a realitzar la invocació al managed bean.

**SarcatPicaBean.java**

Managed Bean de JSF que gestiona la crida al servei de la PICA.

En aquest bean es pot veure:

* Inyecció del servei de SARCAT via annotacions (@Autowired) de Spring.
* Inyecció del servei d'internacionaliztació via annotacions (@Autowired) de Spring.
* Inserció del missatge de resultat de l'operació que posteriorment sera recuperat pel formulari JSF.

```java
/**
 * Classe d'exemple d'invocació al servei de SARCAT
 *
 * @author cscanigo
 *
 */
@Component("sarcatPicaBean")
@Lazy
public class SarcatPicaBean {

    private static final Log log = LogFactory.getLog(SarcatBean.class);

    @Autowired
    private SarcatConnector sarcatConnector;
    @Autowired
    private I18nResourceBundleMessageSource resource;

    public void cercaAssentament() {
        log.debug("SarcatPicaBean START");

        FacesMessage facesMessage = null;

        try {
                Assert.notNull(sarcatConnector);

                SarcatAlConsultaRequestDocument document = SarcatAlConsultaRequestDocument.Factory.newInstance();
                SarcatAlConsultaRequest request = document.addNewSarcatAlConsultaRequest();

                AssentamentCerca cerca = request.addNewAssentamentCerca();
                ParametresCerca params =  cerca.addNewParametresCerca();
                params.setDataInici("09/03/2011");
                params.setDataFinal("10/03/2011");
                cerca.setParametresCerca(params);
                cerca.setUrUsuari("0001");
                cerca.setOrdreCerca(OrdreCerca.DATA_ALTA);
                cerca.setTipus(TipusAssentament.ENTRADA);
                   cerca.setDescendent(true);

                SarcatAlConsultaResponse resposta = sarcatConnector.cercaAssentaments(document).getSarcatAlConsultaResponse();

            if (resposta.getError().getCodi() != 0) {
                log.error("llistat error : " + resposta.getError().getCodi()    + " " + resposta.getError().getDescripcio());
                facesMessage = new FacesMessage(FacesMessage.SEVERITY_ERROR, resource.getMessage("sarcatError")
                        + resposta.getError().getCodi(), null);
                FacesContext.getCurrentInstance().addMessage("sarcatForm", facesMessage);
            } else {
                log.debug("long retorn : " + resposta.getAssentamentArray().length);
                facesMessage = new FacesMessage(FacesMessage.SEVERITY_INFO, resource.getMessage("sarcatSuccess") + " = "
                        + resposta.getAssentamentArray().length, null);
                FacesContext.getCurrentInstance().addMessage("sarcatForm", facesMessage);
            }

        } catch (SarcatException e) {
            log.error("Error en SarcatReleaseTest.test1 " + e.getMessage());
            facesMessage = new FacesMessage(FacesMessage.SEVERITY_ERROR, resource.getMessage("sarcatError") + e.getMessage(), null);
            FacesContext.getCurrentInstance().addMessage("sarcatForm", facesMessage);
        }
        log.debug("SarcatPicaBean FINISH");
    }

}
```

**sarcat.jsf**

Invocació del métode "execute" del managed bean de JSF definit anteriorment com a "sarcatBean". El Tag message mostrarà el resultat de la crida (veure FacesContext.getCurrentInstance().addMessage("sapForm"....).

```
<h:form id="sarcatForm">
   <h:panelGrid columns="1">
      <h:commandButton value="#{msg.canigoSubmit}" action="#{sarcatPicaBean.execute}" />
      <h:message for="sarcatForm" infoStyle="color: green;" errorStyle="color: red;" />
   </h:panelGrid>
</h:form>
```
