var fs = require("fs")
var algoliasearch = require('algoliasearch');

var client = algoliasearch('SQZ0PDH35B', process.env.ALGOLIA_API_KEY);
var algolia = client.initIndex('prod_MODULS-CANIGO-V2');

data = readFile("./data/canigoAppsInfoV3.json");

console.log('Processing JSON data ...');
var _index = processData(JSON.parse(data));
console.log('... data processed');

//console.log('data: ' + JSON.stringify(_index));

console.log('Saving objects in Algolia index ...');
saveAlgolia(_index);

console.log('... objects saved');

function processData(data){
    var packageNames = [];
    var aplicacio = {};
    var _versions;
    var _major;
    var _minor;
    var _matches;
    var _pos;

    for(var i=0,z=data.apps.length;i<z;i++){
      if(!data.apps[i].repo){continue;}

        for(var w=0,q=data.apps[i].appsInfo.length;w<q;w++){
          _versions = processVersion(data.apps[i].appsInfo[w].versioCanigo);

          _major = _versions;
          if(_versions instanceof Array){
            _major = _versions[0];
          }

          _minor = _major.slice(1);
          _major = _major.slice(0,1);

          console.log("_major: " + _major);

          if(_major.startsWith("4") || _major.startsWith("5")) {
            _major = "3";
          }
              
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
            'codi' : data.apps[i].repo,
            'nom' : data.apps[i].appsInfo[w].nomApp,
            'major' : _major,
            'minor' : _major + _minor,
            'rev' : _versions,
            'modules' : [],
            'modules_version' : []
          };

          if(!data.apps[i].appsInfo[w].modulsInfo){
            packageNames.push(aplicacio);
            continue;
		      }

          for(var s=0,t=data.apps[i].appsInfo[w].modulsInfo.length;s<t;s++){
            aplicacio.modules.push(data.apps[i].appsInfo[w].modulsInfo[s].nomModul);
			      _versions = processVersion(data.apps[i].appsInfo[w].modulsInfo[s].versioModul);
			      _major = _versions;
            if(_versions instanceof Array){
              _major = _versions[0];
            }
            aplicacio.modules_version.push(data.apps[i].appsInfo[w].modulsInfo[s].nomModul+"_"+_major);
          }
          packageNames.push(aplicacio);
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
  algolia.clearObjects().then(() => {
    // done


    console.log('Adding...');

    algolia.saveObjects(idx,
    { autoGenerateObjectIDIfNotExist: true }).then(({ objectIDs }) => {
      console.log("modules published!");
      console.log(objectIDs);
    });

  });
  
}
