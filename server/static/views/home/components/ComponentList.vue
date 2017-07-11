<template>
	<div class="component-list">
		<el-collapse>
  			<el-collapse-item :title="groupData[key]" name="index" v-for="(item, key) in list" :key="key">
  				<div class="component-item" v-for="(component, index) in item" v-dragable="component" :key="index" >
  					<h6>
                        <span class="component-icon" :style="{backgroundImage: `url(${component.icon})` }">
                            {{component.name}}
                        </span>
                    </h6>
  				</div>
  			</el-collapse-item>
  		</el-collapse>
	</div>
</template>
<script>
	export default {
		data() {
			return {
	    		groupData: {
                    common: '通用'
                },
				list: {}
			}
		},
		mounted() {
		    this.socket.on('componentList', componentData => {
		        let _tmp = {
                    common: []
                };
		        Object.keys(componentData).forEach( key => {
		            let item = componentData[key];
                    if (item.group && this.groupData[item.group]) {
                        if (!_tmp[item.group]) {
                            _tmp[item.group] = []
                        }
                        _tmp[item.group].push(item)
                    } else {
                        _tmp['common'].push(item)
                    }
		        })
		        this.list = _tmp;
		    })
		}
	}
</script>
<style lang="scss">
    .component-list {
        .el-collapse-item__content {
            padding: 0 15px;
        }
        h6 {
            margin: 5px;
        }
        .component-icon {
            background-position: left center;
            background-repeat: no-repeat;
            padding-left: 30px;
            font-size: 16px;;
            background-size: contain;
        }
    }

</style>