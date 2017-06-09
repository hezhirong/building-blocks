
import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './views/preview/index.vue'
import 'font-awesome/css/font-awesome.min.css'
/* components */
Vue.component('za-hello', require('./components/hello/hello.vue'))

/* end components */
new Vue({
  render: h => h(App)
}).$mount('#app')