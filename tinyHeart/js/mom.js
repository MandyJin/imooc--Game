var momObj = function () {
	this.x = 0;
	this.y = 0;
	this.angle = 0;  //大鱼移动角度变化
	this.bigEye = new Image();
	// this.bigBody = new Image();
	this.bigTail = new Image();

	this.momTailTimer = 0;
	this.momTailCount = 0;

	this.momEyeTimer = 0;
	this.momEyeCount = 0;
	this.momEyeInterval = 1000;

	this.momBodyCount = 0;

};

momObj.prototype.init = function() {
	this.x = canWidth * 0.5;
	this.y = canHeight * 0.5;
	this.angle = 0;
	// this.bigEye.src = "./src/bigEye0.png";
	// this.bigBody.src = "./src/bigSwim0.png";
	// this.bigTail.src = "./src/bigTail0.png";
};

momObj.prototype.draw = function() {

	//Lerp x,y  使得一个值趋向于一个目标值
	this.x = lerpDistance(mx, this.x, 0.9);
	this.y = lerpDistance(my, this.y, 0.9);
	//delta angle
	var deltaY = my - this.y;
	var deltaX = mx - this.x;
	//大鱼运动时转动角度
	var beta = Math.atan2(deltaY, deltaX) + Math.PI; 
	//learp angle
	this.angle = lerpAngle(beta, this.angle, 0.7);

	//tail
	this.momTailTimer += deltaTime;
	if(this.momTailTimer > 50) {
		this.momTailCount = (this.momTailCount + 1) % 8;    //计数器加1, 但是不能超过8
		this.momTailTimer %= 50;      //timer回到初始状态
	}
	//eye
	this.momEyeTimer += deltaTime;
	if(this.momEyeTimer > this.momEyeInterval) {
		this.momEyeCount = (this.momEyeCount + 1) % 2;
		this.momEyeTimer %= this.momEyeInterval;
		if(this.momEyeCount === 0) {                                                                                                                      
			//大鱼睁眼时间
			this.momEyeInterval = Math.random() * 1200 + 1300;
		}else {
			//大鱼眨眼时间
			this.momEyeInterval = 200;
		}
	}

	ctx1.save();
	ctx1.translate(this.x, this.y);    //大鱼的坐标位置
	ctx1.rotate(this.angle);
	var momTailCount = this.momTailCount;
	var momEyeCount = this.momEyeCount;
	ctx1.drawImage(momTail[momTailCount], -momTail[momTailCount].width * 0.5 + 30, -momTail[momTailCount].height * 0.5);
	//大鱼身体变化
	var momBodyCount = this.momBodyCount;
	if( data.double == 1) {
		//橙色
		ctx1.drawImage(momBodyOra[momBodyCount], -momBodyOra[momBodyCount].width * 0.5, -momBodyOra[momBodyCount].height * 0.5);
	}else {
		//蓝色
		ctx1.drawImage(momBodyBlue[momBodyCount], -momBodyBlue[momBodyCount].width * 0.5, -momBodyBlue[momBodyCount].height * 0.5);

	}
	// ctx1.drawImage(this.bigBody, -this.bigBody.width * 0.5, -this.bigBody.height * 0.5);
	ctx1.drawImage(momEye[momEyeCount], -momEye[momEyeCount].width * 0.5, -momEye[momEyeCount].height * 0.5);
	ctx1.restore();
};

