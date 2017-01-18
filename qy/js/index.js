define(function(require, exports, module) {
    var index = {
        init: function() {
        	var head_foot = require('./head_foot.js');
        	var pop = require('./pop.js');
        	pop.init();
        	head_foot.init();
        }
    }
    module.exports = index;
});
