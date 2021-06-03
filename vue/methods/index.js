let div = document.createElement('div')
document.body.append(div)
div.innerHTML = `
	<p v-text="p" v-on:click="update"></p>
`


Vue.config.ignoredElements = [
	//'p'
]

let vm = new Vue({
	el: div,
	data: {
		p: "PPP",
	},
	methods: {
		update(){
			this.p = `PPP-updated-${Date.now()}`
		}
	}
})