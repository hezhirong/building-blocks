<template>
	<header>
		<h1 class="sys-name">
			积木系统
		</h1>
		<div class="header-nav">
			<ul>
				<li @click="createProject">
					<div>新建项目</div>
				</li>
				<li @click="openProjectList">
					<div>打开项目</div>
				</li>
				<li v-if="projectId">
					<span v-download="exportUrl">导出</span>
				</li>
			</ul>
		</div>
		<el-dialog size="tiny" title="创建项目" v-model="createProjectFormShow">
			<el-form :model="projectForm" :rules="projectFormRules" ref="projectForm">
				<el-form-item label="项目名称" prop="projectName">
					<el-input v-model="projectForm.projectName" auto-complete="off" placeholder="请输入项目名称"></el-input>
				</el-form-item>
				<el-form-item label="项目介绍" prop="dirName">
					<el-input v-model="projectForm.description" type="textarea" :maxlength="150" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="网站标题" prop="projectName">
					<el-input v-model="projectForm.title" auto-complete="off" placeholder="请输入网站标题"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="createProjectFormShow = false">取 消</el-button>
				<el-button type="primary" @click="createProject">确 定</el-button>
			</div>
		</el-dialog>
		<project-list v-model="projectListShow"></project-list>
	</header>
</template>
<style lang="scss">
	.header-nav ul {
		display: flex;
		align-items: center;
		background: #324157;
		color: #bfcbd9;
		position: relative;
		font-size: 14px;
		margin: 0;
		padding: 0;
		list-style: none;
    	cursor: pointer;
		li {
			padding: 0 20px;
			height: 60px;
			line-height: 60px;	
			&:hover {
					border-bottom: 5px solid #20a0ff;
			}
		}
		a {
			color: inherit;
			text-decoration: none;
		}
		.right {
			position: absolute;
			right: 0;
		}
	}
</style>
<script>
import ProjectList from './ProductList.vue'
import {Event, sStorage} from '../../../js/util'
export default {
	data() {
		let project = sStorage.get('project', true);
		let user = sStorage.get('token', true);
		return {
			createProjectFormShow: false,
			projectListShow: false,
			projectId: project && project.id,
			token: user.token,
			activeIndex: 0,
			projectForm: {
				projectName: '',
				description: '',
				title: ''
			},
			projectFormRules: {
				projectName: [
					{ required: true, message: '请输入项目名称', trigger: 'blur' }
				]
			}
		}
	},
	computed: {
		exportUrl() {
			return `/export/${this.projectId}?token=${this.token}`
		}
	},
	methods: {
		createProject() {
			this.createProjectFormShow = true;
			this.projectForm.projectName = '';
			this.projectForm.description = '';
			this.$refs['projectForm'].validate(valid => {
				if (!valid) {
					return false;
				}
				this.$emit('change', 'createProject', this.projectForm)
				this.createProjectFormShow = false;
			})
		},
		openProjectList() {
			this.projectListShow = true;
		},
		menuItemClick(type) {
			this.$emit('change', type)
		}
	},
	mounted() {
		this.event.on('selectProject', project => {
			if (project.id) {
				this.projectId = project.id;
			}
		});
	},
	components: {
		ProjectList
	}
}
</script>
