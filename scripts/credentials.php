<?php
	$hostname = "localhost";
	$username = "root";
	$password = "root";
	$database = "contacts";   
	// connect to database
    if (($connection = mysqli_connect($hostname, $username, $password, $database)) === false)
    {
        echo "Could not connect to database";
    }  
?>