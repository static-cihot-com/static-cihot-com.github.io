//Synchronous Modules Loading
if(!window.localStorage)document.write('<script src="/localStorage.js"></script>');
if(!window.JSON)document.write('<script src="/JSON.js"></script>');

//Asynchronous Modules Loading
require.config({paths:{
  jquery:"jquery-1.10.2.min.js",
  indexeddb:"indexedDB.js",
  simpleidb:"simpleidb.2.0.js"
},baseUrl:"/"});
if(window.indexedDB)define("indexeddb",indexedDB);
if(window.Promise&&window.Promise.all)define("promise",function(){return Promise;});
define("promise#!resolve,reject,all,race,then,catch",["Promise.js"],function(Promise){
  return Promise;
});
var SimpleIDB=require("simpleidb#!put,get,query,delete,clear,on");
var $=require("jquery#fn.extend,on,trigger,resize,load,each,addClass,attr,find");
var Server=require("server.js?1413279959#on,trigger,bind,sign,put,query,noop,pull,cached,cascade,invoke,conch.hello,conch.bye,conch.getCounter");
var County=require("county.js?1413409268#insert,get,remove,last,getParameters,on,one,has");
var highlight=require("highlight.js?1413280235#!decodeHTML");
var md5=require("md5.js?1413280301#!md5");
var gesture=require("gesture.js?1413284481#!on");
var dialog=require("dialog.js?1413284476#!popup,cancel,lock,unlock,on");
var action={
  index:require("action.index.js?1413588435#!"),
  articlelist:require("action.article.list.js?1413407747#!"),
  articledetail:require("action.article.detail.js?1413284406#!"),
  subjectpublish:require("action.subject.publish.js?1413284443#!"),
  subjectlistst:require("action.subject.list.st.js?1413284439#!"),
  subjectlistpg:require("action.subject.list.pg.js?1413284434#!"),
  subjectdetail:require("action.subject.detail.js?1413296338#!"),
  subjectdetailim:require("action.subject.detail.im.js?1413625948#!"),
  subjectdetailpg:require("action.subject.detail.pg.js?1413284431#!"),
  selection:require("action.selection.js?1413284420#!")
},common={
  makeTornado:require("common.maketornado.js?1413284452#!"),
  makeXEditor:require("common.makexeditor.js?1413284456#!"),
  popupSettings:require("common.popupsettings.js?1414918696#!"),
  popupQQManual:require("common.popupqqmanual.js?1413289154#!"),
  popupPreview:require("common.popuppreview.js?1413284461#!")
},baidu={
  share:require("baidu.share.js?1413289223#!")
};

//环境检测
var isIE=navigator.userAgent.match(/(?:MSIE |Trident.*rv:)(\d+)|$/i)[1],
    isWebkit=/webkit/i.test(navigator.userAgent),
    isWindows=/Windows NT/.test(navigator.userAgent);

//Cookie操作定义
var common=new MixtureModel(common,{
  setCookie:function(n,v,t){ //设置cookie，默认永久
    document.cookie=n+"="+encodeURIComponent(v)+"; Expires="+(t?t.toGMTString():"Fri, 31 Dec 9999 23:59:59 GMT")+"; Path=/";
  },getCookie:function(n){ //获取入cookie，如果没有参数则直接获取整个cookie对象
    var s=document.cookie.split("; "),i,o={},r=/^(\S*?)((?:\[.*?\])*)(?:=(.*?))?$/;
    for(s.sort(),i=0;i<s.length;i++)s[i].replace(r,function($0,name,sub,value){
      value=decodeURIComponent(value);
      if(!sub)return o[name]=value;
      var i,n,m=o,s=sub.slice(1,-1).split("]["),n=s.pop();
      for(s.unshift(name),i=0;i<s.length;i++)
        m=s[i] in m?typeof m[s[i]]=="string"?m[s[i]]=new String(m[s[i]]):m[s[i]]:m[s[i]]={};
      m[n]=value;
    });
    return n&&n.replace(r,function($0,name,sub){
      var s=("["+name+"]"+sub).slice(1,-1).split("]["),i;
      for(i=0;i<s.length;i++)s[i] in o?o=o[s[i]]:o=i=void 0;
    }),o;
  }
});



