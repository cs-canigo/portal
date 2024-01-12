+++
date        = "2024-1-11"
title       = "Monitoratge i traces als contenidors"
description = "Informació per accedir  al monitoratge i traces a les diferents plataformes de contenidors."
sections    = "Container Cloud"
weight      = 13
toc         = false
categories  = ["cloud","docker","container","kubernetes","openshift"]
aliases     = ["/cloud/monitoratge-contenidors/"]
+++

Dins del marc de la metodologia DevOps, s'ofereixen a lot d'aplicacions un conjunt d'eines per a que monitorin i tinguin accés a les traces dels diferents contenidor.

## Openshift

Al desplegar una aplicació a Openshift, es proporciona a lot d'aplicacions un usuari amb permisos de **lectura** del seu projecte a la plataforma Openshift.

### Monitoratge

Des de la consola web de les diferents plataformes es pot consultar de cada projecte la següent informació:

- Configuració dels diferents elements (Desplegaments, Serveis, Rutes, ...)
- Estat dels desplegaments
- Estat dels pods
- Mètriques dels pods
- Logs dels pods

Podeu trobar més informació al respecte a:

 - [OpenShift Container Platform 4.6 Documentation.](https://docs.openshift.com/container-platform/4.6/welcome/index.html)

Addicionalment a la consola, també podeu accedir a la informació i configuracions utilitzant el client **oc**.

Podeu trobar més informació a:

 -  [Get Started with the CLI. OCP 4.6](https://docs.openshift.com/container-platform/4.6/cli_reference/openshift_cli/getting-started-cli.html)

Podeu descarregar el client oc a:

-  [oc client v4.6](https://mirror.openshift.com/pub/openshift-v4/clients/oc/4.6/)

En cas de necessitar un monitoratge més avançat l'equip de Suport Cloud disposa d'unes plantilles de **Prometheus i Grafana** que és poden solicitar desplegar junt amb l'aplicació. Previament cal haver-les inclós al DA junt amb la resta de components de l'aplicació.

### Logs

Des de la plataforma d'openshift es poden veure els logs dels pods en temps real. Si necessiteu accedir a logs anteriors o de pods que ja no existeixi, està disponible un Kibana amb tots els logs de l'aplicació amb una retenció de 30 dies.

### Urls d'accés als diferent entorns

Podeu accedir a les consoles web i Kibana de les diferents plataformes utilitzant les credencials proporcionades per l'equip de Suport Cloud.

#### Openshift Consolidables CPD2 PRE

- **Consola web**: https://console-openshift-console.apps.cer01-gct-007-k01.cpd2pre.intranet.gencat.cat/
- **Kibana**: https://c-logging-kibana.apps.cer01-gct-007-k01.cpd2pre.intranet.gencat.cat/

#### Openshift Consolidables CPD2 PRO

- **Consola web**: https://console-openshift-console.apps.cer01-gct-008-k01.cpd2.intranet.gencat.cat/
- **Kibana**: https://c-logging-kibana.apps.cer01-gct-008-k01.cpd2.intranet.gencat.cat/

#### Openshift Consolidables CPD3

- **Consola web**: https://console-openshift-console.apps.mdc-ops-ctti-cl.cpd3.intranet.gencat.cat/
- **Kibana**: https://kibana-openshift-logging.apps.mdc-ops-ctti-cl.cpd3.intranet.gencat.cat/

#### Openshift Crítics/Consolidables CPD4 PRE

- **Consola web**: https://console-openshift-console.apps.ocpconspre.cpd4pre.intranet.gencat.cat/
- **Kibana**: https://kibana-openshift-logging.apps.ocpconspre.cpd4pre.intranet.gencat.cat/

#### Openshift Crítics/Consolidables CPD4 PRO

- **Consola web**: https://console-openshift-console.apps.ocpcons.cpd4.intranet.gencat.cat/
- **Kibana**: https://kibana-openshift-logging.apps.ocpcons.cpd4.intranet.gencat.cat/

#### Openshift Crítics Salut CPD4 PRE

- **Consola web**: https://console-openshift-console.apps.ocpsalutpre.cpd4pre.intranet.gencat.cat/
- **Kibana**: https://kibana-openshift-logging.apps.ocpsalutpre.cpd4pre.intranet.gencat.cat/

#### Openshift Crítics Salut CPD4 PRO

- **Consola web**: https://console-openshift-console.apps.ocpsalut.cpd4.intranet.gencat.cat/
- **Kibana**: https://kibana-openshift-logging.apps.ocpsalut.cpd4.intranet.gencat.cat/

