<template>
	<div v-dropable="dropChange" class="w100p h100p">
		<component :source="componentData"></component>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				componentData: []
			}
		},
		methods: {
			dropChange(data) {
				console.log(data)
				this.componentData.push(data);
			}
		},
		components: {
		}
	}
</script>
<style>
</style>
