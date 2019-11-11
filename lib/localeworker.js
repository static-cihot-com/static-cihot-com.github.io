// 需要导入stringifyfunction.js

((g) => {
	let cacheWorkers = new Map();
	let cacheUrls = new Map();

	function createLocaleWorker(mainHandles, workerHandles) {
		let code, blob, url, worker;
		code = 'function send(...a){this.postMessage(a);};';

		if (typeof workerHandles === 'string') {
			code += workerHandles;
		} else if (typeof workerHandles === 'function') {
			code += 'this.addEventListener("message",' + stringifyFunction(workerHandles) + ');';
		} else if (typeof workerHandles === 'object' && workerHandles !== null) {
			let
				k,// message, error, abort
				f;// callback func
			for (k in workerHandles) {
				f = workerHandles[k]
				if (k.length > 2) k = k.replace(/^on(.+)/, '$1');// 截取事件名称，去掉开头的on字符
				k = k.replace(/"/g, '\\"');// 转义符：侦听事件名称的双引号
				code += 'this.addEventListener("' + k + '",' + stringifyFunction(f) + ');';
			}
			log(code)
		} else {
			// 输入其他类型的代码
			code = 'this.addEventListener("message",(e)=>{console.warn(e.data);});';
		}

		if (code) {
			if (!cacheUrls.has(code)) {
				blob = new Blob([code], { type: 'text/javascript' });
				url = URL.createObjectURL(blob);
				cacheUrls.set(code, url);
			} else {
				url = cacheUrls.get(code);
			}
			worker = new Worker(url);
			if (typeof mainHandles === 'string') {
				code += mainHandles;
			} else if (typeof mainHandles === 'function') {
				worker.addEventListener('message', mainHandles);
			} else if (typeof mainHandles === 'object' && mainHandles) {
				let k, f;
				for (k in mainHandles) {
					f = mainHandles[k];
					if (k.length > 2) k = k.replace(/^on(.+)/, '$1');// 去掉开头的on
					worker.addEventListener(k, f);
				}
			} else {
				worker.addEventListener('message', (e) => {
					console.log(e.data);
				});
			}
		}
		worker.code = code;
		worker.url = url;
		return worker;
	}

	class LocaleWorker {

		constructor(name, mainHandles, workerHandles) {
			this._autoReconnect = false;
			this.name = name;
			this.mainHandles = mainHandles;
			this.workerHandles = workerHandles;
			this.connect();
		}

		close() {
			let { name, worker } = this
			if (cacheWorkers.has(name)) {
				cacheWorkers.get(name).terminate();
				cacheWorkers.delete(name);
			}
			if (worker) {
				worker.terminate();
				delete this.worker;
				return true
			} else {
				return false
			}
		}

		destroy() {
			let { code, name, terminate } = this
			if (cacheUrls.has(code)) {
				URL.revokeObjectURL(cacheUrls.get(code));
				cacheUrls.delete(code);
			}
			terminate();
			cacheWorkers.delete(name);
		}

		connect() {
			log('connect')
			this.close();
			this.worker = createLocaleWorker(this.mainHandles, this.workerHandles);
			cacheWorkers.set(this.name, this.worker);
		}

		send(...a) {
			this.worker.postMessage(a);
		}

		set autoReconnect(b) {
			this._autoReconnect = b;
			if (this._autoReconnect === false && b) {
				this.worker.addEventListener('close', this.connect.bind(this));
			} else {
				this.worker.removeEventListener('close', this.connect.bind(this));
			}
		}
		get autoReconnect() {
			return this._autoReconnect;
		}
	}

	g.LocaleWorker = LocaleWorker;
	LocaleWorker.cache = { workers: cacheWorkers, urls: cacheUrls };

})(this)

/*

let lw=new LocaleWorker('test',

	{message:()=>{

	},error:()=>{

	},massageerror:()=>{

	}},

	{message:()=>{
		send()
	},close:()=>{

	},error}
);

lw.send(1,2,3,4)
lw.worker
lw.url
lw.close()

LocaleWorker.cache.workers
LocaleWorker.cache.urls

*/



