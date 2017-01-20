seajs.config({
	base:'./'
})
seajs.use(['../js/head_foot.js','../js/pop.js','../js/hotel-public.js'],function(head_foot,pop,hotel_public){
	head_foot.init();
	pop.init();
	hotel_public.init();
})