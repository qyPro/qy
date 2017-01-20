define(function(require,exports,module)){
    var community = {
        init: function() {
            this.dealSlide();
            this.chooseCard();
            this.dealAjax();
            this.dealActive();
            // this.dealLocation();
            this.events();
            this.dealEwm();
            var head_foot=require('./head_foot.js');
            var pop=require('./pop.js');
            head_foot.init();
            pop.init();
        },
        dealAjax:function(){
            $.ajax({
                url: "../json/community.json",
              
                success: function(res) {
                    // console.log(res);
                    var tab1 = res.tab1;
                    var _html = $('#tab1-content').html();
                    // console.log(_html);
                    var _html_fn = _.template(_html);
                    var html = _html_fn({ tab1: tab1 });
                    // console.log(html);
                    $('#c1').html(html);

                    var tab2=res.tab2;
                    var _html1=$('#tab2-content').html();
                    var _html_fn1=_.template(_html1);
                    var html1=_html_fn1({ tab2 : tab2 });
                    $('#c2').html(html1);

                    var tab3=res.tab3;
                    var _html2=$('#tab3-content').html();
                    var _html_fn2=_.template(_html2);
                    var html2=_html_fn2({ tab3 : tab3 });
                    $('#c3>ul').html(html2);
                },
                error:function(){
                    alert('error');
                }
               
            })

        },
        dealSlide: function() {
            var slideP1 = ['了不起的宇直',
                'aero4400',
                'bennypsr',
                'infantabelle',
                '毛哥家的金小姐'
            ];
            var slideP2 = ['[叫我宇直]不止是发现|马达加斯20日（全文完）',
                '【AERO4400】历险美国南部彪悍民风，新奥尔良、圣安东尼奥独特体验',
                '奥州群雄归何处？前度鹿郎今又来--仙台 平泉 山寺 松岛 白石 镰先温泉 东山温泉 会津若松 高崎 ...',
                '【很高兴遇见你！新西兰】最蓝的水、最白的冰、最暖的爱、最亮的星——AB旅摄VS“父母天团”...',
                '【很高兴遇见你！新西兰】最蓝的水、最白的冰、最暖的爱、最亮的星——AB旅摄VS“父母天团”...'
            ];
            var timer;
            var showIndex = 0;
            if (timer) {
                clearInterval(timer);
            }
            timer = setInterval(startMove, 1500);

            function startMove() {
                showIndex++;
                if (showIndex == 5) {
                    showIndex = 0;
                }
                $('.f2bottomImg>img').eq(showIndex).show().siblings().hide(); /*背景最后面的图片*/
                $('.f2left>img').eq(showIndex).show().siblings().hide(); /*上面左侧的的轮播图片*/
                $('.f2right>.f2righta1').html(slideP1[showIndex]) /*第一个p标签*/
                $('.f2right>.f2righta2').html(slideP2[showIndex]) /*第二个p标签*/
                $('.f2rightUl>li').eq(showIndex).addClass('active').siblings().removeClass('active'); /* 右侧的小图片指示符 */
                // $('.f2rightUl>li>a>img').eq(showIndex).addClass('active').siblings().removeClass('active');
                $('.f2SmallImg>img').eq(showIndex).show().siblings().hide(); /*左右链接的小图标人物*/
            }
            $('.f2rightUl>li').hover(function() {
                clearInterval(timer);
                showIndex = $(this).index();
                $('.f2rightUl>li').eq(showIndex).addClass('active').siblings().removeClass('active');
                $('.f2bottomImg>img').eq(showIndex).show().siblings().hide(); /*背景最后面的图片*/
                $('.f2left>img').eq(showIndex).show().siblings().hide(); /*上面左侧的的轮播图片*/
                $('.f2right>.f2righta1').html(slideP1[showIndex]) /*第一个p标签*/
                $('.f2right>.f2righta2').html(slideP2[showIndex]) /*第二个p标签*/
                $('.f2rightUl>li').eq(showIndex).addClass('active').siblings().removeClass('active'); /* 右侧的小图片指示符 */
                // $('.f2rightUl>li>a>img').eq(showIndex).addClass('active').siblings().removeClass('active');
                $('.f2SmallImg>img').eq(showIndex).show().siblings().hide(); /*左右链接的小图标人物*/
                },
                function() {
                    timer = setInterval(startMove, 1500);
                })
        },
        // 选项卡
        chooseCard: function() {
            var that=this;
            $('.f3Title>h3').click(function() {
                var index = $(this).index();
                // if( index == 0 ){
                    that.dealAjax();
                $(this).addClass('active2').siblings().removeClass('active2');
                $('.content').eq(index).show().siblings().hide();

                // }
            })
            
        },
        //tab3左侧锚点，点击的时候会变绿色
        dealActive:function(){
            $('.icon>li').click(function(){
                $('.icon>li>a').addClass('active').siblings().removeClass('active');
            });
        },
        // 处理右侧绝对定位
        // dealLocation:function(){
        //     $('.youdingleft').click(function(){
        //         $('.youDing').fadeToggle().animate(function(){
        //             $('.youdingleft').css({ margin :'100px'})
        //         },1000);
        //     })
        // },
        events:function(){
            $('.youDing1').click(function(){
                $(this).toggleClass('moveActive');
            })
        },
        // 处理二维码
        dealEwm:function(){
            $('.bcenter>img').hover(function(){
               $('.imgeer').show(); 
            },function(){
                $('.imgeer').hide(); 
            })
        }




    }
    // community.init();
    module.exports=community;
});
