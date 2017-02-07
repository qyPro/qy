define(function(require, exports, module) {
    var secure = {
        init: function() {
            this.events();
            this.getSecureData('data1');
        },
        getSecureData: function(data) {
            $.ajax({
                url: '../json/secure.json',
                type: 'get',
                success: function(res) {
                    var secureData = res[data];
                    var _html = $('#secure-html').html();
                    var _html_fn = _.template(_html);
                    var result_html = _html_fn({ secureData: secureData });
                    $('.list-content').html(result_html);
                },
                error: function() {
                    alert('获取数据失败');
                }
            })
        },
        events: function() {
            var that = this;
            $('.sort>a').click(function() {
                $(this).addClass('active').siblings().removeClass('active');
                var index = $('.sort>a').index(this);
                if( index==0 ){
	                that.getSecureData('data1');
                }
                if( index==1 ){
	                that.getSecureData('data2');
                }
            });
            $('.choice-list>.list>a').click(function(){
            	$(this).addClass('active').siblings().removeClass('active');
            })
        }
    }
    module.exports = secure;
})
