<?php
require 'bd.php';
$_POST = json_decode(file_get_contents('php://input'), true);
$errors = array();
$data = array();

$sskey = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['sskey']));
$getuserinfo = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['getuserinfo']));

$res = MysqliDB::getInstance()->query("SELECT isAdmin, id, email ,tel,name,lastname FROM users WHERE sskey='".$sskey."' AND deleted='0'");

$rows = mysqli_num_rows($res);

if ($rows == 1){
	$rss = $res->fetch_array(MYSQLI_ASSOC);

	$data['isAdmin'] = $rss['isAdmin'];
	if($getuserinfo){
		$data['userId'] = $rss['id'];
		$data['userEmail'] = $rss['email'];
		$data['userTel'] = $rss['tel'];
		$data['name'] = $rss['name'];
		$data['lastname'] = $rss['lastname'];
	}
	echo json_encode($data);

}else{

	$data['isAdmin'] = 0;

	echo json_encode($data);

}

MysqliDB::getInstance()->close();

?>