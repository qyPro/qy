$(function() {
    var Travelleft = {
        init: function() {
            // this.dealslide1();
            this.dealSlide1();
            this.dealslide2();
            this.dealdingw();
        },
        // dealslide1:function(){
        // 	$('.f2div1');
        // 	$('.f2div1>img');
        // 	$('.f2ul>li');
        // 	var innerTimer=null;
        // 	var outerTimer=null;
        // 	outerTimer=setInterval(startMove,2000);
        // 	var showIndex=0;
        // 	function startMove(){
        // 		showIndex++;
        // 		active();
        // 		var endPos=parseInt($('.f2div1').css('left'))-1366;
        // 		clearInterval(innerTimer);
        // 		innerTimer=setInterval(function(){
        // 			currentLeft=parseInt($('.f2div1')[0].style.left);
        // 			var speed=(endPos-currentLeft)/5;
        // 			speed=speed>0?Math.cell(speed):Math.floor(speed);
        // 			currentLeft=currentLeft+speed;
        // 			$('.f2div1')[0].style.left=currentLeft+'px';//先计算div一定的距离
        // 			if(currentLeft<=endPos){
        // 				if(showIndex==5){
        // 					$('.f2div1')[0].style.left='0px';
        // 					showIndex=0;
        // 					active();
        // 				}
        // 				clearInterval(innerTimer);
        // 			}
        // 		},40);
        // 	}
        // 	function active(){
        // 		for(var i=0;i<$('.f2ul>li').length;i++){
        // 			if(showIndex==i){
        // 				$('.f2ul>li').eq(i).addClass('active');
        // 			}else{
        // 				$('.f2ul>li').eq(i).removeClass('active');
        // 			}
        // 		}
        // 	}
        // 	for(var i=0;i<$('.f2ul>li').length;i++){
        // 		$('.f2ul>li')[i].index=i;
        // 		$('.f2ul>li').click(function(){
        // 			clearInterval(outerTimer);
        // 			clearInterval(innerTimer);
        // 			var index=this.index;
        // 			for(var j=0;j<$('.f2ul>li').length;j++){
        // 				if(index==j){
        // 					$('.f2ul>li').addClass('active');
        // 					$('.f2div1').style.left=(-1366*j)+'px';
        // 				}
        // 				else{
        // 					$('.f2ul>li').removeClass('active');
        // 				}
        // 			}
        // 		});
        // 	}
        // },
        dealSlide1: function() {
            var $imgList = $('.f2div1>img');
            var $liList = $('.f2ul>li');
            var imgArr = ['../images/travelLift/f2_1.jpg','../images/travelLift/f2_2.jpg','../images/travelLift/f2_3.jpg','../images/travelLift/f2_4.jpg'];
            var outerTimer = null;
            var innerTimer = null;
            var currentLeft = 0;
            var showIndex = 0;
            clearInterval(outerTimer);
            outerTimer = setInterval(outerMove, 2500);
            // 整体运动
            function outerMove() {
                showIndex++;
                // 指示高亮
                $liList.eq(showIndex).addClass('active').siblings().removeClass('active');
                // active();
                var endPos = parseInt($('.f2div1').css('margin-left')) - 1366;
                clearInterval(innerTimer);
                // 内部定时器，控制移动速率
                innerTimer = setInterval(innerMove, 30);
                // 内部运动
                function innerMove() {
                    currentLeft = parseInt($('.f2div1').css('margin-left'));
                    var speed = (endPos - currentLeft) / 6;
                    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                    currentLeft = currentLeft + speed;
                    $('.f2div1').css({ 'margin-left': currentLeft + 'px' });
                    if (currentLeft <= endPos) {
                        clearInterval(innerTimer);
                        if (showIndex >= imgArr.length - 1) {
                            $imgList.eq(0).attr('src', imgArr[showIndex]);
                            $imgList.eq(1).attr('src', imgArr[0]);
                            $('.f2div1').css({ 'margin-left': '0px' });
                            showIndex = -1;
                        } else {
                            $imgList.eq(0).attr('src', imgArr[showIndex]);
                            $imgList.eq(1).attr('src', imgArr[showIndex + 1]);
                            $('.f2div1').css({ 'margin-left': '0px' });
                        }
                    }
                }
            }
            // 指示操作
            $liList.hover(
                function() {
                    clearInterval(innerTimer);
                    clearInterval(outerTimer);
                    showIndex = $liList.index(this);
                    $('.f2div1').css({ 'margin-left': '0px' });
                    $liList.eq(showIndex).addClass('active').siblings().removeClass('active');
                    if (showIndex == $liList.length - 1) {
                        $imgList.eq(0).attr('src', imgArr[showIndex]);
                        $imgList.eq(1).attr('src', imgArr[0]);
                        showIndex = -1;
                    } else {
                        $imgList.eq(0).attr('src', imgArr[showIndex]);
                        $imgList.eq(1).attr('src', imgArr[showIndex + 1]);
                    }
                },
                function() {
                    outerTimer = setInterval(outerMove, 2500);
                })
        },

        dealslide2: function() {
            var timer;
            var showIndex=0;
            if(timer){
                clearInterval(timer);
            }
            timer=setInterval(startMove,1500);
            function startMove(){
                showIndex++;
                if(showIndex==3){
                    showIndex=0;
                }
                $('.f3boxx>div').eq(showIndex).show().siblings('div').hide();
                $('.f4ul>li').eq(showIndex).addClass('active').siblings().removeClass('active'); /* 右侧的小图片指示符 */  
            }
            $('.f4ul>li').hover(function(){
                clearInterval(timer);
                showIndex=$(this).index();
                $('.f4ul>li').eq(showIndex).addClass('active').siblings().removeClass('active');
                $('.f3boxx>div').eq(showIndex).show().siblings('div').hide();
            },function(){
                timer=setInterval(startMove,1500);
            }
            );
        },
        dealdingw:function(){
            $('.container1 ul>li').click(function(){
                var showIndex=$(this).index();
                console.log(showIndex);
                $('.container1>img').eq(showIndex).show().siblings('img').hide();
                console.log(showIndex);
            })
        }
    }
    Travelleft.init();
})
