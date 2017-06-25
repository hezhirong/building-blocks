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
	</header>
</template>
<script>
	export default {
		data() {
			return {
				createProjectFormShow: false,
				projectForm: {
					projectName: '',
					description: '',
					title: ''
				},
				projectFormRules: {
					projectName: [
			            { required: true, message: '请输入目录名称', trigger: 'blur' }
		          	]
				}
			}
		},
		methods: {
			showCreateProject() {
				this.createProjectFormShow = true;
				this.projectForm.projectName = '';
				this.projectForm.description = '';
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
