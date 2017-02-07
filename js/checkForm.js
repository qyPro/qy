define(function(require,exports,module) {
    var checkForm = {
        checkEmail: function(email) {
            var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
            if (reg.test(email.trim())) {
                return true;
            } else {
                return false;
            }
        },
        checkPassword: function(pwd) {
            if (pwd.length < 16 && pwd.length > 5) {
                return true;
            } else {
                return false;
            }
        },
        checkUsername: function(name) {
        	if( name.length>2 && name.length<5 ){
        		return true;
        	}
        	else{
        		return false;
        	}
        }
    }
    module.exports = checkForm;
})
