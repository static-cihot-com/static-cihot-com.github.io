/*
worker.js
*/
var i=0;


onmessage=function(e){
  this.postMessage({data:e.data,'this':this});
});