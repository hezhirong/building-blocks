<template>
	<div class="body">
		<header>
			<Menu mode="horizontal" theme="dark" active-name="1">
		        <Menu-item name="1">
		            <Icon type="ios-paper"></Icon>
		            内容管理
		        </Menu-item>
		        <Menu-item name="2">
		            <Icon type="ios-people"></Icon>
		            用户管理
		        </Menu-item>
		        <Submenu name="3">
		            <template slot="title">
		                <Icon type="stats-bars"></Icon>
		                统计分析
		            </template>
		            <Menu-group title="使用">
		                <Menu-item name="3-1">新增和启动</Menu-item>
		                <Menu-item name="3-2">活跃分析</Menu-item>
		                <Menu-item name="3-3">时段分析</Menu-item>
		            </Menu-group>
		            <Menu-group title="留存">
		                <Menu-item name="3-4">用户留存</Menu-item>
		                <Menu-item name="3-5">流失用户</Menu-item>
		            </Menu-group>
		        </Submenu>
		        <Menu-item name="4">
		            <Icon type="settings"></Icon>
		            综合设置
		        </Menu-item>
		    </Menu>	
		</header>
		<section class="content">
			<div class="components-box">
				<Collapse v-model="value1">
					<Panel >
						组件一
						<p slot="content">
							<draggable v-model="list" class="dragArea" :options="{group: { name:'people',  pull:'clone', put:false}, sort: false}">
								<div v-for="(element, index) in list" :key="index">{{element.name}}</div>
							</draggable>
						</p>
					</Panel>
			    </Collapse>
			</div>
			<div class="custom-page">
				<draggable v-model="list3" :options="options" style="border: 1px solid red; height: 100px;">
					<div v-for="(element, index) in list" :key="index">{{element.name}}</div>
				</draggable>
				<draggable v-model="list4" :options="options" style="border: 1px solid green; height: 100px;">
					
				</draggable>
			</div>
			<div class="prop-config">
				{{JSON.stringify(list3)}}
				<br>
				{{JSON.stringify(list4)}}
			</div>
		</section>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				value1: 1,
				options: {group: { name:'people',  pull: false, put: true}, sort: false},
				list: [{
				      name: "John"
				    }, {
				      name: "Joao"
				    }, {
				      name: "Jean"
				    }],
			   	list2: [{
				      name: "Juan"
				    }, {
				      name: "Edgard"
				    }, {
				      name: "Johnson"
				    }],
				list3: [],
				list4: []
			}
		}
	}
</script>
<style lang="scss">
	.body {
		display: flex;
		height: 100%;
		flex-direction: column;
		header {
			width: 100%;
		}
		.content {
			display: flex;
			flex-direction: row;
			flex: 1;
		}
		.components-box {
			width: 200px;
			border: 1px solid red
		}
		.custom-page {
			flex: 1;
			border: 1px solid yellow
		}
		.prop-config {
			width: 200px;
			border: 1px solid green
		}
	}
</style>