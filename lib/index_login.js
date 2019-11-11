Date.prototype.toString=function(){
	return this.getFullYear()+'年'+(this.getMonth()+1)+'月'+this.getDate()+'日 '+this.getHours()+'时'+this.getMinutes()+'分'+this.getSeconds()+'秒';
}

var _t=new Date();
_t.setTime(ltime+'000');
$('#tResult').append('<tr><td>'+'上一次登录时间'+'</td><td>'+_t+'</td></tr>');

_t.setTime(ptime+'000');
$('#tResult').append('<tr><td>'+'积分获取时间'+'</td><td>'+_t+'</td></tr>');

_t.setTime(rtime+'000');
$('#tResult').append('<tr><td>'+'注册时间'+'</td><td>'+_t+'</td></tr>');


//$.get('./pro/xml/fromauthor.xml',function(data){$('#mgs').html(data);},'text');