/*****************************************************************
                           兼容性调整
*****************************************************************/

//根据支持程度切换版本
(function(){
  var support=!!window.WebSocket;
  var state=common.getCookie("ISMODERN")!="false";
  if(support^state)throw setTimeout(function(){
    support?common.setCookie("ISMODERN","true",new Date(0)):common.setCookie("ISMODERN","false");
    location.reload();
  }),new Error("版本切换中···");
})();
//IE兼容性处理
if(isIE<8){
  //防错处理
  if(!window.console)window.console={log:function(){}};
}
if(isIE<9){
  (function(s,i){ //HTML5标签兼容
    for(i=0;i<s.length;i++)document.createElement(s[i]);
  })(["article","section","aside","header","footer","nav","time"]);
  $(document).on("focus","a",function(){this.blur()}); //A标签除虚线
};
if(isIE<10){
  //计时器方法回调参数兼容
  (function(){
    var slice=Array.prototype.slice;
    for(var i=0,s=["setTimeout","setInterval"];i<s.length;i++)(function(n,v){
      window[n]=function(f,d,s){
        s=slice.call(arguments,2);
        return s.length?v(function(){f.apply(n,s);},d):v(f,d);
      }
    })(s[i],window[s[i]]);
  })();
};
//修复Chrome下fixed元素存在时的滚动条BUG
isWebkit&&document.addEventListener("DOMContentLoaded",function(){
  var e=document.getElementById("roof"),de=document.documentElement;
  if(document.body.scrollHeight>document.documentElement.clientHeight)
    //对滚动条做一个小操作，使其能够正确计算
    document.addEventListener("scroll",function callee(){
      de.scrollTop--,de.scrollTop++;
      document.removeEventListener("scroll",callee);
    });
  else document.addEventListener("scroll",function callee(){
    e.style.position="fixed";
    document.removeEventListener("scroll",callee);
  }),e.style.position="absolute";
});



/*****************************************************************
                          创建全局对象
*****************************************************************/

