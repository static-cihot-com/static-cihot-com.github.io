/*
//Ctrl + Shift + Alt + MouseRightClick
//XLSX 툴을 사용하여 임의 데이터로 엑셀파일 demo.xlsx 를 생성한다.

document.addEventListener('contextmenu', function (event) {
	if (event.ctrlKey && event.altKey && event.shiftKey) {
		event.preventDefault()

		let arr = [
			['id', 'cn', 'tw'],
		]
		let ids = [101, 102, 103]
		let cns = ['国文1', '国文2', '国文3']
		let tws = ['國文1', '國文2', '國文3']
		let len = Math.max(cns.length, tws.length)
		for (let i = 0; i < len; i++) {
			arr.push([
				ids[i],
				cns[i],
				tws[i]
			])
		}

		//XLSX.utils.aoa_to_sheet([[1,2],[3,4],['=A1','b']])
		let sheet = XLSX.utils.aoa_to_sheet(arr)
		let html = XLSX.utils.sheet_to_html(sheet)
		html = new DOMParser().parseFromString(html, 'text/html')
		console.log(html)
		let table = html.querySelector('table')
		let wb = XLSX.utils.table_to_book(table, { sheet: 'Sheet1' })


		let filename = 'demo.xlsx'

		XLSX.writeFile(wb, filename)
	}
})
*/
