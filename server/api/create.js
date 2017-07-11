const Project = require('../modules/project.js');
const util = require('../util');

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
	'POST /updateComponent': async function (data) {
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