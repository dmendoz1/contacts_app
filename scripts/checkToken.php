<?php

include('credentials.php');
global $connection;

$data = json_decode(file_get_contents("php://input"));
$token = $data->token;
$query = "SELECT * FROM users WHERE token=$token";
$result = mysqli_query($connection, $query);
if(($row = mysqli_fetch_assoc($result)) > 0) {
	echo "authorized";
}
else {
	echo "unauthorized";
}

?>