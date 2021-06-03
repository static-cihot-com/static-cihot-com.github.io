let div = document.createElement('div')
document.body.appendChild(div)
div.id = 'app'

//{{name}}:  text
div.textContent = `{{message}} - {{message}} - {{message}}`

//v-bind:  attr
div.setAttribute('v-bind:title', 'message')

//v-if - one tag - show or hide
let p = document.createElement('p')
div.appendChild(p)
p.setAttribute('v-if', 'seen')
p.textContent = '저는 p태그입니다'


//v-for:  multi tag - show or hide 
let ul = document.createElement('ol')
div.appendChild(ul)
let li = document.createElement('li')
ul.appendChild(li)
li.setAttribute('v-for', 'todo in todos')//js: for(let todo of todos){}
li.textContent = `{{todo.text}}`


//v-model:  input
let inputText = document.createElement('input')
inputText.setAttribute('v-model', 'message')
let inputCheckbox = document.createElement('input')
inputCheckbox.setAttribute('v-model', 'seen')
inputCheckbox.type = 'checkbox'
div.append(inputText, inputCheckbox)



let option = {
	el: div,
	data: {
		message: '안녕하세요 Vue',
		seen: true,
		todos: [
			{ id: 1, text: 'todo-1' },
			{ id: 2, text: 'todo-2' },
			{ id: 3, text: 'todo-3' },
			{ id: 4, text: 'todo-4' },
		]
	},
	methods: {
		reverseMessage() {
			this.message = this.message.split('').reduceRight((r, e) => r + e, '')
		}
	}
}

let app = new Vue(option)


//console.log(app)
//console.log(app.$el)
//console.log(app.message)
console.log(app.$data)
//app.todos.push({id:5, text:'todo-5-push'})
//app.todos.shift()
//app.todos.splice(1,3)
//let arr = [
//	{text:'odt-7'},
//	{text:'odt-8'},
//	{text:'odt-9'},
//]
//option.data.todos = arr

app.reverseMessage()






{
	//component
	Vue.component('person-item', {
		props: ['person', 'age'],//v-bind가 원래 attr을 지목하던 것을 해당 태그 내에서만 변수로 사용
		template: `<div class="person">
		<strong>{{person.name}}</strong>
		<span>{{age}}</span>
		</div>`
	})

	let div = document.createElement('div')
	div.className = 'persons'
	div.innerHTML = `
		<ol>
			<person-item
				v-for="e in persons"
				v-bind:person="e"
				v-bind:name="e.name"
				v-bind:age="e.age"
			></person-item>
		</ol>
	`//여기서 v-bind된 person과 age는 component의 props정의로 인하여 attr이 아닌 변수로 인식
	document.body.append(div)

	let persons = [
		{ name: 'person-1', age: 21 },
		{ name: 'person-2', age: 22 },
		{ name: 'person-3', age: 23 },
	]
	let option = {
		el: div,
		data: {
			persons
		}
	}
	let app = new Vue(option)

	app.persons[0].name = 'PERSON-1'
	app.persons[0].age = '91'
}





void function test() {
	//숙제
	let div = document.createElement('div')
	document.body.appendChild(div)
	div.innerHTML = `
	<div id="app3">
		<app-nav v-bind:nav="nav"></app-nav>
		<app-view v-bind:view="view">
			<app-sidebar v-bind:sidebar="sidebar"></app-sidebar>
			<app-content v-bind:content="content"></app-content>
		</app-view>
	</div>
	`

	Vue.component('app-nav', {
		props: ['nav'],
		template: `<nav>nav:{{nav}}</nav>`
	})

	//Vue.component('app-view', {
	//props:['view'],
	//template:`<div>view:{{view}}</div>`
	//})

	Vue.component('app-sidebar', {
		props: ['sidebar'],
		template: `<div>sidebar:{{sidebar}}</div>`
	})

	Vue.component('app-content', {
		props: ['content'],
		template: `<div>content:{{content}}</div>`
	})

	new Vue({
		el: div,
		data: {
			nav: 'NAV',
			view: 'VIEW',
			sidebar: 'SIDEBAR',
			content: 'CONTENT',
		}
	})

}



{
	let records = []
	let div = document.createElement('div')
	document.body.appendChild(div)

	let css = 'color:red;font-weight:bold'
	let vm = new Vue({
		el:div,
		data: {
			a: 1
		},
		beforeCreated(){ console.log('%cbeforeCreated',css) },
		created(){ console.log('%ccreated',css) },
		beforeMount(){ console.log('%cbeforeMount',css) },
		mounted(){ console.log('%cmounted',css) },
		beforeUpdate(){ console.log('%cbeforeUpdate',css) },
		updated(){ console.log('%cupdated',css) },
		beforeDestroy(){ console.log('%cbeforeDestroy',css) },
		destoyed(){ console.log('%cdestoyed',css) },
	})

	//watch는 내부적으로 nextTick를 사용하고 있어 제대로 모두 적지 않는다
	//vm.$watch('a', function (newValue, oldValue) {
	//	records.push({ newValue, oldValue })
	//})

	vm.a = 2
	vm.a = 4
	vm.$nextTick(()=>{
		console.log(records)
	})


	vm=null

	console.log('vm')

}



{
	let html = `<div><h2>H2</h2><p>pppppp</p></div>`
	let div = document.createElement('div')
	document.body.appendChild(div)
	div.innerHTML = `
		<article v-once v-html="html"></article>
		<button v-bind:disabled="disabled">Button</button>
	`
	let vm = new Vue({
		el: div,
		data: {
			html,
			disabled:true,
		}
	})

	vm.html = `<span>spanspanspanspanspanspan</span>`//v-once导致渲染一次
	this.vm4 = vm
}

{
	let ok = true
	let div = document.createElement('div')
	document.body.append(div)
	div.innerHTML = `
		<input type="result" v-model="result" v-on:input="input">
		<button v-on:click="click">Button</button>
		<script type="javascript">let ok = true </script>
		<p> javascript result: {{ ok ? 'YES':'NO' }}</p>
		<p v-on:click="update">Update</p>
	`
	let vm = new Vue({
		el: div,
		data: {
			result: '*',
			click(event){
				let randomValue = Math.random()
				console.log(randomValue)
			},
			input(event){
				console.log(event, this)
			}
		},
		computed: {
			now(){
				console.log(this)
				return Date.now()
			}
		},
		methods: {
			update(e){
				e.target.textContent = vm.now + '-' + Math.random()
				console.log(this)
			}
		}
	})


	vm.html = `<span>KJKDFIKFD-KJDKF0KJDF</span>`//v-once导致渲染一次
	this.vm = vm
}


/* 
192.168.0.14
24
192.168.0.1
203.248.252.2
164.123.101.2
*/





/* 
option: {
	data: {},//writeable
	computed: {}// getter
}



*/

