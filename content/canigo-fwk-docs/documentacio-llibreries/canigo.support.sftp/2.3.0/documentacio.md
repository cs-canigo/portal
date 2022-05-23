+++
date        = "2020-06-16"
title       = "Documentació"
description = "Documentació canigo.support.sftp 2.3.0"
sections    = "canigo-fwk-docs"
weight      = 3
+++

## Propòsit

El servei de SFTP de Canigó permet enviar i rebre arxius entre el servidor on s’executa l’aplicació a altres servidors de forma segura mitjançant l’intercanvi de claus. El servei està basat en les llibreries JSCH i Commons-VFS, la primera es tracta d’un projecte open source que permet la connexió via SSH a qualsevol màquina. La segona llibrería és un projecte també open_source de la Apache Foundation que permet treballar amb més facilitat amb la JSCH, donant eines per crear connexions SFTP (entre d’altres) contra un servidor.

## Funcionalitats

### Service

S’ofereix el servei *cat.gencat.ctti.canigo.arch.support.sftp.SftpService* per a realitzar l'enviament de fitxers a través de SFTP.

### Exception

S’ofereix la exception *cat.gencat.ctti.canigo.arch.support.sftp.exceptions.SftpModuleException* per a identificar els errors produïts al mòdul.
