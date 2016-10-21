/**
 * Created by JinYingying on 16-10-20.
 * my site: https://github.com/MandyJin
 */
var board = new Array();
var score = 0;
var hasConficted = new Array();//解决每个位置的数字可以重复叠加，比如8,4,2,2,Left后最左是16，应该是8,4,4

var startx = 0;
var starty = 0;
var endx=0;
var endy=0;

$(document).ready(function(){
	prepareForMobile();
    newgame();
});

function prepareForMobile(){
	if (documentWidth>500) {
		gridContainerWidth=500;
		cellSpace=20;
		cellSideLength = 100;
	}
	$("#grid-container").css('width',gridContainerWidth-2*cellSpace);
	$("#grid-container").css('height',gridContainerWidth-2*cellSpace);
	$('#grid-container').css('padding',cellSpace);
	$('#grid-container').css('border-radius',0.02*gridContainerWidth);

	$('.grid-cell').css('width',cellSideLength);
	$('.grid-cell').css('height',cellSideLength);
	$('.grid-cell').css('border-radius',0.02*cellSideLength);
}

function newgame(){
    //初始化棋盘格
    init();
    //在随机两个格子生成数字
    generateOneNumber();
    generateOneNumber();
}

function init(){
    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 0 ; j < 4 ; j ++ ){

            var gridCell = $('#grid-cell-'+i+"-"+j);
            gridCell.css('top', getPosTop( i , j ) );
            gridCell.css('left', getPosLeft( i , j ) );
        }

    for( var i = 0 ; i < 4 ; i ++ ){
        board[i] = new Array();
        hasConficted[i] = new Array();
        for( var j = 0 ; j < 4 ; j ++ ){
            board[i][j] = 0;
            hasConficted[i][j] = false;
        }
    }

    updateBoardView();
    
    score=0;
}

function updateBoardView(){

    $(".number-cell").remove();
    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 0 ; j < 4 ; j ++ ){
            $("#grid-container").append( '<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>' );
            var theNumberCell = $('#number-cell-'+i+'-'+j);

            if( board[i][j] == 0 ){
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');
                theNumberCell.css('top',getPosTop(i,j) + cellSideLength/2 );
                theNumberCell.css('left',getPosLeft(i,j) + cellSideLength/2 );
            }
            else{
                theNumberCell.css('width',cellSideLength);
                theNumberCell.css('height',cellSideLength);
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                theNumberCell.css('background-color',getNumberBackgroundColor( board[i][j] ) );
                theNumberCell.css('color',getNumberColor( board[i][j] ) );
                theNumberCell.text( board[i][j] );
            }
            hasConficted[i][j] = false;
        }
    $('.number-cell').css('line-height',cellSideLength+'px'); 
    $('.number-cell').css('font-size',0.6*cellSideLength+'px');
}

function generateOneNumber(){

    if( nospace( board ) )
        return false;

    //随机一个位置
    var randx = parseInt( Math.floor( Math.random()  * 4 ) );
    var randy = parseInt( Math.floor( Math.random()  * 4 ) );
	var times=0;//优化随机数生成
    while( times<50 ){
        if( board[randx][randy] == 0 )
            break;

        randx = parseInt( Math.floor( Math.random()  * 4 ) );
        randy = parseInt( Math.floor( Math.random()  * 4 ) );
    	
    	times++;
    }
    //如果50次内没有随机生成位置，则人工生成
    if(times == 50){
    	for (var i=0;i<4;i++) {
    		for (var j=0;j<4;j++) {
    			if (board[i][j] == 0) {
    				randx = i;
    				randy = j;
    			}
    		}
    	}
    }

    //随机一个数字
    var randNumber = Math.random() < 0.5 ? 2 : 4;

    //在随机位置显示随机数字
    board[randx][randy] = randNumber;
    showNumberWithAnimation( randx , randy , randNumber );

    return true;
}

//键盘事件
$(document).keydown(function(event){
	event.preventDefault();
	switch (event.keyCode){
		case 37://left
			event.preventDefault();
			if(moveLeft()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isgameover()",300);
			}
			break;
		case 38://up
			event.preventDefault();
			if(moveUp()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isgameover()",300);
			}
			break;
		case 39://right
			event.preventDefault();
			if(moveRight()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isgameover()",300);
			}
			break;
		case 40://down
			event.preventDefault();
			if(moveDown()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isgameover()",300);
			}
			break;
		default://default
			break;
	}
});

