var sheet2array = {

  setted : {},
    
  /*
  * Get the num order for a spreadsheet column ("A", "AB", "BC", "AAA", ...)
  *
  * @param {String} l
  * @return {Number}
  */
  getColNumber : function(l){
    if(!this.setted[l]){
      var ncols = 26;
      var col = 0;
      for(var i=l.length;i>0;i--){
        col += ((l.charCodeAt(i-1)-65)+1)*(Math.pow(ncols,(l.length-i)));
      }
      this.setted[l] = col-1;
    }
    return this.setted[l];
  },

  /*
  * Get col and row for an id like "AC12" --> AC = column, 12 = row
  *
  * @param {String} l
  * @return {Object} col, row
  */
  getColRow : function(c){
    var col="",row=0;i=0;
    while(isNaN(c.slice(i,i+1))){
      col += c.slice(i,i+1);
      i++;
    }
    row = isNaN(c.slice(i))?null:parseInt(c.slice(i));
    return {"col":col,"row":(!isNaN(row)?row-1:null)};
  },

  /*
  * Converts a JSON from Google Spreadsheet Data API into a 2 dimension Array
  *
  * @param {Object} results
  * @param {String} initCell
  * @param {String} endCell
  * @return {Array} [pos] = {value, type}
  */
  get : function(results,initCell,endCell){
    var matrix = [],cr,col,max_col=0,startCol=0,startRow=0;
    
    if(initCell){
      initCell = this.getColRow((""+initCell).toUpperCase());
      initCell.col = this.getColNumber(initCell.col);
      startCol=initCell.col;
      startRow=initCell.row;
      if(initCell.col==-1){initCell.col=null;}
    }
    if(endCell){
      endCell = this.getColRow((""+endCell).toUpperCase());
      endCell.col = this.getColNumber(endCell.col);
      if(endCell.col==-1){endCell.col=null;}
    }

    for(var i=0,z=results.feed.entry.length;i<z;i++){
      cr = this.getColRow(results.feed.entry[i].title.$t);
      col = this.getColNumber(cr.col);

      if(initCell && initCell.col!=null && initCell.col>col){continue;}
      if(endCell && endCell.col!=null && endCell.col<col){continue;}
      if(initCell && initCell.row!=null && initCell.row>cr.row){continue;}
      if(endCell && endCell.row!=null && endCell.row<cr.row){continue;}

      col=col-startCol;
      cr.row=cr.row-startRow;

      if(!matrix[cr.row]){
        matrix[cr.row]=[];
      }
      matrix[cr.row][col]={
        "value" : results.feed.entry[i].content.$t,
        "type" :  results.feed.entry[i].content.type
      }
      if(max_col<=col){
        max_col=col;
      }else{
        if(matrix[cr.row][max_col]==undefined){
          matrix[cr.row][max_col]=null;
        }
      }
    }

    for(var i=0,z=matrix.length;i<z;i++){
      if(matrix[i] && matrix[i][max_col]==undefined){
        matrix[i][max_col]=null;
      }else{
        if(!matrix[i]){
          matrix[i]=[];
          matrix[i][max_col]=null;
        }
      }
    }    
    return matrix;
  }  
}