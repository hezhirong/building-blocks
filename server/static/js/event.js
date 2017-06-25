import Vue from 'vue'

var event = new Vue()
export default {
	emit: (key, value) => {
		event.$emit(key, value)
	},
	on: (key, func) => {
		event.$on(key, func)
	}
}