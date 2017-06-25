import rc from '../components/renderComponent/index'

// directive
import dropable from '../directives/dropable/index'
import select from '../directives/compnent-select/index'


const components = {
    rc
}
const directives = {
    dropable,
    select
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