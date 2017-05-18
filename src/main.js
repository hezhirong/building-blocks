import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './views/home/index.vue'
// import VueRouter from 'vue-router'
// import routes from './routes'
import iView from 'iview';
import Components from './components/';
import 'iview/dist/styles/iview.css';
import 'font-awesome/css/font-awesome.min.css'
import './static/styles/common.scss'


// Vue.use(VueRouter);
Vue.use(iView);
Vue.use(Components);
// const router = new VueRouter({
//     routes
// });
// router.beforeEach((to, from, next) => {
//     next()
//     document.title = to.name;
// })

const createApp = function createApp(options) {
    const VueApp = Vue.extend(App);

    return new VueApp(Object.assign({}, options));
};

export {Vue, createApp};
