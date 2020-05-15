function createElement(tagName = 'div', className = '', parentElement = null) {
	let e = document.createElement(tagName);
	e.className = className;
	if (parentElement instanceof Element) parentElement.appendChild(e);
	return e;
}


function table(datas, headers) {
	if (!Array.isArray(datas)) throw new TypeError(datas);

	let fragment = document.createDocumentFragment();
	let table = document.createElement('table');
	let thead = document.createElement('thead');
	let tbody = document.createElement('tbody');
	let caption;

	if (headers) fragment.appendChild(thead);
	if (headers === true) {
		let i = datas.findIndex(e => Array.isArray(e));
		if (i > -1) {
			headers = datas.splice(i, 1)[0];
		}
	}
	if (Array.isArray(headers)) {
		let tr = document.createElement('tr');
		headers.forEach(text => {
			let td = document.createElement('th');
			td.textContent = String(text);
			tr.appendChild(td);
		});
		thead.appendChild(tr);
	}
	fragment.appendChild(tbody);
	datas.forEach(data => {
		if (Array.isArray(data)) {
			let tr = document.createElement('tr');
			data.forEach(text => {
				let td = document.createElement('td');
				td.textContent = String(text);
				tr.appendChild(td);
			});
			tbody.appendChild(tr);
		} else {
			if (!caption) {
				caption = document.createElement('caption');
				table.insertAdjacentElement('afterbegin', caption);
			}
			caption.textContent = String(data);
		}
	});

	table.appendChild(fragment);
	return table;
}


function textarea(value, className, parentElement) {
	let e = document.createElement('textarea');

	if (typeof value === 'string') e.value = value;
	if (typeof className === 'string') e.className = className;
	if (parentElement instanceof Element) parentElement.appendChild(e);

	return e;
}


function row(index) {
	let i = index;

	let rowUI = document.createElement('div');
	rowUI.className = 'row';

	let sourceUI = document.createElement('div');
	sourceUI.className = 'source';
	rowUI.appendChild(sourceUI);

	let targetUI = document.createElement('div');
	targetUI.className = 'target';
	rowUI.appendChild(targetUI);

	Object.defineProperties(rowUI, {
		source: {
			get() { return sourceUI.innerText; },
			set(v) { return sourceUI.innerText = v; },
		},
		target: {
			get() { return targetUI.innerText; },
			set(v) { return targetUI.innerText = v; },
		},
		index: {
			get() { return i; },
			set(v) { return i = v; },
		}
	});
	return rowUI;
}



createElement.table = table;
createElement.textarea = textarea;
createElement.row = row;



export default createElement;