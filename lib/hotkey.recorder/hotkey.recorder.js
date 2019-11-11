void function () {
	if (!hotkey) return;


	class Recorder {

		constructor(opt) {
			let options = {
				ignoreComboKeys: true,
				ignoreRepeat: true,
				hotkeyJoiner: '+',
				comboJoiner: ',',
				maxHistory: 30,
				comboKeys: new Set([
					'ctrl', 'shift', 'alt', 'win',
					'ctrl+shift', 'ctrl+alt', 'ctrl+win', 'shift+alt', 'shift+win', 'alt+win',
					'ctrl+shift+alt', 'ctrl+shift+win', 'ctrl+alt+win', 'shift+alt+win',
					'ctrl+shift+alt+win',
				]),
				delay: 1000,
			}
			this.options = Object.assign(options, opt)
			this.history = []
			this.status = {}
			this.combos = new Map()
			this.listened = false
			this.action = ''
		}

		flush(event) {
			let { type, repeat } = event
			let { options } = this
			// 可不处理重复
			if (options.ignoreRepeat && repeat) return;

			let { combos } = this
			// 可取缓存
			let key
			if (event._hotkey) {
				key = event._hotkey
			} else {
				key = event._hotkey = hotkey(event, options.hotkeyJoiner)
			}

			let isOnlyComboleKeys = options.comboKeys.has(key)
			if (isOnlyComboleKeys) {
				// 组合键先松开
				if (type === 'keyup') {
					combos.forEach((lastStartTime,keySet)=>{
						let has = Array.from(keySet).some(k=>k.indexOf(key)===0)
						if(has) combos.delete(keySet)
					})
				}

				// 可不处理单个 ctrl 等
				if (options.ignoreComboKeys) return;
			}

			// 插入history记录
			let now = Date.now()
			let item = { type, key, time: now }
			if (this.history.unshift(item) > options.maxHistory) {
				this.history.splice(options.maxHistory, Infinity)
			}

			let { status } = this
			let { delay } = options

			if (type === 'keydown') {
				// set combocvs
				let combosArray = Array.from(combos)

				let item = combosArray.find(([keySet, lastStartTime]) => keySet.has(key))
				if (item) {
					// 刷新时间
					let [keySet, lastStartTime] = item
					status[key]=lastStartTime

				} else {
					let isExists = Array.from(combos).some(([keySet, lastStartTime]) => {
						// 有没有
						if (Math.abs(now - lastStartTime) <= delay) {
							keySet.add(key)
							combos.set(keySet, now)
							return true
						}
						return false
					})
					if (!isExists) {
						combos.set(new Set([key]), now)
					}

					// set status
					status[key] = now
				}

				this.action = ''
			} else if (type === 'keyup') {
				// delete status
				// for(let k in status){
				// 	let t = status[k]
				// 	if(Math.abs(now - t) > delay) {
				// 		warn(k)
				// 		setTimeout(()=>delete status[k], delay)
				// 	}
				// }
				delete status[key]
				
				// delete combos
				this.action = ''
				let b = Array.from(combos).some(([keySet, lastStartTime]) => {
					if (keySet.has(key)) {
						if (keySet.size === 1) {
							combos.delete(keySet)
							this.action = key
						} else {
							let keySetArray = Array.from(keySet)
							if (!keySetArray.some((e) => status[e])) {
								combos.delete(keySet)
								this.action = keySetArray.join(options.comboJoiner)
							}
						}
						return true
					}
				})
			}
		}
	}

	hotkey.Recorder = Recorder
}()
