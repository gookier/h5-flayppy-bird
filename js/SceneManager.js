(function(){
	var SceneManager=window.SceneManager=function(){
		//1表示欢迎屏幕，2表示游戏内容，3表示gameover
		this.sceneNumber=1;
		//场景管理器负责实例化东西
		game.bg=new Background();
		game.land= new Land();
		game.bird= new Bird();
		//logo的y值
		this.logoY=-48;
		//button的值
		this.button_playX=game.canvas.width/2-58;
		this.button_playY=game.canvas.height;
		//添加监听
		this.bindEvent();
	}
	SceneManager.prototype.update=function(){
		switch( this.sceneNumber) {
			case 1:
			//让logo进行移动
			this.logoY+=10;
			if( this.logoY>120) {
				this.logoY=120;
			}
			//让按钮移动
			this.button_playY-=16;
			if( this.button_playY<360) {
				this.button_playY=360;
			}
			break;
		case 2 :
		//小鸟扑打翅膀
			game.bird.wing();
			//改变透明度
			this.tutorialOpacity+=this.tutorialOpacityIsDown? -0.02 : 0.02;
			//到头就去反
			if( this.tutorialOpacity < 0.02 || this.tutorialOpacity>0.98){
				this.tutorialOpacityIsDown=!this.tutorialOpacityIsDown;
			}
			break;
			
			case 3 :
			//小鸟更新
			game.bird.update();
			//
			game.bg.update();
			//
			game.land.update();
			//管子的实例化
			game.fno%120==0 && ( new Pipe() );
			//渲染所有管子
			for( var i=0; i<game.pipeArr.length;i++) {				
				game.pipeArr[i] && game.pipeArr[i].update();
			}
			break;
			case 4 :
			if( game.bird.y>game.canvas.height*0.78) {
				this.isBirdLand= true;
			}
			this.birdfno++;
			if(!this.isBirdLand) {
				game.bird.y+=10.4*this.birdfno;
			}

						
		}	
		
	}
	SceneManager.prototype.render=function(){
		//根据当前是第几场景来决定做什么
		switch(this.sceneNumber) {
			case 1 :
			//渲染背景
			game.bg.render();
			//渲染大地
			game.land.render();
			//渲染小鸟
			game.bird.render();
			game.bird.x=game.canvas.width/2;
			game.bird.y=260;
			// 画logo
			game.ctx.drawImage(game.data["logo"],game.canvas.width/2-89,this.logoY);
			//画按钮
			game.ctx.drawImage(game.data["button_play"],game.canvas.width/2-58,this.button_playY);
			break;
		case 2 :
			//渲染背景
			game.bg.render();
			//渲染大地
			game.land.render();
			//渲染小鸟
			game.bird.render();
			game.bird.y=150;
			//画教程小图
			game.ctx.save();

			game.ctx.globalAlpha =this.tutorialOpacity;//透明度
			game.ctx.drawImage(game.data["tutorial"],game.canvas.width/2-57,280);
			game.ctx.restore();
			break;
		case 3 :
			//渲染背景
			game.bg.render();
			//渲染大地
			game.land.render();
			//渲染小鸟
			game.bird.render();
			//渲染管子
			for( var i=0; i<game.pipeArr.length;i++) {				
				game.pipeArr[i] && game.pipeArr[i].render();
			}
			//打印当前分数
			var scoreLength=game.score.toString().length;//当前分数位数
			//设置图片基准位置
			for( var i=0;i<scoreLength;i++){
				game.ctx.drawImage(game.data["shuzi"+game.score.toString().charAt(i)],game.canvas.width/2-scoreLength/2*34+34*i,100);
			}
			break;
		case 4 :
				var self=this;
				//渲染背景
				game.bg.render();
				//渲染大地
				game.land.render();
				//渲染小鸟
				game.bird.render();
				if( !this.isBirdLand ){
					game.bird.render();
				}else{
					//渲染爆炸特效
					game.ctx.drawImage(game.data["boom"],game.bird.x-20,game.bird.y-26);
					function myFunction(){
						setTimeout(function(){
							self.enter(5);
						},500);
					}
					myFunction();
				
				}
				break;
				case 5 :
					var self=this;
					//渲染背景
					game.bg.render();
					//渲染大地
					game.land.render();
				
					

				//渲染管子
				for( var i=0; i<game.pipeArr.length;i++) {				
					game.pipeArr[i] && game.pipeArr[i].render();
				}
					//打印当前分数
				var scoreLength=game.score.toString().length;//当前分数位数
					//设置图片基准位置
					for( var i=0;i<scoreLength;i++){
						game.ctx.drawImage(game.data["shuzi"+game.score.toString().charAt(i)],game.canvas.width/2-scoreLength/2*34+34*i,100);
					}
			//渲染重新再来
			game.ctx.drawImage( game.data["text_game_over"],game.canvas.width/2-102,140)
		}	
	}
	//进入某个场景
	SceneManager.prototype.enter=function(number) {
		this.sceneNumber=number;
		switch(this.sceneNumber) {
			case 1 :
				//进入1号场景的瞬间要做的事情
				this.logoY=-48;
				this.button_playY=game.canvas.height;
				game.bird= new Bird();
				break;
			case 2 :
				game.bird.y=150;
				//教程图片的透明度0~1
				this.tutorialOpacity = 1;
				this.tutorialOpacityIsDown=true;
				break;
			case 3 :
				//管子处理清空
				game.pipeArr= new Array();
				break;
			case 4 :
				//小鸟已经触地板
				this.isBirdLand = false;
				//小帧编号
				this.birdfno = 0;
				break;
				case 5 :
				break;

		}
	}
	//添加监听
	SceneManager.prototype.bindEvent=function(number) {
		var self=this;
		game.canvas.onclick=function(event){
			clickHandler( event.clientX,
			event.clientY);
		};
		game.canvas.addEventListener("touchstar",function(event){
			var finger= event.touchs[0];
			clickHandler(finger.clientX,finger.clientY);
		},true);
		function clickHandler( mousex,mousey){
		
			//点击的时候判断是第几场景
			switch(self.sceneNumber) {
			case 1 :
			//进入1号场景的瞬间要做的事情
			if(mousex>self.button_playX &&mousex<self.button_playX+116 &&mousey>self.button_playY&&mousey<self.button_playY+70) {
				//说明用户点击点到了按钮身上
				self.enter(2);//去场景2
			}
			
			break;
			case 2 :
				self.enter(3);
				break;
			case 3 :
			game.bird.fly();
			break;
			case 5 :
			self.enter(1);
			game.score=0;
			break;
		}
		}
	}

})();