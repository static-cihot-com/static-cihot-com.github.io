function ANWebSQL(name) {
	/*
	打开name数据库，并自动纠正版本错误。
	*/
  try {
  	this.db = openDatabase.apply(null, arguments);
  }catch(error){
  	// console.warn(error.message);
  	arguments[1] = error.message.match(/(?:currentVersion of ')(.+)(?:')/)[1]
  	this.db = openDatabase.apply(null, arguments);
  }
	/*
	获取版本 this.version;
	设置版本 this.version = 1.1;
	*/
  Object.defineProperty(this, 'version', {
		get:function() {return this.db.version;},
		set:function(v){this.db.changeVersion(this.db.version, v);
	}});

  this.exec = function(sqlStatement, prepareArray, onsuccess, onerror) {
		setTimeout(
  	this.db.transaction(function(t){
  		t.executeSql(sqlStatement, prepareArray, onsuccess, onerror);
  	})
		,0);
  }
}