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
        </el-table>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="changeProject" :disabled="isDisabled">确 定</el-button>
        </div>
        <input type="text" :value="dialogVisible" style='display:none;'>
    </el-dialog>
</template>
<script>
import {sStorage} from '../../../js/util.js'
export default {
    props: ['data', 'value'],
    data() {
        return {
            dialogVisible: this.value,
            projectListShow: false,
            isLoading: false,
            isDisabled: true,
            currentRow: null,
			projectData: []
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
        changeProject() {
            // 提供方法
            this.$emit('change', this.currentRow);
            // 触发事件
            this.event.emit('selectProject', this.currentRow);
            // 存入sessionstorage
            sStorage.set('project', this.currentRow);
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

