//indexedDB简易封装      版本：20141015
//作者：次碳酸钴（admin@web-tinker.com）
/****************************************************************
  #include core.js#20140128+  
  var idb=new SimpleIDB(库名,版本,结构);
  idb.put(存储对象名,数据/数组[,回调]);
    回调参数：无
  idb.get(存储对象名,ID/数组,回调);
    回调参数：数据/数组
  idb.delete(存储对象名,ID/数组[,回调]);
    回调参数：无
  idb.iterate(存储对象名,索引名,条件,排序,回调);
    回调参数：0.值  1.序号（从1计数，NaN为EOF）
    回调返回：返回false则终止迭代
  idb.query(存储对象名,[索引名,条件,][排序,][数量,]回调);
    回调参数：数据数组
  idb.clear([存储对象名/数组]);
    没有参数则清空所有存储对象的数据
  SimpleIDB.delete(库名[,回调]);
    回调参数：无
  iterate和query方法的“条件”参数格式
    {"=":值} //存在“等于”时将无视其它条件
    {">":值,">=":值,"<":值,"<=":值} //任意组合，它们是“且”的关系
  构造函数的“结构”参数格式
    {
      存储对象名:[存储对象参数,...,{
        索引名:[索引参数,...],...
      }],...
    }
  基于事件模型，可以使用on、off、trigger三个方法来操作事件
  upgraded 事件：版本提升后触发
  open 事件：成功打开后触发
  error 事件：打开不成功触发
  对于不支持IDB的浏览器而已，不造成错误，但回调函数不会被调用
****************************************************************/
define(["indexeddb"],function(indexedDB){
  var SimpleIDB=function(name,version,struct){
    if(this==window)return new SimpleIDB(name,version,struct);
    var that=EventModel(this),db,state=0;
    that.transaction=function(){
      var s=Array.prototype.slice.call(arguments);
      if(state<2)return this.one("open",function(){
        this.transaction.apply(this,s);
      });
      var name=s.shift(),callback=s.pop(),mode,n;
      while(s.length)if(typeof (n=s.pop())=="string")mode=n;
      if(!mode)mode="readwrite";
      callback(db.transaction(name,mode));
      return this;
    };
    that.getOriginal=function(callback){
      return state<2?this.one("open",function(){
        this.getOriginal.call(this,callback);
      }):callback.call(this,db),this;
    };
    (function(){
      if(this==window)return that.trigger("error",[],true);
      this.addEventListener("upgradeneeded",function(e){
        state=1,db=e.target.result;
        var transaction=e.target.transaction,i,j,o,a,s,f;
        var s=Array.prototype.slice.call(db.objectStoreNames);
        for(var i=0;i<s.length;i++)db.deleteObjectStore(s[i]);
        for(i in struct)if(!db.objectStoreNames.contains(i)){
          a=struct[i],s=a.pop();
          a=db.createObjectStore.apply(db,[i].concat(struct[i]));
          for(j in s)a.createIndex.apply(a,[j].concat(s[j]));
        };
        that.trigger("upgraded");
      });
      this.addEventListener("success",function(e){
        state=2,db=e.target.result;
        that.trigger("open");
      });
      this.addEventListener("error",function(e){
        that.trigger("error");
      });
    }).call(indexedDB.open(name,version));
  };
  SimpleIDB["delete"]=function(name,callback){
    if(!indexedDB)return false;
    var t=indexedDB.deleteDatabase(name);
    if(callback)t.onsuccess=function(){callback();};
  };
  SimpleIDB.prototype={
    iterate:function(name,index,condition,order,callback){
      return this.transaction(name,"readonly",function(o){
        var i=0,o=o.objectStore(name),range;
        if(index)o=o.index(index);
        if(condition!=null)
          if("=" in condition)range=IDBKeyRange.only(condition["="]);
          else {
            var lx,lv,gx,gv;
            if("<=" in condition)lx=false,lv=condition["<="];
            else if("<" in condition)lx=true,lv=condition["<"];
            if(">=" in condition)gx=false,gv=condition[">="];
            else if(">" in condition)gx=true,gv=condition[">"];
            if(lx!=null&&gx!=null)range=IDBKeyRange.bound(gv,lv,gx,lx);
            else if(lx!=null)range=IDBKeyRange.upperBound(lv,lx);
            else if(gx!=null)range=IDBKeyRange.lowerBound(gv,gx);
          };
        o.openCursor(range||null,order?"prev":"next").onsuccess=function(e){
          if(e=e.target.result)
            callback(e.value,++i)===false||e["continue"]();
          else callback(null,0/0);
        };
      });
    },query:function(){
      var name,index,condition,order,limit,callback,
          a=Array.prototype.slice.call(arguments),n,s=[];
      name=a.shift(),callback=a.pop();
      if(typeof a[1]=="object")index=a.shift(),condition=a.shift();
      while(a.length)if(typeof (n=a.pop())=="number")limit=n;else order=n;
      if(!limit)limit=1/0;
      this.iterate(name,index,condition,order,function(v,a){
        if(a&&a<=limit)s.push(v);
        else return callback(s),false;
      });
    },clear:function(names,suc,fal){
      if(typeof names=="function")callback=names,names=null;
      if(!names)return this.getOriginal(function(db){
        names=Array.prototype.slice.call(db.objectStoreNames,0);
        this.clear.call(this,names,suc,fal);
      });
      return this.transaction(names,function(e){
        var wasArray=names instanceof Array;
        if(!wasArray)names=[names];
        var results=[];
        var count=names.length+1;
        for(var i=0;i<names.length;i++)(function(index){
          var request=e.objectStore(names[i]).clear();
          request.onsuccess=function(e){
            results[index]=e.target.result;
            --count||ondone();
          };
          request.onerror=onerror;
        })(i);
        e.addEventListener("complete",function(){
          --count||ondone();
        });
        function ondone(){
          if(!wasArray)results=results[0];
          suc&&suc(results);
        };
        function onerror(e){
          suc=null;
          fal&&fal(e);
        };
      });
    },put:makeBatch("put"),get:makeBatch("get"),"delete":makeBatch("delete")
  };
  function makeBatch(type){
    return function(name,args,suc,fal){
      return this.transaction(name,function(e){
        var obj=e.objectStore(name);
        var results=[];
        var wasArray=args instanceof Array;
        if(!wasArray)args=[args];
        var count=args.length+1;
        for(var i=0;i<args.length;i++)(function(index){
          var request=obj[type](args[index]);
          request.onsuccess=function(e){
            results[index]=e.target.result;
            --count||ondone();
          };
          request.onerror=onerror;
        })(i);
        e.addEventListener("complete",function(){
          --count||ondone();
        });
        function ondone(){
          if(!wasArray)results=results[0];
          suc&&suc(results);
        };
        function onerror(e){
          suc=null;
          fal&&fal(e);
        };
      });
    };
  };
  return SimpleIDB;
});