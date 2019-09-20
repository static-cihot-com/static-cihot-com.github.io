void async function () {
	const TYPE_JS = 'text/javascript'
	const TYPE_CSS = 'text/css'
	const filenameToType = function (filename) {
		if (/\.js$/.test(filename)) {
			return TYPE_JS
		} else if (/\.css$/.test(filename)) {
			return TYPE_CSS
		}
	}
	let res = await fetch('index.json')
	let json = await res.json()
	let blob
	for (let i = 0, len = json.length; i < len; i++) {
		let { filename, cache } = json[i]
		let type = filenameToType(filename)
		if (cache) {
			let code = localStorage.getItem(filename)
			if (code === null) {
				let res = await fetch(filename, { mode: 'no-cors', redirect: 'error', info: false })
				code = await res.text()
				localStorage.setItem(filename, code)
			}
			blob = new Blob([code], { type })
		} else {
			let res = await fetch(filename)
			blob = await res.blob()
			localStorage.removeItem(filename)
		}
		let url = URL.createObjectURL(blob)
		if (type === TYPE_JS) {
			let e = document.createElement('script')
			e.setAttribute('type', TYPE_JS)
			e.setAttribute('src', url)
			document.head.appendChild(e)
		} else if (type === TYPE_CSS) {
			let e = document.createElement('link')
			e.setAttribute('type', TYPE_CSS)
			e.setAttribute('rel', 'stylesheet')
			e.setAttribute('href', url)
			document.head.appendChild(e)
		}
	}
}()