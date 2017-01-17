+++
date        = "2017-01-16"
title       = "Roadmap CS Canigó 2017"
description = "Roadmap del CS Canigó: Canigó, SIC i SGDE"
sections    = "Roadmap"
weight      = 5
categories  = ["canigo","sic","sgde"]
+++

<link title="timeline-styles" rel="stylesheet" href="https://cdn.knightlab.com/libs/timeline3/latest/css/timeline.css" />

<script src="/js/sheet2array.js"></script>
<script src="https://cdn.knightlab.com/libs/timeline3/latest/js/timeline.js"></script>

<div id='timeline-embed' style="width: 100%; height: 600px;"></div>

<script type="text/javascript">

	   $.getJSON("https://script.google.com/macros/s/AKfycbwXOwdyefmpRayODliduXDI2m0wCm_TKMiB_tQkkDDKaA4l9WQ/exec?callback=?", null, function(results){
	   			
				var additionalOptions = {
			    	start_at_slide: results.slide,
			        timenav_height: 200,
			        height : 650,
			        initial_zoom: 12,
			        language : "ca"
			    }	   			

			    console.log(additionalOptions)

			  	timeline = new TL.Timeline('timeline-embed', 'https://docs.google.com/spreadsheets/d/1muWv3kPUZMv22VugPkWxY7Ipf5Imh4KWrdcEgOv7emE/pubhtml', additionalOptions);
	   });


</script>
