Promise.all([
	readTextFile('./dict0.txt'),
	readTextFile('./dict1.txt'),
]).then((dicts) => {

	let totalFiles = []
	let dict = ([]).concat(...dicts)
	console.log('ditc:', dict.length)

	let twToCnTranslationWorker = new TranslationWorker('worker.js')
	twToCnTranslationWorker.send({ dict, type: 'tw->cn' }, console.log)


	let vm = new Vue({
		el: '#app',
		data: function () {
			return {
				version: 2021.0608,
				isReady: false,
				isReadyDict: false,
				appClass: { container: true, 'conatiner-xxl': true },
				files: [],
			}
		},
		computed: {
			appClassC() {
				let { appClass } = this
				let result = []
				for (let name in appClass) {
					let value = appClass[name]
					if (value) result.push(name)
				}
				return result.join(' ')
			}
		},

		methods: {
			onDropFile(event) {
				if (event.type !== 'drop') return;
				let vm = this
				let { dataTransfer: { files, items } } = event
				for (let i = 0, { length } = files; i < length; i++) {
					let file = files.item(i)
					totalFiles.push(file)

					readfile(file)
						.then((text) => {

							let el = document.createElement('div')
							el.appendChild(document.querySelector('#file-fjson').cloneNode(true))
							document.querySelector('#files').appendChild(el)
							let vm = new Vue({
								el,
								data: {
									file,
									max: 1,
									value: 0
								},
								created() {
									let vm = this
									file.refs = makeRefs(text)
									vm.max = file.refs.length
									vm.value = 0
									file.text = text
									file.refsNew = []

									file.refs.forEach((e, i, a) => {
										let { text, start, end } = e
										twToCnTranslationWorker.send(text, (result) => {
											file.refsNew[i] = {
												text: result.data,
												start,
												end,
											}

											vm.value++
											if (vm.max == vm.value) {
												file.textNew = makeStr(file.text, file.refsNew)
												console.log('end', file)
											}
										})
									})
								}
							})


						})
						.catch(function (d) {
							console.error(d)
						})
				}
			},

			onClickDownload() {
				totalFiles.forEach((file)=>{
					downloadFile(file.name.replace(/zh(o?)-TW/,'zh$1-CN'), file.textNew)
				})
				console.log(totalFiles)
			},
		},
	})


	window.vm = vm
})



async function readTextFile(path) {
	return await fetch(path)
		.then((res) => res.text())
		.then((text) => {
			let result = []
			// \r\n 这个问题。文本文件的LF或CRLF换行导致程序错误。
			text
				.trim()
				.split(/\r?\n/)
				.forEach((row) => {
					let [cn, tw] = row.split('\t')
					if (cn && tw) {
						let cnLength = cn.length
						let twLength = tw.length
						if (cnLength && twLength) {
							result.push([cn, tw])
						}
					}
				})
			//console.log(result.filter(e=>e.some(v=>/II/.test(v))))
			return result
		})
}






//function toCN(text, onmessage) {
//	let worker = new Worker('./worker.js')
//	worker.addEventListener('message', function (e) {
//		let { data } = e
//		//data 剩余字符串长度或转换结果字符串
//		onmessage(data)
//	})
//	let term = resetTermForTWKey()
//	worker.postMessage([text, term])
//	return worker
//}

//function toTW(text, onmessage) {
//	let worker = new Worker('./worker.js')
//	worker.addEventListener('message', function (e) {
//		let { data } = e
//		onmessage(data)
//	})
//	let term = resetTermForCNKey()
//	worker.postMessage([text, term])
//	return worker
//}


function readfile(file) {
	return new Promise(function (resolve, reject) {
		let o = new FileReader()
		o.readAsText(file, 'utf8')
		o.onload = function (e) {
			resolve(e.target.result)
		}
		o.onabort = o.onerror = function (e) {
			reject(e.message)
		}
	})
}

function makeRefs(d) {
	let regexp = /(?<=‟target‟: ‟ΣΣΣβ\t)([\s\S])*?(?=\tβΣΣΣ‟,βγ)/g

	let refs = []
	let m
	while (m = regexp.exec(d)) {
		let start = m.index
		let text = m[0]
		let end = start + text.length
		refs.push({ text, start, end })
	}
	return refs
}

function makeStr(d, refs) {
	let rs = refs.reduceRight((r, e, i) => {
		let { text, start, end } = e
		text = `【${e.text}】`

		r.result = text + r.input.slice(end) + r.result
		r.input = r.input.slice(0, start)

		if (i === 0) {
			r.result = r.input + r.result
		}

		console.log(i, r)

		return r
	}, { result: '', input: d })
	return rs.result
}


function downloadFile(filename, content) {
	let a = document.createElement('a')
	let blob
	if(content instanceof Blob) {
		blob = content
	}else{
		blob = new Blob([content])
	}
	let url = window.URL.createObjectURL(blob)
	a.href = url
	a.download = filename
	a.click()
	setTimeout(() => window.URL.revokeObjectURL(url), 100)
}

//let cnToTwTranslationWorker = new TranslationWorker('worker.js')
//cnToTwTranslationWorker.send(resetTermForTWKey())