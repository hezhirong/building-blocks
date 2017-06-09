export default {
  	inserted: function (el, binding) {
  		//开始拖拽
		$(el).attr('draggable', 'true').on("dragstart", function(ev) {
			var dt = ev.originalEvent.dataTransfer;
			// $(ev.target).css('background', 'red')
			//传递拖拽组件数据
			dt.setData('data', JSON.stringify(binding.value));
		});
  	}
}