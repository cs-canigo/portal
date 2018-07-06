# Portal d'Arquitectura CTTI (http://canigo.ctti.gencat.cat/)

## Docker

$ docker build -t portal-arquitectura:0.0.1 .

$ docker run -ti --rm  --name portal-gicar-shibboleth -p 80:80 -p 443:443 -e "url_entityid_gicar=https://preproduccio.dockersaml.gencat.cat" -e "url_idp_gicar=https://preproduccio.idp1-gicar.gencat.cat/idp/shibboleth" -e "certificate_name=AplicacioProva" -e "server_name=https://preproduccio.dockersaml.gencat.cat" portal-arquitectura:0.0.1

