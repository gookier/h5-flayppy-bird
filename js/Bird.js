(function(){
	var Bird= window.Bird =function(){
		//随机鸟的颜色0,1,2
		this.color=parseInt(Math.random()*3);
		//决定用图
		this.imageArr=[
			game.data["bird"+this.color+"_0"],
			game.data["bird"+this.color+"_1"],
			game.data["bird"+this.color+"_2"]
		];
		//翅膀状态
		this.wingStep=0;
		//小鸟位置,图片宽度48
		this.x= game.canvas.width*(1-0.618) -24;
		this.y=100;
		//鸟祯，用于上升，下落算法
		this.fno=0;
		//角度
		this.d=0;
		//是否拥有能量
		this.hasEnergy= false;
	}
	Bird.prototype.update=function(){
		
		//翅膀状态。没固定帧数打一次
		this.wing();
		//算法要掉落
		if(!this.hasEnergy){
			this.y+=this.fno*0.32;
		}else{
			//有能量
			this.y-=(20-this.fno)*0.42;
			//20帧之后没有能量
			if(this.fno>20){
				this.hasEnergy=false;
				this.fno=0;
			}
		}
		this.y+= this.fno*0.6;
		this.d+=0.04;
		this.fno++;
		//验收，天护板
		if(this.y<0) {
			this.y=0;
		}
		//计算自己的四个碰撞检测值
		this.T =this.y-12;//12图片上间隙
		this.R =this.x+17;//13图片上间隙
		this.B =this.y+12;//13图片上间隙
		this.L =this.x-17;//13图片上间隙
		//验证小鸟碰地
		if(this.B>game.canvas.height*0.78){
			//死亡就去场景4
			game.sm.enter(4);
		}
	}
	Bird.prototype.render=function(){
		game.ctx.save();
		//将小鸟坐标拉倒中心点
		game.ctx.translate(this.x,this.y);
		//旋转
		game.ctx.rotate(this.d);
		//绘制
		game.ctx.drawImage(this.imageArr[this.wingStep],-24,-24);
		game.ctx.restore();
	}
	//飞
	Bird.prototype.fly= function(){
		this.hasEnergy=true;
		this.d=-0.6;
		this.fno=0;
	}
	//扑打翅膀
	Bird.prototype.wing=function(){
		game.fno % 3 == 0 && this.wingStep++;
			if( this.wingStep>2){
				this.wingStep=0;
			}
	}
	

})();