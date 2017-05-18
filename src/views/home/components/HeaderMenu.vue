<template>
	<header>
		<h1 class="sys-name">
			积木系统
		</h1>
		<div class="header-nav">
			<Menu mode="horizontal" theme="dark" active-name="1">
		        <Menu-item name="1">
		            <Icon type="ios-paper"></Icon>
		            文件
		        </Menu-item>
		        <Submenu name="2">
		            <template slot="title">
		                <Icon type="stats-bars"></Icon>
		                尺寸
		            </template>
	                <Menu-item name="2-1">新增和启动</Menu-item>
	                <Menu-item name="2-2">活跃分析</Menu-item>
	                <Menu-item name="2-3">时段分析</Menu-item>
		        </Submenu>
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
	    </div>
	</header>
</template>
<script>
	export default {
		data() {
			return {
				
			}
		}
	}
</script>
