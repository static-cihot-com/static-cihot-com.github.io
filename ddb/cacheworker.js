void function (undefined) {
	const { log } = console
	const cache = {}
	// let cacheurljs = function cacheurljs(url, callback) {
	// 	if (cache[url]) return callback(cache[url])

	// 	let q = new XMLHttpRequest()
	// 	q.open('get', url)// 'worker.js'
	// 	q.onload = ({ target: { responseText } }) => {
	// 		let code = responseText
	// 		let blob = new Blob([code], { type: 'text/javascript' })
	// 		let objectURL = URL.createObjectURL(blob)

	// 		cache[url] = { code, blob, objectURL }
	// 		callback(cache[url])
	// 	};
	// 	q.send(null)
	// };

	function isObject(o) {
		return o !== null && typeof o === 'object';
	}

	// 通过文件名和代码，创建并缓存为文件。
	function creator(name, code) {
		let blob = new Blob([code], { type: 'text/javascript' })
		let objectURL = URL.createObjectURL(blob)
		return cache[name] = { code, blob, objectURL }
	}

	// 请尽量使用function(){}而不是箭头函数。
	function cacheFn(name, fn) {
		let code
		let b = isObject(cache[name])
		if (b) {
			if (cache[name].code !== code) {
				creator(name, code)
			}
		} else {
			creator(name, code)
		}
		return cache[name]
	}

	function stringifyFunction(fn) {
		let code
		let fnType = typeof fn;
		if (fnType === 'string') {
			code = fn.trim()
		} else if (fnType === 'function') {
			code = fn.toString()
			if(code.indexOf('function')===0) {
				// function (){...}
				let start = code.indexOf('{')+1
				let end = code.lastIndexOf('}')
				code = code.slice(start, end).trim()
			} else {
				// ()=>{...}    or    ()=>...    or    e=>...
				let m = code.match(/^\s*([0-9A-Za-z\$_]|\(.+?\))\s*=>\s*\{?/u);
				let start = m[0].length;
				let length = code.length;
				let end = code.charCodeAt(length-1)===125 ? -1 : length;// }
				code = code.slice(start, end).trim()
			}
		}
	}
	return code


	function listen(k, w, f){
		if (typeof f === 'function') {
			if (k === 'message') {
				// message
				w.addEventListener(k, (e) => Reflect.apply(f, w, [e.data]))
			} else {
				// error | messageerror
				w.addEventListener(k, (e) => Reflect.apply(f, w, [e]))
			}
		} else if (Array.isArray(f)) {
			f.forEach((f) => {
				Reflect.apply(listen, w, [k, w, f])
			})
		}
	}

	function hand(w, handle){
		let type = typeof handle
		if(handle!==null && type === 'object') {
			Object.keys(handle).forEach(k=>{
				// onmessage(MessageEvent)
				// onerror(ErrorEvent)
				// onmessageerror(MessageErrorEvent)
				if(/^(on)?(message|error|messageerror)$/.test(k)){
					if(/^on/.test(k)) k = k.slice(2)
					let f = handle[k]
					listen(k, w, f)
				}
			})
		}else if(type==='function') {
			w.addEventListener('message', (e) => Reflect.apply(handle, w, [e.data]))
		}
	}

	function cacheWorker(name, fn, handle) {
		let recreate
		if(isObject(handle)) {
			recreate = handle.recreate
		}
		let cache = cacheFn(name, fn, recreate)
		let w = new Worker(cache.objectURL, {name})
		if(!handle) {
			handle = fn
		}
		hand(w,handle)
		return w
	}

	// cacheWorker.cache = cache
	// cacheWorker.cacheFn = cacheFn
	
	Object.defineProperty(cacheWorker, 'cache', { value: cache, enumerable:true });
	window.cacheWorker = cacheWorker;
}()

/* 
let w1 = cacheWorker('w1', function () {
	postMessage(123123123)
	// postMessage(()=>{})
	// throw new Error('e')
	onmessage = function({data:e}){
		console.log(name, e)
		// close()
	}
}, {
	message(e){
		log(e)
	},
	error(e){
		log('error', e)
	},
	messageerror(e){
		log('merr', e)
	}
})
w1.postMessage('lalala..')


let w2 = cacheWorker('w2', 'onmessage=({data})=>{console.log(name, data)}')
w2.postMessage('hahaha!!')
// w2.terminate()// 这里比postMessage要快
*/