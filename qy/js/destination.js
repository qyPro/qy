$(function() {
    var destination = {
        data: {
            country: [],
            theme: [],
            inputVal: []
        },
        init: function() {
            this.events();
            this.getCountryData();
            this.getExploreWorldData();
        },
        events: function() {
            var that = this;
            $('.info-icon').hover(function() {
                $('span.icon').animate({ opacity: '0' }, 300);
                $('#author-box').animate({ width: '195px' }, 300)
            }, function() {
                $('#author-box').animate({ width: '0px' }, 300, function() {
                    $('span.icon').animate({ opacity: '1' }, 300);
                })
            });
            /*$('.img-list').on('mouseover mouseout','li.items',function(e){
            	if( e.type == 'mouseover'){
            		$(this).find('img').css({transform:'scale(1.2)'});
            		$(this).find('.mask>p').slideDown(500);
            	}else if(e.type == 'mouseout'){
            		$(this).find('img').css({transform:'scale(1)'});
            		$(this).find('.mask>p').slideUp(500);
            	}
            });*/
            $('.img-list li').hover(function() {
                $(this).find('img').css({ transform: 'scale(1.2)' });
                $(this).find('.mask').css({ background: 'rgba(0,0,0,.5)' }).find('p').slideDown(300);
            }, function() {
                $(this).find('img').css({ transform: 'scale(1)' });
                $(this).find('.mask').css({ background: 'none' }).find('p').slideUp(300);
            });
            $('.des-input').on('keyup', '#input', function(e) {
                if (e.keyCode == 13 && $('#input').val() != '') {
                    var val = $('#input').val();
                    if (that.data.inputVal.indexOf(val) == -1) {
                        that.data.inputVal.push(val);
                        that.data.inputVal = that.data.inputVal.slice(that.data.inputVal.length < 5 ? 0 : (that.data.inputVal.length - 5));
                    }
                    $('#input').val('');
                    console.log(that.data.inputVal);
                    if (that.data.inputVal.length != 0) {
                        $('.hot-city').addClass('hide');
                        $('.des-visited').removeClass('hide');
                    };
                    var str = '';
                    var aStr = '';
                    for (var i = that.data.inputVal.length - 1; i >= 0; i--) {
                        aStr += '<a href="" title="">' + that.data.inputVal[i] + '</a>'
                    }
                    str = '<span>最近访问：</span>' + aStr + '<span class="clear-visited">清除访问历史</span>';
                    $('.des-visited').html(str);
                }
            });
            $('.des-visited').on('click','clear-visited',function(){
                that.data.inputVal = [];
                console.log('数组数组',that.data.inputVal)
                var newStr = '<span>最近访问：暂无访问记录</span><span class="clear-visited">清除访问历史</span>';
                 $('.des-visited').html(newStr);
            })


        },
        getCountryData: function() {
            var that = this;
            $.ajax({
                url: '../json/des-country.json',
                type: 'get',
                data: {},
                success: function(res) {
                    if (res.resultCode == '0000') {
                        console.log(res);
                        that.data.country = res.country;
                        that.dealCountryData(that.data.country);
                    }
                }
            })
        },
        dealCountryData: function(data) {
            var that = this;
            var cHtml = $('#countries').html();
            var cFn = _.template(cHtml);
            var cStr = cFn({
                continent: data
            })
            $('.countries').html(cStr);

            $('.country-list').on('click', 'li.country-item', function(e) {
                e.preventDefault();
                $('li.country-item').removeClass('current');
                $(this).addClass('current').siblings().removeClass('current');

                var val = $(this).data('value');
                val = val - 1;

                if (val < 0) {
                    cHtml = $('#countries').html();
                    cFn = _.template(cHtml);
                    cStr = cFn({
                        continent: data
                    })
                    $('.countries').html(cStr);
                } else {
                    console.log(val);
                    cHtml = $('#countries').html();
                    cFn = _.template(cHtml);
                    cStr = cFn({
                        continent: [data[val]]
                    })
                    $('.countries').html(cStr);
                }
            })
        },
        getExploreWorldData: function() {
            var that = this;
            $.ajax({
                url: '../json/exploreWord.json',
                type: 'get',
                data: {},
                success: function(res) {
                    if (res.resultCode == '0000') {
                        console.log(res);
                        that.data.theme = res.themelist;
                        console.log('数据', that.data.theme)
                        that.dealExploreWorldData(that.data.theme)
                    }
                }
            })
        },
        dealExploreWorldData: function(ele) {
            var that = this;
            var ehtml = $('#img-items').html();
            var eFn = _.template(ehtml);
            var eStr = eFn({
                eArr: ele[0].adgroup
            })
            $('.img-list').html(eStr);
            $('.play-list').on('click', '.play-item', function(e) {
                // 阻止系统默认行为
                e.preventDefault();
                $('.play-item').removeClass('current');
                $(this).addClass('current').siblings().removeClass('current');
                $('.play-item').each(function(index, item) {
                    if ($(item).hasClass('current')) {
                        console.log(index);
                        ehtml = $('#img-items').html();
                        eFn = _.template(ehtml);
                        eStr = eFn({
                            eArr: ele[index].adgroup
                        })
                        $('.img-list').html(eStr);
                        that.events();
                    }
                })
            });
            that.events();
        }
    }
    destination.init();

})
