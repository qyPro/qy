$(function() {
    var indexPage = {
            init: function() {
                var width = $('.bannercontainer').width();
                $('.bannercontainer').height(width * 0.3333);

                // var	$bannercontainer = $('.bannercontainer'),
                // 	$width = $bannercontainer.width();
                // $bannercontainer.height($width*0.3333);
                this.ajaxData();
                this.dealSlide();
                this.dealInput();
                this.zworldEvents();
            },
            ajaxData: function() {
                var that = this;
                $.ajax({
                    url: '../jsondoc/index.json',
                    type: 'get',
                    success: function(res) {
                        console.log(res);
                        if (res.resultCode == '0000') {
                            that.inputData(res.data);
                            that.interestData(res.data);
                            that.zworldData(res.data);
                        }
                    }
                })
            },
            dealSlide: function() {
                var inter = setInterval(rightShow, 3000);

                $('.prevbtn').click(function(e) {
                    clearInterval(inter);
                    e.stopPropagation();
                    if ($('.banner').is(':animated') == false) {
                        $('.banner').first().animate({ 'left': '-100%' }, 100, function() {
                            $('.bannerbody').append($(this));
                            $(this).animate({ 'left': '0px' }, 1000);
                        })
                    }
                    inter = setInterval(rightShow, 3000);
                });

                $('.nextbtn').click(function(e) {
                    clearInterval(inter);
                    e.stopPropagation();
                    if ($('.banner').is(':animated') == false) {
                        rightShow();
                    }
                    inter = setInterval(rightShow, 3000);
                });

                function rightShow() {
                    // 即将显示的轮播图动画 
                    $('.banner').last().prev().animate({ 'left': '100%' }, 100, function() {
                        // 把这个节点添加到父级的最后一个位置并且用动画显示出来
                        $('.bannerbody').append($(this));
                        $(this).animate({ 'left': '0px' }, 1000, function() {
                            // 上次显示的轮播图放在父级的第一个位置 使顺序能够正常
                            $('.bannerbody').prepend($(this).prev());
                        });
                    })
                }
            },
            dealInput: function() {
                var myDate = new Date(),
                    curDay = myDate.toLocaleDateString(),
                    curMonth = myDate.getMonth() + 1;

                // 四个选项卡：目的地 做行程 买折扣 酒店
                $('.inputcontainer li').click(function() {
                    var index = $(this).index();
                    $(this).addClass('active').siblings().removeClass('active');
                    $('.inputbody>div').eq(index).show().siblings().hide();
                    if (index == 1) {
                        $('.inputcontainer').css({ 'height': '150px' });
                    } else {
                        $('.inputcontainer').css({ 'height': '115px' });
                    }
                });

                // 目的地 input的焦点事件
                $('.destination>input').on('focus', function(ev) {
                    $('.destination .hotsearch').css({ 'display': 'block' });
                });
                $('.destination>input').on('blur', function(ev) {
                    // $('.destination .hotsearch').css({ 'display': 'none' });
                });

                // 买折扣 input的焦点事件
                $('.discount>input').on('focus', function(ev) {
                    $('.discount .hotsearch').css({ 'display': 'block' });
                });
                $('.discount>input').on('blur', function(ev) {
                    // $('.discount .hotsearch').css({ 'display': 'none' });
                });

                // 酒店 input的焦点事件
                $('.hotel .input1').on('focus', function(ev) {
                    ev.stopPropagation();
                    $('.hotel .hotsearch').css({ 'display': 'block' });
                });
                $('.hotel .input1').on('click', function(ev) {
                    ev.stopPropagation();
                });
                $('body').on('click', function() {
                    $('.hotel .hotsearch').css({ 'display': 'none' });
                })

                // 对ul做click事件 冒泡到a标签上，当a标签还不存在时，不会导致获取不到而出错
                // 或者可以将a标签的点击事件写到 a标签的节点生成之后
                $('.hotel>.hotsearch>ul').on('click', '>li>a', function() {
                    console.log($(this).html());
                    $('.hotel .input1').val($(this).html());
                    $('.hotel .hotsearch').css({ 'display': 'none' });
                });

                // 日历插件
                $('#hotelin').dateRangePicker({
                    autoClose: true,
                    singleDate: true,
                    showShortcuts: false,
                    container: '.hotelin-container',
                    format: 'YYYY-MM-DD',
                    startDate: curDay,
                    getValue: function() {
                        return $(this).val();
                    },
                    setValue: function(s) {
                        if (!$(this).attr('readonly') && !$(this).is(':disabled') && s != $(this).val()) {
                            $(this).val(s);
                        }
                    }
                });
                $('#hotelout').dateRangePicker({
                    autoClose: true,
                    singleDate: true,
                    showShortcuts: false,
                    format: 'YYYY-MM-DD',
                    startDate: curDay,
                    container: '.hotelout-container',
                    getValue: function() {
                        return $(this).val();
                    },
                    setValue: function(s) {
                        if (!$(this).attr('readonly') && !$(this).is(':disabled') && s != $(this).val()) {
                            $(this).val(s);
                        }
                    }
                });
            },
            inputData: function(data) {
                // hotcity数据
                for (var i = 0; i < data.hotcity.length; i++) {
                    var liString = '<li><a href="' + data.cityurl[i] + '">' + data.hotcity[i] + '</a></li>';
                    $('.destination .hotsearch>ul').append(liString);
                    var liString1 = '<li><a href="javascript:void(0);">' + data.hotcity[i] + '</a></li>';
                    $('.hotel .hotsearch>ul').append(liString1);
                }
                // hotsearch数据
                for (var i = 0; i < data.hotsearch.length; i++) {
                    var liString2 = '<li><a href="' + data.searchurl[i] + '">' + data.hotsearch[i] + '</a></li>';
                    $('.discount .hotsearch>ul').append(liString2);
                }
            },
            interestData: function(data) {
                var that = this;
                var interestData = [];
                getData();

                $('.interestcontainer>p').on('click', function() {
                    getData();
                });

                function getData() {
                    //选择8条数据 放入interest中显示
                    interestData = that.chooseArrayData(data.interest, 8);
                    var interestEle = $('#interestModel').html();
                    var interestFn = _.template(interestEle);
                    var stringInterest = interestFn({
                        interestArray: interestData
                    });
                    $('.interest').html('');
                    $('.interest').append(stringInterest);
                }
            },
            chooseArrayData: function(array, count) {
                var newArr = [];
                for (var i = 0; i < array.length; i++) {
                    var randomNum = Math.floor(Math.random() * array.length);
                    if (newArr.indexOf(array[randomNum]) == -1) {
                        newArr.push(array[randomNum]);
                    }
                    if (newArr.length >= count) {
                        break;
                    }
                }
                return newArr;
            },
            zworldData: function(data) {
            	var that = this;
                var zworldData = data.zworld;
                console.log(zworldData.buytoday);
                var showIndex = 0;
                var eleArr = [$('#buytodayModel').html(),$('#buynext1Model').html(),$('#buynext2Model').html(),$('#buynext3Model').html(),$('#buynext4Model').html()];
                
                var buyTodayEle = $('#buytodayModel').html();
                var buyTodayFn = _.template(buyTodayEle);
                var buyTodayString = buyTodayFn({list1:zworldData.buytoday});
                $('.slideitem').eq(0).append(buyTodayString);

                var buynext1Ele = $('#buynext1Model').html();
                var buynext1Fn = _.template(buynext1Ele);
                var buynext1String = buynext1Fn({list2:zworldData.buynext1});
                $('.slideitem').eq(1).append(buynext1String);

                var buynext2String = buynext1Fn({list2:zworldData.buynext2});
                $('.slideitem').eq(2).append(buynext2String);

               	var buynext3String = buynext1Fn({list2:zworldData.buynext3});
                $('.slideitem').eq(3).append(buynext3String);

                var buynext4String = buynext1Fn({list2:zworldData.buynext4});
                $('.slideitem').eq(4).append(buynext4String);
            },
	        zworldEvents: function() {
	            $('.slideindicator>span').hover(function(ev) {
	                ev.stopPropagation();
	                var index = $(this).index();
	                $('.slide>.slideitem').eq(index).show().siblings().hide();
	                $(this).addClass('active').siblings().removeClass('active');
	            })
	        }
        }
	indexPage.init();
})
