// 判断大鱼和果实的碰撞距离
function momFruitsCollision() {
	if( !data.gameOver ) {
		for(var i = 0; i < fruit.num; i++) {
			if(fruit.alive[i]){		//果实的状态是true
				//果实和大鱼之间的距离
				var l = calLength2(fruit.x[i], fruit.y[i], mom.x, mom.y);
				if(l < 400) {   
					//fruit eaten
					fruit.dead(i);
					//分值
					data.fruitNum++;  
					mom.momBodyCount++;
					if(mom.momBodyCount > 7) {
						mom.momBodyCount = 7;
					}
					if(fruit.fruitType[i] == "blue") {   //蓝色果实加倍
						data.double = 2;
					}
					wave.born(fruit.x[i], fruit.y[i]);  //碰撞特效
				}
			}  
		}
	}
	
}
//大鱼喂小鱼
function momBabyCollision() {
	if(data.fruitNum > 0 && !data.gameOver) {  //只有在大鱼有果实而且游戏没有结束的时候才碰撞成功
		var mbl = calLength2(mom.x, mom.y, baby.x, baby.y);
			//大鱼和小鱼距离
			if(mbl < 800) {
				baby.babyBodyCount = 0;
				// data.reset();
				//分值更新
				data.addScore();
				mom.momBodyCount = 0;  //碰撞后大鱼身体恢复
				//特效
				helo.born(baby.x, baby.y);
			}
	}
	
}