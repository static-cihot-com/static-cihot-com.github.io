function filehex(file, method, fn) {
	let progress, complete
	if (typeof fn === 'function') {
		complete = fn
	} else {
		progress = fn.progress
		complete = fn.complete
	}

	let reader = new FileReader();

	if (method.update) {
		let batch = 1024 * 1024 * 2
		let start = 0;
		let total = file.size;
		let current = method;
		reader.onload = function (event) {
			try {
				current = current.update(event.target.result);
				asyncUpdate();
			} catch (e) {
				complete(e, file);
			}
		};
		let asyncUpdate = function () {
			if (start < total) {
				let p = start / total
				if(progress) progress(p, file)
				let end = Math.min(start + batch, total);
				reader.readAsArrayBuffer(file.slice(start, end));
				start = end;
			} else {
				complete(current.hex(), file)
			}
		};
		asyncUpdate();
	} else {
		reader.onload = function (event) {
			try {
				complete(method(event.target.result), file);
			} catch (e) {
				complete(e, file);
			}
		};
		reader.readAsArrayBuffer(file);
	}
}