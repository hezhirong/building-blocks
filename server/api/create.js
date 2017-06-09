const Project = require('../modules/project.js');
const path = require('path');
const util = require('../util');
const fs = require('fs');
const shell = require('shelljs')

const indexHtml = () => `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>预览页面</title>
</head>
<body>
	<div id="app"></div>
	<script src="./static/js/app.js"></script>
</body>
</html>`;
const appJs = componentsData => {
    componentsData = { 'za-hello':
        { name: 'hello',
            icon: 'xx.png',
            entry: 'hello.vue',
            tag: 'za-hello',
            props: { hello: [Object] },
            componentPath: './components/hello/hello.vue' } }
    const importComponent = () => {
        let str = '';
        // TODO: 没实现当组件添加删除后的逻辑
        Object.keys(componentsData).forEach( tag => {
            str += `Vue.component('${tag}', require('${componentsData[tag].componentPath}'))\n\r`
        });
        console.log(str)
        return str;
    };
    return `
import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './views/preview/index.vue'
import 'font-awesome/css/font-awesome.min.css'
/* components */
${importComponent()}
/* end components */
new Vue({
  render: h => h(App)
}).$mount('#app')`
}

const createProject = projectPath => {
    if (fs.existsSync(projectPath)) {
        return {
            result: false,
            msg: '项目已存在'
        }
    }
    console.log(projectPath)
    // 创建目录
    const isCreate = util.mkdir(projectPath);
    if (!isCreate) {
        return {
            result: false,
            msg: '创建项目失败'
        }
    }
    // 创建index.html  app.js
    try {
        fs.writeFileSync(projectPath + '/index.html', indexHtml());
        fs.writeFileSync(projectPath + '/app.js', appJs());
    } catch(e) {
        return {
            result: false,
            msg: '创建项目失败'
        }
    }
    return {
        result: true
    }
}

const AuthApi = {
	"GET /new_project": function (data) {
		// 项目路径 project/{usename}/{projectDirName}
		const projectPath = './' + path.join(util.projectPath, util.uName, data.dirName);
        // shell.mkdir('-p', projectPath)
        // shell.cd(projectPath)
        // shell.echo(indexHtml()).to('index.html')
        // shell.echo(appJs()).to('app.js')
        //
        //     return false;
        let {result, msg} = createProject(projectPath);
		if (!result) {
			this.error(msg);
            return false;
		}
		var project = new Project({
			projectName: data.projectName,
			userId: util.uId,
			projectPath: projectPath,
            componentsData: {},
			renderData: []
		})
		project.save().then( doc => {
			this.success(doc)
		}).catch( e => {
			// 保存失败删除目录
            console.log(projectPath)
			util.rmdir(projectPath);
			this.error('创建目录失败2');
		})
	}
}
module.exports = AuthApi;