//触摸事件
document.addEventListener('touchstart',function(event){
	startx=event.touches[0].pageX;
	starty=event.touches[0].pageY;
	
});
//解决Android4.0的一个bug:event.preventDefault();不被正确使用的话touch不会触发
document.addEventListener('touchmove',function(event){
	event.preventDefault();
});
document.addEventListener('touchend',function(event){
	endx = event.changedTouches[0].pageX;
	endy = event.changedTouches[0].pageY;
	
	var deltax = endx - startx;
	var deltay = endy - starty;
	
	//解决点击或者newgame数字移动问题
	if(Math.abs(deltax) < 0.3*documentWidth && Math.abs(deltay) < 0.3*documentWidth){
		return;
	}
	//x
	if (Math.abs(deltax) >= Math.abs(deltay)) {
		if (deltax>0) {
			//move right
			if(moveRight()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isgameover()",300);
			}
		}else{
			//move left
			if(moveLeft()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isgameover()",300);
			}
		}
	}else{
		if (deltay>0) {
			//move down
			if(moveDown()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isgameover()",300);
			}
		} else{
			//move up
			if(moveUp()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isgameover()",300);
			}
		}
	}
})

function isgameover(){
	if (nospace(board) && nomove(board)) {
		gameover();
	}
	
	for (var i=0;i<4;i++) {
		for (var j=0;j<4;j++) {
			if (board[i][j] == 2048) {
				youWin();
			}
		}
	}
}
function gameover () {
	$('.fail').show();
}
function youWin(){
	$('.success').show();
}
function moveLeft() {
	if (!canMoveLeft(board)) {
		return false;
	}
	
	//moveLeft
	for (var i=0;i<4;i++) {
		for (var j=1;j<4;j++) {
			if (board[i][j] != 0) {
				//遍历(i,j)左侧所有的元素(i,k)
				for (var k=0;k<j;k++) {
					if (board[i][k] == 0 && noBlockHorizontal(i,k,j,board)) {
						//move
						showMoveAnimation(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					}
					else if(board[i][k] == board[i][j] && noBlockHorizontal(i,k,j,board) && !hasConficted[i][k]){
						//move
						showMoveAnimation(i,j,i,k);
						//add
						board[i][k]+=board[i][j];
						board[i][j]=0;
						//add score
						score += board[i][k];
						updateScore(score);
						
						hasConficted[i][k] = true;
						continue;
						
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}
function moveRight() {
	if (!canMoveRight(board)) {
		return false;
	}
	//moveRight
	for (var i=0;i<4;i++) {
		for (var j=0;j<3;j++) {
			if (board[i][j]!=0) {
				//遍历（i,j）右边的所有元素（i,k）
				for (var k=3;k>j;k--) {
					if(board[i][k]==0 && noBlockHorizontal(i,j,k,board)){
						//move
						showMoveAnimation(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					}else if(board[i][k] == board[i][j] && noBlockHorizontal(i,j,k,board) && !hasConficted[i][k]){
						//move
						showMoveAnimation(i,j,i,k);
						//add
						board[i][k]+=board[i][j];
						board[i][j]=0;
						//addscore
						score += board[i][k];
						updateScore(score);
						
						hasConficted[i][k] = true;
						continue;
						
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}
function moveUp() {
	if (!canMoveUp(board)) {
		return false;
	}
	//moveUp
	for (var j=0;j<4;j++) {
		for (var i=1;i<4;i++) {
			if (board[i][j]!=0) {
				//遍历(i,j)上面的所有元素(k,j)
				for (var k=0;k<i;k++) {
					if(board[k][j]==0 && noBlockVertical(j,k,i,board)){
						//move
						showMoveAnimation(i,j,k,j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					}else if(board[k][j]==board[i][j] && noBlockVertical(j,k,i,board) && !hasConficted[k][j]){
						//move
						showMoveAnimation(i,j,k,j);
						//add
						board[k][j] += board[i][j];
						board[i][j] = 0;
						//addscore
						score += board[k][j];
						updateScore(score);
						
						hasConficted[k][j] = true;
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}
function moveDown() {
	if (!canMoveDown(board)) {
		return false;
	}
	for (var j=0;j<4;j++) {
		for (var i=0;i<3;i++) {
			if (board[i][j]!=0) {
				//遍历(i,j)下面的多有元素(k,j)
				for (var k=3;k>i;k--) {
					if (board[k][j]==0 && noBlockVertical(j,i,k,board)) {
						//move
						showMoveAnimation(i,j,k,j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					}else if (board[k][j] == board[i][j] && noBlockVertical(j,i,k,board) && !hasConficted[k][j]) {
						//move
						showMoveAnimation(i,j,k,j);
						//add
						board[k][j] += board[i][j];
						board[i][j] = 0;
						//addscore
						score += board[k][j];
						updateScore(score);
						
						hasConficted[k][j]=true;
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}
