<?php
require 'bd.php';
$_POST = json_decode(file_get_contents('php://input'), true);
$errors = array();
$data = array();

$sskey = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['sskey']));

if (empty($errors)){
	MysqliDB::getInstance()->query("UPDATE `users` SET `sskey`= NULL WHERE `sskey` = '".$sskey."'");	
	MysqliDB::getInstance()->close();
	$data['deleted'] = true;
	echo json_encode($data);
}else{
	print_r($errors);
}
?>