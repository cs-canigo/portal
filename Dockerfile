FROM docker-registry.ctti.extranet.gencat.cat/gencatcloud/gicar-shibboleth:1.0.3

# configuracion especifica de la aplicacion para el Apache
# COPY gicar/portal.conf /etc/httpd/conf.d/portal.conf
# hugo site
COPY public /var/www/html/
# configuracion gicar-shibbolet, rutas protegidas
COPY gicar/sp_gicar_conf_aplicacio/shib.conf /etc/httpd/conf.d/shib.conf
# Es diferente para cada entorno, se hace en configmaps de kubernetes
COPY gicar/sp_gicar_conf_aplicacio/idp-metadata-pre.xml /gicar/idp-metadata.xml
# Certificados GICAR de la aplicacion
# COPY gicar/sp_gicar_conf_aplicacio/portal-arquitectura.key /etc/shibboleth/portal-arquitectura.key
# COPY gicar/sp_gicar_conf_aplicacio/portal-arquitectura.crt /etc/shibboleth/portal-arquitectura.crt
