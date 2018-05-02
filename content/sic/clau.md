+++
date        = "2018-05-02"
title       = "Clau pública del SIC"
description = "Clau pública del SIC"
sections    = "SIC"
taxonomies  = []
weight 		= 11
+++


## Clau pública del SIC

<a href="/related/sic/key/sic_id_rsa.pub.pem" download target="_blank" style="display: block; margin: 25px auto; border-radius: 5px; width: 200px; padding: 10px; color: white !important; text-decoration: none !important;background-color: #CC0000;text-align: center;font-weight:bold;">
Descarregar la clau
</a>

La infraestructura de clau pública (PKI en anglès) permet establir un sistema de xifrat en el que es permet l'execució amb garanties operacionals criptogràfiques, tals com el xifrat, la firma digital i el no repudi de transaccions electròniques.

El SIC aprofita els avantatges d'aquest sistema oferint aquesta clau pública als seus usuaris per tal que aquests puguin fer-ne ús en els procediments operatius que la requereixin. Es tracta d’un arxiu `.pem` amb la clau pública del SIC. Aquesta clau consisteix en una RSA de 4096 bits.

Actualment, l'únic cas d'ús d'aquesta clau es el següent:

* Utilització en l'Autoservei de _Jobs pipeline_. En el casos en els que el proveïdor d'infraestructures necessita introduir paraules de pas als descriptors ACI.

	En aquest cas, per encriptar les paraules de pas per a la seva introducció en l'ACI, es pot utilitzar la següent comanda:

    ```
    $ echo '<password_a_encriptar>' | openssl rsautl -encrypt -pubin -inkey sic_id_rsa.pub.pem | base64
	K0zcD3BuLKN55XVjqpovmwbJDEVehnEN7pz06ytPMlBowuc2IATSyH/c/zN5EmLE5DFoJcRLFA9B
	Nmf0rh0yzUDb3kS+jXUuFhx+N35N2ScbemiZL3sjji3icXqgWmiQTmfp1hCAZgq5oMfMJzpwjWlq
	ubT15lXq/6jgkj0hS9pYUpZBz0rH6IX0q81xRvsnQteMyrtQik/p/2ZaTbj0ciiLG61kkVcGSZLo
	sr9iOVdFh3q8Ok7+CAPhKaa/maGn0LEeaafj+5pBLE9AWcOy98imBRUzr4C8bi9ydMjuRdvd12XT
	1JdcHer/G1ZWBx9yEIYQEGgG/eFR4njNBjtjH/A53YBcbLIH2ZzHI3v33PCE5W3aVoK5qVqdVf64
	GlicdVQ2VSm7ROE4bfcUu4BzVw1em6hUw6LSXxH6GrKVxFe0JVWbrIlOyDL1nGu3Yu6zdplayK+q
	anqNjSRixyLOjoKon2g80dHGd12S7j1av3oyhPz/1KlqMt71YgTrZG3GxeW7NB356V/18bY/PwCn
	UcNttMs3oOvt+6d4UgeqqesA1fgDx92X+zIoyOTh2rnkfWo554cwqg+w3JaB5Kp30vGJNXwrvR+W
	+x4v2PLCO1D2b59Bb3n9/rFENXHE8wYLPAecPoSNjB6dB2/JdZibUwDJz+T98nOlcgJ7FcBBQ4s=
	$
    ```

No es descarta que aquesta clau s'utilitzi en futures noves operatives amb el SIC. En tal cas, s'introduirà en el llistat anterior tots els usos.

Si teniu cap dubte en l'ús de la clau, podeu obrir una [consulta](/howtos/2018-01-howto-obrir-peticions-SIC-a-autoservei-Remedy/#consulta) a SAU Remedy.