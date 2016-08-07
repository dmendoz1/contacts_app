<?php

include('credentials.php');
global $connection;
$data = json_decode(file_get_contents("php://input"));
$id = $data->id;

$query = "DELETE FROM user_contacts WHERE ID='$id' LIMIT 1";
if(mysqli_query($connection, $query)) {
	echo  "successful";
} else {
	echo "not successful";
}
mysqli_close($connection);
?>