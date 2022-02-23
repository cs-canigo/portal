+++
date        = "2022-02-10"
title       = "Catàleg Cloud CTTI"
description = "Catàleg Cloud CTTI"
sections    = "Cloud"
weight      = 3
categories  = ["Cloud","Cataleg Cloud","Catàleg Cloud"]
+++

## Part 1: Abast

## Part 2: Referències 

## Part 3: Termes i definicions
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.18/css/jquery.dataTables.min.css">
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/responsive/2.2.2/css/responsive.dataTables.min.css">
<link rel="stylesheet" type="text/css" href="https://canigo.ctti.gencat.cat/drafts/FullRuta20/tableStyle.css">
<script type="text/javascript" language="javascript" src="https://code.jquery.com/jquery-3.3.1.js"></script>
<script type="text/javascript" language="javascript" src="https://cdn.datatables.net/1.10.18/js/jquery.dataTables.min.js"></script>
<script type="text/javascript" language="javascript" src="https://cdn.datatables.net/responsive/2.2.2/js/dataTables.responsive.min.js"></script>

<table id="Revisio" class="display" style="width:50%" align="center">
    <thead>
        <tr>
            <th>Darrera revisió realitzada</th>
            <th>Catàleg Cloud vigent fins</th>
        </tr>
        <tr>
            <td>febrer de 2022</td>
            <td>juny de 2022</td>
        </tr>
    </thead>
</table>

<table id="CPD1SwarmMe" class="display" style="width:100%">
    <tr>
        <th colspan="12">SwarmMe</th>                        
    </tr>
    <tr>
        <th colspan="2">Versió</th>
        <td colspan="2"></td>
        <th colspan="2">Mètriques</th>
        <td colspan="2"></td>
        <th colspan="2">Logs</th>
        <td colspan="2"></td>
    </tr>
    <tr>
        <th colspan="2">xPaaS</td>
        <td colspan="10"></td>
    </tr>
    <tr>
        <th colspan="2">DBaaS</td>
        <td colspan="10"></td>
    </tr>
    <tr>
        <td colspan="12">
            <table id="CPD1SwarmMeTalles" class="display" style="width:100%">
                <tr>
                    <th align="center" colspan="12">Talles Contenidors</th>                        
                </tr>
                <tr align="center">
                    <th colspan="3">S</th>
                    <th colspan="3">M</th>
                    <th colspan="3">L</th>
                    <th colspan="3">XL</th>
                </tr>
                <tr align="center">
                    <th>RAM</th>
                    <th>CPU</th>
                    <th>DISC</th>
                    <th>RAM</th>
                    <th>CPU</th>
                    <th>DISC</th>
                    <th>RAM</th>
                    <th>CPU</th>
                    <th>DISC</th>
                    <th>RAM</th>
                    <th>CPU</th>
                    <th>DISC</th>
                </tr>
                <tr align="center">
                    <td>512</td>
                    <td>500</td>
                    <td>10</td>
                    <td>1024</td>
                    <td>1000</td>
                    <td>10</td>
                    <td>2048</td>
                    <td>1500</td>
                    <td>10</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                </tr>
            </table>
        </td>
    </tr>
</table>

