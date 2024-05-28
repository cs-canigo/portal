+++
date        = ""
title       = "Cercador"
description = ""
no_index 	= true
+++
<link href="/css/cercador.css" rel="stylesheet" type="text/css" />

<br />
<div class="col-md-12 col-xs-12 column vista-mobil pd-30 pd-15">
	<div class="capcelera_basica_cont">
		<div class="cercador-gencat">
			<div class="cercador-tramits-detall no-space-left detall-cerc">
				<form class="navbar-form cercador_vermell alineat-cercador-tramits" action="/cercador">
					<div class="form-group">
						<div class="hidden-xs">
							<p class="sr-only">Cercador</p>
							<label for="cercadorOcultGoogle" class="sr-only">
								Introdueixi terme que voleu cercar
							</label>
							<input type="search" name="q" id="query" title="Cercador" class="form-control" value="" placeholder="Cerca...">
							<input aria-label="Cercar" class="btn btn-default hidden-xs" type="submit" value="&nbsp;">
							<button type="reset" title="Esborra" class="btn btn-default visible-xs"></button>
						</div>
					</div>
				</form>
				<div class="column hidden-xs ">
					<p id="stats" class="txt_result count_resultats"></p>	
				</div>
			</div>
		</div>
	</div>
</div>

<!--form id="cercadorIndex" class="navbar-form cercador_vermell col-sm-3" method="get" action="/cercador/" onsubmit="return false;">
	<div class="form-group">
		<input type="search" name="q" id="query"
			title="Introdu&iuml;u les paraules a cercar"
			class="form-control"  placeholder="Cerca..." />
		<span class="btn btn-default hidden-xs" onclick="$('#cercadorIndex').submit()"></span>
		<button class="btn btn-default visible-xs" title="Neteja" type="button"></button>
	</div>
</form-->
<br />

<section class="rslt col-md-12 col-xs-12 column vista-mobil pd-30 pd-15" id="cercador_text">


<div class="row">

<div id="left-column" class="col-xs-12 col-md-3">
	<div id="tags" class="facet"></div>
</div>

<div class="list-group col-xs-12 col-md-8">
	<ul id="hits" class="llistat_destacat_text_cont list-group pd-15">
	</ul>
</div>

<div class="column paginacio pd-15" id="pagination">
</div>

</section>

<!-- TEMPLATES -->
<script type="text/html" id="hit-template">
	<li class="destacat_text list-group-item filet_inf col-sm-4 col-md-3" style="border-bottom:1px solid #ddd">

		<div class="destacat_text_cont">
			<p></p>
			<a role="button" class=" resultItem" href="{{path}}"><h3>{{{_highlightResult.title.value}}}</h3></a>
			<p>
				{{#description}}
					{{{_highlightResult.description.value}}}
				{{/description}}

				{{^description}}
					{{{_highlightResult.content.value}}}
				{{/description}}
			</p>
			<a class="link_resultats pull_left" title="{{{_highlightResult.title.value}}}" href="{{path}}">{{path}}</a>
		</div>
	</li>
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
<script src="//cdn.jsdelivr.net/npm/instantsearch.js@1.12.1/dist/instantsearch.min.js"></script>
<!--script src="/js/cercador.js"></script-->
<script src="/js/algolia-search.js"></script>
