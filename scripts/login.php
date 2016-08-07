<?php

include('credentials.php');
global $connection;

$data = json_decode(file_get_contents("php://input"));
$username = $data->username;
$password = sha1($data->password);
$query = "SELECT email, ID  FROM users WHERE email='$username' AND password= '$password'";
$result = mysqli_query($connection, $query);
if(($row = mysqli_fetch_assoc($result)) > 0) {
	$token = $username . " | " . uniqid() . uniqid() . uniqid();
	$id = $row['ID'];
	$query2 = "UPDATE users SET token='$token' WHERE email = '$username' AND password='$password'";
	$result2 = mysqli_query($connection, $query2);
	echo json_encode(array("token"=>$token, "id"=>$id));
} else {
	echo "user not found";
}
?>