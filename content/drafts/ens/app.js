/* global instantsearch */

app({
  appId: 'X6GHXEQ01H',
  apiKey: '73efe57acbf082fa6de48e680a3d7d2f',
  indexName: 'cataleg_ens'
});

/* Funcions per a pintar la fitxa a la plana de detall*/
function drawFitxa(item){
  var stb = []; 
  
  stb.push("<h1>",item["Denominació"],"</h1><table class='fitxa_detall col-xs-12 col-md-12'><tbody><tr><th colspan='2'>Dades de l'ENS</th></tr>")

  for(var k in item){
    if(k.indexOf("_")===-1 && k!=="objectID" && typeof(item[k])!=="object" && item[k]){
      stb.push("<tr><td class='col-md-4'>",k.replace(/\|/g,"'"),"</td><td>",item[k],"</td></tr>");
    }
  }

  stb.push("</tbody></table>");

  stb = stb.concat(getDataNode(item, "particeps", "Partíceps"));
  stb = stb.concat(getDataNode(item, "membres_organ_govern", "Membres òrgan de govern"));
  stb = stb.concat(getDataNode(item, "persones_organ_govern", "Persones òrgan de govern"));
  stb = stb.concat(getDataNode(item, "persones_consell", "Persones del consell d'administració"));
  stb = stb.concat(getDataNode(item, "registre", "Dades registrals"));

  $(stb.join("")).appendTo($("#hits")); 
}

function getDataNode(item, key, header){
  var stb = [];
  if(item[key] && item[key].length){
    stb.push("<table class='fitxa_detall col-xs-12 col-md-12'><tbody><tr><th colspan='2'>",header,"</th></tr>")
    for(var i=0, z=item[key].length;i<z;i++){
      if(i>0){
        stb.push("<tr><td colspan='2' class='nested_background'></td></tr>");
      }
      for(var k in item[key][i]){
        if(item[key][i][k]){
          stb.push("<tr><td class='col-md-4'>",k.replace(/\|/g,"'"),"</td><td>",item[key][i][k],"</td></tr>");
        }        
      }
    }
    stb.push("</tbody></table>");
  }
  return stb;
}

/* Funcions per a l'instant search*/
function app(opts){

  var isDetailPage = (window.location.pathname.indexOf("detall")>-1)

  var search = instantsearch({
    appId: opts.appId,
    apiKey: opts.apiKey,
    indexName: opts.indexName,
    urlSync: true
  });

  search.addWidget(
    instantsearch.widgets.hits({
      container: (isDetailPage?'#hits_fake':'#hits'),
      hitsPerPage: 10,
      templates: {
        item: getTemplate('hit'),
        empty: getTemplate('no-results')
      },
      transformData : function(item){
        if(isDetailPage && $(".fitxa_detall").size()===0){
          if(item && item.hits && item.hits.length===0){
            $("#hits_fake").removeClass("hidden");  
          }else{
            drawFitxa(item);
          }
        }
        return item;
      }
    })
  );

  if(!isDetailPage){

    search.addWidget(
      instantsearch.widgets.searchBox({
        container: '#query',
        placeholder: 'Cerca ens'
      })
    );

    search.addWidget(
      instantsearch.widgets.stats({
        container: '#stats',
        templates: {
          body: getTemplate('stats')
        }
      })
    );

    search.addWidget(
      instantsearch.widgets.pagination({
        container: '#pagination',
        autoHideContainer: true,
        scrollTo: '#query',
        showFirstLast : false,  
        maxpages : 10,
        labels: {
          previous : "anterior",
          next : "següent",
          first: "primera",
          last : "última"
        },
        cssClasses : {
          first : "hidden-xs",
          last : "hidden-xs",
          page : "hidden-xs"
        }
      })

    );

    search.addWidget(
      instantsearch.widgets.refinementList({
        container: '#tipus',
        attributeName: 'Tipus d|ens catàleg',
        autoHideContainer: true,
        limit: 10,
        operator: 'or',
        templates: {
          header: "<strong>Tipus d'ens</strong>"
        }
      })
    )

    search.addWidget(
      instantsearch.widgets.refinementList({
        container: '#via',
        attributeName: 'Via de participació',
        autoHideContainer: true,
        limit: 10,
        operator: 'or',
        templates: {
          header: "<strong>Via de participació</strong>"
        }
      })
    )

    search.addWidget(
      instantsearch.widgets.refinementList({
        container: '#grau',
        attributeName: 'Grau de participació',
        autoHideContainer: true,
        limit: 10,
        operator: 'or',
        templates: {
          header: "<strong>Grau de participació</strong>"
        }
      })
    )

    search.addWidget(
      instantsearch.widgets.refinementList({
        container: '#estat',
        attributeName: 'Estat registral',
        autoHideContainer: true,
        limit: 10,
        operator: 'or',
        templates: {
          header: "<strong>Estat registral</strong>"
        }
      })
    )
  }else{

    //creates node "cercador" in breadcrumbs
    search.on("render", function(){
      $("<a href='../cercador' onclick='if(document.referrer.indexOf(\"/ens/cercador\")>-1){this.href=document.referrer}'>Cercador</a>").appendTo($(".breadcrumbs2"));
    })

  }

  search.start();

}

function getTemplate(templateName) {
  return document.querySelector('#' + templateName + '-template').innerHTML;
}

function getHeader(title) {
  return '<h5>' + title + '</h5>';
}
