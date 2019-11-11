const { log, warn, error, debug } = console


window.onmouseover = function () {
	tag = document.getElementById('app')

	let o = etoo(tag)
	log(o)
	log(JSON.stringify(o, null, 2))
}