if(!process.env.ALGOLIA_API_KEY){
	console.error("No API KEY defined");
	process.exit(0);
}

var indexer = require("markdown2json").Indexer;
var fs = require("fs");
var request = require('request');

var algoliasearch = require('algoliasearch');
var client = algoliasearch('SQZ0PDH35B', process.env.ALGOLIA_API_KEY);
var algolia = client.initIndex('prod_ARQUITECTURA');

algolia.setSettings({
	'removeStopWords':[true,'ca']
});

var _indexDir = "../../public/"; //read index from and write to...

var indexSetup = {
	"dir" : "../../content/",
	"index_empty_content" : false,
	"excludeIfProps" : ["enllac","no_index"],
	"excludes" : [
		"/drafts",
		"/comunicat",
		"/plataformes/dadesref/json",
		"/plataformes/dadesref/entitats"
	]
}

indexer = new indexer(indexSetup);

if (!fs.existsSync(_indexDir)){
    fs.mkdirSync(_indexDir);
}

//gets current index
request('https://canigo.ctti.gencat.cat/index.json', function (error, response, body) {
	if(fs.existsSync(_indexDir+"index.json")){
		fs.unlinkSync(_indexDir+"index.json");
	}
	if (!error && response.statusCode == 200) {
		fs.writeFileSync(_indexDir+"index.json", body);
	}else{
		console.log("error retrieving index.json");
	}
	runIndex();
});

function runIndex(){
	indexer.run().then(

		function(_newIdx){

			//comment or uncomment next two lines for "delta" indexing or full indexing. Uncomment for full indexing
			//refreshIndex(_newIdx);
			//return;	

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

				//---------------------------
				// comment when you need only "delta"
				
				_readedIndex = {}; 
				
				//---------------------------

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

		// Iterate 500 by 500 and save
		const chunkSize = 500;
		for (let i = 0; i < _index.length; i += chunkSize) {
			const chunk = _index.slice(i, i + chunkSize);
			algolia.saveObjects(chunk, function(err, content) {
				if (!err) {
					console.log('success indexing chunk');
				} else {
					console.log('Error' + err);
				}
			});
		}		
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
