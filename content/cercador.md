+++
date        = "2015-01-27"
title       = "Cercador"
description = ""
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
        <h2><a href="{{path}}">{{title}}</a></h2>
        <p>
        	{{description}}
        </p>
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

<script src="//cdn.jsdelivr.net/instantsearch.js/1/instantsearch.min.js"></script>
<!--script src="/js/cercador.js"></script-->
<script src="/js/algolia-search.js"></script>