<table style="width:100%">
    <tr>
        <th>Imatges Catàleg Cloud</th>                        
    </tr>
    <tr>
        <td>
            <table style="width:100%">
                <tr>
                    <th>Grup de Tecnologies</th>
                    <th>Producte</th>
                    <th>Versió</th>
                    <th>Imatge</th>                         
                </tr>
                <tr>
                    <td>Servidors Web</td>
                    <td>Java</td>
                    <td>8</td>
                    <td>docker-registry.ctti.extranet.gencat.cat/gencatcloud/java:8</td>                          
                </tr>
                <tr>
                    <td>Servidors Web</td>
                    <td>Java</td>
                    <td>11</td>
                    <td>docker-registry.ctti.extranet.gencat.cat/gencatcloud/java:11-openjdk</td>                          
                </tr>
                <tr>
                    <td>Servidors Web</td>
                    <td>NodeJS</td>
                    <td>10</td>
                    <td>docker-registry.ctti.extranet.gencat.cat/gencatcloud/node:10</td>                          
                </tr>
                <tr>
                    <td>Servidors Web</td>
                    <td>NodeJS</td>
                    <td>12</td>
                    <td>docker-registry.ctti.extranet.gencat.cat/gencatcloud/node:12</td>                          
                </tr>
                <tr>
                    <td>Servidors Web</td>
                    <td>NodeJS</td>
                    <td>14</td>
                    <td>docker-registry.ctti.extranet.gencat.cat/gencatcloud/node:14</td>                          
                </tr>
                <tr>
                    <td>Servidors Web</td>
                    <td>PHP</td>
                    <td>7.2</td>
                    <td>docker-registry.ctti.extranet.gencat.cat/gencatcloud/apache-php:7.2</td>                          
                </tr>
                <tr>
                    <td>Servidors Web</td>
                    <td>PHP</td>
                    <td>7.3</td>
                    <td>docker-registry.ctti.extranet.gencat.cat/gencatcloud/apache-php:7.3</td>                          
                </tr>
                <tr>
                    <td>Servidors Web</td>
                    <td>PHP</td>
                    <td>7.4</td>
                    <td>docker-registry.ctti.extranet.gencat.cat/gencatcloud/apache-php:7.4</td>                          
                </tr>
                <tr>
                    <td>Servidors Web</td>
                    <td>Tomcat</td>
                    <td>9.0-Java 8</td>
                    <td>docker-registry.ctti.extranet.gencat.cat/gencatcloud/tomcat:9.0-java8</td>                          
                </tr>
                <tr>
                    <td>Servidors Web</td>
                    <td>Tomcat</td>
                    <td>9.0-Java 11</td>
                    <td>docker-registry.ctti.extranet.gencat.cat/gencatcloud/tomcat:9.0-java11</td>                          
                </tr>
                <tr>
                    <td>Servidors Web</td>
                    <td>Tomcat amb suport de Sessions distribuïdes</td>
                    <td>9.0-Java 8</td>
                    <td>docker-registry.ctti.extranet.gencat.cat/gencatcloud/tomcat-hc:9.0-java8</td>                          
                </tr>
                <tr>
                    <td>Servidors Web</td>
                    <td>Tomcat amb suport de Sessions distribuïdes</td>
                    <td>9.0-Java 11</td>
                    <td>docker-registry.ctti.extranet.gencat.cat/gencatcloud/tomcat-hc:9.0-java11</td>                          
                </tr>
                <tr>
                    <td>Servidors d'Aplicacions</td>
                    <td>Apache</td>
                    <td>2.4</td>
                    <td>docker-registry.ctti.extranet.gencat.cat/gencatcloud/httpd:2.4</td>                          
                </tr>
                <tr>
                    <td>Servidors d'Aplicacions</td>
                    <td>Apache GICAR Shibboleth</td>
                    <td>1.0.3</td>
                    <td>docker-registry.ctti.extranet.gencat.cat/gencatcloud/gicar-shibboleth:1.0.3</td>                          
                </tr>
                <tr>
                    <td>Servidors d'Aplicacions</td>
                    <td>Apache GICAR Shibboleth Kubernetes/Openshift</td>
                    <td>1.0.3</td>
                    <td>docker-registry.ctti.extranet.gencat.cat/gencatcloud/gicar-shibboleth-openshift:1.0.3</td>                          
                </tr>
                <tr>
                    <td>Servidors d'Aplicacions</td>
                    <td>Apache Proxy ElasticSearch</td>
                    <td>2.4-1.0</td>
                    <td>docker-registry.ctti.extranet.gencat.cat/gencatcloud/httpd-proxy-es:2.4-1.0</td>                          
                </tr>
                <tr>
                    <td>Servidors d'Aplicacions</td>
                    <td>Nginx</td>
                    <td>1.14</td>
                    <td>docker-registry.ctti.extranet.gencat.cat/gencatcloud/nginx:1.14</td>                          
                </tr>
                <tr>
                    <td>Servidors d'Aplicacions</td>
                    <td>Nginx</td>
                    <td>1.16</td>
                    <td>docker-registry.ctti.extranet.gencat.cat/gencatcloud/nginx:1.16</td>                          
                </tr>
                <tr>
                    <td>Servidors d'Aplicacions</td>
                    <td>Nginx</td>
                    <td>1.18</td>
                    <td>docker-registry.ctti.extranet.gencat.cat/gencatcloud/nginx:1.18</td>                          
                </tr>
                <tr>
                    <td>Servidors d'Aplicacions</td>
                    <td>GICAR Nginx</td>
                    <td>1.0.0</td>
                    <td>docker-registry.ctti.extranet.gencat.cat/gencatcloud/gicar-nginx:1.0.0</td>                          
                </tr>
                <tr>
                    <td>Servidors d'Aplicacions</td>
                    <td>GICAR Nginx Kubernetes/Openshift</td>
                    <td>1.0.0</td>
                    <td>docker-registry.ctti.extranet.gencat.cat/gencatcloud/gicar-nginx-openshift:1.0.0</td>                          
                </tr>
            </table>
        </td>                          
    </tr>
</table>

