// var sample = 'sample.js';
// // alert('sample.js');
// console.log(sample);
// var s=document.createElement('script');s.src='http://localhost/sample.js';document.body.appendChild(s);



var i=0;
function Loader(url,type) {
	this._init(url,type);
}
Loader.contents=[];
Loader.prototype.type='document';
Loader.prototype._init=function(url,type) {
	var l=this._xmlHttpRequest=new XMLHttpRequest();
	// l.setRequestHeader('host', 'runoob.com');
	l.responseType=type||this.type;// "","arraybuffer","blob","document","json","text"
	l.open('GET',url,true);
	l.onloadend=this._loadendCallback;
	l.send(null);
};
Loader.prototype._loadendCallback=function(e){
	var doc=e.target.response;
	var c=doc.getElementById('content');
	c.setAttribute('id','h_'+i);i++;
	d.appendChild(c);
};



// var rs = [];
var d=document.createDocumentFragment();

var s=document.querySelectorAll('#leftcolumn a');
var t=document.createElement('div');
t.id="#leftcolumn";
s.forEach(function(e,i){
	t.appendChild(e);
	e.removeAttribute('target');
	e.setAttribute('href','#h_'+i);
	e.textContent=e.textContent.trim();

	var l=new Loader(e.href,'document');
});
d.appendChild(t);


setTimeout(function(){
	var w = open('about:blank');
	w.document.head.textContent=document.body.textContent='';
	w.document.head.innerHTML = '<link rel="stylesheet" href="../runoob.css" type="text/css" media="all">\
<meta charset="utf-8">\
<style>\
#leftcolumn {max-width:8em; position:absolute; left: 0;}\
#content {max-width:40em; position:absolute; left: 9em;}\
</style>\
<script>\
window.ondblclick=function(){\
  location.assign(\'#leftcolumn\');\
  window.focus()\
}\
</script>';

	w.document.body.appendChild(d);
},2000);




// 

var rs=[];
while(ts=document.querySelector('.example')){
	var t=ts.nextElementSibling;
	if(t.outerHTML=='<p>尝试每个实例，并且在线修改代码，查看不同的运行效果！！！</p>') t.remove();
}

$$('.example').forEach(function(e){e.remove();});
$$('p').forEach(function(e){
	if(e.outerHTML=='<p>尝试每个实例，并且在线修改代码，查看不同的运行效果！！！</p>'
		||e.outerHTML=='<p>在每个页面您可以点击 "尝试一下" 在线查看实例！！！</p>') e.remove();
});






// 最小公倍数

function gcd(a,b){
	return a%b?gcd(b,a%b):b;
}

function gcd(a,b){
	var temp;
	while(b){
		// 利用辗除法(欧几里德算法)，直到b为0为止
		temp=b;
		b=a%b;
		a=temp;
	}
	return a;
}



//等差数列
// a1第一项  第n项  difference等差数列的公差
function sn(a1,n,d){
	return n*(a1+an(a1,n,d?d:1))/2;
}
function an(a1,n,d){
	return a1+(n-1)*(d?d:1);
}


// 有个人卖鸭子,第一次卖一半加1只,第二次同理,共卖了10次,求解他开始有几只鸭子.
function duck(country){
	if(country==10){
		return 1;
	}else{
		return (duck(country+1)+1)*2;
	}
}

// duck(1);
var n=1;
for(var i=0,len=10; i<len; i++ ){
	n+=(n+1)*2;
}