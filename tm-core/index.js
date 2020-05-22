import { } from './verbatim.js';




//ui
let target = document.querySelector('#target');
let source = document.querySelector('#source');
let preview = document.querySelector('#preview');

source.textContent = '연속 연속속 사격';
source.addEventListener('input',printTransferResult);





//core
let verbatim = new Verbatim();
verbatim.setActions([
	['연속', function (v) { return `★♥${v}★`; }],
	['연속속', function (v) { return `♥${v}♥`; }],
	[/\w+/, function (v) { return {className:'word', text:v }; }],
]);





function printTransferResult(){
	let data = verbatim.transfer(source.textContent);

	//target
	target.textContent = JSON.stringify(data, null, 4);
	//preview

	preview.textContent = '';
	data.forEach(e=>{
		if(typeof e==='string') {
			e = document.createTextNode(e);
		}else{
			let { className, text } = e;
			e = document.createElement('span');
			e.className = className;
			e.textContent = text;
		}
		preview.appendChild(e);
	});
}


printTransferResult();


console.log(verbatim.actions);


