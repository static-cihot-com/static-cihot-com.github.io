function onkeydownActiveTextareaInputTabKey(e){
	e.preventDefault();
	var t=e.target, v=t.value, start, end, cursor;
	start = v.slice(0,t.selectionStart);
	end   = v.slice(t.selectionEnd);
	cursor = t.selectionStart+1;


	t.value = start+'t'+end;
	t.setSelectionRange(cursor,cursor);
}