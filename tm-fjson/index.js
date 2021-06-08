fetch('./AssetI2L_Default-zho-TW.fjson')
	.then((res) => res.text())
	.then(parse)


function parse(d) {
	let regexp = /(?<=‟target‟: ‟ΣΣΣβ\t)(?<target>[\s\S])*?(?=\tβΣΣΣ‟,βγ)/g

	let arr = d.match(regexp)
	console.log(arr)

	let str = d.replace(regexp, function (...s) {
		console.log(s)
		return '【中文】'
	})
	//console.log(str)

}


function parse(d) {
	let regexp = /(?<=‟target‟: ‟ΣΣΣβ\t)([\s\S])*?(?=\tβΣΣΣ‟,βγ)/g

	//function* Nexter(){
	//	let m
	//	while (m = regexp.exec(d)) {
	//		let start = m.index
	//		let text = m[0]
	//		let end = start + text.length
	//		yield { text, start, end }
	//	}
	//}

	//let nexter = Nexter()

	let refs = []
	let m
	while (m = regexp.exec(d)) {
		let start = m.index
		let text = m[0]
		let end = start + text.length
		refs.push({ text, start, end })
	}


	let rs = refs.reduceRight((r, e, i)=>{
		let { text, start, end } = e
		text = `【${e.text}】`

		r.result = text + r.input.slice(end) + r.result
		r.input = r.input.slice(0, start)
		
		if(i===0) {
			r.result = r.input + r.result
		}

		return r
	}, { result:'', input: d })



	console.log(refs)
	console.log(rs.result)
	console.log(rs.input)


}