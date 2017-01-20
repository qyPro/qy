define(function(require, exports, module) {
    var hotel_public = {
        init: function() {
            var footer_html = require('../views/hotel-pubic.html');
            $('#nav').html(footer_html);
        }
    }
    module.exports = hotel_public;
});
