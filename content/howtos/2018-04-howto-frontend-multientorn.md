+++
date = "2018-04-04"
title = "Configuració multi-entorn a una SPA amb backend Canigó"
description = "En aquest HowTo s'explica com aplicar una configuració multi-entorn per una SPA amb un backend Canigó"
section = "howtos"
categories = ["canigo", "sic"]
key = "ABRIL2018"
+++

### A qui va dirigit

Aquest how-to va dirigit a tots aquells desenvolupadors/arquitectes que desenvolupin una aplicació Canigó 3.2 amb una SPA per la part de frontend.

### Versió de Canigó

Els passos descrits en aquest document apliquen a la versió 3.2 del Framework Canigó.

### Introducció

Les aplicacions Canigó estan configurades per utilitzar propietats multi-entorn. Això vol dir que les propietats prenen un valor o un altre depenent de l'entorn on s'ha desplegat l'aplicació.
Aquesta funcionalitat de [configuració multi-entorn](/canigo-documentacio-versions-3x-core/modul-configuracio/) només aplica al backend de l'aplicació, el qual mitjançant la propietat de sistema "entorn" obté la informació específica de l'entorn on s'ha desplegat.

El frontend de l'aplicació (típicament SPAs) no disposa d'aquesta informació, i per tant, si no s'aplica alguna solució per configuració multi-entorn cal generar versions diferents per a cada entorn.

### Solució de configuració multi-entorn 

Canigó ofereix l'endpoint **/api/info/properties** que retorna totes les propietats de l'aplicació per a l'entorn actual. 

<span style="color:red">Aquest endpoint s'ha de protegir o bloquejar en entorns productius</style>

	@RestController
	@RequestMapping("/info/properties")
	public class InfoPropertiesController {

		@Autowired
		private ICustomPropertyPlaceHolderConfigurer propertyConfigurer;

		@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
		public Map<String, String> getInfoPropertiesLoaded() {
			return propertyConfigurer.getResolvedProps();
		}
	}

La millor opció per a que el frontend pugui obtenir les propietats multi-entorn que siguin necessaries, seria que l'aplicació exposés un endpoint específic, també protegit, que retorni únicament les propietats necessàries pel frontend.

La primera vegada que la SPA es carregui, després d'obtenir el token JWT prèvia autenticació, hauria de fer una crida a aquest endpoint per a obtenir la configuració.

	@RestController
	@RequestMapping("/info/frontendProperties")
	public class InfoFrontendPropertiesController {

		@Autowired
		private ICustomPropertyPlaceHolderConfigurer propertyConfigurer;

		@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
		public Map<String, String> getInfoFrontendPropertiesLoaded() {
			Map<String, String> frontendProperties = propertyConfigurer.getResolvedProps();

			//FILTRAR frontendProperties i DEIXAR NOMÉS LES QUE NECESSITI EL FRONT-END

			 return frontendProperties;
		}
	}
	
Per exemple, si el frontend utilitzés la propietat: url.sgde i aquesta url és diferent a PRE i a PRO, al nostre fitxer de propietats hauríem de tenir:

	pre.url.sgde = http://preproduccio.sgde.intranet.gencat.cat/ServeisInvocacio/serveis/ServeisInvocacioV2?wsdl
	pro.url.sgde = http://sgde.intranet.gencat.cat/ServeisInvocacio/serveis/ServeisInvocacioV2?wsdl
	
Com a informació addicional, per a configuracions amb informació sensible es recomana que s'injectin via variables d'entorn enlloc d'estar en fitxers de propietats dins el codi font.

