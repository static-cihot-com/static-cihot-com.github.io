const fs = require('fs');
const cedicts = require('cedicts');

let txt = fs.readFileSync('../dict1.txt', 'utf8');
let arr = txt.trim().split('\n').map(e=>e.split('\t'));


// 对arr的a进行唯一
let result = new Map();
arr.forEach(([cn,tw])=>{
	cn = cn.trim();
	tw = tw.trim();

	let cnLength = cn.length;
	let twLength = tw.length;

	if(cnLength>0 && twLength>0) {
		result.set(cn, tw);
	}
})

arr = Array.from(result);
cedicts.dictionarySort(arr);
console.log(arr);
cedicts.save('sorted.txt', arr);

