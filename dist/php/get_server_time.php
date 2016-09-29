<?php
require 'bd.php';
date_default_timezone_set('America/Argentina/Mendoza');
$serverTime = date("H",time());
if((int)$serverTime >= 22){
	echo 'true';
} else {
	echo 'false';
}
?>