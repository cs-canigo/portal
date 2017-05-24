+++
date        = "2017-05-01"
title       = "Connectar amb un cluster MongoDB per SSL en una aplicació NodeJS"
description = "Connectar amb un cluster MongoDB per SSL en una aplicació NodeJS"
section     = "howtos"
categories  = ["canigo"]
key         = "MAIG2017"
+++

### A qui va dirigit

Aquest how-to va dirigit a tots aquells perfils tècnics que tinguin la necessitat de connectar-se amb un cluster MongoDB que requereixi SSL des d'una aplicació NodeJS.

### Introducció

Les connexions entre les aplicacions i les base de dades MongoDB haurien de realitzar-se amb connexió segura (SSL), sobretot en el cas que la base de dades estigui a cloud públic. En aquest how-to s'explica com fer-ho a una aplicació NodeJS.

### Obtenir certificat

El primer pas és obtenir el certificat (ja sigui autosignat o emès per una entitat de confiança com Verisign) del proveïdor de la base de dades.

### [MongoClient](https://www.mongoclient.com/)

És el connector oficial al qual dóna suport [MongoDB](https://www.mongodb.com/), i correspon al paquet 'mongodb' de NodeJS.

Exemple:

	var MongoClient = require('mongodb').MongoClient
		, format = require('util').format;

	var fs = require('fs');
		
	var caFile = fs.readFileSync(__dirname + '/mongodbcert.crt');
		
	MongoClient.connect('mongodb://user:password@host:port/db', 
		{ 	mongos: {
				ssl: true,
				sslValidate: true,
				sslCA: caFile,
				poolSize: 1,
				reconnectTries: 1
			}
		}
		,function (err, db) {
			if (err) {
				throw err;
			} else {
				console.log("successfully connected to the database");
			}
		db.close();
	});
	
A la variable caFile es carrega el certificat, i l'afegim com a paràmetre **sslCA** a Mongoclient.connect.

Per a configurar l'accés SSL és necessari afegir també les propietats **ssl** i **sslValidate** amb valor "true".
	
### [Mongoose](http://mongoosejs.com/)

El paquet 'mongoose', el qual permet treballar amb un model orientat a objectes, també és vàlid i suportat per la comunitat.

Exemple:

	const mongoose = require('mongoose');
	const fs = require('fs');

	const mongoOpt = {
			  "server": {
				"auto_reconnect": true,
				"reconnectTries": 1,
				"socketOptions": {
				  "keepAlive": 1,
				  "connectTimeoutMS": 30000
				}
			  },
			  "mongos": {
				"ssl": true,
				"sslValidate": true,
				"sslCA": fs.readFileSync(__dirname + '/mongodbcert.crt')
			  }
			};

	mongoose.connect('mongodb://user:password@host:port/db', mongoOpt);

	var db = mongoose.connection;
	db.on('error', function(err) {
		console.error('Error in MongoDB connection: ' + err);
		mongoose.disconnect();
	});

	db.on('connected', function() {
		console.log('Connexió amb el servidor de BBDD');
		mongoose.disconnect();
	});

Quan es realitza la connexió, al paràmetre d'opcions (mongoOpt) s'han d'afegir les propietats **ssl** i **sslValidate** a "true" i **sslCA** amb el fitxer corresponent al certificat.
