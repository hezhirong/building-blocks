const className = 'selected-component';
const relative = 'position-relative';
import {PostMessage, Event} from '../../js/util'
export default {
    bind(el, binding, vnode) {
    	let $el = $(el),
			props = vnode.componentOptions.Ctor.options.props || {},
			instance = vnode.componentInstance,
			key = vnode.data.attrs.key;
		$el.on('click', function () {
        	let $this = $(this);
			if ($this.hasClass(className)) {
				return false;
			}
			console.log('***** selected vnode *****', vnode);

			// 设定默认值
			Object.keys(props).forEach( key => {
				if (props[key]) {
					props[key]['default'] = instance[key];
				}
			})
			// 添加class和dom
			$('.selected-component').removeClass(className + ' ' + relative);
			if (getComputedStyle(this).position === 'static') {
				$this.addClass(relative)
			}
            $this.addClass(className);
			PostMessage('changeComponent', {props, key});

        }).on('dblclick', function () {
			if (confirm('是否要删除组件')) {
				Event.emit('removeComponent', key)
			}
		})
    }
}