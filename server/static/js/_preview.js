
/* 自动生成附加所有自定义组件 */

import babelpolyfill from 'babel-polyfill'
import '../scss/common.scss'
import plugins from '../js/develop-plugs.js'
import Vue from 'vue'

Vue.use(plugins);
/* components */
Vue.component("App", require("../components/app/index.vue"))
Vue.component('za-asset', require('../../components/assets/page/index.vue'))
Vue.component('za-hello', require('../../components/hello/hello.vue'))

/* end components */
new Vue({
  render: h => h('App')
}).$mount('#app')