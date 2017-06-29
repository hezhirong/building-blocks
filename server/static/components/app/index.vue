<template>
    <div id="component-wrap" v-dropable="dropChange">
        <rc :source="componentData"></rc>
    </div>

</template>
<script>
    import {PostMessage} from '../../js/util';

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
				PostMessage('pushComponent', {components: this.componentData});
			}
		},
		mounted() {
            window.addEventListener("message", e => {
                try {
                    let data = JSON.parse(e.data);
                    console.log('***** post iframe message *****', data)
                    if (data.type === 'changeProps') {
                        // TODO: 暂时没递归
                        // 递归遍历找出节点
                        let newData = this.componentData.map( item => {
                            if (item.key === data.key) {
                                data.props.forEach( prop => {
                                    item.props[prop.propName] = prop['$$value'];
                                })
                            }
                            return item;
                        })
                        this.componentData = newData;
                        PostMessage('pushComponent', {components: this.componentData});
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
