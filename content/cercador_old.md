+++
date        = "2015-01-27"
title       = "Cercador"
description = ""
+++

<section class="rslt" id="cercador_text">

<div class="column hidden-xs ">
	<p class="txt_result count_resultats"></p>	
</div>

<div class="row">
	<div class="llistat_destacat_text col-md-12 col-xs-12 column ">
			<div class="ajax_loader">
				<img src="/img/ajax_loader.gif" alt="" style="width:32px" />
			</div>
			<ul id="resultats" class="llistat_destacat_text_cont list-group">

			</ul>

			<div class="column paginacio">
				<ul class="pagination">	

				</ul>	
			</div>	
	</div>	
</div>

</section>

<div id="template_result" class="hidden">
	<div class="destacat_text_cont">
		<h2>
			<a href="#">{{title}}</a>
		</h2>
	
		<p>
			{{description}}
		</p>
	</div>
</div>

<script src="/js/cercador.js"></script>