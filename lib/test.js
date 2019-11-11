
class A {
  constructor() {}
  static f(){
  	console.log('nF()');
  }
  f(){
  	console.log('f()');
  }

  get f(){
  	return 1;
  }
}

console.log((new A() ).f, new A() .f());

// new nullExtends(); //ReferenceError: this is not defined
// GD-dmswjdok@joycity.com
// 258!!dmswjd

// const p=process,c=require('cluster'),u=require('util'),f=require('fs'),h=require('http'),d=require('domain'),log=console.log;
// // p.env.NODE_PATH='/home/aununfti/node/bin';

// // if(p.pid) log('pid:%d',p.pid);
// // if(p.getuid) log('uid:%d',p.getuid());
// // if(p.getgid) log('gid:%d',p.getgid());
// // if(p.getgroups) log('groups:%j',p.getgroups());
// // if(p.initgroups) p.initgroups('d',1000);
// // if(p.getgroups) log('groups:%j',p.getgroups());
// // if(p.env) log('env:%j',p.env);
// // if(p.config) log('config:%j',p.config);

// // if(p.arch) log('arch:%s',p.arch);// x64
// // if(p.platform) log('platform:%s',p.platform);// win32
// // if(p.memoryUsage) log(process.memoryUsage());// { rss: 17788928, heapTotal: 7409232, heapUsed: 3816144 }

// // if(p.cwd) log('cwd:%s',p.cwd());

// // p.on('uncaughtException',function(error){
// 	// miss
// // });
// // nonExistentFunc();


// /*
// var d = require('domain').create();
// d.on('error', function(er) {
//   // 这个错误不会导致进程崩溃，但是情况会更糟糕！
//   // 虽然我们阻止了进程突然重启动，但是我们已经发生了资源泄露
//   // 这种事情的发生会让我们发疯。
//   // 不如调用 process.on('uncaughtException')!
//   console.log(p.pid,er.message);
// });
// d.run(function(){
// 	h.createServer(function(q,s){
// 		a();
// 	}).listen(60000);
// });
// */





// 物象:
// 兄弟?为什么是兄弟,因为有相同的父或母之一.
// 通常是同父同母...

// 一个词,有近义词,可以说有同一个"父母",即相近的"意思".
// 词与词的关系就是因为一个意思而有了关系.
// 属性之间的关系.



// 抽象:
// 物有属性. 物间关系因属性.
// 定义一物,定义一属性.


// 以表来描述一个事务.





// 经典的谈话,今天需要我们来做什么?
// 原文,

// 修行
// 需要知道是什么类型的武器
// 探索

// 智者!
// 我是吗?
// 不.
// 我是个







// // process.nextTick(callback,arg,...)

// function C(str){
// 	process.nextTick(function(t){
// 		t.setString(str);
// 	},this);
// }
// C.prototype.toString=function(){return this._s;}
// C.prototype.setString=function(v){this._s=v;}


// var i=new C('haha');

// log(i);// C {}
// p.nextTick(function (){
// 	log(i);// C { _s: 'haha' }
// });





// // p.on('SIGINT',function(){
// // 	log('SIGINT',arguments);
// // });
// // log('end');
// // p.kill(p.pid,'SIGINT');


// // log(p.execPath);
// // log(p.execArgv);
// // log(p.argv);
// // log(p.stdin)

// // f.readFile(__filename,function(s){
// // 	log(s);
// // });

// // p.stdin.on('end',function(){
// // 	p.stdout.write(u.format('end.%j',arguments));
// // });
// // p.stdin.resume();
// // p.stdin.setEncoding('utf8');
// // p.stdin.on('data',function(chunk){
// // 	p.stdin.pause();
// // 	log(chunk);
// // });





// // p.abort();


// // if(c.isMaster){
// // 	c.fork();

// // 	p.on('message',function(m){
// // 		log('[master] %j',m);
// // 		// p.exit(5000);
// // 	});
	
// // }else{
// // 	// c.worker.process
// // 	p=c.worker.process;
// // 	p.send('---mmmmmmm----'
// // 	,function(m){
// // 		log('sendHandle',m);
// // 		// p.exit(4001);
// // 		// p.kill(p.pid);// `SIGTERM`,SIGINT,SIGUSR1
// // 		p.abort();
// // 	},function(){
// // 		log('callback',arguments);
// // 	});

// // 	p.on('message',function(m){
// // 		log('[worker] %j',m);
// // 		// p.destroy();
// // 		// p.exit(4000);
// // 	})

// // 	p.on('SIGUSR1',function(){
// // 		log(arguments);
// // 	})
// // }

// // log(c.isMaster,p.pid);





