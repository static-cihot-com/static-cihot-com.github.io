'use strict';
(function(global,undefined){
function tableFilter(html,needTag) {
	var start='<!--StartFragment-->';
	var end='<!--EndFragment-->';
	start=html.indexOf(start);
	if(start===-1) return '';
	start+=20;

	end=html.lastIndexOf(end);
	if(end===-1) return '';

	var table=html.slice(start,end);

	var tagStart=/<(?!\/)(.+?)( [^\/]+?)?>/g;
	var searchReplaces=[];
	var tag;
	var tags;
	var tagName;
	var tagAttr;
	var tagLength;
	while(tag=tagStart.exec(table)){
		tagLength=tag.length;
		if(tagLength===3){
			// tags=tag[0].match(/<.+?>/m);
			// if(tags){
			// 	tag[0]=tags[0];
				
			// }
			tagName=tag[1];
			if(tagName==='col') {
				searchReplaces.push([tag[0],'']);
				continue;
			}
			if(tag[2]){
				tagAttr=tag[2].match(/(rowspan|colspan)=\d+/g);
				if(tagAttr){
					searchReplaces.push([tag[0], '<'+tagName+' '+tagAttr.join(' ')+'>']);	
				}else{
					searchReplaces.push([tag[0], '<'+tagName+'>']);
					// if(!tags) console.log(tag[0], '<'+tagName+'>', tagAttr)
				}
			}else{
				searchReplaces.push([tag[0], '<'+tagName+'>']);
			}

		}
	}

	searchReplaces.forEach(function(e){
		var search  = e[0];
		var replace = e[1];
		table=table.replace(e[0],e[1]);
	});

	table=table.trim();
	if(needTag) table='<table>'+table+'</table>';
	
	return table;
}

if(typeof global.ao !=='object') global.ao=Object.create(null);
global.ao.tableFilter=tableFilter;

})(this);