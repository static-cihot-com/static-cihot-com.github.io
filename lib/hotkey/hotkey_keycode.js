void function (g){
	let keyCodes = {
		0: '2',// @keypresss
		1: 'a',//  @keypresss
		3: 'pause',
		5: 'e',//  @keypresss
		6: 'f',// - @keypresss
		8: 'back',
		9: 'tab',
		10: 'm',// Enter @keypresss
		11: 'k',//  @keypresss
		12: 'l',
		13: 'enter',
		16: 'shift',
		17: 'ctrl',
		// 17: 'q',//  @keypresss
		' ': 'space',// @keypresss
		18: 'alt',
		19: 'pause',
		// 19: 's',// @keypress
		20: 'capslock',
		21: 'u',//  @keypresss
		22: 'v',//  @keypresss
		24: 'x',//  @keypresss
		25: 'y',//  @keypresss
		26: 'z',//  @keypresss
		27: 'esc',
		30: '6',//  @keypresss
		33: 'pageup',
		32: 'space',
		34: 'pagedown',
		35: 'end',
		36: 'home',
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down',
		44: 'print',
		45: 'ins',// insert
		46: 'del',// delete
		48: '0',
		49: '1',
		50: '2',
		51: '3',
		52: '4',
		53: '5',
		54: '6',
		55: '7',
		56: '8',
		57: '9',
		65: 'a',
		66: 'b',
		67: 'c',
		68: 'd',
		69: 'e',
		70: 'f',
		71: 'g',
		72: 'h',
		73: 'i',
		74: 'j',
		75: 'k',
		76: 'l',
		77: 'm',
		78: 'n',
		79: 'o',
		80: 'p',
		81: 'q',
		82: 'r',
		83: 's',
		84: 't',
		85: 'u',
		86: 'v',
		87: 'w',
		88: 'x',
		89: 'y',
		90: 'z',
		91: 'win',// left
		92: 'win',// right
		93: 'contextmenu',// select
		96: '0',// numpad
		97: '1',// numpad
		98: '2',// numpad
		99: '3',// numpad
		100: '4',// numpad
		101: '5',// numpad
		102: '6',// numpad
		103: '7',// numpad
		104: '8',// numpad
		105: '9',// numpad
		106: '*',// multiply
		107: '+',// add
		109: '-',// subtract
		110: '.',//decimal point
		111: '/',// divide
		112: 'f1',
		113: 'f2',
		114: 'f3',
		115: 'f4',
		116: 'f5',
		117: 'f6',
		118: 'f7',
		119: 'f8',
		120: 'f9',
		121: 'f10',
		122: 'f11',
		123: 'f12',
		144: 'numlock',
		145: 'scrolllock',
		182: 'mycomputer',// (multimedia keyboard)
		183: 'mycalculator',// (multimedia keyboard)
		186: ';',// semi - colon
		187: '=',// equal sign
		188: ',',// comma
		189: '-',// dash
		190: '.',// period
		191: '/',//forward slash
		192: '`',
		219: '[',// open bracket
		220: '\\',// back slash
		221: ']',// close braket
		222: '\'',// single quote
	}

	function hotkey(event, joiner = '+') {
		if (!(event instanceof KeyboardEvent)) return '';// 刷新页面时会自动进入Event，导致下行报错。
		let { keyCode, ctrlKey, shiftKey, altKey, metaKey } = event
		let keySet = new Set()
		if (ctrlKey) keySet.add('ctrl')
		if (shiftKey) keySet.add('shift')
		if (altKey) keySet.add('alt')
		if (metaKey) keySet.add('win')
		keySet.add(keyCodes[keyCode] || event.key)
		return Array.from(keySet).join(joiner)
	}

	g.hotkey = hotkey
}(window)
