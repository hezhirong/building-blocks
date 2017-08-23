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
			props = vnode.componentOptions.Ctor.options.props || {},
			tag = vnode.componentOptions.tag,
			instance = vnode.componentInstance,
			key = vnode.data.attrs.key;
		
		props = JSON.parse(JSON.stringify(props))
		$el.on('click', function (e) {
			console.log('***** selected vnode *****', vnode);

			let $this = $(this),
				styleObj = cssText2Obj(el)
			
			selectComponentKey = key;
			if ($this.hasClass(className)) {
				return false;
			}
			// 设定默认值
			Object.keys(props).forEach( key => {
				if (props[key] && (instance[key] || instance[key] === '')) {
					props[key]['default'] = instance[key];
				}
			})
			// 添加class和dom
			$('.' + className).removeClass(`${className} ${relative} ${className2}`);
			let addClassName = [];
			if (styleObj.position === 'static') {
				addClassName.push(relative)
			}
			// 组件太小 是否需要隐藏tag
			if ($this.width() < tagWidth) {
				addClassName.push(className, className2)
			} else {
				addClassName.push(className)
			}
			$this.addClass(addClassName.join(' '));
			PostMessage('changeComponent', {props, key, styleObj, ref: `${tag}-${key}`});
			e.stopPropagation();
        }).on('dblclick', function () {
			if (confirm('是否要删除组件')) {
				Event.emit('removeComponent', key)
			}
			return false;
		})
    }
}