/* global instantsearch */

app({
  appId: 'X6GHXEQ01H',
  apiKey: '73efe57acbf082fa6de48e680a3d7d2f',
  indexName: 'cataleg_ens'
});

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
      container: hits,
      hitsPerPage: 10,
      templates: {
        item: getTemplate('hit'),
        empty: getTemplate('no-results')
      },
      //transform data to make easy templating from html
      transformData : function(item){
        if(isDetailPage){
          var newItem = {
            dades : []
          };
          newItem.title = item["Denominació"];
          for(var k in item){
            if(k.indexOf("_")===-1 && k!=="objectID" && typeof(item[k])!=="object" && item[k]){
              newItem.dades.push({"key" : k.replace(/\|/g,"'"), "value" : item[k]});
            }else{
              if(typeof(item[k])!=="object"){
                newItem[k] = item[k];
              }else{
                newItem[k] = [];
                for(var i=0,z=item[k].length; i<z; i++){
                  newItem[k][i] = [];
                  for(var subk in item[k][i]){
                    if(item[k][i][subk]){
                      newItem[k][i].push({"key" : subk.replace(/\|/g,"'"), "value" : item[k][i][subk]});
                    }
                  }
                }
              }
            }
          }
          item = newItem;
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