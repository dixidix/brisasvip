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
$res = MysqliDB::getInstance()->query("SELECT * FROM users WHERE email='" . $email . "' AND deleted='0'");
$rows = mysqli_num_rows($res);

if ($rows == 0){
	if (empty($errors)){
		echo
		MysqliDB::getInstance()->query("INSERT INTO `users`(`name`, `lastname`, `email`, `tel`, `city`, `password`)
			VALUES ('".$name."','".$lastname."','".$email."','".$tel."','".$city."','".$password."')");

		MysqliDB::getInstance()->close();

	}else{
		print_r($errors);
	}
} else {
	$errors['registerError'] = 'El E-Mail ingresado ya existe en el sistema.';

	$data['errors'] = $errors;

	echo json_encode($data);
}
?>