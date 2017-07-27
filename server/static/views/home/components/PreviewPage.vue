<template>
	<div class="w100p h100p wrapper">
		<img src="http://localhost:8181/img/phone.png" class="phone-img" :style="phoneStyle"/>
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
	import {sStorage, ENUM} from '../../../js/util.js'
	import '../../../images/phone.png'
	export default {
		props: ['platform'],
		data() {
			let storageProject = sStorage.get(ENUM.ss.PRODUCT, true);
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
			phoneStyle() {
				let width = "",
					height = "",
					cur = platformType[this.platform || 'iphone6'];
				if (cur) {
					width = cur.w * 1.07 + 'px';
				}
        		return {
                    width
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
					marginTop: '110px',
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
		position: relative;
	}
	.phone-back {
		background: url(../../../images/phone.png) center top no-repeat;
		background-size: contain;
		width: 375px;
		margin: 20px auto;
		overflow: hidden;
	}
	.phone-img {
		position: absolute;
		width: 375px;
		top: 20px;
		left: 50%;
		transform: translate(-50%);
	}
	.content {
		margin: 0 auto;
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