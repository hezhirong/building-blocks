const Project = require('../modules/project.js');
const path = require('path');
const util = require('../util');
const fs = require('fs');
const shell = require('shelljs')
/*
const indexHtml = (jsPath) => `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>预览页面</title>
</head>
<body>
	<div id="app"></div>
	<script src="${jsPath}"></script>
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
            str += `Vue.renderComponent('${tag}', require('${componentsData[tag].componentPath}'))\n\r`
        });
        console.log(str)
        return str;
    };
    return `
import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './views/preview/index.vue'
import 'font-awesome/css/font-awesome.min.css'
${importComponent()}
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
*/

const AuthApi = {
	"GET /new_project": function (data) {
		var project = new Project({
			projectName: data.projectName,
			title: data.title,
            description: data.description,
			userId: util.uId,
			renderData: []
		})
		project.save().then( doc => {
            this.success({
            	id: doc._id
			})
		}).catch( e => {
			// 保存失败删除目录
			this.error('创建项目失败');
		})
	},
	'POST /pushComponent': async function (data) {
		try {
			var id = data.id;
			delete data.id;
			let doc = await Project.update({_id: id}, {$set: {renderData: data.components}});
			this.success(doc)
		} catch (e) {
			this.error('保存失败')
		}
	}
}
module.exports = AuthApi;