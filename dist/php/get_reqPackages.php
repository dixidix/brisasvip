<?php
require 'bd.php';

session_start();

$res = MysqliDB::getInstance()->query("SELECT * from soldpackages");
$outp="";
while($rs = $res->fetch_array(MYSQLI_ASSOC)) {
	$outpm ="";
	if ($outp != "") {$outp .= ",";}
	$outp .= '{"id":"'  . $rs["id"] . '",';
	$outp .= '"name":"'  . $rs["name"] . '",';
	$outp .= '"lastname":"'  . $rs["lastname"] . '",';
	$outp .= '"email":"'  . $rs["email"] . '",';
	$outp .= '"tel":"'  . $rs["tel"] . '",';
	$outp .= '"date":"'  . $rs["date"] . '",';
	$outp .= '"time":"'  . $rs["time"] . '",';
	$uname = MysqliDB::getInstance()->query("SELECT * FROM packages WHERE id=" . $rs["packageId"]);
	while($rss = $uname->fetch_array(MYSQLI_ASSOC)) {
		$outp .= '"shortTitle":"'  . $rss["short_title"] . '",';
		$outp .= '"price":"'  . $rss["price"] . '",';
	}

	$outp .= '"time":"'   . $rs["time"]  . '"}';
}
$outp ='{"reqPackages":['.$outp.']}';

echo($outp);
?>