//创建服务器交互对象
var server=new Server(location.hostname,8000).on({
  open:function(){
    $(function(){
      var network=$("#network");
      setInterval(update,6E4),update();
      network.attr("title","连接成功");
      function update(){
        var t=new Date;
        server.noop(function(){
          var i=new Date-t,y=i<5000?i<2000?i<800?i<100?48:64:80:96:112;
          network.css("background-position","0px -"+y+"px").attr("title","延迟 "+i+"ms");
        });
      };
    });
  },close:function(){
    $(function(){
      $("#network").css("background-position","0px -112px").attr("title","已断开");
    });
  }
});
//创建本地数据缓存对象
var database=new SimpleIDB("web-tinker",11,{
  articles:[{keyPath:"id"},{
    id:["id"],creationtime:["creationtime"]
  }],comments:[{keyPath:"id"},{
    id:["id"],article_id:["article_id"],creationtime:["creationtime"]
  }],subjects:[{keyPath:"id"},{
    id:["id"],replytime:["replytime"],creationtime:["creationtime"]
  }],replies:[{keyPath:"id"},{
    id:["id"],subject_id:["subject_id"],creationtime:["creationtime"]
  }]
}).on("upgraded",function(){
  localStorage.removeItem("sign");
}).on("open",function(){
  server.sign(localStorage.getItem("sign")||"",function(e){
    if(e!=localStorage.getItem("sign"))database.clear();
    localStorage.setItem("sign",e);
  });
});
//页面缓存操作对象
var pageCache={
  save:function(path,title,body){
    localStorage.setItem("page-cache-time",pageCache.time=new Date/1000|0)
    localStorage.setItem("page-cache-"+path+":title",title);
    localStorage.setItem("page-cache-"+path+":body",body);
  },load:function(path){
    return {
      title:localStorage.getItem("page-cache-"+path+":title"),
      body:localStorage.getItem("page-cache-"+path+":body")
    };
  },has:function(path){
    return !!localStorage.getItem("page-cache-"+path+":title");
  },time:localStorage.getItem("page-cache-time")
};
//全局通用操作对象
var common=new MixtureModel(common,{
  makeAT:function(n,content){
    var t=content.val("@"+n+" "+content.val()).val(),l=t.length;
    if(!isIE)return  content.prop({selectionStart:l,selectionEnd:l});
    t=content.prop("createTextRange")(),t.moveStart("character",l),t.select();
  },makeTimestamp:function(e){ //获得一个“Y-m-d H:i:s”格式的时间戳
    return e=e?new Date(e):new Date,[
      [e.getFullYear(),e.getMonth()+1,e.getDate()].join("-"),
      [e.getHours(),e.getMinutes(),e.getSeconds()].join(":")
    ].join(" ").replace(/\b(\d)\b/g,"0$1");
  },makeElapse:function(time){
    var now=new Date,time=new Date(time),diff=(now-time)/1000|0,datediff,result;
    if(time.getYear()==now.getYear()&&time.getMonth()==now.getMonth()){
      if((datediff=now.getDate()-time.getDate())==0)
        if(result=diff/3600|0)return result+"小时前";
        else if((result=diff/60|0)>0)return result+"分钟前";
        else return "1分钟内";
      else if(datediff==1)return "昨天"+time.getHours()+"点";
      else if(datediff==2)return "前天"+time.getHours()+"点";
      else return (diff/86400|0)+1+"天前"
    }else return (time.getMonth()+1+"-"+time.getDate()).replace(/\b(?=\d\b)/g,"0");
  },highlight:function(s){ //高亮代码
    $(s||"code[type^=highlight]").each(function(){
      var o=$(this),type=o.attr("type"),source=o.html();
      type=type.split("/")[1].toLowerCase();
      highlight(source,type=="demo"?"html":type,function(e){
        o.empty().removeAttr("type");
        if(type=="demo")$("<a/>").addClass("run").text("运行").click(function(){
          highlight.decodeHTML(source,function(code){
            if(!isIE)return open(URL.createObjectURL(new Blob([code],{type:"text/html; charset=UTF-8"})));
            var d=open("about:blank").document;d.write(code),d.close();
          });
        }).attr("href","JavaScript:").appendTo(o);
        o.append(e);
      });
    });
  },makeSimpleHTML:function(e){  //清除HTML标签（附带特殊标签装文字描述）
    var r=/(@.+?(?=&nbsp;))|(<img[\s\S]+?>)|(<audio[\s\S]+?>)|(<code[\s\S]+?<\/code>)|(\s+)|(<[\s\S]+?>)/g;
    return (e||"").replace(r,function($0,at,img,ado,code,space,tag){
      return at?at:img?"[图片]":ado?"[声音]":code?"[代码]":space?" ":"";
    });
  },encodeHTML:function(e){ //HTML转义
    return (e||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\s/g,"&nbsp;").replace(/"/g,"&quot;");
  },decodeHTML:function(e){ //HTML转义
    return (e||"").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&nbsp;/g," ").replace(/&quot;/g,'"').replace(/&amp;/g,"&");
  },scrollTo:(function(){
    var doc,itv,k=0.8,v,e,f,s;
    function scroll(){
      if(s*(e-v)<s*0.5)return itv=void 0,f&&f();
      doc.scrollTop(v=e-(e-v)*k+s*1),itv=setTimeout(scroll,16);
    };
    return function(end,callback){
      if(doc==void 0)doc=$(document);
      if(itv)clearTimeout(itv),itv=void 0,doc.scrollTop(e),f&&f();
      v=doc.scrollTop(),e=end,s=v>e?-1:1,f=callback,scroll();
    };
  })(),pull:function(query,source,suc,fal){
    server.pull(query,function(err,dat,ids){
      if(err)return console.log(err);
      database.put(source,dat,function(){
        for(var i=0,s=[];i<dat.length;i++)s.push(dat[i].id);
        if(s.length)server.cached(source,s);
        database.get(source,ids,suc,fal);
      },function(s){
        console.log("Catch",s);
      });
    });
  },safeWith:function(f,s){
    var i,keys=[],values=[];
    for(i in s)keys.push(i),values.push(s[i]);
    new Function(keys,"("+f+")();").apply(null,values);
  },loadCountyCache:function(p,n){
    if(!p&&document.readyState!="complete")
      p=document.scripts[document.scripts.length-1].parentNode;
    if(!p)return console.log("loadCountyCache错误");
    if(n||(n=p.getAttribute("data-cache"))){
      p.setAttribute("data-fromcache","true");
      if(n=localStorage.getItem("county-cache-"+n))
        p.insertAdjacentHTML("afterbegin",n);
      else p.className+=" loading";
    };
  },initCountyState:function(county){
    county.one("change",function(e){
      this.getParameters(function(parameters){
        if(e=parameters.target.className.replace(/\bloading\b/,""))
          parameters.target.className=e;
        else parameters.target.removeAttribute("class");
      });
    });
  }
});


