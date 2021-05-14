<?php 
	try {
		$con = new PDO('mysql:host=localhost; dbname=assignment_two', 'root', '');
	}
	catch(PDOException $e) {
		echo "Database connection error " . $e->getMessage();
	}
?>