(function(){
	var Game = window.Game = function(params){
		//布画
		this.canvas=document.querySelector(params.canvasid);
		//上下文
		this.ctx =this.canvas.getContext("2d");
		//资源文件地址
		this.datajsonurl= params.datajsonurl;
		//帧编号
		this.fno=0;
		//设置宽度和高度
		this.init();
		//分数
		this.score=0;
		//读取资源
		var self = this;
		//读取资源，异步函数
		this.loadAllResource(function(){
			self.start();
			//绑定监听
			//self.bindEvent();
		});
		

	}
	Game.prototype.init=function(){
		var windowW=document.documentElement.clientWidth;
		var windowH=document.documentElement.clientHeight;
		if (windowW>414){
			windowW=414;
		}
		else if (windowW<320) {
			windowW=320;
		}
		if (windowH>736){
			windowH=736;
		}
		else if (windowH<500) {
			windowW=500;
		}
		//让canvas匹配视口
		this.canvas.width= windowW;
		this.canvas.height= windowH;
	}
	//读取资源
	Game.prototype.loadAllResource=function(callback){
		//准备一个data对象
		this.data= {};
		var self = this;//备份
		//计数器
		var alreadyDoneNumber = 0;
		//发出请求，请求json文件
		var xhr=new XMLHttpRequest();
		xhr.onreadystatechange=function(){
			if(xhr.readyState ==4){
				var dataobj =JSON.parse(xhr.responseText);
				//遍历数组
				for ( var i =0;i < dataobj.images.length; i++) {
					//创建一个同名的key
					self.data[dataobj.images[i].name] = new Image();
					//请求
					self.data[dataobj.images[i].name].src = dataobj.images[i].url;
					//监听
					self.data[dataobj.images[i].name].onload = function() {
						alreadyDoneNumber++;
						//清屏
						self.ctx.clearRect(0,0,self.canvas.width,self.canvas.height);
						//提示文字
						var txt = "正在加载"+ alreadyDoneNumber+ "/"+ dataobj.images.length+"请稍等";
						//设置文字位置
						self.ctx.textAlign="center";
						self.ctx.font="20px 微软雅黑";
						self.ctx.fillText(txt, self.canvas.width/2,self.canvas.height*(1-0.618));
						//加载完毕
						if(alreadyDoneNumber==dataobj.images.length) {
							callback.call(self);
						}
					

					}
				};

			}
		}
		xhr.open("get",this.datajsonurl,true);
		xhr.send(null);
	}
	//开始游戏
	Game.prototype.start=function(){
		//实例化场景管理器
		this.sm=new SceneManager();
		//实例化背景
		//this.background= new Background();
		//实例化大地
		//this.land= new Land();
		//实例化管子
		// this.pipe= new Pipe();
		//管子数组
		//this.pipeArr=new Array();
		//实例化小鸟
		//this.bird= new Bird();

		var self = this;
	//设置定时器
	this.timer=setInterval(function(){
			//清屏
		self.ctx.clearRect(0,0,self.canvas.width,self.canvas.height);
		//针编号
		self.fno++;
		//场景管理器的渲染更新
		self.sm.update();
		self.sm.render();
		//更新背景
		//self.background.update();
		//渲染背景
		//self.background.render();
		//更新大地
		//self.land.update();		
		//渲染大地
		//self.land.render();
		//更新管子
		// self.pipe.update();		
		//渲染管子
		// self.pipe.render();
		//for ( var i=0;i< self.pipeArr.length;i++){
			//self.pipeArr[i] && self.pipeArr[i].update();
			//验证管子是否还在数组中
			//self.pipeArr[i] && self.pipeArr[i].render();
		//}
		//每多少帧渲染管子
		//self.fno%120==0&&(new Pipe() );
		//更新小鸟
		//self.bird.update();		
		//渲染小鸟
		//self.bird.render();
		//打印当前分数
		//var scoreLength=self.score.toString().length;//当前分数位数
		//设置图片基准位置
		//for( var i=0;i<scoreLength;i++){
			//self.ctx.drawImage(self.data["shuzi"+self.score.toString().charAt(i)],self.canvas.width/2-scoreLength/2*34+34*i,100);
		//}
		
		
		//打印帧编号
		self.ctx.font="16px 微软雅黑";
		self.ctx.textAlign="left";
		//self.ctx.fillText("FNO:" +self.fno,10,20)
	},20);	
	}
	// Game.prototype.bindEvent=function(){
	// 	var self=this;

	// 	this.canvas.onclick=function(){
	// 		self.bird.fly();
	// 	}
	// }
})();