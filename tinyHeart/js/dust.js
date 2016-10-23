var dustObj = function () {
	this.x = [];
	this.y = [];
	this.amp = [];  //漂浮物振幅
	this.NO = [];   //序号，哪一张图片

	this.alpha = 0;   //角度
};
dustObj.prototype.num = 30;   //数量
dustObj.prototype.init = function() {
	for(var i = 0; i < this.num; i++) {
		this.x[i] = Math.random() * canWidth;
		this.y[i] = Math.random() * canHeight;
		this.amp[i] = 20 + Math.random() * 15;
		this.NO[i] = Math.floor(Math.random() * 7);  //[0, 7)
		this.alpha = 0;
	}
};
dustObj.prototype.draw = function() {
	this.alpha += deltaTime * 0.002;
	var l = Math.sin(this.alpha);
	for(var i = 0; i < this.num; i++) {
		var no = this.NO[i];
		ctx1.drawImage(dustPic[no], this.x[i] + this.amp[i] * l, this.y[i]);
	}
};