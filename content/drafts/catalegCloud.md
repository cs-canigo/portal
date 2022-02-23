+++
date        = "2022-02-10"
title       = "Catàleg Cloud CTTI"
description = "Catàleg Cloud CTTI"
sections    = "Cloud"
weight      = 3
categories  = ["Cloud","Cataleg Cloud","Catàleg Cloud"]
+++

<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.18/css/jquery.dataTables.min.css">
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/responsive/2.2.2/css/responsive.dataTables.min.css">
<link rel="stylesheet" type="text/css" href="https://canigo.ctti.gencat.cat/drafts/FullRuta20/tableStyle.css">
<script type="text/javascript" language="javascript" src="https://code.jquery.com/jquery-3.3.1.js"></script>
<script type="text/javascript" language="javascript" src="https://cdn.datatables.net/1.10.18/js/jquery.dataTables.min.js"></script>
<script type="text/javascript" language="javascript" src="https://cdn.datatables.net/responsive/2.2.2/js/dataTables.responsive.min.js"></script>

<style>
table.cpd {
  border: 1px solid;
}
tr.plat tr{
  border: 1px solid;  
}
th { font-size: 14px; }
td { font-size: 14px; }
</style>

<script>
    function amaga(vClass) {
            var tr = document.getElementsByClassName(vClass);
            var row = taulaFullRutaLLT.row( tr )
            row.child.hide();
            /*document.getElementsByClassName(vClass)[0].
            style.visibility = 'hidden';*/
        }
    function mostra(vClass) {
            var tr = document.getElementsByClassName(vClass);
            var row = taulaFullRutaLLT.row( tr )
            row.child.hide();
            /*document.getElementsByClassName(vClass)[0].
            style.visibility = 'visible';*/
        }
    function amag_most(){
        var tr = $(this).closest('tr');
        var row = taulaFullRutaLLT.row( tr );
        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child( formatLLT(row.data()) ).show();
            tr.addClass('shown');
        }
    }
</script>

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

