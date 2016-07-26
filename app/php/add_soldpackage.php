<?php
require 'bd.php';
$_POST = json_decode(file_get_contents('php://input'), true);
$errors = array();
$data = array();
if(empty($errors)){

$name = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['name']));
$lastname = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['lastname']));
$email = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['email']));
$tel = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['tel']));
$date = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['date']));
$time = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['time']));
$packageId = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['packageId']));

MysqliDB::getInstance()->query("INSERT INTO `soldpackages`(`name`, `lastname`, `email`, `tel`, `date`, `time`, `packageId`) VALUES ('".$name."','".$lastname."','".$email."','".$tel."','".$date."','".$time."',".$packageId.")");	

}else{
	print_r($errors);
}
?>