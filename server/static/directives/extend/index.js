import {Event, loop} from "../../js/util"
const convert = (str) => {
	return str.replace(/\-(\w)/g, function(all, letter){
		return letter.toUpperCase()
	}).trim();
}
const async = (el, binding, vnode) => {
    let wrap = vnode.context.$el,
        cssText = wrap && wrap.style.cssText || '',
        styles = {};
    cssText.split(';').forEach( 
        item => {
            let arr = item.split(':');
            if (arr[0] && arr[1]) {
                styles[convert(arr[0])] = arr.slice(1).join(":").trim()
            }
        } 
    )
    if (Array.isArray(binding.value)) {
        let cssData = {}
        binding.value.forEach( item => {
            if (styles[item]) {
                cssData[item] = styles[item]
            }
        })
        $(el).css(cssData)
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