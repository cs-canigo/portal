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

    {{#detall_de_partícips.length}}
    <table class='fitxa_detall col-xs-12 col-md-12'>
        <tbody>
            <tr><th colspan='2'>Partíceps</th></tr>
            {{#detall_de_partícips}}
                {{#.}}
                <tr><td class='col-md-4'>{{key}}</td><td>{{value}}</td></tr>
                {{/.}}
                <tr><td colspan='2' class='nested_background'></td></tr>                
            {{/detall_de_partícips}}
        </tbody>
    </table>
    {{/detall_de_partícips.length}}

    {{#membres_òrgan_de_govern.length}}
    <table class='fitxa_detall col-xs-12 col-md-12'>
        <tbody>
            <tr><th colspan='2'>Membres dels òrgans de govern</th></tr>
            {{#membres_òrgan_de_govern}}
                {{#.}}
                <tr><td class='col-md-4'>{{key}}</td><td>{{value}}</td></tr>
                {{/.}}
                <tr><td colspan='2' class='nested_background'></td></tr>                
            {{/membres_òrgan_de_govern}}
        </tbody>
    </table>
    {{/membres_òrgan_de_govern.length}}

    {{#persones_òrgan_de_govern.length}}
    <table class='fitxa_detall col-xs-12 col-md-12'>
        <tbody>
            <tr><th colspan='2'>Persones òrgan de govern</th></tr>
            {{#persones_òrgan_de_govern}}
                {{#.}}
                <tr><td class='col-md-4'>{{key}}</td><td>{{value}}</td></tr>
                {{/.}}
                <tr><td colspan='2' class='nested_background'></td></tr>                
            {{/persones_òrgan_de_govern}}
        </tbody>
    </table>
    {{/persones_òrgan_de_govern.length}}

    {{#persones_cons_adm_soc_mercantil.length}}
    <table class='fitxa_detall col-xs-12 col-md-12'>
        <tbody>
            <tr><th colspan='2'>Persones del consell d'administració</th></tr>
            {{#persones_cons_adm_soc_mercantil}}
                {{#.}}
                <tr><td class='col-md-4'>{{key}}</td><td>{{value}}</td></tr>
                {{/.}}
                <tr><td colspan='2' class='nested_background'></td></tr>                
            {{/persones_cons_adm_soc_mercantil}}
        </tbody>
    </table>
    {{/persones_cons_adm_soc_mercantil.length}}

    {{#dades_registrals.length}}
    <table class='fitxa_detall col-xs-12 col-md-12'>
        <tbody>
            <tr><th colspan='2'>Dades registrals</th></tr>
            {{#dades_registrals}}
                {{#.}}
                <tr><td class='col-md-4'>{{key}}</td><td>{{value}}</td></tr>
                {{/.}}
                <tr><td colspan='2' class='nested_background'></td></tr>                
            {{/dades_registrals}}
        </tbody>
    </table>
    {{/dades_registrals.length}}

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
