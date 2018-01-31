$(function(){
	var shrinkHeader = 100;
	 $(window).scroll(function() {
	   var scroll = getCurrentScroll();
		 if ( scroll >= shrinkHeader ) {
			  $('#nav').addClass('shrink');
		   }
		   else {
			   $('#nav').removeClass('shrink');
		   }
	 });
   function getCurrentScroll() {
	   return window.pageYOffset || document.documentElement.scrollTop;
	   }
   });