<?php

include('credentials.php');
global $connection;

$data = json_decode(file_get_contents("php://input"));
$username = $data->username;
$password = $data->password;


$query = 'INSERT INTO users (email, password, token) VALUES ("'.$username.'", "'.sha1($password).'", "'.$token.'")';
if(mysqli_query($connection, $query)) {
	echo"successful";
} else {
	echo "could not sign user up";
}


?>