// 基础路由
const baseRouter = {
    template: '<router-view></router-view>'
};

// const Login = r => require.ensure([], () => r(require('./views/Login.vue'))
const Home = r => require.ensure([], () => r(require('./views/Home.vue')));

let routes = [
    {
        path: '/',
        component: Home,
        name: '积木系统'
    }
];

export default routes;