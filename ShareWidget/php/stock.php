<?php 
	//Error logging
	ini_set("error_reporting", E_ALL);
	ini_set("log_errors", "1");
	ini_set("error_log", "php_error.txt");

	//CONNECT TO THE DATABASE
	//require_once('dbconnect.php');
	require_once('homedbconnect.php');

	//Get data from javascript
	$company = $_POST['companyName'];
	$query = "SELECT * FROM `shareprices` WHERE `name` = '$company'";
	$result = $con ->query($query);
	$myObj = array();
	
	//If query is correct get data from db
	if($query != FALSE) 
	{
		//If there's data from javascript
		if(!empty($_POST)) 
		{
			$row = $result->fetch();
			//Store values into array to return
			$myObj = array("name" => $row['name'], "price" => $row['price'], "movement" => $row['movement']);
		}
	}
	else
		die ("Error in database query.");

	//Return json data
	echo json_encode($myObj);
?>