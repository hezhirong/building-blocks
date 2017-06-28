<template>
	<h1 :style="{background: st, borderRadius: `${radius}px`}">
        {{hello}}

    </h1>
</template>
<script>
    import './hello.scss'
	export default {
		props: {
			hello: {
			    default: '你好',
			    label: '姓名',
			    cType: 'text',
			    validate: (val) => {
			        if (!val) {
			            return new Error('不能为空')
			        }
			    }
			},
			st: {
			    default: 'rgba(19, 206, 102, 0.8)',
			    label: '背景色',
			    cType: 'color'
			},
			radius: {
			    label: '圆角',
			    cType: 'text',
			    append: 'px'
			},
			st: {
			    default: 'green',
			    title: 'child',
			    cType: 'select',
			    options: [
			        'red', 'green',
			        { value: 'yellow', text: '黄色' }
			    ],
			    validate: val => {
			        //if (val === 'yellow') {
			        //    return new Error('不能选黄色')
			        //}
			    }
			}
		},
		data() {
			return {

			}
		}
	}
</script>