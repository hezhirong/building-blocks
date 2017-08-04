import {Event, loop, cssText2Obj} from "../../js/util"
const convert = (str) => {
	return str.replace(/\-(\w)/g, function(all, letter){
		return letter.toUpperCase()
	}).trim();
}
const async = (el, binding, vnode) => {
    let wrap = vnode.context.$el,
        styleObj = cssText2Obj(wrap);
    if (Array.isArray(binding.value)) {
        let cssData = {}
        binding.value.forEach( item => {
            if (styleObj[item]) {
                cssData[item] = styleObj[item]
            }
        })
        let curStyleObj = cssText2Obj(el)
        $(el).css({ ...curStyleObj, ...cssData});
    }
}
export default {
    bind(el, binding, vnode) {
        setTimeout( () => {
            async(el, binding, vnode)
        });
    },
	update(el, binding, vnode) {
        async(el, binding, vnode)
	}
}