<?php
require 'bd.php';
$_POST = json_decode(file_get_contents('php://input'), true);
$errors = array();
$data = array();

$id = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['id']));

if (empty($errors)){
	echo
	MysqliDB::getInstance()->query("UPDATE `packages` SET `deleted`= 1 WHERE `id` = ".$id."");	
	MysqliDB::getInstance()->close();

}else{
	print_r($errors);
}
?>