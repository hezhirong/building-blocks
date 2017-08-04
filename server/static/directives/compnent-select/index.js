const className = 'selected-component';
const className2 = 'hide-tag';
const relative = 'position-relative';
const tagWidth = 300;
import {PostMessage, Event, cssText2Obj} from '../../js/util'

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
			props = {...vnode.componentOptions.Ctor.options.props} || {},
			instance = vnode.componentInstance,
			key = vnode.data.attrs.key;
		$el.on('click', function (e) {
			console.log('***** selected vnode *****', vnode);

			let $this = $(this),
				styleObj = cssText2Obj(el)
			
			selectComponentKey = key;
			if ($this.hasClass(className)) {
				return false;
			}
			console.log(instance[key])
			// 设定默认值
			Object.keys(props).forEach( key => {
				console.log(props)
				if (props[key]) {
					// props[key]['default'] = instance[key];
				}
			})
			// 添加class和dom
			$('.' + className).removeClass(`${className} ${relative} ${className2}`);
			let addClassName = [];
			if (styleObj.position === 'static') {
				addClassName.push(relative)
			}
			if ($this.width() < tagWidth) {
				addClassName.push(className, className2)
			} else {
				addClassName.push(className)
			}
			$this.addClass(addClassName.join(' '));
			// PostMessage('changeComponent', {props, key, styleObj});
			// e.stopPropagation();
        }).on('dblclick', function () {
			if (confirm('是否要删除组件')) {
				Event.emit('removeComponent', key)
			}
			return false;
		})
    }
}