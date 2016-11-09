+++
date        = "2015-03-27T09:26:16+01:00"
title       = "JPA"
description = "Mòdul de persistència de Base de Dades."
sections    = "Canigó. Documentació versió 3.x"
weight      = 2
+++

## Propòsit

Aquest mòdul proporciona accés amb transaccionalitat amb la BBDD, permetent la execució d'operacions dintre de transaccions.

## Instal.lació i Configuració

### Instal.lació

Per tal d'instal-lar el mòdul d'hibernate fitxers es pot incloure automàticament a través de l'eina de suport al desenvolupament o bé afegir manualment en el pom.xml de l'aplicació la següent dependència:

```
<canigo.persistence.jpa.version>[1.1.0,1.2.0)</canigo.persistence.jpa.version>

<dependency>
 <groupId>cat.gencat.ctti</groupId>
 <artifactId>canigo.persistence.jpa</artifactId>
 <version>${canigo.persistence.jpa.version}</version>
</dependency>
```

### Configuració

La configuració es realitza automàticament a partir de la eina de suport al desenvolupament.

L'eina de desenvolupament genera automàticament el fitxer de propietats necessari per a la configuració del servei.

Ubicació proposada: <PROJECT_ROOT>/src/main/resources/config/props/jpa.properties

Propietat | Requerit | Descripció
--------- | -------- | ----------
*.persistence.database | Si | Sistema de base de dades al que es conectarà.
*.persistence.dialect | Si | El nom de classe de que permet a JPA generar SQL per a una base de dades relacional en particular: <br> - org.hibernate.dialect.Oracle9Dialect <-- Versió 9<br> - org.hibernate.dialect.Oracle10gDialect <-- Versió 10g<br> - org.hibernate.dialect.Oracle8iDialect <-- Versió 8i<br> - org.hibernate.dialect.MySQL5Dialect <-- Versió 5<br> - org.hibernate.dialect.MySQLDialect <-- Versions < 5<br> - org.hibernate.dialect.HSQLDialect<br> - org.hibernate.dialect.PostgreSQLDialect
*.persistence.showSQL | No | Escriu totes les sentències SQL al log aplicatiu.<br> Per defecte: true
*.persistence.generateDdl |No | Exporta el DDL (Data Definition Language) a la BD després de que l'EntityManagerFactory s'inicialitzi, creant/actualitzant les taules.<br> Valor per defecte: false
*.persistence.hibernate.connection.release_mode | No | Serveix per especificar quan Hibernate ha d'alliberar les connexions JDBC. Una connexió JDBC es manté fins que la sessió es tancada explícitament o desconnectat per defecte. Per a un datasource JTA s'hauria de seleccionar after_statement, i per non-JTA after_transaction. En mode auto, es seleccionarà after_statement per a JTA i CMT, i afte_transaction per JDBC.<br> Per defecte: auto
*.persistence.hibernate.connection.autocommit | No | Habilita l'autocommit per a connexions pooled JDBC
*.persistence.hibernate.generate_statistics | No | Hibernate recopila informació útil per a tunning.<br> Per defecte: false
*.persistence.hibernate.jdbc.use_scrollable_resultset | No | Habilita l'ús de JDBC2 scrollable resultsets a Hibernate.<br> Per defecte: true

## Utilització del Mòdul

###  JSF

Per a utilitzar aquest mòdul, cal crear un bean i una jsf:

**crudBean.java**

```java
@Component("crudBean")
@Lazy
public class CRUDBean {

	private String name;
	private String password;
	private UsersDAO<User,Integer> dao = null;
	private User user = null;
	private DataModel model = null;
	private static final Log logger = LogFactory.getLog(CRUDBean.class);

	@Autowired
	public void setDao(UsersDAO<User,Integer> dao) {
		this.dao = dao;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name){
		this.name = name;
	}

	@Transactional(propagation=Propagation.REQUIRED)
	public void save(){
		User user = new User();
		user.setName(this.getName());
		user.setPassword(this.getPassword());
		dao.save(user);
	}

	public String update(){
		logger.debug("Init update");
		User tmpUser = dao.get(this.user.getId());
		logger.debug("Content: " + tmpUser);
		tmpUser.setName(getName());
		tmpUser.setPassword(getPassword());
		dao.update(tmpUser);
		dao.flush();
		logger.debug("End update");
		return "item_list";
	}

	public User getUser(){
		return user;
	}

	public DataModel getUsers(){
		model = new ListDataModel(dao.findByNamedQuery("findAllOrderBy"));
		return model;
	}

	public String detailSetup() {
		user = (User)model.getRowData();
        return "item_detail";
    }
}
```

