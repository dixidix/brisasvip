<?php
require 'bd.php';
$_POST = json_decode(file_get_contents('php://input'), true);

$errors = array();
$data = array();

$name = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['name']));
$lastname = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['lastname']));
$email = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['email']));
$tel = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['tel']));
$city = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['city']));
$password = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['password']));
if (empty($errors)){
	echo
	MysqliDB::getInstance()->query("INSERT INTO `users`(`name`, `lastname`, `email`, `tel`, `city`, `password`)
		VALUES ('".$name."','".$lastname."','".$email."','".$tel."','".$city."','".$password."')");

	MysqliDB::getInstance()->close();

}else{
	print_r($errors);
}
?>