const IS_NODEJS = typeof module === 'object'

let term = []
let headers = []
let strTotalLength = 0
// term = term.trim().split('\n').map(e => e.split('\t'));
// term = term.filter(e => Array.isArray(e) && (typeof e[0] === 'string' && e[0].length > 0) && (typeof e[1] === 'string' && e[1].length > 0))

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

			//不容错过  不從錯過
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


self.addEventListener('message', function (d) {
	let { data } = d
	let [sourceText, termArray] = data
	//console.log(termArray.slice(0, 10).join('\n') + '...')
	if (Array.isArray(data) && data.length == 2 && Array.isArray(termArray)) {
		term = termArray
		let result = transfer(sourceText, termArray)
		console.log(sourceText, result)
		self.postMessage(result)
	} else {
		console.warn('错误')
		self.close()
	}
})

