class TranslationWorker extends Worker {

	constructor() {
		super('translation_worker_script.js')
		this.incrementId = 0
		this.ids = {}
		let worker = this
		this.addEventListener('message', function (event){
			let { data } = event
			if(typeof data === 'object' && 'id' in data && 'data' in data) {
				let { id , ok, data:d } = data
				let callback = worker.ids[id]
				callback.call(worker, data)
				console.debug(`%c删除id:${id}`, 'color:#bbb')
				delete worker.ids[id]
			}
		})
	}

	send(data, callback) {
		let id = ++this.incrementId
		if(typeof callback === 'function') {
			this.ids[id] = typeof callback === 'function' ? callback : (function(){})
		}
		this.postMessage({ id, data })
		return { id, data }
	}

}

