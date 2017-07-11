<template>
	<div class="w100p h100p wrapper">
		<div class="content" :style="contentStyle" v-show="previewData">
			 <iframe :src="previewUrl" border="0"></iframe>
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
	import {sStorage} from '../../../js/util.js'
	export default {
		props: ['platform'],
		data() {
			let storageProject = sStorage.get('project', true);
			return {
				previewData: storageProject || null
			}
		},
		computed: {
		    previewUrl() {
				if (this.previewData) {
		        	return `http://localhost:9200/preview/${this.previewData.id}`;
				} else {
					return "";
				}
		    },
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
		},
		mounted() {
			this.event.on('selectProject', project => {
				this.previewData = project;
			})
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
        position: relative;
        iframe {
            width:1500px!important;
            height:2667px!important;
            transform: scale(0.25, 0.25);
            transform-origin: 0 0;
            position: absolute;
            border: none;
        }
	}
</style>