/*****************************************************************
                           初始化操作
*****************************************************************/

//更新时间戳
setInterval(function(){$("time[value],time[data-value]").trigger("update");},1E4);
$(document).on("update","time[value],time[data-value]",function(){
  var o=$(this),s=o.attr("value")||o.attr("data-value");
  if(s)o.text(common.makeElapse(s*1000)).remove("value").remove("data-value");
});
//数据集联操作
server.cascade(function(s){
  //Make the argument to the {StorageName:DataMap,...} Format.
  var map={},i,o;
  for(i=0;o=s[i];i++)
    o.usage in map||(map[o.usage]={}),
    o.id in map[o.usage]||(map[o.usage][o.id]=[]),
    map[o.usage][o.id].push([o.key,o.value]);
  //Through the map and save the data to indexedDB.
  for(i in map)(function(source,data){
    var ids=[],kvs=[],i;
    for(i in data)ids.push(+i),kvs.push(data[i]);
    database.get(source,ids,function(s){
      for(var r=[],i=0,j;i<s.length;i++)if(s[i])
        for(r.push(s[i]),j=0;j<kvs[i].length;j++)s[i][kvs[i][j][0]]=kvs[i][j][1];
      if(r.length)database.put(source,r,function(){
        server.cached(source,ids);
        server.trigger("cascade."+source,[r]);
      });
    });
  })(i,map[i]);
});
//字体处理
(function(){
  var def="微软雅黑",font=common.getCookie("settings[FontFamily]")||def;
  if(font==def)if(isWindows)return;
  else font=[
    "'Hiragino Sans GB'",
    "'Noto Sans CJK SC'","'Source Han Sans CN'",
    "'Noto Sans CJK TC'","'Source Han Sans TW'",
    "'Noto Sans CJK JP'","'Source Han Sans JP'",
    "'Noto Sans CJK'", "'Source Han Sans'",
    "'WebQuanyi Micro Hei'","'Microsoft Yahei'",
    "'Droid Sans Fallback'"
  ];
  var f=isWindows
    ?function(s){return s.replace(def,font);}
    :function(s){return s.replace(def,font).replace("Consolas",[
      "'Menlo'",
      "'Monaco'",
      "'Source Code Pro'",
      "'Consolas'",
      "'Inconsolata'",
      "'Ubuntu Mono'",
      "'DejaVu Sans Mono'",
      "'Courier New'",
      "'Droid Sans Mono'"
    ]+"");};
  var s=document.styleSheets,rules,rule,i,j;
  for(var i=0;i<s.length;i++)
    for(rules=s[i].rules||s[i].cssRules,j=0;rule=rules[j];j++)
      if((rule=rule.style)&&rule.fontFamily)rule.fontFamily=f(rule.fontFamily);
})();
//页面显示调整
isWebkit&&(function(){
  var s=common.getCookie("settings")||{},styles=[];
  s.Brightness&&s.Brightness!=50&&styles.push("brightness("+(s.Brightness*0.2+90|0)+"%)");
  s.Contrast&&s.Contrast!=50&&styles.push("contrast("+(s.Contrast*0.4+80|0)+"%)");
  s.Saturate&&s.Saturate!=50&&styles.push("saturate("+(s.Saturate*2|0)+"%)");
  if(styles.length)document.documentElement.style.WebkitFilter=styles.join(" ");
})();



