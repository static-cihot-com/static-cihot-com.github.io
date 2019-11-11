//核心基类，前后端通用        #20140128
//作者：次碳酸钴（admin@web-tinker.com）



/*************************************************************
#事件模型#
构造参数可以传入一个对象，表示为这个对象添加事件模型
操作接口类似jQuery
*************************************************************/
function EventModel(target){
  if(target)return EventModel.call(target);
  if(this==window)return new EventModel;
  var events={},cache={},space=/\s+/g;
  return this.on=function(name,func){
    var s,n,i;
    if(name instanceof Object)for(i in name)this.on(i,name[i]);
    else for(s=name.split(space),i=0;n=s[i];i++)
      n in events?events[n].push(func):(events[n]=[func]);
    return this;
  },this.off=function(name,func){
    var s,n,i,j,o;
    if(name instanceof Object)for(i in name)this.off(i,name[i]);
    else for(s=name.split(space),i=0;n=s[i];i++)
      if(n in events)if(!func)delete events[n];
      else for(j=0,o=events[n];j<o.length;j++)
        if(o[j]==func)events[n].splice(j,1),j=o.length;
    return this;
  },this.one=function(name,func){
    return this.on(name,callee);
    function callee(){
      func.apply(this,arguments);
      this.off(name,callee);
    };
  },this.trigger=function(name,args,delay){
    //s 参数name按空格分隔出的数组
    //n 逐个遍历s中的值,用于核对cache
    //i 逐个遍历s中的键,用于取出n
    //j 遍历events,取出事件列表,用于核对cache
    //k 
    //o 用j遍历events,取出的值
    var s,n,i,j,k,o,args=args||[];
    for(s=name.split(space),i=0;n=s[i];i++){
      //遍历s,逐个n查找cache,没有时建立正则
      if(!(n in cache))cache[n]=new RegExp("^"+n.replace(/\./g,"\\.")+"\\b");
      //用j遍历events,仅检测到正则的运行遍历
      for(j in events)if(cache[n].test(j))
        for(k=0,o=events[j].slice(0);k<o.length;k++)fire(this,o[k],args,delay);
    };
    return this;
  },this;
  function fire(o,f,a,d){
    d?f.apply(o,a):setTimeout(function(){f.apply(o,a);});
  };
};



/*************************************************************
#混合模型#
构造函数传入若干个对象
复制这些对象的所有属性给新对象
属性重复则取后者
*************************************************************/
function MixtureModel(/*...*/){
  if(this==window)return MixtureModel.apply({},arguments);
  for(var s=arguments,i=0,j;i<s.length;i++)
    if(s[i] instanceof Object)for(j in s[i])this[j]=s[i][j];
  return this;
};