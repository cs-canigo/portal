FROM docker-registry.ctti.extranet.gencat.cat/gencatcloud/gicar-shibboleth:1.0.3

# configuracion especifica de la aplicacion para el Apache
# COPY gicar/portal.conf /etc/httpd/conf.d/portal.conf
# hugo site
COPY public /var/www/html/
# configuracion gicar-shibbolet, rutas protegidas
COPY sp_gicar_conf_aplicacio/shib.conf /etc/httpd/conf.d/shib.conf
# Es diferente para cada entorno, se han de comentar las siguientes linieas y hacer con configmap de kubernetes
COPY sp_gicar_conf_aplicacio/pre/idp-metadata.xml /gicar/idp-metadata.xml
# Certificados GICAR de la aplicacion
COPY sp_gicar_conf_aplicacio/PORTALARQUITECTURA.key /etc/shibboleth/PORTALARQUITECTURA.key
COPY sp_gicar_conf_aplicacio/PORTALARQUITECTURA.crt /etc/shibboleth/PORTALARQUITECTURA.crt
