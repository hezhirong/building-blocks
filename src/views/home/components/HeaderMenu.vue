<template>
	<header>
		<h1 class="sys-name">
			积木系统
		</h1>
		<div class="header-nav">
			<el-menu mode="horizontal" theme="dark" @select="showCreateProject">
				<el-submenu index="1">
				    <template slot="title">文件</template>
				    <el-menu-item index="createProject">新建项目</el-menu-item>
				</el-submenu>
		    </el-menu>	
	    </div>
	    <el-dialog size="tiny" title="创建项目" v-model="createProjectFormShow">
			<el-form :model="projectForm" :rules="projectFormRules" ref="projectForm">
				<el-form-item label="项目名称" prop="projectName">
					<el-input v-model="projectForm.projectName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="目录名称" prop="dirName">
					<el-input v-model="projectForm.dirName" auto-complete="off" placeholder="请输入英文"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="createProjectFormShow = false">取 消</el-button>
				<el-button type="primary" @click="createProject">确 定</el-button>
			</div>
		</el-dialog>
	</header>
</template>
<script>
	const validateFileName = (rule, value, callback) => {
		let reg = /^[a-zA-Z_]+$/
		if (reg.test(value)) {
			callback()
		} else {
			callback(new Error('目录名称必须为英文'))
		}
	}
	export default {
		data() {
			return {
				createProjectFormShow: false,
				projectForm: {
					projectName: '',
					dirName: ''
				},
				projectFormRules: {
					projectName: [
			            { required: true, message: '请输入项目名称', trigger: 'blur' }
		          	],
		          	dirName: [
			            { required: true, message: '请输入目录名称', trigger: 'blur' },
			            { validator: validateFileName, trigger: 'blur'}
		          	],
				}
			}
		},
		methods: {
			showCreateProject() {
				this.createProjectFormShow = true;
				this.projectForm.projectName = '';
				this.projectForm.dirName = '';
			},
			createProject() {
				this.$refs['projectForm'].validate( valid => {
					if (!valid) {
						return false;
					}
					this.$emit('change', 'createProject', this.projectForm)
					this.createProjectFormShow = false;
				})
			},
			menuItemClick(type) {
				this.$emit('change', type)
			}
		}
	}
</script>
