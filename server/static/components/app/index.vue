<template>
    <div id="component-wrap" v-dropable="dropChange">
        <rc :source="componentData"></rc>
    </div>

</template>
<script>
    let key = 0;
	export default {
		data() {
			return {
				componentData: [] || [{
                    tag: 'za-hello',
                    props: {hello: 'hello world'}
				}]
			}
		},
		methods: {
			dropChange(data) {
			    key += 1;
				data.key = key;
				data.props = {};
				this.componentData.push(data);
			}
		},
		mounted() {
            window.addEventListener("message", e => {
                try {
                    let data = JSON.parse(e.data);
                    console.log('***** from message *****', data)
                    // TODO: 暂时没递归
                    // 递归遍历找出节点
                    let newData = this.componentData.map( item => {
                        if (item.key === data.key) {
                            //Object.keys(data.props).forEach( key => {
                                //let prop = data.props[key];
                                item.props[data.props.propName] = data.props['$$value'];
                            //})
                        }
                        return item;
                    })
                    this.componentData = newData;
                } catch(e) {
                    console.log(e)
                }
            }, false);
		}
	}
</script>
<style>
</style>
