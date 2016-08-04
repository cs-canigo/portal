+++
date        = "2015-06-26"
title       = "Formularis"
description = "Formularis de SIC"
sections    = "SIC"
+++


### Formularis

- [Formulari Gestió d'usuaris al SIC](/related/sic/SIC-Formulari-Gestio-usuaris.xlsx)<br />
  Cal fer servir aquest formulari per a tramitar les altes i modificacions de dades dels usuaris que necessiten accedir al Repositori de codi font del SIC (SVN) i/o al Portal d'Integració Contínua (Jenkins). 

- [Formulari d'inscripció d'usuari com a Gestor de peticions SIC a SAU-Remedy](/related/sic/SIC-Formulari-Gestor-peticions-SIC-a-SAU-Remedy.xlsx)<br />
  Cal fer servir aquest formulari per demanar l'autorització d'usuaris per obrir peticions de SIC a SAU-Remedy relacionades amb al Portal d'Integració Contínua (Jenkins). Per més informació sobre aquest rol, consultar el següent [article] (/noticies/2015-12-23-SIC-Nou-rol-de-peticionari-a-SAU-Remedy/). 
  
- [Formulari d'alta d'aplicació per a la Custòdia de codi al SIC](/related/sic/SIC-Formulari-Custodia-Codi-Aplicacio.xlsx)<br />
  Cal fer servir aquest formulari per a tramitar l'alta o modificació de dades d'una aplicació al Repositori de codi font del SIC (SVN). 

- [Formulari d'alta d'aplicació per al Portal d'Integració Contínua (Tasques al Jenkins)](/related/sic/SIC-Formulari-Construccio-Desplegament-Aplicacio.xlsx)<br />
  Cal fer servir aquest formulari per a tramitar l'alta o modificació de dades dels Jobs d'una aplicació al Portal d'Integració Contínua del SIC (Jenkins). 

- [Formulari d'accés per a CPD al SIC](/related/sic/SIC-Formulari-CPD.xlsx)<br />
  Aquest formulari està destinat a donar accés als administradors de CPD al SIC. En cas que es vulgui donar accés a un CPD a aplicacions informar els blocs "Dades CPD" (Fulla Dades CPD) i "Llistat d'aplicacions" (Fulla dades aplicacions). Si el que es vol és donar d'alta usuaris administradors de CPD també cal emplenar el bloc "Usuaris administradors de CPD" (Fulla Dades CPD). En cas que s'informi el camp "Accés a artefactes al repositori de codi font" amb valor 'Si' per algún usuari, cal que el proveïdor de l'aplicació hagi gestionat abans amb l'equip del SIC la realització d'una excepció a les restriccions que impedeixen per defecte custodiar artefactes (.war, .ear, .jar) al Subversion del SIC. 

  
  <p>&nbsp;</p>

**Notes**

És obligatori que tant la petició de creació d'aplicació al repositori de codi font del SIC com la petició d'alta dels Jobs d'una aplicació al Portal d'Integració Contínua del SIC sigui realitzada pel responsable del projecte (persona dins el CTTI o d'un Departament).

És obligatori que les peticions de modificació de dades sobre una aplicació donada d'alta al repositori de codi font del SIC o al Portal d'Integració Contínua del SIC sigui realitzada pel responsable tècnic de l'aplicació (persona responsable per part del proveïdor) o bé pel responsable del projecte.

És obligatori que les peticions d'inscripció com a Gestor de peticions SIC a SAU-Remedy sigui realitzada pel responsables d'arquitectura i qualitat del Lot.

Per aquelles aplicacions que no tenen codi de diàleg cal seguir el següent [procediment](/sic-related/procediment).

Per a més informació relativa als grups de permisos dels usuaris, llistat d'àmbits disponibles i repositoris de codi font creats degut a l'adaptació al nou model SIC, es pot consultar la Informació sobre el [nou model TIC al SIC](/sic-related/nou-model-tic).

Per a més informació relativa al sistema d'autorització de peticions SIC a SAU-Remedy, consultar el [Sistema d'autorització de peticions SIC a SAU-Remedy] (/noticies/2015-12-18-SIC-Sistema-autoritzacions-peticions/).