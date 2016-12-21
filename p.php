<?php
include("includes/password.inc");
include("includes/bootstrap.inc");
$hashed_password = user_hash_password(trim('kanth123!'));
echo "$hashed_password";
?>