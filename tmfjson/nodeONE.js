// nodejs
var { log, warn } = console;
const path = require('path');
const fs = require('fs');
const worker = require('./worker.js');


let term = [];
term = term.concat(readTextFile('./dict0.txt'));
term = term.concat(readTextFile('./dict1.txt'));
term = term.concat(readTextFile('./dictONE.txt'));
worker.setTerm(term);


// ------
// 读取文件
var dirname = require('./nodePath.js');
var filenames = fs.readdirSync(dirname);

filenames = filenames.filter(function (filename) {
	return /(?<!_+)\.txt$/.test(filename);
});


function read(path, n) {
	let ret = ''// 文本内容处理结果
	// log(path)    //filename
	var text = fs.readFileSync(path, { flag: 'r', encoding: 'ucs2' })
	// 内容按换行分为row
	text.split(/\r?\n/).forEach((row) => {
		let a = row.split('\t')
		if (a.some(e => e)) {
			if (a[1] && a[1].length) {
				a[1] = worker.toTW(a[1])// 仅对翻译内容进行繁体转换
			}
			ret += a.join('\t') + '\r\n'
		}
	})
	return ret;
}


filenames.forEach(function (filename, index) {
	let data = read(dirname + filename)
	// log(data)
	let name = dirname + filename.replace(/\.txt$/,'____.txt');
	fs.writeFileSync(name, data, {encoding:'ucs2'})
	// fs.writeFileSync(dirname + filename, data, { encoding: 'ucs2' })
	log('[done]', name);
})









// ---------------------
function readTextFile(path) {
	let text = fs.readFileSync(path, 'utf8');
	let result = new Map();
	// 问题：\r\n。文本文件的LF或CRLF换行，会导致程序编译错误。
	text.trim().split(/\r?\n/).forEach(row => {
		let [cn, tw] = row.split('\t');
		if (cn && tw) {
			let cnLength = cn.length;
			let twLength = tw.length;
			if (cnLength && twLength) {
				result.set(cn, tw);
			}
		}
	});
	result = Array.from(result);
	result = dictionarySort(result);
	result = dictionaryFilter(result);
	return result;
}

function dictionarySort(arr) {
	arr.sort((a, b) => {
		let al = a[0].length, bl = b[0].length;
		// 长度排序：长的在前
		// 文字排序：charCode小的在前
		return al > bl ? -1 : (al < bl ? 1 : (a[0] > b[0] ? 1 : (a[0] < b[0] ? -1 : 0)));
	});
	return arr;
}

function dictionaryFilter(arr) {
	return arr.filter(e => {
		if (!Array.isArray(e) || e.length !== 2) return false;
		let [a, b] = e;
		let al = a.length;
		let re = /[\x00-\xff]/;// ASCII代码0-255内字节
		if (al > 0) {
			if (a === b && al === 1 && re.test(a)) {
				return false;
			}
			return true;
		}
		return false;
	});
}

