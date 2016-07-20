var converter = new showdown.Converter();


/* global instantsearch */
app({
  appId: 'EWLW9DD0B6',
  apiKey: 'fb84eb986e0a351c3f12f948e3ee99b8',
  indexName: 'arquitectura'
});

function app(opts) {
  var search = instantsearch({
    appId: opts.appId,
    apiKey: opts.apiKey,
    indexName: opts.indexName,
    urlSync: true,
    searchFunction : function(helper) {
      if (helper.state.query === '') {
        return;
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
      },
      autoHideContainer : true
    })

  );

  search.addWidget(
    instantsearch.widgets.refinementList({
      container: '#tags',
      attributeName: 'section',
      autoHideContainer: true,
      limit: 10,
      operator: 'or',
      templates: {
        header: getHeader()
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
