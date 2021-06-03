let el = document.createElement('div')
document.body.append(el)
el.innerHTML = `
<div>


</div>

`


let data = {}
data.todos = Array.from(new Array(10), (e, i) => String.fromCharCode(i + 65))
data.rows = [
	{ source: '한국어1', target: '中文1', display:true },
	{ source: '한국어2', target: '中文2', display:true },
	{ source: '한국어3', target: '中文3', display:true },
	{ source: '한국어4', target: '中文4', display:true },
	{ source: '한국어5', target: '中文5', display:true },
	{ source: '한국어6', target: '中文6', display:true },
	{ source: '한국어7', target: '中文7', display:true },
	{ source: '한국어8', target: '中文8', display:true },
	{ source: '한국어9', target: '中文9', display:true },
]
let methods = {
	onTargetInput(event){
		console.log(event)
	},
}

Vue.config.silent = true


let vm = new Vue({
	el,
	data,
	methods 
})


