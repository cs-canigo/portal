+++
date        = "2016-06-08T17:11:42+01:00"
title       = "Entorn de desenvolupament GICAR"
description = "Entorn Sandbox per a simular el funcionament de GICAR"
sections    = "GICAR"
taxonomies  = []
draft = false
weight 		= 8
+++


A continuació s'exposa com simular GICAR en entorns de desenvolupament, amb l'objectiu de que els proveïdors de desenvolupament tinguin una forma senzilla de simular GICAR i testejar-lo sense necessitat de disposar, per exemple, de connexió a la Xarxa de la Generalitat, ni de demanar configuracions a l'Oficina Tècnica de GICAR.

Es presenten dues estratègies per a fer-ho:

## Apache amb capçaleres estàtiques

Configurant el frontal web apache de cara a que generi de forma automàtica les capçaleres de GICAR. S’ha d’afegir a l’arxiu httpd.conf, el següent:

- Habilitar el mod_header en el apache.

- Generar les següents capçaleres a nivell d'apache utilitzant les següents directives:

	- RequestHeader set GICAR_ID “00000000T”
	- RequestHeader set GICAR “CODIINTERN=NRDRJN0001;NIF=00000000T;EMAIL=mail.admin@gencat.net;UNITAT_MAJOR=CTTI;UNITAT_MENOR=CTTI Qualitat”

Aquesta configuració fa que l’Apache afegeixi la capçalera GICAR i GICAR_ID, amb valor fix, dins de totes les peticions HTTP rebudes.

## Docker

Hem creat un contenidor Docker exacte als Apache-GICAR que es poden trobar als CPDs de la Generalitat. Aixecant a l'entorn del desenvolupador aquest  contenidor, amb connexió a un Policy Server de desenvolupament que és visible des dels entorns dels proveïdors, es pot simular el funcionament real d'una aplicació integrada amb GICAR d'una manera molt senzilla (només permet simular proves amb usuari i contrasenya, no amb certificat digital).

Per a fer això cal seguir el següent procediment:

