function createUniqueKey(size=36,datePrefix=true) {
    let s = [];
    let chars = createUniqueKey.chars;
    let len  = chars.length;
    let time = Date.now().toString(36);

    for (let i = 0; i < size; i++) {
        s[i] = chars.substr(Math.floor(Math.random() * len), 1);
    }
	let uk = s.join('');
	
	return datePrefix ? Date.now().toString(36)+uk : uk;
}
createUniqueKey.chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';




//---------------------------------------------------------------------------
function* counter(start=0,step=1){
	while(true){
		yield start;
		start+=step;
	}
}

export {
	createUniqueKey as randomString,
	counter,
};