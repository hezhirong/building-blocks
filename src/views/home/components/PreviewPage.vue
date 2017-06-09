<template>
	<div class="w100p h100p wrapper">
		<div class="content" :style="contentStyle">
			<!-- <iframe src="/preview.html" border="0" style="width: 100%; height: 100%; border: none"></iframe> -->
		</div>
	</div>
</template>
<script>
	const platformType = {
		ipadPro: {
			w: 1024,
			h: 1366
		},
		ipad: {
			w: 768,
			h: 1024
		},
		iphone6: {
			w: 375,
			h: 667
		},
		"iphone6+": {
			w: 414,
			h: 736
		}
	}
	export default {
		props: ['platform'],
		data() {
			return {

			}
		},
		computed: {
			contentStyle() {
				let width = "",
					height = "",
					cur = platformType[this.platform || 'iphone6'];
				if (cur) {
					width = cur.w + 'px';
					height = cur.h + 'px';
				}
        		return {
                    width,
                    height
        		}
        	}
		}
	}
</script>
<style lang="scss" scoped>
	.wrapper {
		background: #ccc;
		overflow: auto;
	}
	.content {
		margin: 20px auto;
		transition: all .3s linear;
		background: #fff;
	}
</style>