fetch('./AssetI2L_Default-zho-TW.fjson')
	.then((res) => res.text())
	.then(function(d){
		let refs = makeRefs(d)
		console.log( refs )
		let str = makeStr(d, refs)
		console.log(str)
	})

function makeRefs(d) {
	let regexp = /(?<=‟target‟: ‟ΣΣΣβ\t)([\s\S])*?(?=\tβΣΣΣ‟,βγ)/g

	let refs = []
	let m
	while (m = regexp.exec(d)) {
		let start = m.index
		let text = m[0]
		let end = start + text.length
		refs.push({ text, start, end })
	}

	return refs
}

function makeStr(d, refs){

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

	return rs.result
}


