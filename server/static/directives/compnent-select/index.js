const className = 'selected-component';
import {PostMessage} from '../../js/util'
export default {
    bind(el, binding, vnode) {
        $(el).on('click', function () {
        	let $this = $(this);
			if ($this.hasClass(className)) {
				return false;
			}
        	let props = vnode.componentOptions.Ctor.options.props,
				instance = vnode.componentInstance,
				key = vnode.data.attrs.key;
			if (!props) {
				console.log('***** selected vnode *****', vnode);
				return false;
			}
			// console.log('props', props)
			console.log('***** selected vnode *****', vnode);
			// 设定默认值
			Object.keys(props).forEach( key => {
				if (props[key] && props[key]['default']) {
					props[key]['default'] = instance[key];
				}
			})
            $('.selected-component').removeClass(className);
            $this.addClass(className);
			PostMessage('changeComponent', {props, key});
        })
    }
}