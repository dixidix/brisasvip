<?php
require 'bd.php';
require './PHPMailer-master/PHPMailerAutoload.php';

$_POST = json_decode(file_get_contents('php://input'), true);
$errors = array();
$data = array();

$mail = new PHPMailer;

$mail->SMTPDebug = 2;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'brisasvipprueba@gmail.com';                 // SMTP username
$mail->Password = 'brisasvip123';                           // SMTP password
$mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 587;                                    // TCP port to connect to


if(!empty($_POST['contactForm'])){

	$name = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['name']));
	$lastname = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['lastname']));
	$fullname = $name." ".$lastname;
	$tel = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['tel']));
	$consulta = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['consulta']));
	$from = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['mail']));
	$to = "brisasvipprueba@gmail.com";
	$subject = "Consulta Web de: $fullname";
	$consulta = "<div> <h3>Consulta Web :: Brisas Vip</h3> <span><b>Nombre: </b></span><span>$fullname</span><br /> <span><b>E-Mail: </b></span><span>$from</span><br /><span><b>Tel: </b></span><span>$tel</span><br /><b>Consulta: </b><br/><p>$consulta</p><br /></div>";

	$mail->AddReplyTo($from, $fullname);
	$mail->SetFrom($from, $name);
	$mail->Subject = $subject;
	$mail->AddAddress($to);
	$mail->Body    = $consulta;
	$mail->AltBody = "de:$fullname,tel: $tel, E-mail: $from,Consulta: $consulta";

} else if(!empty($_POST['rateForm'])){
	$distance = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['distance']));
	$price = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['price']));
	$date = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['date']));
	$time = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['time']));
	$from = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['from']));
	$to = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['to']));
	$user = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['user']));
	$userId = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['userId']));
	$userEmail = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['userEmail']));
	$userTel = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['userTel']));
	$correo = "brisasvipprueba@gmail.com";
	date_default_timezone_set('America/Argentina/Mendoza');
	$requestDate = date('d-m-y H:i', time());

	MysqliDB::getInstance()->query("INSERT INTO `requested_trips`(`userId`, `request_date`, `date`, `time`, `req_from`, `req_to`, `distance`, `price`)
		VALUES (".$userId.",'".$requestDate."','".$date."','".$time."','".$from."','".$to."',".$distance.",'".$price."')");	

	$subject = "Reserva Web de: $user";
	$consulta = "<div> <h3>Reserva Web :: Brisas Vip</h3><h4>Fecha de solicitud: $requestDate</h4> <span><b>Nombre: </b></span><span>$user</span><br /><span><b>E-Mail: </b></span><span>$userEmail</span><br /><span><b>Tel: </b></span><span>$userTel</span><br /> <span><b>Fecha de reserva: </b></span><span>$date</span><br /><span><b>Hora de reserva: </b></span><span>$time hs</span><br /><b>Desde: </b><br/><span>$from</span><br /><b>Hasta: </b><br/><span>$to</span><br /><b>Distancia: </b><br/><span>$distance Km.</span><br /><b>Precio: </b><br/><span>$ $price</span><br /></div>";

	$mail->AddReplyTo($userEmail, $user);
	$mail->SetFrom($correo, $user);
	$mail->Subject = $subject;
	$mail->AddAddress($correo);
	$mail->Body    = $consulta;
	$mail->AltBody = "de:$user,tel: $date, E-mail: $time,Consulta: $from";

}
if(!$mail->send()) {
	echo 'Message could not be sent.';
	echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
	echo 'Message has been sent';
}
?>