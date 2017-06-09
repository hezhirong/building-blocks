const path = require('path');
const fs = require('fs');
const util = require('./util.js');
var componentsPath = util.componentsPath;
var componentsData = {};

module.exports = () => {
	var dirNames = fs.readdirSync(path.join(__dirname, componentsPath));
	dirNames.forEach( dirName => {
		let componentPath = './' + path.join(componentsPath, dirName),
			// 读取配置文件 index.js
			_tmp = require( componentPath );
		if (_tmp.entry && _tmp.tag && !componentsData[_tmp.tag]) {
		    // TODO: 需要判断入口文件是否存在
			_tmp.componentPath ='./' + path.join(componentsPath, dirName, _tmp.entry);
                //path.relative(componentPath, path.join(componentPath, _tmp.entry));
            console.log(_tmp.componentPath)
            if (fs.existsSync(path.join(__dirname, _tmp.componentPath))) {
                componentsData[_tmp.tag] = _tmp;
            }
        }
    });
	console.log(componentsData)
	return componentsData;
};
