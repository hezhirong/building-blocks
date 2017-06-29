<template>
    <el-form id="props" :model="customProps" ref="propForm">
        <el-table
                border
                :data="customProps.list"
                style="width: 100%">
            <el-table-column prop="label" label="name" width="100">
            </el-table-column>
            <el-table-column prop="value" label="value">
                <template scope="scope">
                    <el-form-item
                            :prop="'list.' + scope.$index + '.$$value'"
                            :rules="[
                                { validator: validateControl(scope.row), trigger: 'blur,change' }
                            ]"
                    >
                        <control :data="scope.row" @change="valueChange"/>
                    </el-form-item>
                </template>
            </el-table-column>
        </el-table>
	</el-form>
</template>
<script>
	import {Event, PostMessage} from '../../../js/util.js'
	import Control from './Control.js'

	let timeout = 0;
	let postProps = [];
	export default {
		data() {
			return {
				customProps: {
				    key: null,
				    list: []
				}
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
		        timeout = setTimeout( () => {
                    this.$refs.propForm.validate( valid => {
                        postProps.push(control)
                        if (valid) {
                            let data = {
                                key: this.customProps.key, props: postProps
                            };
                            PostMessage('changeProps', data, true);
                            // window.frames[0].postMessage(data, '*');
                            postProps = [];
                        }
                    })
		        }, 300)
		    }
		},
		mounted() {
            Event.on('changeComponent', (data = {}) => {
                let list = [];
                if (data.props && data.key) {
                    Object.keys(data.props).forEach(key => {
                        let item = data.props[key];
                        item.propName = key;
                        item.$$value = item['default'] || '';
                        list.push( item )
                    })
                    console.log('***** props *****', data, list)
                    this.customProps = {
                        list,
                        key: data.key
                    }
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