'use strict';

class Random {
	static get CHARS(){
		return 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	}

	static get CHARS_LENGTH(){
		return 62;
	}


	static get char(){
		return this.CHARS[this.charIndex];
	}
	static get charIndex(){
		return Math.round(Math.random()*this.CHARS_LENGTH);
	}

	static integer(){
		let max=Number.MAX_SAFE_INTEGER, min=0, r=Math.random();
		if(arguments.length===1){
			max=arguments[0];
		}else{
			min=Math.min(...arguments);
			max=Math.max(...arguments);
		}
		return Math.round(max*r+min*(1-r));
	}
	static id(len=32,limits=[10,20], symbol='-') {
		let id='',i=len;
		while(i--) {
			id+=this.char;
		}
		if(limits && typeof limits==='number'){
			limits=[limits];
		}
		if(limits && Array.isArray(limits)) {
			limits = limits.filter(e=>(e>0)&&(e<len));
			if(limits.length){
				let res=[],start=0;
				limits.forEach(e=>{
					res.push(id.slice(start,e));
					start=e;
				});
				res.push(id.slice(start));
				id=res.join(symbol);
			}
		}
		return id;
	}
}
