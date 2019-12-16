+++
date        = "2019-12-16"
title       = "Error llibreria javassist amb Canigó 3.4 i Weblogic"
description = "Conflicte de versions de la llibreria javassist amb Canigó 3.4 i Weblogic"
sections    = "Canigó. Documentació versió 3.x"
weight      = 1
+++

## Introducció al problema

El desembre del 2019 es va reportar un problema en l'execució de consultes a base de dades utilitzant la capa JPA de Spring en una aplicació Canigó 3.2 amb Weblogic 12.1.3.0.0. L'error que es produeix és de tipus java.lang.ClassCastException una vegada realitzada la consulta a la base de dades. Aquest mateix error es pot produir a una aplicació Canigó 3.4

## Detall del problema

Canigó 3.4 utilitza la versió 5.3.13.Final de Hibernate en el seu mòdul de persistència JPA, aquesta versió de hibernate utilitza la versió 3.23.2-GA de la llibreria javassist. Per altre banda, al Weblogic incorpora la llibreria javassist amb una altre versió. Per exemple, a la versió de weblogic 12.1.3.0.0 incorpora la llibreria javassist versió 3.12.0.GA, per tant, al no coincidir amb la versió de Hibernate, pot donar errors de casteig.

Si iniciem una aplicació amb Canigó 3.4 a un weblogic 12.1.3.0.0 i executem una consulta a la base de dades utilitzant la capa JPA de Spring, una vegada executada la consulta a la base de dades, podem obtenir un error del estil:

