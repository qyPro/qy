define(function(require, exports, module) {
    var pop = {
        init: function() {
            var pop_html = require('../views/pop.html');
            $('#pop').html(pop_html);
            this.events();
        },
        events:function(){
        	$('#pop .close').click(function(){
        		$('#pop').fadeOut();
        	})
        }
    }
    module.exports = pop;
});
