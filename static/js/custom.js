var
	fil_cercador = [["noticies","Notícies"],["bloc","Bloc d'Arquitectura"]],
	url = "canigo.ctti.gencat.cat"
;

$(function(){
	$(".breadcrumbs2 a").each(function(i,it){
		if($(it).html().replace(/\s/g,"").length===0){
			$(it).addClass("hidden");
		}
	});

	var toc_parent = $('#TOC ul').first().parent();
	var toc = $('#TOC ul ul').first();
	$(toc_parent).prepend($(toc));
	$('#TOC ul').last().remove();

	var heads2 = $("article.contingut h2").size();
	var cols = 3;
	var last = Math.ceil(heads2/cols);
	$('#TOC ul li:nth-child('+last+'n)').addClass("no-border");

	if($(toc).find("li").size()<=2){
		$(toc).remove();
	}

	//gestió del fil d'ariadna en el cercador
	for(var i=0;i<fil_cercador.length;i++){
		if(window.location.hash.indexOf("&type="+fil_cercador[i][0])>-1){
			var breadcrumbs2 = $(".breadcrumbs2");
			$(breadcrumbs2).html("<a href='/"+fil_cercador[i][0]+"/'>"+fil_cercador[i][1]+"</a>");
			$(breadcrumbs2).parent().append("<li>Cercador</li>");
			$(".capcalera_flotant").html(fil_cercador[i][1]);
			if($("#cercadorIndex #sitesearch").size()===0){
				$("<input type='hidden' name='sitesearch' value='"+url+"/"+fil_cercador[i][0]+"' />").appendTo("#cercadorIndex");
			}
		}
	}

	//Fil ariadna QUI SOM
	if(window.location.pathname.indexOf("/quisom")>-1){
		$(".breadcrumbs2").remove();
	}

});

var client = algoliasearch('SQZ0PDH35B', '142be7e9b4f045f95ff9b0761c5cddc0')
var index = client.initIndex('prod_ARQUITECTURA');
autocomplete('#cerca2', {hint: false}, [
{
  source: autocomplete.sources.hits(index, {hitsPerPage: 5}),
  displayKey: 'title',
  templates: {
    suggestion: function(suggestion) {
      return suggestion._highlightResult.title.value;
    },
    footer: function(){
    	return "<p>&nbsp;</p>";
    }
  }
}
]).on('autocomplete:selected', function(event, suggestion, dataset) {
    console.log(suggestion, dataset);
	window.location.replace(suggestion.path);
});
