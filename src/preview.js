import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import iView from 'iview';
import App from './views/preview/index.vue'
import Directives from './directives/';
import Components from './components/';
import 'iview/dist/styles/iview.css';
import 'font-awesome/css/font-awesome.min.css'
import './static/styles/common.scss'

Vue.use(iView);
Vue.use(Directives);
Vue.use(Components);
new Vue({
  render: h => h(App)
}).$mount('#preview')
