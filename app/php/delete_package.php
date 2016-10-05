<?php
require 'bd.php';
$_POST = json_decode(file_get_contents('php://input'), true);
$errors = array();
$data = array();

$id = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['id']));
$timestamp = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['stamp']));
$dir = "../files/".$timestamp."/";

function emptyDir($dir) {
    if (is_dir($dir)) {
        $scn = scandir($dir);
        foreach ($scn as $files) {
            if ($files !== '.') {
                if ($files !== '..') {
                    if (!is_dir($dir . '/' . $files)) {
                        unlink($dir . '/' . $files);
                    } else {
                        emptyDir($dir . '/' . $files);
                        rmdir($dir . '/' . $files);
                    }
                }
            }
        }
    }
}

if (empty($errors)){
	echo
	MysqliDB::getInstance()->query("UPDATE `packages` SET `deleted`= 1 WHERE `id` = ".$id."");	
	MysqliDB::getInstance()->close();

	emptyDir($dir);
	rmdir($dir);

}else{
	print_r($errors);
}
?>