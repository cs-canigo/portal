google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(init);

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

var search;

/* global instantsearch */
app({
  appId: 'EWLW9DD0B6',
  apiKey: 'fb84eb986e0a351c3f12f948e3ee99b8',
  indexName: 'moduls-canigo'
});

function app(opts) {
  search = instantsearch({
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

  search.on('render', function(){
    drawCharts();
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
      hitsPerPage: 25,
      templates: {
        item: getTemplate('hit'),
        empty: getTemplate('no-results')
      },
      transformData : function(item){
        item.modules_version = item.modules_version.join(", ");
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

  //init();
}

function init(){
    search.start();
}

function getTemplate(templateName) {
  return document.querySelector('#' + templateName + '-template').innerHTML;
}

function getHeader(title) {
  return '<h3>' + title + '</h3>';
}

/* draw charts */
function drawCharts(){

  // MAJORS
  var _majors = new google.visualization.DataTable();
  _majors.addColumn('string', 'Versió');
  _majors.addColumn('number', 'Aplicacions');

  var _some_checked = ($("#major .ais-refinement-list--label input:checkbox:checked").length>0);
  $("#major .ais-refinement-list--label").each(function(item){
    if((_some_checked && $(this).children()[0].checked) || !_some_checked){
      _majors.addRow([$(this).children()[0].value, $($(this).children()[1]).text()*1]);
    }
  });

  // Set chart options
  var options = {'title':'Aplicacions per versió major de Canigó',
                 'width':400,
                 'height':400
                };

  // Instantiate and draw our chart, passing in some options.
  var chart_majors = new google.visualization.PieChart(document.getElementById('chart_majors'));
  chart_majors.draw(_majors, options);

  // MINORS
  var _minors = new google.visualization.DataTable();
  _minors.addColumn('string', 'Versió');
  _minors.addColumn('number', 'Aplicacions');

  _some_checked = ($("#minor .ais-refinement-list--label input:checkbox:checked").length>0);
  $("#minor .ais-refinement-list--label").each(function(item){
    if((_some_checked && $(this).children()[0].checked) || !_some_checked){
      _minors.addRow([$(this).children()[0].value, $($(this).children()[1]).text()*1]);
    }
  });

  // Set chart options
  var options = {'title':'Aplicacions per versió menor de Canigó',
                 'width':400,
                 'height':400
                };

  // Instantiate and draw our chart, passing in some options.
  var chart_minors = new google.visualization.PieChart(document.getElementById('chart_minors'));
  chart_minors.draw(_minors, options);

  // MINORS
  var _modules = new google.visualization.DataTable();
  _modules.addColumn('string', 'Versió');
  _modules.addColumn('number', 'Aplicacions');

  _some_checked = ($("#modules .ais-refinement-list--label input:checkbox:checked").length>0);

  $("#modules .ais-refinement-list--label").each(function(item){
    if((_some_checked && $(this).children()[0].checked) || !_some_checked){
      _modules.addRow([$(this).children()[0].value, $($(this).children()[1]).text()*1]);
    }
  });

  // Set chart options
  var options = {'title':'Mòduls',
                 'width':500,
                 'height':500
                };

  // Instantiate and draw our chart, passing in some options.
  var chart_moduls = new google.visualization.PieChart(document.getElementById('chart_moduls'));
  chart_moduls.draw(_modules, options);

}