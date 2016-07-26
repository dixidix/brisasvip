<?php
require 'bd.php';
$_POST = json_decode(file_get_contents('php://input'), true);
$errors = array();
$data = array();

$username = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['username']));
$password = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['password']));

$sskey = md5(uniqid(rand(), true));

$username = stripslashes($username);
$password = stripslashes($password);

$res = MysqliDB::getInstance()->query("SELECT * FROM users WHERE email='" . $username . "' AND password='" . $password . "' AND deleted='0'");

$rows = mysqli_num_rows($res);

if ($rows == 1){
	$rss = $res->fetch_array(MYSQLI_ASSOC);

	$id = $rss['id'];

	$data['name'] = $rss['name'];

	$data['lastname'] = $rss['lastname'];

	MysqliDB::getInstance()->query("UPDATE `users` SET `sskey`='".$sskey."' WHERE `id`='$id'");
	$data['sskey'] = $sskey;



	echo json_encode($data);

}else{

	$errors['loginError'] = 'Los datos ingresados no son correctos.';

	$data['errors'] = $errors;

	echo json_encode($data);

}

MysqliDB::getInstance()->close();

?>