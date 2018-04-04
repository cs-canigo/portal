+++
date = "2018-04-04"
title = "Ús de propietats multientorn al Front-End d'una aplicació Canigó"
description = "En aquest HowTo s'explica com utilitzar propietats amb valor depenent de l'entorn al Front-End de l'aplicació"
section = "howtos"
categories = ["canigo"]
key = "ABRIL2018"
+++

### A qui va dirigit

Aquest how-to va dirigit a tots aquells desenvolupadors/arquitectes que desenvolupin una aplicació Canigó 3.2.

### Versió de Canigó

Els passos descrits en aquest document apliquen a la versió 3.2 del Framework Canigó.

### Introducció

Les aplicacions Canigó estan configurades per utilitzar propietats multientorn, propietats que el valor pot ser depenent de l'entorn on s'ha desplegat l'aplicació. 
Aquesta [funcionalitat multientorn](/canigo-documentacio-versions-3x-core/modul-configuracio/) només aplica al Back-End de l'aplicació que mitjançant la propietat de sistema "entorn" té la informació de l'entorn on s'ha desplegat.

El Front-End de l'aplicació no disposa d'aquesta informació i per tant ha de generar versions diferents del mateix codi per a cada entorn. Una solució per utilitzar la funcionalitat multientorn al Front-End s'explica al següent punt.

### Propietats MultiEntorn al Front-End

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

La millor opció per a que el Front-End pugui obtenir les propietats multientorn que sigui necessari seria que l'aplicació creï un endpoint específic, també protegit, que retorni únicament les propietats necessàries per al Front-End.

La primera vegada que la SPA sigui cridada, després d'obtenir el token JWT hauria de fer una crida a aquest endpoint per a obtenir aquestes variables.

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
	
D'aquesta manera si el Front-End utilitza la propietat: url.sgde i aquesta url és diferent a PRE i a PRO, al nostre fitxer de propietats hem de tenir:

	pre.url.sgde = http://preproduccio.sgde.intranet.gencat.cat/ServeisInvocacio/serveis/ServeisInvocacioV2?wsdl
	pro.url.sgde = http://sgde.intranet.gencat.cat/ServeisInvocacio/serveis/ServeisInvocacioV2?wsdl
	

