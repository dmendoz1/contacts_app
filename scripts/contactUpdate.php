<?php

include('credentials.php');
global $connection;
$data = json_decode(file_get_contents("php://input"));
$id = $data->friend_id;
$fn = $data->friend_fn;
$ln = $data->friend_ln;
$email = $data->friend_email;
$phone = $data->friend_phone;

$query = "UPDATE user_contacts SET firstName= '$fn', lastName='$ln', email='$email', phone='$phone' WHERE ID='$id'";
if(mysqli_query($connection, $query)) {
	echo "successful";
} else {
	echo "not successful";
}
mysqli_close($connection);
?>