<table id="CPD1" class="display" style="width:99%">
    <tr>
        <th colspan="13">CPD1
        </th>
    </tr>
    <tr class="plat">
        <td><img src="../catalegCloud/details_open.png" align="center" onclick="mostra('cpd1swarm')" height="32"><img src="../catalegCloud/details_close.png" align="center" onclick="amaga('cpd1swarm')" height="32"></td>
        <td colspan="11" align="left"><strong>SwarmMe</strong> <img src="../catalegCloud/swarm.png" height="32"></td>                        
    </tr>
    <tr class="cpd1swarm">
        <th colspan="2" width="16%">Versió</th>
        <td colspan="2" width="17%">Docker 18.9</td>
        <th colspan="2" width="16%">Mètriques</th>
        <td colspan="2" width="17%"><img src="../catalegCloud/grafana.png" align="left" height="32"></td>
        <th colspan="2" width="16%">Logs</th>
        <td colspan="2" width="17%"><img src="../catalegCloud/kibana.png" align="left" height="32"></td>
    </tr>
    <tr class="cpd1swarm">
        <th colspan="3" width="25%">xPaaS</td>
        <td colspan="3" width="25%"></td>
        <th colspan="3" width="25%">DBaaS</td>
        <td colspan="3" width="25%"></td>
    </tr>
    <tr height="1" class="cpd1swarm">
        <td colspan="12">
        </td>
    </tr>
    <tr class="cpd1swarm">
        <th align="center" colspan="12">Talles Contenidors</th>                        
    </tr>
    <tr align="center" class="cpd1swarm">
        <td colspan="3"><strong>S</strong></th>
        <td colspan="3"><strong>M</strong></th>
        <td colspan="3"><strong>L</strong></th>
        <td colspan="3"><strong>XL</strong></th>
    </tr>
    <tr align="center" class="cpd1swarm">
        <td><strong>RAM</strong></th>
        <td><strong>CPU</strong></th>
        <td><strong>DISC</strong></th>
        <td><strong>RAM</strong></th>
        <td><strong>CPU</strong></th>
        <td><strong>DISC</strong></th>
        <td><strong>RAM</strong></th>
        <td><strong>CPU</strong></th>
        <td><strong>DISC</strong></th>
        <td><strong>RAM</strong></th>
        <td><strong>CPU</strong></th>
        <td><strong>DISC</strong></th>
    </tr>
    <tr align="center" class="cpd1swarm">
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
    <tr>
        <td><img src="../catalegCloud/details_open.png" align="center" height="32"></td>
        <td colspan="11" align="left"><strong>Kubernetes</strong> <img src="../catalegCloud/kubernetes.png" height="32"></td>                        
    </tr>
    <tr>
        <th colspan="2" width="16%">Versió</th>
        <td colspan="2" width="17%">1.18.10</td>
        <th colspan="2" width="16%">Mètriques</th>
        <td colspan="2" width="17%"><img src="../catalegCloud/grafana.png" align="left" height="32"></td>
        <th colspan="2" width="16%">Logs</th>
        <td colspan="2" width="17%"><img src="../catalegCloud/kibana.png" align="left" height="32"></td>
    </tr>
    <tr>
        <th colspan="3" width="25%">xPaaS</td>
        <td colspan="3" width="25%"></td>
        <th colspan="3" width="25%">DBaaS</td>
        <td colspan="3" width="25%"></td>
    </tr>
    <tr height="1">
        <td colspan="12">
        </td>
    </tr>
    <tr>
        <th align="center" colspan="12">Talles Contenidors</th>                        
    </tr>
    <tr align="center">
        <td colspan="3"><strong>S</strong></th>
        <td colspan="3"><strong>M</strong></th>
        <td colspan="3"><strong>L</strong></th>
        <td colspan="3"><strong>XL</strong></th>
    </tr>
    <tr align="center">
        <td><strong>RAM</strong></th>
        <td><strong>CPU</strong></th>
        <td><strong>DISC</strong></th>
        <td><strong>RAM</strong></th>
        <td><strong>CPU</strong></th>
        <td><strong>DISC</strong></th>
        <td><strong>RAM</strong></th>
        <td><strong>CPU</strong></th>
        <td><strong>DISC</strong></th>
        <td><strong>RAM</strong></th>
        <td><strong>CPU</strong></th>
        <td><strong>DISC</strong></th>
    </tr>
    <tr align="center">
        <td>256</td>
        <td>250</td>
        <td>4</td>
        <td>512</td>
        <td>500</td>
        <td>4</td>
        <td>1024</td>
        <td>1000</td>
        <td>4</td>
        <td>2048</td>
        <td>2000</td>
        <td>4</td>
    </tr>
    <tr>
        <th colspan="13">CPD2
        </th>
    </tr>
    <tr>
        <td><img src="../catalegCloud/details_open.png" align="center"></td>
        <td colspan="11" align="left"><strong>Kubernetes</strong> <img src="../catalegCloud/kubernetes.png" height="32"></td>                        
    </tr>
    <tr>
        <th colspan="2" width="16%">Versió</th>
        <td colspan="2" width="17%">1.18.10</td>
        <th colspan="2" width="16%">Mètriques</th>
        <td colspan="2" width="17%"><img src="../catalegCloud/grafana.png" align="left" height="32"></td>
        <th colspan="2" width="16%">Logs</th>
        <td colspan="2" width="17%"><img src="../catalegCloud/kibana.png" align="left" height="32"></td>
    </tr>
    <tr>
        <th colspan="3" width="25%">xPaaS</td>
        <td colspan="3" width="25%"></td>
        <th colspan="3" width="25%">DBaaS</td>
        <td colspan="3" width="25%"></td>
    </tr>
    <tr height="1">
        <td colspan="12">
        </td>
    </tr>
    <tr>
        <th align="center" colspan="12">Talles Contenidors</th>                        
    </tr>
    <tr align="center">
        <td colspan="3"><strong>S</strong></th>
        <td colspan="3"><strong>M</strong></th>
        <td colspan="3"><strong>L</strong></th>
        <td colspan="3"><strong>XL</strong></th>
    </tr>
    <tr align="center">
        <td><strong>RAM</strong></th>
        <td><strong>CPU</strong></th>
        <td><strong>DISC</strong></th>
        <td><strong>RAM</strong></th>
        <td><strong>CPU</strong></th>
        <td><strong>DISC</strong></th>
        <td><strong>RAM</strong></th>
        <td><strong>CPU</strong></th>
        <td><strong>DISC</strong></th>
        <td><strong>RAM</strong></th>
        <td><strong>CPU</strong></th>
        <td><strong>DISC</strong></th>
    </tr>
    <tr align="center">
        <td>256</td>
        <td>62</td>
        <td>*</td>
        <td>521</td>
        <td>125</td>
        <td>*</td>
        <td>1024</td>
        <td>250</td>
        <td>*</td>
        <td>2048</td>
        <td>500</td>
        <td>*</td>
    </tr>
    <tr>
        <td><img src="../catalegCloud/details_open.png" align="center"></td>
        <td colspan="11" align="left"><strong>Openshift</strong> <img src="../catalegCloud/openShift.png" height="32"></td>                        
    </tr>
    <tr>
        <th colspan="2" width="16%">Versió</th>
        <td colspan="2" width="17%">4.6</td>
        <th colspan="2" width="16%">Mètriques</th>
        <td colspan="2" width="17%"><img src="../catalegCloud/grafana.png" align="left" height="32"></td>
        <th colspan="2" width="16%">Logs</th>
        <td colspan="2" width="17%"><img src="../catalegCloud/kibana.png" align="left" height="32"></td>
    </tr>
    <tr>
        <th colspan="3" width="25%">xPaaS</td>
        <td colspan="3" width="25%"></td>
        <th colspan="3" width="25%">DBaaS</td>
        <td colspan="3" width="25%"></td>
    </tr>
    <tr height="1">
        <td colspan="12">
        </td>
    </tr>
    <tr>
        <th align="center" colspan="12">Talles Contenidors</th>                        
    </tr>
    <tr align="center">
        <td colspan="3"><strong>S</strong></th>
        <td colspan="3"><strong>M</strong></th>
        <td colspan="3"><strong>L</strong></th>
        <td colspan="3"><strong>XL</strong></th>
    </tr>
    <tr align="center">
        <td><strong>RAM</strong></th>
        <td><strong>CPU</strong></th>
        <td><strong>DISC</strong></th>
        <td><strong>RAM</strong></th>
        <td><strong>CPU</strong></th>
        <td><strong>DISC</strong></th>
        <td><strong>RAM</strong></th>
        <td><strong>CPU</strong></th>
        <td><strong>DISC</strong></th>
        <td><strong>RAM</strong></th>
        <td><strong>CPU</strong></th>
        <td><strong>DISC</strong></th>
    </tr>
    <tr align="center">
        <td>256</td>
        <td>250</td>
        <td>1</td>
        <td>512</td>
        <td>500</td>
        <td>2</td>
        <td>1024</td>
        <td>1000</td>
        <td>4</td>
        <td>2048</td>
        <td>2000</td>
        <td>8</td>
    </tr>
    <tr>
        <th colspan="13">CPD3
        </th>
    </tr>
    <tr>
        <td><img src="../catalegCloud/details_open.png" align="center"></td>
        <td colspan="11" align="left"><strong>Openshift</strong> <img src="../catalegCloud/openShift.png" height="32"></td>                        
    </tr>
    <tr>
        <th colspan="2" width="16%">Versió</th>
        <td colspan="2" width="17%">4.6</td>
        <th colspan="2" width="16%">Mètriques</th>
        <td colspan="2" width="17%"><img src="../catalegCloud/grafana.png" align="left" height="32"></td>
        <th colspan="2" width="16%">Logs</th>
        <td colspan="2" width="17%"><img src="../catalegCloud/kibana.png" align="left" height="32"></td>
    </tr>
    <tr>
        <th colspan="3" width="25%">xPaaS</td>
        <td colspan="3" width="25%"><img src="../catalegCloud/istio.png" align="left" height="32"></td>
        <th colspan="3" width="25%">DBaaS</td>
        <td colspan="3" width="25%"></td>
    </tr>
    <tr height="1">
        <td colspan="12">
        </td>
    </tr>
    <tr>
        <th align="center" colspan="12">Talles Contenidors</th>                        
    </tr>
    <tr align="center">
        <td colspan="3"><strong>S</strong></th>
        <td colspan="3"><strong>M</strong></th>
        <td colspan="3"><strong>L</strong></th>
        <td colspan="3"><strong>XL</strong></th>
    </tr>
    <tr align="center">
        <td><strong>RAM</strong></th>
        <td><strong>CPU</strong></th>
        <td><strong>DISC</strong></th>
        <td><strong>RAM</strong></th>
        <td><strong>CPU</strong></th>
        <td><strong>DISC</strong></th>
        <td><strong>RAM</strong></th>
        <td><strong>CPU</strong></th>
        <td><strong>DISC</strong></th>
        <td><strong>RAM</strong></th>
        <td><strong>CPU</strong></th>
        <td><strong>DISC</strong></th>
    </tr>
    <tr align="center">
        <td>256</td>
        <td>250</td>
        <td>1</td>
        <td>512</td>
        <td>500</td>
        <td>2</td>
        <td>1024</td>
        <td>1000</td>
        <td>4</td>
        <td>2048</td>
        <td>2000</td>
        <td>8</td>
    </tr>
    <tr>
        <th colspan="13">CPD4
        </th>
    </tr>
    <tr>
        <td><img src="../catalegCloud/details_open.png" align="center"></td>
        <td colspan="11" align="left"><strong>Openshift</strong> <img src="../catalegCloud/openShift.png" height="32"></td>                        
    </tr>
    <tr>
        <th colspan="2" width="16%">Versió</th>
        <td colspan="2" width="17%">4.6</td>
        <th colspan="2" width="16%">Mètriques</th>
        <td colspan="2" width="17%"><img src="../catalegCloud/grafana.png" align="left" height="32"></td>
        <th colspan="2" width="16%">Logs</th>
        <td colspan="2" width="17%"><img src="../catalegCloud/kibana.png" align="left" height="32"></td>
    </tr>
    <tr>
        <th colspan="3" width="25%">xPaaS</td>
        <td colspan="3" width="25%"><img src="../catalegCloud/istio.png" align="left" height="32"></td>
        <th colspan="3" width="25%">DBaaS</td>
        <td colspan="3" width="25%"><img src="../catalegCloud/mysql.png" align="left" height="32"> <img src="../catalegCloud/postgresql.png" align="left" height="32"></td>
    </tr>
    <tr height="1">
        <td colspan="12">
        </td>
    </tr>
    <tr>
        <th align="center" colspan="12">Talles Contenidors</th>                        
    </tr>
    <tr align="center">
        <td colspan="3"><strong>S</strong></th>
        <td colspan="3"><strong>M</strong></th>
        <td colspan="3"><strong>L</strong></th>
        <td colspan="3"><strong>XL</strong></th>
    </tr>
    <tr align="center">
        <td><strong>RAM</strong></th>
        <td><strong>CPU</strong></th>
        <td><strong>DISC</strong></th>
        <td><strong>RAM</strong></th>
        <td><strong>CPU</strong></th>
        <td><strong>DISC</strong></th>
        <td><strong>RAM</strong></th>
        <td><strong>CPU</strong></th>
        <td><strong>DISC</strong></th>
        <td><strong>RAM</strong></th>
        <td><strong>CPU</strong></th>
        <td><strong>DISC</strong></th>
    </tr>
    <tr align="center">
        <td>256</td>
        <td>250</td>
        <td>1</td>
        <td>512</td>
        <td>500</td>
        <td>2</td>
        <td>1024</td>
        <td>1000</td>
        <td>4</td>
        <td>2048</td>
        <td>2000</td>
        <td>8</td>
    </tr>
    <tr>
        <th>Imatges Catàleg Cloud</th>                        
    </tr>
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
