import rc from '../components/renderComponent/index'

// directive
let dropable = {bind() {}}
let select = {bind() {}}
let container = {bind() {}}

const components = {
    rc
}
const directives = {
    dropable,
    select,
    container
}
const install = Vue => {
    Object.keys(components).forEach((key) => {
        Vue.component(key, components[key]);
    });
    Object.keys(directives).forEach((key) => {
        Vue.directive(key, directives[key]);
    });
};

export default { install }