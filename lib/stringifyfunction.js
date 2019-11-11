// 处理function字符串化
(function(g){
	function stringify(f) {
		if (typeof f === 'function') {
			f = f.toString()

			// 适用于箭头函数，将其箭头去掉。
			let end = f.indexOf('{')
			let head = f.slice(0, end)
			let body = f.slice(end)
			let splitIndex = head.lastIndexOf('=>')
			if (splitIndex !== -1) {
				head = head.slice(0, splitIndex) + head.slice(splitIndex + 2)
			}
			f = head + body
			log(f)
			// 处理对象函数，头部添加function关键字。适用于对象属性{ f(){} } 或 箭头函数()=>{} 的情况。
			if (!/^ function\s*(/.test(f)) {
				f = 'function ' + f
			}
		} else {
			// 如果不是函数，则返回一个匿名空函数
			f = 'function (){}'
		}
		return f
	}
	g.stringifyFunction = stringify
})(this)