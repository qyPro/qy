define(function(require, exports, module) {
    var head_foot = {
        init: function() {
            var header_html = require('../views/headerView.html');
            var footer_html = require('../views/footerView.html');
            // var header_html_fn = _.template(header_html);
            // var footer_html_fn = _.template(header_html);
            // var footer_result = htmlFn({ imgArr: res });
            // var header_result = htmlFn({ imgArr: res });
            $('#header').html(header_html);
            $('#footer').html(footer_html);
        }
    }
    module.exports = head_foot;
});
