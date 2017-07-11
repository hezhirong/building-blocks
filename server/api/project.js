const Project = require('../modules/project.js');
const util = require('../util');

const project = {
	'GET /findProjectForUserId': async function (data) {
		try {
			var id = data.userId;
			let doc = await Project.findByUserId(id);
			let res = doc.map( item => {
				return {
					projectName: item.projectName,
					description: item.description,
					createTime: item.meta.createAt,
					updateTime: item.meta.updateAt,
					id: item._id
				}
			})
			this.success(res)
		} catch (e) {
			this.error('查询失败')
		}
	}
}
module.exports = project;