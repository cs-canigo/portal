var fil_cercador = [["noticies","Notícies"],["bloc","Bloc d'Arquitectura"]];
var url = "canigo.ctti.gencat.cat";

document.addEventListener("DOMContentLoaded", function() {
	var breadcrumbs2 = document.querySelectorAll(".breadcrumbs2 a");
	breadcrumbs2.forEach(function(it) {
		if (it.innerHTML.replace(/\s/g,"").length === 0) {
			it.classList.add("hidden");
		}
	});

	if(!document.querySelector('#TOC ul')){
		return;
	}

	var toc_parent = document.querySelector('#TOC ul').parentNode;
	var toc = document.querySelector('#TOC ul ul');
	toc_parent.insertBefore(toc, toc_parent.firstChild);
	toc.parentNode.removeChild(toc.parentNode.lastChild);

	var heads2 = document.querySelectorAll("article.contingut h2").length;
	var cols = 3;
	var last = Math.ceil(heads2 / cols);
	var tocLi = document.querySelectorAll('#TOC ul li:nth-child(' + last + 'n)');
	tocLi.forEach(function(li) {
		li.classList.add("no-border");
	});

	if (toc.querySelectorAll("li").length <= 2) {
		toc.parentNode.removeChild(toc);
	}

	for (var i = 0; i < fil_cercador.length; i++) {
		if (window.location.hash.indexOf("&type=" + fil_cercador[i][0]) > -1) {
			var breadcrumbs2 = document.querySelector(".breadcrumbs2");
			breadcrumbs2.innerHTML = "<a href='/" + fil_cercador[i][0] + "/'>" + fil_cercador[i][1] + "</a>";
			var parent = breadcrumbs2.parentNode;
			var li = document.createElement("li");
			li.innerHTML = "Cercador";
			parent.appendChild(li);
			var capcalera_flotant = document.querySelector(".capcalera_flotant");
			capcalera_flotant.innerHTML = fil_cercador[i][1];
			if (document.querySelector("#cercadorIndex #sitesearch") === null) {
				var input = document.createElement("input");
				input.type = "hidden";
				input.name = "sitesearch";
				input.value = url + "/" + fil_cercador[i][0];
				document.querySelector("#cercadorIndex").appendChild(input);
			}
		}
	}

	if (window.location.pathname.indexOf("/quisom") > -1) {
		var breadcrumbs2 = document.querySelector(".breadcrumbs2");
		breadcrumbs2.parentNode.removeChild(breadcrumbs2);
	}
});

var client = algoliasearch('SQZ0PDH35B', '36b9c3ee8bb800e0212913189cd5cdea');
var index = client.initIndex('prod_ARQUITECTURA');
autocomplete('#cerca2', {hint: false}, [
	{
		source: autocomplete.sources.hits(index, {hitsPerPage: 5}),
		displayKey: 'title',
		templates: {
			suggestion: function(suggestion) {
				return suggestion._highlightResult.title.value;
			},
			footer: function() {
				return "<p>&nbsp;</p>";
			}
		}
	}
]).on('autocomplete:selected', function(event, suggestion, dataset) {
	console.log(suggestion, dataset);
	window.location.replace(suggestion.path);
});

const getMdNextEl = function(item, collapseNext) {
	let el = [];
	let next = item.parentNode;
	let found;
	let count;
	for(let i=0,z=collapseNext.length;i<z;i++){
		next = next.nextElementSibling;
		found=false;
		cont = 0;
		while(!found && cont<10){
			if (next.nodeName.toLowerCase() === collapseNext[i]) {
				found = true;
				el.push(next);
			}
			cont++;
		}
	}
	return el;
}

document.addEventListener("DOMContentLoaded", function() {

	var collapseMDs = document.querySelectorAll(".collapseMD");
	collapseMDs.forEach(function(item) {
		var collapseNext = item.dataset.collapseNext;
		collapseNext = collapseNext ? collapseNext.split(" ") : [];
		var el = getMdNextEl(item, collapseNext);

		item.textContent = "[+]";
		item.style.cursor = "pointer";
		item.style.color = "#BF0000";

		item.addEventListener("click", function() {
			if (item.textContent === "[+]") {
				item.textContent = "[-]";
				el.forEach(function(element) {
					element.classList.remove("hidden");
				});
			} else {
				item.textContent = "[+]";
				el.forEach(function(element) {
					element.classList.add("hidden");
				});
			}
		});

		el.forEach(function(element) {
			element.classList.add("hidden");
		});
	});

});
