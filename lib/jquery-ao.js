(function( $ ) {

	$.fn.aoPaste = function(opt) {
		// appendTo: 'body'  - selector
		// css: {} - object
		opt=$.extend({
			css:{
				width:'32px',
				height:'32px',
				border:'2px solid #CCC',
				display:'inline-block'},
			appendTo:'body',
			trans:true,
		},opt)

		if(this.parent().length==0) this.appendTo('body')
		this
		.on('focus',function(){
			$(this).css({border:'2px solid #090'})
		})
		.on('blur', function(){
			$(this).css({border:'2px solid #CCC'})
		})
		.prop('contentEditable',true)
		.css(opt.css)
		.attr('class','aoPaste')
		.on('paste',function(e){
			var data=e.originalEvent.clipboardData
			var html=data.getData('text/html')
			var text=data.getData('text/plain')
			var t
			if(html){
				// console.log(html)
				$(this).hide()
				t=$(html).find('*').removeAttr('height width style class cellpadding cellspacing border').end()
				if(t.find('tr').length){
					t=$('<table><tbody></tbody></table>')
					.find('tbody').append(t.find('tr'))
					.end()
				}else if($(html).text().length){
					t=$('<table><tbody><tr><td></td></tr></tbody></table>')
					.find('td').text($(html).text())
					.end()
				}
				$(this).show()
			}else if(text){
				$(this).hide()
				t=$('<table><tbody><tr><td></td></tr></tbody></table>').find('td').text(text).end()
				$(this).show()
			}else{
				return false;
			}
			if(t) {
				t.appendTo(opt.appendTo).find('td').css({
					'border-top':'1px solid #CCC',
					'border-left':'1px dashed #CCC',
					'border-bottom':'none',
					'border-right':'1px dashed #CCC',
					'padding':'8px',
					'font-size':'12px',
					'font-family':'"Microsoft YaHei","MS PGothic",Ghotic,Tahoma,Arial',
					// 'white-space':'pre',
					'max-width':'400px',
				})
				// 如果trans为true，那么旁边复制出内容
				if(opt.trans) {
					t.find('td').each(function(i,e){
						var origin=$(e)
						var trans=$(e).clone().attr('contentEditable',true).addClass('trans')
						origin.addClass('origin').after(trans)
					})
				}
				$(opt.appendTo).dialog('open')

				$(opt.appendTo).find('tr').appendTo('table:first')
				$(opt.appendTo).find('table:gt(0)').remove()
			}
			return false;
		})
		return this;
	}





})( jQuery );



(function($){
	$.similarTable = function (table,trIndex,tdIndex,selector) {
		if(!table) return ;
		selector=selector||'td'
		trIndex=trIndex||0
		tdIndex=tdIndex||0

		var tr=$(table).find('tr')
		,first=tr.get(trIndex)
		,second
		,percent

		$('tr')
		.each(function(i,e){
			if(e===first)
			second=$(e).find('td').eq(tdIndex)
			percent=$.similarText($(first).text(), $(e).find('td').eq(tdIndex).text(),true)
			$(e).attr('similar', percent).attr('title',percent)
		})
		.sort(function(a,b){
			a=$(a).attr('similar')
			b=$(b).attr('similar')
			return (a>b)?-1:(a==b?0:1)
		}).detach().appendTo(table)
		return tr.end()
	}
})(jQuery);



$.post = function(url, data, done) {
	var ajax = $.ajax({
		contentType:'application/x-www-form-urlencoded; charset=UTF-8',
		// contentType:'multipart/form-data',
		// contentType:'text/plain',
		method: "POST",
		url: url,
		data: data,
		// dataType: "html",
	});
	if(typeof done==='function') ajax.done(done);
}