<table id="CatalegCLOUD" style="width:100%">
    <thead>
        <tr>
            <th width="5%"></th>
            <th width="25%">Cloud</th>
            <th width="25%">Plataforma</th>
            <th width="45%"></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td></td>
            <td colspan="3">
                <table style="width:100%">
                    <thead>
                        <tr>
                            <th>Cloud Privat</th>                        
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <table style="width:100%">
                                    <thead>
                                        <tr>
                                            <th>CPD1</th>                        
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <table style="width:100%">
                                                    <tr>
                                                        <th colspan="12">SwarmMe</th>                        
                                                    </tr>
                                                    <tr>
                                                        <td colspan="2">Versió</td>
                                                        <td colspan="2"></td>
                                                        <td colspan="2">Mètriques</td>
                                                        <td colspan="2"></td>
                                                        <td colspan="2">Logs</td>
                                                        <td colspan="2"></td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="2">xPaaS</td>
                                                        <td colspan="10"></td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="2">DBaaS</td>
                                                        <td colspan="10"></td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="12">
                                                            <table style="width:100%">
                                                                <tr>
                                                                    <th align="center" colspan="12">Talles Contenidors</th>                        
                                                                </tr>
                                                                <tr align="center">
                                                                    <td colspan="3">S</td>
                                                                    <td colspan="3">M</td>
                                                                    <td colspan="3">L</td>
                                                                    <td colspan="3">XL</td>
                                                                </tr>
                                                                <tr align="center">
                                                                    <td>RAM</td>
                                                                    <td>CPU</td>
                                                                    <td>DISC</td>
                                                                    <td>RAM</td>
                                                                    <td>CPU</td>
                                                                    <td>DISC</td>
                                                                    <td>RAM</td>
                                                                    <td>CPU</td>
                                                                    <td>DISC</td>
                                                                    <td>RAM</td>
                                                                    <td>CPU</td>
                                                                    <td>DISC</td>
                                                                </tr>
                                                                <tr align="center">
                                                                    <td>512</td>
                                                                    <td>500</td>
                                                                    <td>10</td>
                                                                    <td>1024</td>
                                                                    <td>1000</td>
                                                                    <td>10</td>
                                                                    <td>2048</td>
                                                                    <td>1500</td>
                                                                    <td>10</td>
                                                                    <td>-</td>
                                                                    <td>-</td>
                                                                    <td>-</td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>                                        
                                    </tbody>
                                </table>
                            </td>                           
                        </tr>
                        <tr>
                            <td>
                                <table style="width:100%">
                                    <thead>
                                        <tr>
                                            <th>Imatges Catàleg Cloud</th>                        
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <table style="width:100%">
                                                    <thead>
                                                        <tr>
                                                            <th>Grup de Tecnologies</th>
                                                            <th>Producte</th>
                                                            <th>Versió</th>
                                                            <th>Imatge</th>                         
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>Servidors Web</td>
                                                            <td>Java</td>
                                                            <td>8</td>
                                                            <td>docker-registry.ctti.extranet.gencat.cat/gencatcloud/java:8</td>                          
                                                        </tr>
                                                        <tr>
                                                            <td>Servidors Web</td>
                                                            <td>Java</td>
                                                            <td>11</td>
                                                            <td>docker-registry.ctti.extranet.gencat.cat/gencatcloud/java:11-openjdk</td>                          
                                                        </tr>
                                                        <tr>
                                                            <td>Servidors Web</td>
                                                            <td>NodeJS</td>
                                                            <td>10</td>
                                                            <td>docker-registry.ctti.extranet.gencat.cat/gencatcloud/node:10</td>                          
                                                        </tr>
                                                        <tr>
                                                            <td>Servidors Web</td>
                                                            <td>NodeJS</td>
                                                            <td>12</td>
                                                            <td>docker-registry.ctti.extranet.gencat.cat/gencatcloud/node:12</td>                          
                                                        </tr>
                                                        <tr>
                                                            <td>Servidors Web</td>
                                                            <td>NodeJS</td>
                                                            <td>14</td>
                                                            <td>docker-registry.ctti.extranet.gencat.cat/gencatcloud/node:14</td>                          
                                                        </tr>
                                                        <tr>
                                                            <td>Servidors Web</td>
                                                            <td>PHP</td>
                                                            <td>7.2</td>
                                                            <td>docker-registry.ctti.extranet.gencat.cat/gencatcloud/apache-php:7.2</td>                          
                                                        </tr>
                                                        <tr>
                                                            <td>Servidors Web</td>
                                                            <td>PHP</td>
                                                            <td>7.3</td>
                                                            <td>docker-registry.ctti.extranet.gencat.cat/gencatcloud/apache-php:7.3</td>                          
                                                        </tr>
                                                        <tr>
                                                            <td>Servidors Web</td>
                                                            <td>PHP</td>
                                                            <td>7.4</td>
                                                            <td>docker-registry.ctti.extranet.gencat.cat/gencatcloud/apache-php:7.4</td>                          
                                                        </tr>
                                                        <tr>
                                                            <td>Servidors Web</td>
                                                            <td>Tomcat</td>
                                                            <td>9.0-Java 8</td>
                                                            <td>docker-registry.ctti.extranet.gencat.cat/gencatcloud/tomcat:9.0-java8</td>                          
                                                        </tr>
                                                        <tr>
                                                            <td>Servidors Web</td>
                                                            <td>Tomcat</td>
                                                            <td>9.0-Java 11</td>
                                                            <td>docker-registry.ctti.extranet.gencat.cat/gencatcloud/tomcat:9.0-java11</td>                          
                                                        </tr>
                                                        <tr>
                                                            <td>Servidors Web</td>
                                                            <td>Tomcat amb suport de Sessions distribuïdes</td>
                                                            <td>9.0-Java 8</td>
                                                            <td>docker-registry.ctti.extranet.gencat.cat/gencatcloud/tomcat-hc:9.0-java8</td>                          
                                                        </tr>
                                                        <tr>
                                                            <td>Servidors Web</td>
                                                            <td>Tomcat amb suport de Sessions distribuïdes</td>
                                                            <td>9.0-Java 11</td>
                                                            <td>docker-registry.ctti.extranet.gencat.cat/gencatcloud/tomcat-hc:9.0-java11</td>                          
                                                        </tr>
                                                        <tr>
                                                            <td>Servidors d'Aplicacions</td>
                                                            <td>Apache</td>
                                                            <td>2.4</td>
                                                            <td>docker-registry.ctti.extranet.gencat.cat/gencatcloud/httpd:2.4</td>                          
                                                        </tr>
                                                        <tr>
                                                            <td>Servidors d'Aplicacions</td>
                                                            <td>Apache GICAR Shibboleth</td>
                                                            <td>1.0.3</td>
                                                            <td>docker-registry.ctti.extranet.gencat.cat/gencatcloud/gicar-shibboleth:1.0.3</td>                          
                                                        </tr>
                                                        <tr>
                                                            <td>Servidors d'Aplicacions</td>
                                                            <td>Apache GICAR Shibboleth Kubernetes/Openshift</td>
                                                            <td>1.0.3</td>
                                                            <td>docker-registry.ctti.extranet.gencat.cat/gencatcloud/gicar-shibboleth-openshift:1.0.3</td>                          
                                                        </tr>
                                                        <tr>
                                                            <td>Servidors d'Aplicacions</td>
                                                            <td>Apache Proxy ElasticSearch</td>
                                                            <td>2.4-1.0</td>
                                                            <td>docker-registry.ctti.extranet.gencat.cat/gencatcloud/httpd-proxy-es:2.4-1.0</td>                          
                                                        </tr>
                                                        <tr>
                                                            <td>Servidors d'Aplicacions</td>
                                                            <td>Nginx</td>
                                                            <td>1.14</td>
                                                            <td>docker-registry.ctti.extranet.gencat.cat/gencatcloud/nginx:1.14</td>                          
                                                        </tr>
                                                        <tr>
                                                            <td>Servidors d'Aplicacions</td>
                                                            <td>Nginx</td>
                                                            <td>1.16</td>
                                                            <td>docker-registry.ctti.extranet.gencat.cat/gencatcloud/nginx:1.16</td>                          
                                                        </tr>
                                                        <tr>
                                                            <td>Servidors d'Aplicacions</td>
                                                            <td>Nginx</td>
                                                            <td>1.18</td>
                                                            <td>docker-registry.ctti.extranet.gencat.cat/gencatcloud/nginx:1.18</td>                          
                                                        </tr>
                                                        <tr>
                                                            <td>Servidors d'Aplicacions</td>
                                                            <td>GICAR Nginx</td>
                                                            <td>1.0.0</td>
                                                            <td>docker-registry.ctti.extranet.gencat.cat/gencatcloud/gicar-nginx:1.0.0</td>                          
                                                        </tr>
                                                        <tr>
                                                            <td>Servidors d'Aplicacions</td>
                                                            <td>GICAR Nginx Kubernetes/Openshift</td>
                                                            <td>1.0.0</td>
                                                            <td>docker-registry.ctti.extranet.gencat.cat/gencatcloud/gicar-nginx-openshift:1.0.0</td>                          
                                                        </tr>                                                    
                                                    </tbody>
                                                </table>
                                            </td>                          
                                        </tr>
                                    </tbody>
                                </table>
                            </td>                           
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        <tr>
            <td></td>
            <td colspan="3">
                <table style="width:100%">
                    <thead>
                        <tr>
                            <th>Cloud Públic</th>                        
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <table style="width:100%">
                                    <thead>
                                        <tr>
                                            <th>Azure</th>                        
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Azure</td>                          
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>
