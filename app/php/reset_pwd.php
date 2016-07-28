<?php
require 'bd.php';
$_POST = json_decode(file_get_contents('php://input'), true);
$errors = array();
$data = array();
if(!empty($_POST['email'])){
	$email = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['email']));
}
if($_POST['toReset'] == true){
	$token = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['token']));
	$pwd = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['pwd']));
	echo "UPDATE `users` SET `password`= '".$pwd."',`fpswdToken`= NULL WHERE fpswdToken='" . $token . "'";
	MysqliDB::getInstance()->query("UPDATE `users` SET `password`= '".$pwd."',`fpswdToken`= NULL,`sskey`= NULL WHERE fpswdToken='" . $token . "'");
	MysqliDB::getInstance()->close();	
} else {
	$res = MysqliDB::getInstance()->query("SELECT * FROM users WHERE email='" . $email . "' AND deleted='0'");
	$fpswdToken = md5(uniqid(rand(), true));
	$rows = mysqli_num_rows($res);
	if ($rows == 1){
		if (empty($errors)){
			MysqliDB::getInstance()->query("UPDATE `users` SET `fpswdToken`= '".$fpswdToken."' WHERE email='" . $email . "' AND deleted='0'");
			MysqliDB::getInstance()->close();		
			$data['fpswdToken'] = $fpswdToken;
			echo json_encode($data);

		}else{
			print_r($errors);
		}
	} else {
		$errors['error'] = 'El E-Mail ingresado no existe en el sistema.';

		$data['errors'] = $errors;

		echo json_encode($data);
	}
}
?>