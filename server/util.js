const fs = require('fs');
const path = require('path')
const util = {
	componentsPath: './components',
	projectPath: 'project',
	uId: 1,
	uName: 'hezhirong',

	mkdir: (dirpath) => {
		if (!fs.existsSync(dirpath)) {
	        var pathtmp,
	            dirsStep = dirpath.split(path.sep);

			dirsStep.forEach(function(dirname) {
			    if (!dirname) {
                    return
                }
	            if (pathtmp) {
	                pathtmp = path.join(pathtmp, dirname);
	            }
	            else {
	                pathtmp = dirname;
	            }
	            if (!fs.existsSync(pathtmp)) {
	                if (!fs.mkdirSync(pathtmp)) {
	                    return false;
	                }
	            }
	        });
	    }
	    return true; 
	},
	rmdir: function deleteFolder(path) {
	    var files = [];
        console.log(path)
	    if( fs.existsSync(path) ) {
	        files = fs.readdirSync(path);
            console.log(files)
	        files.forEach(function(file,index){
	            var curPath = path + "/" + file;
	            if(fs.statSync(curPath).isDirectory()) { // recurse
	                deleteFolder(curPath);
	            } else { // delete file
	                fs.unlinkSync(curPath);
	            }
	        });
	        fs.rmdirSync(path);
	    }
	    return true;
	}
}
module.exports = util