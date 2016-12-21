$(document).on('click','#subButton', function(){
	       // alert();
	       $('.subscribe_txt').hide();
	       $('.subscribe_load').show(); 
		   
	       var email = $('.subScribe').val();
		   var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		    // alert(email);
				if(email==''){
					$('.subscribe_txt').text('Please enter email');
					$('.subscribe_txt').show();
					$('.subscribe_load').hide(); 
				}
				else if(email=='Email ID'){
					$('.subscribe_txt').text('Please enter email');
					$('.subscribe_txt').show();
					$('.subscribe_load').hide(); 
			    }
				else if(!emailReg.test(email))
				{
					$('.subscribe_txt').text('Please enter Valid Email');
					$('.subscribe_txt').show();
					$('.subscribe_load').hide(); 
				}
			   else
			   {
			   var str =  "email="+email;
		   		$.ajax({
					 url:'ajax/subscribe',
					 dataType:'json',
					 data: str,
					 method:'post', 
					 success:function(res){
							  // alert(res['msg']);
							   if(res['status'] == parseInt(202) ){
									//alert(res['status']);
									$('.subscribe_txt').text("Successful");
									$('.subscribe_txt').show();
									$('.subscribe_load').hide(); 
							   }
							   else if(res['status'] == parseInt(201) ){
								    $('.subscribe_txt').text("You have subscribed already");
									$('.subscribe_txt').show();
									$('.subscribe_load').hide(); 
							   }
							   else{
								    $('.subscribe_txt').text("Sorry. Please try again"); 
									$('.subscribe_txt').show();
									$('.subscribe_load').hide(); 
							   }
							  }
				  }); 
		       }
});


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

