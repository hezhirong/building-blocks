<template>
    <el-dialog title="打开项目" v-model="dialogVisible">
        <el-table v-loading="isLoading" ref="projectTable" :data="projectData" highlight-current-row @current-change="handleCurrentChange" style="width: 100%">
            <el-table-column property="createTime" label="创建日期" width="150">
                <template scope="scope">
                    {{ scope.row.createTime | date('date') }}
                </template>
            </el-table-column>
            <el-table-column property="projectName" label="项目名称" width="150">
            </el-table-column>
            <el-table-column property="description" label="项目介绍" min-width="150">
            </el-table-column>
             <el-table-column property="updateTime" label="更新时间" width="180">
                <template scope="scope">
                    {{ scope.row.updateTime | date }}
                </template>
            </el-table-column>
            <el-table-column label="操作" min-width="80">
                <template scope="scope">
                    <el-button size="small" type="danger" @click="removeProject(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="changeProject" :disabled="isDisabled">确 定</el-button>
        </div>
        <input type="text" :value="dialogVisible" style='display:none;'>
    </el-dialog>
</template>
<script>
import {sStorage, Event, ENUM} from '../../../js/util.js'
export default {
    props: ['data', 'value'],
    data() {
        return {
            dialogVisible: this.value,
            projectListShow: false,
            isLoading: false,
            isDisabled: true,
            currentRow: null,
            projectData: [],
            selectedProject: sStorage.get(ENUM.ss.PRODUCT, true) || {}
        }
    },
    watch: {
        value(v) {
            if (v === true) {
                this.currentRow = null;
                this.isDisabled = true;
                this.findProjec();
            }
            this.dialogVisible = this.value;
        },
        dialogVisible(v) {
            this.$emit('input', v)
        }
    },
    methods: {
		handleCurrentChange(val) {
			this.currentRow = val;
            if (this.currentRow !== null) {
                this.isDisabled = false;
            }
        },
        async removeProject(row) {
            if (this.projectIsOpen(row)) {
                return false;
            }
            try {
                let result = this.$confirm('此操作将永久删除项目, 是否继续?')
                if (result === 'confirm') {
                    this.isLoading = true;
                    let res = await this.socket.delete('/findProjectForUserId', {});
                    this.isLoading = false;
                }
            } catch(e) {
                this.isLoading = false;
            }
        },
        projectIsOpen(row, msg = "该项目已打开") {
            if (row.id === this.selectedProject.id) {
                this.$message.warning(msg);
                return true;
            }
            return false;
        },
        changeProject() {
            if (this.projectIsOpen(this.currentRow)) {
                return false;
            }
            // 触发事件
            this.event.emit('selectProject', this.currentRow);
            // 新项目清空配置属性
            this.event.emit('clearComponentProps');
            // 存入sessionstorage
            sStorage.set(ENUM.ss.PRODUCT, this.currentRow);
            
            this.selectedProject = this.currentRow;
            this.dialogVisible = false;
        },
        async findProjec() {
            try {
                this.isLoading = true;
			    let res = await this.socket.get('/findProjectForUserId');
                this.projectData = res.data;
            } catch(e) {
                this.error(e)
            }
            this.isLoading = false;
                
		}
    }
}
</script>

