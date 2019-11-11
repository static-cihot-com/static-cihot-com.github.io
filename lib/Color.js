class Color {}
Object.defineProperties(Color,{
	stringify:{
		value: function stringify(color,minimize=true) {
			color=color.toString(16);
			color=(color.length<6) ? color.padStart(6,'0') : (color.length===7?'0'+color:color);
			if(minimize && /^((\w)\2)+$/ .test(color)){
				color=color.replace(/\w{2}/g,function(m,i,s){
					return m[0];
				});
			}
			return '#'+color.substr(0,8);
		}
	},
	parse: {
		value: function parse(color){
			if(typeof color==='string' && color[0]==='#') color=color.slice(1);
			if(color.length<6){
				color=color.replace(/\w/g,'$&$&');
			}
			return parseInt(color,16);
		}
	}
});
