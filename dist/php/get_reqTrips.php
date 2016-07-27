<?php
require 'bd.php';

session_start();

$res = MysqliDB::getInstance()->query("SELECT * from requested_trips");
$outp="";
while($rs = $res->fetch_array(MYSQLI_ASSOC)) {
	$outpm ="";
	if ($outp != "") {$outp .= ",";}
	$outp .= '{"id":"'  . $rs["id"] . '",';
	$outp .= '"request_date":"'  . $rs["request_date"] . '",';
	$outp .= '"date":"'  . $rs["date"] . '",';
	$outp .= '"time":"'  . $rs["time"] . '",';
	$outp .= '"req_from":"'  . $rs["req_from"] . '",';
	$outp .= '"req_to":"'  . $rs["req_to"] . '",';
	$outp .= '"distance":"'  . $rs["distance"] . '",';
	$outp .= '"state":"'  . $rs["state"] . '",';
	$uname = MysqliDB::getInstance()->query("SELECT * FROM users WHERE id=" . $rs["userId"]);
	while($rss = $uname->fetch_array(MYSQLI_ASSOC)) {
		$outp .= '"name":"'  . $rss["name"] . '",';
		$outp .= '"lastname":"'  . $rss["lastname"] . '",';
		$outp .= '"email":"'  . $rss["email"] . '",';
		$outp .= '"tel":"'  . $rss["tel"] . '",';
	}

	$outp .= '"price":"'   . $rs["price"]  . '"}';
}
$outp ='{"reqTrips":['.$outp.']}';

echo($outp);
?>
