
class Verbatim extends EventTarget {

	static responseDefaultHandle(v) {
		return `♥${v}♥`;
	}

	setActions(actions) {
		this.actions = actions.filter(e=>e).map(action=>{
			let q;//querystring
			let h;//handle
			if (Array.isArray(action)) {
				q = action[0];
				h = action[1];
			}else{
				q = action;
				h = Verbatim.responseDefaultHandle;
			}
			if(!(h instanceof Function)) h = (v)=>String(v)==h;
			return [q, h];
		});
		this.sortActions();
		return this;
	}

	sortActions() {
		this.actions.sort((a, b) => {
			let aq = a[0];
			let bq = b[0];
			if(aq instanceof RegExp) aq = aq.source;
			if(bq instanceof RegExp) bq = bq.source;
			let al = aq.length;
			let bl = bq.length;
			return aq > bq ? -1 : (aq < bq ? 1 : (al > bl ? -1 : (al < bl ? 1 : 0)));
		});
		return this;
	}

	transfer(str) {
		let { actions } = this;
		let originalStr = str;
		let tmp = [];
		let q;
		let handle;
		let have;
		while (str.length) {
			have =  undefined;
			for (let action of actions) {
				q = action[0];
				handle = action[1];
				if(typeof q == 'string') {
					if (q === str.substr(0, q.length)) {
						have = action;
						break;
					}
				}else if(q instanceof RegExp) {
					if(!/^\^/.test(q.source)) {
						q = new RegExp('^'+q.source, q.flags);
					}
					let m = q.exec(str);
					if(m) {
						q = m[0];
						have = [q, handle];
						//console.log(q)
						break;
					}
				}else{
					q = String(q);
				}
			}
			if (have) {
				tmp.push(handle(q));
				str = str.slice(q.length);
			} else {
				tmp.push(str.slice(0, 1));
				str = str.slice(1);
			}
		}

		const STRING = 'string';
		let res = [];
		let resIndex = -1;
		tmp.forEach((e)=>{
			if((typeof e == STRING) && (typeof res[resIndex] == STRING)) {
				res[resIndex] += e;
			}else{
				res.push(e);
				resIndex++;
			}
		});
		return res;
	}
}

self.Verbatim = Verbatim;