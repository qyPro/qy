define(function(require, exports, module) {
    var emailFlag = false;
    var pwdFlag = false;
    var nameFlag = false;
    var checkForm = require('./checkForm.js');
    var register = {
        init: function() {
            this.dealRegister();
            this.events();
        },
        dealRegister: function() {
            $('.hf-k-input1').on('input', function() {
                var mail = $('.hf-k-input1').val();
                var tt = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
                if (checkForm.checkEmail(mail)) {
                    $('.hf-err1>span').hide();
                    emailFlag = true;
                } else {
                    $('.hf-err1>span').show();
                    emailFlag = false;
                }
            })

            $('.hf-k-input3').on('input', function() {
                var name = $('.hf-k-input3').val();
                if (checkForm.checkUsername(name)) {
                    $('.hf-err4>span').hide();
                    nameFlag = true;
                } else {
                    $('.hf-err4>span').show();
                    nameFlag = false;
                }
            })

            $('.hf-k-input4').on('input', function() {
                var pwd = $('.hf-k-input4').val();
                if (checkForm.checkPassword(pwd)) {
                    $('.hf-err5>span').hide();
                    pwdFlag = true;
                } else {
                    $('.hf-err5>span').show();
                    pwdFlag = false;
                }
            })
        },
        events: function() {
            // if(flag){
            // 	$('.hf-zhuce').css({'background-color':'#3f9f5f'});
            // }else{
            // 	$('.hf-zhuce').css({'background-color':'#999'});
            // }
            $('#register-logo').click(function() {
                location.href = '../views/index.html';
            });
            $('.hf-zhuce').click(function() {
                // alert('OK');
                if (emailFlag && pwdFlag && nameFlag) {
                    location.href = '../views/index.html'
                } else {
                    if (!emailFlag) {
                        $('.hf-err1>span').show();
                    }
                    if (!nameFlag) {
                        $('.hf-err4>span').show();
                    }
                    if (!pwdFlag) {
                        $('.hf-err5>span').show();
                    }
                }
            })
        }

    }
    module.exports = register;
})
