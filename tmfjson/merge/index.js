//const fs = require('fs')
//const path = require('path')


//let dirname = require('./nodePath.js')
//dirname = path.join(dirname, 'ZHO')
//let files = fs.readdirSync(dirname)


//let result = []
//files.forEach(filename=>{
//	if(!/\.txt$/.test(filename)) return 

//	let file = path.join(dirname, filename)
//	let text = fs.readFileSync(file, {encoding:'ucs2'})

//	let data = text.split(/\r?\n/)
//	data = data.map(e=>e.split(/\t/))
//	data = data.filter(e=>e.length===7)
//	data = data.map(e=>[e[5],e[1]])
//	//console.log(file, data.join('\n'))

//	result = result.concat(data)
//})


//let name = path.join(dirname, 'total__.txt')
//result = result.map(e=>e.join('\t')).join('\n')
////console.log(result)
//fs.writeFileSync(name, result, {encoding:'utf8'})
//console.log(name, 'end')



//window.addEventListener('dragover', onDragover, { passive:false, capture:true })
//window.addEventListener('drop', onDrop)


//function onDragover(ev){
//	ev.preventDefault()
//	console.log(ev)
//}
//function onDrop(ev){
//	console.log(ev)
//}

window.dragged = null
window.dragzones = [
	{
		dragged:'item',
		dropped: ['dropzone'],
		doit: function(x,y){
			console.log('doit', x, y)
		}
	}
]
function validDrag(element) {
	if(!(element instanceof HTMLElement)) return false
	for(let i=0, len=dragzones.length; i<len; i++) {
		let { dragged:k }  = dragzones[i]
		if(element.classList.contains(k)) {
			return true
		}
	}
	return false
}
function validDrop(element) {
	if(!(element instanceof HTMLElement)) return false
	for(let i=0, len=dragzones.length; i<len; i++){
		let { dragged:k, dropped:v }  = dragzones[i]
		if(dragged.classList.contains(k)) {
			if(v.some(k=>element.classList.contains(k))) {
				return true
			}
		}
	}
	return false
}
function getZones(element) {
	if(!(element instanceof HTMLElement)) return false
	for(let i=0, len=dragzones.length; i<len; i++) {
		let { dragged:k }  = dragzones[i]
		if(element.classList.contains(k)) {
			return true
		}
	}
}
/* 可拖动的目标元素会触发事件 */
document.addEventListener('dragstart', function (event) {
	let { type, target, dataTransfer } = event

	if (!validDrag(target)) {
		console.log('规则中没有就不要拖拽!')
		return event.preventDefault()
	}

	dragged = target
	dataTransfer.setData('text', '你好')
	console.log(type, target.className)
}, true)


document.addEventListener('drag', function (event) {
	//event.preventDefault()
	//let { type, target, dataTransfer } = event
	//dataTransfer.setData('text','无法修改数据')
	//let data = dataTransfer.getData('text')
	//console.log(event.type, event.target.className, data)
}, true)


document.addEventListener('dragover', function (event) {
	event.preventDefault()
	let { type, target } = event
	if (target.classList.contains('copy')) {
		event.dataTransfer.dropEffect = 'copy'
	} else if(target.classList.contains('dropzone')){
		event.dataTransfer.dropEffect = 'move'
	}else{
		event.dataTransfer.dropEffect = 'none'
	}
	console.log(type, target.className)
}, true)


document.addEventListener('dragenter', function (event) {
	let { type, target } = event
	target.style.filter = 'drop-shadow(2px 4px 6px black)'
	//console.log(type, target.className)
}, true)


document.addEventListener('dragleave', function (event) {
	let { type, target } = event
	target.style.filter = ''
	console.log(type, target.nodeName, target.className)
}, true)


document.addEventListener('drop', function (event) {
	event.preventDefault()
	let { type, target, dataTransfer } = event
	//target   是dropzone
	//dataTransfer   可以传递数据
	let dragzone = new Set()
	dragged.classList.forEach((k) => {
		let zones = dragzones[k]
		if (Array.isArray(zones)) {
			zones.forEach(_ => dragzone.add(_))
		}
	})
	let has = false
	for (let i = 0, s = target.classList, len = s.length; i < len; i++) {
		let v = s[i]
		if (dragzone.has(v)) {
			target.style.filter = ''
			has = true
			doit()
			break
		}
	}
	if (!has) {
		console.log('无法拖放!')
	}
	function doit() {
		if (target.classList.contains('copy')) {
			dragged = dragged.cloneNode(true)
		}
		target.appendChild(dragged)
	}
	console.log(type, target.className, dataTransfer.getData('text'))
}, true)


document.addEventListener('dragend', function (event) {
	let { type, target } = event
	let { classList } = target
	//target   是item
	console.log(type, className)
}, true)




//document.addEventListener('dragstart', function (event) {
//	//event.preventDefault()
//	dragged = event.target
//	console.log(event.type, event.target.className)
//}, false)
//document.addEventListener('drag', function (event) {
//	event.preventDefault()
//	//console.log(event.type, event.target.className)
//}, false)
//document.addEventListener('dragover', function (event) {
//	event.preventDefault()
//	event.dataTransfer.dropEffect = 'none'
//	//console.log(event.type, event.target.className)
//}, false)
//document.addEventListener('dragenter', function (event) {
//	console.log(event.type, event.target.className, event.dataTransfer.dropEffect, event)
//}, false)
//document.addEventListener('dragleave', function (event) {
//	console.log(event.type, event.target.className)
//}, false)
//document.addEventListener('drop', function (event) {
//	event.preventDefault()
//	if (event.target.className == 'dropzone') {
//		//dragged.parentNode.removeChild(dragged)
//		event.target.appendChild(dragged)
//	}
//	console.log(event.type, event.target.className, event.dataTransfer.dropEffect)
//}, false)
//document.addEventListener('dragend', function (event) {
//	console.log(event.type, event.target.className)
//	event.preventDefault()
//}, false)

