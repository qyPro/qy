
define(function(require, exports, module){
  
    var hotel = {
        init: function() {
        
            this.dealAjax();         
        },

        dealAjax:function(){
            $.ajax({
                url:"../json/hotel.json",
                success:function(res){
                    
                    //当季热门
                    var hotel=res.hotel;            
                    var _html9=$('#hotel').html();
                    var _hh9=_.template(_html9);
                    var _html8=_hh9({hotelpo:hotel})
                    $('.hf-hotel-tu').html(_html8);

                    // 国外预订
                    var guowai= res.guowai;
                    var gg=$('#yuding').html();
                    var oo=_.template(gg);
                    var gg1=oo({yudingpo:guowai});          
                    $('#hf-hot-ul').html(gg1);

                    // 热门城市
                    var hotcity=res.hotcity;
                    var gg9=$('#yuding2').html();
                    var oo9=_.template(gg9);
                    var gg8=oo9({yudingpo2:hotcity});
                    
                    $('#hf-hot-ul2').html(gg8);

                }
            })
        }
    } 
    module.exports = hotel;
});

