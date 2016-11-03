+++
date        = "2015-01-27"
title       = "Fitxa detall"
description = ""
no_index    = true
+++
<link href="/css/cercador.css" rel="stylesheet" type="text/css" />

<section class="rslt" id="cercador_text">

<div class="row">

    <div id="hits" class="list-group col-xs-12 col-md-12">
        
    </div>

</div>

</section>

<!-- TEMPLATES -->
<script type="text/html" id="hit-template">
    <h1>{{title}}</h1>
    <table class='fitxa_detall col-xs-12 col-md-12'>
        <tbody>
            <tr><th colspan='2'>Dades de l'ENS</th></tr>
            {{#dades}}
            <tr><td class='col-md-4'>{{key}}</td><td>{{value}}</td></tr>
            {{/dades}}
        </tbody>
    </table>

    {{#detall_de_partícips}}
    <table class='fitxa_detall col-xs-12 col-md-12'>
        <tbody>
            <tr><th colspan='2'>Partíceps</th></tr>
                {{#.}}
                <tr><td class='col-md-4'>{{key}}</td><td>{{value}}</td></tr>
                {{/.}}
                <tr><td colspan='2' class='nested_background'></td></tr>                
        </tbody>
    </table>
    {{/detall_de_partícips}}

    {{#membres_òrgan_de_govern}}
    <table class='fitxa_detall col-xs-12 col-md-12'>
        <tbody>
            <tr><th colspan='2'>Membres dels òrgans de govern</th></tr>
                {{#.}}
                <tr><td class='col-md-4'>{{key}}</td><td>{{value}}</td></tr>
                {{/.}}
                <tr><td colspan='2' class='nested_background'></td></tr>                
        </tbody>
    </table>
    {{/membres_òrgan_de_govern}}

    {{#persones_òrgan_de_govern}}
    <table class='fitxa_detall col-xs-12 col-md-12'>
        <tbody>
            <tr><th colspan='2'>Persones òrgan de govern</th></tr>
                {{#.}}
                <tr><td class='col-md-4'>{{key}}</td><td>{{value}}</td></tr>
                {{/.}}
                <tr><td colspan='2' class='nested_background'></td></tr>                
        </tbody>
    </table>
    {{/persones_òrgan_de_govern}}

    {{#persones_cons.adm.soc.mercantil}}
    <table class='fitxa_detall col-xs-12 col-md-12'>
        <tbody>
            <tr><th colspan='2'>Persones del consell d'administració</th></tr>
                {{#.}}
                <tr><td class='col-md-4'>{{key}}</td><td>{{value}}</td></tr>
                {{/.}}
                <tr><td colspan='2' class='nested_background'></td></tr>                
        </tbody>
    </table>
    {{/persones_cons.adm.soc.mercantil}}

    {{#dades_registrals}}
    <table class='fitxa_detall col-xs-12 col-md-12'>
        <tbody>
            <tr><th colspan='2'>Dades registrals</th></tr>
                {{#.}}
                <tr><td class='col-md-4'>{{key}}</td><td>{{value}}</td></tr>
                {{/.}}
                <tr><td colspan='2' class='nested_background'></td></tr>                
        </tbody>
    </table>
    {{/dades_registrals}}

</script>

<script type="text/html" id="no-results-template">
    <div id="no-results-message">
      <p>Aquest ENS no existeix</p>
      <!--a href="." class='clear-all'>Neteja la cerca</a-->
    </div>
</script>

<script type="text/html" id="stats-template">
  S'han trobat <b>{{nbHits}}</b> resultats
</script>
<!-- /TEMPLATES -->

<div id="logo-algolia">
    <img src="/images/algolia/Algolia_logo_bg-white.jpg" alt="Logo Algolia" />
</div>

<script src="//cdnjs.cloudflare.com/ajax/libs/showdown/1.4.2/showdown.min.js"></script>
<script src="//cdn.jsdelivr.net/instantsearch.js/1/instantsearch.min.js"></script>
<script src="../app.js"></script>
<style>
.fitxa_detall tr td:first-child{
  font-weight: bold;
}
.nested_background{
    background-color: #ddd;
}
</style>
