<<<<<<< HEAD:qy/js/hotel.js

define(function(require, exports, module){
  
    var hotel = {
        init: function() {
        	// 调用头部底部
        	var head_foot = require('../js/head_foot.js');
        	var hotel_public = require('../js/hotel-public.js');
            var pop = require('./pop.js');
            pop.init();
            head_foot.init();
            hotel_public.init();
            this.dealAjax();

          
        },

        dealAjax:function(){
            $.ajax({
                url:"../json/hotel.json",
                success:function(res){
                    
                    //当季热门
                    var hotel=res.hotel;            
                    var _html9=$('#hotel').html();
                    var _hh9=_.template(_html9);
                    var _html8=_hh9({hotelpo:hotel})
                    $('.hf-hotel-tu').html(_html8);

                    // 国外预订
                    var guowai= res.guowai;
                    var gg=$('#yuding').html();
                    var oo=_.template(gg);
                    var gg1=oo({yudingpo:guowai});          
                    $('#hf-hot-ul').html(gg1);

                    // 热门城市
                    var hotcity=res.hotcity;
                    var gg9=$('#yuding2').html();
                    var oo9=_.template(gg9);
                    var gg8=oo9({yudingpo2:hotcity});
                    
                    $('#hf-hot-ul2').html(gg8);

                }
            })
        }
       } 
    module.exports = hotel;
});

=======
define(function(require, exports, module) {
    var start = 0;
    var end = 0;
    var hotel = {
        init: function() {
            this.getImgList();
            this.plug();
            this.events();
            this.getDate();
        },
        // 处理图片列表
        getImgList: function() {
            $.ajax({
                url: "../json/hotel.json",
                type: "get",
                success: function(res) {
                    // console.log(res);
                    var imgList = res.imgList;
                    var _html = $('#hotel-imgList').html();
                    var _html_fn = _.template(_html);
                    var html = _html_fn({ imgList: imgList });
                    $('.img-list>ul').html(html);
                },
                error: function() {
                    alert('获取数据失败');
                }
            })
        },
        // 处理插件
        plug: function() {
            // 处理开始日期
            $('#date-start').datepicker({
                numberOfMonths: 2,
                dateFormat: "yy-mm-dd",
                showOtherMonths: true,
                selectOtherMonths: true,
                minDate: 0,
                maxDate: 15
            });
            // 处理结束日期
            $('#date-end').datepicker({
                numberOfMonths: 2,
                dateFormat: "yy-mm-dd",
                showOtherMonths: true,
                selectOtherMonths: true,
                minDate: 1,
                maxDate: 15
            });
            // 处理滑块
            $('#range').ionRangeSlider({
                type: "double",
                min: 0,
                max: 2000,
                step: 400,
                hide_min_max: true,
                hide_from_to: false,
                grid: false,
                onFinish: function(obj) {
                    start = obj.from;
                    end = obj.to;
                }
            });
            return { start: start, end: end };
        },
        events: function() {
            var that = this;
            var sendData = null;
            // 选择日期按钮
            $('#select').click(function() {
                sendData = that.plug();
                console.log(sendData);
            });
            // 选择城市
            $('#choice-city input').on('input', function() {
                if ($(this).val().length <= 0) {
                    $('#choice-city .hot-city').show();
                } else {
                    $('#choice-city .hot-city').hide();
                }
            });
            $('#choice-city .hot-city li').click(function() {
                $('#choice-city .city-input').val($(this).html());
                $('#choice-city .hot-city').hide();
            })
        },
        getDate: function() {
            var curDate = null;
            var now = new Date();
            y = now.getFullYear();
            m = now.getMonth() + 1;
            d = now.getDate();
            m = m < 10 ? "0" + m : m;
            d = d < 10 ? "0" + d : d;
            curDate = y + "-" + m + "-" + d;
            $('#date-start').val(curDate);
            $('#date-end').val(curDate);
        }
    }
    module.exports = hotel;
});
>>>>>>> 41eda2d384e67510fc3aab8079f54e395b045fb1:qy/js/hotelSpecial.js
