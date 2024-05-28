google.load("visualization", "1", {packages:["corechart"]});

var orders = {
  setted : {},
  get:function(l){
    var letters = ["A","B","C","D","E","F","G","H"]
    if(!this.setted[l]){
      for(var i=0,z=letters.length;i<z;i++){
        if(letters[i]==l){
          this.setted[l]=i;
          break;
        }
      }
    }
    return parseInt(this.setted[l]);
  }
}

function getCellStyle(r,c,m){
  var cellstyle="";
  if(r>4){
    cellstyle = "border:1px solid #ddd;";
  } 
  if(r==5){
    cellstyle += "font-weight:bold;color:#fff;background-color:#9E1B11;";
  }
  if(r>4 && m[r][0]!=undefined){
    cellstyle += "font-weight:bold;";
  }
  if(r>5 && m[r][0]!=undefined){
    cellstyle += "background-color:#8D9F82;";
  }

  if(c==0){
      cellstyle += "width:50%;";
  }else{
      cellstyle += "width:25%;";
  }
  return " style='" + cellstyle + "'";
}

function processSheetJSON(results,tableId, chartId, callback){
    $("<table style='width:100%; margin-bottom:1em;'><tr><td style='width:60%;border:0px!important;'><table id='"+tableId+"' style='width:100%;border-collapse:collapse;'></table></td><td style='width:40%;border:0px!important'><div id='"+chartId+"' style='width:100%;height:300px;'></div></td></tr></table>").appendTo(".contingut .container");

    var matrix = [],col,row;

    for(var i=0,z=results.feed.entry.length;i<z;i++){
      col = results.feed.entry[i].title.$t.slice(0,1);
      col = orders.get(col);
      row = parseInt(results.feed.entry[i].title.$t.slice(1));
      if(!matrix[row]){
        matrix[row]=[];
      }
      matrix[row][col]=results.feed.entry[i].content.$t;
    }

    var browsers=[], browsers_sum=0;
    browsers.push(["",""]);

    for(var i=0;i<matrix.length;i++){
      if(matrix[i] && matrix[i][0]!=undefined && i>5){
        browsers.push([matrix[i][0],parseFloat(matrix[i][2].replace(",","."))]);
        browsers_sum += parseFloat(matrix[i][2].replace(",","."));
      }
      $("<tr></tr>").appendTo("#"+tableId);
      if(matrix[i]){
        for(var k=0,y=matrix[i].length;k<y;k++){
          $("<td "+getCellStyle(i,k,matrix)+">"+(matrix[i][k]?matrix[i][k]:"")+"</td>").appendTo("#"+tableId+" tr:last");
        }
      }
    }

    var data = google.visualization.arrayToDataTable(browsers);
    var chart = new google.visualization.PieChart(document.getElementById(chartId));
    chart.draw(data);

    if(callback){
      callback();
    }
}

//browsers
$(function() {
  $.getJSON("https://spreadsheets.google.com/feeds/cells/0AqYl2ZBfAp4ZdEljUVVJcDJxdDBoTGExVnNaMGY5ZVE/od6/public/basic?alt=json-in-script&callback=?", null, function(results){
    processSheetJSON(results,"browsers1", "chart1", function(){

      //mobile browsers
      $.getJSON("https://spreadsheets.google.com/feeds/cells/0AqYl2ZBfAp4ZdFFTUGpPNUh5RklpQkRNRFRLWFpQNEE/od6/public/basic?alt=json-in-script&callback=?", null, function(results){
         processSheetJSON(results,"browsers2", "chart2");
      });

    });
  });
});
