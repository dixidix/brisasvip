<?php
require 'bd.php';

session_start();

$res = MysqliDB::getInstance()->query("SELECT * from packages WHERE deleted = 0");
$outp="";
while($rs = $res->fetch_array(MYSQLI_ASSOC)) {
	$outpm ="";
	if ($outp != "") {$outp .= ",";}
	$outp .= '{"short_title":"'  . $rs["short_title"] . '",';
	$outp .= '"id":"'  . $rs["id"] . '",';
	$outp .= '"title":"'  . $rs["title"] . '",';
	$outp .= '"desc":"'  . $rs["desc"] . '",';
	$outp .= '"sub_title":"'  . $rs["sub_title"] . '",';
	$outp .= '"sub_desc":"'  . $rs["sub_desc"] . '",';
	$outp .= '"price": '  . $rs["price"] . ',';
	$outp .= '"hasPromo":"'  . $rs["hasPromo"] . '",';
	$outp .= '"paymentGatewayUrl":"'  . $rs["paymentGatewayUrl"] . '",';
	$outp .= '"zone":'  . $rs["zone"] . ',';
	if($rs["hasPromo"] == 1){
		if($rs["porcentaje"] !== NULL){
			$outp .= '"porcentaje":'  . $rs["porcentaje"] . ',';
		}
	}
	if($rs["hasPromo"] == 2){
		if($rs["bonificado"] !== NULL){
			$outp .= '"bonificado":"'  . $rs["bonificado"] . '",';
		}
	}
	$uname = MysqliDB::getInstance()->query("SELECT * FROM images WHERE packageId=" . $rs["id"]);
	while($rss = $uname->fetch_array(MYSQLI_ASSOC)) {
		if ($outpm != "") {$outpm .= ",";}
		$outpm .= '{"id":"'   . $rss["id"].'",';
		$outpm .= '"url":"'   . $rss["url"].'"}';
	}

	$outp .='"images":['.$outpm.'],';
	$outp .= '"timestamp":"'   . $rs["timestamp"]  . '"}';
}
$outp ='{"packages":['.$outp.']}';

echo($outp);
?>
