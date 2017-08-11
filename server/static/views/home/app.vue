<template>
	<div class="body" v-loading="pageLoading">
		<header-menu  @change="menuClick"></header-menu>
		<section class="content">
			<div class="components-box">
				<component-list></component-list>
			</div>
			<div class="custom-page">
				<preview-page></preview-page>
			</div>
			<div class="prop-config">
				<component-prop></component-prop>
			</div>
		</section>
	</div>
</template> 
<script>
	import HeaderMenu from './components/HeaderMenu.vue'
	import ComponentList from './components/ComponentList.vue'
	import ComponentProp from './components/ComponentProp.vue'
	import PreviewPage from './components/PreviewPage.vue'
	import {Event, sStorage, ENUM } from '../../js/util'

	export default {
		data() { 
			return {
				pageLoading: false,
			   	componentList: []
			}
		},
		methods: {
			menuClick(type, projectData) {
				switch(type) {
					case "createProject":
						this.pageLoading = true;
						this.socket.get('/new_project', projectData).then( res => {
							// 触发事件
							this.event.emit('selectProject', res.data);
							// 清空配置属性
							this.event.emit('clearComponentProps');
							// 存入sessionstorage
							sStorage.set('project', res.data);
							this.pageLoading = false;
						}).catch( res => this.pageLoading = false )
						break;
				}
			}
		},
		mounted() {
			let userData = sStorage.get(ENUM.ss.TOKEN,true);
			this.socket.emit('authenticate', {
				token: userData && userData.token 
			}, (d) => {
				console.log(d)
			})
            Event.on('updateComponent', (data) => {
                this.socket.post('/updateComponent', data)
            })
		},
		components: {
			HeaderMenu,
			ComponentList,
			PreviewPage,
			ComponentProp
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
			overflow: auto;
		}
		.custom-page {
			flex: 1;
		}
		.prop-config {
			width: 400px;
			overflow: auto;
		}
	}
</style>