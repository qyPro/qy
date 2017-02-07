
define(function(require,exports,module){


        var bigWorld={
            init:function(){
                this.dealSlide();
                this.dealAjax();
                var head_foot = require('./head_foot.js');
                var pop = require('./pop.js');
                head_foot.init();
                pop.init();
            },
            dealSlide:function(){
                 var timer = null;
                    timer = setInterval(move, 5000);
                    var index = 0;
                    function move() {
                        $('.hf-lunbotu').stop(true, true).animate({ 'left': -index * 1365 + 'px' });
                        // 对应的li添加高亮，其他的li非高亮
                        $('.hf-anniu>li').eq(index).addClass('active').siblings().removeClass('active');
                        index++;
                        if (index == 3) {
                            index = 0;
                        }
                    }
                    $('.hf-anniu>li').click(function() {
                        clearInterval(timer);
                        // 获取鼠标一上去的li的次序
                        // 使用index函数获取元素在列表中的次序
                        index = $(this).index();
                        // 移动容器
                        $('.hf-lunbotu').stop(true, true).animate({ 'left': -index * 1365 + 'px' });

                        $('.hf-anniu>li').eq(index).addClass('active').siblings().removeClass('active');
                    })
                    timer = setInterval(move, 5000);

                    $('.hf-niu1').click(function(){  
                        
                         index++;
                         if(index==3){
                             index=0;
                         }
                         clearInterval(timer);
                         $('.hf-lunbotu').stop(true,true).animate({'left':-index*1365+'px'});
                         $('.hf-anniu>li').eq(index).addClass('active').siblings().removeClass('active');    
                    })

                    $('.hf-niu2').click(function(){
                         index++;
                         if(index==3){
                             index=0;
                         }
                         clearInterval(timer);   
                         $('.hf-lunbotu').stop(true,true).animate({'left':-index*1365+'px'});
                         $('.hf-anniu>li').eq(index).addClass('active').siblings().removeClass('active');    
                    })
            },
            dealAjax:function(){
              $.ajax({
                        url: "../json/bigWorld.json",
                        success: function(res) {
                            // temai
                            var dian=0;
                            var temai1 = res.temai.te1;
                            var html = $('#hf-hotel-imgList').html();
                            var hh = _.template(html);
                            var _html = hh({ temai2: temai1 });
                            $('.hf-temai-content').html(_html);
                            // 点击换一换

                            $('.temai-span2').click(function(){
                                dian++;
                                if(dian==3){
                                    dian=0;
                                }
                                if(dian==0){
                                    var temai0 = res.temai.te1;
                                    var html = $('#hf-hotel-imgList').html();
                                    var hh = _.template(html);
                                    var _html = hh({ temai2: temai0 });
                                    $('.hf-temai-content').html(_html);
                                }else if(dian==1){
                                    var temai00 = res.temai.te2;
                                    var html = $('#hf-hotel-imgList').html();
                                    var hh = _.template(html);
                                    var _html = hh({ temai2: temai00 });
                                    $('.hf-temai-content').html(_html);
                                }else{
                                    var temai000 = res.temai.te3;
                                    var html = $('#hf-hotel-imgList').html();
                                    var hh = _.template(html);
                                    var _html = hh({ temai2: temai000 });
                                    $('.hf-temai-content').html(_html);
                                }
                                
                            })

                            // jijiu
                            var jijiu = res.jijiu;
                                var jiujiu=jijiu[0];
                                var html1 = $('#floor1').html();
                                var hh1 = _.template(html1);
                                var _html1 = hh1({ jijiu2:jiujiu });
                                $('.hf-freedom-floor1').html(_html1);

                            $('.hf-freedom-header>div>a').mouseenter(function(){
                                var index2 = $(this).index();
                                jijiu1 = jijiu[index2];

                                var html1 = $('#floor1').html();
                                var hh1 = _.template(html1);
                                var _html1 = hh1({ jijiu2: jijiu1 });
                                $('.hf-freedom-floor1').html(_html1);

                            })
                            // 主题推荐
                            var zhuti = res.jijiu;
                                var zhuzhu=zhuti[0];
                                var html2 = $('#floor2').html();
                                var hh2 = _.template(html2);
                                var _html2 = hh2({ jijiu2:zhuzhu });
                                $('.hf-freedom-floor1-hf').html(_html2);

                            $('.hf-freedom-header-hf>div>a').mouseenter(function(){
                                var index3 = $(this).index();
                                    var zhuti1 = zhuti[index3];

                                var html2 = $('#floor2').html();
                                var hh2 = _.template(html2);
                                var _html2 = hh2({ jijiu2:zhuti1 });
                                $('.hf-freedom-floor1-hf').html(_html2);

                            })

                        }

              })
            
            }
        }


    
    module.exports = bigWorld;
 })

