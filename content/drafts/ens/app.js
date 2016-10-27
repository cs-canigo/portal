/* global instantsearch */

console.log("load app.js")
app({
  appId: 'X6GHXEQ01H',
  apiKey: '73efe57acbf082fa6de48e680a3d7d2f',
  indexName: 'cataleg_ens'
});


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
      container: '#hits',
      hitsPerPage: 10,
      templates: {
        item: getTemplate('hit'),
        empty: getTemplate('no-results')
      },
      transformData : function(item){
        if(isDetailPage && $("#fitxa_detall").size()===0){
          var stb = []; 
          for(var k in item){
            if(k.indexOf("_")===-1 && k!=="objectID" && typeof(item[k])!=="object"){
              stb.push("<tr><td>",k.replace(/\|/g,"'"),"</td><td>",item[k],"</td></tr>");
            }
          }
          $("<h1>"+item["Denominació"]+"</h1><table id='fitxa_detall'>"+stb.join("")+"</table>").appendTo($("#hits")); 
          return;
        }else{
          return item;
        }
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
  }

  search.start();

}

function getTemplate(templateName) {
  return document.querySelector('#' + templateName + '-template').innerHTML;
}

function getHeader(title) {
  return '<h5>' + title + '</h5>';
}