/*****************************************************************
                            GlobalReady
*****************************************************************/

(function(f,ready){
  ready=function(){
    !window.jQuery||document.readyState=="loading"?setTimeout(ready,16):f();
  },ready();
})(function(){
  //初始化页面缓存
  if(common.getCookie("settings[PushState]")=="false")history.pushState=null;
  if(history.pushState)(function(path){
    if(!this.is(":has(a[href='"+path+"'])"))return; //如果当前页面不是导航页面则不操作
    pageCache[path]={title:document.title,body:$("header").next()};
    this.children().each(function(){ //加载所有导航页
      var href=$(this).attr("href");
      //对于当前页总是去抓取，其它页面不存在才去抓取
      if(pageCache.time>1389486100&&href!=path)return;
      $.get(href,function(e){
        e=e.match(/<title>(.+?)<\/title>[\s\S]+?<\/header>([\s\S]+)<footer>/);
        e&&pageCache.save(href,$.trim(e[1]),$.trim(e[2]));
      });
    });
  }).call($("nav"),location.pathname);
  //导航栏特效
  $("nav").each(function(){
    var nav=$(this),underline=$("<u/>"),itv,pos,active=nav.find(".active");
    //导航栏鼠标效果
    underline.css({width:active.width(),left:active.prop("offsetLeft")}).appendTo(nav);
    nav.find("a").mouseenter(function(){
      clearTimeout(itv);
      underline.stop().animate({left:this.offsetLeft,width:this.offsetWidth},"fast");
    }).mouseleave(function(){
      itv=setTimeout(function(){underline.animate({left:active.prop("offsetLeft")})},200);
    });
    //基于页面缓存的无刷新跳转
    if(!history.pushState)return;
    if(history.state==null)history.replaceState(active.index(),null,location.href);
    //导航栏项点击事件
    nav.find("a").click(function(e){
      if(e.button)return true;
      var href=$(this).attr("href"),path=location.pathname;
      if(href==path)return false;
      if(!nav.is(":has(a[href='"+path+"'])"))
        location.href=href;
      else
        history.pushState($(this).index(),null,href),
        $(window).trigger("popstate",[$(this)]);
      return false;
    });
    //页面滑动切换
    var webkitBug=isWebkit;
    $(window).on("popstate",function(e,item){
      if(webkitBug&&!item)return webkitBug=false;
      if(document.URL.indexOf("#")>=0)return false;
      var href=location.pathname,tar=pageCache[href],cur=$("header+div");
      if(tar)tar=tar.body;
      else { //不存在则尝试从页面缓存中加载
        if(!pageCache.has(href))return location.href=href;
        pageCache[href]=pageCache.load(href);
        $("footer")[0].insertAdjacentHTML("beforebegin",pageCache[href].body);
        tar=pageCache[href].body=$("footer").prev();
        tar.find("[data-cache]").each(function(){
          common.loadCountyCache(this);
        });
        $(document).trigger("pageready",[tar]);
      };
      //滚动切换效果
      item=item||nav.children().eq(e.originalEvent.state);
      $("body>*").finish(),cur.before(tar.hide());
      var left=cur.prop("offsetLeft"),scroll=item.prevAll(".active").length?1000:-1000,width=cur.width();
      document.body.style.overflowX="hidden";
      cur.css({width:width}).show().animate({marginLeft:-scroll,opacity:0},"fast",function(e){
        cur.hide().css({marginLeft:"",width:"",opacity:100});
        tar.show().css({width:width,marginLeft:scroll,opacity:0}).animate({marginLeft:left,opacity:100},"fast",function(){
          $(this).css({marginLeft:"",width:""});
          document.body.style.overflowX="";
          $(document).trigger("switch",[cur,tar]);
        });
      });
      underline.finish().css({left:active.prop("offsetLeft")});
      active=item.mouseenter().addClass("active").siblings().removeClass("active").end().mouseleave();
      document.title=pageCache[href].title;
    });
  });
  //鼠标手势
  !(isIE<9)&&common.getCookie("settings[Gesture]")!="false"&&isWindows&&gesture.on({
    down:function(){
      common.scrollTo($(document).height()-document.documentElement.offsetHeight);
    },up:function(){common.scrollTo(0);}
  });
  //LOGO位置跳转到首页
  $("header h2 a").click(function(e){
    return e.button||!history.pushState||location.pathname=="/"||!$("nav a:first-child").click();
  });
  //警告低版本IE
  isIE<10&&$("#roof dd").each(function(){
    $("<span/>").addClass("fuckIE").prependTo(this).html("请升级至IE10或使用Chrome、Firefox等现代浏览器。");
  });
  //搜索框
  $(document).on("click",".unit-search a:first",function(){
    var v=$.trim($(this).siblings("input:first").val()),
    open=location.pathname=="/"?window.open:function(e){location.href=e};
    v?open("/search/"+encodeURIComponent(v)+"/1.html"):open("/articles/");
  }).on("keydown",".unit-search input:first",function(e){
    if(e.keyCode==13)$(this).siblings("a:first").click();
  });
  //百度统计（仅对正常页面开启）
  document.getElementById("blackbox")&&$.ajax({
    url:"http://hm.baidu.com/h.js?a855f89c898f1b86f43caea384f74651",
    dataType:"script",cache:true
  });
  $("#share").click(baidu.share); //顶部分享按钮
  $("#setting").click(common.popupSettings); //顶部设置按钮
  $(document).on("click",".qq-manual",common.popupQQManual); //QQ使用说明
  setTimeout(function(){ //触发当前页面的pageready和switch事件
    $(document).trigger("pageready",[$("header+div")]);
    $(document).trigger("switch");
  });
});




