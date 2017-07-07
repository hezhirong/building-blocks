<template>
	<div class="body" v-loading="pageLoading">
		<header-menu  @change="menuClick"></header-menu>
		<section class="content">
			<div class="components-box">
				<component-list></component-list>
			</div>
			<div class="custom-page">
				<preview-page :previewData="previewData"></preview-page>
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
	import {Event} from '../../js/util'
	export default {
		data() {
			return {
				pageLoading: false,
				previewData: {
				    id: '594f4a8f8727a83072d75e31'
				},
			   	componentList: []
			}
		},
		methods: {
			menuClick(type, projectData) {
				switch(type) {
					case "createProject":
						this.pageLoading = true;
						this.socket.get('/new_project', projectData).then( res => {
							this.previewData = res;
							this.pageLoading = false;
						}).catch( res => this.pageLoading = false )
						break;
				}
			}
		},
		mounted() {
            Event.on('updateComponent', (data) => {
                data.id = this.previewData.id;
                this.socket.post('/updateComponent', data).then( res => {

                })
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
		}
		.custom-page {
			flex: 1;
		}
		.prop-config {
			width: 300px;
		}
	}
</style>