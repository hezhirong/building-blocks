
const controlRender = {
		text: (h, data, listeners) => {
			let child = [];
			if (data.append) {
				child = [h('template', { slot: 'append'} , [data.append] )];
			}
			return h('el-input', {
				props: {
					value: data[vName],
					placeholder: data.placeholder
				},
				on: {
					input: function (event) {
						data[vName] = event;
						listeners.change(data);
					}
				}
			}, child)
		},
		select: (h, data, listeners) => {
			let options = Array.isArray(data.options) ? data.options : [];
			return h('el-select', {
				props: {
					value: data[vName],
					placeholder: data.placeholder
				},
				on: {
					input: function (event) {
						// console.log(event)
						data[vName] = event;
						listeners.change(data);
					}
				}
			},
			options.map(function (item) {
				let value, label;
				if (typeof item === 'string') {
					value = item;
					label = item;
				} else if (typeof item === 'object') {
					value = item.value || item.text;
					label = item.text || item.value;
				}
				return h('el-option', { props: {value: value, label: label} });
			}))
		},
	 	color: (h, data, listeners) => {
			return h('el-color-picker', {
					props: {
						'show-alpha': true,
						value: data[vName],
						placeholder: data.placeholder
					},
					on: {
						input: function (event) {
							data[vName] = event;
							listeners.change(data);
						}
					}
				}
			)
		},
		switch: 'el-switch',
		checkbox: 'el-checkbox',
		radio: 'el-radio'
	},
	vName = '$$value'
export default {
	functional: true,
	render: function (h, ctx) {
		let props = ctx.props,
			listeners = ctx.listeners,
			data = props.data;
		return controlRender[data.cType](h, data, listeners);
		// return h('div', {}, [h('za-hello', {props: {hello: 'hello world'}})])
	}
}

// return h('div', {}, attrs.options.map( item => {
// 	return h('el-checkbox', {
// 			style: ctx.data.staticStyle,
// 			props: {disabled: item.readonly},
// 			domProps: {
// 				value: attrs.model[item.val]
// 			},
// 			on: {
// 				input: function (event) {
// 					attrs.model[item.val] = event;
// 				}
// 			}
// 		},
// 		item.text
// 	);
// }));
