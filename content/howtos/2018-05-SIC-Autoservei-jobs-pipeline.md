+++
date        = "2018-05-23"
title       = "SIC. How-to: Autoservei jobs pipeline"
description = "En aquest how-to es mostra un exemple de com fer ús del nou Autoservei de jobs pipeline del SIC"
sections    = ["howtos"]
categories  = ["sic"]
key         = "JUNY2018"
+++

### A qui va dirigit

Aquest how-to va dirigit als usuaris que formin part d'un proveïdor d'infraestructures o d'un proveïdor d'aplicacions de CTTI.

### Introducció

A inicis del mes de maig d'enguany, el SIC ha creat un [Autoservei de jobs pipeline](/noticies/2018-05-16-SIC-Autoservei-pipelines/) mitjançant el qual, amb el treball col·laboratiu dels propis proveïdors d'aplicacions i d'infraestructures i sense la intervenció de l'equip del SIC, es pot construir un job d'automatizació de la construcció i del desplegament de forma automàtica.

En aquest how-to es mostra un exemple de com fer ús del nou Autoservei de jobs pipeline del SIC.

### Requeriments

1. **Col·laboració**: El requeriment més important és que tant el proveïdor d'aplicacions com el proveïdor d'infraestructures han d'estar disposats a col·laborar i mantenir una comunicació fluida. Per a aplicacions noves, un bon punt de trobada sol ser les reunions de **Fase 0** i el seu posterior seguiment.
2. **L'aplicació ha de ser integrable amb l'automatització de la construcció i del desplegament**: Si l'aplicació empra tecnologies no compatibles amb el SIC, òbviament no es podrà generar un job que pugui realitzar les tasques necessàries per a la construcció i/o el desplegament de l'aplicació.

### Flux de tasques per a l'ús de l'Autoservei



### Cas d'exemple: Aplicació d'equipaments

A mode d'exemple, mostrarem com s'integraria una aplicació Canigó 3.2.4 com la d'Equipaments a l'Autoservei del SIC.

#### Detalls de l'aplicació

L'aplicació d'Equipaments és una aplicació Canigó 3.2.4 que está basada en un backend que al fer el build genera un petit artefacte estàtic i un artefacte dinàmic. A nivell de base de dades, disposa d'una h2 embeguda.

Imaginarem que es tracta d'una aplicació amb codi d'aplicació 9999. El proveïdor de l'aplicació és lot A99 i el proveïdor d'infraestructures és CPD9.

#### Punt d'inici

Partim de l'escenari en que tenim un repositori al Gitlab amb aquesta aplicació. A més, disposem ja de la carpeta `/sic` amb l'arxiu `sic.yml` que inclou la  seva versió.

#### Pactar noms d'infraestructura

A l'**Arxiu de Configuració de l'Aplicació (ACA)**, els proveïdors d'aplicacions han de fer referència a les infraestructures on despleguen el seus artefactes. No cal que en coneixin els detalls, simplement cal que s'enumerin indicant-ne en quins entorns estan habilitades.

