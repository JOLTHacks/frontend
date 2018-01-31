$(function(){
	var shrinkHeader = 100;
	 $(window).scroll(function() {
	   var scroll = getCurrentScroll();
		 if ( scroll >= shrinkHeader + 25 ) {
			  $('#nav').addClass('shrink');
		   }
		   else if ( scroll < shrinkHeader - 25 ) {
			   $('#nav').removeClass('shrink');
		   }
	 });
   function getCurrentScroll() {
	   return window.pageYOffset || document.documentElement.scrollTop;
	   }
   });
