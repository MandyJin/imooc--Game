var waveObj = function() {
	this.x = [];
	this.y = [];
	this.alive = [];
	this.r = [];  //半径
};
waveObj.prototype.num = 10;    //物体池，存放一个个圈圈
waveObj.prototype.init = function() {
	for(var i = 0; i < this.num; i++) {
		this.alive = false;
		this.r[i] = 0;
	}
};
waveObj.prototype.draw = function() {
	ctx1.save();
	ctx1.lineWidth = 2;
	ctx1.shadowBlur = 10;
	for(var i = 0; i < this.num; i++) {
		if( !this.alive[i] ) {
			this.r[i] += deltaTime * 0.05;
			if(this.r[i] > 80) {
				this.alive[i] = false;   //当半径大于某个值时消失
				break;
			}
			var alpha = 1 - this.r[i] / 80;  //透明度和半径反比
			//draw
			ctx1.beginPath();
			ctx1.arc(this.x[i], this.y[i],this.r[i], 0, Math.PI*2);
			ctx1.closePath();
			ctx1.strokeStyle = "rgba(255,255,255," + alpha + ")";
			ctx1.stroke();
		}
	}
	ctx1.restore();
};

//大鱼和果实碰撞时
waveObj.prototype.born = function(x, y) {  //判断当前是否满足条件
	for(var i = 0; i < this.num; i++) {
		if( !this.alive[i] ) {
			//born
			this.alive[i] = true;
			this.r[i] = 10;
			this.x[i] = x;    //来自大鱼和果实碰撞时的坐标值
			this.y[i] = y;
			return;  //跳出循环，避免所有的都出生
		}
	}

};