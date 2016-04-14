+++
date        = "2015-01-24T17:11:42+01:00"
title       = "Docker Shibboleth IDP"
description = ""
section     = "Documentació"
taxonomies  = []
toc 		= false
weight 		= 1
+++

<style>
	div.logos{clear:both;}
	#logo-shibboleth{width:30%!important;}
	#logo-docker{width:25%!important; margin-left:5%;}
</style>

<div class="logos"> 

<img id="logo-shibboleth" src="data:image/png;base64,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">

<img id="logo-docker" src="data:image/png;base64,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" />

</div>

## Objectiu

* Donar una resposta a l'autenticació d'aplicacions a Cloud Públic, que s'integri amb l'Active Directori Corporatiu

* Tecnològicament s'opta per containeritzar la solució, per facilitat de la configuració, proves i portabilitat de la solució

## Imatges utilitzades:

- Docker Identity Provider - IdP (servidor): https://github.com/jtgasper3/docker-shibboleth-idp
- Docker Service Provider - SP (client): https://hub.docker.com/r/jtgasper3/centos-shibboleth-sp/

## IdP - Identity Provider (servidor)

1. Construcció de la imatge a partir del projecte anterior:

		$ docker build -t shibboleth-idp . 

	NOTA: abans de crear la imatge, tenir present el "host" que resoldrà el contenidor que arrenqui l'IDP. Paràmetre: -Didp.host.name=localhost

1. Per a personalitzar l'entorn IDP, és necessari arrencar el contenidor a partir de la imatge anterior amb un volum compartit amb el host per a poder recuperar els directoris de configuració que ens interessen.

		$ docker run -d -p 443:443 -p 8443:8443 --name shibboleth-idp -v /home/shibboleth/idp/conf:/external-mount shibboleth-idp

	Mentre no es disposi de contenidors i balancejadors amb IP i DNS assignats, pot ser necessari afegir els hosts a resoldre amb el flag --add-host de Docker. 

1. Copiar els directoris que ens interessen del contenidor i que es troben a /opt/shibboleth-idp (conf, credentials, messages, metadata, views, webapp). Amb aquests directoris podrem personalitzar la nostra aplicació IDP

		$ docker exec shibboleth-idp cp -R /opt/shibboleth-idp/conf/ /external-mount
		$ docker exec shibboleth-idp cp -R /opt/shibboleth-idp/credentials/ /external-mount
		$ docker exec shibboleth-idp cp -R /opt/shibboleth-idp/messages/ /external-mount
		$ docker exec shibboleth-idp cp -R /opt/shibboleth-idp/metadata/ /external-mount
		$ docker exec shibboleth-idp cp -R /opt/shibboleth-idp/views/ /external-mount
		$ docker exec shibboleth-idp cp -R /opt/shibboleth-idp/webapp/ /external-mount

1. S'ha de modificar el fitxer /container_scripts/import.sh dins el projecte "Docker Identity Provider - IdP" per a que importi la webapp i messages, que no estan inclosos.


