google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(init);

var converter = new showdown.Converter();
converter.setOption('tables', true);

var _majors_arr, 
    _majors_arr_copy,
    _minors_arr, 
    _minors_arr_copy,
    _modules_arr, 
    _modules_arr_copy
; 

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
    urlSync: true
  });

  search.on('render', function(){
    drawCharts();
    initArrays();
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
      hitsPerPage: 20,
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
      },
      transformData : {
        item : function(obj){
          _majors_arr_copy.push([obj.name, obj.count]);
          if(obj.isRefined){
            _majors_arr.push([obj.name, obj.count]);
          }
          return obj;
        }
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
      },
      transformData : {
        item : function(obj){
          _minors_arr_copy.push([obj.name, obj.count]);
          if(obj.isRefined){
            _minors_arr.push([obj.name, obj.count]);
          }
          return obj;
        }
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
      },
      transformData : {
        item : function(obj){
          _modules_arr_copy.push([obj.name, obj.count]);
          if(obj.isRefined){
            _modules_arr.push([obj.name, obj.count]);
          }
          return obj;
        }
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

function initArrays(){
    _majors_arr = [];
    _majors_arr_copy = [];
    _minors_arr = [];
    _minors_arr_copy = [];
    _modules_arr = [];
    _modules_arr_copy = [];
}

function init(){
  initArrays();
  search.start();
}

function getTemplate(templateName) {
  return document.querySelector('#' + templateName + '-template').innerHTML;
}

function getHeader(title) {
  return '<h3>' + title + '</h3>';
}

/* draw charts */
function draw(rows_filtered, rows_full, dom_id, title, width, height, title_col_1){
  var _chart = new google.visualization.DataTable();
  _chart.addColumn('string', title_col_1);
  _chart.addColumn('number', 'Aplicacions');

  if(rows_filtered.length===0){
    rows_filtered = rows_full; 
  }
  _chart.addRows(rows_filtered);

  var pie_chart = new google.visualization.PieChart(document.getElementById(dom_id));
  pie_chart.draw(_chart, {'title':title, 'width': width, 'height': height});

}


function drawCharts(){

  draw(_majors_arr, _majors_arr_copy, "chart_majors", "Aplicacions per versió major de Canigó", 400, 400, "Versió");
  draw(_minors_arr, _minors_arr_copy, "chart_minors", "Aplicacions per versió menor de Canigó", 400, 400, "Versió");
  draw(_modules_arr, _modules_arr_copy, "chart_moduls", "Mòduls Canigó per versió", 400, 400, "Mòduls");

}