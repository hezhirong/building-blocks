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
         <el-tab-pane label="通用样式" name="style" style="padding:0 20px">
            <el-form id="styles" :model="customStyle" ref="stylesForm" label-width="80px">
                <el-form-item v-for="(item, index) in customStyle.list" :key="index" :label="item.label">
                     <control :data="item" @change="styleChange"></control> 
                </el-form-item>
                <el-button v-if="customStyle.list.length > 0" type="primary" style="float: right" size="small" @click="syncStyle">同步</el-button>
            </el-form>
        </el-tab-pane> 
    </el-tabs>
</template>
<script>
import { PostMessage } from '../../../js/util.js'
import Control from './Control.js'

let timeout = 0;
let postProps = [];
let getStyleData = () => ({
    width: { label: 'width', propName: 'width', cType: 'text', $$value: '100%' },
    height: { label: 'height', propName: 'height', cType: 'text', $$value: 'auto' },
    padding: { label: 'padding', propName: 'padding', cType: 'text', $$value: '0' },
    border: { label: 'border', propName: 'border', cType: 'text', $$value: 'none' },
    margin: { label: 'margin', propName: 'margin', cType: 'text', $$value: '0' }
})
export default {
    data() {
        return {
            customStyle: {
                list: []
            },
            customProps: {
                list: []
            },
            componentKey: null,
            changeData: {
                prop: {},
                style: {}
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
                            key: this.componentKey, props: postProps
                        };
                        PostMessage('changeProps', data, true);
                        postProps = [];
                    }
                })
            }, 500)
        },
        styleChange(control, value) {
            this.changeData.style[control.propName] = control
        },
        syncStyle() {
            let data = {key: this.componentKey, styles: []};
            Object.keys(this.changeData.style).forEach( key => {
                data.styles.push(this.changeData.style[key]);
            })
            console.log(data)
            PostMessage('changeStyles', data, true);
        },
        handleClick(tab, event) {
            console.log(tab, event);
        }
    },
    mounted() {
        this.event.on('changeComponent', (data = {}) => {
            let propList = [],
                styleList = [],
                styleData = getStyleData();
            // console.log(data)
            if (data.props && data.key) {
                Object.keys(data.props).forEach(key => {
                    let item = data.props[key];
                    item.propName = key;
                    item.$$value = typeof item['default'] === 'function' ? item['default'] : (item['default'] || '');
                    propList.push(item)
                })
                Object.keys(data.styles).forEach(key => {
                    if (styleData[key]) {
                        styleData[key].$$value = data.styles[key]
                    }
                })
                Object.keys(styleData).forEach(key => {
                    let item = styleData[key];
                    styleList.push(item)
                })
                console.log('***** props *****', data, propList)
                this.customProps = {
                    list: propList
                }
                this.customStyle = {
                    list: styleList
                }
                Object.keys(this.changeData).forEach( key =>  this.changeData[key] = {} );
                this.componentKey = data.key;
            }
        })
        this.event.on('clearComponentProps', () => {
            this.customProps = {
                list: []
            }
            this.customStyle = {
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