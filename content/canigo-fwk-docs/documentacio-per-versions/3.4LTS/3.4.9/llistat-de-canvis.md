+++
date        = "2021-12-27"
title       = "Llistat de canvis"
description = "Llistat de canvis Canigó 3.4.9"
sections    = "canigo-fwk-docs"
aliases = [
    "/canigo-download-related/release-notes-canigo-34/"
]
weight      = 1
+++

#### Canigó 3.4.9 (27/12/2021)
- [Resolució de vulnerabilitat Log4Shell](/noticies/2021-12-27-CAN-actualitzacio-canigo-3_4_9_3_6_3/)
   - Actualització de tots els mòduls de Canigó per a utilitzar la versió 2.17.0 de log4j
- [Actualització de l’_archetype_ 1.6.10](/noticies/2021-12-27-CAN-Actualitzacio_archetype_1_6_10)
   - Actualització de l’_archetype_ versió 1.6.10 per a generar projectes amb Canigó 3.4.9.

#### Canigó 3.4.8 (17/12/2021)
- [Resolució de vulnerabilitat Log4Shell](/noticies/2021-12-17-CAN-actualitzacio-canigo-3_4_8_3_6_2/)
   - Actualització de tots els mòduls de Canigó per a utilitzar la versió 2.16.0 de log4j
- [Actualització de l’_archetype_ 1.6.9](/noticies/2021-12-17-CAN-Actualitzacio_archetype_1_6_9)
   - Actualització de l’_archetype_ versió 1.6.9 per a generar projectes amb Canigó 3.4.8.

#### Canigó 3.4.7 (13/12/2021)
- [Resolució de vulnerabilitat Log4Shell](/noticies/2021-12-13-CAN-actualitzacio-canigo-3_4_7_3_6_1/)
   - Actualització de tots els mòduls de Canigó per a utilitzar la versió 2.15.0 de log4j
- [Actualització de l’_archetype_ 1.6.8](/noticies/2021-12-13-CAN-Actualitzacio_archetype_1_6_8)
   - Actualització de l’_archetype_ versió 1.6.8 per a generar projectes amb Canigó 3.4.7.

#### Canigó 3.4.6 (11/05/2021)
- [Adaptació connector Sarcat PICA](/noticies/2021-05-11-Resolucio_problema_connector_SARCAT_PICA/)
   - S’ha revisat i resolt el problema detectat al mòdul d’integració del connector SARCAT PICA.
- Revisió interna execució de tests dels mòduls
   - S’ha revisat la forma d’execució dels tests dels mòduls per a utilitzar imatges docker builder del catàleg del SIC 2.0.

#### Canigó 3.4.5 (16/09/2020)
- [Revisió regles SonarQube mòduls _integració_](/noticies/2020-09-09-Revisio_regles_SonarQube_moduls_integracio/)
   - S'han revisat i resolt els problemes detectats per les regles de SonarQube als mòduls _integració_ de Canigó.
- [Actualització plugin Eclipse 1.7.10](/noticies/2020-09-15-Actualitzacio_plugin_eclipse_1_7_10)
   - Actualització del _plugin_ de l'Eclipse de Canigó versió 1.7.10 per a utilitzar les versions dels mòduls _integració_ amb les correccions de l'anàlisi de SonarQube.

#### Canigó 3.4.4 (16/06/2020)
- [Actualització del mòdul MongoDB](/noticies/2020-04-28-Actualitzacio_modul_Mongo_update_driver/)
   - Actualització del mòdul de MongoDB per a utilitzar el _driver_ de Mongo compatible amb la versió 4.2 de MongoDB.
- [Actualització de l’_archetype_ 1.6.6 i del _plugin_ Eclipse 1.7.8](/noticies/2020-04-28-Actualitzacio_plugin_eclipse_1_7_8/)
   - Actualització de l’_archetype_ versió 1.6.6 i del _plugin_ de l'Eclipse de Canigó versió 1.7.8 per a utilitzar l'última versió del mòdul de MongoDB compatible amb la versió 4.2 de MongoDB.
- [Revisió de regles SonarQube als mòduls _core_](/noticies/2020-06-09-Revisio_regles_SonarQube_moduls_core/)
   - S'han revisat i resolt els problemes detectats per les regles de SonarQube als mòduls _core_ de Canigó.
