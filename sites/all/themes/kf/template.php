<?php
/**
 * @file
 * Contains the theme's functions to manipulate Drupal's default markup.
 *
 * Complete documentation for this file is available online.
 * @see https://drupal.org/node/1728096
 */


/**
 * Override or insert variables into the maintenance page template.
 *
 * @param array $variables
 *   Variables to pass to the theme template.
 * @param string $hook
 *   The name of the template being rendered ("maintenance_page" in this case.)
 */
/* -- Delete this line if you want to use this function
function kf_preprocess_maintenance_page(&$variables, $hook) {
  // When a variable is manipulated or added in preprocess_html or
  // preprocess_page, that same work is probably needed for the maintenance page
  // as well, so we can just re-use those functions to do that work here.
  kf_preprocess_html($variables, $hook);
  kf_preprocess_page($variables, $hook);
}
// */

/**
 * Override or insert variables into the html templates.
 *
 * @param array $variables
 *   Variables to pass to the theme template.
 * @param string $hook
 *   The name of the template being rendered ("html" in this case.)
 */
/* -- Delete this line if you want to use this function
function kf_preprocess_html(&$variables, $hook) {
  $variables['sample_variable'] = t('Lorem ipsum.');

  // The body tag's classes are controlled by the $classes_array variable. To
  // remove a class from $classes_array, use array_diff().
  $variables['classes_array'] = array_diff($variables['classes_array'],
    array('class-to-remove')
  );
}
// */

/**
 * Override or insert variables into the page templates.
 *
 * @param array $variables
 *   Variables to pass to the theme template.
 * @param string $hook
 *   The name of the template being rendered ("page" in this case.)
 */
/* -- Delete this line if you want to use this function
function kf_preprocess_page(&$variables, $hook) {
  $variables['sample_variable'] = t('Lorem ipsum.');
}
// */

/**
 * Override or insert variables into the region templates.
 *
 * @param array $variables
 *   Variables to pass to the theme template.
 * @param string $hook
 *   The name of the template being rendered ("region" in this case.)
 */
/* -- Delete this line if you want to use this function
function kf_preprocess_region(&$variables, $hook) {
  // Don't use Zen's region--no-wrapper.tpl.php template for sidebars.
  if (strpos($variables['region'], 'sidebar_') === 0) {
    $variables['theme_hook_suggestions'] = array_diff(
      $variables['theme_hook_suggestions'], array('region__no_wrapper')
    );
  }
}
// */

/**
 * Override or insert variables into the block templates.
 *
 * @param array $variables
 *   Variables to pass to the theme template.
 * @param string $hook
 *   The name of the template being rendered ("block" in this case.)
 */
/* -- Delete this line if you want to use this function
function kf_preprocess_block(&$variables, $hook) {
  // Add a count to all the blocks in the region.
  // $variables['classes_array'][] = 'count-' . $variables['block_id'];

  // By default, Zen will use the block--no-wrapper.tpl.php for the main
  // content. This optional bit of code undoes that:
  if ($variables['block_html_id'] == 'block-system-main') {
    $variables['theme_hook_suggestions'] = array_diff(
      $variables['theme_hook_suggestions'], array('block__no_wrapper')
    );
  }
}
// */

/**
 * Override or insert variables into the node templates.
 *
 * @param array $variables
 *   Variables to pass to the theme template.
 * @param string $hook
 *   The name of the template being rendered ("node" in this case.)
 */
/* -- Delete this line if you want to use this function
function kf_preprocess_node(&$variables, $hook) {
  $variables['sample_variable'] = t('Lorem ipsum.');

  // Optionally, run node-type-specific preprocess functions, like
  // kf_preprocess_node_page() or kf_preprocess_node_story().
  $function = __FUNCTION__ . '_' . $variables['node']->type;
  if (function_exists($function)) {
    $function($variables, $hook);
  }
}
// */

/**
 * Override or insert variables into the comment templates.
 *
 * @param array $variables
 *   Variables to pass to the theme template.
 * @param string $hook
 *   The name of the template being rendered ("comment" in this case.)
 */
/* -- Delete this line if you want to use this function
function kf_preprocess_comment(&$variables, $hook) {
  $variables['sample_variable'] = t('Lorem ipsum.');
}
// */
function kf_html_head_alter(&$head_elements) {
  unset($head_elements['system_meta_generator']);
}

function kf_preprocess_html(&$head_elements){
	$elements = drupal_add_html_head();
	 if (!empty($elements['metatags_quick_meta_page_title']['#attributes']['content'])) {
		$head_elements['head_title'] = $elements['metatags_quick_meta_page_title']['#attributes']['content'];
	  }
}


