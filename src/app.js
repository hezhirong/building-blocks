import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './views/home/index.vue'
// import VueRouter from 'vue-router'
// import routes from './routes'
import iView from 'iview';
import Components from './components/';
import Directives from './directives/';
import 'iview/dist/styles/iview.css';
import 'font-awesome/css/font-awesome.min.css'
import './static/styles/common.scss'


Vue.use(iView);
Vue.use(Directives);
Vue.use(Components);

new Vue({
  render: h => h(App)
}).$mount('#app')
