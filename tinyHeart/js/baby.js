var babyObj = function() {
	this.x;
	this.y;
	this.angle;
	// this.babyEye = new Image();
	this.babyBody = new Image();
	// this.babyTail = new Image();

	//babyTail
	this.babyTailTimer = 0;
	this.babyTailCount = 0;
	//babyEye
	this.babyEyeTimer = 0;
	this.babyEyeCount = 0;
	this.babyEyeInterval = 1000;
	//babyBody
	this.babyBodyTimer = 0;
	this.babyBodyCount = 0;

};
babyObj.prototype.init = function() {
	this.x = canWidth * 0.5 - 50;
	this.y = canHeight * 0.5 + 50;
	this.angle = 0;
	// this.babyEye.src =  './src/babyEye0.png';
	this.babyBody.src = './src/baby.png';
	// this.babyTail.src = './src/babyTail0.png';
};
babyObj.prototype.draw = function() {
	// lerp x, y
	this.x = lerpDistance(mom.x + 30, this.x, 0.98);
	this.y = lerpDistance(mom.y + 30, this.y, 0.98);
	// 小鱼跟随大鱼
	// lerp angle
	var deltaY = mom.y - this.y;
	var deltaX = mom.x - this.x;
	//大鱼运动时转动角度
	var beta = Math.atan2(deltaY, deltaX) + Math.PI; 
	this.angle = lerpAngle(beta, this.angle, 0.7);

	//baby tail count
	this.babyTailTimer += deltaTime;
	if(this.babyTailTimer > 50) {
		// babyTail计数
		this.babyTailCount = (this.babyTailCount + 1) % 8;   //让它一直在0-8之间
		this.babyTailTimer %= 50;    
	}
	//babyEye count
	this.babyEyeTimer += deltaTime;
	if( this.babyEyeTimer > this.babyEyeInterval ) {
		this.babyEyeCount = (this.babyEyeCount + 1) % 2;
		this.babyEyeTimer %= this.babyEyeInterval;

		if(this.babyEyeCount === 0) {
			this.babyEyeInterval = Math.random() * 1000 + 890;  //时间间隔
		}else {
			this.babyEyeInterval = 280;
		}
	}
	//baby body
	this.babyBodyTimer += deltaTime;
	if(this.babyBodyTimer > 250) {
		this.babyBodyCount = this.babyBodyCount + 1;
		//身体变白的时间
		this.babyBodyTimer %= 250;
		if(this.babyBodyCount > 19) {
			this.babyBodyCount = 19;
			//gameover
			data.gameOver = true;
		}
	}

	//ctx1
	ctx1.save();
	ctx1.translate(this.x, this.y);
	// 旋转画布
	ctx1.rotate(this.angle);
	//画小鱼
	var babyTailCount = this.babyTailCount;
	var babyEyeCount = this.babyEyeCount;
	var babyBodyCount = this.babyBodyCount;
	//尾巴摆动
	ctx1.drawImage(babyTail[babyTailCount], -babyTail[babyTailCount].width * 0.5 + 23, -babyTail[babyTailCount].height * 0.5);
	//身体变白
	ctx1.drawImage(babyBody[babyBodyCount], -babyBody[babyBodyCount].width * 0.5, -babyBody[babyBodyCount].height * 0.5);
	//眼睛眨动
	ctx1.drawImage(babyEye[babyEyeCount], -babyEye[babyEyeCount].width * 0.5, -babyEye[babyEyeCount].height * 0.5);
	ctx1.restore();
};