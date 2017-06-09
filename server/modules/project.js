var mongoose = require("mongoose")

var ProjectSchema = require('../schema/project.js')
// 创建模型
var Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;