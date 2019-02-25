+++
date        = "2019-02-25"
title       = "Configuració de Gicar en Contenidors"
description = "Descripció del procediment per configurar Gicar a les diferents plataformes de Contenidors."
sections    = "Container Cloud"
weight      = 11
categories  = ["cloud","docker","container","kubernetes","openshift","Swarm"]
+++

La configuració de Gicar a les plataformes de contenidors dependrà de la plataforma en concret.

## SwarmMe

La integració amb Gicar no es fa a la plataforma de contenidors, es realitza al Servidor Web on-premise que fa de proxy pass contra SwarmMe.

La integració es fa via agent de Siteminder a l'Apache.
Al tractar-se d'Apaches departamentals on-premise, CPD per defecte ja els configura amb aquesta integració i no cal fer cap configuració addicional.

## Kubernetes i Openshift

La integració amb Gicar es realitza a la plataforma de contenidors.

La integració de les aplicacions amb Gicar es realitza amb el protocol SAMLv2 a través de Shibboleth.

Cal utilitzar la imatge docker **gicar-shibboleth-openshift** disponible al [Registre privat](http://canigo.ctti.gencat.cat/draft/cloud/cloud-caas/dockerRegistry/) i [Gitlab.](https://git.intranet.gencat.cat/3048-intern/imatges-docker/gicar-shibboleth-openshift/tree/1.0.3)


### Fitxers de configuració

#### Certificats

Certificat i clau proporcionats per l'equip de Gicar al realitzar la sol·licitud del servei.

Aquests certificats són els mateixos a tots els entorns i identifiquen a l'aplicació davant Gicar.

#### shib.conf

Fitxer per definir les url's a protegir per Gicar.

En general, és el mateix per tots els entorns.

#### app.conf

Fitxer per definir la configuració específica de d'aplicació:

* proxyPass
* rewrite
* ...

Es podria utilitzar el shib.conf, però és més net fer-ho per separat.

#### idp-metadata.xml

Presenta diferents configuracions internes per Shibboleth.

Entre les configuracions destaca el servidor de Shibboleth i alguns certificats interns.

Es proporcionat per l'equip de Gicar al realitzar la sol·licitud del servei.

**És diferent per cada entorn.**

Cal utilitzar un **configMap**  par cadascun dels entorns.

### Variables d'entorn

Cal definir les següents variables d'entorn que identifiquen l'aplicació a Gicar:

- **url_entityid_gicar** -> application id in gicar
- **url_idp_gicar** -> gicar URL enpoint
- **certificate_name** -> certificate file name
- **server_name** -> public application serverName (with http schema)



## Exemple de configuració a Gicar

### Creació de la imatge

Crear una imatge a partir de la imatge certificada i copiar els fitxers necessaris.

Exemple:

```

FROM docker-registry.ctti.extranet.gencat.cat/gencatcloud/gicar-shibboleth-openshift:1.0.3

MAINTAINER xxxx

# Es copien els recursos estàtics
COPY /dist/frontend /var/www/html

# configuració específica de l'aplicació
COPY conf/app.conf /etc/httpd/conf.d/app.conf
COPY conf/shib.conf /etc/httpd/conf.d/shib.conf

# Certificats GICAR
COPY conf/app.crt /etc/shibboleth/app.crt
COPY conf/app.key /etc/shibboleth/app.key

```

### Descriptors Desplegament

Passos a seguir:

- Definir les 4 variables d'entorn al descriptor de desplegament
- Crear un configMap amb el fitxer de configuració **idp-metadata.xml** que correspongui
- Mapejar el fitxers en un volum al descriptor de desplegament

Fragment del descriptor de desplegament:

```
...
env:
- name: url_entityid_gicar
  value: https://preproduccio.pgec.gencat.cat
- name: url_idp_gicar
  value: https://preproduccio.idp1-gicar.gencat.cat/idp/shibboleth
- name: certificate_name
  value:  AplicacioProva
- name: server_name
  value: https://preproduccio.pgec.gencat.cat
...
volumeMounts:
- name: gicar-metadata
  mountPath: /gicar
...
volumes:
    - name: gicar-metadata
    configMap:
        name: gicar-config
        items:
        - key: idp-metadata
          path: idp-metadata.xml
...
```

Descriptor del ConfigMap:
```
apiVersion: v1
kind: ConfigMap
metadata:
  name: gicar-config
data:
  idp-metadata: |
    <?xml version="1.0" encoding="UTF-8"?>
    <EntityDescriptor xmlns="urn:oasis:names:tc:SAML:2.0:metadata" xmlns:ds="http://www.w3.org/2000/09/xmldsig#" xmlns:shibmd="urn:mace:shibboleth:metadata:1.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" entityID="https://preproduccio.idp1-gicar.gencat.cat/idp/shibboleth">
    <IDPSSODescriptor protocolSupportEnumeration="urn:mace:shibboleth:1.0 urn:oasis:names:tc:SAML:1.1:protocol urn:oasis:names:tc:SAML:2.0:protocol">
        <Extensions>
            <shibmd:Scope regexp="false">preproduccio.idp1-gicar.gencat.cat</shibmd:Scope>
        </Extensions>
        <KeyDescriptor>
            <ds:KeyInfo>
                <ds:X509Data>
                    <ds:X509Certificate>
    MIIDkTCCAnmgAwIBAgIBQjANBgkqhkiG9w0BAQUFADBpMSEwHwYDVQQKExhHZW5l
    ...
    ksywNnQ=
                    </ds:X509Certificate>
                </ds:X509Data>
            </ds:KeyInfo>
        </KeyDescriptor>
        <ArtifactResolutionService Binding="urn:oasis:names:tc:SAML:1.0:bindings:SOAP-binding" Location="https://preproduccio.idp1-gicar.gencat.cat/idp/profile/SAML1/SOAP/ArtifactResolution" index="1"/>
        <ArtifactResolutionService Binding="urn:oasis:names:tc:SAML:2.0:bindings:SOAP" Location="https://preproduccio.idp1-gicar.gencat.cat/idp/profile/SAML2/SOAP/ArtifactResolution" index="2"/>     
        <NameIDFormat>urn:mace:shibboleth:1.0:nameIdentifier</NameIDFormat>
        <NameIDFormat>urn:oasis:names:tc:SAML:2.0:nameid-format:transient</NameIDFormat>
        <SingleSignOnService Binding="urn:mace:shibboleth:1.0:profiles:AuthnRequest" Location="https://preproduccio.idp1-gicar.gencat.cat/idp/profile/Shibboleth/SSO"/>
        <SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" Location="https://preproduccio.idp1-gicar.gencat.cat/idp/profile/SAML2/POST/SSO"/>
        <SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST-SimpleSign" Location="https://preproduccio.idp1-gicar.gencat.cat/idp/profile/SAML2/POST-SimpleSign/SSO"/>
        <SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect" Location="https://preproduccio.idp1-gicar.gencat.cat/idp/profile/SAML2/Redirect/SSO"/>
    </IDPSSODescriptor>
    <AttributeAuthorityDescriptor protocolSupportEnumeration="urn:oasis:names:tc:SAML:1.1:protocol urn:oasis:names:tc:SAML:2.0:protocol">
        <Extensions>
            <shibmd:Scope regexp="false">preproduccio.idp1-gicar.gencat.cat</shibmd:Scope>
        </Extensions>
        <KeyDescriptor>
            <ds:KeyInfo>
                <ds:X509Data>
                    <ds:X509Certificate>
    MIIDkTCCAnmgAwIBAgIBQjANBgkqhkiG9w0BAQUFADBpMSEwHwYDVQQKExhHZW5l
    ...
    nsH3Wp6sxmBqsS0ATZOMaqUD6KJz
    ksywNnQ=
                    </ds:X509Certificate>
                </ds:X509Data>
            </ds:KeyInfo>
        </KeyDescriptor>
        <AttributeService Binding="urn:oasis:names:tc:SAML:1.0:bindings:SOAP-binding" Location="https://preproduccio.idp1-gicar.gencat.cat/idp/profile/SAML1/SOAP/AttributeQuery"/>
        <AttributeService Binding="urn:oasis:names:tc:SAML:2.0:bindings:SOAP" Location="https://preproduccio.idp1-gicar.gencat.cat/idp/profile/SAML2/SOAP/AttributeQuery"/>
        <NameIDFormat>urn:mace:shibboleth:1.0:nameIdentifier</NameIDFormat>
        <NameIDFormat>urn:oasis:names:tc:SAML:2.0:nameid-format:transient</NameIDFormat>
    </AttributeAuthorityDescriptor>
    </EntityDescriptor>
```
