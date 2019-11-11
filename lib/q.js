/*
用html标签围起来
  @t tagname
  return String
Ex:
  string.tag('p');// <p>string</p>
*/
String.prototype.tag=function(t){
  return '<'+t+'>'+this+'</'+t+'>';
};

/*
获取遍历的键集
return Array
*/
Object.prototype.keys=function(){
  return Object.keys(this);
};
Array.prototype.keys=function(){
  return Object.keys(this);
};