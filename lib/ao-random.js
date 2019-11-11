(function(g){
if(typeof g.ao==='undefined'){g.ao={};}
var ao=g.ao;

function random(min,max){
  if(typeof min==='number' || min instanceof Number){
    min=Math.max(min,Number.MIN_SAFE_INTEGER);
  }else{
    min=Number.MIN_SAFE_INTEGER;
  }
  if(typeof max==='number' || max instanceof Number){
    max=Math.min(max,Number.MAX_SAFE_INTEGER);
  }else{
    max=Number.MAX_SAFE_INTEGER;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
ao.random = random;


function randomBytes(n,s) {
	if(s===undefined) {
		s='abcdefghijklmnopqrstuvwxyz1234567890';
	}else if(typeof s!=='string'){
		s=s.toString();
	}
	if(n===undefined) {
		n=8;
	}
	var r='',l=s.length;
	while(n>0) {
		r+=s[Math.floor(Math.random()*l)];
		n--;
	}
	return r;
}
ao.randomBytes=randomBytes;


})(this);