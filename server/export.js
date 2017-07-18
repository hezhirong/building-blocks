const path = require('path')
const Project = require('../modules/project.js');
const util = require('../util.js');
const shell = require('shelljs');
const webpack = require('webpack')
const config = require('../webpack.project.conf')

var HtmlWebpackPlugin = require('html-webpack-plugin')
var zipFolder = require('zip-folder');

const loop = (data, id, callback, name="key") => {
	data.forEach((item, index, arr) => {
		if (item[name] === id) {
			return callback(item, index, arr);
		} else if (id === null) {
			callback(item, index, arr);
		}
		if (item.slots) {
			return loop(item.slots, id, callback, name);
		}
	});
}
const createZipFile = (projectDir, zipDir, projectName) => {
    let promise = new Promise( (resolve, reject) => {
         webpack(config,  (e) => {
            zipFolder(projectDir, zipDir, function(err) {
                if(err) {
                    reject('oh no!', err);
                } else {
                    resolve({path: zipDir, projectName: projectName})
                }
            });
        })
    });
    return promise;
}
const fileterRequireComponent = (projectData) => {
    let requiredComponent = {};
        // requireComponents = [];
    loop(projectData.renderData, null, item => {
        if (!requiredComponent[item.tag]) {
            // requireComponents.push(item);
            requiredComponent[item.tag] = item;
        }
    })
    return requiredComponent;
}
module.exports = async function(user, projectId) {
    let data = await Project.findById(projectId),
        requiredComponent = fileterRequireComponent(data);
    
    // 创建 exportDirectory/{username}/{projectname}/目录
    let projectDir = path.join(__dirname, `../exportDirectory/${user.name}/${data.projectName}`),
        zipDir = `${projectDir}.zip`,
        htmlDir = `${projectDir}/_index.html`,
        jsDir = `${projectDir}/index.js`;
    // 删除文件夹和打包zpi文件
    shell.rm('-rf', projectDir);
    shell.rm('-rf', zipDir);
    // 生成项目目录
    shell.mkdir('-p', projectDir);

    // 复制preview.html 替换data数据
    var html = shell.cat(path.join(__dirname, '../static/pages/preview.html'));
    html = html.replace('{{data|json|raw}}', JSON.stringify(data));
    // 替换页面title
    html = html.replace(/(?<=title\>).*(?=<\/title)/, data.title);
    shell.touch(htmlDir);
    shell.echo(html).to(htmlDir);
    // 生成js
    shell.touch(jsDir);
    shell.echo(util.appJs(requiredComponent, 'product')).to(jsDir);
    // 修改webpackconfig
    config.entry.app = path.join(__dirname , `../exportDirectory/${user.name}/${data.projectName}/index.js`);
    config.output.path = path.join(__dirname , `../exportDirectory/${user.name}/${data.projectName}/dist`);
    // 去除preview的配置
    config.plugins.splice(config.plugins.length - 1, 1);
    // 添加index的配置
    config.plugins.push(
        new HtmlWebpackPlugin({
			filename: 'index.html',
			template: htmlDir,
			inject: true
		})
    )
    
    return createZipFile(projectDir, zipDir, data.projectName);
}