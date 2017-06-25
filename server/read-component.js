const path = require('path');
const fs = require('fs');
const util = require('./util.js');
var componentsPath = util.componentsPath;
var componentsData = {};

const appJs = componentsData => {
    let path = '../js/develop-plugs.js'
    const importComponent = () => {
        let str = '';
        str += 'Vue.component("App", require("../components/app/index.vue"))\n';
        // TODO: 没实现当组件添加删除后的逻辑
        Object.keys(componentsData).forEach( tag => {
            str += `Vue.component('${tag}', require('${componentsData[tag].requirePath}'))\n`
        });
        console.log(str)
        return str;
    };
    // import App from './views/preview/index.vue'
    // import 'font-awesome/css/font-awesome.min.css'
    return `
/* 自动生成附加所有自定义组件 */

import babelpolyfill from 'babel-polyfill'
import '../scss/common.scss'
import plugins from '${path}'
import Vue from 'vue'

Vue.use(plugins);
/* components */
${importComponent()}
/* end components */
new Vue({
  render: h => h('App')
}).$mount('#app')`
}


module.exports = () => {
	var dirNames = fs.readdirSync(path.join(__dirname, componentsPath)),
        jsPath = 'static/js/_preview.js';
	dirNames.forEach( dirName => {
		let componentPath = './' + path.join(componentsPath, dirName),
			// 读取配置文件 index.js
			_tmp = require( componentPath );

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
    fs.writeFileSync(path.join(__dirname, jsPath), appJs(componentsData));

    console.log('end -> 生成预览preview.js')
    console.log('使用webpack打包生成preview.js')
    var webpack = require('webpack')
    var config = require('./webpack.project.conf')
    config.entry.dist = path.join(__dirname , './static/js/_preview.js');
    config.output.path = path.join(__dirname , './static/js/');
    webpack(config,  (e) => {
        console.log('end -> 打包preview.js成功')
    })
	return componentsData;
};
