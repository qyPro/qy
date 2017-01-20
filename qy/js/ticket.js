
	

	define(function(require,exports,module){
		var ticket={
			init:function(){
				// 调用头部底部
	        	var head_foot = require('../js/head_foot.js');
	        	var hotel_public = require('../js/hotel-public.js');
	            var pop = require('./pop.js');
	            pop.init();
	            head_foot.init();
	            hotel_public.init();

	            $('#hf_ticket_iniput1').click(function(){
				$('#hf_p').show();
				$('#hf_ticket_div_hf').show()

				})
				$('#hf_ticket_iniput2').click(function(){
				$('#hf_p').hide();
				$('#hf_ticket_div_hf').hide()
				})

			}
		}

	module.exports =ticket;

	})

	  	


