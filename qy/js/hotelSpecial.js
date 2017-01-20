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
