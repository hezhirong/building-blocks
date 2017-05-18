<template>
	<div>
		<Collapse>
			 <Panel>
	            组件一
	            <div slot="content">
	            	<div v-dragable="element" v-for="(element, index) in list" :key="index">{{element.name}}</div>
	            </div>
	        </Panel>
	    </Collapse>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				list: [
				{
			      	name: "Input",
			      	icon: 'name',
			      	component: {
			      		type: 'Input',
			      		props: {
			      			placeholder: "请输入..."
			      		}
			    	}
			    },
			    {
			      	name: "Button",
			      	icon: 'name',
			      	component: {
			      		type: 'Button',
			      		props: {
			      			type: "primary"
			      		},
			      		children: "按钮"
			    	}
			    },
			    {
			      	name: "switch",
			      	icon: 'name',
			      	component: {
			      		type: 'i-switch'
			    	}
			    },
			    ]
			}
		}
	}
</script>
<style>
</style>