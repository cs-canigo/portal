+++
date        = "2018-08-10"
title       = "Canigó. Transmissió de binaris en REST APIs"
description = "En aquest article expliquem diferents opcions per transmissió de dades binàries en REST APIs, recomanacions i millors pràctiques."
sections    = ["Notícies","home"]
categories  = ["canigo"]
key         = "SETEMBRE2018"
+++

La **transmissió de dades binàries** en un servei web, sobretot quan es tracta d'un volum de dades important, és un punt crític en el rendiment d'una aplicació. Cal tractar-ho amb deteniment, i aplicar la millor solució tècnica segons les característiques de l'aplicació.

## Introducció

Actualment els dos formats _human readable_ d'ús general més utilitzats per dades estructurades són **JSON** i **XML**.

Respecte al suport de dades binàries, el format XML suporta aquest tipus de dades de manera nativa principalment mitjançant el tipus `base64Binary`, mentre que el format JSON no en dóna suport directe, obligant a codificar aquesta informació de manera ad-hoc (p.e. com a Strings en Base64, Base85 o Base91).

## Opcions

Tal com s'ha introduït prèviament a l'apartat anterior, hi ha diverses opcions tècniques per transmetre dades binàries les quals es descriuen a continuació.

### Base64

Una de les maneres més esteses de transmetre dades binàries és mitjançant la codificació en **Base 64**, sent aquesta l'estàndard amb màxima interoperabilitat car que és independent del format amb el qual es transfereixen les dades (JSON, XML, etc.). Un dels defectes principals d'aquest esquema de codificació és que augmenta la mida un **33%**, de manera que un arxiu de per exemple 6MB es transforma en un de 8MB.

