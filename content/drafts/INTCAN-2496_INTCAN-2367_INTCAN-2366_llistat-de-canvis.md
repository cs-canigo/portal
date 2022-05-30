+++
date        = "2022-05-30"
title       = "Llistat de canvis"
description = "Llistat de canvis màquina virtual 3.0.6"
sections    = "canigo-fwk-docs"
weight		= 1
+++

## Màquina virtual 3.1.0 (30/05/2022)

- Versió mínima de vagrant (2.2.19)
- Versió d'US Ubuntu (20.4 LTS)
- Utilitzar VirtualBox versió 6.x, enlloc de 5.2.x (sense suport d'Oracle)
- Refactorització de `provision.sh` per a complir: https://github.com/koalaman/shellcheck
- Afegir JDK 11 com a app per defecte
- Ampliar l'espai del HDD sda1 a 80GB
- Actualització de les versions de STS (4.13), SoapUI (5.7.0), Tomcat (9.0.55), Docker-*compose (2.22.2),
maven (3.8.3), node (14.18.3 i 16.13.2)

## Màquina virtual 3.0.6 (14/07/2020)

- Canvi del domini del plugin de l'eclipse de http://repos.canigo.ctti.gencat.cat/repository/maven2/cat/gencat/ctti/canigo.plugin/update-site/ a https://hudson.intranet.gencat.cat/nexus/repository/canigo-group-maven2/cat/gencat/ctti/canigo.plugin/update-site/

## Màquina virtual 3.0.5 (07/05/2020)

- Canvis a les urls del programari a instal·lar per urls controlades per CS Canigó

## Màquina virtual 3.0.4 (14/04/2020)

- Resolució error url dbeaver