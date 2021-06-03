let div = document.createElement('div')
document.body.appendChild(div)
div.innerHTML = `
<p>{{no}}</p>
<h3>{{name}}</h3>
<p>{{age}}</p>
`



let data = {
	name: 'ddb1494',
	age: 39,
	no:'',//주의: 꼭 미리 선언을 해주세요
}


let vm = new Vue({
	el: div,
	data,
})


try{
	vm.no = false
}catch(err){
	console.warn('경고')
	console.warn(err)
}



console.log(data === vm.$data)