Relacionades amb la codificació prèvia hi ha (entre d'altres) les codificacions en _Base85_ i _Base91_, incrementant el rang de caràcters permesos segons la codificació, i reduint en conseqüència la mida final, però aquestes són menys esteses.

Exemple:
```
$ echo -n 'Exemple de codificació' | base64 
RXhlbXBsZSBkZSBjb2RpZmljYWNpw7M=
```

#### XML:base64Binary

El format XML suporta de manera nativa l'enviament de dades binàries especificant aquest el tipus de dada `base64Binary`, de manera que el desenvolupador no ha d'encarregar-se de la tasca de codificació/decodificació de les dades, car que la biblioteca que implementa el tractament del format XML ho implementa internament.

Exemple:
```
<dades>
<imatge>iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAACjElEQVR4Aa2V30uTURjHnVBUgglC...</imatge>
</dades>
```

### Multipart (multipart/form-data)

L'estàndard MIME defineix un tipus de contingut (_Content-Type_) que permet agrupar de manera ordenada diferents continguts en un mateix missatge, el tipus _Multipart_, i dins d'aquesta definició, hi ha un subtipus anomenat _Form-Data_.

Aquest tipus de contingut **multipart/form-data** és un estàndard pel qual les pàgines web permeten pujar fitxers als servidors juntament amb altres dades. 

Un avantatge d'utilitzar aquest estàndard és que és el mateix que utilitzen les pàgines web, alineant i unificant maneres de transmetre dades, a més a més sense incórrer en les des-avantatges d'una codificació del tipus Base64.

Exemple
```
HTTP POST https://api.onedrive.com/v1.0/drive/items/{folder-id}:/{child-folder-name}:/children
Authorization: bearer EwB...
Content-Type: multipart/form-data; boundary=87ca48b5-cc31-4889-9e81-87df743e08ae
Content-Length: 1284
--87ca48b5-cc31-4889-9e81-87df743e08ae
Content-Disposition: form-data; name="metadata"
Content-Type: application/json; charset=UTF-8
Content-Length: 31
Content-Transfer-Encoding: binary
{"file":{},"name":"file-name.ext"}
--87ca48b5-cc31-4889-9e81-87df743e08ae
Content-Disposition: form-data; name="content"
Content-Type: text/plain
Content-Length: 842
Content-Transfer-Encoding: binary
  File content goes here
--87ca48b5-cc31-4889-9e81-87df743e08ae--
```

### Esquemes binaris

Les opcions prèvies mantenien la premissa que eren orientades a text (_human readable_), però també hi ha opcions que permeten enviar la informació de manera estructurada utilitzant protocols binaris, o _machine readable_.

L'avantatge d'aquests esquemes binaris radica en que estan optimitzats per la transferència eficient de dades, i no pas per la seva inspecció/supervisió per part de persones.

#### Protocol Buffers

Aquest format d'estructuració de dades és l'equivalent (salvant algunes diferències) al format XML però en binari.

Els principals avantatges d'aquest format és un suport excel·lent dels principals llenguatges (Java, Python, C#, Go, etc.) i una bona interoperabilitat entre plataformes (Linux, Windows, IoT, etc.), tot mantenint un _overhead_ mínim i una velocitat de càrrega millors en comparació amb XML.

Exemple (format text pla de protocol buffer)
```
# Textual representation of a protocol buffer.
# This is *not* the binary format used on the wire.
person {
  name: "John Doe"
  email: "jdoe@example.com"
}
```

#### MTOM

Message Transmission Optimization Mechanism (MTOM) és un estàndard de la W3C, que aglutina l'empaquetat de dades XML en el format binari XOP, l'enviament mitjançant _Multipart_ dins d'un protocol HTTP.

## Recomanació

Des d'un punt de vista de rendiment, la forma més eficient de transmissió de dades binàries és fer-ho de manera _asíncrona_, directament a un servei especialitzat en l'intercanvi de fitxers (p.e. FTP/SFTP/FTPS). En aquest sentit, no es fa cap codificació/escaneig de les dades per treballar amb les dades reals.

En el cas que s'hagi de fer mitjançant un API REST, s'ha de tenir en compte diversos factors i el pes en la decisió final:

* Volum de transferència de dades: Si el volum de dades a transmetre és _elevat_ es desaconsella utilitzar l'enviament explícit o implícit de les codificacions textuals (p.e. Base64), i es recomana l'ús de protocols binaris, donats el seu rendiment i eficiència.
* Interoperabilitat amb altres projectes/sistemes: En aquest cas les codificacions textuals (p.e. Base64) i més concretament el format XML, i el seu tipus de dades `base64Binary`, poden maximitzar la interoperabilitat permetent l'enviament de dades binàries.

Des d'un punt de vista purament tècnic, i sense tenir en compte d'altres criteris, el ranking quedaria així:

1. Protocol Buffers<br>
Els avantatges d'aquesta opció són clares: Un protocol binari eficient en la densitat d'informació, ràpid en el tractament de dades i interoperable entre plataformes.

2. Multipart<br>
L'avantatge principal d'aquesta opció és que presenta un format d'empaquetat i encapsulació orientat a text i independent del format subjacent (p.e. JSON, XML), mantenint _quasi_ intacta la compatibilitat cap enrere, i mantenint alhora una elevada eficiència en la transmissió de dades binàries.

3. XML:base64Binary<br>
L'avantatge principal d'aquesta opció és que no requereix cap modificació especial, car que està suportat per l'estàndard XML, garantint una interoperabilitat màxima. Els desavantatges però són una eficiència i velocitat reduïdes (en comparació amb els protocols binaris).

Les opcions Base64 i MTOM quedarien descartades en favor d'aquestes.

## Enllaços d'interés

* https://en.wikipedia.org/wiki/Base64
* https://medium.com/walmartlabs/rest-easy-with-json-and-binary-f218f7e141be
* https://canigo.ctti.gencat.cat/related/canigo/howto/Canigo%20-%20Streaming%20de%20fitxers%20en%20clients%20REST.pdf
* https://en.wikipedia.org/wiki/MIME#Multipart_messages
* https://ec.haxx.se/http-multipart.html
* http://cxf.apache.org/docs/jax-rs-multiparts.html
* https://en.wikipedia.org/wiki/Message_Transmission_Optimization_Mechanism
* https://developers.google.com/protocol-buffers/docs/overview
