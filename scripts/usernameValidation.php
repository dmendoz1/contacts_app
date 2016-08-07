<?php

include('credentials.php');
global $connection;
$data = json_decode(file_get_contents("php://input"));
$username = $data->username;
$query = "SELECT * FROM users WHERE email = '$username'";
$result = mysqli_query($connection, $query);
	if (mysqli_num_rows($result) > 0) {
	   	echo "not available";
	} else {
	    echo "available";
	}

	mysqli_close($connection);

?>