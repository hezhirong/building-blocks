<template>
    <rc :source="componentData"></rc>
</template>
<script>
    export default {
        data() {
            let projectData = window.data || {},
                renderData = projectData.renderData || [];
			return {
                projectData: projectData,
				componentData: renderData
			}
		}
    }
</script>
<style>
    
</style>