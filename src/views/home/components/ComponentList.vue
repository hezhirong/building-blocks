<template>
	<div>
		<el-collapse>
  			<el-collapse-item title="组件一" name="index">
  				<div v-dragable v-for="(element, index) in list"> 
  					{{element.name}}
  				</div>
  			</el-collapse-item>
  		</el-collapse>
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