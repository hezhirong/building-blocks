import draggable from 'vuedraggable'


const components = {
    draggable
};

const install = Vue => {
    Object.keys(components).forEach((key) => {
        Vue.component(key, components[key]);
    });
};

export default { install }