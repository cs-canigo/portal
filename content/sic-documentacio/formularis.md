+++
date        = "2015-06-26"
title       = "Formularis"
description = "Formularis de SIC"
sections    = "SIC"
+++


### Formularis

- [Formulari d'accés per a CPD al SIC](/related/sic/SIC-Formulari-CPD.xlsx)<br />
  Aquest formulari està destinat a donar accés als administradors de CPD al SIC. En cas que es vulgui donar accés a un CPD a aplicacions informar els blocs "Dades CPD" (Fulla Dades CPD) i "Llistat d'aplicacions" (Fulla dades aplicacions). Si el que es vol és donar d'alta usuaris administradors de CPD també cal emplenar el bloc "Usuaris administradors de CPD" (Fulla Dades CPD). En cas que s'informi el camp "Accés a artefactes al repositori de codi font" amb valor 'Si' per algún usuari, cal que el proveïdor de l'aplicació hagi gestionat abans amb l'equip del SIC la realització d'una excepció a les restriccions que impedeixen per defecte custodiar artefactes (.war, .ear, .jar) al Subversion del SIC. 

  
<br/>
  
**Notes**

Arran la incorporació del Gitlab com a nou SCM, el nou sistema d'accés mitjançant credencials GICAR i l'Autoservei d'usuaris i repositoris, s'han abolit la majoria de tràmits a SIC:

- No es crearan nous repositoris SVN doncs a mig termini (previsiblement el 6 de Novembre de 2017) el SIC deprecarà aquest SCM. El codi de tota nova aplicació haurà de figurar al Gitlab.
- No es realitzaran noves altes d'usuaris SIC, doncs el sistema d'accés a Gitlab / Jenkins és mitjançant les credencials d'usuari GICAR.
- El tràmit de petició de jobs no desapareix però sí ho fa el formulari d'alta d'aquest. A la petició d'alta de jobs de l'aplicació caldrà adjuntar el Document d'Arquitectura. La informació que no es pugui obtenir d'aquest es demanarà a proveïdor / cpd.
- El tràmit d'alta d'usuari d'accés per a CPD al SIC continuarà existint fins al 26 de Juny de 2017, data en què s'activarà un nou sistema de gestió de binaris que no utilitzarà el SVN. 
