<?php
// ✅ Database connection settings
$host = "localhost"; 
$user = "your_db_user"; 
$pass = "your_db_password"; 
$db   = "record_keeper_php"; 

$conn = new mysqli($host, $user, $pass, $db);

// ✅ Check connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed: " . $conn->connect_error]));
}
?>