```
2019-12-10 11:04:39 ERROR o.h.p.p.j.JavassistProxyFactory - HHH000142: Javassist Enhancement failed: <ENTITY>
java.lang.ClassCastException: <ENTITY>_$$_javassist_272 cannot be cast to javassist.util.proxy.Proxy
                at org.hibernate.proxy.pojo.javassist.JavassistProxyFactory.getProxy(JavassistProxyFactory.java:123)
                at org.hibernate.tuple.entity.AbstractEntityTuplizer.createProxy(AbstractEntityTuplizer.java:671)
                at org.hibernate.persister.entity.AbstractEntityPersister.createProxy(AbstractEntityPersister.java:4536)
                at org.hibernate.event.internal.DefaultLoadEventListener.createProxyIfNecessary(DefaultLoadEventListener.java:359)
                at org.hibernate.event.internal.DefaultLoadEventListener.proxyOrLoad(DefaultLoadEventListener.java:274)
                at org.hibernate.event.internal.DefaultLoadEventListener.doOnLoad(DefaultLoadEventListener.java:121)
                at org.hibernate.event.internal.DefaultLoadEventListener.onLoad(DefaultLoadEventListener.java:89)
                at org.hibernate.internal.SessionImpl.fireLoad(SessionImpl.java:1129)
                at org.hibernate.internal.SessionImpl.internalLoad(SessionImpl.java:1022)
                at org.hibernate.type.EntityType.resolveIdentifier(EntityType.java:639)
                at org.hibernate.type.EntityType.resolve(EntityType.java:431)
                at org.hibernate.engine.internal.TwoPhaseLoad.doInitializeEntity(TwoPhaseLoad.java:154)
                at org.hibernate.engine.internal.TwoPhaseLoad.initializeEntity(TwoPhaseLoad.java:128)
                at org.hibernate.loader.Loader.initializeEntitiesAndCollections(Loader.java:1133)
                at org.hibernate.loader.Loader.processResultSet(Loader.java:992)
                at org.hibernate.loader.Loader.doQuery(Loader.java:930)
                at org.hibernate.loader.Loader.doQueryAndInitializeNonLazyCollections(Loader.java:336)
                at org.hibernate.loader.Loader.doList(Loader.java:2617)
                at org.hibernate.loader.Loader.doList(Loader.java:2600)
                at org.hibernate.loader.Loader.listIgnoreQueryCache(Loader.java:2429)
                at org.hibernate.loader.Loader.list(Loader.java:2424)
                at org.hibernate.loader.hql.QueryLoader.list(QueryLoader.java:501)
                at org.hibernate.hql.internal.ast.QueryTranslatorImpl.list(QueryTranslatorImpl.java:371)
                at org.hibernate.engine.query.spi.HQLQueryPlan.performList(HQLQueryPlan.java:216)
                at org.hibernate.internal.SessionImpl.list(SessionImpl.java:1326)
                at org.hibernate.internal.QueryImpl.list(QueryImpl.java:87)
                at org.hibernate.jpa.internal.QueryImpl.list(QueryImpl.java:606)
                at org.hibernate.jpa.internal.QueryImpl.getSingleResult(QueryImpl.java:529)
                at org.hibernate.jpa.criteria.compile.CriteriaQueryTypeQueryAdapter.getSingleResult(CriteriaQueryTypeQueryAdapter.java:54)
                at org.springframework.data.jpa.repository.query.JpaQueryExecution$SingleEntityExecution.doExecute(JpaQueryExecution.java:206)
                at org.springframework.data.jpa.repository.query.JpaQueryExecution.execute(JpaQueryExecution.java:85)
                at org.springframework.data.jpa.repository.query.AbstractJpaQuery.doExecute(AbstractJpaQuery.java:116)
                at org.springframework.data.jpa.repository.query.AbstractJpaQuery.execute(AbstractJpaQuery.java:106)
                at org.springframework.data.repository.core.support.RepositoryFactorySupport$QueryExecutorMethodInterceptor.doInvoke(RepositoryFactorySupport.java:483)
                at org.springframework.data.repository.core.support.RepositoryFactorySupport$QueryExecutorMethodInterceptor.invoke(RepositoryFactorySupport.java:461)
                at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:179)
                at org.springframework.transaction.interceptor.TransactionInterceptor$1.proceedWithInvocation(TransactionInterceptor.java:99)
                at org.springframework.transaction.interceptor.TransactionAspectSupport.invokeWithinTransaction(TransactionAspectSupport.java:282)
                at org.springframework.transaction.interceptor.TransactionInterceptor.invoke(TransactionInterceptor.java:96)
                at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:179)
                at org.springframework.dao.support.PersistenceExceptionTranslationInterceptor.invoke(PersistenceExceptionTranslationInterceptor.java:136)
                at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:179)
                at org.springframework.data.jpa.repository.support.CrudMethodMetadataPostProcessor$CrudMethodMetadataPopulatingMethodInterceptor.invoke(CrudMethodMetadataPostProcessor.java:133)
                at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:179)
                at org.springframework.aop.interceptor.ExposeInvocationInterceptor.invoke(ExposeInvocationInterceptor.java:92)
                at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:179)
                at org.springframework.data.repository.core.support.SurroundingTransactionDetectorMethodInterceptor.invoke(SurroundingTransactionDetectorMethodInterceptor.java:57)
                at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:179)
                at org.springframework.aop.framework.JdkDynamicAopProxy.invoke(JdkDynamicAopProxy.java:213)
                at com.sun.proxy.$Proxy468.findByCodi(Unknown Source)
```

## Solució al problema

Per a resoldre el problema és necessari indicar-li al weblogic que no utilitzi la llibreria javassist que incorpora el propi weblogic, sinó que utilitzi la llibreria javassist que porta com a dependència la pròpia aplicació.

Per això, és necessari afegir en el fitxer *weblogic.xml* dins del element root, el tag:
```
<prefer-application-packages>
    <package-name>javassist</package-name>        
</prefer-application-packages>
```

## Conclusió

Si estem treballant amb una aplicació Canigó 3.2 o superior i l'aplicació s'ha de desplegar a un weblogic, és necessari revisar que les consultes a la base de dades a partir de la capa de JPA de Spring s'executen correctament o hi ha conflicte amb la llibreria javassist. Si hi ha conflicte, només cal indicar-li al weblogic que utilitzi la versió de javasssist de l'aplicació i no la del weblogic al fitxer *weblogic.xml*

## Referència

- [Stackoverflow](https://stackoverflow.com/questions/22481540/hibernate-exception-javassist-0-cannot-be-cast-to-javassist-util-proxy-proxy)

- [Errors coneguts Canigó 3.2]()

Si necessiteu més informació, podeu obrir tiquet via [JIRA CSTD](https://cstd.ctti.gencat.cat/jiracstd/projects/CAN) o, en cas de no disposar de permisos d’accés, enviar un correu a la bústia del CS Canigó (oficina-tecnica.canigo.ctti@gencat.cat).
