const fs = require('fs');
const path = require('path');


let dirname = require('./nodePath.js');
//dirname = path.join(dirname, 'ZHO');
let files = fs.readdirSync(dirname);


let result = [];
files.forEach(filename=>{
	if(!/\.txt$/.test(filename)) return ;

	let file = path.join(dirname, filename);
	let text = fs.readFileSync(file, {encoding:'ucs2'});

	let data = text.split(/\r?\n/);
	data = data.map(e=>e.split(/\t/));
	data = data.filter(e=>e.length===7);
	data = data.map(e=>[e[5],e[1]]);
	//console.log(file, data.join('\n'));

	result = result.concat(data);
});


let name = path.join(dirname, 'total__.txt');
result = result.map(e=>e.join('\t')).join('\n');
//console.log(result);
fs.writeFileSync(name, result, {encoding:'utf8'});
console.log(name, 'end');

