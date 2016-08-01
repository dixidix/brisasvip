<?php
require 'bd.php';
$_POST = json_decode(file_get_contents('php://input'), true);
session_start();

$sskey = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['sskey']));
if(!empty($_POST['userId'])){
	$userId = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['userId']));
	$res = MysqliDB::getInstance()->query("SELECT * from users WHERE `id` = '$userId' AND deleted = 0");
} else {
	$res = MysqliDB::getInstance()->query("SELECT * from users WHERE deleted = 0");
}
$outp="";
while($rs = $res->fetch_array(MYSQLI_ASSOC)) {
	$outpm ="";
	if ($outp != "") {$outp .= ",";}
	$outp .= '{"id":"'  . $rs["id"] . '",';
	$outp .= '"name":"'  . $rs["name"] . '",';
	$outp .= '"lastname":"'  . $rs["lastname"] . '",';
	$outp .= '"email":"'  . $rs["email"] . '",';
	$outp .= '"tel":"'  . $rs["tel"] . '",';
	$outp .= '"city":"'  . $rs["city"] . '",';
	$uname = MysqliDB::getInstance()->query("SELECT id FROM users WHERE sskey='".$sskey."' AND deleted='0'");
	while($rss = $uname->fetch_array(MYSQLI_ASSOC)) {
		$outp .= '"loggedId":"'  . $rss["id"] . '",';
	}
	$outp .= '"isAdmin":"'   . $rs["isAdmin"]  . '"}';
}
$outp ='{"users":['.$outp.']}';

echo($outp);
?>