/*****************************************************************
                             PageReady
*****************************************************************/
$(document).on("pageready",function(e,current){
  //构建tornado效果
  (function(s){
    if(s.length==0)return;
    var f=function(){common.makeTornado(s);};
    $(document).one("switch",f);
  })(current.find(".unit-tornado"));
  //更新时间戳
  current.find("time[value]").trigger("update");
  //创建placeholder效果
  current.makePlaceholder();
  //处理单独页面对象
  current.attr("class").replace(/[\w-]+/g,function(e){
    action[e=e.replace(/-/g,"")]&&action[e].call(current);
  });
  //处理全局页面对象
  units.init(current);
});




/*****************************************************************
                             PageSwitch
*****************************************************************/

$(document).on("switch",function(){
  //停止未显示的unit-tornado
  (function(s){
    if(s.length==0)return;
    s.filter(":visible").mouseleave();
    s.filter(":hidden").mouseenter();
  })($(".unit-tornado"));
});




/*****************************************************************
                          全局模块处理函数
*****************************************************************/

var units=function(){
  var algorithms={
    author:common.encodeHTML,title:common.encodeHTML,
    time:function(){return common.makeElapse(this.creationtime*1000);}
  },items={
    comments:{algorithms:new MixtureModel(algorithms),source:"comments",index:"creationtime",pool:[]},
    conch:{algorithms:new MixtureModel(algorithms),source:"replies",index:"creationtime",pool:[]},
    articles:{algorithms:new MixtureModel(algorithms),source:"articles",index:"creationtime",pool:[]}
  };
  items.comments.algorithms.content=common.encodeHTML;
  items.conch.algorithms.content=common.makeSimpleHTML;
  items.conch.algorithms.title=function(){return common.makeSimpleHTML(this.content);};
  return {
    init:function(page){
      for(var i in items)page.find(".unit-"+i+" script[type='text/x-template']").each(function(){
        var target=this.parentNode,item=items[i],init=!item.pool.length,
            maximum=$(target).attr("data-maximum")*1||9;
        var county=new County(target,item.algorithms);
        common.initCountyState(county);
        database.query(item.source,item.index,null,"prev",maximum,function(s){
          var w=":order(creationtime,desc):limit("+maximum+")";
          if(s.length)county.insert(s);
          if(s.length==maximum)w="["+item.index+">"+s[0][item.index]+"]"+w;
          if(init||s.length<maximum)common.pull(item.source+w,item.source,county.insert);
        });
        server.bind("update."+item.source,function(e){
          init&&database.put(item.source,e,function(){
            server.cached(item.source,[e.id]);
          }),county.insert(e);
        });
        item.pool.push(county);
      });
    }
  };
}();



