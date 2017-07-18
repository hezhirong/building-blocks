<template>
    <div id="component-wrap" v-dropable="dropChange" class="dev">
        <rc :source="componentData"></rc>
    </div>
</template>
<script>
    import {PostMessage, Event, loop, deepCopy} from '../../js/util.js';
    let $$key = 0;
	export default {
		data() {
            let projectData = window.data || {},
		        renderData = projectData.renderData || [];
			return {
                projectData: projectData,
				componentData: renderData
			}
		},
        created() {
            let _tmpKey = 0;
            loop(this.componentData, null, (item, index, arr) => {
                _tmpKey = item.key > _tmpKey ? item.key : _tmpKey;
            });
            $$key = _tmpKey;
        },
		methods: {
            // 拖拽组件
			dropChange(data) {
			    $$key += 1;
				data.key = $$key;
				data.props = {};
                data.children = [];
				this.componentData.push(data);
				this.updateComponent();
			},
            updateComponent() {
                PostMessage('updateComponent', {components: this.componentData, id: this.projectData.id});
            }
		},
		mounted() {
            // 删除组件
            Event.on('removeComponent', key => {
                loop(this.componentData, key, (item, index, arr) => arr.splice(index, 1));
                this.componentData = deepCopy(this.componentData);
                PostMessage('clearComponentProps')
                this.updateComponent();
            })
            // 容器追加组件
            Event.on('container', data => {
                // 查找对应组件 添加子组件
                loop(this.componentData, data.key, (item, index, arr) => {
                    data.slots.forEach( item => {
                        $$key += 1;
                        item.props = {};
                        item.children = [];
                        item.key = $$key
                    })
                    if (item.slots) {
                        item.slots = [...item.slots, ...data.slots]    
                    } else {
                        item.slots = data.slots;
                    }
                })
                this.componentData = this.componentData.splice(0)
                this.updateComponent();
            })
		    // 绑定父节点传递来的值
            window.addEventListener("message", e => {
                try {
                    let data = JSON.parse(e.data);
                    console.log('***** post iframe message *****', data)
                    if (data.type === 'changeProps') {
                        // 递归遍历找出节点 修改props
                        loop(this.componentData, data.key, item => {
                            data.props.forEach( prop => {
                                item.props[prop.propName] = prop['$$value'];
                            })
                        })

                        this.componentData = this.componentData.slice(0);
                        this.updateComponent();
                    }
                } catch(e) {
                    console.log(e)
                }
            }, false);
		}
	}
</script>
<style>
</style>
