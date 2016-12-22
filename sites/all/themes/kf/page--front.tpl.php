<?php   //phpinfo();
//render($page['content']['metatags']); 
//include 'includes/header.php';

//echo user_hash_password('mypassword');
?>
<style>
	.sign_in_form,.login_form,.login_details_form{
		border:1px solid black;
	}
	#popup{   
		text-align: center;
		border: 1px solid black;
		top: 10%;
		position: relative; 
	}
	html, body {
		margin: 0;
		padding: 0;
		width: 100%;
		height: 100%;
	}
</style>

<!--login options-->
<div id="popup" >
	
	<!-- login popup -->    
	<div class="login_overlayer"  style="display: block;"></div>
	<div class="sign_in register" style="display: block;">
		<div>
			<div>
				<div class="sign_in_form">
				<div class="form_lh">
					<h2>Sign Up</h2>
					<div class="form">
						<form action="" id="signupform"  >
							<div class="txt_box">
								<label for="name">Name</label>
								<input id="name" type="text" name="name" required class="rname txt_field" >
								
							</div>
							<div class="txt_box">
								<label for="email">Email</label>
								<input id="email" type="email" name="email" required class="remail txt_field" >
								
							</div>
							<div class="txt_box">
								<label for="phone">Phone</label>
								<input id="phone" type="number" name="phone" required class="rmobile txt_field" >
								
							</div>
							<div class="txt_box">
								<label for="password">Password</label>
								<input id="password" type="password" required class="rpassword txt_field" name="password" >
								
							</div>
							<div class="txt_box">
								<label for="confirmpassword">Retype Password</label>
								<input id="confirmpassword" type="text" required class="confirmpassword txt_field" name="confirmpassword" >								
							</div>							
							<input type="submit" value="Submit" class="sign_in_submit register_submit">
						</form>
					</div>
					<p class="error_register"></p>
				</div>
				<div class="form_rh_holder">
					<div>
						<div>
							<div class="form_rh">
								<a href="#" class="login_social fb_login">
									<span></span>
									<p>Sign Up with Facebook</p>
								</a>

							   <div class="or_line"><span>OR</span></div>
								<a href="#" class="login_social tw_login">
									<span></span>
									<p><a href="#" class="twt_login">Log in with Twitter</a></p>
								</a>
							</div>
						</div>
					</div>
				</div>
				<a class="close_form"></a>
				<div class="clear"></div>
				</div>
			</div>
		</div>
	</div>

	<div class="login" style="display: block;">
		<div>
			<div>
			<div class="login_form">
				<div class="form_lh">
					<h2>Login</h2>
					<div class="form">
						<form action="" id="loginForm" >
							<div class="txt_box">
								<label for="username">Email</label>
								<input id="username" type="email" name="uname" required class="uname txt_field" value="" >								
							</div>
							<div class="txt_box">
								<label for="login_password">Password</label>
								<input id="login_password" type="password" name= "password" required class="lpassword txt_field">
							</div>
								<input type="submit" value="Submit" class="login_submit">
						</form>
						 <p class="error_log" style="display:none;"></p>
						 
					</div>
				</div>
				<div class="form_rh_holder">
					<div>
						<div>
							<div class="form_rh">
								<a href="#" class="login_social fb_login">
									<span></span>
									<p>Sign Up with Facebook</p>  
								</a>
								<!--<div class="or_line"><span>OR</span></div>
								<a href="#" class="login_social g_login">
									<span></span>
									<p>Sign Up with Google</p>
								</a>-->
							</div>
						</div>
					</div>
				</div>
				<a class="close_form"></a>
				<div class="clear"></div>
			</div>
			</div>
		</div>
	</div>

	<!-- =====================================================================================================================  -->
	<div class="login_details fbEmailForm"  style="display: none;">
		<div>
			<div>
				<div class="login_details_form">
						<h2>Please provide below details</h2>
						<div class="form">
							<form action="" id="updateEmailPhone"  >
								<div class="txt_box">
									<label for="userEmailUpdate">Email Id</label>
									<input type="hidden"  class="userType" value="" >
									<input class="txt_field uEmail" id="userEmailUpdate" required type="email" name="email">
									
								</div>
								<div class="txt_box">
									<label for="user_number">Phone Number</label>
									<input class="txt_field uPhone" id="user_number" required type="number" name="user_number">	  								
								</div>
								
								<input type="button" value="Submit" class="update_submit">
							</form>
							  <p class="uerror_log" style="display:none;"></p>
						</div>
					<a class="close_form"></a>
					<div class="clear"></div>
				</div>
			</div>
		</div>
	</div>
	
</div>
<!--login options-->
<script src="<?php echo getBaseURL();?>sites/all/themes/kf/assets/js/jquery.validate.min.js" ></script>
<script src="<?php echo getBaseURL();?>sites/all/themes/kf/assets/js/logindetails.js" ></script>
<script>
console.log('load');
//jQuery( document ).ready(function( $ ) {
	/*function test_twitter() {
	   	//console.log('I am done dude!!');
		jQuery('.login,.register').hide();
        jQuery('.fbEmailForm').show();
	    jQuery('.userType').val(2);
		tweet_notset = false;
	}*/	
//});
</script>
<?php //include 'includes/footer.php';?>