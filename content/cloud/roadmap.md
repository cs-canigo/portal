+++
date        = "2016-05-11"
title       = "Roadmap"
description = "Roadmap del Container Cloud i Public Cloud"
sections    = "Container Cloud"
weight      = 99
draft 		= true
categories  = ["cloud","docker","container","paas"]
+++

<!--iframe src='https://cdn.knightlab.com/libs/timeline3/latest/embed/index.html?source=1CNmdw6X_BmaREbGKsPfXKjs0FEVap5vqPXDCo4LVhbs&amp;font=Default&amp;lang=ca&amp;initial_zoom=2&amp;height=650&amp;start_at_end=true' width='100%' height='650' frameborder='0'></iframe-->


<link title="timeline-styles" rel="stylesheet" href="https://cdn.knightlab.com/libs/timeline3/latest/css/timeline.css" />

<script src="/js/sheet2array.js"></script>
<script src="https://cdn.knightlab.com/libs/timeline3/latest/js/timeline.js"></script>

<div id='timeline-embed' style="width: 100%; height: 600px"></div>

<script type="text/javascript">

	   $.getJSON("https://script.google.com/macros/s/AKfycbwxChBaW2lQQthQKTMPvulYDivJkIzFb_aaJmviLaItbFM9fDq3/exec?callback=?", null, function(results){
	   			
				var additionalOptions = {
			    	start_at_slide: results.slide,
			        timenav_height: 200,
			        height : 650,
			        initial_zoom: 6,
			        language : "ca"
			    }	   			

			    console.log(additionalOptions)

			  	timeline = new TL.Timeline('timeline-embed', 'https://docs.google.com/spreadsheets/d/1wCymkRrs6skIOh5_rajU1HIe5KxD1S20zjU9tVZAcOI/pubhtml', additionalOptions);
	   });


</script>