+++
date        = "2015-01-27"
title       = "Mòduls i versions Canigó"
description = ""
no_index 	= true
+++
<link href="/css/cercador.css" rel="stylesheet" type="text/css" />

<section class="rslt" id="cercador_text">

<div class="column hidden-xs ">
	<p id="stats" class="txt_result count_resultats"></p>	
</div>

<div class="row">

            <div id="left-column" class="col-xs-12 col-md-9">
                <div id="major" class="facet col-xs-12 col-md-4"></div>
                <div id="chart_majors" class="chart col-xs-12 col-md-8"></div>
                <div id="minor" class="facet col-xs-12 col-md-4"></div>
                <div id="chart_minors" class="chart col-xs-12 col-md-8"></div>
                <div id="modules" class="facet col-xs-12 col-md-4"></div>
                <div id="chart_moduls" class="chart col-xs-12 col-md-5"></div>
                <div id="modules_version" class="facet col-xs-12 col-md-12"></div>
            </div>

            <div id="hits" class="list-group col-xs-12 col-md-3">
                
            </div>

            <div class="column paginacio">
              <div id="pagination"></div>
            </div>  
</div>

</section>

<!-- TEMPLATES -->
<script type="text/html" id="hit-template">
    <div class="destacat_text list-group-item">
        <h2>{{codi}} {{nom}} {{rev}}</h2>
        <div class="app_modules">
        	{{modules_version}}
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
  S'han trobat <b>{{nbHits}} aplicacions</b>
</script>
<!-- /TEMPLATES -->

<div id="logo-algolia">
	<!--<img src="/images/algolia/Algolia_logo_bg-white.jpg" alt="Logo Algolia" /> -->
</div>

<script src="//cdn.jsdelivr.net/npm/instantsearch.js@1.12.1/dist/instantsearch.min.js"></script>
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<script src="/js/algolia-search-moduls.js"></script>
