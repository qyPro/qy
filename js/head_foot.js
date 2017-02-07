define(function(require, exports, module) {
    var head_foot = {
        init: function() {
            var header_html = require('../views/headerView.html');
            var footer_html = require('../views/footerView.html');
            $('#header').html(header_html);
            $('#footer').html(footer_html);
            this.events();
        },
        events:function(){
        	$('#nav_link>li').click(function(){
        		$(this).addClass('active').siblings().removeClass('active');
        	})
        }
    }
    module.exports = head_foot;
});
