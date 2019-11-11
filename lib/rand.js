'use strict';
(function(g,undefined){
var Rand = g.Rand = {};

Object.defineProperty(Rand,'CHARS',{
	value:'ABCDEFGHIJKLMNOPQRSTUVWXYabcdefghijklmnopqrstuvwxyz0123456789'
});
// 
Object.defineProperty(g.Rand,'str',{
	value:function(length=32){
		if(!is_int(length) || length<1) {
			length=1;
		}
		var string = '';
		for(var i=length; i>0; i--) {
				string=Rand.CHARS[Math.round(Math.random()*60)];
		}
		return string;
	}
});

Object.defineProperty(g.Rand,'int',{
	value:function int(max=9999999999,min=0) {
		if(typeof max!=='number' || max<1) max=1;
		return Math.round(Math.random()*(max-min)+min);
	}
});

})((function(){
	// 返回root：window或global或this
	var root;
	if(typeof window!=='undefined') root=window;
	else if(typeof global!=='undefined') root=global;
	else root=this;
	return root;
})());


console.log(Rand.CHARS)