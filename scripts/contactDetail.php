<?php
	include('credentials.php');
	global $connection;
	$data = json_decode(file_get_contents("php://input"));
	$id = $data->id;
	$query = "SELECT *  FROM user_contacts WHERE ID='$id'";
	$result = mysqli_query($connection, $query);
	$contactDetail = mysqli_fetch_assoc($result); 
	echo json_encode($contactDetail);
	mysqli_close($connection);
?>