1. El proveïdor de desenvolupament s'ha d'instal·lar el docker engine que permet gestionar imatges i contenidors (https://www.docker.com/products/docker-engine), o bé utilitzar l'entorn de desenvolupament de Canigó (http://canigo.ctti.gencat.cat/canigo/entorn-desenvolupament/).

1. Dockerfile GICAR (https://hub.docker.com/r/gencatcloud/gicar/) :

		FROM  centos:6.6

		RUN yum install httpd glibc libstdc++ ncurses perl unzip tar xz -y

		ENV httpd /etc/httpd

		RUN mkdir -p ${httpd}/CA/webagent

		RUN curl -o ${httpd}/CA/webagent.tar.xz http://canigo.ctti.gencat.cat/related/cloud/fitxers-suport/webagent.tar.xz
		RUN tar xfvJ ${httpd}/CA/webagent.tar.xz -C ${httpd}/CA/
		RUN rm ${httpd}/CA/webagent.tar.xz

		RUN curl -o ${httpd}/conf/config.zip http://canigo.ctti.gencat.cat/related/cloud/fitxers-suport/config.zip
		RUN unzip  -o ${httpd}/conf/config.zip -d  ${httpd}/conf/
		RUN rm ${httpd}/conf/config.zip

		ENV NETE_WA_ROOT ${httpd}/CA/webagent
		ENV NETE_WA_PATH ${NETE_WA_ROOT}/bin
		ENV CAPKIHOME ${httpd}/CA/webagent/CAPKI
		ENV LD_LIBRARY_PATH ${NETE_WA_ROOT}/bin:${NETE_WA_ROOT}/bin/thirdparty:${LD_LIBRARY_PATH}
		ENV PATH ${NETE_WA_PATH}:${PATH}

		RUN mv ${httpd}/conf/headers.cgi /var/www/cgi-bin/
		RUN mv ${httpd}/conf/index.html /var/www/html/
		RUN chmod 755 -R /var/www/cgi-bin/
		RUN chmod 755 -R /var/www/html/

		RUN echo "#!/bin/bash" > /entrypoint.sh
		RUN echo "set -m" >> /entrypoint.sh
		RUN echo "/usr/sbin/apachectl -D FOREGROUND &" >> /entrypoint.sh
		#RUN echo "sleep 30" >> /entrypoint.sh
		RUN echo "/etc/httpd/CA/webagent/bin/smreghost -i \$PS_IP -u \$GICARUSER -p \$GICARPWD -hn \$ContainerHostName -hc \$HCOGICAR -f /etc/httpd/conf/Smhost.conf -o" >> /entrypoint.sh
		RUN echo "sed -i -- 's/\\\$AgentConfigDocker/'\"\$AgentConfigDocker\"'/g' /etc/httpd/conf/WebAgent.conf" >>  /entrypoint.sh
		RUN echo "sed -i -- 's/\\\$AGENTNAME/'\"\$AGENTNAME\"'/g' /etc/httpd/conf/LocalConfigGicar.conf" >> /entrypoint.sh
		RUN echo "chown apache:apache /etc/httpd/conf/Smhost.conf" >> /entrypoint.sh
		RUN echo "fg" >> /entrypoint.sh

		RUN chmod 755 /entrypoint.sh

		#Copiem el fitxer wait-for-it
		COPY wait-for-it.sh /
		RUN chmod 755 /wait-for-it.sh

		CMD ["/entrypoint.sh"]

1. Executar la següent comanda per a generar la imatge de l'apache GICAR:

		$ docker build -t gicar_dev .

1. Per a demanar la configuració per a arrencar el Docker d'apache GICAR, cal omplir el següent formulari:

	<div class="form col-xs-12 col-md-12" id="form-sandbox">
	<form action='http://formularis.gencat.cat/gencat_forms/AppJava/submitFormulari.do' method='post'>

	<div class="col-xs-12 col-md-4 ">
	<label>Peticionari<span class="red">*</span></label><input name='peticionari' type='text' class="form-control" />
	</div>
	<div class="col-xs-12 col-md-4 ">
	<label>NIF<span class="red">*</span></label><input name='NIF' type='text' class="form-control" />
	</div>
	<div class="col-xs-12 col-md-4 ">
	<label>Correu<span class="red">*</span></label><input name='correu' type='text' class="form-control" />
	</div>

	<div class="col-xs-12 col-md-6 ">
	<label>Lot d'aplicacions<span class="red">*</span></label><br />
	<select name='lot_aplicacions' class="form-control custom_select hasCustomSelect" >
		<option value='A1'>A1</option>
		<option value='A2'>A2</option>
		<option value='A3'>A3</option>
		<option value='A4'>A4</option>
		<option value='A5'>A5</option>
		<option value='A6'>A6</option>
		<option value='A7'>A7</option>
		<option value='A8'>A8</option>
		<option value='A9'>A9</option>
		<option value='A10'>A10</option>
		<option value='A11'>A11</option>
	</select>
	</div>

	<div class="col-xs-12 col-md-12">
	<label>Observacions (informeu els patrons d'url a protegir, així com qualsevol altra qüestió relacionada)<span class="red">*</span></label><textarea name='observacions' class="form-control"> </textarea>
	</div>

	<div class="col-xs-12 col-md-3">
	<input id="codeCaptcha" type="hidden" value="433905973" name="captchaCode"/>
	<script type="text/javascript">
		$(function(){
			$("#refreshKaptchaImage").click(function () {
				var valor =  Math.floor(Math.random()*1000000000);
				$("#codeCaptcha").attr("value", valor)
				$("#kaptchaImage").hide().attr("src", "http://formularis.gencat.cat/gencat_forms/AppJava/generarKaptcha?kaptchaCode="+valor).fadeIn();
				$("#captchaAnswer").attr("value", "");
			});
		});
	</script>

	<br />
	<img id="kaptchaImage" src="http://formularis.gencat.cat/gencat_forms/AppJava/generarKaptcha?kaptchaCode=433905973" width="200"/>
	<img id="refreshKaptchaImage" src="http://formularis.gencat.cat/gencat_forms/images/refrescar.png" style="vertical-align: top; cursor:pointer;"/>

	<br />
	<input type="text" id="captchaAnswer" name="captchaAnswer" class="form-control"/>
	<br />
	</div>

	<div class="col-xs-12 col-md-12">
	<input type='submit' class="btn bgRed white margin_top_xs" />
	</div>
	<textarea name='meta_inf' style='display:none;'>
		<meta-informacio>
			<idFormulari>52697</idFormulari>
			<idioma>ca_ES</idioma>
		</meta-informacio>
	</textarea>

	</form>
	</div>
	<div  class="clearfix">&nbsp;</div>

1. Amb les dades que se us proporcionin, podreu arrencar el contenidor amb la següent comanda:

		$ docker run -d -p 80:80 -e "PS_IP=[ip]" -e "AgentConfigDocker=[aco]" -e "ContainerHostName=[nom del contenidor]" -e "AGENTNAME=[agent_name],[nom de domini]" -e "HCOGICAR=[hco]" -e "GICARUSER=[user]" -e "GICARPWD=[pwd]" -e "APPSERVER_PORT_8080_TCP_ADDR=localhost" -e "APPSERVER_PORT_8080_TCP_PORT=8080" --name gicar_dev gicar_dev


1. Si necessiteu configuracions específiques per a connectar al vostre servidor d'aplicacions, podeu per fer el següent:

	- Descarregueu el httpd.conf que s'inclou config.zip del Dockerfile

	- Creeu la imatge de base de gicar_dev

	- Creeu la vostra imatge personalitzada de gicar

			FROM  gicar_dev

			# instal·la els mòduls necessaris, ajp, mod_wl, ...	

			RUN ...	

			# copia el fitxer personalitzat httpd.conf a la ruta correcta
			
			COPY myhttpd.conf /etc/httpd/conf/httpd.conf