L'identificador d'aquestes infraestructures l'ha de facilitar el seu proveïdor d'infraestructures, que pel seu compte ja haurà declarat el detall d'aquestes infraestructures en el seu propi repositori a l'**Arxiu de Configuració d'Infraestructures (ACI)**. Aquest identificador correspon al nom de l'ACI (sense l'extensió yml) on es recull el detall de la infraestructura en qüestió.

En aquest cas s'hi identifiquen les següents infraestructures:

* Apache
* Tomcat

El proveïdor d'infraestructures proposa els següents noms d'infraestructura:

* **Apache** → `9999_equipaments_apaches`
* **Tomcat** → `9999_equipaments_tomcats`

#### Generació dels ACI

El proveïdor d'infraestructures, en aquest cas **Suport Cloud**, haurà de crear al seu repositori `https://git.intranet.gencat.cat/cpd9/cpd9.git` (l'accés està securitzat i només el proveïdor d'infraestructures pot entrar i veure/modificar el seu contingut).



En aquest arxiu haurà d'informar la versió de l'ACI, que segueix un versionatge propi. Cada increment de versió ha de ser degut per un canvi en el propi arxiu. Exemple:

```
version: X.Y.Z
```

I a continuació s'ha de generar el detall de cada infraestructura inclosa a l'arxiu.

Dins d'aquest repositori, s'haurà de crear l'arxiu `9999_equipaments_apaches` en el que el proveïdor d'infraestructures informarà la seva part.

```
version: 1.0.0
resources:
  infrastructures:
    - id: elem01
      element: apache
      environment: int
      properties:
        - host: 5.122.181.206
          port: 30022
          user: www-data
          path: /usr/local/apache2/htdocs/equipaments
          password: |
            zJxuWYhJW1+qFVSzcUJigUzSZi8ef9b9+rZrFgCXOIBGPeg3LQ6fR7hER1/dXH5DMK+8yN5x+PLh
            itDoFpCvmTryceGdyHyNgxqZP6Vp7vMdlDEf5vsXQLUeOksDrZ7K6TK0PQPpMc3Cl8SC4d4j5zTS
            ii3LJFle/93vVAZJMNJ6bEpCLTf0tYeeOREtOakQfS0zIvRUX5QZ/YPH/Dg0st2aaCr4Y/gz6tuI
            NfCg/CZ7aaqK7sHHB3Q7KQm3TRLWqbBNIYgITfwILf7xHbXSOdukaH7Vf1VuR/gI9b5gfn+szxGl
            rst+VeebprDapBF2FwaxVK7UtGOHJEQb8cUtwvX3gpugSwtyFWsMRV1IQbl6F58RNxymPx4G9bS1
            hK+GyvSEhyq3y+JS4mhS6cFJCZUutjcB8YSLtM5D70FqJ5KQxh2ZhTqpo8cPh1SnxwPH+itv85fL
            UXj6T1NaslFx29fK2QXhaYMRL9XokMcvSwYu0+OBu5OMXT7LIg5RoWGcpJ0Q23OlEkRqlCGcLniv
            ResNay22mCdeHCa7rz5tqmPHlkGksxF38ZxWzkeTvS7w05wMYNonqN3jO0lKTvDKvjwXFqt2OBRi
            7QDMc+cfO+a7aiDji8oZ3w+NWmfhkkJQUfgK+6n4i6FJBYOPMsIObwIx2GRSSpex9i+bYdRgDzQ=
    - id: elem02
      element: apache
      environment: int
      properties:
        - host: 5.122.181.207
          port: 30022
          user: www-data
          path: /usr/local/apache2/htdocs/equipaments
          password: |
            zJxuWYhJW1+qFVSzcUJigUzSZi8ef9b9+rZrFgCXOIBGPeg3LQ6fR7hER1/dXH5DMK+8yN5x+PLh
            itDoFpCvmTryceGdyHyNgxqZP6Vp7vMdlDEf5vsXQLUeOksDrZ7K6TK0PQPpMc3Cl8SC4d4j5zTS
            ii3LJFle/93vVAZJMNJ6bEpCLTf0tYeeOREtOakQfS0zIvRUX5QZ/YPH/Dg0st2aaCr4Y/gz6tuI
            NfCg/CZ7aaqK7sHHB3Q7KQm3TRLWqbBNIYgITfwILf7xHbXSOdukaH7Vf1VuR/gI9b5gfn+szxGl
            rst+VeebprDapBF2FwaxVK7UtGOHJEQb8cUtwvX3gpugSwtyFWsMRV1IQbl6F58RNxymPx4G9bS1
            hK+GyvSEhyq3y+JS4mhS6cFJCZUutjcB8YSLtM5D70FqJ5KQxh2ZhTqpo8cPh1SnxwPH+itv85fL
            UXj6T1NaslFx29fK2QXhaYMRL9XokMcvSwYu0+OBu5OMXT7LIg5RoWGcpJ0Q23OlEkRqlCGcLniv
            ResNay22mCdeHCa7rz5tqmPHlkGksxF38ZxWzkeTvS7w05wMYNonqN3jO0lKTvDKvjwXFqt2OBRi
            7QDMc+cfO+a7aiDji8oZ3w+NWmfhkkJQUfgK+6n4i6FJBYOPMsIObwIx2GRSSpex9i+bYdRgDzQ=
    - id: elem03
      element: apache
      environment: pre
      properties:
        - host: 5.120.181.206
          port: 30022
          user: www-data
          path: /usr/local/apache2/htdocs/equipaments
          password: |
            zJxuWYhJW1+qFVSzcUJigUzSZi8ef9b9+rZrFgCXOIBGPeg3LQ6fR7hER1/dXH5DMK+8yN5x+PLh
            itDoFpCvmTryceGdyHyNgxqZP6Vp7vMdlDEf5vsXQLUeOksDrZ7K6TK0PQPpMc3Cl8SC4d4j5zTS
            ii3LJFle/93vVAZJMNJ6bEpCLTf0tYeeOREtOakQfS0zIvRUX5QZ/YPH/Dg0st2aaCr4Y/gz6tuI
            NfCg/CZ7aaqK7sHHB3Q7KQm3TRLWqbBNIYgITfwILf7xHbXSOdukaH7Vf1VuR/gI9b5gfn+szxGl
            rst+VeebprDapBF2FwaxVK7UtGOHJEQb8cUtwvX3gpugSwtyFWsMRV1IQbl6F58RNxymPx4G9bS1
            hK+GyvSEhyq3y+JS4mhS6cFJCZUutjcB8YSLtM5D70FqJ5KQxh2ZhTqpo8cPh1SnxwPH+itv85fL
            UXj6T1NaslFx29fK2QXhaYMRL9XokMcvSwYu0+OBu5OMXT7LIg5RoWGcpJ0Q23OlEkRqlCGcLniv
            ResNay22mCdeHCa7rz5tqmPHlkGksxF38ZxWzkeTvS7w05wMYNonqN3jO0lKTvDKvjwXFqt2OBRi
            7QDMc+cfO+a7aiDji8oZ3w+NWmfhkkJQUfgK+6n4i6FJBYOPMsIObwIx2GRSSpex9i+bYdRgDzQ=
    - id: elem04
      element: apache
      environment: pre
      properties:
        - host: 5.120.181.207
          port: 30022
          user: www-data
          path: /usr/local/apache2/htdocs/equipaments
          password: |
            zJxuWYhJW1+qFVSzcUJigUzSZi8ef9b9+rZrFgCXOIBGPeg3LQ6fR7hER1/dXH5DMK+8yN5x+PLh
            itDoFpCvmTryceGdyHyNgxqZP6Vp7vMdlDEf5vsXQLUeOksDrZ7K6TK0PQPpMc3Cl8SC4d4j5zTS
            ii3LJFle/93vVAZJMNJ6bEpCLTf0tYeeOREtOakQfS0zIvRUX5QZ/YPH/Dg0st2aaCr4Y/gz6tuI
            NfCg/CZ7aaqK7sHHB3Q7KQm3TRLWqbBNIYgITfwILf7xHbXSOdukaH7Vf1VuR/gI9b5gfn+szxGl
            rst+VeebprDapBF2FwaxVK7UtGOHJEQb8cUtwvX3gpugSwtyFWsMRV1IQbl6F58RNxymPx4G9bS1
            hK+GyvSEhyq3y+JS4mhS6cFJCZUutjcB8YSLtM5D70FqJ5KQxh2ZhTqpo8cPh1SnxwPH+itv85fL
            UXj6T1NaslFx29fK2QXhaYMRL9XokMcvSwYu0+OBu5OMXT7LIg5RoWGcpJ0Q23OlEkRqlCGcLniv
            ResNay22mCdeHCa7rz5tqmPHlkGksxF38ZxWzkeTvS7w05wMYNonqN3jO0lKTvDKvjwXFqt2OBRi
            7QDMc+cfO+a7aiDji8oZ3w+NWmfhkkJQUfgK+6n4i6FJBYOPMsIObwIx2GRSSpex9i+bYdRgDzQ=
    - id: elem05
      element: apache
      environment: pro
      properties:
        - host: 5.100.181.206
          port: 30022
          user: www-data
          path: /usr/local/apache2/htdocs/equipaments
          password: |
            zJxuWYhJW1+qFVSzcUJigUzSZi8ef9b9+rZrFgCXOIBGPeg3LQ6fR7hER1/dXH5DMK+8yN5x+PLh
            itDoFpCvmTryceGdyHyNgxqZP6Vp7vMdlDEf5vsXQLUeOksDrZ7K6TK0PQPpMc3Cl8SC4d4j5zTS
            ii3LJFle/93vVAZJMNJ6bEpCLTf0tYeeOREtOakQfS0zIvRUX5QZ/YPH/Dg0st2aaCr4Y/gz6tuI
            NfCg/CZ7aaqK7sHHB3Q7KQm3TRLWqbBNIYgITfwILf7xHbXSOdukaH7Vf1VuR/gI9b5gfn+szxGl
            rst+VeebprDapBF2FwaxVK7UtGOHJEQb8cUtwvX3gpugSwtyFWsMRV1IQbl6F58RNxymPx4G9bS1
            hK+GyvSEhyq3y+JS4mhS6cFJCZUutjcB8YSLtM5D70FqJ5KQxh2ZhTqpo8cPh1SnxwPH+itv85fL
            UXj6T1NaslFx29fK2QXhaYMRL9XokMcvSwYu0+OBu5OMXT7LIg5RoWGcpJ0Q23OlEkRqlCGcLniv
            ResNay22mCdeHCa7rz5tqmPHlkGksxF38ZxWzkeTvS7w05wMYNonqN3jO0lKTvDKvjwXFqt2OBRi
            7QDMc+cfO+a7aiDji8oZ3w+NWmfhkkJQUfgK+6n4i6FJBYOPMsIObwIx2GRSSpex9i+bYdRgDzQ=
    - id: elem06
      element: apache
      environment: pro
      properties:
        - host: 5.100.181.207
          port: 30022
          user: www-data
          path: /usr/local/apache2/htdocs/equipaments
          password: |
            zJxuWYhJW1+qFVSzcUJigUzSZi8ef9b9+rZrFgCXOIBGPeg3LQ6fR7hER1/dXH5DMK+8yN5x+PLh
            itDoFpCvmTryceGdyHyNgxqZP6Vp7vMdlDEf5vsXQLUeOksDrZ7K6TK0PQPpMc3Cl8SC4d4j5zTS
            ii3LJFle/93vVAZJMNJ6bEpCLTf0tYeeOREtOakQfS0zIvRUX5QZ/YPH/Dg0st2aaCr4Y/gz6tuI
            NfCg/CZ7aaqK7sHHB3Q7KQm3TRLWqbBNIYgITfwILf7xHbXSOdukaH7Vf1VuR/gI9b5gfn+szxGl
            rst+VeebprDapBF2FwaxVK7UtGOHJEQb8cUtwvX3gpugSwtyFWsMRV1IQbl6F58RNxymPx4G9bS1
            hK+GyvSEhyq3y+JS4mhS6cFJCZUutjcB8YSLtM5D70FqJ5KQxh2ZhTqpo8cPh1SnxwPH+itv85fL
            UXj6T1NaslFx29fK2QXhaYMRL9XokMcvSwYu0+OBu5OMXT7LIg5RoWGcpJ0Q23OlEkRqlCGcLniv
            ResNay22mCdeHCa7rz5tqmPHlkGksxF38ZxWzkeTvS7w05wMYNonqN3jO0lKTvDKvjwXFqt2OBRi
            7QDMc+cfO+a7aiDji8oZ3w+NWmfhkkJQUfgK+6n4i6FJBYOPMsIObwIx2GRSSpex9i+bYdRgDzQ=
```

Com es pot comprovar, el proveïdor informa les dades de cada apache de cada entorn que són necessàries per a que el SIC pugui connectarse i desplegar el contingut estàtic de l'aplicació.

Per seguretat el camp password està encriptat amb la clau pública del SIC. La clau i les instruccions per a la seva generació estàn disponibles [en aquest enllaç](/sic/clau).

També dins d'aquest repositori, s'haurà de crear l'arxiu `9999_equipaments_tomcats` en el que el proveïdor d'infraestructures informarà la seva part:

```
version: 1.0.0
resources:
  infrastructures:
    - id: elem01
      element: tomcat
      environment: int
      properties:
        - host: 5.122.185.206
          port: 30494
          user: multiTenant123SICMaster
          protocol: http
          context: equipaments
          tomcatVersion: 8
          password: |
            X5XwlCProDqeExcN85u7iTarsmFCefJvGAG08SGMotT3fCgPLTffZV6mT9pr9SDpAt7VqTdo7WN9
            D0bAVrIgqo+YeinMw7G8ezymWigrv+Ggic9jmXh7OdJpfVtMovLVe9ht77e7y6km53qJH5vrWuB5
            vX7CK/PqHGTZtGn3dz2dWAlPba7o/DJw3pZSTKurOWPHDE4AxcQssl3QEn27BYBJMfwc16a9LZZB
            kF9parETop4Y4Khx1+WpRLKgbqE2BuTktpeZSKtHUFbwJmfxfGEQzAoKQCnR6Uk3NqPcSKaAQzbl
            7le5zZqIQFbXNIkrnSqG8IApHeuEnKj5uR/icaAKPrOQO/p6DKiretYP/6RM7LtfM/BdMywJ0Ww6
            jr+G3mUhCop0RNlN8V4AGn2NeO6M/GE92390OcP3IZqsMX7mlu9AXDyIDAOMXfge4SOBkF3mm22r
            wCV7jRN7PDO2atYE4GFMRBMpYnoChXwtYPrjIi9/dbjKz0kQBHFeJh4TZC2z3ESvc41sQIAjmJUc
            zjspj5oW8J5J9Z/PSFlEgi1C3Truw6yKOeuIvD75TLT+Ocs6OJyj8JSmsacoXfVBRzFVcx8VBm+U
            nEQsRcysPIpKijxdJ4XeV0svHJlk/AKBLq9lgTN4y4uQ9b/W9ZtpLQuHsMqN+fb2nh9+A8dnD6A=
    - id: elem02
      element: tomcat
      environment: int
      properties:
        - host: 5.122.185.207
          port: 30494
          user: multiTenant123SICMaster
          protocol: http
          context: equipaments
          tomcatVersion: 8
          password: |
            X5XwlCProDqeExcN85u7iTarsmFCefJvGAG08SGMotT3fCgPLTffZV6mT9pr9SDpAt7VqTdo7WN9
            D0bAVrIgqo+YeinMw7G8ezymWigrv+Ggic9jmXh7OdJpfVtMovLVe9ht77e7y6km53qJH5vrWuB5
            vX7CK/PqHGTZtGn3dz2dWAlPba7o/DJw3pZSTKurOWPHDE4AxcQssl3QEn27BYBJMfwc16a9LZZB
            kF9parETop4Y4Khx1+WpRLKgbqE2BuTktpeZSKtHUFbwJmfxfGEQzAoKQCnR6Uk3NqPcSKaAQzbl
            7le5zZqIQFbXNIkrnSqG8IApHeuEnKj5uR/icaAKPrOQO/p6DKiretYP/6RM7LtfM/BdMywJ0Ww6
            jr+G3mUhCop0RNlN8V4AGn2NeO6M/GE92390OcP3IZqsMX7mlu9AXDyIDAOMXfge4SOBkF3mm22r
            wCV7jRN7PDO2atYE4GFMRBMpYnoChXwtYPrjIi9/dbjKz0kQBHFeJh4TZC2z3ESvc41sQIAjmJUc
            zjspj5oW8J5J9Z/PSFlEgi1C3Truw6yKOeuIvD75TLT+Ocs6OJyj8JSmsacoXfVBRzFVcx8VBm+U
            nEQsRcysPIpKijxdJ4XeV0svHJlk/AKBLq9lgTN4y4uQ9b/W9ZtpLQuHsMqN+fb2nh9+A8dnD6A=
    - id: elem03
      element: tomcat
      environment: pre
      properties:
        - host: 5.120.185.206
          port: 30494
          user: multiTenant123SICMaster
          protocol: http
          context: equipaments
          tomcatVersion: 8
          password: |
            X5XwlCProDqeExcN85u7iTarsmFCefJvGAG08SGMotT3fCgPLTffZV6mT9pr9SDpAt7VqTdo7WN9
            D0bAVrIgqo+YeinMw7G8ezymWigrv+Ggic9jmXh7OdJpfVtMovLVe9ht77e7y6km53qJH5vrWuB5
            vX7CK/PqHGTZtGn3dz2dWAlPba7o/DJw3pZSTKurOWPHDE4AxcQssl3QEn27BYBJMfwc16a9LZZB
            kF9parETop4Y4Khx1+WpRLKgbqE2BuTktpeZSKtHUFbwJmfxfGEQzAoKQCnR6Uk3NqPcSKaAQzbl
            7le5zZqIQFbXNIkrnSqG8IApHeuEnKj5uR/icaAKPrOQO/p6DKiretYP/6RM7LtfM/BdMywJ0Ww6
            jr+G3mUhCop0RNlN8V4AGn2NeO6M/GE92390OcP3IZqsMX7mlu9AXDyIDAOMXfge4SOBkF3mm22r
            wCV7jRN7PDO2atYE4GFMRBMpYnoChXwtYPrjIi9/dbjKz0kQBHFeJh4TZC2z3ESvc41sQIAjmJUc
            zjspj5oW8J5J9Z/PSFlEgi1C3Truw6yKOeuIvD75TLT+Ocs6OJyj8JSmsacoXfVBRzFVcx8VBm+U
            nEQsRcysPIpKijxdJ4XeV0svHJlk/AKBLq9lgTN4y4uQ9b/W9ZtpLQuHsMqN+fb2nh9+A8dnD6A=
    - id: elem04
      element: tomcat
      environment: pre
      properties:
        - host: 5.120.185.207
          port: 30494
          user: multiTenant123SICMaster
          protocol: http
          context: equipaments
          tomcatVersion: 8
          password: |
            X5XwlCProDqeExcN85u7iTarsmFCefJvGAG08SGMotT3fCgPLTffZV6mT9pr9SDpAt7VqTdo7WN9
            D0bAVrIgqo+YeinMw7G8ezymWigrv+Ggic9jmXh7OdJpfVtMovLVe9ht77e7y6km53qJH5vrWuB5
            vX7CK/PqHGTZtGn3dz2dWAlPba7o/DJw3pZSTKurOWPHDE4AxcQssl3QEn27BYBJMfwc16a9LZZB
            kF9parETop4Y4Khx1+WpRLKgbqE2BuTktpeZSKtHUFbwJmfxfGEQzAoKQCnR6Uk3NqPcSKaAQzbl
            7le5zZqIQFbXNIkrnSqG8IApHeuEnKj5uR/icaAKPrOQO/p6DKiretYP/6RM7LtfM/BdMywJ0Ww6
            jr+G3mUhCop0RNlN8V4AGn2NeO6M/GE92390OcP3IZqsMX7mlu9AXDyIDAOMXfge4SOBkF3mm22r
            wCV7jRN7PDO2atYE4GFMRBMpYnoChXwtYPrjIi9/dbjKz0kQBHFeJh4TZC2z3ESvc41sQIAjmJUc
            zjspj5oW8J5J9Z/PSFlEgi1C3Truw6yKOeuIvD75TLT+Ocs6OJyj8JSmsacoXfVBRzFVcx8VBm+U
            nEQsRcysPIpKijxdJ4XeV0svHJlk/AKBLq9lgTN4y4uQ9b/W9ZtpLQuHsMqN+fb2nh9+A8dnD6A=
    - id: elem05
      element: tomcat
      environment: pro
      properties:
        - host: 5.100.185.206
          port: 30494
          user: multiTenant123SICMaster
          protocol: http
          context: equipaments
          tomcatVersion: 8
          password: |
            X5XwlCProDqeExcN85u7iTarsmFCefJvGAG08SGMotT3fCgPLTffZV6mT9pr9SDpAt7VqTdo7WN9
            D0bAVrIgqo+YeinMw7G8ezymWigrv+Ggic9jmXh7OdJpfVtMovLVe9ht77e7y6km53qJH5vrWuB5
            vX7CK/PqHGTZtGn3dz2dWAlPba7o/DJw3pZSTKurOWPHDE4AxcQssl3QEn27BYBJMfwc16a9LZZB
            kF9parETop4Y4Khx1+WpRLKgbqE2BuTktpeZSKtHUFbwJmfxfGEQzAoKQCnR6Uk3NqPcSKaAQzbl
            7le5zZqIQFbXNIkrnSqG8IApHeuEnKj5uR/icaAKPrOQO/p6DKiretYP/6RM7LtfM/BdMywJ0Ww6
            jr+G3mUhCop0RNlN8V4AGn2NeO6M/GE92390OcP3IZqsMX7mlu9AXDyIDAOMXfge4SOBkF3mm22r
            wCV7jRN7PDO2atYE4GFMRBMpYnoChXwtYPrjIi9/dbjKz0kQBHFeJh4TZC2z3ESvc41sQIAjmJUc
            zjspj5oW8J5J9Z/PSFlEgi1C3Truw6yKOeuIvD75TLT+Ocs6OJyj8JSmsacoXfVBRzFVcx8VBm+U
            nEQsRcysPIpKijxdJ4XeV0svHJlk/AKBLq9lgTN4y4uQ9b/W9ZtpLQuHsMqN+fb2nh9+A8dnD6A=
    - id: elem06
      element: tomcat
      environment: pro
      properties:
        - host: 5.100.185.207
          port: 30494
          user: multiTenant123SICMaster
          protocol: http
          context: equipaments
          tomcatVersion: 8
          password: |
            X5XwlCProDqeExcN85u7iTarsmFCefJvGAG08SGMotT3fCgPLTffZV6mT9pr9SDpAt7VqTdo7WN9
            D0bAVrIgqo+YeinMw7G8ezymWigrv+Ggic9jmXh7OdJpfVtMovLVe9ht77e7y6km53qJH5vrWuB5
            vX7CK/PqHGTZtGn3dz2dWAlPba7o/DJw3pZSTKurOWPHDE4AxcQssl3QEn27BYBJMfwc16a9LZZB
            kF9parETop4Y4Khx1+WpRLKgbqE2BuTktpeZSKtHUFbwJmfxfGEQzAoKQCnR6Uk3NqPcSKaAQzbl
            7le5zZqIQFbXNIkrnSqG8IApHeuEnKj5uR/icaAKPrOQO/p6DKiretYP/6RM7LtfM/BdMywJ0Ww6
            jr+G3mUhCop0RNlN8V4AGn2NeO6M/GE92390OcP3IZqsMX7mlu9AXDyIDAOMXfge4SOBkF3mm22r
            wCV7jRN7PDO2atYE4GFMRBMpYnoChXwtYPrjIi9/dbjKz0kQBHFeJh4TZC2z3ESvc41sQIAjmJUc
            zjspj5oW8J5J9Z/PSFlEgi1C3Truw6yKOeuIvD75TLT+Ocs6OJyj8JSmsacoXfVBRzFVcx8VBm+U
            nEQsRcysPIpKijxdJ4XeV0svHJlk/AKBLq9lgTN4y4uQ9b/W9ZtpLQuHsMqN+fb2nh9+A8dnD6A=
```

Us recordem que al [Manual d'usuari del SIC](/related/sic/manual-usuari.pdf) s'hi explica quins camps requereix cada tipus d'infraestructura.

#### Generació de l'ACA

D'altra banda, el proveïdor d'aplicacions haurà de generar l'ACA al repositori del seu projecte, a l'arxiu `/sic/aca.yml`.

En aquest arxiu haurà d'informar la versió de l'ACA, que segueix un versionatge diferent del de l'aplicació. Cada increment de versió ha de ser degut per un canvi en el propi arxiu. Exemple:

```
versio: X.Y.Z
```

A continuació, s'han d'informar els paràmetres (són opcionals, pot ser una llista de 0 elements). Els paràmetres s'utilitzen per aplicar substitucions  allà on aparegui `${nom_param}` s'aplicarà el valor `valor_param`.

```
parameters:
  - name: nom_param_1
    value: valor_param_1
  - name: nom_param_2
    value: valor_param_2
```

Tot seguit, cal definir els recursos dins de l'entitat `resources`. Hi ha 3 tipus de recursos:
* entorns (`environments`)
* infraestructures (`infrastructures`)
* artefactes (`artifacts`)

Finalment, cal informar el procés de construcció i el procés de desplegament afegint steps tal i com es descriu al [Manual d'usuari del SIC](/related/sic/manual-usuari.pdf).

L'ACA resultant seria:

```
version: 1.2.2
parameters:
resources:
  environments:
    - id: int
      environment: int
      position: 1
    - id: pre
      environment: pre
      position: 2
    - id: pro
      environment: pro
      position: 3
  infrastructures:
    - id: 9999_equipaments_apaches
      element: apache
      environments:
        - environment: int
          vars:
        - environment: pre
          vars:
        - environment: pro
          vars:
      provider: cpd9
    - id: 9999_equipaments_tomcats
      element: tomcat
      environments:
        - environment: int
          vars:
        - environment: pre
          vars:
        - environment: pro
          vars:
      provider: cpd9
  artifacts:
    - id: artifact01
      artifactType: static
      path: target/canigo324Armau-static.zip
    - id: artifact02
      artifactType: dynamic
      path: target/canigo324Armau.war.original
build:
  steps:
    - id: bs001
      position: 1
      tool: maven_3.2.2
      parameters: clean package -Dmaven.test.skip=true
      generates:
        - artifact01
        - artifact02
deploy:
  steps:
    - id: dp001
      position: 1
      type: predefined
      destination: 9999_equipaments_apaches
      artifact: artifact01
    - id: dp002
      position: 2
      type: predefined
      destination: 9999_equipaments_tomcats
      artifact: artifact02
```

En l'exemple anterior, es defineixen:
* 3 entorns: int, pre i pro.
* 2 elements d'infraestructures:
	* Apaches, en els 3 entorns.
	* Tomcats, en els 3 entorns.
* 2 artefactes:
	* L'artefacte estàtic
	* L'artefacte dinàmic
* El procés de construcció, amb un únic step:
	* Construcció maven (versió 3.2.2) amb els paràmetres: `clean package -Dmaven.test.skip=true`. Aquest step genera els dos artefactes anteriorment descrits i així ho indiquem amb la llista `generates`.
* El procés de desplegament, amb dos steps:
	* Desplegament de l'artefacte estàtic als apaches.
	* Desplegament de l'artefacte dinàmic als tomcats.

Si teniu cap dubte al respecte, podeu obrir una [consulta](http://canigo.ctti.gencat.cat/howtos/2018-01-howto-obrir-peticions-SIC-a-autoservei-Remedy/#consulta) a SAU Remedy.

