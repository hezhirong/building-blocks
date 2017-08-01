import rc from '../components/renderComponent/index'
import extend from '../directives/extend/index'

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
    container,
    extend
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