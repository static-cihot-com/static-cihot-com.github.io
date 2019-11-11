tr
.rowIndex
.sectionRowIndex
.cells
.insertCell
.deleteCell


table
.caption
.tHead
.tFoot
.tBodies
.rows
.align
.border
.frame
.rules
.summary
.width
.bgColor
.cellPadding
.cellSpacing
.createCaption
.deleteCaption
.createTHead
.deleteTHead
.createTFoot
.deleteTFoot
.createTBody
.insertRow
.deleteRow




class DataTable {


	constructor(table) {
		this._table = table
	}

	tbody(i=0, create=false) {
		if(create) {
			index = b ? this._tbodyIndex : parseInt(index)
			if (typeof index !== 'number' && index > 100) throw new RangeError('maxnum 100.')
			// 没有就得创造出来一个<tbody>
			let tBodies = this._table.tBodies
			let tbody = tBodies.item(index)
			if (!tbody) {
				this._tbodyIndex = index
				let i = tBodies.length
				while (i++ <= index) {
					tbody = this._table.createTbody()
				}
			}
			tbody.dataTable = this
		}
		return b ? tbody : this
	}

	caption() {
		this._table.caption || this._table.createCaption()
	}

	tr(data) {

	}
	getCaption(){
		return this._table.caption || this._table.createCaption
	}
	setCaption(v, html=false){
		this.getCaption()[html?'innerHTML':'innerText'] = v
	}

	row(row, cell) {

	}
}


tbody.




class DataTable {
	/* 
	@query       string query | table Instance
	*/
	constructor(query) {
		if (typeof query === 'string') {
			this._table = document.querySelector(query) || document.body.appendChild(document.createElement('table'))
		} else if (query instanceof HTMLTableElement) {
			this._table = query
		} else {
			this._table = document.body.appendChild(document.createElement('table'))
		}
		// 兼容多个tbody标签
		this._tbodyIndex = 0
		this._datas = []
		this._limit = 50
	}

	limit(i) {
		i = Math.min(500, i)
		if (arguments.length !== 0) {
			this._limit = i
			let body = this.body() || this._table.appendChild(document.createElement('tbody'))
			let trs = body.querySelectorAll('tr')
			let trsLen = trs.length
			while (trsLen++ < i) {
				body.appendChild(document.createElement('tr'))
			}
			body.dataset.limit = i// 写在tbody上
			return this
		} else {
			return this._limit
		}
	}

	get totalPage() {
		return Math.ceil(this._data.length / this._limit)
	}

	table(table) {
		if (table instanceof HTMLTableElement) {
			this._table = table
			return this
		}
		return this._table
	}

	get bodyIndex() {
		return this._tbodyIndex
	}

	isBody(tbody) {
		// 判断是否为该table的tbody。
		return Array.prototype.some.call(this._table.tBodies, (e) => e === tbody)
	}

	body(index) {
		let b = index === undefined
		index =  b ? this._tbodyIndex : parseInt(index)
		if(typeof index!=='number' && index>100) throw new RangeError('maxnum 100.')
		// 没有就得创造出来一个<tbody>
		let tBodies = this._table.tBodies
		let tbody = tBodies.item(index)
		if (!tbody) {
			this._tbodyIndex = index
			let i = tBodies.length
			while (i++ <= index) {
				tbody = document.createElement('tbody')
				this._table.insertAdjacentElement('beforeend', tbody)
			}
		}
		tbody.dataTable = this
		return b ? tbody : this
	}