1. Fitxers de configuració i dades de configuració clau:

	1. **/conf/idp.properties**

		- idp.entityID= https://[host]/idp/shibboleth

	1. **/conf/metadata-providers.xml**, amb el mecanisme que es vulgui per a recuperar les dades dels SP. Per exemple, per http amb filesystem backup:

		    <MetadataProvider
                id="gencatMetadata"
                xsi:type="FileBackedHTTPMetadataProvider"
                metadataURL="http://[host]/sp-metadata.xml"
                backingFile="%{idp.home}/metadata/sp-metadata.xml">
    		</MetadataProvider>

    	Si l'entorn on es posen els contenidors no té visibilitat directe a internet, es pot configurar un proxyhost i proxyport per a recuperar el fitxer de metadades. Exemple:


		    <MetadataProvider
                id="gencatMetadata"
                xsi:type="FileBackedHTTPMetadataProvider"
                metadataURL="http://[host]/sp-metadata.xml"
                backingFile="%{idp.home}/metadata/sp-metadata.xml"
    			proxyHost="100.64.227.11"
	            proxyPort="3128"
	            >
    		</MetadataProvider>

	1. **/conf/attribute-resolver.xml**

		    <resolver:AttributeDefinition id="employeeId" xsi:type="ad:PrincipalName">
		        <resolver:AttributeEncoder xsi:type="enc:SAML1String" name="urn:mace:dir:attribute-def:employeeId" encodeType="false" />
		        <resolver:AttributeEncoder xsi:type="enc:SAML2String" name="urn:oid:0.9.2342.19200300.100.1.1" friendlyName="employeeId" encodeType="false" />
		    </resolver:AttributeDefinition>

		    <resolver:AttributeDefinition id="mail" xsi:type="ad:Simple" sourceAttributeID="mail">
		        <resolver:Dependency ref="myLDAP" />
		        <resolver:AttributeEncoder xsi:type="enc:SAML1String" name="urn:mace:dir:attribute-def:mail" encodeType="false" />
		        <resolver:AttributeEncoder xsi:type="enc:SAML2String" name="urn:oid:0.9.2342.19200300.100.1.3" friendlyName="mail" encodeType="false" />
		    </resolver:AttributeDefinition>

		    <resolver:AttributeDefinition id="CODIINTERN" xsi:type="ad:Simple" sourceAttributeID="sAMAccountName">
		        <resolver:Dependency ref="myLDAP" />
		        <resolver:AttributeEncoder xsi:type="enc:SAML1String" name="urn:mace:dir:attribute-def:sAMAccountName" encodeType="false" />
		        <resolver:AttributeEncoder xsi:type="enc:SAML2String" name="urn:oid:0.9.2342.19200300.100.1.99" friendlyName="CODIINTERN" encodeType="false" />
		    </resolver:AttributeDefinition>

		    <resolver:AttributeDefinition id="UNITAT_MAJOR" xsi:type="ad:Simple" sourceAttributeID="department">
		        <resolver:Dependency ref="myLDAP" />
		        <resolver:AttributeEncoder xsi:type="enc:SAML1String" name="urn:mace:dir:attribute-def:department" encodeType="false" />
		        <resolver:AttributeEncoder xsi:type="enc:SAML2String" name="urn:oid:0.9.2342.19200300.100.1.2" friendlyName="UNITAT_MAJOR" encodeType="false" />
		    </resolver:AttributeDefinition>

		    <resolver:AttributeDefinition id="UNITAT_MENOR" xsi:type="ad:Simple" sourceAttributeID="company">
		        <resolver:Dependency ref="myLDAP" />
		        <resolver:AttributeEncoder xsi:type="enc:SAML1String" name="urn:mace:dir:attribute-def:company" encodeType="false" />
		        <resolver:AttributeEncoder xsi:type="enc:SAML2String" name="urn:oid:0.9.2342.19200300.100.1.98" friendlyName="UNITAT_MENOR" encodeType="false" />
		    </resolver:AttributeDefinition>

		    <resolver:AttributeDefinition id="GICAR" xsi:type="ad:Template">
		        <resolver:Dependency ref="employeeId" />
		        <resolver:Dependency ref="mail" />
		        <resolver:Dependency ref="CODIINTERN" />
		        <resolver:Dependency ref="UNITAT_MAJOR" />
		        <resolver:Dependency ref="UNITAT_MENOR" />
		        <resolver:AttributeEncoder xsi:type="enc:SAML2String" name="https://gencat.cat/GICAR" friendlyName="GICAR" />
		        <ad:Template>
		          <![CDATA[
		               CODIINTERN=${CODIINTERN};NIF=${employeeId};EMAIL=${mail};UNITAT_MAJOR=${UNITAT_MAJOR};UNITAT_MENOR=${UNITAT_MENOR}
		          ]]>
		        </ad:Template>
		        <ad:SourceAttribute>employeeId</ad:SourceAttribute>
		        <ad:SourceAttribute>mail</ad:SourceAttribute>
		        <ad:SourceAttribute>CODIINTERN</ad:SourceAttribute>
		        <ad:SourceAttribute>UNITAT_MAJOR</ad:SourceAttribute>
		        <ad:SourceAttribute>UNITAT_MENOR</ad:SourceAttribute>
		    </resolver:AttributeDefinition>

 		    <!-- ========================================== -->
		    <!--      Data Connectors                       -->
		    <!-- ========================================== -->

		    <resolver:DataConnector id="myLDAP" xsi:type="dc:LDAPDirectory"
		            ldapURL="%{idp.attribute.resolver.LDAP.ldapURL}"
		            baseDN="%{idp.attribute.resolver.LDAP.baseDN}"
		            principal="%{idp.attribute.resolver.LDAP.bindDN}"
		            principalCredential="%{idp.attribute.resolver.LDAP.bindDNCredential}"
		            useStartTLS="%{idp.attribute.resolver.LDAP.useStartTLS:false}">
		            <dc:FilterTemplate>
		                <![CDATA[
		                    %{idp.attribute.resolver.LDAP.searchFilter}
		                ]]>
		            </dc:FilterTemplate>
		    </resolver:DataConnector>

	1. **/conf/ldap.properties**

			idp.authn.LDAP.authenticator                   = bindSearchAuthenticator

			--------
			idp.authn.LDAP.ldapURL                          = ldap://192.168.119.14:389
			idp.authn.LDAP.useStartTLS                     = false
			idp.authn.LDAP.useSSL                          = false
			--------

			ó

			--------
			idp.authn.LDAP.ldapURL                          = ldaps://wndca08.prepdc.gencat.intranet:636 --> 
			idp.authn.LDAP.useStartTLS                     = false
			idp.authn.LDAP.useSSL                          = true
			--------

			#idp.authn.LDAP.connectTimeout                  = 3000

			idp.authn.LDAP.sslConfig                       = certificateTrust
			idp.authn.LDAP.trustCertificates                = %{idp.home}/credentials/ldap-server.crt --> s'hauria de posar la ruta del certificat del ldap si estem anant per SSL
																									  --> el certificat s'ha d'importar des del directoris de configuració o bé injectar 
																									      en la creació de la imatge	
			idp.authn.LDAP.trustStore                       = %{idp.home}/credentials/ldap-server.truststore

			idp.authn.LDAP.returnAttributes                 = employeeId

			idp.authn.LDAP.baseDN                           = ou=Persones,ou=DIRECTORI,dc=prepdc,dc=gencat,dc=intranet
			idp.authn.LDAP.userFilter                       = (employeeId={user})
			idp.authn.LDAP.bindDN                           = SMAdmin@prepdc.gencat.intranet
			idp.authn.LDAP.bindDNCredential                 = ********************************************

			idp.authn.LDAP.dnFormat                         = %s@prepdc.gencat.intranet

			idp.attribute.resolver.LDAP.ldapURL             = %{idp.authn.LDAP.ldapURL}
			idp.attribute.resolver.LDAP.baseDN              = %{idp.authn.LDAP.baseDN}
			idp.attribute.resolver.LDAP.bindDN              = %{idp.authn.LDAP.bindDN}
			idp.attribute.resolver.LDAP.bindDNCredential    = %{idp.authn.LDAP.bindDNCredential}
			#idp.attribute.resolver.LDAP.useStartTLS         = %{idp.authn.LDAP.useStartTLS:true}
			#idp.attribute.resolver.LDAP.trustCertificates   = %{idp.authn.LDAP.trustCertificates}
			idp.attribute.resolver.LDAP.searchFilter        = (employeeId=$requestContext.principalName)

			#idp.pool.LDAP.minSize                          = 3
			#idp.pool.LDAP.maxSize                          = 10
			#idp.pool.LDAP.validateOnCheckout               = false
			#idp.pool.LDAP.validatePeriodically             = true
			#idp.pool.LDAP.validatePeriod                   = 300
			#idp.pool.LDAP.prunePeriod                      = 300
			#idp.pool.LDAP.idleTime                         = 600
			#idp.pool.LDAP.blockWaitTime                    = 3000
			#idp.pool.LDAP.failFastInitialize               = false

	1. **/conf/attribute-filter.xml** 

		Utilitzarem el camp employeeId com a identificador de l'Active Directory.

			    <afp:AttributeFilterPolicy id="gencat_attrib_policy">
			        <afp:PolicyRequirementRule xsi:type="basic:ANY" />

			        <afp:AttributeRule attributeID="employeeId">
			            <afp:PermitValueRule xsi:type="basic:ANY" />
			        </afp:AttributeRule>

			        <afp:AttributeRule attributeID="mail">
			            <afp:PermitValueRule xsi:type="basic:ANY" />
			        </afp:AttributeRule>

			        <afp:AttributeRule attributeID="CODIINTERN">
			            <afp:PermitValueRule xsi:type="basic:ANY" />
			        </afp:AttributeRule>

			        <afp:AttributeRule attributeID="UNITAT_MAJOR">
			            <afp:PermitValueRule xsi:type="basic:ANY" />
			        </afp:AttributeRule>

			        <afp:AttributeRule attributeID="UNITAT_MENOR">
			            <afp:PermitValueRule xsi:type="basic:ANY" />
			        </afp:AttributeRule>

			        <afp:AttributeRule attributeID="GICAR">
			            <afp:PermitValueRule xsi:type="basic:ANY" />
			        </afp:AttributeRule>

			    </afp:AttributeFilterPolicy>



	1. **/conf/logback.xml** si es volen canviar els nivell de log

	1. **/messages/*** per a configurar els textos de l'aplicació

	1. **/metadata/idp-metadata.xml**

		- revisar que s'ha configurat correctament el host domain
		- aquest fitxer s'ha de copiar als service providers

	1. **/views** per a personalitzar les vistes de les diferents pantalles de l'aplicació

	1. **/webapp** per a personalitzar la presentació de l'aplicació (css, imatges, ...)

	1. Un cop configurats aquests fitxers, cal fer 

			$ docker exec shibboleth-idp import.sh

		per a reconstruir el idp.war i carregar la nova configuració. Caldrà reiniciar el contenidor.	

			$ docker restart shibboleth-idp


