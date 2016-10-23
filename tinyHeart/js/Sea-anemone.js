var aneObj = function() {
	//海葵摆动，利用二次贝塞尔曲线，起始点，控制点，结束点
	//需要在结束点用正弦函数控制，形成摆动
	this.rootx = [];   //开始值
	this.headx = [];   //结束点x坐标，即海葵头部
	// this.len = [];
	this.heady = [];  //结束点x坐标，
	this.alpha = 0;  //正弦角度，用于控制headx的摆动
	this.amp = [];   //控制振幅，控制摆动幅度
}; 
aneObj.prototype.num = 70;
aneObj.prototype.init = function() {
	for(var i = 0; i < this.num; i++) {
		//海葵的位置及高度
		this.rootx[i] = i * 15 + Math.random() * 20; 
		this.headx[i] = this.rootx[i];   
		this.heady[i] = canHeight - 260 + Math.random() * 60;  
		// this.len[i] = 170 + Math.random() * 40;
		this.amp[i] = Math.random() * 50 + 30;  //摆动幅度
	}
};
aneObj.prototype.draw = function() {
	this.alpha += deltaTime * 0.002;   //this.alpha随着时间不断的增加(x轴)
	var l = Math.sin(this.alpha);  //y轴正弦函数，控制头部的摆动[-1, 1];
	ctx2.save();
	ctx2.globalAlpha = 0.6;
	ctx2.strokeStyle = "#009966";
	ctx2.lineWidth = 15;
	ctx2.lineCap = "round";
	for(var i = 0; i < this.num; i++) {
		ctx2.beginPath();
		ctx2.moveTo(this.rootx[i], canHeight);  //起始点
		this.headx[i] = this.rootx[i] + l * this.amp[i] * 0.5;  //当前海葵头部的具体位置
		ctx2.quadraticCurveTo(this.rootx[i], canHeight - 150, this.headx[i], this.heady[i]);  //控制点
		ctx2.stroke();
	}
	ctx2.restore();   //save(), restore()画笔只在这两者之间起作用

};
