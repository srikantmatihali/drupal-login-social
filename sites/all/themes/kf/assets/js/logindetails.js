/*back to top*/
jQuery( document ).ready(function( $ ) {

	var $window = $(window);			
	$(window).load(function(){});	 

	/*validator functions*/
	$.validator.methods.email = function( value, element ) {
	  return this.optional( element ) || /[a-z]+@[a-z]+\.[a-z]+/.test( value );
	}
	$("#signupform").validate({
		rules: {
			name:{minlength: 3},
			phone:{minlength: 10,maxlength:18},
			password:{
				required:true,
				minlength: 8
			},
			confirmpassword: {
                equalTo: "#password",
                minlength: 8
            }
        },
        messages: { 
        	phone:{
        		minlength:"Enter Valid Phone number",
        		maxlength: "Enter Valid Phone number"
        	},    	
        	confirmpassword: {
        		 equalTo: "Password do not match"
        	}
        }
	});

	$('#loginForm').validate();
	$('#updateEmailPhone').validate({
		rules: {			
			user_number:{minlength: 10,maxlength:18}
		}
	});
	/*validator functions*/

	// Login script 
	$(document).on('click', '.loginClick', function(){
		//alert();
		$('.login,.login_overlayer').fadeIn();
	});

	$(document).on('click', '.registerClick', function(){
		$('.register,.login_overlayer').fadeIn();
	});

	$(document).on('click', '.close_form', function(){
		$('.login,.login_overlayer,.register ,.fbEmailForm').fadeOut();
	});

	// Login form submit
	$(document).on('submit', '#loginForm', function(e){
		e.preventDefault();
	    var uname =  $('.uname').val();
		var password = $('.lpassword').val();
		var str = "uname="+uname+"&password="+password;		
        $.ajax({
	     url:'ajax/userLogin',
		 dataType:'json',
		 data: str,
		 method:'post', 
		 success:function(res){
			      //alert(res['msg']);
			      if(res['code'] == 200 ){
						$('.error_log').empty().html("Success").show();
						//window.setTimeout(function(){location.reload()},1500);
						 var tempt="<a href='my-account' class='myAccount' >My Account</a> <a href='javascript:void(0);' class='logout'>Logout</a>";
						 $('.myAccountClass').html(tempt);
						 
						 // to replace shopping cart page clicks
						 $('.place_order').removeClass('loginClick').addClass('place_order_finalClick').text('Place Order')
						 
						 
						 
						 $('.login,.login_overlayer,.loginClick').hide();
						 $('.beforeLogin').removeClass('loginClick').addClass('review').text("Review").show();
					  }
				  else{
					   $('.error_log').empty().html("The email or password you entered is incorrect.");
					   $('.error_log').show();
					  }
		      }
	    });
	    return false;		
	});	

	//function called when user clicks on logout button(not using)
	$(document).on('click', '.logout', function(e){
		e.preventDefault();
		console.log('logout');
		$.ajax({
	            url: 'ajax/userLogout',
	            method: 'post',           
	            success: function(response) {
	                    if(response['code']==200){
					      window.setTimeout(function(){location.reload()},1500);
						}else{
					  // erorr message	
						
						}
	            }
		});
	});
		
	// Register submit
	$(document).on('submit', '#signupform', function(e){ 	//$(document).on('click', '.register_submit', function(){
		e.preventDefault();		
		var fname =  $('.rname').val();
		var mobile = $('.rmobile').val();
		var email  =  $('.remail').val();
		var password =  $('.rpassword').val();		
		$('.register_loader').show();
		var str = "fname="+fname+"&mobile="+mobile+"&email="+email+"&password="+password;
		$.ajax({
				 url:'ajax/registerUser',
				 data: str,
				 method:'POST',
				 dataType:'json',
				 success:function(res){ // alert(res['code']);					
						  if(res['code'] == parseInt(200) ){	// alert(res['status']);						
							   $('.error_register').empty().html("Logged in. Please Wait..").show();
							   //$('.place_order').removeClass('loginClick').addClass('place_order_finalClick').text('Place Order')							  
							   
							   //$('.register_loader').hide();
							   //window.setTimeout(function(){location.reload()},00);
						   } else if(res['code'] == parseInt(400))
						  {
							   $('.error_register').empty().html(res['msg']).show();							    
							   // $('.register_loader').hide();
						  }
						   else if(res['code'] == parseInt(500))
						  {
							   $('.error_register').empty().html(res['msg']).show();							    
							   $('.register_loader').hide();
						  }else{
							   $('.error_register').empty().html(res['status']).show();							    
							   $('.register_loader').hide();							  
						  }
					  }
		});
		return false;	   
	});	

	// Fb login
		// Register submit
		$(document).on('click', '.fb_login', function(e){ 	//$(document).on('click', '.register_submit', function(){
			e.preventDefault();
			console.log('here');
			myFacebookLogin();
			//return false;	   
		});		
	  // This is called with the results from from FB.getLoginStatus().
	  function statusChangeCallback(response) {
	    console.log('statusChangeCallback');
	    console.log(response);
	    // The response object is returned with a status field that lets the
	    // app know the current login status of the person.
	    // Full docs on the response object can be found in the documentation
	    // for FB.getLoginStatus().
	    if (response.status === 'connected') {
	      // Logged into your app and Facebook.
	      testAPI();
	    } else if (response.status === 'not_authorized') {
	      // The person is logged into Facebook, but not your app.
	      document.getElementById('status').innerHTML = 'Please log ' +
	        'into this app.';
	    } else {
	      // The person is not logged into Facebook, so we're not sure if
	      // they are logged into this app or not.
	      document.getElementById('status').innerHTML = 'Please log ' + 'into Facebook.';
	    }
	  }

	  // This function is called when someone finishes with the Login
	  // Button.  See the onlogin handler attached to it in the sample
	  // code below.
	  function checkLoginState() {
		  console.log("checkLoginState called");
	     FB.getLoginStatus(function(response) {
	      statusChangeCallback(response);
	    });
	  }
	  
	   function myFacebookLogin() {  
		  //testAPI();
		
		FB.login(function(response) {
		  if (response.status === 'connected') {
			// Logged into your app and Facebook.
			//console.log(response);
			
			 testAPI();
		  } else if (response.status === 'not_authorized') {
			// The person is logged into Facebook, but not your app.
		  } else {
			// The person is not logged into Facebook, so we're not sure if
			// they are logged into this app or not.
		  }
		},{scope: 'user_photos'}); 
	  }
	  
	  

	  window.fbAsyncInit = function() {
	  FB.init({
	    appId      : '1654697778163319',
	    cookie     : true,  // enable cookies to allow the server to access 
	                        // the session
	    xfbml      : true,  // parse social plugins on this page
	    version    : 'v2.8' // use graph api version 2.8
	  });

	  // Now that we've initialized the JavaScript SDK, we call 
	  // FB.getLoginStatus().  This function gets the state of the
	  // person visiting this page and can return one of three states to
	  // the callback you provide.  They can be:
	  //
	  // 1. Logged into your app ('connected')
	  // 2. Logged into Facebook, but not your app ('not_authorized')
	  // 3. Not logged into Facebook and can't tell if they are logged into
	  //    your app or not.
	  //
	  // These three cases are handled in the callback function.

	  /*FB.getLoginStatus(function(response) {
		  alert("Login Status");
	    statusChangeCallback(response);
	  });*/

	  };

	  // Load the SDK asynchronously
	  (function(d, s, id) {
	    var js, fjs = d.getElementsByTagName(s)[0];
	    if (d.getElementById(id)) return;
	    js = d.createElement(s); js.id = id;
	    js.src = "//connect.facebook.net/en_US/sdk.js";
	    fjs.parentNode.insertBefore(js, fjs);
	  }(document, 'script', 'facebook-jssdk'));

	  // Here we run a very simple test of the Graph API after login is
	  // successful.  See statusChangeCallback() for when this call is made.
	 
	   function testAPI() {
	    console.log('Welcome!  Fetching your information.... ');
	    FB.api('/me?fields=email,id,name', function(response) {
	      //console.log('Successful login for: ' + response.name);//document.getElementById('status').innerHTML ='Thanks for logging in, ' + response.name + '!';
		  console.log(response);
			var id=response.id;     
			var username=(typeof response.username != 'undefined')?response.username : '';
			var email=(typeof response.email != 'undefined')?response.email : '';		
			var string='loginType=1&id='+id;
			if(typeof response.name!='undefined')
			{
				string+='&name='+response.name;
			}
			/*if(typeof response.username!='undefined')
			{
				string+='&username='+username;
			}*/	
			if(typeof response.email!='undefined')
			{
				string+='&email='+email;
			}		
			var dataString='';
			$.ajax({
				type:'POST',
				url: 'ajax/fbLogin',
				data: string,			
				dataType : 'json',
				success:function(html){ 
					switch(html.code){ 
						default:
						case 403: alert(html['message']);
								break;
						case 200: 					
						case 401: isloggedin = 'true';
								  switch(urlType){
									  case 1:  
											  break;
									  case 2: 
											  break;
								  }
								break;
						case 404: $('.login,.register,.fbEmailForm,.login_details_form,.login_overlayer').hide();
						         var tempt="<a href='my-account' class='myAccount' >My Account</a> <a href='javascript:void(0);' class='logout'>Logout</a>";
								  $('.myAccountClass').html(tempt);
								  $('.place_order').removeClass('loginClick').addClass('place_order_finalClick').text('Place Order')
								 break;
						
						case 405: $('.login,.register').hide();
						          $('.fbEmailForm').show();
								  $('.userType').val(1);
						
						}//window.location="<?php echo $siteurl;?>create.php";			
				}	
			});
	    });
	  }
	  

	$(document).on('submit','#updateEmailPhone',function(e){
		e.preventDefault();
    	var upEmail =  $(".uEmail").val();
		var upPhone = $(".uPhone").val();
		var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		var mob = /^[1-9]{1}[0-9]{9}$/;
		var type = $('.userType').val(); 
		
	  	//alert("Upadte Click");	
	  	var  srting = "email="+upEmail+"&phone="+upPhone+"&type="+type;
	  	$.ajax({
			 url:'ajax/emailPhoneUpdateFBGL',
			 data: srting,
			 method:'post',
			 dataType:'json',
			 success:function(res){
				 switch(res['code']){
					 case 202: $('.uerror_log').text('Updated successfully').show();
					            var tempt="<a href='my-account' class='myAccount' >My Account</a> <a href='javascript:void(0);' class='logout'>Logout</a>";
								 $('.myAccountClass').html(tempt);										  
							   	break;
					 case 200: $('.uerror_log').text('Email ID or Phone no. is associated with other account').show(); break;
				 }
			 }						 
			 
		  });	  
	  	return false;
	});


	/*twitter login*/
	var tweet_notset = true;
	$(document).on("click", ".twt_login", function(e) {
		 e.preventDefault();
		if(tweet_notset===true){
			var link = Drupal.settings.baseUrl.twitterlink; //'<?php echo BASEURL . 'redirect.php?rbtb='.uniqid(); ?>';
			var win =  window.open(link, '', 'width=600,height=400,resizable=yes,scrollbars=yes');
		}		
		return false;
	});

	function test_twitter() {   
		$('.login,.register').hide();
        $('.fbEmailForm').show();
	    $('.userType').val(2);
		tweet_notset = false;
	}

					
});//end of $  convert.