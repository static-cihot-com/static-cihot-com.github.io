function load(uri, type) {
	return new Promise(function (resolve) {
		let req = new XMLHttpRequest()
		req.open('GET', uri, true)
		if (type && typeof type === 'string') {
			req.responseType = type
		}
		req.addEventListener('load', function (evt) {
			resolve([null, evt.target.response, evt])
		})
		req.addEventListener('error', function (evt) {
			resolve([evt.message, null, evt])
		})
		req.send()
	})
}
// 可直接使用fetch