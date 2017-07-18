const className = 'selected-component';
const relative = 'position-relative';
import {PostMessage, Event} from '../../js/util'

let selectComponentKey = null;
document.body.onkeydown = function (e) {
	if (e.keyCode === 8 && selectComponentKey) {
		if (confirm('是否要删除组件')) {
			Event.emit('removeComponent', selectComponentKey)
		}
	}
	return false;
}
export default {
    bind(el, binding, vnode) {
    	let $el = $(el),
			props = vnode.componentOptions.Ctor.options.props || {},
			styles = vnode.componentInstance.$vnode.data.style || {},
			instance = vnode.componentInstance,
			key = vnode.data.attrs.key;
		$el.on('click', function (e) {
			let $this = $(this);
			selectComponentKey = key;
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
			PostMessage('changeComponent', {props, key, styles});
			return false;

        }).on('dblclick', function () {
			if (confirm('是否要删除组件')) {
				Event.emit('removeComponent', key)
			}
			return false;
		})
    }
}