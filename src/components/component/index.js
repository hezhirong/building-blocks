import Vue from 'Vue'

export default {
    functional: true,
    render: function (h, ctx) {
    	let props = ctx.props,
    		attrs = ctx.data.attrs;
        console.log(props)
        if (props.source.length > 0) {
        	return h('div', {}, props.source.map( item => {
                let component = item.component;
                return h(component.type, {props: component.props}, component.children || []);
            }));
        }
        return h('div')
    }
    // },
    // props: {
    //     type: { 
    //     	type: String, 
    //     	required: true 
    //     },
    //     text: {
    //     	type: String,
    //     	require: true
    //     }
    // }
}