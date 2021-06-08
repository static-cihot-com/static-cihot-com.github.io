const { log } = console;

function numberMismatch(a, b) {
	// a = String(a);
	// b = String(b);

	let numbers = { a: [], b: [] };
	let numberRegExp = /\d+\.\d+|\d+/g;

	let m;
	while (m = numberRegExp.exec(a)) {
		numbers.a.push({ index: m.index, data: JSON.stringify(m), length:m.length });
	}
	while (m = numberRegExp.exec(b)) {
		numbers.b.push({ index: m.index, data: JSON.stringify(m), length:m.length });
	}
	return numbers;
}



let r = numberMismatch('aa 1 bb 2.2 cc 3 m4', 'BB 2.2 CC 3 AA 1');
log(r)


