const { log, warn, error } = console
let ui = {
	key: document.querySelector('#app .hotkey'),
	history: document.querySelector('#app .history'),
	status: document.querySelector('#app .status'),
	combos: document.querySelector('#app .combos'),
	action: document.querySelector('#app .action'),
}


let history = new hotkey.History({length:30})
let ignores = new Set(['f5', 'f12', 'ctrl+shift+i', 'ctrl+shift+j'])
window.addEventListener('keydown', showHotkey)
window.addEventListener('keyup', showHotkey)


function showHotkey(e) {
	let key = hotkey(event)
	
	// 触发默认事件（刷新页面，打开开发者工具）
	if(!ignores.has(key)) e.preventDefault()
	
	let { type, timeStamp } = e
	history.add({key, type, timeStamp })

	flushUIHistory()
	// flushUIStatus()
	// flushUICombos()
}



function flushUIHistory(){
	ui.history.innerHTML = ''
	history.forEach((e, i) => {
		let el = document.createElement('li')
		// let { type, key, time } = e
		// if (type === 'keydown') type = '↓'
		// if (type === 'keyup') type = '↑'
		// let date = new Date(time)
		// el.innerHTML = `<b>${key}</b> ${type} (${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}})`
		el.innerText = JSON.stringify(e)
		ui.history.appendChild(el)
	})
}

class UI {
	constructor(selector) {
		let elements = document.querySelectorAll(selector)
		if(elements.length === 0) throw new RangeError(`Cannot find elements using selector: ${selector}`)
		this.elements = elements
	}
}





// function flushUIStatus(){
// 	ui.status.innerHTML = ''
// 	for (let k in hr.status) {
// 		let v = hr.status[k]
// 		let e = document.createElement('li')
// 		e.innerHTML = `<b>${k}</b>(${v})`
// 		ui.status.appendChild(e)
// 	}
// }

// function flushUICombos() {
// 	ui.combos.innerHTML = ''
// 	hr.combos.forEach((t, i) => {
// 		let e = document.createElement('li')
// 		e.innerHTML = Array.from(i).map(k=>`<b>${k}</b>`).join() + ` (${t})`
// 		ui.combos.appendChild(e)
// 	})
// 	ui.action.textContent = hr.action
// }
