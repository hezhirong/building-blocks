import Vue from "vue";
import moment from "moment";
const _event = new Vue();
const storage = (isSession = false) => {
    let _win = window;
    let name = isSession ? "sessionStorage" : "localStorage";
    let prefix = "building-blocks";
    const formatKey = key => {
        return `${prefix}_${key}`;
    };
    return {
        get(key, isParseJson = false) {
            if (!key) {
                throw new Error("请输入key");
            }
            let val = _win[name].getItem(formatKey(key));
            if (isParseJson) {
                try {
                    return JSON.parse(val);
                } catch (e) {
                    throw new Error(e);
                }
            }
            return val;
        },
        set(key, val) {
            if (!key) {
                throw new Error("session storage error 请输入key");
            }
            if (typeof val !== "string") {
                val = JSON.stringify(val);
            }
            _win[name].setItem(formatKey(key), val);
        },
        remove(key) {
            if (!key) {
                throw new Error("请输入key");
            }
            _win[name].removeItem(formatKey(key));
        },
        clear() {
            _win[name].clear();
        }
    };
};
const _loop = (data, id, callback, name = "key") => {
    data.forEach((item, index, arr) => {
        if (item[name] === id) {
            return callback(item, index, arr);
        } else if (id === null) {
            callback(item, index, arr);
        }
        if (item.slots) {
            return _loop(item.slots, id, callback, name);
        }
    });
};
const convert = (str) => {
	return str.replace(/\-(\w)/g, function(all, letter){
		return letter.toUpperCase()
	}).trim();
}

export const Event = {
    emit: (key, value) => {
        _event.$emit(key, value);
    },
    on: (key, func) => {
        _event.$on(key, func);
    }
};
export const PostMessage = (type, data, isFrame) => {
    data = { type, ...data };
    let msg = JSON.stringify(data, function(key, val) {
        if (typeof val === "function") {
            return val + "";
        }
        return val;
    });
    if (isFrame) {
        window.frames[0].postMessage(msg, "*");
    } else {
        window.parent.postMessage(msg, "*");
    }
};

export const sStorage = storage(true);
export const lStorage = storage();
export const deepCopy = data => {
    return JSON.parse(JSON.stringify(data));
};
export const dateUtil = {
    format(value, formatStr = "YYYY-MM-DD HH:mm:ss") {
        if (formatStr === "date") {
            formatStr = "YYYY-MM-DD";
        } else if (formatStr === "time") {
            formatStr = "HH:mm:ss";
        }
        let date = moment(value);
        if (date.isValid()) {
            return date.format(formatStr);
        } else {
            return "";
        }
    },
    create(date) {
        return moment(date);
    }
};

export const loop = _loop;

// 组件通用的样式
export const commonComponentStyle = () => [
    { label: "宽", propName: "width", cType: "text", default: "100%" },
    { label: "高", propName: "height", cType: "text", default: "auto" },
    { label: "字体颜色", propName: "color", cType: "text" },
    { label: "字体大小", propName: "fontSize", cType: "text" },
    { label: "行高", propName: "lineHeight", cType: "text" },
    { label: "内边距", propName: "padding", cType: "text", default: "0" },
    { label: "外边距", propName: "margin", cType: "text", default: "0" },
    { label: "边框", propName: "border", cType: "text", default: "none" },
    { label: "圆角", propName: "borderRadius", cType: "text", default: "none" },
    { label: "背景颜色", propName: "backgroundColor", cType: "text" },
    { label: "背景地址", propName: "backgroundImage", cType: "text" },
    {
        label: "重复",
        propName: "backgroundRepeat",
        cType: "select",
        options: ["no-repeat", "repeat"]
    },
    {
        label: "背景尺寸",
        propName: "backgroundSize",
        cType: "select",
        options: ["100%", "contain", "cover"]
    },
    {
        label: "定位",
        propName: "position",
        cType: "select",
        options: ["static", "relative", "absolute", "fixed"]
    },
    { label: "左边", propName: "left", cType: "text" },
    { label: "上边", propName: "top", cType: "text" }
];

// 常量
export const ENUM = {
    ss: {
        PRODUCT: 'PRODUCT',
        TOKEN: 'TOKEN'
    }
}
// formatStyle
export const cssText2Obj = el => {
    let styles = {},
		styleStr = el.style.cssText;
	styleStr.split(';').forEach( 
		item => {
			let arr = item.split(':');
			if (arr[0] && arr[1]) {
				styles[convert(arr[0])] = arr.slice(1).join(":").trim()
			}
		} 
	)
	return styles;
}