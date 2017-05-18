import dragable from './dragable/'
import dropable from './dropable/'
const directives = {
    dragable,
    dropable
};

const install = Vue => {
    Object.keys(directives).forEach((key) => {
        Vue.directive(key, directives[key]);
    });
};

export default { install }