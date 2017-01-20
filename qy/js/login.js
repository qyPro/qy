

$(function(){
	var mailFlag=false;
	var pwdFlag=false;
	$('.mail').on('input',function(){
		
                var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
                var mailVal = $('.mail').val();
                if (reg.test(mailVal.trim())) {
                     mailFlag=true;
                    $('.mailP1>span').hide();
                } else {
                    mailFlag=false;
                    $('.mailP1>span').show();
                }       
	})
	$('.pwd').on('input',function(){
			var reg2=/^$/;
			var pwd=$('.pwd').val();
			if(pwd.length<16 && pwd.length>6){
				$('.mailP2>span').hide();
					 pwdFlag=true;
			}else{
					 pwdFlag=false;
				$('.mailP2>span').show();
			}
	})
	$('.loginBtn').click(function(){
		if(mailFlag && pwdFlag){
			location.href='../views/index.html';
		}else{
			return;
		}
	})
	
})
 