function Util(){}
Util.time=function(){}
Util.time.dHis=function(seconds){return [Math.floor(seconds/86400),Math.floor(seconds%86400/3600), Math.floor(seconds%3600/60), Math.floor(seconds%60)];};