<?php
require 'bd.php';
$_POST = json_decode(file_get_contents('php://input'), true);

$errors = array();
$data = array();
echo $_POST['bbandera_dia'];
$bbandera_dia =  MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['bbandera_dia']));
$bbandera_noche =   MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['bbandera_noche']));
$km_dia = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['km_dia']));
$km_noche =   MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['km_noche']));

if (empty($errors)){
	echo
	MysqliDB::getInstance()->query("UPDATE `fares` SET `bajada_bandera`='".$bbandera_dia."',`km`='".$km_dia."' WHERE `daytime`=1");
	echo	
	MysqliDB::getInstance()->query("UPDATE `fares` SET `bajada_bandera`='".$bbandera_noche."',`km`='".$km_noche."' WHERE `daytime`=2");	
}else{
	print_r($errors);
}
?>