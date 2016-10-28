+++
date        = "2015-01-27"
title       = "Fitxa detall"
description = ""
no_index 	= true
+++
<link href="/css/cercador.css" rel="stylesheet" type="text/css" />

<section class="rslt" id="cercador_text">

<div class="row">

    <div id="hits" class="list-group col-xs-12 col-md-12">
    	
    </div>

    <div id="hits_fake" class="hidden">
    	
    </div>


</div>

</section>

<!-- TEMPLATES -->
<script type="text/html" id="hit-template">
	<div class="destacat_text list-group-item">
        <h2>{{Denominació}}</h2>
        <div class="block-with-text">
        </div>
	</div>
</script>

<script type="text/html" id="no-results-template">
	<div id="no-results-message">
	  <p>No s'han trobat resultats per a la cerca <em>"{{query}}"</em>.</p>
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
