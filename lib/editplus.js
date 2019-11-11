var editplus={
  decode:function(s){return s.match(/.{2}/g).map(function(e,i,a){return String.fromCharCode(parseInt(e,16));}).join('');},
  encode:function(s){return s.split('').map(function(e){return e+=' ';}).join('').split('').map(function(e){return e==' '?'00':e.charCodeAt(0).toString(16);}).join('');}
};