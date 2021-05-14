<?php 
	//Error logging
	ini_set("error_reporting", E_ALL);
	ini_set("log_errors", "1");
	ini_set("error_log", "php_error.txt");

	//Connect to database
	//require_once('dbconnect.php');
	require_once('homedbconnect.php');

	$query = "select * from `shareprices`";
	$result = $con ->query($query);
	$names = array();
	
	//If query is correct
	if($query != FALSE) {
		//Get all company names from the database
		while($row = $result->fetch()) {
			//Store all company names in the array
			$name[] = array("name" => $row['name']);
		}
	}
	else
		die ("Error in database query.");

	//Return using json
	echo json_encode($name);
?>