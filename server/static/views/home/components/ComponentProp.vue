<template>
    <el-tabs v-model="activeName">
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
import { PostMessage, commonComponentStyle } from '../../../js/util.js'
import Control from './Control.js'

let timeout = 0;
let postProps = [];
let styleExtend = {
    'backgroundImage': str => {
        if (str.startWith('url(')) {
            return str;
        }
        return `url(${str})`;
    }
}
const KEY = "$$value";
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
            if (styleExtend[control.propName]) {
                control[KEY] = styleExtend[control.propName](control[KEY]);
            }
            this.changeData.style[control.propName] = control
        },
        syncStyle() {
            let changeKeys = Object.keys(this.changeData.style);
            if (changeKeys.length === 0) {
                return false;
            }
            let data = {key: this.componentKey, styles: []};
            changeKeys.forEach( key => {
                data.styles.push(this.changeData.style[key]);
            })
            PostMessage('changeStyles', data, true);
        },
        initProps(data) {
            if (data.props) {
                let propList = [];
                Object.keys(data.props).forEach(key => {
                    let item = data.props[key];
                    item.propName = key;
                    if (!item.label) {
                        item.label = key;
                    }
                    item[KEY] = typeof item['default'] === 'function' ? item['default'] : (item['default'] || '');
                    propList.push(item)
                })
                this.customProps = {
                    list: propList
                }
            }
        },
        initStyles(data) {
            let styleList = [],
                styleData = commonComponentStyle();
            styleData.forEach(item => {
                item[KEY] = item['default'] || '';
                // 回写默认值
                if (data.styles[item.propName]) {
                    item[KEY] = data.styles[item.propName]
                }
                styleList.push(item)
            })
            this.customStyle = {
                list: styleList
            }
        }
    },
    mounted() {
        this.event.on('changeComponent', (data = {}) => {
            if (!data.key) {
                return;
            }
            this.initProps(data)
            this.initStyles(data);
            // 清除缓存数据
            Object.keys(this.changeData).forEach( key =>  this.changeData[key] = {} );
            // 缓存key
            this.componentKey = data.key;
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