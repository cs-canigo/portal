var converter = new showdown.Converter();
converter.setOption('tables', true);

function replaceHighLight(content){
  var matches;

  do{
    matches = content.match(/\]\(.*?(<span class="highlight_hit">(.*?)<\/span>).*?\)/g);
    if(!matches){
        return content;
    }
    var highlight = /<span class="highlight_hit">(.*?)<\/span>/g;
    var highmatches;
    for(var i=0,z=matches.length;i<z;i++){
      highmatches = highlight.exec(matches[i]);
      if(highmatches)
      content = content.replace(matches[i], matches[i].replace(highmatches[0],highmatches[1]));
    }
  }while(matches!=null)

  return content;
}


/* global instantsearch */
app({
  appId: 'SQZ0PDH35B',
  apiKey: '142be7e9b4f045f95ff9b0761c5cddc0',
  indexName: 'prod_ARQUITECTURA'
});

function app(opts) {
  var search = instantsearch({
    appId: opts.appId,
    apiKey: opts.apiKey,
    indexName: opts.indexName,
    urlSync: true,
    searchFunction : function(helper) {
      if (helper.state.query === '') {
        //return;
      }
      helper.search();
    }
  });

  search.addWidget(
    instantsearch.widgets.searchBox({
      container: '#query',
      placeholder: 'Cerca....'
    })
  );

  search.addWidget(
    instantsearch.widgets.hits({
      container: '#hits',
      hitsPerPage: 10,
      templates: {
        item: getTemplate('hit'),
        empty: getTemplate('no-results')
      },
      transformData : function(item){
        item.content = converter.makeHtml(item.content);
        if(item._highlightResult && item._highlightResult.content){
          item._highlightResult.content.value = converter.makeHtml(replaceHighLight(item._highlightResult.content.value));
        }
        if(item._snippetResult && item._snippetResult.content){
          item._snippetResult.content.value = converter.makeHtml(replaceHighLight(item._snippetResult.content.value));
        }
        return item;
      }
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
      container: '#tags',
      attributeName: 'sections',
      autoHideContainer: true,
      limit: 10,
      operator: 'or',
      templates: {
        header: getHeader()
      },
      transformData : {
        item : function(obj){
          //console.log(obj)
          if(obj.name==="home"){
            for(var k in obj.cssClasses){
              //obj.cssClasses.item = obj.cssClasses.item + " hidden";
              obj.cssClasses[k] = obj.cssClasses[k] + " hidden";
            }
          }
          return obj;
        }
      }
    })
  )

  search.start();
}

function getTemplate(templateName) {
  return document.querySelector('#' + templateName + '-template').innerHTML;
}

function getHeader(title) {
  return title;
  //return '<h5>' + title + '</h5>';
}