// Login
$(document).on('click', '.login_submit', function(){
	//alert("Login Submit");
    var uname =  $('.uname').val();
	var password = $('.lpassword').val();
	var str = "uname="+uname+"&password="+password;
	//alert(uname);
   // var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        var re =/^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
        var mobileChk=/^[1-9]{1}[0-9]{9}$/;
		
		
		if(uname == ''){
            $('.error_log').text('Please enter email Id').show();
	    }else if( !(re.test(uname) || mobileChk.test(uname)) ){
		$('.error_log').text('Please enter valid email Id').show();
     	}
		else  if(password=='PASSWORD'){
				$('.error_log').text('Please enter password');
				$('.error_log').show();
			}	
		else {
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
		}
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
$(document).on('click', '.register_submit', function(){
	//alert();
	var fname =  $('.rname').val();
	var mobile = $('.rmobile').val();
	var email  =  $('.remail').val();
	var password =  $('.rpassword').val();
	var city= $('.rcity').val()
	//alert(check);
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        var mob = /^[1-9]{1}[0-9]{9}$/;
	//console.log(fname);	
	if(fname==''){
		$('.error_register').text('Please enter name');
		$('.error_register').show();
	}
	else if(fname=="FULL NAME"){
	    $('.error_register').text('Please enter Name');
		$('.error_register').show();
		$('.fname').focus();
	
    }
	else if (mobile == '') {
		// $("#cPhone").after('<span class="error2" >*</span>');
		$('.error_register').text('Please enter phone no');
		$('.error_register').show();
    } 
	else if (mobile == 'MOBILE') {
		// $("#cPhone").after('<span class="error2" >*</span>');
		$('.error_register').text('Please enter phone no');
		$('.error_register').show();
    }
	else if (!mob.test(mobile)) {
		// $("#cPhone").after('<span class="error2" >*</span>');
		  hasError = true;
		 $('.error_register').text('Please enter valid phone no');
		 $('.error_register').show();
	}
	else if(email==''){
		$('.error_register').text('Please enter email');
		$('.error_register').show();
		
	}
	else if(email=='EMAIL'){
		$('.error_register').text('Please enter email');
		$('.error_register').show();
		
	}
	else if(!emailReg.test(email))
	{
		$('.error_register').text('Please enter Valid Email');
		$('.error_register').show();
	}

	else if(password==''){
		 $('.error_register').text('Please enter password');
		 $('.error_register').show();
	} 
	else if(password=='PASSWORD'){
		 $('.error_register').text('Please enter password');
		 $('.error_register').show();
	} 
	
	else if(city==''){
		 $('.error_register').text('Please enter city');
		 $('.error_register').show();
	} 
	else if(city=='CITY'){
		 $('.error_register').text('Please enter city');
		 $('.error_register').show();
	} 
    else{
		$('.register_loader').show();
		var str = "fname="+fname+"&mobile="+mobile+"&email="+email+"&password="+password+"&city="+city;
		$.ajax({
				 url:'ajax/registerUser',
				 data: str,
				 method:'post',
				 dataType:'json',
				 success:function(res){
					// alert(res['code']);
						  if(res['code'] == parseInt(200) ){
							   // alert(res['status']);
							   $('.error_register').empty().html("Logged in. Please Wait..");
							    $('.place_order').removeClass('loginClick').addClass('place_order_finalClick').text('Place Order')
							  /* $('.register_popup').delay( 800 ).fadeOut(); 
							   $('.popup_overlayer').delay( 800 ).fadeOut();*/
							   $('.error_register').show();
							   $('.register_loader').hide();
							   window.setTimeout(function(){location.reload()},00);
						   } else if(res['code'] == parseInt(400))
						  {
							   $('.error_register').empty().html(res['msg']);
							    $('.error_register').show();
							    $('.register_loader').hide();
							   //alert(res['status']);
							    //$('.register_popup').fadeOut(); 
							   // $('.popup_overlayer').fadeOut();
						  }
						   else if(res['code'] == parseInt(500))
						  {
							   $('.error_register').empty().html(res['msg']);
							    $('.error_register').show();
							   $('.register_loader').hide();
							   //alert(res['status']);
							    //$('.register_popup').fadeOut(); 
							   // $('.popup_overlayer').fadeOut();
						  }else{
							   $('.error_register').empty().html(res['status']);
							    $('.error_register').show();
							   $('.register_loader').hide();
							  //   $('.register_popup').delay( 800 ).fadeOut(); 
							  //  $('.popup_overlayer').delay( 800 ).fadeOut();
							  // alert(res['status']);
							  
						  }
					  }
			});
	   }
});	

// Fb login

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
    appId      : '315957651945869',
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
  

$(document).on('click','.update_submit',function(){
	var upEmail =  $(".uEmail").val();
	var upPhone = $(".uPhone").val();
	var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	var mob = /^[1-9]{1}[0-9]{9}$/;
	var type = $('.userType').val(); 
	console.log(upEmail , upPhone);
	if(upEmail==''){
			$('.uerror_log').text('Please enter email');
			$('.uerror_log').show();
		}
		else if(upEmail=='EMAIL'){
			$('.uerror_log').text('Please enter email');
			$('.uerror_log').show();
		}
		else if(!emailReg.test(upEmail))
		{
			$('.uerror_log').text('Please enter Valid Email');
			$('.uerror_log').show();
		}
	    else if (upPhone == '') {
			// $("#cPhone").after('<span class="error2" >*</span>');
			$('.uerror_log').text('Please enter phone no');
			$('.uerror_log').show();
	    } 
		else if (upPhone == 'MOBILE') {
			// $("#cPhone").after('<span class="error2" >*</span>');
			$('.uerror_log').text('Please enter phone no');
			$('.uerror_log').show();
	    }
		else if (!mob.test(upPhone)) {
			// $("#cPhone").after('<span class="error2" >*</span>');
			  hasError = true;
			 $('.uerror_log').text('Please enter valid phone no');
			 $('.uerror_log').show();
		}
		else{
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
			  
			  
	    }	
});

       

