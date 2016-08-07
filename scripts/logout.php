<?php

include('credentials.php');
global $connection;

$data = json_decode(file_get_contents("php://input"));
$token = $data->token;
$query = "UPDATE users SET token='LOGGED OUT' WHERE token=".$token."";
mysqli_query($connection, $query);
?>