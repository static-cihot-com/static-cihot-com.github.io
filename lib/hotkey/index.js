const { log, warn, error } = console
let ui = {
	keydownHotkey: document.querySelector('#app .keydownHotkey'),
	keypressHotkey: document.querySelector('#app .keypressHotkey'),
	keyupHotkey: document.querySelector('#app .keyupHotkey'),
}

let ignores = new Set()
ignores.add('f5', 'f12', 'ctrl+shift+i', 'ctrl+shift+j')

window.addEventListener('keydown', showHotkey)
window.addEventListener('keypress', showHotkey)
window.addEventListener('keyup', showHotkey)


function showHotkey(e) {
	let _key = hotkey(e)

	let { type, keyCode, which, key, code, location, detail, repeat } = e

	if(type==='keypress') {
		console.log({_key, keyCode, which,key, code})
	}

	
	// 触发默认事件（刷新页面，打开开发者工具）
	// if(!ignores.has(key)) e.preventDefault()

	ui[e.type+'Hotkey'].innerHTML = `${_key}(${keyCode})-code:${code}`
}

let codes = {}
window.addEventListener('keydown', (e)=>{
	codes[e.code] = hotkey(e)
	e.preventDefault()
})
/*
PrintScreen
AltRight
ControlRight
ShiftRight
*/