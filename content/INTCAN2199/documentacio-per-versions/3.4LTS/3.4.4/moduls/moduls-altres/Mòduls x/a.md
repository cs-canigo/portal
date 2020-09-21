+++
date        = "2020-06-19"
title       = "Mòduls x"
description = "Mòduls x"
sections    = "Canigó"
+++

	.Permalink: {{ .Permalink }}
	htmlUnescape: {{ htmlUnescape .Permalink }}
	htmlUnescape2: {{ .Permalink | htmlUnescape }}
	safeHTML_htmlUnescape: {{ safeHTML (htmlUnescape .Permalink)  }}
	safeHTML: {{ safeHTML .Permalink }}
	safeHTML2: {{ .Permalink | safeHTML }}
	safeHTMLAttr: {{ safeHTMLAttr .Permalink }}
	safeHTMLAttr2: {{ .Permalink | safeHTMLAttr }}
	safeURL: {{ safeURL .Permalink }}
	safeURL2: {{ .Permalink | safeURL }}
	decodeURI: <script type="text/javascript"> alert(decodeURI({{ .Permalink }})) </script>