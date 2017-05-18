import component from './component/'


const components = {
    component
};

const install = Vue => {
    Object.keys(components).forEach((key) => {
        Vue.component(key, components[key]);
    });
};

export default { install }