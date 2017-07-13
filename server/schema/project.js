// schema 模式  == 数据库表结构
var mongoose = require("mongoose")

var ProjectSchema = mongoose.Schema({
	projectName: String,
	title: String,
    description: String,
	userId: Number,
	renderData: Array,
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
})

ProjectSchema.pre('save', function(next) {
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	} else {
		this.meta.updateAt = Date.now();
	}
	next();
})

ProjectSchema.statics = {
	fetch: function(cb) {
		return this.find({}).sort('meta.updateAt').then(cb)
	},
	findById: function(id) {
		return this.findOne({_id: id})
	},
	findByUserId: function(userId) {
		return this.find({userId: userId}).sort({'meta.updateAt': -1})
	},
	findByUidAndPath: function (uid, projectPath) {
		return this.findOne({userId: uid, projectPath: path})
	}
}
module.exports = ProjectSchema;