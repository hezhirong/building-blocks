import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './views/home/index.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'font-awesome/css/font-awesome.min.css'

import Components from './components/';
import Directives from './directives/';
import './static/styles/common.scss'

import socket from './socket.js'
// import VueRouter from 'vue-router'
// import routes from './routes'

// socket.on('message', function (m) {
// 	Object.keys(m).forEach( key => {
// 		let path = m[key].componentPath
// 		if (path) {
// 			console.log(require(path))
// 		}
// 		// console.log(m[key].componentPath)
// 		// console.log(require(m[key].componentPath))
// 	} )

// })
import HeaderMenu from './views/home/components/HeaderMenu.vue'
import ComponentList from './views/home/components/ComponentList.vue'
import ComponentProp from './views/home/components/ComponentProp.vue'
import PreviewPage from './views/home/components/PreviewPage.vue'

Vue.component('HeaderMenu', HeaderMenu)
Vue.component('ComponentList', ComponentList)
Vue.component('ComponentProp', ComponentProp)
Vue.component('PreviewPage', PreviewPage)

Vue.use(ElementUI);
Vue.use(Directives);
Vue.use(Components);
Vue.prototype.socket = socket;
new Vue({
  render: h => h(App)
}).$mount('#app')
