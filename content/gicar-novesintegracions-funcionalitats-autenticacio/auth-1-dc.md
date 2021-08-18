+++
date        = "2021-08-18T10:00:00"
title       = "1.- Servei d’autenticació contra el Directori Corporatiu"
description = "Servei d'autenticació estàndard"
sections    = "gicar-novesintegracions-funcionalitats-autenticacio"
taxonomies  = []
weight 		= 2
+++

El servei d'autenticació més estàndard que ofereix GICAR, és el servei d'autenticació per usuaris que estan al Directori Corporatiu.

![Integració Aplicacions GICAR](/related/gicar/autenticacio-dc-1.png)

Aquest servei d'autenticació admet autenticació amb usuari i contrasenya o amb certificat digital.

A continuació s'esquematitza com funciona aquest servei per a les dues casuístiques

## Descripció del procés d’autenticació contra el Directori Corporatiu utilitzant usuari i contrasenya
  
El procés és el següent:

![Integració Aplicacions GICAR](/related/gicar/autenticacio-dc-2.png)

Les passes que se segueixen són les següents:

1. L'usuari intenta accedir a l'aplicació i no disposa de sessió establerta amb GICAR.
1. L'usuari és redirigit a GICAR i se li presenta el formulari de login. L'usuari introdueix usuari i contrasenya per a fer l'autenticació.
1. GICAR valida l'usuari i la contrasenya contra el Directori Corporatiu.
1. El Directori contesta si les credencials són o no OK.
1. En cas que les credencials siguin ok, GICAR proporciona a l'usuari una cookie de sessió.
1. L'usuari accedeix al recurs amb la cookie de sessió generada.

## Descripció del procés d’autenticació contra el Directori Corporatiu utilitzant certificat digital
  
El procés és el següent:

![Integració Aplicacions GICAR](/related/gicar/autenticacio-dc-3.png)

Les passes que se segueixen són les següents:

1. L'usuari intenta accedir a l'aplicació i no disposa de sessió establerta amb GICAR.
1. L'usuari és redirigit a GICAR i se li presenta el formulari de login. L'usuari introdueix el seu certificat digital per a fer l'autenticació.
1. GICAR valida contra el servei PSIS del Consorci AOC si el certificat és OK.
1. El servei PSIS contesta si el certificat és ok o no. Si és ok retorna a GICAR totes les dades del certificat.
1. GICAR valida si l'usuari existeix al Directori Corporatiu
1. El Directori contesta si existeix o no
1. En cas que tot el procés anterior hagi estat OK, GICAR proporciona a l'usuari una cookie de sessió.
1. L'usuari accedeix al recurs amb la cookie de sessió generada.

