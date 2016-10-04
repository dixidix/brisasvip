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
	$outp .= '"payed":"'  . $rs["payed"] . '",';
	$uname = MysqliDB::getInstance()->query("SELECT * FROM packages WHERE id=" . $rs["packageId"]);
	while($rss = $uname->fetch_array(MYSQLI_ASSOC)) {
		$outp .= '"shortTitle":"'  . $rss["short_title"] . '",';
		
		if($rss["porcentaje"] !== null){
			$outp .= '"originalPrice":"'  . $rss["price"]. '",';
			$outp .= '"porcentaje":"'  . $rss["porcentaje"]. '",';
			$outp .= '"price":"'  .($rss["price"] - ( ($rss["price"] * $rss["porcentaje"]) / 100)). '",';		
			
		} else {
			$outp .= '"price":"'  . $rss["price"] . '",';
		}
		$outp .= '"bonificado":"'  . $rss["bonificado"] . '",';
	}

	$outp .= '"time":"'   . $rs["time"]  . '"}';
}
$outp ='{"reqPackages":['.$outp.']}';

echo($outp);
?>