- [Actualització del mòdul Seguretat](/noticies/2020-06-11-Actualitzacio_modul_Seguretat_compressio_token)
   - Actualització del mòdul de seguretat de Canigó per a proporcionar la possibilitat de compressió del token JWT.
- [Actualització de l’_archetype_ 1.6.7 i del _plugin_ Eclipse 1.7.9](/noticies/2020-06-11-Actualitzacio_archetype_1_6_7_plugin_eclipse_1_7_9)
   - Actualització de l’_archetype_ versió 1.6.7 i del _plugin_ de l'Eclipse de Canigó versió 1.7.9 per a utilitzar les versions dels mòduls _core_ amb les correccions de l'anàlisi de SonarQube.

#### Canigó 3.4.3 (26/03/2020)
- [Autorització GICAR a Canigó amb SAML] (/noticies/2020-03-24-Actualitzacio_modul_Seguretat_Saml/)
   - Actualització del mòdul de seguretat SAML per a incorporar l’opció de l’obtenció dels rols de l’usuari a través de GICAR (autorització).
- [Revisió estat dels mòduls Canigó] (/noticies/2020-03-24-Revisio_estat_moduls_Canigo_3.4)
   - Revisió de l'estat dels mòduls de Canigó, deprecant funcionalitats obsoletes i ampliant els testos dels mòduls.
- [Actualització del _plugin_ de Canigó per a utilitzar l'última versió del mòdul de seguretat SAML] (/noticies/2020-03-24-Actualitzacio_Actualitzacio_archetype_1_6_5_plugin_eclipse_1_7_7/)
   - Actualització del _plugin_ de l'Eclipse de Canigó per a utilitzar l'última versió del mòdul de seguretat SAML on s’ofereix la funcionalitat d’obtenció dels rols de l’usuari a través de GICAR (autorització).

#### Canigó 3.4.2 (25/10/2019)

- [Autorització GICAR a Canigó] (/noticies/2019-10-22-Actualitzacio_modul_Seguretat)
   - Actualització del mòdul de seguretat per a incorporar l’opció de l’obtenció dels rols de l’usuari a través de GICAR (autorització).
- [Actualització del _plugin_ de Canigó per a incloure nova opció seguretat autorització GICAR a Canigó] (/noticies/2019-10-25-Actualitzacio_plugin_eclipse_1_7_6)
   - Actualització del _plugin_ de l'Eclipse de Canigó per a incloure nova opció de l’obtenció dels rols de l’usuari a través de GICAR (autorització) al mòdul de seguretat.

#### Canigó 3.4.1 (17/09/2019)

- [Dependency Check] (/noticies/2019-09-12-Actualitzacio_moduls_Canigo_Dependency_check)
   - Actualització de llibreries depenents dels mòduls passant el dependency check.
- [Actualització del connector antivirus Canigó de Symantec] (/noticies/2019-09-17-Actualitzacio_modul_Antivirus)
   - Actualització del connector de l'Antivirus de Canigó que actualment està utilitzant la versió 7 a la última versió disponible.
- [Evolució del mòdul d'integració SSC] (/noticies/2019-09-17-Actualitzacio_modul_SSC)
   - Actualització del connector de SSC de Canigó per a utilitzar la versió 1.3.3 del servei de SSC del AOC.
- [Actualització de la plantilla i del _plugin_ Canigó versió 3.4.1] (/noticies/2019-09-18-Actualitzacio_archetype_1_6_4_plugin_eclipse_1_7_5/)
   - Actualització del _archetype_ i del _plugin_ de l'Eclipse de Canigó per a generar aplicacions amb versió de Canigó 3.4.1.

#### Canigó 3.4.0 (29/03/2018)

- [Actualització de tecnologies base] (/noticies/2019-03-29-actualitzacio-canigo-3_4_0)
   - Actualització a Java 11, Spring 5, Spring Boot 2.
   - Suport a programació amb Streams Reactius.
   - Suport a programació reactiva.
   - Suport a programació funcional.
   - Suport configuració propietats amb yaml.
- [Actualització del mòdul integració ARESTA/PSGD] (/canigo-fwk-docs/documentacio-per-versions/3.4LTS/3.4.3/moduls/moduls-integracio/modul-psgd/)