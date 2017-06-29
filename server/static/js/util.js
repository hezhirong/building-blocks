import Vue from 'vue'
const _event = new Vue()

export const Event = {
	emit: (key, value) => {
		_event.$emit(key, value)
	},
	on: (key, func) => {
		_event.$on(key, func)
	}
}
export const PostMessage = (type, data, isFrame) => {
	data = {type, ...data};
	let msg = JSON.stringify(data, function(key, val) {
		if (typeof val === 'function') {
			return val + '';
		}
		return val;
	})
	if (isFrame) {
		window.frames[0].postMessage(msg, '*');
	} else {
		window.parent.postMessage(msg, '*')
	}
}