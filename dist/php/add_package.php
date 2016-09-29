<?php
require 'bd.php';
// $_POST = json_decode(file_get_contents('php://input'), true);

$errors = array();
$data = array();

$title =  MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['title']));
$sub_title =   MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['sub_title']));
$desc =   MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['desc']));
$sub_desc =   MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['sub_desc']));
$price =   MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['price']));
$short_title =   MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['short_title']));
$timestamp =   MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['timestamp']));
$paymentGatewayUrl =   MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['paymentGatewayUrl']));
$zone =   MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['zone']));

if(!empty($_POST['porcentaje'])){
	$porcentaje =  MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['porcentaje']));
}
if(!empty($_POST['bonificado'])){
	$bonificado =  MysqliDB::replace_double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['bonificado']));
}
if(!empty($_FILES['img1'])){
	$file_name_img1 = $_FILES['img1']['name'];
	$file_name_img1 = str_replace(' ', '_', $file_name_img1);
	$file_size_img1 =$_FILES['img1']['size'];
	$file_tmp_img1 = $_FILES['img1']['tmp_name'];
	$file_type_img1 =$_FILES['img1']['type'];
	$file_ext_img1 = strtolower(pathinfo($file_name_img1, PATHINFO_EXTENSION));
	$fileSystemname_img1 = $file_name_img1 . $timestamp;
	$fileSystemname_img1 = hash('sha256', $fileSystemname_img1);
	$fileSystemname_img1 = "$fileSystemname_img1.$file_ext_img1";
	$tmp_path_img1 = "../files/".$timestamp."/".$fileSystemname_img1;
	$path_img1 = "/dist/files/".$timestamp."/".$fileSystemname_img1;
}
if(!empty($_FILES['img2'])){
	$file_name_img2 = $_FILES['img2']['name'];
	$file_name_img2 = str_replace(' ', '_', $file_name_img2);
	$file_size_img2 =$_FILES['img2']['size'];
	$file_tmp_img2 = $_FILES['img2']['tmp_name'];
	$file_type_img2 =$_FILES['img2']['type'];
	$file_ext_img2 = strtolower(pathinfo($file_name_img2, PATHINFO_EXTENSION));
	$fileSystemname_img2 = $file_name_img2 . $timestamp;
	$fileSystemname_img2 = hash('sha256', $fileSystemname_img2);
	$fileSystemname_img2 = "$fileSystemname_img2.$file_ext_img2";
	$tmp_path_img2 = "../files/".$timestamp."/".$fileSystemname_img2;
	$path_img2 = "/dist/files/".$timestamp."/".$fileSystemname_img2;
}
if(!empty($_FILES['img3'])){
	$file_name_img3 = $_FILES['img3']['name'];
	$file_name_img3 = str_replace(' ', '_', $file_name_img3);
	$file_size_img3 =$_FILES['img3']['size'];
	$file_tmp_img3 = $_FILES['img3']['tmp_name'];
	$file_type_img3 =$_FILES['img3']['type'];
	$file_ext_img3 = strtolower(pathinfo($file_name_img3, PATHINFO_EXTENSION));
	$fileSystemname_img3 = $file_name_img3 . $timestamp;
	$fileSystemname_img3 = hash('sha256', $fileSystemname_img3);
	$fileSystemname_img3 = "$fileSystemname_img3.$file_ext_img3";
	$tmp_path_img3 = "../files/".$timestamp."/".$fileSystemname_img3;
	$path_img3 = "/dist/files/".$timestamp."/".$fileSystemname_img3;
}
if(!empty($_FILES['img4'])){
	$file_name_img4 = $_FILES['img4']['name'];
	$file_name_img4 = str_replace(' ', '_', $file_name_img4);
	$file_size_img4 =$_FILES['img4']['size'];
	$file_tmp_img4 = $_FILES['img4']['tmp_name'];
	$file_type_img4 =$_FILES['img4']['type'];
	$file_ext_img4 = strtolower(pathinfo($file_name_img4, PATHINFO_EXTENSION));
	$fileSystemname_img4 = $file_name_img4 . $timestamp;
	$fileSystemname_img4 = hash('sha256', $fileSystemname_img4);
	$fileSystemname_img4 = "$fileSystemname_img4.$file_ext_img4";
	$tmp_path_img4 = "../files/".$timestamp."/".$fileSystemname_img4;
	$path_img4 = "/dist/files/".$timestamp."/".$fileSystemname_img4;
}

