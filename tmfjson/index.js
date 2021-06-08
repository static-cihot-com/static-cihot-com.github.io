let vm = new Vue({
	el: '#app',
	data: function () {
		return {
			version: 2021.0608,
			isReady: false,
			isReadyDict: false,
			appClass: { container:true, 'conatiner-xxl':true },
			files: [],
		}
	},
	computed: {
		appClassC(){
			let { appClass } = this
			let result = []
			for(let name in appClass) {
				let value = appClass[name]
				if(value) result.push(name)
			}
			return result.join(' ')
		}
	},
	methods: {
		onDropFile(event) {
			if(event.type!=='drop') return ;
			let vm = this
			let { dataTransfer: { files, items } } = event
			for(let i=0, { length }=files; i<length; i++) {
				let file = files.item(i)
				vm.files.push(file)
				readfile(file)
					.then(function(d){
						//console.log(d)
						let refs = makeRefs(d)
						//console.log(refs)
					})
					.catch(function(d){

					})
			}
			
		}
	},
	created(){
		init().then(function(){
			console.log('[OK] dict download.')
			this.isReadyDict = true
		})
	}
})

function readfile(file) {
	return new Promise(function(resolve,reject){
		let o = new FileReader()
		o.readAsText(file, 'utf8')
		o.onload = function(e) {
			resolve(e.target.result)
		}
		o.onabort = o.onerror = function(e){
			reject(e.message)
		}
	})
}

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


