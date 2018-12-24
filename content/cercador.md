+++
date        = "2015-01-27"
title       = "Cercador"
description = ""
no_index 	= true
+++
<link href="/css/cercador.css" rel="stylesheet" type="text/css" />

<section class="rslt" id="cercador_text">

<div class="column hidden-xs ">
	<p id="stats" class="txt_result count_resultats"></p>	
</div>

<div class="row">
		    <div id="left-column" class="col-xs-12 col-md-4">
		      <div id="tags" class="facet"></div>
		    </div>

		    <div id="hits" class="list-group col-xs-12 col-md-8">
		    	
		    </div>

			<div class="column paginacio">
		      <div id="pagination"></div>
			</div>	
</div>

</section>

<!-- TEMPLATES -->
<script type="text/html" id="hit-template">
	<div class="destacat_text list-group-item">
        <h2><a href="{{path}}">{{{_highlightResult.title.value}}}</a></h2>
        <div class="block-with-text">
        	{{#description}}
        	{{{_highlightResult.description.value}}}
        	{{/description}}

        	{{^description}}
        	{{{_highlightResult.content.value}}}
        	{{/description}}
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

<!--<div id="logo-algolia"> -->
	<!-- <img src="/images/algolia/Algolia_logo_bg-white.jpg" alt="Logo Algolia" /> -->
<!--</div> -->

<script src="//cdnjs.cloudflare.com/ajax/libs/showdown/1.4.2/showdown.min.js"></script>
<script src="//cdn.jsdelivr.net/npm/instantsearch.js@3.0.0/dist/instantsearch.production.min.js"></script>
<!--script src="/js/cercador.js"></script-->
<script src="/js/algolia-search.js"></script>