**crud.jsf**

```java
<h:form id="beanValidatorForm">
     <rich:panel style="width:40%">
	<f:facet name="header">
	     <h:outputText value="#{msg.crudNewUser}" />
	</f:facet>
	<h:panelGrid columns="3">
	     <h:outputText value="#{msg.crudName}:" />
              <h:inputText value="#{crudBean.name}" id="name"/>
	     <rich:message for="name" />
	     <h:outputText value="#{msg.crudPassword}:" />
	     <h:inputText value="#{crudBean.password}" id="password"/>
              <rich:message for="password" />
	     <f:facet name="footer">
	          <a4j:commandButton value="#{msg.crudSave}" action="#{crudBean.save}" reRender="userList" />
	     </f:facet>
	</h:panelGrid>
     </rich:panel>
</h:form>
```

### STRUTS+TAGLIBS

Per a utilitzar el mòdul cal crear una Acció i una JSP:

**persistence.xml**

```
<persistence xmlns="http://java.sun.com/xml/ns/persistence"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://java.sun.com/xml/ns/persistence http://java.sun.com/xml/ns/persistence/persistence_2_0.xsd" version="1.0">

     <persistence-unit name="canigo" transaction-type="RESOURCE_LOCAL">
          <provider>org.hibernate.ejb.HibernatePersistence</provider>
          <non-jta-data-source>jdbc/formacioDS</non-jta-data-source>

          <properties>
               <property name="hibernate.dialect" value="org.hibernate.dialect.H2Dialect"/>
          </properties>
     </persistence-unit>

</persistence>
```

**CrudExempleAction.java**

```java
public class CrudExempleAction extends DispatchActionSupport {

	private static final Log logger = LogFactory.getLog(CrudExempleAction.class);
	private final String FORWARD_INICI = "success";
	private final String FORWARD_SHOW_ELEMENT = "mostrar";
	private final String FORWARD_ERROR = "error";
	private ValueListActionHelper valueListActionHelper;
	private CrudExempleBO crudExempleBO;

	/**
	 * Mètode que es crida pel reqCode=inici
	 * @param mapping ActionMapping
	 * @param form ActionForm
	 * @param request HttpServletRequest
	 * @param response HttpServletResponse
	 * @return ActionForward
	 * @throws Exception exception
	 */
	public ActionForward inici(ActionMapping mapping, ActionForm form, HttpServletRequest request,
		HttpServletResponse response) throws Exception {
		logger.info("[CrudExempleAction][Inici] - Inici");
		valueListActionHelper.search(mapping, form, request, response);
		logger.info("[CrudExempleAction][Inici] - Fi");
		return mapping.findForward(FORWARD_INICI);
	}

	/**
	 * Mètode que es crida pel reqCode=desar
	 * @param mapping ActionMapping
	 * @param form ActionForm
	 * @param request HttpServletRequest
	 * @param response HttpServletResponse
	 * @return ActionForward
	 * @throws Exception exception
	 */
	public ActionForward desar(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		TbEntitats entitat = null;

		try {
			logger.info("[CrudExempleAction][desar] - Inici");

			SpringBindingActionForm springBindingActionForm = (SpringBindingActionForm) form;
			CrudExemplePojo pojoForm = (CrudExemplePojo)springBindingActionForm.getTarget();

			entitat = new TbEntitats();
			entitat.setNom(pojoForm.getNom());
			entitat.setTelefon(new Long(pojoForm.getTelefon()));
			entitat.setAdreca(pojoForm.getAdreca());
			crudExempleBO.addEntitat(entitat);

			valueListActionHelper.search(mapping, form, request, response);
			logger.info("[CrudExempleAction][desar] - Fi");
			return mapping.findForward(FORWARD_INICI);
		} catch (Exception e) {
			e.printStackTrace();
			return mapping.findForward(FORWARD_ERROR);
		}
	}
}
```  

**CrudExempleBOImpl**

```java
public class CrudExempleBOImpl implements CrudExempleBO {

	private UniversalHibernateDAO hibernateDAO;

	public Long addEntitat(TbEntitats entitat) throws Exception {

		TbEntitats vo = new TbEntitats();
		BeanUtils.copyProperties(vo, entitat);
		Long id = (Long)hibernateDAO.save(vo);
		hibernateDAO.flush();
		return id;
	}
}
```
