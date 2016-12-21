$(document).ready(function () {

	/*=========== global vars ===========*/
	var winH = $(window).height(),
		winW = $(window).width();
	
	/*=========== function calls ===========*/
	// ---- navigation ----
	mainNavigation();




	/*=========== function defs ===========*/
	// ---- navigation ----
	function mainNavigation (){
		var navBtMain = $(".main-nav .main-nav-inner .main-nav-right-panel a.nav-menu-bt");
		var navBtMainClose = $(".main-nav-inside .inside-listing .nav-back-bt");
		navBtMain.click(function(){
			$(".main-nav-inside").addClass("main-nav-active");
		});	
		// close bt
		navBtMainClose.click(function(){
			$(".main-nav-inside").removeClass("main-nav-active");
		});
	}



});