const fs = require('fs');
const path = require('path')

const getPath = env => {
	return (...path) => {
		if (env === 'dev') {
			return path[0]
		} else {
			return path[1]
		}
	}
}

const util = {
	componentsPath: './components',
	projectPath: './project',
	uId: 1,
	uName: 'hezhirong',

	mkdir: (dirpath) => {
		if (!fs.existsSync(dirpath)) {
	        var pathtmp,
	            dirsStep = dirpath.split(path.sep);
			dirsStep.forEach(function(dirname) {
			    if (dirname) {
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
                }
	            
	        });
	    }
	    return true; 
	},
	rmdir: function deleteFolder(path) {
	    var files = [];
	    if( fs.existsSync(path) ) {
	        files = fs.readdirSync(path);
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
	},
	appJs: (componentsData, type = "dev") => {
		let get = getPath(type);
		let pluginPath = get('../js/develop-plugs.js', '../../../static/js/product-plugs.js');
		const importComponent = () => {
			let str = '';
			str += `Vue.component("App", require('${get("../components/app/index.dev.vue", "../../../static/components/app/index.product.vue")}'))\n`;
			Object.keys(componentsData).forEach( tag => {
				// ../../components/hello/hello.vue
				str += `Vue.component('${tag}', require('${get(componentsData[tag].requirePath, path.join('../../../', componentsData[tag].componentPath))}'))\n`
			});
			console.log(str)
			return str;
		};
		// import App from './views/preview/index.vue'
		// import 'font-awesome/css/font-awesome.min.css'
		return `
			/* 自动生成附加所有自定义组件 */

			import babelpolyfill from 'babel-polyfill'
			import '${get("../scss/common.scss", "../../../static/scss/common.scss")}'
			import plugins from '${pluginPath}'
			import Vue from 'vue'

			Vue.use(plugins);
			/* components */
			${importComponent()}
			/* end components */
			new Vue({
			render: h => h('App')
			}).$mount('#app')`
	}

}
module.exports = util