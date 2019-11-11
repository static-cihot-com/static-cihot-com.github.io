void function(w){with(createjs) {

var stage=new Stage('maincanvas');
w.stage=stage;

var text=new Text('Hello', 'bold 36px Tahoma', 'red');
w.text=text;
stage.addChild(text);

text=text.clone();
text.x=60;
text.y=40;
text.text='World';
text.font='normal 24px Consolas';
stage.addChild(text);

text=text.clone();
text.x=10;
text.y=80;
text.color='blue';
text.font='bold 12px Tahoma';
stage.addChild(text);
stage.on('stagemousemove',function(e) {
	text.text=new Point(e.stageX,e.stageY)+' - stage\n'+new Point(e.localX,e.localY)+' - local\n'+new Point(e.rawX,e.rawY)+' - raw';
});
Ticker.setFPS(6);
Ticker.on('tick', function(e){
	stage.update();
})


}}(window);