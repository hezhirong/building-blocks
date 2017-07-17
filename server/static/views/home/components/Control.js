const buildVNode = (value, vnode1, vnode2) => {
    if (value) {
        return vnode1;
    } else {
        return vnode2;
    }
};
const controlRender = {
        text: (h, data, listeners) => {
            let child = [];
            if (data.append) {
                child = [h("template", { slot: "append" }, [data.append])];
            }
            return h(
                "el-input",
                {
                    props: {
                        value: data[vName],
                        placeholder: data.placeholder
                    },
                    on: {
                        input: function(event) {
                            data[vName] = event;
                            listeners.change(data);
                        }
                    }
                },
                child
            );
        },
        select: (h, data, listeners) => {
            let options = Array.isArray(data.options) ? data.options : [];
            return h(
                "el-select",
                {
                    props: {
                        value: data[vName],
                        placeholder: data.placeholder
                    },
                    on: {
                        input: function(event) {
                            // console.log(event)
                            data[vName] = event;
                            listeners.change(data);
                        }
                    }
                },
                options.map(function(item) {
                    let value, label;
                    if (typeof item === "string") {
                        value = item;
                        label = item;
                    } else if (typeof item === "object") {
                        value = item.value || item.text;
                        label = item.text || item.value;
                    }
                    return h("el-option", {
                        props: { value: value, label: label }
                    });
                })
            );
        },
        color: (h, data, listeners) => {
            return h("el-color-picker", {
                props: {
                    "show-alpha": true,
                    value: data[vName],
                    placeholder: data.placeholder
                },
                on: {
                    input: function(event) {
                        data[vName] = event;
                        listeners.change(data);
                    }
                }
            });
        },
        array: (h, data, listeners) => {
            let renderRowData = [];
            let renderColData = [];
            if (Array.isArray(data[vName])) {
                renderRowData = data[vName].map((dataItem, rowIndex) => {
                    if (!data.model) {
                        return false;
                    }

                    let modelKeys = Object.keys(data.model),
                        len = modelKeys.length,
                        cell = Math.floor(23 / len);
                    renderColData = modelKeys.map(key => {
                        let item = {
                            ...data.model[key],
                            $$key: key,
                            [vName]: dataItem[key]
                        };
                        let type = getCType(item.cType);
                        return h(
                            "el-col",
                            {
                                props: { span: item.col || cell }
                            },
                            [
                                controlRender[type](h, item, {
                                    change: changeData => {
                                        data[vName][rowIndex][
                                            changeData.$$key
                                        ] =
                                            changeData[vName];
                                    }
                                })
                            ]
                        );
                    });
                    return h("el-row", { style: { marginBottom: "10px" } }, [
                        h("el-col", { props: { span: 23 } }, [
                            h("el-row", { props: { gutter: 8 } }, renderColData)
                        ]),
                        buildVNode(
                            data.isDel === false || data[vName].length <= data.min,
                            h("span"),
                            h("el-col", { props: { span: 1 } }, [
                                h(
                                    "i",
                                    {
                                        class: { "el-icon-delete": true },
                                        style: {
                                            fontSize: "16px",
                                            color: "red"
                                        },
                                        on: {
                                            click: () => {
                                                data[vName].splice(rowIndex, 1);
                                                listeners.change(data);
                                            }
                                        }
                                    },
                                    []
                                )
                            ])
                        )
                    ]);
                });
            }
            return h("div", {}, [
                h("div", {}, renderRowData),
                h("div", {}, [
                    buildVNode(
                        data.isAdd === false || data[vName].length >= data.max,
                        h("span"),
                        h(
                            "el-button",
                            {
                                props: { type: "text" },
                                on: {
                                    click: () => {
                                        if (!Array.isArray(data[vName])) {
                                            data[vName] = [];
                                        }
                                        let modelKeys = Object.keys(data.model),
                                            newData = {};
                                        modelKeys.forEach(key => {
                                            newData[key] =
                                                data.model["default"] || "";
                                        });
                                        data[vName].push(newData);
                                        listeners.change(data);
                                    }
                                }
                            },
                            "添加"
                        )
                    ),
                    h(
                        "el-button",
                        {
                            props: { type: "info", size: "small" },
                            style: { float: "right" },
                            on: {
                                click: () => {
                                    listeners.change(data);
                                }
                            }
                        },
                        "同步"
                    )
                ])
            ]);
        },
        switch: "el-switch",
        checkbox: "el-checkbox",
        radio: "el-radio"
    },
    getCType = type => {
        if (typeof controlRender[type] !== "function") {
            type = "text";
        }
        return type;
    },
    vName = "$$value";

export default {
    functional: true,
    render: function(h, ctx) {
        let props = ctx.props,
            listeners = ctx.listeners,
            data = props.data,
            type = getCType(data.cType);
        return controlRender[type](h, data, listeners);

        // return h('div', {}, [h('za-hello', {props: {hello: 'hello world'}})])
    }
};

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
