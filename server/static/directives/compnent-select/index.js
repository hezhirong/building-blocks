const className = 'selected-component';
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
			let msg = JSON.stringify({ type: 'changeComponent', props, key}, function(key, val) {
				if (typeof val === 'function') {
					return val + '';
				}
				return val;
			})
			window.parent.postMessage(msg, '*')
        })
    }
}