document.onload=function(e){
  document.title="test.editer";
  console.log(1);
};
setTimeout(function(){
  var d=document,b=d.body,dc=d.createElement,t;
  
  b.innerHTML="<h3>Test Editer</h3>";
  
  t=b.appendChild(dc("div"));
  t.id="editerBox";
  t.appendChild(dc('textarea'));
  console.log(t);

},0);