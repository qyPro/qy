define(function(require,exports,module){
	var tavern = {
		init:function(){
			var head_foot = require('./head_foot.js');
			var hotel_public = require('./hotel-public.js');
			var pop = require('./pop.js');
            pop.init();
			head_foot.init();
			hotel_public.init();
			this.events();
			this.getTavernData();
		},
		getTavernData:function(){
			$.ajax({
				url:'../json/tavern.json',
				type:'get',
				success:function(res){
					if(res.resultCode == '0000'){
						// var tavernData = res['data'+num];
						var tavernData = res.tableData;
						var imgData = res.imgData;
						var _htmlList = $('#tavern-html').html();
						var _htmlImg = $('#tavern-img').html();
						_htmlList_fn = _.template(_htmlList);
						_htmlImg_fn = _.template(_htmlImg);
						var listHtml = _htmlList_fn({tavernData:tavernData})
						var imgHtml = _htmlImg_fn({imgData:imgData})
						$('#option-show').html(listHtml);
						$('#img-content').html(imgHtml);
					}
				},
				error:function(){
					alert('请求数据失败');
				}
			})
		},
		events:function(){
			var that = this;
			$('#table>.option>li').click(function(){
				var index = $(this).index();
				$(this).addClass('active').siblings().removeClass('active');
				$('#option-show>ul').eq(index).show().siblings().hide();
				// that.getTavernData(index);
			})
		}
	}
	module.exports = tavern;
})