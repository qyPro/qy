

			$('.hf-k-input1').blur(function(){

				var mail=$('.hf-k-input1').val();
				
				var tt= /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
				if(! tt.test(mail)){
					$('.hf-err1>span').show();
					
				}else{
					$('.hf-err1>span').hide();					
				}
			})

			$('.hf-k-input3').blur(function(){
				var name=$('.hf-k-input3').val();
				console.log(name.length)
				if(name<2){					
					$('.hf-err4>span').show();
				}else{
					$('.hf-err4>span').hide();
				}
			})

			$('.hf-k-input4').blur(function(){
				var pwd = $('.hf-k-input4').val().length;
				if(pwd<2){					
					$('.hf-err5>span').show();
				}else{
					$('.hf-err5>span').hide();
				}
			})		



 
