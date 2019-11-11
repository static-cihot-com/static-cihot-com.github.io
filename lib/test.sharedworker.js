

//计数器
var connectCount=0;
var messageCount=0;






onconnect=function(e){
  connectCount++;

  var port=e.ports[0];
  port.postMessage('connect');
  port.postMessage(keys(e));
  
  port.onmessage=function(e2){
    messageCount++;
    port.postMessage(getResult(e2));
  };
};

"ports","data","source","path","srcElement","currentTarget","target"

/*
分类函数和属性
parameter 对象
return    分类后的对象
*/
function keys(obj){
  var r={'properties':[],'functions':[]};
  if(typeof obj=="object")
    for(var i in obj) typeof 
    obj[i]=='object'?r.properties.push(i):r.functions.push(i);
  return r;
}


function getResult(e){
  var r={
    'connect':connectCount,
    'message':messageCount
  };
  if(e){
    if(e.ports) r.eventPortsLength=e.ports.length;
    if(e.data) r.data=e.data;
  }
  return r;
}