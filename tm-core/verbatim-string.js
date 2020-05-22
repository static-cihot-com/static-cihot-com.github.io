
class Verbatim extends EventTarget {
	step() {
		let { text, actions } = this;
	}

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
			q = String(q);
			if(!(h instanceof Function)) h = (v)=>String(v)==h;
			return [q, h];
		});
		this.sortActions();
		return this;
	}

	sortActions() {
		this.actions.sort((a, b) => {
			let al = a[0].length, bl = b[0].length;
			// 长度排序：长的在前
			// 文字排序：charCode小的在前
			return al > bl ? -1 : (al < bl ? 1 : (a[0] > b[0] ? 1 : (a[0] < b[0] ? -1 : 0)));
		});
		return this.actions;
	}

	transfer(str) {
		let { actions } = this;
		let originalStr = str;
		let ret = [];
		let q;
		let handle;
		let have;
		while (str.length) {
			have =  undefined;
			for (let action of actions) {
				q = action[0];
				handle = action[1];
				if (q === str.substr(0, q.length)) {
					have = action;
					console.log('have', have);
					break;
				}
			}
			if (have) {
				ret.push(handle(q));
				str = str.slice(q.length);
			} else {
				ret.push(str.slice(0, 1));
				str = str.slice(1);
			}
		}
		return ret;
	}
	//transfer(str) {
	//	let { actions } = this;
	//	let originalStr = str;
	//	let ret = '';
	//	let q;
	//	let handle;
	//	let have;
	//	while (str.length) {
	//		have =  undefined;
	//		for (let action of actions) {
	//			if (Array.isArray(action)) {
	//				q = action[0];
	//				handle = action[1];
	//				if (q === str.substr(0, q.length)) {
	//					if (handle instanceof Function) {
	//						have = action;;
	//						//console.warn(0);
	//					} else if (handle instanceof String || handle instanceof Number) {
	//						have = [q, (v) => v];
	//						console.warn(1);
	//					}else{
	//						have = [q, Verbatim.responseDefaultHandle];
	//					}
	//					//console.log(q, str)
	//					//console.warn(2);
	//					break;
	//				} else {
	//					handle = [q, Verbatim.responseDefaultHandle];
	//					//console.warn(3);
	//				}
	//			} else {
	//				req = action;
	//				handle = [q, Verbatim.responseDefaultHandle];
	//				console.warn(4);
	//			}
	//		}
	//		if (have) {
	//			ret += handle(q);
	//			str = str.slice(q.length);
	//			//console.log(str);
	//		} else {
	//			ret += str.slice(0, 1);
	//			str = str.slice(1);
	//			console.log(str);
	//		}
	//	}
	//	console.warn(ret);
	//	return ret
	//}

}

self.Verbatim = Verbatim;