	head(names) {
		if (names === undefined) return Array.from(this._names);

		this._names = names
		this._thead = this._table.tHead || this._table.insertAdjacentElement('afterbegin', document.createElement('thead'))
		let ths = this._thead.querySelectorAll('th')
		let thsLen = ths.length
		let namesLen = names.length
		let maxLen = Math.max(thsLen, namesLen)

		if (namesLen === thsLen) {
			for (let i = 0; i < namesLen; i++) {
				let name = names[i]
				let th = ths.item(i)
				th.textContent = name
			}
		} else if (namesLen > thsLen) {
			for (let i = 0; i < namesLen; i++) {
				let name = names[i]
				let th = ths.item(i) || this._thead.appendChild(document.createElement('th'))
				th.textContent = name
			}
		} else if (namesLen < thsLen) {
			let i
			for (i = 0; i < namesLen; i++) {
				let name = names[i]
				let th = ths.item(i)
				th.textContent = name
			}
			for (; i < thsLen; i++) {
				let th = ths.item(i)
				th.remove()
			}
		}
		return this
	}
	data(data) {
		if (data !== undefined) {
			this._data = this._datas[this._tbodyIndex] = data
			return this
		}
		return this._datas[this._tbodyIndex]
	}
	start(index = 0) {
		let limit = this.limit()
		let data = this.data()
		// let dataLen = data.length
		let curData = data.slice(index, index + limit)
		let curDataLen = curData.length
		let curDataIndex = Array.from(curData, (e, i) => i + index)
		// console.debug(curData, curDataIndex)

		this._curData = curData
		this._curDataLen = curDataLen
		this._curDataIndex = curDataIndex
		this._startIndex = curDataIndex[0]
		this._endIndex = curDataIndex.slice(-1)[0]

		let head = this.head()
		let headLen = head.length
		let body = this.body()
		let trs = body.querySelectorAll('tr')
		let trsLen = trs.length
		if (trsLen === curDataLen) {
			for (let i = 0; i < trsLen; i++) {
				let d = curData[i]
				let tr = trs.item(i)
				let index = curDataIndex[i]
				tr.dataset.index = index
				let tds = tr.querySelectorAll('td')
				let tdsLen = tds.length
				if (tdsLen === headLen) {
					for (let j = 0; j < headLen; j++) {
						let td = tds.item(j)
						let h = head[j]
						td.dataset.name = h
						let v = d === undefined ? '' : d[h]
						td.textContent = v === undefined ? '' : v;
					}
				} else if (tdsLen < headLen) {
					for (let i = 0; i < headLen; i++) {
						let td = tds.item(i) || tr.appendChild(document.createElement('td'))
						let h = head[i]
						td.dataset.name = h
						let v = d === undefined ? '' : d[h]
						td.textContent = v === undefined ? '' : v;
					}
				} else if (tdsLen > headLen) {
					let i
					for (i = 0; i < headLen; i++) {
						let td = tds.item(i)
						let h = head[i]
						td.dataset.name = h
						let v = d === undefined ? '' : d[h]
						td.textContent = v === undefined ? '' : v;
					}
					for (; i < tdsLen; i++) {
						let td = tds.item(i)
						td.remove()
					}
				}
			}
		} else if (trsLen < curDataLen) {
			// console.debug('case trsLen<curDataLen', body)
			for (let i = 0; i < curDataLen; i++) {
				let d = curData[i]
				let tr = trs.item(i) || body.appendChild(document.createElement('tr'))
				let index = curDataIndex[i]
				tr.dataset.index = index
				let tds = tr.querySelectorAll('td')
				let tdsLen = tds.length
				if (tdsLen === headLen) {
					for (let j = 0; j < headLen; j++) {
						let td = tds.item(j)
						let h = head[j]
						td.dataset.name = h
						let v = d === undefined ? '' : d[h]
						td.textContent = v === undefined ? '' : v;
					}
				} else if (tdsLen < headLen) {
					for (let i = 0; i < headLen; i++) {
						let td = tds.item(i) || tr.appendChild(document.createElement('td'))
						let h = head[i]
						td.dataset.name = h
						let v = d === undefined ? '' : d[h]
						td.textContent = v === undefined ? '' : v;
					}
				} else if (tdsLen > headLen) {
					let i
					for (i = 0; i < headLen; i++) {
						let td = tds.item(i)
						let h = head[i]
						td.dataset.name = h
						let v = d === undefined ? '' : d[h]
						td.textContent = v === undefined ? '' : v;
					}
					for (; i < tdsLen; i++) {
						let td = tds.item(i)
						td.remove()
					}
				}
			}
		} else if (trsLen > curDataLen) {
			let i = 0;
			for (; i < curDataLen; i++) {
				let d = curData[i]
				let tr = trs.item(i) || body.appendChild(document.createElement('tr'))
				let index = curDataIndex[i]
				tr.dataset.index = index
				let tds = tr.querySelectorAll('td')
				let tdsLen = tds.length
				if (tdsLen === headLen) {
					for (let j = 0; j < headLen; j++) {
						let td = tds.item(j)
						let h = head[j]
						td.dataset.name = h
						let v = d === undefined ? '' : d[h]
						td.textContent = v === undefined ? '' : v;
					}
				} else if (tdsLen < headLen) {
					for (let i = 0; i < headLen; i++) {
						let td = tds.item(i) || tr.appendChild(document.createElement('td'))
						let h = head[i]
						td.dataset.name = h
						let v = d === undefined ? '' : d[h]
						td.textContent = v === undefined ? '' : v;
					}
				} else if (tdsLen > headLen) {
					let i
					for (i = 0; i < headLen; i++) {
						let td = tds.item(i)
						let h = head[i]
						td.dataset.name = h
						let v = d === undefined ? '' : d[h]
						td.textContent = v === undefined ? '' : v;
					}
					for (; i < tdsLen; i++) {
						let td = tds.item(i)
						td.remove()
					}
				}
			}
			for (; i < trsLen; i++) {
				let tr = trs.item(i)
				tr.remove()
			}
		}
		return this
	}

	end(index = 0) {
		let i = index - this._limit
		this.start(i > 0 ? i : 0)
	}

