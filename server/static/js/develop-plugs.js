import rc from '../components/renderComponent/index'

// directive
import dropable from '../directives/dropable/index'
import select from '../directives/compnent-select/index'
import container from '../directives/container/index'
import extend from '../directives/extend/index'


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