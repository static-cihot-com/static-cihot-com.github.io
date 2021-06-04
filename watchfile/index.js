let socket = io()

socket.on('connect', function(){
	console.log('connectd')
})

socket.on('close', function(){
	console.log('closed')
})




let vm = new Vue({
	el:'#app',
	data: {
		filename:'',
		url:'',
		ws: [],
	},
	methods: {
		unwatch(event){
			
		},
		submit(){
			console.log(this)
		}
	}
})