## SP - Service Provider (client Apache)

1. Construcció de la imatge a partir del projecte:

		$ docker build -t shibboleth-sp . 

1. Arrencar el contenidor

		$ docker run -d -p 81:80 -v /home/shibboleth/sp/conf:/tmp --name shibboleth-sp shibboleth-sp

1. Copiar fitxers de configuració per a poder adaptar-los

		$ docker exec shibboleth-sp cp /etc/shibboleth/shibboleth2.xml /tmp
		$ docker exec shibboleth-sp cp /etc/shibboleth/attribute-map.xml /tmp

1. Copiar el fitxer idp-metadata.xml de l'IDP a la ruta que estigui configurada al fitxer shibboleth2.xml

1. **shibboleth2.xml**

	- modificar les uris i entityId que apuntin a l'IDP: https://[idp host]/idp/shibboleth

	- adaptar el metadata provider segons les necessitats (en aquest exemple s'han deshabilitat les propietats de signatura):

	        <MetadataProvider type="XML" validate="true"
		          uri="https://[idp-host]/idp/shibboleth"
	              backingFilePath="/tmp/idp-metadata.xml" reloadInterval="7200">
	            <!--MetadataFilter type="RequireValidUntil" maxValidityInterval="2419200"/-->
	            <!--MetadataFilter type="Signature" certificate="idp-cert.pem"/-->
	            <!--DiscoveryFilter type="Blacklist" matcher="EntityAttributes" trimTags="true" 
	              attributeName="http://macedir.org/entity-category"
	              attributeNameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:uri"
	              attributeValue="http://refeds.org/category/hide-from-discovery" /-->
	        </MetadataProvider>	

	- Modificar el REMOTE_USER amb el valor GICAR_ID: 

			<ApplicationDefaults entityID="https://sp1.locahost/shibboleth" REMOTE_USER="GICAR_ID"> 

1. **attribute-map.xml**

	- Com que estem optant pel employeeId com a camp de l'AD a utilitzar, necessitem afegir les següents línies (posem com a id "GICAR_ID", que és la capçalera actual de GICAR):

		    <Attribute name="urn:mace:dir:attribute-def:employeeId" id="GICAR_ID" />
		    <Attribute name="urn:oid:0.9.2342.19200300.100.1.1" id="GICAR_ID" />

		    <Attribute name="urn:mace:dir:attribute-def:mail" id="mail" />
		    <Attribute name="urn:oid:0.9.2342.19200300.100.1.3" id="mail" />

		    <Attribute name="urn:mace:dir:attribute-def:sAMAccountName" id="CODIINTERN" />
		    <Attribute name="urn:oid:0.9.2342.19200300.100.1.99" id="CODIINTERN" />

		    <Attribute name="urn:mace:dir:attribute-def:department" id="UNITAT_MAJOR" />
		    <Attribute name="urn:oid:0.9.2342.19200300.100.1.2" id="UNITAT_MAJOR" />

		    <Attribute name="urn:mace:dir:attribute-def:company" id="UNITAT_MENOR" />
		    <Attribute name="urn:oid:0.9.2342.19200300.100.1.98" id="UNITAT_MENOR" />

		    <Attribute name="https://gencat.cat/GICAR" id="GICAR" />


    Tenint present que estem agafant la referència de l'uid, aquest camp no hauria d'estar activat.

1. Obtenir el fitxer de metadata per a informar al IDP (no utilitzar **localhost**!!!)

		http(s)://[service provider host]/Shibboleth.sso/Metadata

1. El fitxer recuperat, s'hauria d'afegir al fitxer complet de metadata que recupera l'IDP.

## Tips and tricks

1. Configurar els contenidors amb un DNS. En arrencar contenidors de prova

		$ docker run -d -p 80:80 --name shibboleth-sp --add-host idp.extranet.gencat.cat:172.17.0.2 -v $BASE_PATH/Dockers/docker-images/centos-shib-sp/conf/:/tmp/ jtgasper3/centos-shibboleth-sp

1. En recuperar la metadata del SP, fer-ho amb el DNS assignat.

1. Exemple de fitxer de metadata complet, amb el idp-metadata i dos sp-metadata: https://dl.dropboxusercontent.com/u/17397489/idp/metadata.xml


## TODO

1. Modificar l'interval de refresc del fitxer configurat a IDP/conf/metadata-providers.xml

1. Possibilitats de clúster

1. Traduïr els fitxers de configuració a català

1. Evitar que surti el missatge de redirecció a l'aplicació SP


 