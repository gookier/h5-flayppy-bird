(function(){
	//背景类
	var Background = window.Background =function(){
		//自己的背景
		this.image=game.data.bg_day;
		this.y=0.75*game.canvas.height-396;
		this.w=288;
		this.h=512;
		this.x=0;
		this.speed=1;
	}
	//更新
	Background.prototype.update=function(){
		this.x-=this.speed;
		//无缝连接（跑马灯原理，克隆图片）
		if (this.x< -this.w) {
			this.x=0;
		}
	}
	//渲染
	Background.prototype.render= function(){
		//渲染图片,3张无缝滚动
		game.ctx.drawImage(this.image, this.x, this.y);
		game.ctx.drawImage(this.image, this.x+this.w, this.y);
		game.ctx.drawImage(this.image, this.x+this.w*2, this.y);
		//渲染天空猫腻矩形
		game.ctx.fillStyle="#4EC0CA";
		game.ctx.fillRect(0, 0, game.canvas.width, this.y +10);
		//渲染草丛猫腻矩形
		game.ctx.fillStyle="#5EE270";
		game.ctx.fillRect(0, this.y+this.h, game.canvas.width, game.canvas.height-this.h-this.y);
	}
})();