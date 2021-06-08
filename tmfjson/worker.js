const IS_NODEJS = typeof module === 'object'

let term = []
let headers = []
let strTotalLength = 0
// term = term.trim().split('\n').map(e => e.split('\t'));
// term = term.filter(e => Array.isArray(e) && (typeof e[0] === 'string' && e[0].length > 0) && (typeof e[1] === 'string' && e[1].length > 0))

function one(str) {
	//console.count('a')
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
		if (IS_NODEJS) {
			// console.log(str.length);
		} else {
			self.postMessage(str.length)
		}
	}
	return ret
}
let toCN = (jianti = function (str) {
	return transfer(str, true)
})
let toTW = (fanti = function (str) {
	return transfer(str, false)
})

if (IS_NODEJS) {
	// nodejs
	module.exports = {
		toCN,
		toTW,
		one,
		transfer,
		setTerm(arr) {
			if (!Array.isArray(arr)) throw new TypeError(arr)
			term = arr
		},
	}
} else {
	self.addEventListener('message', function (d) {
		let { data } = d
		let [sourceText, termArray] = data

		//console.log(termArray.slice(0, 10).join('\n') + '...')

		if (Array.isArray(data) && data.length == 2 && Array.isArray(termArray)) {
			term = data[1]
			let result = transfer.apply(null, data)
			self.postMessage(result)
		} else {
			console.warn('错误')
		}
	})
}