	next(event) {
		let endIndex = this._endIndex
		let data = this.data()
		let dataLen = data.length
		if (dataLen - 1 <= endIndex) {
		} else {
			let tbody = this.body()
			let trs = tbody.querySelectorAll('tr')
			let trsLen = trs.length
			if (trsLen === 0) {
			} else {
				let updateIndex = endIndex + 1
				if (updateIndex < dataLen) {
					let d = data[updateIndex]
					// 内部更新
					this._curData.shift()
					this._curData.push(d)
					this._curDataIndex.shift()
					this._curDataIndex.push(updateIndex)
					this._startIndex = this._curDataIndex[0]
					this._endIndex = this._curDataIndex.slice(-1)[0]
					endIndex = updateIndex
					let tr = trs.item(0)
					tr.dataset.index = updateIndex// 内部更新
					tr.querySelectorAll('td').forEach((td) => {
						let k = td.dataset.name
						if (d) {
							let v = d[k]
							td.textContent = v !== undefined ? v : ''
						} else {
							td.textContent = ''
						}
						// console.debug(k, d[k])
					})
					tr.parentElement.insertAdjacentElement('beforeend', tr)

					// view postions
					let totalIndex = dataLen === 0 ? 0 : dataLen - 1
					tbody.dataset.start = this._startIndex / totalIndex
					tbody.dataset.end = this._endIndex / totalIndex

					let fn = tbody.wheelHandle
					if (fn) fn.call(event.currentTarget, event)
				}
			}
		}
	}

	prev(event) {
		let startIndex = this._startIndex
		if (startIndex > 0) {
			let tbody = this.body()
			let trs = tbody.querySelectorAll('tr')
			let trsLen = trs.length
			if (trsLen > 0) {
				let data = this.data()
				let dataLen = data.length
				let updateIndex = startIndex - 1
				if (updateIndex > -1) {
					let d = data[updateIndex]
					// 内部更新
					this._curData.pop()
					this._curData.unshift(d)
					this._curDataIndex.pop()
					this._curDataIndex.unshift(updateIndex)
					this._startIndex = this._curDataIndex[0]
					startIndex = this._startIndex
					this._endIndex = this._curDataIndex.slice(-1)[0]
					let tr = trs.item(trs.length - 1)
					tr.dataset.index = updateIndex// 内部更新
					tr.querySelectorAll('td').forEach((td) => {
						let k = td.dataset.name
						if (d) {
							let v = d[k]
							td.textContent = v !== undefined ? v : ''
						} else {
							td.textContent = ''
						}
						// console.debug(k, d[k])
					})
					tr.parentElement.insertAdjacentElement('afterbegin', tr)

					// view positions
					let totalIndex = dataLen === 0 ? 0 : dataLen - 1
					tbody.dataset.start = this._startIndex / totalIndex
					tbody.dataset.end = this._endIndex / totalIndex

					let fn = tbody.wheelHandle
					if (fn) fn.call(event.currentTarget, event)
				}
			}
		}
	}

	//                                        |end pos
	// |-----------------------| progress bar |---------------------|
	//                start pos|
	progress() {
		// view positions
		let tbody = this.body()
		let data = this.data()
		let dataLen = data.length
		let totalIndex = dataLen === 0 ? 0 : dataLen - 1
		tbody.dataset.start = this._startIndex / totalIndex
		tbody.dataset.end = this._endIndex / totalIndex
		return this
	}

	nextPage() {

	}

	wheel(handle) {
		let tbody = this.body()
		tbody.dataTable = this
		// console.debug(tbody)
		if (handle === false) {
			delete tbody.wheelHandle
			tbody.removeEventListener('wheel', this._onwheel)
		} else {
			if (typeof handle === 'function') {
				tbody.wheelHandle = handle
			}
			tbody.addEventListener('wheel', this._onwheel, { passive: false })
		}
		return this
	}

	_onwheel(event) {
		// let tbody = event.target
		// 废弃原先侦听table的方法。
		// if(tbody.nodeName!=='TD') return ;
		// while (tbody.nodeName !== 'TBODY') {
		// 	tbody = tbody.parentElement
		// 	if (!tbody) {
		// 		console.debug('break', tbody)
		// 		break;
		// 	}
		// }
		// console.debug(tbody)
		// console.debug(event.currentTarget.dataTable)
		if (event.deltaY < 0) {
			event.key = 'up'
			event.currentTarget.dataTable.prev(event)
		} else if (event.deltaY > 0) {
			event.key = 'down'
			event.currentTarget.dataTable.next(event)
		} else if (event.deltaX < 0) {
			event.key = 'left'
		} else if (event.deltaX > 0) {
			event.key = 'right'
		} else {
			event.key = ''
		}
	}
}
/*
let dt = new DataTable('#table')
	dt.data(data)
	dt.head(['no', 'source', 'target', 'textKey'])
	dt.showStart(995)
	dt.showStart(990)

*/