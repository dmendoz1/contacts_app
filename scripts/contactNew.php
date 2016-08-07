<?php

include('credentials.php');
global $connection;
$data = json_decode(file_get_contents("php://input"));
$id = $data->user_id;
$fn = $data->friend_fn;
$ln = $data->friend_ln;
$email = $data->friend_email;
$phone = $data->friend_phone;

$query = "INSERT INTO user_contacts (firstName, lastName, email, phone, user_id) VALUES ('$fn', '$ln', '$email', '$phone', '$id')";
if(mysqli_query($connection, $query)) {
	echo "successful";
} else {
	echo "unsuccessful";
}
mysqli_close($connection);
?>