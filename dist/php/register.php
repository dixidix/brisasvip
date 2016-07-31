<?php
require 'bd.php';
$_POST = json_decode(file_get_contents('php://input'), true);

$errors = array();
$data = array();
if(empty($_POST['conclude'])){
	$name = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['name']));
	$lastname = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['lastname']));
	$email = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['email']));
	$tel = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['tel']));
	$city = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['city']));
	$password = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['password']));
	$res = MysqliDB::getInstance()->query("SELECT * FROM users WHERE email='" . $email . "' AND deleted='0'");
	$registerToken = md5(uniqid(rand(), true));
	$rows = mysqli_num_rows($res);

	if ($rows == 0){
		$timestamp = time();
		if (empty($errors)){
			MysqliDB::getInstance()->query("INSERT INTO `users`(`name`, `lastname`, `email`, `tel`, `city`, `password`, `registerToken`, `registertimestamp`, `deleted`)
				VALUES ('".$name."','".$lastname."','".$email."','".$tel."','".$city."','".$password."','".$registerToken."',".$timestamp.",1)");
			MysqliDB::getInstance()->close();
			$data['registerToken'] = $registerToken;
			echo json_encode($data);
		}else{
			$data['errors'] = $errors;
			echo json_encode($data);
		}
	} else {
		$errors['registerError'] = 'El E-Mail ingresado ya existe en el sistema.';
	}
} else {
	$token = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['token']));
	$timestamp = time();
	$res = MysqliDB::getInstance()->query("SELECT registertimestamp FROM users WHERE registerToken='" . $token . "'");
	$rows = mysqli_num_rows($res);
	if ($rows == 0){
		$errors['invalid'] = 'El token de seguridad es invalido';
	}else{
		$rss = $res->fetch_array(MYSQLI_ASSOC);
		$expire = floor(($timestamp - $rss['registertimestamp'])/60);

		if($expire > 1){
			$errors['expired'] = 'El token de seguridad expiró';

			MysqliDB::getInstance()->query("DELETE FROM `users` WHERE registerToken='" . $token . "'");
			MysqliDB::getInstance()->close();	
		} 
	}
	if (empty($errors)){
		MysqliDB::getInstance()->query("UPDATE `users` SET `deleted`= 0,`registerToken`=NULL WHERE `registerToken` = '".$token."'");	
		MysqliDB::getInstance()->close();

	}else{
		$data['errors'] = $errors;
		echo json_encode($data);
	}
}
?>