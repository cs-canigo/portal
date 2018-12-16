google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(init);

var search, results = {}, facet_data={};

/* global instantsearch */
app({
  appId: 'SQZ0PDH35B',
  apiKey: '142be7e9b4f045f95ff9b0761c5cddc0',
  indexName: 'prod_MODULS-CANIGO'
});

function app(opts) {
  search = instantsearch({
    appId: opts.appId,
    apiKey: opts.apiKey,
    indexName: opts.indexName,
    urlSync: true,
    searchFunction : function(helper) {
      results = helper.search();
    }
  });

  search.on('render', function(content){
    fillFacetData();
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
      hitsPerPage: 20,
      templates: {
        item: getTemplate('hit'),
        empty: getTemplate('no-results')
      },
      transformData : function(item){
        if(item.modules_version){
          item.modules_version = item.modules_version.join(", ");
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
      container: '#major',
      attributeName: 'major',
      autoHideContainer: false,
      limit: 10,
      operator: 'or',
      templates: {
        header: getHeader("Versió major")
      }/*,
      transformData : {
        item : function(obj){
          _majors_arr_copy.push([obj.name, obj.count]);
          if(obj.isRefined){
            _majors_arr.push([obj.name, obj.count]);
          }
          return obj;
        }
      }*/
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
function draw(rows, dom_id, title, width, height, title_col_1){
  var _chart = new google.visualization.DataTable();
  _chart.addColumn('string', title_col_1);
  _chart.addColumn('number', 'Aplicacions');

  _chart.addRows(rows);

  var pie_chart = new google.visualization.PieChart(document.getElementById(dom_id));
  pie_chart.draw(_chart, {'title':title, 'width': width, 'height': height});

}

function drawCharts(){
  draw(facet_data.major, "chart_majors", "Aplicacions per versió major de Canigó", 400, 400, "Versió");
  draw(facet_data.minor, "chart_minors", "Aplicacions per versió menor de Canigó", 400, 400, "Versió");
  draw(facet_data.modules, "chart_moduls", "Mòduls Canigó per versió", 400, 400, "Mòduls");
}

function fillFacetData(){
  var charts_data = {};
  var deletes = {};
  var refined = {};

  for(var i=0,z=results.lastResults.disjunctiveFacets.length;i<z;i++){
    charts_data[results.lastResults.disjunctiveFacets[i].name] = results.lastResults.disjunctiveFacets[i].data;
    if(results.state.disjunctiveFacetsRefinements[results.lastResults.disjunctiveFacets[i].name]){
      refined[results.lastResults.disjunctiveFacets[i].name] = results.state.disjunctiveFacetsRefinements[results.lastResults.disjunctiveFacets[i].name];
    }
  }

  for(var key in refined){
    for(var i=0,z=refined[key].length;i<z;i++){
      deletes[key]=[];
      for(var clau in charts_data[key]){
        if(refined[key].indexOf(clau)===-1){
          deletes[key].push(clau);
        }
      }
    }
  }

  for(var k in deletes){
    for(var i=0,z=deletes[k].length;i<z;i++){
      delete charts_data[k][deletes[k][i]];
    }
  }

  for(var k in charts_data){
    facet_data[k] = [];
    for(var x in charts_data[k]){
      facet_data[k].push([x, charts_data[k][x]])
    }
  }
}
