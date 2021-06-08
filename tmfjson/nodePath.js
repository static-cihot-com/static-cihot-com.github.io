let p = 'Downloads';
if('E' in process.env) {
	p = `T:\\\\${p}\\`;
}else{
	p = `F:\\\\${p}\\`;
}


module.exports = p;