(function(){
	//管子类
	var Pipe = window.Pipe =function(){
		this.imageup=game.data.pipe_up;
		this.imagedown=game.data.pipe_down;
		
		//总高
		this.allheight=game.canvas.height*0.78;
		//空隙
		this.interspace=140;
		//图片高度固定死
		this.picheight=320;
		//随机一个上管子的高度保证管子至少有100高度
		this.height1=parseInt(100+Math.random()* (this.picheight-100));
		//下管子的高度
		this.height2=this.allheight-this.height1-this.interspace;
		//自己的位置
		this.x= game.canvas.width;
		//是否已经成功通过被加过分
		this.alreadyPass=false;
		//将自己push到管子数组
		game.pipeArr.push(this);
	}
	//更新
	Pipe.prototype.update=function(){
		this.x-=2;
		//碰撞检测
		if(game.bird.R>this.x&&game.bird.L<this.x+52){
			if(game.bird.T<this.height1 || game.bird.B>this.height1+this.interspace){
				//死亡就进入场景4
				game.sm.enter(4);
			}
		}
		//加分
		if( game.bird.R>this.x+52&& !this.alreadyPass) {
			//顺利通过了
			game.score++;
			//标记为已经通过
			this.alreadyPass=true;
		}
		//检测管子是否已经出了视口，如果是，则从数组移出
		if( this.x<-52){
			for(var i=0;i<game.pipeArr.length;i++) {
				if(game.pipeArr[i]===this){
					game.pipeArr.splice(i,1);
				}
			}
		}

	}
	//渲染
	Pipe.prototype.render= function(){
		game.ctx.drawImage(this.imagedown,0,this.picheight-this.height1,52,this.height1,this.x,0,52,this.height1);
		game.ctx.drawImage(this.imageup,0,0,52,this.height2,this.x,this.height1+this.interspace,52,this.height2);
		
		
	}
		
})();