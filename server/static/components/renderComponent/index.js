const buildSlots = (component, h) => {
    let temp = {}, scopedSlots = {};

    component.slots.forEach( slotComponent => {
        if (!temp[slotComponent.slotName]) {
            temp[slotComponent.slotName] = [];
        }
        temp[slotComponent.slotName].push(slotComponent);
    })
    Object.keys(temp).forEach(key => {
        scopedSlots[key] = props => h('div', {}, temp[key].map( component => {
            return h(component.tag, buildOptions(component, h))
        }))
    })
    return scopedSlots;
}
const buildOptions = (component, h) => {
    let options = {
        props: {...component.props},
        attrs: { key: component.key },
        directives: [
            {
                name: 'select',
            }
        ]
    }
    // 解析solt 子组件
    if (component.slots) {
        options.scopedSlots = buildSlots(component, h);
    }
    return options;
};
export default {
    functional: true,
    render: function (h, ctx) {
        let props = ctx.props;
        if (props.source && props.source.length > 0) {
        	console.log('***** render *****', props.source)
            return h('div', { attrs: {id: 'rootComponent'} }, props.source.map(component => {
                return h(component.tag,
                    buildOptions(component, h),
                    component.children || []
                );
            }));
        }
        return h('div', { attrs: {id: 'rootComponent'}} )
    }
}
/*
{
    // 和`v-bind:class`一样的 API
    'class': {
    foo: true,
        bar: false
},
    // 和`v-bind:style`一样的 API
    style: {
        color: 'red',
            fontSize: '14px'
    },
    // 正常的 HTML 特性
    attrs: {
        id: 'foo'
    },
    // 组件 props
    props: {
        myProp: 'bar'
    },
    // DOM 属性
    domProps: {
        innerHTML: 'baz'
    },
    // 事件监听器基于 "on"
    // 所以不再支持如 v-on:keyup.enter 修饰器
    // 需要手动匹配 keyCode。
    on: {
        click: this.clickHandler
    },
    // 仅对于组件，用于监听原生事件，而不是组件内部使用 vm.$emit 触发的事件。
    nativeOn: {
        click: this.nativeClickHandler
    },
    // 自定义指令. 注意事项：不能对绑定的旧值设值
    // Vue 会为您持续追踪
    directives: [
        {
            name: 'my-custom-directive',
            value: '2'
            expression: '1 + 1',
            arg: 'foo',
            modifiers: {
                bar: true
            }
        }
    ],
        // Scoped slots in the form of
        // { name: props => VNode | Array<VNode> }
        scopedSlots: {
default: props => h('span', props.text)
},
    // 如果组件是其他组件的子组件，需为slot指定名称
    slot: 'name-of-slot'
    // 其他特殊顶层属性
    key: 'myKey',
        ref: 'myRef'
}
    */