+++
date        = "2019-02-19"
title       = "Consideracions generals en plataformes IaaS"
description = "Consideracions generals a tenir present en els aplicacions desplegades a plataformes IaaS"
sections    = "IaaS Cloud"
weight      = 2
categories  = ["cloud","iaas","azure"]
+++

# Consideracions generals en plataformes IaaS

* Només és recomanable utilitzar plataforms IaaS en cas de que l'aplicació no encaixi en un model CaaS o PaaS:

  * Productes
  * Arquitectures poc estandards
  * ...

* L'accés a les màquines virtuales es realitzarà sempre a través d VPN.
* No es podrà tenir accés a cap recurs de la plataforma directament a través internet. Caldrà sempre exposar els servei a través de la capa de Balanceig i segurerat definida a la plataforma.  