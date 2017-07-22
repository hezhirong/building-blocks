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
const convert = (str) => {
	return str.replace(/\-(\w)/g, function(all, letter){
		return letter.toUpperCase()
	}).trim();
}
const getComputedStyle = el => {
	let styles = {},
		styleStr = el.style.cssText;
	styleStr.split(';').forEach( 
		item => {
			let arr = item.split(':');
			if (arr[0] && arr[1]) {
				styles[convert(arr[0])] = arr.slice(1).join(":").trim()
			}
		} 
	)
	return styles;
}
export default {
    bind(el, binding, vnode) {
    	let $el = $(el),
			props = vnode.componentOptions.Ctor.options.props || {},
			instance = vnode.componentInstance,
			key = vnode.data.attrs.key;
		$el.on('click', function (e) {
			console.log('***** selected vnode *****', vnode);

			let $this = $(this),
				styles = getComputedStyle(el)
			
			selectComponentKey = key;
			if ($this.hasClass(className)) {
				return false;
			}
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