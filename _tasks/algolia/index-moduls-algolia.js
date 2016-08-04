var fs = require("fs")
var algoliasearch = require('algoliasearch');

var client = algoliasearch('EWLW9DD0B6', process.env.ALGOLIA_API_KEY);
var algolia = client.initIndex('moduls-canigo');

data = readFile("./data/canigoAppsInfo.json");
var _index = processData(JSON.parse(data));
saveAlgolia(_index);

function processData(data){
    var packageNames = [];
    var aplicacio = {};
    var _versions;
    var _major;
    var _minor;
    var _matches;
    var _pos;

    for(var i=0,z=data.ambits.length;i<z;i++){
      if(!data.ambits[i].codisDialeg){continue;}

      for(var x=0,y=data.ambits[i].codisDialeg.length;x<y;x++){
      
        if(!data.ambits[i].codisDialeg[x].appsInfo){continue;}
      
        for(var w=0,q=data.ambits[i].codisDialeg[x].appsInfo.length;w<q;w++){

          _versions = processVersion(data.ambits[i].codisDialeg[x].appsInfo[w].versioCanigo);
          
          _major = _versions;
          if(_versions instanceof Array){
            _major = _versions[_versions.length-1];
          }

          _minor = _major.slice(1);
          _major = _major.slice(0,1);

          if(_minor.indexOf(".")>-1){
            _matches = _minor.match(/\./g);
            switch(_matches.length){
              case 1:
                _pos = _minor.length;
                break;
              case 2:
                _pos = _minor.lastIndexOf(".");
                break;
              case 3:
                _pos = _minor.indexOf(".", 1);
                _pos = _minor.indexOf(".",_pos);
            }
            _minor = _minor.slice(_minor.indexOf("."), _pos);
          }

          aplicacio = {
            'codi' : data.ambits[i].codisDialeg[x].codi,
            'nom' : data.ambits[i].codisDialeg[x].appsInfo[w].nomApp,
            'major' : _major,
            'minor' : _major + _minor,
            'rev' : _versions,
            'modules' : [],
            'modules_version' : []
          };
          
          if(!data.ambits[i].codisDialeg[x].appsInfo[w].modulsInfo){continue;}

          for(var s=0,t=data.ambits[i].codisDialeg[x].appsInfo[w].modulsInfo.length;s<t;s++){
            aplicacio.modules.push(data.ambits[i].codisDialeg[x].appsInfo[w].modulsInfo[s].nomModul);
            aplicacio.modules_version.push(data.ambits[i].codisDialeg[x].appsInfo[w].modulsInfo[s].nomModul+"_"+processVersion(data.ambits[i].codisDialeg[x].appsInfo[w].modulsInfo[s].versioModul));
          }
          packageNames.push(aplicacio);
        }
      }


    }

    return packageNames;

}


/* processa versió*/
function processVersion(_version){
  _version = _version.replace(/\)/g,"]");
  if(_version.indexOf("[")>-1){
    _version = _version.replace("[","[\"")
                       .replace(",","\",\"")
                       .replace("]","\"]")
    try{
      _version = JSON.parse(_version);
    }catch(e){
      //...
    }
  }
  return _version;
}

/* Reads file sync  */
function readFile(file, data){
  try{
    return fs.readFileSync(file).toString();
  }catch(e){
    return null;
  }
}

/* saves data to algolia */
function saveAlgolia(idx){
  algolia.clearIndex(function(err) {
    algolia.addObjects(idx, function(err, content) {
      if(err===null && idx.length>0){
        console.log("modules published!");
      }else if(idx.length===0){
        console.log("nothing to publish!");
      }else{
        console.log(err);
      } 
    }); 
  }); 
}