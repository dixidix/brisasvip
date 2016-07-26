<?php
require 'bd.php';
$_POST = json_decode(file_get_contents('php://input'), true);

$errors = array();
$data = array();

$editUser =  MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['editUser']));

if(!empty($_POST['id'])){
	$id =  MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['id']));
}

if($editUser == false){
	$lockunlock =   MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['lockunlock']));

	if($lockunlock == 0){
		if (empty($errors)){
			echo "UPDATE `users` SET `isAdmin`='1'  WHERE `id`=".$id."";
			echo
			MysqliDB::getInstance()->query("UPDATE `users` SET `isAdmin`='1'  WHERE `id`=".$id."");
		}else{
			print_r($errors);
		}
	}else if($lockunlock == 1){
		if (empty($errors)){
			echo "UPDATE `users` SET `isAdmin`='1'  WHERE `id`=".$id."";
			echo
			MysqliDB::getInstance()->query("UPDATE `users` SET `isAdmin`='0'  WHERE `id`=".$id."");
		}else{
			print_r($errors);
		}
	}	
}else{

	if(!empty($_POST['name'])){
		$name =  MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['name']));
	}
	if(!empty($_POST['lastname'])){
		$lastname =   MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['lastname']));
	}
	if(!empty($_POST['tel'])){
		$tel = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['tel']));
	}
	if(!empty($_POST['email'])){
		$email =   MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['email']));
	}
	if(!empty($_POST['city'])){
		$city =   MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['city']));
	}
	if(!empty($_POST['password'])){
		$password =   MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['password']));
		if (empty($errors)){
			echo
			MysqliDB::getInstance()->query("UPDATE `users` SET `name`='".$name."',`lastname`='".$lastname."',`email`='".$email."',`tel`='".$tel."',`city`='".$city."',`password`='".$password."' WHERE `id`=".$id."");

		}else{
			print_r($errors);
		}
	} else {
		if (empty($errors)){
			echo
			MysqliDB::getInstance()->query("UPDATE `users` SET `name`='".$name."',`lastname`='".$lastname."',`email`='".$email."',`tel`='".$tel."',`city`='".$city."' WHERE `id`=".$id."");
		}else{
			print_r($errors);
		}
	}

}
?>