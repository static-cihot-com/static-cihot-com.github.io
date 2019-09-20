function _(tagName) {
	return document.createElement(tagName)
}
function $(query) {
	return document.querySelector(query)
}
function $$(query) {
	return document.querySelectorAll(query)
}
function randStr(len = 8) {
	let ret = ''
	while (len-- > 0) {
		let start = '가'.charCodeAt(0)
		let end = '힣'.charCodeAt(0)
		let min = Math.min(start, end)
		let max = Math.max(start, end)
		let num = min + Math.ceil((max - min) * Math.random())
		ret += String.fromCharCode(num)
	}
	return ret
}

function checkVisible(elem, parent) {
	let itemRect = elem.getBoundingClientRect();
	let boxRect = parent.getBoundingClientRect()
	return !(itemRect.bottom < 0 || itemRect.top - boxRect.Height >= 0)
}