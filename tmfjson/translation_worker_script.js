let term = {}
let strTotalLength = 0
// term = term.trim().split('\n').map(e => e.split('\t'));
// term = term.filter(e => Array.isArray(e) && (typeof e[0] === 'string' && e[0].length > 0) && (typeof e[1] === 'string' && e[1].length > 0))

function resetTermForCNKey(dict) {
	let term = {}
	dict.forEach(([cn, tw]) => term[cn] = tw)
	term = Object.entries(term)
	term = dictionarySort(term)
	term = dictionaryFilter(term)
	return term
}

function resetTermForTWKey(dict) {
	let term = {}
	dict.forEach(([cn, tw]) => term[tw] = cn)
	term = Object.entries(term)
	term = dictionarySort(term)
	term = dictionaryFilter(term)
	return term
}

function dictionarySort(arr) {
	arr.sort((a, b) => {
		let al = a[0].length,
			bl = b[0].length
		// 长度排序：长的在前
		// 文字排序：charCode小的在前
		return al > bl ? -1 : al < bl ? 1 : a[0] > b[0] ? 1 : a[0] < b[0] ? -1 : 0
	})
	return arr
}

function dictionaryFilter(arr) {
	return arr.filter((e) => {
		if (!Array.isArray(e) || e.length !== 2) {
			return false
		}
		let [a, b] = e
		let al = a.length
		if (al > 0) {
			//if (a === b && al === 1 && /[\x00-\xff]/.test(a)) {
			if (a === b && al === 1) {
				return false
			}
			return true
		}
		return false
	})
}

function one(str) {
	let ret, a, b, cntw
	for (let row of term) {
		a = row[0]
		b = row[1]
		// let index = str.indexOf(a);
		// if (index === 0) {
		// 	cntw = row;
		// 	ret += b;
		// 	break
		// }
		if (a === str.substr(0, a.length)) {
			cntw = row
			ret += b
			break
		}
	}
	if (cntw) {
		ret = b
		str = str.slice(a.length)
	} else {
		ret = str.slice(0, 1)
		str = str.slice(1)
	}
	return { ret, str }
}
function transfer(str) {
	let ret = ''
	while (str.length) {
		let o = one(str)
		//console.log(o);
		str = o.str
		ret += o.ret

		// let percent = Math.floor(100*str.length/strTotalLength);
		// if(!(percent in s)) {
		// 	s[percent] = true;
		// 	self.postMessage(str.length+percent/100);
		// }

		//广播进度（剩余字符串数量）
		//	self.postMessage(str.length)
	}
	return ret
}


self.addEventListener('message', function (event) {
	let { data } = event
	let dataType = typeof data

	if (dataType === 'object') {
		let { id, data: d } = data

		if (typeof id === 'number') {
			if (typeof d === 'string') {
				let data
				let ok
				try {
					data = transfer(d)
					ok = true
				} catch (err) {
					data = ''
					ok = false
				}
				self.postMessage({ id, ok, data })

			} else if (typeof d === 'object') {
				
				let { type, dict } = d
				if (Array.isArray(dict)) {
					if (type === 'cn->tw') {
						term = resetTermForCNKey(dict)
						self.postMessage({
							id,
							ok: true,
							data: { type }
						})
					} else if (type === 'tw->cn') {
						term = resetTermForTWKey(dict)
						self.postMessage({
							id,
							ok: true,
							data: { type: type }
						})

					} else {
						self.postMessage({
							id,
							ok: false,
							data: { type: type }
						})
					}

				}
			} else {
				console.warn(dataType, data)
			}
		} else {
			console.warn(dataType, data)
		}
	}

	//if(dataType === 'string') {
	//	//문자는 번역하고
	//}else if(dataType==='object') {

	//}

	//let [sourceText, termArray] = data
	////console.log(termArray.slice(0, 10).join('\n') + '...')
	//if (Array.isArray(data) && data.length == 2 && Array.isArray(termArray)) {
	//	term = termArray
	//	let result = transfer(sourceText, termArray)
	//	console.log(sourceText, result)
	//	self.postMessage(result)
	//} else {
	//	console.warn('错误')
	//	self.close()
	//}
})

