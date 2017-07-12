import Vue from 'vue'
import moment from 'moment';
const _event = new Vue()
const storage = (isSession = false) => {
	let _win = window;
	let name = isSession ? 'sessionStorage': 'localStorage';
	let prefix = 'building-blocks';
	const formatKey = (key) => {
		return `${prefix}_${key}`
	}
	return {
		get(key, isParseJson = false) {
			if (!key) {
				throw new Error('请输入key')
			}
			let val =  _win[name].getItem(formatKey(key));
			if (isParseJson) {
				try {
					return JSON.parse(val)
				} catch(e) {
					throw new Error(e);
				}
			}
			return val
		},
		set(key, val) {
			if (!key) {
				throw new Error('请输入key')
			}
			if (typeof val !== 'string') {
				val = JSON.stringify(val)
			}
			_win[name].setItem(formatKey(key), val);
		},
		remove(key) {
			if (!key) {
				throw new Error('请输入key')
			}
			_win[name].removeItem(formatKey(key));
		},
		clear() {
			_win[name].clear();
		}
	}
}
const _loop = (data, id, callback, name="key") => {
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
}
export const Event = {
	emit: (key, value) => {
		_event.$emit(key, value)
	},
	on: (key, func) => {
		_event.$on(key, func)
	}
}
export const PostMessage = (type, data, isFrame) => {
	data = {type, ...data};
	let msg = JSON.stringify(data, function(key, val) {
		if (typeof val === 'function') {
			return val + '';
		}
		return val;
	})
	if (isFrame) {
		window.frames[0].postMessage(msg, '*');
	} else {
		window.parent.postMessage(msg, '*')
	}
}

export const sStorage = storage(true);
export const lStorage = storage();
export const deepCopy = (data) => {
	return JSON.parse(JSON.stringify(data))
}
export const dateUtil = {
    format(value, formatStr='YYYY-MM-DD HH:mm:ss') {
        if (formatStr === "date") {
            formatStr = 'YYYY-MM-DD';
        } else if (formatStr === "time") {
            formatStr = 'HH:mm:ss';
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
    },
};

export const loop = _loop;