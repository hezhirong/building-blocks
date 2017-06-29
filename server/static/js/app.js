import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'font-awesome/css/font-awesome.min.css'

import App from '../views/home/index.vue'
import dragable from '../directives/dragable/index';
import socket from './socket.js'
import {Event} from './util'

import '../scss/index.scss'

Vue.use(ElementUI);

Vue.directive('dragable', dragable);

Vue.prototype.socket = socket;

window.addEventListener("message", e => {
	if (typeof e.data === 'string') {
		let data = JSON.parse(e.data, function (key, value) {
				if (value && typeof value === 'string' && value.indexOf('function') != -1) {
					let func = eval('(' + value +')');
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
  render: h => h(App)
}).$mount('#app')
