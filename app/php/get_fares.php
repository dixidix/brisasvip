<?php
require 'bd.php';
$_POST = json_decode(file_get_contents('php://input'), true);
$errors = array();
$data = array();

$daytime = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['daytime']));
if(!empty($_POST['daytime'])){
$res = MysqliDB::getInstance()->query("SELECT * from fares where daytime = '$daytime'");
}else{
$res = MysqliDB::getInstance()->query("SELECT * from fares");
}
$outp="";
while($rs = $res->fetch_array(MYSQLI_ASSOC)) {
	$outpm ="";
	if ($outp != "") {$outp .= ",";}
	$outp .= '{"bajada_bandera":"'  . $rs["bajada_bandera"] . '",';
	$outp .= '"km":"'  . $rs["km"] . '",';
	$outp .= '"daytime":"'   . $rs["daytime"]  . '"}';
}
$outp ='{"fares":['.$outp.']}';

echo($outp);
?>
