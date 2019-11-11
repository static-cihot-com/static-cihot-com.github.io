//indexedDB���׷�װ      �汾��20141015
//���ߣ���̼���ܣ�admin@web-tinker.com��
/****************************************************************
  #include core.js#20140128+  
  var idb=new SimpleIDB(����,�汾,�ṹ);
  idb.put(�洢������,����/����[,�ص�]);
    �ص���������
  idb.get(�洢������,ID/����,�ص�);
    �ص�����������/����
  idb.delete(�洢������,ID/����[,�ص�]);
    �ص���������
  idb.iterate(�洢������,������,����,����,�ص�);
    �ص�������0.ֵ  1.��ţ���1������NaNΪEOF��
    �ص����أ�����false����ֹ����
  idb.query(�洢������,[������,����,][����,][����,]�ص�);
    �ص���������������
  idb.clear([�洢������/����]);
    û�в�����������д洢���������
  SimpleIDB.delete(����[,�ص�]);
    �ص���������
  iterate��query�����ġ�������������ʽ
    {"=":ֵ} //���ڡ����ڡ�ʱ��������������
    {">":ֵ,">=":ֵ,"<":ֵ,"<=":ֵ} //������ϣ������ǡ��ҡ��Ĺ�ϵ
  ���캯���ġ��ṹ��������ʽ
    {
      �洢������:[�洢�������,...,{
        ������:[��������,...],...
      }],...
    }
  �����¼�ģ�ͣ�����ʹ��on��off��trigger���������������¼�
  upgraded �¼����汾�����󴥷�
  open �¼����ɹ��򿪺󴥷�
  error �¼����򿪲��ɹ�����
  ���ڲ�֧��IDB����������ѣ�����ɴ��󣬵��ص��������ᱻ����
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