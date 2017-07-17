import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'font-awesome/css/font-awesome.min.css'

import Home from '../views/home/home.vue'
import dragable from '../directives/dragable/index';
import downloadFile from '../directives/download-file/index'
import {dateUtil} from './util.js';
import VueRouter from 'vue-router'
import {
	Event
} from './util'
import routes from './routes'
import '../scss/index.scss'


import socket from './socket.js'

Vue.prototype.socket = socket;
Vue.prototype.event = Event;
Vue.prototype.error = error => {
	console.error(error)
}
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.directive('dragable', dragable);
Vue.directive('download', downloadFile);
Vue.filter('date', dateUtil.format);

const router = new VueRouter({
	routes
});

window.addEventListener("message", e => {
	if (typeof e.data === 'string') {
		let data = JSON.parse(e.data, function (key, value) {
				if (value && typeof value === 'string' && value.indexOf('function') != -1) {
					let func = eval('(' + value + ')');
					return func;
				}
				return value;
			}),
			type = data.type;
		console.log('***** post to parent *****', data)
		if (type) {
			delete data.type;
			Event.emit(type, data);
		}
	}
}, false);

new Vue({
	router,
	render: h => h(Home)
}).$mount('#app')