define(function(require, exports, module) {
	var totalData=1,
		showData=4,
		current=1;
    var silkbag = {
        init: function() {
            this.getData();
            this.dealSlide();
            this.dealDownloadList();
            this.dealPlug();
            this.events();
        },
        dealSlide: function() {
            var $imgList = $('#slide-box>.slide>li>img');
            var $liList = $('#slide-box>.liList>li');
            var imgArr = ['../images/silkbag/slide1.jpg', '../images/silkbag/slide2.jpg', '../images/silkbag/slide3.jpg', '../images/silkbag/slide4.jpg', '../images/silkbag/slide5.jpg'];
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
                var endPos = parseInt($('.slide').css('margin-left')) - 750;
                clearInterval(innerTimer);
                // 内部定时器，控制移动速率
                innerTimer = setInterval(innerMove, 30);
                // 内部运动
                function innerMove() {
                    currentLeft = parseInt($('.slide').css('margin-left'));
                    var speed = (endPos - currentLeft) / 6;
                    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                    currentLeft = currentLeft + speed;
                    $('.slide').css({ 'margin-left': currentLeft + 'px' });
                    if (currentLeft <= endPos) {
                        clearInterval(innerTimer);
                        if (showIndex >= imgArr.length - 1) {
                            $imgList.eq(0).attr('src', imgArr[showIndex]);
                            $imgList.eq(1).attr('src', imgArr[0]);
                            $('.slide').css({ 'margin-left': '0px' });
                            showIndex = -1;
                        } else {
                            $imgList.eq(0).attr('src', imgArr[showIndex]);
                            $imgList.eq(1).attr('src', imgArr[showIndex + 1]);
                            $('.slide').css({ 'margin-left': '0px' });
                        }
                    }
                }
            }
            // 指示操作
            $('#slide-box>.liList>li').hover(
                function() {
                    clearInterval(innerTimer);
                    clearInterval(outerTimer);
                    showIndex = $('#slide-box>.liList>li').index(this);
                    $('.slide').css({ 'margin-left': '0px' });
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
        dealDownloadList: function() {
            var timer = null;
            var curTop = 0;
            if (timer) {
                clearInterval(timer);
            }
            timer = setInterval(startMove, 40);

            function startMove() {
                curTop--;
                if (curTop < -270) {
                    curTop = 0;
                }
                $('#download .move-box').css({ 'margin-top': curTop + 'px' });
            }
            $('#download .move-box li').hover(
                function() {
                    clearInterval(timer);
                },
                function() {
                    timer = setInterval(startMove, 40);
                })
        },
        getData:function(){
        	var that = this;
        	$.ajax({
        		url:'../json/slikbag.json',
        		type:'get',
                async:false,
        		success:function(res){
        			var slikbagData = res.data;
                    var areaData = res.areaData;
                    // 翻页插件 总数
        			totalData = slikbagData.length;
        			that.fillTabHtml(slikbagData);
                    that.fillAreaHtml(areaData);
        			that.dealPlug();
        		},
        		error:function(){
        			alert('error');
        		}
        	})
        },
        fillTabHtml:function(data){
			var _html = $('#tab-content').html();
			var _html_fn = _.template(_html);
			var result_html = _html_fn({slikbagData:data});
			$('#tab-content-box').html(result_html);
        },
        fillAreaHtml:function(data){
            var _html = $('#area-html').html();
            var _html_fn = _.template(_html);
            var result_html = _html_fn({areaData:data});
            $('#nav-list').html(result_html);
        },
        dealPlug:function(){
        	var that = this;
        	$('#pagination').pagination({
        		prevContent:'上一页',
    			nextContent:'下一页',
    			// pageCount:1, 
				totalData:totalData,
				showData:4,
				current:1,
				count:2,
				activeCls:'active',
				coping:true,
				callback:function(index){
					var curPage = index.getCurrent();
					// that.getData();
				}
        	})
        },
        events:function(){
        	var that = this;
            var curLeft = 0;
            $('#nav-list .area-list').css({'margin-left':'0px'});
        	$('#download .tab a').click(function(){
        		$(this).addClass('active').siblings('a').removeClass('active');
        		that.getData();
        	});
            // 是否显示点击翻页按钮
            for( var i = 0; i < $('#nav-list .area-list').length ; i++ ){
                if($('#nav-list .area-list').eq(i).width()> 700 ){
                    $('#nav-list .btn-group').eq(i).show();
                }
            };
            // 下一页按钮
            $('#nav-list .btn-group .next').click(function(){
                var index = $('#nav-list .btn-group .next').index(this);
                var curLeft = parseInt($('#nav-list .area-list').eq(index).css('left'));
                curLeft = curLeft - 175;
                // 判断是否到第最后一列
                if($('#nav-list .area-list').width()-700 < -curLeft){
                    return;
                }
                // 下一页按钮变灰
                if($('#nav-list .area-list').width()-700 < -curLeft+1){
                    $('#nav-list .btn-group .next').css({'background-color': '#ccc'});
                }
                $('#nav-list .area-list').eq(index).stop(true,true).animate({'left':curLeft+'px'})
                $('#nav-list .btn-group .pre').css({'background-color': '#636363'});
            });
            // 上一页按钮
            $('#nav-list .btn-group .pre').click(function(){
                var index = $('#nav-list .btn-group .pre').index(this);
                var curLeft = parseInt($('#nav-list .area-list').eq(index).css('left'));
                curLeft = curLeft + 175;
                // 判断是否到第一列
                if(curLeft > 0){
                    $('#nav-list .btn-group .next').css({'background-color': '#ccc'})
                    return;
                }
                // 上一页按钮变灰
                if(curLeft > -1){
                    $('#nav-list .btn-group .pre').css({'background-color': '#ccc'});
                }
                $('#nav-list .area-list').eq(index).stop(true,true).animate({'left':curLeft+'px'});
                $('#nav-list .btn-group .next').css({'background-color': '#636363'})
            })
        }
    }
    module.exports = silkbag;
})