/*****************************************************************
                              扩展定义
*****************************************************************/

$.fn.extend({
  makeImageZoomable:function(width){ //让大图可缩放
    var f,s=this.find("img:not([headerloaded])");
    (f=function(){
      s=s.filter(function(){
        if(this.width){
          var o=$(this).attr("headerloaded","true");
          this.width>width&&o.click(function(){
            var img=new Image;
            img.src=o.attr("src");
            dialog.popup(img);
          }).css("cursor","pointer").attr("width",width);
          return false;
        }else return true;
      }),s.length&&setTimeout(f,200);
    })();
  },makePlaceholder:function(){ //添加placeholder效果
    return this.find(".placeholder:not([installed-placeholder])").each(function(){
      var itv,first,o=$(this),span=o.find("span:first"),input=o.find("input:first");
      //IE用模拟的方式，现代浏览器直接使用placeholder属性
      if(isIE)
        span.mousedown(function(){return input.focus(),false}),input.on({
          focus:function(){
            if(!itv)itv=setInterval(function(){span[input.val()?"hide":"show"]()},50),span.addClass("focus");
          },blur:function(){
            clearInterval(itv),itv=0,this.value?span.hide():span.removeClass("focus").css("display","block");
          }
        }).blur()
      else input.attr("placeholder",span.text()),span.hide();
      //添加input是自动全选功能（不限浏览器）
      input.on({
        mousedown:function(){
          if(first=this!=document.activeElement)this.selectionStart=this.selectionEnd;
        },mouseup:function(){
          first&&(isIE<9?!document.selection.createRange().text:this.selectionStart==this.selectionEnd)&&this.select();
        }
      });
    }).attr("installed-placeholder","true"),this;
  },popup:function(e,f,c){ //tip的弹出功能
    if(typeof f=="string")c=f,f=null;
    if(typeof e=="object")c||(c=e.error||e.err?"#F00":"#0C0"),e=e.message||e.msg;
    else c=c||"#F00";
    return this.finish().css({color:c}).text(e).fadeIn().animate([0],250*e.length).fadeOut(f);
  },makeTextareaAutoHeight:function(){ //文本域自动高度
    return $(this).each(function(){
      if(this.tagName!="TEXTAREA")return;
      var textarea,itv,token,lineheight,padding,styles,f,i;
      textarea=$(this).on({
        focus:function(){if(!itv)itv=setInterval(f,16);},
        blur:function(){clearInterval(itv);itv=0;f();},
        keydown:function(e){if(e.keyCode==13&&!e.ctrlKey&&textarea.val().indexOf("\n")+1)f(lightheight);}
      }),token=$("<textarea/>").css({overflow:"hidden",position:"absolute",left:0,top:-1000}).appendTo(document.body);
      for(i in styles=[
        "lineHeight","fontSize","fontFamily","width","wordWrap","wordBreak",
        "paddingTop","paddingRight","paddingBottom","paddingLeft"
      ])token.css(styles[i],textarea.css(styles[i]));
      lightheight=parseInt(textarea.css("lineHeight"));
      padding=parseInt(textarea.css("paddingTop"))+parseInt(textarea.css("paddingBottom"));
      f=(function(a,b){ //性能优先
        return function(e){b.value=a.value,a.style.height=b.scrollHeight-padding+(e?e:0)+"px";};
      })(this,token[0]);
    }).blur();
  },extract:function(f){
    var i,n,s=f.toString().match(/\((.*?)\)/)[1].match(/[$\w]+/g)||[];
    for(i=0;i<s.length;i++)if(n=s[i])s[i]=this.find("#"+n);
    f.apply(this,s);return this;
  }
});