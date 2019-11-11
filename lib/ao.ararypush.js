(function(g,undefined){
if(typeof g.ao==='undefined'){g.ao={};}


var arrayPush = ao.arrayPush = function arrayPush(a,b,down){
	down=down||0;
	var ret=[],
	i=Math.min(0,down),
	aLength=a.length,
	bLength=b.length,
	min=Math.min(aLength,bLength),
	max=Math.max(aLength,bLength),
	len=Math.max(min+Math.abs(down),max);
	console.log(len)

	while(i<len) {
		ret.push((a[i]||[]).concat(b[i-down]||[]));
		i++;
	}
	return ret;
}


})(this);