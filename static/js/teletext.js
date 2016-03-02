function getURLParam (param) {
 	if(!window.location.hash && !window.location.search){
 		return "";
 	}
 	var query = window.location.hash || window.location.search;
 	var uriparam = encodeURI(param).replace(/[\.\+\*]/g, "\\$&");
 	var value = decodeURI(query.replace(new RegExp("^(?:.*[&\\!\\?]" + uriparam + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
	return value;
}

function getLocale(){
	var locale = "ca-ES";
	var lang = getURLParam("lang");

	if(lang!==""){
		switch(lang){
			case "ca":
				locale = "ca-ES";
				break;
			case "es":
				locale = "es-ES";
				break;
			case "en":
				locale = "en-EN";
				break;
		}
	}
	return locale;	
}

function getOptions(){	
    return {
        'id': '787d1bf3-29a7-43d0-ad97-3d128ca46701',
        'locale' : getLocale()
    }
}

function TxtRefresh(){
	Txt.refresh(getOptions());
	manageLang();
}

function manageLang(){
	var lang = getURLParam("lang");
	if(lang===""){lang="ca";}
	$(".idioma a").each(function(){
		if($(this).attr("data-lang")===lang){
			$(this).css("display","none");	
		}else{
			$(this).css("display","block");			
		}
		switch(this.title){
			case "ca":
				this.title = "Català";
				break;
			case "es":
				this.title = "Castellano";
				break;
			case "en":
				this.title = "English";
				break;
		}
	});

}

Txt.render(getOptions());

$(window).on("hashchange", function( event ){
	TxtRefresh();
});

$(document).ready(function(){
	manageLang();
});


