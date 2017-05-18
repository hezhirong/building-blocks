<template>
	<div class="body">
		<header-menu></header-menu>
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
	export default {
		data() {
			return {
				
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
		components: {
			HeaderMenu,
			ComponentList,
			ComponentProp,
			PreviewPage
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