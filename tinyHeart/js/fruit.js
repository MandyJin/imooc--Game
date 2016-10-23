var fruitObj = function() {
	this.alive = [];      //bool	
	this.x = [];
	this.y = [];
	this.aneNO = [];
	this.l = [];            //果实的半径(大小)
	this.spd = [];          //每个果实自己的速度
	this.fruitType = [];    //果实类型
	this.orange = new Image();
	this.blue = new Image();
};
fruitObj.prototype.num = 30;
fruitObj.prototype.init = function() {
	
	for(var i = 0; i < this.num; i++) {
		this.alive[i] = false;  //初始时果实都为false
		this.x[i] = 0;
		this.y[i] = 0;
		this.aneNO[i] = 0;  //哪一个海葵
		// this.l[i] = 0;
		this.spd[i] = Math.random() * 0.02 + 0.005;
		// this.born(i);
		this.fruitType[i] = "";
	}
	this.orange.src = './src/fruit.png';
	this.blue.src = './src/blue.png';
};
fruitObj.prototype.draw = function() {
	for(var i = 0; i < this.num; i++) {
		var pic;
		if( this.alive[i] ) {
			if(this.fruitType[i] == "blue") {   //判断蓝色还是黄色果实
				pic = this.blue;
			}else {
				pic = this.orange;
			}
			if(this.l[i] <= 15) {
				var NO = this.aneNO[i];
				//随时间变化果实长大，deltaTime使过程平缓些
				this.x[i] = ane.headx[NO];
				this.y[i] = ane.heady[NO];
				this.l[i] += this.spd[i] * deltaTime;  
				ctx2.drawImage(pic, this.x[i]-this.l[i] / 2, this.y[i]-this.l[i] / 2, this.l[i], this.l[i]);

			}else {
				//果实上升的速度变化
				this.y[i] -= this.spd[i] * 8 * deltaTime;
				ctx2.drawImage(pic, this.x[i]-this.l[i] / 2, this.y[i]-this.l[i] / 2, this.l[i], this.l[i]);
			}
			
			//让果实生长在海葵顶部位置,尺寸
			// ctx2.drawImage(pic, this.x[i]-this.l[i] / 2, this.y[i]-this.l[i] / 2, this.l[i], this.l[i]);
			if( this.y[i] < 10) {
				this.alive[i] = false;
			}
		}
	}
};
fruitObj.prototype.born = function(i) {     
	// var aneID = Math.floor(Math.random() * ane.num);
	//果实x,y
	// this.x[i] = ane.headx[aneID];
	// this.y[i] = ane.heady[aneID];
	//果实出生的时候会长在哪一个海葵上
	this.aneNO[i] = Math.floor(Math.random() * ane.num);
	this.l[i] = 0;
	this.alive[i] = true;
	var fruRand = Math.random();   //随机果实类型
	if(fruRand < 0.3) {
		this.fruitType[i] = "blue";
	}else {
		this.fruitType[i] = "orange";
	}

};
fruitObj.prototype.dead = function(i) {     //果实被吃了
	this.alive[i] = false;
};
function fruitMonitor() {
	var num = 0;
	for(var i = 0; i < fruit.num; i++) {
		if (fruit.alive[i]) {
			//记录存活的果实数量
			num++;
		}  
	}
	if ( num < 15) {
		sendFruit();
		return;
	}
}
function sendFruit() {
	for (var i = 0; i < fruit.num; i++) {
		if( !fruit.alive[i] ) {
			fruit.born(i);
			return;
		}
	}
}
