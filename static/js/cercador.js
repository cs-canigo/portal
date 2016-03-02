var 
	replaces = [["noticies/","noticies"],["bloc/","bloc"]],
	default_collection = "canigo"
;


function getURLParam (param) {
 	if(!window.location.hash){
 		return "";
 	}
	return decodeURI(window.location.hash.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(param).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}

function searchResults(reset){

	var query = $("#query").val() || getURLParam("query"),
 		sitesearch = getURLParam("sitesearch"),
  		start = getURLParam("start")*1 || 0,
  		site = getURLParam("site") || default_collection,
  		type = getURLParam("type") || "",
  		param_site = ""
  	;

  	for(var i=0;i<replaces.length;i++){
		sitesearch = sitesearch.replace(replaces[i][0],replaces[i][1]);  		
  	}

  	window.location.hash = "?query=" + query + (start>0?"&start="+start:"") + (type!==""?"&type="+type:"")+ (sitesearch!==""?"&sitesearch="+sitesearch:"")+ (site!==default_collection?"&site="+site:"");

	$(".ajax_loader").removeClass("hidden");
	$(".ajax_loader").addClass("show");

	var results = $("#resultats");
	var pagination = $(".pagination");

	results.html("");
	pagination.html("");
	$(".count_resultats").html("");
	
	$.getJSON("https://script.google.com/macros/s/AKfycbzNOFjc2KGjLzQJ8ieWlenF9Yan0zUtsEUZYCtSPOnh5Rh3rMa5/exec?callback=?", {
	    "query" : query,
	    "site" : site,
	    "sitesearch" : sitesearch,
	    "start" : start,
	    "client" : "default_frontend"
	})

	.done(function( data ) {
		$(".ajax_loader").addClass("hidden");
		$("#query").val(query.replace(/\+/g, " "));
		if(data.total){
			$(".count_resultats").html("S'han trobat <strong>" + data.total + "</strong> resultats");
		}

		var template = $("#template_result").html();
		var aux;

		if(!data.items || data.items.length===0){
			$("<h3>No s'han trobat resultats</h3>").appendTo(results)
			return;
		}

		$.each(data.items, function(i,item){
			aux = template;
			aux = aux.replace("#",item.url)
					.replace("#",item.encodedUrl)
					.replace("{{title}}",(item.title?item.title.replace(/&#39;/g,"'"):""))
					.replace("{{description}}",(item.description?item.description.replace(/&#39;/g,"'"):""))
				;

			$("<li class='destacat_text list-group-item filet_inf col-sm-4 col-md-3'>"+aux+"</li>").appendTo(results)
		});

		//pagination
		if(data.total<10){
			return;
		}

		var pages = data.total/10;

		$("<li><a class=\""+((start===0)?"ocult":"visible")+"\" onclick=\"window.location.hash='?query=" + query + "&sitesearch="+sitesearch+"&start="+ (start-10)+"';searchResults();return false;\" href=\"#\"<span>anterior</span></a></li>").appendTo(pagination);

		$("<li><a class=\""+((start+10>=data.total)?"ocult":"visible")+"\" onclick=\"window.location.hash='?query=" + query + "&sitesearch="+sitesearch+"&start="+ (start+10)+"';searchResults();return false;\" href=\"#\"><span>següent</span></a></li>").appendTo(pagination);
	
	});
}

$(function(){
	searchResults(false);
});
