<template>
    <div id="component-wrap" v-dropable="dropChange">
        <rc :source="componentData"></rc>
    </div>

</template>
<script>
    import {PostMessage, Event} from '../../js/util';

    let key = 0;
	export default {
		data() {
		    let renderData = window.data && window.data.renderData;
		    renderData = renderData || [];
			return {
				componentData: renderData
			}
		},
		methods: {
			dropChange(data) {
			    key += 1;
				data.key = key;
				data.props = {};
				this.componentData.push(data);
				PostMessage('updateComponent', {components: this.componentData});
			},
			getComponentForKey(key, func) {
			    let newData = this.componentData.map( item => {
                    if (item.key === data.key) {
                        func && func(item)
                    }
                    return item;
                })
                return newData;
			}
		},
		mounted() {
            Event.on('removeComponent', key => {
                let newData = [];
                this.componentData.forEach( item => {
                    if (item.key !== key) {
                        newData.push(item)
                    }
                })
                this.componentData = newData;
                PostMessage('updateComponent', {components: this.componentData});
            })
		    // 绑定父节点传递来的值
            window.addEventListener("message", e => {
                try {
                    let data = JSON.parse(e.data);
                    console.log('***** post iframe message *****', data)
                    if (data.type === 'changeProps') {
                        // TODO: 暂时没递归
                        // 递归遍历找出节点
                        let newData = this.getComponentForKey(data.key, item => {
                            data.props.forEach( prop => {
                                item.props[prop.propName] = prop['$$value'];
                            })
                        })
                        this.componentData = newData;
                        PostMessage('updateComponent', {components: this.componentData});
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
