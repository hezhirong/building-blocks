export default {
	bind(el, binding) {
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
			if (binding.value instanceof Function) {
				binding.value(formData)
			}
		})
	}
}