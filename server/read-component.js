const path = require('path');
const fs = require('fs');
const util = require('./util.js');
var componentsPath = util.componentsPath;
var componentsData = {};

function exists(path){
	return fs.existsSync(path) || fs.existsSync(path);
}
function isDir(path){
	return exists(path) && fs.statSync(path).isDirectory();
}
module.exports = () => {
	var dirNames = fs.readdirSync(path.join(__dirname, componentsPath)),
        jsPath = 'static/js/_preview.js';
	dirNames.forEach( dirName => {
		let componentPath = './' + path.join(componentsPath, dirName),
			absolutePath = path.join(__dirname, componentPath);
		if(!isDir(absolutePath)) {
			return false;
		}
		// 读取配置文件 index.js
		let _tmp = require( componentPath );

		if (_tmp.entry && _tmp.tag && !componentsData[_tmp.tag]) {
		    // TODO: 需要判断入口文件是否存在
			_tmp.componentPath ='./' + path.join(componentsPath, dirName, _tmp.entry);
			_tmp.requirePath ='../../' + path.join(componentsPath, dirName, _tmp.entry);
                //path.relative(componentPath, path.join(componentPath, _tmp.entry));
            console.log(_tmp.componentPath)
            if (fs.existsSync(path.join(__dirname, _tmp.componentPath))) {
                componentsData[_tmp.tag] = _tmp;
            }
        }
    });
    // componentsData
	console.log('生成预览preview.js')
    // 生成预览通用的js
    fs.writeFileSync(path.join(__dirname, jsPath), util.appJs(componentsData));

    console.log('end -> 生成预览preview.js')
    console.log('使用webpack打包生成preview.js')
    var webpack = require('webpack')
    var config = require('./webpack.project.conf')
    // config.entry.dist = path.join(__dirname , './static/js/_preview.js');
    // config.output.path = path.join(__dirname , './static/js/');
    webpack(config,  (e) => {
        console.log('end -> 打包preview.js成功')
    })
	return componentsData;
};
