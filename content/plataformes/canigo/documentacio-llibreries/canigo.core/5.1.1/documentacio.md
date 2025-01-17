+++
date        = "2024-09-30"

title       = "Documentació"
description = "Documentació canigo.core 5.1.1"
sections    = "canigo-fwk-docs"
weight		= 3
+++

## Propòsit

Llibreria amb funcionalitats globals, transversals i core a centralitzar.

## Funcionalitats

### Funcionalitat de configuració

A la interficie *cat.gencat.ctti.canigo.arch.core.config.ICustomPropertyPlaceHolderConfigurer* i a la seva implementació *cat.gencat.ctti.canigo.arch.core.config.CustomPropertyPlaceholderConfigurer* s'ofereix la funcionalitat de càrrega de propietats per entorn.

A la utilitat *cat.gencat.ctti.canigo.arch.core.config.YamlPropertiesUtils* ofereix utilitats per la càrrega de propietats en format yml.


### Exceptions core

S'ofereixen les següents "exceptions" per a poder extendre:

- *cat.gencat.ctti.canigo.arch.core.exceptions.BaseException*: Exception base de tipus checked. Conté el missatge de l'exception i objecte de tipus *cat.gencat.ctti.canigo.arch.core.exceptions.ExceptionDetails*  amb el detall de l'exception.

- *cat.gencat.ctti.canigo.arch.core.exceptions.BusinessException*: Exception de negoci de tipus checked.

- *cat.gencat.ctti.canigo.arch.core.exceptions.CoreException*: Exception core de tipus unchecked.

- *cat.gencat.ctti.canigo.arch.core.exceptions.ModuleException*: Exception de mòdul de tipus checked.

- *cat.gencat.ctti.canigo.arch.core.exceptions.RuntimeModuleException*: Exception que indica que s'ha produit en temps d'execució de tipus unchecked.

- *cat.gencat.ctti.canigo.arch.core.exceptions.WrappedCheckedException*: Encapsula una exception de tipus checked a una unchecked.


### I18N

S'ofereix la interficie *cat.gencat.ctti.canigo.arch.core.i18n.I18nResourceBundleMessageSource* i la implementació *cat.gencat.ctti.canigo.arch.core.i18n.CustomResourceBundleMessageSource* per a obtenir els missatges de l'aplicació internacionalitzats.

### Informació dels mòduls

S'ofereix la interficie *cat.gencat.ctti.canigo.arch.core.services.info.InfoModulesLoadedService* i la implementació *cat.gencat.ctti.canigo.arch.core.services.info.impl.InfoModulesLoadedServiceImpl* per a obtenir informació dels mòduls carregats a l'aplicació.

### Utils

S'ofereixen les següents utilitats:

- *cat.gencat.ctti.canigo.arch.core.utils.CoreUtils*: Amb utilitats globals, transversals o core, com per exemple, obtenir el nom de la màquina, obtenir el locale o obtenir el nom de la instància.

- *cat.gencat.ctti.canigo.arch.core.utils.JacksonUtil*: Amb utilitats pel tractament amb JSONs.

### Generador de identificadors

S'ofereix la interficie *cat.gencat.ctti.canigo.arch.core.uuid.UUIDService* i la implementació *cat.gencat.ctti.canigo.arch.core.uuid.impl.UUIDServiceImpl* per a la generació de identificadors únics.


