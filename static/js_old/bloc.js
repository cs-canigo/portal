$(function(){
	
	var API_KEY = "0netGci3Uuni8bmiMQVPfARJ485qnkpcsZk42nV5bxcZp0LC96usCJxqywHa9zZz",
		forum = "arquitectura-ctti";

	$.each($("a.bloc_post"), function(i,anchor){
		
		$.getJSON("http://disqus.com/api/3.0/threads/list.json?api_key="+API_KEY+"&forum="+forum+"&thread=link:"+anchor.href+"&callback=?")
		.done(function(data){
			var n = data.response[0].posts + (n===1?" comentari":" comentaris");
			$(anchor).parent().parent().find(".ncomments").html(n).css("border-left","1px solid grey");
		});
	});

});