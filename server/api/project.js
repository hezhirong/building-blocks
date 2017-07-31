const Project = require("../modules/project.js");
const util = require("../util");

const project = {
    // 创建新项目
    "GET /new_project": function(data) {
        var project = new Project({
            projectName: data.projectName,
            title: data.title,
            description: data.description,
            userId: util.uId,
            renderData: []
        });
        project
            .save()
            .then(doc => {
                this.success({
                    projectName: doc.projectName,
                    description: doc.description,
                    createTime: doc.meta.createAt,
                    updateTime: doc.meta.updateAt,
                    id: doc._id
                });
            })
            .catch(e => {
                // 保存失败删除目录
                this.error("创建项目失败");
            });
    },
    // 更新项目组件的数据
    "POST /updateComponent": async function(data) {
        try {
            var id = data.id;
            delete data.id;
            let doc = await Project.update(
                { _id: id },
                { $set: { 
					renderData: data.components,
					"meta.updateAt": new Date()
				} }
            );
            this.success(doc);
        } catch (e) {
            this.error("保存失败");
        }
    },
    "POST /updateDialog": async function(data) {
        try {
            var id = data.id;
            delete data.id;
            let doc = await Project.update(
                { _id: id },
                { $set: { 
					dialogData: data.dialogData,
					"meta.updateAt": new Date()
				} }
            );
            this.success(doc);
        } catch (e) {
            this.error("保存失败");
        }
	},
	"DELETE /deleteProject": async function(data) {
		try {
            var id = data.id;
            delete data.id;
            let doc = await Project.remove(
                { _id: id }
            );
            this.success("删除成功");
        } catch (e) {
            this.error("删除失败");
        }
	},
    // 根据user查询项目
    "GET /findProjectForUserId": async function(data) {
        try {
            var userId = data.userData.id;
            let doc = await Project.findByUserId(userId);
            let res = doc.map(item => {
                return {
                    projectName: item.projectName,
                    description: item.description,
                    createTime: item.meta.createAt,
                    updateTime: item.meta.updateAt,
                    id: item._id
                };
            });
            this.success(res);
        } catch (e) {
            this.error("查询失败");
        }
    }
};
module.exports = project;
