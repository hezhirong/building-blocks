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

	export default {
		data() {
			return {
				pageLoading: false,
				previewData: null,
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