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
  appId: 'EWLW9DD0B6',
  apiKey: 'fb84eb986e0a351c3f12f948e3ee99b8',
  indexName: 'moduls-canigo'
});

function app(opts) {
  var search = instantsearch({
    appId: opts.appId,
    apiKey: opts.apiKey,
    indexName: opts.indexName,
    urlSync: true/*,
    searchFunction : function(helper) {
      if (helper.state.query === '') {
        return;
      }
      helper.search();
    }*/
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
      hitsPerPage: 40,
      templates: {
        item: getTemplate('hit'),
        empty: getTemplate('no-results')
      }/*,
      transformData : function(item){
        console.log(item.rev)
        return item; 
      }*/
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
      container: '#major',
      attributeName: 'major',
      autoHideContainer: false,
      limit: 10,
      operator: 'or',
      templates: {
        header: getHeader("Versió major")
      }
    })
  )

  search.addWidget(
    instantsearch.widgets.refinementList({
      container: '#minor',
      attributeName: 'minor',
      autoHideContainer: false,
      limit: 100,
      operator: 'or',
      templates: {
        header: getHeader("Versió menor")
      }
    })
  )

  search.addWidget(
    instantsearch.widgets.refinementList({
      container: '#modules',
      attributeName: 'modules',
      autoHideContainer: false,
      limit: 100,
      operator: 'or',
      templates: {
        header: getHeader("Mòduls")
      }
    })
  )

  search.addWidget(
    instantsearch.widgets.refinementList({
      container: '#modules_version',
      attributeName: 'modules_version',
      autoHideContainer: false,
      limit: 100,
      operator: 'or',
      templates: {
        header: getHeader("Versions dels moduls")
      }
    })
  )

  search.start();
}

function getTemplate(templateName) {
  return document.querySelector('#' + templateName + '-template').innerHTML;
}

function getHeader(title) {
  return '<h3>' + title + '</h3>';
}
