// 简繁体转换

/*

步骤1：根据特定游戏简繁体词库进行转换操作。
步骤2：根据公用简繁体词库进行转换操作。


字符串逐一转换操作。
xxxxxxxxxxx(词o，转换)xxxxxxxx(词x，保留)，
* 搜索采用indexOf(xxxx, index)
直到最后结合。

*/


const fs=require('fs');
let maxLength=0;

let publicDictionary=fs.readFileSync('public.txt','utf8');
publicDictionary=convertDictionary(publicDictionary);

function dictionarySort(arr) {
	arr.sort((a,b)=>{
		let al=a[0].length, bl=b[0].length;
		return al>bl ? -1 : (al<bl? 1 : (a[0]>b[0]?-1:(a[0]<b[0]?1:0)));
	});
	return arr;
}

function getMaxLength(arr){
	arr.forEach(e=>{
		maxLength=Math.max(e.length, maxLength);
	});
	return maxLength;
}

let professionalDictionary=fs.readFileSync('professional.txt','utf8');
professionalDictionary=convertDictionary(professionalDictionary);


function convertDictionary(str){
	let res;
	if(str.length>3&&str.indexOf('\t')){
		res=str.split('\n').map(e=>{
			let pair=e.split('\t').filter(e=>e);
			let s,t;
			s=pair[0];
			t=pair[1];
			return s&&t ? [s,t] :null;
		}).filter(e=>e);
	}else{
		res=[];
	}
	return res;
}

dictionarySort(professionalDictionary);
dictionarySort(publicDictionary);


getMaxLength(publicDictionary);
getMaxLength(professionalDictionary);



let dictionary=[].concat(professionalDictionary,publicDictionary);


function convert(source,dictionary,reverse=false){
	let startIndex = 0;
	let length = source.length;
	let result = '';
	let b=false;

	while(startIndex<length){
		dictionary.some(pair=>{
			let s,t;
			if(reverse){
				s=pair[1];
				t=pair[0];
			}else{
				s=pair[0];
				t=pair[1]
			}
			b=source.indexOf(s,startIndex)===startIndex;
			if(b){
				// 找到词库中的匹配内容时，startIndex需要增加为内容长度，而不是普通的加1字长度
				result+=t;
				startIndex+=s.length;
			}
			return b;
		});
		if(!b){
			result+=source.substr(startIndex,1);
			startIndex+=1;
		}
	}
	return result;
}



// 简体转换
// let source='黄金贵宾不是贵宾，游泳不是游戏。';
// source为简体
// let res=convert(source, dictionary);
// console.log(res);



let path = require('path');
let dirPath = 'files';
let dir = fs.readdirSync(dirPath);

dir.forEach(file=>{
	if(/^convert/.test(file)) return console.log('跳过文件'+file);

	let filePath=path.join(dirPath, file);
	let s=fs.statSync(filePath);
	if(s.isFile()){
		let source=fs.readFileSync(filePath,'utf8');
		fs.writeFileSync(path.join(dirPath, 'convert.'+file),convert(source,dictionary,true),'utf8');
		console.log('[ok]',filePath);
	}
});