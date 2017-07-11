
import Login from '../views/home/login.vue'
import App from '../views/home/app.vue'
const Home = {
    template: '<router-view></router-view>'
};
let routes = [ 
    { path: '/', redirect: () =>  "/login" },
    { path: '/login', component: Login },
    { path: '/index', component:  App }
]

export default routes;