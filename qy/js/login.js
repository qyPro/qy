define(function(require, exports, module) {
    var checkForm = require('./checkForm.js');
    var Login = {
        init: function() {
            this.dealLogin();
            this.events();
        },
        dealLogin: function() {
            var mailFlag = false;
            var pwdFlag = false;
            $('.mail').on('input', function() {
                var mailVal = $('.mail').val();
                if(checkForm.checkEmail(mailVal)){
                    mailFlag = true;
                    $('.mailP1>span').hide();
                }else{
                    mailFlag = false;
                    $('.mailP1>span').show();
                }
            })
            $('.pwd').on('input', function() {
                var pwd = $('.pwd').val();
                if(checkForm.checkPassword(pwd)){
                    pwdFlag = true;
                    $('.mailP2>span').hide();
                }else{
                    pwdFlag = false;
                    $('.mailP2>span').show();
                }
            })
            $('.loginBtn').click(function() {
                if (mailFlag && pwdFlag) {
                    location.href = '../views/index.html';
                } else {
                    return;
                }
            })
        },
        events:function(){
            $('#login-logo').click(function(){
                location.href = '../views/index.html';
            })
        }
    }
	module.exports = Login;
})

