+++
date        = "2025-02-17"
title       = "Backup"
description = "Backup"
sections    = "Cloud"
categories  = ["cloud","model","aws","azure","gcp"]
aliases     = ["/model-cloud/operacions/backup"]
weight      = 3
+++

## Solució de Backup a AWS

### Introducció

S' ha implementat en l' organització una solució robusta de recolzament en AWS que centralitza i estandarditza la gestió de còpies de seguretat en tots els comptes de l'organització. Aquesta solució garanteix la protecció i recuperació de dades crítiques, respectant les millors pràctiques de seguretat i compliment.

### Funcionament de la Solució

La solució s' implementa des d' un compte delegat de l' organització que actua com a punt central per a la gestió dels plans de Backup. Els plans de Backup creats en aquest compte són compartits amb tots els comptes de l'organització i apareixen com a "Global Backup Plan" en cadascuna d'elles.

### Característiques principals

- **Centralització**: Els plans de backup es creen i gestionen des d' un únic compte.
- **Compatibilitat**: Només es recolzen recursos suportats per AWS Backup.
- **Etiquetatge**: Els recursos han d'estar etiquetats amb una de les claus definides en la solució (detallades més endavant).
- **Encriptació**: Els recursos han d' estar encriptats utilitzant claus KMS creades juntament amb la infraestructura base de cada compte.
- **Verificació**: Els suports es monitoritzen per assegurar la seva correcta execució.

### Plans de Backup

Els plans de backup definits es descriuen a continuació:

  | KEY | VALUE | CRON | RETENCIÓ | HORA I DIA |  
  |------|-------|-------|-------|-------|
  | diaria-pre | diaria-pre | (30 13 ? * * *) | 31 dies | Tots els dies a les 13:30 AM
  | diaria | diaria | (15 00 ? * * *) | 31 dies | Tots els dies a les 00:15 AM
  | semanal-basica | semanal-bas | (15 2 ? * sat *) | 12 setmanes (84 dies) | Tots els dissabtes a les 02:15 AM
  | semanal-avanzada | semanal-av | (15 2 ? * sat *) | 24 setmanes (168 dies) | Tots els dissabtes a les 02:15 AM
  | mensual | mensual | (15 2 ? * sun#1 *) | 18 mesos (558 dies) | El primer diumenge de cada mes a les 02:15 AM
  | anual-basica | anual-bas | (15 2 ? jan mon#1 *) | 3 anys (1098 dies) | El primer dilluns de cada any a les 02:15 AM
  | anual-avanzada | anual-av | (15 2 ? jan mon#1 *) | 5 anys (1830 dies) | El primer dilluns de cada any a les 02:15 AM

De la mateixa manera, els plans de suport disponibles, apareixeran a la secció de "Backup plans" dins del servei AWS Backup, en tots els comptes de l'organització. Aquests inclouen el prefix "orgbackup":

![Backup Plans](/related/cloud/backup-plans.png)

Entrant en cadascun d'ells, en la secció "Backup Rules", es pot veure informació més detallada del pla, com retenció, "vault" destí, temps màxim per a que el backup es completi, etc:

![Backup Rules](/related/cloud/backup-rules.png)

Així com la etiqueta requerida per incloure un recurs en aquest pla de Backup, a la secció "Resource Assignments":

![Resource Assignments](/related/cloud/resource-assignments.png)

### Etiquetes a Configurar per a Cada Pla

Perquè els recursos siguin recolzats correctament, han d' estar etiquetats amb les claus següents:
- **diaria**: Etiqueta per a recursos que requereixen recolzaments diaris.
- **semanal-basica**: Etiqueta per a recolzaments setmanals amb retenció bàsica (12 setmanes).
- **semanal-avanzada**: Etiqueta per a recolzaments setmanals amb retenció estesa (24 setmanes).
- **mensual**: Etiqueta per a recolzaments mensuals.
- **anual-basica**: Etiqueta per a recolzaments anuals amb retenció de 3 anys.
- **anual-avanzada**: Etiqueta per a recolzaments anuals amb retenció de 5 anys.

### Exemple de Configuració d' Etiqueta (Terraform)

Les etiquetes per a la copia de Seguretat no apliquen a tots els tipus de recursos, i no en tots els recursos que desitgin recolzar-se serà la mateixa, ja que això varia en funció de les necessitats, per això, no s' ha d' incloure aquesta etiqueta en les tags per defecte del codi Terraform, passades a nivell de provider. En el seu lloc, és recomanable utilitzar un merge en les tags dels recursos individuals, per exemple:

```hcl
    tags = merge(var.tags, var.aurora_tags, { Name = "${local.aurora}-exampledb-000", "diaria" = "diaria"})
}
```

### Recursos Suportats

Aquests són els principals recursos utilitzats per l' organització, que poden ser recolzats amb AWS Backup:
- **Amazon Elastic Compute Cloud (Amazon EC2)**: Instàncies d'Amazon EC2 recolzades per volums d'Amazon EBS.
- **Amazon Simple Storage Service (Amazon S3)**: Dades d'Amazon S3.
- **Amazon Elastic Block Store (Amazon EBS)**: Volums d'Amazon EBS.
- **Amazon DynamoDB**: Tables d'Amazon DynamoDB.
- **Amazon Relational Database Service (Amazon RDS)**: Instàncies de base de dades d'Amazon RDS (incloent-hi tots els motors de base de dades); Clústers Multi-AZ.
- **Amazon Aurora**: Clústers d' Aurora.
- **Amazon Elastic File System (Amazon EFS)**: Sistemes d' arxius d' Amazon EFS.
- **FSx for Lustre**: Sistemes d' arxius FSx for Lustre.
- **FSx for Windows File Server**: Sistemes d' arxius FSx for Windows File Server.
- **Amazon FSx for NetApp ONTAP**: Sistemes d' arxius FSx for ONTAP.

**Nota**: El llistat complet i actualitzat de recursos suportats està disponible en la documentació oficial d'AWS Backup (https://docs.aws.amazon.com/aws-backup/latest/devguide/whatisbackup.html#supported-resources).

### Consideracions

- Tots els recursos recolzats han d' estar encriptats amb una clau KMS. Aquestes claus es generen de forma predeterminada com a part de la infraestructura base de cada compte.
- Les bases de dades han d' estar actives durant el moment programat per als recolzaments. Asseguri' s de:
  - Configurar les finestres de manteniment per no interferir amb els respatllers.
  - Monitoritzar l' estat de les instàncies abans i després de l' operació de backup.
- Revisi que les claus tinguin les polítiques d' accés adequades per permetre suports.

### Verificació de Backups

És possible verificar que els recolzaments s'hagin realitzat correctament des de la consola d'AWS Backup, a l'apartat "Backup Jobs", en aquest es podrà veure l'històric de backups del compte, juntament amb l'estat, identificador del recurs i data. A més, si algun dels Jobs ha finalitzat amb error, és possible entrar-hi i veure el detall del problema.

![Backup Jobs](/related/cloud/backup-jobs.png)

### Bones Pràctiques Addicionals

- **Auditoria Regular**: Realitzi revisions periòdiques dels plans de backup i els recursos etiquetats.
- **Documentació**: Mantingui un registre actualitzat dels recursos recolzats i les seves configuracions.

