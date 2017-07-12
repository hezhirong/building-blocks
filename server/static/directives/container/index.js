import {Event, loop} from "../../js/util"
export default {
	bind(el, binding, vnode) {
		const $el = $(el);
		$el.on("dragover", function(ev) {
			ev.preventDefault();
		});
		$el.on("drop", function(ev) {
			ev.preventDefault();
			let df = ev.originalEvent.dataTransfer,
				data = df.getData("data"),
				formData = {};
			try {
				formData = JSON.parse(data);
			} catch(e) {
				throw new Error('格式化数据失败');
			}
			let slotName = Object.keys(binding.modifiers)[0];
			if (slotName) {
				let key = vnode.context.$el.getAttribute('key') | 0;
				formData.slotName = slotName;
				Event.emit('container', {
					key,
					slots: [
						formData
					]
				});

			}
			ev.stopPropagation();
		})

	}
}