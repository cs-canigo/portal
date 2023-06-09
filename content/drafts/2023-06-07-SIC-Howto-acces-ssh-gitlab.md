+++
date         = "2023-06-07"
title        = "SIC. Configurar accés SSH per connectar a Gitlab"
description  = "Com configurar un sistema local per accés a Gitlab autenticant amb claus SSH"
#section     = "howtos"
#categories  = ["SIC"]
#key         = "JULIOL2023"
+++

## Introducció

Per tal de millorar la seguretat i facilitar als usuaris l'accés al [Servei de Custòdia de Codi] (/sic30-serveis/scm/),
s'ha procedit a habilitar l'**autenticació xifrada amb parell de claus pública/privada via protocol SSH**.
Aquest how-to va dirigit a tots aquells perfils tècnics que tinguin la necessitat de fer-ne ús.

## Configuració

S'indiquen les passes que cal seguir en un entorn local Linux amb les eines OpenSSH instal·lades.
En cas de no disposar d'aquestes eines, podeu executar la següent comanda:

```bash
sudo apt install openssh-client
```

A continuació, s'indica la configuració a realitzar.

### 1. Generar claus SSH

Cal generar un parell de claus SSH. En el següent exemple es crearà un directori específic per a desar-hi les claus:

```bash
mkdir ~/.ssh/gitlab_ssh
ssh-keygen -t rsa -b 4096 -C "<identificador>" -f ~/.ssh/gitlab_ssh/myuser
```

NOTA: `-C “\<identificador\>”` és opcional. Si s’omet, l'eina genera automàticament un identificador en format `myuser@host`.
En aquest document utilitzarem, de forma il·lustrativa, `myuser@host`.
</br>

Exemple: 

```bash
ssh-keygen -t rsa -b 4096 -f ~/.ssh/gitlab_ssh/myuser
```

```
Generating public/private rsa key pair.
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /home/myuser/.ssh/gitlab_ssh/myuser
Your public key has been saved in /home/myuser/.ssh/gitlab_ssh/myuser.pub
The key fingerprint is:
SHA256:d9A4knZXvDLwmQWG6yzqv1Xdt7VgZS7VZiIWZN7S7iw myuser@host
The key's randomart image is:
+---[RSA 4096]----+
|       	o*o.  |
|     	.o* =o .|
|    	+ =+B++=+|
|   	. o.=*=*= |
|    	So. o*o.+|
|    	..oo.oo =|
|   	. .. E oo |
|  	.  .   .   |
| 	...o.   	|
+----[SHA256]-----+
```

### 2. Afegir clau privada a l’agent d’autenticació SSH

A continuació, cal afegir la clau privada generada a l’agent d’autenticació SSH:

Exemple:

```bash
ssh-add ~/.ssh/gitlab_ssh/myuser
Identity added: /home/myuser/.ssh/gitlab_ssh/myuser (myuser@host)
```

### 3. Afegir entrada al fitxer de configuració SSH

A continuació, cal afegir la següent entrada al fitxer de configuració de SSH: `~/.ssh/config`.

Exemple:

```
Host git.intranet.gencat.cat
  Hostname 10.54.67.30
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/gitlab_ssh/myuser <--- Afegiu la ruta de la clau privada creada localment
```

### 4. Obtenir clau pública generada

A continuació, cal copiar al porta-retalls el text/valor de la clau pública generada `~/.ssh/gitlab_ssh/myuser.pub`.

Exemple:

```bash
cat /home/myuser/.ssh/gitlab_ssh/myuser.pub
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQCi3sQ7Q9dHRb/pcqrVGho2OzpgHEfsLXL4Pav1Zz0qmUfMhc0t1Q8/MABU5BXKLTfJH8CvqJMNY8ngwRrgMXlM6UNL7RPfQsyV8CfauzzUJXRnoJuoWAG6ftUNcnUCg+hOeMzHdcIaASeA5eBR/3hmxN0sp8VxjL0wwySlVVMHkDYETH5YKPGyNIIApiFc9kfKCvSncnePFPQiTyqAzL/pDDipzNpV9LigQTL9LxOHaBoI8gvWLaZrThpCxKHwbDiGB8xZpoOU8PcSy3lQ8QRdvsnA31Pdo713Sso/y+mRCHa4gbIRQZHETO7kB+4/sRxW5XAYAoFexDFjORVVOaxgUKo4b1JNLsfdINUhdfFfnSNNFc70H1CcogrPSda7Da4jsOz7M7jV12r+lXhZAxz/xWHYaup96LDLQK+W83FAzE0Cq8kE3DdrK4mb+xb4cxWLqSafKEsZ+PZloLitiOOFYGkqwv1L6aU0J5M7ps5g5hVB0o2jW/RQ65okcshm6uUPScRYtvSTySPcCvX99L6SXjHMggtdvMhUhIt1H4NBddYGwzO6ZTtEbCHCs9LrzpIzmvg/yrRid3tRN0zPHlVfscxfP11WasGMAJk8DscVqMIWCusUjN+ByVRXnED3peC5sx0RSjvR41gawTZPt6mSVeKd7AgSYEA3OBr9m+ifmw==mysuser@host
```

O bé, executant:

```bash
xclip -sel clip < ~/.ssh/gitlab_ssh/mysuser.pub
```

### 5. Crear clau SSH a Gitlab

A continuació, cal crear la clau SSH a la configuració del nostre compte Gitlab:

- Accedir a https://git.intranet.gencat.cat/-/profile/keys i

- Enganxar el valor de la clau pública indicant un títol identificador i, si convé, una data de caducitat.

![Gitlab ssh key](/related/sic/gitlab-clau-ssh.png)
</br>

### 6. Executar test

Finalment, cal comprovar el funcionament correcte executant el següent:

```bash
ssh -T git@git.intranet.gencat.cat
Welcome to GitLab, @XXXXXXXXB!
```

## Documentació de referència

Use SSH keys to communicate with GitLab: https://git.intranet.gencat.cat/help/user/ssh.md.