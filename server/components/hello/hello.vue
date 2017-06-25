<template>
	<h1 :style="{background: st}">{{hello}}</h1>
</template>
<script>
    import './hello.scss'
	export default {
		props: {
			hello: {
			    default: '你好',
			    title: '姓名',
			    cType: 'text',
			    validate: (val) => {
			        if (!val) {
			            return new Error('不能为空')
			        }
			    }
			},
			st: {
			    default: 'green',
			    title: '背景色',
			    cType: 'select',
			    options: [
			        'red', 'green',
			        { value: 'yellow', text: '黄色' }
			    ],
			    validate: val => {
			        if (val === 'yellow') {
			            return new Error('不能选黄色')
			        }
			    }
			}
		},
		data() {
			return {

			}
		}
	}
</script>