/*function kf_js_alter(&$js)
{
    $path = drupal_get_path('theme', 'kf');
    unset($js[$path .'/misc/jquery.js?v=1.4.4']);
    //unset($js['misc/jquery.once.js']);
   // unset($js['sites/all/modules/admin_menu/admin_devel/admin_devel.js']);

    $js['misc/jquery.js']['data'] = $path.'/assets/js/jquery-3.1.1.min.js';
    $js['misc/jquery.js']['version'] = '3.1.1';
    //unset($js[drupal_get_path('module', 'panels').'/misc/jquery.js']);    
    
}*/

function kf_preprocess_page(&$vars) {
  
  ## add all css and js here  
  /*drupal_add_css(path_to_theme(). "/css/bootstrap.min.css",array('weight' =>0));
  drupal_add_css(path_to_theme(). "/css/owl.theme.css",array('weight' =>1));
  drupal_add_css(path_to_theme(). "/css/owl.carousel.css",array('weight' =>2));
  drupal_add_css(path_to_theme(). "/css/nav.css",array('weight' =>3));
  drupal_add_css(path_to_theme(). "/css/kf.css",array('weight' =>4));*/

  $redirectlink = getBaseURL().'ajax/twitterredirect?rbtb='.uniqid();
  $facebookid =  '****************'
  $my_settings = array( 'basePath' => getBaseURL(),'twitterlink'=>$redirectlink,'fbappid'=>$facebookid);  
  drupal_add_js(array('baseUrl' => $my_settings), 'setting');
  //drupal_add_js(path_to_theme().'/assets/js/logindetails.js',array('weight' =>20));

  if (isset($vars['node']->type) && $vars['node']->type == 'page' ) { // We don't want to apply this on taxonomy or view pages
    // Splice (2) is based on existing default suggestions. Change it if you need to.
    array_splice($vars['theme_hook_suggestions'], -1, 0, 'page__'.$vars['node']->type);
    // Get the url_alias and make each item part of an array
    $url_alias = drupal_get_path_alias($_GET['q']);
    $split_url = explode('/', $url_alias);
    // Add the full path template pages
    // Insert 2nd to last to allow page--node--[nid] to be last
    $cumulative_path = '';
    foreach ($split_url as $path) {
      $cumulative_path .= '__' . $path;
      $path_name = 'page' . $cumulative_path;
      array_splice($vars['theme_hook_suggestions'], -1, 0, str_replace('-','_',$path_name));
    }
    // This does just the page name on its own & is considered more specific than the longest path
    // (because sometimes those get too long)
    // Also we don't want to do this if there were no paths on the URL
    // Again, add 2nd to last to preserve page--node--[nid] if we do add it in
    if (count($split_url) > 1) {
      $page_name = end($split_url);
      array_splice($vars['theme_hook_suggestions'], -1, 0, 'page__'.str_replace('-','_',$page_name));
    }
  }
  else if(arg(0) == 'taxonomy' && arg(1) == 'term' && is_numeric(arg(2))) {
    $term = taxonomy_term_load(arg(2));
    //$vars['theme_hook_suggestions'][] = 'page__vocabulary__' . $term->vocabulary_machine_name;
	array_splice($vars['theme_hook_suggestions'], -1, 0, 'page__taxonomy__term__'.$term->vocabulary_machine_name);
  }
  
   $vars['scripts'] = drupal_get_js();
  //echo '<pre style="display:none">'; print_r($vars['theme_hook_suggestions']); echo '</pre>'; 
}

//Theme URL
function getThemeURL() {
  //Path to theme
  global $base_root;
  return $base_root . base_path() . path_to_theme();
}

//Site URL
function getBaseURL() {
  global $base_root;
  return $base_root . base_path();
}

//get post value.
function getPostValue($var){
    
    //$var = preg_replace('/[\x00-\x1F\x80-\xFF]/', '', $var);return trim(check_plain(filter_xss($var)));
    //removes slashes.
    $forminput = stripslashes($var);
    //removes smiley
    $forminput = preg_replace('/[\x00-\x1F\x80-\xFF]/', '', $forminput);
    //removes special characters.
    $forminput = htmlspecialchars($forminput);
    return trim(check_plain(filter_xss($var)));
}

//function for get visitor ip address  
function getipAddress(){
    if (getenv(HTTP_X_FORWARDED_FOR)) {
          $ip_address = getenv(HTTP_X_FORWARDED_FOR);
      } else {
          $ip_address = getenv(REMOTE_ADDR);
      }
  return $ip_address;
}

function checkLogin(){
      global $user;
       $userLoggedData =array();
         if(user_is_logged_in()) {
          $userSession=$user;
          $userId=$userSession->uid;
          $user_fields = user_load($user->uid);
          $userLoggedData = array("ses"=>1,
                                  "userid"=>$userId,
                      "userName"=>$user_fields->field_user_full_name['und'][0]['value'],
                      "userEmail"=>$user_fields->mail,
                      "userAddress"=>$user_fields->field_user_address['und'][0]['value']
                      );
        }else{
          $userSession='';
          $userLoggedData = array("ses"=>0);
        }
        return $userLoggedData;
}