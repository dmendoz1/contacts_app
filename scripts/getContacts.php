<?php

include('credentials.php');
global $connection;
$data = json_decode(file_get_contents("php://input"));
$id = $data->userId;
$query = "SELECT *  FROM user_contacts WHERE user_id='$id'";
$contacts = array();
$result = mysqli_query($connection, $query);
while($row = mysqli_fetch_assoc($result)) {
	$contacts[] = $row;
} 
echo json_encode($contacts);
mysqli_close($connection);
?>