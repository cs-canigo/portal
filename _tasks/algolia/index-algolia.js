if(!process.env.ALGOLIA_API_KEY){
	console.error("No API KEY defined");
	process.exit(0);
}

var indexer = require("markdown2json").Indexer;
var fs = require("fs");
var request = require('request');

var algoliasearch = require('algoliasearch');
var client = algoliasearch('WG3M5KTTLD', process.env.ALGOLIA_API_KEY);
var algolia = client.initIndex('arquitectura');

algolia.setSettings({
	'removeStopWords':[true,'ca']
});

var _indexDir = "../../public/"; //read index from and write to...

var indexSetup = {
	"dir" : "../../content/",
	"index_empty_content" : true,
	"excludeIfProps" : ["enllac","no_index"],
	"excludes" : [
		"/drafts",
		"/comunicat"
	]
}

indexer = new indexer(indexSetup);

if (!fs.existsSync(_indexDir)){
    fs.mkdirSync(_indexDir);
}

//gets current index
request('https://raw.githubusercontent.com/cs-canigo/portal/gh-pages/index.json', function (error, response, body) {
  if (!error && response.statusCode == 200) {
	fs.writeFileSync(_indexDir+"index.json", body);
  }
  runIndex();
});

function runIndex(){

	indexer.run().then(

		function(_newIdx){

			var old = readFile(_indexDir+"index.json");

			if(!old){
				console.log("no index file");
				refreshIndex(_newIdx);
			}else{
				var _readedIndex = {};
				try{
					_readedIndex = JSON.parse(old);
				}catch(e){
					//...
				}
				var compare = compareIndexs(_readedIndex, _newIdx);
				console.log("INSERT: " + compare.index.length)
				console.log("DELETE: " + compare.del.length)

				if(compare.index.length>0){
					saveAlgolia(compare.index)
				}

				if(compare.del.length>0){
					deleteAlgolia(compare.del);
				}
			}

			if(!compare || compare.index.length>0 || compare.del.length>0){
				saveIndexLocal(_indexDir+"index.json", _newIdx);
			}
		}

	).catch(
		function(err){
			console.log(err);
		}
	);
}

/* refresh index by cleaning and indexing all*/
function refreshIndex(_index){
	algolia.deleteByQuery("", function(err) {
		if (!err) {
			console.log('success deleting all');
		}
		algolia.saveObjects(_index, function(err, content) {
			if (!err) {
				console.log('success indexing all');
			}
			console.log(content);
		});
	});
}

/* Compare new index with oldest and get files to insert and to delete */
function compareIndexs(_oldIdx, _newIdx){
	var compareObj;
	var toIndex = [];
	var toDelete = [];

	for(var i=0,z=_newIdx.length;i<z;i++){
		compareObj = _newIdx[i];
		delete compareObj.indexTime;
		if((JSON.stringify(_oldIdx[compareObj.objectID])==JSON.stringify(compareObj))===false){
			toIndex.push(_newIdx[i]);
		}
		if(_oldIdx[compareObj.objectID]){
			_oldIdx[compareObj.objectID].processed = true;
		}
	}

	for(var k in _oldIdx){
		if(!_oldIdx[k].processed){
			toDelete.push(_oldIdx[k].path);
		}		
	}

	return {index:toIndex, del:toDelete};
}

/* Reads file sync  */
function readFile(file, data){
	try{
		return fs.readFileSync(file);
	}catch(e){
		return null;
	}
}

/* Saves index locally */
function saveIndexLocal(file, data){
	console.log("saving new index locally");
	var compareIdx = {}; 
	for(var i=0,z=data.length;i<z;i++){
		delete data[i].indexTime
		compareIdx[data[i].objectID] = data[i];
	}
	fs.writeFileSync(file, JSON.stringify(compareIdx));
}

/* Saves index to Algolia */
function saveAlgolia(idx){
	algolia.saveObjects(idx, function(err, content) {
  		if(err===null && idx.length>0){
			console.log("new content published!");
		}else if(idx.length===0){
			console.log("nothing to publish!");
		}else{
			console.log(err);
		}	
	});	
}

/* Delete files from algolia */
function deleteAlgolia(idx){
	idx.map(function(_file){
		algolia.deleteObject(new Buffer(_file).toString('base64'), function(err) {
			if (!err) {
				console.log(_file + ' deleted');
			}
		});			
	});			
}
