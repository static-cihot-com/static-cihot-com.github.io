const fs = require('fs');
const path = require('path');
const assert  = require('assert');

const cedicts = require('cedicts');
const tscharsArray = require('tschars');

const { log } = console;

let datetime = '20200327';
let cedictSourceFilename = `cedict_ts_${datetime}.u8`;
let cedictMergedFilename = 'dict0.txt';

let fullCedictSourceFilename = path.join(__dirname, 'cedicts', cedictSourceFilename);
// let fullCedictMergedFilename = path.join(__dirname, '..', cedictMergedFilename);// 自动覆盖到上一层目录
let fullCedictMergedFilename = path.join(__dirname, cedictMergedFilename);// 不自动覆盖


log('- 指定最新下载的词库文件为', fullCedictSourceFilename);

try{
	let cedictSourceFileStat = fs.statSync(fullCedictSourceFilename);
	let cedictSourceFileDatetime = cedictSourceFileStat.mtime.getFullYear().toString()
		+ (cedictSourceFileStat.mtime.getMonth()+1).toString().padStart(2,'0')
		+ cedictSourceFileStat.mtime.getDate().toString().padStart(2, '0');
	if(cedictSourceFileDatetime !== datetime) {
		log('! 词库文件的更新日期为', cedictSourceFileDatetime);
		log('! 手动指定的文件日期为', datetime);
	}else{
		log('- 日期一致', datetime);
	}
}catch(err) {
	log('! 没有找到指定文件', fullCedictSourceFilename);
	process.exit();
}

log('- 指定导出文件为', fullCedictMergedFilename);


let cedictSource = fs.readFileSync(fullCedictSourceFilename, 'utf8');
// log('- 预览词库内容：', cedictSource.substr(0,100));

let cedictArray = cedicts.parse(cedictSource);
log(cedictArray.slice(0,5), '...', '( length:', cedictArray.length, ')');// [[繁体,简体],...]  ( length: 118134 )




// 检查单字是否有遗漏
let errors = [];
tscharsArray.forEach(to=>{
	let index;
	let b=cedictArray.some((co,i)=>{
		let result=to[0]===co[0];
		index=i
		return result;
	});
	if(!b) {
		errors.push(to);
	}
});
if(errors.length===0) {
	log('- 没有单字遗漏');
}else{
	let oldLength = cedictArray.length;
	cedictArray = cedictArray.concat(errors);
	let newLength = cedictArray.length;
	log(`- 有单字遗漏，进行补充。( length: ${oldLength} --> ${newLength})`);
}

let saveFileResult = cedicts.save(fullCedictMergedFilename, cedictArray);
log('- 文件保存为',fullCedictMergedFilename);
log('End')