if(!file_exists("../files/".$timestamp."/")){
	mkdir("../files/".$timestamp."/");
	if(!empty($_FILES['img1'])){
		move_uploaded_file($file_tmp_img1, "$tmp_path_img1");
	}
	if(!empty($_FILES['img2'])){
		move_uploaded_file($file_tmp_img2, "$tmp_path_img2");
	}
	if(!empty($_FILES['img3'])){
		move_uploaded_file($file_tmp_img3, "$tmp_path_img3");
	}
	if(!empty($_FILES['img4'])){
		move_uploaded_file($file_tmp_img4, "$tmp_path_img4");
	}

}else{
	if(!empty($_FILES['img1'])){
		move_uploaded_file($file_tmp_img1, "$tmp_path_img1");
	}
	if(!empty($_FILES['img2'])){
		move_uploaded_file($file_tmp_img2, "$tmp_path_img2");
	}
	if(!empty($_FILES['img3'])){
		move_uploaded_file($file_tmp_img3, "$tmp_path_img3");
	}
	if(!empty($_FILES['img4'])){
		move_uploaded_file($file_tmp_img4, "$tmp_path_img4");
	}
}

if (empty($errors)){
	if(empty($_POST['porcentaje']) && empty($_POST['bonificado'])){
		echo
		MysqliDB::getInstance()->query("INSERT INTO `packages`(`short_title`, `title`, `desc`, `sub_title`, `sub_desc`, `price` , `timestamp`,`paymentGatewayUrl`,`zone`)
			VALUES ('".$short_title."','".$title."','".$desc."','".$sub_title."','".$sub_desc."',".$price.",".$timestamp.",'".$paymentGatewayUrl."','".$zone."')");	
	} else if(!empty($_POST['porcentaje'])){
		MysqliDB::getInstance()->query("INSERT INTO `packages`(`short_title`, `title`, `desc`, `sub_title`, `sub_desc`, `price` , `timestamp`, `hasPromo`, `porcentaje`,`paymentGatewayUrl`,`zone`)
			VALUES ('".$short_title."','".$title."','".$desc."','".$sub_title."','".$sub_desc."',".$price.",".$timestamp.",1,".$porcentaje.",'".$paymentGatewayUrl."','".$zone."')");	
	} else if(!empty($_POST['bonificado'])){
		MysqliDB::getInstance()->query("INSERT INTO `packages`(`short_title`, `title`, `desc`, `sub_title`, `sub_desc`, `price` , `timestamp`, `hasPromo`, `bonificado`,`paymentGatewayUrl`,`zone`)
			VALUES ('".$short_title."','".$title."','".$desc."','".$sub_title."','".$sub_desc."',".$price.",".$timestamp.",2,'".$bonificado."','".$paymentGatewayUrl."','".$zone."')");	
	}
	$res = MysqliDB::getInstance()->query("SELECT id FROM packages WHERE timestamp='".$timestamp."'");
	$rss = $res->fetch_array(MYSQLI_ASSOC);
	$packageId = $rss['id'];
	if(!empty($_FILES['img1'])){
		MysqliDB::getInstance()->query("INSERT INTO `images`(`packageId`, `url`) VALUES (".$packageId.",'".$path_img1."')");
		echo MysqliDB::getInstance()->error();
	}
	if(!empty($_FILES['img2'])){
		MysqliDB::getInstance()->query("INSERT INTO `images`(`packageId`, `url`) VALUES (".$packageId.",'".$path_img2."')");
		echo MysqliDB::getInstance()->error();
	}
	if(!empty($_FILES['img3'])){
		MysqliDB::getInstance()->query("INSERT INTO `images`(`packageId`, `url`) VALUES (".$packageId.",'".$path_img3."')");
		echo MysqliDB::getInstance()->error();
	}
	if(!empty($_FILES['img4'])){
		MysqliDB::getInstance()->query("INSERT INTO `images`(`packageId`, `url`) VALUES (".$packageId.",'".$path_img4."')");
		echo MysqliDB::getInstance()->error();
	}
	MysqliDB::getInstance()->close();

}else{
	print_r($errors);
}
?>