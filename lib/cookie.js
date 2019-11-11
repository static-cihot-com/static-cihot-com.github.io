'use strict';
void (function(w){

var doc=w.document;
w._cookie=doc._cookie=function(name,value,ms){
  var len=arguments.length;
  if(len===0) return doc._cookie.valueOf();
  if(len===1) return doc._cookie[name];
  if(len>=2) return doc._cookie.add.apply(null,arguments);
};
doc._cookie.add=function add(name, value, ms){
  return doc.cookie=new doc._cookie.CookieParameter(name||'',value||'',ms||-1);
}
doc._cookie.remove=function remove(name,value){
  doc._cookie._data[name]=undefined;
  return doc.cookie=new doc._cookie.CookieParameter(name||'',value||'',-1);
}
doc._cookie.removeAll=function removeAll(){
  if(doc.cookie.length===0) return ;
  var
  arr=doc.cookie.split('; '), i=0,len=arr.length,temp;
  while(i<len){
    temp=arr[i];
    this.remove(temp.slice(0,temp.indexOf('=')));
    i++;
  }
}
doc._cookie.valueOf=function valueOf(){
  if(doc.cookie.length===0) return doc._cookie._data=Object.create(null);
  var
  arr=doc.cookie.split(/; */), data=doc._cookie._data=Object.create(null), i=0,len=arr.length,temp,tempIndex;
  while(i<len){
    temp=arr[i];
    tempIndex=temp.indexOf('=');
    data[temp.slice(0,tempIndex)]=temp.slice(tempIndex+1);
    i++;
  }
  return data;
}
doc._cookie.valueOf();

doc._cookie.CookieParameter=CookieParameter;
function CookieParameter(name,value,expires){
  this.name=name;
  this.value=value;
  this.expires=expires;
}
CookieParameter.prototype.toString=function toString(){
  return this.name+'='+this.value+';'+this.expires;
}
Object.defineProperty(CookieParameter,'name',{
  set(name){this.name=encodeURIComponent(name);},
  get(){return decodeURIComponent(this.name);}
});
Object.defineProperty(CookieParameter,'value',{
  set(value){this.value=encodeURIComponent(value);},
  get(){return decodeURIComponent(this.value);}
});
Object.defineProperty(CookieParameter,'expires',{
  set(expires){
    if(expires instanceof Number){
      this.expires=new Date(Date.now()+parseInt(expires));
    }
    this.expires=(this.expires instanceof Date) ? 'expires='+this.expires.toGMTString() : '';
  },
  get(){return this.expires;}
});
})(window);