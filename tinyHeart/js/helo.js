var heloObj = function() {
	this.x = [];
	this.y = [];
	this.alive = [];
	this.r = [];  //半径
};
heloObj.prototype.num = 5;
heloObj.prototype.init = function() {
	for(var i = 0; i < this.num; i++) {
		this.x[i] = 0;
		this.y[i] = 0;
		this.alive = false;
		this.r[i] = 0;
	}
};
heloObj.prototype.draw = function() {
	ctx1.save();
	ctx1.lineWidth = 2;
	ctx1.shadowBlur = 10;
	ctx1.shadowColor = "rgba(123, 45, 145, 1)";
	for(var i = 0; i < this.num; i++) {
		if( !this.alive[i] ) {
			//draw
			this.r[i] += deltaTime * 0.05;
			if( this.r[i] > 50) {
				this.alive = false;
				break;
			}
			var alpha = 1 - this.r[i] / 50;
			ctx1.beginPath();
			ctx1.arc(this.x[i], this.y[i], this.r[i],0, Math.PI * 2);
			ctx1.closePath();
			ctx1.strokeStyle = "rgba(205, 91, 0," + alpha + ")";
			ctx1.stroke();
		}
	}
	ctx1.restore();
};
heloObj.prototype.born = function(x, y) {
	for(var i = 0; i < this.num; i++) {  //闲置的
		if( !this.alive[i] ) {
			//born
			this.x[i] = x;
			this.y[i] = y;
			this.r[i] = 10;
		}
	}
};