module.exports = {
	name: 'hello',
	icon: 'xx.png',
	entry: 'hello.vue',
	tag: 'za-hello',
	props: {
		hello: {
			default: 'hello',
			type: 'input',
			validate(v) {
				if (v === '') {
					throw new Error('不能为空');
				}
			}
		}
	}
}