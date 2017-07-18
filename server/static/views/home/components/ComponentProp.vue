<template>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="属性设置" name="prop" style="padding:0 20px">
            <el-form id="props" :model="customProps" ref="propForm" label-width="80px">
                <el-form-item v-for="(item, index) in customProps.list" :key="index" :label="item.label" :prop="'list.' + index + '.$$value'" :rules="[
                            { validator: validateControl(item), trigger: 'blur,change' }
                        ]">
                    <control :data="item" @change="valueChange"></control>
                </el-form-item>
            </el-form>
        </el-tab-pane>
        <!-- <el-tab-pane label="通用样式" name="style" style="padding:0 20px">
            <el-form-item v-for="(item, index) in customStyle" :key="index" :label="item.label">
                <control :data="item" @change="styleChange"></control>
            </el-form-item>
        </el-tab-pane> -->
    </el-tabs>
</template>
<script>
import { PostMessage } from '../../../js/util.js'
import Control from './Control.js'

let timeout = 0;
let postProps = [];
export default {
    data() {
        return {
            customStyle: [
                { label: 'width', cType: 'text', $$value: '100%' },
                { label: 'height', cType: 'text', $$value: 'auto' },
                { label: 'padding', cType: 'text', $$value: '0' },
                { label: 'border', cType: 'text', $$value: 'none' },
                { label: 'margin', cType: 'text', $$value: '0' }
            ],
            customProps: {
                key: null,
                list: []
            },
            activeName: 'prop'
        }
    },
    methods: {
        validateControl(control) {
            return (rule, value, callback) => {
                if (typeof control.validate === 'function') {
                    let error = control.validate(value);
                    if (error instanceof Error) {
                        callback(error)
                    } else {
                        callback();
                    }
                } else {
                    return callback();
                }
            };
        },
        valueChange(control, value) {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                this.$refs.propForm.validate(valid => {
                    postProps.push(control)
                    if (valid) {
                        let data = {
                            key: this.customProps.key, props: postProps
                        };
                        PostMessage('changeProps', data, true);
                        postProps = [];
                    }
                })
            }, 500)
        },
        styleChange(control, value) {
            console.log(value)
        },
        handleClick(tab, event) {
            console.log(tab, event);
        }
    },
    mounted() {
        this.event.on('changeComponent', (data = {}) => {
            let list = [];
            // console.log(data)
            if (data.props && data.key) {
                Object.keys(data.props).forEach(key => {
                    let item = data.props[key];
                    item.propName = key;
                    item.$$value = typeof item['default'] === 'function' ? item['default'] : (item['default'] || '');
                    list.push(item)
                })
                console.log('***** props *****', data, list)
                this.customProps = {
                    list,
                    key: data.key
                }
            }
        })
        this.event.on('clearComponentProps', () => {
            this.customProps = {
                list: []
            }
        })
    },
    components: {
        Control
    }
}
</script>
<style>
.el-table_1_column_2 .cell {
    padding: 0;
}
</style>